/**
 * Booking Routes
 * 
 * POST /api/v1/bookings - Create new booking
 * GET /api/v1/bookings - List user's bookings
 * GET /api/v1/bookings/:id - Get booking details
 * PUT /api/v1/bookings/:id/cancel - Cancel booking with refund
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticateToken } from './auth.routes';
import { bookingService } from '../services/mock/booking.service';
import { stripeService } from '../services/mock/stripe.service';

const router = Router();

// In-memory bookings storage (will use Prisma once DB is set up)
interface Booking {
  id: string;
  userId: string;
  type: 'HOTEL' | 'FLIGHT' | 'CAR' | 'ACTIVITY';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalPrice: number;
  currency: string;
  paymentId?: string;
  isMock: boolean;
  bookingData: any;
  createdAt: string;
  updatedAt: string;
}

const bookings: Booking[] = [];

// Validation schemas
const createBookingSchema = z.object({
  type: z.enum(['HOTEL', 'FLIGHT', 'CAR', 'ACTIVITY']),
  bookingData: z.object({
    // Hotel fields
    propertyId: z.string().optional(),
    propertyName: z.string().optional(),
    roomType: z.string().optional(),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    guests: z.object({
      adults: z.number(),
      children: z.number().optional(),
    }).optional(),
    
    // Flight fields
    flightId: z.string().optional(),
    flightNumber: z.string().optional(),
    airline: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
    departureDate: z.string().optional(),
    passengers: z.array(z.object({
      firstName: z.string(),
      lastName: z.string(),
      dateOfBirth: z.string().optional(),
      passportNumber: z.string().optional(),
    })).optional(),
    cabinClass: z.string().optional(),
    
    // Car fields
    carId: z.string().optional(),
    carName: z.string().optional(),
    pickupLocation: z.string().optional(),
    dropoffLocation: z.string().optional(),
    pickupDate: z.string().optional(),
    dropoffDate: z.string().optional(),
    insurance: z.boolean().optional(),
    
    // Activity fields
    activityId: z.string().optional(),
    activityTitle: z.string().optional(),
    activityDate: z.string().optional(),
    participants: z.object({
      adults: z.number(),
      children: z.number().optional(),
    }).optional(),
    selectedOption: z.string().optional(),
  }),
  totalPrice: z.number().positive(),
  currency: z.string().default('USD'),
  paymentMethod: z.string().default('card'),
});

/**
 * POST /api/v1/bookings
 * Create a new booking
 */
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    
    // Validate input
    const data = createBookingSchema.parse(req.body);
    
    // Process payment with mock Stripe
    const paymentIntent = await stripeService.createPaymentIntent({
      amount: Math.round(data.totalPrice * 100), // Convert to cents
      currency: data.currency.toLowerCase(),
      metadata: {
        userId,
        bookingType: data.type,
      },
    });
    
    // Create booking
    const booking: Booking = {
      id: `booking_${Date.now()}`,
      userId,
      type: data.type,
      status: 'CONFIRMED',
      totalPrice: data.totalPrice,
      currency: data.currency,
      paymentId: paymentIntent.id,
      isMock: true,
      bookingData: data.bookingData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    bookings.push(booking);
    
    res.status(201).json({
      success: true,
      data: {
        booking,
        payment: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
      },
      message: 'Booking created successfully',
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
    });
  }
});

/**
 * GET /api/v1/bookings
 * List user's bookings with pagination
 */
router.get('/', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const type = req.query.type as string;
    
    // Filter bookings by user
    let userBookings = bookings.filter(b => b.userId === userId);
    
    // Apply filters
    if (status) {
      userBookings = userBookings.filter(b => b.status === status);
    }
    if (type) {
      userBookings = userBookings.filter(b => b.type === type);
    }
    
    // Sort by creation date (newest first)
    userBookings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBookings = userBookings.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        bookings: paginatedBookings,
        pagination: {
          page,
          limit,
          total: userBookings.length,
          totalPages: Math.ceil(userBookings.length / limit),
        },
      },
    });
  } catch (error) {
    console.error('List bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve bookings',
    });
  }
});

/**
 * GET /api/v1/bookings/:id
 * Get booking details
 */
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    
    const booking = bookings.find(b => b.id === id && b.userId === userId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    // Get payment details if available
    let paymentDetails = null;
    if (booking.paymentId) {
      paymentDetails = await stripeService.getPaymentIntent(booking.paymentId);
    }
    
    res.json({
      success: true,
      data: {
        booking,
        payment: paymentDetails,
      },
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve booking',
    });
  }
});

/**
 * PUT /api/v1/bookings/:id/cancel
 * Cancel booking and process refund
 */
router.put('/:id/cancel', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { reason } = req.body;
    
    const booking = bookings.find(b => b.id === id && b.userId === userId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    if (booking.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        error: 'Booking is already cancelled',
      });
    }
    
    if (booking.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel completed booking',
      });
    }
    
    // Process refund
    let refund = null;
    if (booking.paymentId) {
      refund = await stripeService.createRefund({
        paymentIntentId: booking.paymentId,
        amount: Math.round(booking.totalPrice * 100), // Full refund
        reason: reason || 'requested_by_customer',
      });
    }
    
    // Update booking status
    booking.status = 'CANCELLED';
    booking.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      data: {
        booking,
        refund,
      },
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel booking',
    });
  }
});

/**
 * GET /api/v1/bookings/:id/receipt
 * Get booking receipt/invoice
 */
router.get('/:id/receipt', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    
    const booking = bookings.find(b => b.id === id && b.userId === userId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    // Generate receipt data
    const receipt = {
      bookingId: booking.id,
      bookingType: booking.type,
      status: booking.status,
      date: booking.createdAt,
      details: booking.bookingData,
      pricing: {
        subtotal: booking.totalPrice,
        tax: 0,
        total: booking.totalPrice,
        currency: booking.currency,
      },
      paymentMethod: 'Credit Card',
      transactionId: booking.paymentId,
    };
    
    res.json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.error('Get receipt error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate receipt',
    });
  }
});

export default router;

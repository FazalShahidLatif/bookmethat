/**
 * Train Booking Routes
 * Endpoints for Pakistan Railway train search and booking
 */

import express, { Request, Response } from 'express';
import { pakistanRailwayService } from '../services/trains/pr-api.service';
import { emailService } from '../services/email/email.service';
import { authenticateToken } from './auth.routes';
import {
  requireAuth,
  requireOwnership,
  sanitizeInput,
  validateBookingDates,
  validateTrainPassengers,
  preventDuplicateBooking,
  validatePaymentAmount,
  detectSuspiciousActivity,
} from '../middleware/advanced-security';

const router = express.Router();

/**
 * GET /api/v1/trains/stations
 * Get list of all available train stations
 */
router.get('/stations', async (req: Request, res: Response) => {
  try {
    const stations = await pakistanRailwayService.getStations();

    res.json({
      success: true,
      count: stations.length,
      stations,
    });
  } catch (error: any) {
    console.error('Get stations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stations',
      error: error.message,
    });
  }
});

/**
 * POST /api/v1/trains/search
 * Search available trains between stations
 * 
 * Body: { from, to, date, class? }
 */
router.post('/search', sanitizeInput, validateBookingDates, async (req: Request, res: Response) => {
  try {
    const { from, to, date, class: travelClass } = req.body;

    // Validate required fields
    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: from, to, date',
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD',
      });
    }

    // Validate date is not in the past
    const searchDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (searchDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot search for past dates',
      });
    }

    const trains = await pakistanRailwayService.searchTrains({
      from,
      to,
      date,
      class: travelClass,
    });

    res.json({
      success: true,
      count: trains.length,
      trains,
      searchParams: { from, to, date, class: travelClass },
    });
  } catch (error: any) {
    console.error('Train search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search trains',
      error: error.message,
    });
  }
});

/**
 * POST /api/v1/trains/book
 * Book train tickets (requires authentication)
 * 
 * Body: { trainId, trainNumber, date, class, passengers[], contactPhone, contactEmail }
 */
router.post('/book',
  requireAuth,
  sanitizeInput,
  detectSuspiciousActivity,
  validateBookingDates,
  validateTrainPassengers,
  preventDuplicateBooking,
  validatePaymentAmount,
  async (req: Request, res: Response) => {
  try {
    const { trainId, trainNumber, date, class: travelClass, passengers, contactPhone, contactEmail } = req.body;

    // Validate required fields
    if (!trainId || !trainNumber || !date || !travelClass || !passengers || !contactPhone || !contactEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Validate passengers array
    if (!Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one passenger is required',
      });
    }

    // Validate each passenger
    for (const passenger of passengers) {
      if (!passenger.name || !passenger.age || !passenger.gender || !passenger.cnic) {
        return res.status(400).json({
          success: false,
          message: 'Each passenger must have: name, age, gender, cnic',
        });
      }

      // Validate CNIC format (13 digits)
      const cnicRegex = /^\d{13}$/;
      if (!cnicRegex.test(passenger.cnic.replace(/-/g, ''))) {
        return res.status(400).json({
          success: false,
          message: `Invalid CNIC format for passenger ${passenger.name}. Must be 13 digits.`,
        });
      }
    }

    // Book the train
    const booking = await pakistanRailwayService.bookTrain({
      trainId,
      trainNumber,
      date,
      class: travelClass,
      passengers,
      contactPhone,
      contactEmail,
    });

    // Process payment via JazzCash (internal API call with security key)
    const internalApiKey = process.env.INTERNAL_API_KEY || 'dev-internal-key-change-in-production';
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:4000';
    
    try {
      const paymentResponse = await fetch(`${apiBaseUrl}/api/v1/payments/jazzcash/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-api-key': internalApiKey,
        },
        body: JSON.stringify({
          amount: booking.totalAmount,
          transactionId: booking.pnr,
          customerEmail: contactEmail,
          customerPhone: contactPhone,
          description: `Train Booking - ${trainNumber} - ${passengers.length} passenger(s)`,
        }),
      });

      const paymentResult = await paymentResponse.json() as { success: boolean; errorMessage?: string; paymentUrl?: string; transactionId?: string };

      if (!paymentResult.success) {
        // Cancel booking if payment initiation fails
        await pakistanRailwayService.cancelBooking(booking.pnr);
        
        return res.status(400).json({
          success: false,
          message: 'Payment initiation failed',
          error: paymentResult.errorMessage,
        });
      }

      // Return booking with payment URL
      res.status(201).json({
        success: true,
        message: 'Train booked successfully. Please complete payment.',
        booking: {
          ...booking,
          paymentUrl: paymentResult.paymentUrl,
          paymentTransactionId: paymentResult.transactionId,
        },
      });

      // Send confirmation email asynchronously (don't wait for it)
      emailService.sendTrainBookingConfirmation({
        bookingId: booking.pnr,
        pnr: booking.pnr,
        trainNumber: booking.trainNumber,
        trainName: booking.trainName,
        fromStation: booking.fromStation,
        toStation: booking.toStation,
        journeyDate: booking.journeyDate,
        departureTime: booking.departureTime,
        arrivalTime: booking.arrivalTime,
        class: booking.class,
        passengers: booking.passengers,
        totalAmount: booking.totalAmount,
        currency: 'PKR',
        guestName: passengers[0].name,
        guestEmail: contactEmail,
        guestPhone: contactPhone,
      }).catch(err => console.error('Email sending failed:', err));

    } catch (paymentError: any) {
      // Cancel booking if payment processing fails
      await pakistanRailwayService.cancelBooking(booking.pnr);
      
      return res.status(500).json({
        success: false,
        message: 'Payment processing error',
        error: paymentError.message,
      });
    }
  } catch (error: any) {
    console.error('Train booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book train',
      error: error.message,
    });
  }
});

/**
 * GET /api/v1/trains/booking/:pnr
 * Get booking details by PNR (Passenger Name Record)
 */
router.get('/booking/:pnr', requireAuth, sanitizeInput, async (req: Request, res: Response) => {
  try {
    const { pnr } = req.params;

    if (!pnr) {
      return res.status(400).json({
        success: false,
        message: 'PNR is required',
      });
    }

    const booking = await pakistanRailwayService.getBookingByPNR(pnr);

    res.json({
      success: true,
      booking,
    });
  } catch (error: any) {
    console.error('Get booking error:', error);
    res.status(404).json({
      success: false,
      message: 'Booking not found',
      error: error.message,
    });
  }
});

/**
 * POST /api/v1/trains/cancel
 * Cancel train booking (requires authentication)
 * 
 * Body: { pnr, reason? }
 */
router.post('/cancel',
  requireAuth,
  sanitizeInput,
  requireOwnership('trainBooking'),
  async (req: Request, res: Response) => {
  try {
    const { pnr, reason } = req.body;

    if (!pnr) {
      return res.status(400).json({
        success: false,
        message: 'PNR is required',
      });
    }

    const result = await pakistanRailwayService.cancelBooking(pnr, reason);

    if (result.success) {
      res.json({
        success: true,
        message: 'Booking cancelled successfully',
        refundAmount: result.refundAmount,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to cancel booking',
      });
    }
  } catch (error: any) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message,
    });
  }
});

export default router;

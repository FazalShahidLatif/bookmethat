/**
 * Ticket Routes
 * 
 * Endpoints for downloading e-tickets with QR codes
 * 
 * Routes:
 * - GET /tickets/train/:pnr - Download train ticket PDF
 * - GET /tickets/hotel/:bookingId - Download hotel voucher PDF
 * - GET /tickets/qr/:type/:id - Get QR code image only
 * - GET /tickets/verify/:type/:id - Verify ticket QR code
 */

import express, { Request, Response } from 'express';
import { ticketService } from '../services/ticket/ticket.service';
import { requireAuth } from '../middleware/advanced-security';
import { prisma } from '../lib/prisma';

const router = express.Router();

/**
 * Download train ticket PDF
 * 
 * GET /api/v1/tickets/train/:pnr
 * 
 * Query params:
 * - download=true (optional) - Force download vs display in browser
 */
router.get('/train/:pnr', async (req: Request, res: Response) => {
  try {
    const { pnr } = req.params;
    const forceDownload = req.query.download === 'true';

    console.log(`📥 Generating train ticket for PNR: ${pnr}`);

    // Generate PDF ticket
    const pdfBuffer = await ticketService.generateTrainTicketPDF(pnr);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    
    if (forceDownload) {
      res.setHeader('Content-Disposition', `attachment; filename="train-ticket-${pnr}.pdf"`);
    } else {
      res.setHeader('Content-Disposition', `inline; filename="train-ticket-${pnr}.pdf"`);
    }

    // Send PDF
    res.send(pdfBuffer);

    console.log(`✅ Train ticket sent: ${pnr}`);
  } catch (error: any) {
    console.error('❌ Train ticket generation error:', error);
    
    if (error.message.includes('not found')) {
      res.status(404).json({
        success: false,
        message: 'Train booking not found',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to generate ticket',
        error: error.message,
      });
    }
  }
});

/**
 * Download hotel voucher PDF
 * 
 * GET /api/v1/tickets/hotel/:bookingId
 * 
 * Query params:
 * - download=true (optional) - Force download vs display in browser
 */
router.get('/hotel/:bookingId', async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const forceDownload = req.query.download === 'true';

    console.log(`📥 Generating hotel voucher for booking: ${bookingId}`);

    // Generate PDF voucher
    const pdfBuffer = await ticketService.generateHotelTicketPDF(bookingId);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    
    if (forceDownload) {
      res.setHeader('Content-Disposition', `attachment; filename="hotel-voucher-${bookingId}.pdf"`);
    } else {
      res.setHeader('Content-Disposition', `inline; filename="hotel-voucher-${bookingId}.pdf"`);
    }

    // Send PDF
    res.send(pdfBuffer);

    console.log(`✅ Hotel voucher sent: ${bookingId}`);
  } catch (error: any) {
    console.error('❌ Hotel voucher generation error:', error);
    
    if (error.message.includes('not found')) {
      res.status(404).json({
        success: false,
        message: 'Hotel booking not found',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to generate voucher',
        error: error.message,
      });
    }
  }
});

/**
 * Get QR code image only
 * 
 * GET /api/v1/tickets/qr/:type/:id
 * 
 * Params:
 * - type: train | hotel | flight | event
 * - id: booking ID or PNR
 * 
 * Returns PNG image
 */
router.get('/qr/:type/:id', async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    const bookingType = type.toUpperCase() as 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'EVENT';

    // Validate type
    if (!['TRAIN', 'HOTEL', 'FLIGHT', 'EVENT'].includes(bookingType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking type. Must be: train, hotel, flight, or event',
      });
    }

    console.log(`📥 Generating QR code for ${bookingType}: ${id}`);

    // Generate QR code
    const qrBuffer = await ticketService.getQRCodeBuffer(id, bookingType);

    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', qrBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    // Send image
    res.send(qrBuffer);

    console.log(`✅ QR code sent: ${bookingType} ${id}`);
  } catch (error: any) {
    console.error('❌ QR code generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate QR code',
      error: error.message,
    });
  }
});

/**
 * Verify ticket QR code
 * 
 * GET /api/v1/tickets/verify/:type/:id
 * 
 * Query params:
 * - h: security hash from QR code
 * 
 * Returns booking details if valid
 */
router.get('/verify/:type/:id', async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    const hash = req.query.h as string;

    if (!hash) {
      return res.status(400).json({
        success: false,
        message: 'Missing security hash parameter',
      });
    }

    const bookingType = type.toUpperCase() as 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'EVENT';

    console.log(`🔍 Verifying ${bookingType} ticket: ${id}`);

    // Verify hash
    const isValid = ticketService.verifyQRHash(id, hash);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or tampered QR code',
      });
    }

    // Fetch booking details based on type
    let booking;

    if (bookingType === 'TRAIN') {
      booking = await prisma.trainBooking.findFirst({
        where: {
          OR: [
            { id },
            { pnr: id },
          ],
        },
        select: {
          id: true,
          pnr: true,
          trainNumber: true,
          trainName: true,
          passengers: true,
          fromStation: true,
          toStation: true,
          journeyDate: true,
          departureTime: true,
          seats: true,
          class: true,
          totalAmount: true,
          status: true,
          createdAt: true,
        },
      });
    } else if (bookingType === 'HOTEL') {
      booking = await prisma.booking.findUnique({
        where: { id },
        select: {
          id: true,
          bookingNumber: true,
          guestName: true,
          totalPrice: true,
          status: true,
          createdAt: true,
          hotelBooking: {
            select: {
              propertyName: true,
              checkIn: true,
              checkOut: true,
            },
          },
        },
      });
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Return booking details
    res.json({
      success: true,
      verified: true,
      bookingType,
      booking,
      verifiedAt: new Date().toISOString(),
    });

    console.log(`✅ Ticket verified: ${bookingType} ${id}`);
  } catch (error: any) {
    console.error('❌ Ticket verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed',
      error: error.message,
    });
  }
});

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'E-Ticket Generation',
    features: [
      'Train ticket PDF',
      'Hotel voucher PDF',
      'QR code generation',
      'Ticket verification',
    ],
    timestamp: new Date().toISOString(),
  });
});

export default router;

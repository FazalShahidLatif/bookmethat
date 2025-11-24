/**
 * EasyPaisa Webhook Handler
 * 
 * Handles payment callbacks from EasyPaisa payment gateway (Pakistan mobile wallet)
 * 
 * Events Handled:
 * - Payment Success (status: 0000 or success)
 * - Payment Failed (status: failed)
 * - Payment Cancelled (status: cancelled)
 * - Payment Pending (status: pending)
 * 
 * References:
 * - EasyPaisa Integration Guide: https://easypay.easypaisa.com.pk/developers
 * - Existing service: backend/src/payments/easypaisa/easypaisa.service.ts
 */

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { easyPaisaService, EasyPaisaWebhookData } from '../../payments/easypaisa/easypaisa.service';
import { emailService } from '../email/email.service';
import { smsService } from '../sms/sms.service';

/**
 * Mock mode configuration
 * Set to true when EasyPaisa credentials are not available
 */
const MOCK_MODE = !process.env.EASYPAISA_STORE_ID || !process.env.EASYPAISA_HASH_KEY;

/**
 * EasyPaisa status codes mapping
 */
const STATUS_CODES: Record<string, string> = {
  '0000': 'SUCCESS',
  'success': 'SUCCESS',
  'failed': 'FAILED',
  'pending': 'PENDING',
  'cancelled': 'CANCELLED',
  'expired': 'EXPIRED',
};

/**
 * Process EasyPaisa webhook notification
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export async function handleEasyPaisaWebhook(req: Request, res: Response): Promise<void> {
  try {
    const webhookData: EasyPaisaWebhookData = req.body;

    console.log('📥 [EasyPaisa Webhook] Received notification:', {
      orderId: webhookData.orderId,
      transactionId: webhookData.transactionId,
      status: webhookData.status,
      amount: webhookData.amount,
      paymentMethod: webhookData.paymentMethod,
      timestamp: new Date().toISOString(),
    });

    // MOCK MODE: Skip signature verification in development
    if (MOCK_MODE) {
      console.warn('⚠️  [EasyPaisa Webhook] Running in MOCK MODE - signature verification disabled');
      console.log('📋 Mock webhook data:', JSON.stringify(webhookData, null, 2));
      
      res.json({
        success: true,
        message: 'Mock webhook processed (no actual payment)',
        mode: 'MOCK',
      });
      return;
    }

    // PRODUCTION: Verify webhook signature
    const isValid = easyPaisaService.verifyWebhook(webhookData);
    
    if (!isValid) {
      console.error('❌ [EasyPaisa Webhook] Invalid signature - possible fraud attempt!');
      console.error('Webhook data:', webhookData);
      
      res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
      return;
    }

    // Extract transaction details
    const transactionId = webhookData.transactionId;
    const orderId = webhookData.orderId;
    const status = webhookData.status.toLowerCase();
    const statusMessage = STATUS_CODES[status] || 'UNKNOWN';
    const amount = parseFloat(webhookData.amount);
    const paymentMethod = webhookData.paymentMethod;

    console.log(`📊 [EasyPaisa Webhook] Payment status: ${statusMessage} (${status})`);

    // Try to find booking (could be regular booking or train booking)
    const booking = await prisma.booking.findFirst({
      where: { id: transactionId },
      include: {
        user: true,
      },
    });

    const trainBooking = await prisma.trainBooking.findFirst({
      where: { id: transactionId },
    });

    if (!booking && !trainBooking) {
      console.error(`❌ [EasyPaisa Webhook] No booking found for transaction: ${transactionId}`);
      
      // Still acknowledge webhook to prevent retries
      res.json({
        success: true,
        message: 'Webhook received but booking not found',
      });
      return;
    }

    // Handle based on payment status
    switch (statusMessage) {
      case 'SUCCESS':
        await handleSuccessfulPayment(booking, trainBooking, transactionId, webhookData);
        break;
      
      case 'FAILED':
        await handleFailedPayment(booking, trainBooking, transactionId, status);
        break;
      
      case 'CANCELLED':
        await handleCancelledPayment(booking, trainBooking, transactionId);
        break;
      
      case 'PENDING':
        await handlePendingPayment(booking, trainBooking, transactionId);
        break;
      
      case 'EXPIRED':
        await handleExpiredPayment(booking, trainBooking, transactionId);
        break;
      
      default:
        console.warn(`⚠️  [EasyPaisa Webhook] Unknown status: ${status}`);
    }

    // Acknowledge webhook
    res.json({
      success: true,
      message: 'Webhook processed successfully',
      transactionId,
      orderId,
      status: statusMessage,
    });

  } catch (error: any) {
    console.error('❌ [EasyPaisa Webhook] Processing error:', error);
    
    // Always return 200 to prevent webhook retries
    res.status(200).json({
      success: false,
      message: 'Internal error - logged for review',
      error: error.message,
    });
  }
}

/**
 * Handle successful EasyPaisa payment
 */
async function handleSuccessfulPayment(
  booking: any,
  trainBooking: any,
  transactionId: string,
  webhookData: EasyPaisaWebhookData
): Promise<void> {
  console.log(`✅ [EasyPaisa Webhook] Payment successful for ${transactionId}`);

  // Update regular booking
  if (booking) {
    await prisma.booking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'CONFIRMED',
        updatedAt: new Date(),
      },
    });

    // Send confirmation email
    try {
      if (booking.user?.email) {
        await emailService.sendBookingConfirmation({
          bookingId: booking.id,
          bookingType: 'PROPERTY',
          bookingNumber: booking.id,
          guestName: booking.guestName,
          guestEmail: booking.user.email,
          totalAmount: booking.totalPrice,
          currency: 'PKR',
          bookingDetails: booking,
        });
        console.log(`📧 [EasyPaisa Webhook] Confirmation email sent to ${booking.user.email}`);
      }
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
    }

    // Send confirmation SMS
    try {
      if (booking.guestPhone) {
        await smsService.sendPaymentConfirmation(
          booking.guestPhone,
          booking.totalPrice,
          'PKR',
          booking.id
        );
        console.log(`📱 [EasyPaisa Webhook] Confirmation SMS sent to ${booking.guestPhone}`);
      }
    } catch (smsError) {
      console.error('❌ SMS sending failed:', smsError);
    }
  }

  // Update train booking
  if (trainBooking) {
    await prisma.trainBooking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'CONFIRMED',
        updatedAt: new Date(),
      },
    });

    // Send train booking confirmation SMS
    try {
      if (trainBooking.passengerPhone) {
        await smsService.sendTrainBookingConfirmation(trainBooking.passengerPhone, {
          pnr: trainBooking.pnr,
          trainNumber: trainBooking.trainNumber,
          trainName: trainBooking.trainName,
          fromStation: trainBooking.fromStation,
          toStation: trainBooking.toStation,
          journeyDate: trainBooking.journeyDate,
          departureTime: trainBooking.departureTime || 'N/A',
          passengerName: trainBooking.passengerName,
          totalAmount: trainBooking.fare,
          currency: 'PKR',
        });
        console.log(`📱 [EasyPaisa Webhook] Train confirmation SMS sent`);
      }
    } catch (smsError) {
      console.error('❌ Train SMS sending failed:', smsError);
    }
  }
}

/**
 * Handle failed EasyPaisa payment
 */
async function handleFailedPayment(
  booking: any,
  trainBooking: any,
  transactionId: string,
  status: string
): Promise<void> {
  console.log(`❌ [EasyPaisa Webhook] Payment failed for ${transactionId}: ${status}`);

  // Update regular booking
  if (booking) {
    await prisma.booking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });

    // Notify user of failure
    try {
      if (booking.guestPhone) {
        await smsService.sendNotification(
          booking.guestPhone,
          'Payment Failed',
          `Payment failed for booking ${transactionId}. Please try again or contact support.`
        );
      }
    } catch (error) {
      console.error('❌ Failed payment SMS error:', error);
    }
  }

  // Update train booking
  if (trainBooking) {
    await prisma.trainBooking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });
  }
}

/**
 * Handle cancelled EasyPaisa payment
 */
async function handleCancelledPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`⚠️  [EasyPaisa Webhook] Payment cancelled by user: ${transactionId}`);

  // Update regular booking
  if (booking) {
    await prisma.booking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });
  }

  // Update train booking
  if (trainBooking) {
    await prisma.trainBooking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });
  }
}

/**
 * Handle pending EasyPaisa payment
 */
async function handlePendingPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`⏳ [EasyPaisa Webhook] Payment pending for ${transactionId}`);

  // Update to pending status (usually temporary)
  if (booking) {
    await prisma.booking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'PENDING',
        status: 'PENDING',
        updatedAt: new Date(),
      },
    });
  }

  if (trainBooking) {
    await prisma.trainBooking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'PENDING',
        status: 'WAITING',
        updatedAt: new Date(),
      },
    });
  }
}

/**
 * Handle expired EasyPaisa payment
 */
async function handleExpiredPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`⏰ [EasyPaisa Webhook] Payment expired for ${transactionId}`);

  // Mark as cancelled due to expiry
  if (booking) {
    await prisma.booking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });
  }

  if (trainBooking) {
    await prisma.trainBooking.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    });
  }
}

/**
 * Export webhook handler for use in routes
 */
export default {
  handleEasyPaisaWebhook,
};

/**
 * JazzCash Webhook Handler
 * 
 * Handles payment callbacks from JazzCash payment gateway (Pakistan)
 * 
 * Events Handled:
 * - Payment Success (ResponseCode: 000)
 * - Payment Failed (ResponseCode: 124, 101, etc.)
 * - Payment Cancelled (ResponseCode: 999)
 * 
 * References:
 * - JazzCash Integration Guide: https://sandbox.jazzcash.com.pk/Sandbox
 * - Existing webhook route: backend/src/payments/jazzcash/jazzcash.routes.ts
 */

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { jazzCashService, JazzCashWebhookData } from '../../payments/jazzcash/jazzcash.service';
import { emailService } from '../email/email.service';
import { smsService } from '../sms/sms.service';

/**
 * Mock mode configuration
 * Set to true when JazzCash credentials are not available
 */
const MOCK_MODE = !process.env.JAZZCASH_MERCHANT_ID || !process.env.JAZZCASH_PASSWORD;

/**
 * JazzCash response codes mapping
 */
const RESPONSE_CODES: Record<string, string> = {
  '000': 'SUCCESS',
  '001': 'INSUFFICIENT_BALANCE',
  '101': 'TRANSACTION_DECLINED',
  '124': 'INVALID_CARD',
  '999': 'CANCELLED_BY_USER',
  '200': 'ALREADY_REFUNDED',
  '201': 'REFUND_INITIATED',
};

/**
 * Process JazzCash webhook callback
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export async function handleJazzCashWebhook(req: Request, res: Response): Promise<void> {
  try {
    const webhookData: JazzCashWebhookData = req.body;

    console.log('📥 [JazzCash Webhook] Received callback:', {
      txnRef: webhookData.pp_TxnRefNo,
      responseCode: webhookData.pp_ResponseCode,
      amount: webhookData.pp_Amount,
      billingRefNo: webhookData.pp_BillReference,
      timestamp: new Date().toISOString(),
    });

    // MOCK MODE: Skip signature verification in development
    if (MOCK_MODE) {
      console.warn('⚠️  [JazzCash Webhook] Running in MOCK MODE - signature verification disabled');
      console.log('📋 Mock webhook data:', JSON.stringify(webhookData, null, 2));
      
      res.json({
        success: true,
        message: 'Mock webhook processed (no actual payment)',
        mode: 'MOCK',
      });
      return;
    }

    // PRODUCTION: Verify webhook signature
    const isValid = jazzCashService.verifyWebhook(webhookData);
    
    if (!isValid) {
      console.error('❌ [JazzCash Webhook] Invalid signature - possible fraud attempt!');
      console.error('Webhook data:', webhookData);
      
      res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
      return;
    }

    // Extract transaction details
    const transactionId = webhookData.pp_TxnRefNo;
    const responseCode = webhookData.pp_ResponseCode;
    const responseMessage = webhookData.pp_ResponseMessage || RESPONSE_CODES[responseCode] || 'UNKNOWN';
    const isSuccess = responseCode === '000';
    const isCancelled = responseCode === '999';
    const billingRefNo = webhookData.pp_BillReference;

    console.log(`📊 [JazzCash Webhook] Payment status: ${responseMessage} (${responseCode})`);

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
      console.error(`❌ [JazzCash Webhook] No booking found for transaction: ${transactionId}`);
      
      // Still acknowledge webhook to prevent retries
      res.json({
        success: true,
        message: 'Webhook received but booking not found',
      });
      return;
    }

    // Handle successful payment
    if (isSuccess) {
      await handleSuccessfulPayment(booking, trainBooking, transactionId, webhookData);
    }
    // Handle failed payment
    else if (!isCancelled) {
      await handleFailedPayment(booking, trainBooking, transactionId, responseCode, responseMessage);
    }
    // Handle cancelled payment
    else {
      await handleCancelledPayment(booking, trainBooking, transactionId);
    }

    // Acknowledge webhook
    res.json({
      success: true,
      message: 'Webhook processed successfully',
      transactionId,
      status: responseMessage,
    });

  } catch (error: any) {
    console.error('❌ [JazzCash Webhook] Processing error:', error);
    
    // Always return 200 to prevent webhook retries
    res.status(200).json({
      success: false,
      message: 'Internal error - logged for review',
      error: error.message,
    });
  }
}

/**
 * Handle successful JazzCash payment
 */
async function handleSuccessfulPayment(
  booking: any,
  trainBooking: any,
  transactionId: string,
  webhookData: JazzCashWebhookData
): Promise<void> {
  console.log(`✅ [JazzCash Webhook] Payment successful for ${transactionId}`);

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
        console.log(`📧 [JazzCash Webhook] Confirmation email sent to ${booking.user.email}`);
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
        console.log(`📱 [JazzCash Webhook] Confirmation SMS sent to ${booking.guestPhone}`);
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
        console.log(`📱 [JazzCash Webhook] Train confirmation SMS sent`);
      }
    } catch (smsError) {
      console.error('❌ Train SMS sending failed:', smsError);
    }
  }
}

/**
 * Handle failed JazzCash payment
 */
async function handleFailedPayment(
  booking: any,
  trainBooking: any,
  transactionId: string,
  responseCode: string,
  responseMessage: string
): Promise<void> {
  console.log(`❌ [JazzCash Webhook] Payment failed for ${transactionId}: ${responseMessage}`);

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
          `Booking ${transactionId}: ${responseMessage}. Please try again or contact support.`
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
 * Handle cancelled JazzCash payment
 */
async function handleCancelledPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`⚠️  [JazzCash Webhook] Payment cancelled by user: ${transactionId}`);

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
 * Export webhook handler for use in routes
 */
export default {
  handleJazzCashWebhook,
};

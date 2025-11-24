/**
 * PayFast Webhook Handler (ITN - Instant Transaction Notification)
 * 
 * Handles payment callbacks from PayFast payment gateway (South Africa)
 * 
 * Events Handled:
 * - Payment Complete (payment_status: COMPLETE)
 * - Payment Failed (payment_status: FAILED)
 * - Payment Cancelled (payment_status: CANCELLED)
 * - Payment Pending (payment_status: PENDING)
 * 
 * References:
 * - PayFast ITN Guide: https://developers.payfast.co.za/docs#instant_transaction_notification
 * - Existing service: backend/src/payments/payfast/payfast.service.ts
 */

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { payFastService, PayFastWebhookData } from '../../payments/payfast/payfast.service';
import { emailService } from '../email/email.service';
import { smsService } from '../sms/sms.service';

/**
 * Mock mode configuration
 * Set to true when PayFast credentials are not available
 */
const MOCK_MODE = !process.env.PAYFAST_MERCHANT_ID || !process.env.PAYFAST_MERCHANT_KEY;

/**
 * PayFast payment status mapping
 */
const PAYMENT_STATUS: Record<string, string> = {
  'COMPLETE': 'SUCCESS',
  'FAILED': 'FAILED',
  'PENDING': 'PENDING',
  'CANCELLED': 'CANCELLED',
};

/**
 * Process PayFast ITN (Instant Transaction Notification)
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export async function handlePayFastWebhook(req: Request, res: Response): Promise<void> {
  try {
    const webhookData = req.body as Record<string, string>;

    console.log('📥 [PayFast Webhook] Received ITN:', {
      paymentId: webhookData.pf_payment_id,
      merchantPaymentId: webhookData.m_payment_id,
      status: webhookData.payment_status,
      amountGross: webhookData.amount_gross,
      customStr1: webhookData.custom_str1,
      timestamp: new Date().toISOString(),
    });

    // MOCK MODE: Skip signature verification in development
    if (MOCK_MODE) {
      console.warn('⚠️  [PayFast Webhook] Running in MOCK MODE - signature verification disabled');
      console.log('📋 Mock webhook data:', JSON.stringify(webhookData, null, 2));
      
      res.status(200).send('OK'); // PayFast expects plain text OK response
      return;
    }

    // PRODUCTION: Verify webhook signature
    const webhookDataCopy = { ...webhookData }; // Copy to avoid mutating original
    const isValid = payFastService.verifyWebhook(webhookDataCopy);
    
    if (!isValid) {
      console.error('❌ [PayFast Webhook] Invalid signature - possible fraud attempt!');
      console.error('Webhook data:', webhookData);
      
      res.status(400).send('Invalid signature');
      return;
    }

    // Extract transaction details
    const transactionId = webhookData.custom_str1 || webhookData.m_payment_id;
    const paymentStatus = webhookData.payment_status;
    const statusMessage = PAYMENT_STATUS[paymentStatus] || 'UNKNOWN';
    const amountGross = parseFloat(webhookData.amount_gross || '0');
    const amountFee = parseFloat(webhookData.amount_fee || '0');
    const amountNet = parseFloat(webhookData.amount_net || '0');
    const paymentId = webhookData.pf_payment_id;

    console.log(`📊 [PayFast Webhook] Payment status: ${statusMessage} (${paymentStatus})`);
    console.log(`💰 Amount: R${amountGross} (Fee: R${amountFee}, Net: R${amountNet})`);

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
      console.error(`❌ [PayFast Webhook] No booking found for transaction: ${transactionId}`);
      
      // Still acknowledge webhook to prevent retries
      res.status(200).send('OK');
      return;
    }

    // Handle based on payment status
    switch (paymentStatus) {
      case 'COMPLETE':
        await handleSuccessfulPayment(booking, trainBooking, transactionId, webhookData);
        break;
      
      case 'FAILED':
        await handleFailedPayment(booking, trainBooking, transactionId);
        break;
      
      case 'CANCELLED':
        await handleCancelledPayment(booking, trainBooking, transactionId);
        break;
      
      case 'PENDING':
        await handlePendingPayment(booking, trainBooking, transactionId);
        break;
      
      default:
        console.warn(`⚠️  [PayFast Webhook] Unknown status: ${paymentStatus}`);
    }

    // Acknowledge webhook - PayFast expects plain text "OK" response
    res.status(200).send('OK');

  } catch (error: any) {
    console.error('❌ [PayFast Webhook] Processing error:', error);
    
    // Always return 200 to prevent webhook retries
    res.status(200).send('ERROR');
  }
}

/**
 * Handle successful PayFast payment
 */
async function handleSuccessfulPayment(
  booking: any,
  trainBooking: any,
  transactionId: string,
  webhookData: Record<string, string>
): Promise<void> {
  console.log(`✅ [PayFast Webhook] Payment successful for ${transactionId}`);

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
          currency: 'ZAR',
          bookingDetails: booking,
        });
        console.log(`📧 [PayFast Webhook] Confirmation email sent to ${booking.user.email}`);
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
          'ZAR',
          booking.id
        );
        console.log(`📱 [PayFast Webhook] Confirmation SMS sent to ${booking.guestPhone}`);
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
          currency: 'ZAR',
        });
        console.log(`📱 [PayFast Webhook] Train confirmation SMS sent`);
      }
    } catch (smsError) {
      console.error('❌ Train SMS sending failed:', smsError);
    }
  }
}

/**
 * Handle failed PayFast payment
 */
async function handleFailedPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`❌ [PayFast Webhook] Payment failed for ${transactionId}`);

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
 * Handle cancelled PayFast payment
 */
async function handleCancelledPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`⚠️  [PayFast Webhook] Payment cancelled by user: ${transactionId}`);

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
 * Handle pending PayFast payment
 */
async function handlePendingPayment(
  booking: any,
  trainBooking: any,
  transactionId: string
): Promise<void> {
  console.log(`⏳ [PayFast Webhook] Payment pending for ${transactionId}`);

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
 * Export webhook handler for use in routes
 */
export default {
  handlePayFastWebhook,
};

/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe webhook events for payment confirmations,
 * failures, refunds, and disputes.
 * 
 * Webhook Events:
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * - charge.refunded
 * - charge.dispute.created
 */

import { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../../lib/prisma';
import { emailService } from '../email/email.service';
import { smsService } from '../sms/sms.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2024-04-10',
});

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  // For mock mode
  if (!STRIPE_WEBHOOK_SECRET || STRIPE_WEBHOOK_SECRET === 'whsec_mock') {
    console.log('⚠️  Stripe webhook in MOCK mode - no signature verification');
    return handleMockStripeWebhook(req, res);
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('✅ Stripe webhook received:', event.type);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      case 'charge.dispute.created':
        await handleDispute(event.data.object as Stripe.Dispute);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log('💰 Payment succeeded:', paymentIntent.id);

  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) {
    console.error('No bookingId in metadata');
    return;
  }

  // Update booking status
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentStatus: 'COMPLETED',
      status: 'CONFIRMED',
      paidAmount: paymentIntent.amount / 100, // Convert from cents
    },
  });

  console.log('✅ Booking confirmed:', booking.bookingNumber);

  // Send confirmation email
  emailService.sendBookingConfirmation({
    bookingId: booking.id,
    bookingType: 'PROPERTY',
    bookingNumber: booking.bookingNumber,
    guestName: booking.guestName,
    guestEmail: booking.guestEmail,
    totalAmount: booking.paidAmount,
    currency: booking.currency,
    bookingDetails: booking,
  }).catch((err: any) => console.error('Email failed:', err));

  // Send confirmation SMS
  if (booking.guestPhone) {
    smsService.sendPaymentConfirmation(
      booking.guestPhone,
      booking.paidAmount,
      booking.currency,
      paymentIntent.id
    ).catch((err: any) => console.error('SMS failed:', err));
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('❌ Payment failed:', paymentIntent.id);

  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentStatus: 'FAILED',
      status: 'PENDING',
    },
  });

  console.log('⚠️  Booking payment failed, status updated');
}

async function handleRefund(charge: Stripe.Charge) {
  console.log('💸 Refund processed:', charge.id);

  const paymentIntentId = charge.payment_intent as string;
  
  const booking = await prisma.booking.findFirst({
    where: {
      metadata: {
        path: ['paymentIntentId'],
        equals: paymentIntentId,
      },
    },
  });

  if (booking) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'REFUNDED',
      },
    });

    console.log('✅ Booking refunded:', booking.bookingNumber);
  }
}

async function handleDispute(dispute: Stripe.Dispute) {
  console.log('⚠️  Dispute created:', dispute.id);
  
  // Log dispute for manual review
  console.error('DISPUTE ALERT:', {
    id: dispute.id,
    amount: dispute.amount,
    reason: dispute.reason,
    status: dispute.status,
  });

  // TODO: Send alert to admin
}

// Mock webhook handler for development
async function handleMockStripeWebhook(req: Request, res: Response) {
  const event = req.body;

  console.log('📧 [MOCK STRIPE WEBHOOK]', event.type || 'payment_intent.succeeded');
  console.log('📧 Event data:', JSON.stringify(event, null, 2));

  res.json({ 
    received: true, 
    mock: true,
    message: 'Webhook processed in mock mode',
  });
}

/**
 * Export webhook handler for use in routes
 */
const stripeWebhook = {
  handleStripeWebhook,
};

export default stripeWebhook;

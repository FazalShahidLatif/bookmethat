/**
 * Centralized Webhook Routes
 * 
 * Consolidates all payment gateway webhook endpoints
 * 
 * Supported Payment Gateways:
 * - Stripe (International)
 * - JazzCash (Pakistan)
 * - EasyPaisa (Pakistan)
 * - PayFast (South Africa)
 */

import express from 'express';
import stripeWebhook from '../services/webhooks/stripe.webhook';
import jazzCashWebhook from '../services/webhooks/jazzcash.webhook';
import easyPaisaWebhook from '../services/webhooks/easypaisa.webhook';
import payFastWebhook from '../services/webhooks/payfast.webhook';

const router = express.Router();

/**
 * Stripe Webhook Endpoint
 * 
 * POST /api/v1/webhooks/stripe
 * 
 * Handles Stripe webhook events:
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * - charge.refunded
 * - charge.dispute.created
 * 
 * IMPORTANT: This endpoint uses raw body parsing (configured in server.ts)
 * to verify Stripe webhook signatures
 */
router.post('/stripe', stripeWebhook.handleStripeWebhook);

/**
 * JazzCash Webhook Endpoint
 * 
 * POST /api/v1/webhooks/jazzcash
 * 
 * Handles JazzCash payment callbacks:
 * - Payment Success (ResponseCode: 000)
 * - Payment Failed (ResponseCode: 124, 101, etc.)
 * - Payment Cancelled (ResponseCode: 999)
 * 
 * Verifies pp_SecureHash signature for security
 */
router.post('/jazzcash', jazzCashWebhook.handleJazzCashWebhook);

/**
 * EasyPaisa Webhook Endpoint
 * 
 * POST /api/v1/webhooks/easypaisa
 * 
 * Handles EasyPaisa payment notifications:
 * - Payment Success (status: 0000 or success)
 * - Payment Failed (status: failed)
 * - Payment Cancelled (status: cancelled)
 * - Payment Pending (status: pending)
 * 
 * Verifies HMAC-SHA256 signature for security
 */
router.post('/easypaisa', easyPaisaWebhook.handleEasyPaisaWebhook);

/**
 * PayFast Webhook Endpoint (ITN)
 * 
 * POST /api/v1/webhooks/payfast
 * 
 * Handles PayFast Instant Transaction Notifications:
 * - Payment Complete (payment_status: COMPLETE)
 * - Payment Failed (payment_status: FAILED)
 * - Payment Cancelled (payment_status: CANCELLED)
 * - Payment Pending (payment_status: PENDING)
 * 
 * Verifies MD5 signature for security
 * Returns plain text "OK" response as required by PayFast
 */
router.post('/payfast', payFastWebhook.handlePayFastWebhook);

/**
 * Health check endpoint for webhook service
 * 
 * GET /api/v1/webhooks/health
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Payment Webhooks',
    webhooks: {
      stripe: '/api/v1/webhooks/stripe',
      jazzcash: '/api/v1/webhooks/jazzcash',
      easypaisa: '/api/v1/webhooks/easypaisa',
      payfast: '/api/v1/webhooks/payfast',
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;

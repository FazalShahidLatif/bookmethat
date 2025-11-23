import express, { Request, Response } from 'express';
import { jazzCashService, JazzCashWebhookData } from './jazzcash.service';
import { prisma } from '../../lib/prisma';
import {
  requireAuth,
  requireInternalApiKey,
  verifyWebhookSource,
  sanitizeInput,
  validatePaymentAmount,
  paymentRateLimit,
  detectSuspiciousActivity,
} from '../../middleware/advanced-security';

const router = express.Router();

/**
 * JazzCash webhook endpoint
 * Receives payment confirmation from JazzCash
 * 
 * POST /api/v1/payments/jazzcash/webhook
 */
router.post('/webhook', verifyWebhookSource, async (req: Request, res: Response) => {
  try {
    const webhookData: JazzCashWebhookData = req.body;

    console.log('📥 [JazzCash] Webhook received:', {
      txnRef: webhookData.pp_TxnRefNo,
      responseCode: webhookData.pp_ResponseCode,
      amount: webhookData.pp_Amount,
    });

    // CRITICAL: Verify webhook signature
    const isValid = jazzCashService.verifyWebhook(webhookData);
    
    if (!isValid) {
      console.error('❌ [JazzCash] Invalid webhook signature!');
      return res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    // Extract transaction details
    const transactionId = webhookData.pp_TxnRefNo;
    const responseCode = webhookData.pp_ResponseCode;
    const isSuccess = jazzCashService.isPaymentSuccessful(responseCode);
    const paymentStatus = jazzCashService.getPaymentStatus(responseCode);

    // Find booking by transaction ID
    const booking = await prisma.booking.findFirst({
      where: { id: transactionId },
    });

    if (!booking) {
      // Try finding train booking
      const trainBooking = await prisma.trainBooking.findFirst({
        where: { id: transactionId },
      });

      if (trainBooking) {
        // Update train booking status
        await prisma.trainBooking.update({
          where: { id: transactionId },
          data: {
            paymentStatus: isSuccess ? 'COMPLETED' : 'FAILED',
            status: isSuccess ? 'CONFIRMED' : 'CANCELLED',
          },
        });

        console.log(`✅ [JazzCash] Train booking ${transactionId} updated: ${paymentStatus}`);
      } else {
        console.error(`❌ [JazzCash] Booking not found: ${transactionId}`);
      }
    } else {
      // Update booking status
      await prisma.booking.update({
        where: { id: transactionId },
        data: {
          paymentStatus: isSuccess ? 'COMPLETED' : 'FAILED',
          status: isSuccess ? 'CONFIRMED' : 'CANCELLED',
        },
      });

      console.log(`✅ [JazzCash] Booking ${transactionId} updated: ${paymentStatus}`);
    }

    // Respond to JazzCash
    res.json({
      success: true,
      message: 'Webhook processed',
    });

  } catch (error: any) {
    console.error('❌ [JazzCash] Webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal error',
    });
  }
});

/**
 * JazzCash return URL handler
 * User is redirected here after completing payment
 * 
 * GET /api/v1/payments/jazzcash/callback
 */
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { pp_TxnRefNo, pp_ResponseCode } = req.query;

    const transactionId = pp_TxnRefNo as string;
    const responseCode = pp_ResponseCode as string;
    const isSuccess = jazzCashService.isPaymentSuccessful(responseCode);
    const paymentStatus = jazzCashService.getPaymentStatus(responseCode);

    // Redirect to frontend with payment status
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/payment/${isSuccess ? 'success' : 'failed'}?ref=${transactionId}&status=${paymentStatus}`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ [JazzCash] Callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/payment/failed?error=callback_error`);
  }
});

/**
 * Initiate JazzCash payment
 * INTERNAL USE ONLY - Called by booking services, not directly by users
 * 
 * POST /api/v1/payments/jazzcash/initiate
 * Body: { amount, transactionId, customerEmail, customerPhone, description }
 * 
 * Security: Restricted to internal API calls only (requires internal API key)
 */
router.post('/initiate',
  requireInternalApiKey,
  sanitizeInput,
  validatePaymentAmount,
  async (req: Request, res: Response) => {
  try {
    const { amount, transactionId, customerEmail, customerPhone, description } = req.body;

    // Validate input
    if (!amount || !transactionId || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Initiate payment
    const result = await jazzCashService.initiatePayment({
      amount,
      transactionId,
      customerEmail,
      customerPhone,
      description: description || 'BookMeThat Payment',
    });

    res.json(result);

  } catch (error: any) {
    console.error('❌ [JazzCash] Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment initiation failed',
    });
  }
});

export default router;

import express, { Request, Response } from 'express';
import { payFastService, PayFastWebhookData } from './payfast.service';
import { prisma } from '../../lib/prisma';

const router = express.Router();

/**
 * PayFast webhook endpoint (ITN - Instant Transaction Notification)
 * Receives payment confirmation from PayFast
 * 
 * POST /api/v1/payments/payfast/webhook
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const webhookData: Record<string, string> = req.body;

    console.log('📥 [PayFast] Webhook received:', {
      paymentId: webhookData.pf_payment_id,
      status: webhookData.payment_status,
      amount: webhookData.amount_gross,
    });

    // CRITICAL: Verify webhook signature
    const isValid = payFastService.verifyWebhook({ ...webhookData });
    
    if (!isValid) {
      console.error('❌ [PayFast] Invalid webhook signature!');
      return res.status(400).send('Invalid signature');
    }

    // Extract transaction details
    const transactionId = webhookData.custom_str1 || webhookData.m_payment_id;
    const paymentStatus = webhookData.payment_status;
    const isSuccess = payFastService.isPaymentSuccessful(paymentStatus);
    const status = payFastService.getPaymentStatus(paymentStatus);

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
            paymentStatus: isSuccess ? 'PAID' : 'FAILED',
            status: isSuccess ? 'CONFIRMED' : 'CANCELLED',
          },
        });

        console.log(`✅ [PayFast] Train booking ${transactionId} updated: ${status}`);
      } else {
        console.error(`❌ [PayFast] Booking not found: ${transactionId}`);
      }
    } else {
      // Update booking status
      await prisma.booking.update({
        where: { id: transactionId },
        data: {
          paymentStatus: isSuccess ? 'PAID' : 'FAILED',
          status: isSuccess ? 'CONFIRMED' : 'CANCELLED',
        },
      });

      console.log(`✅ [PayFast] Booking ${transactionId} updated: ${status}`);
    }

    // PayFast expects a 200 OK response
    res.status(200).send('OK');

  } catch (error: any) {
    console.error('❌ [PayFast] Webhook processing error:', error);
    res.status(500).send('Internal error');
  }
});

/**
 * PayFast return URL handler (success)
 * User is redirected here after completing payment
 * 
 * GET /api/v1/payments/payfast/success
 */
router.get('/success', async (req: Request, res: Response) => {
  try {
    const transactionId = req.query.m_payment_id as string || req.query.ref as string;

    console.log('✅ [PayFast] Payment successful, redirecting user:', transactionId);

    // Redirect to frontend success page
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/payment/success?ref=${transactionId}`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ [PayFast] Success redirect error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/payment/failed?error=redirect_error`);
  }
});

/**
 * PayFast cancel URL handler
 * User is redirected here if they cancel payment
 * 
 * GET /api/v1/payments/payfast/cancel
 */
router.get('/cancel', async (req: Request, res: Response) => {
  try {
    const transactionId = req.query.m_payment_id as string || req.query.ref as string;

    console.log('❌ [PayFast] Payment cancelled by user:', transactionId);

    // Redirect to frontend cancel page
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/payment/cancelled?ref=${transactionId}`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ [PayFast] Cancel redirect error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/payment/failed?error=redirect_error`);
  }
});

/**
 * Initiate PayFast payment (for testing)
 * Requires internal API key for security
 * 
 * POST /api/v1/payments/payfast/initiate
 * Body: { amount, transactionId, customerEmail, customerName, description }
 */
router.post('/initiate', async (req: Request, res: Response) => {
  try {
    // Verify internal API key
    const apiKey = req.headers['x-internal-api-key'];
    const expectedKey = process.env.INTERNAL_API_KEY;

    if (!apiKey || apiKey !== expectedKey) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid API key',
      });
    }

    const { amount, transactionId, customerEmail, customerName, description, itemName } = req.body;

    // Validate input
    if (!amount || !transactionId || !customerEmail || !customerName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, transactionId, customerEmail, customerName',
      });
    }

    // Initiate payment
    const result = await payFastService.initiatePayment({
      amount,
      transactionId,
      customerEmail,
      customerName,
      description: description || 'BookMeThat Payment',
      itemName: itemName || 'Booking',
    });

    res.json(result);

  } catch (error: any) {
    console.error('❌ [PayFast] Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment initiation failed',
    });
  }
});

export default router;

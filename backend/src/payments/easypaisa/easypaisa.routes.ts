import express, { Request, Response } from 'express';
import { easyPaisaService, EasyPaisaWebhookData } from './easypaisa.service';
import { prisma } from '../../lib/prisma';

const router = express.Router();

/**
 * EasyPaisa webhook endpoint
 * Receives payment confirmation from EasyPaisa
 * 
 * POST /api/v1/payments/easypaisa/webhook
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const webhookData: EasyPaisaWebhookData = req.body;

    console.log('📥 [EasyPaisa] Webhook received:', {
      orderId: webhookData.orderId,
      status: webhookData.status,
      amount: webhookData.amount,
    });

    // CRITICAL: Verify webhook signature
    const isValid = easyPaisaService.verifyWebhook(webhookData);
    
    if (!isValid) {
      console.error('❌ [EasyPaisa] Invalid webhook signature!');
      return res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    // Extract transaction details
    const transactionId = webhookData.transactionId;
    const status = webhookData.status;
    const isSuccess = easyPaisaService.isPaymentSuccessful(status);
    const paymentStatus = easyPaisaService.getPaymentStatus(status);

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

        console.log(`✅ [EasyPaisa] Train booking ${transactionId} updated: ${paymentStatus}`);
      } else {
        console.error(`❌ [EasyPaisa] Booking not found: ${transactionId}`);
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

      console.log(`✅ [EasyPaisa] Booking ${transactionId} updated: ${paymentStatus}`);
    }

    // Respond to EasyPaisa
    res.json({
      success: true,
      message: 'Webhook processed',
    });

  } catch (error: any) {
    console.error('❌ [EasyPaisa] Webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal error',
    });
  }
});

/**
 * EasyPaisa return URL handler
 * User is redirected here after completing payment
 * 
 * GET /api/v1/payments/easypaisa/callback
 */
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.query;

    const transactionId = orderId as string;
    const paymentStatus = status as string;
    const isSuccess = easyPaisaService.isPaymentSuccessful(paymentStatus);
    const statusMessage = easyPaisaService.getPaymentStatus(paymentStatus);

    // Redirect to frontend with payment status
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/payment/${isSuccess ? 'success' : 'failed'}?ref=${transactionId}&status=${statusMessage}`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ [EasyPaisa] Callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/payment/failed?error=callback_error`);
  }
});

/**
 * Initiate EasyPaisa payment (for testing)
 * Requires internal API key for security
 * 
 * POST /api/v1/payments/easypaisa/initiate
 * Body: { amount, transactionId, customerEmail, customerPhone, description }
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

    const { amount, transactionId, customerEmail, customerPhone, description } = req.body;

    // Validate input
    if (!amount || !transactionId || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, transactionId, customerEmail, customerPhone',
      });
    }

    // Initiate payment
    const result = await easyPaisaService.initiatePayment({
      amount,
      transactionId,
      customerEmail,
      customerPhone,
      description: description || 'BookMeThat Payment',
    });

    res.json(result);

  } catch (error: any) {
    console.error('❌ [EasyPaisa] Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment initiation failed',
    });
  }
});

export default router;

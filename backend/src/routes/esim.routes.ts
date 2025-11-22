/**
 * eSIM Routes
 * 
 * GET /api/v1/esim/plans - List available eSIM plans
 * POST /api/v1/esim/purchase - Purchase an eSIM
 * GET /api/v1/esim/:id - Get eSIM details with QR code
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticateToken } from './auth.routes';
import { airaloService } from '../services/mock/airalo.service';
import { stripeService } from '../services/mock/stripe.service';
import { prisma } from '../lib/prisma';

const router = Router();

// Validation schemas
const purchaseEsimSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  paymentMethod: z.string().default('card'),
});

/**
 * GET /api/v1/esim/plans
 * List available eSIM plans with optional filters
 */
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const country = req.query.country as string;
    const minData = req.query.minData ? parseInt(req.query.minData as string) : undefined;
    
    const plans = await airaloService.listPlans({
      country,
      minData,
    });
    
    res.json({
      success: true,
      data: {
        plans,
        total: plans.length,
      },
    });
  } catch (error) {
    console.error('List eSIM plans error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve eSIM plans',
    });
  }
});

/**
 * GET /api/v1/esim/plans/:id
 * Get specific eSIM plan details
 */
router.get('/plans/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const plan = await airaloService.getPlan(id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'eSIM plan not found',
      });
    }
    
    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error('Get eSIM plan error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve eSIM plan',
    });
  }
});

/**
 * POST /api/v1/esim/purchase
 * Purchase an eSIM plan
 */
router.post('/purchase', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    
    // Validate input
    const data = purchaseEsimSchema.parse(req.body);
    
    // Get plan details
    const plan = await airaloService.getPlan(data.planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'eSIM plan not found',
      });
    }
    
    // Process payment
    const paymentIntent = await stripeService.createPaymentIntent({
      amount: Math.round(plan.price * 100), // Convert to cents
      currency: plan.currency.toLowerCase(),
      metadata: {
        userId,
        planId: plan.id,
        type: 'esim',
      },
    });
    
    // Purchase eSIM from provider
    const esimData = await airaloService.purchaseEsim({
      planId: data.planId,
    });
    
    // Create order record in database
    const order = await prisma.esimOrder.create({
      data: {
        userId,
        planId: plan.id,
        planName: plan.title,
        country: plan.country,
        dataAmount: plan.dataAmount,
        validityDays: plan.validityDays,
        price: plan.price,
        currency: plan.currency,
        status: 'ACTIVE',
        iccid: esimData.iccid,
        qrCode: esimData.qrCode,
        activationCode: esimData.activationCode,
        paymentId: paymentIntent.id,
        isMock: true,
        activatedAt: new Date(),
        expiresAt: esimData.expiresAt,
      },
    });
    
    res.status(201).json({
      success: true,
      data: {
        order,
        payment: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
      },
      message: 'eSIM purchased successfully',
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('eSIM purchase error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to purchase eSIM',
    });
  }
});

/**
 * GET /api/v1/esim
 * List user's eSIM orders
 */
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    // Build where clause
    const where: any = { userId };
    if (status) where.status = status;
    
    // Get total count
    const total = await prisma.esimOrder.count({ where });
    
    // Get paginated orders
    const userOrders = await prisma.esimOrder.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
    
    res.json({
      success: true,
      data: {
        orders: userOrders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('List eSIM orders error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve eSIM orders',
    });
  }
});

/**
 * GET /api/v1/esim/:id
 * Get eSIM order details with QR code
 */
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    
    const order = await prisma.esimOrder.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'eSIM order not found',
      });
    }
    
    // Calculate data usage (mock)
    const dataUsed = order.status === 'ACTIVE' 
      ? Math.floor(Math.random() * order.dataAmount * 0.5) // 0-50% used
      : 0;
    
    const dataRemaining = order.dataAmount - dataUsed;
    
    res.json({
      success: true,
      data: {
        ...order,
        usage: {
          dataUsed,
          dataRemaining,
          dataTotal: order.dataAmount,
          percentUsed: Math.round((dataUsed / order.dataAmount) * 100),
        },
        activation: {
          iccid: order.iccid,
          qrCode: order.qrCode,
          activationCode: order.activationCode,
          instructions: [
            'Go to Settings → Cellular/Mobile Data',
            'Tap "Add eSIM"',
            'Scan the QR code below',
            'Follow on-screen instructions to activate',
          ],
        },
      },
    });
  } catch (error) {
    console.error('Get eSIM order error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve eSIM order',
    });
  }
});

/**
 * POST /api/v1/esim/:id/top-up
 * Top up eSIM data (for future implementation)
 */
router.post('/:id/top-up', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { dataAmount } = req.body;
    
    const order = await prisma.esimOrder.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'eSIM order not found',
      });
    }
    
    if (order.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        error: 'Can only top up active eSIMs',
      });
    }
    
    // This is a placeholder - actual implementation would call provider API
    res.json({
      success: true,
      message: 'eSIM top-up feature coming soon',
      data: {
        orderId: id,
        requestedData: dataAmount,
      },
    });
  } catch (error) {
    console.error('eSIM top-up error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to top up eSIM',
    });
  }
});

export default router;

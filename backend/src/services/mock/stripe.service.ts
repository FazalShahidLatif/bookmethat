/**
 * Mock Stripe Payment Service
 * 
 * Simulates Stripe API behavior for development/testing.
 * Returns realistic mock data without requiring Stripe API keys.
 * 
 * When ready to use real Stripe:
 * 1. Add STRIPE_SECRET_KEY to .env
 * 2. Set USE_MOCK_STRIPE=false
 * 3. Service automatically switches to real Stripe SDK
 */

import Stripe from 'stripe';

const USE_MOCK = process.env.USE_MOCK_STRIPE !== 'false';

interface PaymentIntentParams {
  amount: number;
  currency: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

interface RefundParams {
  paymentIntentId: string;
  amount?: number;
  reason?: string;
}

class MockStripeService {
  private stripe: Stripe | null = null;

  constructor() {
    if (!USE_MOCK && process.env.STRIPE_SECRET_KEY) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-04-10',
      });
    }
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(params: PaymentIntentParams) {
    if (USE_MOCK) {
      // Mock response
      return {
        id: `pi_mock_${Date.now()}`,
        object: 'payment_intent',
        amount: params.amount,
        currency: params.currency,
        status: 'succeeded',
        client_secret: `pi_mock_${Date.now()}_secret_mock`,
        customer: params.customerId || null,
        metadata: params.metadata || {},
        created: Math.floor(Date.now() / 1000),
        charges: {
          data: [
            {
              id: `ch_mock_${Date.now()}`,
              amount: params.amount,
              status: 'succeeded',
              payment_method_details: {
                card: {
                  brand: 'visa',
                  last4: '4242',
                  exp_month: 12,
                  exp_year: 2026,
                },
              },
            },
          ],
        },
      };
    }

    // Real Stripe API call
    if (!this.stripe) {
      throw new Error('Stripe not initialized. Set STRIPE_SECRET_KEY in .env');
    }

    return await this.stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency,
      customer: params.customerId,
      metadata: params.metadata,
    });
  }

  /**
   * Capture a payment intent (for manual capture flow)
   */
  async capturePaymentIntent(paymentIntentId: string) {
    if (USE_MOCK) {
      return {
        id: paymentIntentId,
        status: 'succeeded',
        amount_received: 10000,
      };
    }

    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    return await this.stripe.paymentIntents.capture(paymentIntentId);
  }

  /**
   * Create a refund
   */
  async createRefund(params: RefundParams) {
    if (USE_MOCK) {
      return {
        id: `re_mock_${Date.now()}`,
        object: 'refund',
        amount: params.amount || 0,
        payment_intent: params.paymentIntentId,
        status: 'succeeded',
        reason: params.reason || 'requested_by_customer',
        created: Math.floor(Date.now() / 1000),
      };
    }

    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    return await this.stripe.refunds.create({
      payment_intent: params.paymentIntentId,
      amount: params.amount,
      reason: params.reason as any,
    });
  }

  /**
   * Get payment intent details
   */
  async getPaymentIntent(paymentIntentId: string) {
    if (USE_MOCK) {
      return {
        id: paymentIntentId,
        status: 'succeeded',
        amount: 10000,
        currency: 'usd',
      };
    }

    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    return await this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  /**
   * Check if using mock mode
   */
  isMockMode(): boolean {
    return USE_MOCK;
  }
}

export const stripeService = new MockStripeService();

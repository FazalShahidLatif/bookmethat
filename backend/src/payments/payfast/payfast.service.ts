import crypto from 'crypto';

/**
 * PayFast Payment Gateway Service
 * Handles payment initiation and webhook verification for South African payments
 * 
 * Documentation: https://developers.payfast.co.za/docs
 */

export interface PayFastPaymentParams {
  amount: number; // In South African Rand (ZAR)
  transactionId: string; // Unique booking reference
  customerEmail: string;
  customerName: string;
  description: string;
  itemName?: string;
}

export interface PayFastPaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  errorMessage?: string;
}

export interface PayFastWebhookData {
  m_payment_id: string;
  pf_payment_id: string;
  payment_status: string;
  item_name: string;
  item_description: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  custom_str1: string; // Our transaction ID
  signature: string;
}

export class PayFastService {
  private readonly merchantId: string;
  private readonly merchantKey: string;
  private readonly passphrase: string;
  private readonly returnUrl: string;
  private readonly cancelUrl: string;
  private readonly notifyUrl: string;
  private readonly apiUrl: string;

  constructor() {
    this.merchantId = process.env.PAYFAST_MERCHANT_ID || '';
    this.merchantKey = process.env.PAYFAST_MERCHANT_KEY || '';
    this.passphrase = process.env.PAYFAST_PASSPHRASE || '';
    this.returnUrl = process.env.PAYFAST_RETURN_URL || 'https://bookmethat.com/payment/payfast/success';
    this.cancelUrl = process.env.PAYFAST_CANCEL_URL || 'https://bookmethat.com/payment/payfast/cancel';
    this.notifyUrl = process.env.PAYFAST_NOTIFY_URL || 'https://api.bookmethat.com/api/v1/payments/payfast/webhook';
    
    // Use sandbox for development, production for live
    this.apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://www.payfast.co.za/eng/process'
      : 'https://sandbox.payfast.co.za/eng/process';
  }

  /**
   * Generate PayFast signature for request verification
   */
  private generateSignature(data: Record<string, string>): string {
    // Sort keys alphabetically
    const sortedKeys = Object.keys(data).sort();
    
    // Build parameter string
    const paramString = sortedKeys
      .map(key => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}`)
      .join('&');
    
    // Add passphrase if configured
    const signatureString = this.passphrase 
      ? `${paramString}&passphrase=${encodeURIComponent(this.passphrase)}`
      : paramString;
    
    // Generate MD5 hash
    return crypto.createHash('md5').update(signatureString).digest('hex');
  }

  /**
   * Verify PayFast webhook signature
   * CRITICAL: Always verify signature to prevent fraud
   */
  verifyWebhook(data: Record<string, string>): boolean {
    const signature = data.signature;
    delete data.signature; // Remove signature from data before verification
    
    const generatedSignature = this.generateSignature(data);
    
    const isValid = signature === generatedSignature;
    
    if (!isValid) {
      console.error('❌ [PayFast] Signature mismatch!');
      console.error('Expected:', generatedSignature);
      console.error('Received:', signature);
    }
    
    return isValid;
  }

  /**
   * Check if payment was successful
   */
  isPaymentSuccessful(status: string): boolean {
    return status === 'COMPLETE';
  }

  /**
   * Get human-readable payment status
   */
  getPaymentStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'COMPLETE': 'Payment successful',
      'FAILED': 'Payment failed',
      'PENDING': 'Payment pending',
      'CANCELLED': 'Payment cancelled',
    };
    
    return statusMap[status] || 'Unknown status';
  }

  /**
   * Initiate PayFast payment
   * Returns payment URL for user redirect
   */
  async initiatePayment(params: PayFastPaymentParams): Promise<PayFastPaymentResponse> {
    try {
      console.log('💳 [PayFast] Initiating payment:', {
        amount: params.amount,
        transactionId: params.transactionId,
      });

      // Check if using mock mode
      const useMock = process.env.USE_MOCK_PAYFAST === 'true' || !this.merchantId;
      
      if (useMock) {
        console.log('🧪 [PayFast] Using MOCK mode (no real API call)');
        
        // Return mock successful payment
        return {
          success: true,
          transactionId: params.transactionId,
          paymentUrl: `https://sandbox.payfast.co.za/eng/process?mock=true&ref=${params.transactionId}`,
        };
      }

      // Build PayFast request data
      const requestData: Record<string, string> = {
        // Merchant details
        merchant_id: this.merchantId,
        merchant_key: this.merchantKey,
        
        // URLs
        return_url: this.returnUrl,
        cancel_url: this.cancelUrl,
        notify_url: this.notifyUrl,
        
        // Buyer details
        name_first: params.customerName.split(' ')[0] || 'Customer',
        name_last: params.customerName.split(' ').slice(1).join(' ') || 'User',
        email_address: params.customerEmail,
        
        // Transaction details
        m_payment_id: params.transactionId,
        amount: params.amount.toFixed(2),
        item_name: params.itemName || 'BookMeThat Booking',
        item_description: params.description,
        
        // Custom fields (to store our transaction ID)
        custom_str1: params.transactionId,
      };

      // Generate signature
      const signature = this.generateSignature(requestData);
      requestData.signature = signature;

      // Build payment URL with query parameters
      const queryString = Object.keys(requestData)
        .map(key => `${key}=${encodeURIComponent(requestData[key])}`)
        .join('&');
      
      const paymentUrl = `${this.apiUrl}?${queryString}`;

      console.log('✅ [PayFast] Payment URL generated');

      return {
        success: true,
        transactionId: params.transactionId,
        paymentUrl,
      };

    } catch (error: any) {
      console.error('❌ [PayFast] Payment initiation error:', error);
      return {
        success: false,
        transactionId: params.transactionId,
        errorMessage: error.message || 'Network error',
      };
    }
  }

  /**
   * Check payment status with PayFast
   */
  async checkPaymentStatus(paymentId: string): Promise<{
    status: string;
    amount: number;
    transactionId: string;
  }> {
    try {
      // In production, query PayFast API for payment status
      // For now, return mock data
      console.log('🔍 [PayFast] Checking payment status:', paymentId);
      
      return {
        status: 'COMPLETE',
        amount: 0,
        transactionId: paymentId,
      };
    } catch (error: any) {
      console.error('❌ [PayFast] Status check error:', error);
      throw new Error('Failed to check payment status');
    }
  }
}

// Export singleton instance
export const payFastService = new PayFastService();

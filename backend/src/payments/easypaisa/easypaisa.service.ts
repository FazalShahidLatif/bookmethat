import crypto from 'crypto';

/**
 * EasyPaisa Payment Gateway Service
 * Handles payment initiation and webhook verification for Pakistan mobile wallet
 * 
 * Documentation: https://easypay.easypaisa.com.pk/developers
 */

export interface EasyPaisaPaymentParams {
  amount: number; // In Pakistani Rupees (PKR)
  transactionId: string; // Unique booking reference
  customerEmail: string;
  customerPhone: string;
  description: string;
}

export interface EasyPaisaPaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  errorMessage?: string;
  orderId?: string;
}

export interface EasyPaisaWebhookData {
  orderId: string;
  transactionId: string;
  status: string;
  amount: string;
  paymentMethod: string;
  paymentDate: string;
  signature: string;
}

export class EasyPaisaService {
  private readonly storeId: string;
  private readonly hashKey: string;
  private readonly returnUrl: string;
  private readonly apiUrl: string;

  constructor() {
    this.storeId = process.env.EASYPAISA_STORE_ID || '';
    this.hashKey = process.env.EASYPAISA_HASH_KEY || '';
    this.returnUrl = process.env.EASYPAISA_RETURN_URL || 'https://bookmethat.com/payment/easypaisa/callback';
    
    // Use sandbox for development, production for live
    this.apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://easypay.easypaisa.com.pk/easypay/Index.jsf'
      : 'https://easypaystg.easypaisa.com.pk/easypay/Index.jsf';
  }

  /**
   * Generate EasyPaisa signature for request verification
   */
  private generateSignature(data: Record<string, string>): string {
    // Sort keys alphabetically
    const sortedKeys = Object.keys(data).sort();
    
    // Build parameter string
    const paramString = sortedKeys
      .map(key => `${key}=${data[key]}`)
      .join('&');
    
    // Generate HMAC-SHA256 hash
    return crypto
      .createHmac('sha256', this.hashKey)
      .update(paramString)
      .digest('hex')
      .toUpperCase();
  }

  /**
   * Verify EasyPaisa webhook signature
   * CRITICAL: Always verify signature to prevent fraud
   */
  verifyWebhook(data: EasyPaisaWebhookData): boolean {
    const receivedSignature = data.signature;
    
    // Remove signature from data before verification
    const verifyData: Record<string, string> = {
      orderId: data.orderId,
      transactionId: data.transactionId,
      status: data.status,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      paymentDate: data.paymentDate,
    };
    
    const generatedSignature = this.generateSignature(verifyData);
    
    const isValid = receivedSignature === generatedSignature;
    
    if (!isValid) {
      console.error('❌ [EasyPaisa] Signature mismatch!');
      console.error('Expected:', generatedSignature);
      console.error('Received:', receivedSignature);
    }
    
    return isValid;
  }

  /**
   * Check if payment was successful
   */
  isPaymentSuccessful(status: string): boolean {
    return status.toLowerCase() === 'success' || status === '0000';
  }

  /**
   * Get human-readable payment status
   */
  getPaymentStatus(status: string): string {
    const statusMap: Record<string, string> = {
      '0000': 'Payment successful',
      'success': 'Payment successful',
      'failed': 'Payment failed',
      'pending': 'Payment pending',
      'cancelled': 'Payment cancelled',
    };
    
    return statusMap[status.toLowerCase()] || 'Unknown status';
  }

  /**
   * Initiate EasyPaisa payment
   * Returns payment URL for user redirect
   */
  async initiatePayment(params: EasyPaisaPaymentParams): Promise<EasyPaisaPaymentResponse> {
    try {
      console.log('💳 [EasyPaisa] Initiating payment:', {
        amount: params.amount,
        transactionId: params.transactionId,
      });

      // Check if using mock mode
      const useMock = process.env.USE_MOCK_EASYPAISA === 'true' || !this.storeId;
      
      if (useMock) {
        console.log('🧪 [EasyPaisa] Using MOCK mode (no real API call)');
        
        // Return mock successful payment
        return {
          success: true,
          transactionId: params.transactionId,
          orderId: `EP${Date.now()}`,
          paymentUrl: `https://easypaystg.easypaisa.com.pk/easypay/Index.jsf?mock=true&ref=${params.transactionId}`,
        };
      }

      // Build EasyPaisa request data
      const requestData: Record<string, string> = {
        storeId: this.storeId,
        orderId: params.transactionId,
        transactionAmount: params.amount.toFixed(2),
        transactionType: 'MA', // Merchant Account
        mobileAccountNo: params.customerPhone,
        emailAddress: params.customerEmail,
        tokenExpiry: this.getTokenExpiry(), // 2 hours from now
        bankIdentificationNumber: '',
        encryptedHashRequest: '',
      };

      // Generate signature
      const signature = this.generateSignature(requestData);
      requestData.encryptedHashRequest = signature;

      // Make API call to EasyPaisa
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestData).toString(),
      });

      const result = await response.json() as { 
        responseCode: string; 
        responseDesc: string;
        orderId?: string;
        paymentUrl?: string;
      };

      // Check response
      if (result.responseCode === '0000') {
        // Success - redirect user to payment URL
        return {
          success: true,
          transactionId: params.transactionId,
          orderId: result.orderId || params.transactionId,
          paymentUrl: result.paymentUrl || `${this.apiUrl}?orderId=${params.transactionId}`,
        };
      } else {
        // Payment initiation failed
        return {
          success: false,
          transactionId: params.transactionId,
          errorMessage: result.responseDesc || 'Payment initiation failed',
        };
      }
    } catch (error: any) {
      console.error('❌ [EasyPaisa] Payment initiation error:', error);
      return {
        success: false,
        transactionId: params.transactionId,
        errorMessage: error.message || 'Network error',
      };
    }
  }

  /**
   * Get token expiry timestamp (2 hours from now)
   */
  private getTokenExpiry(): string {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    
    // Format: YYYYMMDD HHMMSS
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day} ${hours}${minutes}${seconds}`;
  }

  /**
   * Check payment status with EasyPaisa
   */
  async checkPaymentStatus(orderId: string): Promise<{
    status: string;
    amount: number;
    transactionId: string;
  }> {
    try {
      // In production, query EasyPaisa API for payment status
      // For now, return mock data
      console.log('🔍 [EasyPaisa] Checking payment status:', orderId);
      
      return {
        status: '0000',
        amount: 0,
        transactionId: orderId,
      };
    } catch (error: any) {
      console.error('❌ [EasyPaisa] Status check error:', error);
      throw new Error('Failed to check payment status');
    }
  }
}

// Export singleton instance
export const easyPaisaService = new EasyPaisaService();

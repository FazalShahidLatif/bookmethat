import crypto from 'crypto';

/**
 * JazzCash Payment Gateway Service
 * Handles payment initiation and webhook verification for Pakistan mobile wallet
 * 
 * Documentation: https://sandbox.jazzcash.com.pk/Sandbox
 */

export interface JazzCashPaymentParams {
  amount: number; // In Pakistani Rupees (PKR)
  transactionId: string; // Unique booking reference
  customerEmail: string;
  customerPhone: string;
  description: string;
}

export interface JazzCashPaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  errorMessage?: string;
  ppResponseCode?: string;
}

export interface JazzCashWebhookData {
  pp_TxnRefNo: string;
  pp_ResponseCode: string;
  pp_ResponseMessage: string;
  pp_Amount: string;
  pp_SecureHash: string;
  pp_BillReference: string;
  pp_TxnDateTime: string;
}

export class JazzCashService {
  private readonly merchantId: string;
  private readonly password: string;
  private readonly integritySalt: string;
  private readonly returnUrl: string;
  private readonly apiUrl: string;

  constructor() {
    this.merchantId = process.env.JAZZCASH_MERCHANT_ID || '';
    this.password = process.env.JAZZCASH_PASSWORD || '';
    this.integritySalt = process.env.JAZZCASH_INTEGRITY_SALT || '';
    this.returnUrl = process.env.JAZZCASH_RETURN_URL || 'https://bookmethat.com/payment/jazzcash/callback';
    
    // Use sandbox for development, production for live
    this.apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://payments.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction'
      : 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction';

    if (!this.merchantId || !this.password || !this.integritySalt) {
      console.warn('⚠️  JazzCash credentials not configured. Payment will fail.');
    }
  }

  /**
   * Generate secure hash for JazzCash API request
   */
  private generateSecureHash(data: Record<string, string>): string {
    // Sort keys alphabetically and concatenate values
    const sortedKeys = Object.keys(data).sort();
    const sortedValues = sortedKeys.map(key => data[key]);
    
    // Add integrity salt at the end
    const hashString = this.integritySalt + '&' + sortedValues.join('&');
    
    // Generate HMAC SHA256 hash
    const hash = crypto
      .createHmac('sha256', this.integritySalt)
      .update(hashString)
      .digest('hex')
      .toUpperCase();
    
    return hash;
  }

  /**
   * Initiate payment with JazzCash
   * Returns payment URL for user redirection
   */
  async initiatePayment(params: JazzCashPaymentParams): Promise<JazzCashPaymentResponse> {
    try {
      // Mock mode for development without credentials
      if (!this.merchantId || this.merchantId === 'MC12345') {
        console.log('🧪 [JazzCash Mock] Payment initiated:', params);
        return {
          success: true,
          transactionId: params.transactionId,
          paymentUrl: `https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/?${params.transactionId}`,
        };
      }

      // Convert amount to paisa (1 PKR = 100 paisa)
      const amountInPaisa = Math.round(params.amount * 100);

      // Generate unique transaction reference
      const txnDateTime = this.formatDateTime(new Date());
      const expiryDateTime = this.formatDateTime(new Date(Date.now() + 3600000)); // 1 hour expiry

      // Prepare request payload
      const requestData = {
        pp_Version: '1.1',
        pp_TxnType: 'MWALLET', // Mobile Wallet
        pp_Language: 'EN',
        pp_MerchantID: this.merchantId,
        pp_Password: this.password,
        pp_TxnRefNo: params.transactionId,
        pp_Amount: amountInPaisa.toString(),
        pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: txnDateTime,
        pp_BillReference: params.transactionId,
        pp_Description: params.description.substring(0, 100), // Max 100 chars
        pp_TxnExpiryDateTime: expiryDateTime,
        pp_ReturnURL: this.returnUrl,
        pp_MobileNumber: params.customerPhone.replace(/\D/g, ''), // Remove non-digits
        pp_CNIC: '', // Optional
        ppmpf_1: params.customerEmail,
        ppmpf_2: '', // Additional info
        ppmpf_3: '', // Additional info
        ppmpf_4: '', // Additional info
        ppmpf_5: '', // Additional info
      };

      // Generate secure hash
      const secureHash = this.generateSecureHash(requestData);

      // Make API request
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...requestData,
          pp_SecureHash: secureHash,
        }),
      });

      const result = await response.json() as { pp_ResponseCode: string; pp_PaymentURL?: string; pp_MobilePaymentURL?: string; pp_ResponseMessage?: string };

      // Check response
      if (result.pp_ResponseCode === '000') {
        // Success - redirect user to payment URL
        return {
          success: true,
          transactionId: params.transactionId,
          paymentUrl: result.pp_PaymentURL || result.pp_MobilePaymentURL,
        };
      } else {
        // Payment initiation failed
        return {
          success: false,
          transactionId: params.transactionId,
          errorMessage: result.pp_ResponseMessage || 'Payment initiation failed',
          ppResponseCode: result.pp_ResponseCode,
        };
      }
    } catch (error: any) {
      console.error('❌ [JazzCash] Payment initiation error:', error);
      return {
        success: false,
        transactionId: params.transactionId,
        errorMessage: error.message || 'Network error',
      };
    }
  }

  /**
   * Verify webhook callback from JazzCash
   * CRITICAL: Always verify secure hash to prevent fraud
   */
  verifyWebhook(data: JazzCashWebhookData): boolean {
    try {
      const receivedHash = data.pp_SecureHash;
      
      // Remove hash from data for verification
      const { pp_SecureHash, ...dataWithoutHash } = data;
      
      // Generate hash from received data
      const calculatedHash = this.generateSecureHash(dataWithoutHash);
      
      // Compare hashes
      const isValid = receivedHash === calculatedHash;
      
      if (!isValid) {
        console.error('❌ [JazzCash] Invalid webhook signature!');
      }
      
      return isValid;
    } catch (error) {
      console.error('❌ [JazzCash] Webhook verification error:', error);
      return false;
    }
  }

  /**
   * Check if payment was successful
   */
  isPaymentSuccessful(responseCode: string): boolean {
    return responseCode === '000' || responseCode === '121'; // 121 = Pending
  }

  /**
   * Format date for JazzCash API (YYYYMMDDHHmmss)
   */
  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  /**
   * Get human-readable payment status
   */
  getPaymentStatus(responseCode: string): string {
    const statusMap: Record<string, string> = {
      '000': 'Success',
      '001': 'Account/Wallet Blocked',
      '002': 'Account/Wallet Closed',
      '003': 'Invalid Account/Wallet',
      '004': 'Invalid Amount',
      '005': 'Invalid Transaction',
      '006': 'Transaction Not Allowed',
      '007': 'Duplicate Transaction',
      '008': 'Invalid Credentials',
      '009': 'Network Error',
      '010': 'Timeout',
      '121': 'Pending',
      '124': 'Declined',
      '200': 'Refunded',
    };
    
    return statusMap[responseCode] || 'Unknown Status';
  }
}

// Export singleton instance
export const jazzCashService = new JazzCashService();

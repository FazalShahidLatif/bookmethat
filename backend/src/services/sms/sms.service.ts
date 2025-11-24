/**
 * SMS Service
 * 
 * Sends SMS notifications for bookings and alerts.
 * 
 * ⚠️  IMPORTANT: SMS CONFIGURATION REQUIRED!
 * 
 * Recommended SMS Provider:
 * 
 * 1. **Twilio** (https://twilio.com) - RECOMMENDED
 *    - Easy setup and reliable
 *    - Pay-as-you-go pricing
 *    - $15.50 free trial credit
 *    - Pricing: ~$0.0075 per SMS (varies by country)
 * 
 * 2. **AWS SNS** (https://aws.amazon.com/sns/)
 *    - Very cheap ($0.00645 per SMS in Pakistan)
 *    - Good for high volume
 * 
 * CONFIGURATION STEPS (Twilio):
 * 1. Sign up at https://twilio.com/try-twilio
 * 2. Get a phone number from Twilio console
 * 3. Copy Account SID and Auth Token
 * 4. Add to backend/.env:
 * 
 *   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *   TWILIO_AUTH_TOKEN=your-auth-token-here
 *   TWILIO_PHONE_NUMBER=+1234567890
 *   SMS_FROM_NAME=BookMeThat
 * 
 * For production in Pakistan:
 *   - Get Pakistani phone number (+92)
 *   - Or use verified sender ID
 * 
 * ⚠️  TODO: Provide Twilio credentials for production
 * 
 * Current Status: MOCK MODE (SMS logged to console only)
 */

import twilio from 'twilio';
import { format } from 'date-fns';

// SMS configuration from environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const SMS_FROM_NAME = process.env.SMS_FROM_NAME || 'BookMeThat';

// Mock mode - enabled when no credentials provided
const MOCK_MODE = !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER;

interface SMSOptions {
  to: string;
  message: string;
}

interface TrainBookingSMSData {
  pnr: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  journeyDate: string;
  departureTime: string;
  passengerName: string;
  totalAmount: number;
  currency: string;
}

class SMSService {
  private client: twilio.Twilio | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.initializeTwilio();
  }

  private initializeTwilio() {
    if (MOCK_MODE) {
      console.warn('');
      console.warn('⚠️  ========================================');
      console.warn('⚠️  SMS SERVICE NOT CONFIGURED!');
      console.warn('⚠️  ========================================');
      console.warn('');
      console.warn('📱 SMS notifications are in MOCK MODE.');
      console.warn('   SMS will be logged to console only.');
      console.warn('');
      console.warn('To enable real SMS sending via Twilio:');
      console.warn('');
      console.warn('1️⃣  Sign up at https://twilio.com/try-twilio');
      console.warn('   Get $15.50 free trial credit');
      console.warn('');
      console.warn('2️⃣  Get a phone number from Twilio console');
      console.warn('   (Recommend Pakistani number for local delivery)');
      console.warn('');
      console.warn('3️⃣  Add to backend/.env:');
      console.warn('   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx');
      console.warn('   TWILIO_AUTH_TOKEN=your-auth-token');
      console.warn('   TWILIO_PHONE_NUMBER=+1234567890');
      console.warn('   SMS_FROM_NAME=BookMeThat');
      console.warn('');
      console.warn('💰 Cost: ~$0.0075 per SMS (varies by country)');
      console.warn('   Pakistan: ~$0.04 per SMS');
      console.warn('');
      console.warn('⚠️  ACTION REQUIRED:');
      console.warn('   Please provide Twilio credentials for production');
      console.warn('');
      console.warn('⚠️  ========================================');
      console.warn('');
      this.isConfigured = false;
      return;
    }

    try {
      this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      this.isConfigured = true;
      console.log('✅ SMS service configured successfully (Twilio)');
      console.log(`📱 Sending SMS from: ${TWILIO_PHONE_NUMBER}`);
    } catch (error) {
      console.error('❌ Failed to initialize Twilio:', error);
      this.isConfigured = false;
    }
  }

  /**
   * Send SMS (mock or real)
   */
  private async sendSMS(options: SMSOptions): Promise<boolean> {
    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(options.to)) {
      console.error('❌ Invalid phone number format:', options.to);
      return false;
    }

    if (MOCK_MODE) {
      console.log('');
      console.log('📱 ========================================');
      console.log('📱 [MOCK SMS] SMS would be sent:');
      console.log('📱 ========================================');
      console.log(`📱 To: ${options.to}`);
      console.log(`📱 From: ${TWILIO_PHONE_NUMBER || '+1234567890'} (${SMS_FROM_NAME})`);
      console.log(`📱 Message:\n${options.message}`);
      console.log('📱 ========================================');
      console.log('');
      return true;
    }

    if (!this.client || !this.isConfigured) {
      console.error('❌ SMS service not configured');
      return false;
    }

    try {
      const message = await this.client.messages.create({
        body: options.message,
        from: TWILIO_PHONE_NUMBER,
        to: options.to,
      });

      console.log('✅ SMS sent successfully:', message.sid);
      return true;
    } catch (error: any) {
      console.error('❌ SMS sending failed:', error.message);
      return false;
    }
  }

  /**
   * Send train booking confirmation SMS
   */
  async sendTrainBookingConfirmation(
    phoneNumber: string,
    data: TrainBookingSMSData
  ): Promise<boolean> {
    const message = `${SMS_FROM_NAME}: Train Booking Confirmed!

PNR: ${data.pnr}
Train: ${data.trainName} (${data.trainNumber})
From: ${data.fromStation}
To: ${data.toStation}
Date: ${format(new Date(data.journeyDate), 'MMM dd, yyyy')}
Time: ${data.departureTime}

Passenger: ${data.passengerName}
Amount: ${data.currency} ${data.totalAmount.toLocaleString()}

Have a safe journey!
- BookMeThat Team`;

    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send booking cancellation SMS
   */
  async sendBookingCancellation(
    phoneNumber: string,
    bookingId: string,
    refundAmount: number,
    currency: string
  ): Promise<boolean> {
    const message = `${SMS_FROM_NAME}: Booking Cancelled

Booking ID: ${bookingId}

Your booking has been cancelled successfully.

Refund Amount: ${currency} ${refundAmount.toLocaleString()}
Refund will be processed within 5-7 business days.

For questions, contact support@bookmethat.com

- BookMeThat Team`;

    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send OTP for verification
   */
  async sendOTP(phoneNumber: string, otp: string): Promise<boolean> {
    const message = `${SMS_FROM_NAME}: Your verification code is ${otp}. Valid for 10 minutes. Do not share with anyone.`;

    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send payment confirmation SMS
   */
  async sendPaymentConfirmation(
    phoneNumber: string,
    amount: number,
    currency: string,
    transactionId: string
  ): Promise<boolean> {
    const message = `${SMS_FROM_NAME}: Payment Received

Amount: ${currency} ${amount.toLocaleString()}
Transaction ID: ${transactionId}

Thank you for your payment!
- BookMeThat Team`;

    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send general notification SMS
   */
  async sendNotification(
    phoneNumber: string,
    subject: string,
    body: string
  ): Promise<boolean> {
    const message = `${SMS_FROM_NAME}: ${subject}\n\n${body}`;

    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Test SMS service
   */
  async testSMS(phoneNumber: string): Promise<boolean> {
    const message = `${SMS_FROM_NAME}: Test SMS

This is a test message from BookMeThat.
SMS service is working correctly!

Timestamp: ${new Date().toISOString()}`;

    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }
}

// Export singleton instance
export const smsService = new SMSService();

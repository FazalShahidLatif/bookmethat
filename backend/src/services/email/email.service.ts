/**
 * Email Service
 * 
 * Handles all email notifications:
 * - Booking confirmations (Train, Hotel, Flight, etc.)
 * - Cancellation notifications
 * - Payment receipts
 * - eSIM delivery
 * 
 * ⚠️  IMPORTANT: EMAIL CONFIGURATION REQUIRED!
 * 
 * Recommended Email Providers:
 * 
 * 1. **SendGrid** (https://sendgrid.com) - RECOMMENDED
 *    - 100 emails/day free tier
 *    - Excellent deliverability
 *    - Easy API integration
 *    Setup: Get API key from SendGrid dashboard
 * 
 * 2. **Mailgun** (https://mailgun.com)
 *    - 5,000 emails/month free
 *    - Great for transactional emails
 *    Setup: Get SMTP credentials from Mailgun
 * 
 * 3. **Amazon SES** (https://aws.amazon.com/ses/)
 *    - Very cheap ($0.10 per 1000 emails)
 *    - High volume support
 *    Setup: Configure AWS credentials
 * 
 * 4. **Postmark** (https://postmarkapp.com)
 *    - Best deliverability rates
 *    - Premium service
 * 
 * CONFIGURATION STEPS:
 * 1. Choose a provider and sign up
 * 2. Get SMTP credentials or API key
 * 3. Add to backend/.env file:
 * 
 * For SendGrid (Recommended):
 *   EMAIL_SERVICE=SendGrid
 *   EMAIL_API_KEY=your-sendgrid-api-key-here
 *   EMAIL_FROM=BookMeThat <info@bookmethat.com>
 * 
 * For SMTP (Mailgun, SES, etc.):
 *   EMAIL_HOST=smtp.mailgun.org
 *   EMAIL_PORT=587
 *   EMAIL_USER=your-smtp-username
 *   EMAIL_PASSWORD=your-smtp-password
 *   EMAIL_FROM=BookMeThat <info@bookmethat.com>
 * 
 * ⚠️  TODO: Provide email credentials for info@bookmethat.com
 * 
 * Current Status: MOCK MODE (emails only logged to console)
 */

import nodemailer from 'nodemailer';
import { format } from 'date-fns';

// Email configuration from environment variables
const EMAIL_SERVICE = process.env.EMAIL_SERVICE; // e.g., 'SendGrid', 'Mailgun'
const EMAIL_API_KEY = process.env.EMAIL_API_KEY; // API key for service-based auth
const EMAIL_HOST = process.env.EMAIL_HOST; // SMTP host
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587'); // SMTP port
const EMAIL_USER = process.env.EMAIL_USER; // SMTP username
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD; // SMTP password or API key
const EMAIL_FROM = process.env.EMAIL_FROM || 'BookMeThat <noreply@bookmethat.com>';

// Mock mode - enabled when no credentials provided
const MOCK_MODE = !EMAIL_USER && !EMAIL_API_KEY && !EMAIL_HOST;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface TrainBookingEmailData {
  bookingId: string;
  pnr: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  class: string;
  passengers: Array<{
    name: string;
    age: number;
    gender: string;
    cnic: string;
  }>;
  totalAmount: number;
  currency: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

interface BookingEmailData {
  bookingId: string;
  bookingType: string;
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  totalAmount: number;
  currency: string;
  bookingDetails: any;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    if (MOCK_MODE) {
      console.warn('');
      console.warn('⚠️  ========================================');
      console.warn('⚠️  EMAIL SERVICE NOT CONFIGURED!');
      console.warn('⚠️  ========================================');
      console.warn('');
      console.warn('📧 Email notifications are in MOCK MODE.');
      console.warn('   Emails will be logged to console only.');
      console.warn('');
      console.warn('To enable real email sending, choose a provider:');
      console.warn('');
      console.warn('1️⃣  SendGrid (Recommended - 100 emails/day free)');
      console.warn('   https://sendgrid.com');
      console.warn('   Add to .env:');
      console.warn('     EMAIL_SERVICE=SendGrid');
      console.warn('     EMAIL_API_KEY=your-sendgrid-api-key');
      console.warn('     EMAIL_FROM=BookMeThat <info@bookmethat.com>');
      console.warn('');
      console.warn('2️⃣  Mailgun (5,000 emails/month free)');
      console.warn('   https://mailgun.com');
      console.warn('   Add to .env:');
      console.warn('     EMAIL_HOST=smtp.mailgun.org');
      console.warn('     EMAIL_PORT=587');
      console.warn('     EMAIL_USER=your-mailgun-username');
      console.warn('     EMAIL_PASSWORD=your-mailgun-password');
      console.warn('     EMAIL_FROM=BookMeThat <info@bookmethat.com>');
      console.warn('');
      console.warn('3️⃣  Amazon SES (Cheapest for high volume)');
      console.warn('   https://aws.amazon.com/ses/');
      console.warn('');
      console.warn('⚠️  ACTION REQUIRED:');
      console.warn('   Please provide email credentials for info@bookmethat.com');
      console.warn('');
      console.warn('⚠️  ========================================');
      console.warn('');
      this.isConfigured = false;
      return;
    }

    try {
      let transportConfig: any = {};

      // Service-based configuration (SendGrid, etc.)
      if (EMAIL_SERVICE && EMAIL_API_KEY) {
        transportConfig = {
          service: EMAIL_SERVICE,
          auth: {
            user: 'apikey', // SendGrid uses 'apikey' as username
            pass: EMAIL_API_KEY,
          },
        };
      }
      // SMTP configuration
      else if (EMAIL_HOST && EMAIL_USER && EMAIL_PASSWORD) {
        transportConfig = {
          host: EMAIL_HOST,
          port: EMAIL_PORT,
          secure: EMAIL_PORT === 465, // true for 465, false for other ports
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
          },
        };
      }

      this.transporter = nodemailer.createTransport(transportConfig);
      this.isConfigured = true;
      console.log('✅ Email service configured successfully');
      console.log(`📧 Sending emails from: ${EMAIL_FROM}`);
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      this.isConfigured = false;
    }
  }

  /**
   * Send email (mock or real)
   */
  private async sendEmail(options: EmailOptions): Promise<boolean> {
    if (MOCK_MODE) {
      console.log('');
      console.log('📧 ========================================');
      console.log('📧 [MOCK EMAIL] Email would be sent:');
      console.log('📧 ========================================');
      console.log(`📧 To: ${options.to}`);
      console.log(`📧 Subject: ${options.subject}`);
      console.log(`📧 From: ${EMAIL_FROM}`);
      console.log('📧 Content Preview:');
      console.log('📧', options.html.substring(0, 150).replace(/<[^>]*>/g, '').trim() + '...');
      console.log('📧 ========================================');
      console.log('');
      return true;
    }

    if (!this.transporter || !this.isConfigured) {
      console.error('❌ Email transporter not configured');
      return false;
    }

    try {
      const info = await this.transporter.sendMail({
        from: EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      console.log('✅ Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  }

  /**
   * Send train booking confirmation email
   */
  async sendTrainBookingConfirmation(data: TrainBookingEmailData): Promise<boolean> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Train Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; }
    .success-icon { text-align: center; font-size: 64px; margin-bottom: 20px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .info-box h3 { margin: 0 0 10px 0; color: #667eea; font-size: 16px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; color: #666; }
    .detail-value { color: #333; }
    .passenger-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; margin: 10px 0; }
    .passenger-name { font-weight: bold; color: #333; margin-bottom: 4px; }
    .passenger-info { font-size: 13px; color: #666; }
    .cta-button { display: inline-block; background: #667eea; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
    .pnr-highlight { background: #fef3c7; padding: 10px; border-radius: 4px; text-align: center; margin: 20px 0; }
    .pnr-highlight strong { font-size: 24px; color: #92400e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚂 Train Booking Confirmed!</h1>
    </div>
    
    <div class="content">
      <div class="success-icon">✅</div>
      
      <p>Dear ${data.guestName},</p>
      
      <p>Your train booking has been confirmed! Here are your ticket details:</p>
      
      <div class="pnr-highlight">
        <p style="margin: 0; font-size: 14px; color: #92400e;">Your PNR Number</p>
        <strong>${data.pnr}</strong>
      </div>
      
      <div class="info-box">
        <h3>Journey Details</h3>
        <div class="detail-row">
          <span class="detail-label">Train:</span>
          <span class="detail-value">${data.trainName} (${data.trainNumber})</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">From:</span>
          <span class="detail-value">${data.fromStation}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">To:</span>
          <span class="detail-value">${data.toStation}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${format(new Date(data.journeyDate), 'MMMM dd, yyyy')}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Departure:</span>
          <span class="detail-value">${data.departureTime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Arrival:</span>
          <span class="detail-value">${data.arrivalTime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Class:</span>
          <span class="detail-value">${data.class}</span>
        </div>
      </div>
      
      <div class="info-box">
        <h3>Passengers (${data.passengers.length})</h3>
        ${data.passengers.map(p => `
          <div class="passenger-card">
            <div class="passenger-name">${p.name}</div>
            <div class="passenger-info">${p.age} years • ${p.gender} • CNIC: ${p.cnic}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="info-box">
        <h3>Payment Details</h3>
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">${data.bookingId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Amount:</span>
          <span class="detail-value" style="font-size: 18px; font-weight: bold; color: #667eea;">${data.currency} ${data.totalAmount.toLocaleString()}</span>
        </div>
      </div>
      
      <p style="margin-top: 30px;"><strong>Important Instructions:</strong></p>
      <ul>
        <li>Please arrive at the station at least 30 minutes before departure</li>
        <li>Carry a valid ID proof (CNIC/Passport) for all passengers</li>
        <li>Keep your PNR number handy for reference</li>
        <li>You can download your e-ticket from your dashboard</li>
      </ul>
      
      <center>
        <a href="https://bookmethat.com/account/bookings" class="cta-button">View My Bookings</a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>Contact Information:</strong><br>
      Email: ${data.guestEmail} | Phone: ${data.guestPhone}</p>
      
      <p>Need help? Contact us at support@bookmethat.com</p>
      
      <p>&copy; 2025 BookMeThat. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    const text = `
Train Booking Confirmation

Dear ${data.guestName},

Your train booking has been confirmed!

PNR: ${data.pnr}
Train: ${data.trainName} (${data.trainNumber})
From: ${data.fromStation}
To: ${data.toStation}
Date: ${format(new Date(data.journeyDate), 'MMMM dd, yyyy')}
Departure: ${data.departureTime}
Arrival: ${data.arrivalTime}
Class: ${data.class}

Passengers:
${data.passengers.map(p => `- ${p.name} (${p.age} years, ${p.gender}, CNIC: ${p.cnic})`).join('\n')}

Total Amount: ${data.currency} ${data.totalAmount.toLocaleString()}
Booking ID: ${data.bookingId}

Important Instructions:
- Arrive at least 30 minutes before departure
- Carry valid ID proof for all passengers
- Keep your PNR number handy

View your booking: https://bookmethat.com/account/bookings

Contact: ${data.guestEmail} | ${data.guestPhone}

© 2025 BookMeThat. All rights reserved.
    `;

    return this.sendEmail({
      to: data.guestEmail,
      subject: `🎫 Train Booking Confirmed - PNR: ${data.pnr}`,
      html,
      text,
    });
  }

  /**
   * Send generic booking confirmation email
   */
  async sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 30px 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .cta-button { display: inline-block; background: #667eea; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Booking Confirmed!</h1>
    </div>
    <div class="content">
      <p>Dear ${data.guestName},</p>
      <p>Your ${data.bookingType.toLowerCase()} booking has been confirmed!</p>
      
      <div class="info-box">
        <div class="detail-row">
          <span><strong>Booking Number:</strong></span>
          <span>${data.bookingNumber}</span>
        </div>
        <div class="detail-row">
          <span><strong>Total Amount:</strong></span>
          <span style="font-size: 18px; font-weight: bold; color: #667eea;">${data.currency} ${data.totalAmount.toLocaleString()}</span>
        </div>
      </div>
      
      <center>
        <a href="https://bookmethat.com/account/bookings" class="cta-button">View Booking Details</a>
      </center>
    </div>
    <div class="footer">
      <p>Need help? Contact us at support@bookmethat.com</p>
      <p>&copy; 2025 BookMeThat. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    return this.sendEmail({
      to: data.guestEmail,
      subject: `Booking Confirmed - ${data.bookingNumber}`,
      html,
    });
  }

  /**
   * Send booking cancellation email
   */
  async sendBookingCancellation(data: {
    bookingNumber: string;
    guestName: string;
    guestEmail: string;
    refundAmount: number;
    currency: string;
  }): Promise<boolean> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: #dc2626; color: #fff; padding: 30px 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .info-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Cancelled</h1>
    </div>
    <div class="content">
      <p>Dear ${data.guestName},</p>
      <p>Your booking <strong>${data.bookingNumber}</strong> has been cancelled as requested.</p>
      
      <div class="info-box">
        <p><strong>Refund Information:</strong></p>
        <p>Amount: ${data.currency} ${data.refundAmount.toLocaleString()}</p>
        <p>The refund will be processed within 5-7 business days.</p>
      </div>
      
      <p>If you have any questions, please contact our support team.</p>
    </div>
    <div class="footer">
      <p>Contact: support@bookmethat.com</p>
      <p>&copy; 2025 BookMeThat. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    return this.sendEmail({
      to: data.guestEmail,
      subject: `Booking Cancelled - ${data.bookingNumber}`,
      html,
    });
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(data: {
    email: string;
    name: string;
  }): Promise<boolean> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 30px 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .cta-button { display: inline-block; background: #667eea; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to BookMeThat!</h1>
    </div>
    <div class="content">
      <p>Dear ${data.name},</p>
      <p>Welcome to BookMeThat! We're excited to have you on board.</p>
      
      <p>With BookMeThat, you can:</p>
      <ul>
        <li>🚂 Book train tickets across Pakistan</li>
        <li>🏨 Find and book hotels worldwide</li>
        <li>✈️ Search and book flights</li>
        <li>🚗 Rent cars for your travels</li>
        <li>🎡 Discover and book activities</li>
        <li>📱 Get eSIM for international travel</li>
      </ul>
      
      <center>
        <a href="https://bookmethat.com" class="cta-button">Start Exploring</a>
      </center>
      
      <p>If you have any questions, our support team is here to help!</p>
    </div>
    <div class="footer">
      <p>Contact: support@bookmethat.com</p>
      <p>&copy; 2025 BookMeThat. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    return this.sendEmail({
      to: data.email,
      subject: '🎉 Welcome to BookMeThat!',
      html,
    });
  }
}

export const emailService = new EmailService();

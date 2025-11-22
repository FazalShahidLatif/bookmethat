import nodemailer from 'nodemailer';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Email service configuration
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'smtp'; // 'smtp', 'ses', 'sendgrid'

// SMTP Configuration (Gmail, Outlook, etc.)
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// AWS SES Configuration
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Email templates
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: keyof typeof emailTemplates;
  templateData?: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// Email templates for booking platform
export const emailTemplates = {
  bookingConfirmation: (data: {
    bookingId: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
    guestName: string;
    totalPrice: string;
  }): EmailTemplate => ({
    subject: `Booking Confirmed - ${data.propertyName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">🎉 Booking Confirmed!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #333;">Hi ${data.guestName},</p>
            <p style="color: #666;">Your booking has been confirmed. We're excited to host you!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #667eea; margin-top: 0;">Booking Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666;">Booking ID:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #333;">${data.bookingId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Property:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #333;">${data.propertyName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Check-in:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #333;">${data.checkIn}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Check-out:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #333;">${data.checkOut}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Total Price:</td>
                  <td style="padding: 10px 0; font-weight: bold; font-size: 20px; color: #667eea;">${data.totalPrice}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bookmethat.com/bookings/${data.bookingId}" 
                 style="background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View Booking
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Need to make changes? <a href="https://bookmethat.com/support" style="color: #667eea;">Contact our support team</a>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>bookmethat © 2025 | <a href="https://bookmethat.com" style="color: #667eea;">Visit Website</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Booking Confirmed!

Hi ${data.guestName},

Your booking has been confirmed. Here are your details:

Booking ID: ${data.bookingId}
Property: ${data.propertyName}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Total Price: ${data.totalPrice}

View your booking: https://bookmethat.com/bookings/${data.bookingId}

Need help? Contact us at support@bookmethat.com

bookmethat © 2025
    `,
  }),

  bookingCancellation: (data: {
    bookingId: string;
    propertyName: string;
    guestName: string;
    refundAmount: string;
  }): EmailTemplate => ({
    subject: `Booking Cancelled - ${data.propertyName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc3545; color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Booking Cancelled</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #333;">Hi ${data.guestName},</p>
            <p style="color: #666;">Your booking has been cancelled as requested.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Booking ID:</strong> ${data.bookingId}</p>
              <p><strong>Property:</strong> ${data.propertyName}</p>
              <p><strong>Refund Amount:</strong> ${data.refundAmount}</p>
              <p style="color: #666; font-size: 14px;">Refund will be processed within 5-7 business days.</p>
            </div>
            
            <p style="color: #666;">We're sorry to see you go. We hope to serve you again in the future!</p>
          </div>
        </body>
      </html>
    `,
    text: `Booking Cancelled\n\nBooking ID: ${data.bookingId}\nRefund: ${data.refundAmount}`,
  }),

  welcomeEmail: (data: { name: string; email: string }): EmailTemplate => ({
    subject: 'Welcome to bookmethat! 🌍',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px;">
            <h1 style="margin: 0;">Welcome to bookmethat! 🌍</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa; margin-top: 20px; border-radius: 10px;">
            <p style="font-size: 18px; color: #333;">Hi ${data.name},</p>
            <p style="color: #666;">Thank you for joining bookmethat! Your account has been created successfully.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea;">What's Next?</h3>
              <ul style="color: #666; line-height: 2;">
                <li>Search for hotels, flights, and activities worldwide</li>
                <li>Book with confidence - free cancellation on most properties</li>
                <li>Get exclusive deals and travel eSIMs</li>
                <li>Manage all your bookings in one place</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bookmethat.com/search" 
                 style="background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Start Exploring
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Welcome to bookmethat!\n\nHi ${data.name},\n\nYour account has been created. Start exploring: https://bookmethat.com/search`,
  }),

  passwordReset: (data: { name: string; resetLink: string }): EmailTemplate => ({
    subject: 'Reset Your Password - bookmethat',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #667eea; color: white; padding: 30px; border-radius: 10px;">
            <h1 style="margin: 0;">Password Reset Request</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa; margin-top: 20px; border-radius: 10px;">
            <p style="font-size: 18px; color: #333;">Hi ${data.name},</p>
            <p style="color: #666;">We received a request to reset your password. Click the button below to set a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.resetLink}" 
                 style="background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px;">This link will expire in 1 hour.</p>
            <p style="color: #999; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `Reset your password: ${data.resetLink}\n\nExpires in 1 hour.`,
  }),

  paymentReceipt: (data: {
    bookingId: string;
    amount: string;
    date: string;
    paymentMethod: string;
  }): EmailTemplate => ({
    subject: `Payment Receipt - ${data.bookingId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #28a745; color: white; padding: 30px; border-radius: 10px;">
            <h1 style="margin: 0;">💳 Payment Received</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa; margin-top: 20px; border-radius: 10px;">
            <p style="font-size: 18px; color: #333;">Payment Successful</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 10px 0; color: #666;">Booking ID:</td>
                  <td style="padding: 10px 0; font-weight: bold;">${data.bookingId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Amount Paid:</td>
                  <td style="padding: 10px 0; font-weight: bold; font-size: 20px; color: #28a745;">${data.amount}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Date:</td>
                  <td style="padding: 10px 0;">${data.date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Payment Method:</td>
                  <td style="padding: 10px 0;">${data.paymentMethod}</td>
                </tr>
              </table>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Payment Receipt\n\nBooking: ${data.bookingId}\nAmount: ${data.amount}\nDate: ${data.date}`,
  }),
};

class EmailService {
  /**
   * Send email using configured provider
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // If template is specified, use it
      if (options.template && options.templateData) {
        const template = emailTemplates[options.template](options.templateData as any);
        options.subject = template.subject;
        options.html = template.html;
        options.text = template.text;
      }

      switch (EMAIL_PROVIDER) {
        case 'ses':
          return await this.sendWithSES(options);
        case 'smtp':
        default:
          return await this.sendWithSMTP(options);
      }
    } catch (error) {
      console.error('Email send error:', error);
      return false;
    }
  }

  /**
   * Send email via SMTP (Gmail, Outlook, etc.)
   */
  private async sendWithSMTP(options: EmailOptions): Promise<boolean> {
    const mailOptions = {
      from: `"bookmethat" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    };

    const info = await smtpTransporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  }

  /**
   * Send email via AWS SES
   */
  private async sendWithSES(options: EmailOptions): Promise<boolean> {
    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL || 'noreply@bookmethat.com',
      Destination: {
        ToAddresses: Array.isArray(options.to) ? options.to : [options.to],
      },
      Message: {
        Subject: { Data: options.subject },
        Body: {
          Html: { Data: options.html || '' },
          Text: { Data: options.text || '' },
        },
      },
    });

    await sesClient.send(command);
    console.log('Email sent via SES');
    return true;
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(data: {
    to: string;
    bookingId: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
    guestName: string;
    totalPrice: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: data.to,
      subject: '', // Will be set by template
      template: 'bookingConfirmation',
      templateData: data,
    });
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(data: {
    to: string;
    name: string;
    email: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: data.to,
      subject: '', // Will be set by template
      template: 'welcomeEmail',
      templateData: data,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(data: {
    to: string;
    name: string;
    resetLink: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: data.to,
      subject: '', // Will be set by template
      template: 'passwordReset',
      templateData: data,
    });
  }

  /**
   * Verify email configuration
   */
  async verifyConnection(): Promise<boolean> {
    try {
      if (EMAIL_PROVIDER === 'smtp') {
        await smtpTransporter.verify();
        console.log('SMTP connection verified');
        return true;
      }
      return true;
    } catch (error) {
      console.error('Email verification failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;

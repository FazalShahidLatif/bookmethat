import { Router } from 'express';
import { emailService } from '../services/email';
import { body, validationResult } from 'express-validator';

const router = Router();

/**
 * Send booking confirmation email
 * POST /api/email/booking-confirmation
 */
router.post(
  '/booking-confirmation',
  [
    body('to').isEmail().withMessage('Valid email is required'),
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
    body('propertyName').notEmpty().withMessage('Property name is required'),
    body('checkIn').notEmpty().withMessage('Check-in date is required'),
    body('checkOut').notEmpty().withMessage('Check-out date is required'),
    body('guestName').notEmpty().withMessage('Guest name is required'),
    body('totalPrice').notEmpty().withMessage('Total price is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const success = await emailService.sendBookingConfirmation(req.body);
      
      if (success) {
        res.json({ message: 'Booking confirmation email sent successfully' });
      } else {
        res.status(500).json({ error: 'Failed to send email' });
      }
    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * Send welcome email
 * POST /api/email/welcome
 */
router.post(
  '/welcome',
  [
    body('to').isEmail().withMessage('Valid email is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const success = await emailService.sendWelcomeEmail(req.body);
      
      if (success) {
        res.json({ message: 'Welcome email sent successfully' });
      } else {
        res.status(500).json({ error: 'Failed to send email' });
      }
    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * Send password reset email
 * POST /api/email/password-reset
 */
router.post(
  '/password-reset',
  [
    body('to').isEmail().withMessage('Valid email is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('resetLink').isURL().withMessage('Valid reset link is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const success = await emailService.sendPasswordReset(req.body);
      
      if (success) {
        res.json({ message: 'Password reset email sent successfully' });
      } else {
        res.status(500).json({ error: 'Failed to send email' });
      }
    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * Send custom email
 * POST /api/email/send
 */
router.post(
  '/send',
  [
    body('to').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('html').notEmpty().withMessage('HTML content is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { to, subject, html, text } = req.body;
      
      const success = await emailService.sendEmail({
        to,
        subject,
        html,
        text,
      });
      
      if (success) {
        res.json({ message: 'Email sent successfully' });
      } else {
        res.status(500).json({ error: 'Failed to send email' });
      }
    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * Verify email configuration
 * GET /api/email/verify
 */
router.get('/verify', async (req, res) => {
  try {
    const isVerified = await emailService.verifyConnection();
    
    if (isVerified) {
      res.json({ message: 'Email service is configured correctly', verified: true });
    } else {
      res.status(500).json({ error: 'Email service verification failed', verified: false });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error', verified: false });
  }
});

export default router;

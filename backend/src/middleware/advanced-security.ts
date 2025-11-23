/**
 * Advanced Security Middleware
 * Enhanced security policies to prevent misuse and abuse
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

// ============================================
// 1. STRICT AUTHENTICATION (User Token)
// ============================================

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please login to access this resource.',
      code: 'AUTH_REQUIRED',
    });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired authentication token. Please login again.',
        code: 'TOKEN_INVALID',
      });
    }

    (req as any).user = user;
    next();
  });
}

// ============================================
// 2. OWNERSHIP VERIFICATION
// ============================================

export function requireOwnership(resourceType: 'booking' | 'trainBooking' | 'esim') {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId;
      const resourceId = req.params.id || req.params.pnr || req.body.bookingId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User authentication required',
          code: 'AUTH_REQUIRED',
        });
      }

      if (!resourceId) {
        return res.status(400).json({
          success: false,
          error: 'Resource ID required',
          code: 'INVALID_REQUEST',
        });
      }

      // Verify ownership via database query (implement in route handler)
      (req as any).resourceId = resourceId;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ownership verification failed',
        code: 'VERIFICATION_ERROR',
      });
    }
  };
}

// ============================================
// 3. INTERNAL API KEY AUTHENTICATION
// ============================================

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || 'dev-internal-key-change-in-production';

export function requireInternalApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] || req.headers['x-internal-key'];

  if (!apiKey || apiKey !== INTERNAL_API_KEY) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or missing internal API key',
      code: 'FORBIDDEN',
    });
  }

  next();
}

// ============================================
// 4. PAYMENT-SPECIFIC SECURITY
// ============================================

// Strict rate limit for payment initiation (prevent abuse)
export const paymentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 payment attempts per 15 minutes per IP
  message: {
    success: false,
    error: 'Too many payment attempts. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Verify payment amount is reasonable
export function validatePaymentAmount(req: Request, res: Response, next: NextFunction) {
  const amount = req.body.amount || req.body.totalPrice;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Invalid payment amount',
      code: 'INVALID_AMOUNT',
    });
  }

  // Minimum: 100 PKR or 1 USD
  if (amount < 1) {
    return res.status(400).json({
      success: false,
      error: 'Payment amount too low',
      code: 'AMOUNT_TOO_LOW',
    });
  }

  // Maximum: 1,000,000 PKR or 10,000 USD (prevent large fraudulent transactions)
  const currency = req.body.currency || 'USD';
  const maxAmount = currency === 'PKR' ? 1000000 : 10000;

  if (amount > maxAmount) {
    return res.status(400).json({
      success: false,
      error: `Payment amount exceeds maximum allowed (${maxAmount} ${currency})`,
      code: 'AMOUNT_TOO_HIGH',
    });
  }

  next();
}

// ============================================
// 5. BOOKING-SPECIFIC SECURITY
// ============================================

// Prevent duplicate bookings (check within 2 minutes)
const recentBookings = new Map<string, number>();

export function preventDuplicateBooking(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user?.userId;
  const bookingKey = JSON.stringify({
    userId,
    type: req.body.type,
    data: req.body.bookingData,
  });

  const lastBookingTime = recentBookings.get(bookingKey);
  const now = Date.now();

  if (lastBookingTime && (now - lastBookingTime) < 120000) { // 2 minutes
    return res.status(429).json({
      success: false,
      error: 'Duplicate booking detected. Please wait before trying again.',
      code: 'DUPLICATE_BOOKING',
    });
  }

  recentBookings.set(bookingKey, now);

  // Cleanup old entries (older than 5 minutes)
  for (const [key, time] of recentBookings.entries()) {
    if (now - time > 300000) {
      recentBookings.delete(key);
    }
  }

  next();
}

// Validate booking dates
export function validateBookingDates(req: Request, res: Response, next: NextFunction) {
  const bookingData = req.body.bookingData || req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check check-in/departure date
  const dateField = bookingData.checkIn || bookingData.departureDate || bookingData.pickupDate || bookingData.date;
  
  if (dateField) {
    const bookingDate = new Date(dateField);
    
    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        error: 'Cannot make bookings for past dates',
        code: 'INVALID_DATE',
      });
    }

    // Prevent bookings more than 1 year in advance (likely abuse)
    const oneYearFromNow = new Date(today);
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (bookingDate > oneYearFromNow) {
      return res.status(400).json({
        success: false,
        error: 'Cannot make bookings more than 1 year in advance',
        code: 'DATE_TOO_FAR',
      });
    }
  }

  next();
}

// ============================================
// 6. TRAIN-SPECIFIC SECURITY
// ============================================

// Validate train passenger count
export function validateTrainPassengers(req: Request, res: Response, next: NextFunction) {
  const passengers = req.body.passengers;

  if (!passengers || !Array.isArray(passengers)) {
    return res.status(400).json({
      success: false,
      error: 'Passenger information required',
      code: 'MISSING_PASSENGERS',
    });
  }

  // Maximum 8 passengers per booking (prevent abuse)
  if (passengers.length > 8) {
    return res.status(400).json({
      success: false,
      error: 'Maximum 8 passengers allowed per booking',
      code: 'TOO_MANY_PASSENGERS',
    });
  }

  // Minimum 1 passenger
  if (passengers.length < 1) {
    return res.status(400).json({
      success: false,
      error: 'At least 1 passenger required',
      code: 'NO_PASSENGERS',
    });
  }

  // Validate each passenger has required fields
  for (const passenger of passengers) {
    if (!passenger.name || !passenger.cnic) {
      return res.status(400).json({
        success: false,
        error: 'Each passenger must have name and CNIC',
        code: 'INVALID_PASSENGER_DATA',
      });
    }

    // Validate CNIC format (Pakistan: 13 digits, xxxxx-xxxxxxx-x)
    const cnicRegex = /^\d{5}-?\d{7}-?\d{1}$/;
    if (!cnicRegex.test(passenger.cnic)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid CNIC format. Use: xxxxx-xxxxxxx-x',
        code: 'INVALID_CNIC',
      });
    }
  }

  next();
}

// ============================================
// 7. WEBHOOK SECURITY
// ============================================

// Only allow webhooks from trusted IPs
const TRUSTED_WEBHOOK_IPS = (process.env.TRUSTED_WEBHOOK_IPS || '').split(',').filter(Boolean);

export function verifyWebhookSource(req: Request, res: Response, next: NextFunction) {
  // Skip in development
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!TRUSTED_WEBHOOK_IPS.includes(clientIp as string)) {
    console.warn(`⚠️ [Security] Webhook from untrusted IP: ${clientIp}`);
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      code: 'UNTRUSTED_SOURCE',
    });
  }

  next();
}

// ============================================
// 8. INPUT SANITIZATION
// ============================================

// Sanitize user input to prevent injection attacks
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  const sanitize = (obj: any): any => {
    if (typeof obj === 'string') {
      // Remove potential SQL injection patterns
      return obj
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/\$/g, '') // Remove $ (MongoDB injection)
        .replace(/;/g, '') // Remove semicolons (SQL injection)
        .trim();
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    if (typeof obj === 'object' && obj !== null) {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitize(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  if (req.body) {
    req.body = sanitize(req.body);
  }
  if (req.query) {
    req.query = sanitize(req.query);
  }

  next();
}

// ============================================
// 9. ADMIN/ROLE-BASED ACCESS
// ============================================

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user || user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Admin access required',
      code: 'FORBIDDEN',
    });
  }

  next();
}

// ============================================
// 10. SUSPICIOUS ACTIVITY DETECTION
// ============================================

const suspiciousActivity = new Map<string, number[]>();

export function detectSuspiciousActivity(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user?.userId;
  if (!userId) return next();

  const now = Date.now();
  const userActivity = suspiciousActivity.get(userId) || [];
  
  // Add current request timestamp
  userActivity.push(now);
  
  // Keep only last 10 minutes of activity
  const tenMinutesAgo = now - 600000;
  const recentActivity = userActivity.filter(time => time > tenMinutesAgo);
  
  suspiciousActivity.set(userId, recentActivity);

  // Flag if more than 30 requests in 10 minutes
  if (recentActivity.length > 30) {
    console.warn(`⚠️ [Security] Suspicious activity detected for user: ${userId}`);
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Your account has been temporarily restricted.',
      code: 'SUSPICIOUS_ACTIVITY',
    });
  }

  next();
}

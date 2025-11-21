import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { createHash } from 'crypto';

/**
 * Security Configuration for bookmethat Backend
 * Protects against malicious conversations, brute force, and abuse
 */

// In-memory store for rate limiting (use Redis in production)
interface RateLimitStore {
  [key: string]: {
    attempts: number;
    resetAt: number;
    blocked: boolean;
    blockedUntil?: number;
  };
}

const rateLimitStore: RateLimitStore = {};
const suspiciousPatterns: RegExp[] = [
  /<script/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /eval\(/gi,
  /exec\(/gi,
  /\.\.\/\.\.\//g,
  /union.*select/gi,
  /drop\s+table/gi,
];

/**
 * Clean up expired rate limit entries every 5 minutes
 */
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetAt < now && !rateLimitStore[key].blocked) {
      delete rateLimitStore[key];
    }
  });
}, 5 * 60 * 1000);

/**
 * Generate unique identifier for rate limiting
 */
function getClientIdentifier(req: Request): string {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  return createHash('sha256').update(`${ip}-${userAgent}`).digest('hex');
}

/**
 * Check for malicious content patterns
 */
function detectMaliciousContent(data: any): boolean {
  const jsonString = JSON.stringify(data).toLowerCase();
  return suspiciousPatterns.some((pattern) => pattern.test(jsonString));
}

/**
 * Rate Limiter Middleware with Attempt Restriction
 */
export const rateLimiter = (options: {
  windowMs: number;
  maxAttempts: number;
  blockDuration: number;
  message?: string;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientId = getClientIdentifier(req);
    const now = Date.now();
    
    // Initialize or get existing rate limit data
    if (!rateLimitStore[clientId]) {
      rateLimitStore[clientId] = {
        attempts: 0,
        resetAt: now + options.windowMs,
        blocked: false,
      };
    }
    
    const clientData = rateLimitStore[clientId];
    
    // Check if client is blocked
    if (clientData.blocked && clientData.blockedUntil) {
      if (now < clientData.blockedUntil) {
        const remainingTime = Math.ceil((clientData.blockedUntil - now) / 1000);
        return res.status(429).json({
          error: 'Too many requests',
          message: `Account temporarily blocked. Try again in ${remainingTime} seconds.`,
          retryAfter: remainingTime,
          blocked: true,
        });
      } else {
        // Unblock and reset
        clientData.blocked = false;
        clientData.attempts = 0;
        clientData.resetAt = now + options.windowMs;
        delete clientData.blockedUntil;
      }
    }
    
    // Reset attempts if window expired
    if (now > clientData.resetAt) {
      clientData.attempts = 0;
      clientData.resetAt = now + options.windowMs;
    }
    
    // Increment attempts
    clientData.attempts++;
    
    // Check if exceeded max attempts
    if (clientData.attempts > options.maxAttempts) {
      clientData.blocked = true;
      clientData.blockedUntil = now + options.blockDuration;
      
      console.warn(`🚨 Client blocked: ${clientId} - Exceeded ${options.maxAttempts} attempts`);
      
      return res.status(429).json({
        error: 'Too many requests',
        message: options.message || 'Too many attempts. Account temporarily blocked for security.',
        retryAfter: Math.ceil(options.blockDuration / 1000),
        blocked: true,
      });
    }
    
    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', options.maxAttempts.toString());
    res.setHeader('X-RateLimit-Remaining', (options.maxAttempts - clientData.attempts).toString());
    res.setHeader('X-RateLimit-Reset', new Date(clientData.resetAt).toISOString());
    
    next();
  };
};

/**
 * Content Security Middleware - Detect malicious patterns
 */
export const contentSecurityMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check request body for malicious content
  if (req.body && detectMaliciousContent(req.body)) {
    const clientId = getClientIdentifier(req);
    console.error(`🚨 Malicious content detected from: ${clientId}`);
    console.error('Payload:', JSON.stringify(req.body).substring(0, 200));
    
    // Auto-block client
    if (!rateLimitStore[clientId]) {
      rateLimitStore[clientId] = {
        attempts: 999,
        resetAt: Date.now() + 3600000,
        blocked: true,
        blockedUntil: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
    } else {
      rateLimitStore[clientId].blocked = true;
      rateLimitStore[clientId].blockedUntil = Date.now() + 24 * 60 * 60 * 1000;
    }
    
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Request contains potentially malicious content',
      blocked: true,
    });
  }
  
  // Check query parameters
  if (req.query && detectMaliciousContent(req.query)) {
    const clientId = getClientIdentifier(req);
    console.error(`🚨 Malicious query parameters from: ${clientId}`);
    
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Query parameters contain invalid content',
    });
  }
  
  next();
};

/**
 * IP Whitelist/Blacklist Middleware
 */
const blacklistedIPs: Set<string> = new Set();
const whitelistedIPs: Set<string> = new Set([
  // Add trusted IPs here (e.g., your office, CI/CD servers)
]);

export const ipFilterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = (req.ip || req.headers['x-forwarded-for'] || 'unknown') as string;
  
  // Check whitelist first
  if (whitelistedIPs.has(ip)) {
    return next();
  }
  
  // Check blacklist
  if (blacklistedIPs.has(ip)) {
    console.warn(`🚫 Blocked IP attempt: ${ip}`);
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied',
    });
  }
  
  next();
};

/**
 * Add IP to blacklist
 */
export function blockIP(ip: string): void {
  blacklistedIPs.add(ip);
  console.log(`🚫 IP blacklisted: ${ip}`);
}

/**
 * Remove IP from blacklist
 */
export function unblockIP(ip: string): void {
  blacklistedIPs.delete(ip);
  console.log(`✅ IP unblocked: ${ip}`);
}

/**
 * Helmet Security Headers
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.bookmethat.com'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: {
    action: 'deny',
  },
  noSniff: true,
  xssFilter: true,
});

/**
 * Rate Limit Configurations for Different Endpoints
 */

// General API rate limit: 100 requests per 15 minutes
export const generalRateLimit = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 100,
  blockDuration: 60 * 60 * 1000, // 1 hour block
  message: 'Too many requests from this device. Please try again later.',
});

// Authentication rate limit: 5 attempts per 15 minutes
export const authRateLimit = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 5,
  blockDuration: 24 * 60 * 60 * 1000, // 24 hours block
  message: 'Too many login attempts. Account locked for 24 hours for security.',
});

// Password reset rate limit: 3 attempts per hour
export const passwordResetRateLimit = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxAttempts: 3,
  blockDuration: 6 * 60 * 60 * 1000, // 6 hours block
  message: 'Too many password reset attempts. Please try again in 6 hours.',
});

// Payment/Booking rate limit: 10 attempts per hour
export const bookingRateLimit = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxAttempts: 10,
  blockDuration: 2 * 60 * 60 * 1000, // 2 hours block
  message: 'Too many booking attempts. Please contact support if you need assistance.',
});

// Search rate limit: 50 searches per minute
export const searchRateLimit = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxAttempts: 50,
  blockDuration: 10 * 60 * 1000, // 10 minutes block
  message: 'Too many search requests. Please slow down.',
});

/**
 * Request Logging for Security Monitoring
 */
export const securityLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const clientId = getClientIdentifier(req);
    
    // Log suspicious activity
    if (res.statusCode === 429 || res.statusCode === 403) {
      console.warn('🚨 SECURITY LOG:', {
        timestamp: new Date().toISOString(),
        clientId: clientId.substring(0, 16),
        ip: req.ip,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.headers['user-agent'],
      });
    }
  });
  
  next();
};

/**
 * CORS Configuration
 */
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      'https://bookmethat.com',
      'https://www.bookmethat.com',
      'https://esim.bookmethat.com',
      'http://localhost:3000',
      'http://localhost:4000',
    ];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

/**
 * Input Sanitization
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Validate Email Format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate Password Strength
 */
export function isStrongPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Export all security middleware
 */
export default {
  rateLimiter,
  contentSecurityMiddleware,
  ipFilterMiddleware,
  helmetConfig,
  generalRateLimit,
  authRateLimit,
  passwordResetRateLimit,
  bookingRateLimit,
  searchRateLimit,
  securityLogger,
  corsOptions,
  sanitizeInput,
  isValidEmail,
  isStrongPassword,
  blockIP,
  unblockIP,
};

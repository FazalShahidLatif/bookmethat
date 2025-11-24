/**
 * Sentry Error Tracking Configuration (v8 SDK)
 * 
 * Production-ready error monitoring and performance tracking
 * 
 * Features:
 * - Automatic error capture and stack traces
 * - Performance monitoring and tracing
 * - User context tracking
 * - Request breadcrumbs
 * - Sensitive data filtering
 * 
 * Setup:
 * 1. Create account at https://sentry.io
 * 2. Create project → Copy DSN
 * 3. Add SENTRY_DSN to .env
 * 
 * Usage:
 * - Automatic: All errors caught automatically
 * - Manual: captureError(error, context) for custom tracking
 */

import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import type { Express, Request, Response, NextFunction } from 'express';

/**
 * Initialize Sentry with environment-specific configuration
 */
export function initializeSentry(app: Express): void {
  const dsn = process.env.SENTRY_DSN;

  // Skip initialization if no DSN provided
  if (!dsn) {
    console.log('⚠️  Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Profiling (captures function performance)
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    integrations: [
      // Node profiling
      nodeProfilingIntegration(),
    ],

    // Filter sensitive data
    beforeSend(event, hint) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
        delete event.request.headers['x-api-key'];
      }

      // Remove sensitive query params
      if (event.request?.query_string && typeof event.request.query_string === 'string') {
        const filtered = event.request.query_string
          .replace(/password=[^&]*/gi, 'password=***')
          .replace(/token=[^&]*/gi, 'token=***')
          .replace(/key=[^&]*/gi, 'key=***');
        event.request.query_string = filtered;
      }

      return event;
    },
  });

  console.log('✅ Sentry error tracking initialized');
}

/**
 * Express middleware to capture request context
 * (No longer needed in v8 - handled by setupExpressErrorHandler)
 */
export function sentryRequestHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}

/**
 * Express middleware for performance tracing
 * (No longer needed in v8 - handled by setupExpressErrorHandler)
 */
export function sentryTracingHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}

/**
 * Express error handler middleware (must be last)
 */
export function sentryErrorHandler() {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    // Capture error with request context
    Sentry.captureException(error, {
      tags: {
        path: req.path,
        method: req.method,
      },
      extra: {
        body: req.body,
        query: req.query,
        params: req.params,
      },
    });

    next(error);
  };
}

/**
 * Manually capture an error with additional context
 */
export function captureError(
  error: Error,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, any>;
    level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  }
): void {
  Sentry.captureException(error, {
    level: context?.level || 'error',
    tags: context?.tags,
    extra: context?.extra,
  });
}

/**
 * Capture a message (non-error event)
 */
export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info'
): void {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  username?: string;
}): void {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext(): void {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
): void {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
}

/**
 * Middleware to add user context from authenticated requests
 */
export function sentryContextMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user) {
      setUserContext({
        id: user.id || user.userId,
        email: user.email,
        username: user.username || user.name,
      });
    }

    next();
  };
}

/**
 * Wrap async route handlers to catch errors automatically
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      captureError(error, {
        tags: {
          route: req.path,
          method: req.method,
        },
        extra: {
          body: req.body,
          query: req.query,
        },
      });
      next(error);
    });
  };
}

/**
 * Test Sentry integration
 */
export function testSentry(): void {
  console.log('🧪 Testing Sentry integration...');
  
  try {
    // This will be caught and sent to Sentry
    throw new Error('Sentry test error - ignore this');
  } catch (error) {
    Sentry.captureException(error, {
      tags: { test: 'true' },
      level: 'debug',
    });
    console.log('✅ Sentry test error captured (check dashboard)');
  }
}

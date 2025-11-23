import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/email';
import authRoutes from './routes/auth.routes';
import bookingRoutes from './routes/booking.routes';
import esimRoutes from './routes/esim.routes';
import trainRoutes from './routes/train.routes';
import jazzCashRoutes from './payments/jazzcash/jazzcash.routes';
import {
  helmetConfig,
  generalRateLimit,
  authRateLimit,
  passwordResetRateLimit,
  bookingRateLimit,
  searchRateLimit,
  contentSecurityMiddleware,
  ipFilterMiddleware,
  securityLogger,
  corsOptions,
} from './middleware/security';

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware (Applied First)
app.use(helmetConfig); // Security headers
app.use(cors(corsOptions)); // CORS protection
app.use(securityLogger); // Security logging
app.use(ipFilterMiddleware); // IP filtering
app.use(express.json({ limit: '10mb' })); // Body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(contentSecurityMiddleware); // Malicious content detection

// Apply general rate limit to all routes
app.use(generalRateLimit);

// Health check (no rate limit)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    security: 'enabled',
  });
});

// API routes with specific rate limits
app.get('/api/v1/search/properties', searchRateLimit, (req, res) => {
  res.json({ message: 'Property search endpoint - coming soon' });
});

app.get('/api/v1/properties', (req, res) => {
  res.json({ message: 'Properties endpoint - coming soon' });
});

// Authentication routes with strict rate limiting (now using real implementation)
app.use('/api/v1/auth', authRateLimit, authRoutes);

// Booking routes with rate limiting
app.use('/api/v1/bookings', bookingRateLimit, bookingRoutes);

// eSIM routes with rate limiting
app.use('/api/v1/esim', bookingRateLimit, esimRoutes);

// Train booking routes (Pakistan Railway)
app.use('/api/v1/trains', bookingRateLimit, trainRoutes);

// JazzCash payment routes
app.use('/api/v1/payments/jazzcash', jazzCashRoutes);

// Legacy endpoints for backward compatibility
app.post('/api/v1/auth/login', authRateLimit, (req, res) => {
  res.status(301).json({ message: 'Use POST /api/v1/auth/login instead' });
});

app.post('/api/v1/auth/register', authRateLimit, (req, res) => {
  res.status(301).json({ message: 'Use POST /api/v1/auth/register instead' });
});

app.post('/api/v1/auth/password-reset', passwordResetRateLimit, (req, res) => {
  res.json({ message: 'Password reset endpoint - coming soon' });
});

// Booking routes - now using real implementation (moved above)
// Old placeholder routes removed

// Email routes
app.use('/api/v1/email', emailRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
  });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('🚨 Server Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BookMeThat Backend API running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 Mock Mode: Stripe=${process.env.USE_MOCK_STRIPE !== 'false'}, Airalo=${process.env.USE_MOCK_AIRALO !== 'false'}, Booking=${process.env.USE_MOCK_BOOKING !== 'false'}`);
  console.log(`🔒 Security features enabled:`);
  console.log(`   ✅ Rate limiting`);
  console.log(`   ✅ Malicious content detection`);
  console.log(`   ✅ IP filtering`);
  console.log(`   ✅ Security headers (Helmet)`);
  console.log(`   ✅ CORS protection`);
  console.log(`   ✅ Request logging`);
  console.log(`\n📚 API Endpoints:`);
  console.log(`   GET  /health - Health check`);
  console.log(`   POST /api/v1/auth/register - Create account`);
  console.log(`   POST /api/v1/auth/login - Login`);
  console.log(`   GET  /api/v1/auth/me - Get current user (requires auth)`);
  console.log(`   POST /api/v1/auth/logout - Logout`);
  console.log(`   POST /api/v1/bookings - Create booking`);
  console.log(`   GET  /api/v1/bookings - List bookings`);
  console.log(`   GET  /api/v1/bookings/:id - Get booking details`);
  console.log(`   PUT  /api/v1/bookings/:id/cancel - Cancel booking`);
  console.log(`   GET  /api/v1/bookings/:id/receipt - Get receipt`);
  console.log(`   GET  /api/v1/esim/plans - List eSIM plans`);
  console.log(`   POST /api/v1/esim/purchase - Purchase eSIM`);
  console.log(`   GET  /api/v1/esim - List user's eSIMs`);
  console.log(`   GET  /api/v1/esim/:id - Get eSIM with QR code`);
  console.log(`   GET  /api/v1/trains/stations - List train stations`);
  console.log(`   POST /api/v1/trains/search - Search trains`);
  console.log(`   POST /api/v1/trains/book - Book train (requires auth)`);
  console.log(`   GET  /api/v1/trains/booking/:pnr - Get booking by PNR`);
  console.log(`   POST /api/v1/trains/cancel - Cancel booking (requires auth)`);
});
# BookMeThat Backend API

Complete backend API for BookMeThat travel marketplace with hotels, flights, cars, activities, and eSIM provisioning.

## 🚀 Features Implemented

### ✅ Authentication System (JWT + bcrypt)
- **POST** `/api/v1/auth/register` - Create new user account
- **POST** `/api/v1/auth/login` - Login with email/password
- **POST** `/api/v1/auth/logout` - Logout (client-side token discard)
- **GET** `/api/v1/auth/me` - Get current user profile (requires auth token)

### ✅ Mock API Services (Ready for Real APIs)
All services work with mock data now - just swap environment variables when real API keys are obtained:

- **MockStripeService** - Payment processing simulation
- **MockAiraloService** - eSIM provisioning simulation  
- **MockBookingService** - Hotel/flight/car/activity search simulation

### ✅ Database Schema (Prisma)
Comprehensive schema with 10 models:
- `User` - Authentication, profile, loyalty points
- `Booking` - Main booking entity (polymorphic)
- `HotelBooking`, `FlightBooking`, `CarBooking`, `ActivityBooking` - Specific booking types
- `EsimOrder` - eSIM purchases with QR codes
- `Payment` - Stripe integration, refunds
- `Review` - Ratings and comments
- `Favorite` - User wishlists

### 🔒 Security Features
- Rate limiting on all routes
- Malicious content detection
- IP filtering
- Helmet security headers
- CORS protection
- Request logging

## 📦 Installation

```bash
cd backend
npm install
```

## 🔧 Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### Required Environment Variables

```env
# Database (PostgreSQL required for production)
DATABASE_URL="postgresql://user:password@localhost:5432/bookmethat_dev"

# JWT Authentication
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
BCRYPT_ROUNDS=10

# Mock APIs (set to false when real keys are available)
USE_MOCK_STRIPE=true
USE_MOCK_AIRALO=true
USE_MOCK_BOOKING=true

# Stripe (add real keys when ready)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLIC_KEY="pk_test_..."

# Airalo (add real keys when ready)
AIRALO_CLIENT_ID="your_client_id"
AIRALO_CLIENT_SECRET="your_secret"

# Application
NODE_ENV="development"
PORT=4000
CORS_ORIGINS="http://localhost:3000"
```

## 🗄️ Database Setup

### Option 1: Cloud PostgreSQL (Recommended for MVP)
1. Sign up at [Neon.tech](https://neon.tech) (free tier)
2. Create new project: "bookmethat-dev"
3. Copy connection string
4. Add to `.env` as `DATABASE_URL`

### Option 2: Local PostgreSQL
1. Install PostgreSQL 16 from [postgresql.org](https://www.postgresql.org/download/)
2. Create database: `CREATE DATABASE bookmethat_dev;`
3. Add connection string to `.env`

### Run Migrations
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

## 🏃‍♂️ Running the Server

### Development Mode
```bash
npm run dev
```

Server will run on `http://localhost:4000`

### Production Build
```bash
npm run build
npm start
```

## 📚 API Documentation

### Authentication

#### Register New User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_1234567890",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "loyaltyPoints": 0,
      "loyaltyTier": "basic"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Account created successfully"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_1234567890",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "loyaltyPoints": 150,
    "loyaltyTier": "silver"
  }
}
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-28T12:00:00.000Z",
  "security": "enabled"
}
```

## 🧪 Testing with Postman/Thunder Client

### 1. Register a User
- Method: POST
- URL: `http://localhost:4000/api/v1/auth/register`
- Body (JSON):
```json
{
  "email": "test@bookmethat.com",
  "password": "TestPass123!",
  "firstName": "Test",
  "lastName": "User"
}
```
- Save the `token` from response

### 2. Login
- Method: POST
- URL: `http://localhost:4000/api/v1/auth/login`
- Body (JSON):
```json
{
  "email": "test@bookmethat.com",
  "password": "TestPass123!"
}
```

### 3. Get Current User (Protected Route)
- Method: GET
- URL: `http://localhost:4000/api/v1/auth/me`
- Headers: `Authorization: Bearer <your_token>`

## 🔄 Mock to Real API Migration

When ready to use real APIs:

### Stripe
1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Update `.env`:
```env
STRIPE_SECRET_KEY="sk_live_your_real_key"
USE_MOCK_STRIPE=false
```
3. Restart server - automatically uses real Stripe SDK

### Airalo
1. Get API keys from [Airalo Partners](https://www.airalo.com/partners)
2. Update `.env`:
```env
AIRALO_CLIENT_ID="real_client_id"
AIRALO_CLIENT_SECRET="real_secret"
USE_MOCK_AIRALO=false
```
3. Implement real API adapter in `backend/src/services/airalo/`

### Booking Providers (Amadeus, Booking.com, etc.)
1. Get API keys from respective providers
2. Update `.env` with real keys
3. Set `USE_MOCK_BOOKING=false`
4. Implement real adapters

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema (10 models)
├── src/
│   ├── index.ts              # Main Express app
│   ├── routes/
│   │   ├── auth.routes.ts    # Authentication endpoints
│   │   └── email.ts          # Email routes
│   ├── services/
│   │   ├── mock/
│   │   │   ├── stripe.service.ts    # Mock Stripe
│   │   │   ├── airalo.service.ts    # Mock Airalo
│   │   │   └── booking.service.ts   # Mock booking providers
│   │   └── email.ts          # Email service
│   └── middleware/
│       └── security.ts       # Security middleware
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── package.json
└── tsconfig.json
```

## 🚧 Next Steps

1. **Setup PostgreSQL database** (Neon recommended)
2. **Run migrations** (`npx prisma migrate dev`)
3. **Build booking endpoints** (POST /api/bookings, GET, cancel)
4. **Build eSIM endpoints** (GET /api/esim/plans, POST /api/esim/purchase)
5. **Test all endpoints** with Postman
6. **Deploy backend** (Render, AWS Lambda, or Vercel Functions)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) in root directory.

## 📝 License

MIT - See [LICENSE](../LICENSE)

---

**Status:** ✅ Authentication implemented, Mock services ready, Database schema complete
**Next:** Setup PostgreSQL → Build booking/eSIM endpoints

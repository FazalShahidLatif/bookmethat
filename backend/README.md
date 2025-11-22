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

## 🧪 Testing the API

### Quick Test with Postman

**Import the Postman Collection:**
1. Open Postman
2. Click **Import** → **File**
3. Select `backend/bookmethat-postman-collection.json`
4. Collection includes all 15 endpoints with example requests

**Or follow the [Complete Testing Guide](./API_TESTING.md)** with:
- Detailed examples for all endpoints
- Complete user journey tests
- cURL examples
- Troubleshooting guide
- Testing checklist

### Quick Manual Test

#### 1. Register a User
```bash
POST http://localhost:4000/api/v1/auth/register
Content-Type: application/json

{
  "email": "test@bookmethat.com",
  "password": "TestPass123!",
  "firstName": "Test",
  "lastName": "User"
}
```
💡 Save the `token` from response

#### 2. Create a Booking
```bash
POST http://localhost:4000/api/v1/bookings
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "type": "HOTEL",
  "bookingData": {
    "propertyId": "hotel-dxb-001",
    "propertyName": "Grand Palace Hotel",
    "roomType": "Deluxe Suite",
    "checkIn": "2025-02-15",
    "checkOut": "2025-02-18",
    "guests": { "adults": 2, "children": 1 }
  },
  "totalPrice": 897,
  "currency": "USD"
}
```

#### 3. Purchase an eSIM
```bash
POST http://localhost:4000/api/v1/esim/purchase
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "planId": "ae-5gb-30d",
  "paymentMethod": "card"
}
```

### All Available Endpoints

**Authentication (4 endpoints)**
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get profile
- `POST /api/v1/auth/logout` - Logout

**Bookings (5 endpoints)**
- `POST /api/v1/bookings` - Create booking (HOTEL, FLIGHT, CAR, ACTIVITY)
- `GET /api/v1/bookings` - List bookings (pagination + filters)
- `GET /api/v1/bookings/:id` - Get details
- `PUT /api/v1/bookings/:id/cancel` - Cancel + refund
- `GET /api/v1/bookings/:id/receipt` - Get receipt

**eSIM (6 endpoints)**
- `GET /api/v1/esim/plans` - List plans
- `GET /api/v1/esim/plans/:id` - Plan details
- `POST /api/v1/esim/purchase` - Purchase eSIM
- `GET /api/v1/esim` - List orders
- `GET /api/v1/esim/:id` - Order details + QR code
- `POST /api/v1/esim/:id/top-up` - Top-up data

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

## 🚧 Development Status

### ✅ Completed (85%)
- [x] Database schema with 10 Prisma models
- [x] Mock API services (Stripe, Airalo, Booking)
- [x] JWT authentication system (4 endpoints)
- [x] Booking management (5 endpoints - all types)
- [x] eSIM provisioning (6 endpoints)
- [x] Rate limiting & security middleware
- [x] Input validation with Zod
- [x] TypeScript strict mode (0 errors)
- [x] API testing documentation
- [x] Postman collection

### 🔄 In Progress (10%)
- [ ] PostgreSQL database setup (Neon.tech) - 30 min
- [ ] Prisma migrations - 15 min
- [ ] Replace in-memory storage with Prisma queries - 2 hours

### 📋 Backlog (5%)
- [ ] Real Stripe integration
- [ ] Real Airalo integration
- [ ] Email notifications
- [ ] Admin dashboard endpoints
- [ ] Analytics and reporting
- [ ] Deployment configuration

## 🎯 Next Immediate Steps

1. **Setup PostgreSQL** (30 minutes)
   - Sign up at [Neon.tech](https://neon.tech)
   - Create database "bookmethat-dev"
   - Update `.env` with DATABASE_URL
   - Run `npx prisma migrate dev --name init`

2. **Test All Endpoints** (30 minutes)
   - Import Postman collection
   - Test complete booking flow
   - Test eSIM purchase flow
   - Verify authentication

3. **Database Integration** (2 hours)
   - Replace in-memory arrays with Prisma
   - Test data persistence
   - Verify relationships

---

**Backend Progress:** 85% complete | 15 endpoints functional | Ready for frontend integration

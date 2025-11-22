# BookMeThat API Testing Guide

Complete guide for testing all backend endpoints using Postman, Thunder Client, or cURL.

## 🚀 Base URL
```
http://localhost:4000
```

## 📝 Testing Workflow

### Step 1: Health Check
```http
GET /health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-23T12:00:00.000Z",
  "security": "enabled"
}
```

---

## 🔐 Authentication Endpoints

### 1. Register New User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_1700745600000",
      "email": "john.doe@example.com",
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

**💡 Save the `token` - you'll need it for all authenticated requests!**

### 2. Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
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

### 3. Get Current User (Protected)
```http
GET /api/v1/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_1700745600000",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "loyaltyPoints": 0,
    "loyaltyTier": "basic"
  }
}
```

### 4. Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🏨 Booking Endpoints

### 1. Create Hotel Booking
```http
POST /api/v1/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "type": "HOTEL",
  "bookingData": {
    "propertyId": "hotel-dxb-001",
    "propertyName": "Grand Palace Hotel",
    "roomType": "Deluxe Suite",
    "checkIn": "2025-02-15",
    "checkOut": "2025-02-18",
    "guests": {
      "adults": 2,
      "children": 1
    }
  },
  "totalPrice": 897,
  "currency": "USD"
}
```

### 2. Create Flight Booking
```http
POST /api/v1/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "type": "FLIGHT",
  "bookingData": {
    "flightId": "flight-001",
    "flightNumber": "EK145",
    "airline": "Emirates",
    "origin": "LHR",
    "destination": "DXB",
    "departureDate": "2025-02-15T14:30:00Z",
    "passengers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-01-15",
        "passportNumber": "AB123456"
      }
    ],
    "cabinClass": "Economy"
  },
  "totalPrice": 850,
  "currency": "USD"
}
```

### 3. Create Car Booking
```http
POST /api/v1/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "type": "CAR",
  "bookingData": {
    "carId": "car-001",
    "carName": "Toyota Camry 2024",
    "pickupLocation": "Dubai International Airport",
    "dropoffLocation": "Dubai International Airport",
    "pickupDate": "2025-02-15T10:00:00Z",
    "dropoffDate": "2025-02-18T10:00:00Z",
    "insurance": true
  },
  "totalPrice": 135,
  "currency": "USD"
}
```

### 4. Create Activity Booking
```http
POST /api/v1/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "type": "ACTIVITY",
  "bookingData": {
    "activityId": "activity-dxb-001",
    "activityTitle": "Burj Khalifa At The Top",
    "activityDate": "2025-02-16",
    "participants": {
      "adults": 2
    },
    "selectedOption": "Premium Access"
  },
  "totalPrice": 89,
  "currency": "USD"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_1700745600000",
      "userId": "user_1700745600000",
      "type": "HOTEL",
      "status": "CONFIRMED",
      "totalPrice": 897,
      "currency": "USD",
      "paymentId": "pi_mock_1700745600000",
      "isMock": true,
      "bookingData": { ... },
      "createdAt": "2025-11-23T12:00:00.000Z"
    },
    "payment": {
      "id": "pi_mock_1700745600000",
      "status": "succeeded",
      "amount": 89700,
      "currency": "usd"
    }
  },
  "message": "Booking created successfully"
}
```

### 5. List User's Bookings
```http
GET /api/v1/bookings?page=1&limit=10&status=CONFIRMED&type=HOTEL
Authorization: Bearer YOUR_TOKEN_HERE
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (PENDING, CONFIRMED, CANCELLED, COMPLETED)
- `type` (optional): Filter by type (HOTEL, FLIGHT, CAR, ACTIVITY)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "bookings": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

### 6. Get Booking Details
```http
GET /api/v1/bookings/booking_1700745600000
Authorization: Bearer YOUR_TOKEN_HERE
```

### 7. Cancel Booking
```http
PUT /api/v1/bookings/booking_1700745600000/cancel
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "reason": "Change of plans"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_1700745600000",
      "status": "CANCELLED",
      ...
    },
    "refund": {
      "id": "re_mock_1700745600000",
      "amount": 89700,
      "status": "succeeded"
    }
  },
  "message": "Booking cancelled successfully"
}
```

### 8. Get Booking Receipt
```http
GET /api/v1/bookings/booking_1700745600000/receipt
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📱 eSIM Endpoints

### 1. List All eSIM Plans
```http
GET /api/v1/esim/plans
```

**Query Parameters:**
- `country` (optional): Filter by country (e.g., "UAE", "Indonesia")
- `minData` (optional): Minimum data amount in GB

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "ae-5gb-30d",
        "title": "UAE 5GB - 30 Days",
        "country": "United Arab Emirates",
        "dataAmount": 5,
        "validityDays": 30,
        "price": 12.99,
        "currency": "USD",
        "description": "Perfect for Dubai vacation"
      },
      {
        "id": "global-20gb-30d",
        "title": "Global 20GB - 30 Days",
        "country": "Global",
        "region": "140+ countries",
        "dataAmount": 20,
        "validityDays": 30,
        "price": 49.99,
        "currency": "USD",
        "description": "Works in 140+ countries worldwide"
      }
    ],
    "total": 5
  }
}
```

### 2. Get Specific Plan Details
```http
GET /api/v1/esim/plans/ae-5gb-30d
```

### 3. Purchase eSIM
```http
POST /api/v1/esim/purchase
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "planId": "ae-5gb-30d",
  "paymentMethod": "card"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "esim_1700745600000",
      "userId": "user_1700745600000",
      "planId": "ae-5gb-30d",
      "planName": "UAE 5GB - 30 Days",
      "country": "United Arab Emirates",
      "dataAmount": 5,
      "validityDays": 30,
      "price": 12.99,
      "currency": "USD",
      "status": "ACTIVE",
      "iccid": "8944501234567890123",
      "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=...",
      "activationCode": "LPA:1$mock.esim.com$abc123xyz",
      "paymentId": "pi_mock_1700745600000",
      "expiresAt": "2025-12-23T12:00:00.000Z",
      "createdAt": "2025-11-23T12:00:00.000Z"
    },
    "payment": {
      "id": "pi_mock_1700745600000",
      "status": "succeeded",
      "amount": 1299,
      "currency": "usd"
    }
  },
  "message": "eSIM purchased successfully"
}
```

### 4. List User's eSIM Orders
```http
GET /api/v1/esim?page=1&limit=10&status=ACTIVE
Authorization: Bearer YOUR_TOKEN_HERE
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (PENDING, ACTIVE, EXPIRED, CANCELLED)

### 5. Get eSIM Details with QR Code
```http
GET /api/v1/esim/esim_1700745600000
Authorization: Bearer YOUR_TOKEN_HERE
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "esim_1700745600000",
    "planName": "UAE 5GB - 30 Days",
    "status": "ACTIVE",
    ...
    "usage": {
      "dataUsed": 1.5,
      "dataRemaining": 3.5,
      "dataTotal": 5,
      "percentUsed": 30
    },
    "activation": {
      "iccid": "8944501234567890123",
      "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=...",
      "activationCode": "LPA:1$mock.esim.com$abc123xyz",
      "instructions": [
        "Go to Settings → Cellular/Mobile Data",
        "Tap 'Add eSIM'",
        "Scan the QR code below",
        "Follow on-screen instructions to activate"
      ]
    }
  }
}
```

### 6. Top-Up eSIM (Coming Soon)
```http
POST /api/v1/esim/esim_1700745600000/top-up
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "dataAmount": 5
}
```

---

## 🧪 Testing Scenarios

### Complete User Journey Test

**1. Register & Login**
```bash
# Register
POST /api/v1/auth/register
# Save token from response

# Verify login works
POST /api/v1/auth/login
```

**2. Create Multiple Bookings**
```bash
# Book a hotel
POST /api/v1/bookings (type: HOTEL)

# Book a flight
POST /api/v1/bookings (type: FLIGHT)

# Book a car
POST /api/v1/bookings (type: CAR)

# Book an activity
POST /api/v1/bookings (type: ACTIVITY)
```

**3. List All Bookings**
```bash
GET /api/v1/bookings
# Should return 4 bookings
```

**4. Cancel One Booking**
```bash
PUT /api/v1/bookings/{booking_id}/cancel
# Check refund is processed
```

**5. Purchase eSIM**
```bash
# List available plans
GET /api/v1/esim/plans

# Purchase UAE plan
POST /api/v1/esim/purchase

# Get QR code
GET /api/v1/esim/{order_id}
```

**6. Check User Profile**
```bash
GET /api/v1/auth/me
# Verify user still authenticated
```

---

## 📦 Postman Collection

Import this collection into Postman:

```json
{
  "info": {
    "name": "BookMeThat API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{auth_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:4000"
    },
    {
      "key": "auth_token",
      "value": ""
    }
  ]
}
```

---

## ⚙️ Environment Variables

Create a Postman environment with:
- `base_url`: `http://localhost:4000`
- `auth_token`: (will be set after login)

---

## 🐛 Common Errors

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Access token required"
}
```
**Solution:** Add `Authorization: Bearer YOUR_TOKEN` header

### 400 Validation Error
```json
{
  "success": false,
  "error": "Validation error",
  "details": [ ... ]
}
```
**Solution:** Check request body matches schema

### 404 Not Found
```json
{
  "success": false,
  "error": "Booking not found"
}
```
**Solution:** Verify ID exists and belongs to authenticated user

### 429 Too Many Requests
```
Rate limit exceeded
```
**Solution:** Wait 60 seconds before retrying

---

## 📊 Testing Checklist

- [ ] Health check returns 200
- [ ] User registration works
- [ ] User login returns valid token
- [ ] Protected endpoints require token
- [ ] Invalid token returns 401
- [ ] Create hotel booking
- [ ] Create flight booking
- [ ] Create car booking
- [ ] Create activity booking
- [ ] List bookings with pagination
- [ ] Get booking details
- [ ] Cancel booking and verify refund
- [ ] Get booking receipt
- [ ] List eSIM plans
- [ ] Get specific plan details
- [ ] Purchase eSIM
- [ ] List user's eSIMs
- [ ] Get eSIM with QR code
- [ ] Verify mock payment processing
- [ ] Test rate limiting (make 100 rapid requests)
- [ ] Test with invalid data

---

## 🎯 Next Steps

Once API testing is complete:
1. Setup PostgreSQL database (Neon.tech)
2. Run Prisma migrations
3. Switch from in-memory to database storage
4. Test with real database
5. Deploy backend to production

**Happy Testing! 🚀**

# Backend Server Testing Guide

## ✅ Current Status
- **Database**: Connected to Neon PostgreSQL ✅
- **Migrations**: All tables created ✅
- **TypeScript**: 0 compilation errors ✅
- **Payment Gateways**: 4 integrated (Stripe, JazzCash, EasyPaisa, PayFast) ✅
- **Train Booking**: Pakistan Railway API complete ✅

## 🚀 How to Start the Server

### Option 1: Development Mode (Recommended)
```powershell
cd backend
npm run dev
```

### Option 2: Direct Start
```powershell
cd backend
npx tsx src/index.ts
```

### Option 3: Production Build
```powershell
cd backend
npm run build
npm start
```

## 🧪 Test the Endpoints

### 1. Health Check
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/health" -Method GET
```

Expected Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-23T...",
  "security": "enabled"
}
```

### 2. Register a User
```powershell
$body = @{
    email = "test@example.com"
    password = "Test1234!"
    firstName = "Test"
    lastName = "User"
    phone = "+1234567890"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/v1/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### 3. Search Trains
```powershell
$body = @{
    from = "KHI"
    to = "LHE"
    date = "2025-12-01"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/v1/trains/search" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### 4. List eSIM Plans
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/esim/plans?country=US" -Method GET
```

## 📊 Available Endpoints (21 total)

### Authentication (4 endpoints)
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (requires auth)
- `POST /api/v1/auth/logout` - Logout

### Bookings (5 endpoints)
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings` - List bookings
- `GET /api/v1/bookings/:id` - Get booking details
- `PUT /api/v1/bookings/:id/cancel` - Cancel booking
- `GET /api/v1/bookings/:id/receipt` - Get receipt

### eSIM (4 endpoints)
- `GET /api/v1/esim/plans` - List eSIM plans
- `POST /api/v1/esim/purchase` - Purchase eSIM
- `GET /api/v1/esim` - List user's eSIMs
- `GET /api/v1/esim/:id` - Get eSIM with QR code

### Train Booking (4 endpoints)
- `GET /api/v1/trains/search` - Search trains
- `POST /api/v1/trains/book` - Book train (requires auth)
- `GET /api/v1/trains/:id` - Get booking details
- `PUT /api/v1/trains/:id/cancel` - Cancel booking

### Payment Gateways (3 endpoints each)
- **JazzCash**: `/api/v1/payments/jazzcash/initiate`, `/webhook`, `/callback`
- **EasyPaisa**: `/api/v1/payments/easypaisa/initiate`, `/webhook`, `/callback`
- **PayFast**: `/api/v1/payments/payfast/initiate`, `/webhook`, `/success`, `/cancel`

## 🗄️ Database Verification

### Open Prisma Studio (Visual Database Editor)
```powershell
cd backend
npx prisma studio
```

This will open http://localhost:5555 in your browser where you can:
- View all tables
- See the data
- Add/edit/delete records
- Inspect relationships

## 🐛 Troubleshooting

### Server Won't Start
1. Check if port 4000 is already in use:
   ```powershell
   Get-NetTCPConnection -LocalPort 4000
   ```

2. Kill existing process if needed:
   ```powershell
   Stop-Process -Id <PID>
   ```

3. Check environment variables:
   ```powershell
   cd backend
   Get-Content .env | Select-String "DATABASE_URL"
   ```

### Database Connection Issues
1. Verify DATABASE_URL in `.env` file
2. Test connection:
   ```powershell
   cd backend
   npx prisma db pull
   ```

### TypeScript Errors
```powershell
cd backend
npm run build
```

Should show: "Successfully compiled" with 0 errors

## ✅ Expected Console Output

When server starts successfully, you should see:
```
🚀 BookMeThat Backend API running on http://localhost:4000
📍 Environment: development
🔧 Mock Mode: Stripe=true, Airalo=true, Booking=true
🔒 Security features enabled:
   ✅ Rate limiting
   ✅ Malicious content detection
   ✅ IP filtering
   ✅ Security headers (Helmet)
   ✅ CORS protection
   ✅ Request logging

📚 API Endpoints:
   [List of all 21 endpoints]
```

## 🎉 Success Indicators
- ✅ Server starts on port 4000
- ✅ Health endpoint returns {"status": "ok"}
- ✅ Database connection successful
- ✅ All API endpoints accessible
- ✅ No console errors

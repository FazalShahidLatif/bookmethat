# Email Server Setup Guide

## Quick Start (5 minutes)

### Option 1: Gmail SMTP (Easiest for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "bookmethat"
   - Copy the 16-character password

3. **Update backend/.env.local**:
```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
SMTP_FROM=noreply@bookmethat.com
```

4. **Test the connection**:
```bash
cd backend
npm run dev
```

Then test: http://localhost:4000/api/v1/email/verify

### Option 2: AWS SES (Production Ready)

1. **Sign up for AWS** and verify your email/domain in SES
2. **Create IAM User** with SES send permissions
3. **Update backend/.env.local**:
```env
EMAIL_PROVIDER=ses
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
SES_FROM_EMAIL=noreply@bookmethat.com
```

## Email Templates Available

### 1. Booking Confirmation
```typescript
POST /api/v1/email/booking-confirmation

{
  "to": "customer@example.com",
  "bookingId": "BK123456",
  "propertyName": "Luxury Hotel Dubai",
  "checkIn": "2025-12-01",
  "checkOut": "2025-12-05",
  "guestName": "John Doe",
  "totalPrice": "$1,500"
}
```

### 2. Welcome Email
```typescript
POST /api/v1/email/welcome

{
  "to": "newuser@example.com",
  "name": "Jane Smith",
  "email": "newuser@example.com"
}
```

### 3. Password Reset
```typescript
POST /api/v1/email/password-reset

{
  "to": "user@example.com",
  "name": "John",
  "resetLink": "https://bookmethat.com/reset-password?token=abc123"
}
```

### 4. Payment Receipt
```typescript
POST /api/v1/email/send

{
  "to": "customer@example.com",
  "template": "paymentReceipt",
  "templateData": {
    "bookingId": "BK123456",
    "amount": "$1,500",
    "date": "2025-11-21",
    "paymentMethod": "Visa ****1234"
  }
}
```

### 5. Booking Cancellation
```typescript
POST /api/v1/email/send

{
  "to": "customer@example.com",
  "template": "bookingCancellation",
  "templateData": {
    "bookingId": "BK123456",
    "propertyName": "Luxury Hotel",
    "guestName": "John Doe",
    "refundAmount": "$1,200"
  }
}
```

## Frontend Integration

### Example: Send booking confirmation after payment

```typescript
// frontend/src/lib/api.ts
export async function sendBookingConfirmation(booking: Booking) {
  const response = await fetch(`${API_URL}/api/v1/email/booking-confirmation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: booking.guestEmail,
      bookingId: booking.id,
      propertyName: booking.property.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guestName: booking.guestName,
      totalPrice: `$${booking.totalPrice}`,
    }),
  });

  return response.json();
}
```

### Example: Send welcome email on signup

```typescript
// frontend/src/app/api/auth/register/route.ts
import { emailService } from '@/lib/email-client';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  
  // Create user...
  const user = await createUser({ name, email, password });
  
  // Send welcome email
  await fetch(`${process.env.API_URL}/api/v1/email/welcome`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      name: name,
      email: email,
    }),
  });
  
  return NextResponse.json({ success: true });
}
```

## Testing Emails

### 1. Use MailHog (Local Development)
```bash
# Install MailHog
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog

# Update .env.local
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
```

View emails at: http://localhost:8025

### 2. Use Mailtrap (Testing)
```bash
# Sign up at https://mailtrap.io
# Update .env.local with Mailtrap credentials
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASSWORD=your_mailtrap_password
```

### 3. Test via API

```bash
# Verify connection
curl http://localhost:4000/api/v1/email/verify

# Send test welcome email
curl -X POST http://localhost:4000/api/v1/email/welcome \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "name": "Test User",
    "email": "test@example.com"
  }'
```

## Email Features

✅ **5 Pre-built Templates**
- Booking confirmation with full details
- Welcome email for new users
- Password reset with secure link
- Payment receipt with transaction details
- Booking cancellation with refund info

✅ **Professional Design**
- Responsive HTML templates
- Mobile-optimized layouts
- Brand colors and styling
- Plain text fallback

✅ **Multiple Providers**
- SMTP (Gmail, Outlook, etc.)
- AWS SES (production scale)
- Easy to add SendGrid, Mailgun

✅ **Validation & Error Handling**
- Input validation with express-validator
- Detailed error messages
- Connection verification endpoint

✅ **Attachments Support**
- PDF receipts
- Booking confirmations
- Travel documents

## Production Recommendations

### For < 10K emails/month
**Use Gmail SMTP**
- Free
- Easy setup
- Reliable delivery
- Daily limit: 2,000 emails

### For 10K - 100K emails/month
**Use AWS SES**
- $0.10 per 1,000 emails
- High deliverability
- No daily limits
- Detailed analytics

### For > 100K emails/month
**Use SendGrid or Mailgun**
- Better analytics
- Template management
- A/B testing
- Dedicated IP address

## Security Best Practices

1. ✅ **Never commit credentials** - use .env files
2. ✅ **Use app passwords** - not your main Gmail password
3. ✅ **Verify email addresses** - prevent spam/abuse
4. ✅ **Rate limit email endpoints** - prevent flooding
5. ✅ **Log email sends** - track delivery issues
6. ✅ **Handle bounces** - monitor rejected emails

## Monitoring

### Track Email Metrics
- Delivery rate (should be > 95%)
- Open rate (industry avg: 20-25%)
- Click-through rate
- Bounce rate (keep < 2%)
- Complaint rate (keep < 0.1%)

### Set up Alerts
- Failed delivery attempts
- High bounce rates
- SMTP connection failures

## Troubleshooting

### Emails not sending?
```bash
# Check connection
curl http://localhost:4000/api/v1/email/verify

# Check logs
cd backend
npm run dev
# Look for connection errors
```

### Gmail blocking?
- Enable "Less secure app access" OR
- Use app-specific password (recommended)
- Check daily sending limits

### AWS SES issues?
- Verify sender email/domain
- Request production access (initially sandbox)
- Check IAM permissions

## Files Created

```
backend/
├── src/
│   ├── services/
│   │   └── email.ts           # Email service with templates
│   └── routes/
│       └── email.ts           # Email API endpoints
└── .env.local                 # Email credentials (not committed)

.env.example                   # Updated with email config
```

## Next Steps

1. ✅ Choose email provider (Gmail for dev, AWS SES for prod)
2. ✅ Configure credentials in `backend/.env.local`
3. ✅ Test with verification endpoint
4. ✅ Integrate into booking flow
5. ✅ Set up email analytics
6. ✅ Monitor delivery rates

---

**Email server is ready!** 🎉 Just add your SMTP credentials and start sending.

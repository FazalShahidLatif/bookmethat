# Email Configuration Guide

## ⚠️ ACTION REQUIRED

This project needs email service credentials to send transactional emails (booking confirmations, welcome emails, cancellation notifications).

**Current Status:** 🔴 **MOCK MODE** (emails only logged to console)

---

## Recommended Email Providers

### 1. SendGrid (⭐ RECOMMENDED)

**Why SendGrid?**
- ✅ 100 emails/day on free tier
- ✅ Excellent deliverability rates
- ✅ Easy setup with API key
- ✅ Great analytics dashboard
- ✅ Trusted by companies worldwide

**Setup Steps:**
1. Sign up at https://sendgrid.com
2. Verify your sender email (info@bookmethat.com)
3. Generate an API Key from Settings → API Keys
4. Add to `backend/.env`:

```env
EMAIL_SERVICE=SendGrid
EMAIL_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=BookMeThat <info@bookmethat.com>
```

**Cost:** Free up to 100 emails/day, then $14.95/month for 40,000 emails

---

### 2. Mailgun

**Why Mailgun?**
- ✅ 5,000 emails/month free
- ✅ Great for transactional emails
- ✅ Simple SMTP integration
- ✅ Good deliverability

**Setup Steps:**
1. Sign up at https://mailgun.com
2. Add and verify domain (bookmethat.com)
3. Get SMTP credentials from Settings
4. Add to `backend/.env`:

```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@mg.bookmethat.com
EMAIL_PASSWORD=your-mailgun-password-here
EMAIL_FROM=BookMeThat <info@bookmethat.com>
```

**Cost:** Free for 5,000 emails/month, then $35/month for 50,000 emails

---

### 3. Amazon SES (For High Volume)

**Why Amazon SES?**
- ✅ Extremely cheap ($0.10 per 1,000 emails)
- ✅ Highly scalable
- ✅ Integrates with AWS infrastructure

**Setup Steps:**
1. Sign up for AWS account
2. Enable Amazon SES
3. Verify info@bookmethat.com
4. Get SMTP credentials
5. Add to `backend/.env`:

```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-aws-smtp-username
EMAIL_PASSWORD=your-aws-smtp-password
EMAIL_FROM=BookMeThat <info@bookmethat.com>
```

**Cost:** $0.10 per 1,000 emails (after free tier of 62,000 emails/month if using EC2)

---

### 4. Postmark (Premium Option)

**Why Postmark?**
- ✅ Best-in-class deliverability
- ✅ Fast delivery (under 2 seconds)
- ✅ Excellent support
- ✅ No free tier but very reliable

**Setup Steps:**
1. Sign up at https://postmarkapp.com
2. Add server and verify domain
3. Get server API token
4. Add to `backend/.env`:

```env
EMAIL_SERVICE=Postmark
EMAIL_API_KEY=your-postmark-server-api-token
EMAIL_FROM=BookMeThat <info@bookmethat.com>
```

**Cost:** $15/month for 10,000 emails

---

## Quick Start (Development)

For testing during development, you can use Gmail (not recommended for production):

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=BookMeThat <your-email@gmail.com>
```

**Note:** You'll need to generate an App Password from your Google Account settings.

---

## Environment Variables Reference

Add these to `backend/.env`:

### Option 1: Service-based (SendGrid, Postmark)
```env
EMAIL_SERVICE=SendGrid
EMAIL_API_KEY=your-api-key-here
EMAIL_FROM=BookMeThat <info@bookmethat.com>
```

### Option 2: SMTP (Mailgun, SES, Gmail)
```env
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_USER=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
EMAIL_FROM=BookMeThat <info@bookmethat.com>
```

---

## Email Types Sent by the Platform

1. **Welcome Email** - Sent when user registers
2. **Train Booking Confirmation** - Sent after successful booking with PNR, passenger details, journey info
3. **Booking Cancellation** - Sent when booking is cancelled with refund details
4. **Password Reset** (Coming soon)
5. **Payment Receipt** (Coming soon)

---

## Testing Email Configuration

After adding credentials to `.env`:

1. Restart the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see:
   ```
   ✅ Email service configured successfully
   📧 Sending emails from: BookMeThat <info@bookmethat.com>
   ```

3. Test by registering a new user or making a booking

---

## Production Checklist

Before deploying to production:

- [ ] Email service credentials configured
- [ ] `EMAIL_FROM` uses info@bookmethat.com or noreply@bookmethat.com
- [ ] Domain verified with email provider
- [ ] SPF and DKIM records added to DNS
- [ ] Test emails sent successfully
- [ ] Email templates reviewed for branding
- [ ] Rate limits appropriate for your plan

---

## Troubleshooting

### Emails not sending?

1. Check backend console for error messages
2. Verify credentials in `.env` file
3. Ensure email provider account is active
4. Check spam folder for test emails
5. Verify domain/sender email is verified with provider

### "Authentication failed" error?

- Double-check EMAIL_USER and EMAIL_PASSWORD
- For SendGrid, username should be "apikey"
- For Gmail, use App Password, not regular password

### Emails going to spam?

- Set up SPF, DKIM, and DMARC records
- Use a verified domain (not Gmail/Yahoo)
- SendGrid/Mailgun handle this automatically

---

## 📝 TODO: Provide Email Credentials

**Please provide the following:**

1. **Preferred email provider:** __________________ (e.g., SendGrid, Mailgun)
2. **Sender email:** info@bookmethat.com (or preferred address)
3. **Credentials:**
   - API Key (for SendGrid): __________________
   - OR SMTP Username: __________________
   - OR SMTP Password: __________________

Once provided, I'll update the `.env` file and test the configuration.

---

## Support

For email provider setup help:
- **SendGrid:** https://docs.sendgrid.com
- **Mailgun:** https://documentation.mailgun.com
- **Amazon SES:** https://docs.aws.amazon.com/ses
- **Postmark:** https://postmarkapp.com/support

---

**Last Updated:** November 24, 2025

# 📧 Hostinger Email Setup Guide

Complete guide to setting up professional email for BookMeThat using Hostinger Business Email.

---

## ✅ Why Hostinger?

- ✅ **Professional Domain Email** - `noreply@bookmethat.com`, `info@bookmethat.com`
- ✅ **Reliable SMTP** - High deliverability rates
- ✅ **Included with Hosting** - Often free with hosting plan
- ✅ **Easy Management** - Web interface at hpanel.hostinger.com
- ✅ **Multiple Addresses** - Create unlimited email accounts
- ✅ **No Daily Limits** - Unlike Gmail (500/day) or SendGrid Free (100/day)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Email Account

1. **Login to Hostinger Panel**
   ```
   https://hpanel.hostinger.com/
   ```

2. **Navigate to Email Accounts**
   - Click "Emails" in the left sidebar
   - Select your domain: `bookmethat.com`
   - Click "Create Email Account"

3. **Create These Accounts**
   ```
   noreply@bookmethat.com     (for automated emails)
   info@bookmethat.com        (for customer support)
   admin@bookmethat.com       (for admin notifications)
   ```

4. **Set Strong Passwords**
   - Use a password manager
   - Save credentials securely

### Step 2: Get SMTP Credentials

Hostinger SMTP settings are standard:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465 (SSL) or 587 (TLS)
SMTP_SECURE=true (for port 465)
SMTP_USER=noreply@bookmethat.com
SMTP_PASSWORD=your_email_password_here
```

### Step 3: Update Backend `.env`

Edit `backend/.env`:

```env
# Email (Hostinger SMTP)
EMAIL_PROVIDER="smtp"
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="noreply@bookmethat.com"
SMTP_PASSWORD="your_actual_password"
SMTP_FROM="noreply@bookmethat.com"
```

### Step 4: Test Email Sending

```bash
cd backend
npm run dev
```

Test in another terminal:
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-test-email@gmail.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

You should receive a welcome email! 🎉

---

## 📋 Configuration Details

### Port Options

| Port | Protocol | Use Case |
|------|----------|----------|
| **465** | SSL/TLS | ✅ Recommended (most secure) |
| **587** | STARTTLS | Alternative if 465 blocked |
| 25 | Plain | ❌ Not recommended |

### Security Settings

```typescript
// For port 465 (SSL)
{
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,  // Use SSL
  auth: {
    user: 'noreply@bookmethat.com',
    pass: 'your_password'
  }
}

// For port 587 (TLS)
{
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,  // Upgrade to TLS with STARTTLS
  auth: {
    user: 'noreply@bookmethat.com',
    pass: 'your_password'
  }
}
```

---

## 🔧 Troubleshooting

### Problem: "Authentication Failed"

**Solution 1:** Check credentials
```bash
# Test SMTP connection manually
telnet smtp.hostinger.com 587
EHLO bookmethat.com
AUTH LOGIN
[Enter base64 encoded username]
[Enter base64 encoded password]
```

**Solution 2:** Check email account status
- Login to Hostinger hPanel
- Verify email account is active
- Check password is correct

### Problem: "Connection Timeout"

**Solution 1:** Check firewall
```bash
# Test port connectivity
telnet smtp.hostinger.com 465
telnet smtp.hostinger.com 587
```

**Solution 2:** Try alternative port
- If 465 blocked, use 587
- Update `SMTP_PORT` and `SMTP_SECURE` in `.env`

### Problem: Emails Going to Spam

**Solution:** Configure SPF, DKIM, DMARC records

1. **Add SPF Record** (Usually auto-configured by Hostinger)
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.hostinger.com ~all
   ```

2. **Enable DKIM** (in Hostinger Email settings)
   - Go to Email → DKIM Settings
   - Click "Enable DKIM"
   - Copy provided DNS records
   - Add to your domain's DNS

3. **Add DMARC Record**
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=quarantine; rua=mailto:admin@bookmethat.com
   ```

### Problem: "Daily Limit Exceeded"

✅ **Good News:** Hostinger has no daily sending limits (unlike Gmail)

If you see this error:
- Check if you're accidentally using Gmail settings
- Verify `SMTP_HOST` is `smtp.hostinger.com`

---

## 📊 Email Templates Active

The backend automatically sends these emails:

| Template | Trigger | Recipient |
|----------|---------|-----------|
| **Welcome Email** | User registration | New user |
| **Booking Confirmation** | Train booking complete | Customer |
| **Cancellation Notice** | Booking cancelled | Customer |
| **Password Reset** | Forgot password | User |
| **Payment Receipt** | Payment successful | Customer |

All templates are in `backend/src/services/email.ts`

---

## 🎨 Email Customization

### Change Sender Name

```env
# Instead of just email
SMTP_FROM="noreply@bookmethat.com"

# Use formatted name
SMTP_FROM="BookMeThat <noreply@bookmethat.com>"
```

### Update Email Templates

Edit templates in `backend/src/services/email.ts`:

```typescript
export const emailTemplates = {
  bookingConfirmation: (data) => ({
    subject: `🎉 Booking Confirmed - ${data.propertyName}`,
    html: `
      <!-- Your custom HTML here -->
    `,
    text: `Plain text version`
  })
}
```

### Add New Email Type

```typescript
// Add to emailService class
async sendCustomEmail(data: any): Promise<boolean> {
  return this.sendEmail({
    to: data.to,
    subject: 'Your Subject',
    html: '<p>Your HTML content</p>',
    text: 'Plain text version'
  });
}
```

---

## 📈 Best Practices

### 1. Use Separate Accounts
```
noreply@bookmethat.com  → Automated emails (bookings, notifications)
info@bookmethat.com     → Customer support (monitored inbox)
admin@bookmethat.com    → System alerts, errors
```

### 2. Set Reply-To Header
```typescript
const mailOptions = {
  from: 'noreply@bookmethat.com',
  replyTo: 'info@bookmethat.com',  // Support inbox
  to: customer.email,
  subject: 'Booking Confirmation'
}
```

### 3. Monitor Deliverability
- Check spam rates weekly
- Keep bounce rate < 2%
- Monitor complaints
- Use email validation before sending

### 4. Handle Bounces
```typescript
// Add bounce handling
smtpTransporter.on('bounce', (info) => {
  console.log('Bounced:', info);
  // Mark email as invalid in database
});
```

---

## 🔐 Security Checklist

- [x] Use strong password for email accounts
- [x] Enable two-factor authentication on Hostinger
- [x] Store credentials in `.env` (never commit!)
- [x] Use environment variables in production
- [x] Configure SPF, DKIM, DMARC records
- [x] Enable SSL/TLS (port 465)
- [x] Monitor for suspicious activity
- [x] Rotate passwords every 90 days

---

## 📦 Production Deployment

### Render.com / Railway

```bash
# Add environment variables in dashboard
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@bookmethat.com
SMTP_PASSWORD=your_password
SMTP_FROM=noreply@bookmethat.com
```

### Docker

```dockerfile
# Pass as build args
ENV SMTP_HOST=smtp.hostinger.com
ENV SMTP_PORT=465
ENV SMTP_USER=noreply@bookmethat.com
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
```

### Netlify Functions

```javascript
// netlify/functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  
  // Send email...
};
```

---

## 🆘 Need Help?

### Hostinger Support
- **Live Chat:** https://www.hostinger.com/
- **Knowledge Base:** https://support.hostinger.com/
- **Email:** support@hostinger.com

### Email Not Working?
1. Check credentials in hPanel
2. Verify SMTP settings match exactly
3. Test with telnet (see troubleshooting)
4. Check application logs for errors
5. Contact Hostinger support if needed

---

## ✅ Verification Steps

After setup, verify everything works:

### 1. Test Welcome Email
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

### 2. Check Logs
```bash
cd backend
npm run dev

# Look for:
# ✅ "Email sent: <message-id>"
# ❌ "Email send error: ..."
```

### 3. Verify Delivery
- Check recipient inbox
- Check spam folder
- Verify sender shows as "bookmethat.com"
- Check email formatting looks good

### 4. Test All Templates
```bash
# Welcome email - via registration
# Booking confirmation - via train booking
# Cancellation - via booking cancellation
```

---

## 🎉 Success Criteria

Your email is properly configured when:

- ✅ Welcome emails arrive within 30 seconds
- ✅ Emails appear in inbox (not spam)
- ✅ Sender shows as `noreply@bookmethat.com`
- ✅ HTML formatting displays correctly
- ✅ Links in emails work properly
- ✅ No authentication errors in logs
- ✅ Can send 100+ emails without issues

---

## 📚 Additional Resources

- **Hostinger Email Docs:** https://support.hostinger.com/en/collections/1996300-email
- **Nodemailer Docs:** https://nodemailer.com/
- **SMTP Test Tool:** https://www.smtper.net/
- **Email Deliverability:** https://www.mail-tester.com/

---

**Status:** ✅ Ready to use Hostinger email
**Last Updated:** November 24, 2025
**Next Step:** Add your Hostinger email password to `backend/.env`

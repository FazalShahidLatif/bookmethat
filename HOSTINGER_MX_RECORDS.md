# 📬 Hostinger MX Records Configuration Guide

Complete guide to setting up MX (Mail Exchange) records for BookMeThat email with Hostinger.

---

## 🎯 What are MX Records?

MX Records tell other email servers where to deliver emails sent to `@bookmethat.com` addresses.

**Example:** When someone replies to `noreply@bookmethat.com`, MX records direct that email to Hostinger's mail servers.

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Access DNS Management

**If Domain Registered with Hostinger:**
1. Login to https://hpanel.hostinger.com/
2. Click "Domains" in sidebar
3. Select `bookmethat.com`
4. Click "DNS / Name Servers"

**If Domain Registered Elsewhere (GoDaddy, Namecheap, etc.):**
1. Login to your domain registrar
2. Find DNS Management / DNS Settings
3. Look for "Add Record" or "DNS Zone Editor"

---

### Step 2: Add Hostinger MX Records

Delete any existing MX records first, then add these:

#### **Primary MX Record**
```
Type: MX
Name: @ (or leave blank for root domain)
Value: mx1.hostinger.com
Priority: 10
TTL: 14400 (or default)
```

#### **Secondary MX Record (Backup)**
```
Type: MX
Name: @ (or leave blank)
Value: mx2.hostinger.com
Priority: 20
TTL: 14400 (or default)
```

**Priority Explanation:**
- Lower number = Higher priority
- 10 = Primary mail server (mx1)
- 20 = Backup mail server (mx2)

---

### Step 3: Add SPF Record (Prevent Spoofing)

SPF (Sender Policy Framework) prevents others from sending fake emails from your domain.

```
Type: TXT
Name: @ (or leave blank)
Value: v=spf1 include:_spf.hostinger.com ~all
TTL: 14400
```

**What this means:**
- `v=spf1` = SPF version 1
- `include:_spf.hostinger.com` = Allow Hostinger servers
- `~all` = Soft fail for others (mark as spam)

---

### Step 4: Add DKIM Record (Email Authentication)

DKIM (DomainKeys Identified Mail) proves emails are really from you.

1. **Get DKIM Key from Hostinger:**
   - Go to hPanel → Emails
   - Click on your email account
   - Find "DKIM Settings"
   - Click "Enable DKIM"
   - Copy the provided TXT record

2. **Add to DNS:**
```
Type: TXT
Name: default._domainkey (or as shown in Hostinger)
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN... (long key from Hostinger)
TTL: 14400
```

---

### Step 5: Add DMARC Record (Reporting)

DMARC tells servers what to do with failed authentication and sends you reports.

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:admin@bookmethat.com; ruf=mailto:admin@bookmethat.com; fo=1
TTL: 14400
```

**Policy Options:**
- `p=none` = Monitor only (recommended for testing)
- `p=quarantine` = Send to spam (recommended for production)
- `p=reject` = Block completely (strictest)

---

## 📋 Complete DNS Records Summary

Here's what your DNS should look like after setup:

| Type | Name | Value | Priority | TTL |
|------|------|-------|----------|-----|
| **MX** | @ | mx1.hostinger.com | 10 | 14400 |
| **MX** | @ | mx2.hostinger.com | 20 | 14400 |
| **TXT** | @ | v=spf1 include:_spf.hostinger.com ~all | - | 14400 |
| **TXT** | default._domainkey | v=DKIM1; k=rsa; p=... (from Hostinger) | - | 14400 |
| **TXT** | _dmarc | v=DMARC1; p=quarantine; rua=mailto:admin@bookmethat.com | - | 14400 |
| **A** | @ | Your server IP | - | 14400 |
| **CNAME** | www | @ | - | 14400 |

---

## ⏱️ Propagation Time

**How long until changes work:**
- **Hostinger DNS:** 15-30 minutes
- **Other registrars:** 1-24 hours (usually 2-4 hours)
- **Worldwide:** Up to 48 hours (rare)

**Check propagation:**
```bash
# Windows PowerShell
nslookup -type=mx bookmethat.com

# Expected output:
bookmethat.com  MX preference = 10, mail exchanger = mx1.hostinger.com
bookmethat.com  MX preference = 20, mail exchanger = mx2.hostinger.com
```

---

## ✅ Verification Steps

### 1. Check MX Records
```bash
nslookup -type=mx bookmethat.com
```
Should show:
```
mx1.hostinger.com (priority 10)
mx2.hostinger.com (priority 20)
```

### 2. Check SPF Record
```bash
nslookup -type=txt bookmethat.com
```
Should include:
```
v=spf1 include:_spf.hostinger.com ~all
```

### 3. Check DKIM Record
```bash
nslookup -type=txt default._domainkey.bookmethat.com
```
Should show your DKIM key starting with `v=DKIM1;`

### 4. Use Online Tools

**MXToolbox (Recommended):**
- Go to: https://mxtoolbox.com/
- Enter: `bookmethat.com`
- Check: MX Lookup, SPF Record, DKIM Lookup, DMARC Lookup
- All should show green checkmarks ✅

**Mail-Tester:**
- Go to: https://www.mail-tester.com/
- Send test email to provided address
- Should score 9/10 or 10/10

---

## 🔧 Configuration by Registrar

### Hostinger (All-in-One)
1. hPanel → Domains → bookmethat.com
2. DNS / Name Servers
3. Add records as shown above
4. DKIM: Emails → DKIM Settings → Enable

### GoDaddy
1. My Products → Domains → bookmethat.com
2. DNS → Manage Zones
3. Add MX, TXT records
4. **Note:** Use `@` for root domain

### Namecheap
1. Domain List → Manage → Advanced DNS
2. Add New Record
3. Select type (MX, TXT)
4. **Note:** Use `@` for root domain

### Cloudflare
1. Select domain → DNS → Records
2. Add Record
3. **Important:** Enable "Proxy" OFF for MX records (DNS only)
4. Add TXT records for SPF/DKIM/DMARC

### Google Domains
1. My domains → Manage → DNS
2. Custom resource records
3. Add MX, TXT records
4. **Note:** Use `@` for domain apex

---

## 🐛 Troubleshooting

### Problem: MX records not updating

**Solution:**
1. Clear DNS cache:
   ```powershell
   ipconfig /flushdns
   ```
2. Wait 1-2 hours for propagation
3. Check with multiple DNS checkers:
   - https://mxtoolbox.com/
   - https://dnschecker.org/

### Problem: Emails still going to old server

**Solution:**
1. Delete ALL old MX records first
2. Ensure only Hostinger MX records remain
3. Lower TTL to 300 (5 minutes) temporarily
4. Wait for full propagation

### Problem: SPF "Too many lookups"

**Solution:**
```
# If you have multiple email services, combine them:
v=spf1 include:_spf.hostinger.com include:_spf.google.com ~all
```

### Problem: DKIM not verifying

**Solution:**
1. Re-generate DKIM in Hostinger hPanel
2. Copy exact value (including all characters)
3. Remove any spaces or line breaks
4. Add to DNS as single line
5. Wait 2-4 hours

### Problem: DMARC reports not arriving

**Solution:**
1. Verify admin@bookmethat.com exists
2. Check spam folder
3. Reports sent weekly (be patient)
4. Use `p=none` first to receive reports without blocking

---

## 📧 Receiving Email Setup

Once MX records are active, you can receive emails:

### Via Webmail
```
https://webmail.hostinger.com/

Username: noreply@bookmethat.com
Password: your_email_password
```

### Via Email Client (Outlook, Thunderbird, Apple Mail)

**IMAP Settings (Recommended):**
```
Server: imap.hostinger.com
Port: 993
Security: SSL/TLS
Username: noreply@bookmethat.com
Password: your_password
```

**POP3 Settings:**
```
Server: pop.hostinger.com
Port: 995
Security: SSL/TLS
Username: noreply@bookmethat.com
Password: your_password
```

**SMTP Settings (Sending):**
```
Server: smtp.hostinger.com
Port: 465 (SSL) or 587 (TLS)
Security: SSL/TLS
Username: noreply@bookmethat.com
Password: your_password
```

---

## 🔒 Security Best Practices

### 1. Strict SPF Policy (After Testing)
```
v=spf1 include:_spf.hostinger.com -all
```
`-all` = Hard fail (reject unauthorized)

### 2. Strict DMARC Policy
```
v=DMARC1; p=reject; rua=mailto:admin@bookmethat.com; pct=100; adkim=s; aspf=s
```
- `p=reject` = Block all failures
- `pct=100` = Apply to 100% of emails
- `adkim=s` = Strict DKIM alignment
- `aspf=s` = Strict SPF alignment

### 3. Monitor Reports
- Check DMARC reports weekly
- Look for unauthorized sending attempts
- Adjust policies based on reports

### 4. Enable Two-Factor Authentication
- Hostinger hPanel → Security → 2FA
- Protects against account hijacking

---

## 📊 Email Deliverability Checklist

After setup, verify these for maximum deliverability:

- [x] MX records pointing to mx1.hostinger.com (priority 10)
- [x] MX records pointing to mx2.hostinger.com (priority 20)
- [x] SPF record includes Hostinger servers
- [x] DKIM enabled and DNS record added
- [x] DMARC policy set (start with p=none, move to p=quarantine)
- [x] No conflicting MX records
- [x] Reverse DNS (PTR) matches (usually automatic with Hostinger)
- [x] Domain not on blacklists (check at mxtoolbox.com)
- [x] Valid SSL certificate on domain
- [x] Professional email content (not spammy)

---

## 🧪 Testing Email Flow

### Send Test Email
```bash
# From backend
cd backend
npm run dev

# Register new user
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-test-email@gmail.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

### Receive Test Email
```bash
# Send email to your Hostinger account
# From Gmail, send to: noreply@bookmethat.com

# Check webmail:
https://webmail.hostinger.com/
```

### Check Email Score
1. Go to https://www.mail-tester.com/
2. Copy the test email address
3. Send email from your backend to that address
4. Click "Then check your score"
5. Should score 9-10/10 ✅

---

## 📈 Expected Results

After proper configuration:

- ✅ **Delivery Rate:** 95-99%
- ✅ **Spam Folder Rate:** <1%
- ✅ **Bounce Rate:** <2%
- ✅ **Email Score:** 9-10/10 on mail-tester.com
- ✅ **Authentication:** SPF, DKIM, DMARC all passing
- ✅ **Reputation:** Clean sender reputation

---

## 🆘 Need Help?

### DNS Propagation Checkers
- https://dnschecker.org/ (global DNS check)
- https://mxtoolbox.com/ (comprehensive email diagnostics)
- https://toolbox.googleapps.com/apps/checkmx/ (Google MX check)

### Email Testing Tools
- https://www.mail-tester.com/ (deliverability score)
- https://dkimvalidator.com/ (DKIM verification)
- https://dmarcian.com/dmarc-inspector/ (DMARC checker)

### Hostinger Support
- Live Chat: https://www.hostinger.com/
- Knowledge Base: https://support.hostinger.com/
- Email: support@hostinger.com

---

## 🎉 Success Criteria

Your MX records are correctly configured when:

- ✅ `nslookup -type=mx bookmethat.com` shows Hostinger servers
- ✅ SPF check passes on mxtoolbox.com
- ✅ DKIM check passes on mxtoolbox.com
- ✅ DMARC policy is active
- ✅ Can receive emails at noreply@bookmethat.com
- ✅ Can send emails and they arrive in inbox (not spam)
- ✅ Mail-tester.com score is 9-10/10
- ✅ No bounce messages when sending

---

**Status:** 📋 Instructions ready
**Setup Time:** 10-15 minutes
**Propagation Time:** 15 minutes - 2 hours
**Last Updated:** November 24, 2025

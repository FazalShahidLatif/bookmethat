# 🚂 Backend Deployment Guide - Railway.app

Complete guide to deploy BookMeThat backend API to Railway.app (No credit card required!)

---

## ✨ Why Railway.app?

- ✅ **No Credit Card Required** - Start immediately
- ✅ **$5 Free Credit** - Lasts 1-2 months for development
- ✅ **Super Easy Setup** - 3 clicks to deploy
- ✅ **Auto-Deploy** - Connects to GitHub, deploys on push
- ✅ **Free SSL** - HTTPS by default
- ✅ **Better than Render** - No credit card hassle
- ✅ **Fast Deployment** - 2-5 minutes vs 10+ minutes

---

## 🚀 Quick Deployment (15 minutes)

### Step 1: Sign Up for Railway

1. **Go to:** https://railway.app/
2. **Click:** "Login" (top right)
3. **Sign in with GitHub** (easiest option)
4. **Authorize Railway** to access your GitHub account
5. **You're in!** No card needed, $5 credit automatically added

---

### Step 2: Create New Project

1. **Click:** "New Project" (big button in dashboard)
2. **Select:** "Deploy from GitHub repo"
3. **Choose:** `FazalShahidLatif/bookmethat`
4. **Click:** "Deploy Now"

That's it! Railway will auto-detect it's a Node.js project and start deploying.

---

### Step 3: Configure Service

#### 3.1 Set Root Directory

Railway might deploy the whole repo. We need just the backend folder:

1. **Click on your service** (in the Railway dashboard)
2. **Go to:** "Settings" tab
3. **Scroll to:** "Root Directory"
4. **Enter:** `backend`
5. **Click:** "Update"

#### 3.2 Set Build & Start Commands

Railway usually auto-detects, but verify:

1. **Settings tab**
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start`
4. **If empty, add them manually**

---

### Step 4: Add Environment Variables

1. **Click:** "Variables" tab (in your service)
2. **Click:** "New Variable" for each one below

#### **Copy-Paste These Variables:**

```bash
NODE_ENV=production
```

```bash
DATABASE_URL=postgresql://neondb_owner:npg_JX9BDhUpA0ig@ep-blue-tree-ahwwroip-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

```bash
JWT_SECRET=your-super-secret-jwt-key-please-change-this-in-production-12345
```

```bash
JWT_EXPIRES_IN=7d
```

```bash
SESSION_SECRET=your-session-secret-change-this-also-67890
```

```bash
BCRYPT_ROUNDS=10
```

```bash
QR_SECRET=your-qr-code-security-secret-change-this-98765
```

```bash
PORT=3000
```

```bash
CORS_ORIGINS=https://bookmethat.com,https://bookmethat.netlify.app,http://localhost:3000
```

#### **Email Configuration (Hostinger):**

```bash
EMAIL_PROVIDER=smtp
```

```bash
SMTP_HOST=smtp.hostinger.com
```

```bash
SMTP_PORT=465
```

```bash
SMTP_SECURE=true
```

```bash
SMTP_USER=noreply@bookmethat.com
```

```bash
SMTP_PASSWORD=your_hostinger_email_password_here
```

```bash
SMTP_FROM=noreply@bookmethat.com
```

#### **Payment Gateways (Mock Mode):**

```bash
USE_MOCK_JAZZCASH=true
```

```bash
JAZZCASH_MERCHANT_ID=MOCK_MERCHANT_ID
```

```bash
JAZZCASH_PASSWORD=MOCK_PASSWORD
```

```bash
JAZZCASH_INTEGRITY_SALT=MOCK_SALT
```

```bash
USE_MOCK_EASYPAISA=true
```

```bash
EASYPAISA_STORE_ID=MOCK_STORE_ID
```

```bash
EASYPAISA_HASH_KEY=MOCK_HASH_KEY
```

```bash
USE_MOCK_PAYFAST=true
```

```bash
PAYFAST_MERCHANT_ID=MOCK_MERCHANT_ID
```

```bash
PAYFAST_MERCHANT_KEY=MOCK_MERCHANT_KEY
```

```bash
PAYFAST_PASSPHRASE=MOCK_PASSPHRASE
```

```bash
STRIPE_SECRET_KEY=sk_test_MOCK
```

```bash
STRIPE_PUBLIC_KEY=pk_test_MOCK
```

```bash
USE_MOCK_TRAINS=true
```

```bash
PR_API_KEY=MOCK_PR_API_KEY
```

```bash
PR_API_SECRET=MOCK_PR_API_SECRET
```

```bash
LOG_LEVEL=info
```

---

### Step 5: Get Your API URL

1. **Click:** "Settings" tab
2. **Scroll to:** "Domains"
3. **You'll see:** A URL like `bookmethat-api-production-XXXX.up.railway.app`
4. **Copy this URL** - this is your production API!

Or Railway auto-generates a public URL. Look for it in the "Deployments" tab.

---

### Step 6: Update Return URLs

Now that you have your Railway URL, update these environment variables:

```bash
API_URL=https://your-service-name.up.railway.app
```

```bash
FRONTEND_URL=https://bookmethat.com
```

```bash
JAZZCASH_RETURN_URL=https://bookmethat.com/payment/jazzcash/callback
```

```bash
EASYPAISA_RETURN_URL=https://bookmethat.com/payment/easypaisa/callback
```

```bash
PAYFAST_RETURN_URL=https://bookmethat.com/payment/payfast/success
```

```bash
PAYFAST_CANCEL_URL=https://bookmethat.com/payment/payfast/cancel
```

```bash
PAYFAST_NOTIFY_URL=https://your-service-name.up.railway.app/api/v1/payments/payfast/webhook
```

**Replace** `your-service-name.up.railway.app` with your actual Railway URL.

---

## ✅ Verify Deployment

### Check Deployment Status

1. **Go to:** "Deployments" tab
2. **Watch:** Build logs in real-time
3. **Success:** Green checkmark when complete (2-5 minutes)

### Test Your API

Open PowerShell and test:

```powershell
# Test health endpoint
Invoke-WebRequest https://your-service-name.up.railway.app/health

# Expected response:
# StatusCode: 200
# Content: {"status":"OK","timestamp":"..."}
```

### Test Auth Endpoint

```powershell
$body = @{
  email = "test@example.com"
  password = "Test123!"
  name = "Test User"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://your-service-name.up.railway.app/api/v1/auth/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

### Test Train Search

```powershell
$body = @{
  from = "KHI"
  to = "LHE"
  date = "2025-12-01"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://your-service-name.up.railway.app/api/v1/trains/search" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

---

## 🎯 Auto-Deploy Setup

Railway automatically deploys when you push to GitHub!

```bash
cd bookmethat
git add .
git commit -m "Update backend configuration"
git push origin main
```

**Railway will:**
1. Detect the push (within seconds)
2. Pull latest code
3. Run build command
4. Deploy automatically (2-5 minutes)
5. Zero downtime deployment

**Watch progress:** Railway dashboard → Your service → "Deployments" tab

---

## 📊 Monitor Your Service

### View Logs

1. **Click:** "Deployments" tab
2. **Click:** Latest deployment
3. **See:** Real-time logs

Look for these success messages:
```
✅ Database connected
✅ Server running on port 3000
✅ Sentry initialized (if configured)
```

### Metrics

1. **Click:** "Metrics" tab
2. **See:** CPU, Memory, Network usage
3. **Monitor:** Response times

### Check Credit Usage

1. **Click:** Your profile (top right)
2. **Click:** "Account Settings"
3. **See:** "$X.XX of $5.00 used"
4. **Monitor:** Usage over time

---

## 🔧 Troubleshooting

### Issue 1: "Build Failed"

**Solution:**
1. Check logs in "Deployments" tab
2. Ensure `backend/package.json` has all dependencies
3. Verify TypeScript compiles locally: `cd backend && npm run build`

### Issue 2: "Application Failed to Start"

**Solution:**
1. Check if `PORT` environment variable is set
2. Verify start command is `npm start`
3. Check logs for specific error messages

### Issue 3: Database Connection Error

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check Neon database is not paused (free tier sleeps after 5 days)
3. Test connection locally first

### Issue 4: CORS Errors

**Solution:**
1. Update `CORS_ORIGINS` to include your frontend URL
2. Ensure frontend URL has no trailing slash
3. Add Railway URL to CORS_ORIGINS for testing

### Issue 5: Out of Credit

**Solution:**
1. Railway gives $5 free credit
2. After that, add credit card (paid plans start at $5/month)
3. Or migrate to Render/Railway paid tier

---

## 💰 Pricing

### Hobby Plan (What You Get)
- ✅ $5 free credit (no card needed)
- ✅ Lasts ~500 hours of active use
- ✅ Great for development/testing
- ✅ Auto-deploy from GitHub
- ✅ Free SSL certificates

### Developer Plan ($5/month after free credit)
- ✅ $5 usage credit per month
- ✅ Enough for small production apps
- ✅ Better performance
- ✅ Priority support

### Team Plan ($20/month)
- ✅ $20 usage credit per month
- ✅ Multiple services
- ✅ Production-ready
- ✅ Advanced features

**For BookMeThat:** Start with free $5, upgrade to $5/month when needed

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. **Click:** "Settings" tab
2. **Scroll to:** "Domains"
3. **Click:** "Custom Domain"
4. **Enter:** `api.bookmethat.com`
5. **Add CNAME record in your DNS:**

```
Type: CNAME
Name: api
Value: your-service-name.up.railway.app
TTL: 3600
```

6. **Wait:** 5-60 minutes for DNS propagation
7. **SSL:** Automatically provisioned by Railway

---

## 🔄 Environment Variables Management

### Add New Variable
```
Variables tab → New Variable → Enter name & value → Add
```

### Update Existing Variable
```
Variables tab → Click variable → Edit → Save
```

### Delete Variable
```
Variables tab → Click variable → Delete
```

### Bulk Import (Advanced)
```
Variables tab → Raw Editor → Paste all variables → Save
```

Example raw format:
```
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
```

---

## 🚀 Update Frontend to Use Railway API

After deployment, update your frontend:

### Option 1: Environment Variable

Create `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-service-name.up.railway.app
```

### Option 2: Direct Configuration

Edit `frontend/src/lib/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  'https://your-service-name.up.railway.app';
```

Then redeploy frontend!

---

## 🎉 Success Checklist

Your backend is successfully deployed when:

- [x] ✅ Green checkmark in Deployments tab
- [x] ✅ `/health` returns 200 OK
- [x] ✅ Can register new user
- [x] ✅ Can login and get JWT token
- [x] ✅ Train search works
- [x] ✅ Email notifications send (if configured)
- [x] ✅ No errors in Railway logs
- [x] ✅ Frontend can connect to API
- [x] ✅ Credit usage is reasonable

---

## 🔄 Rollback (If Needed)

1. **Go to:** "Deployments" tab
2. **Find:** Previous working deployment
3. **Click:** Three dots menu (•••)
4. **Click:** "Redeploy"
5. **Confirm:** Your app rolls back instantly!

---

## 📈 Best Practices

### 1. Use Environment Variables
- Never hardcode secrets
- Use Railway's variable management
- Different values for dev/prod

### 2. Monitor Logs
- Check logs daily (first week)
- Set up error alerts
- Watch for unusual patterns

### 3. Watch Credit Usage
- Monitor usage in Account Settings
- Set up billing alerts
- Upgrade before running out

### 4. Keep Dependencies Updated
```bash
cd backend
npm outdated
npm update
```

### 5. Use Health Checks
Railway pings your `/health` endpoint to verify service is running

---

## 📚 Additional Resources

- **Railway Docs:** https://docs.railway.app/
- **Discord Support:** https://discord.gg/railway (very active!)
- **Deployment Guide:** https://docs.railway.app/deploy/deployments
- **Environment Variables:** https://docs.railway.app/develop/variables
- **Custom Domains:** https://docs.railway.app/deploy/exposing-your-app

---

## 🆘 Need Help?

**Railway Support:**
- Discord: https://discord.gg/railway (fastest response)
- Twitter: @Railway
- Docs: https://docs.railway.app/

**Common Issues:**
- Build fails: Check package.json dependencies
- App crashes: Check logs for error messages
- CORS errors: Update CORS_ORIGINS variable
- Database errors: Verify DATABASE_URL

---

## ⚡ Quick Command Reference

```powershell
# Test health
Invoke-WebRequest https://your-url.up.railway.app/health

# Test with curl (if installed)
curl https://your-url.up.railway.app/health

# Watch logs
# Go to Railway Dashboard → Deployments → View Logs

# Redeploy
# Railway Dashboard → Deployments → ••• → Redeploy
```

---

**Deployment Status:** 📋 Ready to deploy
**Estimated Time:** 15 minutes
**Cost:** FREE ($5 credit included)
**Credit Card:** Not required! 🎉
**Next Step:** Go to https://railway.app and sign up with GitHub

**Last Updated:** November 25, 2025

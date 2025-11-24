# 🚀 Backend Deployment Guide - Render.com

Complete guide to deploy BookMeThat backend API to production on Render.com.

---

## ✨ Why Render.com?

- ✅ **Free Tier:** 750 hours/month (enough for 1 service 24/7)
- ✅ **Auto-Deploy:** Connects to GitHub, deploys on push
- ✅ **Zero Config:** Detects Node.js automatically
- ✅ **Free SSL:** HTTPS by default
- ✅ **PostgreSQL Compatible:** Works with your Neon database
- ✅ **Easy Environment Variables:** Web UI management
- ✅ **Better than Heroku:** Heroku ended free tier, Render is better

**Alternatives:** Railway.app, Fly.io, AWS Lambda (more complex)

---

## 🚀 Quick Deployment (30 minutes)

### Step 1: Prepare Backend for Production

#### 1.1 Add Production Start Script

The backend already has the right scripts, verify `backend/package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts"
  }
}
```

✅ **Already configured!**

#### 1.2 Verify Port Configuration

Check `backend/src/index.ts` uses `process.env.PORT`:

```typescript
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

✅ **Already configured!**

#### 1.3 Add render.yaml (Optional but Recommended)

Create `render.yaml` in project root:

```yaml
services:
  - type: web
    name: bookmethat-api
    env: node
    region: oregon
    plan: free
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: SESSION_SECRET
        generateValue: true
      - key: QR_SECRET
        generateValue: true
```

---

### Step 2: Sign Up for Render.com

1. **Go to:** https://render.com/
2. **Click:** "Get Started for Free"
3. **Sign up with GitHub** (easiest - connects your repo automatically)
4. **Authorize:** Allow Render to access your repositories

---

### Step 3: Create New Web Service

#### 3.1 Connect Repository
1. **Dashboard:** Click "New +" → "Web Service"
2. **Select Repository:** `FazalShahidLatif/bookmethat`
3. **Click:** "Connect"

#### 3.2 Configure Service

**Basic Settings:**
```
Name: bookmethat-api
Region: Oregon (US West) - closest to Neon database
Branch: main
Root Directory: backend
Runtime: Node
```

**Build Settings:**
```
Build Command: npm install && npm run build
Start Command: npm start
```

**Instance Type:**
```
Free (0.1 CPU, 512 MB RAM)
```

---

### Step 4: Add Environment Variables

Click "Environment" tab and add these variables:

#### **Required - Database**
```bash
DATABASE_URL=postgresql://neondb_owner:npg_JX9BDhUpA0ig@ep-blue-tree-ahwwroip-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

#### **Required - Authentication**
```bash
JWT_SECRET=<click "Generate" for secure random value>
JWT_EXPIRES_IN=7d
SESSION_SECRET=<click "Generate" for secure random value>
BCRYPT_ROUNDS=10
```

#### **Required - QR Code Security**
```bash
QR_SECRET=<click "Generate" for secure random value>
```

#### **Required - Application**
```bash
NODE_ENV=production
PORT=10000
API_URL=https://bookmethat-api.onrender.com
FRONTEND_URL=https://bookmethat.com
CORS_ORIGINS=https://bookmethat.com,https://bookmethat.netlify.app
```

#### **Email - Hostinger SMTP**
```bash
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@bookmethat.com
SMTP_PASSWORD=<your_hostinger_email_password>
SMTP_FROM=noreply@bookmethat.com
```

#### **SMS - Twilio (Optional)**
```bash
TWILIO_ACCOUNT_SID=<your_twilio_sid>
TWILIO_AUTH_TOKEN=<your_twilio_token>
TWILIO_PHONE_NUMBER=<your_twilio_number>
```

#### **Error Tracking - Sentry**
```bash
SENTRY_DSN=<your_sentry_dsn>
```

#### **Payment Gateways (Mock for now)**
```bash
USE_MOCK_JAZZCASH=true
JAZZCASH_MERCHANT_ID=MOCK_MERCHANT_ID
JAZZCASH_PASSWORD=MOCK_PASSWORD
JAZZCASH_INTEGRITY_SALT=MOCK_SALT
JAZZCASH_RETURN_URL=https://bookmethat.com/payment/jazzcash/callback

USE_MOCK_EASYPAISA=true
EASYPAISA_STORE_ID=MOCK_STORE_ID
EASYPAISA_HASH_KEY=MOCK_HASH_KEY
EASYPAISA_RETURN_URL=https://bookmethat.com/payment/easypaisa/callback

USE_MOCK_PAYFAST=true
PAYFAST_MERCHANT_ID=MOCK_MERCHANT_ID
PAYFAST_MERCHANT_KEY=MOCK_MERCHANT_KEY
PAYFAST_PASSPHRASE=MOCK_PASSPHRASE
PAYFAST_RETURN_URL=https://bookmethat.com/payment/payfast/success
PAYFAST_CANCEL_URL=https://bookmethat.com/payment/payfast/cancel
PAYFAST_NOTIFY_URL=https://bookmethat-api.onrender.com/api/v1/payments/payfast/webhook

STRIPE_SECRET_KEY=sk_test_MOCK
STRIPE_PUBLIC_KEY=pk_test_MOCK
STRIPE_WEBHOOK_SECRET=whsec_MOCK
```

#### **Pakistan Railway (Mock for now)**
```bash
USE_MOCK_TRAINS=true
PR_API_KEY=MOCK_PR_API_KEY
PR_API_SECRET=MOCK_PR_API_SECRET
```

#### **Logging**
```bash
LOG_LEVEL=info
```

---

### Step 5: Deploy!

1. **Click:** "Create Web Service"
2. **Watch:** Build logs in real-time
3. **Wait:** 5-10 minutes for first deployment
4. **Success:** You'll get a URL like `https://bookmethat-api.onrender.com`

---

## ✅ Post-Deployment Verification

### Test Health Endpoint
```powershell
# PowerShell
Invoke-WebRequest https://bookmethat-api.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-11-24T...",
  "uptime": 123.45
}
```

### Test Auth Endpoint
```powershell
# Register a test user
$body = @{
  email = "test@example.com"
  password = "Test123!"
  name = "Test User"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://bookmethat-api.onrender.com/api/v1/auth/register" `
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

Invoke-WebRequest -Uri "https://bookmethat-api.onrender.com/api/v1/trains/search" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Build Fails - "Cannot find module 'typescript'"

**Solution:** Add to `backend/package.json`:
```json
{
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.0"
  }
}
```

### Issue 2: "Port already in use"

**Solution:** Render sets PORT automatically. Make sure your code uses:
```typescript
const PORT = process.env.PORT || 4000;
```

### Issue 3: Database Connection Fails

**Solution:** 
1. Check DATABASE_URL is exact copy from Neon
2. Ensure it includes `?sslmode=require`
3. Verify Neon database is not paused (free tier sleeps after 5 days)

### Issue 4: CORS Errors from Frontend

**Solution:** Update CORS_ORIGINS environment variable:
```bash
CORS_ORIGINS=https://bookmethat.com,https://bookmethat.netlify.app,http://localhost:3000
```

### Issue 5: "Service Unavailable" after 15 minutes

**Solution:** Free tier spins down after 15 minutes of inactivity. First request will be slow (cold start ~30 seconds). Consider:
- Upgrade to paid plan ($7/month - no spin down)
- Use a cron job to ping `/health` every 10 minutes
- Accept 30s cold start for free tier

---

## 🎯 Set Up Auto-Deploy

Render automatically deploys when you push to GitHub!

```bash
cd bookmethat
git add .
git commit -m "Update backend configuration"
git push origin main
```

**Render will:**
1. Detect the push
2. Run build command
3. Deploy automatically
4. Update live service (zero downtime)

**Watch progress:** Render dashboard → Your service → "Events" tab

---

## 📊 Monitor Your Service

### Render Dashboard
- **Metrics:** CPU, Memory, Response time
- **Logs:** Real-time application logs
- **Events:** Deployment history
- **Shell:** SSH into running container (paid plans)

### View Logs
```
Render Dashboard → bookmethat-api → Logs
```

Look for:
```
✅ Database connected
✅ Server running on port 10000
✅ Sentry initialized
```

### Custom Domain (Optional)

1. **Render Dashboard → Settings → Custom Domain**
2. **Add:** `api.bookmethat.com`
3. **Add CNAME in DNS:**
   ```
   Type: CNAME
   Name: api
   Value: bookmethat-api.onrender.com
   ```
4. **SSL:** Auto-provisioned by Render (free)

---

## 💰 Pricing Tiers

### Free Tier (Current)
- ✅ 750 hours/month (enough for 1 service)
- ✅ Auto-deploy from GitHub
- ✅ Free SSL
- ⚠️ Spins down after 15 min inactivity
- ⚠️ 512 MB RAM
- ⚠️ Shared CPU

### Starter ($7/month)
- ✅ Everything in free
- ✅ **No spin down** (always on)
- ✅ 1 GB RAM
- ✅ Faster CPU
- ✅ Better for production

### Pro ($25/month)
- ✅ Everything in Starter
- ✅ 2 GB RAM
- ✅ Priority support
- ✅ Advanced metrics

**Recommendation:** Start free, upgrade to Starter when you get traffic

---

## 🚀 Update Frontend to Use Production API

After backend is deployed, update frontend:

### Update `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://bookmethat-api.onrender.com
```

### Or hardcode in `frontend/src/lib/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  'https://bookmethat-api.onrender.com';
```

---

## 📋 Environment Variables Checklist

Copy this to ensure you don't miss anything:

### Critical (Must Have)
- [x] DATABASE_URL
- [x] JWT_SECRET (use Render's "Generate")
- [x] SESSION_SECRET (use Render's "Generate")
- [x] QR_SECRET (use Render's "Generate")
- [x] NODE_ENV=production
- [x] FRONTEND_URL
- [x] CORS_ORIGINS

### Email (Recommended)
- [ ] EMAIL_PROVIDER=smtp
- [ ] SMTP_HOST=smtp.hostinger.com
- [ ] SMTP_PORT=465
- [ ] SMTP_USER=noreply@bookmethat.com
- [ ] SMTP_PASSWORD=<your_password>

### Optional (Can Add Later)
- [ ] SENTRY_DSN (error tracking)
- [ ] TWILIO credentials (SMS)
- [ ] Real payment gateway keys (when approved)

---

## 🎉 Success Checklist

Your backend is successfully deployed when:

- ✅ `/health` endpoint returns 200 OK
- ✅ Can register new user via API
- ✅ Can login and get JWT token
- ✅ Can search trains
- ✅ Can create booking
- ✅ Email notifications working
- ✅ No errors in Render logs
- ✅ Frontend can connect to API
- ✅ Sentry capturing errors (if configured)

---

## 🔄 Rollback (If Something Goes Wrong)

1. **Render Dashboard → Deploys**
2. **Find last working deploy**
3. **Click "Redeploy"**
4. **Confirm**

Your service will rollback to previous version instantly!

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Node.js Guide:** https://render.com/docs/deploy-node-express-app
- **Environment Variables:** https://render.com/docs/environment-variables
- **Custom Domains:** https://render.com/docs/custom-domains
- **Databases:** https://render.com/docs/databases

---

## 🆘 Need Help?

**Render Support:**
- Community: https://community.render.com/
- Email: support@render.com (paid plans)
- Docs: https://render.com/docs

**Common Error Solutions:**
- Build fails: Check build logs, ensure all dependencies in package.json
- 503 errors: Check environment variables, database connection
- CORS errors: Update CORS_ORIGINS
- Cold starts: Expected on free tier (30s delay)

---

**Deployment Status:** 📋 Ready to deploy
**Estimated Time:** 30 minutes first time, 5 minutes for updates
**Cost:** Free tier (upgrade to $7/month recommended for production)
**Next Step:** Sign up at https://render.com and follow steps above

**Last Updated:** November 24, 2025

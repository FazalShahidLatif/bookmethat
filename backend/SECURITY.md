# Security Configuration Documentation

## Overview
The bookmethat backend implements comprehensive security measures to prevent malicious attacks, brute force attempts, and abuse.

## Security Features

### 1. Rate Limiting with Attempt Restrictions

#### General API Rate Limit
- **Limit:** 100 requests per 15 minutes
- **Block Duration:** 1 hour
- **Purpose:** Prevent API abuse and DDoS attacks

#### Authentication Rate Limit
- **Limit:** 5 login attempts per 15 minutes
- **Block Duration:** 24 hours
- **Purpose:** Prevent brute force password attacks
- **Triggers:** Login, registration endpoints

#### Password Reset Rate Limit
- **Limit:** 3 attempts per hour
- **Block Duration:** 6 hours
- **Purpose:** Prevent password reset abuse

#### Booking Rate Limit
- **Limit:** 10 booking attempts per hour
- **Block Duration:** 2 hours
- **Purpose:** Prevent payment fraud and fake bookings

#### Search Rate Limit
- **Limit:** 50 searches per minute
- **Block Duration:** 10 minutes
- **Purpose:** Prevent scraping and resource exhaustion

### 2. Malicious Content Detection

The system automatically detects and blocks requests containing:
- **XSS Attacks:** `<script>`, `javascript:`, `onerror=`
- **SQL Injection:** `UNION SELECT`, `DROP TABLE`
- **Path Traversal:** `../../`
- **Code Injection:** `eval()`, `exec()`

**Auto-Block:** Clients sending malicious content are automatically blocked for 24 hours.

### 3. IP Filtering

- **Whitelist:** Trusted IPs bypass rate limits
- **Blacklist:** Blocked IPs cannot access the API
- **Manual Control:** Admins can block/unblock IPs via functions

### 4. Security Headers (Helmet)

- **Content Security Policy (CSP):** Prevents XSS attacks
- **HSTS:** Forces HTTPS connections
- **X-Frame-Options:** Prevents clickjacking
- **X-Content-Type-Options:** Prevents MIME sniffing
- **X-XSS-Protection:** Browser XSS filter

### 5. CORS Protection

- **Allowed Origins:** Only whitelisted domains can make requests
- **Credentials:** Cookie support for authenticated requests
- **Preflight:** OPTIONS requests handled correctly

### 6. Input Validation

- **Email Validation:** Regex-based format checking
- **Password Strength:** Enforces strong password requirements
  - Minimum 8 characters
  - At least 1 lowercase letter
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character
- **Input Sanitization:** Removes HTML tags and dangerous characters

### 7. Security Logging

All suspicious activity is logged:
- 429 (Too Many Requests) responses
- 403 (Forbidden) responses
- Malicious content attempts
- Blocked IP attempts

## Rate Limit Response Format

### Normal Request
```json
{
  "data": { ... }
}
```

**Headers:**
- `X-RateLimit-Limit: 100`
- `X-RateLimit-Remaining: 95`
- `X-RateLimit-Reset: 2025-11-21T12:00:00Z`

### Rate Limit Exceeded
```json
{
  "error": "Too many requests",
  "message": "Too many requests from this device. Please try again later.",
  "retryAfter": 3600,
  "blocked": true
}
```

**HTTP Status:** `429 Too Many Requests`

### Malicious Content Detected
```json
{
  "error": "Invalid request",
  "message": "Request contains potentially malicious content",
  "blocked": true
}
```

**HTTP Status:** `400 Bad Request`

## Configuration

### Environment Variables

```env
# CORS Allowed Origins
ALLOWED_ORIGINS=https://bookmethat.com,https://www.bookmethat.com

# IP Whitelist (comma-separated)
WHITELISTED_IPS=203.0.113.1,203.0.113.2

# Rate Limit Settings
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_ATTEMPTS=100
RATE_LIMIT_BLOCK_DURATION=3600000

# Auth Rate Limit
AUTH_RATE_LIMIT_MAX=5
AUTH_RATE_LIMIT_BLOCK=86400000
```

### Custom Rate Limits

Create custom rate limiters for specific endpoints:

```typescript
import { rateLimiter } from './middleware/security';

const customRateLimit = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxAttempts: 30,
  blockDuration: 5 * 60 * 1000, // 5 minutes
  message: 'Custom rate limit message',
});

app.get('/api/custom', customRateLimit, (req, res) => {
  // Your endpoint logic
});
```

## Best Practices

### 1. Production Deployment

- Use Redis for distributed rate limiting across multiple servers
- Enable HTTPS only (disable HTTP)
- Set up monitoring and alerting for security events
- Regularly review security logs
- Keep dependencies updated

### 2. Rate Limit Strategy

- **Public endpoints:** Lower limits (e.g., 50/min)
- **Authenticated users:** Higher limits (e.g., 200/min)
- **Premium users:** Even higher limits or no limits
- **Critical operations:** Very strict limits (e.g., 5/15min)

### 3. IP Blacklisting

Monitor logs and blacklist IPs showing:
- Repeated rate limit violations
- Malicious content attempts
- Suspicious patterns
- Known attack sources

### 4. Response to Attacks

If under attack:
1. Temporarily lower rate limits
2. Enable stricter validation
3. Block suspicious IP ranges
4. Contact hosting provider for DDoS protection
5. Enable Cloudflare or AWS Shield

## Testing

### Test Rate Limiting

```bash
# Send multiple requests quickly
for i in {1..10}; do
  curl http://localhost:4000/api/v1/properties
done
```

### Test Malicious Content Detection

```bash
curl -X POST http://localhost:4000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -d '{"name": "<script>alert(1)</script>"}'
```

### Test IP Blocking

```typescript
import { blockIP, unblockIP } from './middleware/security';

// Block an IP
blockIP('203.0.113.100');

// Unblock an IP
unblockIP('203.0.113.100');
```

## Monitoring

### Key Metrics to Track

1. **Rate limit hits:** How often limits are reached
2. **Blocked requests:** Count of 429 responses
3. **Malicious attempts:** Detected attack patterns
4. **Response times:** Performance impact of security checks
5. **False positives:** Legitimate users getting blocked

### Alerting

Set up alerts for:
- More than 100 rate limit blocks per hour
- Any malicious content detection
- IP blacklist additions
- Unusual traffic patterns

## Security Checklist

- [x] Rate limiting implemented
- [x] Malicious content detection
- [x] IP filtering (whitelist/blacklist)
- [x] Security headers (Helmet)
- [x] CORS protection
- [x] Input validation
- [x] Security logging
- [x] Strong password enforcement
- [x] Email validation
- [x] Request body size limits
- [ ] Redis for distributed rate limiting (production)
- [ ] Web Application Firewall (WAF)
- [ ] DDoS protection (Cloudflare/AWS Shield)
- [ ] Intrusion Detection System (IDS)
- [ ] Regular security audits
- [ ] Penetration testing

## Support

For security concerns or to report vulnerabilities:
- Email: security@bookmethat.com
- Use responsible disclosure process
- Do not publicly disclose vulnerabilities before patching

## Updates

This security configuration should be reviewed and updated:
- Quarterly for general updates
- Immediately after security incidents
- When new attack vectors are discovered
- After dependency updates

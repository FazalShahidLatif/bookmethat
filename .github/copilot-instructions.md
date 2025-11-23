# Copilot Instructions for bookmethat.com

## Project Overview
bookmethat.com is a full-stack OTA (Online Travel Agency) marketplace + eSIM/virtual line provisioning platform. Frontend hosted on Netlify, backend as serverless microservices.

### Platform Coverage
- **Web:** Progressive Web App (PWA) - Next.js
- **Mobile Apps:** React Native (iOS & Android) - downloadable from website
- **Desktop Apps:** Electron (Windows, macOS, Linux) - downloadable from website
- **Services:** Hotels, Flights, Cars, Activities, eSIM, **Pakistan Railway Train Reservations**

## Tech Stack
- **Web Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Mobile Apps:** React Native (Expo), TypeScript, NativeWind
- **Desktop Apps:** Electron + Next.js, TypeScript
- **Backend:** Node.js, TypeScript, serverless functions
- **Database:** PostgreSQL (Supabase/Neon), Redis (Upstash)
- **Payments:** Stripe, JazzCash (Pakistan), EasyPaisa (Pakistan), PayFast (South Africa)
- **Hosting:** Netlify (web), AWS Lambda/Render (backend), App Store/Play Store (mobile)

## Project Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (marketing)/  # Public pages (homepage, about)
│   │   ├── (auth)/       # Auth pages (login, signup)
│   │   ├── search/       # Property search
│   │   ├── property/     # Property details
│   │   ├── esim/         # eSIM store
│   │   └── account/      # User dashboard
│   ├── components/       # Reusable React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── search/      # Search widgets
│   │   ├── booking/     # Booking flow components
│   │   └── layout/      # Layout components
│   ├── lib/             # Utilities
│   │   ├── api.ts       # API client
│   │   ├── auth.ts      # Auth helpers
│   │   └── validators.ts # Zod schemas
│   └── styles/          # Global CSS
└── public/              # Static assets
```

### Backend (`/backend`)
```
backend/
├── bookings/            # Booking service
│   ├── handlers/       # Lambda handlers
│   ├── models/         # Data models
│   └── services/       # Business logic
├── trains/             # Pakistan Railway integration
│   ├── pr-api.ts      # Pakistan Railway API client
│   └── services/      # Train booking logic
├── esims/              # eSIM provisioning
├── payments/           # Payment integrations
│   ├── stripe/        # International payments
│   ├── jazzcash/      # Pakistan mobile wallet
│   ├── easypaisa/     # Pakistan mobile wallet
│   └── payfast/       # South Africa payments
├── auth/               # Authentication
├── catalog/            # Property inventory
├── notifications/      # Email/SMS
└── shared/             # Shared code
    ├── db/            # Database client
    ├── types/         # TypeScript types
    └── utils/         # Common utilities
```

### Mobile App (`/mobile`)
```
mobile/
├── src/
│   ├── screens/        # React Native screens
│   ├── components/     # Reusable components
│   ├── navigation/     # React Navigation setup
│   ├── services/       # API clients
│   └── store/          # State management (Zustand/Redux)
├── app.json           # Expo configuration
└── package.json
```

### Desktop App (`/desktop`)
```
desktop/
├── electron/           # Electron main process
│   ├── main.ts        # Main process entry
│   └── preload.ts     # Preload scripts
├── renderer/          # Next.js renderer (shared with web)
└── package.json
```

## Key Development Patterns

### 1. API Routes (Frontend)
Use Next.js Route Handlers for lightweight endpoints:
```typescript
// frontend/src/app/api/search/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  // Call backend microservice
  const results = await fetch(`${process.env.API_URL}/catalog/search?q=${query}`);
  return NextResponse.json(await results.json());
}
```

### 2. Backend Services
Each microservice follows this pattern:
```typescript
// backend/bookings/handlers/create.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { BookingService } from '../services/booking';

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const booking = await BookingService.create(body);
  
  return {
    statusCode: 201,
    body: JSON.stringify(booking),
  };
};
```

### 3. Database Queries
Use Prisma for type-safe queries:
```typescript
// backend/shared/db/prisma.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Usage
const property = await prisma.property.findUnique({
  where: { id: propertyId },
  include: { rooms: true, amenities: true },
});
```

### 4. Forms & Validation
Use React Hook Form + Zod:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.number().min(1),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## Common Commands

### Development
```bash
# Start frontend
cd frontend && npm run dev

# Start backend services locally
cd backend && npm run dev

# Run both (from root)
npm run dev:all

# Type checking
npm run type-check

# Linting
npm run lint
```

### Database
```bash
# Run migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Seed database
npm run db:seed
```

### Testing
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Integration tests
npm run test:integration
```

### Deployment
```bash
# Build frontend
cd frontend && npm run build

# Deploy to Netlify (automatic on git push)
git push origin main

# Deploy backend
npm run deploy:backend
```

## Critical Workflows

### 1. Adding a New Property Page
1. Create route: `frontend/src/app/property/[id]/page.tsx`
2. Fetch data with Server Component or `useQuery`
3. Use SEO component for meta tags
4. Add structured data (JSON-LD) for Google

### 2. Integrating a New Payment Method
1. Add provider to `backend/payments/providers/`
2. Implement `PaymentProvider` interface
3. Update `PaymentService` factory
4. Add webhook handler
5. Test with provider's test mode

### 3. Adding eSIM Partner
1. Create adapter in `backend/esims/adapters/`
2. Implement provisioning flow
3. Add webhook handlers for activation status
4. Update admin UI for new provider

## SEO Implementation

### Meta Tags
```typescript
// frontend/src/app/property/[id]/page.tsx
export async function generateMetadata({ params }) {
  const property = await getProperty(params.id);
  
  return {
    title: `${property.name} - Book on bookmethat`,
    description: property.description,
    openGraph: {
      images: [property.mainImage],
    },
  };
### Airalo eSIM API
```typescript
// backend/esims/adapters/airalo.ts
async function provisionESIM(planId: string) {
  const response = await fetch('https://api.airalo.com/v2/orders', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${AIRALO_KEY}` },
    body: JSON.stringify({ package_id: planId }),
  });
  
  return response.json();
}
```

### Pakistan Railway API
```typescript
// backend/trains/pr-api.ts
async function searchTrains(params: TrainSearchParams) {
  const response = await fetch('https://api.pakrail.gov.pk/booking/v1/search', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${PR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      origin: params.from,
      destination: params.to,
      date: params.date,
      class: params.class
### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection
- `STRIPE_SECRET_KEY` - Stripe secret (international)
- `JAZZCASH_MERCHANT_ID` - JazzCash merchant ID (Pakistan)
- `JAZZCASH_PASSWORD` - JazzCash password (Pakistan)
- `EASYPAISA_MERCHANT_ID` - EasyPaisa merchant ID (Pakistan)
- `EASYPAISA_SECRET` - EasyPaisa secret (Pakistan)
- `PAYFAST_MERCHANT_ID` - PayFast merchant ID (South Africa)
- `PAYFAST_MERCHANT_KEY` - PayFast merchant key (South Africa)
- `PAYFAST_PASSPHRASE` - PayFast passphrase (South Africa)
- `AIRALO_API_KEY` - eSIM provider key
- `PR_API_KEY` - Pakistan Railway API key
- `PR_API_SECRET` - Pakistan Railway API secret
- `TWILIO_AUTH_TOKEN` - SMS/Voice
async function bookTrain(bookingData: TrainBookingData) {
  const response = await fetch('https://api.pakrail.gov.pk/booking/v1/book', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${PR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData),
  });
  
  return response.json();
}
```

### JazzCash Payment Integration
```typescript
// backend/payments/jazzcash/jazzcash.service.ts
async function initiatePayment(params: JazzCashPaymentParams) {
  const response = await fetch('https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pp_MerchantID: JAZZCASH_MERCHANT_ID,
      pp_Password: JAZZCASH_PASSWORD,
      pp_Amount: params.amount,
      pp_TxnRefNo: params.transactionId,
      // ... other required fields
    }),
  });
  
  return response.json();
}
```

### PayFast Payment Integration
```typescript
// backend/payments/payfast/payfast.service.ts
async function initiatePayment(params: PayFastPaymentParams) {
  // Build PayFast request with MD5 signature
  const data = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    amount: params.amount.toFixed(2),
    item_name: params.itemName,
    return_url: PAYFAST_RETURN_URL,
    notify_url: PAYFAST_NOTIFY_URL,
  };
  
  const signature = generateMD5Signature(data, PAYFAST_PASSPHRASE);
  const paymentUrl = `https://www.payfast.co.za/eng/process?${queryString}&signature=${signature}`;
  
  return { success: true, paymentUrl };
}
```

## Integration Points

### Stripe Checkout
```typescript
// frontend/src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// Redirect to checkout
const { error } = await stripe.redirectToCheckout({
  sessionId: checkoutSession.id,
});
```

## Mobile & Desktop Development

### Mobile App (React Native)
```bash
# Start Expo development
cd mobile && npx expo start

# Build for Android
npx eas build --platform android

# Build for iOS
npx eas build --platform ios
```

### Desktop App (Electron)
```bash
# Start Electron development
cd desktop && npm run electron:dev

# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac

# Build for Linux
npm run build:linux
```

### App Download Integration
Add download links on website homepage:
```typescript
// frontend/src/app/page.tsx
<div className="app-downloads">
  <a href="/downloads/BookMeThat-Setup.exe">
    <Windows /> Download for Windows
  </a>
  <a href="/downloads/BookMeThat.dmg">
    <Apple /> Download for macOS
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.bookmethat">
    <PlayStore /> Get on Google Play
  </a>
  <a href="https://apps.apple.com/app/bookmethat/id123456">
    <AppStore /> Download on App Store
  </a>
</div>
```

## Pakistan-Specific Features

### Train Booking Flow
1. Search trains between stations (Karachi → Lahore, etc.)
2. Select train, class (Economy, AC Business, AC Sleeper)
3. Choose seats/berths
4. Payment via JazzCash/EasyPaisa/Card
5. Get e-ticket via email/SMS

### Payment Methods Priority
- **Pakistan:** JazzCash → EasyPaisa → Card
- **South Africa:** PayFast → Card
- **International:** Stripe → PayPal

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Electron Docs](https://www.electronjs.org/docs/latest)
- [Stripe API](https://stripe.com/docs/api)
- [JazzCash Integration](https://sandbox.jazzcash.com.pk/Sandbox)
- [Pakistan Railway API](https://www.pakrail.gov.pk/api-docs) *(Note: Use actual API docs when available)*
- [Prisma Docs](https://www.prisma.io/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Airalo API](https://www.airalo.com/partners)

---

**Remember:** This is an MVP. Focus on shipping fast, then iterate based on user feedback.
}
```

## Security Best Practices

1. **Never commit secrets** - use `.env` files (gitignored)
2. **Validate all inputs** - use Zod schemas
3. **Sanitize user content** - prevent XSS
4. **Rate limit APIs** - use Redis for counters
5. **PCI compliance** - never store card data, use Stripe

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_STRIPE_KEY` - Stripe publishable key
- `NEXT_PUBLIC_ALGOLIA_APP_ID` - Search API

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection
- `STRIPE_SECRET_KEY` - Stripe secret
- `AIRALO_API_KEY` - eSIM provider key
- `TWILIO_AUTH_TOKEN` - SMS/Voice

## Testing Strategy

1. **Unit tests** - Business logic, utilities
2. **Integration tests** - API endpoints, database
3. **E2E tests** - Critical user flows (booking, eSIM purchase)
4. **Load tests** - Search, checkout under load

## CI/CD Pipeline

1. Push to branch → GitHub Actions runs tests
2. Create PR → Netlify preview deploy
3. Merge to `main` → Production deploy
4. Post-deploy → Run smoke tests

## Troubleshooting

### Frontend won't start
- Check Node version (18+)
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

### API errors
- Check environment variables
- Verify database connection
- Check Sentry for error logs

### Stripe webhook failures
- Verify webhook secret in `.env`
- Check Stripe dashboard logs
- Test locally with Stripe CLI

## File Naming Conventions

- **Components:** PascalCase (`SearchBar.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Routes:** lowercase with hyphens (`property-details/`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)

## Code Style

- Use TypeScript strict mode
- Prefer functional components
- Use async/await over promises
- Add JSDoc for complex functions
- Keep files under 300 lines

## AI Agent Tips

- **When creating components:** Use shadcn/ui primitives
- **When adding features:** Follow microservice pattern
- **When fixing bugs:** Check Sentry first for stack traces
- **When optimizing:** Focus on Core Web Vitals (LCP, CLS, FID)
- **When integrating APIs:** Create adapter layer for vendor APIs

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Stripe API](https://stripe.com/docs/api)
- [Prisma Docs](https://www.prisma.io/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Airalo API](https://www.airalo.com/partners)

---

**Remember:** This is an MVP. Focus on shipping fast, then iterate based on user feedback.

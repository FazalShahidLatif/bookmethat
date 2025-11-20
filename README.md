# bookmethat.com

> **Full-stack marketplace for booking accommodations/services (OTA-style) + selling/managing travel eSIMs and virtual lines globally.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🔗 **Live Site:** [bookmethat.com](https://bookmethat.com) (Coming soon)  
📖 **Documentation:** [/docs](/docs)  
🐛 **Issues:** [GitHub Issues](https://github.com/FazalShahidLatif/bookmethat/issues)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- PostgreSQL 14+
- Redis 6+
- Stripe account (test mode)

### Local Development

```bash
# Clone the repository
git clone https://github.com/FazalShahidLatif/bookmethat.git
cd bookmethat

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev        # Frontend (localhost:3000)
npm run dev:api    # Backend API (localhost:4000)
```

---

## 📁 Project Structure

```
bookmethat/
├── frontend/              # Next.js frontend (Netlify-hosted)
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and helpers
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   ├── netlify.toml      # Netlify configuration
│   └── package.json
│
├── backend/              # Serverless microservices
│   ├── bookings/        # Booking service
│   ├── esims/           # eSIM provisioning service
│   ├── payments/        # Payment processing (Stripe)
│   ├── auth/            # Authentication & KYC
│   ├── catalog/         # Property inventory
│   ├── notifications/   # Email/SMS service
│   └── shared/          # Shared utilities
│
├── infra/               # Infrastructure as Code
│   ├── terraform/       # Terraform configs
│   └── netlify/         # Netlify deploy configs
│
├── docs/                # Documentation
│   ├── api/            # API documentation
│   ├── legal/          # Terms, Privacy Policy
│   └── onboarding/     # Partner onboarding guides
│
├── scripts/            # Utility scripts
│   ├── migrate.ts      # Database migrations
│   └── seed.ts         # Seed data
│
├── tests/              # E2E and integration tests
│   ├── e2e/           # Playwright tests
│   └── integration/    # API integration tests
│
├── .github/            # GitHub workflows
│   ├── workflows/     # CI/CD pipelines
│   └── copilot-instructions.md
│
└── README.md          # This file
```

---

## 🎯 Key Features

### MVP (Current Phase)
- ✅ Property search and listing pages (SEO-optimized)
- ✅ Booking engine with availability calendar
- ✅ eSIM product store with QR code provisioning
- ✅ Stripe checkout integration
- ✅ User accounts and order history
- ✅ Admin portal for inventory management

### Post-MVP Roadmap
- 🔄 Channel manager integration (Booking.com, Expedia)
- 🔄 Dynamic pricing and promotions engine
- 🔄 Multi-currency and multi-language support
- 🔄 Virtual phone/DID ordering with SIP/CPaaS
- 🔄 Advanced KYC and compliance workflows
- 🔄 Loyalty program and review system

---

## 🏗️ Architecture

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Hosting:** Netlify (CDN + Edge Functions)
- **State:** React Query + Zustand
- **Forms:** React Hook Form + Zod validation

### Backend
- **Runtime:** Node.js + TypeScript
- **Architecture:** Serverless microservices
- **Database:** PostgreSQL (Supabase/Neon)
- **Cache:** Redis (Upstash)
- **Storage:** S3-compatible (Cloudflare R2)
- **API:** RESTful + tRPC for type safety

### Integrations
- **Payments:** Stripe (primary), Adyen (future)
- **eSIM Partners:** Airalo, eSIMAccess
- **OTA Connectivity:** Booking.com API
- **Communications:** Twilio (SMS/Voice/DIDs)
- **Search:** Algolia (property search)
- **Monitoring:** Sentry, Datadog

---

## 🔧 Development

### Commands

```bash
# Frontend
npm run dev              # Start Next.js dev server
npm run build            # Production build
npm run lint             # ESLint
npm run type-check       # TypeScript check

# Backend
npm run dev:api          # Start API services locally
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed development data

# Full stack
npm run dev:all          # Run frontend + backend
npm run build:all        # Build everything
```

### Environment Variables

Create `.env` files in `frontend/` and `backend/`:

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

**Backend (.env)**
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
STRIPE_SECRET_KEY=sk_test_...
AIRALO_API_KEY=...
```

---

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests (Playwright)
npm run test:e2e

# Integration tests
npm run test:integration

# Run all tests
npm run test:all
```

---

## 🚢 Deployment

### Frontend (Netlify)
- Push to `main` branch triggers automatic Netlify deploy
- Preview deployments on pull requests
- Environment variables configured in Netlify UI

### Backend
- Serverless functions deploy via GitHub Actions
- Database migrations run automatically on deploy
- Secrets managed via platform secret managers

---

## 📊 Monitoring & Observability

- **Errors:** Sentry (frontend + backend)
- **Metrics:** Datadog / Prometheus
- **Logs:** Structured JSON logs to CloudWatch/Datadog
- **Analytics:** Google Analytics 4 + server-side events
- **Uptime:** Better Uptime / Pingdom

---

## 🔒 Security & Compliance

- **PCI DSS:** Stripe hosted checkout (reduces scope)
- **GDPR:** Cookie consent, DPAs with partners
- **KYC:** Identity verification for telecom services
- **Security:** WAF, HTTPS, CSP, rate limiting
- **Secrets:** Rotated regularly, never committed to repo

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📞 Support

- **Email:** support@bookmethat.com
- **Discord:** [Join our community](https://discord.gg/bookmethat)
- **Documentation:** [docs.bookmethat.com](https://docs.bookmethat.com)

---

**Built with ❤️ by the bookmethat team**

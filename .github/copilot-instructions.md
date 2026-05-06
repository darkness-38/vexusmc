# Copilot Instructions for VexusMC

## Build, Test & Lint Commands

**Development:**
```bash
npm run dev        # Start Next.js dev server (localhost:3000)
npm run build      # Build for production
npm start          # Run production build
```

**Database:**
```bash
npm run prisma:generate  # Generate Prisma Client
npm run prisma:push      # Sync schema to database
npm run prisma:seed      # Populate test data (includes test users: testoyuncu/test123, vipuser/vip123, mvpuser/mvp123)
```

**Code Quality:**
```bash
npm run lint       # Run ESLint (Next.js config)
npm run format     # Format all files with Prettier
```

**Testing:**
Currently no automated tests configured. The README includes a smoke test checklist for manual validation.

## Project Architecture

This is a **Next.js 14 (App Router) + TypeScript** gaming server management portal for a Turkish Minecraft server. Key architectural layers:

### Frontend
- **Pages & Routes:** Turkish-localized routes in `app/` (e.g., `/giris` for login, `/magaza` for shop, `/hesabim` for account)
- **Components:** Modular, reusable UI components in `components/` (buttons, cards, modals, etc.) with Tailwind styling and Framer Motion animations
- **State Management:** Zustand store (checkout in `store/`)
- **Form Handling:** React Hook Form + Zod for validation

### Backend
- **API Routes:** Serverless functions in `app/api/` following Next.js conventions
  - Auth: `/api/auth/[...nextauth]` (NextAuth v5 with Credentials provider)
  - Shop: `/api/magaza/urunler` (product listing)
  - User: `/api/kullanici/*` (profile, balance, orders)
  - Leaderboard: `/api/liderlik` (ranked players)
  - Penalties: `/api/ceza-sorgula` (ban/penalty lookup)
- **Authentication:** NextAuth v5 with JWT sessions (credentials provider only)
- **Database:** Prisma ORM with PostgreSQL, models: User, Product, Order, Transaction, Penalty

### Middleware & Protection
- `middleware.ts` handles route protection for `/hesabim/*` and `/bakiye-yukle` (redirects to login if not authenticated)
- Protected routes redirect logged-in users back to `/hesabim` if accessing `/giris`

### External Integration
- Avatar images sourced from Minotar (`minotar.net`) - configured in `next.config.mjs`

## Key Conventions

### Naming & Language
- **Route names:** Turkish-localized (not English slugs)
- **Variable/function names:** English, camelCase in code
- **Database fields:** English, camelCase
- **UI text:** Turkish strings (often in `constants.ts` for reusability)

### Authentication & Authorization
- NextAuth callback flows update JWT token with user `id`, `username`, `rank` fields
- Session strategy is JWT (stateless)
- Password hashing: bcryptjs (compare in auth provider, never store plaintext)

### API Response Patterns
- Standardized response handling via Prisma calls
- No custom error middleware; rely on Next.js error boundaries
- Credentials provider validates input with Zod schemas before querying DB

### TypeScript & Type Safety
- Strict mode enabled in `tsconfig.json`
- Custom types in `types/index.ts` (ProductCategory, FeatureItem, AuthUser, etc.)
- Extend NextAuth session/token types via `types/next-auth.d.ts`

### Styling & UI
- Tailwind CSS v3 with custom CSS variables for `--background`, `--foreground`
- Components use `clsx` for conditional classNames
- Animations via Framer Motion
- Icons from Lucide React
- Toast notifications via Sonner

### State & Data Fetching
- SWR for client-side data fetching with automatic revalidation
- Zustand for client-side store (cart, etc.)
- Prisma query patterns: use `.findUnique()` for single lookups, `.findMany()` for lists

### Seeding & Test Data
- Seed file: `prisma/seed.ts`
- Test users seeded with ranks: testoyuncu (default), vipuser (VIP), mvpuser (MVP)
- Run after `prisma db push`: `npm run prisma:seed`

### URL Alias
- All imports use `@/*` alias to reference from project root (configured in `tsconfig.json`)

## Important Notes

- **Database:** PostgreSQL (not SQLite despite mention in README) - connection via `DATABASE_URL` and `DIRECT_URL`
- **Environment:** `.env` and `.env.local` contain secrets (never commit)
- **Next.js Version:** 14.2.35 using App Router (not Pages Router)
- **Auth Flow:** After login, users are redirected via middleware to `/hesabim` (protected account page)

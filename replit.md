# Devices Doctor - Doorstep Device Repair Platform

## Overview

Devices Doctor is a doorstep device repair booking platform targeting Mumbai and nearby areas. Customers can browse repair services (screen replacement, battery, charging, software, water damage, camera/speaker, motherboard repairing, iPhone back glass, Android back panel, diagnosis), read reviews, and book a technician visit. The platform promises 30-minute doorstep repair with genuine parts and 3 to 6 months warranty. Prices are NOT shown on the frontend.

The application is a multi-page website with a full-stack architecture: React frontend, Express backend, and PostgreSQL database. Pages include Home, Services listing, Brands listing, Areas, About Us, Contact, Privacy Policy, Terms & Conditions, Copyright, individual Brand pages (17 brands), and individual Service pages (10 services). A floating WhatsApp button provides quick customer contact. The booking form uses manual text input for location (no dropdown). The diagnosis service page includes a note about free diagnosis when the customer proceeds with repair.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query v5 for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming (dark navy blue theme with cyan/teal accents)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered animations and transitions
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 running on Node.js with TypeScript (via tsx)
- **HTTP Server**: Node's built-in `http.createServer` wrapping Express
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Key Endpoints**:
  - `GET /api/services` - List repair services
  - `GET /api/services/:id/problems` - Service-specific problems with pricing
  - `POST /api/bookings` - Create repair booking
  - `GET /api/bookings` - List bookings
  - `GET /api/reviews` / `POST /api/reviews` - Customer reviews
  - `GET /api/cities` - Served cities
- **Validation**: Zod schemas (via drizzle-zod) for request body validation on POST endpoints
- **Dev Mode**: Vite dev server middleware integrated into Express for HMR
- **Production**: Static file serving from `dist/public`

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Tables**:
  - `services` - repair service types (name, description, icon, category, priceRange)
  - `service_problems` - specific problems per service with individual pricing
  - `bookings` - customer repair bookings (customer info, device details, scheduling, status)
  - `reviews` - customer testimonials (name, rating, comment, service, city)
  - `cities` - cities where service is available (name, state, active flag)
  - `brand_models` - admin-managed device models per brand (brandSlug, modelName), displayed alongside hardcoded defaults on brand pages
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Seeding**: `server/seed.ts` populates initial cities, services, and sample reviews

### Build System
- **Client Build**: Vite outputs to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs` (CommonJS format)
- **Build Script**: Custom `script/build.ts` handles both client and server builds
- **Key Commands**:
  - `npm run dev` - Development with HMR
  - `npm run build` - Production build
  - `npm start` - Run production build
  - `npm run db:push` - Push schema to database

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # Page sections and UI components
    components/ui/  # shadcn/ui component library
    pages/        # Route pages (home, services-listing, brands-listing, areas, about, contact, brand-page, service-page, privacy-policy, terms-conditions, not-found, admin/admin-brand-models)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client config
server/           # Backend Express application
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database access layer (IStorage interface + DatabaseStorage)
  seed.ts         # Database seeding
  vite.ts         # Vite dev server integration
  static.ts       # Production static file serving
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle database schema and Zod validation schemas
migrations/       # Drizzle migration files
```

### Storage Layer Pattern
The backend uses an `IStorage` interface abstraction in `server/storage.ts`, with `DatabaseStorage` as the concrete PostgreSQL implementation. This pattern allows potential swapping of storage backends.

## External Dependencies

- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable. Required for the application to function.
- **WhatsApp**: Integration via direct `wa.me` links for customer communication (phone: 918169701980)
- **Google Fonts**: Poppins, DM Sans, Fira Code, Geist Mono, and Architects Daughter fonts loaded from Google Fonts CDN
- **react-icons**: Used for social media icons (Instagram, Facebook) in the footer
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` for development on Replit
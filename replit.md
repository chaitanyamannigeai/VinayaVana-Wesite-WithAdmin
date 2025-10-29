# VinayaVana Homestay

## Overview

VinayaVana Homestay is a full-stack web application for a serene nature retreat property near Gokarna, Karnataka. The application serves as a booking and information platform for a 1-acre property featuring a bungalow surrounded by coconut and betelnut trees. It provides accommodation details, availability checking, tariff calculation, cab service coordination, guest reviews, and an admin dashboard for property management.

The system enables potential guests to explore the property, check unit availability, calculate pricing, and initiate bookings via WhatsApp. Property administrators can manage tariff rates, cab destinations, and booking calendars through a secure admin interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing library chosen for its minimal footprint and simplicity compared to React Router.

**UI Components**: Built on shadcn/ui component library with Radix UI primitives. This approach provides accessible, customizable components while maintaining design consistency. The component library follows a "New York" style variant with custom theming.

**Styling**: TailwindCSS for utility-first styling with custom design tokens. The theme implements a nature-inspired color palette (greens, browns, earth tones) defined in CSS variables to support light/dark modes. Typography uses Playfair Display for headings (hospitality feel), Inter for body text (readability), and Montserrat for accents.

**State Management**: TanStack Query (React Query) for server state management, providing caching, background refetching, and optimistic updates. No global client state management library is used, relying instead on React's built-in state and context where needed.

**Form Handling**: React Hook Form with Zod schema validation for type-safe form inputs and error handling.

### Backend Architecture

**Server Framework**: Express.js running on Node.js, serving both API endpoints and static frontend assets in production.

**API Design**: RESTful API structure with endpoints organized by resource type (auth, bookings, tariff, cab destinations). Authentication is session-based rather than token-based.

**Session Management**: express-session with PostgreSQL session store (connect-pg-simple), providing persistent server-side sessions. Sessions are configured with secure cookies in production and include CSRF protection via sameSite: 'strict'.

**Authentication**: Password-based authentication using bcrypt for hashing. Admin privileges are role-based (isAdmin boolean flag). The system includes middleware to protect admin routes.

**File Structure**: Monorepo structure with shared schema definitions between client and server, reducing duplication and ensuring type consistency across the stack.

### Data Storage

**Database**: PostgreSQL accessed via Neon serverless driver, providing connection pooling and serverless-friendly database access.

**ORM**: Drizzle ORM for type-safe database queries and migrations. Schema definitions in `shared/schema.ts` are shared between frontend and backend, ensuring consistent types.

**Schema Design**:
- `users`: Authentication and admin role management
- `tariffSettings`: Configurable pricing tiers (regular, peak, holiday rates)
- `cabDestinations`: Cab service information with driver details
- `bookings`: Reservation records with unit assignments and date ranges
- `session`: Server-side session storage (auto-created by connect-pg-simple)

**Database Migrations**: Managed through Drizzle Kit, with migrations stored in `/migrations` directory. Schema changes are pushed using `npm run db:push`.

### Authentication & Authorization

**Strategy**: Session-based authentication with server-side session storage in PostgreSQL. This approach was chosen over JWT for its simplicity in a traditional server-rendered context and better security characteristics (sessions can be invalidated server-side).

**Password Security**: bcrypt with configurable salt rounds for password hashing. Passwords are never stored in plaintext or reversibly encrypted.

**Role-Based Access**: Binary admin/non-admin role system. Admin routes are protected by `requireAdmin` middleware that checks session data.

**Session Configuration**: 7-day session expiration, HTTP-only cookies to prevent XSS attacks, secure flag in production for HTTPS-only transmission, strict sameSite policy to prevent CSRF.

### External Dependencies

**Database Service**: Neon PostgreSQL (serverless PostgreSQL provider)
- Connection via `@neondatabase/serverless` package
- WebSocket support for serverless environments
- Connection pooling handled by Neon
- DATABASE_URL environment variable required

**Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- Automatic session table creation
- Session cleanup handled by the library

**Communication Platform**: WhatsApp Business integration
- Booking inquiries redirected to WhatsApp rather than email
- Direct contact with property owners via WhatsApp links
- Cab service booking coordination through driver WhatsApp numbers

**No External APIs**: The application does not integrate with external booking APIs, payment gateways, or calendar sync services. Bookings are managed manually through the admin dashboard.

**Asset Management**: Static images stored in `attached_assets` directory, served directly by Express in production. No CDN or cloud storage integration (images are bundled with the application).

**Email Service**: Not implemented. All communication happens via WhatsApp links, avoiding the need for SMTP configuration or email service providers.

**Design System**: Based on design guidelines inspired by Airbnb and Booking.com, adapted for nature retreat aesthetic. Color palette and typography choices documented in `design_guidelines.md`.
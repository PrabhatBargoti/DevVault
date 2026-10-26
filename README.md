# DevVault

DevVault is a dark-themed developer workspace and knowledge vault designed for saving, organizing, browsing, and revisiting code snippets. The repository contains a React single-page frontend and an Express API backed by Supabase. The client uses Supabase Auth and the API for account-scoped snippet persistence.

This repository is intentionally split into two main areas:

- `Client/` — the browser application built with React, Vite, and Tailwind
- `Server/` — the Express API, Supabase integration, and database migration

The frontend provides the product UX and workflow. Supabase Auth handles browser sign-in, and authenticated snippet requests are sent to the backend API. Password recovery/change screens remain placeholders.

## Project status

The app is operational as a frontend prototype with the following implemented behaviors:

- Landing page for product marketing and calls to action
- Supabase password and configured OAuth sign-in/signup
- Terms acceptance UI on signup
- Privacy Policy and Terms and Conditions pages linked from the landing footer
- Dashboard workspace with snippet overview, stats, and empty states
- Snippet create, search, filter, display, and delete functionality
- Protected workspace routes with API-backed snippet CRUD
- Responsive dark UI with route-based navigation

The following are still placeholders or intentionally unimplemented:

- Password recovery/change and account deletion
- Tag/category editing independent of snippets
- Production deployment pipeline and distributed rate-limit storage

## Repository layout

```text
D:\DevVault
├── Client/                  # Frontend React app
│   ├── public/              # Static public assets
│   ├── src/                 # React source files
│   ├── package.json         # Frontend project config and scripts
│   ├── vite.config.js       # Vite build tooling config
│   ├── vercel.json          # SPA rewrite config for hosting
│   ├── frontend.md          # Detailed frontend engineering documentation
│   └── ...
├── Server/                  # Express and Supabase API
│   ├── src/                 # API routes, middleware, services, and utilities
│   ├── supabase/migrations/ # Database schema and RLS policies
│   ├── Backend.md           # Detailed backend documentation
│   ├── package.json         # Server package config and scripts
│   └── server.js            # Express entry point
├── CONTRIBUTING.md          # Contribution workflow and guidelines
├── README.md                # Repository overview (this file)
└── .gitignore
```

## Tech stack

### Frontend

- React 19
- React Router DOM
- Vite
- Tailwind CSS
- lucide-react for icons
- react-helmet-async for document metadata
- Oxlint for JS linting

### Backend

- Express 5
- express-rate-limit
- dotenv
- @supabase/supabase-js
- cors

## Frontend overview

The frontend app lives entirely under `Client/` and is designed as a Vite SPA with route-driven screens. Supabase Auth manages sign-in, and the frontend calls the Express API with the user's access token. Snippets are stored in the configured Supabase database; profile settings remain local to the browser.

### Main routes

- `/` — marketing landing page
- `/Login` — Supabase password/OAuth login
- `/Signup` — Supabase account creation
- `/forgot-password` — password-recovery placeholder
- `/change-password` — password-change placeholder
- `/privacy-policy` — privacy notice
- `/terms` — Terms and Conditions
- `/Home` — authenticated dashboard workspace
- `/Snippet` — authenticated snippet workspace and creation tool
- `/Tags` — browse and search snippet tags
- `/Categorie` — browse snippet categories
- `/Setting` — local profile, account, and vault settings
- `*` — not-found page

The route URLs are intentionally capitalized to match the existing app behavior and are preserved in the frontend implementation.

### Data model and session state

Snippet records are fetched from the API for the authenticated account and mutations are saved to the Supabase database through the server. The frontend keeps a shared in-memory view of the loaded records. Profile settings are stored separately in browser `localStorage`.

Each snippet record includes:

- `id`
- `title`
- `description`
- `code`
- `language`
- `category`
- `tags`
- `createdAt`

Do not enter secrets in snippets.

## Server overview

The `Server/` package implements authenticated snippet CRUD endpoints, input validation, pagination, JSON payload limits, IP/account rate limiting, and a configurable CORS origin allowlist. Supabase Auth verifies bearer access tokens, and snippet data is stored in the `public.snippets` table created by the server migration.

## Environment and configuration

Copy `Server/.env.example` to `Server/.env` and configure the backend:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
PORT=3000
CORS_ORIGINS=http://localhost:5173
```

The Supabase secret key is server-only; do not expose it to frontend code or commit it. Copy `Client/.env.example` to `Client/.env.local` and set `VITE_API_BASE_URL`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_PUBLISHABLE_KEY`. The frontend publishable key is public; never add server credentials to client environment variables. Set `CORS_ORIGINS` to the exact deployed frontend origin(s).

## Quick start

### Start both packages

```bash
cd Server
npm install
npm start
```

In a second terminal:

```bash
cd Client
npm install
npm run dev
```

Then open the Vite app in a browser, typically on:

```text
http://localhost:5173
```

### Production build

```bash
cd Client
npm run build
npm run preview
```

### Linting

```bash
cd Client
npm run lint
```

### Backend

Configure `Server/.env` using `Server/.env.example`, apply the Supabase migration, and start the API:

```bash
cd Server
npm install
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
npm start
```

Run the backend tests with:

```bash
cd Server
npm test
```

See the [backend guide](Server/Backend.md) for local Supabase setup, configuration details, API endpoints, request examples, validation rules, and deployment notes.

## Development notes

### Architectural approach

The client groups route pages and domain-specific UI under `Client/src/Layouts/`:

- auth
- landing
- dashboard
- snippets
- categories
- settings
- tags
- not-found

Reusable UI lives under `Client/src/components/`; client-wide hooks, storage helpers, and utilities live under `Client/src/hooks/`, `Client/src/lib/`, and `Client/src/utils/`. Domain-specific UI and logic stay under the matching `Layouts/` directory.

### Current implementation pattern

The app uses route-level composition, a Supabase Auth provider, protected workspace routes, and a shared in-memory view store for API-loaded snippets. Server requests carry the signed-in user's access token; profile settings remain in browser local storage.

### Security posture

The backend API requires a verified access token and scopes snippet operations to the authenticated user's ID; its server-only Supabase secret key must remain private. The legal pages are initial product documents and require legal review before production use.

## Documentation

For the detailed implementation and engineering notes, see:

- [Frontend guide](Client/frontend.md)
- [Backend guide](Server/Backend.md)
- [Contribution guide](CONTRIBUTING.md)

The frontend guide covers architecture, routes, Supabase authentication, API-backed snippet state, and development. The backend guide covers configuration, database migrations, authentication, CRUD endpoints, CORS, validation, rate limiting, and deployment.

## Recommended next steps

Potential next steps include:

1. Add end-to-end tests for the frontend/API integration
2. Configure a shared rate-limit store and production deployment settings
3. Review the legal pages and establish contact and consent-retention processes before production

## Summary

DevVault includes a polished frontend and an authenticated, rate-limited snippet API. Supabase Auth and API-backed snippet workflows are connected; deployment-specific Supabase, CORS, and production configuration still need to be set up before launch.

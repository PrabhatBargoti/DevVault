# DevVault

DevVault is a dark-themed developer workspace and knowledge vault designed for saving, organizing, browsing, and revisiting code snippets. The repository contains a React single-page frontend and an Express API backed by Supabase. The client currently keeps snippets in memory only for the active page session and is not yet connected to the backend API.

This repository is intentionally split into two main areas:

- `Client/` — the browser application built with React, Vite, and Tailwind
- `Server/` — the Express API, Supabase integration, and database migration

The frontend provides the product UX and workflow. Client-side authentication is not currently connected; the login, signup, and password pages are placeholders until server authentication is implemented. Snippets are held in memory for the active page session only and are not yet connected to the separately implemented backend API.

## Project status

The app is operational as a frontend prototype with the following implemented behaviors:

- Landing page for product marketing and calls to action
- Login, signup, and password pages retained as non-functional placeholders
- Terms acceptance UI on signup
- Privacy Policy and Terms and Conditions pages linked from the landing footer
- Dashboard workspace with snippet overview, stats, and empty states
- Snippet create, search, filter, display, and delete functionality
- Session-only snippet handling; snippets are not saved to browser storage
- Responsive dark UI with route-based navigation

The following are still placeholders or intentionally unimplemented:

- Frontend snippet workflows are not connected to the backend API or Supabase persistence
- Client authentication and password recovery are not connected to the server
- User accounts and synchronization across devices
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

## Frontend overview

The frontend app lives entirely under `Client/` and is designed as a Vite SPA with route-driven screens. Authentication screens are placeholders and do not currently connect to the server. Snippets and profile settings remain a browser-local prototype and are not synchronized with the API.

### Main routes

- `/` — marketing landing page
- `/Login` — login placeholder
- `/Signup` — signup placeholder with terms and privacy acceptance UI
- `/forgot-password` — password-recovery placeholder
- `/change-password` — password-change placeholder
- `/privacy-policy` — privacy notice
- `/terms` — Terms and Conditions
- `/Home` — dashboard workspace
- `/Snippet` — snippet workspace and creation tool
- `/Tags` — browse and search snippet tags
- `/Categorie` — browse snippet categories
- `/Setting` — local profile and vault settings
- `*` — not-found page

The route URLs are intentionally capitalized to match the existing app behavior and are preserved in the frontend implementation.

### Data model and session state

Snippet data is held in memory while the current page session is open. It is discarded on reload or close; persistent backend storage will be connected later. Profile settings are stored separately in browser `localStorage`.

Each snippet record includes:

- `id`
- `title`
- `description`
- `code`
- `language`
- `category`
- `tags`
- `createdAt`

The current session-only store is temporary UI state, not durable storage. Do not enter secrets in snippets.

## Server overview

The `Server/` package implements authenticated snippet CRUD endpoints, input validation, pagination, JSON payload limits, and IP/account rate limiting. Supabase Auth verifies bearer access tokens, and snippet data is stored in the `public.snippets` table created by the server migration. The frontend is not yet wired to these endpoints or the server's authentication flow.

## Environment and configuration

Copy `Server/.env.example` to `Server/.env` and configure the backend:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
PORT=3000
```

The Supabase secret key is server-only; do not expose it to frontend code or commit it. The client has no Supabase configuration or authentication SDK; do not add server credentials to client environment variables.

## Quick start

### Frontend

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

The app uses route-level composition and a shared in-memory snippet store. Authentication screens are placeholders and there is no global auth context or protected route. Snippet state is discarded when the page reloads; profile settings remain in browser local storage.

### Security posture

The frontend is intentionally a prototype and should not be treated as production-safe for sensitive data. Snippet state is session-only, client authentication is not implemented, and routes are not protected. The backend API requires a verified access token and scopes snippet operations to the authenticated user's ID; its server-only Supabase secret key must remain private. The legal pages are initial product documents and require legal review before production use.

## Documentation

For the detailed implementation and engineering notes, see:

- [Frontend guide](Client/frontend.md)
- [Backend guide](Server/Backend.md)
- [Contribution guide](CONTRIBUTING.md)

The frontend guide covers architecture, routes, authentication placeholders, session-only snippet state, and development. The backend guide covers configuration, database migrations, authentication, CRUD endpoints, validation, rate limiting, and deployment.

## Recommended next steps

Potential next steps include:

1. Connect snippet workflows to the backend API and migrate existing browser snippets to authenticated storage
2. Add protected frontend routes and user-facing API error handling
3. Add end-to-end tests for the frontend/API integration
4. Configure a shared rate-limit store and production deployment settings
5. Review the legal pages and establish contact and consent-retention processes before production

## Summary

DevVault includes a polished frontend and an authenticated, rate-limited snippet API. Client authentication and snippet flows are not connected to the server, so authenticated UI and synchronized persistence remain future integration work before the full product is production-ready.

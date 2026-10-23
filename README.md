# DevVault

DevVault is a dark-themed developer workspace and knowledge vault designed for saving, organizing, browsing, and revisiting code snippets. The repository contains a React single-page frontend and an Express API backed by Supabase. The frontend's snippet workflow currently uses browser `localStorage`; it has not yet been connected to the backend API.

This repository is intentionally split into two main areas:

- `Client/` — the browser application built with React, Vite, and Tailwind
- `Server/` — the Express API, Supabase integration, and database migration

The frontend demonstrates the product UX and workflow as a browser-based prototype. The backend API is implemented separately and requires Supabase configuration; the frontend and API are not yet integrated.

## Project status

The app is operational as a frontend prototype with the following implemented behaviors:

- Landing page for product marketing and calls to action
- Authentication UI screens for login, signup, and forgot-password flow
- Dashboard workspace with snippet overview, stats, and empty states
- Snippet create, search, filter, display, and delete functionality
- Browser-based persistence using `localStorage`
- Responsive dark UI with route-based navigation

The following are still placeholders or intentionally unimplemented:

- Frontend authentication UI is not connected to real authentication
- Frontend snippet workflows are not connected to the backend API or Supabase persistence
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

The frontend app lives entirely under `Client/` and is designed as a Vite SPA with route-driven screens. It currently behaves like a polished mock product experience rather than a fully connected application.

### Main routes

- `/` — marketing landing page
- `/Login` — login screen
- `/Signup` — signup screen
- `/forgot-password` — reset flow placeholder page
- `/Home` — dashboard workspace
- `/Snippet` — snippet workspace and creation tool
- `/Tags` — browse and search snippet tags
- `/Categorie` — browse snippet categories
- `/Setting` — local profile and vault settings
- `*` — not-found page

The route URLs are intentionally capitalized to match the existing app behavior and are preserved in the frontend implementation.

### Data model and persistence

Snippet data is stored in browser `localStorage` with keys such as:

- `devvault-snippets` — array of saved snippet objects
- `devvault-has-created-snippet` — a boolean marker used by empty-state logic

Each snippet record includes:

- `id`
- `title`
- `description`
- `code`
- `language`
- `category`
- `tags`
- `createdAt`

This provides a simple demo persistence layer, but it is not encrypted, user-scoped, synchronized, or secure enough for real production data.

## Server overview

The `Server/` package implements authenticated snippet CRUD endpoints, input validation, pagination, JSON payload limits, and IP/account rate limiting. Supabase Auth verifies bearer access tokens, and snippet data is stored in the `public.snippets` table created by the server migration. The frontend is not yet wired to these endpoints.

## Environment and configuration

Copy `Server/.env.example` to `Server/.env` and configure the backend:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
PORT=3000
```

The Supabase secret key is server-only; do not expose it to frontend code or commit it. The frontend currently uses browser storage and does not require backend environment values to run.

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

The app uses React local state and route-level composition instead of a centralized application store. This keeps the prototype lightweight and easy to follow, but it also means there is no built-in async API layer, auth context, or global state management system.

### Security posture

The frontend is intentionally a prototype and should not be treated as production-safe for sensitive data. Browser `localStorage` is not secure storage, and frontend authentication is not connected to Supabase. The backend API requires a verified access token and scopes snippet operations to the authenticated user's ID; its server-only Supabase secret key must remain private.

## Documentation

For the detailed implementation and engineering notes, see:

- [Frontend guide](Client/frontend.md)
- [Backend guide](Server/Backend.md)
- [Contribution guide](CONTRIBUTING.md)

The frontend guide covers architecture, routes, local persistence, and development. The backend guide covers configuration, database migrations, authentication, CRUD endpoints, validation, rate limiting, and deployment.

## Recommended next steps

Potential next steps include:

1. Connect frontend sign-in and snippet workflows to Supabase Auth and the backend API
2. Migrate existing browser snippets to authenticated server-side storage
3. Add end-to-end tests for the frontend/API integration
4. Configure a shared rate-limit store and production deployment settings
5. Add protected frontend routes and user-facing API error handling

## Summary

DevVault includes a polished frontend prototype and an authenticated, rate-limited snippet API. The frontend still stores snippets locally and is not connected to the API, so authentication and synchronized persistence remain future integration work before the full product is production-ready.

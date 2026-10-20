# DevVault

DevVault is a dark-themed developer workspace and knowledge vault designed for saving, organizing, browsing, and revisiting code snippets. The project currently centers around a React single-page frontend that provides a polished landing experience and a workspace dashboard for snippet management, while the backend package remains a lightweight Express bootstrapping layer with Supabase placeholders rather than a live production API.

This repository is intentionally split into two main areas:

- `Client/` — the browser application built with React, Vite, and Tailwind
- `Server/` — the server-side scaffold for future API or database integration

The goal of the current implementation is a self-contained, browser-based prototype that demonstrates product UX and workflow without depending on a live backend service.

## Project status

The app is operational as a frontend prototype with the following implemented behaviors:

- Landing page for product marketing and calls to action
- Authentication UI screens for login, signup, and forgot-password flow
- Dashboard workspace with snippet overview, stats, and empty states
- Snippet create, search, filter, display, and delete functionality
- Browser-based persistence using `localStorage`
- Responsive dark UI with route-based navigation

The following are still placeholders or intentionally unimplemented:

- Real authentication and authorization
- Backend API endpoints
- Supabase integration and database persistence
- User accounts and synchronization across devices
- Full production deployment pipeline and tests

## Repository layout

```text
D:\DevVault
├── Client/                  # Frontend React app
│   ├── public/              # Static public assets
│   ├── src/                 # React source files
│   ├── package.json         # Frontend project config and scripts
│   ├── vite.config.js       # Vite build tooling config
│   ├── vercel.json          # SPA rewrite config for hosting
│   ├── FRONTEND.md          # Detailed frontend engineering documentation
│   └── ...
├── Server/                  # Express server scaffold
│   ├── src/                 # Server source files
│   ├── package.json         # Server package config
│   └── server.js            # Express bootstrap entry point
├── .env.example             # Supabase environment variable placeholders
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
- `/Tags` — tags placeholder
- `/Categorie` — categories placeholder
- `/Setting` — settings placeholder
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

The `Server/` package is currently a minimal scaffold. It contains an `Express` app export but no real application routes, no authorization logic, and no database integration. The Supabase configuration files are placeholders intended to support future server-side storage or auth work.

The current configuration suggests the project may evolve toward a backend storage architecture but does not yet implement it.

## Environment and configuration

The root `.env.example` contains placeholder values for a future Supabase setup:

```env
SUPABASE_URL = https://your-supabase-url.supabase.co
SUPABASE_PUBLISHABLE_KEY = your-supabase-publishable-key
```

At present, the frontend does not consume any `VITE_*` variables, and the browser app does not depend on server environment values to run locally.

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

## Development notes

### Architectural approach

The project follows a feature-oriented frontend structure under `Client/src/features/`, with UI grouped by domain areas such as:

- auth
- landing
- dashboard
- snippets
- categories
- settings
- tags
- not-found

Shared UI and helpers live under `Client/src/shared/` and are only used when reusable across multiple feature boundaries.

### Current implementation pattern

The app uses React local state and route-level composition instead of a centralized application store. This keeps the prototype lightweight and easy to follow, but it also means there is no built-in async API layer, auth context, or global state management system.

### Security posture

The current frontend is intentionally a prototype and should not be treated as production-safe for sensitive data. Browser storage is not secure storage, and the app has no backend authorization layer today. Any real app features that handle authentication or secrets should be implemented with proper backend validation and access controls.

## Documentation

For the detailed implementation and engineering notes, see:

- [Client/FRONTEND.md](Client/FRONTEND.md)

The detailed frontend guide covers architecture, route map, persistence behavior, styling, verification commands, limitations, and future development guidance.

## Recommended next steps

Depending on the direction of the project, the next industrialization steps would likely include:

1. Establishing a real backend API and authentication flow
2. Replacing localStorage with secure server-backed persistence
3. Adding database models and service layer integration
4. Implementing automated tests and type safety
5. Defining authorization rules and protected routes
6. Hardening deployment, environment, and production configuration

## Summary

DevVault is best understood as a strong frontend prototype for a developer knowledge vault product. It has a polished user experience, a working local snippet workflow, and a clear feature layout, but it still requires real backend and security work before being considered a production-ready application.

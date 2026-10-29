# DevVault Frontend Engineering Guide

This guide describes the implemented React application in `Client/`. It is based on the current source tree and distinguishes working browser behavior from visual placeholders and unimplemented integrations.

## Contents

- [Overview](#overview)
- [Stack](#stack)
- [Repository boundaries](#repository-boundaries)
- [Setup](#setup)
- [Environment](#environment)
- [Structure](#structure)
- [Bootstrap and architecture](#bootstrap-and-architecture)
- [Routes](#routes)
- [Features](#features)
- [Persistence and data flow](#persistence-and-data-flow)
- [Shared UI and styling](#shared-ui-and-styling)
- [API, auth, and security](#api-auth-and-security)
- [Scripts and verification](#scripts-and-verification)
- [Development guides](#development-guides)
- [Troubleshooting](#troubleshooting)
- [Production](#production)
- [Limitations and contribution](#limitations-and-contribution)

## Overview

DevVault is a dark-themed developer knowledge vault. The frontend presents a marketing landing page and a responsive workspace for saving, editing, revisiting, searching, filtering, and deleting code snippets, and organizing them by tag and category. It also contains route-level UI for authentication and settings.

The client is a Vite single-page application. It owns browser navigation, presentation, and SEO metadata. Supabase Auth handles client sign-in; authenticated snippet requests go through the Express API in `Server/`. Snippets are loaded from the account-scoped API and remain available across reloads. Profile settings remain in browser storage.

## Stack

| Concern | Actual implementation |
| --- | --- |
| UI | React and React DOM `^19.2.8` |
| Build | Vite `^8.2.2` with `@vitejs/plugin-react` |
| Routing | React Router DOM `^7.18.3` |
| Styling | Tailwind CSS `^4.3.3` through `@tailwindcss/vite` |
| Icons | `lucide-react` / `lucide` `^1.46.0` |
| Metadata | `react-helmet-async` `^3.0.0` |
| Authentication | `@supabase/supabase-js` |
| Backend API | Native `fetch` with Supabase bearer tokens |
| Linting | Oxlint `^1.79.0` with React rules |
| Language | JavaScript and JSX, native ES modules |
| State | In-memory snippet store and browser localStorage for profile settings |
| Tests | No client test framework configured |

There is no TypeScript compiler, schema validator, form library, Redux-like store, or React Query client configured.

## Repository boundaries

```text
D:\DevVault
├── Client/       React/Vite browser application
├── Server/       Express API and Supabase integration
├── Client/.env.example  Client API and Supabase configuration template
├── Server/.env.example  Server configuration template
└── README.md     Repository overview
```

Keep browser code and public assets in `Client/`. The server is a separate package and is not imported by the Vite build. Do not move privileged database operations or credentials into browser code.

## Setup

Use a current Node.js LTS release and npm. Configure both packages, then start them in separate terminals:

```bash
cd Server
npm ci
npm start
```

```bash
cd Client
npm ci
npm run dev
```

Vite normally serves the app at `http://localhost:5173`; the API listens on `http://localhost:3000`. Build and preview a production bundle with:

```bash
cd Client
npm run build
npm run preview
```

On Windows systems where PowerShell blocks `npm.ps1`, use `npm.cmd run dev`, `npm.cmd run build`, or `npm.cmd run lint`.

Copy `Client/.env.example` to `Client/.env.local` and set the Supabase project URL and publishable key. For local use, copy `Server/.env.example` to `Server/.env` and add the Supabase URL, publishable key, and server-only secret key. The frontend uses only the publishable key; never put the server secret key in a `VITE_*` variable.

## Environment

`VITE_API_BASE_URL` is the API base ending in `/api` (default `http://localhost:3000/api`). `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` configure browser authentication. These values are public; the Supabase secret/service-role key belongs only in `Server/.env`.

## Structure

```text
Client/
├── public/                         # Logo, favicon, social image, robots, sitemap
├── src/
│   ├── Layouts/                    # Route pages and domain-specific UI
│   │   ├── auth/                   # Login, signup, forgot and change password
│   │   ├── legal/                  # Privacy and terms pages
│   │   ├── landing/{pages,components}/
│   │   ├── dashboard/{pages,components}/
│   │   ├── snippets/{pages,components,lib}/
│   │   ├── categories/{pages,components}/
│   │   ├── settings/{pages,components}/
│   │   ├── tags/{pages,components}/
│   │   └── not-found/
│   ├── components/                 # Reusable UI: buttons, sidebar, header, SEO
│   ├── hooks/useScrollToSection.js # Shared landing scroll behavior
│   ├── lib/profileStorage.js       # Browser-local profile persistence
│   ├── utils/navItems.jsx          # Workspace navigation
│   ├── index.css                    # Tailwind entry and global CSS
│   └── main.jsx                     # React bootstrap
├── index.html
├── package.json / package-lock.json
├── vite.config.js
├── vercel.json
└── .oxlintrc.json
```

`Layouts/` groups route pages and their domain-specific components and logic. `components/`, `hooks/`, `lib/`, and `utils/` hold reusable client-wide UI and helpers. Keep a domain-specific component near its owning layout; put code in a client-wide directory only when it is genuinely reused across domains.

## Bootstrap and architecture

`index.html` provides `#root` and loads `src/main.jsx`. `main.jsx` imports `index.css` and renders:

```text
BrowserRouter
└── StrictMode
    └── HelmetProvider
            └── AuthProvider
                └── App
```

`BrowserRouter` enables client-side navigation. `HelmetProvider` enables page-level metadata. `src/app/App.jsx` lazy-loads route pages and wraps them in a shared Suspense boundary; `RouteLoadingSkeleton` renders a responsive page-shaped fallback while a route chunk is loading. After the initial route has had time to render, the app preloads route chunks in the background on ordinary connections so subsequent navigation is faster; it skips this work when the browser reports data saver or a 2G connection. `index.html` includes a full-viewport dark critical loading background to avoid a bright flash around the initial skeleton before the main stylesheet loads. The app shows the offline screen from browser connection events and catches React render errors with an error boundary. `src/components/SEO.jsx` sets title, description, robots, canonical, Open Graph, Twitter, image, and theme metadata.

The data flow is:

```text
Supabase Auth session → bearer-authenticated API request → Express → Supabase database
snippet API → shared in-memory view store ↔ dashboard/tags/categories/detail
```

Pages own UI state and callbacks; `AuthProvider` manages the Supabase session and the snippet store shares the current account's loaded records.

## Routes

| URL | Component | Purpose | Access |
| --- | --- | --- | --- |
| `/` | `Layouts/landing/pages/LandingPage` | Marketing page | Public |
| `/Signup` | `Layouts/auth/SignUpPage` | Create an account with Supabase Auth | Public |
| `/Login` | `Layouts/auth/LoginPage` | Sign in with password or an enabled OAuth provider | Public |
| `/forgot-password` | `Layouts/auth/ForgotPasswordPage` | Send a Supabase password reset email | Public |
| `/change-password` | `Layouts/auth/ChangePasswordPage` | Update password from an authenticated reset session | Public route; requires a valid session to submit |
| `/privacy-policy` | `Layouts/legal/PrivacyPolicyPage` | Privacy notice linked from the landing footer | Public |
| `/terms` | `Layouts/legal/TermsPage` | Terms and Conditions linked from signup and the landing footer | Public |
| `/Home` | `Layouts/dashboard/pages/DashboardPage` | Account's snippet dashboard | Authenticated |
| `/Snippet` | `Layouts/snippets/pages/SnippetsPage` | Create, edit, and delete server-backed snippets | Authenticated |
| `/Snippet/:snippetId` | `Layouts/snippets/pages/SnippetDetailPage` | View or edit an owned snippet; unavailable IDs show an error state | Authenticated |
| `/Snippet?create=1` | Same snippets page | Opens create form | Authenticated |
| `/Snippet?search=<term>` | Same snippets page | Shows matching results; supports category and tag query filters | Authenticated |
| `/Tags` | `Layouts/tags/pages/TagsPage` | Browse tags and counts from the signed-in account | Authenticated |
| `/Categorie` | `Layouts/categories/pages/CategoriesPage` | Browse categories and counts from the signed-in account | Authenticated |
| `/Setting` | `Layouts/settings/pages/SettingsPage` | Edit local profile details, sign out, delete snippets, or permanently delete the account | Authenticated |
| `*` | `Layouts/not-found/NotFoundPage` | 404 fallback | Public |

The existing capitalization is intentional and must be preserved. Routes use lazy page imports with a shared loading fallback. Workspace routes use `RequireAuth` and load the signed-in user's snippets before rendering; the API independently verifies the bearer token, so client-side route guards are not the security boundary. `vercel.json` rewrites unknown paths to `index.html` for BrowserRouter deep links.

## Features

### Landing

`LandingPage` composes navigation, hero, snippet preview, solution/features, how-it-works, open-source, CTA, and footer sections. `LandingNav` uses `useScrollToSection` for section links and `useNavigate` for Login/Signup. External GitHub links use a new tab with `noopener noreferrer`.

### Authentication

Login and signup use Supabase Auth in the browser. Password login/signup and GitHub/Google OAuth establish the session; the backend validates its access token on every protected API request. OAuth buttons require Terms acceptance, disable while redirecting, and return to `/Home`. Password recovery sends a Supabase reset email and password change requires a valid session from that flow.

For OAuth to work, enable Google and/or GitHub under Supabase **Authentication → Sign In / Providers**, configure each provider's client ID and secret, and add the frontend origins to **Authentication → URL Configuration** (including `http://localhost:5173` for local development and the exact deployed origin). Set the provider application's callback URL to the Supabase callback URL displayed on its provider settings page. The post-login `/Home` URL must also be on the Supabase redirect allowlist.

### Dashboard

`DashboardPage` reads the account's loaded snippets from the shared view store, renders the shared `DashboardHeader` and `Sidebar`, and chooses `HomeEmpty` or `HomeFill`. Filled dashboards delegate statistics, quick actions, recent snippets, and insights to focused components. Deletion is persisted through the API.

### Snippets

`SnippetsPage` owns URL query state and calls the API for create/edit/delete operations. `SnippetForm` collects a required, unique title and code plus description, language, category, and tags; title comparisons ignore leading/trailing whitespace and letter case. In edit mode it is prefilled with the saved snippet and excludes that record from duplicate-title checks. The language selector includes common languages, languages already used in the vault, and an option to enter a custom language; custom values are available in filters. `Snippet` derives category/language filter choices, applies search and URL filters, and displays a helpful no-results state with a clear-filters action. Each `SnippetCard` links to its detail and has an actions menu for editing or deleting. Delete uses an accessible confirmation dialog that can be dismissed with Cancel, Escape, or the backdrop. `SnippetDetailPage` displays and edits snippets loaded from the API.

### Tags and categories

The tags page derives tags and per-tag snippet counts from the current account's loaded snippet records, supports searching the tag list, and links each tag to matching snippet results. The categories page derives category cards and counts from the same records, adapts the grid to the viewport, and links each category to its filtered snippets.

### Settings

The settings page provides Profile and Account tabs; Appearance is intentionally not included. Profile name, email, and an optional PNG/JPG/WebP avatar (up to 1 MB) are saved in browser localStorage under `devvault-profile`. The shared `ProfileAvatar` reads these saved details and refreshes when the profile is saved, including across tabs. Account settings show the signed-in email, support sign-out, delete snippets, and permanently delete the signed-in account after the user types `DELETE` to confirm. The backend revokes that user's sessions before deleting the account.

## Persistence and data flow

`src/lib/snippetStore.js` holds the currently loaded snippet records in application memory and uses React's external-store subscription API so the snippets, dashboard, tags, categories, and detail screens share a consistent view. `src/lib/snippetApi.js` handles authenticated requests to the API, and `src/lib/authContext.jsx` manages the Supabase session. Snippets are fetched when an authenticated workspace opens and mutations are persisted to the API; browser storage is not used for snippet content.

New records contain the following shape:

```js
{
  id: string,
  title: string,
  description: string,
  code: string,
  language: string,
  category: string,
  tags: string[],
  createdAt: string,
  updatedAt?: string
}
```

API records provide their database `id`, `created_at`, and `updated_at`; the API adapter exposes timestamp aliases for the existing view components. Search text is represented in the URL; tag/category filters use URL parameters, while language filtering is local to the snippets view. Tags, categories, and the dashboard derive data from the currently loaded account records. Profile localStorage remains separate and is not used for snippet content.

## Shared UI and styling

Reusable components include `SEO`, `Sidebar`, the sticky `DashboardHeader` (shared snippet search and profile navigation), `ProfileAvatar`, `Logo`, `HomeShortcut`, and the four button variants; they live in `src/components/`. All workspace pages use the shared header; submitting its search opens matching results in Snippets. `src/utils/navItems.jsx` defines workspace navigation. `src/hooks/useScrollToSection.js` provides landing-page scroll behavior. `src/lib/profileStorage.js` owns profile localStorage keys, read/write helpers, and the in-tab profile update event. Keep domain-specific cards and forms under their owning `src/Layouts/<domain>/` directory; do not put business logic in generic buttons or layout components.

`OfflinePage` is shown while the browser reports no network connection and returns to the app when connectivity is restored. `ErrorPage` is used for missing snippets and unexpected React render errors; its retry action returns to the appropriate route or reloads the app. Both status screens use responsive, viewport-filling layouts.

`src/index.css` imports Inter and Tailwind, defines `--font-ui`, enables smooth scroll, prevents horizontal overflow, and sets the dark global palette. Components use Tailwind utilities and the existing palette (`#0B0D12`, `#12151C`, `#232733`, `#6E6BF4`). Layouts are mobile-first: the workspace sidebar is collapsible/full-width on small screens and fixed at the `md` breakpoint. Preserve semantic headings, labels, `aria-*` attributes, focus styles, and responsive classes.

Static assets live in `public/` and use root-relative URLs such as `/Logo.svg`, `/Favicon.png`, and `/og-image.png`.

## API, auth, and security

The client gets authentication sessions from Supabase and sends the short-lived access token as a Bearer token to the Express API. The server verifies the token and scopes data operations to that user. The browser uses only the Supabase publishable key; the secret/service-role key must stay in server environment configuration. Browser CORS is controlled by the server's `CORS_ORIGINS` allowlist. Workspace/auth SEO uses `noindex` where configured, but that only controls indexing.

## Scripts and verification

Run from `Client/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Build optimized assets into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

No client unit/integration/e2e test, type-check, or formatter script is configured. The server has a Node.js test-runner suite, invoked with `npm test` from `Server/`.

Verified checks for the current architecture are `npm.cmd run build` (successful) and `npm.cmd run lint` (successful with three React-quality warnings: state update in `ProfileAvatar` effect and render-time `Date.now()` in `SnippetCard`).

Manual smoke checks should cover landing/legal links, signup/login, protected workspace redirects, API-backed `/Snippet?create=1`, required form validation, duplicate-title prevention, custom language entry and filtering, tag entry with Enter/comma, search/category/language filters, API deletion confirmation, persistence after reload, sign-out, mobile sidebar, and direct deep links.

## Development guides

### Add a route or domain

1. Create `src/Layouts/<name>/pages` and add `components/` or `lib/` only when needed.
2. Put route-level composition in a page and register it in `src/app/App.jsx`.
3. Add `SEO` metadata and preserve URL conventions.
4. Keep state near its owner and pass explicit props/callbacks downward.
5. Add loading, empty, validation, success, and error states for async behavior.
6. Put genuinely cross-domain UI in `src/components/`; shared helpers belong in `src/hooks/`, `src/lib/`, or `src/utils/` as appropriate.
7. Update `frontend.md` route/tree sections.
8. Run lint, build, and manual route checks.

### Add or modify a component

Use a descriptive PascalCase filename, semantic HTML, explicit props, and default export where consistent. Keep reusable client-wide components and utilities under `src/components/`, `src/hooks/`, `src/lib/`, or `src/utils/`; otherwise keep them with their owning domain under `src/Layouts/`:

```jsx
const EmptyPanel = ({ onCreate }) => (
  <section aria-labelledby="empty-title" className="rounded-xl border border-[#232733] bg-[#12151C] p-5">
    <h2 id="empty-title" className="font-semibold text-[#E7E9EE]">Nothing here yet</h2>
    <button type="button" onClick={onCreate} className="mt-4 rounded-lg bg-[#6E6BF4] px-4 py-2 text-sm font-semibold text-white">Create one</button>
  </section>
)

export default EmptyPanel
```

Keep network/storage work out of shared visual components. Avoid abstractions that only wrap one trivial expression.

## Troubleshooting

- **PowerShell blocks npm:** use `npm.cmd`.
- **Deep-link 404:** configure the host to rewrite application paths to `index.html`; see `Client/vercel.json`.
- **API request fails:** verify both Vite variables, `Server/.env`, server status, and that the browser origin is included in `CORS_ORIGINS`.
- **401 response:** sign in again; the API requires a valid Supabase user access token.
- **Snippets disappeared:** confirm the account and Supabase database project are the same and that the snippets migration has been applied.
- **Missing asset:** verify the file is under `Client/public/` and use a root-relative URL.
- **Supabase configuration missing:** copy `.env.example` to `.env.local`, set the project URL and publishable key, and restart Vite.
- **Lint warning:** fix the specific state derivation or time-dependent render logic rather than disabling React rules globally.

## Production

Run `npm run build` and deploy `Client/dist/` to a static host with SPA fallback to `index.html`. Vercel uses the checked-in rewrite. Public assets are copied from `public/`.

For production, set the client API/Supabase variables and the server `CORS_ORIGINS` list to the exact HTTPS frontend origin(s). Configure the Supabase Auth redirect allowlist for the deployed frontend, and apply the database migration. No live production deployment has been tested.

## Limitations and contribution

Implemented: landing page, responsive workspace shell and feature views, client routes, page-level SEO, Supabase password/OAuth sign-in, protected workspace routes, API-backed snippet CRUD and account-scoped persistence, tag and category browsing, local profile settings, account sign-out, and reusable shared controls.

Partial or unimplemented: tag/category editing independent of snippets, appearance settings, client automated tests, type checking, and client-managed token encryption. Supabase handles session storage; the backend provides account-scoped API access.

Before submitting a change, preserve route URLs and existing visual behavior, place code in the owning feature, avoid exposing secrets, retain accessibility and responsive behavior, update this guide for architecture/config changes, run `npm.cmd run lint` and `npm.cmd run build`, and report warnings or unavailable tests honestly.
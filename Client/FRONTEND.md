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

The client is a standalone Vite single-page application. It currently owns browser navigation, presentation, SEO metadata, local React state, and localStorage persistence. It does not currently send API requests to the `Server/` package. Login, signup, social buttons, and password recovery are UI flows only; settings profile data and vault controls are local to the browser.

## Stack

| Concern | Actual implementation |
| --- | --- |
| UI | React and React DOM `^19.2.8` |
| Build | Vite `^8.2.2` with `@vitejs/plugin-react` |
| Routing | React Router DOM `^7.18.3` |
| Styling | Tailwind CSS `^4.3.3` through `@tailwindcss/vite` |
| Icons | `lucide-react` / `lucide` `^1.46.0` |
| Metadata | `react-helmet-async` `^3.0.0` |
| Linting | Oxlint `^1.79.0` with React rules |
| Language | JavaScript and JSX, native ES modules |
| State | React local state and browser localStorage |
| Tests | No client test framework configured |

There is no TypeScript compiler, schema validator, form library, Redux-like store, React Query client, or frontend API client configured.

## Repository boundaries

```text
D:\DevVault
├── Client/       React/Vite browser application
├── Server/       Express bootstrap and unused Supabase helper
├── .env.example  Supabase placeholders
└── README.md     Root README (currently empty)
```

Keep browser code and public assets in `Client/`. The server is a separate package and is not imported by the Vite build. Do not move privileged database operations or credentials into browser code.

## Setup

Use a current Node.js LTS release and npm. From the repository root:

```bash
cd Client
npm install
npm run dev
```

Vite normally serves the app at `http://localhost:5173`. Build and preview a production bundle with:

```bash
cd Client
npm run build
npm run preview
```

On Windows systems where PowerShell blocks `npm.ps1`, use `npm.cmd run dev`, `npm.cmd run build`, or `npm.cmd run lint`.

The client does not require the server, Supabase, a database, or frontend environment variables to start. The server has no declared start script; its current entry point is `Server/server.js`.

## Environment

The root `.env.example` documents values intended for the server integration:

| Variable | Consumer | Client required | Purpose | Safe example |
| --- | --- | --- | --- | --- |
| `SUPABASE_URL` | Intended server | No | Supabase project URL | `https://your-project.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | Intended server | No | Publishable Supabase key | `your-publishable-key` |

No `VITE_*` variable is consumed by the current client. Browser-visible environment values are public; never put service-role keys, database passwords, or private API credentials in them. `Server/src/lib/supabse.js` is unused by `Server/src/app.js`, so Supabase is not an active client integration.

## Structure

```text
Client/
├── public/                         # Logo, favicon, social image, robots, sitemap
├── src/
│   ├── app/App.jsx                 # Route table and app shell
│   ├── features/
│   │   ├── auth/pages/             # Login, signup, forgot password
│   │   ├── landing/{pages,components}/
│   │   ├── dashboard/{pages,components}/
│   │   ├── snippets/{pages,components,lib}/
│   │   ├── categories/{pages,components}/
│   │   ├── settings/{pages,components}/
│   │   ├── tags/{pages,components}/
│   │   └── not-found/
│   ├── shared/
│   │   ├── components/              # Buttons, logo, sidebar, header, SEO
│   │   ├── constants/navItems.jsx   # Workspace navigation
│   │   └── hooks/useScrollToSection.js
│   ├── index.css                    # Tailwind entry and global CSS
│   └── main.jsx                     # React bootstrap
├── index.html
├── package.json / package-lock.json
├── vite.config.js
├── vercel.json
└── .oxlintrc.json
```

The feature structure replaces broad legacy buckets. A feature page composes its screen; feature components implement cohesive UI; feature `lib` modules hold feature logic. `shared` is only for code reused across feature boundaries.

## Bootstrap and architecture

`index.html` provides `#root` and loads `src/main.jsx`. `main.jsx` imports `index.css` and renders:

```text
BrowserRouter
└── StrictMode
    └── HelmetProvider
        └── App
```

`BrowserRouter` enables client-side navigation. `HelmetProvider` enables page-level metadata. `src/app/App.jsx` wraps all routes in the dark background, declares the route table, shows the offline screen from browser connection events, and catches React render errors with an error boundary. `src/shared/components/SEO.jsx` sets title, description, robots, canonical, Open Graph, Twitter, image, and theme metadata.

The normal data flow is:

```text
route → feature page → feature components
                    ↘ shared components
snippet form → snippets page state → localStorage
dashboard    → snippets storage reader
```

Pages own state and callbacks; presentational components receive props. There is no global application store or provider for user/session data.

## Routes

| URL | Component | Purpose | Access |
| --- | --- | --- | --- |
| `/` | `features/landing/pages/LandingPage` | Marketing page | Public |
| `/Signup` | `features/auth/pages/SignUpPage` | Signup form UI | Public; no request |
| `/Login` | `features/auth/pages/LoginPage` | Login form UI | Public; no request |
| `/forgot-password` | `features/auth/pages/ForgotPasswordPage` | Local reset confirmation UI | Public; no email request |
| `/Home` | `features/dashboard/pages/DashboardPage` | Workspace dashboard | No guard |
| `/Snippet` | `features/snippets/pages/SnippetsPage` | Snippet management | No guard |
| `/Snippet/:snippetId` | `features/snippets/pages/SnippetDetailPage` | View or edit a saved snippet; deleted or unknown IDs show an unavailable state | No guard |
| `/Snippet?create=1` | Same snippets page | Opens create form | No guard |
| `/Snippet?search=<term>` | Same snippets page | Shows matching search results; supports category and tag query filters | No guard |
| `/Tags` | `features/tags/pages/TagsPage` | Search tags, view snippet counts, and open snippets for a tag; shows an empty state when no tags exist | No guard |
| `/Categorie` | `features/categories/pages/CategoriesPage` | Browse category cards and snippet counts; open snippets in a category | No guard |
| `/Setting` | `features/settings/pages/SettingsPage` | Edit local profile details and manage browser-stored snippets; appearance settings are not included | No guard |
| `*` | `features/not-found/NotFoundPage` | 404 fallback | Public |

The existing capitalization is intentional and must be preserved. There are no lazy routes, redirects, nested route layouts, or protected-route wrappers. `vercel.json` rewrites unknown paths to `index.html` for BrowserRouter deep links.

## Features

### Landing

`LandingPage` composes navigation, hero, snippet preview, solution/features, how-it-works, open-source, CTA, and footer sections. `LandingNav` uses `useScrollToSection` for section links and `useNavigate` for Login/Signup. External GitHub links use a new tab with `noopener noreferrer`.

### Authentication screens

`LoginPage`, `SignUpPage`, and `ForgotPasswordPage` use semantic forms and router navigation between screens. Login and signup have no submit handlers or API calls. Forgot password changes local `sent` state to show a confirmation panel; it does not send an email or establish a session.

### Dashboard

`DashboardPage` reads saved snippets and the created marker, renders the shared `DashboardHeader` and `Sidebar`, and chooses `HomeEmpty` or `HomeFill`. Filled dashboards delegate statistics, quick actions, recent snippets, and insights to focused components. Deletion updates state and is persisted.

### Snippets

`SnippetsPage` owns URL query state, the snippet array, search query, create/edit/delete callbacks, and persistence. `SnippetForm` collects required title/code plus description, language, category, and tags; in edit mode it is prefilled with the saved snippet. `Snippet` derives category/language filter choices, applies search and URL filters, and displays a helpful no-results state with a clear-filters action. Each `SnippetCard` links to its detail and has an actions menu for editing or deleting. Delete uses an accessible confirmation dialog that can be dismissed with Cancel, Escape, or the backdrop. `SnippetDetailPage` displays a saved snippet and provides an edit action, or shows an unavailable error state for missing/deleted IDs. Empty-state components guide first creation.

### Tags and categories

The tags page derives tags and per-tag snippet counts from saved snippet records, supports searching the tag list, and links each tag to matching snippet results. It shows an empty state when no snippets have tags and a separate no-match state for an empty search. The categories page derives category cards and counts from saved snippets, adapts the grid to the viewport, and links each category to its filtered snippets. Both features use the existing snippet localStorage; they do not maintain separate tag or category stores.

### Settings

The settings page provides Profile and Account tabs; Appearance is intentionally not included. Profile name, email, and an optional PNG/JPG/WebP avatar (up to 1 MB) are saved in browser localStorage under `devvault-profile`. The shared `ProfileAvatar` reads these saved details and refreshes when the profile is saved, including across tabs, so the workspace header uses the saved name initials and uploaded image. Account explains that authentication and password/session management are not connected. Its Clear local vault action removes saved snippets and the dashboard's created marker after an accessible confirmation; it leaves profile data intact. These controls do not create or delete a server account.

## Persistence and data flow

`src/features/snippets/lib/snippetStorage.js` safely wraps browser localStorage. It uses:

```text
devvault-snippets              JSON array of records
devvault-has-created-snippet   "true" marker for dashboard empty-state behavior
```

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

`SnippetsPage` adds `id` and ISO `createdAt`, prepends new records, and writes state through an effect. Editing updates the matching record, preserves its ID and creation date, sets `updatedAt`, and saves the revised array. Search text is represented in the URL; tag/category filters use URL parameters, while language filtering is local to the snippets view. Tags and categories are derived from the same saved records. The dashboard reads the same store on mount. Malformed JSON and storage failures are caught and fall back safely. Clearing browser site data clears the vault. This storage is not encrypted, account-scoped, synchronized, or suitable for secrets.

## Shared UI and styling

Shared components include `SEO`, `Sidebar`, the sticky `DashboardHeader` (shared snippet search and profile navigation), `ProfileAvatar`, `Logo`, `HomeShortcut`, and the four button variants. All workspace pages use the shared header; submitting its search opens matching results in Snippets. `shared/constants/navItems.jsx` defines workspace navigation. `shared/hooks/useScrollToSection.js` is the shared landing scroll behavior. Keep feature-specific cards and forms in their feature; do not put business logic in generic buttons or layout components.

`OfflinePage` is shown while the browser reports no network connection and returns to the app when connectivity is restored. `ErrorPage` is used for missing snippets and unexpected React render errors; its retry action returns to the appropriate route or reloads the app. Both status screens use responsive, viewport-filling layouts.

`src/index.css` imports Inter and Tailwind, defines `--font-ui`, enables smooth scroll, prevents horizontal overflow, and sets the dark global palette. Components use Tailwind utilities and the existing palette (`#0B0D12`, `#12151C`, `#232733`, `#6E6BF4`). Layouts are mobile-first: the workspace sidebar is collapsible/full-width on small screens and fixed at the `md` breakpoint. Preserve semantic headings, labels, `aria-*` attributes, focus styles, and responsive classes.

Static assets live in `public/` and use root-relative URLs such as `/Logo.svg`, `/Favicon.png`, and `/og-image.png`.

## API, auth, and security

The frontend currently has no `fetch`, axios, API service, auth context, session listener, protected route, or authorization check. Forms and social buttons are visual only. The Express server registers no application routes. Consequently, frontend route visibility is not authorization and localStorage is not secure storage.

When an API is introduced, keep requests in feature services, centralize base URL handling, model loading/error states, preserve response contracts, and enforce authorization on the backend/database. Never expose server credentials in the client. Workspace/auth SEO uses `noindex` where configured, but that only controls indexing.

## Scripts and verification

Run from `Client/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Build optimized assets into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

No client unit/integration/e2e test, type-check, or formatter script is configured. The server's `npm test` is a placeholder that exits with code 1.

Verified checks for the current architecture are `npm.cmd run build` (successful) and `npm.cmd run lint` (successful with three React-quality warnings: state update in `ProfileAvatar` effect and render-time `Date.now()` in `SnippetCard`).

Manual smoke checks should cover landing anchors, auth navigation, `/Snippet?create=1`, required form validation, tag entry with Enter/comma, search/category/language filters, deletion confirmation, dashboard refresh, mobile sidebar, and direct deep links.

## Development guides

### Add a feature

1. Create `src/features/<name>/pages` and add `components/` or `lib/` only when needed.
2. Put route-level composition in a page and register it in `src/app/App.jsx`.
3. Add `SEO` metadata and preserve URL conventions.
4. Keep state near its owner and pass explicit props/callbacks downward.
5. Add loading, empty, validation, success, and error states for async behavior.
6. Reuse `shared` only when code is feature-independent and used more than once.
7. Update this guide's route/tree sections.
8. Run lint, build, and manual route checks.

### Add or modify a component

Use a descriptive PascalCase filename, semantic HTML, explicit props, and default export where consistent:

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
- **Snippets disappeared:** they are per-origin localStorage data; check browser privacy/site-data settings.
- **Missing asset:** verify the file is under `Client/public/` and use a root-relative URL.
- **API/Supabase failure:** the current client makes no such request; verify a backend route and feature service exist before debugging network traffic.
- **Lint warning:** fix the specific state derivation or time-dependent render logic rather than disabling React rules globally.

## Production

Run `npm run build` and deploy `Client/dist/` to a static host with SPA fallback to `index.html`. Vercel uses the checked-in rewrite. Public assets are copied from `public/`.

There is no verified production auth, API endpoint, server deployment, database migration, or Supabase workflow. Do not claim those integrations are live until they are implemented and tested end to end.

## Limitations and contribution

Implemented: landing page, responsive workspace shell and feature views, client routes, page-level SEO, local snippet create/edit/search/filter/display/delete flows, tag and category browsing, local profile settings and vault controls, reusable shared controls, and local persistence.

Partial or unimplemented: authentication, social providers, password reset delivery, password/session management, server account deletion, tag/category editing independent of snippets, appearance settings, backend API routes, Supabase persistence, automated tests, type checking, encryption, account scoping, and cross-device synchronization.

Before submitting a change, preserve route URLs and existing visual behavior, place code in the owning feature, avoid exposing secrets, retain accessibility and responsive behavior, update this guide for architecture/config changes, run `npm.cmd run lint` and `npm.cmd run build`, and report warnings or unavailable tests honestly.
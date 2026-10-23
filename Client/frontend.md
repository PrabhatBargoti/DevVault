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

The client is a standalone Vite single-page application. It owns browser navigation, presentation, SEO metadata, Supabase Auth flows, local React state, and localStorage persistence. It does not currently send snippet requests to the `Server/` package; settings profile data and the snippet vault remain local to the browser.

## Stack

| Concern | Actual implementation |
| --- | --- |
| UI | React and React DOM `^19.2.8` |
| Build | Vite `^8.2.2` with `@vitejs/plugin-react` |
| Routing | React Router DOM `^7.18.3` |
| Styling | Tailwind CSS `^4.3.3` through `@tailwindcss/vite` |
| Icons | `lucide-react` / `lucide` `^1.46.0` |
| Metadata | `react-helmet-async` `^3.0.0` |
| Authentication | `@supabase/supabase-js` `2.117.1` |
| Linting | Oxlint `^1.79.0` with React rules |
| Language | JavaScript and JSX, native ES modules |
| State | React local state and browser localStorage |
| Tests | No client test framework configured |

There is no TypeScript compiler, schema validator, form library, Redux-like store, React Query client, or frontend API client configured.

## Repository boundaries

```text
D:\DevVault
├── Client/       React/Vite browser application
├── Server/       Express API and Supabase integration
├── .env.example  Server configuration template
└── README.md     Repository overview
```

Keep browser code and public assets in `Client/`. The server is a separate package and is not imported by the Vite build. Do not move privileged database operations or credentials into browser code.

## Setup

Use a current Node.js LTS release and npm. From the repository root:

```bash
cd Client
npm install
Copy-Item .env.example .env
npm run dev
```

Vite normally serves the app at `http://localhost:5173`. Build and preview a production bundle with:

```bash
cd Client
npm run build
npm run preview
```

On Windows systems where PowerShell blocks `npm.ps1`, use `npm.cmd run dev`, `npm.cmd run build`, or `npm.cmd run lint`.

The client can run without Supabase configuration, but account creation, login, OAuth, and password recovery require the client environment values and a configured Supabase project. The server is a separate package with a `start` script and `Server/server.js` entry point.

## Environment

`Client/.env.example` documents the public client values used by Supabase Auth:

| Variable | Consumer | Client required | Purpose | Safe example |
| --- | --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Client | Required for auth | Supabase project URL | `https://your-project.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Client | Required for auth | Public/publishable Supabase key | `sb_publishable_...` |

These values are public and are bundled into the browser. Never use a Supabase secret/service-role key, database password, or other private credential in a `VITE_*` variable. The separate server uses `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and a server-only secret key from `Server/.env`.

For real email and OAuth flows, configure Email auth plus Google and GitHub providers in the Supabase dashboard. Add local and deployed app URLs to the Auth URL Configuration allowlist, including the `/Login`, `/Home`, and `/change-password` redirect destinations. Configure each provider's OAuth credentials and Supabase callback URL as described in the Supabase provider setup guides. Restart Vite after changing `.env`.

## Structure

```text
Client/
├── public/                         # Logo, favicon, social image, robots, sitemap
├── .env.example                    # Public Supabase Auth client settings
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
        └── App
```

`BrowserRouter` enables client-side navigation. `HelmetProvider` enables page-level metadata. `src/app/App.jsx` lazy-loads route pages and wraps them in a shared Suspense boundary; `RouteLoadingSkeleton` renders a responsive page-shaped fallback while a route chunk is loading. `index.html` also includes a small critical-CSS placeholder so the initial document is not blank while the JavaScript bundle downloads. The app shows the offline screen from browser connection events and catches React render errors with an error boundary. `src/components/SEO.jsx` sets title, description, robots, canonical, Open Graph, Twitter, image, and theme metadata.

The normal data flow is:

```text
route → layout page → domain components
                    ↘ reusable components
snippet form → snippets page state → localStorage
dashboard    → snippets storage reader
```

Pages own state and callbacks; presentational components receive props. There is no global application store or provider for user/session data.

## Routes

| URL | Component | Purpose | Access |
| --- | --- | --- | --- |
| `/` | `Layouts/landing/pages/LandingPage` | Marketing page | Public |
| `/Signup` | `Layouts/auth/SignUpPage` | Email/password signup; requires acceptance of terms and privacy policy | Public |
| `/Login` | `Layouts/auth/LoginPage` | Email/password and OAuth sign-in | Public |
| `/forgot-password` | `Layouts/auth/ForgotPasswordPage` | Sends a Supabase password recovery email | Public |
| `/change-password` | `Layouts/auth/ChangePasswordPage` | Validates the recovery session and updates the password | Recovery link/session required |
| `/privacy-policy` | `Layouts/legal/PrivacyPolicyPage` | Privacy notice linked from the landing footer | Public |
| `/terms` | `Layouts/legal/TermsPage` | Terms and Conditions linked from signup and the landing footer | Public |
| `/Home` | `Layouts/dashboard/pages/DashboardPage` | Workspace dashboard | No guard |
| `/Snippet` | `Layouts/snippets/pages/SnippetsPage` | Snippet management | No guard |
| `/Snippet/:snippetId` | `Layouts/snippets/pages/SnippetDetailPage` | View or edit a saved snippet; deleted or unknown IDs show an unavailable state | No guard |
| `/Snippet?create=1` | Same snippets page | Opens create form | No guard |
| `/Snippet?search=<term>` | Same snippets page | Shows matching search results; supports category and tag query filters | No guard |
| `/Tags` | `Layouts/tags/pages/TagsPage` | Search tags, view snippet counts, and open snippets for a tag; shows an empty state when no tags exist | No guard |
| `/Categorie` | `Layouts/categories/pages/CategoriesPage` | Browse category cards and snippet counts; open snippets in a category | No guard |
| `/Setting` | `Layouts/settings/pages/SettingsPage` | Edit local profile details and manage browser-stored snippets; appearance settings are not included | No guard |
| `*` | `Layouts/not-found/NotFoundPage` | 404 fallback | Public |

The existing capitalization is intentional and must be preserved. Routes use lazy page imports with a shared loading fallback; there are no redirects, nested route layouts, or protected-route wrappers. `vercel.json` rewrites unknown paths to `index.html` for BrowserRouter deep links.

## Features

### Landing

`LandingPage` composes navigation, hero, snippet preview, solution/features, how-it-works, open-source, CTA, and footer sections. `LandingNav` uses `useScrollToSection` for section links and `useNavigate` for Login/Signup. External GitHub links use a new tab with `noopener noreferrer`.

### Authentication

`LoginPage` and `SignUpPage` use Supabase Auth for email/password and Google/GitHub OAuth. Signup requires the user to check the Terms and Conditions consent box before email registration or either OAuth redirect can start; the social buttons on Login also require consent because Supabase OAuth can create a new account. Email signups record the accepted terms version and timestamp in user metadata. `ForgotPasswordPage` requests a Supabase recovery email whose redirect destination is `/change-password`; that page requires a valid Supabase session before it offers the password update form. Auth errors are shown in the page rather than being hidden.

OAuth credentials, email delivery, confirmation behavior, site URL, and allowed redirect URLs must be configured in the Supabase dashboard. The legal pages contain initial product wording and should receive legal review before production use. Consent is gated in the client; this prototype does not maintain an immutable legal-consent audit record.

### Dashboard

`DashboardPage` reads saved snippets and the created marker, renders the shared `DashboardHeader` and `Sidebar`, and chooses `HomeEmpty` or `HomeFill`. Filled dashboards delegate statistics, quick actions, recent snippets, and insights to focused components. Deletion updates state and is persisted.

### Snippets

`SnippetsPage` owns URL query state, the snippet array, search query, create/edit/delete callbacks, and persistence. `SnippetForm` collects a required, unique title and code plus description, language, category, and tags; title comparisons ignore leading/trailing whitespace and letter case. In edit mode it is prefilled with the saved snippet and excludes that record from duplicate-title checks. The language selector includes common languages, languages already used in the vault, and an option to enter a custom language; custom values are saved as normal language labels and are available in filters. `Snippet` derives category/language filter choices, applies search and URL filters, and displays a helpful no-results state with a clear-filters action. Each `SnippetCard` links to its detail and has an actions menu for editing or deleting. Delete uses an accessible confirmation dialog that can be dismissed with Cancel, Escape, or the backdrop. `SnippetDetailPage` displays a saved snippet and provides an edit action, or shows an unavailable error state for missing/deleted IDs. Empty-state components guide first creation.

### Tags and categories

The tags page derives tags and per-tag snippet counts from saved snippet records, supports searching the tag list, and links each tag to matching snippet results. It shows an empty state when no snippets have tags and a separate no-match state for an empty search. The categories page derives category cards and counts from saved snippets, adapts the grid to the viewport, and links each category to its filtered snippets. Both features use the existing snippet localStorage; they do not maintain separate tag or category stores.

### Settings

The settings page provides Profile and Account tabs; Appearance is intentionally not included. Profile name, email, and an optional PNG/JPG/WebP avatar (up to 1 MB) are saved in browser localStorage under `devvault-profile`. The shared `ProfileAvatar` reads these saved details and refreshes when the profile is saved, including across tabs, so the workspace header uses the saved name initials and uploaded image. Account management remains limited: password recovery is available through the auth flow, but server account deletion is not implemented. Its Clear local vault action removes saved snippets and the dashboard's created marker after an accessible confirmation; it leaves profile data intact. These controls do not create or delete a server account.

## Persistence and data flow

`src/Layouts/snippets/lib/snippetStorage.js` safely wraps browser localStorage. It uses:

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

Reusable components include `SEO`, `Sidebar`, the sticky `DashboardHeader` (shared snippet search and profile navigation), `ProfileAvatar`, `Logo`, `HomeShortcut`, and the four button variants; they live in `src/components/`. All workspace pages use the shared header; submitting its search opens matching results in Snippets. `src/utils/navItems.jsx` defines workspace navigation. `src/hooks/useScrollToSection.js` provides landing-page scroll behavior. `src/lib/profileStorage.js` owns profile localStorage keys, read/write helpers, and the in-tab profile update event. Keep domain-specific cards and forms under their owning `src/Layouts/<domain>/` directory; do not put business logic in generic buttons or layout components.

`OfflinePage` is shown while the browser reports no network connection and returns to the app when connectivity is restored. `ErrorPage` is used for missing snippets and unexpected React render errors; its retry action returns to the appropriate route or reloads the app. Both status screens use responsive, viewport-filling layouts.

`src/index.css` imports Inter and Tailwind, defines `--font-ui`, enables smooth scroll, prevents horizontal overflow, and sets the dark global palette. Components use Tailwind utilities and the existing palette (`#0B0D12`, `#12151C`, `#232733`, `#6E6BF4`). Layouts are mobile-first: the workspace sidebar is collapsible/full-width on small screens and fixed at the `md` breakpoint. Preserve semantic headings, labels, `aria-*` attributes, focus styles, and responsive classes.

Static assets live in `public/` and use root-relative URLs such as `/Logo.svg`, `/Favicon.png`, and `/og-image.png`.

## API, auth, and security

The frontend uses `@supabase/supabase-js` for authentication but has no protected routes or authorization checks. The separate Express server implements snippet API routes, but the frontend does not call them. Consequently, frontend route visibility is not authorization and localStorage is not secure storage.

When integrating the existing API, keep requests in domain services, centralize base URL handling, model loading/error states, preserve response contracts, and enforce authorization on the backend/database. Never expose server credentials in the client. Workspace/auth SEO uses `noindex` where configured, but that only controls indexing.

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

Manual smoke checks should cover landing/legal links, signup consent gating for email and OAuth, login, password reset email and recovery callback, `/Snippet?create=1`, required form validation, duplicate-title prevention (including case/whitespace variants and editing an existing title), custom language entry and filtering, tag entry with Enter/comma, search/category/language filters, deletion confirmation, dashboard refresh, mobile sidebar, and direct deep links.

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
- **Snippets disappeared:** they are per-origin localStorage data; check browser privacy/site-data settings.
- **Missing asset:** verify the file is under `Client/public/` and use a root-relative URL.
- **API/Supabase failure:** the client is not currently integrated with the API; verify the integration is implemented before debugging frontend network traffic.
- **Lint warning:** fix the specific state derivation or time-dependent render logic rather than disabling React rules globally.

## Production

Run `npm run build` and deploy `Client/dist/` to a static host with SPA fallback to `index.html`. Vercel uses the checked-in rewrite. Public assets are copied from `public/`.

The client auth implementation requires Supabase project configuration and provider credentials, and there is no verified production deployment. The snippet client is not integrated with the API or Supabase data storage. Do not claim server-backed snippet persistence until implemented and tested end to end.

## Limitations and contribution

Implemented: landing page, responsive workspace shell and feature views, client routes, page-level SEO, local snippet create/edit/search/filter/display/delete flows, tag and category browsing, local profile settings and vault controls, reusable shared controls, and local persistence.

Partial or unimplemented: protected client routes, server account deletion, tag/category editing independent of snippets, appearance settings, client API integration and Supabase snippet persistence, client automated tests, type checking, encryption, account scoping, and cross-device synchronization. Email/password and Google/GitHub auth flows are implemented through Supabase, but require dashboard configuration and have no immutable consent audit trail. The separate server package implements snippet API routes and Supabase persistence.

Before submitting a change, preserve route URLs and existing visual behavior, place code in the owning feature, avoid exposing secrets, retain accessibility and responsive behavior, update this guide for architecture/config changes, run `npm.cmd run lint` and `npm.cmd run build`, and report warnings or unavailable tests honestly.
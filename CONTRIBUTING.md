# Contributing to DevVault

Thank you for your interest in contributing to DevVault. This repository contains a frontend prototype for a developer knowledge vault and a separately implemented Express API backed by Supabase.

This guide explains the expected contribution flow, project structure, and practical standards for making safe, reviewable changes.

## Project overview

DevVault is organized into two main areas:

- `Client/` — the React + Vite frontend application
- `Server/` — the Express API, Supabase integration, and database migrations

The current frontend is the primary product surface. Most user-facing work should happen in the client app unless a change is clearly required for backend or infrastructure development.

## Repository structure

```text
D:\DevVault
├── Client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   ├── frontend.md
│   └── ...
├── Server/
│   ├── src/
│   ├── package.json
│   └── server.js
├── .env.example
├── README.md
├── CONTRIBUTING.md
└── .gitignore
```

## Contribution workflow

1. Fork or clone the repository.
2. Create a feature branch for your work.
3. Keep changes focused and scoped to a single concern.
4. Run the relevant validation commands before submitting.
5. Open a clear pull request with concise context and testing notes.

## Local setup

### Frontend

```bash
cd Client
npm install
npm run dev
```

### Production build check

```bash
cd Client
npm run build
```

### Linting

```bash
cd Client
npm run lint
```

## Frontend contribution guidelines

### Keep domain code in the right place

Follow the current structure under `Client/src/Layouts/` and keep domain-specific work near the owning layout.

Examples:

- auth screens belong in `src/Layouts/auth/`
- dashboard work belongs in `src/Layouts/dashboard/`
- snippet logic belongs in `src/Layouts/snippets/`

Reusable client-wide UI belongs in `Client/src/components/`. Reusable hooks, storage helpers, and utilities belong in `Client/src/hooks/`, `Client/src/lib/`, and `Client/src/utils/` respectively. Keep one-domain components inside that domain's `Layouts/` folder.

### Preserve the current route behavior

The project already has a route structure and URL conventions. Avoid introducing breaking route changes or renaming existing routes unless the change is intentional and documented.

### Respect existing app patterns

- Use React component composition patterns already present in the project
- Prefer local state near the feature that owns it
- Keep UI logic readable and accessible
- Preserve dark theme styling and responsive behavior
- Reuse existing shared components when appropriate

### Avoid insecure patterns

The frontend currently stores snippet data in browser `localStorage` for demo purposes only. Do not assume this is production-safe storage.

When implementing features that involve real user data, authentication, or secrets:

- keep sensitive logic on the backend
- avoid exposing credentials in client code
- do not add production secrets to frontend environment files
- keep authorization checks server-side

## Backend contribution guidelines

The `Server/` package implements authenticated snippet CRUD endpoints, validation, pagination, rate limiting, and Supabase data access. It is not yet deployed as a production service and is not integrated with the client. When working on server code:

- keep the app structure clean and modular
- use environment variables for configuration
- document assumptions clearly
- keep database access scoped to the authenticated user
- do not expose server-only Supabase secrets
- update `Server/Backend.md` when API behavior or configuration changes

## Documentation expectations

If you change architecture, route layout, setup steps, or feature behavior, update the related docs in:

- [README.md](README.md)
- [Client/frontend.md](Client/frontend.md)
- [Server/Backend.md](Server/Backend.md)

This helps keep the repository understandable for future contributors and reviewers.

## Pull request expectations

A good pull request should include:

- a brief summary of the change
- the reason for the change
- any affected routes or features
- validation steps taken
- notes about follow-up work or limitations

## Quality checks

Before opening a PR, make sure the relevant checks pass:

```bash
cd Client
npm run lint
npm run build
```

If your change affects behavior beyond lint/build, include manual validation notes in the PR description.

## Contribution boundaries

This project is still in an early product/prototype phase. Contributions should be thoughtful, well-scoped, and honest about what is implemented versus what is still a placeholder.

If your change introduces client/API integration, auth behavior, database changes, or a deployment workflow, document that clearly and avoid claiming it is production-ready without evidence.

## Questions and feedback

If you are unsure where a change belongs or how to proceed, open an issue or start a discussion before making a large change. Clear communication makes review easier and prevents unnecessary churn.

Thank you for helping improve DevVault.

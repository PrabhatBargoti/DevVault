# DevVault Backend Guide

This guide describes the backend as implemented today. The API serves the React client using authenticated Supabase access tokens and a configurable CORS allowlist.

## Contents

1. [Backend overview](#1-backend-overview)
2. [Technology stack](#2-technology-stack)
3. [Repository boundaries](#3-repository-boundaries)
4. [Directory structure](#4-directory-structure)
5. [Configuration and environment](#5-configuration-and-environment)
6. [Architecture and request lifecycle](#6-architecture-and-request-lifecycle)
7. [API routes and endpoints](#7-api-routes-and-endpoints)
8. [Controllers and request handlers](#8-controllers-and-request-handlers)
9. [Services and business logic](#9-services-and-business-logic)
10. [Database architecture](#10-database-architecture)
11. [Authentication and authorization](#11-authentication-and-authorization)
12. [Middleware and request processing](#12-middleware-and-request-processing)
13. [Validation and error handling](#13-validation-and-error-handling)
14. [External services and integrations](#14-external-services-and-integrations)
15. [Available scripts](#15-available-scripts)
16. [Testing and quality assurance](#16-testing-and-quality-assurance)
17. [Adding an API endpoint](#17-adding-an-api-endpoint)
18. [Adding a service or integration](#18-adding-a-service-or-integration)
19. [Security considerations](#19-security-considerations)
20. [Logging and observability](#20-logging-and-observability)
21. [Deployment and production configuration](#21-deployment-and-production-configuration)
22. [Troubleshooting](#22-troubleshooting)
23. [Contribution guidelines](#23-contribution-guidelines)
24. [Current limitations and future improvements](#24-current-limitations-and-future-improvements)

## 1. Backend overview

`Server/` contains an Express 5 API for authenticated snippet CRUD. It validates requests, applies rate limits, verifies Supabase access tokens, and stores snippets in the Supabase Postgres `public.snippets` table.

The backend is a separate package from `Client/`. The client authenticates through Supabase Auth, sends user access tokens to this API, and stores snippet data in Supabase through the API. The server does not implement registration or login endpoints; browser authentication is provided by the Supabase client SDK.

The main boundaries are:

- Express startup and application composition (`server.js`, `src/app.js`).
- HTTP routing and request adaptation (`src/routes/`, `src/controllers/`).
- Input and pagination validation (`src/validators/`).
- Snippet operations (`src/services/`).
- Authentication, Supabase clients, configuration, and common error handling (`src/middleware/`, `src/lib/`, `src/config/`, `src/utils/`).
- Database schema and local Supabase settings (`supabase/`).

## 2. Technology stack

| Concern | Implementation |
| --- | --- |
| Runtime | Node.js; the existing setup guide specifies Node.js 18 or later |
| Language | JavaScript |
| Module system | CommonJS (`require` / `module.exports`) |
| HTTP framework | Express 5 |
| CORS | `cors`, with an explicit environment-configured origin allowlist |
| Rate limiting | `express-rate-limit`, using its default in-memory store |
| Environment loading | `dotenv` |
| Authentication and database | `@supabase/supabase-js` |
| Database | Supabase Postgres; schema managed with Supabase SQL migrations |
| Validation | Project-local JavaScript functions; no validation package |
| Logging | `console.log` and `console.error` |
| Tests | Node.js built-in `node:test` and `node:assert/strict` |
| Type checking / linting | No backend type-checker or lint script is configured |

The server package declares no build step. Its `package.json` is the source of truth for dependencies and commands.

## 3. Repository boundaries

`Client/` is a React/Vite application; `Server/` is the API and Supabase project. The browser uses the Supabase publishable key and the server API URL. Never put the server's secret/service-role key in client code or browser-accessible environment variables.

Backend changes should normally stay within `Server/`. The root `.gitignore` covers `.env`, `.temp/`, `.branches/`, and `Server/node_modules/`. `Server/supabase/.gitignore` also ignores the Supabase CLI's local `.temp` and `.branches` directories.

## 4. Directory structure

The following tree lists project files, not installed dependencies or generated Supabase state:

```text
Server/
├── .env.example
├── BACKEND.md
├── package.json
├── package-lock.json
├── server.js                  # Loads dotenv, validates configuration, starts HTTP server
├── src/
│   ├── app.js                 # Express middleware, routes, not-found and error handlers
│   ├── config/
│   │   └── env.js             # Required-variable, URL and port validation
│   ├── controllers/
│   │   └── snippets.js        # HTTP request/response handling for snippet endpoints
│   ├── lib/
│   │   └── supabaseClient.js  # Auth and privileged database client factories
│   ├── middleware/
│   │   ├── authenticate.js   # Bearer-token verification and request identity
│   │   └── errorHandler.js   # Consistent JSON error responses
│   ├── routes/
│   │   └── snippets.js        # Snippet routes and write-rate-limit placement
│   ├── services/
│   │   └── snippets.js        # Supabase snippet queries and ownership filters
│   ├── utils/
│   │   └── httpError.js       # Error type carrying HTTP status and code
│   └── validators/
│       └── snippets.js        # Snippet payload, ID and pagination validation
├── supabase/
│   ├── config.toml            # Local Supabase CLI configuration
│   ├── .gitignore
│   └── migrations/
│       └── 20261023014024_create_snippets_table.sql
└── test/
    └── snippetValidation.test.js # Unit tests for snippet validators
```

There is no repository layer because the current service is the single cohesive boundary for five related database operations. There are no models, seed files, background jobs, upload handlers, or separate authentication endpoints.

## 5. Configuration and environment

`server.js` calls `dotenv.config()` before loading the Express application, then calls `getConfig()` before listening. Configuration is validated at startup; there are no built-in defaults for Supabase credentials.

Create `Server/.env` from the safe template:

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
CORS_ORIGINS=http://localhost:5173
PORT=3000
```

| Variable | Required | Purpose and validation |
| --- | --- | --- |
| `SUPABASE_URL` | Yes | Supabase project URL. HTTPS is required except for `localhost` and `127.0.0.1`. |
| `SUPABASE_PUBLISHABLE_KEY` | Yes, or legacy alias | Key used by Supabase Auth to verify a user's access token. `SUPABASE_ANON_KEY` is accepted as a fallback. |
| `SUPABASE_SECRET_KEY` | Yes, or legacy alias | Server-only key used by the database client. `SUPABASE_SERVICE_ROLE_KEY` is accepted as a fallback. Treat either as a privileged secret. |
| `CORS_ORIGINS` | No | Comma-separated exact HTTP(S) origins; defaults to `http://localhost:5173`. Do not include URL paths or trailing slashes. |
| `PORT` | No | Integer TCP port from 1 through 65535; defaults to `3000`. |

The aliases are used only when their corresponding preferred variable is unset or empty. The application reports a configuration error and does not start if the URL, either key, port, or CORS origin is invalid. `.env.example` contains placeholders only. Never copy real credentials into documentation or source control.

`Server/supabase/config.toml` enables migrations and has no seed SQL paths configured. No seed script exists in this repository. Applying migrations is an explicit Supabase CLI operation; the Express process does not migrate the database automatically.

## 6. Architecture and request lifecycle

```text
HTTP request
  ↓
server.js loads dotenv, validates config, and starts src/app.js
  ↓
Express app: CORS allowlist and API-wide rate limit on /api
  ↓
JSON body parser (128 KB maximum, strict JSON)
  ↓
/api/snippets router
  ↓
Authentication middleware verifies the bearer token with Supabase Auth
  ↓
Route-specific write limits (writes only), then controller validation
  ↓
Snippet service scopes the Supabase query to the authenticated user ID
  ↓
Supabase Postgres
  ↓
Controller serializes the established JSON response
```

Unknown paths are converted to a `404` `HttpError`; the final error middleware handles route and parsing errors. Express 5 forwards rejected promises from async handlers to this handler.

The router authenticates all five routes before route-specific processing. Write rate limits run before controller validation. The service receives the database client and user ID from the authenticated request; it adds a `user_id` filter to reads, updates, and deletes and sets `user_id` during insertion.

## 7. API routes and endpoints

Base URL for local development: `http://localhost:3000`. All routes below require an `Authorization: Bearer <user-access-token>` header. JSON requests should send `Content-Type: application/json`.

| Method | Endpoint | Handler | Purpose | Success |
| --- | --- | --- | --- | --- |
| `GET` | `/api/snippets` | `listSnippets` | List the authenticated user's snippets. Accepts `limit` (default 50, 1–100) and `offset` (default 0, 0–100000); sorted by `updated_at` descending. Returns `{ "data": [...], "pagination": { "limit": number, "offset": number } }`. | `200` |
| `POST` | `/api/snippets` | `createSnippet` | Create a snippet. Requires `title` and `language`; other editable fields are optional. Returns `{ "data": snippet }`. | `201` |
| `GET` | `/api/snippets/:id` | `getSnippet` | Read one owned snippet by UUID. Returns `{ "data": snippet }`. | `200` |
| `PATCH` | `/api/snippets/:id` | `updateSnippet` | Update a non-empty subset of editable fields. Returns `{ "data": snippet }`. | `200` |
| `DELETE` | `/api/snippets/:id` | `deleteSnippet` | Delete one owned snippet; response body is empty. | `204` |

Snippet responses contain `id`, `title`, `description`, `code`, `language`, `category`, `tags`, `created_at`, and `updated_at`. `user_id` is not included in the selected response fields. IDs and timestamps are managed by the database.

Editable fields and limits:

| Field | Type | Required on create | Limit / behavior |
| --- | --- | --- | --- |
| `title` | string | Yes | Up to 150 characters; trimmed and non-blank |
| `description` | string | No | Up to 1,000 characters; trimmed; defaults to `""` |
| `code` | string | No | Up to 100,000 characters; whitespace preserved; defaults to `""` |
| `language` | string | Yes | Up to 50 characters; trimmed and non-blank |
| `category` | string | No | Up to 50 characters; trimmed; defaults to `""` |
| `tags` | string array | No | At most 20 tags; each trimmed and 1–40 characters; defaults to `[]` |

Unknown fields are rejected. The request JSON body limit is 128 KiB. A malformed JSON body returns `400`; an oversized body returns `413`.

## 8. Controllers and request handlers

`src/controllers/snippets.js` contains the HTTP-facing functions called by `src/routes/snippets.js`. Controllers read authenticated context (`req.user`, `req.supabase`), invoke the relevant validator and service operation, and write the status and response body. They do not initialize database clients or duplicate SQL/PostgREST operations.

Validation occurs in controllers after route authentication. The create, update, get, list, and delete response shapes and status codes remain unchanged by the controller extraction. Async service or validation errors are allowed to propagate to Express 5's error middleware.

## 9. Services and business logic

`src/services/snippets.js` is the snippet data-access and operation layer. It exports `list`, `create`, `get`, `update`, and `remove`. It builds Supabase queries against `snippets`, selects a fixed set of response fields, and filters operations by both snippet ID and authenticated user ID where applicable.

The service translates missing rows for get/update/delete to a `404 SNIPPET_NOT_FOUND` error. Supabase query errors become a generic `DATABASE_ERROR` server error whose underlying cause is available to server-side logging. There are no multi-query transactions or separate service integrations in the current implementation.

## 10. Database architecture

The persistence system is Supabase Postgres, accessed through `@supabase/supabase-js`. The migration `supabase/migrations/20261023014024_create_snippets_table.sql` creates `public.snippets` with:

- A generated UUID primary key and a `user_id` foreign key to `auth.users` with cascade delete.
- Required title and language values, optional text values with defaults, a text-array `tags` column, and creation/update timestamps.
- Check constraints for title, description, code, language, category, and maximum tag count.
- An index on `(user_id, updated_at desc)` for the user's recent-snippet listing.
- Row-level security enabled, with per-user policies for select, insert, update, and delete.
- Data API grants revoked from `anon`, `authenticated`, and `public`; CRUD grants are given to `service_role`.

The API first verifies the user token with a publishable/legacy anon key, then uses the secret/service-role key for database operations. The privileged client bypasses RLS, so service-level ownership filters are a critical application authorization boundary. The migration's RLS policies are present in the schema but do not make these service-role requests user-scoped by themselves.

Queries and mutations live in `src/services/snippets.js`; there is no ORM, model layer, direct SQL in application code, seed data, or transaction abstraction. Supabase's query builder is used; no raw SQL is assembled from request input. This task did not connect to or modify a remote database, and migrations have not been applied or verified against a project.

## 11. Authentication and authorization

The only implemented authentication flow is verification of an already-issued Supabase user access token:

1. The client sends `Authorization: Bearer <access-token>`.
2. `src/middleware/authenticate.js` rejects missing or malformed bearer headers with `401`.
3. It calls Supabase Auth `getUser(token)` using a client initialized with the publishable key (or legacy anon key).
4. Invalid, expired, or absent user results produce `401`. Other Supabase errors continue to the shared error handler.
5. On success, the middleware attaches `req.user` and a privileged database client as `req.supabase`.

The API does not implement registration, password login, logout, refresh-token/session handling, cookies, OAuth, or password recovery. These flows are not wired in the frontend either.

Authentication establishes the identity; authorization limits snippet operations to that identity. The service explicitly filters by `req.user.id`, sets that ID on creates, and returns the same not-found response for a missing snippet and a snippet owned by another user. Do not remove these filters or treat client-supplied user IDs as authority.

## 12. Middleware and request processing

The middleware order in `src/app.js` is:

1. Disable Express's `X-Powered-By` header.
2. Apply the configured CORS allowlist to `/api` and answer allowed preflight requests.
3. Apply a 100-request-per-15-minute limiter to `/api`.
4. Parse strict JSON bodies up to 128 KiB.
5. Mount `/api/snippets`.
6. Convert unmatched requests to a structured `404`.
7. Handle errors in `src/middleware/errorHandler.js`.

The snippets router applies `authenticate` to all its endpoints. `POST`, `PATCH`, and `DELETE` additionally use an IP-based write limiter (30 per 15 minutes) and an authenticated-account limiter (20 per 15 minutes). Each limiter uses the default in-memory store. No request logging, compression, security-header package, file-upload, or proxy-trust middleware is configured. Express does not trust proxy headers by default.

## 13. Validation and error handling

`src/validators/snippets.js` validates that bodies are objects, rejects unknown fields and incorrect types, trims ordinary text fields and tags, preserves code whitespace, and enforces field and pagination limits. IDs are checked against a UUID-shaped pattern. This is project-local validation; no schema-validation dependency is installed.

Errors use `{ "error": { "code": "...", "message": "..." } }`. Implemented status behavior:

| Status | Examples |
| ---: | --- |
| `400` | Invalid input, pagination, ID, or malformed JSON (`INVALID_REQUEST` or `INVALID_JSON`) |
| `401` | Missing, malformed, invalid, or expired bearer token (`UNAUTHORIZED`) |
| `404` | Unknown route (`NOT_FOUND`) or snippet not found for this user (`SNIPPET_NOT_FOUND`) |
| `413` | JSON body exceeds the configured parser limit (`PAYLOAD_TOO_LARGE`) |
| `429` | API, IP write, or account write limit (`RATE_LIMITED`, `WRITE_RATE_LIMITED`, or `USER_WRITE_RATE_LIMITED`) |
| `500` | Unexpected or database failure; client message is generic |

The error middleware logs server errors with `console.error`, including the error code/message and a limited cause summary when present; it does not return stack traces or cause details to the client. If response headers have already been sent, it does not attempt to send a second response. There is no custom error taxonomy beyond `HttpError` and fields attached to service errors.

## 14. External services and integrations

Supabase is the only backend integration:

- Supabase Auth verifies each request's user access token through the Auth API.
- Supabase Postgres stores the snippets table and is queried through PostgREST via the JavaScript client.
- Supabase CLI configuration and migrations live under `supabase/`.

`src/lib/supabaseClient.js` has separate factories for the auth and database clients. Both disable automatic token refresh, URL session detection, and session persistence. The auth client uses the publishable key; the database client uses the server-only secret key. Supabase errors are mapped or forwarded as described in the service and error-handling sections.

No external email, payment, file-storage, notification, job-queue, or third-party API integration is implemented by the Express application.

## 15. Available scripts

Scripts from `package.json`:

| Command | Purpose |
| --- | --- |
| `npm start` | Starts the API using `node server.js`. |
| `npm test` | Runs Node's built-in test runner with `node --test`. |

There are no configured development-watch, build, lint, type-check, migration, or seed npm scripts. Supabase CLI commands are run through `npx supabase` as needed.

## 16. Testing and quality assurance

Tests use Node's built-in test runner. `test/snippetValidation.test.js` exercises snippet creation/update validation, required fields, rejected fields/tags, UUID checking, and pagination defaults/bounds. Run the tests from `Server/`:

```powershell
npm test
```

There is no configured lint or type-check command. Tests do not currently cover HTTP-level authentication, rate-limit behavior, Supabase Auth, real database operations, migration execution, deployment, or frontend/API integration. The validation tests use no external service or database.

## 17. Adding an API endpoint

For a new authenticated snippet operation, follow the existing boundaries:

1. Add the endpoint to `src/routes/snippets.js`; preserve route ordering and middleware placement.
2. Keep authentication on the router. Add write limits to state-changing methods where appropriate.
3. Add or extend a function in `src/validators/snippets.js` for untrusted path, query, or body data.
4. Add the HTTP handler to `src/controllers/snippets.js`. Validate the request, pass `req.user.id` and `req.supabase` to the service, and retain the established response/error contract.
5. Implement cohesive database behavior in `src/services/snippets.js`; use fixed selected fields and explicit ownership filters.
6. Throw `HttpError` for expected client errors. Let unexpected errors reach `errorHandler`.
7. Add focused tests under `test/` and run `npm test`.
8. Keep browser origins limited to known frontend origins and never expose server-only keys to the browser.

The existing `GET /api/snippets/:id` route is the reference for an authenticated read: the route invokes `getSnippet`, the controller validates the ID, and the service queries by both ID and owner ID.

## 18. Adding a service or integration

Keep new functionality close to its actual boundary. Put reusable environment validation in `src/config/`; initialize external clients in `src/lib/`; keep HTTP-specific concerns in controllers/routes; keep domain and provider operations in a cohesive service. Do not add a repository or generic abstraction unless multiple call sites or testing needs justify it.

Read credentials from environment variables, add placeholder names—not values—to `.env.example`, and validate required settings through the existing configuration pattern. Do not expose privileged keys to the client. Forward integration failures to centralized error handling, return generic server errors to clients, and avoid logging credentials or sensitive request data. Add deterministic unit tests and, where safe configuration permits, integration tests that do not target production data. Update this guide for any new configuration, integration, or behavior.

## 19. Security considerations

- **Secrets:** The Supabase secret/service-role key is privileged and belongs only in server environment configuration. `.env` files are ignored by Git; never commit real keys.
- **Authentication:** Supabase verifies bearer tokens. The publishable/anon key alone is not accepted as a user token.
- **Authorization:** The database client is privileged and bypasses RLS. Explicit `user_id` scoping in the service is essential for every operation.
- **Input:** Payload, IDs, tags, and pagination are validated. JSON parsing is strict and capped at 128 KiB.
- **Database:** The migration constrains column lengths and tag cardinality and revokes direct Data API access from ordinary roles. No raw SQL is constructed from user input.
- **Rate limits:** Per-process in-memory limits reduce request/write bursts, but do not coordinate across multiple instances or survive restart.
- **Network:** CORS is limited to exact origins in `CORS_ORIGINS`; configure the deployed frontend origin explicitly. Requests without an `Origin` header (such as server-to-server requests) remain usable. Express `trust proxy` is not enabled; trust proxy only when the deployment topology and trusted proxy are explicitly configured.
- **Transport:** The application itself does not configure TLS; terminate HTTPS at a trusted hosting platform or proxy in production.
- **Errors and logs:** Client-facing server errors are generic; server logs may include provider error messages. Do not log bearer tokens, request secrets, or snippet contents.
- **Uploads:** No file upload endpoint or upload validation is implemented.

Before production, review deployment-specific origin and proxy settings, centralized rate-limit storage for horizontal scaling, operational logging, and monitoring. Do not infer these safeguards from the local API implementation.

## 20. Logging and observability

The process logs a startup line with the selected port. The error handler logs server-side failures to `console.error`. There is no request/access logger, request ID, metrics endpoint, tracing, health endpoint, or monitoring integration. Platform-level log capture and alerts must be configured by the deployment environment if required.

## 21. Deployment and production configuration

The production entry point is the same as the local entry point:

```powershell
cd Server
npm ci
npm start
```

Provide `SUPABASE_URL`, a publishable/anon key, a secret/service-role key, and optionally `PORT` and `CORS_ORIGINS` in the runtime environment. Set `CORS_ORIGINS` to the exact browser frontend origin(s), comma-separated. The process validates configuration before listening. Apply the SQL migration intentionally using the Supabase CLI and the intended project:

```powershell
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

For local Supabase development, `npx supabase start` and `npx supabase db reset` are available from `Server/`; the reset command is destructive to the local Supabase database and should not be run against production. No Dockerfile, backend deployment manifest, CI workflow, health check, or production deployment configuration is present in the inspected project. Deployment has not been tested as part of this refactor.

Use HTTPS at the hosting layer, configure the deployed frontend's exact origin in `CORS_ORIGINS`, and set trusted proxies only to match known infrastructure. The API does not automatically run migrations or provide production-grade distributed rate limiting.

## 22. Troubleshooting

| Symptom | Checks |
| --- | --- |
| Startup reports missing configuration | Confirm `Server/.env` exists and includes the Supabase URL and both key types (or supported legacy aliases). Never paste keys into logs or chat. |
| Invalid Supabase URL | Use an HTTPS project URL; HTTP is accepted only for `localhost` and `127.0.0.1`. |
| Port bind fails | Set `PORT` to an unused integer from 1 through 65535. |
| API returns `401` | Send an unexpired Supabase user access token in a Bearer authorization header; a project key is not a user token. |
| API returns `400` or `413` | Check JSON syntax, allowed fields, field limits, pagination syntax, and the 128 KiB body limit. |
| API returns `404` for an existing snippet | Confirm it belongs to the authenticated user; cross-user records intentionally appear not found. |
| Database request returns `500` | Check Supabase connectivity, key permissions, whether the migration is applied, and server-side error logs. Never expose the secret key while diagnosing. |
| Browser reports a CORS error | Confirm the frontend's exact origin (scheme, host, and port) appears in `CORS_ORIGINS`, with no path or trailing slash, and restart the API after changing its environment. |
| Rate limits differ across deployments | Each process has independent in-memory counters. A shared store is not configured. |
| Local database reset reports a migration issue | Inspect Supabase CLI output and the migration file; do not use a reset command against production. No seed SQL is configured. |

The listed checks are diagnostic guidance; no remote Supabase service or deployment is exercised automatically by this project.

## 23. Contribution guidelines

- Preserve the CommonJS style and existing npm commands unless a runtime/tooling change is required.
- Keep routes declarative, controllers focused on HTTP adaptation, validators responsible for untrusted input, and service functions responsible for snippet operations.
- Reuse the existing Supabase client factories. Never place privileged database keys in browser code.
- Keep ownership filtering on all user-scoped reads and mutations.
- Preserve endpoint paths, methods, response shapes, status codes, validation rules, and established error codes unless a separately reviewed API change is intended.
- Add tests for validation and business behavior; use external-service tests only with safe, explicit configuration.
- Update `.env.example` and this document when supported configuration or behavior changes. Keep secrets out of both.
- Treat migration edits as database changes; preserve migration history and review the target project before applying them.

## 24. Current limitations and future improvements

**Implemented:** authenticated snippet list/create/read/update/delete; input and pagination validation; owner-scoped service queries; database migration with constraints and RLS policies; global and write rate limits; structured API errors.

**Partial or not connected:** Account registration/login are handled by Supabase Auth in the browser rather than backend endpoints. The project has no live database integration tests.

**Not implemented:** backend auth endpoints; health endpoint; request IDs and access logs; distributed rate-limit storage; Docker or CI/deployment automation; uploads, email, background jobs, and seed data.

**Potential follow-up:** add HTTP tests using controlled mocks, configure shared rate limiting and platform observability for multi-instance deployment, and validate the schema migration against a disposable Supabase environment before applying it to a project.

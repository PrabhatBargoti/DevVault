# DevVault Backend

DevVault's backend is a Node.js and Express API that stores snippets in Supabase Postgres. The API requires a valid Supabase access token, scopes every database operation to the authenticated user, validates input, and applies request limits. It is a separate package from `Client/`; the frontend currently uses browser storage and does not call these endpoints.

## Contents

- [Requirements](#requirements)
- [Configuration](#configuration)
- [Run the API](#run-the-api)
- [Database setup](#database-setup)
- [API overview](#api-overview)
- [Authentication](#authentication)
- [Snippet fields and validation](#snippet-fields-and-validation)
- [Examples](#examples)
- [Responses and errors](#responses-and-errors)
- [Rate limiting](#rate-limiting)
- [Project structure](#project-structure)
- [Security and deployment notes](#security-and-deployment-notes)

## Requirements

- Node.js 18 or later and npm.
- A Supabase project with its project URL, publishable key, and secret key.
- The Supabase CLI to apply the database migration.

## Configuration

From the `Server` directory, copy `.env.example` to `.env` and fill in the values:

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
PORT=3000
```

`SUPABASE_ANON_KEY` can be used in place of `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` can be used in place of `SUPABASE_SECRET_KEY` for projects using the legacy key names. Set `PORT` to another available port if needed.

The API exits with a configuration error if required values are missing or invalid. HTTPS is required for `SUPABASE_URL`, except for `localhost` and `127.0.0.1`.

**Keep `.env` private.** The secret/service-role key bypasses row-level security and must never be included in frontend code, checked into source control, or returned to API clients.

## Run the API

In PowerShell:

```powershell
Set-Location .\Server
npm install
npm start
```

The API listens on the configured port (3000 by default). Run its automated tests with:

```powershell
npm test
```

## Database setup

The migration at `supabase/migrations/20261023014024_create_snippets_table.sql` creates `public.snippets` with:

- UUID identifiers and a foreign key to `auth.users`.
- Snippet content, tags, and creation/update timestamps.
- Database constraints for snippet field lengths and maximum tag count; the API also validates each tag's length.
- An index for listing a user's snippets by most recently updated.
- Row-level security policies scoped to the owning user.
- Data API grants revoked from `anon` and `authenticated`; only `service_role` receives table access.

For a linked Supabase project, run the migration from the `Server` directory:

```powershell
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

For local Supabase development, start the local stack and apply migrations:

```powershell
npx supabase start
npx supabase db reset
```

Use the local API URL and keys printed by `supabase start` in `.env` when running the Express server locally.

The API authenticates a caller's access token using the publishable key, then performs database operations with the server-only secret key. Because this database client is privileged, the API explicitly filters reads, updates, and deletes by the authenticated user's ID. The migration also prevents clients from bypassing the API's throttles by directly using the Supabase Data API.

## API overview

Base URL: `http://localhost:3000/api/snippets` (replace the host and port for your environment).

Every endpoint requires an `Authorization: Bearer <access-token>` header. Requests with a JSON body must use `Content-Type: application/json`.

| Method | Path | Description | Success status |
| --- | --- | --- | --- |
| `POST` | `/api/snippets` | Create a snippet. | `201 Created` |
| `GET` | `/api/snippets` | List the signed-in user's snippets. | `200 OK` |
| `GET` | `/api/snippets/:id` | Get one of the signed-in user's snippets by UUID. | `200 OK` |
| `PATCH` | `/api/snippets/:id` | Update one or more fields on a snippet. | `200 OK` |
| `DELETE` | `/api/snippets/:id` | Delete a snippet. | `204 No Content` |

The list endpoint accepts:

| Query parameter | Default | Allowed range |
| --- | ---: | ---: |
| `limit` | `50` | `1`-`100` |
| `offset` | `0` | `0`-`100000` |

For example: `GET /api/snippets?limit=25&offset=0`. Results are ordered by `updated_at`, newest first.

## Authentication

Obtain an access token after the user signs in with Supabase Auth. Send that **user access token** with each request:

```http
Authorization: Bearer <user-access-token>
```

Missing, invalid, or expired tokens receive `401 Unauthorized`. The API does not accept the publishable key, secret key, or a user ID as a substitute for the user's access token.

## Snippet fields and validation

Create requests require `title` and `language`. Other fields are optional on create and default to empty values.

| Field | Type | Required on create | Maximum |
| --- | --- | --- | ---: |
| `title` | string | Yes | 150 characters; cannot be blank |
| `description` | string | No | 1,000 characters |
| `code` | string | No | 100,000 characters |
| `language` | string | Yes | 50 characters; cannot be blank |
| `category` | string | No | 50 characters |
| `tags` | array of strings | No | 20 tags, up to 40 characters each |

Text fields other than `code` are trimmed. Code whitespace is preserved. Tags are trimmed and cannot be blank. Unknown fields, invalid types, blank required fields, and values over the limits are rejected with `400 Bad Request`. The JSON request body is limited to 128 KB.

The API sets `id`, `user_id`, `created_at`, and `updated_at`; clients cannot set these fields. The update endpoint accepts a non-empty partial object containing only the editable fields. It updates `updated_at` automatically.

## Examples

The examples use `curl`. Replace the access token and snippet UUID with values from your signed-in session and API response.

### Create a snippet

```sh
curl -X POST http://localhost:3000/api/snippets \
  -H "Authorization: Bearer <user-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fetch JSON",
    "description": "A small helper for a JSON API request.",
    "code": "const response = await fetch(url);\nconst data = await response.json();",
    "language": "JavaScript",
    "category": "Backend",
    "tags": ["fetch", "api"]
  }'
```

Example response (`201 Created`):

```json
{
  "data": {
    "id": "a0b1c2d3-e4f5-6789-abcd-0123456789ab",
    "title": "Fetch JSON",
    "description": "A small helper for a JSON API request.",
    "code": "const response = await fetch(url);\nconst data = await response.json();",
    "language": "JavaScript",
    "category": "Backend",
    "tags": ["fetch", "api"],
    "created_at": "2026-10-23T01:30:00.000Z",
    "updated_at": "2026-10-23T01:30:00.000Z"
  }
}
```

### List snippets

```sh
curl "http://localhost:3000/api/snippets?limit=25&offset=0" \
  -H "Authorization: Bearer <user-access-token>"
```

The response contains a `data` array and the applied pagination values:

```json
{
  "data": [],
  "pagination": {
    "limit": 25,
    "offset": 0
  }
}
```

### Get, update, or delete a snippet

```sh
curl http://localhost:3000/api/snippets/a0b1c2d3-e4f5-6789-abcd-0123456789ab \
  -H "Authorization: Bearer <user-access-token>"
```

```sh
curl -X PATCH http://localhost:3000/api/snippets/a0b1c2d3-e4f5-6789-abcd-0123456789ab \
  -H "Authorization: Bearer <user-access-token>" \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description","tags":["fetch","updated"]}'
```

```sh
curl -X DELETE http://localhost:3000/api/snippets/a0b1c2d3-e4f5-6789-abcd-0123456789ab \
  -H "Authorization: Bearer <user-access-token>"
```

Delete succeeds with `204 No Content` and an empty response body. A missing snippet and a snippet owned by a different user both return `404 Not Found`.

## Responses and errors

Successful reads and writes use a JSON object with a `data` property. List responses also include `pagination`. Delete returns no body.

Errors use a consistent structure:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Title and language are required."
  }
}
```

| Status | Meaning |
| ---: | --- |
| `400` | Malformed JSON, invalid query parameters, or invalid snippet input. |
| `401` | Missing, invalid, or expired access token. |
| `404` | Unknown endpoint or snippet not found for this user. |
| `413` | JSON request body exceeds 128 KB. |
| `429` | An IP or account rate limit was exceeded. |
| `500` | Unexpected server or database error; details are logged server-side. |

## Rate limiting

The API applies these in-memory limits:

- **All `/api` requests:** 100 requests per IP in a 15-minute window.
- **Snippet writes (`POST`, `PATCH`, `DELETE`):** an additional 30 requests per IP and 20 requests per authenticated account in a 15-minute window.

Rate limits return `429 Too Many Requests` with a JSON error. Counters reset when the server restarts and are not shared between instances. Before running multiple instances, configure a shared rate-limit store. The server does not enable Express `trust proxy` by default; only enable it when the deployment proxy is configured and trusted, since untrusted forwarded headers can undermine IP-based limits.

## Project structure

```text
D:\DevVault
├── Client/                            # React/Vite app; not yet wired to this API
├── README.md
└── Server/
    ├── server.js                      # Loads environment and starts Express
    ├── src/
    │   ├── app.js                     # Middleware and API route registration
    │   ├── config/env.js              # Environment validation
    │   ├── lib/supabaseClient.js      # Supabase auth and database clients
    │   ├── middleware/
    │   │   ├── authenticate.js        # Access-token verification
    │   │   └── errorHandler.js        # Consistent API errors
    │   ├── routes/snippets.js         # Snippet HTTP endpoints
    │   ├── services/snippets.js       # Supabase data operations
    │   └── utils/
    │       ├── httpError.js           # HTTP error type
    │       └── snippetValidation.js   # Input and pagination validation
    ├── supabase/migrations/           # Database schema and RLS policies
    ├── test/                          # Node.js tests
    ├── .env.example                   # Configuration template
    └── package.json
```

## Security and deployment notes

- Use HTTPS in production and store secrets in the hosting provider's secret manager.
- Never commit `.env` or expose the Supabase secret/service-role key to the browser.
- Keep the table grants and ownership filters in place. The API's database client is privileged and bypasses RLS.
- Use a shared rate-limit store and correctly configure trusted proxies when horizontally scaling.
- Set request limits appropriate to your deployment and monitor server-side database/API errors.
- The current API is not wired into the frontend's local-storage snippet feature; frontend integration and migration of existing browser data are separate tasks.

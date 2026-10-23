# DevVault API

Express API for authenticated, user-owned snippet storage in Supabase.

## Setup

1. Copy `.env.example` to `.env` and set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SECRET_KEY` (a Supabase anon key is also accepted as `SUPABASE_ANON_KEY`; a legacy service-role key is accepted as `SUPABASE_SERVICE_ROLE_KEY`).
2. Apply the database migration from the `Server` directory with `npx supabase db push`.
3. Run `npm install` and `npm start`.

Every snippet request must include a Supabase user access token as `Authorization: Bearer <access-token>`. The publishable key verifies the token; the server-only secret key is used for database requests. The migration revokes Data API access from `anon` and `authenticated`, so callers cannot bypass the Express API's rate limits. Never put `SUPABASE_SECRET_KEY` or a legacy service-role key in client-side code. The database client bypasses RLS as a privileged role, so the API also applies an explicit `user_id` filter to every read, update, and delete.

## Endpoints

All routes are under `/api/snippets`.

| Method   | Path   | Behavior                                                                                                    |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `POST`   | `/`    | Create a snippet. Requires `title` and `language`; accepts `description`, `code`, `category`, and `tags`.   |
| `GET`    | `/`    | List the signed-in user's snippets. Accepts `limit` (1-100, default 50) and `offset` (0-100000, default 0). |
| `GET`    | `/:id` | Get one of the signed-in user's snippets.                                                                   |
| `PATCH`  | `/:id` | Update one or more snippet fields.                                                                          |
| `DELETE` | `/:id` | Delete a snippet; returns `204` on success.                                                                 |

The shared API limit is 100 requests per IP per 15 minutes; writes are additionally limited to 30 requests per IP and 20 requests per account per 15 minutes. These limits use in-memory state and are suitable for a single server instance. Use a shared rate-limit store before running multiple instances. Configure the hosting proxy carefully before enabling Express `trust proxy`, since trusting arbitrary forwarded headers weakens IP-based limits.

Snippet content is limited to 100,000 characters; titles to 150; descriptions to 1,000; languages and categories to 50; and tags to 20 items of up to 40 characters each. JSON requests are limited to 128 KB.

## Response format

Successful reads and writes return `{ "data": ... }`; list responses also include `{ "pagination": { "limit": ..., "offset": ... } }`. Errors return `{ "error": { "code": ..., "message": ... } }`.

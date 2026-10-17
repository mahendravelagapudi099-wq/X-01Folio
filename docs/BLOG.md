# Blog system — how content gets from `blog-queue/` to the screen

## Architecture (single source of truth: Supabase)

```
blog-queue/*.json  ──publish-blog.yml──▶  Supabase table `posts`  ──anon key──▶  React app
   (markdown                                             (Postgres)                /blog, /blog/:slug
    content in git)
```

The **only** content source is the Supabase `posts` table. The Ghost
(`@tryghost/content-api`) fallback was removed with the dead `articles.mahendraa.dev`
links, because the deployed site never owned that host and the fallback pointed at the
public `demo.ghost.io`. Cards now link internally to `/blog/:slug`.

## Verified `posts` columns

Probed against the live PostgREST endpoint on 2026-10-18 (every field the client selects
is confirmed to exist):

| column         | type    | notes                                   |
|----------------|---------|------------------------------------------|
| id             | uuid    | primary key                              |
| created_at     | timestamptz | auto                                   |
| slug           | text    | unique; workflow upserts `onConflict=slug`|
| title          | text    | required by the workflow                 |
| excerpt        | text    | nullable                                 |
| feature_image  | text    | nullable; used for OG image              |
| published_at   | timestamptz | nullable; cards render a date ONLY when this parses |
| featured       | boolean | nullable                                 |
| tags           | text[]  | nullable                                 |
| reading_time   | text    | nullable, e.g. "6 min read"              |
| blocks         | jsonb   | rendered by `BlockRenderer`              |

There is **no `published` column** — PostgREST's own hint when probing it was *"Perhaps
you meant to reference the column `posts.published_at`."* Don't add a filter for one.

## Content format (`blocks`)

Each post's body is a JSON array rendered by `src/components/blog/BlockRenderer.tsx`:

```json
[
  {"type": "heading", "text": "Section title", "level": 2},
  {"type": "text",    "content": "Paragraph text."},
  {"type": "code",    "code": "print('hi')", "language": "python"},
  {"type": "quote",   "text": "Memorable line.", "author": "Optional"},
  {"type": "image",   "url": "https://…", "caption": "Optional caption"}
]
```

## Publishing a post

1. Drop a file into `blog-queue/<YYYY-MM-DD>-<slug>.json` matching the schema documented in
   `.github/workflows/publish-blog.yml`.
2. Commit to `main`. `publish-blog.yml` fires on that path and upserts every queued file
   into Supabase by `slug` (idempotent — safe to re-run).
3. The site picks the rows up via the anon key; nothing is redeployed for content.

Manual trigger: *Actions → Publish blog queue to Supabase → Run workflow*.

## Current breakage and its root cause (as of 2026-10-18)

- The **last 3 workflow runs failed** before any row existed, which is why the blog
  section renders empty. The possible failure set is narrow:
  - **Secret missing/stale** — the job hard-fails with a clear message if
    `SUPABASE_SERVICE_ROLE_KEY` is unset. **Schema is ruled out**: every column the
    upsert writes is confirmed to exist (probe above). RLS cannot block it either, since
    the service role bypasses RLS.
  - => First check: *repo Settings → Secrets and variables → Actions →
    `SUPABASE_SERVICE_ROLE_KEY`* exists and matches the key shown in *Supabase dashboard
    → Project Settings → API → service_role* for project `ujbecwnuzrpijvjffcun`.
  - The anon key **is** valid (read probe returns `[]`, not an error), and `[]` is exactly
    the honest result for an empty table — hence the new empty state.

The client can't tell "zero rows" from "RLS hides rows" when the response is `[]`, so the
empty state is shown either way. Once the workflow publishes a row, the section and
`/blog` populate with no deploy.

## Routes and states

| route        | component                     | shows when…                              |
|--------------|-------------------------------|------------------------------------------|
| `/#blog`     | `src/components/Blog.tsx`     | latest 6 posts, carousel                 |
| `/blog`      | `src/pages/BlogIndex.tsx`     | every post                               |
| `/blog/:slug`| `src/pages/BlogPost.tsx`      | one post + canonical/OG meta             |

All three fetch through `src/lib/blog.ts` with **TanStack Query** (shared `['posts','list']`
cache; `maybeSingle()` for lookups so a missing slug yields `null`, not a thrown
PGRST116). Data states are explicit and non-silent:

- `PostsLoading` — skeleton cards announced as `role="status"`
- `PostsError` — message + *Try again* (`refetch`), `role="alert"`
- `PostsEmpty` — copy + GitHub link (the section is **never** `return null` again)

Removed: `src/lib/ghost.ts`, `public/posts.json`, `@tryghost/content-api`,
`VITE_GHOST_*` env vars. All recoverable from git history if Ghost is ever reinstated.

## Deploy notes

Static GitHub Pages. `public/404.html` is the SPA deep-link shim (converts the path into
`?/…`, which `index.html` rewrites) so refresh on `/blog/:slug` recovers to the route.
The response code is still 404 — that's a GitHub Pages limitation for client-rendered
routes; fix properly only by pre-rendering (not done).

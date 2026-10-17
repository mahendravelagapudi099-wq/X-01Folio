# X-01Folio — Velagapudi Mahendra

Personal portfolio of **Velagapudi Mahendra** (Data Science student): sections for about,
projects, certifications, research, blog, resume, and contact. Deployed at
**https://mahendraa.dev** (GitHub Pages).

## Stack

- React 18 + TypeScript, Vite 5
- Tailwind CSS 3 with a custom glass-morphism theme (`src/index.css`)
- shadcn/ui components on Radix primitives (`src/components/ui`)
- TanStack Query (blog data caching — `src/lib/blog.ts`)
- Framer Motion, Swiper, react-helmet-async
- Supabase as the blog content store

## Commands

| Task | Command |
|------|---------|
| Install | `npm ci` |
| Dev server (localhost:8081) | `npm run dev` |
| Production build → `dist/` | `npm run build` |
| Preview the built bundle | `npm run preview` |
| Lint | `npm run lint` |
| Typecheck (no emit) | `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json` |

Pre-existing lint state: 0 errors, 7 `react-refresh` warnings located solely in
generated `src/components/ui/*` files.

## Environment

Copy `.env.example` to `.env`. The build needs `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` (also configured as GitHub Secrets for the deploy workflow).
`VITE_CONTACT_ENDPOINT` is optional — without it the contact form composes a
`mailto:` message, which is the right default for static hosting.

## Project layout

```
src/
  components/        page sections (Hero, About, Projects, Certificates, Research,
                     Blog, Resume, Contact) + ui/ primitives
  pages/             route components (Index, BlogIndex, BlogPost, NotFound)
  lib/blog.ts        Supabase queries + TanStack Query hooks (single blog source)
  assets/            bundled images
public/              static assets served as-is (CNAME, robots.txt, sitemap.xml,
                     resume PDF, project images)
blog-queue/          draft posts; .github/workflows/publish-blog.yml upserts them
docs/BLOG.md         how blog content works + the open secrets/RLS questions
.github/workflows/   deploy.yml (GitHub Pages), publish-blog.yml (Supabase)
```

## Blog

Content lives in the Supabase `posts` table; cards link to `/blog/:slug` with an
index at `/blog`. **The publish workflow currently fails because the repo secret
`SUPABASE_SERVICE_ROLE_KEY` is missing** (schema was verified by direct probe — see
`docs/BLOG.md` for the full diagnosis and the steps to fix it).

## Deployment

GitHub Pages via `.github/workflows/deploy.yml` (push to `main` → build → upload →
deploy). `public/CNAME` pins the custom domain. `public/404.html` is the
deep-link shim that recovers client-side routes on refresh.

## Open items (only the owner can do these)

1. Add repo secret `SUPABASE_SERVICE_ROLE_KEY`, then re-run the publish workflow.
2. Check Supabase RLS on `posts` (dashboard-only; anon read currently returns `[]`).
3. Confirm the public contact email is the one you want shown site-wide.
4. Provide an OG image (`og.png`) for social previews.

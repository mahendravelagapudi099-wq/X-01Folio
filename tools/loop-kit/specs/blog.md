# Blog spec (the owner added a blog and it does not work)
Find the real cause with evidence. Check each and record PASS/FAIL/UNKNOWN:
- Which source is active: Supabase, Ghost, or the blog-queue pipeline (+ .agent,
  workflows)? Which is dead/duplicated? How does a post reach the page?
- Env: every `VITE_*` read in code is defined on the live host at BUILD time.
- Supabase: table/column names match migrations; RLS enabled; anon SELECT
  policy exists for published rows only (an RLS block returns [] silently).
- Ghost: API URL, Content API key (public key only), CORS, reachability.
- Pipeline: does the workflow/script write to the active source? Missing
  secrets, wrong branch, posts stuck in the queue?
- Data shape vs components: slug, title, date, content (HTML vs Markdown),
  cover, category; null handling.
- Router: `/blog` and `/blog/:slug` exist; cards link to correct slugs; refresh
  and direct visit of `/blog/<slug>` work on the live host.
- Swallowed errors in catch blocks.
Fix: one source only; loading skeleton, empty state, error with retry, useful
not-found for bad slugs; dates/categories only when real; per-article title,
description, canonical, Open Graph; pagination only if post count warrants it.
No fake posts. Test fixtures stay local and unshipped.

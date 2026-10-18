# Non-negotiable rules
1. Never invent facts, metrics, users, awards, certifications, dates, results,
   blog posts, or capabilities. Unknown -> omit or mark `[!]` and ask.
2. Do not claim a feature works unless a command you ran proves it. Cite the
   command in JOURNAL.
3. Preserve existing identity, content, and working features. No rebuild, no
   style-only rewrites.
4. Secrets stay server-side. Browser-exposed keys must be designed for public
   use (e.g. Supabase anon key). Never weaken RLS.
5. No new auth, dashboard, or database. Minimal new dependencies.
6. Animate only transform/opacity; respect prefers-reduced-motion; content must
   stay readable if animation or JS is delayed.
7. Dark-first, restrained accent, subtle borders/shadows. No heavy gradients,
   glow, or oversized cards.

# SEO and accessibility spec
- Per-page title/description, Open Graph, Twitter tags, canonical URLs.
- public/robots.txt and public/sitemap.xml for the real domain and host. A
  client-rendered SPA gives crawlers little per-article metadata; if so, say so
  in docs/HUMAN_REVIEW.md and offer prerender options. Do not add a heavy framework.
- Custom 404 route. Error boundaries around externally-fed components.
- Semantic HTML, visible focus, alt text, contrast, keyboard operation,
  mobile menu focus trap + Escape + focus return.
- Lazy-load below-the-fold images with width/height to prevent layout shift.

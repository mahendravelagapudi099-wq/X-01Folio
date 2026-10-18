# Contact form spec
- Current code calls http://localhost:8080/send-mail. A static host cannot run
  `server/`. Convert to a serverless function for the live host (Netlify
  Function if netlify) or a hosted form service; fewest new deps.
- Never show success or clear inputs before the server confirms.
- Client validation, loading state, duplicate-submit prevention, success and
  error states, aria-live status, honeypot or basic rate limit.
- Secrets in server env vars only. Document setup in README. If email delivery
  is not configured, show a truthful message.
- Contact details come only from docs/FACTS.md through one config file.

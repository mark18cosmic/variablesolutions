# Project Enquiries (local fallback)

In production, "Start a project" submissions are filed as GitHub Issues
(see `src/app/api/start-project/route.ts` and `.env.example`). This file
is only written to when `GITHUB_TOKEN` isn't configured, e.g. local dev.

---

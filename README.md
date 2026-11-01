# Outcome Agents — demo site

An agent that owns a business outcome, from trigger to completion.

This is a **demo concept**, not a live company site. The name is provisional.
Every example on the page is illustrative. Nothing here is a client, a metric,
or a price. The contact form composes a draft only — it sends nothing, and
there is no backend.

## What it is

A single-page site built on [Velora UI](https://github.com/ColorlibHQ/velora-ui)
(MIT) — its SaaS template sections, cut down to one page with all placeholder
content (testimonials, statistics, pricing, client logos, non-home pages)
removed. The content is the Outcome Agents story: a process agent that works
a case from trigger to system of record, with approved evidence only, a
write-blocking eval gate, hash-bound human approval, and one run record per
case.

The review strip at the top of the page lists every judgment call made while
building it. Read that before changing a claim.

## Develop

```sh
pnpm install
pnpm dev        # local dev server
pnpm build      # static export lands in out/
```

To preview exactly what Cloud Run serves:

```sh
docker build -t outcome-agents-demo .
docker run -p 8080:8080 outcome-agents-demo
```

## Deploy

Every push to `main` deploys to Cloud Run (`outcome-agents-demo`, us-central1)
via a Cloud Build GitHub trigger — see [README-DEPLOY.md](./README-DEPLOY.md)
for the trigger, permissions, and the GitHub Actions alternative.

Live: https://outcome-agents-demo-pj6uhtqcuq-uc.a.run.app

## Notes

- Page is `noindex` + robots disallow-all; contact email is the placeholder
  `hello@outcome-agents.example` until the founder sets a real one.
- nginx serves real 404s (no SPA fallback) and caches hashed `_next/static`
  assets for a year; `index.html` is never cached.
- Built with Velora UI (MIT). See [LICENSE](./LICENSE).

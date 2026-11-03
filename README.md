# Outcome Agents — demo site

An agent that owns a business outcome, from trigger to completion.

This is a **demo concept**, not a live company site. The name is provisional.
Every example on the page is illustrative. Nothing here is a client, a metric,
or a price. The contact form composes a draft only — it sends nothing, and
there is no backend.

## What it is

A single-page site built with [shadcn/ui](https://ui.shadcn.com) on Next.js
and Tailwind CSS 4. The content is the Outcome Agents story: a process agent
that works a case from trigger to system of record, with approved evidence
only, a code check before any review, approval bound to the exact text by a
named person, and one run record per case.

The "Notes for the founder" control in the footer (also at `/#notes`) lists
every judgment call made while building the page. Read that before changing
a claim. The copy lives in `src/lib/content.ts`; the notes in
`src/lib/outcome.ts`.

```
src/app/              layout, page, 404, OG image, robots, sitemap
src/components/ui/    shadcn/ui primitives (radix-nova style)
src/components/sections/   one file per section of the page
src/components/outcome/    the diagram, the run-record card, the gap table,
                           the case illustration, the contact form, the notes
```

The shadcn CLI is configured (`components.json`); add primitives with
`pnpm dlx shadcn add <name>`.

## Develop

```sh
pnpm install
pnpm dev        # local dev server
pnpm build      # static export lands in out/
pnpm lint
pnpm typecheck
```

To preview exactly what Cloud Run serves:

```sh
docker build -t outcome-agents-demo .
docker run -p 8080:8080 outcome-agents-demo
```

## Deploy

Every push to `main` deploys to Cloud Run (`outcome-agents-demo`, us-central1)
via GitHub Actions — see [README-DEPLOY.md](./README-DEPLOY.md) for the
one-time setup.

Live: https://outcome-agents-demo-pj6uhtqcuq-uc.a.run.app

## Notes

- Page is `noindex` + robots disallow-all; contact email is the placeholder
  `hello@outcome-agents.example` until the founder sets a real one.
- nginx serves real 404s (no SPA fallback) and caches hashed `_next/static`
  assets for a year; `index.html` is never cached.
- Earlier editions (the hand-rolled memo, then the Velora UI port) are in git
  history. The repository keeps the MIT [LICENSE](./LICENSE) it was created
  under.

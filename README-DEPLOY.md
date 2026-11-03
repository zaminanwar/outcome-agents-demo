# Deploy on every push

This repo is the Outcome Agents demo: a shadcn/ui on Next.js static
export. Pushing to `main` deploys it to the existing Cloud Run service
`outcome-agents-demo` (us-central1, project `consultancy-website-512906`) at
https://outcome-agents-demo-pj6uhtqcuq-uc.a.run.app — same URL as the manual
deploys.

Repo: https://github.com/zaminanwar/outcome-agents-demo (public).
Remote `origin` in this checkout already points there.

## Live path: GitHub Actions (enabled 2026-11-01)

`.github/workflows/deploy.yml` runs on every push to `main`: pnpm install,
pnpm build, docker build + push to Artifact Registry
(`us-central1-docker.pkg.dev/consultancy-website-512906/outcome-agents/outcome-agents-demo`),
then `gcloud run deploy` of that image. No Cloud Build, no long-lived keys —
auth is Workload Identity Federation:

- Pool `github-pool` + OIDC provider `github-provider` (global), issuer
  `https://token.actions.githubusercontent.com`, attribute condition
  `assertion.repository=='zaminanwar/outcome-agents-demo'`.
- Service account `github-deployer@consultancy-website-512906.iam.gserviceaccount.com`
  with project roles `run.admin` and `artifactregistry.writer`,
  `iam.serviceAccountUser` on the Cloud Run runtime service account
  (`236713185753-compute@developer.gserviceaccount.com`), and
  `iam.workloadIdentityUser` for the repo's principal set.
- Repo variables (Settings > Secrets and variables > Actions, or
  `gh variable set`): `GCP_PROJECT_ID` (`consultancy-website-512906`),
  `GCP_REGION` (`us-central1`), `GCP_WIF_PROVIDER`
  (`projects/236713185753/locations/global/workloadIdentityPools/github-pool/providers/github-provider`),
  `GCP_WIF_SERVICE_ACCOUNT` (the deployer SA email above).

The old manual path (`~/workspace/velora-deploy/deploy.sh`) still works as a
fallback, but do not run it and a push at the same time.

## Dormant path: Cloud Build trigger (NOT enabled)

`cloudbuild.yaml` does the same build/deploy via a Cloud Build GitHub
trigger. Trigger creation failed twice (2026-11-01) with a generic
`INVALID_ARGUMENT`, before and after the first push — most likely because
Cloud Build's GitHub App is not installed for this account. To switch to it
later: install the app (Cloud Console → Cloud Build → Settings, or the
triggers page), then create the trigger:

```sh
gcloud builds triggers create github \
  --name=outcome-agents-deploy --repo-name=outcome-agents-demo \
  --repo-owner=zaminanwar --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml --project=consultancy-website-512906
```

If you enable it, disable the Actions workflow first — enabling both
deploys twice per push. The Cloud Build service account
(`236713185753@cloudbuild.gserviceaccount.com`) already holds `run.admin`,
`iam.serviceAccountUser`, and `artifactregistry.writer`, and the
`outcome-agents` Artifact Registry repo already exists.

## Local workflow

```sh
pnpm install
pnpm build        # static export lands in out/
pnpm dev          # local dev server
```

To preview exactly what Cloud Run serves, build the image locally:
`docker build -t outcome-agents-demo . && docker run -p 8080:8080 outcome-agents-demo`.

## Notes

- `out/` is gitignored build output; CI builds it. Keep the `LICENSE`
  file in the repo (MIT; earlier editions were built on Velora UI).
- The page is still a demo: `noindex` + robots disallow-all, contact form
  composes a draft only, contact email is the placeholder
  `hello@outcome-agents.example`.
- nginx serves real 404s (no SPA fallback) and caches hashed `_next/static`
  assets for a year; `index.html` is never cached, so pushes show up
  immediately.

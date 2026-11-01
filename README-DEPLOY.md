# Deploy on every push

This repo is the Outcome Agents demo: a tuned Velora UI (MIT) Next.js static
export. Pushing to `main` deploys it to the existing Cloud Run service
`outcome-agents-demo` (us-central1, project `consultancy-website-512906`) at
https://outcome-agents-demo-pj6uhtqcuq-uc.a.run.app — same URL as the manual
deploys. Pick ONE of the two paths below; both are wired, enabling both would
deploy twice per push.

The live service is untouched until the first automated deploy succeeds. The
old manual path (`~/workspace/velora-deploy/deploy.sh`) still works as a
fallback.

## 0. New remote (do once)

This clone still points at Colorlib's repo — never push there. Create an empty
GitHub repo (suggested: private, name e.g. `outcome-agents-demo`), then:

```sh
git remote remove origin
git remote add origin https://github.com/<you>/outcome-agents-demo.git
git add -A
git commit -m "Outcome Agents demo on Velora UI + deploy wiring"
git push -u origin main
```

`out/` is gitignored build output; CI builds it. Keep Velora's `LICENSE` file
in the repo (MIT attribution).

## Option A — Cloud Build trigger (closest to "linked repo, deploy on push")

1. In Cloud Console, connect the repo to Cloud Build once (GitHub App).
   If the project has no Artifact Registry repo yet:
   ```sh
   gcloud artifacts repositories create outcome-agents \
     --repository-format=docker --location=us-central1 \
     --project consultancy-website-512906
   ```
2. Grant the Cloud Build service account deploy rights (replace
   `PROJECT_NUMBER` with the project's number):
   ```sh
   gcloud projects add-iam-policy-binding consultancy-website-512906 \
     --member="serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
     --role="roles/run.admin"
   gcloud projects add-iam-policy-binding consultancy-website-512906 \
     --member="serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   gcloud projects add-iam-policy-binding consultancy-website-512906 \
     --member="serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
     --role="roles/artifactregistry.writer"
   ```
3. Create the trigger:
   ```sh
   gcloud builds triggers create github \
     --name=outcome-agents-deploy --repo-name=outcome-agents-demo \
     --repo-owner=<you> --branch-pattern="^main$" \
     --build-config=cloudbuild.yaml --project=consultancy-website-512906
   ```

## Option B — GitHub Actions (no GCP console linking)

1. Create a Workload Identity pool + provider and a deploy service account
   (no long-lived keys), granting it `roles/run.admin` and
   `roles/iam.serviceAccountUser`, following
   https://cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds
   (GitHub section in the Google auth action docs).
2. Set repo variables: `GCP_PROJECT_ID` (`consultancy-website-512906`),
   `GCP_REGION` (`us-central1`), `GCP_WIF_PROVIDER` (full provider resource
   name), `GCP_WIF_SERVICE_ACCOUNT` (deploy SA email).
3. Push to `main`; the `Deploy to Cloud Run` workflow runs.

## Local workflow (for Claude Code or anyone else)

```sh
pnpm install
pnpm build        # static export lands in out/
pnpm dev          # local dev server
```

To preview exactly what Cloud Run serves, build the image locally:
`docker build -t outcome-agents-demo . && docker run -p 8080:8080 outcome-agents-demo`.

## Notes

- The page is still a demo: `noindex` + robots disallow-all, contact form
  composes a draft only, contact email is the placeholder
  `hello@outcome-agents.example`.
- nginx serves real 404s (no SPA fallback) and caches hashed `_next/static`
  assets for a year; `index.html` is never cached, so pushes show up
  immediately.

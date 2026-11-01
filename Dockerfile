# Static export of the Outcome Agents demo, served by nginx on Cloud Run.
# Built in CI (pnpm build) before this image is built; out/ is the export.
FROM nginx:1.27-alpine

# Cloud Run injects PORT; nginx's official image templates /etc/nginx/templates/*.template with envsubst.
ENV PORT=8080
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# chmod fixes the 660 modes Next writes, which the nginx worker could not read (same 403 as before).
COPY out/ /usr/share/nginx/html/
RUN chmod -R a+rX /usr/share/nginx/html

EXPOSE 8080

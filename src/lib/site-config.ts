/**
 * Single source of truth for external URLs. Override at build time with
 * NEXT_PUBLIC_SITE_URL when the real domain is wired up.
 */
export const siteConfig = {
  name: "Outcome Agents",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://outcome-agents-demo-pj6uhtqcuq-uc.a.run.app"
  ).replace(/\/$/, ""),
  tagline: "Your people have Copilot. Your processes don’t.",
  description:
    "Demo concept. A boutique, forward-deployed consultancy that builds one process agent at a time inside your Microsoft 365 tenant: code owns the transaction, the model owns judgment inside bounded steps, a named person owns the consequences. Measured against your baseline, handed over to your team.",
} as const;

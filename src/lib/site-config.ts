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
  tagline: "An agent that owns a business outcome, from trigger to completion.",
  description:
    "Demo concept. A boutique, forward-deployed consultancy that builds process agents inside your Microsoft 365 estate: deterministic control plane, grounded retrieval, human approval bound to the exact content reviewed, and a full audit trail. You own the code.",
} as const;

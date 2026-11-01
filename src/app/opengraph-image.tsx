import { ogCard, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

// Prerender the PNG at build time so it ships as a static asset (output: export).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return ogCard({
    title: "An agent that owns a business outcome,",
    accent: "from trigger to completion.",
    description:
      "Demo concept. A boutique, forward-deployed consultancy building process agents inside your Microsoft 365 estate.",
    chips: ["Demo concept", "No clients, metrics, or prices", "Built with Velora UI (MIT)"],
  });
}

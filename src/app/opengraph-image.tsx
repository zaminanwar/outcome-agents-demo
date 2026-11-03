import { ogCard, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

// Prerender the PNG at build time so it ships as a static asset (output: export).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return ogCard({
    title: siteConfig.tagline,
    description:
      "We take one process and make it run: started by the work arriving, grounded in approved content, checked, approved by a named person, written to the system of record.",
    chips: ["Demo concept", "No clients, metrics, or prices", "Microsoft 365 estates"],
  });
}

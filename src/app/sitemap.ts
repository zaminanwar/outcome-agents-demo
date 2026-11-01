import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

// Single-page site: the tuned home page is the whole export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}

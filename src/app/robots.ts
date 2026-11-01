import type { MetadataRoute } from "next";

// Demo concept: keep crawlers out entirely. The page itself also carries
// a noindex meta tag via the root layout.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}

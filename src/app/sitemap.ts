import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** One page, but its anchored sections are worth declaring for discovery. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...["services", "apps", "work", "process", "contact"].map((hash) => ({
      url: `${siteUrl}/#${hash}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

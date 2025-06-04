import { MetadataRoute } from "next";
import { mockBlocks } from "@/data/mockBlocks";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://raito.wtf";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/explorer`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tx-check`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/block-check`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic block pages
  const blockPages: MetadataRoute.Sitemap = mockBlocks.map((block) => ({
    url: `${baseUrl}/block/${block.height}`,
    lastModified: new Date(block.timestamp),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blockPages];
}

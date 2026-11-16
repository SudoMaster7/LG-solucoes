import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.domain.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}

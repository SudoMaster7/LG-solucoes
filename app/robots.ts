import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = company.domain.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}

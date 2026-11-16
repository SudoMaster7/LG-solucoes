import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Deploys de preview da Vercel não devem ser indexados.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  const base = company.domain.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}

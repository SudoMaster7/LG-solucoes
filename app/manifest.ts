import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: "LG Soluções",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#0B2545",
    icons: [
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

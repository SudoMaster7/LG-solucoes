import path from "node:path";
import { fileURLToPath } from "node:url";

const isDev = process.env.NODE_ENV !== "production";
// Nos previews da Vercel, libera a barra de comentários (vercel.live).
const isPreview = process.env.VERCEL_ENV === "preview";
const live = isPreview ? " https://vercel.live" : "";

// CSP: só o próprio site + Pixel da Meta. As fontes são servidas pelo próprio
// site (next/font baixa a Montserrat no build), então não há domínio externo de fontes.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://connect.facebook.net${isDev ? " 'unsafe-eval'" : ""}${live}`,
  `style-src 'self' 'unsafe-inline'${live}`,
  `img-src 'self' data: blob: https://www.facebook.com${live}`,
  `font-src 'self' data:${live}`,
  `connect-src 'self' https://www.facebook.com https://connect.facebook.net${live}`,
  `frame-src https://www.facebook.com${live}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

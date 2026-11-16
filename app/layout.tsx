import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { company, seo } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";
import AttributionCapture from "@/components/AttributionCapture";
import LeadFormDialog from "@/components/LeadFormDialog";
import { ENABLE_LEAD_FORM } from "@/content/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const siteUrl = company.domain.replace(/\/$/, "");
const hasRealDomain = !siteUrl.includes("[");

export const metadata: Metadata = {
  metadataBase: hasRealDomain ? new URL(siteUrl) : undefined,
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  applicationName: company.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/lg-simbolo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LG Soluções Financeiras — Conta PJ no Cora" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og-image.png"],
  },
  formatDetection: { telephone: false },
  // Previews da Vercel ficam fora do Google.
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? { index: false, follow: false }
      : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0B2545",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-btn bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <AttributionCapture />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <MetaPixel />
        {ENABLE_LEAD_FORM && <LeadFormDialog />}
      </body>
    </html>
  );
}

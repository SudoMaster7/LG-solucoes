import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Documents from "@/components/Documents";
import Audience from "@/components/Audience";
import Fees from "@/components/Fees";
import WhyTrust from "@/components/WhyTrust";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { company, faq, whatsappAgents } from "@/content/site";

function JsonLd() {
  const siteUrl = company.domain.replace(/\/$/, "");
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
      logo: `${siteUrl}/brand/lg-logo-horizontal.svg`,
      ...(company.instagram ? { sameAs: [`https://www.instagram.com/${company.instagram}/`] } : {}),
      areaServed: "BR",
      contactPoint: whatsappAgents.map((a) => ({
        "@type": "ContactPoint",
        telephone: `+${a.number}`,
        contactType: "customer service",
        areaServed: "BR",
        availableLanguage: "Portuguese",
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <TrustBar />
        <Benefits />
        <HowItWorks />
        <Documents />
        <Audience />
        <Fees />
        <WhyTrust />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <FloatingWhatsApp />
    </>
  );
}

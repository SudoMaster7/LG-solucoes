import { hero } from "@/content/site";
import { CoraLogo } from "./Brand";
import CardIllustration from "./CardIllustration";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark bg-navy text-white">
      <div className="container-lg grid items-center gap-10 pb-14 pt-[5.25rem] md:pb-20 md:pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pb-24 lg:pt-36">
        <div className="fade-in">
          <p className="eyebrow text-gold">{hero.label}</p>
          <h1 id="hero-title" className="text-h1 mt-4 max-w-[16ch] text-white">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-[40rem] text-white/85">{hero.subtitle}</p>

          <WhatsAppButton cta="hero" className="btn-whatsapp mt-6 min-h-[52px] w-full text-[1.0625rem] sm:w-auto sm:px-7">
            {hero.cta}
          </WhatsAppButton>

          <p className="mt-4 text-[0.9375rem] text-white/80">
            {hero.support.map((item, i) => (
              <span key={item} className="inline">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-2 text-gold">
                    ·
                  </span>
                )}
                {item}
              </span>
            ))}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-btn border border-white/20 px-3 py-2">
            <span className="text-sm font-semibold text-white/85">{hero.partnerSeal}</span>
            <CoraLogo negative height={20} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[480px]">
          <CardIllustration className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}

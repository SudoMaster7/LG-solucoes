import { finalCta } from "@/content/site";
import WhatsAppButton from "./WhatsAppButton";

export default function FinalCta() {
  return (
    <section id="cta-final" aria-labelledby="cta-final-title" className="on-dark bg-navy text-white">
      <div className="container-lg py-16 text-center md:py-20 lg:py-24">
        <span aria-hidden="true" className="mx-auto block h-2.5 w-2.5 rotate-45 bg-gold" />
        <h2 id="cta-final-title" className="text-h2 mx-auto mt-5 max-w-[22ch] text-white">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[36rem] text-white/85">{finalCta.text}</p>
        <WhatsAppButton
          cta="final"
          className="btn-whatsapp mt-8 min-h-[56px] w-full px-8 text-[1.0625rem] sm:w-auto"
          iconSize={22}
        >
          {finalCta.cta}
        </WhatsAppButton>
      </div>
    </section>
  );
}

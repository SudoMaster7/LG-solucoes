import { howItWorks } from "@/content/site";
import SectionHeading from "./SectionHeading";
import WhatsAppButton from "./WhatsAppButton";

export default function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="section bg-white">
      <div className="container-lg">
        <SectionHeading id="como-funciona-title" label={howItWorks.label} title={howItWorks.title} />
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="card relative">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-lg font-bold text-white ring-2 ring-gold ring-offset-2"
              >
                {i + 1}
              </span>
              <h3 className="text-h3 mt-5">
                <span className="sr-only">Passo {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <WhatsAppButton cta="como-funciona" className="btn-whatsapp min-h-[52px] w-full sm:w-auto sm:px-7">
            {howItWorks.cta}
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

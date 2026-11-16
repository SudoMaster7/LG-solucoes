import Link from "next/link";
import { Mail } from "lucide-react";
import { SHOW_COMPANY_ID, company, footer, whatsappAgents } from "@/content/site";
import { LgLogo } from "./Brand";
import { InstagramIcon } from "./Icon";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  return (
    <footer className="on-dark border-t border-white/10 bg-navy text-white">
      <div className="container-lg grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <LgLogo negative height={48} />
          <p className="mt-4 text-white/85">{company.tagline}</p>
        </div>

        <div>
          <h2 className="eyebrow text-gold">Contato</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {whatsappAgents.map((agent) => (
              <li key={agent.id}>
                <WhatsAppButton
                  cta="rodape"
                  agentId={agent.id}
                  iconSize={20}
                  className="inline-flex min-h-[44px] items-center gap-2.5 text-white hover:text-gold"
                  ariaLabel={`WhatsApp ${agent.display}`}
                >
                  <span>WhatsApp {agent.display}</span>
                </WhatsAppButton>
              </li>
            ))}
            {company.instagram && (
              <li>
                <a
                  href={`https://www.instagram.com/${company.instagram}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2.5 text-white hover:text-gold"
                >
                  <InstagramIcon size={20} />@{company.instagram}
                </a>
              </li>
            )}
            <li>
              <a
                href={company.email.includes("[") ? undefined : `mailto:${company.email}`}
                className="inline-flex min-h-[44px] items-center gap-2.5 text-white hover:text-gold"
              >
                <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-gold">Institucional</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-[44px] items-center text-white hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {SHOW_COMPANY_ID && (
            <p className="mt-4 text-sm text-white/80">
              {company.legalName}
              <br />
              CNPJ {company.cnpj}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lg py-6 text-[0.8125rem] leading-relaxed text-white/75">
          <p className="max-w-[60rem]">{footer.legal}</p>
          <p className="mt-3">© {company.year} {company.name}.</p>
        </div>
      </div>
    </footer>
  );
}

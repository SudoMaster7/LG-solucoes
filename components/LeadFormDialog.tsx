"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { leadForm, whatsappAgents } from "@/content/site";
import { isValidCnpj, maskCnpj, maskPhone, onlyDigits } from "@/lib/cnpj";
import { trackEvent } from "@/lib/tracking";
import { buildWhatsAppUrl, getAttribution, openWhatsApp, resolveAgent } from "@/lib/whatsapp";
import { LEAD_FORM_EVENT } from "./WhatsAppButton";

type Fields = {
  nome: string;
  empresa: string;
  cnpj: string;
  cargo: string;
  telefone: string;
  email: string;
  estado: string;
  cidade: string;
  segmento: string;
  tipo: string;
};

const empty: Fields = {
  nome: "",
  empresa: "",
  cnpj: "",
  cargo: "",
  telefone: "",
  email: "",
  estado: "",
  cidade: "",
  segmento: "",
  tipo: "",
};

const inputCls =
  "mt-1 block min-h-[48px] w-full rounded-btn border border-line bg-white px-3 text-base text-ink focus:border-navy";

/** Formulário de lead (ativo só com ENABLE_LEAD_FORM = true). Ao enviar, abre o WhatsApp. */
export default function LeadFormDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [fields, setFields] = useState<Fields>(empty);
  const [cta, setCta] = useState("");
  const [agentId, setAgentId] = useState<string | undefined>();
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const open = (e: Event) => {
      const detail = (e as CustomEvent).detail ?? {};
      setCta(detail.cta ?? "");
      setAgentId(detail.agentId);
      dialogRef.current?.showModal();
    };
    window.addEventListener(LEAD_FORM_EVENT, open);
    return () => window.removeEventListener(LEAD_FORM_EVENT, open);
  }, []);

  const set = (key: keyof Fields, value: string) => setFields((f) => ({ ...f, [key]: value }));
  const isMei = fields.tipo === "MEI";

  function validate(): boolean {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (fields.nome.trim().length < 2) e.nome = "Informe seu nome.";
    if (fields.empresa.trim().length < 2) e.empresa = "Informe o nome da empresa.";
    if (!isValidCnpj(fields.cnpj)) e.cnpj = "CNPJ inválido. Confira os números.";
    if (onlyDigits(fields.telefone).length < 10) e.telefone = "Informe um telefone com DDD.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) e.email = "Informe um e-mail válido.";
    if (!fields.estado) e.estado = "Selecione o estado.";
    if (!fields.cidade.trim()) e.cidade = "Informe a cidade.";
    if (!fields.tipo) e.tipo = "Selecione o tipo de empresa.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (isMei || !validate()) return;
    setSending(true);

    const agent = (agentId && whatsappAgents.find((a) => a.id === agentId)) || resolveAgent();
    const attribution = getAttribution();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, cnpj: onlyDigits(fields.cnpj), agent: agent.id, cta, ...attribution }),
      });
    } catch {
      /* mesmo com falha no envio, o visitante segue para o WhatsApp */
    }
    trackEvent("Contact", { content_name: cta, agent: agent.id });
    setSending(false);
    dialogRef.current?.close();
    openWhatsApp(buildWhatsAppUrl(agent, attribution));
  }

  const err = (key: keyof Fields) =>
    errors[key] ? (
      <span id={`err-${key}`} className="mt-1 block text-sm text-red-700">
        {errors[key]}
      </span>
    ) : null;

  const field = (key: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block text-sm font-semibold text-navy">
      {label}
      <input
        className={inputCls}
        value={fields[key]}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `err-${key}` : undefined}
        {...props}
      />
      {err(key)}
    </label>
  );

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="lead-title"
      className="w-[min(640px,calc(100vw-24px))] rounded-card p-0 backdrop:bg-navy/60"
    >
      <form onSubmit={onSubmit} noValidate className="max-h-[90vh] overflow-y-auto p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="lead-title" className="text-h3">
              {leadForm.title}
            </h2>
            <p className="mt-1 text-muted">{leadForm.text}</p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn text-navy"
          >
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-navy sm:col-span-2">
            Tipo de empresa
            <select
              className={inputCls}
              value={fields.tipo}
              onChange={(e) => set("tipo", e.target.value)}
              aria-invalid={!!errors.tipo}
            >
              <option value="">Selecione</option>
              {leadForm.companyTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            {err("tipo")}
          </label>

          {isMei ? (
            <p role="alert" className="rounded-btn border border-line bg-offwhite p-4 font-semibold text-navy sm:col-span-2">
              {leadForm.meiMessage}
            </p>
          ) : (
            <>
              {field("nome", "Nome", { autoComplete: "name" })}
              {field("empresa", "Empresa", { autoComplete: "organization" })}
              <label className="block text-sm font-semibold text-navy">
                CNPJ
                <input
                  className={inputCls}
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                  value={fields.cnpj}
                  onChange={(e) => set("cnpj", maskCnpj(e.target.value))}
                  aria-invalid={!!errors.cnpj}
                  aria-describedby={errors.cnpj ? "err-cnpj" : undefined}
                />
                {err("cnpj")}
              </label>
              {field("cargo", "Cargo", { autoComplete: "organization-title" })}
              <label className="block text-sm font-semibold text-navy">
                Telefone
                <input
                  className={inputCls}
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(00) 00000-0000"
                  value={fields.telefone}
                  onChange={(e) => set("telefone", maskPhone(e.target.value))}
                  aria-invalid={!!errors.telefone}
                  aria-describedby={errors.telefone ? "err-telefone" : undefined}
                />
                {err("telefone")}
              </label>
              {field("email", "E-mail", { type: "email", autoComplete: "email" })}
              <label className="block text-sm font-semibold text-navy">
                Estado
                <select
                  className={inputCls}
                  value={fields.estado}
                  onChange={(e) => set("estado", e.target.value)}
                  aria-invalid={!!errors.estado}
                >
                  <option value="">Selecione</option>
                  {leadForm.states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {err("estado")}
              </label>
              {field("cidade", "Cidade", { autoComplete: "address-level2" })}
              <label className="block text-sm font-semibold text-navy sm:col-span-2">
                Segmento
                <select className={inputCls} value={fields.segmento} onChange={(e) => set("segmento", e.target.value)}>
                  <option value="">Selecione</option>
                  {leadForm.segments.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>

        {!isMei && (
          <button type="submit" disabled={sending} className="btn-whatsapp mt-6 min-h-[52px] w-full disabled:opacity-70">
            {sending ? "Enviando..." : leadForm.submit}
          </button>
        )}
      </form>
    </dialog>
  );
}

import { NextResponse } from "next/server";
import { ENABLE_LEAD_FORM } from "@/content/site";
import { isValidCnpj, onlyDigits } from "@/lib/cnpj";

const FIELDS = [
  "nome", "empresa", "cnpj", "cargo", "telefone", "email", "estado", "cidade", "segmento", "tipo",
  "agent", "cta", "utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid",
] as const;

/**
 * Recebe o lead do formulário (só com ENABLE_LEAD_FORM = true).
 * Se LEADS_WEBHOOK_URL estiver definida, repassa os dados para o CRM.
 */
export async function POST(request: Request) {
  if (!ENABLE_LEAD_FORM) return NextResponse.json({ error: "Formulário desativado" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const lead: Record<string, string> = {};
  for (const key of FIELDS) {
    const value = body[key];
    if (typeof value === "string") lead[key] = value.trim().slice(0, 300);
  }

  if (lead.tipo === "MEI") {
    return NextResponse.json({ error: "No momento a LG não atende MEI." }, { status: 422 });
  }
  if (!lead.nome || !lead.empresa || !isValidCnpj(lead.cnpj ?? "") || onlyDigits(lead.telefone ?? "").length < 10) {
    return NextResponse.json({ error: "Dados incompletos ou CNPJ inválido" }, { status: 422 });
  }

  const payload: Record<string, string> = { ...lead, cnpj: onlyDigits(lead.cnpj), received_at: new Date().toISOString() };
  const webhook = process.env.LEADS_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) console.error("[leads] webhook respondeu", res.status);
    } catch (err) {
      console.error("[leads] falha no webhook", err);
    }
  } else {
    console.info("[leads] novo lead (sem webhook configurado)", { empresa: payload.empresa, agent: payload.agent });
  }

  return NextResponse.json({ ok: true });
}

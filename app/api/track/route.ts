import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

/**
 * Conversions API da Meta — pronta e DESATIVADA (ENABLE_CAPI=false).
 * Recebe o mesmo event_id do Pixel para a Meta deduplicar os eventos.
 * Para ligar: ENABLE_CAPI=true, NEXT_PUBLIC_ENABLE_CAPI=true e META_CAPI_ACCESS_TOKEN.
 */
const ALLOWED_EVENTS = new Set(["PageView", "Contact", "ViewContent", "Lead"]);
const API_VERSION = "v21.0";

export async function POST(request: Request) {
  if (process.env.ENABLE_CAPI !== "true") {
    return new NextResponse(null, { status: 204 });
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    return NextResponse.json({ error: "CAPI sem configuração" }, { status: 500 });
  }

  let body: {
    event_name?: string;
    event_id?: string;
    event_source_url?: string;
    custom_data?: Record<string, unknown>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body.event_name || !ALLOWED_EVENTS.has(body.event_name) || !body.event_id) {
    return NextResponse.json({ error: "Evento inválido" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ua = request.headers.get("user-agent") ?? undefined;
  const cookies = request.headers.get("cookie") ?? "";
  const fbp = /(?:^|;\s*)_fbp=([^;]+)/.exec(cookies)?.[1];
  const fbc = /(?:^|;\s*)_fbc=([^;]+)/.exec(cookies)?.[1];

  const event = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    action_source: "website",
    event_source_url: body.event_source_url,
    user_data: {
      client_ip_address: ip,
      client_user_agent: ua,
      fbp,
      fbc,
      // Exemplo de hash para dados pessoais, se forem enviados no futuro:
      // em: [sha256(email)]
    },
    custom_data: body.custom_data ?? {},
  };

  const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [event],
      ...(process.env.META_CAPI_TEST_EVENT_CODE ? { test_event_code: process.env.META_CAPI_TEST_EVENT_CODE } : {}),
    }),
  });

  if (!res.ok) {
    console.error("[capi] erro", res.status, await res.text());
    return NextResponse.json({ error: "Falha no envio" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

// Para hashear dados pessoais (e-mail, telefone) antes de enviar à Meta, se um dia forem usados.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

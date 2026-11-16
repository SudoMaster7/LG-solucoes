# Site da LG Soluções Financeiras

Landing page de uma página só para a abertura de contas PJ no Cora com o atendimento da LG.
O objetivo é levar o visitante a iniciar uma conversa no WhatsApp.

Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS 3. A página é estática (SSG).

---

## 1. Como rodar

Requisitos: Node.js 20 ou mais novo.

```bash
npm install
cp .env.example .env.local   # preencha as variáveis (veja a seção 5)
npm run dev                  # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run icons` | Gera de novo `favicon.ico`, `apple-touch-icon.png` (180px), `icon-512.png` e `og-image.png` (1200×630) a partir dos SVGs em `public/brand/` |
| `npm run screenshots` | Com o site rodando (`npm start`), tira capturas em 390px e 1440px (pasta `screenshots/`) e confere se há rolagem horizontal em 360, 390, 414, 768, 1024, 1280 e 1440px. Usa o Chrome ou o Edge instalado (ou `CHROME_PATH`) |

---

## 2. Onde editar textos, tarifas e números

**Tudo fica em [`content/site.ts`](content/site.ts).** Não é preciso mexer nos componentes.

| O que mudar | Onde, em `content/site.ts` |
|---|---|
| Textos de qualquer seção | objetos `hero`, `benefits`, `howItWorks`, `documents`, `audience`, `trust`, `faq`, `finalCta`, `footer` |
| Tarifas | `fees.items` (`free: true` mostra o valor em verde com ✓) |
| Data de conferência das tarifas | `feesCheckedAt` (aparece no rodapé da tabela) |
| Números de WhatsApp | `whatsappAgents` |
| Mensagem pré-preenchida | `whatsappMessage` |
| E-mail, CNPJ, razão social, Instagram | `company` (`instagram` vazio = não aparece no rodapé nem no JSON-LD; preencha só o usuário, sem @) |
| Foto dos sócios | `trust.about.photo` (ex.: `"/socios.jpg"`, arquivo em `public/`, até 150 KB) |
| Depoimentos | `testimonials` (só com autorização real) |

As perguntas frequentes alimentam também o JSON-LD `FAQPage`, então o Google sempre recebe o mesmo texto da página.

---

## 3. WhatsApp: números e distribuição

Os atendentes ficam em `whatsappAgents`:

```ts
export const whatsappAgents = [
  { id: "atendente-1", number: "5521984190333", display: "(21) 98419-0333" },
  { id: "atendente-2", number: "5521979902815", display: "(21) 97990-2815" },
];
```

**Distribuição** (`WHATSAPP_ROUTING` em `content/site.ts`, ou a variável `NEXT_PUBLIC_WHATSAPP_ROUTING`):

- `"random"` (padrão): na primeira visita, sorteia um atendente (50/50) e salva em `localStorage` (`lg_wa_agent`). O mesmo visitante sempre cai no mesmo atendente. Se o navegador bloquear o storage, sorteia a cada carregamento.
- `"fixed:atendente-1"` ou `"fixed:atendente-2"`: manda todos os contatos para um atendente só.

Para incluir um terceiro atendente, basta adicionar um item à lista. O sorteio passa a ser 1/3 para cada.

**Origem do lead:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `fbclid` são lidos da URL e guardados em `sessionStorage`. Se houver `utm_campaign`, a mensagem termina com `(ref: <utm_campaign>)`, para registrar no CRM de qual anúncio veio o contato.

**Botões:** cada botão tem `data-cta` = `header`, `hero`, `como-funciona`, `final`, `flutuante` ou `rodape`. No celular o link abre direto no app do WhatsApp; no desktop, em nova aba. Os dois números do rodapé levam ao atendente correspondente.

---

## 4. Flags disponíveis

Em `content/site.ts`:

| Flag | Padrão | O que faz |
|---|---|---|
| `SHOW_TESTIMONIALS` | `false` | Mostra a seção de depoimentos (só aparece se a lista `testimonials` tiver itens) |
| `SHOW_COMPANY_ID` | `false` | Mostra razão social e CNPJ no rodapé |
| `ENABLE_LEAD_FORM` | `false` | Os botões de WhatsApp abrem antes um formulário (nome, empresa, CNPJ com máscara e validação, cargo, telefone, e-mail, estado, cidade, segmento e tipo de empresa). MEI é bloqueado com aviso. Ao enviar, faz POST em `/api/leads` com os dados, o atendente e as UTMs, e abre o WhatsApp |
| `HAS_CORA_LOGO_FILE` | `true` | Mostra o logo oficial `public/parceiros/logo-cora.svg`. Com `false`, volta o placeholder "Cora [LOGO OFICIAL]" |
| `WHATSAPP_ROUTING` | `"random"` | Veja a seção 3 |

Em variáveis de ambiente:

| Variável | Padrão | O que faz |
|---|---|---|
| `ENABLE_CAPI` / `NEXT_PUBLIC_ENABLE_CAPI` | `false` | Liga a Conversions API (`/api/track`). As duas precisam estar `true` |

---

## 5. Variáveis de ambiente

Veja [`.env.example`](.env.example).

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública (ex.: `https://lgfinancas.com.br`). Usada em canonical, sitemap, robots, Open Graph e JSON-LD |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Pixel da Meta. Vazio = Pixel desligado |
| `NEXT_PUBLIC_WHATSAPP_ROUTING` | Sobrescreve `WHATSAPP_ROUTING` sem mexer no código |
| `ENABLE_CAPI`, `NEXT_PUBLIC_ENABLE_CAPI` | Liga a Conversions API |
| `META_CAPI_ACCESS_TOKEN` | Token da Conversions API (só no servidor; nunca com prefixo `NEXT_PUBLIC_`) |
| `META_CAPI_TEST_EVENT_CODE` | Código de teste do Gerenciador de Eventos (opcional) |
| `LEADS_WEBHOOK_URL` | Para onde `/api/leads` repassa os leads do formulário (webhook do CRM). Vazio = só registra no log |

---

## 6. Rastreamento e LGPD

- O banner de cookies oferece **Aceitar / Recusar**. A escolha fica em `localStorage` (`lg_cookie_consent`).
- **Nada de rastreamento de anúncios é carregado antes do aceite.** Depois do aceite, o Pixel dispara:
  - `PageView` no carregamento;
  - `Contact` no clique de qualquer botão de WhatsApp, com `{ content_name: <data-cta>, agent: <id> }`;
  - `ViewContent` quando a seção de tarifas aparece na tela.
- Cada evento leva um `event_id`. Com a CAPI ligada, o mesmo `event_id` vai para `/api/track`, e a Meta deduplica.
- Páginas `/privacidade` e `/termos` com texto-base marcado `[REVISAR COM A LG]` / `[REVISAR]`.

---

## 7. Identidade visual e regras de conteúdo

- Cores, fonte (Montserrat via `next/font`), raios e breakpoints estão em [`tailwind.config.ts`](tailwind.config.ts) e [`app/globals.css`](app/globals.css).
- **Contraste:** o dourado `#C9A227` não passa AA como texto sobre fundo branco ou off-white (2,4:1). Por isso os rótulos de seção ficam em dourado só sobre o azul-marinho; sobre fundo claro, o texto do rótulo fica em azul e o dourado aparece só no losango ao lado.
- Logo da Cora: **somente o arquivo oficial do kit de marca**, em `public/parceiros/logo-cora.svg`. Não redesenhar, recolorir nem baixar de terceiros. Como o arquivo fornecido é a versão para fundo claro, sobre o azul-marinho (selo do hero) ele aparece dentro de uma placa branca com margem de respiro, sem alterar as cores. Se o kit tiver uma versão negativa oficial, ela pode substituir a placa.
- Não prometer crédito, limite, empréstimo ou aprovação garantida. Todo texto sobre o cartão de crédito leva "sujeito a análise".
- Não inventar depoimentos, números de clientes, selos ou avaliações.

---

## 8. Placeholders pendentes

Aparecem visíveis no site até serem trocados:

- [ ] `[EMAIL]`: `company.email` em `content/site.ts`
- [ ] `[DOMÍNIO]`: `NEXT_PUBLIC_SITE_URL` no `.env` / Vercel
- [ ] `[CNPJ]` e `[RAZÃO SOCIAL]`: `company.cnpj` e `company.legalName`, depois `SHOW_COMPANY_ID = true`
- [x] Logo oficial da Cora (`public/parceiros/logo-cora.svg`)
- [ ] Regras de uso do kit de marca da Cora (conferir área de proteção e uso sobre fundo escuro)
- [ ] Instagram: preencher `company.instagram` quando o perfil existir
- [ ] `[FOTO DOS SÓCIOS]` (opcional): `trust.about.photo`. Hoje usa o símbolo da marca
- [ ] `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Depoimentos reais autorizados (quando houver)
- [ ] Revisão dos textos de `/privacidade` (`[REVISAR COM A LG]`: prazo de guarda, prestadores, foro) e `/termos` (`[REVISAR]`)

---

## 9. Checklist de publicação

1. [ ] Conferir de novo a tabela de tarifas vigente em cora.com.br e atualizar `fees` e `feesCheckedAt`.
2. [ ] Trocar todos os placeholders da seção 8.
3. [ ] Conferir o uso do logo da Cora com as regras do kit de marca.
4. [ ] Revisar `/privacidade` e `/termos` com a LG.
5. [ ] Na Vercel: importar o projeto, definir as variáveis da seção 5 e apontar o domínio.
6. [ ] `npm run build` sem erros.
7. [ ] Testar os dois números de WhatsApp e a mensagem com `?utm_campaign=teste` (deve terminar com `(ref: teste)`).
8. [ ] Testar o Pixel com a extensão Meta Pixel Helper: nada antes do aceite; `PageView`, `Contact` e `ViewContent` depois.
9. [ ] Rodar o Lighthouse mobile (meta ≥ 90 em todas as categorias).
10. [ ] Testar no celular real (iPhone e Android): menu, botão flutuante, tabela em cards, abertura do app do WhatsApp.
11. [ ] Compartilhar o link no WhatsApp e conferir a imagem de prévia (Open Graph).
12. [ ] Enviar o `sitemap.xml` no Google Search Console.

---

## 10. Estrutura

```
app/
  layout.tsx            fonte, metadados (SEO/OG), header, footer, cookies, Pixel
  page.tsx              página principal + JSON-LD (Organization, FAQPage)
  privacidade/, termos/ páginas legais
  api/track/            Conversions API (desativada)
  api/leads/            recebe o formulário de lead (desativado)
  sitemap.ts, robots.ts, manifest.ts
components/             uma seção por arquivo + WhatsAppButton, Accordion, CookieBanner, MetaPixel...
content/site.ts         TODOS os textos, tarifas, números e flags
lib/                    whatsapp (sorteio, UTMs, links), tracking (consentimento, eventos), cnpj
public/brand/           logos da LG
public/parceiros/       logo oficial da Cora (logo-cora.svg)
scripts/                geração de ícones e capturas
screenshots/            capturas em 390px e 1440px
```

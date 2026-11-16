// Tira capturas da página e confere se há rolagem horizontal em cada largura.
// Uso: com o site rodando (npm run build && npm start), rode: npm run screenshots
// Variáveis opcionais: SITE_URL (padrão http://localhost:3000), CHROME_PATH.
import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "screenshots");
mkdirSync(outDir, { recursive: true });

const url = process.env.SITE_URL || "http://localhost:3000";
const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) throw new Error("Chrome/Edge não encontrado. Defina CHROME_PATH.");

const widths = [360, 390, 414, 768, 1024, 1280, 1440];
const capture = new Set([390, 1440]);

const browser = await puppeteer.launch({ executablePath, headless: true });
let failures = 0;

for (const width of widths) {
  const page = await browser.newPage();
  const mobile = width < 768;
  await page.setViewport({ width, height: mobile ? 640 : 900, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  // Esconde o aviso de cookies nas capturas.
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("lg_cookie_consent", "rejected");
    } catch {}
  });
  await page.goto(url, { waitUntil: "networkidle0" });

  const info = await page.evaluate(() => {
    const doc = document.documentElement;
    const cta = document.querySelector('[data-cta="hero"]')?.getBoundingClientRect();
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, heroCtaBottom: cta?.bottom ?? -1, wide };
  });

  const overflow = info.scrollWidth > info.clientWidth;
  const ctaVisible = info.heroCtaBottom > 0 && info.heroCtaBottom <= (mobile ? 640 : 900);
  if (overflow) failures++;
  if (width === 360 && !ctaVisible) failures++;
  console.log(
    `${String(width).padStart(4)}px  rolagem horizontal: ${overflow ? "SIM ✗" : "não ✓"}  botão do hero na 1ª tela: ${ctaVisible ? "sim ✓" : "NÃO ✗"} (base ${Math.round(info.heroCtaBottom)}px)`
  );
  if (info.wide.length && overflow) console.log("   elementos largos:", info.wide.join(" | "));

  if (capture.has(width)) {
    await page.screenshot({ path: path.join(outDir, `home-${width}-primeira-tela.png`) });
    // Rola a página para carregar as imagens com lazy loading antes da captura inteira.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 400));
    const file = path.join(outDir, `home-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`   captura: ${path.relative(root, file)}`);
  }
  await page.close();
}

await browser.close();
if (failures) {
  console.error(`\n${failures} problema(s) encontrado(s).`);
  process.exit(1);
}
console.log("\nTudo certo.");

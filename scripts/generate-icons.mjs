// Gera favicon.ico, apple-touch-icon.png (180), icon-512.png e og-image.png (1200×630)
// a partir dos SVGs oficiais em /public/brand. Uso: npm run icons
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => path.join(root, "public", p);

const symbol = await readFile(pub("brand/lg-simbolo.svg"));
const logoNeg = await readFile(pub("brand/lg-logo-horizontal-negativo.svg"));

/** Símbolo centralizado num quadrado com fundo e margem. */
async function squareIcon(size, { background = "#FFFFFF", padding = 0.16 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const sym = await sharp(symbol, { density: 600 }).resize({ height: inner, width: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: sym, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// ICO com imagens PNG embutidas (16, 32, 48)
async function buildIco(sizes) {
  const images = await Promise.all(sizes.map((s) => squareIcon(s, { background: { r: 0, g: 0, b: 0, alpha: 0 }, padding: 0.04 })));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  images.forEach((img, i) => {
    const e = Buffer.alloc(16);
    const s = sizes[i];
    e.writeUInt8(s >= 256 ? 0 : s, 0);
    e.writeUInt8(s >= 256 ? 0 : s, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    entries.push(e);
  });
  return Buffer.concat([header, ...entries, ...images]);
}

await writeFile(pub("favicon.ico"), await buildIco([16, 32, 48]));
await writeFile(pub("apple-touch-icon.png"), await squareIcon(180));
await writeFile(pub("icon-512.png"), await squareIcon(512));

// Open Graph 1200×630: logo LG negativo sobre azul + "Conta PJ no Cora"
const W = 1200;
const H = 630;
const logo = await sharp(logoNeg, { density: 400 }).resize({ width: 640 }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();
const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#0B2545"/>
  <rect x="80" y="${H - 96}" width="${W - 160}" height="2" fill="#C9A227" opacity="0.7"/>
  <path d="M100 410 l12 12 -12 12 -12 -12z" fill="#C9A227"/>
  <text x="128" y="434" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Conta PJ no Cora</text>
  <text x="88" y="${H - 52}" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#FFFFFF" opacity="0.85">Sem mensalidade · Pix ilimitado · Atendimento pelo WhatsApp</text>
</svg>`);
await sharp(bg)
  .composite([{ input: logo, left: 80, top: Math.round(190 - (logoMeta.height ?? 0) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(pub("og-image.png"));

console.log("Ícones e imagem OG gerados em /public.");

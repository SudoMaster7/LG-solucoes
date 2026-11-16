import Image from "next/image";
import { HAS_CORA_LOGO_FILE } from "@/content/site";

type LogoProps = { negative?: boolean; className?: string; priority?: boolean; height?: number };

/** Logo horizontal da LG (proporção 460×140). */
export function LgLogo({ negative = false, className = "", priority = false, height = 40 }: LogoProps) {
  const width = Math.round((460 / 140) * height);
  return (
    <Image
      src={negative ? "/brand/lg-logo-horizontal-negativo.svg" : "/brand/lg-logo-horizontal.svg"}
      alt="LG Soluções Financeiras"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

/** Símbolo da LG (proporção 120×140). */
export function LgSymbol({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/lg-simbolo.svg"
      alt="Símbolo da LG Soluções Financeiras"
      width={Math.round((120 / 140) * size)}
      height={size}
      unoptimized
      className={className}
    />
  );
}

/**
 * Logo da Cora. Usa SOMENTE o arquivo oficial do kit de marca da Cora,
 * fornecido pela LG em /public/parceiros/. Sem redesenho, sem recolorir.
 * Arquivo: /public/parceiros/logo-cora.svg. Com HAS_CORA_LOGO_FILE = false,
 * mostra um placeholder visível com o nome em texto.
 */
export function CoraLogo({ negative = false, height = 24, className = "" }: LogoProps) {
  if (!HAS_CORA_LOGO_FILE) {
    return (
      <span
        className={`inline-flex items-center rounded-md border border-dashed px-2 py-1 text-xs font-semibold ${
          negative ? "border-white/50 text-white" : "border-muted/60 text-muted"
        } ${className}`}
        title="Placeholder: inserir o logo oficial da Cora em /public/parceiros/logo-cora.svg"
      >
        Cora [LOGO OFICIAL]
      </span>
    );
  }
  // Proporção do arquivo oficial: 90×24.
  const img = (
    <Image
      src="/parceiros/logo-cora.svg"
      alt="Logo Cora"
      width={Math.round((90 / 24) * height)}
      height={height}
      unoptimized
      style={{ height, width: "auto" }}
      className={negative ? "" : className}
    />
  );
  // O kit fornecido só tem a versão para fundo claro. Sobre o azul, o logo vai
  // numa placa branca (sem recolorir), com margem de respiro ao redor.
  if (negative) {
    return (
      <span className={`inline-flex items-center rounded-md bg-white ${className}`} style={{ padding: `${Math.round(height * 0.35)}px ${Math.round(height * 0.5)}px` }}>
        {img}
      </span>
    );
  }
  return img;
}

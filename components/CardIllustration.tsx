/**
 * Ilustração vetorial genérica: tela de app financeiro + cartão PJ nas cores da LG.
 * Não reproduz o cartão nem as telas reais da Cora.
 */
export default function CardIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      role="img"
      aria-label="Ilustração de um cartão empresarial e de um aplicativo de conta PJ"
    >
      {/* Celular com app genérico */}
      <g transform="translate(232 8)">
        <rect width="200" height="384" rx="28" fill="#13315C" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <rect x="12" y="14" width="176" height="356" rx="18" fill="#F5F3EE" />
        <rect x="76" y="24" width="48" height="6" rx="3" fill="#E4E1D8" />
        {/* saldo */}
        <rect x="28" y="50" width="70" height="8" rx="4" fill="#4A5568" opacity="0.5" />
        <rect x="28" y="66" width="118" height="16" rx="5" fill="#0B2545" />
        <rect x="28" y="92" width="52" height="8" rx="4" fill="#1E7F5C" />
        {/* gráfico */}
        <rect x="28" y="116" width="144" height="92" rx="10" fill="#FFFFFF" stroke="#E4E1D8" />
        <polyline
          points="40,188 64,176 86,182 108,160 130,166 158,136"
          fill="none"
          stroke="#1E7F5C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="158" cy="136" r="4.5" fill="#C9A227" />
        {/* lançamentos */}
        {[226, 262, 298].map((y, i) => (
          <g key={y}>
            <rect x="28" y={y} width="144" height="28" rx="8" fill="#FFFFFF" stroke="#E4E1D8" />
            <circle cx="44" cy={y + 14} r="7" fill={i === 1 ? "#E4E1D8" : "#D6EBE2"} />
            <rect x="58" y={y + 10} width="56" height="8" rx="4" fill="#4A5568" opacity="0.45" />
            <rect x="130" y={y + 10} width="30" height="8" rx="4" fill={i === 1 ? "#4A5568" : "#1E7F5C"} opacity={i === 1 ? 0.45 : 1} />
          </g>
        ))}
        <rect x="28" y="338" width="144" height="20" rx="8" fill="#1E7F5C" />
      </g>

      {/* Cartão PJ genérico */}
      <g transform="translate(16 176) rotate(-8 150 92)">
        <rect width="300" height="186" rx="16" fill="#0B2545" />
        <rect width="300" height="186" rx="16" fill="none" stroke="#C9A227" strokeOpacity="0.55" strokeWidth="1.5" />
        <path d="M0 132 L300 96 L300 170 Q300 186 284 186 L16 186 Q0 186 0 170 Z" fill="#13315C" />
        {/* chip */}
        <rect x="26" y="48" width="44" height="34" rx="6" fill="#C9A227" />
        <path d="M26 65 H70 M41 48 V82 M55 48 V82" stroke="#0B2545" strokeOpacity="0.45" strokeWidth="1.5" />
        {/* aproximação */}
        <g fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round">
          <path d="M88 56 Q94 65 88 74" />
          <path d="M96 51 Q105 65 96 79" />
          <path d="M104 46 Q116 65 104 84" />
        </g>
        <text x="26" y="30" fill="#FFFFFF" fontFamily="var(--font-montserrat), sans-serif" fontSize="13" fontWeight="600" letterSpacing="2.6">
          CONTA PJ
        </text>
        <text x="26" y="126" fill="#FFFFFF" fontFamily="var(--font-montserrat), sans-serif" fontSize="17" fontWeight="600" letterSpacing="2">
          •••• •••• •••• 2026
        </text>
        <text x="26" y="160" fill="#FFFFFF" fillOpacity="0.8" fontFamily="var(--font-montserrat), sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.6">
          SUA EMPRESA LTDA
        </text>
        {/* marca genérica: círculos */}
        <circle cx="246" cy="152" r="14" fill="#1E7F5C" />
        <circle cx="266" cy="152" r="14" fill="#C9A227" fillOpacity="0.85" />
      </g>
    </svg>
  );
}

type Props = { id: string; label: string; title: string; intro?: string; dark?: boolean; center?: boolean };

export default function SectionHeading({ id, label, title, intro, dark = false, center = false }: Props) {
  return (
    <div className={`max-w-[46rem] ${center ? "mx-auto text-center" : ""}`}>
      {/* Sobre fundo claro o rótulo fica em azul (o dourado não passa AA em texto); o losango dourado marca o detalhe. */}
      <p className={`eyebrow ${dark ? "text-gold" : "text-navy"} ${center ? "justify-center" : ""}`}>{label}</p>
      <h2 id={id} className={`text-h2 mt-3 ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 ${dark ? "text-white/85" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

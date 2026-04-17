interface CVSectionProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CVSection({ title, children, style }: CVSectionProps) {
  return (
    <section style={style} className="mb-6">
      <h2
        className="text-lg font-bold tracking-tight mb-3 pb-1.5 border-b"
        style={{ color: "var(--cv-ink)", borderColor: "var(--cv-faint)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

interface MonographSectionProps {
  numeral: string;
  title: string;
  children: React.ReactNode;
  headingStyle?: React.CSSProperties;
  first?: boolean;
}

/**
 * Renders the section heading row (§-numeral in rail + title + heavy rule)
 * then a body wrapper containing children that are expected to emit their
 * own grid-aligned rows (MonographRow / MonographJobEntry).
 */
export function MonographSection({
  numeral,
  title,
  children,
  headingStyle,
  first,
}: MonographSectionProps) {
  return (
    <section
      style={{
        marginTop: first ? "40px" : "var(--mono-section-gap)",
      }}
    >
      {/* Heading row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "var(--mono-rail-w) var(--mono-gutter) 1fr",
          alignItems: "baseline",
        }}
      >
        <div
          style={{
            textAlign: "right",
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontStyle: "italic",
            fontSize: "13px",
            color: "var(--mono-accent)",
            letterSpacing: "0.02em",
            ...headingStyle,
          }}
        >
          §&nbsp;{numeral}.
        </div>
        <div aria-hidden />
        <h2
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "20px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--mono-ink)",
            margin: 0,
            ...headingStyle,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Heading rule row (spans the main column only) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "var(--mono-rail-w) var(--mono-gutter) 1fr",
          marginTop: "6px",
        }}
      >
        <div aria-hidden />
        <div aria-hidden />
        <div className="mono-rule-heading" />
      </div>

      {/* Body — children render their own grid-aligned rows */}
      <div style={{ marginTop: "18px" }}>{children}</div>
    </section>
  );
}

/**
 * Generic grid-row wrapper for sections whose body isn't a job entry.
 * Rail content is optional (empty string → empty rail).
 */
interface MonographRowProps {
  rail?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function MonographRow({ rail, children, style }: MonographRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--mono-rail-w) var(--mono-gutter) 1fr",
        alignItems: "baseline",
        ...style,
      }}
    >
      <div
        style={{
          textAlign: "right",
          fontFamily: "'Inter', 'IBM Plex Sans', sans-serif",
          fontSize: "11px",
          color: "var(--mono-muted)",
        }}
      >
        {rail}
      </div>
      <div aria-hidden />
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}


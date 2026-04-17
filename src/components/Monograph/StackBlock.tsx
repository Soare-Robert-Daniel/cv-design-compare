interface StackBlockProps {
  stack: Record<string, string[]>;
  headingStyle?: React.CSSProperties;
}

const categoryOrder = ["backend", "frontend", "databases", "devops", "cloud"];

export function StackBlock({ stack, headingStyle }: StackBlockProps) {
  const entries: Array<[string, string[]]> = [];
  for (const key of categoryOrder) {
    const items = stack[key];
    if (items && items.length > 0) {
      entries.push([key, items]);
    }
  }

  return (
    <div style={{ marginTop: "18px" }}>
      {/* Micro-rule with inline label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            height: "1px",
            background: "var(--mono-ink)",
            width: "18px",
            flexShrink: 0,
          }}
        />
        <span
          className="mono-smallcaps"
          style={{
            fontSize: "10px",
            color: "var(--mono-ink)",
            letterSpacing: "0.22em",
            ...headingStyle,
          }}
        >
          Stack
        </span>
        <span
          style={{
            height: "1px",
            background: "var(--mono-ink)",
            flex: 1,
          }}
        />
      </div>

      {/* Stack table */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr",
          rowGap: "6px",
          columnGap: "16px",
        }}
      >
        {entries.map(([category, items]) => (
          <div key={category} style={{ display: "contents" }}>
            <div
              className="mono-smallcaps"
              style={{
                fontSize: "10px",
                color: "var(--mono-muted)",
                letterSpacing: "0.2em",
                paddingTop: "2px",
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--mono-body)",
                lineHeight: 1.5,
              }}
            >
              {items.join("  ·  ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DropCapProps {
  text: string;
}

export function DropCap({ text }: DropCapProps) {
  if (!text) return null;
  return (
    <p
      className="mono-dropcap-paragraph"
      style={{
        fontSize: "14px",
        lineHeight: 1.6,
        color: "var(--mono-body)",
        maxWidth: "62ch",
        margin: 0,
      }}
    >
      {text}
    </p>
  );
}

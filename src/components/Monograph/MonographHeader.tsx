import type { CVContact } from "../../cv-data";

interface MonographHeaderProps {
  contact: CVContact;
  headingStyle?: React.CSSProperties;
  editionNumber?: string;
}

/**
 * Splits a full name into visually stacked lines.
 * "Soare Robert Daniel" -> ["SOARE", "ROBERT DANIEL"]
 */
function splitName(name: string): string[] {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return [name.toUpperCase()];
  return [parts[0].toUpperCase(), parts.slice(1).join(" ").toUpperCase()];
}

export function MonographHeader({
  contact,
  headingStyle,
  editionNumber = "01",
}: MonographHeaderProps) {
  const nameLines = splitName(contact.name);

  return (
    <header style={{ position: "relative" }}>
      {/* Top edition marker, right-aligned */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "4px",
        }}
      >
        <span
          className="mono-smallcaps mono-tabular"
          style={{
            fontSize: "11px",
            color: "var(--mono-muted)",
            letterSpacing: "0.22em",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: "20px",
              height: "1px",
              background: "var(--mono-muted)",
            }}
          />
          <span>N°&nbsp;{editionNumber}</span>
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: "20px",
              height: "1px",
              background: "var(--mono-muted)",
            }}
          />
        </span>
      </div>

      {/* Display name — stacked */}
      <h1
        style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontWeight: 700,
          fontSize: "76px",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "var(--mono-ink)",
          margin: "14px 0 0 0",
          ...headingStyle,
        }}
      >
        {nameLines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
            {i === nameLines.length - 1 && (
              <span style={{ color: "var(--mono-accent)" }}>.</span>
            )}
          </span>
        ))}
      </h1>

      {/* 40px oxblood accent rule */}
      <div
        aria-hidden
        style={{
          width: "40px",
          height: "2px",
          background: "var(--mono-accent)",
          marginTop: "20px",
        }}
      />

      {/* Role + location small-caps */}
      <p
        className="mono-smallcaps"
        style={{
          fontSize: "12px",
          color: "var(--mono-muted)",
          letterSpacing: "0.18em",
          margin: "16px 0 0 0",
        }}
      >
        {contact.role}
        <span aria-hidden style={{ margin: "0 10px", color: "var(--mono-hair)" }}>
          ·
        </span>
        Based in {contact.location}
      </p>

      {/* Contact row with pipe separators */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "12px",
          fontSize: "13px",
          color: "var(--mono-body)",
          fontFamily: "'IBM Plex Sans', 'Inter', sans-serif",
        }}
      >
        <ContactLink href={`mailto:${contact.email}`} label={contact.email} />
        <Pipe />
        <ContactLink
          href={`https://${contact.website}`}
          label={contact.website}
          external
        />
        <Pipe />
        <ContactLink
          href={`https://${contact.linkedin}`}
          label={contact.linkedin}
          external
        />
      </div>

      {/* Bottom 2px rule */}
      <div
        style={{
          height: "2px",
          background: "var(--mono-ink)",
          marginTop: "28px",
        }}
      />
    </header>
  );
}

function Pipe() {
  return (
    <span
      aria-hidden
      style={{
        color: "var(--mono-muted)",
        margin: "0 12px",
        fontSize: "14px",
        lineHeight: 1,
      }}
    >
      │
    </span>
  );
}

function ContactLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        color: "inherit",
        textDecoration: "none",
        textUnderlineOffset: "3px",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")
      }
    >
      {label}
    </a>
  );
}

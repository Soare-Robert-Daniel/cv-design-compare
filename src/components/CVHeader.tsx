import type { CVContact } from "../cv-data";

interface CVHeaderProps {
  contact: CVContact;
  style?: React.CSSProperties;
}

export function CVHeader({ contact, style }: CVHeaderProps) {
  return (
    <header
      style={{ ...style, borderColor: "var(--cv-faint)" }}
      className="mb-6 pb-5 border-b"
    >
      <h1
        className="text-2xl font-bold tracking-tight leading-none mb-2"
        style={{ color: "var(--cv-ink)" }}
      >
        {contact.name}
      </h1>
      <p className="text-base mb-3" style={{ color: "var(--cv-body)" }}>
        {contact.role}
      </p>
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 text-sm"
        style={{ color: "var(--cv-muted)" }}
      >
        <a
          href={`mailto:${contact.email}`}
          className="hover:underline"
          style={{ color: "var(--cv-body)" }}
        >
          {contact.email}
        </a>
        <span aria-hidden>·</span>
        <a
          href={`https://${contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "var(--cv-body)" }}
        >
          {contact.linkedin}
        </a>
        <span aria-hidden>·</span>
        <a
          href={`https://${contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "var(--cv-body)" }}
        >
          {contact.website}
        </a>
        <span aria-hidden>·</span>
        <span>{contact.location}</span>
      </div>
    </header>
  );
}

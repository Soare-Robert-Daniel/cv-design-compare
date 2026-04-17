import { cvData, type CVData } from "../../cv-data";
import { DropCap } from "./DropCap";
import { MonographFooter } from "./MonographFooter";
import { MonographHeader } from "./MonographHeader";
import { MonographJobEntry } from "./MonographJobEntry";
import { MonographRow, MonographSection } from "./MonographSection";

interface MonographCVProps {
  data?: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
}

export function MonographCV({
  data = cvData,
  headingFont,
  bodyFont,
  scale = 1,
}: MonographCVProps) {
  const headingStyle: React.CSSProperties | undefined = headingFont
    ? { fontFamily: headingFont }
    : undefined;
  const bodyStyle: React.CSSProperties | undefined = bodyFont
    ? { fontFamily: bodyFont }
    : undefined;

  return (
    <article
      className="monograph"
      style={{
        background: "var(--mono-paper)",
        color: "var(--mono-body)",
        borderTop: "4px solid var(--mono-ink)",
        borderRight: "1px solid var(--mono-edge)",
        borderBottom: "1px solid var(--mono-edge)",
        borderLeft: "1px solid var(--mono-edge)",
        position: "relative",
        padding: "40px 20px 36px 20px",
        fontSize: `${14 * scale}px`,
        fontFamily: "'IBM Plex Sans', 'Inter', sans-serif",
        transformOrigin: "top left",
        ...bodyStyle,
      }}
    >

      <MonographHeader contact={data.contact} headingStyle={headingStyle} />

      <MonographSection
        numeral="I"
        title="Summary"
        headingStyle={headingStyle}
        first
      >
        <MonographRow>
          <DropCap text={data.summary} />
        </MonographRow>
      </MonographSection>

      <MonographSection
        numeral="II"
        title="Experience"
        headingStyle={headingStyle}
      >
        {data.experience.map((exp, idx) => (
          <MonographJobEntry
            key={exp.company + exp.period}
            experience={exp}
            first={idx === 0}
            headingStyle={headingStyle}
          />
        ))}
      </MonographSection>

      <MonographSection
        numeral="III"
        title="Education"
        headingStyle={headingStyle}
      >
        {data.education.map((edu, idx) => (
          <EducationEntry
            key={edu.institution + edu.period}
            institution={edu.institution}
            degree={edu.degree}
            period={edu.period}
            first={idx === 0}
            headingStyle={headingStyle}
          />
        ))}
      </MonographSection>

      <MonographFooter name={data.contact.name} />
    </article>
  );
}

/* ------- Education entry (local, mirrors JobEntry minus bullets/stack) ------- */

interface EducationEntryProps {
  institution: string;
  degree: string;
  period: string;
  first?: boolean;
  headingStyle?: React.CSSProperties;
}

function parseEducationPeriod(period: string): string {
  const cleaned = period.replace(/\s*\(.*?\)/, "").trim();
  const parts = cleaned.split(/\s*[-–—]\s*/);
  const extractYear = (s: string): string => {
    const m = s.match(/\b(19|20)\d{2}\b/);
    return m && m[0] ? m[0] : s.toUpperCase();
  };
  const p0 = parts[0] ?? cleaned;
  const p1 = parts[1];
  if (p1 !== undefined) {
    const start = extractYear(p0);
    const end = /present/i.test(p1) ? "PRESENT" : extractYear(p1);
    return `${start}—${end}`;
  }
  return extractYear(cleaned);
}

function splitDegree(degree: string): { badge: string; subject: string } {
  const m = degree.match(/^([^,]+?)(?:'s)?\s+degree(?:\s*,\s*(.+))?$/i);
  if (m && m[1]) {
    const kind = m[1].toLowerCase();
    let badge = kind.toUpperCase();
    if (/master/i.test(kind)) badge = "M.SC.";
    else if (/bachelor/i.test(kind)) badge = "B.SC.";
    else if (/engineer/i.test(kind)) badge = "B.ENG.";
    else if (/phd|doctor/i.test(kind)) badge = "PH.D.";
    return { badge, subject: m[2] ?? "" };
  }
  return { badge: "", subject: degree };
}

function EducationEntry({
  institution,
  degree,
  period,
  first,
  headingStyle,
}: EducationEntryProps) {
  const dateRange = parseEducationPeriod(period);
  const { badge, subject } = splitDegree(degree);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--mono-rail-w) var(--mono-gutter) 1fr",
        marginTop: first ? 0 : "20px",
      }}
    >
      <div aria-hidden />
      <div aria-hidden />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h3
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontWeight: 600,
              fontSize: "14.5px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--mono-ink)",
              margin: 0,
              ...headingStyle,
            }}
          >
            {institution}
          </h3>
          <span className="mono-leader" aria-hidden />
          <span
            className="mono-tabular"
            style={{
              fontFamily: "'Inter', 'IBM Plex Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--mono-ink)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {dateRange}
          </span>
        </div>
        <p
          className="mono-smallcaps"
          style={{
            fontSize: "10.5px",
            color: "var(--mono-muted)",
            margin: "6px 0 0 0",
          }}
        >
          {badge && (
            <>
              {badge}
              {subject && (
                <span
                  aria-hidden
                  style={{ margin: "0 8px", color: "var(--mono-hair)" }}
                >
                  ·
                </span>
              )}
            </>
          )}
          {subject && (
            <span
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontStyle: "italic",
                textTransform: "none",
                letterSpacing: "0.01em",
                fontSize: "12px",
                color: "var(--mono-body)",
              }}
            >
              {subject}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

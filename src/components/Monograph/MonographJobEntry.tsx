import type { CVExperience } from "../../cv-data";
import { StackBlock } from "./StackBlock";

interface MonographJobEntryProps {
  experience: CVExperience;
  first?: boolean;
  headingStyle?: React.CSSProperties;
}

/**
 * Parses a period like "July 2020 - Present (5 years 10 months)"
 * into a 2-line stacked format: [startYear, endYear-or-PRESENT].
 */
function formatDateRange(period: string): string {
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

export function MonographJobEntry({
  experience,
  first,
  headingStyle,
}: MonographJobEntryProps) {
  const dateRange = formatDateRange(experience.period);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--mono-rail-w) var(--mono-gutter) 1fr",
        marginTop: first ? 0 : "var(--mono-entry-gap)",
      }}
    >
      {/* Empty rail — dates moved right */}
      <div aria-hidden />
      <div aria-hidden />

      {/* Main */}
      <div style={{ minWidth: 0 }}>
        {/* Company row with dot-leader + date */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0",
          }}
        >
          <h3
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontWeight: 600,
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--mono-ink)",
              margin: 0,
              whiteSpace: "nowrap",
              ...headingStyle,
            }}
          >
            {experience.company}
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

        {/* Sub-meta: role · location */}
        <p
          className="mono-smallcaps"
          style={{
            fontSize: "10.5px",
            color: "var(--mono-muted)",
            margin: "6px 0 0 0",
          }}
        >
          {experience.role}
          <span aria-hidden style={{ margin: "0 8px", color: "var(--mono-hair)" }}>
            ·
          </span>
          {experience.location}
        </p>

        {/* Responsibilities */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "16px 0 0 0",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {experience.responsibilities.map((r) => (
            <li
              key={r}
              style={{
                fontSize: "13.5px",
                color: "var(--mono-body)",
                lineHeight: 1.55,
                paddingLeft: "20px",
                textIndent: "-20px",
              }}
            >
              <span
                aria-hidden
                style={{
                  color: "var(--mono-accent)",
                  fontWeight: 600,
                  display: "inline-block",
                  width: "20px",
                  textIndent: 0,
                }}
              >
                —
              </span>
              {r}
            </li>
          ))}
        </ul>

        {/* Stack sub-block */}
        <StackBlock stack={experience.techStack} headingStyle={headingStyle} />
      </div>
    </div>
  );
}

import { type CVData } from "../cv-data";
import { Fragment } from "react";

interface BlueprintCVProps {
  data: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
}

const colors = {
  bg: "#102A43",
  bgDark: "#0A1C2E",
  line: "#F0F4F8",
  grid: "#243B53",
  accent: "#82CFFD",
  muted: "#9FB3C8",
  border: "#334E68",
  borderStrong: "#486581",
} as const;

export function BlueprintCV({
  data,
  headingFont,
  bodyFont,
  scale = 1,
}: BlueprintCVProps) {
  const headingStyle: React.CSSProperties = headingFont
    ? { fontFamily: headingFont }
    : { fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" };
  const bodyStyle: React.CSSProperties = bodyFont
    ? { fontFamily: bodyFont }
    : { fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        ...bodyStyle,
        backgroundColor: colors.bg,
        color: colors.line,
        fontSize: `${13 * scale}px`,
        lineHeight: 1.6,
        transformOrigin: "top left",
        fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
      }}
    >
      {/* Subtle Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="bp-grid"
            width={20 * scale}
            height={20 * scale}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${20 * scale} 0 L 0 0 0 ${20 * scale}`}
              fill="none"
              stroke={colors.grid}
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="bp-grid-major"
            width={100 * scale}
            height={100 * scale}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={100 * scale}
              height={100 * scale}
              fill="url(#bp-grid)"
            />
            <path
              d={`M ${100 * scale} 0 L 0 0 0 ${100 * scale}`}
              fill="none"
              stroke={colors.border}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-major)" />
      </svg>

      {/* Drawing Frame */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          border: `2px solid ${colors.borderStrong}`,
          margin: "12px",
          padding: "32px 28px 80px 28px",
          minHeight: "100%",
        }}
      >
        {/* Corner marks */}
        <CornerMark position="top-left" />
        <CornerMark position="top-right" />
        <CornerMark position="bottom-left" />
        <CornerMark position="bottom-right" />

        {/* ===== HEADER ===== */}
        <div style={{ borderBottom: `1px solid ${colors.borderStrong}`, paddingBottom: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1
                style={{
                  ...headingStyle,
                  fontSize: `${28 * scale}px`,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: colors.line,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {data.contact.name}
              </h1>
              <div
                style={{
                  fontSize: `${14 * scale}px`,
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  marginTop: "6px",
                }}
              >
                {data.contact.role}
              </div>
            </div>
            <div
              style={{
                textAlign: "right",
                fontSize: `${10 * scale}px`,
                color: colors.muted,
                lineHeight: 1.8,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <div><span style={{ color: colors.accent }}>REF:</span> CV-{data.contact.name.split(" ").pop()?.toUpperCase()}</div>
              <div><span style={{ color: colors.accent }}>REV:</span> 2026-04</div>
              <div><span style={{ color: colors.accent }}>SCALE:</span> 1:1</div>
            </div>
          </div>

          {/* Contact metadata */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "4px 24px",
              marginTop: "14px",
              fontSize: `${10.5 * scale}px`,
              color: colors.muted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <div><span style={{ color: colors.accent }}>LOC:</span> {data.contact.location}</div>
            <div><span style={{ color: colors.accent }}>NET:</span> {data.contact.website}</div>
            <div><span style={{ color: colors.accent }}>MAIL:</span> {data.contact.email}</div>
            <div><span style={{ color: colors.accent }}>LINK:</span> {data.contact.linkedin.split("/").pop()}</div>
          </div>
        </div>

        {/* ===== SECTION 1.0 — SUMMARY ===== */}
        <BlueprintSection numeral="1.0" title="SYSTEM SUMMARY" headingStyle={headingStyle} scale={scale}>
          <p style={{ color: "rgba(255,255,255,0.85)", margin: 0 }}>
            {data.summary}
          </p>
        </BlueprintSection>

        {/* ===== SECTION 2.0 — EXPERIENCE ===== */}
        <BlueprintSection numeral="2.0" title="OPERATIONAL RECORD" headingStyle={headingStyle} scale={scale}>
          {data.experience.map((exp, idx) => (
            <div key={exp.company + exp.period} style={{ marginTop: idx > 0 ? "20px" : 0 }}>
              {/* Company + Role line */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1px solid ${colors.border}`, paddingBottom: "4px", marginBottom: "8px" }}>
                <div>
                  <span style={{ color: colors.line, fontWeight: 700, fontSize: `${14 * scale}px`, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {exp.company}
                  </span>
                  <span style={{ color: colors.muted, marginLeft: "12px", fontSize: `${11 * scale}px` }}>
                    — {exp.role} @ {exp.location}
                  </span>
                </div>
                <div style={{ fontSize: `${10 * scale}px`, color: colors.accent, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {exp.period.replace(/\s*\(.*?\)/, "").replace(/–/, "—")}
                </div>
              </div>

              {/* Responsibilities */}
              <ul style={{ listStyle: "none", margin: "0 0 12px 0", padding: 0 }}>
                {exp.responsibilities.map((r, i) => (
                  <li key={i} style={{ display: "flex", gap: "8px", marginBottom: "3px", fontSize: `${11.5 * scale}px`, color: "rgba(255,255,255,0.8)" }}>
                    <span style={{ color: colors.muted, flexShrink: 0 }}>&gt;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack — parts list table */}
              <div
                style={{
                  border: `1px solid ${colors.border}`,
                  background: "rgba(0,0,0,0.15)",
                  padding: "8px 12px",
                }}
              >
                <div style={{ fontSize: `${9 * scale}px`, color: colors.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "6px", fontWeight: 600 }}>
                  Bill of Materials (Stack)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "3px 12px", fontSize: `${10.5 * scale}px` }}>
                  {Object.entries(exp.techStack).map(([category, items]) => (
                    <Fragment key={category}>
                      <div style={{ color: colors.muted, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: `${9.5 * scale}px` }}>
                        {category}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.85)" }}>
                        {items.join(" · ")}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </BlueprintSection>

        {/* ===== SECTION 3.0 — EDUCATION ===== */}
        <BlueprintSection numeral="3.0" title="CERTIFICATIONS" headingStyle={headingStyle} scale={scale} last>
          {data.education.map((edu, idx) => (
            <div key={edu.institution + edu.period} style={{ marginTop: idx > 0 ? "14px" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ color: colors.line, fontWeight: 700, fontSize: `${12 * scale}px`, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {edu.institution}
                </span>
                <span style={{ fontSize: `${10 * scale}px`, color: colors.accent, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {edu.period}
                </span>
              </div>
              <div style={{ fontSize: `${11 * scale}px`, color: colors.muted, marginTop: "2px" }}>
                {edu.degree}
              </div>
            </div>
          ))}
        </BlueprintSection>

        {/* ===== TITLE BLOCK ===== */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            background: colors.bgDark,
            border: `1px solid ${colors.borderStrong}`,
            borderRight: "none",
            borderBottom: "none",
            padding: "6px 14px",
            fontSize: `${8.5 * scale}px`,
            color: colors.muted,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            lineHeight: 1.6,
          }}
        >
          <div><span style={{ color: colors.accent }}>DRAWN BY:</span> {data.contact.name.toUpperCase()}</div>
          <div><span style={{ color: colors.accent }}>DATE:</span> 2026-04-17</div>
          <div><span style={{ color: colors.accent }}>SHEET:</span> 1 OF 1</div>
        </div>
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
interface BlueprintSectionProps {
  numeral: string;
  title: string;
  headingStyle: React.CSSProperties;
  scale: number;
  first?: boolean;
  last?: boolean;
  children: React.ReactNode;
}

function BlueprintSection({
  numeral,
  title,
  headingStyle,
  scale,
  first,
  last,
  children,
}: BlueprintSectionProps) {
  return (
    <div
      style={{
        marginTop: first ? 0 : "20px",
        marginBottom: last ? "24px" : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            ...headingStyle,
            fontSize: `${10 * scale}px`,
            fontWeight: 700,
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            background: "rgba(0,0,0,0.2)",
            padding: "2px 8px",
            border: `1px solid ${colors.border}`,
          }}
        >
          SEC. {numeral}
        </span>
        <span
          style={{
            ...headingStyle,
            fontSize: `${12 * scale}px`,
            fontWeight: 700,
            color: colors.line,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {title}
        </span>
        <span
          style={{
            flex: 1,
            height: "1px",
            background: colors.border,
          }}
        />
      </div>
      {children}
    </div>
  );
}

/* ── Corner marks for drawing frame ── */
function CornerMark({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const isTop = position.includes("top");
  const isLeft = position.includes("left");
  const size = 12;

  const style: React.CSSProperties = {
    position: "absolute",
    [isTop ? "top" : "bottom"]: "-1px",
    [isLeft ? "left" : "right"]: "-1px",
    width: `${size}px`,
    height: `${size}px`,
    pointerEvents: "none",
  };

  return (
    <svg style={style} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <line
        x1={isLeft ? 0 : size} y1={isTop ? 0 : size}
        x2={isLeft ? size : 0} y2={isTop ? size : 0}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />
      <line
        x1={isLeft ? size : 0} y1={isTop ? 0 : size}
        x2={isLeft ? size : 0} y2={isTop ? size : 0}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.5"
      />
      <line
        x1={isLeft ? 0 : size} y1={isTop ? size : 0}
        x2={isLeft ? size : 0} y2={isTop ? size : 0}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

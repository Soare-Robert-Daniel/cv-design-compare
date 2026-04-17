import { type CVData } from "../cv-data";

interface TerminalCVProps {
  data: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
  phosphor?: "green" | "amber";
}

// Terminal phosphor colors
const PHOSPHOR = {
  green: {
    bg: "#0a0a0a",
    fg: "#00ff41",
    dim: "#008f11",
    border: "#003b00",
  },
  amber: {
    bg: "#0a0a0a",
    fg: "#ffb000",
    dim: "#b27800",
    border: "#3b2800",
  },
};

export function TerminalCV({
  data,
  headingFont,
  bodyFont,
  scale = 1,
  phosphor = "green",
}: TerminalCVProps) {
  const colors = PHOSPHOR[phosphor];
  const bodyStyle: React.CSSProperties = bodyFont
    ? { fontFamily: bodyFont }
    : { fontFamily: '"IBM Plex Mono", "Fira Code", "SF Mono", monospace' };

  const fontSize = 13 * scale;

  return (
    <div
      style={{
        ...bodyStyle,
        backgroundColor: colors.bg,
        color: colors.fg,
        fontSize: `${fontSize}px`,
        lineHeight: 1.5,
        display: "flex",
        minHeight: "100%",
      }}
    >
      {/* Left Sidebar - Contact */}
      <aside
        style={{
          width: `${220 * scale}px`,
          padding: `${24 * scale}px`,
          borderRight: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          gap: `${20 * scale}px`,
        }}
      >
        {/* Name Header */}
        <div style={{ marginBottom: `${8 * scale}px` }}>
          <div
            style={{
              fontSize: `${18 * scale}px`,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: `${4 * scale}px`,
            }}
          >
            {data.contact.name}
          </div>
          <div style={{ color: colors.dim, fontSize: `${fontSize}px` }}>
            {data.contact.role}
          </div>
        </div>

        {/* Contact Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${6 * scale}px` }}>
          <Field label="LOC" value={data.contact.location} colors={colors} />
          <Field label="MAIL" value={data.contact.email} colors={colors} />
          <Field label="WEB" value={data.contact.website} colors={colors} />
          <Field label="IN" value={data.contact.linkedin.split("/").pop() || data.contact.linkedin} colors={colors} />
        </div>

        {/* Skills */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ color: colors.dim, marginBottom: `${6 * scale}px`, fontSize: `${11 * scale}px` }}>
            SKILLS
          </div>
          <div style={{ fontSize: `${11 * scale}px`, lineHeight: 1.4 }}>
            {data.skills.map((skill, i) => (
              <span key={skill}>
                {skill}
                {i < data.skills.length - 1 && <span style={{ color: colors.dim }}> · </span>}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: `${24 * scale}px` }}>
        {/* Summary */}
        <Section title="SUMMARY" colors={colors} scale={scale} />
        <div style={{ marginBottom: `${20 * scale}px`, color: colors.dim }}>
          {data.summary}
        </div>

        {/* Experience */}
        <Section title="EXPERIENCE" colors={colors} scale={scale} />
        <div style={{ display: "flex", flexDirection: "column", gap: `${16 * scale}px` }}>
          {data.experience.map((exp, idx) => (
            <div key={idx}>
              {/* Company Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: `${4 * scale}px`,
                }}
              >
                <span style={{ fontWeight: 600 }}>{exp.company}</span>
                <span style={{ color: colors.dim, fontSize: `${11 * scale}px` }}>
                  {exp.period}
                </span>
              </div>

              {/* Role & Location */}
              <div
                style={{
                  color: colors.dim,
                  fontSize: `${11 * scale}px`,
                  marginBottom: `${8 * scale}px`,
                }}
              >
                {exp.role} · {exp.location}
              </div>

              {/* Responsibilities */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${2 * scale}px`,
                  marginBottom: `${8 * scale}px`,
                  paddingLeft: `${12 * scale}px`,
                }}
              >
                {exp.responsibilities.slice(0, 5).map((r, i) => (
                  <div key={i} style={{ fontSize: `${12 * scale}px` }}>
                    <span style={{ color: colors.dim }}>- </span>
                    {r}
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: `${8 * scale}px`,
                  fontSize: `${11 * scale}px`,
                }}
              >
                {Object.entries(exp.techStack).map(([cat, items]) => (
                  items.length > 0 && (
                    <span key={cat}>
                      <span style={{ color: colors.dim }}>{cat}:</span>{" "}
                      {items.join(", ")}
                    </span>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <Section title="EDUCATION" colors={colors} scale={scale} style={{ marginTop: `${20 * scale}px` }} />
        <div style={{ display: "flex", flexDirection: "column", gap: `${8 * scale}px` }}>
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontWeight: 500 }}>{edu.institution}</span>
                <span style={{ color: colors.dim, fontSize: `${11 * scale}px` }}>
                  {edu.period}
                </span>
              </div>
              <div style={{ color: colors.dim, fontSize: `${12 * scale}px` }}>
                {edu.degree}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: (typeof PHOSPHOR)["green"];
}) {
  return (
    <div style={{ fontSize: "inherit" }}>
      <span style={{ color: colors.dim, marginRight: "0.5em" }}>{label}</span>
      <span style={{ wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}

function Section({
  title,
  colors,
  scale,
  style,
}: {
  title: string;
  colors: (typeof PHOSPHOR)["green"];
  scale: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        marginBottom: `${10 * scale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${8 * scale}px`,
        ...style,
      }}
    >
      <span style={{ fontWeight: 600, letterSpacing: "0.05em" }}>{title}</span>
      <span style={{ color: colors.border, flex: 1 }}>
        {"─".repeat(20)}
      </span>
    </div>
  );
}

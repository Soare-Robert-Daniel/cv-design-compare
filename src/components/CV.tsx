import { cvData, type CVData } from "../cv-data";
import { CVHeader } from "./CVHeader";
import { CVSection } from "./CVSection";
import { MonographCV } from "./Monograph/MonographCV";
import { TerminalCV } from "./TerminalCV";
import { HardwareCV } from "./HardwareCV";

export type CVVariant = "classic" | "monograph" | "terminal" | "hardware";

interface CVProps {
  data?: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
  variant?: CVVariant;
}

export function CV({
  data = cvData,
  headingFont,
  bodyFont,
  scale = 1,
  variant = "classic",
}: CVProps) {
  if (variant === "monograph") {
    return (
      <MonographCV
        data={data}
        headingFont={headingFont}
        bodyFont={bodyFont}
        scale={scale}
      />
    );
  }
  
  if (variant === "terminal") {
    return (
      <TerminalCV
        data={data}
        headingFont={headingFont}
        bodyFont={bodyFont}
        scale={scale}
      />
    );
  }

  if (variant === "hardware") {
    return (
      <HardwareCV
        data={data}
        headingFont={headingFont}
        bodyFont={bodyFont}
        scale={scale}
      />
    );
  }
  const headingStyle: React.CSSProperties = headingFont
    ? { fontFamily: headingFont }
    : undefined;
  const bodyStyle: React.CSSProperties = bodyFont
    ? { fontFamily: bodyFont }
    : undefined;

  return (
    <div
      className="bg-white p-8 rounded-lg shadow-sm border"
      style={{
        ...bodyStyle,
        color: "var(--cv-body)",
        borderColor: "var(--cv-faint)",
        fontSize: `${14 * scale}px`,
        lineHeight: 1.55,
        transformOrigin: "top left",
      }}
    >
      <CVHeader contact={data.contact} style={headingStyle} />

      <CVSection title="Summary" style={headingStyle}>
        <p style={{ color: "var(--cv-body)" }}>{data.summary}</p>
      </CVSection>

      <CVSection title="Experience" style={headingStyle}>
        {data.experience.map((exp, idx) => (
          <div key={exp.company} className={idx > 0 ? "mt-5" : ""}>
            <div className="flex justify-between items-baseline gap-4 mb-1">
              <h3 className="font-semibold text-base" style={{ color: "var(--cv-ink)" }}>
                {exp.company}
              </h3>
              <span
                className="text-xs whitespace-nowrap tabular-nums"
                style={{ color: "var(--cv-muted)" }}
              >
                {exp.period.replace(/\s*\(.*?\)/, "").replace(/–/, " – ")}
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: "var(--cv-muted)" }}>
              {exp.role} · {exp.location}
            </p>
            <ul className="list-disc list-outside ml-4 space-y-1 mb-4">
              {exp.responsibilities.map((r) => (
                <li key={r} className="text-sm" style={{ color: "var(--cv-body)" }}>
                  {r}
                </li>
              ))}
            </ul>

            <div className="text-sm" style={{ color: "var(--cv-muted)" }}>
              {Object.entries(exp.techStack).map(([category, items], i, arr) => (
                <span key={category}>
                  <span className="capitalize">{category}</span>:{" "}
                  <span style={{ color: "var(--cv-body)" }}>{items.join(", ")}</span>
                  {i < arr.length - 1 && <span className="mx-2">·</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CVSection>

      <CVSection title="Education" style={headingStyle}>
        {data.education.map((edu, idx) => (
          <div key={edu.institution + edu.period} className={idx > 0 ? "mt-3" : ""}>
            <div className="flex justify-between items-baseline gap-4 mb-1">
              <h3 className="font-semibold text-sm" style={{ color: "var(--cv-ink)" }}>
                {edu.institution}
              </h3>
              <span
                className="text-xs whitespace-nowrap tabular-nums"
                style={{ color: "var(--cv-muted)" }}
              >
                {edu.period}
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--cv-body)" }}>
              {edu.degree}
            </p>
          </div>
        ))}
      </CVSection>
    </div>
  );
}

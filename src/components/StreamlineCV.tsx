import React from "react";
import { type CVData } from "../cv-data";

interface StreamlineCVProps {
  data: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
}

export function StreamlineCV({
  data,
  headingFont,
  bodyFont,
  scale = 1,
}: StreamlineCVProps) {
  const headingStyle: React.CSSProperties = headingFont
    ? { fontFamily: headingFont }
    : undefined;
  const bodyStyle: React.CSSProperties = bodyFont
    ? { fontFamily: bodyFont }
    : undefined;

  return (
    <div
      className="p-8 shadow-2xl relative"
      style={{
        ...bodyStyle,
        backgroundColor: "var(--sl-bg)",
        color: "var(--sl-ink)",
        fontSize: `${14 * scale}px`,
        lineHeight: 1.6,
        transformOrigin: "top left",
      }}
    >
      {/* Outer Deco Frame */}
      <div 
        className="absolute inset-4 border-[3px] pointer-events-none z-10" 
        style={{ borderColor: "var(--sl-ink)" }}
      >
        <div 
          className="absolute inset-1 border pointer-events-none" 
          style={{ borderColor: "var(--sl-ink)" }}
        ></div>
        
        {/* Deco Corner Accents */}
        <div className="absolute -top-[5px] -left-[5px] w-4 h-4 bg-[var(--sl-bg)] border-[3px]" style={{ borderColor: "var(--sl-ink)" }}></div>
        <div className="absolute -top-[5px] -right-[5px] w-4 h-4 bg-[var(--sl-bg)] border-[3px]" style={{ borderColor: "var(--sl-ink)" }}></div>
        <div className="absolute -bottom-[5px] -left-[5px] w-4 h-4 bg-[var(--sl-bg)] border-[3px]" style={{ borderColor: "var(--sl-ink)" }}></div>
        <div className="absolute -bottom-[5px] -right-[5px] w-4 h-4 bg-[var(--sl-bg)] border-[3px]" style={{ borderColor: "var(--sl-ink)" }}></div>
      </div>

      <div className="relative z-20 p-8 pt-10">
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="w-full flex justify-center items-center mb-6">
             <div className="h-[2px] flex-1 bg-[var(--sl-ink)] max-w-[100px]"></div>
             <div className="w-3 h-3 rotate-45 border-2 mx-4" style={{ borderColor: "var(--sl-gold)" }}></div>
             <div className="h-[2px] flex-1 bg-[var(--sl-ink)] max-w-[100px]"></div>
          </div>
          
          <h1
            className="text-5xl font-black uppercase tracking-[0.25em] mb-4"
            style={{ ...headingStyle, color: "var(--sl-ink)" }}
          >
            {data.contact.name}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "var(--sl-gold)" }}>
            <span>{data.contact.email}</span>
            <span className="text-[var(--sl-ink)]">◆</span>
            <span>{data.contact.phone}</span>
            <span className="text-[var(--sl-ink)]">◆</span>
            <span>{data.contact.location}</span>
            <span className="text-[var(--sl-ink)]">◆</span>
            <span>{data.contact.website.replace("https://", "")}</span>
          </div>
          
          <div className="w-full flex justify-center items-center mt-6">
             <div className="h-[1px] w-full max-w-[300px] bg-[var(--sl-ink)]"></div>
          </div>
        </header>

        <div className="mb-10 text-center">
          <p className="leading-relaxed max-w-3xl mx-auto font-medium" style={{ color: "var(--sl-muted)" }}>
            {data.summary}
          </p>
        </div>

        <DecoDivider title="Experience" headingStyle={headingStyle} />
        
        <div className="space-y-10 mt-8">
          {data.experience.map((exp) => (
            <div key={exp.company} className="relative">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-2 border-b-2 pb-2" style={{ borderColor: "var(--sl-gold)" }}>
                <h3 className="font-black text-xl uppercase tracking-widest" style={{ ...headingStyle, color: "var(--sl-ink)" }}>
                  {exp.company}
                </h3>
                <span className="text-xs uppercase tracking-[0.15em] font-bold" style={{ color: "var(--sl-gold)" }}>
                  {exp.period.replace(/\s*\(.*?\)/, "").replace(/–/, " – ")}
                </span>
              </div>
              <div className="text-sm uppercase tracking-widest mb-4 font-bold" style={{ ...headingStyle, color: "var(--sl-muted)" }}>
                {exp.role} <span className="mx-2 text-[var(--sl-gold)]">|</span> {exp.location}
              </div>
              
              <ul className="space-y-2 mb-4">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-relaxed">
                    <span className="text-[10px] mt-1.5" style={{ color: "var(--sl-gold)" }}>◆</span>
                    <span style={{ color: "var(--sl-ink)" }}>{r}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-dashed" style={{ borderColor: "var(--sl-border)" }}>
                {Object.entries(exp.techStack).map(([category, items]) => (
                  <div key={category} className="text-[11px] uppercase tracking-wider">
                    <span className="font-bold mr-2" style={{ color: "var(--sl-gold)" }}>{category}:</span>
                    <span className="font-medium" style={{ color: "var(--sl-muted)" }}>{items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <DecoDivider title="Education" headingStyle={headingStyle} />
          
          <div className="space-y-6 mt-8">
            {data.education.map((edu) => (
              <div key={edu.institution} className="flex flex-col md:flex-row justify-between md:items-center p-4 border" style={{ borderColor: "var(--sl-gold)", backgroundColor: "rgba(197, 160, 89, 0.05)" }}>
                <div>
                  <h3 className="font-black text-base uppercase tracking-widest mb-1" style={{ ...headingStyle, color: "var(--sl-ink)" }}>{edu.institution}</h3>
                  <div className="text-[13px] font-bold" style={{ color: "var(--sl-muted)" }}>{edu.degree}</div>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-3">
                  <div className="h-px w-8 bg-[var(--sl-ink)] hidden md:block"></div>
                  <span className="text-xs uppercase tracking-widest font-bold tabular-nums" style={{ color: "var(--sl-gold)" }}>{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DecoDivider({ title, headingStyle }: { title: string; headingStyle?: React.CSSProperties }) {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-[2px] flex-1 bg-[var(--sl-ink)]"></div>
      <div className="h-[1px] w-8 bg-[var(--sl-ink)] hidden sm:block"></div>
      <h2
        className="text-2xl uppercase tracking-[0.2em] font-black px-4 text-center"
        style={{ ...headingStyle, color: "var(--sl-ink)" }}
      >
        {title}
      </h2>
      <div className="h-[1px] w-8 bg-[var(--sl-ink)] hidden sm:block"></div>
      <div className="h-[2px] flex-1 bg-[var(--sl-ink)]"></div>
    </div>
  );
}

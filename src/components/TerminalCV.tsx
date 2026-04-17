import { type CVData } from "../cv-data";

interface TerminalCVProps {
  data: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
}

export function TerminalCV({
  data,
  headingFont,
  bodyFont,
  scale = 1,
}: TerminalCVProps) {
  const headingStyle: React.CSSProperties = headingFont
    ? { fontFamily: headingFont }
    : { fontFamily: 'monospace' };
  const bodyStyle: React.CSSProperties = bodyFont
    ? { fontFamily: bodyFont }
    : { fontFamily: 'monospace' };

  return (
    <div
      className="p-8 rounded-lg shadow-sm border overflow-hidden relative"
      style={{
        ...bodyStyle,
        backgroundColor: "#050505",
        color: "#33ff00",
        borderColor: "#33ff00",
        fontSize: `${14 * scale}px`,
        lineHeight: 1.6,
        transformOrigin: "top left",
        textShadow: "0 0 5px rgba(51, 255, 0, 0.4)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500 via-transparent to-transparent"></div>
      
      {/* Header */}
      <div className="mb-8 border-b-2 border-dashed border-[#33ff00] pb-6">
        <div style={headingStyle} className="text-4xl font-bold mb-2 uppercase tracking-wider">
          {data.contact.name}
        </div>
        <div className="text-xl mb-4 opacity-90">
          <span className="opacity-50">~%</span> {data.contact.role}
        </div>
        <div className="flex flex-col gap-1 text-sm opacity-80">
          <div><span className="opacity-50">USR:</span> {data.contact.email}</div>
          <div><span className="opacity-50">LOC:</span> {data.contact.location}</div>
          <div><span className="opacity-50">NET:</span> {data.contact.website} | {data.contact.linkedin}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <div style={headingStyle} className="text-xl font-bold mb-3 uppercase flex items-center gap-2">
          <span className="opacity-50 text-sm">root@sys:~#</span> cat summary.txt
        </div>
        <p className="pl-4 border-l border-[#33ff00] opacity-90 leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <div style={headingStyle} className="text-xl font-bold mb-4 uppercase flex items-center gap-2">
          <span className="opacity-50 text-sm">root@sys:~#</span> ./run_experience.sh
        </div>
        <div className="space-y-6 pl-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-bold text-lg">[{exp.company}]</div>
                <div className="text-xs opacity-70">uptime: {exp.period}</div>
              </div>
              <div className="text-sm opacity-90 mb-2 italic">
                role: {exp.role} @ {exp.location}
              </div>
              <ul className="list-none space-y-1 mb-3 opacity-80 text-sm">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="opacity-50">{'>'}</span> <span>{r}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-xs opacity-70 border border-[#33ff00] p-3 rounded bg-[#33ff00]/5">
                <div className="mb-2 font-bold uppercase underline">System Config (Stack):</div>
                {Object.entries(exp.techStack).map(([category, items]) => (
                  <div key={category} className="flex gap-2 mb-1">
                    <span className="w-24 uppercase font-bold">{category}:</span>
                    <span>{items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <div style={headingStyle} className="text-xl font-bold mb-4 uppercase flex items-center gap-2">
          <span className="opacity-50 text-sm">root@sys:~#</span> tail -f education.log
        </div>
        <div className="space-y-4 pl-4 border-l border-[#33ff00] border-dashed">
          {data.education.map((edu, idx) => (
            <div key={idx} className="relative pl-4">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-[#33ff00]"></div>
              <div className="font-bold">sys.edu.{edu.institution.replace(/\s+/g, "_").toLowerCase()}</div>
              <div className="text-sm opacity-90">{edu.degree}</div>
              <div className="text-xs opacity-70">{edu.period}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t-2 border-dashed border-[#33ff00] text-center opacity-50 text-xs flex items-center justify-center gap-2">
        <span className="animate-pulse w-2 h-4 bg-[#33ff00] inline-block"></span> SYSTEM HALTED.
      </div>
    </div>
  );
}

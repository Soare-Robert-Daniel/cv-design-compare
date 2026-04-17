import { type CVData } from "../cv-data";

interface HardwareCVProps {
  data: CVData;
  headingFont?: string;
  bodyFont?: string;
  scale?: number;
}

export function HardwareCV({
  data,
  headingFont,
  bodyFont,
  scale = 1,
}: HardwareCVProps) {
  const headingStyle: React.CSSProperties = headingFont
    ? { fontFamily: headingFont }
    : undefined;
  const bodyStyle: React.CSSProperties = bodyFont
    ? { fontFamily: bodyFont }
    : undefined;

  return (
    <div
      className="p-8 shadow-md border-4 border-b-8 border-r-8 relative overflow-hidden"
      style={{
        ...bodyStyle,
        backgroundColor: "#f4f1e1", // Computer Beige plastic (lighter)
        borderColor: "#e0dcd0", // Shadowed edge of plastic casing
        color: "#222222",
        fontSize: `${14 * scale}px`,
        lineHeight: 1.5,
        transformOrigin: "top left",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Spec Sticker Header */}
      <div 
        className="mb-10 p-5 border-4 border-[#111] relative shadow-[2px_2px_0px_#111] rotate-[1deg]"
        style={{ backgroundColor: "#ffcc00" }}
      >
        <div className="absolute top-2 right-2 text-[10px] font-bold tracking-widest opacity-50 uppercase">
          [ SERIAL NO. 847-B ]
        </div>
        <h1 
          style={headingStyle} 
          className="text-4xl font-extrabold uppercase tracking-tight mb-2 text-[#111]"
        >
          {data.contact.name}
        </h1>
        <div className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-[#111] pb-2 inline-block">
          {data.contact.role}
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold uppercase tracking-wider mt-2">
          <div className="flex justify-between border-b border-[#111]/30 pb-1">
            <span className="opacity-60">LOC:</span>
            <span>{data.contact.location}</span>
          </div>
          <div className="flex justify-between border-b border-[#111]/30 pb-1">
            <span className="opacity-60">MAIL:</span>
            <span className="lowercase">{data.contact.email}</span>
          </div>
          <div className="flex justify-between border-b border-[#111]/30 pb-1">
            <span className="opacity-60">WEB:</span>
            <span className="lowercase">{data.contact.website}</span>
          </div>
          <div className="flex justify-between border-b border-[#111]/30 pb-1">
            <span className="opacity-60">NET:</span>
            <span className="lowercase">{data.contact.linkedin.split('/').pop()}</span>
          </div>
        </div>
      </div>

      {/* Ventilation Grille Divider */}
      <div className="flex gap-2 mb-8 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-6 w-2 bg-[#111] rounded-full shadow-inner"></div>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-10 relative">
        <h2 style={headingStyle} className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-[#111] flex items-center gap-3">
          <span className="bg-[#111] text-[#f4f1e1] px-2 py-0.5 rounded-sm">FIG 1.0</span> 
          System Summary
        </h2>
        <div className="bg-[#ebe8d8] p-5 rounded shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] border border-[#e0dcd0]">
          <p className="text-base font-medium leading-relaxed">
            {data.summary}
          </p>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-10 relative">
        <h2 style={headingStyle} className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-[#111] flex items-center gap-3">
          <span className="bg-[#111] text-[#f4f1e1] px-2 py-0.5 rounded-sm">FIG 2.0</span> 
          Operational History
        </h2>
        
        <div className="border-t-4 border-[#111]">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="border-b border-[#111] py-6 grid grid-cols-[1fr_2fr] gap-8">
              {/* Left Column: Metadata */}
              <div>
                <h3 className="text-xl font-extrabold uppercase mb-1">{exp.company}</h3>
                <div className="text-sm font-bold opacity-70 mb-2 uppercase">{exp.role}</div>
                <div className="relative mt-4 p-1.5 bg-[#e5e7eb] border-2 border-[#111] shadow-[2px_2px_0px_#111] w-fit">
                  <div className="absolute top-1 left-1 w-1 h-1 rounded-full border border-[#111] bg-[#9ca3af]"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 rounded-full border border-[#111] bg-[#9ca3af]"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full border border-[#111] bg-[#9ca3af]"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full border border-[#111] bg-[#9ca3af]"></div>
                  
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 px-2 py-0.5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#111]/70 flex items-center">Active Cycle</div>
                    <div className="text-[12px] font-mono font-bold text-[#111] whitespace-nowrap">{exp.period.split('(')[0].trim()}</div>
                    
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#111]/70 flex items-center mt-1">Site</div>
                    <div className="text-[12px] font-mono font-bold text-[#111] uppercase mt-1">{exp.location}</div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Details */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3 border-b-2 border-[#111] pb-1 inline-block">
                  Operations Performed
                </div>
                <ul className="space-y-2 mb-6">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug">
                      <span className="font-bold opacity-40">++</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-[#e8eff5] p-4 rounded-sm border-2 border-[#111] shadow-[2px_2px_0px_#111]">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-3">Hardware / Stack Dependencies</div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(exp.techStack).map(([category, items]) => (
                      <div key={category}>
                        <div className="text-[9px] font-bold uppercase tracking-wider opacity-60 mb-1">{category}</div>
                        <div className="text-xs font-semibold leading-tight">{items.join(", ")}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6 relative">
        <h2 style={headingStyle} className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-[#111] flex items-center gap-3">
          <span className="bg-[#111] text-[#f4f1e1] px-2 py-0.5 rounded-sm">FIG 3.0</span> 
          Manufacturing Origin
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          {data.education.map((edu, idx) => (
            <div key={idx} className="bg-[#ebe8d8] p-5 rounded border border-[#e0dcd0] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)] relative">
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#111] opacity-20 shadow-inner"></div>
              <h3 className="font-extrabold text-sm uppercase leading-snug mb-2 pr-6">
                {edu.institution}
              </h3>
              <div className="text-sm font-medium mb-3 pb-3 border-b border-[#111]/20">
                {edu.degree}
              </div>
              <div className="text-xs font-bold font-mono tracking-wider opacity-60">
                DATE: {edu.period}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Vent */}
      <div className="flex gap-2 mt-12 opacity-20 justify-end">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-6 w-2 bg-[#111] rounded-full shadow-inner"></div>
        ))}
      </div>
    </div>
  );
}

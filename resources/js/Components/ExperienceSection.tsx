import React from "react";
import { EXPERIENCE_TIMELINE } from "../types";
import { Award, Star, Calendar, ArrowUpRight } from "lucide-react";
import TypewriterHeading from "./TypewriterHeading";

export default function ExperienceSection() {
  const getGoogleColorHex = (color: string) => {
    switch (color) {
      case "blue": return "#4285F4";
      case "red": return "#EA4335";
      case "yellow": return "#FBBC05";
      case "green": return "#34A853";
      default: return "#000000";
    }
  };

  const getShadowStyle = (color: string) => {
    switch (color) {
      case "blue": return "pixel-shadow-blue";
      case "red": return "pixel-shadow-red";
      case "yellow": return "pixel-shadow-yellow";
      case "green": return "pixel-shadow-green";
      default: return "pixel-shadow";
    }
  };

  return (
    <section id="experience" className="py-16 bg-[#F8F9FA] border-b-4 border-black">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white pixel-border px-6 py-2.5 mb-3 pixel-shadow-sm">
            <TypewriterHeading 
              text="🕹️ QUESTS & EXPERIENCE STAGES" 
              className="font-pixel text-xs sm:text-sm text-black tracking-widest justify-center" 
              speed={40} 
            />
          </div>
          <p className="text-xs font-mono text-gray-500 max-w-md mx-auto">
            Perjalanan karir dan riwayat organisasi yang ditata berdasarkan Level Game dari pencapaian terdahulu hingga sekarang.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-4 border-black ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-12 pb-4">
          {EXPERIENCE_TIMELINE.map((exp, idx) => {
            const hexColor = getGoogleColorHex(exp.color);
            const isLatest = idx === 0;

            return (
              <div key={exp.level} className="relative group">
                {/* Level Node Flag */}
                <div
                  className="absolute -left-[45px] sm:-left-[61px] top-1.5 w-10 h-10 sm:w-12 sm:h-12 bg-white pixel-border flex flex-col items-center justify-center transition-transform group-hover:scale-110 z-10"
                  style={{
                    borderColor: "#000000",
                    boxShadow: "3px 3px 0px #000000"
                  }}
                >
                  <span className="text-[6px] font-pixel text-gray-400">LVL</span>
                  <span className="text-xs sm:text-sm font-pixel text-black font-bold leading-none">{exp.level}</span>
                </div>

                {/* Experience Card */}
                <div
                  className={`bg-white pixel-border p-5 sm:p-6 transition-all duration-150 ${getShadowStyle(exp.color)} hover:-translate-y-1`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-dashed border-gray-300 pb-3 mb-4">
                    <div>
                      <span className="text-[7px] font-pixel text-[#4285F4] block mb-1">
                        {isLatest ? "⭐ CURRENT CAMPAIGN" : "✔ STAGE CLEARED"}
                      </span>
                      <h3 className="text-sm font-pixel text-gray-900 leading-none">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-bold text-gray-600 mt-1 font-sans flex items-center gap-1">
                        {exp.organization}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 border-2 border-black px-2 py-1 self-start sm:self-center">
                      <Calendar size={12} className="text-black" />
                      <span className="text-[9px] font-mono font-bold tracking-tight text-gray-800">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Bullet List */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                        {/* Custom 8-bit arrow indicator */}
                        <span className="text-[10px] text-gray-400 select-none mt-0.5 font-pixel">▶</span>
                        <span className="font-sans leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Loot reward badges */}
                  <div className="flex flex-wrap gap-2 items-center pt-3 border-t border-gray-100">
                    <span className="text-[8px] font-pixel text-gray-400">STAGE REWARDS:</span>
                    <span className="bg-blue-50 text-blue-700 text-[8px] font-pixel px-2 py-1 pixel-border-sm border-blue-200">
                      +EXP DESAIN
                    </span>
                    <span className="bg-green-50 text-green-700 text-[8px] font-pixel px-2 py-1 pixel-border-sm border-green-200">
                      +KOLABORASI
                    </span>
                    {exp.level === 3 && (
                      <span className="bg-purple-50 text-purple-700 text-[8px] font-pixel px-2 py-1 pixel-border-sm border-purple-200">
                        +UIUX SPELLS
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

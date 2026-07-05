import React from "react";
import { PROJECTS_LIST } from "../types";
import { ExternalLink, Github, Gamepad2 } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import TypewriterHeading from "./TypewriterHeading";

export default function ProjectsSection() {
  const { playHoverSound, playClickSound } = useAudio();

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
    <section id="projects" className="py-20 bg-white border-b-4 border-black relative overflow-hidden">
      {/* Background Pixel Grid */}
      <div className="absolute inset-0 pixel-grid-bg opacity-50 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-black px-6 py-3 mb-4 pixel-border-sm pixel-shadow-sm">
            <TypewriterHeading 
              text="ARCADE ROOM: PROJECTS" 
              icon={<Gamepad2 size={16} className="text-[#FBBC05] animate-pulse" />}
              className="font-pixel text-xs sm:text-sm text-white tracking-widest justify-center uppercase"
              speed={40}
            />
          </div>
          <p className="text-xs font-mono text-gray-600 max-w-xl mx-auto">
            Kumpulan *"Game Cartridge"* yang berisi karya-karya terbaik dari perjalanan karir saya di dunia pengembangan digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS_LIST.map((project) => (
            <div 
              key={project.id}
              className={`bg-white pixel-border flex flex-col transition-transform duration-200 hover:-translate-y-2 group ${getShadowStyle(project.imageColor)}`}
            >
              {/* Project Image Placeholder / Cartridge Art */}
              <div 
                className="h-40 border-b-4 border-black relative overflow-hidden flex items-center justify-center p-2"
                style={{ backgroundColor: getGoogleColorHex(project.imageColor) }}
              >
                {/* Simulated game cartridge art */}
                <div className="w-full h-full border-2 border-black/30 bg-black/10 flex items-center justify-center relative">
                   <div className="absolute top-2 left-2 flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                      <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                   </div>
                   <h3 className="font-pixel text-white text-[10px] text-center tracking-widest leading-loose opacity-90 drop-shadow-md">
                     {project.title.toUpperCase()}
                   </h3>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-pixel text-[11px] text-gray-900 mb-3 leading-snug uppercase">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-gray-600 mb-5 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-1.5 py-0.5 bg-gray-100 border-2 border-gray-300 text-[8px] font-pixel text-gray-600"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t-2 border-dashed border-gray-200 mt-auto">
                  <a
                    href={project.demoUrl}
                    onClick={(e) => {
                      playClickSound();
                      if (project.demoUrl === "#") {
                        e.preventDefault();
                        alert(`Demo untuk "${project.title}" belum tersedia saat ini.`);
                      }
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex-1 pixel-btn-blue text-[8px] font-pixel text-center py-2 flex justify-center items-center gap-1.5"
                  >
                    <ExternalLink size={10} /> PLAY DEMO
                  </a>
                  <a
                    href={project.githubUrl}
                    onClick={(e) => {
                      playClickSound();
                      if (project.githubUrl === "#") {
                        e.preventDefault();
                        alert(`Source code "${project.title}" bersifat privat atau belum dipublikasikan.`);
                      }
                    }}
                    onMouseEnter={playHoverSound}
                    className="w-10 pixel-btn-white text-[8px] font-pixel flex justify-center items-center py-2"
                    title="View Source Code"
                  >
                    <Github size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

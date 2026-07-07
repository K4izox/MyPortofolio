import React, { useState } from "react";
import { EDUCATION_LIST, CERTIFICATES_LIST, Certificate } from "../types";
import { GraduationCap, Award, Star, BookOpen } from "lucide-react";
import TypewriterHeading from "./TypewriterHeading";
import CrtModal from "./CrtModal";

export default function EducationSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="education" className="py-16 bg-white border-b-4 border-black pixel-grid-bg">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white pixel-border px-6 py-2.5 mb-3 pixel-shadow-sm">
            <TypewriterHeading 
              text="🏫 EDUCATION ACADEMY" 
              className="font-pixel text-xs sm:text-sm text-black tracking-widest justify-center uppercase"
              speed={40}
            />
          </div>
          <p className="text-xs font-mono text-gray-500 max-w-md mx-auto">
            Lembaga pendidikan formal tempat saya mengumpulkan ilmu dasar dan spesialisasi keahlian siber.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION_LIST.map((edu, idx) => {
            const isPresUniv = idx === 0;
            return (
              <div
                key={idx}
                className="bg-white pixel-border p-6 flex flex-col justify-between transition-all duration-150 relative overflow-hidden group hover:-translate-y-1"
                style={{
                  boxShadow: isPresUniv ? "6px 6px 0px #4285F4" : "6px 6px 0px #34A853",
                }}
              >
                {/* Decorative Pixel Ribbon for outstanding GPA */}
                <div
                  className={`absolute -top-1 -right-1 px-4 py-1 text-[7px] font-pixel text-white border-b-4 border-l-4 border-black rotate-0 z-10 ${
                    isPresUniv ? "bg-[#4285F4]" : "bg-[#34A853]"
                  }`}
                >
                  HIGH SCORE
                </div>

                {/* Main Content */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-10 h-10 pixel-border-sm flex items-center justify-center text-white ${
                        isPresUniv ? "bg-[#4285F4]" : "bg-[#34A853]"
                      }`}
                    >
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-pixel text-black tracking-wide leading-tight uppercase">
                        {edu.institution}
                      </h3>
                      <p className="text-[9px] font-mono font-bold text-gray-500 mt-0.5">
                        {edu.period}
                      </p>
                    </div>
                  </div>

                  <div className="border-b-2 border-dashed border-gray-200 pb-3 mb-3">
                    <p className="text-xs font-semibold text-gray-800 font-sans">
                      {edu.degree}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium mb-6">
                    {edu.details}
                  </p>
                </div>

                {/* Score Stats Badge and Optional Certificate Button */}
                <div className="flex flex-col gap-2 mt-auto">
                  <div className="bg-gray-100 border-2 border-black p-3 flex items-center justify-between font-mono text-xs">
                    <span className="text-gray-500 font-bold flex items-center gap-1 uppercase">
                      <Star size={12} className="text-[#FBBC05] fill-[#FBBC05]" /> INT SCORE:
                    </span>
                    <span className="text-black font-extrabold">{edu.score}</span>
                  </div>

                  {/* Multiple Certificates */}
                  {edu.certificateIds && edu.certificateIds.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-2">
                      {edu.certificateIds.map((certId, i) => {
                        const certInfo = CERTIFICATES_LIST.find(c => c.id === certId);
                        return (
                          <button
                            key={certId}
                            onClick={() => {
                              if (certInfo) setSelectedCert(certInfo);
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 text-[9px] font-pixel px-3 py-2 pixel-border-sm transition-colors active:translate-y-[1px]"
                          >
                            <Award size={10} className="text-yellow-400" />
                            VIEW CERT: {certInfo?.title.substring(0, 15)}...
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      <CrtModal 
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title || ""}
        description={selectedCert?.description}
        imageUrl={selectedCert?.imageUrl}
        pdfUrl={selectedCert?.pdfUrl}
        badgeType={selectedCert?.badgeType}
      />
    </section>
  );
}

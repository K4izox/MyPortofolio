import React, { useState } from "react";
import { CERTIFICATES_LIST, Certificate } from "../types";
import { Award, ShieldAlert, Sparkles, BookOpen, Layers } from "lucide-react";
import TypewriterHeading from "./TypewriterHeading";
import { useAudio } from "../hooks/useAudio";
import CrtModal from "./CrtModal";

export default function CertificatesSection() {
  const [filter, setFilter] = useState<"all" | "aws" | "google" | "ibm" | "others">("all");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const { playHoverSound, playClickSound } = useAudio();

  const filteredCerts = CERTIFICATES_LIST.filter((cert) => {
    if (filter === "all") return true;
    if (filter === "aws") return cert.issuer.toLowerCase().includes("aws");
    if (filter === "google") return cert.issuer.toLowerCase().includes("google");
    if (filter === "ibm") return cert.issuer.toLowerCase().includes("ibm");
    if (filter === "others") {
      const issuer = cert.issuer.toLowerCase();
      return !issuer.includes("aws") && !issuer.includes("google") && !issuer.includes("ibm");
    }
    return true;
  });

  // Returns beautiful inline pixel badge SVGs based on tier
  const renderPixelBadge = (type: Certificate["badgeType"]) => {
    switch (type) {
      case "diamond":
        return (
          <svg width="32" height="32" viewBox="0 0 16 16" className="image-rendering-pixelated">
            <path d="M7,0 h2 v2 h-2 z" fill="#000000" />
            <path d="M5,2 h2 v2 h-2 z" fill="#000000" />
            <path d="M9,2 h2 v2 h-2 z" fill="#000000" />
            <path d="M3,4 h2 v2 h-2 z" fill="#000000" />
            <path d="M11,4 h2 v2 h-2 z" fill="#000000" />
            <path d="M1,6 h2 v2 h-2 z" fill="#000000" />
            <path d="M13,6 h2 v2 h-2 z" fill="#000000" />
            <path d="M3,8 h2 v2 h-2 z" fill="#000000" />
            <path d="M11,8 h2 v2 h-2 z" fill="#000000" />
            <path d="M5,10 h2 v2 h-2 z" fill="#000000" />
            <path d="M9,10 h2 v2 h-2 z" fill="#000000" />
            <path d="M7,12 h2 v2 h-2 z" fill="#000000" />
            {/* Core colors (glowing blue diamond) */}
            <path d="M7,2 h2 v2 h-2 z" fill="#FFFFFF" />
            <path d="M5,4 h6 v2 h-6 z" fill="#67E8F9" />
            <path d="M3,6 h10 v2 h-10 z" fill="#22D3EE" />
            <path d="M5,8 h6 v2 h-6 z" fill="#06B6D4" />
            <path d="M7,10 h2 v2 h-2 z" fill="#0891B2" />
          </svg>
        );
      case "gold":
        return (
          <svg width="32" height="32" viewBox="0 0 16 16" className="image-rendering-pixelated">
            <path d="M5,1 h6 v2 h-6 z" fill="#000000" />
            <path d="M3,3 h2 v2 h-2 z" fill="#000000" />
            <path d="M11,3 h2 v2 h-2 z" fill="#000000" />
            <path d="M1,5 h2 v6 h-2 z" fill="#000000" />
            <path d="M13,5 h2 v6 h-2 z" fill="#000000" />
            <path d="M3,11 h2 v2 h-2 z" fill="#000000" />
            <path d="M11,11 h2 v2 h-2 z" fill="#000000" />
            <path d="M5,13 h6 v2 h-6 z" fill="#000000" />
            {/* Core gold medal fill */}
            <path d="M5,3 h6 v2 h-6 z" fill="#FDE047" />
            <path d="M3,5 h10 v6 h-10 z" fill="#FACC15" />
            <path d="M5,11 h6 v2 h-6 z" fill="#CA8A04" />
            {/* Star reflection inside */}
            <rect x="7" y="6" width="2" height="4" fill="#FFFFFF" />
            <rect x="6" y="7" width="4" height="2" fill="#FFFFFF" />
          </svg>
        );
      case "silver":
        return (
          <svg width="32" height="32" viewBox="0 0 16 16" className="image-rendering-pixelated">
            <path d="M4,2 h8 v2 h-8 z" fill="#000000" />
            <path d="M2,4 h2 v8 h-2 z" fill="#000000" />
            <path d="M12,4 h2 v8 h-2 z" fill="#000000" />
            <path d="M4,12 h8 v2 h-8 z" fill="#000000" />
            {/* Shield shape core */}
            <path d="M4,4 h8 v4 h-8 z" fill="#E5E7EB" />
            <path d="M4,8 h8 v2 h-8 z" fill="#D1D5DB" />
            <path d="M6,10 h4 v2 h-4 z" fill="#9CA3AF" />
            {/* Central icon reflection */}
            <rect x="7" y="6" width="2" height="3" fill="#FFFFFF" />
          </svg>
        );
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 16 16" className="image-rendering-pixelated">
            <path d="M5,2 h6 v2 h-6 z" fill="#000000" />
            <path d="M3,4 h2 v8 h-2 z" fill="#000000" />
            <path d="M11,4 h2 v8 h-2 z" fill="#000000" />
            <path d="M5,12 h6 v2 h-6 z" fill="#000000" />
            {/* Bronze coin fill */}
            <path d="M5,4 h6 v8 h-6 z" fill="#D97706" />
            {/* Reflection */}
            <rect x="6" y="6" width="4" height="4" fill="#F59E0B" />
          </svg>
        );
    }
  };

  const getTierBadgeStyles = (tier: Certificate["badgeType"]) => {
    switch (tier) {
      case "diamond":
        return "bg-cyan-50 border-cyan-300 text-cyan-800";
      case "gold":
        return "bg-yellow-50 border-yellow-300 text-yellow-800";
      case "silver":
        return "bg-slate-100 border-slate-300 text-slate-800";
      default:
        return "bg-amber-50 border-amber-300 text-amber-800";
    }
  };

  return (
    <section id="certificates" className="py-16 bg-[#F8F9FA] border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-white pixel-border px-6 py-2.5 mb-3 pixel-shadow-sm">
            <TypewriterHeading 
              text="🏆 ACHIEVEMENTS & CERTIFICATES" 
              className="font-pixel text-xs sm:text-sm text-black tracking-widest justify-center uppercase"
              speed={40}
            />
          </div>
          <p className="text-xs font-mono text-gray-500 max-w-md mx-auto">
            Sertifikasi industri profesional yang berhasil diselesaikan dan didokumentasikan sebagai Pencapaian Badge Game.
          </p>
        </div>

        {/* Filter Category Switches */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-[8px] font-pixel transition-all ${
              filter === "all"
                ? "bg-[#4285F4] text-white pixel-border-sm translate-y-0.5"
                : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
            }`}
            style={{ boxShadow: filter === "all" ? "0px 0px 0px" : "2px 2px 0px #000" }}
          >
            ALL ACHIEVEMENTS
          </button>
          <button
            onClick={() => setFilter("google")}
            className={`px-3 py-1.5 text-[8px] font-pixel transition-all ${
              filter === "google"
                ? "bg-[#34A853] text-white pixel-border-sm translate-y-0.5"
                : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
            }`}
            style={{ boxShadow: filter === "google" ? "0px 0px 0px" : "2px 2px 0px #000" }}
          >
            GOOGLE CERTIFIED
          </button>
          <button
            onClick={() => setFilter("aws")}
            className={`px-3 py-1.5 text-[8px] font-pixel transition-all ${
              filter === "aws"
                ? "bg-[#FBBC05] text-black pixel-border-sm translate-y-0.5"
                : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
            }`}
            style={{ boxShadow: filter === "aws" ? "0px 0px 0px" : "2px 2px 0px #000" }}
          >
            AWS SECURITY
          </button>
          <button
            onClick={() => setFilter("ibm")}
            className={`px-3 py-1.5 text-[8px] font-pixel transition-all ${
              filter === "ibm"
                ? "bg-[#EA4335] text-white pixel-border-sm translate-y-0.5"
                : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
            }`}
            style={{ boxShadow: filter === "ibm" ? "0px 0px 0px" : "2px 2px 0px #000" }}
          >
            IBM COGNITIVE
          </button>
          <button
            onClick={() => setFilter("others")}
            className={`px-3 py-1.5 text-[8px] font-pixel transition-all ${
              filter === "others"
                ? "bg-purple-600 text-white pixel-border-sm translate-y-0.5"
                : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
            }`}
            style={{ boxShadow: filter === "others" ? "0px 0px 0px" : "2px 2px 0px #000" }}
          >
            OTHERS
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const isLatest = cert.year === "2026";
            return (
              <div
                key={cert.id}
                onClick={() => {
                  playClickSound();
                  setSelectedCert(cert);
                }}
                onMouseEnter={playHoverSound}
                className="bg-white pixel-border p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-150 pixel-shadow cursor-pointer"
              >
                {/* Badge Visual and Title */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    {/* Retro Pixel Badge */}
                    <div className="flex-shrink-0 animate-coin">
                      {renderPixelBadge(cert.badgeType)}
                    </div>

                    {/* Badge metadata */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[7px] font-mono font-bold bg-black text-white px-1.5 py-0.5 pixel-border-sm select-none">
                        YEAR: {cert.year}
                      </span>
                      <span
                        className={`text-[6px] font-pixel px-1.5 py-0.5 border border-black uppercase select-none ${getTierBadgeStyles(
                          cert.badgeType
                        )}`}
                      >
                        {cert.badgeType} Lvl
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs font-pixel text-gray-900 tracking-wider leading-relaxed mb-2 uppercase">
                    {cert.title}
                  </h3>
                </div>

                {/* Badge Issuer */}
                <div className="mt-4 pt-3 border-t border-dashed border-gray-300">
                  <span className="text-[7px] font-pixel text-gray-400 block mb-1">PROUD ISSUER:</span>
                  <p className="text-[10px] font-mono font-bold text-gray-700 leading-snug">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCerts.length === 0 && (
          <div className="bg-white pixel-border p-12 text-center pixel-shadow">
            <p className="font-pixel text-[10px] text-gray-400 mb-2">No badges unlocked in this slot.</p>
            <p className="text-xs font-sans text-gray-500">Pilih kategori pencapaian lain di atas.</p>
          </div>
        )}
      </div>

      {/* Retro CRT Modal for Certificate Detail */}
      <CrtModal 
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title || ""}
        description={selectedCert?.description}
        imageUrl={selectedCert?.imageUrl}
        badgeType={selectedCert?.badgeType}
      />
    </section>
  );
}

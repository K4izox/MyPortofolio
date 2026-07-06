import React, { useEffect } from "react";
import { X, Image as ImageIcon, ShieldAlert } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useAudio } from "../hooks/useAudio";

interface CrtModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  imageUrl?: string;
  pdfUrl?: string;
  badgeType?: string; // for certificates
}

export default function CrtModal({ isOpen, onClose, title, description, imageUrl, pdfUrl, badgeType }: CrtModalProps) {
  const { playClickSound } = useAudio();
  const { displayedText } = useTypewriter(description || "", 30);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
        onClick={handleClose}
      ></div>

      {/* Modal Content - CRT Monitor Container */}
      <div className="relative w-full max-w-2xl bg-[#111] pixel-border shadow-[0_0_30px_rgba(0,0,0,0.8)] border-4 border-[#333] animate-fade-in flex flex-col">
        
        {/* CRT Scanline & Glitch Overlay */}
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden mix-blend-overlay opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]"></div>
        </div>
        
        {/* CRT Screen Glow */}
        <div className="pointer-events-none absolute inset-0 z-40 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 border-b-2 border-[#333] bg-[#0a0a0a] relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="font-pixel text-[8px] text-gray-500 uppercase tracking-widest ml-2 hidden sm:inline-block">
              CRT_VIEWER.EXE
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-red-500 p-1 transition-colors pixel-border-sm"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto max-h-[80vh] relative z-10 bg-[#1a1a1a]">
          
          {/* Title Area */}
          <div className="mb-2">
            <h2 className="font-pixel text-sm sm:text-base text-[#34A853] uppercase tracking-wider drop-shadow-[0_0_8px_rgba(52,168,83,0.5)]">
              {title}
            </h2>
            {badgeType && (
              <span className="inline-block mt-2 font-mono text-[10px] bg-[#333] text-gray-300 px-2 py-0.5 pixel-border-sm uppercase">
                BADGE TIER: {badgeType}
              </span>
            )}
          </div>

          {/* Image/PDF Area */}
          <div className="w-full bg-black border-2 border-[#333] p-1 relative flex items-center justify-center min-h-[200px] sm:min-h-[300px] overflow-hidden group">
            {pdfUrl ? (
              <object data={pdfUrl} type="application/pdf" className="w-full min-h-[300px] sm:h-[400px]">
                <div className="flex flex-col items-center justify-center gap-4 h-full p-4 bg-black">
                  <ShieldAlert size={32} className="text-[#EA4335] animate-pulse" />
                  <span className="font-pixel text-[10px] text-gray-400 uppercase text-center leading-relaxed">
                    INLINE PDF VIEWER NOT SUPPORTED BY YOUR DEVICE.
                  </span>
                  <a 
                    href={pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="pixel-btn-blue text-[9px] font-pixel uppercase mt-2 inline-block px-4 py-2"
                  >
                    OPEN / DOWNLOAD DATA
                  </a>
                </div>
              </object>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title} 
                className="max-w-full max-h-[400px] object-contain transition-all duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-600 gap-2">
                <ImageIcon size={32} className="opacity-50" />
                <span className="font-pixel text-[10px] uppercase">IMAGE DATA MISSING</span>
              </div>
            )}
            
            {/* CRT Image Filter (can be customized via CSS or removed if clear is wanted) */}
            {(imageUrl || pdfUrl) && (
              <div className="absolute inset-0 bg-[#34A853] mix-blend-overlay opacity-10 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
            )}
          </div>

          {/* Description Area */}
          {description && (
            <div className="mt-2 bg-black border-2 border-[#333] p-4 relative min-h-[100px]">
              <span className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#34A853] animate-pulse"></span>
              <p className="font-mono text-xs text-[#34A853] leading-relaxed pl-4">
                {displayedText}
                <span className="inline-block w-1.5 h-3 ml-1 bg-[#34A853] animate-pulse align-middle"></span>
              </p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

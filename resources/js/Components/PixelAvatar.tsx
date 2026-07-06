import React, { useState } from "react";
import { Sparkles, Terminal, Shield, Award, Code, Palette, Crosshair } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import { useAchievement } from "../contexts/AchievementContext";

type AvatarMode = "developer" | "hacker" | "designer";

export default function PixelAvatar() {
  const [mode, setMode] = useState<AvatarMode>("developer");
  const [isHovering, setIsHovering] = useState(false);

  // Grid color mappings for 16x16 pixel art
  const colors: Record<string, string> = {
    ".": "transparent",
    "K": "#1F2937", // Hair/Outline (Dark Charcoal)
    "S": "#FDBA74", // Skin tone (Warm Peach)
    "G": "#4285F4", // Google Blue Glasses/Eyes
    "W": "#FFFFFF", // Glasses reflection
    "R": "#EA4335", // Google Red shirt
    "B": "#4285F4", // Google Blue jacket
    "Y": "#FBBC05", // Google Yellow emblem
    "H": "#34A853", // Google Green Headset
    "X": "#10B981", // Hacker green glow
    "P": "#EC4899", // Designer Pink tool
  };

  // 16x16 layouts for different roles
  const layouts: Record<AvatarMode, string[]> = {
    developer: [
      "....KKKKKKKK....",
      "...KKKKKKKKKK...",
      "..KKKKSSSSSSKK..",
      "..KKSSSSSSSSKK..",
      ".KKSSSSSSSSSSKK.",
      ".KHGGGWSSWGGGHK.",
      ".KHGGGWSSWGGGHK.",
      "..KSSSSSSSSSSK..",
      "..KSSKKSJSKKSK..",
      "...SSSSYYSYSS...",
      "....SSSSSSSS....",
      "...BBBBBBBBBB...",
      "..BBRRRRRRRRBB..",
      "..BBRRYYYYRRBB..",
      ".BBBBBBBBBBBBBB.",
      ".BBBBBBBBBBBBBB.",
    ],
    hacker: [
      "....KKKKKKKK....",
      "...KKKKKKKKKK...",
      "..KKKKKKKKKKKK..",
      "..KKKKSKKKSKKK..",
      ".KKKKSKKKSKKKSK.",
      ".KKXXXXXXXXXXKK.", // Green code rain glasses/visor
      ".KKXXXXXXXXXXKK.",
      "..KKKKSKKKSKKK..",
      "..KKKKKKKKKKKK..",
      "...KKKKKKKKKK...",
      "....KKKKKKKK....",
      "...KKKKKKKKKK...",
      "..KKKRRRRRRKKK..",
      "..KKKRYYYYKKKK..",
      ".KKKKKKKKKKKKKK.",
      ".KKKKKKKKKKKKKK.",
    ],
    designer: [
      "....KKKKKKKK....",
      "...KKKKKKKKKK...",
      "..KKKKSSSSSSKK..",
      "..KKSSSSSSSSKK..",
      ".KKSSSSSSSSSSKK.",
      ".KPPPPPSSPPPPPK.", // Pink creative glasses/visor
      ".KPPPPPSSPPPPPK.",
      "..KSSSSSSSSSSK..",
      "..KSSKKSJSKKSK..",
      "...SSSSYYSYSS...",
      "....SSSSSSSS....",
      "...YYYYYYYYYY...", // Warm yellow artist hoodie
      "..YYRRRRRRRRYY..",
      "..YYRRYYYYRRYY..",
      ".YYYYYYYYYYYYYY.",
      ".YYYYYYYYYYYYYY.",
    ],
  };

  const currentLayout = layouts[mode];

  const [clickCount, setClickCount] = useState(0);
  const [isSuper, setIsSuper] = useState(false);
  const { playClickSound, playHoverSound } = useAudio();
  const { unlock } = useAchievement();

  const handleAvatarClick = () => {
    playClickSound();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      unlock({
        id: 'secret_agent',
        title: 'Secret Agent',
        description: 'Menemukan trik rahasia!'
      });
    }
    
    if (newCount >= 5 && !isSuper) {
      setIsSuper(true);
      
      unlock({
        id: 'overclocked',
        title: 'Overclocked!',
        description: 'Menemukan rahasia Super Mode Emas pada Pixel Avatar.'
      });

      // Play a special power up sound (or just reuse jump)
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          // Power up sound
          osc.type = "square";
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(1760, ctx.currentTime + 0.5);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.start();
          osc.stop(ctx.currentTime + 0.6);
        }
      } catch (e) {}

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSuper(false);
        setClickCount(0);
      }, 5000);
    }
  };

  const getProfileImage = () => {
    switch (mode) {
      case "designer":
        return "/profile-designer.jpg";
      case "hacker":
        return "/profile-hacker.jpg";
      default:
        return "/profile.jpg";
    }
  };

  return (
    <div className="flex flex-col items-center animate-float">
      {/* Visual Frame */}
      <div 
        onClick={() => {
          handleAvatarClick();
          // Toggle hover state for mobile devices
          setIsHovering(!isHovering);
        }}
        onMouseEnter={() => { playHoverSound(); setIsHovering(true); }}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative p-4 pixel-border inline-block bg-opacity-95 cursor-pointer select-none transition-all duration-300 ${isSuper ? 'bg-[#FBBC05] pixel-shadow-yellow scale-110' : 'bg-white pixel-shadow-blue hover:scale-105 active:scale-95'}`}
      >
        {/* State Badge */}
        <div className={`absolute -top-3 -right-3 px-2 py-1 text-[8px] font-pixel text-white pixel-border-sm animate-bounce ${isSuper ? 'bg-[#EA4335]' : 'bg-black'}`}>
          {isSuper ? 'OVERCLOCKED!' : mode.toUpperCase()}
        </div>

        {/* Real Photo Reveal or 16x16 Pixel Grid SVG */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-white overflow-hidden">
          {isHovering && !isSuper ? (
            <div className="w-full h-full relative crt-effect animate-in fade-in zoom-in duration-200">
              <div className="w-full h-full bg-[#4285F4] bg-opacity-20 animate-pulse absolute inset-0 z-10 pointer-events-none mix-blend-overlay"></div>
              <img 
                key={mode} // Force re-render animation on mode change
                src={getProfileImage()} 
                alt={`Reza Fahlevi - ${mode}`}
                className="w-full h-full object-cover object-top grayscale-[20%] contrast-125 animate-in fade-in duration-300"
                onError={(e) => { 
                  // Fallback to default profile if the specific mode photo hasn't been uploaded yet
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/profile.jpg')) {
                    target.src = '/profile.jpg';
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
            </div>
          ) : (
            <svg
              viewBox="0 0 16 16"
              className="w-full h-full image-rendering-pixelated animate-in fade-in duration-200"
              style={{ imageRendering: "pixelated" }}
            >
              {currentLayout.map((row, y) =>
                row.split("").map((char, x) => {
                  let charCode = char;
                  if (isSuper) {
                     if (char === "S") charCode = "Y";
                     if (char === "K") charCode = "R";
                  }
                  const fillColor = colors[charCode] || "transparent";
                  if (fillColor === "transparent") return null;
                  return (
                    <rect
                      key={`${x}-${y}`}
                      x={x}
                      y={y}
                      width={1}
                      height={1}
                      fill={fillColor}
                    />
                  );
                })
              )}
            </svg>
          )}
        </div>
      </div>

      {/* Role Switches */}
      <div className={`mt-6 flex flex-wrap gap-2 justify-center max-w-sm transition-opacity ${isSuper ? 'opacity-50 pointer-events-none' : ''}`}>
        <button
          onClick={() => { playClickSound(); setMode("developer"); }}
          onMouseEnter={playHoverSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-pixel transition-all ${
            mode === "developer"
              ? "bg-[#4285F4] text-white pixel-border-sm translate-y-0.5"
              : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
          }`}
          style={{ boxShadow: mode === "developer" ? "0 0 0" : "2px 2px 0px #000" }}
        >
          <Terminal size={12} />
          DEV MODE
        </button>

        <button
          onClick={() => { playClickSound(); setMode("designer"); }}
          onMouseEnter={playHoverSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-pixel transition-all ${
            mode === "designer"
              ? "bg-[#34A853] text-white pixel-border-sm translate-y-0.5"
              : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
          }`}
          style={{ boxShadow: mode === "designer" ? "0 0 0" : "2px 2px 0px #000" }}
        >
          <Sparkles size={12} />
          DESIGNER
        </button>

        <button
          onClick={() => { playClickSound(); setMode("hacker"); }}
          onMouseEnter={playHoverSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-pixel transition-all ${
            mode === "hacker"
              ? "bg-[#EA4335] text-white pixel-border-sm translate-y-0.5"
              : "bg-white text-gray-700 pixel-border-sm hover:translate-y-0.5"
          }`}
          style={{ boxShadow: mode === "hacker" ? "0 0 0" : "2px 2px 0px #000" }}
        >
          <Shield size={12} />
          CYBER
        </button>
      </div>

      {/* Mode description text */}
      <div className="mt-4 flex flex-col items-center justify-center min-h-[40px]">
        {mode === "developer" && (
          <div className="flex items-start gap-2 text-gray-600 font-mono text-xs max-w-[280px] text-left">
            <Code size={14} className="mt-0.5 text-[#4285F4] flex-shrink-0" />
            <span>Menulis kode tangguh, merancang Full-Stack & mengintegrasikan AI.</span>
          </div>
        )}
        {mode === "designer" && (
          <div className="flex items-start gap-2 text-gray-600 font-mono text-xs max-w-[280px] text-left">
            <Palette size={14} className="mt-0.5 text-[#EC4899] flex-shrink-0" />
            <span>Menyusun visual estetis, prototyping UI/UX, & micro-interaction.</span>
          </div>
        )}
        {mode === "hacker" && (
          <div className="flex items-start gap-2 text-gray-600 font-mono text-xs max-w-[280px] text-left">
            <Crosshair size={14} className="mt-0.5 text-[#10B981] flex-shrink-0" />
            <span>Audit keamanan, penetration testing, & mitigasi risiko siber.</span>
          </div>
        )}
      </div>

      {/* Hover Hint */}
      <div className="mt-4 animate-pulse flex items-center gap-1.5 text-[8px] font-pixel text-[#4285F4] select-none cursor-default">
        <span>&gt;&gt; HOVER TO REVEAL IDENTITY &lt;&lt;</span>
      </div>
    </div>
  );
}

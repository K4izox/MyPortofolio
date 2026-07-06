import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PixelAvatar from "../Components/PixelAvatar";
import DinoGame from "../Components/DinoGame";
import SnakeGame from "../Components/SnakeGame";
import SkillsSection from "../Components/SkillsSection";
import ExperienceSection from "../Components/ExperienceSection";
import EducationSection from "../Components/EducationSection";
import CertificatesSection from "../Components/CertificatesSection";
import ContactSection from "../Components/ContactSection";
import ProjectsSection from "../Components/ProjectsSection";
import GuestbookSection from "../Components/GuestbookSection";
import SplashScreen from "../Components/SplashScreen";
import PixelClouds from "../Components/PixelClouds";
import BgmPlayer from "../Components/BgmPlayer";
import HackerTerminal from "../Components/HackerTerminal";
import { OWNER_DATA } from "../types";
import { Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useKonamiCode } from "../hooks/useKonamiCode";
import { useAudio } from "../hooks/useAudio";
import { useTypewriter } from "../hooks/useTypewriter";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { AchievementProvider, useAchievement } from "../contexts/AchievementContext";
import AchievementToast from "../Components/AchievementToast";

interface Props {
  laravelVersion: string;
  phpVersion: string;
  guestbookEntries?: any[];
}

export default function App(props: Props) {
  return (
    <ThemeProvider>
      <AchievementProvider>
        <PortfolioApp {...props} />
      </AchievementProvider>
    </ThemeProvider>
  );
}

function PortfolioApp({ laravelVersion, phpVersion, guestbookEntries = [] }: Props) {
  const [activeSection, setActiveSection] = useState("about");
  const [activeGame, setActiveGame] = useState<"dino" | "snake">("dino");
  const [showSplash, setShowSplash] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const isHackerMode = useKonamiCode();
  const { playClickSound, playHoverSound } = useAudio();
  const { displayedText: typedSummary, isTyping } = useTypewriter(OWNER_DATA.summary, 30);
  
  const { isNightMode } = useTheme();
  const { unlock } = useAchievement();

  // Intersection Observer to track active section for Navbar HUD highlights
  useEffect(() => {
    const sections = ["about", "projects", "skills", "experience", "certificates", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Check if reached bottom for achievement
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        unlock({
          id: 'curious_explorer',
          title: 'Curious Explorer',
          description: 'Membaca portofolio sampai ke ujung bawah dunia pixel!'
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        setIsTerminalOpen(prev => {
          if (!prev) {
            playClickSound();
            unlock({
              id: 'secret_agent',
              title: 'Secret Agent',
              description: 'Menemukan gerbang rahasia menuju Hacker Terminal.'
            });
          }
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleOpenTerminal = () => setIsTerminalOpen(true);
    window.addEventListener("openTerminal", handleOpenTerminal);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("openTerminal", handleOpenTerminal);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`min-h-screen ${isHackerMode ? 'hacker-mode' : ''} ${isNightMode ? 'night-mode bg-[#1a1a2e] text-gray-100' : 'bg-[#E5E7EB] text-gray-900'} relative font-sans selection:bg-[#4285F4] selection:text-white transition-colors duration-500`}>
      
      <AchievementToast />

      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {/* Secret Hacker Terminal */}
      <HackerTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* Ambient Pixel Clouds Effect */}
      {!showSplash && <PixelClouds />}

      {/* Game HUD Navbar */}
      <Navbar activeSection={activeSection} />
      
      {/* Background Music Player */}
      <BgmPlayer />

      {/* Hero / About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="about"
        className="relative pt-12 pb-20 border-b-4 border-black pixel-grid-bg bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Column: Info, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Retro Player Level Badge */}
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 pixel-border-sm font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider animate-pulse">
              <span>PLAYER LEVEL 99</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
            </div>

            {/* Name with Press Start font */}
            <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-gray-900 leading-tight tracking-wider uppercase flex items-center justify-center lg:justify-start gap-3">
              <img 
                src="/profile.jpg" 
                alt="Reza Fahlevi" 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-black object-cover object-top shadow-lg"
              />
              <span className="glitch-effect" data-text={OWNER_DATA.name}>{OWNER_DATA.name}</span>
            </h1>

            {/* Sub-role and tagline */}
            <div className="space-y-1 font-mono text-xs font-extrabold text-[#4285F4] tracking-wide">
              <p className="text-sm text-gray-700 font-bold">{OWNER_DATA.title}</p>
              <p className="text-[#34A853] mt-1 text-[11px] sm:text-xs">
                {OWNER_DATA.tagline}
              </p>
            </div>

            {/* Summary description paragraph with Typewriter effect */}
            <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0 min-h-[80px]">
              {typedSummary}
              {isTyping && <span className="inline-block w-2 h-4 bg-gray-500 ml-1 animate-ping"></span>}
            </p>

            {/* Google Themed CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="/resume.pdf"
                target="_blank"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="pixel-btn-white uppercase font-pixel tracking-wide text-[9px] border-4 border-[#FBBC05] text-[#FBBC05] animate-heart"
              >
                [ DOWNLOAD STATS (CV) ]
              </a>
              <button
                onClick={() => { playClickSound(); handleScrollToSection("projects"); }}
                onMouseEnter={playHoverSound}
                className="pixel-btn-blue uppercase font-pixel tracking-wide text-[9px] active:translate-y-0.5"
              >
                LIHAT KARYA
              </button>
              <button
                onClick={() => { playClickSound(); handleScrollToSection("contact"); }}
                onMouseEnter={playHoverSound}
                className="pixel-btn-red uppercase font-pixel tracking-wide text-[9px] active:translate-y-0.5"
              >
                HUBUNGI SAYA
              </button>
            </div>
          </div>

          {/* Hero Right Column: Interactive Pixel Portrait Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <PixelAvatar />
          </div>
        </div>
      </motion.section>

      {/* Level 2: Arcade Room / Projects */}
      <ProjectsSection />

      {/* Skills Inventory Grid */}
      <SkillsSection />

      {/* Experience Levels Stages Timeline */}
      <ExperienceSection />

      {/* Education Status Section */}
      <EducationSection />

      {/* Certificates Badges Section */}
      <section id="certificates">
        <CertificatesSection />
      </section>

      {/* Mini Game Area */}
      <section id="game" className="py-20 bg-white border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pixel-grid-bg opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="font-pixel text-lg text-gray-900 mb-8 inline-block bg-[#FBBC05] px-4 py-2 pixel-border-sm pixel-shadow-yellow transform -rotate-1 relative z-20">
            [ MINI GAME AREA ]
          </h2>
          
          {/* Arcade Cabinet Wrapper */}
          <div className="arcade-cabinet max-w-2xl mx-auto mt-4 mb-4">
            
            {/* Arcade Header (LEDs and Coin Slot) */}
            <div className="flex justify-between items-center mb-6 px-2 sm:px-6">
               <div className="flex gap-2 sm:gap-3">
                 <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444] animate-pulse"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#FACC15]"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_#22C55E]"></div>
               </div>
               <div className="font-pixel text-[8px] sm:text-[10px] text-yellow-300 tracking-widest bg-black px-3 py-1.5 border-2 border-red-900 rounded shadow-inner animate-coin">
                 INSERT COIN
               </div>
            </div>

            {/* Game Switcher Tabs (Dashboard) */}
            <div className="flex justify-center items-center gap-3 sm:gap-6 mb-6">
              <button
                onClick={() => { playClickSound(); setActiveGame("dino"); }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider pixel-border transition-all ${
                  activeGame === "dino" 
                    ? "bg-[#4285F4] text-white pixel-shadow-flat-blue scale-105" 
                    : "bg-gray-200 text-gray-500 hover:bg-white"
                }`}
              >
                T-Rex Run
              </button>
              <button
                onClick={() => { playClickSound(); setActiveGame("snake"); }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider pixel-border transition-all ${
                  activeGame === "snake" 
                    ? "bg-[#34A853] text-white pixel-shadow-flat-green scale-105" 
                    : "bg-gray-200 text-gray-500 hover:bg-white"
                }`}
              >
                Bug Hunter
              </button>
            </div>

            {/* Arcade Screen Bezel */}
            <div className="arcade-screen-bezel">
              <div className="crt-convex">
                {activeGame === "dino" ? <DinoGame /> : <SnakeGame />}
              </div>
            </div>

            {/* Arcade Control Panel Decor */}
            <div className="mt-8 mb-2 flex justify-center gap-12 px-4 opacity-70">
              <div className="w-20 h-3 bg-red-950 rounded-full shadow-inner border border-red-900"></div>
              <div className="w-20 h-3 bg-red-950 rounded-full shadow-inner border border-red-900"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact terminal and Social cords */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Public Guestbook */}
      <GuestbookSection entries={guestbookEntries} />

      {/* Footer / End Credits */}
      <footer className="bg-black text-white py-10 relative overflow-hidden">
        {/* Infinite scrolling pixelated ground animation in background */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-900 border-b-2 border-zinc-800 opacity-60">
          {/* Small 8-bit clouds running inside footer */}
          <div className="absolute top-2 left-1/4 select-none pointer-events-none opacity-20 animate-pulse">
            <svg width="24" height="8" viewBox="0 0 24 8" fill="#FFFFFF">
              <path d="M4,3 h4 v2 h-4 z M8,1 h8 v2 h-8 z M16,3 h4 v2 h-4 z" />
            </svg>
          </div>
          <div className="absolute top-4 left-3/4 select-none pointer-events-none opacity-10 animate-pulse">
            <svg width="24" height="8" viewBox="0 0 24 8" fill="#FFFFFF">
              <path d="M4,3 h4 v2 h-4 z M8,1 h8 v2 h-8 z M16,3 h4 v2 h-4 z" />
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center mb-10">
            {/* Left Column - Branding */}
            <div className="text-left flex flex-col items-center md:items-start space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-black pixel-border flex items-center justify-center border-[#34A853]">
                  <span className="font-pixel text-[12px] text-white">R</span>
                </div>
                <span className="font-pixel text-xs text-[#34A853] tracking-widest uppercase">
                  Level 99 Developer
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 leading-relaxed max-w-xs text-center md:text-left">
                Membangun pengalaman digital masa depan dengan estetika masa lalu.
              </p>
              
              <div className="flex gap-3 pt-2">
                <a href={OWNER_DATA.contacts.githubUrl} target="_blank" rel="noreferrer" className="w-8 h-8 bg-zinc-900 border-2 border-zinc-700 hover:border-[#4285F4] hover:bg-black text-white flex items-center justify-center transition-all hover:-translate-y-1">
                  <Github size={14} />
                </a>
                <a href={OWNER_DATA.contacts.linkedinUrl} target="_blank" rel="noreferrer" className="w-8 h-8 bg-zinc-900 border-2 border-zinc-700 hover:border-[#4285F4] hover:bg-black text-white flex items-center justify-center transition-all hover:-translate-y-1">
                  <Linkedin size={14} />
                </a>
                <a href={`mailto:${OWNER_DATA.contacts.email}`} className="w-8 h-8 bg-zinc-900 border-2 border-zinc-700 hover:border-[#4285F4] hover:bg-black text-white flex items-center justify-center transition-all hover:-translate-y-1">
                  <Mail size={14} />
                </a>
              </div>
            </div>

            {/* Middle Column - System Status */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 pixel-border-sm border-zinc-700 cursor-help" title="Press ~ to open Hacker Terminal">
                <span className="w-2 h-2 bg-[#34A853] inline-block rounded-full animate-pulse shadow-[0_0_8px_#34A853]"></span>
                <span className="text-[8px] font-pixel text-gray-400 tracking-wider">SYSTEM ONLINE</span>
              </div>
              <div className="text-[8px] font-mono text-zinc-500 animate-pulse">
                <span className="hidden sm:inline">[ HINT: Press ~ to open terminal ]</span>
                <span className="sm:hidden">[ HINT: Tap Logo 3x for terminal ]</span>
              </div>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group mt-4 bg-transparent border-2 border-zinc-700 hover:border-white px-4 py-2 flex items-center gap-2 transition-all hover:-translate-y-1"
              >
                <ArrowUp size={12} className="text-zinc-400 group-hover:text-white" />
                <span className="text-[8px] font-pixel text-zinc-400 group-hover:text-white uppercase tracking-widest">
                  BACK TO TOP
                </span>
              </button>
            </div>

            {/* Right Column - Credits */}
            <div className="text-center md:text-right flex flex-col items-center md:items-end space-y-4">
              <p className="font-pixel text-[9px] text-[#FBBC05] tracking-widest leading-loose">
                © 2026 REZA FAHLEVI.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-mono text-zinc-400 flex items-center justify-center md:justify-end gap-1.5">
                  Crafted using 
                </p>
                <div className="flex items-center gap-2 justify-center md:justify-end">
                  <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-blue-400">React</span>
                  <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-cyan-400">Tailwind</span>
                  <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-red-400">Laravel</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 mb-2">
            <p className="text-[8px] font-mono text-zinc-600 tracking-widest opacity-50">SYS_MSG: CL1CK LOGO 3X F0R R00T ACC3SS</p>
          </div>

          {/* Epic Bottom Bar */}
          <div className="w-full h-2 flex">
            <div className="h-full bg-[#4285F4]" style={{ width: '25%' }}></div>
            <div className="h-full bg-[#EA4335]" style={{ width: '25%' }}></div>
            <div className="h-full bg-[#FBBC05]" style={{ width: '25%' }}></div>
            <div className="h-full bg-[#34A853]" style={{ width: '25%' }}></div>
          </div>

        </div>
      </footer>
    </div>
  );
}

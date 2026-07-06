import React, { useState, useEffect } from "react";
import { Menu, X, Gamepad2, Volume2, Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { isNightMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about", color: "#4285F4" }, // Blue
    { name: "Skills", href: "#skills", color: "#FBBC05" }, // Yellow
    { name: "Experience", href: "#experience", color: "#34A853" }, // Green
    { name: "Certificates", href: "#certificates", color: "#EA4335" }, // Red
    { name: "Contact", href: "#contact", color: "#4285F4" }, // Blue
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
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
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? (isNightMode ? "bg-[#16213e] border-b-4 border-black py-2 shadow-md" : "bg-white border-b-4 border-black py-2 shadow-md")
          : (isNightMode ? "bg-[#1a1a2e] border-b-4 border-black py-4" : "bg-[#F8F9FA] border-b-4 border-black py-4")
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo "REZA.DEV" */}
        <a
          href="#about"
          onClick={(e) => {
            handleScrollTo(e, "#about");
            const newCount = logoClickCount + 1;
            setLogoClickCount(newCount);
            if (newCount === 3) {
              window.dispatchEvent(new CustomEvent('openTerminal'));
              setLogoClickCount(0); // reset
            }
          }}
          className="flex items-center gap-2 group cursor-pointer relative"
          title="Click 3x for ROOT access"
        >
          <div className="w-8 h-8 bg-black flex items-center justify-center pixel-border-sm group-hover:bg-[#4285F4] transition-colors">
            <span className="font-pixel text-[12px] text-white">R</span>
          </div>
          <span className={`font-pixel text-xs sm:text-sm tracking-wider transition-colors ${isNightMode ? 'text-white hover:text-[#4285F4]' : 'text-black hover:text-[#4285F4]'}`}>
            REZA.EXE
          </span>
        </a>

        {/* Desktop Menu & Stats HUD */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`px-2.5 py-1 text-[9px] font-pixel transition-all ${
                    isActive
                      ? "bg-[#EA4335] text-white pixel-border-sm translate-y-0.5"
                      : (isNightMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700 pixel-border-sm hover:border-black" : "text-gray-700 hover:bg-gray-100 pixel-border-sm hover:border-black")
                  }`}
                  style={{
                    boxShadow: isActive ? "0px 0px 0px" : "2px 2px 0px #000000",
                    borderColor: "#000000"
                  }}
                >
                  {item.name.toUpperCase()}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* Retro Gamer HUD Stats */}
            <div className={`text-[9px] font-pixel border-l-2 pl-4 text-right leading-relaxed select-none ${isNightMode ? 'border-gray-700 text-gray-300' : 'border-black text-black'}`}>
              <span className="text-red-500 font-extrabold">HP</span> 100/100<br/>
              <span className="text-blue-500 font-extrabold">MP</span> 3.79/4.00
            </div>

            {/* Day/Night Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 pixel-border-sm active:translate-y-0.5 transition-all ${isNightMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-blue-500 hover:bg-gray-100'}`}
              style={{ boxShadow: "2px 2px 0px #000" }}
              title="Toggle Day/Night"
            >
              {isNightMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-1.5 pixel-border-sm active:translate-y-0.5 ${isNightMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          style={{ boxShadow: "2px 2px 0px #000" }}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 border-b-4 border-black p-4 space-y-3 pixel-shadow animate-fade-in ${isNightMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex justify-center items-center gap-2 px-4 py-2.5 text-[10px] font-pixel pixel-border-sm ${isNightMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-50 text-blue-500'}`}
            style={{ boxShadow: "3px 3px 0px #000000" }}
          >
            {isNightMode ? <><Sun size={14} /> DAY MODE</> : <><Moon size={14} /> NIGHT MODE</>}
          </button>

          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`block w-full text-center px-4 py-2.5 text-[10px] font-pixel transition-all ${
                  isActive
                    ? "bg-[#EA4335] text-white pixel-border-sm translate-y-0.5"
                    : (isNightMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700 pixel-border-sm" : "bg-gray-50 text-gray-800 pixel-border-sm hover:bg-gray-100")
                }`}
                style={{
                  boxShadow: isActive ? "0px 0px 0px" : "3px 3px 0px #000000",
                }}
              >
                {item.name.toUpperCase()}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}

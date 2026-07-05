import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { OWNER_DATA, SKILLS_INVENTORY, PROJECTS_LIST } from "../types";
import { useAudio } from "../hooks/useAudio";

interface HackerTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HackerTerminal({ isOpen, onClose }: HackerTerminalProps) {
  const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([
    {
      command: "",
      output: (
        <div className="text-[#0f0] mb-2">
          <p>SYSTEM INITIALIZED.</p>
          <p>Welcome to the {OWNER_DATA.name.toUpperCase()} root server.</p>
          <p>Type 'help' to see available commands.</p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playClickSound } = useAudio();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string | React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="text-gray-300 ml-4 mb-2">
            <p>AVAILABLE COMMANDS:</p>
            <table className="mt-1">
              <tbody>
                <tr><td className="pr-4 text-[#FBBC05]">whoami</td><td>Display user identity</td></tr>
                <tr><td className="pr-4 text-[#FBBC05]">ls</td><td>List core system files</td></tr>
                <tr><td className="pr-4 text-[#FBBC05]">cat skills.txt</td><td>Display loaded skill modules</td></tr>
                <tr><td className="pr-4 text-[#FBBC05]">cat projects.exe</td><td>Display recent operations</td></tr>
                <tr><td className="pr-4 text-[#EA4335]">sudo hire reza</td><td>Initiate recruitment protocol</td></tr>
                <tr><td className="pr-4 text-[#FBBC05]">clear</td><td>Clear terminal output</td></tr>
                <tr><td className="pr-4 text-[#FBBC05]">exit</td><td>Terminate session</td></tr>
              </tbody>
            </table>
          </div>
        );
        break;
      case "whoami":
        output = `reza_fahlevi - ${OWNER_DATA.title} | ${OWNER_DATA.tagline}`;
        break;
      case "ls":
        output = "skills.txt  projects.exe  contact.cfg  resume.pdf";
        break;
      case "cat skills.txt":
        output = (
          <div className="ml-4 mb-2">
            {SKILLS_INVENTORY.map((s, i) => (
              <div key={i} className="text-gray-300">
                - <span className="text-[#34A853]">{s.name}</span> [{s.rarity}]
              </div>
            ))}
          </div>
        );
        break;
      case "cat projects.exe":
        output = (
          <div className="ml-4 mb-2">
            {PROJECTS_LIST.map((p, i) => (
              <div key={i} className="text-gray-300">
                &gt; <span className="text-[#4285F4]">{p.title}</span>: {p.description}
              </div>
            ))}
          </div>
        );
        break;
      case "sudo hire reza":
        output = (
          <div className="ml-4 mb-2 text-[#EA4335] animate-pulse">
            <p>[!] RECRUITMENT PROTOCOL INITIATED [!]</p>
            <p>Contact Email: {OWNER_DATA.contacts.email}</p>
            <p>LinkedIn: {OWNER_DATA.contacts.linkedinUrl}</p>
            <p>Awaiting your transmission...</p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        onClose();
        return;
      case "":
        output = "";
        break;
      default:
        output = `Command not found: ${trimmedCmd}. Type 'help' for a list of commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      playClickSound();
      handleCommand(input);
      setInput("");
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Close when clicking outside terminal window
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-3xl h-[60vh] bg-black border-2 border-gray-700 flex flex-col shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Terminal Header */}
        <div className="bg-gray-800 px-3 py-2 flex items-center justify-between border-b border-gray-700 select-none">
          <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
            <Terminal size={14} />
            <span>reza@kali: ~</span>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} type="button" aria-label="Close Terminal" className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"></button>
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 relative overflow-hidden bg-black crt-effect">
          {/* Matrix Canvas */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen"
          />

          {/* Terminal Content */}
          <div 
            className="absolute inset-0 z-10 p-4 font-mono text-sm sm:text-base text-[#0f0] overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, idx) => (
            <div key={idx} className="mb-1">
              {entry.command && (
                <div className="flex gap-2">
                  <span className="text-[#4285F4] font-bold">reza@kali</span>
                  <span className="text-white">:</span>
                  <span className="text-[#34A853]">~</span>
                  <span className="text-white">$ {entry.command}</span>
                </div>
              )}
              {entry.output && <div className="mt-1">{entry.output}</div>}
            </div>
          ))}
          
          <div className="flex gap-2 items-center">
            <span className="text-[#4285F4] font-bold">reza@kali</span>
            <span className="text-white">:</span>
            <span className="text-[#34A853]">~</span>
            <span className="text-white">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#0f0] shadow-none focus:ring-0 p-0 m-0"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
          
          <div ref={endOfMessagesRef} className="h-4" />
        </div>
        </div>
      </div>
    </div>
  );
}

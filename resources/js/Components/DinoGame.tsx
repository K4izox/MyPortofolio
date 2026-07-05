import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Volume2, VolumeX, ShieldAlert } from "lucide-react";

export default function DinoGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("dino_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [obstacleType, setObstacleType] = useState<"cactus1" | "cactus2" | "cyber_shield">("cactus1");
  const [dinoFrame, setDinoFrame] = useState(0);

  // Use Refs for game physics to prevent React re-renders on every frame (60fps)
  // This drastically improves smoothness and performance.
  const dinoPos = useRef({ y: 0, velocity: 0 });
  const obstaclePos = useRef({ x: 600 });
  const cloudsPos = useRef([
    { x: 100, y: 20 },
    { x: 350, y: 40 },
    { x: 500, y: 15 },
  ]);
  
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const isJumpingRef = useRef(false);
  const gameSpeedRef = useRef(6);
  const scoreRef = useRef(0);
  const obstacleTypeRef = useRef(obstacleType);
  const animFrameId = useRef<number | null>(null);

  // DOM Refs for direct style manipulation
  const dinoRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep ref in sync with state for collision logic
  useEffect(() => {
    obstacleTypeRef.current = obstacleType;
  }, [obstacleType]);

  const playRetroSound = (type: "jump" | "hit" | "score") => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "jump") {
        osc.type = "square";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "hit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "score") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // Browser blocked autoplay audio
    }
  };

  const jump = () => {
    if (isJumpingRef.current || !isPlayingRef.current || isGameOverRef.current) return;
    isJumpingRef.current = true;
    dinoPos.current.velocity = 11; // Initial jump velocity
    playRetroSound("jump");
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field (like the terminal)
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!isPlayingRef.current && !isGameOverRef.current) {
          startGame();
        } else if (isGameOverRef.current) {
          resetGame();
        } else {
          jump();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Dino run cycle animation
  useEffect(() => {
    let frameTimer: number;
    if (isPlaying && !isGameOver) {
      frameTimer = window.setInterval(() => {
        setDinoFrame((prev) => (prev === 0 ? 1 : 0));
      }, 120);
    }
    return () => clearInterval(frameTimer);
  }, [isPlaying, isGameOver]);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    isPlayingRef.current = true;
    isGameOverRef.current = false;
    
    setScore(0);
    scoreRef.current = 0;
    
    obstaclePos.current.x = 600;
    dinoPos.current.y = 0;
    dinoPos.current.velocity = 0;
    gameSpeedRef.current = 6;
    isJumpingRef.current = false;
    
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    animFrameId.current = requestAnimationFrame(gameLoop);
  };

  const resetGame = () => {
    startGame();
  };

  // Highly optimized main game loop using direct DOM manipulation
  const gameLoop = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;

    // 1. Update & Render Clouds
    cloudsPos.current.forEach((cloud, i) => {
      cloud.x -= 0.4;
      if (cloud.x < -60) cloud.x = 600;
      if (cloudRefs.current[i]) {
        cloudRefs.current[i]!.style.left = `${cloud.x}px`;
      }
    });

    // 2. Update & Render Obstacle
    obstaclePos.current.x -= gameSpeedRef.current;
    if (obstaclePos.current.x <= -30) {
      obstaclePos.current.x = 600;
      
      // Update score safely without triggering full lag
      scoreRef.current += 10;
      if (scoreRef.current % 50 === 0) {
        setScore(scoreRef.current); // Sync react state occasionally for UI
      }
      
      if (scoreRef.current > 0 && scoreRef.current % 100 === 0) {
        playRetroSound("score");
        gameSpeedRef.current = Math.min(gameSpeedRef.current + 0.5, 12); // Slowly increase speed
      }

      // Pick random next obstacle
      const types: Array<"cactus1" | "cactus2" | "cyber_shield"> = ["cactus1", "cactus2", "cyber_shield"];
      setObstacleType(types[Math.floor(Math.random() * types.length)]);
    }
    if (obstacleRef.current) {
      obstacleRef.current.style.left = `${obstaclePos.current.x}px`;
    }

    // 3. Update & Render Dino Physics
    if (isJumpingRef.current) {
      dinoPos.current.y += dinoPos.current.velocity;
      dinoPos.current.velocity -= 0.65; // gravity

      if (dinoPos.current.y <= 0) {
        dinoPos.current.y = 0;
        isJumpingRef.current = false;
      }
    }
    if (dinoRef.current) {
      dinoRef.current.style.transform = `translateY(-${dinoPos.current.y}px)`;
    }

    // 4. Collision Detection
    const dinoLeft = 40;
    const dinoRight = 74;
    const dinoBottom = dinoPos.current.y;
    const obstacleLeft = obstaclePos.current.x;
    const obstacleRight = obstaclePos.current.x + 24;
    const obstacleHeight = obstacleTypeRef.current === "cyber_shield" ? 28 : 34;

    if (
      dinoRight - 6 > obstacleLeft &&
      dinoLeft + 6 < obstacleRight &&
      dinoBottom < obstacleHeight
    ) {
      // BOOM! Collision!
      handleGameOver();
      return; // End loop
    }

    animFrameId.current = requestAnimationFrame(gameLoop);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    isPlayingRef.current = false;
    isGameOverRef.current = true;
    setScore(scoreRef.current); // Final sync
    playRetroSound("hit");

    setHighScore((prev) => {
      if (scoreRef.current > prev) {
        localStorage.setItem("dino_highscore", scoreRef.current.toString());
        return scoreRef.current;
      }
      return prev;
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#34A853] inline-block pixel-border-sm animate-pulse"></span>
          <h4 className="text-[10px] font-pixel text-gray-700 tracking-wider">DINO GOOGLE EASTER EGG</h4>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-gray-500 hover:text-black border-2 border-transparent hover:border-black active:translate-y-0.5"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="text-[10px] font-pixel text-gray-600">
            HI: <span className="font-mono text-xs">{highScore.toString().padStart(4, "0")}</span>
          </div>
        </div>
      </div>

      {/* Main Game Stage Frame */}
      <div
        onClick={jump}
        className="relative h-44 bg-[#F8F9FA] pixel-border overflow-hidden select-none cursor-pointer group active:bg-gray-100 transition-colors crt-effect neon-border"
      >
        {/* Pixel Clouds in Background */}
        {cloudsPos.current.map((cloud, i) => (
          <div
            key={i}
            ref={(el) => (cloudRefs.current[i] = el)}
            className="absolute opacity-40 select-none pointer-events-none"
            style={{ left: `${cloud.x}px`, top: `${cloud.y}px` }}
          >
            {/* 8-bit cloud representation */}
            <svg width="36" height="12" viewBox="0 0 36 12" fill="#D1D5DB">
              <path d="M4,4 h4 v4 h-4 z M8,2 h12 v2 h-12 z M16,0 h12 v2 h-12 z M24,2 h4 v2 h-4 z M28,4 h4 v4 h-4 z M0,6 h36 v6 h-36 z" />
            </svg>
          </div>
        ))}

        {/* Level / Ground Line */}
        <div className="absolute bottom-6 left-0 right-0 h-1 bg-black opacity-90"></div>

        {/* Dino */}
        <div
          ref={dinoRef}
          className="absolute bottom-6 left-10"
        >
          {/* Dino Pixel Art SVG */}
          <svg
            width="34"
            height="40"
            viewBox="0 0 17 20"
            fill={isGameOver ? "#EA4335" : "#34A853"}
            className="image-rendering-pixelated"
          >
            {/* Eye */}
            <rect x="11" y="2" width="1.5" height="1.5" fill="#FFFFFF" />
            <rect x="12" y="2.5" width="0.7" height="0.7" fill="#000000" />
            {/* Head and snout */}
            <path d="M10,0 h6 v5 h-6 z M8,1 h2 v2 h-2 z M10,4 h4 v1 h-4 z" />
            {/* Neck and back */}
            <path d="M9,5 h4 v4 h-4 z M8,7 h1 v2 h-1 z M7,8 h1 v4 h-1 z" />
            {/* Belly and chest */}
            <path d="M9,9 h4 v3 h-4 z M13,9 h2 v1 h-2 z" />
            {/* Tail */}
            <path d="M4,9 h3 v3 h-3 z M2,10 h2 v2 h-2 z M0,11 h2 v2 h-2 z M1,13 h1 v1 h-1 z" />
            {/* Arms */}
            <rect x="13" y="11" width="2" height="1" />

            {/* Feet (runs dynamically when playing and on ground) */}
            {(!isPlaying || isGameOver || isJumpingRef.current) ? (
              // Standing
              <>
                <rect x="8" y="16" width="1.5" height="4" />
                <rect x="11" y="16" width="1.5" height="4" />
                <rect x="9" y="19" width="1" height="1" />
                <rect x="12" y="19" width="1" height="1" />
              </>
            ) : dinoFrame === 0 ? (
              // Left foot up
              <>
                <rect x="8" y="16" width="1.5" height="2" />
                <rect x="11" y="16" width="1.5" height="4" />
                <rect x="12" y="19" width="1" height="1" />
              </>
            ) : (
              // Right foot up
              <>
                <rect x="8" y="16" width="1.5" height="4" />
                <rect x="9" y="19" width="1" height="1" />
                <rect x="11" y="16" width="1.5" height="2" />
              </>
            )}
          </svg>
        </div>

        {/* Oncoming Obstacle */}
        {isPlaying && (
          <div
            ref={obstacleRef}
            className="absolute bottom-6"
            style={{ left: "600px" }}
          >
            {obstacleType === "cactus1" && (
              <svg width="24" height="34" viewBox="0 0 12 17" fill="#EA4335">
                <path d="M5,0 h2 v17 h-2 z M3,3 h2 v6 h-2 z M2,5 h1 v2 h-1 z M7,5 h2 v5 h-2 z M9,7 h1 v2 h-1 z" />
              </svg>
            )}
            {obstacleType === "cactus2" && (
              <svg width="28" height="34" viewBox="0 0 14 17" fill="#FBBC05">
                <path d="M3,2 h2 v15 h-2 z M1,4 h2 v4 h-2 z M0,5 h1 v2 h-1 z M8,1 h2 v16 h-2 z M6,4 h2 v5 h-2 z M5,5 h1 v2 h-1 z M10,5 h2 v5 h-2 z M12,7 h1 v2 h-1 z" />
              </svg>
            )}
            {obstacleType === "cyber_shield" && (
              <div className="flex flex-col items-center select-none pointer-events-none animate-bounce">
                <ShieldAlert size={20} className="text-[#4285F4] stroke-[3]" />
                <div className="w-5 h-1 bg-black opacity-30 mt-1 blur-[1px]"></div>
              </div>
            )}
          </div>
        )}

        {/* Ground Text Overlay when not playing */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-45 text-white">
            <p className="text-[10px] font-pixel mb-3 tracking-widest text-yellow-300 animate-pulse text-center px-4 leading-relaxed">
              [ PRESS SPACE / CLICK TO JUMP! ]
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="px-4 py-2 bg-[#4285F4] text-white pixel-border-sm text-[9px] font-pixel flex items-center gap-1.5 active:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              <Play size={10} fill="white" /> START GAME
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white animate-fade-in">
            <h3 className="text-sm font-pixel text-[#EA4335] tracking-widest mb-1 animate-bounce">
              GAME OVER
            </h3>
            <p className="text-[10px] font-pixel text-gray-300 mb-3">
              SCORE: <span className="text-white font-mono font-bold text-xs">{score}</span>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="px-4 py-2 bg-[#34A853] text-white pixel-border-sm text-[8px] font-pixel flex items-center gap-1.5 active:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              <RotateCcw size={10} /> RESTART
            </button>
          </div>
        )}

        {/* Real-time score indicator */}
        {isPlaying && (
          <div className="absolute top-2 right-4 text-xs font-mono font-semibold bg-white px-2 py-1 pixel-border-sm opacity-90">
            SCORE: {Math.max(score, scoreRef.current).toString().padStart(4, "0")}
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-[10px] font-mono text-gray-500">
        🎮 Tekan <span className="font-semibold bg-gray-200 px-1 border">SPASI</span> / Klik area game untuk melompat. Hindari kaktus & rintangan siber!
      </p>
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, ShieldAlert, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving UP initially

export default function SnakeGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snake_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isMuted, setIsMuted] = useState(false);

  // We use refs for game state to use within requestAnimationFrame
  const snakeRef = useRef(INITIAL_SNAKE);
  const directionRef = useRef(INITIAL_DIRECTION);
  const foodRef = useRef({ x: 5, y: 5 });
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const scoreRef = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const lastTickTime = useRef<number>(0);
  const speedRef = useRef(150); // ms per tick, decreases as score goes up
  const nextDirectionRef = useRef(INITIAL_DIRECTION); // to prevent rapid double-turns

  // DOM Refs for drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playRetroSound = (type: "eat" | "die" | "turn") => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "eat") {
        osc.type = "square";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "die") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "turn") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.warn("Audio not supported");
    }
  };

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Make sure food is not on snake
      const onSnake = snakeRef.current.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    foodRef.current = newFood;
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cellW = width / GRID_SIZE;
    const cellH = height / GRID_SIZE;

    // Clear background
    ctx.fillStyle = "#F8F9FA"; 
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for(let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellW, 0);
        ctx.lineTo(i * cellW, height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * cellH);
        ctx.lineTo(width, i * cellH);
        ctx.stroke();
    }

    // Draw Food (Bug)
    ctx.fillStyle = "#EF4444"; // Red bug
    ctx.fillRect(foodRef.current.x * cellW + 1, foodRef.current.y * cellH + 1, cellW - 2, cellH - 2);

    // Draw Snake (Defender)
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#10B981" : "#34D399"; // Green
      ctx.fillRect(segment.x * cellW + 1, segment.y * cellH + 1, cellW - 2, cellH - 2);
      
      // Eyes for head
      if (index === 0) {
        ctx.fillStyle = "#000";
        const dir = directionRef.current;
        if (dir.x === 1) { // Right
            ctx.fillRect(segment.x * cellW + cellW - 4, segment.y * cellH + 2, 2, 2);
            ctx.fillRect(segment.x * cellW + cellW - 4, segment.y * cellH + cellH - 4, 2, 2);
        } else if (dir.x === -1) { // Left
            ctx.fillRect(segment.x * cellW + 2, segment.y * cellH + 2, 2, 2);
            ctx.fillRect(segment.x * cellW + 2, segment.y * cellH + cellH - 4, 2, 2);
        } else if (dir.y === -1) { // Up
            ctx.fillRect(segment.x * cellW + 2, segment.y * cellH + 2, 2, 2);
            ctx.fillRect(segment.x * cellW + cellW - 4, segment.y * cellH + 2, 2, 2);
        } else { // Down
            ctx.fillRect(segment.x * cellW + 2, segment.y * cellH + cellH - 4, 2, 2);
            ctx.fillRect(segment.x * cellW + cellW - 4, segment.y * cellH + cellH - 4, 2, 2);
        }
      }
    });
  };

  const update = (timestamp: number) => {
    if (!isPlayingRef.current || isGameOverRef.current) return;

    if (timestamp - lastTickTime.current > speedRef.current) {
      lastTickTime.current = timestamp;

      directionRef.current = nextDirectionRef.current;
      const head = snakeRef.current[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        gameOver();
        return;
      }

      // Check self collision
      if (
        snakeRef.current.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        gameOver();
        return;
      }

      const newSnake = [newHead, ...snakeRef.current];

      // Check food collision
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        playRetroSound("eat");
        scoreRef.current += 10;
        setScore(scoreRef.current);
        generateFood();
        // Speed up game slightly
        speedRef.current = Math.max(50, 150 - scoreRef.current / 2);
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      snakeRef.current = newSnake;
      draw();
    }

    animFrameId.current = requestAnimationFrame(update);
  };

  const gameOver = () => {
    playRetroSound("die");
    setIsGameOver(true);
    isGameOverRef.current = true;
    setIsPlaying(false);
    isPlayingRef.current = false;

    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem("snake_highscore", scoreRef.current.toString());
    }
  };

  const startGame = () => {
    snakeRef.current = INITIAL_SNAKE;
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = INITIAL_DIRECTION;
    generateFood();
    scoreRef.current = 0;
    speedRef.current = 150;
    setScore(0);
    setIsGameOver(false);
    isGameOverRef.current = false;
    setIsPlaying(true);
    isPlayingRef.current = true;
    lastTickTime.current = performance.now();

    draw();

    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    animFrameId.current = requestAnimationFrame(update);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      if (!isPlayingRef.current) {
        if (e.key === " " || e.key === "Enter") startGame();
        return;
      }

      const dir = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (dir.y !== 1) { nextDirectionRef.current = { x: 0, y: -1 }; playRetroSound("turn"); }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (dir.y !== -1) { nextDirectionRef.current = { x: 0, y: 1 }; playRetroSound("turn"); }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (dir.x !== 1) { nextDirectionRef.current = { x: -1, y: 0 }; playRetroSound("turn"); }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (dir.x !== -1) { nextDirectionRef.current = { x: 1, y: 0 }; playRetroSound("turn"); }
          break;
      }
    },
    []
  );

  const handleControlClick = (dx: number, dy: number) => {
    if (!isPlayingRef.current) return;
    const dir = directionRef.current;
    if (dx !== 0 && dir.x !== -dx) {
        nextDirectionRef.current = { x: dx, y: 0 };
        playRetroSound("turn");
    }
    if (dy !== 0 && dir.y !== -dy) {
        nextDirectionRef.current = { x: 0, y: dy };
        playRetroSound("turn");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isPlayingRef.current && !isGameOverRef.current) {
      // Initial draw with a slight delay to ensure canvas is ready
      setTimeout(() => draw(), 100);
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mb-10 pixel-border bg-white p-4">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-dashed border-gray-300 pb-2">
        <div className="flex items-center gap-2">
          <ShieldAlert size={20} className="text-green-500" />
          <h3 className="font-pixel text-sm text-gray-800">BUG HUNTER</h3>
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
      <div className="relative w-full aspect-square bg-[#F8F9FA] pixel-border overflow-hidden select-none crt-effect neon-border">
        
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full block"
        />

        {/* Start / Game Over Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 p-4 text-center">
            {isGameOver ? (
              <>
                <h3 className="font-pixel text-red-500 text-xl mb-2 glitch-effect">
                  SYSTEM BREACHED!
                </h3>
                <p className="font-pixel text-[10px] text-white mb-6">
                  Final Score: {score.toString().padStart(4, "0")}
                </p>
                <button
                  onClick={startGame}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black font-pixel text-[10px] hover:bg-green-400 hover:text-black pixel-border group active:scale-95 transition-transform"
                >
                  <RotateCcw
                    size={14}
                    className="group-hover:-rotate-180 transition-transform duration-500"
                  />
                  REBOOT SYSTEM
                </button>
              </>
            ) : (
              <>
                <ShieldAlert size={32} className="text-green-400 mb-4 animate-bounce" />
                <h3 className="font-pixel text-green-400 text-lg mb-2">
                  DEFEND THE NETWORK
                </h3>
                <p className="font-pixel text-[8px] text-gray-300 mb-6 max-w-[200px] leading-relaxed">
                  Use arrow keys to hunt down bugs. Do not touch the firewall (walls) or yourself!
                </p>
                <button
                  onClick={startGame}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-pixel text-[10px] hover:bg-white hover:text-green-600 pixel-border animate-pulse active:scale-95 transition-all"
                >
                  <Play size={14} fill="currentColor" />
                  INITIATE
                </button>
              </>
            )}
          </div>
        )}

        {/* Live Score Display */}
        {isPlaying && (
          <div className="absolute top-2 right-2 text-[10px] font-pixel text-gray-400 opacity-50 z-0 pointer-events-none">
            {score.toString().padStart(4, "0")}
          </div>
        )}
      </div>

      {/* Mobile D-Pad Controls */}
      <div className="mt-4 grid grid-cols-3 gap-2 w-48 mx-auto sm:hidden">
        <div />
        <button
          onClick={() => handleControlClick(0, -1)}
          className="bg-gray-200 p-3 flex justify-center items-center active:bg-gray-400 pixel-border active:scale-95 transition-transform text-gray-700"
        >
          <ArrowUp size={24} />
        </button>
        <div />
        <button
          onClick={() => handleControlClick(-1, 0)}
          className="bg-gray-200 p-3 flex justify-center items-center active:bg-gray-400 pixel-border active:scale-95 transition-transform text-gray-700"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => handleControlClick(0, 1)}
          className="bg-gray-200 p-3 flex justify-center items-center active:bg-gray-400 pixel-border active:scale-95 transition-transform text-gray-700"
        >
          <ArrowDown size={24} />
        </button>
        <button
          onClick={() => handleControlClick(1, 0)}
          className="bg-gray-200 p-3 flex justify-center items-center active:bg-gray-400 pixel-border active:scale-95 transition-transform text-gray-700"
        >
          <ArrowRight size={24} />
        </button>
      </div>

    </div>
  );
}

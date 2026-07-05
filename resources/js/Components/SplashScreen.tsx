import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "../hooks/useAudio";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState("[ INSERT COIN TO START ]");
  const { playClickSound } = useAudio();

  useEffect(() => {
    // Automatically start after 2.5 seconds if user doesn't click
    const timer = setTimeout(() => {
      handleStart();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    if (!isVisible) return;
    playClickSound();
    setText("[ LOADING ASSETS... ]");
    
    // Fade out after a short delay
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleStart}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="text-center">
            <h1 className="font-pixel text-[#4285F4] text-2xl md:text-4xl mb-8 pixel-shadow-sm tracking-widest uppercase">
              REZA FAHLEVI
            </h1>
            <p className="font-pixel text-[#FBBC05] text-sm animate-pulse tracking-widest">
              {text}
            </p>
          </div>
          
          <div className="absolute bottom-10 text-[8px] font-pixel text-gray-600">
            © 2026 PIXEL STUDIOS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

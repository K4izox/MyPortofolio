import React from 'react';
import { useAchievement } from '../contexts/AchievementContext';
import { Trophy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AchievementToast() {
  const { currentToast, clearToast } = useAchievement();

  return (
    <div className="fixed top-20 right-4 z-50 pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            key={currentToast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="pointer-events-auto flex items-start gap-3 bg-[#FBBC05] text-[#111] p-3 pr-8 pixel-border pixel-shadow-sm max-w-xs relative"
          >
            <button 
              onClick={clearToast}
              className="absolute top-1 right-1 text-[#111] hover:text-white"
            >
              <X size={14} />
            </button>
            
            <div className="bg-white p-2 pixel-border-sm mt-1">
              <Trophy size={20} className="text-[#EA4335] animate-bounce" />
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[7px] font-pixel text-red-700 tracking-widest uppercase">
                Achievement Unlocked
              </span>
              <span className="text-[10px] font-pixel uppercase font-bold leading-tight text-[#111]">
                {currentToast.title}
              </span>
              <span className="text-xs font-mono leading-tight text-[#333] mt-1">
                {currentToast.description}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

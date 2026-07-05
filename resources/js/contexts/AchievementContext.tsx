import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface AchievementContextType {
  unlockedIds: string[];
  currentToast: Achievement | null;
  unlock: (achievement: Achievement) => void;
  clearToast: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const { playPowerUpSound } = useAudio();

  const unlock = useCallback((achievement: Achievement) => {
    setUnlockedIds(prev => {
      if (!prev.includes(achievement.id)) {
        setCurrentToast(achievement);
        playPowerUpSound();
        setTimeout(() => {
          setCurrentToast(current => current?.id === achievement.id ? null : current);
        }, 4000);
        return [...prev, achievement.id];
      }
      return prev;
    });
  }, [playPowerUpSound]);

  const clearToast = () => setCurrentToast(null);

  return (
    <AchievementContext.Provider value={{ unlockedIds, currentToast, unlock, clearToast }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievement() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievement must be used within an AchievementProvider');
  }
  return context;
}

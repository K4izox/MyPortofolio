import { useEffect, useState } from "react";
import { useAchievement } from "../contexts/AchievementContext";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode() {
  const [success, setSuccess] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const { unlock } = useAchievement();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      setInputSequence((prevSequence) => {
        const newSequence = [...prevSequence, key];
        
        // Keep only the last N characters where N is the length of KONAMI_CODE
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }

        // Check if sequences match
        if (newSequence.join("").toLowerCase() === KONAMI_CODE.join("").toLowerCase()) {
          setSuccess((prev) => {
            const newState = !prev;
            if (newState) {
              document.body.classList.add('hacker-mode');
              unlock({
                id: 'konami_master',
                title: 'Konami Master',
                description: 'Mengaktifkan Hacker Mode dengan kode rahasia legendaris.'
              });
            } else {
              document.body.classList.remove('hacker-mode');
            }
            return newState;
          });
          return []; // Reset after success
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return success;
}

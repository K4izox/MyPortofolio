import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playClickSound, playHoverSound } = useAudio();

  const togglePlay = () => {
    playClickSound();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        alert("⚠️ Musik gagal diputar. Pastikan file '/assets/bgm.m4a' tersedia atau coba lagi setelah file termuat (ukuran file mungkin besar).");
      });
    }
  };

  return (
    <>
      {/* Hidden audio element for better mobile browser support */}
      <audio ref={audioRef} src="/assets/bgm.m4a" loop preload="none" />
      
      <button
        onClick={togglePlay}
        onMouseEnter={playHoverSound}
        className="fixed bottom-6 right-6 z-50 bg-white border-4 border-black p-3 pixel-shadow hover:-translate-y-1 active:translate-y-1 transition-transform group"
        aria-label="Toggle Background Music"
        title="Toggle BGM"
      >
        <div className="flex items-center gap-2">
          <Music size={16} className={`text-gray-700 ${isPlaying ? 'animate-bounce text-[#4285F4]' : ''}`} />
          {isPlaying ? (
            <Volume2 size={16} className="text-[#34A853]" />
          ) : (
            <VolumeX size={16} className="text-[#EA4335]" />
          )}
        </div>
      </button>
    </>
  );
}

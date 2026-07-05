import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playClickSound, playHoverSound } = useAudio();

  useEffect(() => {
    // We create the audio element once
    audioRef.current = new Audio('/assets/bgm.m4a');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // low volume so it's not annoying
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    playClickSound();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Browsers might block autoplay if no interaction happened
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        alert("⚠️ Musik belum tersedia!\n\nSilakan masukkan lagu favorit Anda dengan nama 'bgm.mp3' ke dalam folder 'public/assets/'.");
      });
    }
  };

  return (
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
  );
}

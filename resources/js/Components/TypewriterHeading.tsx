import React, { useEffect, useState, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface Props {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  speed?: number;
}

export default function TypewriterHeading({ text, icon, className = "", speed = 40 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const { displayedText, isTyping } = useTypewriter(isVisible ? text : '', speed);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`flex items-center gap-3 ${className}`}>
      {icon && <span className={isVisible ? "animate-in zoom-in duration-500" : "opacity-0"}>{icon}</span>}
      <span>{displayedText}</span>
      {isTyping && <span className="w-3 h-5 bg-[#34A853] inline-block animate-pulse ml-1" />}
    </div>
  );
}

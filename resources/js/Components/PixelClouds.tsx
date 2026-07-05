import React from "react";
import { motion } from "motion/react";

export default function PixelClouds() {
  // Generate 4 static clouds at different vertical positions and varying speeds
  const clouds = [
    { id: 1, top: "10%", delay: 0, duration: 40, scale: 1 },
    { id: 2, top: "25%", delay: 15, duration: 55, scale: 0.7 },
    { id: 3, top: "40%", delay: 5, duration: 45, scale: 1.2 },
    { id: 4, top: "15%", delay: 25, duration: 60, scale: 0.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{ top: cloud.top, transform: `scale(${cloud.scale})` }}
          initial={{ x: "100vw" }}
          animate={{ x: "-20vw" }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
            delay: cloud.delay,
          }}
        >
          {/* Simple 8-bit Cloud SVG */}
          <svg width="48" height="16" viewBox="0 0 48 16" fill="#A0AEC0">
            <path d="M8,4 h8 v4 h-8 z M16,2 h16 v2 h-16 z M24,0 h8 v2 h-8 z M32,2 h8 v4 h-8 z M40,6 h8 v6 h-8 z M0,8 h48 v8 h-48 z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

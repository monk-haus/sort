"use client";

import { useState, useEffect, useRef } from "react";

const MARQUEE_TEXT = "ZERO CONFIG • AUTO-PILOT • HANDS FREE • VELOCITY TRACKING • ";
const REPEAT_COUNT = 8;

export default function MarqueeDivider() {
  const [isPaused, setIsPaused] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const scrollTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    let lastTime = Date.now();
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentY = window.scrollY;
      const deltaTime = currentTime - lastTime;
      const deltaY = Math.abs(currentY - lastY);

      if (deltaTime > 0) {
        const velocity = Math.min(deltaY / deltaTime, 3.0); 
        setScrollVelocity(velocity);

        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        
        scrollTimer.current = setTimeout(() => {
          setScrollVelocity(0);
        }, 150);
      }

      lastTime = currentTime;
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const stretchFactor = 1 + Math.min(scrollVelocity * 0.1, 0.15);
  const content = Array(REPEAT_COUNT).fill(MARQUEE_TEXT).join("");

  return (
    <div className="relative w-full z-30 -mt-8 md:-mt-12 pointer-events-none select-none overflow-hidden">
      <div 
        className="relative w-[110%] -ml-[5%] transform-gpu origin-center pointer-events-auto"
        style={{
          transform: `rotate(-2deg) scaleY(${stretchFactor})`,
          transition: "transform 0.1s ease-out",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div 
          className="absolute inset-0 bg-deep-violet translate-x-[4px] translate-y-[4px] border-y-2 border-deep-violet"
          aria-hidden="true"
        />

        <div className={`
          relative bg-deep-violet text-acid-lime 
          py-4 md:py-6 
          border-y-2 border-deep-violet 
          shadow-hard 
          overflow-hidden
          ${isPaused ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
        `}>
          <div className={`flex ${isPaused ? "pause-animation" : "animate-marquee"}`}>
            <div className="flex shrink-0 items-center whitespace-nowrap px-4">
              <span className="font-space-grotesk font-bold text-lg md:text-xl lg:text-2xl uppercase tracking-widest">
                {content}
              </span>
            </div>
            <div className="flex shrink-0 items-center whitespace-nowrap px-4">
              <span className="font-space-grotesk font-bold text-lg md:text-xl lg:text-2xl uppercase tracking-widest">
                {content}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClaimClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Open Waitlist Modal"); 
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`
          pointer-events-auto
          relative flex items-center justify-between 
          transition-all duration-300 ease-out
          bg-cream-puff/95 backdrop-blur-md
          border-2 border-deep-violet
          shadow-hard
          ${isMobile ? "w-full max-w-[95%] py-2 px-4 rounded-2xl" : "w-auto gap-12 py-3 px-8 rounded-full"}
        `}
      >
        <div className="flex-shrink-0">
          <a
            href="/"
            className="letter-wiggle block text-deep-violet no-underline"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span 
              className="font-pangaia text-xl md:text-2xl font-bold tracking-tight" 
              style={{ fontFamily: "var(--font-pangaia)" }}
            >
              {"sort.lat".split("").map((letter, index) => (
                <span key={index} className="inline-block origin-bottom">
                  {letter}
                </span>
              ))}
            </span>
          </a>
        </div>

        {!isMobile && (
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="squiggle-underline text-deep-violet font-space-grotesk text-xs font-bold uppercase tracking-widest hover:text-deep-violet/80 transition-colors"
            >
              How it Works
            </button>
          </div>
        )}

        <div className="flex-shrink-0">
          <button
            onClick={handleClaimClick}
            className={`
              relative 
              font-space-grotesk font-bold 
              border-2 border-deep-violet
              rounded-full
              transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
              bg-acid-lime text-deep-violet
              translate-x-0 translate-y-0
              shadow-none
              hover:-translate-y-1 hover:-translate-x-1
              hover:shadow-[4px_4px_0px_0px_var(--deep-violet)]
              active:translate-y-0 active:translate-x-0
              active:shadow-none
              ${isMobile ? "text-sm px-4 py-2" : "text-base px-6 py-2.5"}
            `}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Claim Handle
          </button>
        </div>
      </div>
    </header>
  );
}
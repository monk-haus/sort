"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { joinWaitlist } from "../actions";

export default function Footer() {
  const [step, setStep] = useState<'handle' | 'email' | 'success'>('handle');
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (handle.length < 3) return setError("Handle too short.");
    setStep('email');
  };

  const handleStepTwo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("handle", handle);
    formData.append("email", email);

    const result = await joinWaitlist({ status: 'idle', message: '' }, formData);
    setLoading(false);

    if (result.status === 'success') {
      setStep('success');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.9 }, colors: ['#D4FF00', '#1A0B2E'] });
    } else {
      setError(result.message);
      if (result.message.includes('handle')) setStep('handle');
    }
  };

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-deep-violet text-cream-puff overflow-hidden mt-12 md:mt-0">
      
      <div className="absolute top-0 left-0 right-0 w-full h-12 md:h-20 overflow-hidden pointer-events-none translate-y-[-99%]">
        <svg
          className="w-full h-full text-deep-violet"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,80 L30,65 L60,72 L90,58 L120,75 L150,52 L180,68 L210,48 L240,72 L270,45 L300,65 L330,42 L360,70 L390,38 L420,62 L450,35 L480,58 L510,32 L540,55 L570,30 L600,52 L630,28 L660,50 L690,25 L720,48 L750,22 L780,45 L810,20 L840,42 L870,18 L900,40 L930,15 L960,38 L990,12 L1020,35 L1050,10 L1080,32 L1110,8 L1140,30 L1170,5 L1200,28 L1200,80 L0,80 Z" />
        </svg>
      </div>

      <div className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          <section id="claim-handle" className="text-center mb-16 md:mb-24 relative z-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-cream-puff" style={{ fontFamily: "var(--font-pangaia)" }}>
              The line starts here.
            </h2>
            <p className="text-lg md:text-xl text-cream-puff/80 mb-8 md:mb-12 font-space-grotesk max-w-2xl mx-auto px-4">
              Batch 01 is closing. Secure your handle before the public launch.
            </p>

            <div className="max-w-xl md:max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-acid-lime to-hot-coral rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
              
              <div className="relative bg-deep-violet border-2 border-cream-puff rounded-2xl p-2 md:p-3 overflow-hidden shadow-hard-sm">
                
                {step === 'success' ? (
                   <div className="h-14 md:h-16 flex items-center justify-center gap-2 text-acid-lime font-bold font-space-grotesk text-xl">
                    <span>You're on the list.</span>
                  </div>
                ) : (
                  <form onSubmit={step === 'handle' ? handleStepOne : handleStepTwo} className="flex items-center gap-3">
                    {step === 'handle' && (
                      <span className="flex items-center pl-3 md:pl-4 pr-1 text-cream-puff/50 font-space-grotesk font-bold text-base md:text-lg whitespace-nowrap select-none">
                        sort.lat/
                      </span>
                    )}
                    
                    <input
                      type={step === 'handle' ? "text" : "email"}
                      value={step === 'handle' ? handle : email}
                      onChange={(e) => step === 'handle' ? setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')) : setEmail(e.target.value)}
                      placeholder={step === 'handle' ? "username" : "verify email"}
                      className={`flex-1 bg-transparent border-none outline-none font-bold text-cream-puff placeholder-cream-puff/20 font-space-grotesk h-14 md:h-16 text-lg md:text-2xl min-w-0 ${step === 'email' ? 'pl-4' : ''}`}
                      autoComplete="off"
                      spellCheck="false"
                      disabled={loading}
                      autoFocus={step === 'email'}
                    />
                    
                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={() => setIsHoveringSubmit(true)}
                      onMouseLeave={() => setIsHoveringSubmit(false)}
                      className={`
                        relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl
                        bg-acid-lime text-deep-violet flex items-center justify-center
                        border-2 border-deep-violet transition-all duration-300
                        hover:scale-105 hover:rotate-3 active:scale-95 shadow-hard-sm
                        disabled:opacity-50
                      `}
                    >
                      {loading ? (
                        <span className="animate-spin">↻</span>
                      ) : (
                        <svg className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 ${isHoveringSubmit ? "rotate-[-45deg]" : "rotate-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
             {error && <div className="mt-4 font-space-grotesk font-bold text-hot-coral animate-pulse">{error}</div>}
          </section>

          <section className="relative mb-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none w-full text-center overflow-visible" style={{ fontFamily: "var(--font-pangaia)" }}>
              <span className="text-[20vw] leading-none font-bold text-cream-puff whitespace-nowrap block translate-y-[10%]">sort.lat</span>
            </div>
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <a href="https://x.com/joinsort" target="_blank" rel="noopener noreferrer" className="group relative bg-cream-puff text-deep-violet px-5 py-2 md:px-6 md:py-3 rounded-sm font-space-grotesk font-bold text-sm md:text-base border-2 border-deep-violet shadow-hard-sm transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-hard hover:z-20" style={{ transform: "rotate(-3deg)" }}>[ X ]</a>
              <a href="mailto:support@sort.la" className="group relative bg-acid-lime text-deep-violet px-5 py-2 md:px-6 md:py-3 rounded-sm font-space-grotesk font-bold text-sm md:text-base border-2 border-deep-violet shadow-hard-sm transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-hard hover:z-20" style={{ transform: "rotate(2deg)" }}>[ Email ]</a>
              <a href="https://instagram.com/joinsortla" target="_blank" rel="noopener noreferrer" className="group relative bg-hot-coral text-white px-5 py-2 md:px-6 md:py-3 rounded-sm font-space-grotesk font-bold text-sm md:text-base border-2 border-deep-violet shadow-hard-sm transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-hard hover:z-20" style={{ transform: "rotate(-2deg)" }}>[ Instagram ]</a>
            </div>
          </section>

          <section className="relative z-10 border-t-2 border-cream-puff/10 pt-8 mt-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-space-grotesk font-medium text-cream-puff/40">
              <div>© 2026 sort.lat</div>
              <div>designed and developed by <a href="https://monk.haus" target="_blank" rel="noopener noreferrer" className="text-cream-puff/60 hover:text-acid-lime transition-colors duration-300">monk</a></div>
            </div>
          </section>
        </div>
      </div>

      <button onClick={scrollToTop} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-deep-violet border-2 border-acid-lime flex items-center justify-center shadow-[4px_4px_0_0_var(--acid-lime)] hover:shadow-[2px_2px_0_0_var(--acid-lime)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group active:translate-x-[4px] active:translate-y-[4px] active:shadow-none" aria-label="Scroll to top">
        <div className="absolute inset-0 rounded-full bg-acid-lime opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
        <svg className="w-5 h-5 md:w-7 md:h-7 text-acid-lime relative z-10 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
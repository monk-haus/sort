"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { joinWaitlist } from "../actions";

export default function Hero() {
  const [step, setStep] = useState<'handle' | 'email' | 'success'>('handle');
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHoveringClaim, setIsHoveringClaim] = useState(false);

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (handle.length < 3) {
      setError("Handle too short.");
      return;
    }
    const handleRegex = /^[a-zA-Z0-9_]+$/;
    if (!handleRegex.test(handle)) {
      setError("Letters, numbers & underscores only.");
      return;
    }

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
      triggerConfetti();
    } else {
      setError(result.message);
      if (result.message.includes('handle')) {
        setStep('handle');
      }
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#D4FF00', '#1A0B2E', '#FF6B6B'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 md:px-8 min-h-[85vh] flex flex-col justify-center overflow-hidden">
      
      <div className="max-w-5xl mx-auto text-center z-10 relative">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full border-2 border-deep-violet bg-white mb-8 shadow-hard-sm transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default relative select-none">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-deep-violet/10 rounded-r-full border-r border-deep-violet/20"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-deep-violet/10 rounded-l-full border-l border-deep-violet/20"></div>
          
          <div className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold font-space-grotesk uppercase tracking-wider text-deep-violet">
            WAITLIST OPEN: BATCH 01
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 text-deep-violet leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-pangaia)" }}
        >
          Your profile is{" "}
          <br className="hidden md:block" />
          <span className="relative inline-block px-2">
            <span className="relative z-10 font-bold">stuck</span>
            <span className="relative z-10"> in the past.</span>
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-deep-violet/80 mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-space-grotesk px-4">
          Meet the profile that rearranges itself.{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10 font-bold text-deep-violet bg-acid-lime px-2 py-0.5 rounded-md mx-1">
              sort.lat
            </span>
          </span>{" "}
          tracks velocity and pushes your best links to the top, automatically.
        </p>

        <div className="max-w-[90%] md:max-w-lg mx-auto relative group">
          
          <div
            className={`absolute inset-0 bg-deep-violet rounded-2xl transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHoveringClaim
                ? "translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3"
                : "translate-x-1.5 md:translate-x-2 translate-y-1.5 md:translate-y-2"
            }`}
          />
          
          <div className="relative bg-white border-[3px] border-deep-violet rounded-2xl overflow-hidden p-1.5 md:p-2 transition-colors duration-300">
            
            {step === 'success' ? (
              <div className="h-12 md:h-16 flex items-center justify-center gap-2 text-deep-violet font-bold font-space-grotesk text-lg md:text-xl">
                <span>See you inside.</span>
                <span className="text-2xl">⚡</span>
              </div>
            ) : (
              <form 
                onSubmit={step === 'handle' ? handleStepOne : handleStepTwo}
                className="flex items-center w-full"
              >
                {step === 'handle' && (
                  <span className="flex items-center pl-3 md:pl-4 pr-1 text-deep-violet/40 font-space-grotesk font-bold text-sm md:text-base whitespace-nowrap select-none">
                    sort.lat/
                  </span>
                )}

                <input
                  type={step === 'handle' ? "text" : "email"}
                  value={step === 'handle' ? handle : email}
                  onChange={(e) => step === 'handle' ? setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')) : setEmail(e.target.value)}
                  placeholder={step === 'handle' ? "username" : "enter your email"}
                  className={`flex-1 bg-transparent border-none outline-none font-bold text-deep-violet placeholder-deep-violet/20 font-space-grotesk h-12 md:h-16 text-base md:text-2xl min-w-0 ${step === 'email' ? 'pl-4' : ''}`}
                  autoComplete="off"
                  spellCheck="false"
                  disabled={loading}
                  autoFocus={step === 'email'}
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => setIsHoveringClaim(true)}
                  onMouseLeave={() => setIsHoveringClaim(false)}
                  className={`
                    relative flex-shrink-0
                    font-space-grotesk font-bold
                    border-2 border-deep-violet
                    rounded-xl
                    transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
                    bg-acid-lime text-deep-violet
                    px-5 md:px-8 py-3 md:py-4
                    text-sm md:text-base
                    hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_var(--deep-violet)]
                    active:translate-y-0 active:translate-x-0 active:shadow-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {loading ? "..." : step === 'handle' ? "Claim" : "Lock It"}
                </button>
              </form>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 font-space-grotesk font-bold text-hot-coral animate-pulse">
            {error}
          </div>
        )}

      </div>
    </section>
  );
}
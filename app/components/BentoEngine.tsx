"use client";

import { useState, useEffect } from "react";

function VelocityCounter() {
  const [value, setValue] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 15) return 12;
        return prev + 1;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-deep-violet self-end font-space-grotesk tracking-tighter transition-all duration-500">
      +{value}%
    </div>
  );
}

function ToggleSwitch() {
  return (
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-acid-lime flex items-center justify-center mb-4 bg-deep-violet relative transition-transform duration-300 md:group-hover:scale-110">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-acid-lime flex items-center justify-center">
        <span className="text-2xl md:text-3xl select-none">⚡</span>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-acid-lime text-deep-violet text-[10px] font-bold px-2 py-0.5 rounded-full border border-deep-violet shadow-sm">
        ON
      </div>
    </div>
  );
}

export default function BentoEngine() {
  return (
    <section id="how-it-works" className="pt-24 pb-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-6xl font-bold mb-4 text-deep-violet" 
            style={{ fontFamily: "var(--font-pangaia)" }}
          >
            The Bento Engine
          </h2>
          <p className="text-lg text-deep-violet/70 font-space-grotesk max-w-2xl mx-auto">
            The only link-in-bio that thinks for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(300px,auto)]">
          
          <div className="col-span-1 md:col-span-2 relative bg-white border-2 border-deep-violet rounded-[2rem] p-6 md:p-8 shadow-hard overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--deep-violet)]">
            
            <div className="absolute top-0 right-0 p-4 md:p-6 z-20">
              <span className="bg-hot-coral text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase border-2 border-deep-violet shadow-sm">
                CONTEXT AWARE
              </span>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-pangaia mb-3 md:mb-4 text-deep-violet">
                  The Detective
                </h3>
                <h4 className="text-lg md:text-xl font-bold font-space-grotesk text-deep-violet mb-3">
                  We change the room based on who is entering.
                </h4>
                <p className="font-space-grotesk text-deep-violet/80 text-base md:text-lg max-w-md">
                  Incoming from TikTok? We hide your LinkedIn and pulse your YouTube. Incoming from NYC? We show tickets to your Brooklyn show.
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-40 flex items-end justify-end p-4 md:p-6 opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity">
              
              <div className="relative flex items-center gap-3 transition-transform duration-500 ease-out md:translate-x-[-10px] md:group-hover:translate-x-0 z-20">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-xl flex items-center justify-center border-2 border-deep-violet shadow-hard-sm">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.65 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div className="w-2 h-2 bg-acid-lime rounded-full animate-pulse"></div>
              </div>

              <div className="relative transition-transform duration-500 ease-out delay-100 md:translate-x-[20px] md:group-hover:translate-x-0">
                
                <div className="absolute inset-0 bg-white border-2 border-deep-violet rounded-xl translate-x-2 translate-y-2 rotate-6 z-0" aria-hidden="true"></div>
                
                <div className="relative z-10 bg-acid-lime border-2 border-deep-violet rounded-xl p-3 md:p-4 shadow-hard-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-deep-violet rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-acid-lime" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs md:text-sm font-bold text-deep-violet font-space-grotesk whitespace-nowrap">Latest Video</div>
                      <div className="text-[10px] text-deep-violet/60 whitespace-nowrap">Just dropped</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="col-span-1 bg-acid-lime border-2 border-deep-violet rounded-[2rem] p-6 md:p-8 shadow-hard flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--deep-violet)] transition-all duration-300 min-h-[300px] md:min-h-[350px]">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-pangaia mb-2 text-deep-violet">Velocity</h3>
              <h4 className="text-lg md:text-xl font-bold font-space-grotesk text-deep-violet mb-2">
                Momentum, not just clicks.
              </h4>
              <p className="font-space-grotesk text-deep-violet font-medium text-sm md:text-base">
                We track the acceleration of every link. If it heats up, it moves up.
              </p>
            </div>
            <VelocityCounter />
          </div>

          <div className="col-span-1 bg-deep-violet border-2 border-deep-violet rounded-[2rem] p-6 md:p-8 shadow-hard text-cream-puff flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--deep-violet)] transition-all duration-300 min-h-[300px] md:min-h-[350px]">
            <ToggleSwitch />
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-pangaia mb-2 text-white">Auto-Pilot</h3>
              <h4 className="text-lg md:text-xl font-bold font-space-grotesk text-white mb-2">
                Lazy is smart.
              </h4>
              <p className="font-space-grotesk text-white/80 text-sm md:text-base">
                Enable Auto-Pilot once. We reorder your grid every 60 minutes.
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-cream-puff border-2 border-deep-violet rounded-[2rem] p-6 md:p-8 shadow-hard relative overflow-hidden group hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--deep-violet)] transition-all duration-300">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(var(--deep-violet)_1px,transparent_1px),linear-gradient(90deg,var(--deep-violet)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between h-full gap-8">
              <div className="max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold font-pangaia mb-3 text-deep-violet">
                  Zero Layout Shift
                </h3>
                <h4 className="text-lg md:text-xl font-bold font-space-grotesk text-deep-violet mb-2">
                  Computed at the Edge.
                </h4>
                <p className="font-space-grotesk text-deep-violet/80 text-sm md:text-base">
                  No loading spinners. No client-side shuffling. Your profile is pre-built on the server before the pixel even paints. It is instant.
                </p>
              </div>
              
              <div className="w-full lg:w-auto bg-white border-2 border-deep-violet p-4 md:p-5 rounded-xl font-mono text-xs md:text-sm text-deep-violet shadow-hard-sm overflow-x-auto md:group-hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-deep-violet/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-hot-coral"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-acid-lime"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-deep-violet/30"></div>
                  </div>
                  <span className="text-[10px] text-deep-violet/60 ml-2">edge-function.js</span>
                </div>
                <div className="whitespace-nowrap">
                  <p className="mb-1.5 text-deep-violet/40">// Edge Function</p>
                  <p className="mb-1.5">
                    <span className="text-hot-coral font-bold">if</span> (source === <span className="text-acid-lime">'insta'</span>)
                  </p>
                  <p className="pl-4 mb-1.5">
                    layout.<span className="text-deep-violet font-bold">reorder</span>(<span className="text-acid-lime">'video'</span>);
                  </p>
                  <p className="pl-4">
                    <span className="text-hot-coral font-bold">return</span> <span className="text-deep-violet font-bold">Response</span>;
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
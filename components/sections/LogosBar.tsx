"use client";

export default function LogosBar() {
  return (
    <section aria-label="Design tools" className="section">
      <div className="container-max">
        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
              {/* Figma */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12" aria-hidden="true">
                  <svg viewBox="0 0 48 48" className="h-12 w-12">
                    <path d="M18 6h6a6 6 0 010 12h-6z" fill="#F24E1E"/>
                    <path d="M24 18h6a6 6 0 010 12h-6z" fill="#1ABCFE"/>
                    <path d="M24 30a6 6 0 11-12 0 6 6 0 0112 0z" fill="#0ACF83"/>
                    <path d="M18 6h6a6 6 0 016 6 6 6 0 01-6 6h-6z" fill="#FF7262" opacity=".9"/>
                    <path d="M18 18h6a6 6 0 01-6 6h0a6 6 0 010-12z" fill="#A259FF"/>
                  </svg>
                </div>
                <span className="text-xs text-foreground/70">Figma</span>
              </div>

              {/* Illustrator */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-[10px] bg-[#300] ring-1 ring-white/10 flex items-center justify-center" aria-hidden="true">
                  <span className="text-[#FF9A00] font-bold text-lg">Ai</span>
                </div>
                <span className="text-xs text-foreground/70">Illustrator</span>
              </div>

              {/* Photoshop */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-[10px] bg-[#001E36] ring-1 ring-white/10 flex items-center justify-center" aria-hidden="true">
                  <span className="text-[#31A8FF] font-bold text-lg">Ps</span>
                </div>
                <span className="text-xs text-foreground/70">Photoshop</span>
              </div>

              {/* After Effects */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-[10px] bg-[#2E004B] ring-1 ring-white/10 flex items-center justify-center" aria-hidden="true">
                  <span className="text-[#D291FF] font-bold text-lg">Ae</span>
                </div>
                <span className="text-xs text-foreground/70">After Effects</span>
              </div>

              {/* Blender */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-[10px] bg-white/10 ring-1 ring-white/10 flex items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
                    <path d="M27 20l11 6-16 1 12 8" stroke="#F5792A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="42" cy="36" r="8" fill="#F5792A"/>
                    <circle cx="42" cy="36" r="4" fill="#2C384A"/>
                  </svg>
                </div>
                <span className="text-xs text-foreground/70">Blender</span>
              </div>

              {/* Framer */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-[10px] bg-black ring-1 ring-white/10 flex items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white">
                    <path d="M5 3h14v6H12l7 7H5v-6h7L5 3z"/>
                  </svg>
                </div>
                <span className="text-xs text-foreground/70">Framer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';

export default function About() {
  const skills = ['Rhino 7', 'Fusion 360', 'Keyshot', 'Illustrator', 'Photoshop', 'Figma'];
  const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(id, { offset: -80 });
    } else {
      const target = document.querySelector(id) as HTMLElement | null;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
 
  return (
    <section id="about" className="section relative">
      <SectionSpotlights />
      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        {/* Portrait */}
        <MotionDiv className="relative md:col-span-5 md:self-stretch md:min-h-[520px] card p-0 overflow-hidden group aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-full" y={12}>
          <video
            src="/kunal_about_final.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/kunal.jpg"
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-md bg-black/60 border border-white/10 text-[16px] text-white/80 backdrop-blur">Kunal • Product Designer</span>
          </div>
        </MotionDiv>
        {/* Profile/Intro */}
        <MotionDiv className="relative md:col-span-7 md:h-full md:self-stretch md:min-h-[520px] card p-8 hover-glow overflow-hidden" y={10}>
          <SweepLine position="top" color="orange" />
          {/* Accent glow */}
          <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-orange-500/25 via-white/10 to-transparent blur-2xl" />

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-wider text-foreground/70">About Me</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
          Design + Functional Aesthetics
          </h2>
          <p className="mt-4 text-foreground/70 leading-relaxed">
          Product Designer in travel gear, crafting innovative, functional solutions for global brands through trend research, 3D modeling, and prototyping.
          </p>

          {/* Skills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-foreground/70">
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" onClick={(e) => scrollToId(e, '#contact')} className="px-4 py-2 rounded-lg bg-orange-500 text-black font-semibold shadow-[0_0_0_2px_rgba(255,255,255,0.08)_inset] hover:brightness-95 transition">Get in touch</a>
            <a href="#works" onClick={(e) => scrollToId(e, '#works')} className="px-4 py-2 rounded-lg border border-white/15 text-foreground/80 hover:text-foreground hover:border-white/30 transition">View work</a>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
              <div className="text-2xl font-extrabold">2+ </div>
              <div className="text-xs text-foreground/60">
                <span className="block md:hidden">Years<br/>Experience</span>
                <span className="hidden md:inline">Years Experience</span>
              </div>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
              <div className="text-2xl font-extrabold">15+ </div>
              <div className="text-xs text-foreground/60">Projects</div>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
              <div className="text-2xl font-extrabold">3+ </div>
              <div className="text-xs text-foreground/60">Global Brands</div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}

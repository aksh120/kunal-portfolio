"use client";
import { motion, useMotionValue } from 'framer-motion';
import { MotionDiv, SweepLine } from './primitives';
import { useRef, type MouseEvent } from 'react';
import SectionHeader from '@/components/SectionHeader';

/* Replaced numeric counters and trophy banner with an animated achievements showcase */

function MedalIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 5.4l1 2 2.2.3-1.6 1.6.38 2.3L12 10.4 9.98 11.6l.38-2.3L8.8 7.7 11 7.4 12 5.4Z"
        fill="currentColor"
      />
      <path d="M9.5 13.5v6l2.5-1.4 2.5 1.4v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TiltCard({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const dx = (px / rect.width - 0.5) * 12; // tilt range
    const dy = (py / rect.height - 0.5) * 12;
    ry.set(dx);
    rx.set(-dy);
    el.style.setProperty('--px', `${px}px`);
    el.style.setProperty('--py', `${py}px`);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative"
      aria-label={label}
    >
      <div className="relative rounded-2xl overflow-hidden">
        {/* Gradient ring that lights up on hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-500/35 via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card body */}
        <div className="relative z-[1] rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm">
          <SweepLine position="top" color="orange" />
          {/* Cursor-follow shine */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background:
                'radial-gradient(200px 160px at var(--px) var(--py), rgba(255,255,255,0.14), transparent 60%)',
            }}
          />

          <div className="flex items-center gap-2 text-foreground/70 text-xs md:text-sm mb-2">
            <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-black shadow-[0_0_24px_rgba(255,106,0,0.5)]">
              <MedalIcon className="h-4 w-4" />
            </span>
            <span>Achievement</span>
          </div>

          <div className="text-base md:text-lg font-semibold tracking-tight text-white/90">{label}</div>
        </div>

        {/* subtle corner shimmer */}
        <motion.span
          className="pointer-events-none absolute -top-2 -right-2 h-12 w-12 rounded-full bg-white/10 blur-xl"
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const achievements = [
    'Winner in HackMITWPU 2023',
    'Sonae E‑Bike Design Challenge',
    'Royal Enfield (Art of Motorcycling)'
  ];

  return (
    <section id="achievements" className="section relative">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        <motion.div
          className="absolute top-8 left-8 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.25),transparent_70%)]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-8 right-8 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent_70%)]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />

        {/* Orbiting dots */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-orange-400 shadow-[0_0_24px_rgba(255,106,0,0.8)]" />
          <div className="absolute -bottom-1 left-1/3 h-2 w-2 -translate-x-1/2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.6)]" />
        </motion.div>
      </div>

      <SectionHeader title="Achievements" align="center" />

      {/* Achievements list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {achievements.map((label, i) => (
          <MotionDiv key={label} y={14} delay={i * 0.05}>
            <TiltCard label={label} />
          </MotionDiv>
        ))}
      </div>

      {/* Scrolling ribbon */}
      <MotionDiv y={12} delay={0.2} className="relative mt-8 md:mt-12 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="scanline-mask absolute inset-0" />
        <div className="animate-scroll whitespace-nowrap py-3 md:py-4 text-xs md:text-sm tracking-widest text-foreground/70">
          {Array.from({ length: 4 }).map((_, r) => (
            <span key={r} className="mr-6">
              {achievements.map((a, idx) => (
                <span key={`${r}-${idx}`} className="mr-6">
                  {a} <span className="mx-3 text-white/30">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
}

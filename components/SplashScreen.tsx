"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SplashScreen({ onDone, minDuration = 1500 }: { onDone: () => void; minDuration?: number }) {
  const prefersReduced = useReducedMotion();
  const [closing, setClosing] = useState(false);

  // Stop Lenis + lock scroll while splash is visible
  useEffect(() => {
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow };
    const lenis = window.lenis;
    if (lenis) lenis.stop();
    html.style.overflow = "hidden";

    let exitTimer: number | undefined;
    const timer = window.setTimeout(() => {
      setClosing(true);
      // allow exit animations to play before signaling done
      exitTimer = window.setTimeout(() => {
        if (lenis) lenis.start();
        html.style.overflow = prev.overflow;
        onDone();
      }, 450);
    }, minDuration);

    return () => {
      clearTimeout(timer);
      if (exitTimer !== undefined) clearTimeout(exitTimer);
      html.style.overflow = prev.overflow;
      if (lenis) lenis.start();
    };
  }, [minDuration, onDone]);

  // Randomized spark positions for subtle shimmer
  const sparks = useMemo(() => Array.from({ length: 10 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 6 + Math.random() * 10,
    delay: Math.random() * 0.8,
  })), []);

  // Keep mounted; parent unmounts after onDone for exit animation to play

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[999] bg-black text-white overflow-hidden"
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      aria-label="Loading"
      role="status"
    >
      {/* Ambient background gradients */}
      <motion.div
        className="absolute -inset-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(238,72,24,0.22), transparent 70%) 18% 22% / 40% 40% no-repeat, " +
            "radial-gradient(closest-side, rgba(255,255,255,0.12), transparent 70%) 82% 18% / 45% 45% no-repeat",
        }}
        animate={prefersReduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={prefersReduced ? undefined : { duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Conic halo spinner */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{ background: "conic-gradient(from 0deg, rgba(238,72,24,0.5), rgba(255,255,255,0.2), rgba(238,72,24,0.5))" }}
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={prefersReduced ? undefined : { duration: 12, ease: "linear", repeat: Infinity }}
      />

      {/* Center core with mask-reveal sweep */}
      <div className="absolute left-1/2 top-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        <motion.div
          className="absolute inset-0"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent 70%)" }}
          animate={prefersReduced ? undefined : { scale: [1, 1.04, 1] }}
          transition={prefersReduced ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity }}
        />
        {/* Sweep line */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.25), transparent 60%)" }}
          animate={prefersReduced ? undefined : { x: ["-120%", "140%"], opacity: [0, 1, 0] }}
          transition={prefersReduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Brand wordmark with kinetic reveal */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] select-none">
        <motion.h1
          initial={{ letterSpacing: "0.4em", opacity: 0, y: 20 }}
          animate={{ letterSpacing: "0.12em", opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] md:text-[8vw] font-extrabold tracking-[0.12em] bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_6px_22px_rgba(238,72,24,0.18)]"
        >
          KUNAL
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center text-white/60 tracking-widest text-[11px] md:text-xs"
        >
          PRODUCT DESIGNER • MOTION • SYSTEMS
        </motion.div>
      </div>

      {/* Progress indicator with shimmer dots */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 w-[64vw] max-w-md">
        <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ee4818] via-white to-[#ee4818]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: Math.max(minDuration / 1000, 1.2), ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="relative mt-3 h-6">
          {sparks.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.7)]"
              style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
              animate={prefersReduced ? undefined : { opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      {/* Exit mask reveal */}
      <motion.div
        initial={{ clipPath: "circle(12% at 50% 50%)" }}
        animate={{ clipPath: closing ? "circle(140% at 50% 50%)" : "circle(12% at 50% 50%)" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(238,72,24,0.18), transparent 65%)" }}
      />
    </motion.div>
  );
}

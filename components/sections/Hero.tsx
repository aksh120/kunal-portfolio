"use client";
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Interactive tilt for the hero image card
  const tiltX = useSpring(0, { stiffness: 120, damping: 12 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;  // 0..1
    tiltY.set((x - 0.5) * 12); // left/right
    tiltX.set((0.5 - y) * 12); // up/down
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const onCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -80 });
    } else {
      const target = document.querySelector('#contact') as HTMLElement | null;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-center">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_10%_-10%,rgba(238,72,24,0.12),transparent_60%),radial-gradient(1000px_circle_at_110%_10%,rgba(255,255,255,0.08),transparent_60%),linear-gradient(to_bottom,#0a0a0a,#000)]" />

      {/* Subtle grid for depth */}
      <div className="hero-grid absolute inset-0 opacity-[0.08]" />

      {/* Animated aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute -inset-40 blur-3xl"
        initial={{ opacity: 0.4 }}
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(closest-side, rgba(238,72,24,0.18), transparent 70%) 10% 20% / 40% 40% no-repeat, radial-gradient(closest-side, rgba(255,255,255,0.12), transparent 70%) 80% 20% / 45% 45% no-repeat',
        }}
      />

      {/* Cursor spotlight removed per request */}

      {/* Content */}
      <div className="relative z-[2] mb-[50px] container-max pt-28 md:pt-36 pb-16 mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 text-center md:text-left"
          >

            <h1 className="mb-6 heading font-extrabold tracking-tight leading-[1.06] pb-[0.04em] text-[15vw] sm:text-[13vw] md:text-[7vw] lg:text-[86px] bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              Product Designer
            </h1>

            <p className="mt-5 text-white/70 max-w-xl md:max-w-2xl md:pr-6">
            Innovative Product Designer creating user-centered solutions through Innovation, 3D modeling, prototyping, and design thinking—balancing form, function, and aesthetics.
            </p>

            <div className="mt-8 flex items-center md:justify-start justify-center gap-3">
              <motion.a
                href="#contact"
                onClick={onCtaClick}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#ee4818] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(238,72,24,0.35)]"
              >
                Get in touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 7H17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.a>
              <motion.a
                href="#works"
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-6 py-3 text-sm text-white/85 backdrop-blur hover:border-white/25"
              >
                View work
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Hero image card - distinct, intentional */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative w-full max-w-md mx-auto md:ml-auto">
              {/* Halo */}
              <div className="absolute -inset-10 -z-10 blur-3xl opacity-70" style={{
                background:
                  'radial-gradient(closest-side, rgba(238,72,24,0.25), transparent 70%) 30% 30% / 60% 60% no-repeat, radial-gradient(closest-side, rgba(255,255,255,0.12), transparent 70%) 70% 60% / 60% 60% no-repeat'
              }} />

              {/* Holographic portal portrait */}
              <motion.div
                className="relative w-full aspect-square md:h-[520px] md:aspect-auto"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformPerspective: 1000, rotateX: tiltX, rotateY: tiltY }}
              >
                {/* Spectral ring */}
                <div className={`absolute inset-0 rounded-full ${reduceMotion ? '' : 'animate-[spin_12s_linear_infinite]'}`}
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(238,72,24,0.95), rgba(255,255,255,0.35), rgba(238,72,24,0.95), rgba(255,255,255,0.45), rgba(238,72,24,0.95))'
                  }}
                />
                {/* Glow */}
                <div className="absolute -inset-3 rounded-full blur-2xl opacity-40"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(238,72,24,0.55), rgba(255,255,255,0.15), rgba(238,72,24,0.55))'
                  }}
                />

                {/* Content bubble (cuts inside of ring) */}
                <div className="absolute inset-[10px] rounded-full overflow-hidden bg-black/50 backdrop-blur">
                  {/* Ken Burns motion */}
                  <motion.div
                    initial={{ scale: 1, x: 0, y: 0 }}
                    animate={reduceMotion ? undefined : { scale: 1.06, x: 8, y: -6 }}
                    transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/kunal.jpg"
                      alt="Kunal — Hero portrait"
                      fill
                      className="object-cover object-[40%_35%]"
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 45vw, 90vw"
                      priority
                    />
                  </motion.div>

                  {/* Aurora tint */}
                  <div className="absolute inset-0 mix-blend-overlay"
                    style={{ background: 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.18), transparent 60%)' }}
                  />

                  {/* Vignette */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(110% 85% at 50% 50%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.45) 100%)' }}
                  />

                  {/* Sheen */}
                  <div className={`absolute inset-0 pointer-events-none mix-blend-screen ${reduceMotion ? '' : 'animate-[spin_20s_linear_infinite]'}`}
                    style={{ background: 'conic-gradient(from 120deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06), transparent 40%, transparent 70%, rgba(255,255,255,0.18))' }}
                  />
                </div>

                {/* Orbiting accents */}
                <div className="absolute inset-0">
                  <div className={`${reduceMotion ? '' : 'animate-[spin_9s_linear_infinite]'} absolute left-1/2 top-1/2`} style={{ transform: 'translate(-50%, -50%)' }}>
                    <span className="block h-2 w-2 rounded-full bg-[#ee4818] shadow-[0_0_18px_rgba(238,72,24,0.8)]" style={{ transform: 'translateX(180px)' }} />
                  </div>
                  <div className={`${reduceMotion ? '' : 'animate-[spin_14s_linear_infinite]'} absolute left-1/2 top-1/2`} style={{ transform: 'translate(-50%, -50%) rotate(140deg)' }}>
                    <span className="block h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.8)]" style={{ transform: 'translateX(145px)' }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

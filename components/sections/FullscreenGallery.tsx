"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { WheelEvent as ReactWheelEvent, TouchEvent as ReactTouchEvent } from 'react';

export type GalleryProject = {
  title: string;
  tag: string;
  image: string;
  logo?: string; // optional brand logo image URL
  brand?: string; // optional short brand name
};

function deriveBrand(title: string): string {
  try {
    const base = (title ?? '').split('|')[0].split('-')[0].replace(/\(.*?\)/g, '').trim();
    const cleaned = base || (title ?? '').trim();
    return cleaned.length > 0 ? cleaned : 'Project';
  } catch {
    return 'Project';
  }
}

export default function FullscreenGallery({
  open,
  onClose,
  title,
  subtitle,
  projects,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  projects: GalleryProject[];
}) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const scrollYRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number>(0);
  const wheelLockRef = useRef(0);

  // Container only fades to avoid duplicate UI elements during crossfade
  const slideVariants = {
    enter: (_dir: 1 | -1) => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: (_dir: 1 | -1) => ({ opacity: 0 }),
  } as const;

  // Image morph: subtle scale + blur crossfade
  const imageVariants = {
    enter: (_dir: 1 | -1) => ({ opacity: 0, scale: 1.04, filter: 'blur(8px)' }),
    center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (_dir: 1 | -1) => ({ opacity: 0, scale: 0.98, filter: 'blur(8px)' }),
  } as const;

  // Preload all gallery images on mount so first visit has no delay
  useEffect(() => {
    if (!projects || projects.length === 0) return;
    if (typeof window === 'undefined') return;
    const imgs: HTMLImageElement[] = [];
    for (const p of projects) {
      if (!p?.image) continue;
      const img = new window.Image() as HTMLImageElement & { fetchPriority?: 'high' | 'low' | 'auto' };
      img.decoding = 'async';
      img.fetchPriority = 'high';
      img.loading = 'eager';
      img.src = p.image;
      imgs.push(img);
    }
    // No special teardown required; keep cache warm
  }, [projects]);

  // Close on ESC and lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject !== null) {
          setSelectedProject(null);
        } else {
          onClose();
        }
      }
      if (selectedProject === null) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          setDirection(1);
          setIndex((i) => {
            const len = projects.length;
            if (len <= 0) return 0;
            return (i + 1 + len) % len;
          });
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          setDirection(-1);
          setIndex((i) => {
            const len = projects.length;
            if (len <= 0) return 0;
            return (i - 1 + len) % len;
          });
        }
        if (e.key === 'Home') {
          e.preventDefault();
          setDirection(-1);
          setIndex(0);
        }
        if (e.key === 'End') {
          e.preventDefault();
          setDirection(1);
          setIndex(projects.length - 1);
        }
      }
    };

    // Lock background scroll and preserve position
    scrollYRef.current = window.scrollY;
    const body = document.body as HTMLBodyElement;
    const html = document.documentElement as HTMLElement;

    const prev = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
    };

    // If Lenis smooth scroll is active, stop it so it doesn't hijack wheel/touch
    const lenis = window.lenis;
    const initiallyStopped = (lenis as unknown as { stopped?: boolean } | null)?.stopped ?? undefined;
    const shouldResumeLenis = Boolean(lenis && initiallyStopped === false);
    if (lenis) lenis.stop();

    html.style.overflow = 'hidden';
    // prevent scroll chaining on root to keep scroll inside overlay
    html.style.setProperty('overscroll-behavior', 'none');
    body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prev.htmlOverflow;
      html.style.setProperty('overscroll-behavior', '');
      body.style.overflow = prev.bodyOverflow;
      window.scrollTo(0, scrollYRef.current);
      if (shouldResumeLenis && lenis) lenis.start();
    };
  }, [open, onClose]);

  // Reset selected project when gallery closes
  useEffect(() => {
    if (!open) setSelectedProject(null);
  }, [open]);

  // Reset slide index on open
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => {
      const len = projects.length;
      if (len <= 0) return 0;
      return (i + dir + len) % len;
    });
  };

  const handleWheel = (e: ReactWheelEvent) => {
    // Throttle to one action every 450ms
    const now = Date.now();
    if (now - wheelLockRef.current < 450) return;
    wheelLockRef.current = now;
    const dy = e.deltaY;
    if (Math.abs(dy) < 8) return;
    e.preventDefault();
    e.stopPropagation();
    go(dy > 0 ? 1 : -1);
  };

  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? 0;
  };
  const handleTouchMove = (e: ReactTouchEvent) => {
    const y = e.touches[0]?.clientY ?? 0;
    const dy = touchStartYRef.current - y;
    if (Math.abs(dy) > 24) {
      e.preventDefault();
      e.stopPropagation();
      go(dy > 0 ? 1 : -1);
      touchStartYRef.current = y; // reset to avoid multiple steps per gesture
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[80] bg-black overflow-hidden pointer-events-auto"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          {/* Animated background patterns */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full"
              style={{
                background: 'radial-gradient(closest-side, rgba(255,106,0,0.15), transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 h-[50rem] w-[50rem] rounded-full"
              style={{
                background: 'radial-gradient(closest-side, rgba(255,255,255,0.08), transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(255,106,0,0.1), transparent, rgba(255,255,255,0.05), transparent)',
                filter: 'blur(30px)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Slider content wrapper */}
          <div
            className="relative z-[1] h-[100dvh] overflow-hidden pointer-events-auto"
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            role="dialog"
            aria-modal="true"
            ref={wrapRef}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Back button */}
            <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={onClose}
            className="absolute left-6 top-6 z-[90] group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black/60 px-4 py-3 text-white/90 backdrop-blur-xl transition-all duration-300 hover:bg-black/80 hover:border-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Back</span>
            </motion.button>

            {/* Header */}
            {(title || subtitle) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.12 }}
                className="absolute top-6 left-1/2 z-[90] -translate-x-1/2 text-center px-4"
              >
                {title && (
                  <h3 className="text-lg md:text-xl font-semibold text-white/90 drop-shadow">{title}</h3>
                )}
                {subtitle && (
                  <p className="text-xs md:text-sm text-white/60 mt-1 max-w-[80vw] md:max-w-[60vw]">{subtitle}</p>
                )}
              </motion.div>
            )}

            {/* Slide area */}
            <div className="relative h-full w-full">
              <AnimatePresence initial={false} custom={direction}>
                {projects.map((project, i) => (
                  i === index && (
                    <motion.div
                      key={`slide-${i}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        className="absolute inset-0 overflow-hidden rounded-none"
                        variants={imageVariants}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        style={{ willChange: 'transform, opacity, filter' }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          loading="eager"
                          priority
                          unoptimized
                        />
                      </motion.div>

                      {/* Logo badge (repositioned below Back button) */
                      }
                      <motion.div
                        key={`logo-${i}`}
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="absolute top-20 md:top-24 left-6 z-[2] inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black/55 px-4 py-2.5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                      >
                        {project.logo ? (
                          <div className="relative h-8 w-8 rounded-lg bg-white"><Image src={project.logo} alt="logo" fill className="object-contain p-1" /></div>
                        ) : (
                          <div className="h-8 w-8 rounded-lg grid place-items-center bg-white text-black font-bold">
                            {(project.brand ?? project.title).trim().charAt(0)}
                          </div>
                        )}
                        <div className="text-white/90 font-semibold leading-tight max-w-[22ch] truncate">
                          {project.brand ?? deriveBrand(project.title)}
                          <div className="text-white/60 text-[11px] uppercase tracking-widest">{project.tag}</div>
                        </div>
                      </motion.div>

                      {/* Caption bottom-left */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                        className="absolute left-5 bottom-5 z-[2] max-w-xl"
                      >
                        <p className="text-white/50">Scroll to view next</p>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Progress dots */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[3] flex flex-col gap-2">
                {projects.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    className={`h-2.5 w-2.5 rounded-full border border-white/40 transition-all ${i === index ? 'bg-white/90 scale-125' : 'bg-white/20 hover:bg-white/40'}`}
                    onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Keyboard navigation */}
              <div className="sr-only" aria-live="polite">Slide {index + 1} of {projects.length}</div>
            </div>
          </div>

          {/* Project detail modal */}
          <AnimatePresence>
            {selectedProject !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[90] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative max-w-4xl w-full max-h-[80vh] overflow-hidden rounded-3xl bg-white/10 backdrop-blur border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={projects[selectedProject].image}
                      alt={projects[selectedProject].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-sm font-bold uppercase tracking-widest text-white/90 backdrop-blur-md mb-4">
                      {projects[selectedProject].tag}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {projects[selectedProject].title}
                    </h2>
                    <p className="text-white/70 text-lg">
                      Click anywhere outside to close this preview.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

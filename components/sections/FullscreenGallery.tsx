"use client";

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

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
  title: _title,
  subtitle: _subtitle,
  projects,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  projects: GalleryProject[];
}) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const scrollYRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Native scroll list; no slide variants needed

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

  // Close on ESC and lock background scroll while allowing overlay to scroll
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
    };

    // Lock background scroll and preserve position
    scrollYRef.current = window.scrollY;
    const body = document.body as HTMLBodyElement;
    const html = document.documentElement as HTMLElement;

    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      overscroll: html.style.getPropertyValue('overscroll-behavior'),
    };

    // Pause Lenis while overlay is open; resume only if we actually stopped it
    const lenis = window.lenis;
    let didStopLenis = false;
    try {
      if (lenis) {
        lenis.stop();
        didStopLenis = true;
      }
    } catch {}

    html.style.overflow = 'hidden';
    // prevent scroll chaining on root to keep scroll inside overlay
    html.style.setProperty('overscroll-behavior', 'none');
    body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prev.htmlOverflow;
      if (prev.overscroll) html.style.setProperty('overscroll-behavior', prev.overscroll); else html.style.removeProperty('overscroll-behavior');
      body.style.overflow = prev.bodyOverflow;
      window.scrollTo(0, scrollYRef.current);
      try {
        if (didStopLenis && lenis) lenis.start();
      } catch {}
    };
  }, [open, onClose, selectedProject]);

  // Reset selected project when gallery closes
  useEffect(() => {
    if (!open) setSelectedProject(null);
  }, [open]);

  // No index to reset in scroll list mode

  // No custom wheel/touch handlers; allow native scrolling inside the overlay
  const portalTarget = typeof window !== 'undefined' ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-black overflow-hidden pointer-events-auto"
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

          {/* Scrollable content wrapper */}
          <div
            className="relative z-[1] h-[100dvh] overflow-y-auto pointer-events-auto"
            role="dialog"
            aria-modal="true"
            ref={wrapRef}
          >
            {/* Back button */}
            <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={onClose}
            className="sticky top-6 z-[90] ml-6 group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black/60 px-4 py-3 text-white/90 backdrop-blur-xl transition-all duration-300 hover:bg-black/80 hover:border-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Back</span>
            </motion.button>

            {/* List area */}
            <div className="relative w-full">
              <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 space-y-10 md:space-y-16">
                {projects.map((project, i) => (
                  <motion.section
                    key={`section-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                  >
                    <div className="relative aspect-[16/9] md:aspect-[21/9]">
                      <Image
                        src={failed.has(i) ? '/hero-bg.jpg' : project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 1024px, 100vw"
                        className="object-cover"
                        unoptimized
                        onError={() => setFailed((prev) => new Set(prev).add(i))}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Brand badge */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[2] inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black/55 px-4 py-2 backdrop-blur-md">
                      {project.logo ? (
                        <div className="relative h-8 w-8 rounded-lg bg-white"><Image src={project.logo} alt="logo" fill className="object-contain p-1" /></div>
                      ) : (
                        <div className="h-8 w-8 rounded-lg grid place-items-center bg-white text-black font-bold">{(project.brand ?? project.title).trim().charAt(0)}</div>
                      )}
                      <div className="text-white/90 font-semibold leading-tight max-w-[22ch] truncate">
                        {project.brand ?? deriveBrand(project.title)}
                        <div className="text-white/60 text-[11px] uppercase tracking-widest">{project.tag}</div>
                      </div>
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>

          {/* No detail modal in scroll list mode */}
        </motion.div>
      )}
    </AnimatePresence>
    ),
    portalTarget
  );
}

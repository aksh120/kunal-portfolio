"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Project, PersonalProject } from '@/lib/projects';

export default function ProjectDetailView({ project, backHref }: { project: Project | PersonalProject; backHref: Route }) {
  const dedupe = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));
  // Always start with the hero/thumbnail image
  const initialGallery = dedupe([
    project.image,
    ...((project.details?.images && project.details.images.length > 0) ? project.details.images : []),
  ]);
  const [gallery, setGallery] = useState<string[]>(initialGallery);
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const backHrefStr = backHref as string;
  const backLabel = backHrefStr.startsWith('/works')
    ? 'Back to Works'
    : backHrefStr.startsWith('/internship')
    ? 'Back to Internship'
    : 'Back to Projects';

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  } as const;

  const hasSpaces = (u: string) => {
    try {
      return decodeURIComponent(u).includes(' ');
    } catch {
      return u.includes('%20');
    }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  } as const;
  const heroVariant = {
    hidden: { opacity: 0, scale: 0.985 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  // Try to auto-discover gallery images from /public folder based on the Title (preferred) and then PDF name
  useEffect(() => {
    // Local probe cache to avoid duplicate HEADs across re-renders
    const probeCache = new Map<string, boolean>();
    const probeImage = async (src: string) => {
      if (probeCache.has(src)) return probeCache.get(src)!;
      try {
        const res = await fetch(src, { method: 'HEAD' });
        probeCache.set(src, res.ok);
        return res.ok;
      } catch {
        probeCache.set(src, false);
        return false;
      }
    };

    let aborted = false;
    (async () => {
      const MAX = 60;

      const EXCLUDED = new Set(['united colors of benetton', 'u.s. polo assn.', 'superdry', 'pending']);
      const titleBase = project.title as string | undefined;
      if (titleBase && EXCLUDED.has(titleBase.toLowerCase())) return;

      // Known max table to construct lists without probing
      const getKnownMax = (base: string): number | undefined => {
        const table: Record<string, number> = {
          'THSS25 Luggage': 6, // 0..5
          'Project 1': 11,     // 0..10
          'Project 2': 8,      // 0..7
          'Beatcubes': 17,     // 0..16
          'Smart Waste Management System': 15, // 0..14
          'Redluffy': 15,      // 0..14
        };
        return table[base];
      };

      // Helpers to handle filename base casing differences
      const toSentenceCase = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
      // Discover using folder base and candidate file bases (stop after first miss)
      const discoverPair = async (folderBase: string, primaryFileBase: string) => {
        const folder = folderBase.toLowerCase();
        const candidates = [primaryFileBase, toSentenceCase(primaryFileBase), primaryFileBase.toLowerCase()].filter(Boolean);
        let workingBase: string | null = null;
        for (const fb of candidates) {
          const first = `/${folder}/${fb}-images-0.jpg`;
          // eslint-disable-next-line no-await-in-loop
          if (await probeImage(first)) { workingBase = fb; break; }
        }
        if (!workingBase) return [];
        const firstOk = `/${folder}/${workingBase}-images-0.jpg`;
        const acc: string[] = [firstOk];
        for (let i = 1; i < MAX; i++) {
          const candidate = `/${folder}/${workingBase}-images-${i}.jpg`;
          // eslint-disable-next-line no-await-in-loop
          const ok = await probeImage(candidate);
          if (aborted) return [];
          if (!ok) break;
          acc.push(candidate);
        }
        return acc;
      };

      // Preferred search order depends on context
      let found: string[] = [];
      const pdfPath = project.pdf as string | undefined;
      let pdfBase: string | undefined;
      if (pdfPath) {
        const baseWithExt = decodeURIComponent(pdfPath.replace(/^\//, ''));
        pdfBase = baseWithExt.replace(/\.pdf$/i, '');
      }
      const backHrefStr = backHref as string;
      const isWorks = backHrefStr.includes('works');
      const isInternOrProjects = !isWorks; // internship or personal

      // 0) Try to use lists precomputed by AssetPreloader to avoid any probing
      const gl: Map<string, string[]> | undefined = globalThis.__galleryLookup;
      const getFromGL = (base?: string) => (base && gl && gl.get(base)) ? gl.get(base)! : undefined;
      if (isInternOrProjects) {
        const byTitle = getFromGL(titleBase);
        const byPdf = getFromGL(pdfBase);
        if (byTitle && byTitle.length) {
          found = byTitle;
        } else if (byPdf && byPdf.length) {
          found = byPdf;
        }
      } else {
        const byPdf = getFromGL(pdfBase);
        if (byPdf && byPdf.length) {
          found = byPdf;
        }
      }

      if (isInternOrProjects) {
        // If we have a known max for the title, build the list directly without probes
        if (!found.length && titleBase) {
          const km = getKnownMax(titleBase);
          if (km !== undefined) {
            const folder = titleBase.toLowerCase();
            found = Array.from({ length: km }, (_, i) => `/${folder}/${titleBase}-images-${i}.jpg`);
          }
        }
        // Internship/Personal: likely folder and file follow Title
        if (!found.length && titleBase) {
          found = await discoverPair(titleBase, titleBase);
        }
        if (!found.length && pdfBase && titleBase) {
          found = await discoverPair(pdfBase, titleBase);
        }
        // NOTE: we intentionally avoid pdf/pdf for internship/personal to prevent /p1 and /p2 probes
      } else {
        // Works: prefer the PDF naming. If known max exists, use it directly
        if (!found.length && pdfBase) {
          const km = getKnownMax(pdfBase);
          if (km !== undefined) {
            const folder = pdfBase.toLowerCase();
            found = Array.from({ length: km }, (_, i) => `/${folder}/${pdfBase}-images-${i}.jpg`);
          }
        }
        // Works (professional): match the PDF naming, avoid title/title to reduce 404s
        if (!found.length && pdfBase) {
          found = await discoverPair(pdfBase, pdfBase);
        }
        // Optionally try pdf folder with title filename if nothing else found
        if (!found.length && pdfBase && titleBase) {
          found = await discoverPair(pdfBase, titleBase);
        }
      }

      if (!aborted && found.length > 0) {
        // Ensure hero image is first
        const ordered = dedupe([project.image, ...found]);
        setGallery(ordered);
        setIdx(0);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [project, backHref]);

  const handleBack = () => {
    router.push(backHref);
  };

  // Slider controls
  const goPrev = useCallback(() => setIdx((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length]);
  const goNext = useCallback(() => setIdx((i) => (i + 1) % gallery.length), [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isFormField = !!target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        (target as HTMLElement).isContentEditable === true
      );
      if (isFormField) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <motion.div className="container-max px-4 md:px-6 py-10 md:py-14" variants={containerVariants} initial="hidden" animate="show">
      <motion.nav className="mb-6 mt-6 text-sm text-white/60" variants={fadeUp}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href={backHref} className="hover:underline">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">{project.title}</span>
      </motion.nav>

      <motion.div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 mb-6" variants={fadeUp}>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{project.title}</h1>
        <button
          onClick={handleBack}
          className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.12] transition"
          aria-label={backLabel}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {backLabel}
        </button>
      </motion.div>

      {/* Hero */}
      <motion.div variants={heroVariant} className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-[16/9]">
          <NextImage src={gallery[idx]} alt={project.title} fill sizes="(min-width: 768px) 1200px, 100vw" quality={60} className="object-cover" unoptimized={hasSpaces(gallery[idx])}/>
          {/* Slide counter */}
          <div className="absolute left-2 top-2 md:left-3 md:top-3 z-[2]">
            <span className="inline-flex items-center rounded-md border border-white/15 bg-black/45 px-2 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
              {idx + 1} / {gallery.length}
            </span>
          </div>
          {/* Arrows */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                onMouseDown={(e) => e.preventDefault()}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 p-2 md:p-3 text-white/80 hover:bg-black/35"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                onMouseDown={(e) => e.preventDefault()}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 p-2 md:p-3 text-white/80 hover:bg-black/35"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Gallery + Details */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div className="lg:col-span-8" variants={fadeUp}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3 md:p-4">
            {/* Pager (overlay) */}
            <div className="absolute left-3 top-3 z-[2]">
              <span className="inline-flex items-center rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
                {idx + 1} / {gallery.length}
              </span>
            </div>
            {/* Edge fade hints */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/50 to-transparent" />

            {/* Thumbnails scroller */}
            <ThumbScroller
              images={gallery}
              activeIndex={idx}
              onSelect={setIdx}
            />
          </div>
        </motion.div>
        {/* Conditionally render the right-side details panel.
            Hide for brand projects under Professional Work per request. */}
        {(() => {
          const hideForBrands = new Set(['tommy-hilfiger', 'united-colors-of-benetton', 'us-polo-assn', 'superdry']);
          const hideForOthers = new Set(['beatcubes', 'smart-waste-management-system', 'redluffy', 'pending']);
          const isWorks = (backHref as string).includes('works');
          const shouldHide = (isWorks && hideForBrands.has(project.slug)) || (!isWorks && hideForOthers.has(project.slug));
          if (shouldHide) return null;
          return (
            <motion.aside className="lg:col-span-4" variants={fadeUp}>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h2 className="text-white/90 font-semibold mb-3">Project Details</h2>
                {project.details?.year && (
                  <div className="mb-2">
                    <div className="text-white/60 text-xs uppercase tracking-widest">Year</div>
                    <div className="text-white/80">{project.details.year}</div>
                  </div>
                )}
                {project.details?.services && project.details.services.length > 0 && (
                  <div className="mb-2">
                    <div className="text-white/60 text-xs uppercase tracking-widest mb-1">Services</div>
                    <ul className="list-disc list-inside text-white/80 space-y-1">
                      {project.details.services.map((s) => (<li key={s}>{s}</li>))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.aside>
          );
        })()}
      </div>

      {project.details?.description && (
        <motion.div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 text-white/80" variants={fadeUp}>
          {project.details.description}
        </motion.div>
      )}
    </motion.div>
  );
}

function ThumbScroller({
  images,
  activeIndex,
  onSelect,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Local helper to detect spaces in URL to bypass Next optimizer for such paths
  const hasSpacesLocal = (u: string) => {
    try {
      return decodeURIComponent(u).includes(' ');
    } catch {
      return u.includes('%20');
    }
  };

  // Auto-center the active thumbnail (horizontal only, do NOT scroll the page)
  useEffect(() => {
    const c = ref.current;
    const el = itemRefs.current[activeIndex];
    if (!c || !el) return;
    try {
      const cRect = c.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const elCenter = (elRect.left - cRect.left) + c.scrollLeft + elRect.width / 2;
      const target = elCenter - c.clientWidth / 2;
      c.scrollTo({ left: target, behavior: 'smooth' });
    } catch {}
  }, [activeIndex]);

  const scrollBy = (dir: -1 | 1) => {
    const c = ref.current;
    if (!c) return;
    const delta = Math.max(240, c.clientWidth * 0.8);
    c.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  // Change selected slide and let the effect above auto-center the thumbnail
  const changeSlide = (dir: -1 | 1) => {
    const next = (activeIndex + dir + images.length) % images.length;
    onSelect(next);
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 pr-2 overscroll-x-contain overscroll-y-none touch-pan-x"
      >
        {images.map((src, i) => (
          <button
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={() => onSelect(i)}
            className={`relative w-40 sm:w-48 md:w-56 aspect-[16/9] shrink-0 overflow-hidden rounded-xl border ${
              i === activeIndex ? 'border-white/60 ring-2 ring-white/20' : 'border-white/10'
            } bg-black/40 snap-center`}
          >
            <NextImage
              src={src}
              alt={`thumb-${i}`}
              fill
              sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 160px"
              quality={60}
              className="object-cover"
              unoptimized={hasSpacesLocal(src)}
            />
          </button>
        ))}
      </div>
      {images.length > 4 && (
        <>
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label="Scroll thumbnails left"
            className="absolute left-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 p-2 text-white/70 hover:bg-black/35"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => changeSlide(1)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label="Scroll thumbnails right"
            className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 p-2 text-white/70 hover:bg-black/35"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

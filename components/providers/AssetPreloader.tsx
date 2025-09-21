"use client";

import { useEffect } from 'react';
import { professionalProjects, internshipProjects, personalProjects } from '@/lib/projects';

function unique(list: string[]) {
  return Array.from(new Set(list.filter(Boolean)));
}

type GlobalWithCaches = typeof globalThis & {
  __probeCache?: Map<string, boolean>;
  __galleryLookup?: Map<string, string[]>;
};

function getProbeCache(): Map<string, boolean> {
  const g = globalThis as GlobalWithCaches;
  if (!g.__probeCache) g.__probeCache = new Map<string, boolean>();
  return g.__probeCache;
}

function getGalleryLookup(): Map<string, string[]> {
  const g = globalThis as GlobalWithCaches;
  if (!g.__galleryLookup) g.__galleryLookup = new Map<string, string[]>();
  return g.__galleryLookup;
}

function getKnownMax(base: string): number | undefined {
  const table: Record<string, number> = {
    // Works (professional) by PDF base
    'THSS25 Luggage': 6, // 0..5
    // Internship by Title
    'Project 1': 11, // 0..10
    'Project 2': 8,  // 0..7
    // Personal by Title
    'Beatcubes': 17, // 0..16
    'Smart Waste Management System': 15, // 0..14
    'Redluffy': 15, // 0..14
  };
  return table[base];
}

async function discoverFromBase(base: string, max = 60): Promise<string[]> {
  const limit = getKnownMax(base) ?? max;
  const folderCandidates = [
    base.toLowerCase(),
    base.toLowerCase().replace(/\s+/g, '-'),
  ];
  for (const folder of folderCandidates) {
    const fileBaseCandidates = [base, base.charAt(0) + base.slice(1).toLowerCase(), base.toLowerCase()];
    let workingBase: string | null = null;
    for (const fb of fileBaseCandidates) {
      const firstTry = `/${folder}/${fb}-images-0.jpg`;
      // eslint-disable-next-line no-await-in-loop
      if (await probeImage(firstTry)) { workingBase = fb; break; }
    }
    if (!workingBase) continue;
    const first = `/${folder}/${workingBase}-images-0.jpg`;
    const found: string[] = [first];
    for (let i = 1; i < limit; i++) {
      const candidate = `/${folder}/${workingBase}-images-${i}.jpg`;
      // eslint-disable-next-line no-await-in-loop
      const ok = await probeImage(candidate);
      if (!ok) break;
      found.push(candidate);
    }
    getGalleryLookup().set(base, found);
    return found;
  }
  return [];
}

function collectInitialImageUrls(): string[] {
  const pro = professionalProjects.flatMap(p => [
    p.image,
    ...(p.details?.images ?? []),
  ]);
  const intern = internshipProjects.flatMap(p => [
    p.image,
    ...(p.details?.images ?? []),
  ]);
  const personal = personalProjects.map(p => p.image);
  return unique([...pro, ...intern, ...personal]);
}

function collectAllPdfs(): string[] {
  // Only scan PDFs for Works (professional) to avoid /p1, /p2 probes
  const list = [
    ...professionalProjects.map(p => p.pdf).filter(Boolean),
  ] as string[];
  return unique(list);
}

async function probeImage(src: string): Promise<boolean> {
  const cache = getProbeCache();
  if (cache.has(src)) return cache.get(src)!;
  try {
    const ok = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
    cache.set(src, ok);
    return ok;
  } catch {
    cache.set(src, false);
    return false;
  }
}

async function discoverFromPdf(pdfPath: string, max = 60): Promise<string[]> {
  const baseWithExt = decodeURIComponent(pdfPath.replace(/^\//, ''));
  const base = baseWithExt.replace(/\.pdf$/i, '');
  const limit = getKnownMax(base) ?? max;
  const folderCandidates = [
    base.toLowerCase(),
    base.toLowerCase().replace(/\s+/g, '-'),
  ];
  for (const folder of folderCandidates) {
    const fileBaseCandidates = [base, base.charAt(0) + base.slice(1).toLowerCase(), base.toLowerCase()];
    let workingBase: string | null = null;
    for (const fb of fileBaseCandidates) {
      const firstTry = `/${folder}/${fb}-images-0.jpg`;
      // eslint-disable-next-line no-await-in-loop
      if (await probeImage(firstTry)) { workingBase = fb; break; }
    }
    if (!workingBase) continue;
    const first = `/${folder}/${workingBase}-images-0.jpg`;
    const found: string[] = [first];
    for (let i = 1; i < limit; i++) {
      const candidate = `/${folder}/${workingBase}-images-${i}.jpg`;
      // eslint-disable-next-line no-await-in-loop
      const ok = await probeImage(candidate);
      if (!ok) break;
      found.push(candidate);
    }
    getGalleryLookup().set(base, found);
    return found;
  }
  return [];
}

async function collectAllImageUrls(): Promise<string[]> {
  const set = new Set<string>(collectInitialImageUrls());
  const pdfs = collectAllPdfs();
  for (const pdf of pdfs) {
    // eslint-disable-next-line no-await-in-loop
    const more = await discoverFromPdf(pdf);
    for (const u of more) set.add(u);
  }
  // Also discover by titles (e.g., 'Project 1' -> '/project 1/Project 1-images-0.jpg')
  const titles = unique([
    ...internshipProjects.map(p => p.title),
    ...personalProjects.map(p => p.title),
  ]);
  const EXCLUDED = new Set([
    'united colors of benetton',
    'u.s. polo assn.',
    'superdry',
    'pending',
  ]);
  for (const t of titles) {
    if (EXCLUDED.has(t.toLowerCase())) continue;
    // eslint-disable-next-line no-await-in-loop
    const moreByTitle = await discoverFromBase(t);
    for (const u of moreByTitle) set.add(u);
  }
  return Array.from(set);
}

export default function AssetPreloader() {
  useEffect(() => {
    let cancelled = false;
    const headLinks: HTMLLinkElement[] = [];
    // Limit overall preloads and use small optimized variants
    const MAX_PRELOAD = 24;

    const toOptimized = (url: string, w = 640, q = 50) => {
      try {
        // If the path contains spaces, some hosts return 400 for _next/image.
        // In that case, fallback to the raw image path for preload.
        const decoded = decodeURIComponent(url);
        if (/\s/.test(decoded)) return url;
        const encoded = encodeURIComponent(url);
        return `/_next/image?url=${encoded}&w=${w}&q=${q}`;
      } catch {
        return url; // safest fallback
      }
    };

    const preferIndexZeroOnly = (list: string[]) => {
      const out: string[] = [];
      const seenBase = new Set<string>();
      for (const u of list) {
        const m = u.match(/^(.*)-images-(\d+)\.jpg$/i);
        if (m) {
          const base = m[1];
          const idx = Number(m[2]);
          if (idx === 0 && !seenBase.has(base)) {
            seenBase.add(base);
            out.push(u);
          }
        } else {
          out.push(u);
        }
      }
      return out;
    };

    (async () => {
      const urls = await collectAllImageUrls();
      if (cancelled) return;

      // Keep only representative images and limit count
      const filtered = preferIndexZeroOnly(urls).slice(0, MAX_PRELOAD);

      // Preload via <link rel="preload" as="image" href="optimized" />
      for (const url of filtered) {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = toOptimized(url, 640, 40);
          document.head.appendChild(link);
          headLinks.push(link);
        } catch {}
      }
    })();

    return () => {
      cancelled = true;
      // Clean up preload links (images remain cached by the browser)
      for (const link of headLinks) {
        try { document.head.removeChild(link); } catch {}
      }
    };
  }, []);

  return null;
}

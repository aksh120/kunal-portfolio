"use client";

import { useEffect } from 'react';
import { professionalProjects, internshipProjects, personalProjects } from '@/lib/projects';

function unique(list: string[]) {
  return Array.from(new Set(list.filter(Boolean)));
}

function getProbeCache(): Map<string, boolean> {
  const g = globalThis as any;
  if (!g.__probeCache) g.__probeCache = new Map<string, boolean>();
  return g.__probeCache as Map<string, boolean>;
}

function getGalleryLookup(): Map<string, string[]> {
  const g = globalThis as any;
  if (!g.__galleryLookup) g.__galleryLookup = new Map<string, string[]>();
  return g.__galleryLookup as Map<string, string[]>;
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
  const folder = base.toLowerCase();
  const known = getKnownMax(base);
  if (known !== undefined) {
    const list = Array.from({ length: known }, (_, i) => `/${folder}/${base}-images-${i}.jpg`);
    getGalleryLookup().set(base, list);
    return list;
  }
  const first = `/${folder}/${base}-images-0.jpg`;
  if (!(await probeImage(first))) return [];
  const found: string[] = [first];
  for (let i = 1; i < max; i++) {
    const candidate = `/${folder}/${base}-images-${i}.jpg`;
    // eslint-disable-next-line no-await-in-loop
    const ok = await probeImage(candidate);
    if (!ok) break;
    found.push(candidate);
  }
  getGalleryLookup().set(base, found);
  return found;
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
    const res = await fetch(src, { method: 'HEAD' });
    cache.set(src, res.ok);
    return res.ok;
  } catch {
    cache.set(src, false);
    return false;
  }
}

async function discoverFromPdf(pdfPath: string, max = 60): Promise<string[]> {
  const baseWithExt = decodeURIComponent(pdfPath.replace(/^\//, ''));
  const base = baseWithExt.replace(/\.pdf$/i, '');
  const folder = base.toLowerCase();
  const known = getKnownMax(base);
  if (known !== undefined) {
    const list = Array.from({ length: known }, (_, i) => `/${folder}/${base}-images-${i}.jpg`);
    getGalleryLookup().set(base, list);
    return list;
  }
  const first = `/${folder}/${base}-images-0.jpg`;
  if (!(await probeImage(first))) return [];
  const found: string[] = [first];
  for (let i = 1; i < max; i++) {
    const candidate = `/${folder}/${base}-images-${i}.jpg`;
    // eslint-disable-next-line no-await-in-loop
    const ok = await probeImage(candidate);
    if (!ok) break;
    found.push(candidate);
  }
  return found;
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
    const imgs: (HTMLImageElement & { fetchPriority?: 'high' | 'low' | 'auto' })[] = [];

    (async () => {
      const urls = await collectAllImageUrls();
      if (cancelled) return;

      // Preload via <link rel="preload" as="image" href="..." /> for ALL
      for (const url of urls) {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          document.head.appendChild(link);
          headLinks.push(link);
        } catch {}
      }

      // Also warm the cache with Image instances (low priority to avoid jank)
      for (const url of urls) {
        try {
          const img = new window.Image() as HTMLImageElement & { fetchPriority?: 'high' | 'low' | 'auto' };
          img.decoding = 'async';
          img.fetchPriority = 'low';
          img.loading = 'eager';
          img.src = url;
          imgs.push(img);
        } catch {}
      }
    })();

    return () => {
      cancelled = true;
      // Clean up preload links (images remain cached)
      for (const link of headLinks) {
        try { document.head.removeChild(link); } catch {}
      }
    };
  }, []);

  return null;
}

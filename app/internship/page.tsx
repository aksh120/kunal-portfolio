"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getInternshipProjects } from '@/lib/projects';

export default function InternshipPage() {
  const projects = getInternshipProjects();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    router.push('/#internship' as Route);
  };

  return (
    <section className="section">
      <div className="container-max px-4 md:px-6 py-10 md:py-14">
        <div className="relative mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.12] transition z-10 mb-3 md:mb-0 md:absolute md:left-0 md:top-0 md:mt-[18px]"
            aria-label="Back to Internship Work section"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </button>
          
          <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-center">
            <header className="text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Internship Work</h1>
              <p className="text-foreground/70 mt-2">Hands-on projects built while interning across teams and tools.</p>
            </header>
          </div>
          
          {/* Invisible spacer to maintain height on md+ */}
          <div className="hidden md:block invisible">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Internship Work</h1>
            <p className="text-foreground/70 mt-2">Hands-on projects built while interning across teams and tools.</p>
          </div>
        </div>

        <div className="space-y-10 md:space-y-14">
          {projects.map((p) => (
            <Link key={p.slug} href={`/internship/${p.slug}` as Route} className="block group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 1200px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-[2] inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black/55 px-4 py-2 backdrop-blur-md">
                  <div className="h-8 w-8 rounded-lg grid place-items-center bg-white text-black font-bold">{(p.brand ?? p.title).trim().charAt(0)}</div>
                  <div className="text-white/90 font-semibold leading-tight max-w-[22ch] truncate">
                    {p.brand ?? p.title}
                    <div className="text-white/60 text-[11px] uppercase tracking-widest">{p.tag}</div>
                  </div>
                </div>
                {/* NDA footnote (hide on small screens) */}
                <div className="hidden md:block absolute top-3 right-4 md:top-4 md:right-6 z-[2]">
                  <span className="rounded-lg border border-white/15 bg-black/45 px-3 py-1 text-[11px] text-white/70 backdrop-blur">
                    Few work projects can be showcased privately as they are not launched yet or under NDA*
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

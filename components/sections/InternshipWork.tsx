'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';
import SectionHeader from '@/components/SectionHeader';
import { getInternshipProjects } from '@/lib/projects';

export default function InternshipWork() {
  const count = getInternshipProjects().length;
  return (
    <section id="internship" className="section relative">
      <SectionHeader title="Internship Work" align="center" noWrap className="pb-2"/>
      <SectionSpotlights />
      <div className="container-max">
        <Link href={'/internship' as Route} aria-label="Open Internship Work Projects" className="block">
          <MotionDiv
            className="group relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-0 transition-transform duration-300 hover:-translate-y-0.5"
            y={16}
            delay={0.02}
          >
            <SweepLine position="top" color="orange" />
            {/* Crazy design background (variant) */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-3xl" />
              <div className="absolute bottom-0 -left-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.25),transparent_70%)] blur-3xl" />
              <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_2px,transparent_2px,transparent_10px)]" />
            </div>

            {/* Content */}
            <div className="relative px-8 py-16 md:px-16 md:py-24">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Internship<br className="md:hidden" /> Work</h3>
                <p className="text-foreground/70">Hands-on projects built while interning across teams and tools.</p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-4 py-2 text-sm backdrop-blur">
                  <span className="opacity-80">View {count} projects</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M8 7H17V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </MotionDiv>
        </Link>
      </div>
    </section>
  );
}

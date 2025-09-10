"use client";

import Image from 'next/image';
import { useState } from 'react';
import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';
import SectionHeader from '@/components/SectionHeader';
import PdfModal from '@/components/PdfModal';

type ProjectItem = {
  title: string;
  tag: string;
  image: string;
  pdf?: string;
};

const projects: ProjectItem[] = [
  {
    title: 'PENDING',
    tag: 'Product Design',
    image: 'https://i.ibb.co/FLqxFFQh/Beatcubes.jpg',
  },
  {
    title: 'Beatcubes',
    tag: 'Product Design',
    image: 'https://i.ibb.co/FLqxFFQh/Beatcubes.jpg',
    pdf: '/Beatcubes.pdf',
  },
  {
    title: 'Smart Waste Management System',
    tag: 'Product Design',
    image: 'https://i.ibb.co/8gws2TB4/Smart-waste-management-system.jpg',
    pdf: '/Smart waste management system.pdf',
  },
  {
    title: 'Redluffy',
    tag: 'Transportation Design',
    image: 'https://i.ibb.co/spbVnF3L/Redluffy.jpg',
    pdf: '/Redluffy.pdf',
  },
];

export default function Projects() {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('Document');
  return (
    <section id="projects" className="section relative">
      <SectionHeader title="Projects" align="center" />
      <SectionSpotlights />
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <MotionDiv
            key={p.title}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${p.pdf ? 'cursor-pointer' : ''}`}
            y={16}
            delay={i * 0.03}
            whileHover={{ scale: 1.01 }}
            onClick={() => {
              if (!p.pdf) return;
              setPdfSrc(p.pdf);
              setPdfTitle(p.title);
            }}
            role={p.pdf ? 'button' : undefined}
            tabIndex={p.pdf ? 0 : undefined}
            onKeyDown={(e) => {
              if (!p.pdf) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setPdfSrc(p.pdf);
                setPdfTitle(p.title);
              }
            }}
          >
            <SweepLine position="top" color="orange" />
            {/* Image */}
            <div className="relative aspect-[4/3]">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 45vw, 90vw"
                priority={i === 0}
              />
              {/* vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* soft highlight */}
              <div className="pointer-events-none absolute -top-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-white/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Shine sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-10 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" />
            </div>

            {/* Tag pill */}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[14px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                {p.tag}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md transition-colors duration-300 group-hover:border-white/20">
                <h2 className="font-semibold tracking-tight">{p.title}</h2>
                <span className="inline-flex items-center gap-1 text-sm text-white/80">
                  View
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M8 7H17V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
      <PdfModal open={!!pdfSrc} onClose={() => setPdfSrc(null)} src={pdfSrc ?? '/Beatcubes.pdf'} title={pdfTitle} />
    </section>
  );
}

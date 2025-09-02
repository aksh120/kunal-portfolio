"use client";
import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';

export default function CTA() {
  const onStartClick = (e: any) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    const lenis = (window as any)?.lenis;
    if (target && lenis) lenis.scrollTo(target, { offset: -80 });
    else if (target) (target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section id="cta" className="section relative">
      <SectionSpotlights />
      <MotionDiv className="relative overflow-hidden card p-8 md:p-10 text-center" y={12}>
        <SweepLine position="top" color="orange" />
        <h2 className="text-2xl md:text-3xl font-bold">Let’s create something memorable</h2>
        <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
          Available for freelance projects and collaborations. Tell me about your vision.
        </p>
        <div className="mt-6">
          <a href="#contact" onClick={onStartClick} className="hover-glow inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-black">
            Start a project
          </a>
        </div>
      </MotionDiv>
    </section>
  );
}

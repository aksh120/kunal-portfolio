"use client";
import { useEffect, useRef } from 'react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const email = 'contact@kunalkamde.com'; // TODO: replace with your email
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fitText = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;
      const max = 256; // px upper bound for very wide screens
      const min = 10;  // px lower bound for very narrow screens
      // Measure unit width at 1px to scale precisely to container width
      text.style.fontSize = '1px';
      // Account for more horizontal padding to ensure full text fits
      const available = Math.max(0, container.clientWidth - 32);
      const unit = text.scrollWidth || 1; // avoid divide-by-zero
      const next = Math.max(min, Math.min(max, Math.floor(available / unit * 0.95))); // 95% to be safe
      text.style.fontSize = `${next}px`;
    };

    // Initial fit and on events
    fitText();
    const onResize = () => fitText();
    window.addEventListener('resize', onResize, { passive: true } as any);
    // Observe container changes for safety
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => fitText());
      ro.observe(containerRef.current);
    }
    // After fonts load
    (document as any)?.fonts?.ready?.then(() => fitText());
    return () => {
      window.removeEventListener('resize', onResize as any);
      ro?.disconnect();
    };
  }, [email]);
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="py-12">
        <p className="container-max text-center text-sm text-foreground/60">Have a project in mind?</p>
        <a
          href={`mailto:${email}`}
          ref={containerRef}
          className="block pb-[5px] w-full px-4 text-center font-heading font-bold uppercase text-foreground/50 hover:text-[#f97316] transition leading-none mt-4 whitespace-nowrap overflow-hidden"
        >
          <span ref={textRef} className="inline-block align-top select-text">
            {email}
          </span>
        </a>
      </div>
    </footer>
  );
}

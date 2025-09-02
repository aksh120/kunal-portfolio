"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.1 });
    // Expose globally so components can call window.lenis.scrollTo('#id')
    (window as any).lenis = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      (window as any).lenis = undefined;
      // lenis cleanup not required in v1
    };
  }, []);
  return <>{children}</>;
}

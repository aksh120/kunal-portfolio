"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ResumeModal from '@/components/ResumeModal';

type NavItem = { href: string; label: string; action?: 'resume' };
const nav: NavItem[] = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'RESUME', action: 'resume' },
  { href: '#works', label: 'WORKS' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#achievements', label: 'ACHIEVEMENTS' },
  { href: '#contact', label: 'CONTACT' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body as HTMLBodyElement;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    const { href, action } = item;
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);
    // Special behavior: open the in-app Resume modal and let it scroll the background to #about
    if (action === 'resume') {
      setResumeOpen(true);
      return;
    }
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      const target = document.querySelector(href) as HTMLElement | null;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#101010] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
      <div className="container-max">
        <div className="flex items-center justify-between py-4 md:py-6">
          <a 
            href="#home" 
            onClick={(e) => onNavClick(e, { href: '#home', label: 'HOME' })} 
            className="font-bold tracking-[0.2em] text-lg text-white"
          >
            KUNAL
          </a>
          
          <nav className="hidden md:flex items-center gap-5 md:gap-8">
            {nav.map(n => (
              <a 
                key={n.href} 
                href={n.href} 
                onClick={(e) => onNavClick(e, n)} 
                className="text-[15px] font-medium tracking-wide text-white/80 hover:text-white transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile hamburger */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
            className="md:hidden relative h-9 w-9 inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/90 hover:bg-black/50 transition"
          >
            <span className="sr-only">Toggle menu</span>
            {/* 3 lines that morph into an X */}
            <span className={`absolute block h-0.5 w-5 bg-current transition-transform duration-300 ${open ? 'translate-y-0 rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute block h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-80'}`} />
            <span className={`absolute block h-0.5 w-5 bg-current transition-transform duration-300 ${open ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <motion.div
        id="mobile-menu"
        initial={{ opacity: 0 }}
        animate={open ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`md:hidden fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={open ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Sheet content */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={open ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full px-6 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)]"
        >
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between">
              <span className="font-extrabold tracking-[0.2em] text-white/90">KUNAL</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/90 hover:bg-black/50 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex flex-col">
              {nav.map((n, idx) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, delay: open ? idx * 0.05 : 0 }}
                  className="group relative inline-flex items-center justify-between py-4 border-b border-white/10 text-white/90"
                >
                  <span className="text-xl font-semibold tracking-wide">{n.label}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-70 transition-transform group-hover:translate-x-0.5">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M8 7H17V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </motion.a>
              ))}
            </nav>

            <div className="mt-6 text-xs text-white/60">
              <span>© {new Date().getFullYear()} Kunal Kamde</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

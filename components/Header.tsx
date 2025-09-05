"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    const { href, action } = item;
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      const target = document.querySelector(href) as HTMLElement | null;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
    // Special behavior: after scrolling to About, open resume PDF in a new tab.
    // To avoid popup blockers, open a blank tab synchronously here, then navigate it after a short delay.
    if (action === 'resume') {
      const OPEN_DELAY_MS = 800; // allow scroll animation to complete before navigating
      const tab = window.open('', '_blank');
      if (tab) {
        try { tab.opener = null as any; } catch {}
        window.setTimeout(() => {
          try { tab.location.href = '/kunal.pdf'; } catch (_) {}
        }, OPEN_DELAY_MS);
      } else {
        // Fallback if the browser blocks opening a blank tab
        window.setTimeout(() => {
          try { window.open('/kunal.pdf', '_blank'); } catch (_) {}
        }, OPEN_DELAY_MS);
      }
    }
  };
  
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#101010] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between py-6">
          <a 
            href="#home" 
            onClick={(e) => onNavClick(e, { href: '#home', label: 'HOME' })} 
            className="font-bold tracking-[0.2em] text-lg text-white"
          >
            KUNAL
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
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
          
          <button 
            onClick={() => setOpen(v => !v)} 
            className="md:hidden text-white/80 hover:text-white transition-colors"
          >
            Menu
          </button>
        </div>
        
        {open && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-4 pt-4">
              {nav.map(n => (
                <a 
                  key={n.href} 
                  href={n.href} 
                  onClick={(e) => onNavClick(e, n)} 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}

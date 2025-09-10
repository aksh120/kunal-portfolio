"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function PdfModal({
  open,
  onClose,
  src,
  title = "Document",
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}) {
  const mounted = typeof window !== "undefined";
  const portalTarget = mounted ? document.body : null;
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock background scroll (and pause Lenis) while modal is open
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement as HTMLElement;
    const body = document.body as HTMLBodyElement;
    const lenis = (window as any).lenis as { stop?: () => void; start?: () => void } | undefined;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevOverscroll = html.style.getPropertyValue("overscroll-behavior");
    let didPauseLenis = false;

    try {
      if (lenis && typeof lenis.stop === "function") {
        lenis.stop();
        didPauseLenis = true;
      }
    } catch {}

    html.style.overflow = "hidden";
    html.style.setProperty("overscroll-behavior", "none");
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      if (prevOverscroll) html.style.setProperty("overscroll-behavior", prevOverscroll);
      else html.style.removeProperty("overscroll-behavior");
      body.style.overflow = prevBodyOverflow;
      try {
        if (didPauseLenis && lenis && typeof lenis.start === "function") lenis.start();
      } catch {}
    };
  }, [open]);

  if (!portalTarget) return null;

  // Ensure spaces in filenames are encoded for iframe src
  const encodedSrc = encodeURI(src);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="pdf-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-title"
          data-lenis-prevent
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              key="pdf-modal"
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[100dvh] w-full overflow-hidden rounded-none border-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.12] transition"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                  <h3 id="pdf-title" className="text-white/90 font-semibold tracking-wide">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={encodedSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.12] transition"
                  >
                    Open in new tab
                  </a>
                  <button
                    ref={closeRef}
                    onClick={onClose}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-white/15 bg-white/[0.06] text-white/80 hover:bg-white/[0.12] transition"
                    aria-label="Close document"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 min-h-0 bg-black/40">
                <iframe src={encodedSrc} title={title} className="h-full w-full" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-t border-white/10 bg-black/40">
                <p className="text-xs text-white/50">If the PDF doesn&apos;t load, use the "Open in new tab" button.</p>
                <a
                  href={encodedSrc}
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.12] transition"
                >
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget
  );
}

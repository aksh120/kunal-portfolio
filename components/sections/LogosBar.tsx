"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Logo = { src?: string; label: string };


export default function LogosBar() {
  const [logos, setLogos] = useState<Logo[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const base = "/software_logos/";
      const desired: { label: string; candidates: string[] }[] = [
        { label: "Rhino 7", candidates: [] },
        { label: "Fusion 360", candidates: [] },
        { label: "Keyshot", candidates: [] },
        { label: "Illustrator", candidates: [] },
        { label: "Photoshop", candidates: [] },
        { label: "Figma", candidates: [] },
      ];

      const results: Logo[] = [];
      for (let i = 0; i < desired.length; i++) {
        const item = desired[i];
        let foundSrc: string | undefined;
        // 1) Try named candidates
        for (const file of item.candidates) {
          if (!file) continue; // skip empty entries to avoid '/software_logos' HEAD 404s
          const url = base + file;
          try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) { foundSrc = url; break; }
          } catch {}
        }
        // 2) Fallback to numbered assets (logo_1.png .. logo_6.png) in requested order
        if (!foundSrc) {
          const numbered = `logo_${i + 1}.png`;
          const url = base + numbered;
          try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) foundSrc = url;
          } catch {}
        }
        results.push({ label: item.label, src: foundSrc });
      }
      if (mounted) setLogos(results);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section aria-label="Design tools" className="section">
      <div className="container-max">
        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
              {logos.map((l, i) => (
                <div key={(l.src || l.label) + i} className="flex flex-col items-center gap-2">
                  <div className="relative h-12 w-12 rounded-[10px] bg-white/5 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
                    {l.src ? (
                      <Image
                        src={l.src}
                        alt={l.label}
                        fill
                        sizes="48px"
                        quality={70}
                        className="object-contain p-1.5"
                        priority={i < 6}
                      />
                    ) : (
                      <span className="text-white/90 font-semibold text-[13px]">
                        {l.label.split(" ").map(w => w[0]).join("").slice(0,3)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-foreground/70 truncate max-w-[12ch]" title={l.label}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

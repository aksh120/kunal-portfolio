"use client";
import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('done');
      e.currentTarget.reset();
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section relative">
      <SectionSpotlights />
      <SectionHeader title="Contact Me" align="center" />

      <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-stretch">
        {/* Left side - Contact info */}
        <div className="lg:col-span-2 flex flex-col">
          <MotionDiv y={20} delay={0.1} className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 md:p-8 backdrop-blur-xl flex-1 flex flex-col">
            <SweepLine position="top" color="orange" />
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/20 blur-2xl" />
            <div className="relative flex-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400 w-fit">
                <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                Available for work
              </div>
              <h4 className="mt-4 text-lg md:text-xl font-semibold">Get in touch</h4>
              <p className="mt-2 text-foreground/60 text-sm leading-relaxed">
                Drop me a line and I’ll get back to you within 24 hours.
              </p>
              
              <div className="mt-6 space-y-3">
                <a href="mailto:kunalkamde74@gmail.com" className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition break-all">kunalkamde74@gmail.com</p>
                  </div>
                </a>
                
                <a href="tel:+917447345852" className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.62-3.37 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 5.18 2 2 0 0 1 4.06 3h3a2 2 0 0 1 2 1.72c.08.96.3 1.9.67 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.37 1.85.59 2.81.67A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Phone no.</p>
                    <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition">+91 7447345852</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/kunal-kamde-06309b222" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8" cy="8" r="1"/>
                      <path d="M8 11v7"/>
                      <path d="M12 11v7"/>
                      <path d="M12 13c0-1.5 1.1-2.5 2.5-2.5S17 11.5 17 13v5"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition break-all">linkedin.com/in/kunal-kamde-06309b222</p>
                  </div>
                </a>

                <a href="https://www.instagram.com/owl_mystry" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F58529]/20 via-[#DD2A7B]/20 to-[#515BD4]/20 text-[#DD2A7B]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17" cy="7" r="1.2"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition break-all">instagram.com/owl_mystry</p>
                  </div>
                </a>

                <a href="https://www.behance.net/kunalkamde" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1769FF]/10 text-[#1769FF]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <text x="12" y="16.5" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">Be</text>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Behance</p>
                    <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition break-all">behance.net/kunalkamde</p>
                  </div>
                </a>

                {/* Quick stats */}
                <div className="my-6 border-y border-white/10 py-6 flex items-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-lg font-bold text-orange-400">2+</div>
                      <div className="text-xs text-foreground/60">Years Experience</div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-lg font-bold text-blue-400">15+</div>
                      <div className="text-xs text-foreground/60">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Right side - Form */}
        <MotionDiv y={20} delay={0.3} className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl h-full">
            <SweepLine position="top" color="orange" />
            {/* Ambient glow */}
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
            
            <div className="relative p-6 md:p-8 lg:p-12">
              <div className="mb-8">
                <h4 className="text-xl md:text-2xl font-semibold mb-2">Start a project</h4>
                <p className="text-foreground/60">Tell me about your project and let’s make it happen.</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6" aria-busy={status === 'loading'}>
                {/* Honeypot field */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80" htmlFor="name">Name *</label>
                    <input 
                      id="name" 
                      name="name" 
                      required 
                      autoComplete="name"
                      placeholder="Your full name" 
                      className="w-full rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-3.5 text-sm placeholder:text-foreground/40 focus:border-orange-500/50 focus:bg-white/[0.08] focus:outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80" htmlFor="email">Email *</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      autoComplete="email"
                      placeholder="you@company.com" 
                      className="w-full rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-3.5 text-sm placeholder:text-foreground/40 focus:border-orange-500/50 focus:bg-white/[0.08] focus:outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80" htmlFor="budget">Budget</label>
                    <select 
                      id="budget" 
                      name="budget" 
                      className="select-dark w-full rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-3.5 text-sm text-white focus:border-orange-500/50 focus:bg-white/[0.08] focus:outline-none transition-all"
                    >
                      <option value="">Select budget range</option>
                      <option>₹80,000 – ₹4,00,000</option>
                      <option>₹4,00,000 – ₹8,00,000</option>
                      <option>₹8,00,000 – ₹20,00,000</option>
                      <option>₹20,00,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80" htmlFor="timeline">Timeline</label>
                    <select 
                      id="timeline" 
                      name="timeline" 
                      className="select-dark w-full rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-3.5 text-sm text-white focus:border-orange-500/50 focus:bg-white/[0.08] focus:outline-none transition-all"
                    >
                      <option value="">Select timeline</option>
                      <option>ASAP (Rush job)</option>
                      <option>2-4 weeks</option>
                      <option>1-3 months</option>
                      <option>3+ months</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="message">Project details *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    placeholder="Tell me about your project goals, target audience, and any specific requirements..." 
                    rows={5} 
                    autoComplete="off"
                    className="w-full rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-3.5 text-sm placeholder:text-foreground/40 focus:border-orange-500/50 focus:bg-white/[0.08] focus:outline-none transition-all resize-none" 
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-4">
                    <button 
                      type="submit" 
                      disabled={status === 'loading'} 
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-semibold text-black transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative flex items-center gap-2">
                        {status === 'loading' ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                              <path d="m9 18 6-6-6-6"/>
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                    
                    {status === 'done' && (
                      <div role="status" aria-live="polite" className="flex items-center gap-2 text-emerald-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span className="text-sm font-medium">Message sent successfully!</span>
                      </div>
                    )}
                    
                    {status === 'error' && (
                      <div role="alert" className="flex items-center gap-2 text-red-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-foreground/50 pt-2">
                  By submitting this form, you agree to be contacted about your project inquiry.
                </p>
              </form>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}

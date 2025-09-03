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
    } catch (err: unknown) {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section relative">
      <SectionSpotlights />
      <SectionHeader title="Contact Me" align="center" />

      <div className="grid lg:grid-cols-5 gap-12 items-stretch">
        {/* Left side - Contact info */}
        <div className="lg:col-span-2 flex flex-col">
          <MotionDiv y={20} delay={0.1} className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-xl flex-1 flex flex-col">
            <SweepLine position="top" color="orange" />
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/20 blur-2xl" />
            <div className="relative flex-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400 w-fit">
                <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                Available for work
              </div>
              <h4 className="mt-4 text-xl font-semibold">Get in touch</h4>
              <p className="mt-2 text-foreground/60 text-sm">
                Drop me a line and I’ll get back to you within 24 hours.
              </p>
              
              <div className="mt-6 space-y-4">
                <a href="mailto:hello@kunal.com" className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition">contact@kunalkamde.com</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone no.</p>
                    <p className="text-xs text-foreground/60">Usually within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Linkedin</p>
                    <p className="text-xs text-foreground/60">Remote • Global</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <circle cx="12" cy="16" r="1"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-xs text-foreground/60">2-3 slots open</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <circle cx="12" cy="16" r="1"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Behance</p>
                    <p className="text-xs text-foreground/60">2-3 slots open</p>
                  </div>
                </div>

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
            
            <div className="relative p-8 md:p-12">
              <div className="mb-8">
                <h4 className="text-2xl font-semibold mb-2">Start a project</h4>
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

                <div className="flex items-center justify-between pt-4">
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

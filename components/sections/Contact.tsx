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
                    <p className="text-sm font-medium">Response time</p>
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
                    <p className="text-sm font-medium">Location</p>
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
                    <p className="text-sm font-medium">Availability</p>
                    <p className="text-xs text-foreground/60">2-3 slots open</p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="my-6 border-y border-white/10 py-6 flex items-center">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-lg font-bold text-orange-400">5+</div>
                      <div className="text-xs text-foreground/60">Years</div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-lg font-bold text-blue-400">50+</div>
                      <div className="text-xs text-foreground/60">Projects</div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-lg font-bold text-green-400">20+</div>
                      <div className="text-xs text-foreground/60">Clients</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links moved inside main card */}
              <div className="mt-8">
                <h5 className="font-medium mb-4">Connect with me</h5>
                <div className="grid grid-cols-2 gap-3">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://instagram.com/kooonalll" target="_blank" className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg>
                    Instagram
                  </a>
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

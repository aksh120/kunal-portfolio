import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';
import SectionHeader from '@/components/SectionHeader';

const services = [
  {
    number: '01',
    title: 'BRAND IDENTITY DESIGN',
    desc: 'Blend of strategic thinking and creative flair to craft a digital identity that resonates and captivates.kits you need to create a true website within minutes.'
  },
  {
    number: '02',
    title: 'VISUAL DESIGN',
    desc: 'Blend of artistic intuition with strategic insight to craft a visual identity.'
  },
  {
    number: '03',
    title: 'UX RESEARCH',
    desc: 'Blend of functionality with aesthetics to create delightful experience.'
  },
  {
    number: '04',
    title: 'ART DIRECTION',
    desc: 'Blend of strategic thinking and creative flair to craft a digital identity that resonates and captivates.kits you need to create a true website within minutes.'
  },
];

export default function Services() {
  return (
    <section id="services" className="section relative">
      <SectionHeader title="Services" align="center" />
      <SectionSpotlights />
      
      {/* Asymmetric Grid (like image1): 3 cols on desktop, 1st & 3rd items span 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(0,1fr)] gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <MotionDiv
            key={service.number}
            className={`relative overflow-hidden col-span-1 ${[0,3].includes(index) ? 'md:col-span-2' : ''} h-full bg-card/40 backdrop-blur border border-border/50 rounded-2xl p-8 group hover:bg-card/60 transition-all duration-300`}
            y={20}
            delay={index * 0.1}
          >
            <SweepLine position="top" color="orange" />
            {/* Number badge */}
            <div className="inline-flex items-center justify-center w-12 h-8 bg-orange-500 text-black font-bold text-sm rounded mb-6">
              {service.number}
            </div>
            
            {/* Arrow icon */}
            <div className="absolute top-8 right-8 text-foreground/60 group-hover:text-foreground transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
            
            {/* Content */}
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground/90">
              {service.title}
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              {service.desc}
            </p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}

import Image from 'next/image';
import { MotionDiv, SweepLine, SectionSpotlights } from './primitives';

const posts = [
  {
    title: 'Designing a cohesive brand system',
    date: 'Aug 2025',
    image: 'https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?q=80&w=1600&auto=format&fit=crop'
  },
  {
    title: 'Interface clarity through hierarchy',
    date: 'Jul 2025',
    image: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop'
  },
  {
    title: 'Process: from discovery to delivery',
    date: 'Jun 2025',
    image: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1600&auto=format&fit=crop'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="section relative">
      <SectionSpotlights />
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Blog</h2>
        <p className="text-foreground/60 mt-2 max-w-2xl">Thoughts on brand, product and visual design.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <MotionDiv key={p.title} className="group relative overflow-hidden rounded-xl border border-border bg-muted/40 hover-glow" y={14} delay={i * 0.04}>
            <SweepLine position="top" color="orange" />
            <div className="relative aspect-[4/3]">
              <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-foreground/60">{p.date}</p>
              <h3 className="font-semibold mt-1">{p.title}</h3>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}

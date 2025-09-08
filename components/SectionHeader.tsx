import { MotionDiv } from './sections/primitives';

export default function SectionHeader({
  title,
  align = 'left',
  noWrap = false,
  className = '',
}: {
  title: string;
  align?: 'left' | 'center';
  noWrap?: boolean;
  className?: string;
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const wrapClass = noWrap ? 'md:whitespace-nowrap' : '';
  const sizeClass = noWrap
    ? 'text-[8vw] md:text-[6.5vw] lg:text-[120px]'
    : 'text-[14vw] md:text-[9vw] lg:text-[140px]';

  // Insert a mobile-only line break after the first word when there are 2+ words
  const words = (title ?? '').trim().split(/\s+/);
  const rendered = words.length >= 2
    ? (
        <>
          {words[0]} <br className="block md:hidden" /> {words.slice(1).join(' ')}
        </>
      )
    : title;
  return (
    <MotionDiv y={8} className={`relative mb-12 md:mb-16 overflow-visible pb-2 ${alignClass} -mx-2 sm:mx-0 ${className}`}>
      <h2
        aria-label={title}
        className={`text-outline heading font-extrabold tracking-tight leading-[0.95] ${sizeClass} ${wrapClass}`}
      >
        {rendered}
      </h2>
    </MotionDiv>
  );
}

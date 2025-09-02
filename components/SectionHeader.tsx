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
  const wrapClass = noWrap ? 'whitespace-nowrap' : '';
  const sizeClass = noWrap
    ? 'text-[8vw] md:text-[6.5vw] lg:text-[120px]'
    : 'text-[12vw] md:text-[9vw] lg:text-[140px]';
  return (
    <MotionDiv y={8} className={`relative mb-12 md:mb-16 overflow-visible pb-2 ${alignClass} ${className}`}>
      <h2
        aria-label={title}
        className={`text-outline heading font-extrabold tracking-tight leading-[0.95] ${sizeClass} ${wrapClass}`}
      >
        {title}
      </h2>
    </MotionDiv>
  );
}

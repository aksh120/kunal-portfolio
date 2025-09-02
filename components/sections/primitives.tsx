"use client";
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export function MotionDiv({
  children,
  className,
  y = 8,
  delay = 0,
  ...rest
}: HTMLMotionProps<'div'> & { y?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Animated sweep line overlay for cards/sections
export function SweepLine({
  position = 'top',
  color = 'orange',
  duration = 2.6,
  delay = 0,
  heightClass = 'h-0.5',
  className = '',
}: {
  position?: 'top' | 'bottom';
  color?: 'orange' | 'white';
  duration?: number;
  delay?: number;
  heightClass?: string;
  className?: string;
}) {
  const posClass = position === 'top' ? 'top-0' : 'bottom-0';
  const colorClass =
    color === 'orange'
      ? 'bg-gradient-to-r from-transparent via-orange-500/70 to-transparent'
      : 'bg-gradient-to-r from-transparent via-white/60 to-transparent';
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className={`absolute inset-x-0 ${posClass} ${heightClass} ${colorClass} ${className}`}
        animate={{ x: ['-10%', '110%'] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </div>
  );
}

// Section-wide ambient spotlights (soft radial glows)
export function SectionSpotlights({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}>
      <motion.div
        className="absolute top-8 left-8 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.18),transparent_70%)]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-8 right-8 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.1),transparent_70%)]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </div>
  );
}

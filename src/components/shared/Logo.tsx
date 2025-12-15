'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { SVGProps } from 'react';
import { useEffect, useState } from 'react';

const STROKE_DASH = 430;
export default function Logo(props: SVGProps<SVGSVGElement>) {
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playInitial, setPlayInitial] = useState(false);

  useEffect(() => {
    setPlayInitial(true);
    setIsAnimating(true);
  }, []);

  const handleMouseEnter = () => {
    if (isAnimating) return;
    setIsHovering(true);
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    if (!isAnimating) {
      setIsHovering(false);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setIsHovering(false);

    if (playInitial) {
      setPlayInitial(false);
    }
  };

  const isHoverAnimation = isHovering && isAnimating;
  const isInitialAnimation = playInitial && isAnimating;

  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 82 106'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      className={cn('stroke-foreground', props.className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.path
        key={playInitial ? 'logo-animate' : 'logo-static'}
        id='logo-nr'
        d='M3.5 105C4 69.0001 14 2.00009 14 2.00009C14 2.00009 8 53.0001 28 83.0001C26.6667 64.8335 27.3 26.2 32.5 15C32.5 15 77 -5 78.5 7.00005C80 19.0001 29.5 48 29.5 48C42.4172 63.3333 68 87.5 74 63.5'
        stroke='currentColor'
        strokeWidth='6'
        strokeDasharray={STROKE_DASH}
        initial={
          playInitial
            ? { strokeDashoffset: STROKE_DASH, clipPath: 'inset(0 0 0 0)' }
            : { strokeDashoffset: 0, clipPath: 'inset(0 0 0 0)' }
        }
        animate={
          isHoverAnimation
            ? {
                strokeDashoffset: [0, 0, STROKE_DASH, 0],
                clipPath: [
                  'inset(0 0 0 0)',
                  'inset(0 0 0 100%)',
                  'inset(0 0 0 0)',
                  'inset(0 0 0 0)',
                ],
              }
            : { strokeDashoffset: 0, clipPath: 'inset(0 0 0 0)' }
        }
        transition={
          isHoverAnimation
            ? {
                duration: 2.5,
                ease: 'easeInOut',
                times: [0, 0.3, 0.3, 1],
              }
            : isInitialAnimation
              ? { duration: 1.5, ease: 'easeInOut' }
              : { duration: 0 }
        }
        onAnimationComplete={handleAnimationComplete}
      />
    </svg>
  );
}

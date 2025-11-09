'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type BlogTransitionAdvancedProps = {
  children: ReactNode;
};

// Advanced page transition with slide and fade effect
const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(8px)',
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(8px)',
  }),
};

const transitionConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/**
 * Advanced blog transition with directional slide animation
 * This version includes horizontal slide based on navigation direction
 */
export default function BlogTransitionAdvanced({
  children,
}: BlogTransitionAdvancedProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait' custom={1}>
      <motion.div
        key={pathname}
        custom={1}
        variants={slideVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={transitionConfig}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

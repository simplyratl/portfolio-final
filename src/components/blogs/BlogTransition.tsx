'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type BlogTransitionProps = {
  children: ReactNode;
};

const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(10px)',
  },
};

const transitionConfig = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier easing for smooth, premium feel
};

export default function BlogTransition({ children }: BlogTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={transitionConfig}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

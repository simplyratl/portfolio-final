'use client';

import MoonIcon from '@/icons/MoonIcon';
import SunIcon from '@/icons/SunIcon';
import { cn } from '@/lib/utils';
import { motion, useAnimate, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
};

const ToggleTheme = ({ className }: Props) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [scope, animate] = useAnimate();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newTheme = theme === 'light' ? 'dark' : 'light';
    const isMobile = window.innerWidth < 768;

    // For mobile or unsupported browsers, use simple animation
    if (isMobile || !document.startViewTransition || !buttonRef.current) {
      setTheme(newTheme);
      setTimeout(() => setIsAnimating(false), 600);
      return;
    }

    // Get button position for animation origin
    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    // Create enhanced ripple effect on button (desktop only)
    const ripple = document.createElement('span');
    const size = Math.max(buttonRect.width, buttonRect.height) * 2;
    const rippleX = e.clientX - buttonRect.left - size / 2;
    const rippleY = e.clientY - buttonRect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${rippleX}px;
      top: ${rippleY}px;
      border-radius: 50%;
      background: radial-gradient(circle, currentColor 0%, transparent 60%);
      opacity: 0.5;
      pointer-events: none;
      animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 0;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Calculate the maximum distance from the click point to the corners
    const endRadius = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    );

    // Start view transition with circular reveal
    const transition = document.startViewTransition(async () => {
      setTheme(newTheme);
    });

    // Animate the circular reveal with smoother easing
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${centerX}px ${centerY}px)`,
        `circle(${endRadius * 1.1}px at ${centerX}px ${centerY}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
          fill: 'both',
        }
      );
    });

    transition.finished.then(() => {
      setIsAnimating(false);
    });
  };

  // Icon animation variants
  const iconVariants = {
    initial: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 0.8,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  return (
    <>
      <button
        ref={(node) => {
          // @ts-expect-error - useAnimate scope ref type mismatch
          scope.current = node;
          buttonRef.current = node;
        }}
        className={cn(
          'group border-muted/30 bg-background text-foreground shadow-s hover:bg-primary hover:text-primary-foreground hover:border-primary/50 relative size-8 overflow-hidden rounded-xl border px-1.5 transition-all duration-300 hover:scale-105 active:scale-95',
          'hover:shadow-primary hover:shadow-[0px_0px_50px_10px]',
          'before:shadow-primary before:pointer-events-none before:absolute before:inset-0 before:scale-0 before:rounded-xl before:opacity-0 before:shadow-[0px_0px_60px_15px] before:transition-all before:duration-500 before:ease-out before:content-[""]',
          'hover:before:scale-110 hover:before:opacity-100',
          'after:shadow-primary/50 after:pointer-events-none after:absolute after:inset-0 after:scale-0 after:rounded-xl after:opacity-0 after:shadow-[0px_0px_100px_25px] after:transition-all after:duration-700 after:ease-out after:content-[""]',
          'hover:after:scale-125 hover:after:opacity-60',
          className
        )}
        aria-label='Toggle theme'
        onClick={handleThemeSwitch}
      >
        {mounted && (
          <AnimatePresence mode='wait' initial={false}>
            {theme === 'light' ? (
              <motion.div
                key='sun'
                variants={iconVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='relative z-10 flex h-full w-full items-center justify-center'
              >
                <SunIcon className='h-full w-full transition-transform duration-300 group-hover:scale-110' />
              </motion.div>
            ) : (
              <motion.div
                key='moon'
                variants={iconVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='relative z-10 flex h-full w-full items-center justify-center'
              >
                <MoonIcon className='h-full w-full transition-transform duration-300 group-hover:scale-110' />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {!mounted && <div className='h-full w-full' />}
      </button>
    </>
  );
};

export default ToggleTheme;

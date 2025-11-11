'use client';

import MoonIcon from '@/icons/MoonIcon';
import SunIcon from '@/icons/SunIcon';
import { cn } from '@/lib/utils';
import { useAnimate } from 'motion/react';
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

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const isMobile = window.innerWidth < 768;
    const directionRotation = theme === 'light' ? 0 : 360;

    // Icon rotation animation
    await animate(
      'svg',
      {
        scale: 0.3,
        opacity: 0.3,
        rotate: directionRotation / 2,
      },
      { duration: 0.18 }
    );

    // For mobile or unsupported browsers, use simple animation
    if (isMobile || !document.startViewTransition || !buttonRef.current) {
      setTheme(newTheme);
      animate(
        'svg',
        { rotate: directionRotation, scale: 0.92 },
        { type: 'spring', duration: 0.8, bounce: 0.3 }
      );
      animate('svg', { scale: 1, opacity: 1 }, { delay: 0.2 });
      return;
    }

    // Get button position for animation origin
    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    // Create ripple effect on button (desktop only)
    const ripple = document.createElement('span');
    const size = Math.max(buttonRect.width, buttonRect.height);
    const rippleX = e.clientX - buttonRect.left - size / 2;
    const rippleY = e.clientY - buttonRect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${rippleX}px;
      top: ${rippleY}px;
      border-radius: 50%;
      background: radial-gradient(circle, currentColor 0%, transparent 70%);
      opacity: 0.6;
      pointer-events: none;
      animation: ripple 0.7s ease-out;
      z-index: 0;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    // Calculate the maximum distance from the click point to the corners
    const endRadius = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    );

    // Start view transition with circular reveal
    const transition = document.startViewTransition(async () => {
      setTheme(newTheme);
    });

    // Animate the circular reveal
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${centerX}px ${centerY}px)`,
        `circle(${endRadius * 1.2}px at ${centerX}px ${centerY}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 800,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
          fill: 'both',
        }
      );

      // Reset icon animation with spring
      animate(
        'svg',
        { rotate: directionRotation, scale: 0.92 },
        { type: 'spring', duration: 0.8, bounce: 0.3 }
      );
      animate('svg', { scale: 1, opacity: 1 }, { delay: 0.2 });
    });
  };

  return (
    <>
      <button
        ref={(node) => {
          // @ts-ignore
          scope.current = node;
          // @ts-ignore
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
        {mounted ? (
          <>
            <SunIcon
              className='relative z-10 h-full w-full transition-transform duration-300 group-hover:scale-110'
              style={{
                display: theme === 'light' ? 'block' : 'none',
              }}
            />

            <MoonIcon
              className='relative z-10 h-full w-full transition-transform duration-300 group-hover:scale-110'
              style={{
                display: theme === 'dark' ? 'block' : 'none',
              }}
            />
          </>
        ) : (
          <div className='h-full w-full' />
        )}
      </button>
    </>
  );
};

export default ToggleTheme;

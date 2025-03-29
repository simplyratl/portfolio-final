'use client';

import MoonIcon from '@/icons/MoonIcon';
import SunIcon from '@/icons/SunIcon';
import { cn } from '@/lib/utils';
import { useAnimate } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Props = {
  className?: string;
};

const ToggleTheme = ({ className }: Props) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [scope, animate] = useAnimate();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = async () => {
    const directionRotation = theme === 'light' ? 0 : 360;

    await animate('svg', { scale: 0.3, opacity: 0.3 }, { duration: 0.16 });

    animate(
      'svg',
      { rotate: directionRotation, scale: 0.92 },
      { type: 'spring', duration: 0.7 }
    );

    // Toggle between themes
    setTheme(theme === 'light' ? 'dark' : 'light');

    // Reset SVG state after animation
    animate('svg', { scale: 1, opacity: 1 });
  };

  return (
    <>
      <button
        ref={scope}
        className={cn(
          'border-muted/30 bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-primary size-8 rounded-xl border px-1.5 transition-all hover:shadow-[0px_0px_50px_10px]',
          className
        )}
        aria-label='Toggle theme'
        onClick={handleThemeSwitch}
      >
        {mounted ? (
          <>
            <SunIcon
              className='h-full w-full'
              style={{
                display: theme === 'light' ? 'block' : 'none',
              }}
            />

            <MoonIcon
              className='h-full w-full'
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

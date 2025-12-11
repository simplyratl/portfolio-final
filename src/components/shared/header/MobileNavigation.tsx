'use client';

import { navLinks } from '@/constants/nav-links';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import ToggleTheme from '@/components/shared/ToggleTheme';
import Link from 'next/link';
import { useAsyncRoute } from '@/hooks/useAsyncRouter';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  handleMenuToggle: () => void;
};

export default function MobileNavigation({ handleMenuToggle }: Props) {
  const router = useAsyncRoute();
  const nextRouter = useRouter();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    navLinks.forEach((link) => {
      nextRouter.prefetch(link.href);
    });
  }, [nextRouter]);

  const handleLinkClick = async (href: string) => {
    setActiveLink(href);
    try {
      await router.push(href);
    } finally {
      handleMenuToggle();
      setActiveLink(null);
    }
  };

  const menuVariants: Variants = useMemo(
    () =>
      shouldReduceMotion
        ? {
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { duration: 0.15 },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.1 },
            },
          }
        : {
            initial: {
              opacity: 0,
              y: 8,
            },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.2, 0.8, 0.2, 1],
                staggerChildren: 0.04,
                delayChildren: 0.05,
              },
            },
            exit: {
              opacity: 0,
              y: -8,
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 1, 1],
              },
            },
          },
    [shouldReduceMotion]
  );

  const linkVariants: Variants = useMemo(
    () =>
      shouldReduceMotion
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.15 } },
            exit: { opacity: 0, transition: { duration: 0.1 } },
          }
        : {
            initial: { opacity: 0, y: 10 },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.2, 0.8, 0.2, 1],
              },
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.15,
              },
            },
          },
    [shouldReduceMotion]
  );

  return (
    <motion.div
      className='bg-background/95 supports-[backdrop-filter]:bg-background/85 fixed inset-0 z-40 flex flex-col backdrop-blur-xl md:hidden'
      initial='initial'
      animate='animate'
      exit='exit'
      variants={menuVariants}
      style={{
        // Force hardware acceleration on iOS Safari
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <div className='h-14 w-full shrink-0' />

      <div className='flex flex-1 flex-col px-8 pt-10 pb-12'>
        <nav className='flex flex-col gap-8'>
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <motion.div
                key={link.href}
                variants={linkVariants}
                style={{ willChange: 'opacity, transform' }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={cn(
                    'inline-block text-2xl font-medium tracking-tight transition-colors duration-200',
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground/80 hover:text-foreground active:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          variants={linkVariants}
          className='mt-auto'
          style={{ willChange: 'opacity, transform' }}
        >
          <div className='from-border/0 via-border/50 to-border/0 mb-8 h-px w-full bg-gradient-to-r' />

          <div className='flex items-center justify-between px-2'>
            <div className='flex gap-6'>
              {socials.map((social) => (
                <SocialButton
                  key={social.name}
                  social={social}
                  className='text-foreground/80 hover:text-foreground scale-110 transition-colors'
                />
              ))}
            </div>
            <ToggleTheme />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

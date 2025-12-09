'use client';

import { navLinks } from '@/constants/nav-links';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { useState, useEffect } from 'react';
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

  const menuVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(8px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(8px)',
      transition: {
        duration: 0.3,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const linkVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.06,
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1],
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className='bg-background/90 supports-[backdrop-filter]:bg-background/60 fixed inset-0 z-40 flex flex-col backdrop-blur-3xl md:hidden'
      initial='initial'
      animate='animate'
      exit='exit'
      variants={menuVariants}
    >
      <div className='h-14 w-full shrink-0' />

      <div className='flex flex-1 flex-col px-8 pt-10 pb-12'>
        <nav className='flex flex-col gap-8'>
          {navLinks.map((link, i) => {
            const isActive = activeLink === link.href;
            return (
              <motion.div key={link.href} custom={i} variants={linkVariants}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={cn(
                    'inline-block text-2xl font-medium tracking-tight transition-all duration-300',
                    isActive
                      ? 'text-foreground translate-x-2'
                      : 'text-foreground/80 hover:text-foreground hover:translate-x-2'
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
          custom={navLinks.length}
          className='mt-auto'
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

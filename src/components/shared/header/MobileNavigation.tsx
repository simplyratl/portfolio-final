'use client';

import { navLinks } from '@/constants/nav-links';
import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect } from 'react';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import ToggleTheme from '@/components/shared/ToggleTheme';
import Link from 'next/link';
import { useAsyncRoute } from '@/hooks/useAsyncRouter';
import { useRouter } from 'next/navigation';

type Props = {
  handleMenuToggle: () => void;
};

export default function MobileNavigation({ handleMenuToggle }: Props) {
  const router = useAsyncRoute();
  const nextRouter = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Prefetch all navigation routes when mobile menu is opened
  useEffect(() => {
    navLinks.forEach((link) => {
      nextRouter.prefetch(link.href);
    });
  }, [nextRouter]);

  const handleLinkClick = async (href: string) => {
    setIsRouteChanging(true);
    setActiveLink(href);

    try {
      await router.push(href);
    } finally {
      handleMenuToggle();
      setIsRouteChanging(false);
      setActiveLink(null);
    }

    return false;
  };

  return (
    <motion.div
      className='fixed inset-0 z-40 md:hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop with subtle gradient */}
      <motion.div
        className='absolute inset-0 bg-black/40 dark:bg-black/60'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleMenuToggle}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Main menu container - slides from top */}
      <motion.div
        className='absolute top-0 right-0 left-0 mx-4 mt-20'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.15 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Glass card container */}
        <div className='bg-background/80 dark:bg-background/90 border-border/50 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl'>
          {/* Navigation links */}
          <nav className='p-3'>
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeLink === link.href;

              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/70 active:bg-foreground/5'
                    } ${isRouteChanging ? 'pointer-events-none opacity-50' : ''} `}
                    onClick={() => handleLinkClick(link.href)}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    {/* Icon */}
                    {Icon && (
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-foreground/5 text-foreground/60'
                        } `}
                      >
                        <Icon className='h-4 w-4' />
                      </div>
                    )}

                    {/* Label */}
                    <span
                      className={`text-[15px] transition-all duration-200 ${isActive ? 'font-semibold' : 'font-medium'} `}
                    >
                      {link.label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        layoutId='activeDot'
                        className='bg-primary ml-auto h-1.5 w-1.5 rounded-full'
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Divider */}
          <div className='bg-border/50 mx-3 h-px' />

          {/* Footer with socials */}
          <motion.div
            className='p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.25,
              duration: 0.3,
            }}
          >
            <div className='flex items-center justify-center gap-1'>
              {socials.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.3 + index * 0.03,
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    className='group relative p-2.5'
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    <div className='bg-foreground/5 absolute inset-0 scale-0 rounded-xl transition-transform duration-150 group-active:scale-100' />
                    <SocialButton
                      social={social}
                      className='text-foreground/50 hover:text-foreground/70 relative transition-colors duration-200'
                    />
                  </div>
                </motion.div>
              ))}

              {/* Divider */}
              <div className='bg-border/50 mx-1 h-5 w-px' />

              {/* Theme toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.3 + socials.length * 0.03,
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className='group relative p-2.5'
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                >
                  <div className='bg-foreground/5 absolute inset-0 scale-0 rounded-xl transition-transform duration-150 group-active:scale-100' />
                  <ToggleTheme className='text-foreground/50 hover:text-foreground/70 relative transition-colors duration-200' />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

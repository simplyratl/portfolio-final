'use client';

import { navLinks } from '@/constants/nav-links';
import { motion } from 'motion/react';
import { useState } from 'react';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import ToggleTheme from '@/components/shared/ToggleTheme';
import Link from 'next/link';
import { useAsyncRoute } from '@/hooks/useAsyncRouter';

type Props = {
  handleMenuToggle: () => void;
};

export default function MobileNavigation({ handleMenuToggle }: Props) {
  const router = useAsyncRoute();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = async (href: string) => {
    setIsRouteChanging(true);
    setActiveLink(href);

    await router.push(href);
    handleMenuToggle();
    setIsRouteChanging(false);
    setActiveLink(null);

    return false; // Prevent default link behavior
  };

  return (
    <motion.div
      className='bg-background/95 fixed inset-0 top-0 z-40 flex flex-col pt-20 backdrop-blur-sm md:hidden'
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Global loading overlay */}
      {isRouteChanging && (
        <motion.div
          className='bg-background/70 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='relative flex'>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className='bg-primary mx-1 h-3 w-3 rounded-full'
                initial={{ y: 0 }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 1.2,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      <nav className='flex flex-col gap-2 p-4'>
        {navLinks.map((link, index) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
              type: 'spring',
              stiffness: 120,
              damping: 14,
            }}
          >
            <Link
              href={link.href}
              className={`relative flex h-12 items-center justify-center rounded-lg px-4 text-lg font-medium transition-all ${
                activeLink === link.href
                  ? 'text-primary font-bold'
                  : 'text-muted/80 hover:bg-secondary/50 dark:hover:bg-secondary/50 hover:text-black dark:hover:text-white'
              } ${isRouteChanging ? 'pointer-events-none' : ''}`}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}

              {/* Link-specific highlight animation */}
              {activeLink === link.href && (
                <motion.div
                  className='border-primary absolute inset-0 rounded-lg border-2'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className='border-muted/20 mt-auto border-t'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ul className='flex justify-center gap-4 p-6'>
          {socials.map((social, index) => (
            <motion.li
              key={social.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.08,
                type: 'spring',
                stiffness: 100,
                damping: 12,
              }}
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.2 },
              }}
            >
              <SocialButton
                social={social}
                className='text-muted/80 hover:text-foreground text-xl'
              />
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4 + socials.length * 0.08,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.15,
              rotate: 180,
              transition: { duration: 0.4 },
            }}
          >
            <ToggleTheme className='text-muted/80 hover:text-foreground text-xl' />
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

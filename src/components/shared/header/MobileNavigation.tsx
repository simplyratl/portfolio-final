'use client';

import { navLinks } from '@/constants/nav-links';
import { motion } from 'motion/react';
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
      className='bg-background/95 fixed inset-0 top-0 z-40 flex flex-col pt-20 backdrop-blur-sm md:hidden'
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <nav className='flex flex-col gap-2 p-4'>
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          return (
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
                className={`relative flex h-12 items-center justify-center gap-2 rounded-lg px-4 text-lg font-medium transition-all ${
                  activeLink === link.href
                    ? 'text-primary font-bold'
                    : 'text-muted/80 hover:bg-secondary/50 dark:hover:bg-secondary/50 hover:text-black dark:hover:text-white'
                } ${isRouteChanging ? 'pointer-events-none' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {Icon && <Icon className='h-5 w-5' />}
                {link.label}
              </Link>
            </motion.div>
          );
        })}
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

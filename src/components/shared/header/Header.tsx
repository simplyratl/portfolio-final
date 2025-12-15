'use client';

import Logo from '@/components/shared/Logo';
import PrefetchLink from '@/components/shared/PrefetchLink';
import SocialButton from '@/components/shared/SocialButton';
import { navLinks } from '@/constants/nav-links';
import { socials } from '@/constants/socials';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ToggleTheme from '../ToggleTheme';
import MobileNavigation from './MobileNavigation';
import { AnimatePresence, motion } from 'motion/react';

export default function Header() {
  const MENU_OPEN_WIDTH = 768;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const handleMenuToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= MENU_OPEN_WIDTH)
      return;
    setIsMenuOpen((open) => !open);
  };

  useEffect(() => {
    if (window.innerWidth >= MENU_OPEN_WIDTH) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 right-0 left-0 z-50 w-full transition-colors duration-300',
          isScrolled
            ? 'dark:bg-background/70 bg-background/50 border-border border-b saturate-200 backdrop-blur-md'
            : 'bg-transparent',
          isMenuOpen && 'bg-background/0!'
        )}
      >
        <div className='mx-auto flex h-14 max-w-screen-md place-items-center justify-between px-4'>
          <PrefetchLink href='/'>
            <Logo className='size-7' />
          </PrefetchLink>

          <motion.button
            className='relative z-50 p-1 transition-transform active:scale-95 md:hidden'
            onClick={handleMenuToggle}
            aria-label='Toggle menu'
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode='popLayout' initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key='close'
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key='menu'
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Desktop navigation */}
          <div className='hidden items-center gap-2 md:flex'>
            <nav className='flex gap-1'>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <PrefetchLink
                    href={link.href}
                    className={cn(
                      'hover:bg-secondary hover:shadow-s text-muted/80 flex h-8 items-center gap-2 rounded-lg px-4 text-sm transition-colors duration-150 hover:text-black dark:hover:text-white',
                      pathname === link.href && 'text-black dark:text-white'
                    )}
                    key={link.label}
                  >
                    {Icon && <Icon className='h-4 w-4' />}
                    {link.label}
                  </PrefetchLink>
                );
              })}
            </nav>

            <ul className='flex gap-2.5'>
              {socials.map((social) => (
                <li key={social.name}>
                  <SocialButton social={social} className='text-muted/80' />
                </li>
              ))}
              <li>
                <ToggleTheme className='text-muted/80' />
              </li>
            </ul>
          </div>
        </div>
      </header>

      <AnimatePresence mode='wait' initial={false}>
        {isMenuOpen && (
          <MobileNavigation
            key='mobile-nav'
            handleMenuToggle={handleMenuToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
}

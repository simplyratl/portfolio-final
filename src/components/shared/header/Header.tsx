'use client';

import Logo from '@/components/shared/Logo';
import { navLinks } from '@/constants/nav-links';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ToggleTheme from '../ToggleTheme';
import PrefetchLink from '@/components/shared/PrefetchLink';
import { AnimatePresence, motion } from 'motion/react';
import MobileNavigation from '@/components/shared/header/MobileNavigation';

export default function Header() {
  const MENU_OPEN_WIDTH = 768;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    if (window.innerWidth >= MENU_OPEN_WIDTH) return;

    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (window.innerWidth >= MENU_OPEN_WIDTH) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <header className='relative flex h-14 place-items-center justify-between'>
      <PrefetchLink href='/'>
        <Logo className='size-8' />
      </PrefetchLink>

      {/* Mobile menu button */}
      <motion.button
        className='relative z-50 md:hidden'
        onClick={handleMenuToggle}
        aria-label='Toggle menu'
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence initial={false} mode='wait'>
          {isMenuOpen ? (
            <motion.div
              key='close'
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key='menu'
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Desktop navigation */}
      <div className='hidden items-center gap-2 md:flex'>
        <nav className='flex gap-1'>
          {navLinks.map((link) => (
            <PrefetchLink
              href={link.href}
              className='hover:bg-secondary text-muted/80 flex h-8 items-center rounded-lg px-4 text-sm transition-colors duration-150 hover:text-black dark:hover:text-white'
              key={link.label}
            >
              {link.label}
            </PrefetchLink>
          ))}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && <MobileNavigation handleMenuToggle={handleMenuToggle} />}
      </AnimatePresence>
    </header>
  );
}

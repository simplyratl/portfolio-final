'use client';

import Logo from '@/components/shared/Logo';
import Link from 'next/link';
import { navLinks } from '@/constants/nav-links';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Assuming you use Lucide icons
import ToggleTheme from './ToggleTheme';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='relative flex h-14 place-items-center justify-between'>
      <Link href='/'>
        <Logo className='size-9' />
      </Link>

      {/* Mobile menu button */}
      <button
        className='md:hidden'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='Toggle menu'
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation */}
      <div className='hidden items-center gap-2 md:flex'>
        <nav className='flex gap-1'>
          {navLinks.map((link) => (
            <Link
              href={link.href}
              className='hover:bg-secondary text-muted/80 flex h-8 items-center rounded-lg px-4 transition-colors hover:text-black dark:hover:text-white'
              key={link.label}
            >
              {link.label}
            </Link>
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
      {isMenuOpen && (
        <div className='bg-background absolute top-14 right-0 left-0 z-50 border-b md:hidden'>
          <nav className='flex flex-col p-4'>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                className='dark:hover:bg-secondary text-muted/80 flex h-10 items-center rounded-lg px-4 transition-colors hover:text-black dark:hover:text-white'
                key={link.label}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ul className='flex gap-2.5 border-t p-4'>
            {socials.map((social) => (
              <li key={social.name}>
                <SocialButton social={social} className='text-muted/80' />
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

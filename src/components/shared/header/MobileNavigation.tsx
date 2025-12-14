'use client';

import { navLinks } from '@/constants/nav-links';
import { useState } from 'react';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import ToggleTheme from '@/components/shared/ToggleTheme';
import Link from 'next/link';
import { useAsyncRoute } from '@/hooks/useAsyncRouter';
import { cn } from '@/lib/utils';

type Props = {
  handleMenuToggle: () => void;
  isClosing?: boolean;
};

export default function MobileNavigation({
  handleMenuToggle,
  isClosing = false,
}: Props) {
  const router = useAsyncRoute();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = async (href: string) => {
    setActiveLink(href);
    try {
      await router.push(href);
    } finally {
      handleMenuToggle();
      setActiveLink(null);
    }
  };

  return (
    <div
      className={cn(
        'bg-background fixed inset-0 z-40 flex flex-col md:hidden',
        isClosing ? 'animate-menu-exit' : 'animate-menu-enter'
      )}
    >
      <div className='h-14 w-full shrink-0' />

      <div className='flex flex-1 flex-col px-8 pt-10 pb-12'>
        <nav className='flex flex-col gap-8'>
          {navLinks.map((link, i) => {
            const isActive = activeLink === link.href;
            return (
              <div
                key={link.href}
                className={cn(
                  isClosing ? 'animate-link-exit' : 'animate-link-enter'
                )}
                style={{
                  animationDelay: isClosing
                    ? `${(navLinks.length - 1 - i) * 20}ms`
                    : `${50 + i * 40}ms`,
                }}
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
              </div>
            );
          })}
        </nav>

        <div
          className={cn(
            'mt-auto',
            isClosing ? 'animate-link-exit' : 'animate-link-enter'
          )}
          style={{
            animationDelay: isClosing
              ? '0ms'
              : `${50 + navLinks.length * 40}ms`,
          }}
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
        </div>
      </div>
    </div>
  );
}

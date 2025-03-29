import Logo from '@/components/shared/Logo';
import Link from 'next/link';
import { navLinks } from '@/constants/nav-links';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';

export default function Header() {
  return (
    <header className='flex h-14 place-items-center justify-between'>
      <Link href='/'>
        <Logo className='size-9' />
      </Link>

      <div className='flex items-center gap-2'>
        <nav className='ml-auto flex gap-1'>
          {navLinks.map((link) => (
            <Link
              href={link.href}
              className='dark:hover:bg-secondary text-muted/80 flex h-8 items-center rounded-lg px-4 transition-colors hover:text-white'
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
        </ul>
      </div>
    </header>
  );
}

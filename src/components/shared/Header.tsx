import Logo from '@/components/shared/Logo';
import Link from 'next/link';
import { navLinks } from '@/constants/nav-links';

export default function Header() {
  return (
    <div className='flex h-14 place-items-center'>
      <Link href='/'>
        <Logo className='size-9' />
      </Link>

      <nav className='ml-auto flex gap-1'>
        {navLinks.map((link) => (
          <Link
            href={link.href}
            className='dark:hover:bg-secondary text-muted/80 rounded-lg px-4 py-1.5 transition-colors hover:text-white'
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

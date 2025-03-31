import { navLinks } from '@/constants/nav-links';
import { motion } from 'motion/react';
import Link from 'next/link';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import ToggleTheme from '@/components/shared/ToggleTheme';

type Props = {
  handleMenuToggle: () => void;
};
export default function MobileNavigation({ handleMenuToggle }: Props) {
  return (
    <motion.div
      className='bg-background/95 fixed inset-0 top-0 z-40 flex flex-col pt-20 backdrop-blur-sm md:hidden'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <nav className='flex flex-col gap-2 p-4'>
        {navLinks.map((link, index) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={link.href}
              className='dark:hover:bg-secondary/50 hover:bg-secondary/50 text-muted/80 flex h-12 items-center justify-center rounded-lg px-4 text-lg font-medium transition-colors hover:text-black dark:hover:text-white'
              onClick={handleMenuToggle}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className='border-muted/20 mt-auto border-t'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ul className='flex justify-center gap-4 p-6'>
          {socials.map((social, index) => (
            <motion.li
              key={social.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <SocialButton
                social={social}
                className='text-muted/80 hover:text-foreground text-xl'
              />
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + socials.length * 0.05 }}
          >
            <ToggleTheme className='text-muted/80 hover:text-foreground text-xl' />
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

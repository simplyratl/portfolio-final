'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BackgroundGradient } from '@/components/shared/BackgroundGradient';

export default function Page() {
  return (
    <section className='relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4'>
      <BackgroundGradient imagePath='/1920.webp' />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 max-w-lg text-center'
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          className='articulat-cf from-primary via-primary/90 to-primary/60 bg-gradient-to-br bg-clip-text text-8xl font-bold tracking-tight text-transparent drop-shadow-sm'
        >
          404
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className='from-primary/60 mx-auto mt-4 h-px w-16 bg-gradient-to-r to-transparent'
        />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          className='mt-6 text-2xl font-medium'
        >
          This page doesn’t exist
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
          className='text-muted mt-2'
        >
          The link may be broken or the page might have been removed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5, ease: 'easeOut' }}
          className='mt-8'
        >
          <Link href='/'>
            <Button
              size='lg'
              className='px-6 text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-white/5'
            >
              Go Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

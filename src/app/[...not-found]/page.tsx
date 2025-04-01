'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='slide-enter-content'>
      <h1 className='articulat-cf text-foreground text-5xl font-bold'>404</h1>
      <p className='text-muted mt-2 text-lg'>This page doesn’t exist.</p>
      <p className='text-muted/80 mt-1'>Maybe it was moved or deleted.</p>
      <Link href='/'>
        <Button className='mt-6'>Go Home</Button>
      </Link>
    </section>
  );
}

'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Card = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'bg-card border-border break-inside-avoid overflow-hidden rounded-xl border p-4 shadow',
        className
      )}
    >
      <div className='space-y-2'>
        {new Array(4).fill(null).map((_, index) => (
          <div
            key={index}
            className='bg-muted/30 h-4 w-full rounded-full'
          ></div>
        ))}
      </div>
    </div>
  );
};

export default function CardsDepthOverview() {
  const [shadow, setShadow] = useState(true);
  return (
    <div>
      <div className='border-border h-full columns-1 gap-2 space-y-2 rounded-lg border bg-white p-4 sm:columns-2 dark:bg-black'>
        <Card className={cn('h-80', { 'shadow-l': shadow })} />
        <Card className='h-20' />
        <Card className='h-42' />
        <Card className='h-50' />
      </div>
      <div className='flex justify-end'>
        <Button className='mt-4' onClick={() => setShadow(!shadow)} size='sm'>
          Toggle Shadow
        </Button>
      </div>
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};
export default function PageWrapper({
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <main className={cn('pb-10', className)}>
      <div className='space-y-1.5'>
        <h1 className='text-accent articulat-cf text-shadow-muted text-3xl font-bold text-shadow-2xs/30'>
          {title}
        </h1>
        {description && <p className='text-muted/70'>{description}</p>}
      </div>
      <div className='mt-8'>{children}</div>
    </main>
  );
}

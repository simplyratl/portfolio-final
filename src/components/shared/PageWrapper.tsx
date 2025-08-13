import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
};
export default function PageWrapper({
  title,
  description,
  children,
  className,
  headerClassName,
}: Props) {
  return (
    <main className={cn('pb-10', className)}>
      <div className={cn('space-y-1.5', headerClassName)}>
        <h1 className='text-accent articulat-cf text-shadow-muted text-3xl font-bold text-shadow-2xs/30'>
          {title}
        </h1>
        {description && <p className='text-muted/70'>{description}</p>}
      </div>
      <div className='mt-8'>{children}</div>
    </main>
  );
}

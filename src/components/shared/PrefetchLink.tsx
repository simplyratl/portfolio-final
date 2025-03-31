'use client';

import { useState } from 'react';
import Link, { LinkProps } from 'next/link';

type PrefetchLinkProps = {
  children: React.ReactNode;
  className?: string;
} & LinkProps;

export default function PrefetchLink({ children, ...rest }: PrefetchLinkProps) {
  const [prefetch, setPrefetch] = useState(false);
  return (
    <Link
      {...rest}
      prefetch={prefetch}
      onMouseEnter={() => setPrefetch(true)}
      onFocus={() => setPrefetch(true)}
    >
      {children}
    </Link>
  );
}

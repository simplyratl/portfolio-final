'use client';

import * as React from 'react';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';

import { MdxCard } from '@/components/shared/markdown/MdxCard';
import MarkdownVideo from '@/components/shared/markdown/MarkdownVideo';
import { cn } from '@/lib/utils';

const components = {
  h1: ({ ...props }) => (
    <h1 className={cn('articulat-cf', props.className)} {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className={cn('articulat-cf', props.className)} {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className={cn('articulat-cf', props.className)} {...props} />
  ),
  h4: ({ ...props }) => (
    <h4 className={cn('articulat-cf', props.className)} {...props} />
  ),
  h5: ({ ...props }) => (
    <h5 className={cn('articulat-cf', props.className)} {...props} />
  ),
  h6: ({ ...props }) => (
    <h6 className={cn('articulat-cf', props.className)} {...props} />
  ),
  a: ({ ...props }) => (
    <a
      className={cn(
        'font-medium underline underline-offset-4',
        props.className
      )}
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc', props.className)} {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal', props.className)} {...props} />
  ),
  li: ({ ...props }) => (
    <li className={cn('mt-2', props.className)} {...props} />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className={cn(
        '[&>*]:text-muted mt-6 border-l-2 pl-6 italic',
        props.className
      )}
      {...props}
    />
  ),
  img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', props.className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className='my-4 md:my-8' {...props} />,
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full overflow-y-auto'>
      <table className={cn('w-full', props.className)} {...props} />
    </div>
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('even:bg-muted m-0 border-t p-0', props.className)}
      {...props}
    />
  ),
  th: ({ ...props }) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        props.className
      )}
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        props.className
      )}
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <pre
      className={cn(
        'mt-6 mb-4 overflow-x-auto rounded-lg p-4 [&::-webkit-scrollbar]:h-1.5',
        props.className
      )}
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <code
      className={cn(
        'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
        props.className
      )}
      {...props}
    />
  ),
  Image,
  Card: MdxCard,
  MarkdownVideo,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className='mdx slide-enter-content prose dark:prose-invert prose-headings:text-foreground max-w-full'>
      <Component components={components} />
    </div>
  );
}

'use client';

import { calculateReadTime } from '@/lib/utils';
import PrefetchLink from '@/components/shared/PrefetchLink';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import { format } from 'date-fns';
import { motion } from 'motion/react';

type Blog = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  body: {
    raw: string;
  };
};

type RecommendedBlogsProps = {
  blogs: Blog[];
};

export default function RecommendedBlogs({ blogs }: RecommendedBlogsProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <motion.div
      className='border-muted/20 mt-16 border-t pt-10'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className='articulat-cf text-muted mb-6 text-sm font-semibold tracking-wider uppercase'>
        Continue Reading
      </h2>
      <div className='grid gap-4 sm:grid-cols-2'>
        {blogs.slice(0, 2).map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <PrefetchLink
              href={blog.slug}
              className='group border-muted/20 bg-secondary/30 hover:border-muted/40 hover:bg-secondary/50 relative block h-full overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-lg'
            >
              <div className='flex flex-col gap-3'>
                <div className='flex items-start justify-between gap-2'>
                  <h3 className='articulat-cf group-hover:text-foreground line-clamp-2 text-lg leading-tight font-semibold transition-colors'>
                    {blog.title}
                  </h3>
                  <ArrowRightIcon className='text-muted/50 group-hover:text-foreground mt-1 h-4 w-4 shrink-0 transition-all group-hover:translate-x-1' />
                </div>

                {blog.description && (
                  <p className='text-muted line-clamp-2 text-sm leading-relaxed'>
                    {blog.description}
                  </p>
                )}

                <div className='text-muted/90 mt-auto flex items-center gap-2 text-xs'>
                  <time dateTime={blog.date}>
                    {format(new Date(blog.date), 'MMM dd, yyyy')}
                  </time>
                  <span>·</span>
                  <span>{calculateReadTime(blog.body.raw)}</span>
                </div>
              </div>

              {/* Subtle gradient overlay on hover */}
              <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5' />
            </PrefetchLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

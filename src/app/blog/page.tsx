'use client';

import { allBlogs } from 'contentlayer2/generated';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import PageWrapper from '@/components/shared/PageWrapper';
import { useState } from 'react';

const getAllBlogs = () => {
  return allBlogs;
};

export default function Blogs() {
  const blogs = getAllBlogs();
  const router = useRouter();
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const groupedByYear: Record<number, typeof allBlogs> = {};

  blogs.forEach((blog) => {
    const year = new Date(blog.date).getFullYear();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(blog);
  });

  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <PageWrapper title='Blog' className='slide-enter-content'>
      <div className={cn('grid grid-cols-1 gap-2 transition-opacity')}>
        {sortedYears.map((year) => (
          <div
            key={year}
            className={cn(
              'slide-enter-content group/list relative space-y-1 transition-all duration-200',
              hoveredYear && hoveredYear !== year
                ? 'sm:opacity-30'
                : 'opacity-100'
            )}
            onMouseEnter={() => setHoveredYear(year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <hr className='border-muted/20 border-t' />
            <ul className='w-[91%]'>
              {groupedByYear[year].map((blog) => (
                <li
                  key={blog.slug}
                  onMouseEnter={() => router.prefetch(blog.slug)}
                  className='group/item transition-all'
                >
                  <Link
                    href={blog.slug}
                    className='hover:bg-muted/5 flex w-full items-center gap-2 rounded-lg px-4 py-3 no-underline transition-all'
                  >
                    <span className='articulat-cf text-muted/60 group-hover/item:!text-foreground group-hover/list:text-muted/40 font-semibold transition-all'>
                      {blog.title}
                    </span>
                    <span className='text-muted/50 hidden text-sm md:block'>
                      {blog.description}
                    </span>
                    <div className='bg-muted/20 mr-2 h-[1px] flex-1'></div>
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className='text-muted/50 absolute top-1/2 right-4 mb-4 -translate-y-1/2 text-sm'>
              {year}
            </h2>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

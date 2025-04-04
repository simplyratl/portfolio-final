'use client';

import { allBlogs } from 'contentlayer2/generated';
import { useRouter } from 'next/navigation';
import { calculateReadTime, cn } from '@/lib/utils';
import PageWrapper from '@/components/shared/PageWrapper';
import { useState } from 'react';
import PrefetchLink from '@/components/shared/PrefetchLink';

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
    <PageWrapper
      title='Blog'
      className='slide-enter-content'
      description='Thoughts, insights, and technical deep dives'
    >
      <div className='grid grid-cols-1 gap-6'>
        {sortedYears.map((year) => (
          <div
            key={year}
            className={cn(
              'group relative space-y-3 transition-opacity',
              hoveredYear && hoveredYear !== year ? 'opacity-60' : 'opacity-100'
            )}
            onMouseEnter={() => setHoveredYear(year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <hr className='border-muted/20' />
            <h2 className='text-muted/50 text-lg font-semibold'>{year}</h2>
            <ul className='space-y-2'>
              {groupedByYear[year].map((blog) => (
                <li
                  key={blog.slug}
                  onMouseEnter={() => router.prefetch(blog.slug)}
                  className='group/item transition-all'
                >
                  <PrefetchLink
                    href={blog.slug}
                    className='hover:bg-secondary/50 block rounded-lg px-4 py-3 transition-all'
                    aria-label={`Read ${blog.title}`}
                  >
                    <div className='flex justify-between'>
                      <div>
                        <h3 className='articulat-cf text-md font-medium'>
                          {blog.title}
                        </h3>
                        <p className='text-muted/80 mt-1 text-sm'>
                          {blog.description}
                        </p>
                      </div>

                      <p className='articulat-cf text-muted/70 hidden text-sm sm:block'>
                        {calculateReadTime(blog.body.raw)}
                      </p>
                    </div>
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

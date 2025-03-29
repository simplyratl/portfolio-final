'use client';

import { allBlogs } from 'contentlayer2/generated';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const getAllBlogs = () => {
  return allBlogs;
};

export default function Blogs() {
  const blogs = getAllBlogs();
  const router = useRouter();

  return (
    <div className='slide-enter-content'>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold'>Blog</h1>
      </div>

      <div
        className={cn('grid grid-cols-1 gap-2 space-y-8 transition-opacity')}
      >
        <ul className='group/list slide-enter-content'>
          {blogs.map((blog) => (
            <li
              key={blog.slug}
              onMouseEnter={() => router.prefetch(blog.slug)}
              className='group/item transition-all'
            >
              <Link
                href={blog.slug}
                className='hover:bg-muted/5 flex w-full items-center gap-2 rounded-lg px-4 py-3 no-underline transition-all'
              >
                <span className='articulat-cf text-muted/80 group-hover/item:!text-foreground group-hover/list:text-muted/40 font-semibold transition-all'>
                  {blog.title}
                </span>
                <span className='text-muted/50 hidden text-sm md:block'>
                  {blog.description}
                </span>
                <div className='bg-muted/20 mr-2 h-[1px] flex-1'></div>
                <span className='text-muted/60'>
                  {new Date(blog.date).getFullYear()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

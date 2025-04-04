import { Mdx } from '@/components/shared/markdown/MDXComponent';
import { allBlogs } from 'contentlayer2/generated';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import MarkdownVideo from '@/components/shared/markdown/MarkdownVideo';
import { cn } from '@/lib/utils';
import { SquareMenu } from 'lucide-react';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

type Headings = {
  slug: string;
  text: string;
  level: number;
};

const headingLevels: {
  [key: string]: number;
} = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};

async function getDocFromParams(slug: string) {
  const doc = allBlogs.find((doc) => doc.slugAsParams === slug);
  if (!doc) notFound();

  return doc;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getDocFromParams(slug);

  const calculateReadTime = () => {
    const AVERAGE_READING_SPEED = 250; // words per minute
    const words = blog.body.raw.split(/\s+/).length;
    const minutes = Math.ceil(words / AVERAGE_READING_SPEED);
    return `${minutes} min read`;
  };

  return (
    <main className='mx-auto max-w-[650px] font-sans'>
      <div className='group/article'>
        <article className='slide-enter-content pb-10'>
          <div>
            <h1 className='articulat-cf text-4xl font-semibold'>
              {blog.title}
            </h1>
            <div className='text-muted mt-3 flex items-center gap-1 font-medium'>
              <p className='articulat-cf'>
                {format(blog.date, 'MMMM dd yyyy')}
              </p>
              <span>·</span>
              <p className='articulat-cf'>{calculateReadTime()}</p>
            </div>
          </div>
          <div className='mt-10'>
            <div className='space-y-6'>
              {blog.mainImage && (
                <div className='relative h-110 w-full overflow-hidden rounded-xl'>
                  <Image
                    src={blog.mainImage}
                    alt={blog.title}
                    fill
                    className='object-cover'
                  />
                </div>
              )}

              {blog.mainVideo && <MarkdownVideo src={blog.mainVideo} />}
            </div>

            <div className='inter mt-10'>
              <Mdx code={blog.body.code} />
            </div>
          </div>
        </article>

        <div className='group/toc fixed top-24 left-4'>
          <SquareMenu className='text-muted/40 group-hover/toc:text-muted-foreground/80' />
          {blog.toc && (
            <aside>
              <nav
                className='hidden max-h-[75vh] w-70 overflow-auto opacity-0 transition-opacity duration-300 ease-in-out group-hover/article:opacity-100 hover:opacity-100 xl:block'
                aria-label='Table of Contents'
              >
                <ul>
                  {blog.headings.map((heading: Headings) => {
                    const level = headingLevels[heading.level];
                    return (
                      <li key={`#${heading.slug}`} className='relative'>
                        <a
                          href={`#${heading.slug}`}
                          className={cn(
                            'text-muted-foreground/80 hover:text-foreground block py-2 transition-colors duration-200 ease-in-out',
                            level > 2
                              ? 'text-xs font-normal'
                              : 'text-sm font-medium'
                          )}
                          style={{
                            paddingLeft: `${(level - 2) * 10}px`,
                          }}
                        >
                          <span className='line-clamp-1'>{heading.text}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

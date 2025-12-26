import MarkdownVideo from '@/components/shared/markdown/MarkdownVideo';
import { Mdx } from '@/components/shared/markdown/MDXComponent';
import ReadingProgressBar from '@/components/shared/ReadingProgressBar';
import RecommendedBlogs from '@/components/blogs/RecommendedBlogs';
import BlogTransition from '@/components/blogs/BlogTransition';
import BlogReadingPreferences from '@/components/blogs/BlogReadingPreferences';
import { calculateReadTime, cn } from '@/lib/utils';
import { allBlogs } from 'contentlayer2/generated';
import { format } from 'date-fns';
import { SquareMenu } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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

function getRecommendedBlogs(currentSlug: string) {
  // Filter out the current blog and get published blogs
  const otherBlogs = allBlogs.filter(
    (blog) => blog.slugAsParams !== currentSlug && blog.published
  );

  // Sort by date (most recent first)
  const sortedBlogs = otherBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Return 2 most recent blogs
  return sortedBlogs.slice(0, 2);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getDocFromParams(slug);
  const recommendedBlogs = getRecommendedBlogs(slug);

  return (
    <main className='mx-auto max-w-[650px] font-sans'>
      <ReadingProgressBar />
      <div className='group/article'>
        <BlogTransition>
          <article className='pt-4 pb-10'>
            <div>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h1 className='articulat-cf text-shadow-muted text-4xl font-semibold text-shadow-2xs/30'>
                    {blog.title}
                  </h1>
                  <div className='text-muted mt-3 flex items-center gap-1 font-medium'>
                    <p className='articulat-cf'>
                      {format(blog.date, 'MMMM dd yyyy')}
                    </p>
                    <span>·</span>
                    <p className='articulat-cf'>
                      {calculateReadTime(blog.body.raw)}
                    </p>
                  </div>
                </div>
                <BlogReadingPreferences />
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

              <div className='blog-content inter mt-10 transition-all duration-300'>
                <Mdx code={blog.body.code} />
              </div>

              <RecommendedBlogs blogs={recommendedBlogs} />
            </div>
          </article>
        </BlogTransition>

        {blog.toc && (
          <div className='group/toc fixed top-24 left-4'>
            <SquareMenu className='text-muted/40 group-hover/toc:text-muted-foreground/80 hidden xl:block' />
            <aside className='mt-2'>
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
          </div>
        )}
      </div>
    </main>
  );
}

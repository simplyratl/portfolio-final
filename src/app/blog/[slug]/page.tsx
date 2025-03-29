import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/shared/markdown/MDXComponent';
import { format } from 'date-fns';
import Header from '@/components/shared/Header';

type BlogPageProps = {
  params: {
    slug: string;
  };
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

  return (
    <main>
      <article className='slide-enter-content'>
        <h1 className='articulat-cf text-4xl font-semibold'>{blog.title}</h1>
        <p className='articulat-cf text-muted/50 mt-3 font-medium'>
          {format(blog.date, 'MMMM dd yyyy')}
        </p>
        <div className='inter mt-10'>
          <Mdx code={blog.body.code} />
        </div>
      </article>

      {blog.toc && (
        <aside>
          <ul
            className='fixed top-20 left-4 hidden max-h-[80vh] max-w-60 scroll-p-2.5 space-y-2 overflow-y-auto text-sm text-balance opacity-40 transition-opacity hover:opacity-100 xl:block'
            id='toc'
          >
            {blog.headings.map((heading: Headings) => {
              return (
                <li key={`#${heading.slug}`}>
                  <a
                    className='group !text-muted/40 hover:!text-foreground relative data-[level=three]:pl-4'
                    data-level={heading.level}
                    href={`#${heading.slug}`}
                    style={{
                      paddingLeft: `${headingLevels[heading.level] * 9}px`,
                    }}
                  >
                    <span className='absolute top-0.5 left-0 font-mono text-xs'>
                      {new Array(headingLevels[heading.level])
                        .fill(0)
                        .map(() => '-')}
                    </span>
                    {heading.text}

                    <span className='invisible ml-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100'>
                      #
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </main>
  );
}

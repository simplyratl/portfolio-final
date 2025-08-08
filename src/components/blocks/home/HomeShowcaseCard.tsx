import PrefetchLink from '@/components/shared/PrefetchLink';
import ArrowRightUpIcon from '@/icons/ArrowRightUpIcon';
import { cn } from '@/lib/utils';

type Items = {
  title: string;
  url?: string;
  description?: string;
  isExternal?: boolean;
};

type Props = {
  title: string;
  items: Items[];
  viewAllUrl?: string;
  className?: string;
};

const ShowcaseLink = ({ title, url, isExternal }: Items) => {
  if (!url) {
    return <span>{title}</span>;
  }

  if (url && !isExternal) {
    return (
      <PrefetchLink href={url} className='link'>
        {title}
      </PrefetchLink>
    );
  }

  if (url && isExternal) {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='link inline-flex items-center gap-1'
      >
        {title}
        <ArrowRightUpIcon className='size-4' />
      </a>
    );
  }
};

export default function HomeShowcaseCard({
  title,
  items,
  viewAllUrl,
  className,
}: Props) {
  return (
    <div
      className={cn(
        className,
        'group/card relative overflow-hidden rounded-2xl border border-transparent p-5 transition-colors hover:border-black/20 hover:bg-black/5 hover:dark:border-white/10 hover:dark:bg-white/5'
      )}
    >
      <div className='bg-background/40 absolute inset-0 z-[0] rounded-xl dark:m-0.5' />
      <div className='dark:from-border absolute inset-0 z-[-1] rounded-xl bg-gradient-to-b to-transparent' />

      <div className='via-primary absolute top-[80%] left-0 h-20 w-[1px] bg-gradient-to-b from-transparent to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover/card:top-[20%] group-hover/card:opacity-100' />

      <div className='z-50 flex items-center justify-between'>
        <h2 className='text-accent'>{title}</h2>
        {viewAllUrl && (
          <PrefetchLink
            href={viewAllUrl}
            className='link text-muted hover:text-primary flex items-center gap-2 text-sm'
          >
            All
            <ArrowRightUpIcon className='size-4' />
          </PrefetchLink>
        )}
      </div>

      <ul className='slide-enter-content divide-y divide-white/10'>
        {items.map((project) => (
          <li
            key={project.title}
            className='flex h-30 flex-col justify-center sm:p-0'
          >
            <ShowcaseLink {...project} />
            {project.description && (
              <p className='text-muted mt-2 line-clamp-2 text-sm'>
                {project.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

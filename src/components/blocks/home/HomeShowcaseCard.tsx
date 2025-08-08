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
    <div className={cn(className, 'relative overflow-hidden rounded-md p-4')}>
      <div className='flex items-center justify-between'>
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

      <ul className='slide-enter-content mt-4'>
        {items.map((project) => (
          <li key={project.title} className='py-4 sm:h-20 sm:p-0 md:h-30'>
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

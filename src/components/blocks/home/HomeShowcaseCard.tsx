import PrefetchLink from '@/components/shared/PrefetchLink';

type Items = {
  title: string;
  url?: string;
  description?: string;
};

type Props = {
  title: string;
  items: Items[];
  viewAllUrl?: string;
};
export default function HomeShowcaseCard({ title, items, viewAllUrl }: Props) {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-accent'>{title}</h2>
        {viewAllUrl && (
          <PrefetchLink href={viewAllUrl} className='link text-sm'>
            View all
          </PrefetchLink>
        )}
      </div>

      <ul>
        {items.map((project) => (
          <li key={project.title} className='py-4'>
            {project.url ? (
              <PrefetchLink href={project.url} className='link'>
                {project.title}
              </PrefetchLink>
            ) : (
              project.title
            )}
            {project.description && (
              <p className='text-muted mt-2 text-sm'>{project.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

import PageWrapper from '@/components/shared/PageWrapper';
import { playground } from '@/constants/playground';
import ArrowRightUpIcon from '@/icons/ArrowUpIcon';
import Image from 'next/image';

export default function Page() {
  return (
    <PageWrapper
      title='Playground'
      description='Fun stuff I build while I have free time'
      className='slide-enter-content'
    >
      <div className='slide-enter-content mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {playground.map((item) => (
          <div key={item.title} className='group'>
            <a
              href={item.location}
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col space-y-3 transition-all'
              aria-label={`Open ${item.title} in a new tab`}
            >
              <div className='border-border/60 relative aspect-video w-full overflow-hidden rounded-md border'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-200 group-hover:scale-105'
                />
              </div>

              <div className='flex flex-col'>
                <h2 className='link flex items-center text-lg font-medium'>
                  {item.title}
                  <ArrowRightUpIcon className='text-muted ml-1 size-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
                </h2>
                <p className='text-muted text-[15px]'>{item.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

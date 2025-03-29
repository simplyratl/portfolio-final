import PageWrapper from '@/components/shared/PageWrapper';
import { playground } from '@/constants/playground';
import Image from 'next/image';

export default function Page() {
  return (
    <PageWrapper
      title='Playground'
      description='Fun stuff I build while I have free time'
      className='slide-enter-content'
    >
      <ul className='slide-enter-content grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4'>
        {playground.map((playground) => (
          <li
            key={playground.title}
            className='group transition-all duration-300'
          >
            <a
              href={playground.location}
              target='_blank'
              rel='noopener noreferrer'
              className='block'
            >
              <div className='relative aspect-video w-full overflow-hidden rounded-md'>
                <div className='absolute inset-0 z-10 bg-black/0 transition-all duration-300 group-hover:bg-black/20'></div>
                <Image
                  src={playground.image}
                  alt={playground.title}
                  fill
                  className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                />
              </div>
              <div className='mt-2'>
                <h2 className='relative inline-block font-semibold'>
                  <span>{playground.title}</span>
                </h2>
                <p className='text-muted text-sm'>{playground.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}

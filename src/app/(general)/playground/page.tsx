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
      <div className='slide-enter-content mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {playground.map((item) => (
          <a
            key={item.title}
            href={item.location}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${item.title} in a new tab`}
            className='group border-border/20 hover:border-accent/20 hover:shadow-accent/5 from-card relative h-80 overflow-hidden rounded-3xl border bg-gradient-to-b to-transparent p-6 transition-shadow hover:shadow-lg'
          >
            <div className='absolute inset-0 z-0'>
              <div className='from-background/90 via-background/90 absolute inset-0 z-10 bg-gradient-to-t via-20% to-transparent to-60%' />
              <div className='from-background/20 absolute inset-0 z-10 bg-gradient-to-b to-transparent to-20%' />
              <div className='relative h-full w-full overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                  className='object-cover opacity-100 will-change-transform'
                  style={{
                    transform: 'scale(1)',
                    transition: 'transform 300ms ease-out',
                  }}
                />
              </div>
            </div>

            <div className='relative z-10 flex h-full flex-col justify-between'>
              <h2 className='inline-block w-fit rounded-md bg-black/60 px-2 text-xl font-medium tracking-tight text-white transition-colors duration-200'>
                {item.title}
              </h2>

              <div className='space-y-2'>
                {item.tags && (
                  <div className='space-x-2'>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className='bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className='flex items-end justify-between'>
                  <p className='line-clamp-2 max-w-[80%] text-sm'>
                    {item.description}
                  </p>

                  <div className='bg-background/70 rounded-full p-2 backdrop-blur-sm transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1'>
                    <ArrowRightUpIcon className='size-4' />
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </PageWrapper>
  );
}

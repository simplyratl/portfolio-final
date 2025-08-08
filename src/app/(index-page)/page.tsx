import Footer from '@/components/shared/Footer';
import { projects } from '@/constants/projects';
import HomeShowcaseCard from '@/components/blocks/home/HomeShowcaseCard';
import { allBlogs } from 'contentlayer2/generated';
import { playground } from '@/constants/playground';
import Image from 'next/image';
import * as motion from 'motion/react-client';

export default function Home() {
  const blogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    ?.slice(0, 3)
    .map((blog) => ({
      title: blog.title,
      url: blog.slug,
      description: blog.description,
    }));

  const playgrounds = playground.map((playground) => ({
    title: playground.title,
    url: playground.location,
    description: playground.description,
    isExternal: true,
  }));

  return (
    <div className='slide-enter-content flex h-[calc(100vh-120px)] flex-col justify-between gap-12'>
      <div className='flex-1'>
        <div className='mx-auto inline-flex max-w-screen-md flex-col sm:flex sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='articulat-cf text-shadow-muted text-3xl font-bold text-shadow-2xs/30'>
              Nikica Ražnatović
            </h1>
            <p className='text-muted'>Frontend Engineer | UI Specialist</p>
          </div>

          <a href='mailto:work@nikicaraznatovic.me' className='link'>
            work@nikicaraznatovic.me
          </a>
        </div>

        <div className='slide-enter-content mx-auto mt-6 max-w-screen-md space-y-4'>
          <p>
            I design and develop functional, detail-oriented user interfaces
            that enhance digital experiences.
          </p>
          <p>
            My work includes internal tools, scalable design systems, and
            performance-driven web applications.
          </p>
          <p>Currently, I’m a Frontend Engineer at Coreit.</p>
        </div>

        <div className='slide-enter-content relative mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
          <div className='bg-background/40 absolute inset-0 z-[0] m-0.5 rounded-xl' />
          <div className='from-border absolute inset-0 z-[-1] rounded-xl to-transparent dark:bg-gradient-to-b' />
          <motion.div
            initial={{ opacity: 0, top: '80%' }}
            animate={{ opacity: 1, top: '20%' }}
            exit={{ opacity: 0, top: '80%' }}
            transition={{ delay: 1, ease: 'easeInOut' }}
            className='via-primary absolute left-0 h-20 w-[1px] bg-gradient-to-b from-transparent to-transparent transition-all duration-500 ease-in-out dark:left-[-1px]'
          ></motion.div>

          <HomeShowcaseCard
            title='Projects'
            items={projects.workProjects.slice(0, 3)}
            viewAllUrl='/projects'
          />
          <HomeShowcaseCard title='Blog' items={blogs} viewAllUrl='/blog' />
          <HomeShowcaseCard
            title='Playground'
            items={playgrounds}
            viewAllUrl='/playground'
          />
        </div>
      </div>

      <div className='absolute inset-0 z-[-1] h-[840px] overflow-hidden'>
        <div>
          <Image
            fill
            src='/1920.webp'
            alt='Nikica Ražnatović'
            className='opacity-50 blur-2xl dark:opacity-30'
          />
        </div>
        <div className='absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_90%)]' />
        <div className='to-background absolute inset-0 h-full w-full bg-gradient-to-b from-transparent' />
      </div>

      <div className='mx-auto max-w-screen-md'>
        <Footer />
      </div>
    </div>
  );
}

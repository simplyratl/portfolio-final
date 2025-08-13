import HomeShowcaseCard from '@/components/blocks/home/HomeShowcaseCard';
import { BackgroundGradient } from '@/components/shared/BackgroundGradient';
import Footer from '@/components/shared/Footer';
import { playground } from '@/constants/playground';
import { projects } from '@/constants/projects';
import { allBlogs } from 'contentlayer2/generated';

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
          <div className='px-4'>
            <h1 className='articulat-cf text-shadow-muted text-3xl font-bold text-shadow-2xs/30'>
              Nikica Ražnatović
            </h1>
            <p className='text-muted'>Frontend Engineer | UI Specialist</p>
          </div>

          <a href='mailto:work@nikicaraznatovic.me' className='link'>
            work@nikicaraznatovic.me
          </a>
        </div>

        <div className='slide-enter-content mx-auto mt-6 max-w-screen-md space-y-4 px-4'>
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
          <HomeShowcaseCard
            title='Projects'
            items={projects.slice(0, 3)}
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

      <BackgroundGradient imagePath='/1920.webp' />

      <div className='mx-auto w-full max-w-screen-md px-4'>
        <Footer />
      </div>
    </div>
  );
}

import Footer from '@/components/shared/Footer';
import { projects } from '@/constants/projects';
import HomeShowcaseCard from '@/components/blocks/home/HomeShowcaseCard';
import { allBlogs } from 'contentlayer2/generated';

export default function Home() {
  const blogs = allBlogs?.slice(0, 3).map((blog) => ({
    title: blog.title,
    url: blog.slug,
    description: blog.description,
  }));

  return (
    <div className='slide-enter-content flex h-[calc(100vh-120px)] flex-col justify-between'>
      <div className='flex-1'>
        <div className='inline-flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between'>
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

        <div className='slide-enter-content mt-6 space-y-4'>
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

        <div className='mt-10 grid grid-cols-3 gap-12'>
          <HomeShowcaseCard
            title='Projects'
            items={projects.workProjects.slice(0, 3)}
            viewAllUrl='/projects'
          />
          <HomeShowcaseCard title='Blog' items={blogs} viewAllUrl='/blogs' />
        </div>
      </div>

      <Footer />
    </div>
  );
}

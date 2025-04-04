import Footer from '@/components/shared/Footer';
import PrefetchLink from '@/components/shared/PrefetchLink';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className='slide-enter-content flex h-[calc(100vh-120px)] flex-col justify-between'>
      <div className='flex-1'>
        <div className='inline-flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='articulat-cf text-3xl font-bold'>
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

          <div className='flex gap-4'>
            <PrefetchLink
              href='/projects'
              className='link flex items-center gap-1'
            >
              View My Projects <ArrowRight className='size-4' />
            </PrefetchLink>
            <PrefetchLink
              href='/about'
              className='link flex items-center gap-1'
            >
              Learn More <ArrowRight className='size-4' />
            </PrefetchLink>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

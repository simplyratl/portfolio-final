import Career from '@/components/blocks/home/Career';
import PageWrapper from '@/components/shared/PageWrapper';

const skills = [
  { name: 'React', description: 'Scalable UI components and SPAs' },
  { name: 'Next.js', description: 'SEO-friendly, optimized web apps' },
  { name: 'Vue.js', description: 'Efficient frontend architecture' },
  { name: 'TypeScript', description: 'Strict typing for maintainability' },
  { name: 'Tailwind CSS', description: 'Rapid UI development' },
  { name: 'UI/UX', description: 'Designing intuitive user experiences' },
];

export default function About() {
  return (
    <PageWrapper
      title='About'
      description='More about me'
      className='slide-enter-content'
    >
      <section className='mb-12'>
        <h2 className='text-md text-muted mb-4 font-medium'>Biography</h2>
        <div className='slide-enter-content space-y-4'>
          <p>
            I craft intuitive and scalable user interfaces, blending technical
            precision with a strong design sensibility. My focus is on building
            performant and maintainable frontend applications.
          </p>
          <p>
            My past work includes developing internal tools, scalable design
            systems, and performance-driven applications.
          </p>
          <p>
            I bridge the gap between development and design, ensuring seamless
            user interactions across different platforms.
          </p>
        </div>
      </section>

      <section className='mb-12'>
        <h2 className='text-md text-muted mb-4'>Skills</h2>
        <div className='slide-enter-content grid grid-cols-2 gap-3 md:grid-cols-3'>
          {skills.map(({ name, description }) => (
            <div
              key={name}
              className='bg-secondary rounded-md px-4 py-2 text-center text-xs'
              title={description}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className='text-md text-muted mb-4 font-medium'>Experience</h2>
        <Career />
      </section>
    </PageWrapper>
  );
}

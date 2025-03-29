import Career from '@/components/blocks/home/Career';
import PageWrapper from '@/components/shared/PageWrapper';

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'UI/UX',
  'Design Systems',
];

export default function About() {
  return (
    <PageWrapper title='About' className='slide-enter-content'>
      <section className='mb-12'>
        <h3 className='text-md text-muted mb-4 font-medium'>Biography</h3>
        <div className='slide-enter-content space-y-4'>
          <p>
            Specializing in user interface development, functional software and
            web applications with a focus on details that enhance user
            interactions.
          </p>
          <p>
            In the past I've developed tools, internal design systems, and
            applications.
          </p>
          <p>
            My approach combines technical expertise with an eye for design,
            creating interfaces that are both beautiful and functional.
          </p>
        </div>
      </section>

      <section className='mb-12'>
        <h3 className='text-md text-muted mb-4'>Skills</h3>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
          {skills.map((skill) => (
            <div
              key={skill}
              className='bg-secondary rounded-md px-4 py-2 text-center text-xs'
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Experience section */}
      <section>
        <h3 className='text-md text-muted mb-4 font-medium'>Experience</h3>
        <Career />
      </section>
    </PageWrapper>
  );
}

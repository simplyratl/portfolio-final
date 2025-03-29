import PageWrapper from '@/components/shared/PageWrapper';
import ProjectShowcase from '@/components/blocks/home/ProjectShowcase';

export default function Page() {
  return (
    <PageWrapper
      title='Projects'
      description="Projects I've worked on."
      className='slide-enter-content'
    >
      <p className='text-accent text-sm'>
        Some projects are not shown or have general description due to
        confidentiality agreements. These include internal tools, banking
        systems or other enterprise applications.
      </p>

      <ProjectShowcase />
    </PageWrapper>
  );
}

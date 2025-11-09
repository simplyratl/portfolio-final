'use client';

import PageWrapper from '@/components/shared/PageWrapper';
import { projects } from '@/constants/projects';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const groupProjectsByCategory = () => {
  const categories: Record<string, typeof projects> = {};

  projects.forEach((project) => {
    if (!categories[project.category]) {
      categories[project.category] = [];
    }
    categories[project.category].push(project);
  });

  return categories;
};

const getProjectStats = () => {
  const totalProjects = projects.length;
  const categories = [...new Set(projects.map((p) => p.category))];

  return {
    totalProjects,
    categories: categories.length,
  };
};

export default function Projects() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const groupedProjects = groupProjectsByCategory();
  const stats = getProjectStats();

  const categoriesWithProjects = Object.entries(groupedProjects).filter(
    ([_, projects]) => projects.length > 0
  );

  return (
    <PageWrapper
      title='Projects'
      className='slide-enter-content'
      description='A collection of some of the projects I worked on'
    >
      <div className='mb-12'>
        <p>
          I specialize in building complex enterprise applications, government
          systems, and web platforms. Most projects involve confidential
          internal tools where specific implementation details remain private.
        </p>

        <div className='my-8 grid grid-cols-2 gap-4'>
          <div className='text-center'>
            <div className='text-foreground text-2xl font-bold'>
              {stats.totalProjects}
            </div>
            <div className='text-muted/70 text-sm'>Projects</div>
          </div>
          <div className='text-center'>
            <div className='text-foreground text-2xl font-bold'>
              {stats.categories}
            </div>
            <div className='text-muted/70 text-sm'>Industries</div>
          </div>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 gap-6'>
        {categoriesWithProjects.map(([category, categoryProjects]) => (
          <div
            key={category}
            className={cn(
              'group relative space-y-3 transition-opacity',
              hoveredCategory && hoveredCategory !== category
                ? 'opacity-60'
                : 'opacity-100'
            )}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <hr className='border-muted/20 mb-8' />
            <div className='flex items-center justify-between'>
              <h2 className='text-muted text-lg font-semibold'>{category}</h2>
              <span className='text-muted text-sm'>
                {categoryProjects.length} projects
              </span>
            </div>
            <ul className='space-y-2'>
              {categoryProjects.map((project) => (
                <li key={project.title} className='group/item transition-all'>
                  <div className='hover:bg-secondary/50 hover:shadow-s block rounded-lg px-4 py-3 transition-all'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='mb-2 flex items-center gap-3'>
                          <div className='text-muted flex-shrink-0'>
                            {project.icon}
                          </div>
                          <div className='flex-1'>
                            <h3 className='articulat-cf text-md font-medium'>
                              {project.title}
                            </h3>
                            <p className='text-muted text-xs'>{project.role}</p>
                          </div>
                        </div>
                        <p className='text-muted/80 mb-2 ml-8 text-sm'>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className='mb-2 ml-8 flex flex-wrap gap-1'>
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className='text-muted bg-secondary rounded px-2 py-1 text-xs'
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {project.titleAlternative &&
                          project.titleAlternative !== project.title && (
                            <p className='text-muted/50 mt-1 ml-8 text-xs italic'>
                              Also known as: {project.titleAlternative}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='border-muted/20 mt-12 border-t pt-6'>
        <div className='text-muted/60 text-center text-sm'>
          <p>
            Each project represents unique challenges in scalability, security,
            and user experience.
          </p>
          <p className='mt-2'>
            From banking systems handling thousands of transactions to
            government platforms serving thousands of users daily.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

import React from 'react';
import Link from 'next/link';
import { ProjectCardProps } from './projects.types';
import { ProjectContent } from './ProjectContent';

export const ProjectCard = ({
  title,
  description,
  link,
  isExternal = false,
  icon,
}: ProjectCardProps) => (
  <div className='group h-full'>
    {isExternal ? (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='group block h-full'
      >
        <ProjectContent
          title={title}
          description={description}
          isExternal={isExternal}
          link={link}
          icon={icon}
        />
      </a>
    ) : link ? (
      <Link href={link} className='block h-full'>
        <ProjectContent
          title={title}
          description={description}
          isExternal={isExternal}
          link={link}
          icon={icon}
        />
      </Link>
    ) : (
      <div className='block h-full'>
        <ProjectContent
          title={title}
          description={description}
          isExternal={isExternal}
          link={link}
          icon={icon}
        />
      </div>
    )}
  </div>
);

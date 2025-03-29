import { ArrowRightDownIcon } from '@/icons/ArrowRightDownIcon';
import ArrowRightUpIcon from '@/icons/ArrowRightUpIcon';
import Link from 'next/link';
import React from 'react';

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  isExternal?: boolean;
};

type ProjectCategoryProps = {
  title: string;
  children: React.ReactNode;
};

const ProjectCategory = ({ title, children }: ProjectCategoryProps) => (
  <div className='mb-12'>
    <h2 className='text-muted text- mb-6'>{title}</h2>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>{children}</div>
  </div>
);

const ProjectCard = ({
  title,
  description,
  link,
  isExternal = false,
}: ProjectCardProps) => (
  <div className='group'>
    {isExternal ? (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='group block'
      >
        <ProjectContent
          title={title}
          description={description}
          isExternal={isExternal}
        />
      </a>
    ) : (
      <Link href={link}>
        <ProjectContent
          title={title}
          description={description}
          isExternal={isExternal}
        />
      </Link>
    )}
  </div>
);

type ProjectContentProps = Omit<ProjectCardProps, 'link'>;

const ProjectContent = ({
  title,
  description,
  isExternal,
}: ProjectContentProps) => (
  <>
    <h3 className='text-md decoration-muted/60 flex items-center font-medium underline-offset-2 group-hover:underline'>
      {title}
      {isExternal && <ArrowRightUpIcon className='text-muted ml-1 size-4' />}
    </h3>
    <p className='text-muted mt-2'>{description}</p>
  </>
);

export default function ProjectShowcase() {
  return (
    <div className='slide-enter-content my-12'>
      <ProjectCategory title='Development'>
        <ProjectCard
          title='TypeSafe API'
          description='End-to-end type safety for REST APIs with minimal configuration.'
          link='/projects/typesafe-api'
        />
        <ProjectCard
          title='State Manager'
          description='Lightweight and reactive state management for React applications.'
          link='/projects/state-manager'
        />
      </ProjectCategory>

      <ProjectCategory title='Design Systems'>
        <ProjectCard
          title='Component Library'
          description='Reusable UI components focused on accessibility and performance.'
          link='/projects/component-library'
        />
        <ProjectCard
          title='Design Tokens'
          description='Framework-agnostic design tokens with automated implementation.'
          link='https://github.com/nraznatovic/design-tokens'
          isExternal
        />
      </ProjectCategory>

      <ProjectCategory title='Experiments'>
        <ProjectCard
          title='Dark Mode Engine'
          description='Seamless dark mode implementation for Next.js applications.'
          link='https://github.com/nraznatovic/dark-mode-engine'
          isExternal
        />
        <ProjectCard
          title='Canvas Playground'
          description='Interactive canvas experiments with WebGL and Three.js.'
          link='/projects/canvas-playground'
        />
      </ProjectCategory>
    </div>
  );
}

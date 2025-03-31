'use client';

import React, { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import { Button } from '@/components/ui/button';
import { Grid2X2, List } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectCategory } from './ProjectCategory';
import { ProjectCardProps, ViewMode } from './projects.types';
import { cn } from '@/lib/utils';

const viewModes: {
  icon: React.ReactNode;
  value: ViewMode;
}[] = [
  {
    icon: <List className='size-4' />,
    value: 'list',
  },
  {
    icon: <Grid2X2 className='size-4' />,
    value: 'grid',
  },
];

const projects = {
  development: [
    {
      title: 'TypeSafe API',
      description:
        'End-to-end type safety for REST APIs with minimal configuration.',
      link: '/projects/typesafe-api',
    },
    {
      title: 'State Manager',
      description:
        'Lightweight and reactive state management for React applications.',
      link: '/projects/state-manager',
    },
    {
      title: 'State Manager',
      description:
        'Lightweight and reactive state management for React applications.',
      link: '/projects/state-manager',
    },
  ],
  designSystems: [
    {
      title: 'Component Library',
      description:
        'Reusable UI components focused on accessibility and performance.',
      link: '/projects/component-library',
    },
    {
      title: 'Design Tokens',
      description:
        'Framework-agnostic design tokens with automated implementation.',
      link: 'https://github.com/nraznatovic/design-tokens',
      isExternal: true,
    },
  ],
  experiments: [
    {
      title: 'Dark Mode Engine',
      description:
        'Seamless dark mode implementation for Next.js applications.',
      link: 'https://github.com/nraznatovic/dark-mode-engine',
      isExternal: true,
    },
    {
      title: 'Canvas Playground',
      description: 'Interactive canvas experiments with WebGL and Three.js.',
      link: '/projects/canvas-playground',
    },
  ],
};

export default function ProjectShowcase() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const renderProjects = (projectList: ProjectCardProps[]) => {
    if (viewMode === 'list') {
      return projectList.map((project, i) => (
        <SwiperSlide key={`${project.title}-${i}`}>
          <ProjectCard {...project} />
        </SwiperSlide>
      ));
    }

    return projectList.map((project, i) => (
      <ProjectCard key={`${project.title}-${i}`} {...project} />
    ));
  };

  return (
    <div className='slide-enter-content my-12'>
      <div className='mb-6 flex justify-end gap-1'>
        {viewModes.map((mode) => (
          <Button
            key={mode.value}
            variant='ghost'
            size='sm'
            onClick={() => setViewMode(mode.value)}
            className={cn(mode.value === viewMode && '!bg-accent/20')}
          >
            {mode.icon}
          </Button>
        ))}
      </div>

      <ProjectCategory title='Development' viewMode={viewMode}>
        {renderProjects(projects.development)}
      </ProjectCategory>

      <ProjectCategory title='Design Systems' viewMode={viewMode}>
        {renderProjects(projects.designSystems)}
      </ProjectCategory>

      <ProjectCategory title='Experiments' viewMode={viewMode}>
        {renderProjects(projects.experiments)}
      </ProjectCategory>
    </div>
  );
}

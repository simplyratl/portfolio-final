'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Grid2X2, List } from 'lucide-react';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import { SwiperSlide } from 'swiper/react';
import { ProjectCard } from './ProjectCard';
import { ProjectCategory } from './ProjectCategory';
import { ProjectCardProps, ViewMode } from './projects.types';
import { projects } from '@/constants/projects';

const viewModes: {
  icon: React.ReactNode;
  value: ViewMode;
}[] = [
  {
    icon: <Grid2X2 className='size-4' />,
    value: 'grid',
  },
  {
    icon: <List className='size-4' />,
    value: 'list',
  },
];

export default function ProjectShowcase() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const renderProjects = (projectList: ProjectCardProps[]) => {
    if (projectList.length === 0) {
      return <p className='text-muted'>No projects added yet</p>;
    }

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

      <ProjectCategory title='Work' viewMode={viewMode}>
        {renderProjects(projects.workProjects)}
      </ProjectCategory>

      <ProjectCategory title='Freelancing' viewMode={viewMode}>
        {renderProjects(projects.clientProjects)}
      </ProjectCategory>

      <ProjectCategory title='Experiments' viewMode={viewMode}>
        {renderProjects(projects.experiments)}
      </ProjectCategory>
    </div>
  );
}

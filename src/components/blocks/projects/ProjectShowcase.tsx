'use client';

import React, { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import { Button } from '@/components/ui/button';
import {
  BedDouble,
  Building,
  Calculator,
  Clock,
  Database,
  FileText,
  GraduationCap,
  Grid2X2,
  Home,
  List,
  Map,
  Palette,
  Shield,
  Truck,
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectCategory } from './ProjectCategory';
import { ProjectCardProps, ViewMode } from './projects.types';
import { cn } from '@/lib/utils';

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

const projects = {
  workProjects: [
    {
      title: 'Cybersecurity Blog Platform',
      titleAlternative: 'CIRT Blog',
      description:
        'Government cybersecurity blog for national computer incident response team.',
      icon: <Shield />,
    },
    {
      title: 'Secure Cash Logistics System',
      titleAlternative: 'Cash-in-Transit System',
      description: 'Internal banking app for secure cash logistics management.',
      icon: <Truck />,
    },
    {
      title: 'Property Management System',
      titleAlternative: 'Real Estate Management System (REMS)',
      description: 'Freelance project for property listings and management.',
      icon: <Home />,
    },
    {
      title: 'Banking Loan Evaluation System',
      titleAlternative: 'Mortgage Assessment System',
      description:
        'Banking system for mortgage loan assessments and re-evaluations.',
      icon: <Calculator />,
    },
    {
      title: 'Legal Document Management System',
      titleAlternative: 'Court Document Digital Storage',
      description:
        'Complete digitalization of a national court system, including document storage.',
      icon: <FileText />,
    },
    {
      title: 'Utility Company Digital Archive',
      titleAlternative: 'Digital Archive',
      description:
        'Digitalization and archival management system for a utility provider.',
      icon: <Database />,
    },
    {
      title: 'Workforce Attendance Tracker',
      titleAlternative: 'Check-in/Check-out System',
      description:
        'Application for tracking employee check-ins and check-outs.',
      icon: <Clock />,
    },
    {
      title: 'Public Sector Design System',
      titleAlternative: 'Government Design System',
      description:
        'Adaptation of the existing government design system for public administration projects.',
      icon: <Palette />,
    },
  ],
  clientProjects: [
    {
      title: 'Luxury Real Estate Website',
      titleAlternative: 'Dukley Website',
      description:
        'Contributed to specific sections of a luxury real estate website.',
      icon: <Building />,
    },
    {
      title: 'Education Center Website',
      titleAlternative: 'Dukley Academy',
      description: 'Worked on several sections of an education center website.',
      icon: <GraduationCap />,
    },
    {
      title: 'Tourism & Real Estate Website',
      titleAlternative: 'Dukley Tivat',
      description:
        'Implemented some sections of a tourism and real estate website.',
      icon: <Building />,
    },
    {
      title: 'Hospitality Websites',
      titleAlternative: 'Hotel Websites',
      description:
        'Contributed to multiple hotel websites, working on specific sections.',
      icon: <BedDouble />,
    },
    {
      title: 'Golf App Showcase Site',
      titleAlternative: 'Showcase Site for Golf App',
      description: 'Developed interactive sliders used across the homepage.',
      icon: <Map />,
    },
  ],
  experiments: [],
};

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

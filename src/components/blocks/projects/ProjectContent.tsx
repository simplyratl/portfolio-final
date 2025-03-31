import React from 'react';
import ArrowRightUpIcon from '@/icons/ArrowRightUpIcon';
import { ProjectContentProps } from './projects.types';
import { cn } from '@/lib/utils';

export const ProjectContent = ({
  title,
  description,
  isExternal,
  link,
  icon,
}: ProjectContentProps) => (
  <div className='h-full'>
    <h3 className={cn('text-md flex items-center font-medium', link && 'link')}>
      <span className='text-muted mr-2 [&_svg]:size-4'>{icon}</span>
      {title}
      {isExternal && <ArrowRightUpIcon className='text-muted ml-1 size-4' />}
    </h3>
    <p className='text-muted mt-2'>{description}</p>
  </div>
);

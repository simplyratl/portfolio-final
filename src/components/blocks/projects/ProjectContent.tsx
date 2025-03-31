import React from 'react';
import ArrowRightUpIcon from '@/icons/ArrowRightUpIcon';
import { ProjectContentProps } from './projects.types';

export const ProjectContent = ({
  title,
  description,
  isExternal,
}: ProjectContentProps) => (
  <div className='h-full'>
    <h3 className='text-md link flex items-center font-medium'>
      {title}
      {isExternal && <ArrowRightUpIcon className='text-muted ml-1 size-4' />}
    </h3>
    <p className='text-muted mt-2'>{description}</p>
  </div>
);

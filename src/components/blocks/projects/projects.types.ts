import { JSX } from 'react';

export type Project = {
  title: string;
  description: string;
  link?: string;
  isExternal?: boolean;
  icon?: JSX.Element;
};

export type ProjectCardProps = Project;

export type ProjectCategoryProps = {
  title: string;
  children: React.ReactNode;
  viewMode: 'grid' | 'list';
};

export type ProjectContentProps = ProjectCardProps;

export type ViewMode = 'grid' | 'list';

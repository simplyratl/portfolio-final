export type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  isExternal?: boolean;
};

export type ProjectCategoryProps = {
  title: string;
  children: React.ReactNode;
  viewMode: 'grid' | 'list';
};

export type ProjectContentProps = Omit<ProjectCardProps, 'link'>;

export type ViewMode = 'grid' | 'list';

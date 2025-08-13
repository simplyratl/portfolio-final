import {
  BedDouble,
  Building,
  Calculator,
  Clock,
  FileText,
  GraduationCap,
  Home,
  Map,
  Palette,
  Shield,
  Truck,
} from 'lucide-react';

export const projects = [
  {
    title: 'Cybersecurity Blog Platform',
    titleAlternative: 'CIRT Blog',
    description:
      'Government cybersecurity blog for national computer incident response team.',
    category: 'Government & Public Sector',
    role: 'Full-stack Developer',
    technologies: ['React', 'Node.js', 'Security'],
    icon: <Shield className='h-4 w-4' />,
  },
  {
    title: 'Banking Cash Logistics System',
    titleAlternative: 'Cash-in-Transit System',
    description: 'Internal banking app for secure cash logistics management.',
    category: 'Banking & Finance',
    role: 'Frontend Developer',
    technologies: ['React', 'TypeScript', 'Banking APIs'],
    icon: <Truck className='h-4 w-4' />,
  },
  {
    title: 'Property Management System',
    titleAlternative: 'Real Estate Management System (REMS)',
    description: 'Freelance project for property listings and management.',
    category: 'Real Estate & Hospitality',
    role: 'Full-stack Developer',
    technologies: ['Next.js', 'Database Design', 'API Development'],
    icon: <Home className='h-4 w-4' />,
  },
  {
    title: 'Banking Loan Evaluation System',
    titleAlternative: 'Mortgage Assessment System',
    description:
      'Banking system for mortgage loan assessments and re-evaluations.',
    category: 'Banking & Finance',
    role: 'Frontend Developer',
    technologies: ['React', 'Complex Forms', 'Data Visualization'],
    icon: <Calculator className='h-4 w-4' />,
  },
  {
    title: 'Legal Document Management System',
    titleAlternative: 'Court Document Digital Storage',
    description:
      'Complete digitalization of a national court system, including document storage.',
    category: 'Government & Public Sector',
    role: 'Full-stack Developer',
    technologies: ['Document Management', 'Large Scale Systems', 'Security'],
    icon: <FileText className='h-4 w-4' />,
  },
  {
    title: 'Workforce Attendance Tracker',
    titleAlternative: 'Check-in/Check-out System',
    description: 'Application for tracking employee check-ins and check-outs.',
    category: 'Enterprise Applications',
    role: 'Full-stack Developer',
    technologies: ['Time Tracking', 'Employee Management', 'Analytics'],
    icon: <Clock className='h-4 w-4' />,
  },
  {
    title: 'Public Sector Design System',
    titleAlternative: 'Government Design System',
    description:
      'Adaptation of the existing government design system for public administration projects.',
    category: 'Government & Public Sector',
    role: 'Frontend Developer & Designer',
    technologies: ['Design Systems', 'Component Libraries', 'Accessibility'],
    icon: <Palette className='h-4 w-4' />,
  },
  {
    title: 'Luxury Real Estate Website',
    titleAlternative: 'Dukley Website',
    description:
      'Contributed to specific sections of a luxury real estate website.',
    category: 'Real Estate & Hospitality',
    role: 'Frontend Developer',
    technologies: ['React', 'Premium UI/UX', 'Performance Optimization'],
    icon: <Building className='h-4 w-4' />,
  },
  {
    title: 'Education Center Website',
    titleAlternative: 'Dukley Academy',
    description: 'Worked on several sections of an education center website.',
    category: 'Web Development',
    role: 'Frontend Developer',
    technologies: [
      'Educational Platforms',
      'Content Management',
      'Responsive Design',
    ],
    icon: <GraduationCap className='h-4 w-4' />,
  },
  {
    title: 'Tourism & Real Estate Website',
    titleAlternative: 'Dukley Tivat',
    description:
      'Implemented some sections of a tourism and real estate website.',
    category: 'Real Estate & Hospitality',
    role: 'Frontend Developer',
    technologies: ['Tourism Platforms', 'Interactive Maps', 'Booking Systems'],
    icon: <Building className='h-4 w-4' />,
  },
  {
    title: 'Hospitality Apps',
    titleAlternative: 'Hotel Websites',
    description:
      'Contributed to multiple hotel websites, working on specific sections.',
    category: 'Real Estate & Hospitality',
    role: 'Frontend Developer',
    technologies: [
      'Hotel Management',
      'Booking Systems',
      'Customer Experience',
    ],
    icon: <BedDouble className='h-4 w-4' />,
  },
  {
    title: 'Golf App Showcase Site',
    titleAlternative: 'Showcase Site for Golf App',
    description:
      'Developed interactive sliders and other components used across the homepage.',
    category: 'Web Development',
    role: 'Frontend Developer',
    technologies: [
      'Interactive Components',
      'Animation',
      'Mobile Apps Showcase',
    ],
    icon: <Map className='h-4 w-4' />,
  },
];

export const skillCategories = {
  'Frontend Development': [
    'React',
    'Next.js',
    'TypeScript',
    'Responsive Design',
    'Component Libraries',
  ],
  'Backend Development': [
    'Node.js',
    'API Development',
    'Database Design',
    'Security',
  ],
  'Specialized Systems': [
    'Banking Systems',
    'Government Platforms',
    'Document Management',
    'Real Estate Platforms',
  ],
  'UI/UX & Design': [
    'Design Systems',
    'Premium UI/UX',
    'Accessibility',
    'Animation',
  ],
};

import {
  BedDouble,
  Building,
  Calculator,
  Clock,
  Database,
  FileText,
  GraduationCap,
  Home,
  Map,
  Palette,
  Shield,
  Truck,
} from 'lucide-react';

export const projects = {
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

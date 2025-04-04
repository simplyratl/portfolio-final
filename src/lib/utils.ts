import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadTime = (content: string) => {
  const AVERAGE_READING_SPEED = 250; // words per minute
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / AVERAGE_READING_SPEED);
  return `${minutes} min read`;
};

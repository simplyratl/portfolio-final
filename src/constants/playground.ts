import BoundlessCrafting from '@/assets/images/boundless-crafting.png';
import AISpotify from '@/assets/images/ai-spotify.png';
import { StaticImageData } from 'next/image';

export type Playground = {
  title: string;
  description: string;
  location: string;
  image: string | StaticImageData;
  video?: string;
  tags?: string[];
};

export const playground: Playground[] = [
  {
    title: 'Boundless Crafting',
    description: 'A game where you can craft anything you want.',
    location: 'https://crafting.nikicaraznatovic.me/',
    image: BoundlessCrafting,
    video:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4',
    tags: ['Game', 'React', 'Canvas', 'AI'],
  },
  // {
  //   title: 'Spotify AI Playlists',
  //   description: 'App that generates playlists based on your mood.',
  //   location: 'https://playlists.nikicaraznatovic.me/',
  //   image: AISpotify,
  //   video:
  //     'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4',
  //   tags: ['AI', 'Spotify', 'Next.js'],
  // },
];

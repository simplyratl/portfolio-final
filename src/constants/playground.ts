export type Playground = {
  title: string;
  description: string;
  location: string;
  image: string;
  video?: string;
};

export const playground: Playground[] = [
  {
    title: 'Boundless Crafting',
    description: 'A game where you can craft anything you want.',
    location: 'https://boundless-crafting.nikicaraznatovic.me/',
    image:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/Boundless+Crafting.png',
    video:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4',
  },
  {
    title: 'Spotify AI Playlists',
    description: 'App that generates playlists based on your mood.',
    location: 'https://playlists.nikicaraznatovic.me/',
    image:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/Boundless+Crafting.png',
    video:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4',
  },
];

export type Playground = {
  title: string;
  description: string;
  location: string;
  image: string;
  video?: string;
  tags?: string[];
};

export const playground: Playground[] = [
  {
    title: 'Boundless Crafting',
    description: 'A game where you can craft anything you want.',
    location: 'https://boundless-crafting.nikicaraznatovic.me/',
    image:
      'https://wallpapers.com/images/hd/neon-astronaut-illustration-dlu9524yzqjb9zjd.jpg',
    video:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4',
    tags: ['Game', 'React', 'Canvas'],
  },
  {
    title: 'Spotify AI Playlists',
    description: 'App that generates playlists based on your mood.',
    location: 'https://playlists.nikicaraznatovic.me/',
    image:
      'https://cdn.myportfolio.com/c7c6d7d1-ef89-4c57-93ed-c935d1aa323f/75fd29d6-8cce-4c8e-b453-62cf2921d218_rw_1920.png?h=30ecb6c4bb090c2f15b08066fb95173c',
    video:
      'https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4',
    tags: ['AI', 'Spotify', 'Next.js'],
  },
];

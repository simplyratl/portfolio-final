import Image from 'next/image';

type Props = {
  imagePath: string;
};

export function BackgroundGradient({ imagePath }: Props) {
  return (
    <div className='absolute inset-0 z-[-5] h-[840px] overflow-hidden'>
      <div>
        <Image
          fill
          src={imagePath}
          alt='Nikica Ražnatović'
          className='opacity-50 blur-2xl dark:opacity-30'
        />
      </div>
      <div className='absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_90%)]' />
      <div className='to-background absolute inset-0 h-full w-full bg-gradient-to-b from-transparent' />
    </div>
  );
}

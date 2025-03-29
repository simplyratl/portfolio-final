import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  className?: string;
};
export default function MarkdownImage({ src, className }: Props) {
  return (
    <div
      className={cn(
        'relative h-100 w-full overflow-hidden rounded-lg',
        className
      )}
    >
      <Image src={src} alt='Image' fill className='!m-0 object-cover' />
    </div>
  );
}

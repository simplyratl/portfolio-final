import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

type Props = {
  progress: number;
  size?: number;
  width?: number;
  isPaused: boolean;
  togglePaused: () => void;
  background?: boolean;
};

const CircularProgress = ({
  progress,
  size = 40,
  width = 3,
  isPaused,
  background = false,
  togglePaused,
}: Props) => {
  const mobileSize = size * 0.8; // 20% smaller on mobile
  const mobileWidth = width * 0.8; // 20% smaller stroke width on mobile

  const responsiveWidth = mobileWidth;

  const center = mobileSize / 2;
  const radius = center - responsiveWidth;
  const dashArray = radius * 2 * Math.PI;
  const dashOffset = dashArray * (1 - progress);

  // Listen for custom events from VideoProgressBar
  useEffect(() => {
    const handleProgressUpdate = (e: CustomEvent) => {
      // This will be handled by the parent component which controls the progress prop
    };

    document.addEventListener(
      'videoProgressUpdate',
      handleProgressUpdate as any
    );

    return () => {
      document.removeEventListener(
        'videoProgressUpdate',
        handleProgressUpdate as any
      );
    };
  }, []);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center p-1',
        background && 'bg-background/50 rounded-full saturate-200 backdrop-blur'
      )}
    >
      <svg
        width={mobileSize}
        height={mobileSize}
        viewBox={`0 0 ${mobileSize} ${mobileSize}`}
        className='-rotate-90 sm:h-[40px] sm:w-[40px]'
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          className='stroke-muted/20'
          strokeWidth={responsiveWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          strokeWidth={responsiveWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap='round'
          className='stroke-primary'
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <button
          onClick={togglePaused}
          className='flex h-full w-full items-center justify-center'
        >
          {!isPaused ? (
            <Play className='size-3 sm:size-4' />
          ) : (
            <Pause className='size-3 sm:size-4' />
          )}
        </button>
      </div>
    </div>
  );
};

export default CircularProgress;

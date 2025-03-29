'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';

interface VideoProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  duration: number;
  className?: string;
  isPlaying: boolean;
  togglePlaying: () => void;
}

function VideoProgressBar({
  videoRef,
  duration,
  className,
  isPlaying,
  togglePlaying,
}: VideoProgressBarProps) {
  const [progress, setProgress] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const videoElement = videoRef.current;

    const updateProgress = () => {
      if (videoElement) {
        const newProgress =
          (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(newProgress);

        // This will help update the CircularProgress component
        const event = new CustomEvent('videoProgressUpdate', {
          detail: { progress: newProgress / 100 },
        });
        document.dispatchEvent(event);
      }
    };

    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [videoRef]);

  const handleProgressBarClick = (e: React.MouseEvent) => {
    if (!progressBarRef.current || !videoRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;

    if (videoRef.current.duration) {
      videoRef.current.currentTime = position * videoRef.current.duration;

      // Manually update progress and dispatch event for immediate feedback
      const newProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(newProgress);

      const event = new CustomEvent('videoProgressUpdate', {
        detail: { progress: position },
      });
      document.dispatchEvent(event);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressBarClick(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleProgressBarClick(e);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp as any);
      document.addEventListener('mousemove', handleMouseMove as any);
    } else {
      document.removeEventListener('mouseup', handleMouseUp as any);
      document.removeEventListener('mousemove', handleMouseMove as any);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp as any);
      document.removeEventListener('mousemove', handleMouseMove as any);
    };
  }, [isDragging]);

  return (
    <div className={cn('flex h-2 items-center gap-3', className)}>
      <button
        onClick={togglePlaying}
        className='flex shrink-0 items-center justify-center rounded-lg bg-transparent p-1 hover:bg-white/20'
      >
        {isPlaying ? <Pause className='size-4' /> : <Play className='size-4' />}
      </button>

      <div
        className='h-1.5 w-full cursor-pointer rounded-full bg-zinc-300/50'
        onClick={handleProgressBarClick}
        onMouseDown={handleMouseDown}
        ref={progressBarRef}
      >
        <div className='relative h-full'>
          <div
            className='h-full rounded-full bg-white transition-all'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoProgressBar;

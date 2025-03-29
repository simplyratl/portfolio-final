'use client';
import * as React from 'react';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { useEffect } from 'react';
import CircularProgress from '@/components/shared/CircularProgress';
import { cn } from '@/lib/utils';
import VideoProgressBar from './VideoProgressBar';
import { motion } from 'motion/react';

interface BlogVideoProps {
  src: string;
  className?: string;
}

function MarkdownVideo({ src, className }: BlogVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = React.useState<number>(5000); // Default duration
  const [isHovering, setIsHovering] = React.useState(false);
  const [localProgress, setLocalProgress] = React.useState(0);

  const {
    progress,
    isPlaying,
    togglePlaying,
    setProgress: setProgressHook,
  } = useVideoProgress({
    duration,
    initialPlayState: true,
    resetOnPause: false,
  });

  React.useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      if (videoElement) {
        setDuration(videoElement.duration * 1000);
      }
    };

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      if (videoElement.duration) {
        setDuration(videoElement.duration * 1000);
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      }
    };
  }, []);

  React.useEffect(() => {
    const handleProgressUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLocalProgress(customEvent.detail.progress);
      setProgressHook(customEvent.detail.progress);
    };

    document.addEventListener('videoProgressUpdate', handleProgressUpdate);

    return () => {
      document.removeEventListener('videoProgressUpdate', handleProgressUpdate);
    };
  }, [setProgressHook]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    togglePlaying();
  };

  return (
    <div
      className='relative h-full w-full overflow-hidden rounded-xl'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        autoPlay={isPlaying}
        loop
        muted
        playsInline
        className={cn('!m-0 w-full cursor-pointer', className)}
        onClick={handleVideoClick}
      >
        <source src={src} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <motion.div
        initial={{ opacity: 0, y: 20, scaleX: 0.96 }}
        animate={{
          opacity: isHovering ? 1 : 0,
          y: isHovering ? 0 : 20,
          scaleX: isHovering ? 1 : 0.96,
        }}
        transition={{ duration: 0.16 }}
        className={cn(
          'bg-background/70 absolute right-3 bottom-3 left-3 rounded-full px-4 pt-4 pb-2 saturate-200 backdrop-blur-sm'
        )}
      >
        <VideoProgressBar
          videoRef={videoRef}
          duration={duration}
          togglePlaying={togglePlaying}
          isPlaying={isPlaying}
          className='mb-2'
        />
      </motion.div>

      <motion.div
        className='absolute bottom-2 left-3'
        animate={{
          scale: !isHovering ? 1 : 0.8,
          opacity: !isHovering ? 1 : 0,
          y: 0,
          x: !isHovering ? 0 : 4,
        }}
        transition={{ duration: 0.16 }}
      >
        <CircularProgress
          progress={localProgress || progress}
          isPaused={!isPlaying}
          togglePaused={togglePlaying}
          background
        />
      </motion.div>
    </div>
  );
}

export default MarkdownVideo;

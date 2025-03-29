'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAnimationProgressProps {
  duration?: number;
  initialPlayState?: boolean;
  resetOnPause?: boolean;
}

interface UseAnimationProgressReturn {
  progress: number;
  isPlaying: boolean;
  togglePlaying: () => void;
  setIsPlaying: (value: boolean) => void;
  setProgress: (value: number) => void; // Add this to expose progress control
}

export const useVideoProgress = ({
  duration = 5000,
  initialPlayState = true,
  resetOnPause = true,
}: UseAnimationProgressProps = {}): UseAnimationProgressReturn => {
  const [isPlaying, setIsPlaying] = useState(initialPlayState);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | undefined>();
  const startTimeRef = useRef<number | undefined>();
  const pausedProgressRef = useRef<number>(0);

  const togglePlaying = useCallback(() => {
    setIsPlaying((prev) => {
      const newVal = !prev;
      sessionStorage.setItem('shouldPlayPreviews', JSON.stringify(newVal));

      if (resetOnPause && !newVal) {
        setProgress(0);
        pausedProgressRef.current = 0;
      } else if (!newVal) {
        pausedProgressRef.current = progress;
      }

      return newVal;
    });
  }, [resetOnPause, progress]);

  // Add setProgressManually to handle external progress updates (e.g., from seeking)
  const setProgressManually = useCallback(
    (value: number) => {
      setProgress(value);
      pausedProgressRef.current = value;

      // When manually setting progress, we need to adjust the start time
      if (isPlaying) {
        startTimeRef.current = performance.now() - value * duration;
      }
    },
    [duration, isPlaying]
  );

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        // When starting/resuming, adjust the start time based on stored progress
        startTimeRef.current = timestamp - pausedProgressRef.current * duration;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / duration, 1);

      setProgress(newProgress);

      if (newProgress < 1 && isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (newProgress >= 1) {
        setProgress(0);
        pausedProgressRef.current = 0;
        startTimeRef.current = undefined;
        animationRef.current = requestAnimationFrame(animate);
      }
    },
    [isPlaying, duration]
  );

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  return {
    progress,
    isPlaying,
    togglePlaying,
    setIsPlaying,
    setProgress: setProgressManually, // Expose the function to set progress manually
  };
};

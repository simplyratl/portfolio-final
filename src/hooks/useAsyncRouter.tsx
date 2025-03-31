'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

// Define the type for the observer callback function
type ObserverCallback = () => void;

const createRouteObserver = () => {
  let observer: ObserverCallback | null = null;

  const setObserver = (callback: ObserverCallback) => {
    observer = callback;
  };

  const notify = () => {
    if (observer) {
      observer();
    }
  };

  return { setObserver, notify };
};

const routeObserver = createRouteObserver();

export const useAsyncRoute = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const asyncPush = async (path: string) => {
    return new Promise<void>((resolve) => {
      startTransition(() => {
        router.push(path);
      });

      routeObserver.setObserver(() => {
        resolve();
      });
    });
  };

  useEffect(() => {
    if (!isPending) {
      routeObserver.notify();
    }
  }, [isPending]);

  return {
    push: asyncPush,
  };
};

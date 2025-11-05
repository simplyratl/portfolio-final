'use client';

import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export interface TurnstileRef {
  reset: () => void;
}

const TurnstileComponent = forwardRef<TurnstileRef, TurnstileComponentProps>(
  ({ onVerify, onError, onExpire }, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
    const isDev = process.env.NODE_ENV === 'development';
    const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

    // Check if it's a test key or invalid key
    const isTestKey =
      siteKey === '0x4AAAAAABruqZFL2YL5mOaM' ||
      siteKey === '1x00000000000000000000AA' ||
      siteKey === '2x00000000000000000000AB' ||
      siteKey === '3x00000000000000000000FF';

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (turnstileRef.current) {
          turnstileRef.current.reset();
        }
      },
    }));

    // In development mode without site key or with test key, simulate success
    useEffect(() => {
      if (!siteKey || (isDev && isTestKey)) {
        if (isDev) {
          console.warn(
            !siteKey
              ? 'Cloudflare Turnstile site key not configured - using dev mode'
              : 'Using test Turnstile key - simulating success in dev mode'
          );
          // Simulate a successful verification after a short delay
          const timer = setTimeout(() => {
            onVerify('dev-mode-token');
          }, 100);
          return () => clearTimeout(timer);
        } else {
          console.error('Cloudflare Turnstile site key not configured');
          if (onError) onError();
        }
      }
    }, [siteKey, isDev, isTestKey, onVerify, onError]);

    // Don't render Turnstile in dev mode without proper key
    if (!siteKey || (isDev && isTestKey)) {
      return null;
    }

    return (
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: 'auto',
          size: 'invisible',
        }}
      />
    );
  }
);

TurnstileComponent.displayName = 'TurnstileComponent';

export default TurnstileComponent;

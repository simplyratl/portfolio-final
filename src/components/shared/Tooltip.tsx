'use client';

import React, { JSX } from 'react';
import * as TooltipRadix from '@radix-ui/react-tooltip';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: JSX.Element;
  delayDuration?: number;
  className?: string;
};

export default function AppTooltip({
  text,
  position = 'bottom',
  children,
  delayDuration = 0,
  className,
}: Props) {
  const animationDistance = 8;
  const isVertical = position === 'top' || position === 'bottom';
  const isPositive = position === 'top' || position === 'left';

  const animationProps = {
    initial: {
      opacity: 0,
      scale: 0.9,
      [isVertical ? 'y' : 'x']: isPositive
        ? animationDistance
        : -animationDistance,
    },
    animate: {
      opacity: 1,
      scale: 1,
      [isVertical ? 'y' : 'x']: 0,
    },
  };

  return (
    <TooltipRadix.Provider delayDuration={delayDuration}>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className={cn(
              'bg-foreground text-background rounded-lg px-2 py-1 text-sm',
              className
            )}
            sideOffset={5}
            side={position}
            asChild
          >
            <motion.div
              initial={animationProps.initial}
              animate={animationProps.animate}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {text}
            </motion.div>
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}

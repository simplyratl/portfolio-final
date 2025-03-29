'use client';

import React, { JSX } from 'react';
import * as TooltipRadix from '@radix-ui/react-tooltip';
import { motion } from 'motion/react';

type Props = {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: JSX.Element;
  delayDuration?: number;
};

export default function AppTooltip({
  text,
  position = 'bottom',
  children,
  delayDuration = 0,
}: Props) {
  return (
    <TooltipRadix.Provider delayDuration={delayDuration}>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className='bg-foreground text-background rounded-lg px-2 py-1 text-sm'
            sideOffset={5}
            side={position}
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {text}
            </motion.div>
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}

'use client';

import { JSX, useEffect, useState } from 'react';
import { motion, useAnimate } from 'motion/react';
import AppTooltip from '@/components/shared/Tooltip';
import ArrowUpRightIcon from '@/components/icons/ArrowUpIcon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  social: {
    name: string;
    url: string;
    icon: JSX.Element;
  };
  className?: string;
};

export default function SocialButton({ social, className }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  const handleOnHover = async () => {
    animate(
      '#social-button-hover',
      {
        opacity: 1,
        scale: 1,
      },
      {
        delay: 0.08,
      }
    );

    await animate(
      '#social-button-hover svg',
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0.1,
      }
    );
  };

  const handleOnLeave = async () => {
    await animate(
      '#social-button-hover',
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        duration: 0.08,
        ease: 'easeOut',
      }
    );

    animate('#social-button-hover svg', {
      x: -20,
      y: 20,
    });
  };

  useEffect(() => {
    if (!scope.current) return;

    if (isHovered) {
      handleOnHover();
    } else {
      handleOnLeave();
    }
  }, [isHovered]);

  return (
    <AppTooltip text={social.name} delayDuration={200} position='top'>
      <Button
        className={cn('group relative size-8 hover:!bg-transparent', className)}
        size='icon'
        variant='ghost'
        ref={scope}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${social.name} profile`}
        >
          <div className='[&_svg]:!size-5'>{social.icon}</div>
        </a>

        <motion.a
          id='social-button-hover'
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          initial={{ opacity: 0, scale: 0.5 }}
          className='bg-primary absolute inset-0 overflow-hidden rounded-lg p-2'
        >
          <ArrowUpRightIcon className='text-primary-foreground size-4' />
        </motion.a>
      </Button>
    </AppTooltip>
  );
}

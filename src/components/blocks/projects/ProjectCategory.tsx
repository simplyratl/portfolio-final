'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperRef } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCategoryProps } from './projects.types';
import { AnimatePresence, motion } from 'motion/react';

export const ProjectCategory = ({
  title,
  children,
  viewMode,
}: ProjectCategoryProps) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const swiperRef = useRef<SwiperRef | null>(null);

  // Check if navigation should be shown based on slide count
  const updateNavigationVisibility = () => {
    if (swiperRef.current && swiperRef.current.swiper.params.slidesPerView) {
      const swiper = swiperRef.current.swiper;
      // Show navigation only if there are more slides than visible slides
      setShowNavigation(
        swiper.slides.length > Number(swiper.params.slidesPerView)
      );
    }
  };

  return (
    <div className='mb-12'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-muted'>{title}</h2>

        <AnimatePresence>
          {viewMode === 'list' && showNavigation && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut',
                },
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, delay: 0.5 },
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className='flex gap-2'
            >
              <Button
                ref={navigationPrevRef}
                size='icon'
                className='size-6'
                variant='ghost'
              >
                <ArrowLeft />
              </Button>
              <Button
                ref={navigationNextRef}
                size='icon'
                className='size-6'
                variant='ghost'
              >
                <ArrowRight />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode='wait'>
        {viewMode === 'grid' ? (
          <motion.div
            key='grid'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-1 gap-6 md:grid-cols-2'
          >
            {React.Children.map(children, (child) => (
              <div>{child}</div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key='list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Mousewheel]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
                disabledClass: 'opacity-30 cursor-not-allowed',
              }}
              onBeforeInit={(swiper) => {
                // @ts-expect-error - Swiper types issue
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                // @ts-expect-error - Swiper types issue
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              onInit={updateNavigationVisibility}
              onBreakpoint={updateNavigationVisibility}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                thresholdDelta: 0.2,
              }}
              simulateTouch={true}
              resistance={true}
              resistanceRatio={0.85}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              className='w-full'
            >
              {children}
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

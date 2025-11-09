'use client';

import { useState, useEffect } from 'react';
import { Type, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FONT_OPTIONS = [
  { value: 'sans', label: 'Sans Serif', fontFamily: 'var(--font-sans)' },
  { value: 'serif', label: 'Serif', fontFamily: 'ui-serif, Georgia, serif' },
  { value: 'mono', label: 'Mono', fontFamily: 'ui-monospace, monospace' },
] as const;

const FONT_SIZES = [
  { value: 'small', label: 'S', fontSize: '0.875rem', lineHeight: '1.5rem' },
  { value: 'medium', label: 'M', fontSize: '1rem', lineHeight: '1.75rem' },
  { value: 'large', label: 'L', fontSize: '1.125rem', lineHeight: '1.875rem' },
  { value: 'xlarge', label: 'XL', fontSize: '1.25rem', lineHeight: '2rem' },
] as const;

const WIDTH_OPTIONS = [
  { value: 'narrow', label: 'Narrow', maxWidth: '600px' },
  { value: 'normal', label: 'Normal', maxWidth: '650px' },
  { value: 'full', label: 'Full', maxWidth: '900px' },
] as const;

type FontOption = (typeof FONT_OPTIONS)[number]['value'];
type FontSize = (typeof FONT_SIZES)[number]['value'];
type WidthOption = (typeof WIDTH_OPTIONS)[number]['value'];

export default function BlogReadingPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState<FontOption>('sans');
  const [selectedSize, setSelectedSize] = useState<FontSize>('medium');
  const [selectedWidth, setSelectedWidth] = useState<WidthOption>('normal');

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('blog-font') as FontOption;
    const savedSize = localStorage.getItem('blog-size') as FontSize;
    const savedWidth = localStorage.getItem('blog-width') as WidthOption;

    if (savedFont) setSelectedFont(savedFont);
    if (savedSize) setSelectedSize(savedSize);
    if (savedWidth) setSelectedWidth(savedWidth);
  }, []);

  // Apply preferences to article
  useEffect(() => {
    const article = document.querySelector('.blog-content') as HTMLElement;
    if (!article) return;

    // Apply font family
    const selectedFontOption = FONT_OPTIONS.find(
      (f) => f.value === selectedFont
    );
    if (selectedFontOption) {
      article.style.setProperty(
        'font-family',
        selectedFontOption.fontFamily,
        'important'
      );
    }

    // Apply font size to all text elements
    const selectedSizeOption = FONT_SIZES.find((s) => s.value === selectedSize);
    if (selectedSizeOption) {
      article.style.setProperty(
        'font-size',
        selectedSizeOption.fontSize,
        'important'
      );
      article.style.setProperty(
        'line-height',
        selectedSizeOption.lineHeight,
        'important'
      );

      // Also apply to paragraphs and other text elements for better coverage
      const textElements = article.querySelectorAll(
        'p, li, span, a, code:not(pre code)'
      );
      textElements.forEach((el) => {
        (el as HTMLElement).style.setProperty(
          'font-size',
          selectedSizeOption.fontSize,
          'important'
        );
        (el as HTMLElement).style.setProperty(
          'line-height',
          selectedSizeOption.lineHeight,
          'important'
        );
      });
    }

    // Apply width - target both main and article elements
    const articleElement = article.closest('article') as HTMLElement;
    const mainElement = article.closest('main') as HTMLElement;
    const selectedWidthOption = WIDTH_OPTIONS.find(
      (w) => w.value === selectedWidth
    );

    if (selectedWidthOption) {
      // Update the main container's max-width so it doesn't constrain the article
      if (mainElement) {
        mainElement.style.setProperty(
          'max-width',
          selectedWidthOption.maxWidth,
          'important'
        );
      }
      // Also set the article width for consistency
      if (articleElement) {
        articleElement.style.setProperty(
          'max-width',
          selectedWidthOption.maxWidth,
          'important'
        );
        articleElement.style.setProperty('margin-left', 'auto', 'important');
        articleElement.style.setProperty('margin-right', 'auto', 'important');
      }
    }

    // Save to localStorage
    localStorage.setItem('blog-font', selectedFont);
    localStorage.setItem('blog-size', selectedSize);
    localStorage.setItem('blog-width', selectedWidth);
  }, [selectedFont, selectedSize, selectedWidth]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2',
            'border-muted/20 bg-secondary/30 border',
            'hover:bg-secondary/50 hover:border-muted/40',
            'transition-all duration-200',
            'text-muted-foreground text-sm',
            'whitespace-nowrap',
            isOpen && 'bg-secondary/50 border-muted/40'
          )}
          aria-label='Reading preferences'
        >
          <Type className='h-4 w-4' />
          <span className='hidden sm:inline'>Reading</span>
          <ChevronDown
            className={cn(
              'h-3 w-3 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        className='max-h-[85vh] w-72 overflow-y-auto p-4'
      >
        {/* Font Family Section */}
        <div className='space-y-2'>
          <label className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
            Font Style
          </label>
          <div className='grid grid-cols-3 gap-2'>
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.value}
                onClick={() => setSelectedFont(font.value)}
                className={cn(
                  'rounded-lg px-2 py-2 text-xs transition-all duration-200',
                  'border-muted/20 border',
                  selectedFont === font.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary/30 hover:bg-secondary/50 hover:border-muted/40'
                )}
                style={{ fontFamily: font.fontFamily }}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className='border-muted/20 my-4 border-t' />

        {/* Font Size Section */}
        <div className='space-y-2'>
          <label className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
            Font Size
          </label>
          <div className='grid grid-cols-4 gap-2'>
            {FONT_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={cn(
                  'rounded-lg px-3 py-2 font-medium transition-all duration-200',
                  'border-muted/20 border',
                  selectedSize === size.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary/30 hover:bg-secondary/50 hover:border-muted/40'
                )}
                style={{ fontSize: size.fontSize }}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className='border-muted/20 my-4 border-t' />

        {/* Content Width Section */}
        <div className='space-y-2'>
          <label className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
            Content Width
          </label>
          <div className='grid grid-cols-3 gap-2'>
            {WIDTH_OPTIONS.map((width) => (
              <button
                key={width.value}
                onClick={() => setSelectedWidth(width.value)}
                className={cn(
                  'rounded-lg px-2 py-2 text-xs font-medium transition-all duration-200',
                  'border-muted/20 border',
                  selectedWidth === width.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary/30 hover:bg-secondary/50 hover:border-muted/40'
                )}
              >
                {width.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Text */}
        <div className='border-muted/20 mt-4 border-t pt-4'>
          <p
            className='text-muted-foreground transition-all duration-200'
            style={{
              fontFamily: FONT_OPTIONS.find((f) => f.value === selectedFont)
                ?.fontFamily,
              fontSize: FONT_SIZES.find((s) => s.value === selectedSize)
                ?.fontSize,
              lineHeight: FONT_SIZES.find((s) => s.value === selectedSize)
                ?.lineHeight,
            }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

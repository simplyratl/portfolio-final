'use client';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Check, Sparkle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

// Token generation utility
const tokenizeText = (text: string): string[] => {
  const tokens: string[] = [];
  const words = text.split(' ');

  words.forEach((word, index) => {
    // Handle punctuation separately
    const punctuationMatch = word.match(/^(.*?)([.!?,:;]+)$/);

    if (punctuationMatch) {
      const [, mainWord, punctuation] = punctuationMatch;
      if (mainWord) {
        // Split longer words into realistic tokens
        if (mainWord.length > 8) {
          // Split longer words into 2-3 parts
          const mid = Math.floor(mainWord.length / 2);
          tokens.push(mainWord.slice(0, mid));
          tokens.push(mainWord.slice(mid));
        } else {
          tokens.push(mainWord);
        }
      }
      tokens.push(punctuation);
    } else {
      // Split longer words into realistic tokens
      if (word.length > 8) {
        const mid = Math.floor(word.length / 2);
        tokens.push(word.slice(0, mid));
        tokens.push(word.slice(mid));
      } else {
        tokens.push(word);
      }
    }

    // Add space token (except for last word)
    if (index < words.length - 1) {
      tokens.push(' ');
    }
  });

  return tokens;
};

const STAGE_CONFIGS = {
  initial: {
    width: 320,
    height: 160,
  },
  loading: {
    width: 320,
    height: 180,
  },
  summary: {
    width: 380,
    height: 280,
  },
};

type Props = {
  aiSummary?: string;
};

export default function AiSummarize({ aiSummary }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<'initial' | 'loading' | 'summary'>(
    'initial'
  );
  const [summary, setSummary] = useState(aiSummary);
  const [tokens, setTokens] = useState<string[]>([]);
  const [visibleTokens, setVisibleTokens] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const streamTokens = async (tokenList: string[]) => {
    setVisibleTokens([]);
    setIsComplete(false);

    // Simulate initial processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStage('summary');

    // Wait for layout transition
    await new Promise((resolve) => setTimeout(resolve, 300));

    for (let i = 0; i < tokenList.length; i++) {
      setVisibleTokens((prev) => [...prev, tokenList[i]]);

      // Realistic token generation delays
      const token = tokenList[i];
      let delay = 100;

      if (token === ' ') {
        delay = 40;
      } else if (token.match(/[.!?]/)) {
        delay = 350;
      } else if (token.length > 6) {
        delay = 180;
      } else if (token.length > 3) {
        delay = 150;
      }

      // Add some randomness for realism
      delay += Math.random() * 60 - 30;

      await new Promise((resolve) => setTimeout(resolve, Math.max(60, delay)));
    }

    setIsComplete(true);
  };

  const generateSummary = async () => {
    setStage('loading');
    setSummary('');
    setVisibleTokens([]);

    if (!aiSummary) return;

    const tokenList = tokenizeText(summary as string);
    setSummary(summary);
    setTokens(tokenList);

    // Start streaming after loading phase
    setTimeout(() => {
      streamTokens(tokenList);
    }, 1500);
  };

  const reset = () => {
    setStage('initial');
    setSummary('');
    setTokens([]);
    setVisibleTokens([]);
    setIsComplete(false);
  };

  const currentConfig = STAGE_CONFIGS[stage];

  return (
    <div>
      <HoverCard openDelay={100} closeDelay={200}>
        <HoverCardTrigger asChild>
          <motion.div
            className='fixed right-4 bottom-4 z-50'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.5,
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className='h-12 w-12 rounded-full border-0 bg-black shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl'
              >
                <Sparkle size={18} className='text-white' />
              </Button>
            </motion.div>
          </motion.div>
        </HoverCardTrigger>

        <HoverCardContent
          className='h-full w-full'
          sideOffset={12}
          alignOffset={12}
          style={{ maxWidth: 400 }}
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: currentConfig.width,
              height: currentConfig.height,
            }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              opacity: { duration: 0.2 },
              layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            }}
            className='bg-popover overflow-hidden rounded-xl'
          >
            <motion.div
              layout='position'
              className='p-5'
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
            >
              <AnimatePresence mode='wait'>
                {stage === 'initial' && (
                  <motion.div
                    key='initial'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className='space-y-4'
                  >
                    <div className='space-y-1'>
                      <motion.h3
                        className='text-popover-foreground font-medium'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        AI Summary
                      </motion.h3>
                      <motion.p
                        className='text-muted-foreground text-sm leading-relaxed'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        Generate a concise summary of this content
                      </motion.p>
                    </div>

                    <motion.div
                      className='flex justify-end'
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: 'spring',
                        stiffness: 300,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <Button
                          onClick={generateSummary}
                          className='bg-primary hover:bg-primary/90 text-primary-foreground'
                          size='sm'
                        >
                          <motion.div
                            className='flex items-center gap-2'
                            whileHover={{ x: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            <Sparkle size={14} />
                            Generate
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {stage === 'loading' && (
                  <motion.div
                    key='loading'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    className='py-8'
                  >
                    <div className='flex flex-col items-center gap-4'>
                      <div className='relative'>
                        <motion.div
                          className='border-muted h-8 w-8 rounded-full border-2'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                        <motion.div
                          className='border-primary absolute inset-0 h-8 w-8 rounded-full border-2 border-t-transparent'
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </div>

                      <motion.div
                        className='space-y-1 text-center'
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.p
                          className='text-muted-foreground text-sm font-medium'
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          Analyzing...
                        </motion.p>
                        <p className='text-muted-foreground/60 text-xs'>
                          Analyzing content structure
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {stage === 'summary' && (
                  <motion.div
                    key='summary'
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    className='space-y-4'
                  >
                    <div className='flex items-start gap-2'>
                      <div className='flex-1'>
                        <motion.div
                          className='text-popover-foreground h-[180px] overflow-y-auto pr-2 text-sm leading-relaxed'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(0,0,0,0.2) transparent',
                          }}
                        >
                          {visibleTokens.map((token, index) => (
                            <motion.span
                              key={index}
                              initial={{
                                opacity: 0,
                                y: 4,
                                scale: 0.95,
                                filter: 'blur(2px)',
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: 'blur(0px)',
                              }}
                              transition={{
                                duration: 0.6,
                                ease: [0.23, 1, 0.32, 1],
                                opacity: { duration: 0.5 },
                                scale: { duration: 0.4, delay: 0.1 },
                              }}
                              className={token === ' ' ? '' : 'inline-block'}
                            >
                              {token}
                            </motion.span>
                          ))}
                          {!isComplete && visibleTokens.length > 0 && (
                            <motion.span
                              className='bg-primary ml-0.5 inline-block h-4 w-0.5'
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                          }}
                          className='border-border/50 mt-4 flex items-center justify-between border-t pt-3'
                        >
                          <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 25,
                                delay: 0.1,
                              }}
                            >
                              <Check size={12} className='text-green-500' />
                            </motion.div>
                            {tokens.length} tokens • 2.1s
                          </div>

                          <motion.button
                            onClick={reset}
                            className='text-muted-foreground hover:text-primary hover:bg-muted/50 rounded px-2 py-1 text-xs transition-colors'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            Try again
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

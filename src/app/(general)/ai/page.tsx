'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PageWrapper from '@/components/shared/PageWrapper';
import TurnstileComponent, {
  TurnstileRef,
} from '@/components/shared/Turnstile';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { projects } from '@/constants/projects';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

function getAge({
  birthYear,
  birthMonth,
  birthDay,
}: {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
}) {
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  const hasHadBirthday =
    today.getMonth() > birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() >= birthDay);
  if (!hasHadBirthday) age--;
  return age;
}

const INITIAL_MESSAGE: Message = {
  id: '0',
  content:
    "Hi! I'm an AI assistant that knows all about Nikica's work and experience. Feel free to ask me anything - what technologies he uses, what projects they've worked on, their background, or anything else you'd like to know!",
  role: 'assistant',
  timestamp: new Date(),
};

const PORTFOLIO_CONTEXT = `
You are an AI assistant representing Nikica Ražnatović, a software engineer with a strong focus on frontend development, clean architecture, and delightful user experiences.

BACKGROUND:
- Experienced in enterprise applications, banking systems, and government platforms, with work spanning Banking & Finance, Government & Public Sector, Real Estate & Hospitality, and Web Development
- Notable clients include NLB Bank, Dukley Hotels, Resorts and Apartments, the Government of Montenegro, and the Court of Montenegro
- Currently working at Coreit, primarily using Vue.js for large-scale applications
- Has been in programming since high school but has started professionally in ${new Date().getFullYear() - 2020}
- Frontend Engineer based in Podgorica, Montenegro; available for freelance work.
- Third year of Information Technology from the University of Mediterranean
- Is currently ${getAge({ birthYear: 2001, birthMonth: 10, birthDay: 29 })} years old.

TECHNICAL SKILLS:
Frontend Development: Vue.js, Next.js, React, TypeScript, Tailwind CSS, Component Libraries
Backend Knowledge: Node.js, API Design, PostgreSQL, System Architecture
UI/UX & Motion: Design Systems, Accessibility, Performance-conscious animations, Smooth microinteractions
Other Expertise: Networking, Server Management, Personal DevOps for hosting side projects, Vim enthusiast

STRENGTHS & APPROACH:
- Strong eye for premium UI and UX, with attention to subtle animations that add “wow” without sacrificing performance or accessibility
- Skilled at problem-solving in complex systems; often the go-to person for tricky frontend issues
- Contributed to internal design systems, frontend documentation, and coding best practices at company level
- Team player who shares knowledge freely and helps colleagues unblock technical challenges
- Passionate about both frontend craft and backend architecture — enjoys experimenting with full-stack projects in personal time
- He is very communicative

PROJECTS:
${projects.map((p) => `- ${p.title} — ${p.description}`).join('\n')}

PLAYGROUND:
- Developed a full-stack game that using AI (Chatgpt 4o), Redis for caching and Postgres for db, drag and dropping the elements on top of each other make infinite possibilit to create new elements called "Boundless Crafting"
- Spotify AI (Chatgpt 4o) - created a recommendation system using machine learning algorithms to suggest personalized playlists based on user behavior and preferences using AI

NOTES:
If asked about confidential details, explain that many projects involve internal systems and proprietary requirements, so only public or non-sensitive aspects can be shared.

Don't answer everything in the same line, add some spacing where applicable.
`;

const SAMPLE_QUESTIONS = [
  'What kinds of projects has Nikica worked on?',
  'What are Nikica’s strongest skills as a frontend developer?',
  'How has Nikica contributed to team practices and development standards?',
  'What kinds of personal projects does Nikica work on outside of his job?',
  'Does Nikica also work on backend and full-stack development?',
  'How does Nikica stay motivated and inspired as a developer?',
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSampleQuestions, setShowSampleQuestions] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number;
    resetTime?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const isDev = process.env.NODE_ENV === 'development';
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
  const isTestKey =
    siteKey === '0x4AAAAAABruqZFL2YL5mOaM' ||
    siteKey === '1x00000000000000000000AA' ||
    siteKey === '2x00000000000000000000AB' ||
    siteKey === '3x00000000000000000000FF';
  const hasTurnstileKey = !!siteKey && !isTestKey;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    setShowSampleQuestions(false);
    setError(null);
    inputRef.current?.focus();
  };

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
    setError(null);
  };

  const handleTurnstileError = () => {
    setError(
      'Security verification failed. Please refresh the page and try again.'
    );
    setTurnstileToken(null);
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken(null);
    // Automatically trigger a new verification
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Clear any previous errors
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSampleQuestions(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: PORTFOLIO_CONTEXT,
          turnstileToken: turnstileToken,
        }),
      });

      // Update rate limit info from headers
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const resetTime = response.headers.get('X-RateLimit-Reset');

      if (remaining) {
        setRateLimitInfo({
          remaining: parseInt(remaining),
          resetTime: resetTime || undefined,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 429) {
          setError(
            'Too many requests. Please wait a few minutes before trying again.'
          );
        } else if (response.status === 403) {
          setError(
            errorData.error || 'Security verification failed. Please try again.'
          );
          // Reset Turnstile on security failure
          if (turnstileRef.current) {
            turnstileRef.current.reset();
          }
          setTurnstileToken(null);
        } else {
          throw new Error(errorData.error || 'Failed to get response');
        }
        return;
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          data.content ||
          "I'm sorry, I couldn't process that request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Reset Turnstile token after successful use
      setTurnstileToken(null);
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm having trouble connecting right now. This is just a demo - in a real implementation, I'd be powered by an AI service to answer questions about Nikica's work and experience.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <PageWrapper
      title='AI Assistant'
      className='slide-enter-content'
      description="Too lazy to scroll through the portfolio? Just ask me anything about Nikica's work, experience, or skills!"
    >
      <div className='mx-auto max-w-4xl'>
        {/* Development Status Indicator */}
        {isDev && !hasTurnstileKey && (
          <div className='mb-6 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'>
            <AlertCircle className='h-4 w-4 flex-shrink-0' />
            <span>
              Development mode: Cloudflare Turnstile is disabled. Add
              NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY to enable bot
              protection.
            </span>
          </div>
        )}

        {showSampleQuestions && (
          <div className='animate-in fade-in mb-8 duration-500'>
            <div className='mb-4 flex items-center justify-center gap-2'>
              <Sparkles className='text-primary h-4 w-4' />
              <h3 className='text-muted/70 text-sm font-medium'>Try asking:</h3>
            </div>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
              {SAMPLE_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSampleQuestion(question)}
                  className='hover:bg-secondary/50 hover:text-foreground text-muted/80 rounded-lg p-3 text-left text-sm transition-all duration-200 hover:scale-[1.02]'
                >
                  {question}
                </button>
              ))}
            </div>
            <hr className='border-muted/20 mt-8' />
          </div>
        )}

        <div className='space-y-6'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className='bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full'>
                  <Bot className='h-4 w-4' />
                </div>
              )}

              <div
                className={cn(
                  'max-w-[85%] space-y-1',
                  message.role === 'user' ? 'items-end' : 'items-start'
                )}
              >
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary/50 rounded-bl-md'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <div className='prose prose-sm dark:prose-invert prose-p:m-0 prose-p:leading-relaxed prose-pre:bg-muted/50 prose-pre:border prose-pre:border-muted/20 prose-code:bg-muted/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none max-w-none'>
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className='text-sm leading-relaxed'>
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className='ml-4 space-y-1 text-sm'>
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className='ml-4 space-y-1 text-sm'>
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className='text-sm'>{children}</li>
                          ),
                          code: ({ children, className }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className='bg-muted/50 text-foreground rounded px-1 py-0.5 font-mono text-xs'>
                                {children}
                              </code>
                            ) : (
                              <code className={className}>{children}</code>
                            );
                          },
                          h1: ({ children }) => (
                            <h1 className='mb-2 text-base font-semibold'>
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className='mb-1 text-sm font-semibold'>
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className='mb-1 text-sm font-medium'>
                              {children}
                            </h3>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className='text-sm leading-relaxed'>{message.content}</p>
                  )}
                </div>
                <p
                  className={cn(
                    'text-muted-foreground px-1 text-xs',
                    message.role === 'user' ? 'text-right' : 'text-left'
                  )}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.role === 'user' && (
                <div className='bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full'>
                  <User className='h-4 w-4' />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className='flex justify-start gap-4'>
              <div className='bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full'>
                <Bot className='h-4 w-4' />
              </div>
              <div className='bg-secondary/50 rounded-2xl rounded-bl-md px-4 py-3'>
                <div className='flex space-x-1'>
                  <div className='bg-muted/60 h-2 w-2 animate-pulse rounded-full'></div>
                  <div className='bg-muted/60 h-2 w-2 animate-pulse rounded-full delay-75'></div>
                  <div className='bg-muted/60 h-2 w-2 animate-pulse rounded-full delay-150'></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Clean, Minimal */}
        <div className='sticky bottom-4 mt-8'>
          {/* Error Display */}
          {error && (
            <div className='mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400'>
              <AlertCircle className='h-4 w-4 flex-shrink-0' />
              <span>{error}</span>
            </div>
          )}

          {/* Rate Limit Info */}
          {rateLimitInfo && rateLimitInfo.remaining <= 3 && (
            <div className='mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'>
              <AlertCircle className='h-4 w-4 flex-shrink-0' />
              <span>
                {rateLimitInfo.remaining} requests remaining in this session
              </span>
            </div>
          )}

          {/* Turnstile Component - Hidden */}
          <div className='hidden'>
            <TurnstileComponent
              ref={turnstileRef}
              onVerify={handleTurnstileSuccess}
              onError={handleTurnstileError}
              onExpire={handleTurnstileExpire}
            />
          </div>

          <form onSubmit={handleSubmit} className='flex gap-3'>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Nikica's experience, skills, projects..."
              className='bg-background/80 border-muted/30 placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary/40 flex-1 rounded-xl border px-4 py-3 text-sm shadow-sm backdrop-blur-sm focus:ring-2 focus:outline-none'
              disabled={isLoading}
            />
            <button
              type='submit'
              disabled={!input.trim() || isLoading}
              className={cn(
                'bg-primary text-primary-foreground hover:bg-primary/90 flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-all duration-200 hover:scale-105',
                (!input.trim() || isLoading) &&
                  'cursor-not-allowed opacity-50 hover:scale-100'
              )}
            >
              <Send className='h-4 w-4' />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className='border-muted/20 mt-16 border-t pt-6'>
          <div className='text-muted/60 text-center text-sm'>
            <p>
              Powered by AI to help you learn about Nikica Ražnatović's
              expertise faster
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

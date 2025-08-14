import { NextRequest, NextResponse } from 'next/server';
import NodeCache from 'node-cache';

// Rate limiting cache - TTL in seconds
const rateLimitCache = new NodeCache({ stdTTL: 300 }); // 5 minutes

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10, // Max requests per time window
  windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds
};

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  const isDev = process.env.NODE_ENV === 'development';

  // Handle development mode token
  if (token === 'dev-mode-token' && isDev) {
    return true;
  }

  if (!secretKey) {
    console.warn('Cloudflare Turnstile secret key not configured');
    return isDev; // Allow in dev mode, reject in production
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return isDev; // Allow in dev mode if verification fails
  }
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const key = `rate_limit_${ip}`;
  const current = rateLimitCache.get<number>(key) || 0;

  if (current >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  rateLimitCache.set(key, current + 1);
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - current - 1 };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded
      ? forwarded.split(',')[0]
      : request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error:
            'Too many requests. Please wait a few minutes before trying again.',
          rateLimited: true,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(
              Date.now() + RATE_LIMIT.windowMs
            ).toISOString(),
          },
        }
      );
    }

    const { messages, context, turnstileToken } = await request.json();

    // Verify Turnstile token
    if (turnstileToken) {
      const isValid = await verifyTurnstile(turnstileToken, ip);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 403 }
        );
      }
    } else {
      // If no turnstile token provided, still require it (unless in dev mode)
      const isDev = process.env.NODE_ENV === 'development';
      if (!isDev) {
        return NextResponse.json(
          { error: 'Security verification required.' },
          { status: 403 }
        );
      }
    }

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a helpful demo response when no API key is configured
      return NextResponse.json({
        content:
          "I'm currently in demo mode! In a full implementation, I'd be powered by OpenAI to answer detailed questions about Nikica's work experience, technical skills, and projects. For now, you can explore the portfolio pages to learn more about their background in enterprise applications, banking systems, and web development.",
      });
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];

    // Create the system prompt with portfolio context
    const systemPrompt = `${context}

Important guidelines:
- Be conversational and helpful
- Focus on Nikica's professional experience and skills
- If asked about specific confidential details, explain that many projects involve internal systems
- Provide specific examples from the project list when relevant
- Be enthusiastic about their expertise but professional
- Keep responses concise but informative`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const aiResponse =
      data.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that request.";

    return NextResponse.json(
      {
        content: aiResponse,
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        content:
          "I'm having some technical difficulties right now. While I sort that out, feel free to explore Nikica's projects page to see his work!",
      },
      { status: 500 }
    );
  }
}

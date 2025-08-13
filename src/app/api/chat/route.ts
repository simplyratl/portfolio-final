import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json();

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

    return NextResponse.json({
      content: aiResponse,
    });
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

import { NextRequest, NextResponse } from 'next/server';

interface DifyRequest {
  inputs: Record<string, any>;
  query: string;
  response_mode: 'streaming' | 'blocking';
  conversation_id: string;
  user: string;
  files?: Array<{
    type: string;
    transfer_method: string;
    url: string;
  }>;
}

interface ChatMessage {
  message: string;
  conversationId?: string;
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('API Route called');
    console.log('Environment variables:', {
      DIFY_API_URL: process.env.DIFY_API_URL,
      DIFY_API_KEY: process.env.DIFY_API_KEY ? 'Set' : 'Not set'
    });

    const { message, conversationId = '', userId = 'portfolio-user' }: ChatMessage = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.DIFY_API_URL || !process.env.DIFY_API_KEY) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Try different possible endpoints with HTTPS
    const baseUrls = [
      'https://dify.irmlabs.my.id', // HTTPS Domain
      'http://dify.irmlabs.my.id',  // HTTP fallback
    ];
    
    const endpointPaths = [
      '/v1/chat-messages',
      '/v1/completion-messages',
      '/api/v1/chat-messages',
    ];

    const difyPayload = {
      inputs: {},
      query: message,
      response_mode: "blocking",
      conversation_id: conversationId,
      user: userId,
    };

    for (const baseUrl of baseUrls) {
      for (const path of endpointPaths) {
        const fullUrl = `${baseUrl}${path}`;
        try {
          console.log(`Trying endpoint:`, fullUrl);

          const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'Portfolio-Chatbot/1.0',
            },
            body: JSON.stringify(difyPayload),
          });

          console.log(`Response status for ${fullUrl}:`, response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('Success with endpoint:', fullUrl);
            return NextResponse.json({
              message: data.answer || 'Sorry, I couldn\'t process your request.',
              conversationId: data.conversation_id,
              messageId: data.id,
            });
          } else {
            const errorText = await response.text();
            console.log(`Error for ${fullUrl}:`, response.status, errorText.substring(0, 200));
          }
        } catch (error) {
          console.error(`Error with ${fullUrl}:`, error instanceof Error ? error.message : error);
        }
      }
    }

    // If all endpoints failed, return fallback response
    console.log('All endpoints failed, returning fallback response');
    return NextResponse.json({
      message: "Hi! I'm currently experiencing some technical difficulties connecting to my AI backend. However, I'd be happy to tell you that I'm a Data Scientist and AI Engineer with experience in machine learning, deep learning, and backend development. Feel free to check out my work experience and projects on this portfolio!",
      conversationId: conversationId || 'temp-conversation',
      messageId: 'temp-message',
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// In-memory conversation storage
const conversationStore: Record<string, any[]> = {};

export async function POST(request: NextRequest) {
  try {
    const { productId, userId, message } = await request.json();

    // Check if product and user data are already cached
    if (!conversationStore[`${userId}:${productId}:product`]) {
      // Fetch product and user data ONCE
      const [product, user] = await Promise.all([
        prisma.product.findUnique({ where: { id: productId } }),
        prisma.userAccount.findFirst({ where: { userId } })

        
      ]);

      if (!product || !user) {
        return NextResponse.json({ error: 'Product or User not found' }, { status: 404 });
      }

      // Store FULL data without any formatting
      conversationStore[`${userId}:${productId}:product`] = product;
      conversationStore[`${userId}:${productId}:user`] = user;
    }

    // Initialize conversation history if not exists
    if (!conversationStore[`${userId}:${productId}:messages`]) {
      conversationStore[`${userId}:${productId}:messages`] = [];
    }

    // Get cached data
    const product = conversationStore[`${userId}:${productId}:product`];
    const user = conversationStore[`${userId}:${productId}:user`];
    const conversationHistory = conversationStore[`${userId}:${productId}:messages`];

    // Add new user message
    const newUserMessage = { role: "user", content: message };
    conversationHistory.push(newUserMessage);

    // Prepare payload for FastAPI chat service
    // Send ALL data without formatting
    const payload = {
      product_profile: product,
      user_profile: user,
      messages: conversationHistory
    };

    // Call FastAPI chat service
    const chatResponse = await fetch('https://ai-backend-y6mq.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const chatData = await chatResponse.json();

    // Store assistant message
    const assistantMessage = { 
      role: "assistant", 
      content: chatData.response.message 
    };
    conversationHistory.push(assistantMessage);

    // Limit conversation history to last 10 messages
    if (conversationHistory.length > 10) {
      conversationHistory.splice(0, conversationHistory.length - 10);
    }

    return NextResponse.json({
      response: chatData.response.message,
      suggestive_questions: chatData.response.suggestive_questions || []
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
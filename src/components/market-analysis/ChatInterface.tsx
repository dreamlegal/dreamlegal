
// app/components/ChatInterface.tsx (Complete Analysis Display)
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🎯 **Complete Company Analysis Agent**\n\n**Flow:**\n1. Search & Contents (Exa AI)\n2. LLM Analysis & Categorization (OpenAI)\n3. Company Reviews (Exa AI)\n\nEnter company name to start!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const formatAnalysisResults = (data: any): string => {
    let output = `**🔍 COMPLETE ANALYSIS FOR ${data.companyName.toUpperCase()}**\n\n`;
    
    // Debug Info
    output += `**⚙️ DEBUG INFO:**\n`;
    output += `• Search Time: ${data.debug?.searchTime || 0}ms\n`;
    output += `• LLM Time: ${data.debug?.llmTime || 0}ms\n`;
    output += `• Reviews Time: ${data.debug?.reviewsTime || 0}ms\n`;
    output += `• Errors: ${data.debug?.errors?.length || 0}\n`;
    if (data.step3_reviews?.processedReviews?.reviewsCount) {
      const reviewsCount = data.step3_reviews.processedReviews.reviewsCount;
      output += `• Reviews Processed: ${(reviewsCount.positive || 0) + (reviewsCount.negative || 0) + (reviewsCount.neutral || 0)} points\n`;
    }
    if (data.databaseId) {
      output += `• 💾 Saved to Database: ${data.databaseId}\n`;
    }
    output += `\n`;
    
    // Step 1: Search Results
    if (data.step1_searchAndContents) {
      const results = data.step1_searchAndContents.results || [];
      output += `**📊 STEP 1: SEARCH & CONTENTS**\n`;
      output += `• Found ${results.length} articles\n`;
      output += `• Cost: $${data.step1_searchAndContents.costDollars?.total || 0}\n\n`;
      
      if (results.length > 0) {
        output += `**📄 ARTICLES FOUND:**\n`;
        results.slice(0, 5).forEach((article: any, index: number) => {
          output += `${index + 1}. ${article.title}\n`;
          output += `   URL: ${article.url}\n`;
          output += `   Date: ${article.publishedDate || 'N/A'}\n\n`;
        });
        if (results.length > 5) {
          output += `... and ${results.length - 5} more articles\n\n`;
        }
      }
    }
    
    // Step 2: LLM Analysis
    if (data.step2_llmAnalysis) {
      const analysis = data.step2_llmAnalysis;
      output += `**🧠 STEP 2: LLM ANALYSIS**\n\n`;
      
      if (analysis.keyInsights && analysis.keyInsights.length > 0) {
        output += `**💡 KEY INSIGHTS:**\n`;
        analysis.keyInsights.forEach((insight: string) => {
          output += `${insight}\n`;
        });
        output += `\n`;
      }
      
      if (analysis.categoryCount) {
        output += `**📊 CATEGORY BREAKDOWN:**\n`;
        Object.entries(analysis.categoryCount).forEach(([category, count]) => {
          if (count > 0) {
            output += `• ${category}: ${count} article(s)\n`;
          }
        });
        output += `\n`;
      }
      
      if (analysis.articles && analysis.articles.length > 0) {
        output += `**🏷️ CATEGORIZED ARTICLES:**\n`;
        analysis.articles.slice(0, 10).forEach((article: any, index: number) => {
          output += `${index + 1}. [${article.category}] ${article.title}\n`;
          if (article.keyPoints && article.keyPoints.length > 0) {
            output += `   Key Points: ${article.keyPoints.join(', ')}\n`;
          }
          output += `\n`;
        });
      }
    }
    
    // Step 3: Reviews
    if (data.step3_reviews) {
      output += `**⭐ STEP 3: COMPANY REVIEWS**\n`;
      output += `• Raw Content Length: ${data.step3_reviews.rawLength} characters\n\n`;
      
      if (data.step3_reviews.processedReviews) {
        const processed = data.step3_reviews.processedReviews;
        
        // Reviews count
        if (processed.reviewsCount) {
          output += `**📊 REVIEWS BREAKDOWN:**\n`;
          output += `• Positive: ${processed.reviewsCount.positive || 0} points\n`;
          output += `• Negative: ${processed.reviewsCount.negative || 0} points\n`;
          output += `• Neutral: ${processed.reviewsCount.neutral || 0} points\n\n`;
        }
        
        // Positive reviews
        if (processed.reviewsSummary?.positive && processed.reviewsSummary.positive.length > 0) {
          output += `**✅ POSITIVE REVIEWS:**\n`;
          processed.reviewsSummary.positive.forEach((point: string) => {
            output += `${point}\n`;
          });
          output += `\n`;
        }
        
        // Negative reviews
        if (processed.reviewsSummary?.negative && processed.reviewsSummary.negative.length > 0) {
          output += `**❌ NEGATIVE REVIEWS:**\n`;
          processed.reviewsSummary.negative.forEach((point: string) => {
            output += `${point}\n`;
          });
          output += `\n`;
        }
        
        // Neutral reviews
        if (processed.reviewsSummary?.neutral && processed.reviewsSummary.neutral.length > 0) {
          output += `**ℹ️ NEUTRAL FACTS:**\n`;
          processed.reviewsSummary.neutral.forEach((point: string) => {
            output += `${point}\n`;
          });
          output += `\n`;
        }
      }
      
      // Raw reviews content
      output += `**📝 RAW REVIEWS CONTENT:**\n`;
      output += `${data.step3_reviews.rawContent}\n\n`;
    }
    
    // Raw JSON Debug
    output += `**🐛 RAW JSON DEBUG:**\n`;
    output += `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
    
    return output;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const companyName = input;
    setInput('');
    setIsLoading(true);
    
    // Loading message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `🔄 **Analyzing ${companyName}...**\n\n⏳ Step 1: Searching articles...\n⏳ Step 2: LLM analysis...\n⏳ Step 3: Getting reviews...`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Remove loading message
      setMessages(prev => prev.slice(0, -1));
      
      // Add formatted results
      const resultsMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: formatAnalysisResults(data),
        timestamp: new Date(),
        data
      };
      
      setMessages(prev => [...prev, resultsMessage]);
      
    } catch (error) {
      console.error('🚨 Error:', error);
      
      // Remove loading message and add error
      setMessages(prev => prev.slice(0, -1));
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: `❌ **Error analyzing ${companyName}**\n\nError: ${error}\n\nPlease check console for details.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4 h-screen flex flex-col bg-gray-50">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🎯 Complete Company Analysis
        </h1>
        <p className="text-gray-600 text-lg">
          Search + LLM Analysis + Reviews | All-in-One Agent
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-white rounded-lg shadow-sm p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-full p-4 rounded-lg shadow-sm ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                {message.content}
              </pre>
              <div className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-3 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter company name (e.g., Clio, Tesla, Apple)"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? '🔄 Analyzing...' : '🚀 Analyze'}
        </button>
      </form>
    </div>
  );
};


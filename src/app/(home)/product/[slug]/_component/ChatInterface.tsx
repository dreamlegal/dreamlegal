
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2, Send, X, Sparkles } from "lucide-react";
import ErrorDisplay from './ErrorDisplay';

interface ChatInterfaceProps {
  productId: string;
  userId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ productId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [suggestiveQuestions, setSuggestiveQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productId, 
          userId, 
          message: inputMessage 
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const newMessages = [
        ...messages, 
        { role: "user", content: inputMessage },
        { role: "assistant", content: data.response }
      ];

      setMessages(newMessages);
      setSuggestiveQuestions(data.suggestive_questions || []);
      setInputMessage('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestiveQuestionClick = (question: string) => {
    setInputMessage(question);
    sendMessage();
  };

  const clearError = () => {
    setError(null);
  };

  if (!isOpen) {
    return (
      <>
        {error && <ErrorDisplay message={error} onClose={clearError} />}
        <Button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      </>
    );
  }

  return (
    <>
      {error && <ErrorDisplay message={error} onClose={clearError} />}

      <Card className="fixed bottom-6 right-6 w-[450px] h-[600px] flex flex-col shadow-2xl border-none rounded-xl overflow-hidden bg-white/90 backdrop-blur-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white" 
                    : "bg-white shadow-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {suggestiveQuestions.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-500">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestiveQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestiveQuestionClick(question)}
                    className="whitespace-normal text-left bg-white/50 hover:bg-gray-100 transition-colors"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="border-t border-gray-200 p-4 bg-white">
          <div className="flex w-full gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button 
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 p-3 transition-all duration-300 ease-in-out"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ChatInterface;
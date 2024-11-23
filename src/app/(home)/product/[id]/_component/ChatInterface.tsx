
// import React, { useState } from 'react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, Loader2 } from "lucide-react";
// // import { Alert, AlertDescription } from "@/components/ui/alert";

// const ChatInterface = ({ userData, productData }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [suggestiveQuestions, setSuggestiveQuestions] = useState([]);

//   // Helper function to parse string format "name|percentage|available"
//   const parseStringFormat = (str) => {
//     const [name, percentage, available] = str.split('|');
//     return {
//       percentage: parseInt(percentage) || 0,
//       available: available === 'true',
//       ...(str.includes('|') && {
//         [str.includes('size') ? 'size' : str.includes('category') ? 'category' : 'industry']: name
//       })
//     };
//   };

//   // Format product profile data with only required fields
//   const formatProductProfile = () => {
//     if (!productData) return {};

//     return {
//       focusCountries: productData.focusCountries || [],
//       languages: productData.languages || [],
//       userCategory: productData.userCategory?.map(cat => parseStringFormat(cat)) || [],
//       industry: productData.industry?.map(ind => parseStringFormat(ind)) || [],
//       teamSize: productData.teamSize?.map(size => parseStringFormat(size)) || []
//     };
//   };

//   // Format user profile data with only required fields
//   const formatUserProfile = () => {
//     return {
//       Location: userData.Location || null,
//       CompanyType: userData.CompanyType || null,
//       PrimaryLanguage: userData.PrimaryLanguage || [],
//       Industry: userData.Industry || [],
//       TeamSize: userData.TeamSize || null,
//       Goals: userData.Goals || []
//     };
//   };

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     const newMessage = {
//       role: "user",
//       content: inputMessage
//     };

//     // Create a copy of messages and add the new user message
//     const conversationHistory = [...messages, newMessage];

//     try {
//       const payload = {
//         product_profile: formatProductProfile(),
//         user_profile: formatUserProfile(),
//         messages: conversationHistory // Send entire conversation history
//       };

//       const response = await fetch('http://localhost:8000/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       // Handle structured response
//       const assistantMessage = {
//         role: "assistant",
//         content: data.response.message || data.response // Handle both structured and string responses
//       };

//       // Update messages with both user and assistant messages
//       setMessages(prev => [...prev, newMessage, assistantMessage]);
      
//       // Update suggestive questions if they exist in the response
//       if (data.response.suggestive_questions) {
//         setSuggestiveQuestions(data.response.suggestive_questions);
//       } else {
//         setSuggestiveQuestions([]);
//       }
      
//       setInputMessage('');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSuggestiveQuestionClick = (question) => {
//     setInputMessage(question);
//     sendMessage();
//   };

//   if (!isOpen) {
//     return (
//       <Button 
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
//       >
//         <MessageCircle className="h-6 w-6" />
//       </Button>
//     );
//   }

//   return (
//     <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Chat Assistant</CardTitle>
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           onClick={() => setIsOpen(false)}
//         >
//           ×
//         </Button>
//       </CardHeader>

//       <CardContent className="flex-1 overflow-y-auto space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg ${
//               msg.role === "user" 
//                 ? "bg-primary text-primary-foreground ml-auto" 
//                 : "bg-muted"
//             } max-w-[80%]`}
//           >
//             {msg.content}
//           </div>
//         ))}
        
//         {suggestiveQuestions.length > 0 && (
//           <div className="space-y-2">
//             <p className="text-sm text-muted-foreground">Suggested questions:</p>
//             <div className="flex flex-wrap gap-2">
//               {suggestiveQuestions.map((question, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSuggestiveQuestionClick(question)}
//                 >
//                   {question}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-6 w-6 animate-spin" />
//           </div>
//         )}

//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//       </CardContent>

//       <CardFooter className="border-t p-4">
//         <div className="flex w-full gap-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 px-3 py-2 border rounded-md"
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <Button 
//             onClick={sendMessage}
//             disabled={isLoading || !inputMessage.trim()}
//           >
//             Send
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ChatInterface;


// working fine by frontend calls 

// import React, { useState } from 'react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, Loader2 } from "lucide-react";
// // import { Alert, AlertDescription } from "@/components/ui/alert";

// interface ChatInterfaceProps {
//   productId: string;
//   userId: string;
// }

// const ChatInterface: React.FC<ChatInterfaceProps> = ({ productId, userId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [suggestiveQuestions, setSuggestiveQuestions] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           productId, 
//           userId, 
//           message: inputMessage 
//         })
//       });

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       const newMessages = [
//         ...messages, 
//         { role: "user", content: inputMessage },
//         { role: "assistant", content: data.response }
//       ];

//       setMessages(newMessages);
//       setSuggestiveQuestions(data.suggestive_questions || []);
//       setInputMessage('');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSuggestiveQuestionClick = (question: string) => {
//     setInputMessage(question);
//     sendMessage();
//   };

//   if (!isOpen) {
//     return (
//       <Button 
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
//       >
//         <MessageCircle className="h-6 w-6" />
//       </Button>
//     );
//   }

//   return (
//     <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Chat Assistant</CardTitle>
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           onClick={() => setIsOpen(false)}
//         >
//           ×
//         </Button>
//       </CardHeader>

//       <CardContent className="flex-1 overflow-y-auto space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg ${
//               msg.role === "user" 
//                 ? "bg-primary text-primary-foreground ml-auto" 
//                 : "bg-muted"
//             } max-w-[80%]`}
//           >
//             {msg.content}
//           </div>
//         ))}
        
//         {suggestiveQuestions.length > 0 && (
//           <div className="space-y-2">
//             <p className="text-sm text-muted-foreground">Suggested questions:</p>
//             <div className="flex flex-wrap gap-2">
//               {suggestiveQuestions.map((question, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSuggestiveQuestionClick(question)}
//                 >
//                   {question}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-6 w-6 animate-spin" />
//           </div>
//         )}

//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//       </CardContent>

//       <CardFooter className="border-t p-4">
//         <div className="flex w-full gap-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 px-3 py-2 border rounded-md"
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <Button 
//             onClick={sendMessage}
//             disabled={isLoading || !inputMessage.trim()}
//           >
//             Send
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ChatInterface;
// import React, { useState } from 'react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, Loader2 } from "lucide-react";
// import ErrorDisplay from './ErrorDisplay';

// interface ChatInterfaceProps {
//   productId: string;
//   userId: string;
// }

// const ChatInterface: React.FC<ChatInterfaceProps> = ({ productId, userId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [suggestiveQuestions, setSuggestiveQuestions] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           productId, 
//           userId, 
//           message: inputMessage 
//         })
//       });

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       const newMessages = [
//         ...messages, 
//         { role: "user", content: inputMessage },
//         { role: "assistant", content: data.response }
//       ];

//       setMessages(newMessages);
//       setSuggestiveQuestions(data.suggestive_questions || []);
//       setInputMessage('');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSuggestiveQuestionClick = (question: string) => {
//     setInputMessage(question);
//     sendMessage();
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   if (!isOpen) {
//     return (
//       <>
//         {error && <ErrorDisplay message={error} onClose={clearError} />}
//         <Button 
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       </>
//     );
//   }

//   return (
//     <>
//       {error && <ErrorDisplay message={error} onClose={clearError} />}

//       <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
//        <CardHeader className="flex flex-row items-center justify-between">
//          <CardTitle>Chat Assistant</CardTitle>
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           onClick={() => setIsOpen(false)}
//         >
//           ×
//         </Button>
//       </CardHeader>

//       <CardContent className="flex-1 overflow-y-auto space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg ${
//               msg.role === "user" 
//                 ? "bg-primary text-primary-foreground ml-auto" 
//                 : "bg-muted"
//             } max-w-[80%]`}
//           >
//             {msg.content}
//           </div>
//         ))}
        
//         {suggestiveQuestions.length > 0 && (
//           <div className="space-y-2">
//             <p className="text-sm text-muted-foreground">Suggested questions:</p>
//             <div className="flex flex-wrap gap-2">
//               {suggestiveQuestions.map((question, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSuggestiveQuestionClick(question)}
//                 >
//                   {question}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-6 w-6 animate-spin" />
//           </div>
//         )}

        
//       </CardContent>

//       <CardFooter className="border-t p-4">
//         <div className="flex w-full gap-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 px-3 py-2 border rounded-md"
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <Button 
//             onClick={sendMessage}
//             disabled={isLoading || !inputMessage.trim()}
//           >
//             Send
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
     
//     </>
//   );
// };

// export default ChatInterface;

// import React, { useState } from 'react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, Loader2 } from "lucide-react";
// import ErrorDisplay from './ErrorDisplay';

// interface ChatInterfaceProps {
//   productId: string;
//   userId: string;
// }

// const ChatInterface: React.FC<ChatInterfaceProps> = ({ productId, userId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [suggestiveQuestions, setSuggestiveQuestions] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           productId, 
//           userId, 
//           message: inputMessage 
//         })
//       });

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       const newMessages = [
//         ...messages, 
//         { role: "user", content: inputMessage },
//         { role: "assistant", content: data.response }
//       ];

//       setMessages(newMessages);
//       setSuggestiveQuestions(data.suggestive_questions || []);
//       setInputMessage('');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSuggestiveQuestionClick = (question: string) => {
//     setInputMessage(question);
//     sendMessage();
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   if (!isOpen) {
//     return (
//       <>
//         {error && <ErrorDisplay message={error} onClose={clearError} />}
//         <Button 
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       </>
//     );
//   }

//   return (
//     <>
//       {error && <ErrorDisplay message={error} onClose={clearError} />}

//       <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
//        <CardHeader className="flex flex-row items-center justify-between">
//          <CardTitle>Chat Assistant</CardTitle>
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           onClick={() => setIsOpen(false)}
//         >
//           ×
//         </Button>
//       </CardHeader>

//       <CardContent className="flex-1 overflow-y-auto space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg ${
//               msg.role === "user" 
//                 ? "bg-primary text-primary-foreground ml-auto" 
//                 : "bg-muted"
//             } max-w-[80%]`}
//           >
//             {msg.content}
//           </div>
//         ))}
        
//         {suggestiveQuestions.length > 0 && (
//           <div className="space-y-2">
//             <p className="text-sm text-muted-foreground">Suggested questions:</p>
//             <div className="flex flex-wrap gap-2">
//               {suggestiveQuestions.map((question, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSuggestiveQuestionClick(question)}
//                   className="whitespace-normal text-left"
//                 >
//                   {question}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-6 w-6 animate-spin" />
//           </div>
//         )}

        
//       </CardContent>

//       <CardFooter className="border-t p-4">
//         <div className="flex w-full gap-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 px-3 py-2 border rounded-md"
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <Button 
//             onClick={sendMessage}
//             disabled={isLoading || !inputMessage.trim()}
//           >
//             Send
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
     
//     </>
//   );
// };

// export default ChatInterface;

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
// "use client"

// import React, { useState } from 'react';
// import { Send, Coffee, Check } from 'lucide-react';

// const PremiumChatInterface = () => {
//   const [message, setMessage] = useState('');
//   const [selectedPrompt, setSelectedPrompt] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [responseMessage, setResponseMessage] = useState('');

//   // Prompt options with placeholders
//   const prompts = [
//     {
//       id: 'feature',
//       title: 'Feature analysis',
//       description: 'Analyze and prioritize product features based on user needs and business goals.',
//       placeholder: 'Enter your Feature name to analyze ...'
//     },
//     {
//       id: 'competitor',
//       title: 'Competitor analysis',
//       description: 'Compare your product features with top competitors to identify opportunities.',
//       placeholder: 'Enter top competitor names separated by commas...'
//     },
//     {
//       id: 'proposal',
//       title: 'Proposal generator',
//       description: 'Create professional project proposals with customizable templates and sections.',
//       placeholder: 'Enter company name for proposal generation...'
//     }
//   ];

//   const getPlaceholder = () => {
//     if (!selectedPrompt) return "Type your message here";
//     return prompts.find(p => p.id === selectedPrompt)?.placeholder;
//   };

//   const handlePromptSelect = (promptId) => {
//     setSelectedPrompt(promptId);
//     setMessage('');
//   };

//   const handleSubmit = () => {
//     if (!message.trim()) return;
    
//     // Simulate API call
//     setProcessing(true);
    
//     setTimeout(() => {
//       setProcessing(false);
//       if (selectedPrompt === 'feature') {
//         setResponseMessage(`Processing feature analysis for "${message}". Results will be ready shortly.`);
//       } else if (selectedPrompt === 'competitor') {
//         setResponseMessage(`Analyzing competitors: ${message}. Comparison in progress.`);
//       } else if (selectedPrompt === 'proposal') {
//         setResponseMessage(`Generating proposal for "${message}" project. Setting up template.`);
//       } else {
//         setResponseMessage(`Received your message: ${message}`);
//       }
//       setMessage('');
//     }, 1500);
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 border-b">
//         <div className="flex-1"></div>
//         <div className="flex-1 text-center">
//           <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
//             Guest Plan
//           </button>
//         </div>
//         <div className="flex-1"></div>
//       </div>

//       {/* Chat content */}
//       <div className="flex-1 overflow-auto p-4 bg-gray-50">
//         <div className="flex items-center gap-2 mb-6">
//           <Coffee className="text-gray-600" size={24} />
//           <h1 className="text-2xl font-bold text-[#1e2556]">Good morning!</h1>
//         </div>

//         {/* Prompt Suggestions */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-[#334155] mb-3">Prompt Suggestions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {prompts.map((prompt) => (
//               <div 
//                 key={prompt.id}
//                 onClick={() => handlePromptSelect(prompt.id)}
//                 className={`
//                   bg-[#f5f7fa] p-4 rounded-lg shadow-sm border 
//                   hover:shadow-md transition-all cursor-pointer
//                   ${selectedPrompt === prompt.id 
//                     ? 'border-[#7cc6ee] border-2 shadow-md' 
//                     : 'border-gray-200'
//                   }
//                 `}
//               >
//                 <div className="flex justify-between">
//                   <h3 className="font-bold text-[#1e2556] mb-2">{prompt.title}</h3>
//                   {selectedPrompt === prompt.id && (
//                     <Check size={18} className="text-[#7cc6ee]" />
//                   )}
//                 </div>
//                 <p className="text-[#2d2d2d] text-sm">{prompt.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Sample message */}
//         <div className="max-w-xs md:max-w-md bg-[#1e2556] text-white p-3 rounded-lg rounded-tl-none mb-4">
//           How can I help with your project today?
//         </div>

//         {/* Sample response */}
//         <div className="max-w-xs md:max-w-md bg-[#f5f7fa] text-[#2d2d2d] p-3 rounded-lg rounded-tr-none ml-auto mb-4">
//           I need to analyze my product features.
//         </div>

//         {/* API Response Message */}
//         {responseMessage && (
//           <div className="max-w-xs md:max-w-md bg-[#1e2556] text-white p-3 rounded-lg rounded-tl-none mb-4">
//             {responseMessage}
//           </div>
//         )}

//         {/* Processing Indicator */}
//         {processing && (
//           <div className="max-w-xs md:max-w-md bg-[#1e2556] text-white p-3 rounded-lg rounded-tl-none mb-4 flex items-center gap-2">
//             <div className="animate-pulse">Processing request</div>
//             <div className="flex space-x-1">
//               <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
//               <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
//               <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Message input */}
//       <div className="p-4 border-t">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={getPlaceholder()}
//             className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee]"
//             disabled={processing}
//           />
//           <button 
//             onClick={handleSubmit} 
//             className={`p-3 rounded-lg ${
//               processing 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-[#1e2556] hover:bg-[#2a326e] cursor-pointer'
//             } text-white`}
//             disabled={processing}
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="text-center p-4 text-[#334155]">
//         <p>Final Result</p>
//       </div>
//     </div>
//   );
// };

// export default PremiumChatInterface;
// "use client"

// import React, { useState } from 'react';
// import { Send, Check } from 'lucide-react';

// const PremiumChatInterface = () => {
//   const [message, setMessage] = useState('');
//   const [selectedPrompt, setSelectedPrompt] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [responseMessage, setResponseMessage] = useState('');

//   // Prompt options with placeholders
//   const prompts = [
//     {
//       id: 'feature',
//       title: 'Feature analysis',
//       placeholder: 'Enter your Feature name to analyze ...'
//     },
//     {
//       id: 'competitor',
//       title: 'Competitor analysis',
//       placeholder: 'Enter top competitor names separated by commas...'
//     },
//     {
//       id: 'proposal',
//       title: 'Proposal generator',
//       placeholder: 'Enter company name for proposal generation...'
//     }
//   ];

//   const getPlaceholder = () => {
//     if (!selectedPrompt) return "Type your message here";
//     return prompts.find(p => p.id === selectedPrompt)?.placeholder;
//   };

//   const handlePromptSelect = (promptId) => {
//     setSelectedPrompt(promptId);
//     setMessage('');
//   };

//   const handleSubmit = () => {
//     if (!message.trim()) return;
    
//     // Simulate API call
//     setProcessing(true);
    
//     setTimeout(() => {
//       setProcessing(false);
//       if (selectedPrompt === 'feature') {
//         setResponseMessage(`Processing feature analysis for "${message}". Results will be ready shortly.`);
//       } else if (selectedPrompt === 'competitor') {
//         setResponseMessage(`Analyzing competitors: ${message}. Comparison in progress.`);
//       } else if (selectedPrompt === 'proposal') {
//         setResponseMessage(`Generating proposal for "${message}" project. Setting up template.`);
//       } else {
//         setResponseMessage(`Received your message: ${message}`);
//       }
//       setMessage('');
//     }, 1500);
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
//       {/* Chat content */}
//       <div className="flex-1 overflow-auto p-4 bg-gray-50">
//         {/* Sample message */}
//         <div className="max-w-xs md:max-w-md bg-[#f5f7fa] text-[#2d2d2d] p-3 rounded-lg rounded-tl-none mb-4 border border-gray-200">
//           How can I help with your project today?
//         </div>

//         {/* Sample response */}
//         <div className="max-w-xs md:max-w-md bg-[#f5f7fa] text-[#2d2d2d] p-3 rounded-lg rounded-tr-none ml-auto mb-4 border border-gray-200">
//           I need to analyze my product features.
//         </div>

//         {/* API Response Message */}
//         {responseMessage && (
//           <div className="max-w-xs md:max-w-md bg-[#f5f7fa] text-[#2d2d2d] p-3 rounded-lg rounded-tl-none mb-4 border border-gray-200">
//             {responseMessage}
//           </div>
//         )}

//         {/* Processing Indicator */}
//         {processing && (
//           <div className="max-w-xs md:max-w-md bg-[#f5f7fa] text-[#2d2d2d] p-3 rounded-lg rounded-tl-none mb-4 flex items-center gap-2 border border-gray-200">
//             <div className="animate-pulse">Processing request</div>
//             <div className="flex space-x-1">
//               <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
//               <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
//               <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input area with prompt suggestions above */}
//       <div className="p-4 border-t bg-white">
//         {/* Compact Prompt Suggestions */}
//         <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
//           {prompts.map((prompt) => (
//             <div 
//               key={prompt.id}
//               onClick={() => handlePromptSelect(prompt.id)}
//               className={`
//                 bg-[#f5f7fa] px-3 py-2 rounded-md flex items-center gap-1 whitespace-nowrap
//                 border cursor-pointer transition-all hover:shadow-sm
//                 ${selectedPrompt === prompt.id 
//                   ? 'border-[#7cc6ee] border-2' 
//                   : 'border-gray-200'
//                 }
//               `}
//             >
//               <h3 className="font-medium text-[#1e2556] text-sm">{prompt.title}</h3>
//               {selectedPrompt === prompt.id && (
//                 <Check size={14} className="text-[#7cc6ee]" />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Message input */}
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={getPlaceholder()}
//             className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee]"
//             disabled={processing}
//           />
//           <button 
//             onClick={handleSubmit} 
//             className={`p-3 rounded-lg ${
//               processing 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-[#1e2556] hover:bg-[#2a326e] cursor-pointer'
//             } text-white`}
//             disabled={processing}
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumChatInterface;
"use client"
export const dynamic = "force-dynamic";

import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

const PremiumChatInterface = () => {
  const [message, setMessage] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Prompt options with placeholders
  const prompts = [
    {
      id: 'feature',
      title: 'Feature analysis',
      placeholder: 'Enter your Feature name to analyze ...'
    },
    {
      id: 'competitor',
      title: 'Competitor analysis',
      placeholder: 'Enter top competitor names separated by commas...'
    },
    {
      id: 'proposal',
      title: 'Proposal generator',
      placeholder: 'Enter company name for proposal generation...'
    }
  ];

  const getPlaceholder = () => {
    if (!selectedPrompt) return "Type your message here";
    return prompts.find(p => p.id === selectedPrompt)?.placeholder;
  };

  const handlePromptSelect = (promptId) => {
    setSelectedPrompt(promptId);
    setMessage('');
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    
    // Simulate API call
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      if (selectedPrompt === 'feature') {
        setResponseMessage(`Processing feature analysis for "${message}". Results will be ready shortly.`);
      } else if (selectedPrompt === 'competitor') {
        setResponseMessage(`Analyzing competitors: ${message}. Comparison in progress.`);
      } else if (selectedPrompt === 'proposal') {
        setResponseMessage(`Generating proposal for "${message}" project. Setting up template.`);
      } else {
        setResponseMessage(`Received your message: ${message}`);
      }
      setMessage('');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
      {/* Chat content */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        {/* Sample message */}
        <div className="max-w-xs md:max-w-md bg-[#e6f4fd] text-[#1e2556] p-3 rounded-lg rounded-tl-none mb-4 border-l-4 border border-[#7cc6ee] shadow-sm">
          How can I help with your project today?
        </div>

        {/* Sample response */}
        <div className="max-w-xs md:max-w-md bg-[#f0f2ff] text-[#2d2d2d] p-3 rounded-lg rounded-tr-none ml-auto mb-4 border-r-4 border border-[#1e2556] shadow-sm">
          I need to analyze my product features.
        </div>

        {/* API Response Message */}
        {responseMessage && (
          <div className="max-w-xs md:max-w-md bg-[#e6f4fd] text-[#1e2556] p-3 rounded-lg rounded-tl-none mb-4 border-l-4 border border-[#7cc6ee] shadow-sm">
            {responseMessage}
          </div>
        )}

        {/* Processing Indicator */}
        {processing && (
          <div className="max-w-xs md:max-w-md bg-[#e6f4fd] text-[#1e2556] p-3 rounded-lg rounded-tl-none mb-4 flex items-center gap-2 border-l-4 border border-[#7cc6ee] shadow-sm">
            <div className="animate-pulse">Processing request</div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input area with prompt suggestions above */}
      <div className="p-4 border-t bg-white">
        {/* Compact Prompt Suggestions */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {prompts.map((prompt) => (
            <div 
              key={prompt.id}
              onClick={() => handlePromptSelect(prompt.id)}
              className={`
                bg-[#f5f7fa] px-3 py-2 rounded-md flex items-center gap-1 whitespace-nowrap
                border cursor-pointer transition-all hover:shadow-sm
                ${selectedPrompt === prompt.id 
                  ? 'border-[#7cc6ee] border-2' 
                  : 'border-gray-200'
                }
              `}
            >
              <h3 className="font-medium text-[#1e2556] text-sm">{prompt.title}</h3>
              {selectedPrompt === prompt.id && (
                <Check size={14} className="text-[#7cc6ee]" />
              )}
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={getPlaceholder()}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee]"
            disabled={processing}
          />
          <button 
            onClick={handleSubmit} 
            className={`p-3 rounded-lg ${
              processing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#1e2556] hover:bg-[#2a326e] cursor-pointer'
            } text-white`}
            disabled={processing}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumChatInterface;
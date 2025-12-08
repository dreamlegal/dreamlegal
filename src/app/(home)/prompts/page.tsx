
// "use client"
// import React, { useState, useMemo, useEffect } from 'react';
// import { Search, Copy, Check, ChevronLeft, ChevronRight, Share2, Lock, User } from 'lucide-react';
// import { useNewAuth } from '@/context/NewAuthContext';;

// // Import from data.ts file
// import { prompts, categories, getDepartmentColor, Prompt } from './_components/data';

// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
//   const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showAll, setShowAll] = useState(false);
//   const [morePromptsIndex, setMorePromptsIndex] = useState(0);
//   const [showLoginModal, setShowLoginModal] = useState(false);
  
//   const ITEMS_PER_PAGE = 20;
//   const MORE_PROMPTS_VISIBLE = 4; // Number of prompts visible at once in slider

//   // Get auth state
//   const { isLoading, userType, userEmail } = useNewAuth();

//   // Check URL parameters on mount to open specific prompt
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const promptId = urlParams.get('prompt');
//     if (promptId) {
//       const prompt = prompts.find(p => p.id === parseInt(promptId));
//       if (prompt) {
//         setSelectedPrompt(prompt);
//       }
//     }
//   }, []);

//   // Update URL when prompt is selected
//   const selectPrompt = (prompt: Prompt) => {
//     setSelectedPrompt(prompt);
//     const url = new URL(window.location.href);
//     url.searchParams.set('prompt', prompt.id.toString());
//     window.history.pushState({}, '', url.toString());
//   };

//   // Clear URL when going back to library
//   const goBackToLibrary = () => {
//     setSelectedPrompt(null);
//     const url = new URL(window.location.href);
//     url.searchParams.delete('prompt');
//     window.history.pushState({}, '', url.toString());
//   };

//   // Filter prompts based on search and category
//   const filteredPrompts = useMemo(() => {
//     return prompts.filter(prompt => {
//       const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                            prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchQuery, selectedCategory]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
//   const displayedPrompts = filteredPrompts.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   // Get random prompts for "More prompts" section
//   const getRandomPrompts = (excludeId: number, count: number = 8) => {
//     const otherPrompts = prompts.filter(p => p.id !== excludeId);
//     const shuffled = [...otherPrompts].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   // More prompts navigation
//   const navigateMorePrompts = (direction: 'left' | 'right', morePrompts: Prompt[]) => {
//     if (direction === 'left') {
//       setMorePromptsIndex(prev => Math.max(0, prev - MORE_PROMPTS_VISIBLE));
//     } else {
//       setMorePromptsIndex(prev => 
//         Math.min(morePrompts.length - MORE_PROMPTS_VISIBLE, prev + MORE_PROMPTS_VISIBLE)
//       );
//     }
//   };

//   // Reset more prompts index when prompt changes
//   useEffect(() => {
//     setMorePromptsIndex(0);
//   }, [selectedPrompt]);

//   const copyToClipboard = async (text: string, promptId: number) => {
//     // Check if user is logged in
//     if (!userType) {
//       setShowLoginModal(true);
//       return;
//     }

//     try {
//       await navigator.clipboard.writeText(text);
//       setCopiedPromptId(promptId);
//       setTimeout(() => setCopiedPromptId(null), 2000);
//     } catch (err) {
//       console.error('Failed to copy text: ', err);
//     }
//   };

//   // Get current URL for redirect after login
//   const getCurrentUrl = () => {
//     if (typeof window === 'undefined') return '/prompts';
//     return window.location.pathname + window.location.search;
//   };

//   // Create login/signup URLs with redirect parameter
//   // After successful auth, your login/signup pages should redirect to the URL in the 'redirect' parameter
//   const getAuthUrl = (authType: 'login' | 'register') => {
//     const currentUrl = getCurrentUrl();
//     const encodedRedirect = encodeURIComponent(currentUrl);
//     return `/auth/user/${authType}?redirect=${encodedRedirect}`;
//   };

//   // Get user initials for display
//   const getInitials = () => {
//     if (!userEmail) return 'U';
//     const parts = userEmail.split('@');
//     return parts[0].substring(0, 2).toUpperCase();
//   };

//   // Login Modal Component
//   const LoginModal = () => {
//     if (!showLoginModal) return null;

//     return (
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//         onClick={() => setShowLoginModal(false)}
//       >
//         <div 
//           className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Lock className="w-8 h-8" style={{ color: '#1e2556' }} />
//             </div>
//             <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e2556' }}>
//               Login Required
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Please sign in to copy and use our AI prompts. Join thousands of legal professionals already using our platform.
//             </p>
//             <div className="flex flex-col gap-3">
//               <a
//                 href={getAuthUrl('login')}
//                 className="w-full px-6 py-3 rounded-lg text-white font-medium text-center transition-all duration-200 hover:opacity-90"
//                 style={{ backgroundColor: '#1e2556' }}
//               >
//                 Sign In to Your Account
//               </a>
//               <a
//                 href={getAuthUrl('login')}
//                 className="w-full px-6 py-3 rounded-lg font-medium text-center border-2 transition-all duration-200"
//                 style={{ 
//                   color: '#1e2556', 
//                   borderColor: '#1e2556',
//                   backgroundColor: 'transparent'
//                 }}
//               >
//                 Create New Account
//               </a>
//               <button
//                 onClick={() => setShowLoginModal(false)}
//                 className="text-gray-500 hover:text-gray-700 text-sm mt-2"
//               >
//                 Maybe later
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const shareOnLinkedIn = () => {
//     const text = `Hey folks! 🙌
// I found this valuable resource by DreamLegal.
// They just dropped a whole prompt library for 400 most common legal use cases, and I am now using AI 100 times better.
// I use these prompts in chat gpt or any other Legal AI solution to get the best results.
// 👉 Why I'm excited about it:
// It's practical and easy to use
// Helps automate some of the repetitive legal tasks we all know too well
// Makes your workday a bit smoother, allowing more focus on the important stuff. Here is the link: https://dreamlegal.in/prompts`;
    
//     const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://dreamlegal.in/prompts')}&summary=${encodeURIComponent(text)}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   const shareOnWhatsApp = () => {
//     const text = `Hey folks! 🙌
// I found this valuable resource by DreamLegal.
// They just dropped a whole prompt library for 400 most common legal use cases, and I am now using AI 100 times better.
// I use these prompts in chat gpt or any other Legal AI solution to get the best results.
// 👉 Why I'm excited about it:
// It's practical and easy to use
// Helps automate some of the repetitive legal tasks we all know too well
// Makes your workday a bit smoother, allowing more focus on the important stuff. Here is the link: https://dreamlegal.in/prompts`;
    
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const shareSpecificPrompt = async (prompt: Prompt) => {
//     const url = new URL(window.location.href);
//     url.searchParams.set('prompt', prompt.id.toString());
//     const shareUrl = url.toString();
    
//     const shareText = `Check out this AI prompt: "${prompt.title}" - ${prompt.description}`;
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: prompt.title,
//           text: shareText,
//           url: shareUrl
//         });
//       } catch (err) {
//         // Fallback to clipboard
//         copyToClipboard(shareUrl, -1);
//       }
//     } else {
//       // Fallback to clipboard
//       copyToClipboard(shareUrl, -1);
//     }
//   };

//   const Pagination = () => {
//     if (totalPages <= 1) return null;

//     const getPageNumbers = () => {
//       const delta = 2;
//       const range = [];
//       const rangeWithDots = [];

//       for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
//         range.push(i);
//       }

//       if (currentPage - delta > 2) {
//         rangeWithDots.push(1, '...');
//       } else {
//         rangeWithDots.push(1);
//       }

//       rangeWithDots.push(...range);

//       if (currentPage + delta < totalPages - 1) {
//         rangeWithDots.push('...', totalPages);
//       } else {
//         rangeWithDots.push(totalPages);
//       }

//       return rangeWithDots;
//     };

//     return (
//       <div className="flex justify-center items-center gap-2 mt-8">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
        
//         {getPageNumbers().map((pageNum, index) => (
//           <button
//             key={index}
//             onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
//             disabled={pageNum === '...'}
//             className={`px-3 py-2 rounded-lg ${
//               pageNum === currentPage
//                 ? 'bg-blue-600 text-white'
//                 : pageNum === '...'
//                 ? 'cursor-default text-gray-400'
//                 : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             {pageNum}
//           </button>
//         ))}
        
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p style={{ color: '#334155' }}>Loading prompt library...</p>
//         </div>
//       </div>
//     );
//   }

//   // Main library view
//   if (!selectedPrompt) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Header - Added top padding for navbar */}
//         <div className="bg-blue-50 py-16 px-4 pt-24">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h1 className="text-5xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                   Prompt Library
//                 </h1>
//                 <p className="text-lg" style={{ color: '#334155' }}>
//                   Create and discover prompts that unlock more powerful ways to use Assistant.
//                 </p>
//               </div>
              
//               {/* User Info Section */}
//               {userType && (
//                 <div className="hidden md:flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
//                   <div 
//                     className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
//                     style={{ backgroundColor: '#1e2556' }}
//                   >
//                     {getInitials()}
//                   </div>
//                   <div>
//                     <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
//                       Welcome back!
//                     </div>
//                     <div className="text-xs" style={{ color: '#334155' }}>
//                       {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             {/* Category Filter */}
//             <select 
//               value={selectedCategory}
//               onChange={(e) => {
//                 setSelectedCategory(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>

//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search prompts"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Authentication Notice for Non-logged-in Users */}
//           {/* {!userType && (
//             <div className="mb-8 p-4 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                     <User className="w-5 h-5" style={{ color: '#1e2556' }} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold" style={{ color: '#1e2556' }}>
//                       Unlock Full Access
//                     </h3>
//                     <p className="text-sm" style={{ color: '#334155' }}>
//                       Sign in to copy prompts and access all features
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <a
//                     href={getAuthUrl('login')}
//                     className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200"
//                     style={{ backgroundColor: '#1e2556' }}
//                   >
//                     Sign In
//                   </a>
//                   <a
//                     href={getAuthUrl('register')}
//                     className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200"
//                     style={{ 
//                       color: '#1e2556', 
//                       borderColor: '#1e2556',
//                       backgroundColor: 'transparent'
//                     }}
//                   >
//                     Register
//                   </a>
//                 </div>
//               </div>
//             </div>
//           )} */}

//           {/* Results count */}
//           <div className="mb-6">
//             <p style={{ color: '#334155' }}>
//               Showing {displayedPrompts.length} of {prompts.length} prompts
//               {totalPages > 1 && (
//                 <span> (Page {currentPage} of {totalPages})</span>
//               )}
//             </p>
//           </div>

//           {/* Prompt Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {displayedPrompts.map(prompt => (
//               <div
//                 key={prompt.id}
//                 className="p-6 rounded-lg hover:shadow-lg transition-shadow relative group border border-gray-200"
//                 style={{ backgroundColor: '#f5f7fa' }}
//               >
//                 <div
//                   onClick={() => selectPrompt(prompt)}
//                   className="cursor-pointer"
//                 >
//                   <h3 className="font-semibold text-lg mb-3" style={{ color: '#1e2556' }}>
//                     {prompt.title}
//                   </h3>
//                   <p 
//                     className="text-sm mb-4 overflow-hidden"
//                     style={{ 
//                       color: '#2d2d2d',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: 'vertical',
//                       lineHeight: '1.4em',
//                       maxHeight: '4.2em'
//                     }}
//                   >
//                     {prompt.description}
//                   </p>
//                   <span 
//                     className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
//                     style={{ backgroundColor: getDepartmentColor(prompt.category) }}
//                   >
//                     {prompt.category}
//                   </span>
//                 </div>
//                 {/* Share Button */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     shareSpecificPrompt(prompt);
//                   }}
//                   className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100"
//                   title="Share this prompt"
//                 >
//                   <Share2 className="w-4 h-4" style={{ color: '#1e2556' }} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* No results message */}
//           {filteredPrompts.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-lg" style={{ color: '#334155' }}>
//                 No prompts found matching your search criteria.
//               </p>
//               <p className="text-sm mt-2" style={{ color: '#2d2d2d' }}>
//                 Try adjusting your search terms or category filter.
//               </p>
//             </div>
//           )}

//           {/* Pagination */}
//           <Pagination />

//           {/* Sharing Section */}
//           <div className="mt-16 p-8 rounded-lg border border-gray-200" style={{ backgroundColor: '#f5f7fa' }}>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//               {/* Left Side - Text Content */}
//               <div>
//                 <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                   Share this valuable resource in LinkedIn and WhatsApp groups to help your seniors, peers and colleagues to use AI
//                 </h2>
                
//                 <div className="mb-6 p-4 rounded-lg bg-white border-l-4" style={{ borderLeftColor: '#1e2556' }}>
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     <strong>Hey folks! 🙌</strong><br/>
//                     I found this valuable resource by DreamLegal.<br/><br/>
                    
//                     They just dropped a whole prompt library for 400 most common legal use cases, and I am now using AI 100 times better.<br/><br/>
                    
//                     I use these prompts in chat gpt or any other Legal AI solution to get the best results.<br/><br/>
                    
//                     <strong>👉 Why I'm excited about it:</strong><br/>
//                     It's practical and easy to use<br/>
//                     Helps automate some of the repetitive legal tasks we all know too well<br/>
//                     Makes your workday a bit smoother, allowing more focus on the important stuff. Here is the link: https://dreamlegal.in/prompts
//                   </p>
//                 </div>
                
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button
//                     onClick={shareOnLinkedIn}
//                     className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
//                     style={{ backgroundColor: '#0077b5' }}
//                   >
//                     Copy post for LinkedIn
//                   </button>
//                   <button
//                     onClick={shareOnWhatsApp}
//                     className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
//                     style={{ backgroundColor: '#25d366' }}
//                   >
//                     Copy post for WhatsApp
//                   </button>
//                 </div>
//               </div>

//               {/* Right Side - Image/Illustration */}
//               <div className="flex justify-center lg:justify-end">
//                 <div className="w-full max-w-sm">
//                   <img 
//                     src="/images/share.png" 
//                     alt="Share prompts illustration"
//                     className="w-full h-auto rounded-lg shadow-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Login Modal */}
//         <LoginModal />
//       </div>
//     );
//   }

//   // Individual prompt view
//   const morePrompts = getRandomPrompts(selectedPrompt.id);
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header - Added top padding for navbar */}
//       <div className="bg-blue-50 py-8 px-4 pt-20">
//         <div className="max-w-4xl mx-auto">
//           <button 
//             onClick={goBackToLibrary}
//             className="text-blue-600 mb-4 hover:underline"
//             style={{ color: '#7cc6ee' }}
//           >
//             ← See All Prompts
//           </button>
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h1 className="text-4xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                 {selectedPrompt.title}
//               </h1>
//               <p className="text-lg" style={{ color: '#334155' }}>
//                 {selectedPrompt.description}
//               </p>
//             </div>
//             <button
//               onClick={() => shareSpecificPrompt(selectedPrompt)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//               title="Share this prompt"
//             >
//               <Share2 className="w-4 h-4" style={{ color: '#1e2556' }} />
//               <span style={{ color: '#1e2556' }}>Share</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Category Badge */}
//         <span 
//           className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-8"
//           style={{ backgroundColor: getDepartmentColor(selectedPrompt.category) }}
//         >
//           {selectedPrompt.category}
//         </span>

//         {/* Prompt Section */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//               Prompt
//             </h2>
//             <button
//               onClick={() => copyToClipboard(selectedPrompt.prompt, selectedPrompt.id)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: copiedPromptId === selectedPrompt.id ? '#10b981' : '#1e2556' }}
//               title={!userType ? 'Login required to copy prompts' : 'Copy prompt'}
//             >
//               {!userType ? (
//                 <>
//                   <Lock className="w-4 h-4" />
//                   Login to Copy
//                 </>
//               ) : copiedPromptId === selectedPrompt.id ? (
//                 <>
//                   <Check className="w-4 h-4" />
//                   Copied!
//                 </>
//               ) : (
//                 <>
//                   <Copy className="w-4 h-4" />
//                   Copy
//                 </>
//               )}
//             </button>
//           </div>
//           <div 
//             className="p-6 rounded-lg font-mono text-sm leading-relaxed relative"
//             style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
//           >
//             {selectedPrompt.prompt}
//             {/* {!userType && (
//               <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-lg">
//                 <div className="text-center p-4">
//                   <Lock className="w-8 h-8 mx-auto mb-2" style={{ color: '#1e2556' }} />
//                   <p className="font-medium" style={{ color: '#1e2556' }}>Login required to view full prompt</p>
//                   <p className="text-sm text-gray-600 mt-1">Sign in to access all features</p>
//                 </div>
//               </div>
//             )} */}
//           </div>
//         </div>

//         {/* Expected Result Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
//             Expected Result
//           </h2>
//           <div 
//             className="p-6 rounded-lg"
//             style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
//           >
//             {selectedPrompt.expectedResult}
//           </div>
//         </div>

//         {/* More Prompts Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//               More Prompts
//             </h2>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => navigateMorePrompts('left', morePrompts)}
//                 disabled={morePromptsIndex === 0}
//                 className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Previous prompts"
//               >
//                 <ChevronLeft className="w-5 h-5" style={{ color: '#1e2556' }} />
//               </button>
//               <button
//                 onClick={() => navigateMorePrompts('right', morePrompts)}
//                 disabled={morePromptsIndex >= morePrompts.length - MORE_PROMPTS_VISIBLE}
//                 className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Next prompts"
//               >
//                 <ChevronRight className="w-5 h-5" style={{ color: '#1e2556' }} />
//               </button>
//             </div>
//           </div>
//           <div className="overflow-hidden">
//             <div 
//               className="flex gap-4 transition-transform duration-300 ease-in-out"
//               style={{ 
//                 transform: `translateX(-${morePromptsIndex * (288 + 16)}px)`, // 288px = w-72, 16px = gap-4
//                 width: `${morePrompts.length * (288 + 16)}px`
//               }}
//             >
//               {morePrompts.map(prompt => (
//                 <div
//                   key={prompt.id}
//                   onClick={() => selectPrompt(prompt)}
//                   className="flex-shrink-0 w-72 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
//                   style={{ backgroundColor: '#f5f7fa' }}
//                 >
//                   <h3 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>
//                     {prompt.title}
//                   </h3>
//                   <p 
//                     className="text-sm mb-3 overflow-hidden"
//                     style={{ 
//                       color: '#2d2d2d',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       lineHeight: '1.3em',
//                       maxHeight: '2.6em'
//                     }}
//                   >
//                     {prompt.description}
//                   </p>
//                   <span 
//                     className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
//                     style={{ backgroundColor: getDepartmentColor(prompt.category) }}
//                   >
//                     {prompt.category}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <LoginModal />
//     </div>
//   );
// }
"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Copy, Check, ChevronLeft, ChevronRight, Share2, Lock, User } from 'lucide-react';
import { useNewAuth } from '@/context/NewAuthContext';
import LoginGate from '@/components/LoginGate';

// Import from data.ts file
import { prompts, categories, getDepartmentColor, Prompt } from './_components/data';

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [morePromptsIndex, setMorePromptsIndex] = useState(0);
  
  const ITEMS_PER_PAGE = 20;
  const MORE_PROMPTS_VISIBLE = 4;

  // Get auth state
  const { isLoading, userType, userEmail, isAuthenticated } = useNewAuth();

  // Check URL parameters on mount to open specific prompt
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const promptId = urlParams.get('prompt');
    if (promptId) {
      const prompt = prompts.find(p => p.id === parseInt(promptId));
      if (prompt) {
        setSelectedPrompt(prompt);
      }
    }
  }, []);

  // Update URL when prompt is selected
  const selectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    const url = new URL(window.location.href);
    url.searchParams.set('prompt', prompt.id.toString());
    window.history.pushState({}, '', url.toString());
  };

  // Clear URL when going back to library
  const goBackToLibrary = () => {
    setSelectedPrompt(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('prompt');
    window.history.pushState({}, '', url.toString());
  };

  // Filter prompts based on search and category
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const displayedPrompts = filteredPrompts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Get random prompts for "More prompts" section
  const getRandomPrompts = (excludeId: number, count: number = 8) => {
    const otherPrompts = prompts.filter(p => p.id !== excludeId);
    const shuffled = [...otherPrompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // More prompts navigation
  const navigateMorePrompts = (direction: 'left' | 'right', morePrompts: Prompt[]) => {
    if (direction === 'left') {
      setMorePromptsIndex(prev => Math.max(0, prev - MORE_PROMPTS_VISIBLE));
    } else {
      setMorePromptsIndex(prev => 
        Math.min(morePrompts.length - MORE_PROMPTS_VISIBLE, prev + MORE_PROMPTS_VISIBLE)
      );
    }
  };

  // Reset more prompts index when prompt changes
  useEffect(() => {
    setMorePromptsIndex(0);
  }, [selectedPrompt]);

  const copyToClipboard = async (text: string, promptId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Get user initials for display
  const getInitials = () => {
    if (!userEmail) return 'U';
    const parts = userEmail.split('@');
    return parts[0].substring(0, 2).toUpperCase();
  };

  const shareOnLinkedIn = () => {
    const text = `Hey folks! 🙌
I found this valuable resource by DreamLegal.
They just dropped a whole prompt library for 400 most common legal use cases, and I am now using AI 100 times better.
I use these prompts in chat gpt or any other Legal AI solution to get the best results.
👉 Why I'm excited about it:
It's practical and easy to use
Helps automate some of the repetitive legal tasks we all know too well
Makes your workday a bit smoother, allowing more focus on the important stuff. Here is the link: https://dreamlegal.in/prompts`;
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://dreamlegal.in/prompts')}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = `Hey folks! 🙌
I found this valuable resource by DreamLegal.
They just dropped a whole prompt library for 400 most common legal use cases, and I am now using AI 100 times better.
I use these prompts in chat gpt or any other Legal AI solution to get the best results.
👉 Why I'm excited about it:
It's practical and easy to use
Helps automate some of the repetitive legal tasks we all know too well
Makes your workday a bit smoother, allowing more focus on the important stuff. Here is the link: https://dreamlegal.in/prompts`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareSpecificPrompt = async (prompt: Prompt) => {
    const url = new URL(window.location.href);
    url.searchParams.set('prompt', prompt.id.toString());
    const shareUrl = url.toString();
    
    const shareText = `Check out this AI prompt: "${prompt.title}" - ${prompt.description}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        copyToClipboard(shareUrl, -1);
      }
    } else {
      copyToClipboard(shareUrl, -1);
    }
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
            disabled={pageNum === '...'}
            className={`px-3 py-2 rounded-lg ${
              pageNum === currentPage
                ? 'bg-blue-600 text-white'
                : pageNum === '...'
                ? 'cursor-default text-gray-400'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: '#334155' }}>Loading prompt library...</p>
        </div>
      </div>
    );
  }

  // Main library view
  if (!selectedPrompt) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header - Always visible */}
        <div className="bg-blue-50 py-16 px-4 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-5xl font-bold mb-4" style={{ color: '#1e2556' }}>
                  Prompt Library
                </h1>
                <p className="text-lg" style={{ color: '#334155' }}>
                  Create and discover prompts that unlock more powerful ways to use Assistant.
                </p>
              </div>
              
              {/* User Info Section */}
              {userType && (
                <div className="hidden md:flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: '#1e2556' }}
                  >
                    {getInitials()}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                      Welcome back!
                    </div>
                    <div className="text-xs" style={{ color: '#334155' }}>
                      {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PROTECTED CONTENT */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoginGate 
            message="Sign in to access our AI Prompts Library"
            blur={true}
          >
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Category Filter */}
              <select 
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search prompts"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6">
              <p style={{ color: '#334155' }}>
                Showing {displayedPrompts.length} of {prompts.length} prompts
                {totalPages > 1 && (
                  <span> (Page {currentPage} of {totalPages})</span>
                )}
              </p>
            </div>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedPrompts.map(prompt => (
                <div
                  key={prompt.id}
                  className="p-6 rounded-lg hover:shadow-lg transition-shadow relative group border border-gray-200"
                  style={{ backgroundColor: '#f5f7fa' }}
                >
                  <div
                    onClick={() => selectPrompt(prompt)}
                    className="cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg mb-3" style={{ color: '#1e2556' }}>
                      {prompt.title}
                    </h3>
                    <p 
                      className="text-sm mb-4 overflow-hidden"
                      style={{ 
                        color: '#2d2d2d',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.4em',
                        maxHeight: '4.2em'
                      }}
                    >
                      {prompt.description}
                    </p>
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getDepartmentColor(prompt.category) }}
                    >
                      {prompt.category}
                    </span>
                  </div>
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareSpecificPrompt(prompt);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100"
                    title="Share this prompt"
                  >
                    <Share2 className="w-4 h-4" style={{ color: '#1e2556' }} />
                  </button>
                </div>
              ))}
            </div>

            {/* No results message */}
            {filteredPrompts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg" style={{ color: '#334155' }}>
                  No prompts found matching your search criteria.
                </p>
                <p className="text-sm mt-2" style={{ color: '#2d2d2d' }}>
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}

            {/* Pagination */}
            <Pagination />

            {/* Sharing Section */}
            <div className="mt-16 p-8 rounded-lg border border-gray-200" style={{ backgroundColor: '#f5f7fa' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text Content */}
                <div>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>
                    Share this valuable resource in LinkedIn and WhatsApp groups to help your seniors, peers and colleagues to use AI
                  </h2>
                  
                  <div className="mb-6 p-4 rounded-lg bg-white border-l-4" style={{ borderLeftColor: '#1e2556' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      <strong>Hey folks! 🙌</strong><br/>
                      I found this valuable resource by DreamLegal.<br/><br/>
                      
                      They just dropped a whole prompt library for 400 most common legal use cases, and I am now using AI 100 times better.<br/><br/>
                      
                      I use these prompts in chat gpt or any other Legal AI solution to get the best results.<br/><br/>
                      
                      <strong>👉 Why I'm excited about it:</strong><br/>
                      It's practical and easy to use<br/>
                      Helps automate some of the repetitive legal tasks we all know too well<br/>
                      Makes your workday a bit smoother, allowing more focus on the important stuff. Here is the link: https://dreamlegal.in/prompts
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={shareOnLinkedIn}
                      className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#0077b5' }}
                    >
                      Copy post for LinkedIn
                    </button>
                    <button
                      onClick={shareOnWhatsApp}
                      className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#25d366' }}
                    >
                      Copy post for WhatsApp
                    </button>
                  </div>
                </div>

                {/* Right Side - Image/Illustration */}
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-sm">
                    <img 
                      src="/images/share.png" 
                      alt="Share prompts illustration"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </LoginGate>
        </div>
      </div>
    );
  }

  // Individual prompt view - ALSO PROTECTED
  const morePrompts = getRandomPrompts(selectedPrompt.id);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Always visible */}
      <div className="bg-blue-50 py-8 px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={goBackToLibrary}
            className="text-blue-600 mb-4 hover:underline"
            style={{ color: '#7cc6ee' }}
          >
            ← See All Prompts
          </button>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#1e2556' }}>
                {selectedPrompt.title}
              </h1>
              <p className="text-lg" style={{ color: '#334155' }}>
                {selectedPrompt.description}
              </p>
            </div>
            <button
              onClick={() => shareSpecificPrompt(selectedPrompt)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              title="Share this prompt"
            >
              <Share2 className="w-4 h-4" style={{ color: '#1e2556' }} />
              <span style={{ color: '#1e2556' }}>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROTECTED CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <LoginGate 
          message="Sign in to view prompt details"
          blur={true}
        >
          {/* Category Badge */}
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-8"
            style={{ backgroundColor: getDepartmentColor(selectedPrompt.category) }}
          >
            {selectedPrompt.category}
          </span>

          {/* Prompt Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                Prompt
              </h2>
              <button
                onClick={() => copyToClipboard(selectedPrompt.prompt, selectedPrompt.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: copiedPromptId === selectedPrompt.id ? '#10b981' : '#1e2556' }}
              >
                {copiedPromptId === selectedPrompt.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div 
              className="p-6 rounded-lg font-mono text-sm leading-relaxed"
              style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
            >
              {selectedPrompt.prompt}
            </div>
          </div>

          {/* Expected Result Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
              Expected Result
            </h2>
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
            >
              {selectedPrompt.expectedResult}
            </div>
          </div>

          {/* More Prompts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                More Prompts
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigateMorePrompts('left', morePrompts)}
                  disabled={morePromptsIndex === 0}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Previous prompts"
                >
                  <ChevronLeft className="w-5 h-5" style={{ color: '#1e2556' }} />
                </button>
                <button
                  onClick={() => navigateMorePrompts('right', morePrompts)}
                  disabled={morePromptsIndex >= morePrompts.length - MORE_PROMPTS_VISIBLE}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Next prompts"
                >
                  <ChevronRight className="w-5 h-5" style={{ color: '#1e2556' }} />
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div 
                className="flex gap-4 transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${morePromptsIndex * (288 + 16)}px)`,
                  width: `${morePrompts.length * (288 + 16)}px`
                }}
              >
                {morePrompts.map(prompt => (
                  <div
                    key={prompt.id}
                    onClick={() => selectPrompt(prompt)}
                    className="flex-shrink-0 w-72 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
                    style={{ backgroundColor: '#f5f7fa' }}
                  >
                    <h3 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>
                      {prompt.title}
                    </h3>
                    <p 
                      className="text-sm mb-3 overflow-hidden"
                      style={{ 
                        color: '#2d2d2d',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.3em',
                        maxHeight: '2.6em'
                      }}
                    >
                      {prompt.description}
                    </p>
                    <span 
                      className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getDepartmentColor(prompt.category) }}
                    >
                      {prompt.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LoginGate>
      </div>
    </div>
  );
}
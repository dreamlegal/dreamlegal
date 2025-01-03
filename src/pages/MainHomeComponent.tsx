"use client"


// the one 
// import React from 'react';
// import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit } from 'lucide-react';

// const LandingPage = () => {
//   return (
//     <div className="min-h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Main Content Container */}
//       <div className="max-w-6xl mx-auto px-4 py-8 relative">
//         {/* Background Decorative Elements */}
//         <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
//         <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />

//         {/* Header Section */}
//         <div className="text-center max-w-2xl mx-auto mb-12">
//           <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4">
//             <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
//           </div>
//           <h1 className="text-3xl font-bold mb-2">Select your solution.</h1>
//           <h2 className="text-xl font-bold text-gray-700">Scale with Innovation.</h2>
//         </div>

//         {/* Top SVG Decorative Lines */}
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
//           <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
//             <path
//               d="M 700,140 C 700,200 700,400 700,460"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             <path
//               d="M 200,260 C 400,320 500,200 700,260"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             <path
//               d="M 700,260 C 700,260 700,260 700,260"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             <path
//               d="M 1200,260 C 1000,320 900,200 700,260"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             <path
//               d="M 680,260 Q 700,265 720,260"
//               stroke="#93C5FD"
//               strokeWidth="1"
//               fill="none"
//               opacity="0.7"
//             />
//           </svg>
//         </div>

//         {/* Top Cards Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {/* Build Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
//             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
//               <Zap className="w-6 h-6 text-blue-600" />
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold">Build platform</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Integrate signals, analyze prospects, and leverage AI assistance.
//               </p>
//             </div>
//           </div>

//           {/* Growth Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
//             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
//               <LineChart className="w-6 h-6 text-blue-600" />
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold">Growth</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Accelerate revenue with AI-powered strategic planning.
//               </p>
//             </div>
//           </div>

//           {/* Retain Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
//             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
//               <Users className="w-6 h-6 text-blue-600" />
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold">Retain and grow</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Optimize value using AI-driven strategies and tools.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Central Logo */}
//         <div className="flex justify-center mb-12 relative z-10">
//           <div className="bg-white px-8 py-4 rounded-full shadow-sm border border-blue-100">
//             <div className="flex items-center gap-3">
//               <Layout className="w-6 h-6 text-blue-600" />
//               <span className="text-xl font-bold text-gray-800">Platform</span>
//             </div>
//           </div>
//         </div>

//         {/* Unified Data Section */}
//         <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 border border-blue-100">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-3">Unified data platform</h2>
//             <p className="text-gray-600">
//               Unify customer, prospect, and intent data to power AI-driven insights.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Features */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <Zap className="w-5 h-5 text-blue-600" />
//             </div>
//             <span className="font-semibold">Automations</span>
//           </div>
//           <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <BarChart3 className="w-5 h-5 text-blue-600" />
//             </div>
//             <span className="font-semibold">Analytics</span>
//           </div>
//           <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <BrainCircuit className="w-5 h-5 text-blue-600" />
//             </div>
//             <span className="font-semibold">AI Features</span>
//           </div>
//         </div>

//         {/* Bottom SVG Decorative Lines */}
//         <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible -mt-12">
//           <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
//             {/* Central vertical line */}
//             <path
//               d="M 700,40 C 700,120 700,80 700,140"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Left curved line */}
//             <path
//               d="M 200,70 C 400,140 500,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Right curved line */}
//             <path
//               d="M 1200,70 C 1000,140 900,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Central decorative curve */}
//             <path
//               d="M 680,90 Q 700,95 720,90"
//               stroke="#93C5FD"
//               strokeWidth="1"
//               fill="none"
//               opacity="0.7"
//             />
//           </svg>
//         </div>

//         {/* Team Section */}
//         <div className="flex justify-center relative z-10">
//           <div className="flex -space-x-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div 
//                 key={i} 
//                 className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
// the one 


// import React, { useState } from 'react';
// import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit } from 'lucide-react';

// const LandingPages = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div className="min-h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Top SVG Decorative Lines */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
//         <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
//             <path
//               d="M 700,140 C 700,200 700,400 700,460"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             <path
//               d="M 400,260 C 500,320 600,200 700,260"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             <path
//               d="M 700,260 C 700,260 700,260 700,260"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             <path
//               d="M 1000,260 C 900,320 800,200 700,260"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             <path
//               d="M 680,260 Q 700,265 720,260"
//               stroke="#93C5FD"
//               strokeWidth="1"
//               fill="none"
//               opacity="0.7"
//               className="animate-draw"
//             />
//         </svg>
//       </div>

//       {/* Animated Background Elements */}
//       <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
//       <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8 relative">
//         {/* Header Section with fade-in animation */}
//         <div className="text-center max-w-2xl mx-auto mb-12 opacity-0 animate-fadeIn">
//           <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
//             <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
//           </div>
//           <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//             Select your solution.
//           </h1>
//           <h2 className="text-xl font-bold text-gray-700">Scale with Innovation.</h2>
//         </div>

//         {/* Top Cards Section with hover effects */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {['Build platform', 'Growth', 'Retain and grow'].map((title, index) => (
//             <div
//               key={title}
//               className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                 {index === 0 && <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//                 {index === 1 && <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />}
//                 {index === 2 && <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold">{title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
//                   {index === 0 && "Integrate signals, analyze prospects, and leverage AI assistance."}
//                   {index === 1 && "Accelerate revenue with AI-powered strategic planning."}
//                   {index === 2 && "Optimize value using AI-driven strategies and tools."}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Central Logo with pulse effect */}
//         <div className="flex justify-center mb-12 relative z-10">
//           <div className="bg-white px-8 py-4 rounded-full shadow-md border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-float">
//             <div className="flex items-center gap-3">
//               <Layout className="w-6 h-6 text-blue-600 animate-spin-slow" />
//               <span className="text-xl font-bold text-gray-800">Platform</span>
//             </div>
//           </div>
//         </div>

//         {/* Unified Data Section with hover effect */}
//         <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
//               Unified data platform
//             </h2>
//             <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//               Unify customer, prospect, and intent data to power AI-driven insights.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Features with hover animations */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {[
//             { icon: Zap, text: 'Automations' },
//             { icon: BarChart3, text: 'Analytics' },
//             { icon: BrainCircuit, text: 'AI Features' }
//           ].map(({ icon: Icon, text }, index) => (
//             <div
//               key={text}
//               className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//             >
//               <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
//                 <Icon className="w-5 h-5 text-blue-600" />
//               </div>
//               <span className="font-semibold">{text}</span>
//             </div>
//           ))}
//         </div>

//         {/* Bottom SVG Decorative Lines */}
//         <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible -mt-12">
//           <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
//             {/* Central vertical line */}
//             <path
//               d="M 700,40 C 700,120 700,80 700,140"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             {/* Left curved line */}
//             <path
//               d="M 200,70 C 400,140 500,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             {/* Right curved line */}
//             <path
//               d="M 1200,70 C 1000,140 900,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//               className="animate-draw"
//             />
//             {/* Central decorative curve */}
//             <path
//               d="M 680,90 Q 700,95 720,90"
//               stroke="#93C5FD"
//               strokeWidth="1"
//               fill="none"
//               opacity="0.7"
//               className="animate-draw"
//             />
//           </svg>
//         </div>

//         {/* Team Section with staggered animation */}
//         <div className="flex justify-center relative z-10">
//           <div className="flex -space-x-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div 
//                 key={i}
//                 className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm hover:transform hover:scale-110 transition-transform duration-300"
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         .animate-spin-slow {
//           animation: spin 3s linear infinite;
//         }
//         .animate-draw {
//           stroke-dasharray: 1000;
//           stroke-dashoffset: 1000;
//           animation: draw 2s ease-in-out forwards;
//         }
//         @keyframes draw {
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPages;

// import React, { useState } from 'react';
// import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit } from 'lucide-react';

// const LandingPages = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div className="min-h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Top SVG Decorative Lines */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
//         <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
//           <path
//             d="M 700,140 C 700,200 700,400 700,460"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           <path
//             d="M 200,260 C 400,320 500,200 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           <path
//             d="M 700,260 C 700,260 700,260 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           <path
//             d="M 1200,260 C 1000,320 900,200 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           <path
//             d="M 680,260 Q 700,265 720,260"
//             stroke="#93C5FD"
//             strokeWidth="1"
//             fill="none"
//             opacity="0.7"
//           />
//         </svg>
//       </div>

//       {/* Animated Background Elements */}
//       <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
//       <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8 relative">
//         {/* Header Section with fade-in animation */}
//         <div className="text-center max-w-2xl mx-auto mb-12 opacity-0 animate-fadeIn">
//           <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
//             <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
//           </div>
//           <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//             Select your solution.
//           </h1>
//           <h2 className="text-xl font-bold text-gray-700">Scale with Innovation.</h2>
//         </div>

//         {/* Top Cards Section with hover effects */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {['Build platform', 'Growth', 'Retain and grow'].map((title, index) => (
//             <div
//               key={title}
//               className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                 {index === 0 && <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//                 {index === 1 && <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />}
//                 {index === 2 && <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold">{title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
//                   {index === 0 && "Integrate signals, analyze prospects, and leverage AI assistance."}
//                   {index === 1 && "Accelerate revenue with AI-powered strategic planning."}
//                   {index === 2 && "Optimize value using AI-driven strategies and tools."}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Central Logo with pulse effect */}
//         <div className="flex justify-center mb-12 relative z-10">
//           <div className="bg-white px-8 py-4 rounded-full shadow-md border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-float">
//             <div className="flex items-center gap-3">
//               <Layout className="w-6 h-6 text-blue-600 animate-spin-slow" />
//               <span className="text-xl font-bold text-gray-800">Platform</span>
//             </div>
//           </div>
//         </div>

//         {/* Unified Data Section with hover effect */}
//         <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
//               Unified data platform
//             </h2>
//             <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//               Unify customer, prospect, and intent data to power AI-driven insights.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Features with hover animations */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {[
//             { icon: Zap, text: 'Automations' },
//             { icon: BarChart3, text: 'Analytics' },
//             { icon: BrainCircuit, text: 'AI Features' }
//           ].map(({ icon: Icon, text }, index) => (
//             <div
//               key={text}
//               className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//             >
//               <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
//                 <Icon className="w-5 h-5 text-blue-600" />
//               </div>
//               <span className="font-semibold">{text}</span>
//             </div>
//           ))}
//         </div>

//         {/* Bottom SVG Decorative Lines */}
//         <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible -mt-12">
//           <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
//             {/* Central vertical line */}
//             <path
//               d="M 700,40 C 700,120 700,80 700,140"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Left curved line */}
//             <path
//               d="M 200,70 C 400,140 500,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Right curved line */}
//             <path
//               d="M 1200,70 C 1000,140 900,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Central decorative curve */}
//             <path
//               d="M 680,90 Q 700,95 720,90"
//               stroke="#93C5FD"
//               strokeWidth="1"
//               fill="none"
//               opacity="0.7"
//             />
//           </svg>
//         </div>

//         {/* Team Section with staggered animation */}
//         <div className="flex justify-center relative z-10">
//           <div className="flex -space-x-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div 
//                 key={i}
//                 className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm hover:transform hover:scale-110 transition-transform duration-300"
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         .animate-spin-slow {
//           animation: spin 3s linear infinite;
//         }
//         .animate-draw {
//           stroke-dasharray: 1000;
//           stroke-dashoffset: 1000;
//           animation: draw 2s ease-in-out forwards;
//         }
//         @keyframes draw {
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPages;
// import React, { useState } from 'react';
// import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit } from 'lucide-react';

// const LandingPages = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div className="min-h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Top SVG Decorative Lines */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
//         <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
//           {/* Center vertical line */}
//           <path
//             d="M 700,140 C 700,200 700,400 700,460"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Left curved line - reduced spread */}
//           <path
//             d="M 500,260 C 600,320 650,200 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Center point */}
//           <path
//             d="M 700,260 C 700,260 700,260 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Right curved line - reduced spread */}
//           <path
//             d="M 900,260 C 800,320 750,200 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Center decorative curve */}
//           <path
//             d="M 680,260 Q 700,265 720,260"
//             stroke="#93C5FD"
//             strokeWidth="1"
//             fill="none"
//             opacity="0.7"
//           />
//         </svg>
//       </div>

//       {/* Animated Background Elements */}
//       <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
//       <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8 relative">
//         {/* Header Section with fade-in animation */}
//         <div className="text-center max-w-2xl mx-auto mb-12 opacity-0 animate-fadeIn">
//           <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
//             <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
//           </div>
//           <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//             Select your solution.
//           </h1>
//           <h2 className="text-xl font-bold text-gray-700">Scale with Innovation.</h2>
//         </div>

//         {/* Top Cards Section with hover effects */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {['Build platform', 'Growth', 'Retain and grow'].map((title, index) => (
//             <div
//               key={title}
//               className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                 {index === 0 && <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//                 {index === 1 && <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />}
//                 {index === 2 && <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold">{title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
//                   {index === 0 && "Integrate signals, analyze prospects, and leverage AI assistance."}
//                   {index === 1 && "Accelerate revenue with AI-powered strategic planning."}
//                   {index === 2 && "Optimize value using AI-driven strategies and tools."}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Central Logo with pulse effect */}
//         <div className="flex justify-center mb-12 relative z-10">
//           <div className="bg-white px-8 py-4 rounded-full shadow-md border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-float">
//             <div className="flex items-center gap-3">
//               <Layout className="w-6 h-6 text-blue-600 animate-spin-slow" />
//               <span className="text-xl font-bold text-gray-800">Platform</span>
//             </div>
//           </div>
//         </div>

//         {/* Unified Data Section with hover effect */}
//         <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
//               Unified data platform
//             </h2>
//             <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//               Unify customer, prospect, and intent data to power AI-driven insights.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Features with hover animations */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {[
//             { icon: Zap, text: 'Automations' },
//             { icon: BarChart3, text: 'Analytics' },
//             { icon: BrainCircuit, text: 'AI Features' }
//           ].map(({ icon: Icon, text }, index) => (
//             <div
//               key={text}
//               className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//             >
//               <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
//                 <Icon className="w-5 h-5 text-blue-600" />
//               </div>
//               <span className="font-semibold">{text}</span>
//             </div>
//           ))}
//         </div>

//         {/* Bottom SVG Decorative Lines */}
//         <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible -mt-12">
//           <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
//             {/* Central vertical line */}
//             <path
//               d="M 700,40 C 700,120 700,80 700,140"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Left curved line */}
//             <path
//               d="M 200,70 C 400,140 500,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Right curved line */}
//             <path
//               d="M 1200,70 C 1000,140 900,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Central decorative curve */}
//             <path
//               d="M 680,90 Q 700,95 720,90"
//               stroke="#93C5FD"
//               strokeWidth="1"
//               fill="none"
//               opacity="0.7"
//             />
//           </svg>
//         </div>

//         {/* Team Section with staggered animation */}
//         <div className="flex justify-center relative z-10">
//           <div className="flex -space-x-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div 
//                 key={i}
//                 className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm hover:transform hover:scale-110 transition-transform duration-300"
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         .animate-spin-slow {
//           animation: spin 3s linear infinite;
//         }
//         .animate-draw {
//           stroke-dasharray: 1000;
//           stroke-dashoffset: 1000;
//           animation: draw 2s ease-in-out forwards;
//         }
//         @keyframes draw {
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPages;
// import React, { useState } from 'react';
// import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit } from 'lucide-react';

// const LandingPages = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div className="min-h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Top SVG Decorative Lines */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
//         <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
//           {/* Center vertical line */}
//           <path
//             d="M 700,140 C 700,200 700,400 700,460"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Left curved line - moderately reduced spread */}
//           <path
//             d="M 350,260 C 500,320 600,200 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Center point */}
//           <path
//             d="M 700,260 C 700,260 700,260 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
//           {/* Right curved line - moderately reduced spread */}
//           <path
//             d="M 1050,260 C 900,320 800,200 700,260"
//             stroke="#93C5FD"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6,6"
//           />
        
//         </svg>
//       </div>

//       {/* Animated Background Elements */}
//       <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
//       <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8 relative">
//         {/* Header Section with fade-in animation */}
//         <div className="text-center max-w-2xl mx-auto mb-12 opacity-0 animate-fadeIn">
//           <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
//             <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
//           </div>
//           <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//             Select your solution.
//           </h1>
//           <h2 className="text-xl font-bold text-gray-700">Scale with Innovation.</h2>
//         </div>

//         {/* Top Cards Section with hover effects */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {['Build platform', 'Growth', 'Retain and grow'].map((title, index) => (
//             <div
//               key={title}
//               className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                 {index === 0 && <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//                 {index === 1 && <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />}
//                 {index === 2 && <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold">{title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
//                   {index === 0 && "Integrate signals, analyze prospects, and leverage AI assistance."}
//                   {index === 1 && "Accelerate revenue with AI-powered strategic planning."}
//                   {index === 2 && "Optimize value using AI-driven strategies and tools."}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Central Logo with pulse effect */}
//         <div className="flex justify-center mb-12 relative z-10">
//           <div className="bg-white px-8 py-4 rounded-full shadow-md border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-float">
//             <div className="flex items-center gap-3">
//               <Layout className="w-6 h-6 text-blue-600 animate-spin-slow" />
//               <span className="text-xl font-bold text-gray-800">Platform</span>
//             </div>
//           </div>
//         </div>

//         {/* Unified Data Section with hover effect */}
//         <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
//               Unified data platform
//             </h2>
//             <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//               Unify customer, prospect, and intent data to power AI-driven insights.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Features with hover animations */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
//           {[
//             { icon: Zap, text: 'Automations' },
//             { icon: BarChart3, text: 'Analytics' },
//             { icon: BrainCircuit, text: 'AI Features' }
//           ].map(({ icon: Icon, text }, index) => (
//             <div
//               key={text}
//               className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
//             >
//               <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
//                 <Icon className="w-5 h-5 text-blue-600" />
//               </div>
//               <span className="font-semibold">{text}</span>
//             </div>
//           ))}
//         </div>

//         {/* Bottom SVG Decorative Lines */}
//         <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible -mt-12">
//           <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
//             {/* Central vertical line */}
//             <path
//               d="M 700,40 C 700,120 700,80 700,140"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Left curved line */}
//             <path
//               d="M 200,70 C 400,140 500,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Right curved line */}
//             <path
//               d="M 1200,70 C 1000,140 900,0 700,120"
//               stroke="#93C5FD"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="6,6"
//             />
//             {/* Central decorative curve */}
           
//           </svg>
//         </div>

//         {/* Team Section with staggered animation */}
//         <div className="flex justify-center relative z-10">
//           <div className="flex -space-x-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div 
//                 key={i}
//                 className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm hover:transform hover:scale-110 transition-transform duration-300"
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         .animate-spin-slow {
//           animation: spin 3s linear infinite;
//         }
//         .animate-draw {
//           stroke-dasharray: 1000;
//           stroke-dashoffset: 1000;
//           animation: draw 2s ease-in-out forwards;
//         }
//         @keyframes draw {
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPages;
import React, { useState } from 'react';
import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit } from 'lucide-react';

const LandingPages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-[calc(100vh-64px)] pt-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      {/* Top SVG Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
  <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
    {/* Center vertical line - moved down slightly */}
    <path
      d="M 700,100 C 700,160 700,360 700,420"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
    {/* Left curved line - moved down slightly */}
    <path
      d="M 350,220 C 500,280 600,160 700,220"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
    {/* Center point - moved down slightly */}
    <path
      d="M 700,220 C 700,220 700,220 700,220"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
    {/* Right curved line - moved down slightly */}
    <path
      d="M 1050,220 C 900,280 800,160 700,220"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
  </svg>
</div>
      {/* Animated Background Elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        {/* Header Section with fade-in animation */}
        <div className="text-center max-w-2xl mx-auto mb-12 opacity-0 animate-fadeIn">
          <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
            <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Select Your Solution.
          </h1>
          <h2 className="text-xl font-bold text-gray-700">Scale with Innovation.</h2>
        </div>

        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          {['Legal Process Optimization', 'Legal Technology Planning', 'Change Management'].map((title, index) => (
            <div
              key={title}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl 
                       transition-all duration-500 border border-blue-100 hover:border-blue-300 
                       transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 
                           group-hover:scale-110 transition-transform duration-300">
                {index === 0 && <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
                {index === 1 && <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />}
                {index === 2 && <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 
                           transition-opacity duration-300">
                  {index === 0 && "Streamline legal workflows by identifying bottlenecks and inefficiencies. Leverage actionable insights to automate repetitive tasks, reduce turnaround time, and enhance operational precision."}
                  {index === 1 && "Strategically assess and implement the right legal tech stack. Our platform analyzes your team’s needs, compares tools, and creates a seamless plan for technology adoption that maximizes ROI."}
                  {index === 2 && "Enable smooth transitions with data-driven strategies. Support your legal team with tailored change management plans that ensure effective onboarding, user adoption, and minimized disruption."}

                 


                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Central Logo */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-md border border-blue-100 
                       hover:shadow-xl transition-shadow duration-300 animate-float">
            <div className="flex items-center gap-3">
              {/* <Layout className="w-6 h-6 text-blue-600 animate-spin-slow" /> */}
            <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className=" h-6" />
              {/* <span className="text-xl font-bold text-gray-800">Platform</span> */}
            </div>
          </div>
        </div>

        {/* Unified Data Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 
                     border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
            Legal operations Intelligence

            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            We unify fragmented legal processes, workflow data, and technology usage insights to deliver actionable intelligence across your operations.        </p>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          {[
            { icon: Zap, text: 'Workflows' },
            { icon: BarChart3, text: 'Technology' },
            { icon: BrainCircuit, text: 'Modern Legal Teams' }
          ].map(({ icon: Icon, text }, index) => (
            <div
              key={text}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-sm 
                       hover:shadow-lg transition-all duration-300 border border-blue-100 
                       hover:border-blue-300 transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold">{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom SVG Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible">
          <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
            <path
              d="M 700,40 C 700,120 700,80 700,140"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
            <path
              d="M 200,70 C 400,140 500,0 700,120"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
            <path
              d="M 1200,70 C 1000,140 900,0 700,120"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
          </svg>
        </div>

        {/* Team Section */}
        <div className="flex justify-center relative z-10">
          <div className="flex -space-x-4">
            {[11, 2, 3, 9, 5].map((i) => (
              <img 
            key={i}
            src={`t${i}.jpg`}
            alt={`Team member ${i}`}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm 
                 hover:transform hover:scale-110 transition-transform duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <FinalSection/>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-in-out forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPages;

import { Building2, Briefcase,  } from 'lucide-react';

// const FinalSection = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <div className="w-full bg-gradient-to-b from-blue-50 to-white py-8 relative overflow-hidden">
//       {/* Grid Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
//       </div>

//       {/* Decorative Background Elements */}
//       <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
//       <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
//       <div className="max-w-6xl mx-auto px-4 relative">
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//           What Describes you the best?
//           </h2>

//           {/* Category Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               {
//                 icon: Building2,
//                 title: "Law Firm",
//                 gradient: "from-blue-600 to-blue-400"
//               },
//               {
//                 icon: Briefcase,
//                 title: "Inhouse Legal Team",
//                 gradient: "from-blue-500 to-blue-300"
//               },
//               {
//                 icon: Briefcase,
//                 title: "Legal Tech Company",
//                 gradient: "from-blue-700 to-blue-500"
//               }
//             ].map((category, index) => (
//               <button
//                 key={index}
//                 className="group relative bg-white p-4 rounded-xl border border-blue-100 hover:border-blue-300 
//                          shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 
//                              group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
                
//                 <div className="relative z-10 flex items-center justify-center gap-3">
//                   <category.icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
//                   <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                     {category.title}
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import { X, ArrowRight, Sparkles } from 'lucide-react';

// Modal Component
const FormModal = ({ isOpen, onClose, selectedCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', {
      category: selectedCategory,
      ...formData
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with enhanced blur */}
      <div 
        className="fixed inset-0 bg-blue-50/30 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl max-w-md w-full shadow-2xl 
                     transform transition-all duration-500 scale-100 overflow-hidden">
          {/* Decorative background elements */}
         

          {/* Content container */}
          <div className="relative p-8">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-blue-50/50 
                       transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
                        transition-colors duration-300" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                <span className="text-sm font-semibold text-blue-600 tracking-wider">
                  GET STARTED
                </span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 
                         bg-clip-text text-transparent mb-2">
                Talk to us!
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 
                           border border-blue-100">
                <span className="text-sm text-blue-600 font-medium">
                  {selectedCategory}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
                { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Enter your organization' }
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-blue-200 hover:bg-white/80"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 
                       hover:from-blue-700 hover:to-blue-600 text-white font-medium
                       rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl
                       hover:shadow-blue-500/30 transition-all duration-300
                       focus:ring-2 focus:ring-blue-200 focus:ring-offset-2
                       overflow-hidden"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                    Submit
                  </span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 
                             opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-8 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            What Describes you the best?
          </h2>

          {/* Category Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Building2,
                title: "Law Firm",
                gradient: "from-blue-600 to-blue-400"
              },
              {
                icon: Briefcase,
                title: "Inhouse Legal Team",
                gradient: "from-blue-500 to-blue-300"
              },
              {
                icon: Briefcase,
                title: "Legal Tech Company",
                gradient: "from-blue-700 to-blue-500"
              }
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.title)}
                className="group relative bg-white p-4 rounded-xl border border-blue-100 hover:border-blue-300 
                         shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 
                             group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
                
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <category.icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {category.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <FormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};


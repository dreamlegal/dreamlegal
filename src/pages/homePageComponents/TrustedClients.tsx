"use client"
// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   // Each logo object now includes color and glow properties
//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-black relative overflow-hidden py-32">
//       {/* Animated background effects */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Elegant headline with 3D effect */}
//       <div className="text-center mb-20 relative z-10">
//         <span className="inline-block text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 animate-shimmer">
//           TRUSTED BY INNOVATORS
//         </span>
//         <h2 className="text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Enhanced marquee container */}
//       <div className="relative w-full max-w-7xl mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//         {/* Dynamic gradient overlays */}
//         <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
//         <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-black via-black/90 to-transparent z-10" />

//         {/* Marquee content with advanced effects */}
//         <div className="flex items-center justify-center animate-premium-scroll">
//           {logos.map((logo, index) => (
//             <div
//               key={`logo-${logo.id}-${index}`}
//               className="mx-16 flex-shrink-0 group relative"
//               style={{
//                 transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                 transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//               }}
//             >
//               <div className="relative w-32 h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                 {/* Glassmorphism effect container */}
//                 <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
//                 {/* Animated border */}
//                 <div className="absolute inset-0 rounded-xl overflow-hidden">
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
//                   </div>
//                 </div>

//                 {/* Glow effect */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                   style={{
//                     background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                   }}
//                 />

//                 {/* Logo placeholder with enhanced styling */}
//                 <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                   {/* Replace this div with your actual logo image */}
//                   <div className="w-24 h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30 animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes shimmer {
//       0% { background-position: -200% center; }
//       100% { background-position: 200% center; }
//     }

//     @keyframes shine {
//       0% { transform: translateX(-100%); }
//       100% { transform: translateX(100%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 40s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-shimmer {
//       background-size: 200% auto;
//       animation: shimmer 3s linear infinite;
//     }

//     .animate-shine {
//       animation: shine 2s infinite;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }

//     .group:hover .animate-shine {
//       animation: shine 1.5s infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;
// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-[#1a1625] relative overflow-hidden py-32">
//       {/* Animated background effects */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Elegant headline with 3D effect */}
//       <div className="text-center mb-20 relative z-10">
//         <span className="inline-block text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 animate-shimmer">
//           TRUSTED BY INNOVATORS
//         </span>
//         <h2 className="text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Enhanced marquee container */}
//       <div className="relative w-full max-w-6xl mx-auto overflow-hidden" 
//            onMouseEnter={() => setIsHovered(true)} 
//            onMouseLeave={() => setIsHovered(false)}>
        
//         {/* Marquee content with advanced effects */}
//         <div className="relative flex items-center justify-center animate-premium-scroll">
//           {/* Left fade gradient - contained within scroll area */}
//           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a1625] via-[#1a1625] to-transparent z-20" />
          
//           {/* Right fade gradient - contained within scroll area */}
//           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a1625] via-[#1a1625] to-transparent z-20" />
          
//           {/* Logo items */}
//           {logos.map((logo, index) => (
//             <div
//               key={`logo-${logo.id}-${index}`}
//               className="mx-16 flex-shrink-0 group relative"
//               style={{
//                 transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                 transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//               }}
//             >
//               <div className="relative w-32 h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                 {/* Glassmorphism effect */}
//                 <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
//                 {/* Animated border */}
//                 <div className="absolute inset-0 rounded-xl overflow-hidden">
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
//                   </div>
//                 </div>

//                 {/* Glow effect */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                   style={{
//                     background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                   }}
//                 />

//                 {/* Logo placeholder */}
//                 <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                   <div className="w-24 h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30 animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes shimmer {
//       0% { background-position: -200% center; }
//       100% { background-position: 200% center; }
//     }

//     @keyframes shine {
//       0% { transform: translateX(-100%); }
//       100% { transform: translateX(100%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-shimmer {
//       background-size: 200% auto;
//       animation: shimmer 3s linear infinite;
//     }

//     .animate-shine {
//       animation: shine 2s infinite;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }

//     .group:hover .animate-shine {
//       animation: shine 1.5s infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;
// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-[#1a1625] relative overflow-hidden py-32">
//       {/* Animated background effects */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Elegant headline with 3D effect */}
//       <div className="text-center mb-20 relative z-10">
//         <span className="inline-block text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 animate-shimmer">
//           TRUSTED BY INNOVATORS
//         </span>
//         <h2 className="text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Enhanced marquee container */}
//       <div className="relative w-full max-w-6xl mx-auto" 
//            onMouseEnter={() => setIsHovered(true)} 
//            onMouseLeave={() => setIsHovered(false)}>
        
//         {/* Portal containers */}
//         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-20 z-20">
//           {/* Left portal frame */}
//           <div className="absolute inset-0 rounded-r-xl bg-gradient-to-r from-indigo-600/20 to-transparent backdrop-blur-sm">
//             <div className="absolute inset-0 bg-gradient-to-r from-[#1a1625] via-[#1a1625]/50 to-transparent" />
//           </div>
//           {/* Decorative elements */}
//           <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/0 via-indigo-500 to-indigo-500/0" />
//           <div className="absolute left-1 right-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-transparent" />
//           <div className="absolute left-1 right-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-transparent" />
//         </div>

//         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-20 z-20">
//           {/* Right portal frame */}
//           <div className="absolute inset-0 rounded-l-xl bg-gradient-to-l from-indigo-600/20 to-transparent backdrop-blur-sm">
//             <div className="absolute inset-0 bg-gradient-to-l from-[#1a1625] via-[#1a1625]/50 to-transparent" />
//           </div>
//           {/* Decorative elements */}
//           <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/0 via-indigo-500 to-indigo-500/0" />
//           <div className="absolute left-0 right-1 top-0 h-1 bg-gradient-to-l from-indigo-500 to-transparent" />
//           <div className="absolute left-0 right-1 bottom-0 h-1 bg-gradient-to-l from-indigo-500 to-transparent" />
//         </div>

//         {/* Marquee content with advanced effects */}
//         <div className="relative flex items-center justify-center animate-premium-scroll overflow-hidden">
//           {/* Logo items */}
//           {logos.map((logo, index) => (
//             <div
//               key={`logo-${logo.id}-${index}`}
//               className="mx-16 flex-shrink-0 group relative"
//               style={{
//                 transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                 transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//               }}
//             >
//               <div className="relative w-32 h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                 {/* Glassmorphism effect */}
//                 <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
//                 {/* Animated border */}
//                 <div className="absolute inset-0 rounded-xl overflow-hidden">
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
//                   </div>
//                 </div>

//                 {/* Glow effect */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                   style={{
//                     background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                   }}
//                 />

//                 {/* Logo placeholder */}
//                 <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                   <div className="w-24 h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30 animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes shimmer {
//       0% { background-position: -200% center; }
//       100% { background-position: 200% center; }
//     }

//     @keyframes shine {
//       0% { transform: translateX(-100%); }
//       100% { transform: translateX(100%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-shimmer {
//       background-size: 200% auto;
//       animation: shimmer 3s linear infinite;
//     }

//     .animate-shine {
//       animation: shine 2s infinite;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }

//     .group:hover .animate-shine {
//       animation: shine 1.5s infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-[#1a1625] relative overflow-hidden py-32">
//       {/* Animated background effects */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Elegant headline with 3D effect */}
//       <div className="text-center mb-20 relative z-10">
//         <span className="inline-block text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 animate-shimmer">
//           TRUSTED BY INNOVATORS
//         </span>
//         <h2 className="text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Enhanced marquee container */}
//       <div className="relative w-full max-w-6xl mx-auto" 
//            onMouseEnter={() => setIsHovered(true)} 
//            onMouseLeave={() => setIsHovered(false)}>
        
//         {/* Premium Portal containers */}
//         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-24 z-20">
//           {/* Left portal frame */}
//           <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-r from-white/[0.03] to-transparent backdrop-blur-sm">
//             {/* Modern gradient background */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#1a1625] via-[#1a1625]/80 to-transparent" />
            
//             {/* Premium border effects */}
//             <div className="absolute inset-0 rounded-r-2xl border-r border-t border-b border-white/[0.08]" />
            
//             {/* Inner glow */}
//             <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-r from-indigo-500/10 to-transparent" />
            
//             {/* Decorative accents */}
//             <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
//             <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute left-2 top-2 w-8 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
//             <div className="absolute left-2 bottom-2 w-8 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
//           </div>
//         </div>

//         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-24 z-20">
//           {/* Right portal frame */}
//           <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-l from-white/[0.03] to-transparent backdrop-blur-sm">
//             {/* Modern gradient background */}
//             <div className="absolute inset-0 bg-gradient-to-l from-[#1a1625] via-[#1a1625]/80 to-transparent" />
            
//             {/* Premium border effects */}
//             <div className="absolute inset-0 rounded-l-2xl border-l border-t border-b border-white/[0.08]" />
            
//             {/* Inner glow */}
//             <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-l from-indigo-500/10 to-transparent" />
            
//             {/* Decorative accents */}
//             <div className="absolute right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
//             <div className="absolute right-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute right-2 top-2 w-8 h-px bg-gradient-to-l from-indigo-500/50 to-transparent" />
//             <div className="absolute right-2 bottom-2 w-8 h-px bg-gradient-to-l from-indigo-500/50 to-transparent" />
//           </div>
//         </div>

//         {/* Marquee content with advanced effects */}
//         <div className="relative flex items-center justify-center animate-premium-scroll overflow-hidden">
//           {/* Logo items */}
//           {logos.map((logo, index) => (
//             <div
//               key={`logo-${logo.id}-${index}`}
//               className="mx-16 flex-shrink-0 group relative"
//               style={{
//                 transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                 transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//               }}
//             >
//               <div className="relative w-32 h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                 {/* Glassmorphism effect */}
//                 <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
//                 {/* Animated border */}
//                 <div className="absolute inset-0 rounded-xl overflow-hidden">
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
//                   </div>
//                 </div>

//                 {/* Glow effect */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                   style={{
//                     background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                   }}
//                 />

//                 {/* Logo placeholder */}
//                 <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                   <div className="w-24 h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30 animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes shimmer {
//       0% { background-position: -200% center; }
//       100% { background-position: 200% center; }
//     }

//     @keyframes shine {
//       0% { transform: translateX(-100%); }
//       100% { transform: translateX(100%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-shimmer {
//       background-size: 200% auto;
//       animation: shimmer 3s linear infinite;
//     }

//     .animate-shine {
//       animation: shine 2s infinite;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }

//     .group:hover .animate-shine {
//       animation: shine 1.5s infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-[#1a1625] relative overflow-hidden py-32">
//       {/* Background */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Heading */}
//       <div className="text-center mb-20 relative z-10">
//         <h2 className="text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Main container with max width constraint */}
//       <div className="relative max-w-[90%] mx-auto">
//         {/* Portal frames */}
//         <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-28 h-20 z-20">
//           <div className="absolute inset-0 rounded-r-lg bg-[#1a1625]/80 backdrop-blur-sm">
//             <div className="absolute inset-0 border-r border-white/[0.05] rounded-r-lg" />
//           </div>
//         </div>

//         <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-28 h-20 z-20">
//           <div className="absolute inset-0 rounded-l-lg bg-[#1a1625]/80 backdrop-blur-sm">
//             <div className="absolute inset-0 border-l border-white/[0.05] rounded-l-lg" />
//           </div>
//         </div>

//         {/* Marquee wrapper */}
//         <div className="relative overflow-hidden mx-auto"
//              onMouseEnter={() => setIsHovered(true)} 
//              onMouseLeave={() => setIsHovered(false)}>
          
//           {/* Scrolling content */}
//           <div className="flex items-center justify-center animate-premium-scroll">
//             {logos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="mx-16 flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-32 h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                   {/* Glassmorphism effect */}
//                   <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
//                   {/* Hover glow effect */}
//                   <div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo placeholder */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                     <div className="w-24 h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

// final
// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-[#1a1625] relative overflow-hidden py-32">
//       {/* Background */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Heading */}
//       <div className="text-center mb-20 relative z-10">
//         <h2 className="text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Main container with max width constraint */}
//       <div className="relative max-w-[90%] mx-auto">
//         {/* Portal frames */}
//         <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-28 h-20 z-20">
//           {/* Modern layered portal design - Left */}
//           <div className="absolute inset-0 rounded-r-xl overflow-hidden">
//             {/* Base layer with subtle gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#1a1625]/90 via-[#1a1625]/50 to-transparent backdrop-blur-md" />
            
//             {/* Glass effect overlay */}
//             <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
            
//             {/* Modern border treatment */}
//             <div className="absolute inset-0">
//               <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
//               <div className="absolute inset-y-0 right-6 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
//               <div className="absolute inset-y-0 right-12 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
//             </div>

//             {/* Ambient light effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent opacity-80" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-white/20 to-transparent" />
//             <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-white/20 to-transparent" />
//           </div>
//         </div>

//         <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-28 h-20 z-20">
//           {/* Modern layered portal design - Right */}
//           <div className="absolute inset-0 rounded-l-xl overflow-hidden">
//             {/* Base layer with subtle gradient */}
//             <div className="absolute inset-0 bg-gradient-to-l from-[#1a1625]/90 via-[#1a1625]/50 to-transparent backdrop-blur-md" />
            
//             {/* Glass effect overlay */}
//             <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
            
//             {/* Modern border treatment */}
//             <div className="absolute inset-0">
//               <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
//               <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
//               <div className="absolute inset-y-0 left-12 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
//             </div>

//             {/* Ambient light effect */}
//             <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/5 via-purple-500/5 to-transparent opacity-80" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute top-0 left-0 h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />
//             <div className="absolute bottom-0 left-0 h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />
//           </div>
//         </div>

//         {/* Marquee wrapper */}
//         <div className="relative overflow-hidden mx-auto"
//              onMouseEnter={() => setIsHovered(true)} 
//              onMouseLeave={() => setIsHovered(false)}>
          
//           {/* Scrolling content */}
//           <div className="flex items-center justify-center animate-premium-scroll">
//             {logos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="mx-16 flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-32 h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                   {/* Glassmorphism effect */}
//                   <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
//                   {/* Hover glow effect */}
//                   <div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo placeholder */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                     <div className="w-24 h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#4F46E5' },
//     { id: 2, color: '#7C3AED' },
//     { id: 3, color: '#2563EB' },
//     { id: 4, color: '#4F46E5' },
//     { id: 5, color: '#7C3AED' },
//     { id: 6, color: '#2563EB' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#4F46E5' },
//     { id: 8, color: '#7C3AED' },
//     { id: 9, color: '#2563EB' },
//     { id: 10, color: '#4F46E5' },
//     { id: 11, color: '#7C3AED' },
//     { id: 12, color: '#2563EB' },
//   ];

//   return (
//     <div className="w-full bg-[#1a1625] relative overflow-hidden py-16 md:py-32">
//       {/* Background */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
//         <div className="absolute inset-0 backdrop-blur-3xl" />
//       </div>

//       {/* Heading */}
//       <div className="text-center mb-12 md:mb-20 relative z-10 px-4">
//         <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//       </div>

//       {/* Main container with max width constraint */}
//       <div className="relative max-w-[95%] md:max-w-[90%] mx-auto">
//         {/* Portal frames - Responsive sizes */}
//         <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-20 md:w-28 h-16 md:h-20 z-20">
//           {/* Modern layered portal design - Left */}
//           <div className="absolute inset-0 rounded-r-xl overflow-hidden">
//             {/* Base layer with subtle gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#1a1625]/90 via-[#1a1625]/50 to-transparent backdrop-blur-md" />
            
//             {/* Glass effect overlay */}
//             <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
            
//             {/* Modern border treatment - Responsive spacing */}
//             <div className="absolute inset-0">
//               <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
//               <div className="absolute inset-y-0 right-4 md:right-6 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
//               <div className="absolute inset-y-0 right-8 md:right-12 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
//             </div>

//             {/* Ambient light effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent opacity-80" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute top-0 right-0 h-px w-8 md:w-12 bg-gradient-to-l from-white/20 to-transparent" />
//             <div className="absolute bottom-0 right-0 h-px w-8 md:w-12 bg-gradient-to-l from-white/20 to-transparent" />
//           </div>
//         </div>

//         <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-20 md:w-28 h-16 md:h-20 z-20">
//           {/* Modern layered portal design - Right */}
//           <div className="absolute inset-0 rounded-l-xl overflow-hidden">
//             {/* Base layer with subtle gradient */}
//             <div className="absolute inset-0 bg-gradient-to-l from-[#1a1625]/90 via-[#1a1625]/50 to-transparent backdrop-blur-md" />
            
//             {/* Glass effect overlay */}
//             <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
            
//             {/* Modern border treatment - Responsive spacing */}
//             <div className="absolute inset-0">
//               <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
//               <div className="absolute inset-y-0 left-4 md:left-6 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
//               <div className="absolute inset-y-0 left-8 md:left-12 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
//             </div>

//             {/* Ambient light effect */}
//             <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/5 via-purple-500/5 to-transparent opacity-80" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute top-0 left-0 h-px w-8 md:w-12 bg-gradient-to-r from-white/20 to-transparent" />
//             <div className="absolute bottom-0 left-0 h-px w-8 md:w-12 bg-gradient-to-r from-white/20 to-transparent" />
//           </div>
//         </div>

//         {/* Marquee wrapper */}
//         <div className="relative overflow-hidden mx-auto"
//              onMouseEnter={() => setIsHovered(true)} 
//              onMouseLeave={() => setIsHovered(false)}>
          
//           {/* Scrolling content */}
//           <div className="flex items-center justify-center animate-premium-scroll">
//             {logos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="mx-8 md:mx-16 flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-24 md:w-32 h-12 md:h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                   {/* Glassmorphism effect */}
//                   <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
//                   {/* Hover glow effect */}
//                   <div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}33 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo placeholder */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                     <div className="w-20 md:w-24 h-6 md:h-8 rounded-md bg-gradient-to-r from-white/20 to-white/30" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     @keyframes gradient-x {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }

//     .animate-gradient-x {
//       background-size: 200% 200%;
//       animation: gradient-x 15s ease infinite;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#2563eb' },  // blue-600
//     { id: 2, color: '#1d4ed8' },  // blue-700
//     { id: 3, color: '#2563eb' },  // blue-600
//     { id: 4, color: '#3b82f6' },  // blue-500
//     { id: 5, color: '#2563eb' },  // blue-600
//     { id: 6, color: '#1d4ed8' },  // blue-700
//     // Duplicate set for seamless loop
//     { id: 7, color: '#2563eb' },
//     { id: 8, color: '#1d4ed8' },
//     { id: 9, color: '#2563eb' },
//     { id: 10, color: '#3b82f6' },
//     { id: 11, color: '#2563eb' },
//     { id: 12, color: '#1d4ed8' },
//   ];

//   return (
//     <div className="w-full bg-white relative overflow-hidden py-16 md:py-32">
//       {/* Heading */}
//       <div className="text-center mb-12 md:mb-20 relative z-10 px-4">
//         <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-500 mx-auto rounded-full" />
//       </div>

//       {/* Main container with max width constraint */}
//       <div className="relative max-w-[95%] md:max-w-[90%] mx-auto">
//         {/* Portal frames - Responsive sizes */}
//         <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-20 md:w-28 h-16 md:h-20 z-20">
//           {/* Modern layered portal design - Left */}
//           <div className="absolute inset-0 rounded-r-xl overflow-hidden">
//             {/* Base layer with fade to white */}
//             <div className="absolute inset-0 bg-gradient-to-r from-gray-100/80 via-white/50 to-transparent backdrop-blur-md" />
            
//             {/* Glass effect overlay */}
//             <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            
//             {/* Modern border treatment - Responsive spacing */}
//             <div className="absolute inset-0">
//               <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
//               <div className="absolute inset-y-0 right-4 md:right-6 w-px bg-gradient-to-b from-transparent via-blue-600/10 to-transparent" />
//               <div className="absolute inset-y-0 right-8 md:right-12 w-px bg-gradient-to-b from-transparent via-blue-400/10 to-transparent" />
//             </div>

//             {/* Ambient light effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-blue-100/30 to-transparent" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute top-0 right-0 h-px w-8 md:w-12 bg-gradient-to-l from-blue-200/30 to-transparent" />
//             <div className="absolute bottom-0 right-0 h-px w-8 md:w-12 bg-gradient-to-l from-blue-200/30 to-transparent" />
//           </div>
//         </div>

//         <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-20 md:w-28 h-16 md:h-20 z-20">
//           {/* Modern layered portal design - Right */}
//           <div className="absolute inset-0 rounded-l-xl overflow-hidden">
//             {/* Base layer with fade to white */}
//             <div className="absolute inset-0 bg-gradient-to-l from-gray-100/80 via-white/50 to-transparent backdrop-blur-md" />
            
//             {/* Glass effect overlay */}
//             <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            
//             {/* Modern border treatment - Responsive spacing */}
//             <div className="absolute inset-0">
//               <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
//               <div className="absolute inset-y-0 left-4 md:left-6 w-px bg-gradient-to-b from-transparent via-blue-600/10 to-transparent" />
//               <div className="absolute inset-y-0 left-8 md:left-12 w-px bg-gradient-to-b from-transparent via-blue-400/10 to-transparent" />
//             </div>

//             {/* Ambient light effect */}
//             <div className="absolute inset-0 bg-gradient-to-l from-blue-50/50 via-blue-100/30 to-transparent" />
            
//             {/* Subtle corner accents */}
//             <div className="absolute top-0 left-0 h-px w-8 md:w-12 bg-gradient-to-r from-blue-200/30 to-transparent" />
//             <div className="absolute bottom-0 left-0 h-px w-8 md:w-12 bg-gradient-to-r from-blue-200/30 to-transparent" />
//           </div>
//         </div>

//         {/* Marquee wrapper */}
//         <div className="relative overflow-hidden mx-auto"
//              onMouseEnter={() => setIsHovered(true)} 
//              onMouseLeave={() => setIsHovered(false)}>
          
//           {/* Scrolling content */}
//           <div className="flex items-center justify-center animate-premium-scroll">
//             {logos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="mx-8 md:mx-16 flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-24 md:w-32 h-12 md:h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                   {/* Glassmorphism effect */}
//                   <div className="absolute inset-0 bg-blue-50/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
//                   {/* Hover glow effect */}
//                   <div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}15 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo placeholder */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                     <div className="w-20 md:w-24 h-6 md:h-8 rounded-md bg-gradient-to-r from-gray-400/20 to-gray-300/30" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

// import React, { useState, useEffect, useRef } from 'react';

// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsIntersecting(entry.isIntersecting);
//     }, { threshold: 0.2, ...options });

//     const currentTarget = targetRef.current;
//     if (currentTarget) {
//       observer.observe(currentTarget);
//     }

//     return () => {
//       if (currentTarget) {
//         observer.unobserve(currentTarget);
//       }
//     };
//   }, [options]);

//   return [targetRef, isIntersecting];
// };

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const [sectionRef, isInView] = useIntersectionObserver();

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#2563eb' },
//     { id: 2, color: '#1d4ed8' },
//     { id: 3, color: '#2563eb' },
//     { id: 4, color: '#3b82f6' },
//     { id: 5, color: '#2563eb' },
//     { id: 6, color: '#1d4ed8' },
//     // Duplicate set for seamless loop
//     { id: 7, color: '#2563eb' },
//     { id: 8, color: '#1d4ed8' },
//     { id: 9, color: '#2563eb' },
//     { id: 10, color: '#3b82f6' },
//     { id: 11, color: '#2563eb' },
//     { id: 12, color: '#1d4ed8' },
//   ];

//   return (
//     <div ref={sectionRef} className="w-full bg-gradient-to-br from-blue-50 to-white relative overflow-hidden py-24">
//       {/* Premium grid background */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px]" />
      
//       {/* Diagonal accent strips */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -inset-x-full top-1/3 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent 
//                      transform -translate-y-1/2 -rotate-6" />
//         <div className="absolute -inset-x-full top-2/3 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent 
//                      transform -translate-y-1/2 rotate-6" />
//       </div>

//       {/* Heading */}
//       <div className={`text-center mb-16 relative z-10 px-4 transition-all duration-700 transform
//                     ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//           TRUSTED BY INDUSTRY LEADERS
//         </span>
//         <h2 className="text-4xl font-bold text-gray-900 mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto transform origin-left transition-transform duration-1000 
//                       ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//       </div>

//       {/* Main container with blur transitions */}
//       <div className="relative max-w-[90%] mx-auto">
//         {/* Left blur gradient */}
//         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        
//         {/* Right blur gradient */}
//         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

//         {/* Marquee wrapper */}
//         <div className="relative overflow-hidden"
//              onMouseEnter={() => setIsHovered(true)} 
//              onMouseLeave={() => setIsHovered(false)}>
          
//           {/* Scrolling content */}
//           <div className={`flex items-center justify-center animate-premium-scroll transition-all duration-700
//                         ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             {logos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="mx-16 flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-32 h-14 flex items-center justify-center">
//                   {/* Hover glow effect */}
//                   <div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}15 0%, transparent 70%)`,
//                     }}
//                   />

//                   {/* Logo placeholder */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center">
//                     <div className="w-24 h-8 rounded-md bg-gradient-to-r from-gray-400/40 to-gray-300/50 
//                                 group-hover:from-blue-500/40 group-hover:to-blue-400/50 transition-all duration-500" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 30s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;
// import React, { useState, useEffect } from 'react';

// const PremiumMarquee = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isHovered) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isHovered]);

//   const logos = [
//     { id: 1, color: '#2563eb' },  // blue-600
//     { id: 2, color: '#1d4ed8' },  // blue-700
//     { id: 3, color: '#2563eb' },  // blue-600
//     { id: 4, color: '#3b82f6' },  // blue-500
//     { id: 5, color: '#2563eb' },  // blue-600
//     { id: 6, color: '#1d4ed8' },  // blue-700
//     // Duplicate set for seamless loop
//     { id: 7, color: '#2563eb' },
//     { id: 8, color: '#1d4ed8' },
//     { id: 9, color: '#2563eb' },
//     { id: 10, color: '#3b82f6' },
//     { id: 11, color: '#2563eb' },
//     { id: 12, color: '#1d4ed8' },
//   ];

//   return (
//     <div className="w-full bg-white relative overflow-hidden py-16 md:py-32">
//       {/* Heading */}
//       <div className="text-center mb-12 md:mb-20 relative z-10 px-4">
//         <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">
//           Powering Next-Gen Solutions
//         </h2>
//         <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-500 mx-auto rounded-full" />
//       </div>

//       {/* Main container with max width constraint */}
//       <div className="relative max-w-[70%] mx-auto">
//         {/* Shadow edges */}
//         <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
//         <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        
//         {/* Marquee wrapper with increased padding */}
//         <div 
//           className="relative overflow-hidden mx-auto px-20"
//           onMouseEnter={() => setIsHovered(true)} 
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Scrolling content */}
//           <div className="flex items-center justify-center animate-premium-scroll">
//             {logos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="mx-8 md:mx-16 flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-24 md:w-32 h-12 md:h-14 flex items-center justify-center overflow-hidden rounded-xl">
//                   {/* Glassmorphism effect */}
//                   <div className="absolute inset-0 bg-blue-50/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
//                   {/* Hover glow effect */}
//                   <div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}15 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo placeholder */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
//                     <div className="w-20 md:w-24 h-6 md:h-8 rounded-md bg-gradient-to-r from-gray-400/20 to-gray-300/30" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Animation styles
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes premium-scroll {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }

//     .animate-premium-scroll {
//       animation: premium-scroll 25s linear infinite;
//     }

//     .animate-premium-scroll:hover {
//       animation-play-state: paused;
//     }
//   `}</style>
// );

// const TrustedSection = () => (
//   <>
//     <GlobalStyles />
//     <PremiumMarquee />
//   </>
// );

// export default TrustedSection;

import React, { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const PremiumMarquee = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [sectionRef, isInView] = useIntersectionObserver();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered) {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const logos = [
    { id: 1, color: '#2563eb' },
    { id: 2, color: '#1d4ed8' },
    { id: 3, color: '#2563eb' },
    { id: 4, color: '#3b82f6' },
    { id: 5, color: '#2563eb' },
    { id: 6, color: '#1d4ed8' },
    // Duplicate set for seamless loop
    { id: 7, color: '#2563eb' },
    { id: 8, color: '#1d4ed8' },
    { id: 9, color: '#2563eb' },
    { id: 10, color: '#3b82f6' },
    { id: 11, color: '#2563eb' },
    { id: 12, color: '#1d4ed8' },
  ];

  return (
    <div ref={sectionRef} className="w-full bg-white  relative overflow-hidden py-16 md:py-32">
      


      <div className="absolute inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Secondary grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
        
        {/* Top fade with white */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/95 to-transparent" />
        
        {/* Bottom fade with white */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
        {/* Soft radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
        
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>
    
      {/* Heading */}
      <div className={`text-center mb-12 md:mb-20 relative z-10 px-4 transition-all duration-700 transform
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
          TRUSTED BY INDUSTRY LEADERS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Powering Next-Gen Solutions
        </h2>
        <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto transform origin-left transition-transform duration-1000 
                      ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>

      {/* Main container with max width constraint */}
      <div className="relative max-w-[70%] mx-auto">
        {/* Shadow edges - with our premium blur */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-50 via-blue-50/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-50 via-blue-50/80 to-transparent z-10" />
        
        {/* Marquee wrapper */}
        <div 
          className="relative overflow-hidden mx-auto px-20"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scrolling content */}
          <div className={`flex items-center justify-center animate-premium-scroll
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {logos.map((logo, index) => (
              <div
                key={`logo-${logo.id}-${index}`}
                className="mx-8 md:mx-16 flex-shrink-0 group relative"
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="relative w-24 md:w-32 h-12 md:h-14 flex items-center justify-center overflow-hidden rounded-xl">
                  {/* Premium glassmorphism effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-blue-50/10 backdrop-blur-sm 
                               opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}15 0%, transparent 60%)`,
                    }}
                  />

                  {/* Logo placeholder with premium gradient */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-20 md:w-24 h-6 md:h-8 rounded-md bg-gradient-to-r from-blue-400/20 to-blue-300/30 
                                group-hover:from-blue-500/30 group-hover:to-blue-400/40 transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Animation styles
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes premium-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-premium-scroll {
      animation: premium-scroll 25s linear infinite;
    }

    .animate-premium-scroll:hover {
      animation-play-state: paused;
    }
  `}</style>
);

const TrustedSection = () => (
  <>
    <GlobalStyles />
    <PremiumMarquee />
  </>
);

export default TrustedSection;
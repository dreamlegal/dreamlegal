// "use client"

// const logos = [
//   { 
//     id: 1, 
//     color: '#2563eb',
//     imageUrl: "clients/c1.png", 
//     alt: 'Company 1'
//   },
//   { 
//     id: 2, 
//     color: '#1d4ed8',
//     imageUrl: 'clients/c6.jpg',
//     alt: 'Company 2'
//   },
//   { 
//     id: 3, 
//     color: '#2563eb',
//     imageUrl: 'clients/c3.webp',
//     alt: 'Company 3'
//   },
//   { 
//     id: 4, 
//     color: '#3b82f6',
//     imageUrl: 'clients/c4.jpg',
//     alt: 'Company 4'
//   },
//   { 
//     id: 5, 
//     color: '#2563eb',
//     imageUrl: 'clients/c5.jpg',
//     alt: 'Company 5'
//   },
// ]
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


//   const allLogos = [...logos, ...logos];

//   return (
//     <div ref={sectionRef} className="w-full bg-white relative overflow-hidden py-10 md:py-16 lg:py-32">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
//       </div>
    
//       <div className={`text-center mb-8 md:mb-12 lg:mb-20 relative z-10 px-4 transition-all duration-700 transform
//             ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         <span className="block text-xs md:text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//           TRUSTED BY INDUSTRY LEADERS
//         </span>
//         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//           Powering Legal Teams Who Aim Efficiency
//         </h2>
//         <div className={`w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto transform origin-left transition-transform duration-1000 
//                       ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//       </div>

//       <div className="relative w-full md:max-w-[90%] lg:max-w-[80%] mx-auto">
//         {/* Left fade */}
//         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//         {/* Right fade */}
//         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
//         <div 
//           className="relative overflow-hidden mx-auto px-4"
//           onMouseEnter={() => setIsHovered(true)} 
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div className="flex gap-8 infinite-scroll">
//             {allLogos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 <div className="relative w-16 md:w-24 lg:w-32 h-8 md:h-12 lg:h-14 flex items-center justify-center overflow-hidden rounded-lg md:rounded-xl">
//                   {/* Enhanced hover effect - Glowing background */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-transparent" />
                  
//                   {/* Enhanced hover effect - Moving gradient */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                     <div className="absolute inset-0 animate-gradient-xy bg-gradient-to-br from-blue-400/20 via-transparent to-blue-600/20" />
//                   </div>
                  
//                   {/* Interactive glow effect */}
//                   <div
//                     className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}30 0%, transparent 70%)`,
//                     }}
//                   />

//                   {/* Logo image */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center opacity-100 transition-all duration-500 group-hover:scale-110">
//                     <img 
//                       src={logo.imageUrl}
//                       alt={logo.alt}
//                       className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:brightness-110"
//                     />
//                   </div>

//                   {/* Subtle border glow */}
//                   <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-400/30 transition-all duration-500" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GlobalStyles = () => (
//   <style jsx global>{`
//     .infinite-scroll {
//       animation: scroll 30s linear infinite;
//     }

//     @keyframes scroll {
//       0% {
//         transform: translateX(0);
//       }
//       100% {
//         transform: translateX(-50%);
//       }
//     }

//     .infinite-scroll:hover {
//       animation-play-state: paused;
//     }

//     @keyframes gradient-xy {
//       0% {
//         transform: translate(0, 0) rotate(0deg);
//       }
//       50% {
//         transform: translate(5%, 5%) rotate(180deg);
//       }
//       100% {
//         transform: translate(0, 0) rotate(360deg);
//       }
//     }

//     .animate-gradient-xy {
//       animation: gradient-xy 15s ease infinite;
//     }

//     @media (min-width: 768px) {
//       .infinite-scroll {
//         animation: scroll 40s linear infinite;
//       }
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

// developer final 
// "use client"

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

// const logos = [
//   { 
//     id: 1, 
//     color: '#2563eb',
//     imageUrl: "clients/c1.png", 
//     alt: 'Company 1'
//   },
//   { 
//     id: 2, 
//     color: '#1d4ed8',
//     imageUrl: 'clients/c6.jpg',
//     alt: 'Company 2'
//   },
//   { 
//     id: 3, 
//     color: '#2563eb',
//     imageUrl: 'clients/c3.webp',
//     alt: 'Company 3'
//   },
//   { 
//     id: 4, 
//     color: '#3b82f6',
//     imageUrl: 'clients/c4.jpg',
//     alt: 'Company 4'
//   },
//   { 
//     id: 5, 
//     color: '#2563eb',
//     imageUrl: 'clients/c5.jpg',
//     alt: 'Company 5'
//   }
// ];

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

//   const allLogos = [...logos, ...logos];

//   return (
//     <div ref={sectionRef} className="w-full bg-white relative overflow-hidden py-10 md:py-16 lg:py-32">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
//       </div>
    
//       <div className={`text-center mb-8 md:mb-12 lg:mb-20 relative z-10 px-4 transition-all duration-700 transform
//             ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         <span className="block text-xs md:text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//           TRUSTED BY INDUSTRY LEADERS
//         </span>
//         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//           Powering Legal Teams Who Aim Efficiency
//         </h2>
//         <div className={`w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto transform origin-left transition-transform duration-1000 
//                       ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//       </div>

//       <div className="relative w-full md:max-w-[90%] lg:max-w-[80%] mx-auto">
//         {/* Left fade */}
//         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//         {/* Right fade */}
//         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
//         <div 
//           className="relative overflow-hidden mx-auto px-4"
//           onMouseEnter={() => setIsHovered(true)} 
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div className="flex gap-8 infinite-scroll">
//             {allLogos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="flex-shrink-0 group relative"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
//                 }}
//               >
//                 <div className="relative w-16 md:w-24 lg:w-32 h-8 md:h-12 lg:h-14 flex items-center justify-center overflow-hidden rounded-lg md:rounded-xl">
//                   {/* Premium glass effect background */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-white/30 to-blue-600/20 backdrop-blur-sm" />
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
//                   </div>
                  
//                   {/* Animated gradient border */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                     <div className="absolute inset-0 animate-border-flow rounded-xl" />
//                   </div>
                  
//                   {/* Interactive spotlight effect */}
//                   <div
//                     className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}40 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo container with premium effects */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-110">
//                     {/* Glow effect behind logo */}
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/20 to-blue-600/20 blur-md" />
//                     </div>
                    
//                     {/* Logo image with enhanced effects */}
//                     <img 
//                       src={logo.imageUrl}
//                       alt={logo.alt}
//                       className="w-full h-full object-contain p-2 transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
//                     />
//                   </div>

//                   {/* Premium border effect */}
//                   <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-400/20" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GlobalStyles = () => (
//   <style jsx global>{`
//     .infinite-scroll {
//       animation: scroll 30s linear infinite;
//     }

//     @keyframes scroll {
//       0% {
//         transform: translateX(0);
//       }
//       100% {
//         transform: translateX(-50%);
//       }
//     }

//     .infinite-scroll:hover {
//       animation-play-state: paused;
//     }

//     @keyframes border-flow {
//       0% {
//         background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
//         background-size: 200% 100%;
//         background-position: 100% 0;
//       }
//       50% {
//         background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent);
//         background-size: 200% 100%;
//         background-position: 0 0;
//       }
//       100% {
//         background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
//         background-size: 200% 100%;
//         background-position: -100% 0;
//       }
//     }

//     .animate-border-flow {
//       animation: border-flow 2s ease-in-out infinite;
//     }

//     @media (min-width: 768px) {
//       .infinite-scroll {
//         animation: scroll 40s linear infinite;
//       }
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

// "use client"

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

// const logos = [
//   { 
//     id: 1, 
//     color: '#2563eb',
//     imageUrl: "clients/c1.png", 
//     alt: 'Company 1'
//   },
//   { 
//     id: 2, 
//     color: '#1d4ed8',
//     imageUrl: 'clients/c6.jpg',
//     alt: 'Company 2'
//   },
//   { 
//     id: 3, 
//     color: '#2563eb',
//     imageUrl: 'clients/c3.webp',
//     alt: 'Company 3'
//   },
//   { 
//     id: 4, 
//     color: '#3b82f6',
//     imageUrl: 'clients/c4.jpg',
//     alt: 'Company 4'
//   },
//   { 
//     id: 5, 
//     color: '#2563eb',
//     imageUrl: 'clients/c5.jpg',
//     alt: 'Company 5'
//   }
// ];

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

//   const allLogos = [...logos, ...logos];

//   return (
//     <div ref={sectionRef} className="w-full bg-white relative overflow-hidden py-10 md:py-16 lg:py-32">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
//       </div>
    
//       <div className={`text-center mb-8 md:mb-12 lg:mb-20 relative z-10 px-4 transition-all duration-700 transform
//             ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         <span className="block text-xs md:text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//           TRUSTED BY INDUSTRY LEADERS
//         </span>
//         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//           Powering Legal Teams Who Aim Efficiency
//         </h2>
//         <div className={`w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto transform origin-left transition-transform duration-1000 
//                       ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//       </div>

//       <div className="relative w-full max-w-screen-lg mx-auto">
//         {/* Left fade */}
//         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//         {/* Right fade */}
//         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
//         <div 
//           className="relative overflow-hidden mx-auto px-4 md:px-12"
//           onMouseEnter={() => setIsHovered(true)} 
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div className="flex infinite-scroll">
//             {allLogos.map((logo, index) => (
//               <div
//                 key={`logo-${logo.id}-${index}`}
//                 className="flex-shrink-0 group relative px-12 md:px-16 lg:px-20"
//                 style={{
//                   transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//                   transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
//                 }}
//               >
//                 <div className="relative w-20 md:w-28 lg:w-36 h-12 md:h-16 lg:h-20 flex items-center justify-center overflow-hidden rounded-xl">
//                   {/* Premium glass effect background */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-white/30 to-blue-600/20 backdrop-blur-sm" />
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
//                   </div>
                  
//                   {/* Animated gradient border */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                     <div className="absolute inset-0 animate-border-flow rounded-xl" />
//                   </div>
                  
//                   {/* Interactive spotlight effect */}
//                   <div
//                     className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${logo.color}40 0%, transparent 60%)`,
//                     }}
//                   />

//                   {/* Logo container with premium effects */}
//                   <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-110">
//                     {/* Glow effect behind logo */}
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/20 to-blue-600/20 blur-md" />
//                     </div>
                    
//                     {/* Logo image with enhanced effects */}
//                     <img 
//                       src={logo.imageUrl}
//                       alt={logo.alt}
//                       className="w-full h-full object-contain p-2 transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
//                     />
//                   </div>

//                   {/* Premium border effect */}
//                   <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-400/20" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GlobalStyles = () => (
//   <style jsx global>{`
//     .infinite-scroll {
//       animation: scroll 30s linear infinite;
//     }

//     @keyframes scroll {
//       0% {
//         transform: translateX(0);
//       }
//       100% {
//         transform: translateX(-50%);
//       }
//     }

//     .infinite-scroll:hover {
//       animation-play-state: paused;
//     }

//     @keyframes border-flow {
//       0% {
//         background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
//         background-size: 200% 100%;
//         background-position: 100% 0;
//       }
//       50% {
//         background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent);
//         background-size: 200% 100%;
//         background-position: 0 0;
//       }
//       100% {
//         background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
//         background-size: 200% 100%;
//         background-position: -100% 0;
//       }
//     }

//     .animate-border-flow {
//       animation: border-flow 2s ease-in-out infinite;
//     }

//     @media (min-width: 768px) {
//       .infinite-scroll {
//         animation: scroll 40s linear infinite;
//       }
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
"use client"

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

const logos = [
  { 
    id: 1, 
    color: '#2563eb',
    imageUrl: "clients/c1.png", 
    alt: 'Company 1'
  },
  { 
    id: 2, 
    color: '#1d4ed8',
    imageUrl: 'clients/c6.jpg',
    alt: 'Company 2'
  },
  { 
    id: 3, 
    color: '#2563eb',
    imageUrl: 'clients/c3.webp',
    alt: 'Company 3'
  },
  { 
    id: 4, 
    color: '#3b82f6',
    imageUrl: 'clients/c4.jpg',
    alt: 'Company 4'
  },
  { 
    id: 5, 
    color: '#2563eb',
    imageUrl: 'clients/c5.jpg',
    alt: 'Company 5'
  }
];

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

  const allLogos = [...logos, ...logos];

  return (
    <div ref={sectionRef} className="w-full bg-white relative overflow-hidden py-10 md:py-16 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
      </div>
    
      <div className={`text-center mb-8 md:mb-12 lg:mb-20 relative z-10 px-4 transition-all duration-700 transform
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="block text-xs md:text-sm font-semibold text-blue-600 mb-2 tracking-wider">
          TRUSTED BY INDUSTRY LEADERS
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Powering Legal Teams Who Aim Efficiency
        </h2>
        <div className={`w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto transform origin-left transition-transform duration-1000 
                      ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>

      <div className="relative w-full max-w-screen-lg mx-auto">
        {/* Left fade */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div 
          className="relative overflow-hidden mx-auto px-4 md:px-12"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex infinite-scroll">
            {allLogos.map((logo, index) => (
              <div
                key={`logo-${logo.id}-${index}`}
                className="flex-shrink-0 group relative px-12 md:px-16 lg:px-20"
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="relative w-20 md:w-28 lg:w-36 h-12 md:h-16 lg:h-20 flex items-center justify-center overflow-hidden rounded-xl">
                  {/* White center radial background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-100/20 backdrop-blur-sm" />
                  </div>

                  {/* Interactive spotlight effect */}
                  <div
                    className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, white 0%, rgba(239, 246, 255, 0.8) 30%, ${logo.color}20 100%)`,
                    }}
                  />

                  {/* Logo container */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-110">
                    {/* White radial glow behind logo */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,rgba(239,246,255,0.6)_50%,transparent_100%)] blur-sm" />
                    </div>

                    {/* Logo image */}
                    <img 
                      src={logo.imageUrl}
                      alt={logo.alt}
                      className="w-full h-full object-contain p-2 transition-all duration-500 group-hover:brightness-105"
                    />
                  </div>

                  {/* Premium border effect */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-200/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-100/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalStyles = () => (
  <style jsx global>{`
    .infinite-scroll {
      animation: scroll 30s linear infinite;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .infinite-scroll:hover {
      animation-play-state: paused;
    }

    @media (min-width: 768px) {
      .infinite-scroll {
        animation: scroll 40s linear infinite;
      }
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
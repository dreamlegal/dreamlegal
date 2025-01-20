"use client";

// import {  Zap, Shield, BarChart2, Globe } from "lucide-react";



// import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Sparkles, ArrowRight, Code, LineChart, Workflow } from 'lucide-react';
// import VideoPlayer from "./VideoPlayer";

// const ResponsiveHero = () => {
//   // Animation variant for floating elements
//   const floatingAnimation = {
//     initial: { y: 0 },
//     animate: (delay) => ({
//       y: [0, -10, 0],
//       transition: {
//         delay,
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     })
//   };

//   // Updated decorative elements with better mobile positioning
//   const decorativeElements = [
//     {
//       Icon: Shield,
//       color: "from-blue-400/20 to-blue-600/20",
//       position: "left-4 top-40 sm:left-12 sm:top-32",
//       size: "w-10 h-10 sm:w-16 sm:h-16",
//       delay: 0
//     },
//     {
//       Icon: BarChart2,
//       color: "from-blue-500/20 to-blue-700/20",
//       position: "left-8 bottom-32 sm:left-24 sm:bottom-48",
//       size: "w-12 h-12 sm:w-20 sm:h-20",
//       delay: 1
//     },
//     {
//       Icon: Zap,
//       color: "from-blue-600/20 to-blue-800/20",
//       position: "right-6 top-48 sm:right-16 sm:top-40",
//       size: "w-12 h-12 sm:w-20 sm:h-20",
//       delay: 2
//     },
//     {
//       Icon: Globe,
//       color: "from-blue-500/20 to-blue-700/20",
//       position: "right-8 bottom-28 sm:right-28 sm:bottom-44",
//       size: "w-10 h-10 sm:w-16 sm:h-16",
//       delay: 3
//     }
//   ];

//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.muted = false; // Autoplay requires muted for most browsers
//       videoElement.play().catch(error => {
//         console.error('Autoplay was prevented:', error);
//       });
//     }
//   }, []);

//   const [email, setEmail] = useState('');
//     const [isInputFocused, setIsInputFocused] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [status, setStatus] = useState({ type: '', message: '' });
  
//     const FloatingElement = ({ children, className, delay = 0 }) => (
//       <div className={className}>
//         {children}
//       </div>
//     );
  
//     const validateEmail = (email) => {
//       return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
//     };
  
//     const handleSubmit = async () => {
//       // Reset status
//       setStatus({ type: '', message: '' });
  
//       // Validate email
//       if (!validateEmail(email)) {
//         setStatus({ 
//           type: 'error', 
//           message: 'Please enter a valid email address' 
//         });
//         return;
//       }
  
//       setIsLoading(true);
//       console.log('Email:', email);
//       setIsLoading(false);
  
     
//     };


//   return (
//     <>
//       {/* Hero Section with navbar spacing */}
//       <section className="w-full min-h-screen pt-20 sm:pt-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
//         {/* Background Elements */}
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
//         <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_top_right,#60A5FA_0%,transparent_50%)]" />
//         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(at_top_left,#93C5FD_0%,transparent_50%)]" />
//         <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] animate-grain" />

//         {/* Container for main content and decorative elements */}
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//           {/* Decorative Icons - Now within container but positioned absolutely */}
//           {decorativeElements.map(({ Icon, color, position, size, delay }, index) => (
//             <motion.div
//               key={index}
//               className={`absolute ${position} pointer-events-none`}
//               variants={floatingAnimation}
//               initial="initial"
//               animate="animate"
//               custom={delay}
//             >
//               <div className={`relative ${size}`}>
//                 <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl`} />
//                 <div className="relative bg-white/80 rounded-2xl p-4 backdrop-blur-sm border border-blue-100">
//                   <Icon className="w-full h-full text-blue-600" />
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {/* Main Content */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10"
//           >
//             <span className="text-xs sm:text-sm font-semibold text-blue-600 mb-4 tracking-wider">
//             ENTERPRISE SOLUTIONS
//             </span>
            
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-4 sm:mb-6 px-4"
//             >
//               AI - Powered 
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
//                 {" "}Legal Ops Intelligence Platform
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
//             >
//              Supercharge your legal function with improved legal processes, innovative tech solutions and measured business KPIs
//             </motion.p>

          
//               <FloatingElement delay={0.3} className="max-w-xl mx-auto mt-8 sm:mt-12 px-4">
//                         <div 
//                           className={`flex flex-col sm:flex-row gap-3 transition-all duration-200 
//                                      ${isInputFocused ? 'transform -translate-y-1' : ''}`}
//                         >
//                           <div className="relative flex-1">
//                             <input
//                               type="email"
//                               value={email}
//                               onChange={(e) => setEmail(e.target.value)}
//                               onFocus={() => setIsInputFocused(true)}
//                               onBlur={() => setIsInputFocused(false)}
//                               placeholder="Enter your work email"
//                               className={`w-full px-6 py-4 bg-white rounded-xl text-gray-700 placeholder-gray-400
//                                        border-2 ${status.type === 'error' ? 'border-red-300' : 'border-blue-100'} 
//                                        focus:border-blue-400 outline-none
//                                        shadow-sm hover:shadow-md focus:shadow-lg
//                                        transition-all duration-200`}
//                             />
//                             {isInputFocused && (
//                               <div className="absolute -bottom-2 left-6 text-xs text-blue-600 bg-white px-2">
//                                 Work email address
//                               </div>
//                             )}
//                           </div>
//                           <button 
//                             onClick={handleSubmit}
//                             disabled={isLoading}
//                             className={`group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-medium
//                                      ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}
//                                      shadow-sm hover:shadow-md
//                                      transition-all duration-200 flex items-center justify-center gap-2`}
//                           >
//                             {isLoading ? (
//                               <motion.div
//                                 animate={{ rotate: 360 }}
//                                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                                 className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                               />
//                             ) : (
//                               <>
//                                 Request Demo
//                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                               </>
//                             )}
//                             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-300 
//                                          opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
//                           </button>
//                         </div>
            
//                         {/* Status Message */}
//                         {status.message && (
//                           <div className={`mt-3 text-sm ${
//                               status.type === 'error' ? 'text-red-500' : 'text-green-500'
//                             }`}
//                           >
//                             {status.message}
//                           </div>
//                         )}
//               </FloatingElement>
//           </motion.div>
//         </div>
//       </section>


//     </>
//   );
// };

// export default ResponsiveHero;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Shield, BarChart2, Zap, Globe } from "lucide-react";

// const ResponsiveHero = () => {
//   const [email, setEmail] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [status, setStatus] = useState({ type: '', message: '' });

//   // Animation variant for floating elements
//   const floatingAnimation = {
//     initial: { y: 0 },
//     animate: (delay) => ({
//       y: [0, -10, 0],
//       transition: {
//         delay,
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     })
//   };

//   const decorativeElements = [
//     {
//       Icon: Shield,
//       color: "from-blue-400/20 to-blue-600/20",
//       position: "left-4 top-40 sm:left-12 sm:top-32",
//       size: "w-10 h-10 sm:w-16 sm:h-16",
//       delay: 0
//     },
//     {
//       Icon: BarChart2,
//       color: "from-blue-500/20 to-blue-700/20",
//       position: "left-8 bottom-32 sm:left-24 sm:bottom-48",
//       size: "w-12 h-12 sm:w-20 sm:h-20",
//       delay: 1
//     },
//     {
//       Icon: Zap,
//       color: "from-blue-600/20 to-blue-800/20",
//       position: "right-6 top-48 sm:right-16 sm:top-40",
//       size: "w-12 h-12 sm:w-20 sm:h-20",
//       delay: 2
//     },
//     {
//       Icon: Globe,
//       color: "from-blue-500/20 to-blue-700/20",
//       position: "right-8 bottom-28 sm:right-28 sm:bottom-44",
//       size: "w-10 h-10 sm:w-16 sm:h-16",
//       delay: 3
//     }
//   ];

//   const validateEmail = (email) => {
//     return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
//   };

//   const handleSubmit = async () => {
//     setStatus({ type: '', message: '' });
    
//     if (!validateEmail(email)) {
//       setStatus({ 
//         type: 'error', 
//         message: 'Please enter a valid email address' 
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Add your email submission logic here
//       console.log('Email submitted:', email);
//     } catch (error) {
//       setStatus({
//         type: 'error',
//         message: 'Failed to submit email. Please try again.'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="w-full min-h-screen pt-20 sm:pt-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
//       <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_top_right,#60A5FA_0%,transparent_50%)]" />
//       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(at_top_left,#93C5FD_0%,transparent_50%)]" />
//       <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] animate-grain" />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Decorative Icons */}
//         {decorativeElements.map(({ Icon, color, position, size, delay }, index) => (
//           <motion.div
//             key={index}
//             className={`absolute ${position} pointer-events-none`}
//             variants={floatingAnimation}
//             initial="initial"
//             animate="animate"
//             custom={delay}
//           >
//             <div className={`relative ${size}`}>
//               <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl`} />
//               <div className="relative bg-white/80 rounded-2xl p-4 backdrop-blur-sm border border-blue-100">
//                 <Icon className="w-full h-full text-blue-600" />
//               </div>
//             </div>
//           </motion.div>
//         ))}

//         {/* Main Content */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10"
//         >
//           <span className="text-xs sm:text-sm font-semibold text-blue-600 mb-6 tracking-wider">
//             ENTERPRISE SOLUTIONS
//           </span>
          
//           <div className="flex flex-col gap-2 mb-6">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
//             >
//               AI - Powered
//             </motion.h1>
            
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
//             >
//               Legal Ops Intelligence Platform
//             </motion.h1>
//           </div>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-12"
//           >
//             Supercharge your legal function with improved legal processes, innovative tech solutions and measured business KPIs
//           </motion.p>

//           {/* Email Input Section */}
//           <div className="max-w-xl w-full mx-auto px-4">
//             <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-200 ${isInputFocused ? 'transform -translate-y-1' : ''}`}>
//               <div className="relative flex-1">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   placeholder="Enter your work email"
//                   className="w-full px-6 py-4 bg-white rounded-xl text-gray-700 placeholder-gray-400
//                            border-2 border-blue-100 focus:border-blue-400 outline-none
//                            shadow-sm hover:shadow-md focus:shadow-lg
//                            transition-all duration-200"
//                 />
//                 {isInputFocused && (
//                   <div className="absolute -bottom-2 left-6 text-xs text-blue-600 bg-white px-2">
//                     Work email address
//                   </div>
//                 )}
//               </div>
              
//               <button 
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-medium
//                          hover:bg-blue-700 shadow-sm hover:shadow-md
//                          transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                   />
//                 ) : (
//                   <>
//                     Request Demo
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </button>
//             </div>
            
//             {status.message && (
//               <div className={`mt-3 text-sm ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
//                 {status.message}
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ResponsiveHero;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, BarChart2, Zap, Globe } from "lucide-react";

const ResponsiveHero = () => {
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Animation variant for floating elements
  const floatingAnimation = {
    initial: { y: 0 },
    animate: (delay) => ({
      y: [0, -10, 0],
      transition: {
        delay,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const decorativeElements = [
    {
      Icon: Shield,
      color: "from-blue-400/20 to-blue-600/20",
      position: "left-4 top-40 sm:left-12 sm:top-32",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      delay: 0
    },
    {
      Icon: BarChart2,
      color: "from-blue-500/20 to-blue-700/20",
      position: "left-8 bottom-32 sm:left-24 sm:bottom-48",
      size: "w-12 h-12 sm:w-20 sm:h-20",
      delay: 1
    },
    {
      Icon: Zap,
      color: "from-blue-600/20 to-blue-800/20",
      position: "right-6 top-48 sm:right-16 sm:top-40",
      size: "w-12 h-12 sm:w-20 sm:h-20",
      delay: 2
    },
    {
      Icon: Globe,
      color: "from-blue-500/20 to-blue-700/20",
      position: "right-8 bottom-28 sm:right-28 sm:bottom-44",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      delay: 3
    }
  ];

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    setStatus({ type: '', message: '' });
    
    if (!validateEmail(email)) {
      setStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address' 
      });
      return;
    }

    setIsLoading(true);
    try {
      // Add your email submission logic here
      console.log('Email submitted:', email);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to submit email. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen pt-20 sm:pt-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_top_right,#60A5FA_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(at_top_left,#93C5FD_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] animate-grain" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Icons */}
        {decorativeElements.map(({ Icon, color, position, size, delay }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} pointer-events-none`}
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            custom={delay}
          >
            <div className={`relative ${size}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl`} />
              <div className="relative bg-white/80 rounded-2xl p-4 backdrop-blur-sm border border-blue-100">
                <Icon className="w-full h-full text-blue-600" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10"
        >
          <span className="text-xs sm:text-sm font-semibold text-blue-600 mb-6 tracking-wider">
            ENTERPRISE SOLUTIONS
          </span>
          
          <div className="flex flex-col gap-3 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
            >
              AI - Powered
            </motion.h1>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 leading-normal pb-2"
            >
              Legal Ops Intelligence Platform
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Supercharge your legal function with improved legal processes, innovative tech solutions and measured business KPIs
          </motion.p>

          {/* Email Input Section */}
          <div className="max-w-xl w-full mx-auto px-4">
            <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-200 ${isInputFocused ? 'transform -translate-y-1' : ''}`}>
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 bg-white rounded-xl text-gray-700 placeholder-gray-400
                           border-2 border-blue-100 focus:border-blue-400 outline-none
                           shadow-sm hover:shadow-md focus:shadow-lg
                           transition-all duration-200"
                />
                {isInputFocused && (
                  <div className="absolute -bottom-2 left-6 text-xs text-blue-600 bg-white px-2">
                    Work email address
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-medium
                         hover:bg-blue-700 shadow-sm hover:shadow-md
                         transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Request Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            {status.message && (
              <div className={`mt-3 text-sm ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {status.message}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResponsiveHero;
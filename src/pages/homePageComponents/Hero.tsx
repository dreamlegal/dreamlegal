"use client";

// // import React, { useState } from "react";
// // import Search from "@/components/animated-ui/Search";
// // import FilterCategory from "@/components/animated-ui/FilterCategory";
// // import { useRouter } from "next/navigation";
// // import { motion } from "framer-motion";
// // import { PlayCircle } from "lucide-react";

// // // Define placeholders here and pass them as props
// // const searchPlaceholders = [
// //   "Contract Management",
// //   "Case Management",
// //   "Compliance Management",
// // ];

// // function Hero() {
// //   const router = useRouter();
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// //   const handleChange = (e: React.ChangeEvent) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const onSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     router.push("/directory");
// //     console.log("submitted");
// //   };

// //   return (
// //     <>
// //       {/* Original Hero Section with Animations */}
// //       <section className="w-full min-h-[85vh] relative">
// //         {/* Animated background elements */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 0.1 }}
// //             transition={{ duration: 1 }}
// //             className="absolute top-10 left-[10%] w-[40rem] h-[40rem] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px]"
// //           />
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 0.1 }}
// //             transition={{ duration: 1, delay: 0.2 }}
// //             className="absolute bottom-10 right-[10%] w-[30rem] h-[30rem] bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px]"
// //           />
// //         </div>

// //         {/* Main content */}
// //         <div className="container mx-auto px-4 relative z-10">
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="flex flex-col items-center justify-center min-h-[85vh] text-center"
// //           >
// //             <motion.h1
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-6"
// //             >
// //               Discover technology
// //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
// //                 {" "}tailored for legal professionals
// //               </span>
// //             </motion.h1>

// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //               className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
// //             >
// //               Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
// //             </motion.p>

// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //               className="w-full max-w-2xl mx-auto space-y-4"
// //             >
// //               {/* Pass placeholders as a prop */}
// //               <Search
// //                 value={searchTerm}
// //                 onChange={handleChange}
// //                 onSubmit={onSubmit}
// //                 placeholders={searchPlaceholders}
// //                 className="w-full"
// //               />
// //               <FilterCategory />
// //             </motion.div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Video Section that overlaps with hero */}
// //       <motion.section
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.6 }}
// //         className="relative -mt-20 pb-20 z-20"
// //       >
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             whileHover={{ scale: 1.02 }}
// //             transition={{ type: "spring", stiffness: 300 }}
// //             className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50"
// //           >
// //             {!isVideoPlaying ? (
// //               <div className="aspect-video relative bg-gradient-to-br from-gray-900 to-gray-800 cursor-pointer group"
// //                    onClick={() => setIsVideoPlaying(true)}>
// //                 {/* Video Thumbnail */}
// //                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
// //                 <motion.div
// //                   className="absolute inset-0 flex items-center justify-center"
// //                   whileHover={{ scale: 1.1 }}
// //                   transition={{ type: "spring", stiffness: 400 }}
// //                 >
// //                   <PlayCircle className="w-20 h-20 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
// //                 </motion.div>
// //                 {/* Custom overlay text */}
// //                 <div className="absolute bottom-6 left-6 text-white">
// //                   <h3 className="text-2xl font-semibold mb-2">See how it works</h3>
// //                   <p className="text-gray-200">Watch our 2-minute demo video</p>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="aspect-video">
// //                 <iframe
// //                   className="w-full h-full"
// //                   src="https://www.youtube.com/embed/your-video-id?autoplay=1"
// //                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                   allowFullScreen
// //                 />
// //               </div>
// //             )}
            
// //             {/* Decorative elements */}
// //             <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
// //             <div className="absolute -left-8 -top-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
// //           </motion.div>
// //         </div>
// //       </motion.section>
// //     </>
// //   );
// // }

// // export default Hero;
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { PlayCircle, ArrowRight, Sparkles } from "lucide-react";

// // const Hero = () => {
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// //   // Animation variants for floating effect
// //   const floatingAnimation = {
// //     initial: { y: 0 },
// //     animate: {
// //       y: [-10, 10, -10],
// //       transition: {
// //         duration: 6,
// //         repeat: Infinity,
// //         ease: "easeInOut"
// //       }
// //     }
// //   };

// //   return (
// //     <>
// //       <section className="w-full min-h-[85vh] relative overflow-hidden">
// //         {/* Decorative Background Elements */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           {/* Left side geometric shapes */}
// //           <motion.div
// //             initial={{ opacity: 0, x: -100 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 1 }}
// //             className="absolute left-0 top-1/4"
// //           >
// //             <div className="w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
// //             <div className="w-32 h-32 bg-purple-200/30 rounded-full blur-2xl -mt-10 ml-20" />
// //           </motion.div>

// //           {/* Right side geometric shapes */}
// //           <motion.div
// //             initial={{ opacity: 0, x: 100 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 1 }}
// //             className="absolute right-0 top-1/3"
// //           >
// //             <div className="w-64 h-64 bg-purple-200/30 rounded-full blur-3xl" />
// //             <div className="w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -mt-10 mr-20" />
// //           </motion.div>

// //           {/* Floating elements */}
// //           <motion.div
// //             variants={floatingAnimation}
// //             initial="initial"
// //             animate="animate"
// //             className="absolute top-1/4 left-10"
// //           >
// //             <div className="w-4 h-4 bg-blue-400 rounded-full opacity-50" />
// //           </motion.div>
// //           <motion.div
// //             variants={floatingAnimation}
// //             initial="initial"
// //             animate="animate"
// //             className="absolute top-1/3 right-20"
// //           >
// //             <div className="w-6 h-6 bg-purple-400 rounded-full opacity-50" />
// //           </motion.div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="container mx-auto px-4 relative z-10">
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="flex flex-col items-center justify-center min-h-[85vh] text-center"
// //           >
// //             <motion.h1
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-6"
// //             >
// //               Discover technology
// //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
// //                 {" "}tailored for legal professionals
// //               </span>
// //             </motion.h1>

// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //               className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
// //             >
// //               Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
// //             </motion.p>

// //             {/* Animated CTA Button */}
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
// //             >
// //               <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
// //               <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
// //               Explore Solutions
// //               <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
// //             </motion.button>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Enhanced Video Section */}
// //       <motion.section
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.6 }}
// //         className="relative -mt-20 pb-20 z-20"
// //       >
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             whileHover={{ scale: 1.02 }}
// //             transition={{ type: "spring", stiffness: 300 }}
// //             className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
// //           >
// //             {!isVideoPlaying ? (
// //               <div 
// //                 className="aspect-video relative cursor-pointer group"
// //                 onClick={() => setIsVideoPlaying(true)}
// //               >
// //                 {/* Premium Video Thumbnail */}
// //                 <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
// //                   <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400 via-blue-400 to-purple-800" />
// //                 </div>
                
// //                 {/* Play Button with Animation */}
// //                 <motion.div
// //                   className="absolute inset-0 flex items-center justify-center"
// //                   whileHover={{ scale: 1.1 }}
// //                   transition={{ type: "spring", stiffness: 400 }}
// //                 >
// //                   <div className="relative">
// //                     <div className="absolute -inset-4 rounded-full bg-white/20 blur-lg group-hover:bg-white/30 transition-colors duration-300" />
// //                     <PlayCircle className="w-20 h-20 text-white opacity-90 group-hover:opacity-100 transition-all duration-300 relative z-10" />
// //                   </div>
// //                 </motion.div>

// //                 {/* Enhanced Overlay Text */}
// //                 <div className="absolute bottom-8 left-8 text-white">
// //                   <h3 className="text-3xl font-bold mb-3 tracking-tight">See how it works</h3>
// //                   <p className="text-lg text-gray-200 flex items-center">
// //                     <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
// //                     Watch our 2-minute demo video
// //                   </p>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="aspect-video relative">
// //                 {/* <iframe
// //                   className="w-full h-full"
// //                   src="https://www.youtube.com/embed/your-video-id?autoplay=1&rel=0&modestbranding=1"
// //                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                   allowFullScreen
// //                 /> */}
// //                 <iframe 
// //                  className="w-full h-full"
// //                  src="https://www.youtube.com/embed/VAwxjkHmBTs?si=6xpdIQJEXvpPoPy2" 
// //                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                  allowFullScreen
// //                  />
// //               </div>
// //             )}
            
// //             {/* Enhanced Decorative Elements */}
// //             <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-70" />
// //             <div className="absolute -left-16 -top-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-70" />
// //           </motion.div>
// //         </div>
// //       </motion.section>
// //     </>
// //   );
// // };

// // export default Hero;


// // ....
// // import React from "react";
// // import { motion } from "framer-motion";
// // import { ArrowRight, Sparkles } from "lucide-react";

// // const Hero = () => {
// //   // Animation variants for floating images
// //   const floatingAnimation = {
// //     initial: { y: 0 },
// //     animate: (custom) => ({
// //       y: [-20, 20, -20],
// //       x: custom ? [-10, 10, -10] : [10, -10, 10],
// //       transition: {
// //         duration: 8,
// //         repeat: Infinity,
// //         ease: "easeInOut",
// //         delay: custom * 0.5
// //       }
// //     })
// //   };

// //   return (
// //     <>
// //       <section className="w-full min-h-[85vh] relative overflow-hidden">
// //         {/* Animated PNG Images - Left Side */}
// //         <motion.div className="absolute left-0 top-0 h-full w-1/4 pointer-events-none">
// //           <motion.img
// //             src="/api/placeholder/200/200"
// //             alt="Decorative left top"
// //             className="absolute left-10 top-1/4 w-40 h-40 object-contain"
// //             variants={floatingAnimation}
// //             initial="initial"
// //             animate="animate"
// //             custom={0}
// //           />
// //           <motion.img
// //             src="/api/placeholder/200/200"
// //             alt="Decorative left bottom"
// //             className="absolute left-20 bottom-1/4 w-32 h-32 object-contain"
// //             variants={floatingAnimation}
// //             initial="initial"
// //             animate="animate"
// //             custom={1}
// //           />
// //         </motion.div>

// //         {/* Animated PNG Images - Right Side */}
// //         <motion.div className="absolute right-0 top-0 h-full w-1/4 pointer-events-none">
// //           <motion.img
// //             src="/api/placeholder/200/200"
// //             alt="Decorative right top"
// //             className="absolute right-10 top-1/3 w-36 h-36 object-contain"
// //             variants={floatingAnimation}
// //             initial="initial"
// //             animate="animate"
// //             custom={2}
// //           />
// //           <motion.img
// //             src="/api/placeholder/200/200"
// //             alt="Decorative right bottom"
// //             className="absolute right-20 bottom-1/3 w-44 h-44 object-contain"
// //             variants={floatingAnimation}
// //             initial="initial"
// //             animate="animate"
// //             custom={3}
// //           />
// //         </motion.div>

// //         {/* Main Content */}
// //         <div className="container mx-auto px-4 relative z-10">
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="flex flex-col items-center justify-center min-h-[85vh] text-center"
// //           >
// //             <motion.h1
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-6"
// //             >
// //               Discover technology
// //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
// //                 {" "}tailored for legal professionals
// //               </span>
// //             </motion.h1>

// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //               className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
// //             >
// //               Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
// //             </motion.p>

// //             {/* Animated CTA Button */}
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
// //             >
// //               <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
// //               <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
// //               Explore Solutions
// //               <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
// //             </motion.button>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Premium Video Section */}
// //       <motion.section
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.6 }}
// //         className="relative -mt-20 pb-20 z-20"
// //       >
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             whileHover={{ scale: 1.02 }}
// //             transition={{ type: "spring", stiffness: 300 }}
// //             className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white"
// //           >
// //             <div className="aspect-video relative">
              
// //               <iframe 
// //                  className="w-full h-full"
// //                  src="https://www.youtube.com/embed/VAwxjkHmBTs?si=6xpdIQJEXvpPoPy2" 
// //                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                  allowFullScreen
// //                  />
// //             </div>
            
// //             {/* Subtle Gradient Overlay */}
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
// //           </motion.div>
// //         </div>
// //       </motion.section>
// //     </>
// //   );
// // };

// // export default Hero;
// import React from "react";
// import { motion } from "framer-motion";
import {  Zap, Shield, BarChart2, Globe } from "lucide-react";

// const Hero = () => {
//   // Animation variants for floating icons
//   const floatingAnimation = {
//     initial: { y: 0 },
//     animate: (custom) => ({
//       y: [-12, 12, -12],
//       x: custom ? [-8, 8, -8] : [8, -8, 8],
//       transition: {
//         duration: 6,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: custom * 0.5
//       }
//     })
//   };

//   // Premium decorative elements
//   const decorativeElements = [
//     { Icon: Shield, color: "from-blue-400/20 to-blue-600/20", position: "left-12 top-32", size: "w-16 h-16", delay: 0 },
//     { Icon: BarChart2, color: "from-blue-500/20 to-blue-700/20", position: "left-24 bottom-48", size: "w-20 h-20", delay: 1 },
//     { Icon: Zap, color: "from-blue-600/20 to-blue-800/20", position: "right-16 top-40", size: "w-20 h-20", delay: 2 },
//     { Icon: Globe, color: "from-blue-500/20 to-blue-700/20", position: "right-28 bottom-44", size: "w-16 h-16", delay: 3 }
//   ];

//   return (
//     <>
//       {/* <section className="w-full min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
//        Subtle radial gradient base
// <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
// <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_top_right,#60A5FA_0%,transparent_50%)]" />
// <div className="absolute inset-0 opacity-20 bg-[radial-gradient(at_top_left,#93C5FD_0%,transparent_50%)]" />
// <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] animate-grain" />


      
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

    
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col items-center justify-center min-h-[85vh] text-center"
//           >
//             <span className="text-sm font-semibold text-blue-600 mb-4 tracking-wider">
//               LEGAL TECH SOLUTIONS
//             </span>
            
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-6 "
//             >


              
//               Discover technology
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
//                 {" "}tailored for legal professionals
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 "
//             >
//               Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
//             </motion.p>

            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white 
//                        transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-600 to-blue-500 
//                        hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
//             >
//               <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 
//                            opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
//               <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
//               Explore Solutions
//               <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       <motion.section
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//         className="relative -mt-20 pb-20 z-20"
//       >
//         <div className="container mx-auto px-4">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            
//             <div className="aspect-video relative">
//               <iframe 
//                 className="w-full h-full"
//                 src="https://www.youtube.com/embed/VAwxjkHmBTs?si=6xpdIQJEXvpPoPy2" 
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
            
           
//             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent pointer-events-none" />
//           </motion.div>
//         </div>
//       </motion.section> */}
    
  
     
   




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
//               LEGAL TECH SOLUTIONS
//             </span>
            
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-4 sm:mb-6 px-4"
//             >
//               Discover technology
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
//                 {" "}tailored for legal professionals
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
//             >
//               Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
//             </motion.p>

//             {/* Premium CTA Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg 
//                        font-medium text-white transition-all duration-300 ease-in-out rounded-full 
//                        bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 
//                        shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
//             >
//               <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 
//                            opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
//               <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" />
//               Explore Solutions
//               <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Premium Video Section */}
//       <motion.section
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//         className="relative -mt-16 sm:-mt-20 pb-12 sm:pb-20 z-20"
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="relative max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-gray-100"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            
//             <div className="aspect-video relative">
//               <iframe 
//                 className="w-full h-full"
//                 src="https://www.youtube.com/embed/VAwxjkHmBTs?si=6xpdIQJEXvpPoPy2" 
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
            
//             {/* Premium Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent pointer-events-none" />
//           </motion.div>
//         </div>
//       </motion.section>
 

//     </>
//   );
// };

// export default Hero;

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code, LineChart, Workflow } from 'lucide-react';

const ResponsiveHero = () => {
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

  // Updated decorative elements with better mobile positioning
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

  return (
    <>
      {/* Hero Section with navbar spacing */}
      <section className="w-full min-h-screen pt-20 sm:pt-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_top_right,#60A5FA_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(at_top_left,#93C5FD_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] animate-grain" />

        {/* Container for main content and decorative elements */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative Icons - Now within container but positioned absolutely */}
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
            <span className="text-xs sm:text-sm font-semibold text-blue-600 mb-4 tracking-wider">
              LEGAL TECH SOLUTIONS
            </span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-4 sm:mb-6 px-4"
            >
              Discover technology
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                {" "}tailored for legal professionals
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
            >
              Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
            </motion.p>

            {/* Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg 
                       font-medium text-white transition-all duration-300 ease-in-out rounded-full 
                       bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 
                       shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 
                           opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" />
              Explore Solutions
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Premium Video Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative -mt-16 sm:-mt-20 pb-12 sm:pb-20 z-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            
            <div className="aspect-video relative">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/VAwxjkHmBTs?si=6xpdIQJEXvpPoPy2" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default ResponsiveHero;
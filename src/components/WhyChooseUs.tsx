// // import { RiPresentationLine } from "react-icons/ri";
// // import { TbDeviceAnalytics } from "react-icons/tb";
// // import { GiStairsGoal } from "react-icons/gi";

// // export const WhyChooseUs = () => {
// //     return (
// //       <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 font-clarity">
// //         <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
         
// //           <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            
// //         Why choose DreamLegal

// //           </h2>
          
// //         </div>
// //         <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
// //           <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
// //             <div>
// //               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
// //                 <svg
// //                   className="w-12 h-12 text-deep-purple-accent-400"
// //                   stroke="currentColor"
// //                   viewBox="0 0 52 52"
// //                 >
// //                   <polygon
// //                     strokeWidth="3"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     fill="none"
// //                     points="29 13 14 29 25 29 23 39 38 23 27 23"
// //                   />
// //                 </svg>
// //               </div>
// //               <h6 className="mb-2 font-semibold leading-5">Smart Savings, Swift Decisions</h6>
// //               <p className="mb-3 text-base text-gray-700 text-justify">
// //               Slash consultation costs and discovery time with our intuitive compare feature, paving the way for seamless product analysis.
// //               </p>
// //             </div>
          
// //           </div>
// //           <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
// //             <div>
// //               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
// //               <RiPresentationLine className="w-8 h-8 " />
// //               </div>
// //               <h6 className="mb-2 font-semibold leading-5">Easy Legal Tech Learning</h6>
// //               <p className="mb-3 text-base text-gray-700 text-justify">
// //               We've made catching up legal tech super simple for professionals. Dive in and master with ease!
// //               </p>
// //             </div>
            
// //           </div>
// //           <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
// //             <div>
// //               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
// //               <TbDeviceAnalytics className=" w-8 h-8 " />
// //               </div>
// //               <h6 className="mb-2 font-semibold leading-5">Detailed Software Analysis</h6>
// //               <p className="mb-3 text-base text-gray-700 text-justify">
// //               Gain access to detailed feature breakdowns of each legal tech with comprehensive insights.

// //               </p>
// //             </div>
           
// //           </div>
// //           <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
// //             <div>
// //               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
// //               <GiStairsGoal className="w-8 h-8"  />
// //               </div>
// //               <h6 className="mb-2 font-semibold leading-5">Tailored Software Visions</h6>
// //               <p className="mb-3 text-base text-gray-700 text-justify">
// //               Clear communication of the visions of software companies, allowing legal tech buyers to align them with their specific requirements.
// //               </p>
// //             </div>
           
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };
// // import React, { useRef, useState } from 'react';
// // import { Presentation, LineChart, Target, Sparkles } from 'lucide-react';
// // import { motion } from 'framer-motion';

// // const useIntersectionObserver = (options = {}) => {
// //   const [isIntersecting, setIsIntersecting] = useState(false);
// //   const targetRef = useRef(null);

// //   React.useEffect(() => {
// //     const observer = new IntersectionObserver(([entry]) => {
// //       setIsIntersecting(entry.isIntersecting);
// //     }, { threshold: 0.2, ...options });

// //     const currentTarget = targetRef.current;
// //     if (currentTarget) {
// //       observer.observe(currentTarget);
// //     }

// //     return () => {
// //       if (currentTarget) {
// //         observer.unobserve(currentTarget);
// //       }
// //     };
// //   }, [options]);

// //   return [targetRef, isIntersecting];
// // };

// // const WhyChooseUs = () => {
// //   const [sectionRef, isInView] = useIntersectionObserver();
  
// //   const features = [
// //     {
// //       icon: Target,
// //       title: "Smart Savings, Swift Decisions",
// //       description: "Slash consultation costs and discovery time with our intuitive compare feature, paving the way for seamless product analysis."
// //     },
// //     {
// //       icon: Presentation,
// //       title: "Easy Legal Tech Learning",
// //       description: "We've made catching up legal tech super simple for professionals. Dive in and master with ease!"
// //     },
// //     {
// //       icon: LineChart,
// //       title: "Detailed Software Analysis",
// //       description: "Gain access to detailed feature breakdowns of each legal tech with comprehensive insights."
// //     },
// //     {
// //       icon: Sparkles,
// //       title: "Tailored Software Visions",
// //       description: "Clear communication of the visions of software companies, allowing legal tech buyers to align them with their specific requirements."
// //     }
// //   ];

// //   return (
// //     <div ref={sectionRef} className="w-full bg-gradient-to-br from-white to-blue-50 py-16 md:py-24 relative overflow-hidden">
// //       {/* Background Elements */}
// //       <div className="absolute inset-0">
// //         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
// //         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
// //         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
// //         <motion.div 
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={isInView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ duration: 0.6 }}
// //           className="text-center mb-16"
// //         >
// //           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
// //             Why choose DreamLegal
// //             <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto" />
// //           </h2>
// //         </motion.div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {features.map((feature, index) => {
// //             const Icon = feature.icon;
// //             return (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={isInView ? { opacity: 1, y: 0 } : {}}
// //                 transition={{ duration: 0.6, delay: index * 0.1 }}
// //                 className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
// //                 <div className="relative">
// //                   <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// //                     <Icon className="w-8 h-8 text-blue-600" />
// //                   </div>

// //                   <h3 className="text-xl font-semibold text-gray-900 mb-4">
// //                     {feature.title}
// //                   </h3>

// //                   <p className="text-gray-600 leading-relaxed">
// //                     {feature.description}
// //                   </p>

// //                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WhyChooseUs;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Zap, LineChart, Target, Search, ArrowUpRight } from 'lucide-react';

// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = React.useRef(null);

//   React.useEffect(() => {
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

// const WhyChooseUs = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const features = [
//     {
//       icon: Target,
//       title: "Smart Savings, Swift Decisions",
//       description: "Slash consultation costs and discovery time with our intuitive compare feature.",
//       link: "#learn-more",
//       gradient: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: Search,
//       title: "Easy Legal Tech Learning",
//       description: "We've made catching up with legal tech super simple for professionals. Dive in and master with ease!",
//       link: "#learn-more",
//       gradient: "from-indigo-500 to-indigo-600"
//     },
//     {
//       icon: LineChart,
//       title: "Detailed Software Analysis",
//       description: "Gain access to detailed feature breakdowns of each legal tech with comprehensive insights.",
//       link: "#learn-more",
//       gradient: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: Zap,
//       title: "Tailored Software Visions",
//       description: "Clear communication of software companies' visions, aligned with your specific requirements.",
//       link: "#learn-more",
//       gradient: "from-indigo-500 to-indigo-600"
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="w-full bg-white py-24 relative overflow-hidden">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-blue-50/50" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Section Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20"
//         >
//           <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 
//                        rounded-full text-sm font-medium mb-6">
//             <span className="w-2 h-2 bg-blue-600 rounded-full" />
//             WHY CHOOSE US
//           </div>
          
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             What Sets Us Apart
//             <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto" />
//           </h2>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
//                          border border-gray-100 transition-all duration-300"
//               >
//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} 
//                                 flex items-center justify-center mb-6 group-hover:scale-105 
//                                 transition-transform duration-300`}>
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>

//                   {/* Content */}
//                   <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 
//                               transition-colors duration-300">
//                     {feature.title}
//                   </h3>
                  
//                   <p className="text-gray-600 leading-relaxed mb-6">
//                     {feature.description}
//                   </p>

//                   {/* Learn More Link */}
//                   <a 
//                     href={feature.link}
//                     className="inline-flex items-center gap-2 text-blue-600 font-medium 
//                              group-hover:gap-3 transition-all duration-300"
//                   >
//                     Learn more
//                     <ArrowUpRight className="w-4 h-4" />
//                   </a>
//                 </div>

//                 {/* Hover Effects */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent 
//                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 
//                              to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 
//                              transition-opacity duration-300" />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyChooseUs;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Zap, LineChart, Target, Search } from 'lucide-react';

// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = React.useRef(null);

//   React.useEffect(() => {
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

// const WhyChooseUs = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const features = [
//     {
//       icon: Target,
//       title: "Smart Savings",
//       description: "Slash consultation costs and discovery time with our intuitive compare feature.",
//       gradient: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: Search,
//       title: "Easy Learning",
//       description: "We've made catching up with legal tech super simple for professionals.",
//       gradient: "from-indigo-500 to-indigo-600"
//     },
//     {
//       icon: LineChart,
//       title: "Detailed Analysis",
//       description: "Access detailed feature breakdowns of each legal tech solution.",
//       gradient: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: Zap,
//       title: "Tailored Vision",
//       description: "Clear alignment of software capabilities with your requirements.",
//       gradient: "from-indigo-500 to-indigo-600"
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="w-full bg-white py-24 relative overflow-hidden">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-blue-50/50" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Section Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20"
//         >
//           <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 
//                        rounded-full text-sm font-medium mb-6">
//             <span className="w-2 h-2 bg-blue-600 rounded-full" />
//             WHY CHOOSE US
//           </div>
          
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             What Sets Us Apart
//             <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto" />
//           </h2>
//         </motion.div>

//         {/* Features Grid - Single row on desktop */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl 
//                          border border-gray-100 transition-all duration-300"
//               >
//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} 
//                                 flex items-center justify-center mb-6 group-hover:scale-105 
//                                 transition-transform duration-300`}>
//                     <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//                   </div>

//                   {/* Content */}
//                   <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 
//                               transition-colors duration-300">
//                     {feature.title}
//                   </h3>
                  
//                   <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>

//                 {/* Hover Effects */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent 
//                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 
//                              to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 
//                              transition-opacity duration-300" />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyChooseUs;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, LineChart, Target, Search } from 'lucide-react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = React.useRef(null);

  React.useEffect(() => {
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

const WhyChooseUs = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: Target,
      title: "Smart Savings",
      description: "Slash consultation costs and discovery time with our intuitive compare feature.",
      gradient: "from-[#1e2556] to-[#374177]"
    },
    {
      icon: Search,
      title: "Easy Learning",
      description: "We've made catching up with legal tech super simple for professionals.",
      gradient: "from-[#7cc6ee] to-[#5eb6e0]"
    },
    {
      icon: LineChart,
      title: "Detailed Analysis",
      description: "Access detailed feature breakdowns of each legal tech solution.",
      gradient: "from-[#1e2556] to-[#374177]"
    },
    {
      icon: Zap,
      title: "Tailored Vision",
      description: "Clear alignment of software capabilities with your requirements.",
      gradient: "from-[#7cc6ee] to-[#5eb6e0]"
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-white py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255608_1px,transparent_1px),linear-gradient(to_bottom,#1e255608_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f7fa]/50 via-transparent to-[#f5f7fa]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 
                       rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
            WHY CHOOSE US
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2556]">
            What Sets Us Apart
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] mx-auto" />
          </h2>
        </motion.div>

        {/* Features Grid - Single row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl 
                         border border-[#7cc6ee]/10 transition-all duration-300"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} 
                                flex items-center justify-center mb-6 group-hover:scale-105 
                                transition-transform duration-300`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg lg:text-xl font-bold text-[#1e2556] mb-3 group-hover:text-[#7cc6ee] 
                              transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm lg:text-base text-[#2d2d2d] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa]/50 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7cc6ee]/5 
                             to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
// function AboutFeature() {
//   return (
//     <div className="bg-[#f8f8fb] py-6 md:py-10 font-clarity ">
//       <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//         <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
//           <div></div>
//           <h2 className="max-w-lg mb-6  text-2xl md:text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
//             The values that drives everything we do
//           </h2>
//           <p className="text-base text-slate-700 md:px-14 ">
//           Our vision is to unlock these six core values in the life of legal professionals through technology.
//           </p>
//         </div>
//         <div className="grid  gap-8  sm:grid-cols-1 lg:grid-cols-3 px-5 md:px-20">
//           <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
//             <div>
//               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
//                 <img src="/about1.svg" alt="" />
//               </div>
//               <h6 className="mb-5 text-xl font-bold ">Integration</h6>
//               <p className="mb-5 text-base text-slate-500 leading-6">
//               Inculcate technology into your workflow, ensuring smooth operation.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
//             <div>
//               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
//                 <img src="/about2.svg" alt="" />
//               </div>
//               <h6 className="mb-5 text-xl font-bold ">Value for Investment</h6>
//               <p className="mb-5 text-base text-slate-500 leading-6">
//               Tangible returns on investment, that deliver functionality and ROI.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
//             <div>
//               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
//                 <img src="/about3.svg" alt="" />
//               </div>
//               <h6 className="mb-5 text-xl font-bold ">Innovation</h6>
//               <p className="mb-5 text-base text-slate-500 leading-6">
//               Push the boundaries of traditional legal practice, unlocking new possibilities.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
//             <div>
//               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
//                 <img src="/about4.svg" alt="" />
//               </div>
//               <h6 className="mb-5 text-xl font-bold ">Collaboration</h6>
//               <p className="mb-5 text-base text-slate-500 leading-6">
//               Foster teamwork and connectivity, enabling effortless communication.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
//             <div>
//               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
//                 <img src="/about5.svg" alt="" />
//               </div>
//               <h6 className="mb-5 text-xl font-bold ">Efficiency</h6>
//               <p className="mb-5 text-base text-slate-500 leading-6">
//               Maximise productivity, freeing up valuable time to focus on what truly matters.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
//             <div>
//               <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
//                 <img src="/about6.svg" alt="" />
//               </div>
//               <h6 className="mb-5 text-xl font-bold ">Impact</h6>
//               <p className="mb-5 text-base text-slate-500 leading-6">
//               Driving meaningful change in how you serve clients and achieve results.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutFeature;

// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Zap, Puzzle, LineChart, Users, Sparkles, Target } from 'lucide-react';

// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = useRef(null);

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

// const AboutFeature = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const values = [
//     {
//       icon: Puzzle,
//       title: "Integration",
//       description: "Inculcate technology into your workflow, ensuring smooth operation.",
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: LineChart,
//       title: "Value for Investment",
//       description: "Tangible returns on investment, that deliver functionality and ROI.",
//       color: "from-indigo-500 to-indigo-600"
//     },
//     {
//       icon: Sparkles,
//       title: "Innovation",
//       description: "Push the boundaries of traditional legal practice, unlocking new possibilities.",
//       color: "from-violet-500 to-violet-600"
//     },
//     {
//       icon: Users,
//       title: "Collaboration",
//       description: "Foster teamwork and connectivity, enabling effortless communication.",
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: Zap,
//       title: "Efficiency",
//       description: "Maximise productivity, freeing up valuable time to focus on what truly matters.",
//       color: "from-indigo-500 to-indigo-600"
//     },
//     {
//       icon: Target,
//       title: "Impact",
//       description: "Driving meaningful change in how you serve clients and achieve results.",
//       color: "from-violet-500 to-violet-600"
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="w-full bg-gradient-to-br from-gray-50 to-white py-16 md:py-24 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="text-sm font-semibold text-blue-600 tracking-wider">
//             OUR CORE VALUES
//           </span>
//           <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
//             The values that drives everything we do
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             Our vision is to unlock these six core values in the life of legal professionals through technology.
//           </p>
//           <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto" />
//         </motion.div>

//         {/* Values Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {values.map((value, index) => {
//             const Icon = value.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 className="group relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 {/* Hover Background Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
//                 <div className="relative">
//                   {/* Icon Container */}
//                   <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} 
//                                 flex items-center justify-center mb-6 group-hover:scale-110 
//                                 transition-transform duration-300 shadow-lg`}>
//                     <Icon className="w-8 h-8 text-white" />
//                   </div>

//                   {/* Text Content */}
//                   <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
//                     {value.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {value.description}
//                   </p>

//                   {/* Bottom Gradient Line */}
//                   <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color}
//                                 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
//                 </div>

//                 {/* Corner Accent */}
//                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent 
//                              rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutFeature;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Zap, Puzzle, LineChart, Users, Sparkles, Target } from 'lucide-react';

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

// const AboutFeature = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();

//   const values = [
//     {
//       icon: Puzzle,
//       title: "Integration",
//       description: "Inculcate technology into your workflow, ensuring smooth operation."
//     },
//     {
//       icon: LineChart,
//       title: "Value for Investment",
//       description: "Tangible returns on investment, that deliver functionality and ROI."
//     },
//     {
//       icon: Sparkles,
//       title: "Innovation",
//       description: "Push the boundaries of traditional legal practice, unlocking new possibilities."
//     },
//     {
//       icon: Users,
//       title: "Collaboration",
//       description: "Foster teamwork and connectivity, enabling effortless communication."
//     },
//     {
//       icon: Zap,
//       title: "Efficiency",
//       description: "Maximise productivity, freeing up valuable time to focus on what truly matters."
//     },
//     {
//       icon: Target,
//       title: "Impact",
//       description: "Driving meaningful change in how you serve clients and achieve results."
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="w-full bg-gradient-to-b from-white via-blue-50/20 to-white py-24 relative overflow-hidden">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F60A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F60A_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20"
//         >
          
//           <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 
//                        rounded-full text-sm font-medium mb-6">
//             <span className="w-2 h-2 bg-blue-600 rounded-full" />
//             Our Core Values
//           </div>
          
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
//             The values that drives everything we do
//           </h2>
//           <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
//             Our vision is to unlock these six core values in the life of legal professionals through technology.
//           </p>
//         </motion.div>

//         {/* Values Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {values.map((value, index) => {
//             const Icon = value.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="group relative bg-white rounded-2xl overflow-hidden"
//               >
//                 {/* Card inner wrapper */}
//                 <div className="p-8 relative z-10">
//                   {/* Icon */}
//                   <div className="mb-6 relative">
//                     <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-xl 
//                                 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
//                     <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-xl p-4
//                                 border border-blue-100/50 group-hover:border-blue-200/80 
//                                 transition-colors duration-300">
//                       <Icon className="w-8 h-8 text-blue-600" />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">
//                     {value.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {value.description}
//                   </p>
//                 </div>

//                 {/* Background effects */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/50 
//                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
//                 {/* Borders */}
//                 <div className="absolute inset-0 rounded-2xl border border-gray-100 group-hover:border-blue-100/50
//                              transition-colors duration-300" />
                
//                 {/* Bottom accent line */}
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600
//                              transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutFeature;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Puzzle, LineChart, Users, Sparkles, Target } from 'lucide-react';

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

const AboutFeature = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  const values = [
    {
      icon: Puzzle,
      title: "Integration",
      description: "Inculcate technology into your workflow, ensuring smooth operation."
    },
    {
      icon: LineChart,
      title: "Value for Investment",
      description: "Tangible returns on investment, that deliver functionality and ROI."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Push the boundaries of traditional legal practice, unlocking new possibilities."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Foster teamwork and connectivity, enabling effortless communication."
    },
    {
      icon: Zap,
      title: "Efficiency",
      description: "Maximise productivity, freeing up valuable time to focus on what truly matters."
    },
    {
      icon: Target,
      title: "Impact",
      description: "Driving meaningful change in how you serve clients and achieve results."
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-white via-[#f5f7fa]/50 to-white py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e25560A_1px,transparent_1px),linear-gradient(to_bottom,#1e25560A_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          
          <div className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 
                       rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
            Our Core Values
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556]">
            The values that drives everything we do
          </h2>
          <p className="mt-6 text-lg text-[#334155] max-w-2xl mx-auto">
            Our vision is to unlock these six core values in the life of legal professionals through technology.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden"
              >
                {/* Card inner wrapper */}
                <div className="p-8 relative z-10">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-[#7cc6ee]/10 rounded-xl blur-xl 
                                transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative bg-gradient-to-br from-white to-[#f5f7fa] rounded-xl p-4
                                border border-[#7cc6ee]/20 group-hover:border-[#7cc6ee]/40 
                                transition-colors duration-300">
                      <Icon className="w-8 h-8 text-[#7cc6ee]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#1e2556] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#2d2d2d] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa]/0 via-[#f5f7fa]/0 to-[#f5f7fa]/50 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Borders */}
                <div className="absolute inset-0 rounded-2xl border border-gray-100 group-hover:border-[#7cc6ee]/20
                             transition-colors duration-300" />
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee]
                             transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutFeature;
// // import Image from "next/image";
// // import Link from "next/link";
// // import React from "react";
// // import { IoIosArrowRoundForward } from "react-icons/io";

// // function AboutHero() {
// //   return (
// //     <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 font-clarity">
// //       <div className="grid grid-cols-1 md:grid-cols-7  gap-4">
// //         <div className=" col-span-4 flex flex-col justify-center px-10  gap-4">
// //           <h1 className="text-4xl md:text-[46px] font-bold">
// //             About DreamLegal
// //           </h1>
// //           <p className="text-base text-slate-500 text-justify">
// //             We simplify selection, onboarding and management of technology for
// //             legal professionals and teams. Our mission is to simplify every
// //             legal professional’s journey with technology, making it an
// //             effortless part of your daily workflow. We understand the unique
// //             challenges that legal professionals face and we're here to ensure
// //             that technology enhances your practice and eases your workload.
// //           </p>
// //           <div className=" flex gap-6">
// //             <Link href={"/directory"}>
// //               <button className=" flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary2 hover:text-primary1 hover:gap-4">
// //                 Directory
// //                 <IoIosArrowRoundForward className=" text-xl" />
// //               </button>
// //             </Link>

// //             <a href="https://blog.dreamlegal.in">
// //               <button className=" flex gap-2 rounded-full bg-primary2 text-primary1 font-bold px-6 py-3 text-xs transition-all  w-fit items-center border-primary1 hover:bg-primary1 hover:text-white hover:gap-4">
// //                 Resources
// //                 <IoIosArrowRoundForward className=" text-xl" />
// //               </button>
// //             </a>
// //           </div>
// //         </div>
// //         <div className=" col-span-3">
// //           <Image
// //             src={`/aboutus2.png`}
// //             width={1260}
// //             height={750}
// //             alt=""
// //             className="rounded-3xl w-full h-full"
// //           ></Image>
// //         </div>
// //       </div>
// //       <div className="flex flex-col flex-wrap justify-between items-center mt-12 mb-8">
// //         <div>
// //           <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
// //             Achievements and Mentions
// //           </h2>
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-4">
// //           <a href="https://www.f6s.com/companies/legaltech/india/co">
// //             <img src="/1.png" className=" h-20 md:h-32 w-auto" alt="" />
// //           </a>

// //           <a href="https://wardblawg.com/best-legal-technologists-consultants/ranjan-singhania-helping-legal-teams-to-find-the-best-technology-solutions-co-founder-legal-technology-enthusiast/">
// //             <img src="/2.png" className=" h-20 md:h-32 w-auto" alt="" />
// //           </a>

// //           <img src="/3.png" className=" h-20 md:h-32 w-auto" alt="" />
// //           <img src="/6.png" className=" h-20 md:h-32 w-auto" alt="" />
// //           <img src="/4.png" className=" h-20 md:h-32 w-auto" alt="" />
// //           <img src="/5.png" className=" h-20 md:h-32 w-auto" alt="" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AboutHero;

// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { ArrowRight } from 'lucide-react';
// // import Image from "next/image";
// // import Link from "next/link";

// // const AboutHero = () => {
// //   return (
// //     <div className="w-full bg-gradient-to-br from-blue-50 to-white pt-20 pb-16 relative overflow-hidden">
// //       {/* Background Elements */}
// //       <div className="absolute inset-0">
// //         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
// //         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
// //         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
// //         <div className="grid grid-cols-1 md:grid-cols-7 gap-8 md:gap-12">
// //           {/* Content Column */}
// //           <motion.div 
// //             initial={{ opacity: 0, x: -20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="col-span-4 flex flex-col justify-center space-y-6"
// //           >
// //             <motion.h1 
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
// //             >
// //               About DreamLegal
// //             </motion.h1>

// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //               className="text-lg text-gray-600 leading-relaxed"
// //             >
// //               We simplify selection, onboarding and management of technology for
// //               legal professionals and teams. Our mission is to simplify every
// //               legal professional's journey with technology, making it an
// //               effortless part of your daily workflow.
// //             </motion.p>

// //             <motion.div 
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //               className="flex flex-wrap gap-4"
// //             >
// //               <Link href="/directory">
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium
// //                            text-white bg-blue-600 rounded-full hover:bg-blue-700 
// //                            transition-all duration-200 shadow-lg hover:shadow-xl"
// //                 >
// //                   Directory
// //                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
// //                 </motion.button>
// //               </Link>

// //               <a href="https://blog.dreamlegal.in" target="_blank" rel="noopener noreferrer">
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium
// //                            text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100
// //                            transition-all duration-200 shadow-lg hover:shadow-xl"
// //                 >
// //                   Resources
// //                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
// //                 </motion.button>
// //               </a>
// //             </motion.div>
// //           </motion.div>

// //           {/* Image Column */}
// //           <motion.div 
// //             initial={{ opacity: 0, x: 20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             className="col-span-3 relative"
// //           >
// //             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
// //               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
// //               <Image
// //                 src="/aboutus2.png"
// //                 width={1260}
// //                 height={750}
// //                 alt="About DreamLegal"
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* Achievements Section */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.6 }}
// //           className="mt-20"
// //         >
// //           <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
// //             Achievements and Mentions
// //           </h2>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
// //             {[1, 2, 3, 4, 5, 6].map((index) => (
// //               <motion.div
// //                 key={index}
// //                 whileHover={{ scale: 1.05 }}
// //                 className="flex items-center justify-center"
// //               >
// //                 <img
// //                   src={`/${index}.png`}
// //                   alt={`Achievement ${index}`}
// //                   className="h-20 md:h-32 w-auto filter hover:brightness-110 transition-all duration-300"
// //                 />
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AboutHero;
// import React, { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import Image from "next/image";
// import Link from "next/link";

// const AboutHero = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();

//   return (
//     <div ref={sectionRef} className="w-full bg-gradient-to-b from-blue-50/50 to-white pt-32 pb-16 relative overflow-hidden">
//       {/* Subtle grid background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* Content Column */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="relative"
//           >
//             <motion.span 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="block text-sm font-semibold text-blue-600 mb-6"
//             >
//               ABOUT US
//             </motion.span>

//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
//             >
//               About DreamLegal
//               <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400" />
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-lg text-gray-600 leading-relaxed mb-10"
//             >
//               We simplify selection, onboarding and management of technology for
//               legal professionals and teams. Our mission is to make technology an
//               effortless part of your daily workflow, enhancing your practice and
//               easing your workload.
//             </motion.p>

//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="flex flex-wrap gap-6"
//             >
//               <Link href="/directory">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="group px-8 py-4 bg-blue-600 rounded-xl text-white font-medium 
//                            hover:bg-blue-700 transition-all duration-200"
//                 >
//                   <span className="flex items-center gap-2">
//                     Directory
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </span>
//                 </motion.button>
//               </Link>

//               <a href="https://blog.dreamlegal.in" target="_blank" rel="noopener noreferrer">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="group px-8 py-4 bg-blue-50 text-blue-600 rounded-xl font-medium
//                            hover:bg-blue-100 transition-all duration-200"
//                 >
//                   <span className="flex items-center gap-2">
//                     Resources
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </span>
//                 </motion.button>
//               </a>
//             </motion.div>
//           </motion.div>

//           {/* Image Column */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative rounded-2xl overflow-hidden shadow-xl">
//               <Image
//                 src="/aboutus2.png"
//                 width={1260}
//                 height={750}
//                 alt="About DreamLegal"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Achievements Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-24"
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
//             Achievements and Mentions
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.2 }}
//                 className="flex items-center justify-center"
//               >
//                 <img
//                   src={`/${index}.png`}
//                   alt={`Achievement ${index}`}
//                   className="h-20 md:h-32 w-auto filter transition-all duration-200"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = React.useState(false);
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

// export default AboutHero;

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Globe } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

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

const Stats = () => {
  const stats = [
    { icon: Award, value: "10+", label: "Awards" },
    { icon: Users, value: "1000+", label: "Clients" },
    { icon: Globe, value: "15+", label: "Countries" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm 
                  border-t border-blue-100/50 py-4 px-6 rounded-b-2xl">
      <div className="flex justify-around">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AboutHero = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-blue-50/50 to-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full 
                          text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              ABOUT US
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              About DreamLegal
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed mb-10"
            >
              We simplify selection, onboarding and management of technology for
              legal professionals and teams. Our mission is to make technology an
              effortless part of your daily workflow, enhancing your practice and
              easing your workload.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link href="/directory">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-blue-600 rounded-xl text-white font-medium 
                           overflow-hidden transition-all duration-200"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Directory
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              <a href="https://blog.dreamlegal.in" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl 
                           font-medium hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    Resources
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              <Image
                src="/aboutus2.png"
                width={1260}
                height={750}
                alt="About DreamLegal"
                className="w-full h-full object-cover"
              />
              <Stats />
            </div>
          </motion.div>
        </div>

        {/* Achievement Section */}
        <div className="mt-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 
                          rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              RECOGNITION
            </span>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Achievements and Mentions
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-xl p-4 shadow-lg hover:shadow-xl 
                          transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative">
                  <img
                    src={`/${index}.png`}
                    alt={`Achievement ${index}`}
                    className="h-20 md:h-24 w-auto mx-auto transition-all duration-200 
                             group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
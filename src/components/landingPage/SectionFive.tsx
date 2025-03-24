// import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ArrowUpRight, Shield, Users, FileCheck } from 'lucide-react';

// const CustomButton = ({ children, className = "", ...props }) => (
//   <button
//     className={`inline-flex items-center justify-center px-8 py-3 text-base font-medium 
//               transition-all duration-300 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const FeatureCard = ({ icon: Icon, title, description, index }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: index * 0.1 }}
//     viewport={{ once: true }}
//     className="group relative bg-white rounded-3xl p-6 sm:p-8
//                shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
//                border border-gray-100 backdrop-blur-sm transition-all duration-300"
//   >
//     {/* Icon */}
//     <div className="p-3 w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center
//                   mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
//       <Icon className="w-6 h-6" />
//     </div>

//     {/* Content */}
//     <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-black transition-colors">
//       {title}
//     </h3>
//     <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700">
//       {description}
//     </p>

//     {/* Coming Soon Badge */}
//     <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 
//                   text-xs font-medium text-gray-700">
//       Coming Soon
//     </div>

//     {/* Corner Accents */}
//     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
//                   from-black/5 to-transparent opacity-0 group-hover:opacity-100 
//                   transition-opacity duration-300" />
//     <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr 
//                   from-black/5 to-transparent opacity-0 group-hover:opacity-100 
//                   transition-opacity duration-300" />
//   </motion.div>
// );

// const UpcomingFeatures = () => {
//   const features = [
//     {
//       icon: Users,
//       title: "Client Management System",
//       description: "A comprehensive platform designed specifically for freelancers to streamline client interactions, project tracking, and business operations."
//     },
//     {
//       icon: Shield,
//       title: "Secure File Preview",
//       description: "Advanced file preview system with enterprise-grade security, ensuring safe document sharing between clients and freelancers."
//     },
//     {
//       icon: FileCheck,
//       title: "Freelancer Marketplace",
//       description: "A curated marketplace connecting clients with skilled freelancers, featuring verified profiles and secure payment processing."
//     }
//   ];

//   return (
//     <div className="w-full bg-white py-24 relative overflow-hidden" id='upcoming'>
//       {/* Background Pattern */}
//       {/* <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
//       </div> */}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
//           >
//             Upcoming Features
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             viewport={{ once: true }}
//             className="text-lg text-gray-600 max-w-2xl mx-auto"
//           >
//             Exciting new features coming soon to enhance your freelancing experience
//           </motion.p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard key={index} {...feature} index={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpcomingFeatures;

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PlatformCard = ({ icon: Icon, title, description, index, btnLabel, btnHref }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative bg-[#f5f7fa] rounded-3xl p-6 sm:p-8
               shadow-[0_4px_20px_rgba(30,37,86,0.08)] hover:shadow-[0_8px_30px_rgba(30,37,86,0.12)]
               border border-[#7cc6ee]/10 backdrop-blur-sm transition-all duration-300"
  >
    {/* Icon */}
    <div className="p-3 w-14 h-14 rounded-2xl bg-[#7cc6ee]/10 flex items-center justify-center
                  mb-6 group-hover:bg-[#1e2556] group-hover:text-white transition-colors duration-300">
      <Icon className="w-6 h-6" />
    </div>

    {/* Content */}
    <h3 className="text-xl font-bold text-[#1e2556] mb-4 group-hover:text-[#1e2556] transition-colors">
      {title}
    </h3>
    <p className="text-[#2d2d2d] text-sm leading-relaxed mb-6">
      {description}
    </p>

    <Link href={btnHref}>
    <button className={cn(btnLabel != "Coming Soon" ? `relative z-20 group whitespace-nowrap px-4 py-2 bg-[#7cc6ee] 
                      text-white rounded-xl font-medium hover:bg-[#7cc6ee] active:bg-[#7cc6ee] 
                      transition-all duration-200 flex items-center 
                      justify-center gap-2 shadow-sm hover:shadow-md text-lg 
                      cursor-pointer focus:outline-none 
                      hover:ring-2 hover:ring-[#7cc6ee] hover:ring-opacity-50 
                      active:scale-95 w-full sm:w-auto` : `
                      relative z-20 group whitespace-nowrap px-4 py-2  
                      rounded-xl font-medium  
                      transition-all duration-200 flex items-center 
                      justify-center gap-2 text-lg 
                      cursor-pointer focus:outline-none  
                      active:scale-95 w-full sm:w-auto`)}>{btnLabel}</button>
    </Link>

    {/* Ready Now Badge */}
    {/* <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#7cc6ee]/10 
                  text-xs font-medium text-[#1e2556]">
      Available Now
    </div> */}

    {/* Corner Accents */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
                  from-[#7cc6ee]/5 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr 
                  from-[#7cc6ee]/5 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300" />
  </motion.div>
);

const InnovationPlatforms = () => {
  const platforms = [
    {
      icon: Brain,
      title: "AI-Powered Legal Process Audit",
      description: "AI trained on 1700+ workflows to identify inefficiencies and automation opportunities in legal operations.",
      btnLabel: "Contact Us",
      btnHref: "/contact"
    },
    {
      icon: Search,
      title: "Technology Discovery Platform",
      description: "Helps legal teams explore, evaluate, and compare legal tech solutions for seamless digital transformation.",
      btnLabel: "Explore",
      btnHref: "/directory"
    },
    {
      icon: BarChart3,
      title: "Legal Operations Analytics",
      description: "Tracks legal team capabilities, measures key operational metrics, and enhances overall efficiency.",
      btnLabel: "Coming Soon",
      btnHref: ""
    }
  ];

  return (
    <div className="w-full bg-white py-24 relative overflow-hidden" id='innovation'>
      {/* Background Pattern */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255608_1px,transparent_1px),linear-gradient(to_bottom,#1e255608_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7cc6ee]/[0.02] to-transparent" />
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[#1e2556] mb-4"
          >
            Our Innovation Platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-[#334155] max-w-2xl mx-auto"
          >
            Our USP is intelligence and analysis
          </motion.p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <PlatformCard key={index} {...platform} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnovationPlatforms;
"use client"

// import React, { useState, useEffect } from 'react';
// import { Settings, FileText, BarChart2, Megaphone, Share2, Users } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ServiceTab = ({ service, isActive, onClick, index }) => {
//   const Icon = service.icon;
  
//   return (
//     <motion.button
//       onClick={() => onClick(service.id)}
//       className={`
//         flex items-center gap-3 px-4 md:px-6 py-4 w-full
//         relative isolate group
//         ${isActive ? 'text-gray-900 font-medium' : 'text-gray-500'}
//       `}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//     >
//       {isActive && (
//         <motion.div
//           layoutId="activeTab"
//           className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"
//           initial={false}
//           transition={{ type: "spring", stiffness: 500, damping: 30 }}
//         />
//       )}
      
//       <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300
//         ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
//       <span className="text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
//         {service.title}
//       </span>
//     </motion.button>
//   );
// };

// const StatBar = ({ label, value, visits, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay }}
//     className="space-y-2"
//   >
//     <div className="flex justify-between text-sm">
//       <span className="text-gray-600">{label}</span>
//       <div className="flex gap-4">
//         <span className="text-gray-600">{value}</span>
//         <span className="text-gray-900 font-medium">{visits}</span>
//       </div>
//     </div>
//     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//       <motion.div 
//         className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
//         initial={{ width: 0 }}
//         animate={{ width: value }}
//         transition={{ duration: 1, delay }}
//       />
//     </div>
//   </motion.div>
// );

// const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
//   return (
//     <div className="relative md:hidden">
//       <select
//         value={activeTab}
//         onChange={(e) => setActiveTab(e.target.value)}
//         className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {services.map(service => (
//           <option key={service.id} value={service.id}>
//             {service.title}
//           </option>
//         ))}
//       </select>
//       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//         <BarChart2 className="w-5 h-5 text-gray-400" />
//       </div>
//     </div>
//   );
// };

// const MarketingDashboard = () => {
//   const [activeTab, setActiveTab] = useState('research');
//   const [mounted, setMounted] = useState(false);
//   const activeService = services.find(s => s.id === activeTab);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
//       <motion.div 
//         className="max-w-6xl mx-auto"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
//           Marketing Intelligence
//         </h1>
        
//         <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden backdrop-blur-sm">
//           <MobileTabSelector services={services} activeTab={activeTab} setActiveTab={setActiveTab} />
          
//           <div className="hidden md:flex overflow-x-auto scrollbar-hide border-b border-gray-200">
//             {services.map((service, index) => (
//               <div key={service.id} className="flex-shrink-0 w-1/6">
//                 <ServiceTab 
//                   service={service}
//                   isActive={activeTab === service.id}
//                   onClick={setActiveTab}
//                   index={index}
//                 />
//               </div>
//             ))}
//           </div>

//           <motion.div 
//             key={activeTab}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="p-4 md:p-8 grid md:grid-cols-2 gap-6 md:gap-12"
//           >
//             <div className="space-y-6">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                   {activeService.content.title}
//                 </h2>
//                 <p className="text-gray-600">
//                   {activeService.content.description}
//                 </p>
//               </motion.div>

//               <div className="space-y-4">
//                 {activeService.content.features.map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 + index * 0.1 }}
//                     className="flex items-center gap-3 text-gray-700"
//                   >
//                     <div className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </motion.div>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full md:w-auto group px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium relative overflow-hidden"
//               >
//                 <span className="relative z-10">Try {activeService.content.title}</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </motion.button>
//             </div>

//             <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-100">
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="mb-6"
//               >
//                 <h3 className="text-lg font-medium text-gray-900 mb-1">
//                   Market Overview
//                 </h3>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Traffic Sources</span>
//                   <span>Last 30 days</span>
//                 </div>
//               </motion.div>

//               <div className="space-y-6">
//                 {activeService.content.stats.map((stat, index) => (
//                   <StatBar key={index} {...stat} delay={0.5 + index * 0.1} />
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default MarketingDashboard;
import React, { useState, useEffect, useRef } from 'react';
import { Settings, FileText, BarChart2, Megaphone, Share2, Users } from 'lucide-react';

// Custom hook for intersection observer
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

const ServiceTab = ({ service, isActive, onClick, index, isInView }) => {
  const Icon = service.icon;
  
  return (
    <div
      onClick={() => onClick(service.id)}
      className={`
        cursor-pointer flex items-center gap-3 px-6 py-4 w-full
        relative group transition-all duration-300
        transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {isActive && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 -z-10"
        />
      )}
      
      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300
        ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
      <span className="text-sm md:text-base whitespace-nowrap">
        {service.title}
      </span>
      
      {/* Premium accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 transform scale-y-0 transition-transform duration-300
                    ${isActive ? 'scale-y-100' : 'group-hover:scale-y-50'}`} />
    </div>
  );
};

const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
  return (
    <div className="relative md:hidden px-4 py-3">
      <select
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value)}
        className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {services.map(service => (
          <option key={service.id} value={service.id}>
            {service.title}
          </option>
        ))}
      </select>
      <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none">
        <BarChart2 className="w-5 h-5 text-blue-500" />
      </div>
    </div>
  );
};

const MarketingDashboard = () => {
  const [activeTab, setActiveTab] = useState('research');
  const [sectionRef, isInView] = useIntersectionObserver();
  const activeService = services.find(s => s.id === activeTab);

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-br from-blue-50 to-white py-24 relative">
      {/* Premium grid background */}
       {/* Base grid with blue tint */}
       <div className="absolute inset-0">
        {/* Primary blue grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* White fade overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Centered Header with animation */}
        <div className={`mb-16 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
              MARKETING INTELLIGENCE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              Grow Smarter
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Transform your marketing strategy with data-driven insights and powerful tools
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm
                      transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <MobileTabSelector services={services} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="hidden md:flex border-b border-gray-100">
            {services.map((service, index) => (
              <div key={service.id} className="flex-1">
                <ServiceTab 
                  service={service}
                  isActive={activeTab === service.id}
                  onClick={setActiveTab}
                  index={index}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Content Section */}
            <div className={`space-y-8 transition-all duration-700 delay-300 transform
                          ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeService.content.title}
                </h2>
                <p className="text-gray-600">
                  {activeService.content.description}
                </p>
              </div>

              <div className="space-y-4">
                {activeService.content.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 
                               rounded-lg text-white font-medium relative overflow-hidden">
                <span className="relative z-10">Try {activeService.content.title}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Image Section */}
            <div className={`relative rounded-xl overflow-hidden transition-all duration-700 delay-500 transform
                          ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/5" />
              <img
                src="/api/placeholder/800/600"
                alt="Marketing Analytics"
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Premium corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example services data structure
const services = [
  {
    id: 'research',
    icon: FileText,
    title: 'Market Research',
    content: {
      title: 'Market Research',
      description: 'Gain deep insights into your market dynamics.',
      features: [
        'Comprehensive market analysis',
        'Competitor tracking',
        'Consumer behavior insights',
        'Trend forecasting'
      ]
    }
  },
  {
    id: 'analytics',
    icon: BarChart2,
    title: 'Analytics',
    content: {
      title: 'Analytics Suite',
      description: 'Transform data into actionable insights.',
      features: [
        'Real-time data tracking',
        'Custom report generation',
        'Performance metrics',
        'ROI analysis'
      ]
    }
  },
  {
    id: 'campaigns',
    icon: Megaphone,
    title: 'Campaigns',
    content: {
      title: 'Campaign Management',
      description: 'Launch and manage high-impact campaigns.',
      features: [
        'Campaign planning',
        'Content scheduling',
        'Performance tracking',
        'A/B testing'
      ]
    }
  },
  {
    id: 'campaigns',
    icon: Megaphone,
    title: 'Campaigns',
    content: {
      title: 'Campaign Management',
      description: 'Launch and manage high-impact campaigns.',
      features: [
        'Campaign planning',
        'Content scheduling',
        'Performance tracking',
        'A/B testing'
      ]
    }
  },
  {
    id: 'campaigns',
    icon: Megaphone,
    title: 'Campaigns',
    content: {
      title: 'Campaign Management',
      description: 'Launch and manage high-impact campaigns.',
      features: [
        'Campaign planning',
        'Content scheduling',
        'Performance tracking',
        'A/B testing'
      ]
    }
  },
  {
    id: 'campaigns',
    icon: Megaphone,
    title: 'Campaigns',
    content: {
      title: 'Campaign Management',
      description: 'Launch and manage high-impact campaigns.',
      features: [
        'Campaign planning',
        'Content scheduling',
        'Performance tracking',
        'A/B testing'
      ]
    }
  },
  // Add more services as needed
];

export default MarketingDashboard;
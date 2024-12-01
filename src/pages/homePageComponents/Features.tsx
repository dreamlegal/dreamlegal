// "use client"

// import { Settings, FileText, BarChart2, Megaphone, Share2, Users } from 'lucide-react';

// // Custom hook for intersection observer
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

// const ServiceTab = ({ service, isActive, onClick, index, isInView }) => {
//   const Icon = service.icon;
  
//   return (
//     <div
//       onClick={() => onClick(service.id)}
//       className={`
//         cursor-pointer flex items-center gap-3 px-6 py-4 w-full
//         relative group transition-all duration-300
//         transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
//         ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}
//       `}
//       style={{ transitionDelay: `${index * 100}ms` }}
//     >
//       {isActive && (
//         <div
//           className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 -z-10"
//         />
//       )}
      
//       <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300
//         ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
//       <span className="text-sm md:text-base whitespace-nowrap">
//         {service.title}
//       </span>
      
//       {/* Premium accent line */}
//       <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 transform scale-y-0 transition-transform duration-300
//                     ${isActive ? 'scale-y-100' : 'group-hover:scale-y-50'}`} />
//     </div>
//   );
// };

// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
  
//   const activeService = services.find(service => service.id === activeTab);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const dropdownVariants = {
//     hidden: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         duration: 0.2,
//       }
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.2,
//       }
//     },
//     exit: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         duration: 0.2,
//       }
//     }
//   };

//   return (
//     <div className="relative md:hidden px-4 z-50" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-6 py-3 bg-white/70 backdrop-blur-lg
//                  rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]
//                  border border-gray-100
//                  text-left relative
//                  transition-all duration-200
//                  hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
//       >
//         <span className="text-gray-600 font-medium text-sm">{activeService?.title}</span>
//         <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
//           <ChevronDown className="w-5 h-5" />
//         </div>
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={dropdownVariants}
//             className="absolute top-full left-4 right-4 mt-2"
//           >
//             <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
//               <div className="py-1">
//                 {services.map((service) => (
//                   <button
//                     key={service.id}
//                     onClick={() => {
//                       setActiveTab(service.id);
//                       setIsOpen(false);
//                     }}
//                     className={`w-full px-6 py-3 text-left text-sm transition-colors duration-200
//                               ${service.id === activeTab 
//                                 ? 'bg-gray-50/80 text-gray-900 font-medium' 
//                                 : 'text-gray-600 hover:bg-gray-50/50 hover:text-gray-900'
//                               }`}
//                   >
//                     {service.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };





// const MarketingDashboard = () => {
//   const [activeTab, setActiveTab] = useState('research');
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const activeService = services.find(s => s.id === activeTab);

//   return (
//     <div ref={sectionRef} className="w-full bg-gradient-to-br from-blue-50 to-white py-24 relative">
//       {/* Premium grid background */}
//        {/* Base grid with blue tint */}
//        <div className="absolute inset-0">
//         {/* Primary blue grid */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        
//         {/* White fade overlays */}
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
//         {/* Side fades */}
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 relative">
//         {/* Centered Header with animation */}
//         <div className={`mb-16 text-center relative transition-all duration-700 transform
//                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="inline-block">
//             <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//             Legal Tech Intelligence


//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
//             Our Solution suite 
//               <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
//                            transform origin-left transition-transform duration-1000 
//                            ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//             </h2>
//             <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//             Transform your legal ops strategy with data-driven insights and powerful tools
//             </p>
//           </div>
//         </div>

//         {/* Main Content Card */}
//         <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm
//                       transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <MobileTabSelector services={services} activeTab={activeTab} setActiveTab={setActiveTab} />
          
//           <div className="hidden md:flex border-b border-gray-100">
//             {services.map((service, index) => (
//               <div key={service.id} className="flex-1">
//                 <ServiceTab 
//                   service={service}
//                   isActive={activeTab === service.id}
//                   onClick={setActiveTab}
//                   index={index}
//                   isInView={isInView}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 p-8">
//             {/* Content Section */}
//             <div className={`space-y-8 transition-all duration-700 delay-300 transform
//                           ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                   {activeService.content.title}
//                 </h2>
//                 <p className="text-gray-600">
//                   {activeService.content.description}
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 {activeService.content.features.map((feature, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-3 text-gray-700"
//                     style={{ transitionDelay: `${400 + index * 100}ms` }}
//                   >
//                     <div className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 
//                                rounded-lg text-white font-medium relative overflow-hidden">
//                 <span className="relative z-10">Try {activeService.content.title}</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 
//                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
//             </div>

//             {/* Image Section */}
//             <div className={`relative rounded-xl overflow-hidden transition-all duration-700 delay-500 transform
//                           ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/5" />
//               <img
//                 src="/api/placeholder/800/600"
//                 alt="Marketing Analytics"
//                 className="w-full h-full object-cover rounded-xl"
//               />
//               {/* Premium corner accents */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent" />
//               <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/20 to-transparent" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Example services data structure
// const services = [
//   {
//     id: 'research',
//     icon: FileText,
//     title: 'Market Research',
//     content: {
//       title: 'Market Research',
//       description: 'Gain deep insights into your market dynamics.',
//       features: [
//         'Comprehensive market analysis',
//         'Competitor tracking',
//         'Consumer behavior insights',
//         'Trend forecasting'
//       ]
//     }
//   },
//   {
//     id: 'analytics',
//     icon: BarChart2,
//     title: 'Analytics',
//     content: {
//       title: 'Analytics Suite',
//       description: 'Transform data into actionable insights.',
//       features: [
//         'Real-time data tracking',
//         'Custom report generation',
//         'Performance metrics',
//         'ROI analysis'
//       ]
//     }
//   },
//   {
//     id: 'campaigns',
//     icon: Megaphone,
//     title: 'Campaigns',
//     content: {
//       title: 'Campaign Management',
//       description: 'Launch and manage high-impact campaigns.',
//       features: [
//         'Campaign planning',
//         'Content scheduling',
//         'Performance tracking',
//         'A/B testing'
//       ]
//     }
//   },
//   {
//     id: 'campaigns',
//     icon: Megaphone,
//     title: 'Campaigns',
//     content: {
//       title: 'Campaign Management',
//       description: 'Launch and manage high-impact campaigns.',
//       features: [
//         'Campaign planning',
//         'Content scheduling',
//         'Performance tracking',
//         'A/B testing'
//       ]
//     }
//   },
//   {
//     id: 'campaigns',
//     icon: Megaphone,
//     title: 'Campaigns',
//     content: {
//       title: 'Campaign Management',
//       description: 'Launch and manage high-impact campaigns.',
//       features: [
//         'Campaign planning',
//         'Content scheduling',
//         'Performance tracking',
//         'A/B testing'
//       ]
//     }
//   },
//   {
//     id: 'campaigns',
//     icon: Megaphone,
//     title: 'Campaigns',
//     content: {
//       title: 'Campaign Management',
//       description: 'Launch and manage high-impact campaigns.',
//       features: [
//         'Campaign planning',
//         'Content scheduling',
//         'Performance tracking',
//         'A/B testing'
//       ]
//     }
//   },
//   // Add more services as needed
// ];

// export default MarketingDashboard;

"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Settings, FileText, BarChart2, Megaphone, Share2, Users, BookOpen, TrendingUp, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 transform scale-y-0 transition-transform duration-300
                    ${isActive ? 'scale-y-100' : 'group-hover:scale-y-50'}`} />
    </div>
  );
};

const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const activeService = services.find(service => service.id === activeTab);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative md:hidden px-4 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-3 bg-white/70 backdrop-blur-lg
                 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                 border border-gray-100
                 text-left relative
                 transition-all duration-200
                 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      >
        <span className="text-gray-600 font-medium text-sm">{activeService?.title}</span>
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute top-full left-4 right-4 mt-2"
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
              <div className="py-1">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setActiveTab(service.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-6 py-3 text-left text-sm transition-colors duration-200
                              ${service.id === activeTab 
                                ? 'bg-gray-50/80 text-gray-900 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50/50 hover:text-gray-900'
                              }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LegalTechDashboard = () => {
  const [activeTab, setActiveTab] = useState('workflow');
  const [sectionRef, isInView] = useIntersectionObserver();
  const activeService = services.find(s => s.id === activeTab);

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-br from-blue-50 to-white py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className={`mb-16 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
              Legal Tech Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              Our Solution Suite
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Transform your legal ops strategy with data-driven insights and powerful tools
            </p>
          </div>
        </div>

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

            <div className={`relative rounded-xl overflow-hidden transition-all duration-700 delay-500 transform
                          ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/5" />
              <img
                src="/api/placeholder/800/600"
                alt="Legal Tech Solution"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated services data structure
const services = [
  {
    id: 'workflow',
    icon: RefreshCw,
    title: 'Workflow Analysis',
    content: {
      title: 'Workflow Analysis',
      description: 'Analyse your legal workflows for efficiency',
      features: [
        'Identify red flags in operational processes',
        'Discover automation opportunities to save time and reduce errors',
        'Generate implementation plans for seamless integration',
        'Highlight potential wins to maximize productivity and ROI'
      ]
    }
  },
  {
    id: 'directory',
    icon: FileText,
    title: 'Directory',
    content: {
      title: 'Directory',
      description: 'Software Discovery Made Easy',
      features: [
        'Identify your legal team unique needs effortlessly',
        'Build a customized feature list for ideal solutions',
        'Filter and compare software tailored to your requirements',
        'Kickstart direct conversations with vendors to make informed decisions'
      ]
    }
  },
  {
    id: 'learning',
    icon: BookOpen,
    title: 'Learning',
    content: {
      title: 'Learning',
      description: 'Legal Technology Learning Simplified',
      features: [
        'Utilize grids and matrices to identify the best legal tech solutions',
        'Access comprehensive guides on industry best practices',
        'Explore feature-specific articles to deepen your understanding of tools',
        'Leverage learning resources to make the most of your chosen solutions'
      ]
    }
  },
  {
    id: 'trends',
    icon: TrendingUp,
    title: 'Trend Analysis',
    content: {
      title: 'Trend Analysis',
      description: 'Trend Analysis to stay with the time',
      features: [
        'Gain industry insights on current legal tech preferences',
        'Access detailed market reports across various sectors',
        'Explore legal team-specific insights for tailored strategies',
        'Understand top industry challenges and discover how legal teams are tackling them'
      ]
    }
  },
  {
    id: 'change',
    icon: Settings,
    title: 'Change Management',
    content: {
      title: 'Change Management',
      description: 'Process based Change Management',
      features: [
        'Seamlessly onboard technology with roadmap',
        'Measure impact with clear metrics and actionable insights',
        'Ensure team readiness for smooth adoption and integration',
        'Manage data and access securely for optimal efficiency'
      ]
    }
  }
];

export default LegalTechDashboard;
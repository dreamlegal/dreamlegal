
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Settings, FileText, BarChart2, Megaphone, 
  Share2, Users, BookOpen, TrendingUp, RefreshCw,
  Award, Compass, Zap, Target, FileSpreadsheet 
} from 'lucide-react';
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
//       transition: { duration: 0.2 }
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.2 }
//     },
//     exit: {
//       opacity: 0,
//       y: -10,
//       transition: { duration: 0.2 }
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

const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
  const [touchedTab, setTouchedTab] = useState(null);
  
  return (
    <div className="md:hidden px-4 py-2">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        <div className="flex justify-around items-center px-2 py-3">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === activeTab;
            
            return (
              <div
                key={service.id}
                className="relative flex flex-col items-center"
                onTouchStart={(e) => {
                  e.preventDefault();
                  setTouchedTab(service.id);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setTouchedTab(null);
                  setActiveTab(service.id);
                }}
                onTouchCancel={() => setTouchedTab(null)}
                onClick={(e) => e.preventDefault()}
              >
                <div
                  className={`
                    p-3 rounded-xl cursor-pointer transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50/50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <AnimatePresence>
                  {touchedTab === service.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-14 px-3 py-1.5
                               bg-gray-900 text-white text-xs font-medium 
                               rounded-lg whitespace-nowrap z-50"
                    >
                      {service.title}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                                    w-2 h-2 bg-gray-900 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const services = [
  {
    id: 'product-profiles',
    icon: Award,
    title: 'Product Profiles',
    content: {
      title: 'Product Profiles',
      description: 'Compelling product profiles to captivate clients',
      features: [
        'Showcase comprehensive product descriptions',
        'Highlight features and functionalities effectively',
        'Build trust with social proof and testimonials',
        'Provide reviews and insights to reinforce value'
      ]
    }
  },
  {
    id: 'rfp-management',
    icon: FileSpreadsheet,
    title: 'RFP Management',
    content: {
      title: 'RFP Management',
      description: 'Master Your RFP management with warm legal teams',
      features: [
        'Qualified client requirements ready for action',
        'Opportunities to create impactful POCs',
        'Pre-requirements available for thorough preparation',
        'Insights to tailor and optimize your outreach'
      ]
    }
  },
  {
    id: 'market-trends',
    icon: Compass,
    title: 'Market Trends',
    content: {
      title: 'Market Trend Analysis',
      description: 'Unlock key analytics to identify legal industry challenges',
      features: [
        'Analytics on key industry challenges and solutions',
        'Sector-specific insights into industry preferences',
        'Contemporary goals and priorities of legal teams',
        'Technology and innovation strategies of legal professionals'
      ]
    }
  },
  {
    id: 'competitor-analysis',
    icon: BarChart2,
    title: 'Competitor Analysis',
    content: {
      title: 'Competitor Analysis',
      description: 'Outsmart your competitors with analysis and comparison',
      features: [
        'Process lifecycle coverage for comprehensive evaluation',
        'Detailed feature-by-feature comparison',
        'Client base analysis to gauge market reach',
        'Support and service benchmarks for creating edge'
      ]
    }
  },
  {
    id: 'feature-validation',
    icon: Zap,
    title: 'Feature Validation',
    content: {
      title: 'Feature Validation',
      description: 'Validate Features and product plans with Precision',
      features: [
        'AI-driven reports on feature scalability',
        'Insights on top sector beneficiaries',
        'Recommendations for related feature sets to offer',
        'Identification of impact areas for maximum value'
      ]
    }
  },
  {
    id: 'custom-proposal',
    icon: Target,
    title: 'Custom Proposals',
    content: {
      title: 'Custom Client Proposal',
      description: 'AI proposal to show that you care for legal teams',
      features: [
        'AI-generated proposals tailored to legal team\'s needs',
        'Sector-specific problem and solution highlights',
        'Curated best feature sets from your product',
        'Impact stories to effectively convince prospects'
      ]
    }
  }
];

const LegalTechDashboard = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const [sectionRef, isInView] = useIntersectionObserver();
  
  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (

          <div
  ref={sectionRef}
  className="w-full bg-gradient-to-br from-blue-50 to-white pt-16 pb-4 sm:pt-24 sm:pb-8 relative"
>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
  Our Solution Suite
  <div
    className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
                transform origin-left transition-transform duration-1000 
                ${isInView ? 'scale-x-100' : 'scale-x-0'}`}
  />
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

export default LegalTechDashboard;

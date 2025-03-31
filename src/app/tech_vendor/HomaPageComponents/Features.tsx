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
        ${isActive ? 'text-[#7cc6ee] font-medium' : 'text-[#2d2d2d]'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {isActive && (
        <div
          className="absolute inset-0 bg-[#f5f7fa] -z-10"
        />
      )}
      
      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300
        ${isActive ? 'text-[#7cc6ee]' : 'text-[#334155] group-hover:text-[#7cc6ee]'}`} />
      <span className="text-sm md:text-base whitespace-nowrap">
        {service.title}
      </span>
      
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[#7cc6ee] transform scale-y-0 transition-transform duration-300
                    ${isActive ? 'scale-y-100' : 'group-hover:scale-y-50'}`} />
    </div>
  );
};


const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
  const [touchedTab, setTouchedTab] = useState(null);
  
  return (
    <div className="md:hidden px-4 py-2">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-[#7cc6ee]/10">
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
                      ? 'bg-[#f5f7fa] text-[#7cc6ee]' 
                      : 'text-[#334155] hover:text-[#7cc6ee] hover:bg-[#f5f7fa]/50'
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
                               bg-[#1e2556] text-white text-xs font-medium 
                               rounded-lg whitespace-nowrap z-50"
                    >
                      {service.title}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                                    w-2 h-2 bg-[#1e2556] rotate-45" />
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
      ],
      buttonText: "Create Product Profile",
      imagePath: "/tech_vendor/directory.png",
      imageAlt: "Product Profiles",
      href: "/directory"
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
      ],
      buttonText: "Manage RFPs",
      imagePath: "/tech_vendor/RFP.png",
      imageAlt: "RFP Management",
      href: "/auth/vendor/login"
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
      ],
      buttonText: "Explore Trends",
      imagePath: "/tech_vendor/analytics.png",
      imageAlt: "Market Trends",
      href: "/auth/vendor/login"
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
      ],
      buttonText: "Validate Features",
      imagePath: "/tech_vendor/Ai market research.png",
      imageAlt: "Feature Validation",
      href: "/auth/vendor/login"
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
      ],
      buttonText: "Generate Proposal",
      imagePath: "/tech_vendor/client prospecting.png",
      imageAlt: "Custom Proposal",
    
      href: "/auth/vendor/login"
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
      ],
      buttonText: "Analyze Competition",
      imagePath: "",
      imageAlt: "Competitor Analysis",
      href: "/auth/vendor/login"
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
      className="w-full bg-white pt-16 pb-4 sm:pt-24 sm:pb-8 relative"
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className={`mb-16 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              LEGAL TECH INTELLIGENCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block">
              Our Solution Suite
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                          transform origin-left transition-transform duration-1000 
                          ${isInView ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </h2>
            <p className="text-[#2d2d2d] mt-4 max-w-xl mx-auto">
              Optimized product profiles & shorter sale cycles for your next client
            </p>
          </div>
        </div>

        <div className={`bg-[#f5f7fa] rounded-2xl shadow-xl border border-[#7cc6ee]/10 overflow-hidden
                      transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <MobileTabSelector services={services} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="hidden md:flex border-b border-[#7cc6ee]/10">
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

          <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className={`space-y-8 transition-all duration-700 delay-300 transform md:w-1/2
                          ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div>
                <h2 className="text-3xl font-bold text-[#1e2556] mb-4">
                  {activeService.content.title}
                </h2>
                <p className="text-[#2d2d2d]">
                  {activeService.content.description}
                </p>
              </div>

              <div className="space-y-4">
                {activeService.content.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-[#2d2d2d]"
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#7cc6ee] flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className="px-8 py-3 bg-[#1e2556] 
                         rounded-lg text-white font-medium relative overflow-hidden"
                onClick={() => window.location.href = activeService.content.href}
              >
                <span className="relative z-10">{activeService.content.buttonText}</span>
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#1e2556] rounded-2xl blur opacity-20 transition duration-300"></div>
                
                <div className="relative bg-white p-3 md:p-6 rounded-2xl shadow-xl transform transition-all duration-500 border border-[#7cc6ee]/10">
                  <div className="absolute inset-0 bg-[#f5f7fa] rounded-2xl opacity-50"></div>
                  
                  {activeService.content.imagePath ? (
                    <img
                      src={activeService.content.imagePath}
                      alt={activeService.content.imageAlt}
                      className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
                    />
                  ) : (
                    <div className="relative z-10 w-full rounded-xl shadow-lg bg-[#f5f7fa] flex items-center justify-center">
                      {/* 16:9 aspect ratio placeholder */}
                      <div className="pb-[56.25%]"></div>
                      <span className="absolute text-[#334155] text-lg font-medium">Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalTechDashboard;
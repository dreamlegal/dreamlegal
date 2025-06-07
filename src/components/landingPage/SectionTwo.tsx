
import React, { useState, useRef, useEffect } from 'react';
import { FileSearch, Scale, PieChart } from 'lucide-react';

const LegalServicesSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  
  const stats = [
    {
      count: "1200+",
      title: "Legal Technology Products Mapped",
      description: "We have meticulously mapped over 1200 legal tech products, helping legal teams find solutions tailored to their needs.",
      icon: FileSearch,
      delay: 0
    },
    {
      count: "1700+",
      title: "Legal Processes Analyzed",
      description: "Our in-depth analysis of 1700+ legal processes ensures that technology aligns with operational workflows for maximum efficiency.",
      icon: Scale,
      delay: 100
    },
    {
      count: "99.2%",
      title: "Client Satisfaction",
      description: "With a 99.2% satisfaction rate, we have consistently delivered impactful digital transformation projects for law firms and legal departments.",
      icon: PieChart,
      delay: 200
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      {/* Background effects */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255610_1px,transparent_1px),linear-gradient(to_bottom,#1e255610_1px,transparent_1px)] bg-[size:24px_24px]" />
       */}
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top section with split layout */}
        <div className={`mb-16 transition-all duration-1000 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] tracking-tight leading-tight">
              Data-Driven Insights That Drive Legal Innovation
            </h2>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`relative transition-all duration-700 transform
                         ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${stat.delay}ms` }}
              >






                <div className="relative px-6 py-8 bg-[#f5f7fa] rounded-lg">
                  {/* Count */}
                  <div className="mb-3">
                    <span className="text-4xl lg:text-5xl font-bold text-[#1e2556] tracking-tight">
                      {stat.count}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#334155] mb-3">
                    {stat.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#2d2d2d] text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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

export default LegalServicesSection;
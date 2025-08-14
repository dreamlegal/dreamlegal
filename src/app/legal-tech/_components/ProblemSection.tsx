
"use client"
import React, { useRef, useState } from 'react';
import { AlertTriangle, PieChart, TrendingDown } from 'lucide-react';

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

const ProblemSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  const problems = [
    {
      icon: AlertTriangle,
      title: "Long Sales Cycle",
      description: "Prolonged sales timelines hinder growth, slow down revenue generation, and create missed opportunities, delaying the overall business impact.",
      stat: "45%",
      impact: "Sales Cycle Delays"
    },
    {
      icon: PieChart,
      title: "Unexpected Legal Team's Demands",
      description: "Unforeseen requests from legal teams disrupt workflows, create resource strain, and lead to project delays, impacting overall efficiency.",
      stat: "40%",
      impact: "Increase in Resource Strain"
    },
    {
      icon: TrendingDown,
      title: "High-Cost Client Nurturing",
      description: "Expensive and resource-draining client nurturing processes lead to inefficiencies, prolonged sales cycles, and reduced profitability.",
      stat: "35%",
      impact: "Increased Client Acquisition Costs"
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-[#1e2556] pt-8 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`mb-20 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              CHALLENGES WE SOLVE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
              Common Industry Problems
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-white/80 mt-6 max-w-2xl mx-auto text-lg">
              Identify and address the critical challenges holding back your growth
            </p>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="flex flex-col md:flex-row gap-8 relative">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className={`relative flex-1 group transition-all duration-700 transform
                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden h-full">
                  {/* Card background */}
                  <div className="absolute inset-0 bg-[#f5f7fa] shadow-lg border border-white/10" />
                  
                  {/* Content container */}
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon with background effect */}
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-[#7cc6ee]/20 rounded-full blur-xl transform group-hover:scale-110 transition-transform" />
                      <div className="relative w-14 h-14 rounded-2xl bg-[#1e2556] 
                                  flex items-center justify-center shadow-lg
                                  transform group-hover:-translate-y-1 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Text content */}
                    <h3 className="text-xl font-bold text-[#1e2556] mb-3 group-hover:text-[#7cc6ee] transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-[#334155] mb-6 leading-relaxed flex-grow">
                      {problem.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm mt-auto">
                      <div className="font-bold text-2xl text-[#7cc6ee]">
                        {problem.stat}
                      </div>
                      <div className="text-[#334155] font-medium">
                        {problem.impact}
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-4 right-4 h-1 bg-[#7cc6ee]/30
                                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProblemSection;
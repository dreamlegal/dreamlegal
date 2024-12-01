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
      title: "Broken Legal Workflows",
      description: "Fragmented processes & lack of structure lead to delays, errors, & missed opportunities, undermining your team's efficiency.",
      stat: "56%",
      impact: "Workflow Disruption"
    },
    {
      icon: PieChart,
      title: "No Efficiency Plans",
      description: "The absence of a clear strategy results in wasted resources, untracked progress, and missed chances to optimize operations.",
      stat: "61%",
      impact: "Strategic Gaps"
    },
    {
      icon: TrendingDown,
      title: "Long Tech Adoption Cycles",
      description: "Prolonged adoption timelines create setbacks, slow progress, and increase resistance, delaying the realization of value.",
      stat: "49%",
      impact: "Delayed Implementation"
    }
  ];

  


  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-br from-gray-100 to-white py-24 relative overflow-hidden">
      {/* Premium grid background with stronger lines for depth */}
      <div className="absolute inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Secondary grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
        
        {/* Top fade with white */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/95 to-transparent" />
        
        {/* Bottom fade with white */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
        {/* Soft radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
        
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>
      
    

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`mb-20 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
              CHALLENGES WE SOLVE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              Common Industry Problems
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
             
Identify and address the critical challenges holding back your growth

            </p>
          </div>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 transform
                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Card with inset effect */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Inset shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 
                               backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
                  
                  {/* Content container */}
                  <div className="relative p-8 bg-gradient-to-br from-transparent to-white/50">
                    {/* Icon with background effect */}
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 
                                  flex items-center justify-center shadow-lg shadow-blue-500/20
                                  transform group-hover:-translate-y-1 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Text content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {problem.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="font-bold text-2xl text-blue-600">
                        {problem.stat}
                      </div>
                      <div className="text-gray-500 font-medium">
                        {problem.impact}
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 
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
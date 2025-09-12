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
      title: "Differentiation Gap",
      description: "Struggling to stand out in a crowded market. Dozens of legal tech products compete for the same audience. Without a clear edge, even strong solutions risk blending in.",
      stat: "70%",
       impact: "of vendors cite “lack of differentiation” as their top challenge."
    },
    {
      icon: PieChart,
      title: "Demand Drought",
      description: "Inconsistent, low-quality inbound leads. Cold outreach and scattered campaigns often fail to bring in the right prospects. Without consistent inbound demand, growth stalls.",
      stat: "65%",
      impact: "of vendors report unreliable pipelines as their biggest barrier."
    },
    {
      icon: TrendingDown,
      title: "Visibility & Trust Barrier",
      description: "Hard to win attention against established names. Prospects often default to the most visible brands—not always the best solutions. Building trust and credibility takes years, unless you have a shortcut.",
      stat: "60%",
      impact: "of vendors say credibility, not product quality, decides their deals."
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-[#1e2556] py-8 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-8 md:mb-12 lg:mb-20 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-4 sm:px-0">
            <span className="block text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              CHALLENGES WE SOLVE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 relative inline-block leading-tight">
              Common Industry Problems
              <div className={`absolute -bottom-1 md:-bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-white/80 mt-4 md:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0">
              Break out of the noise, earn credibility faster, and create consistent demand—no  matter your stage.
            </p>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 relative">
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
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-full">
                  {/* Card background */}
                  <div className="absolute inset-0 bg-[#f5f7fa] shadow-lg border border-white/10" />
                  
                  {/* Content container */}
                  <div className="relative p-4 sm:p-6 md:p-8 h-full flex flex-col">
                    {/* Icon with background effect */}
                    <div className="mb-4 md:mb-6 relative">
                      <div className="absolute inset-0 bg-[#7cc6ee]/20 rounded-full blur-xl transform group-hover:scale-110 transition-transform" />
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#1e2556] 
                                  flex items-center justify-center shadow-lg
                                  transform group-hover:-translate-y-1 transition-transform">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>

                    {/* Text content */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#1e2556] mb-2 md:mb-3 group-hover:text-[#7cc6ee] transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-[#334155] mb-4 md:mb-6 leading-relaxed flex-grow text-sm sm:text-base">
                      {problem.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm mt-auto">
                      <div className="font-bold text-xl sm:text-2xl text-[#7cc6ee]">
                        {problem.stat}
                      </div>
                      <div className="text-[#334155] font-medium text-xs sm:text-sm leading-relaxed">
                        {problem.impact}
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 md:left-4 md:right-4 h-1 bg-[#7cc6ee]/30
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
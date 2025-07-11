"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Rocket, Target, Zap } from 'lucide-react';

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

// Custom hook for animated counter
const useCounter = (end, duration = 2000, start = 0, shouldStart = false) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * (end - start) + start);
      
      setCount(current);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, shouldStart]);
  
  return count;
};

const AnimatedMetric = ({ value, suffix = '', prefix = '', isVisible }) => {
  const count = useCounter(parseFloat(value), 2000, 0, isVisible);
  
  const formattedCount = suffix === '%' ? count.toFixed(1) : count;
  
  return (
    <div className="relative">
      <span className={`text-3xl font-bold transition-all duration-300
                     ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
        {prefix}{formattedCount}{suffix}
      </span>
      <div className="absolute -inset-1 bg-[#1e2556]/20 
                    blur-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
    </div>
  );
};

const AnimatedAchievements = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [sectionRef, isInView] = useIntersectionObserver();
  const achievements = [
    {
      icon: <Target className="w-6 h-6" />,
      metric: "130",
      suffix: "%",
      title: "Optimize Client Engagement",
      description: "Reduce client nurturing cost by engaging warm and high intent leads.",
      accentColor: "bg-[#7cc6ee]"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      metric: "10",
      prefix: "",
      suffix: "x",
      title: "Data driven product strategy",
      description: "Leverage analytics to guide product development and align with market demands.",
      accentColor: "bg-[#1e2556]"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      metric: "24",
      suffix: "/7",
      title: "Enhanced Market Fit",
      description: "Use customer feedback and usage data to refine features and ensure the product meets evolving market needs.",
      accentColor: "bg-[#7cc6ee]"
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-[#1e2556] py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header section */}
        <div className={`mb-8 md:mb-20 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              DELIVERING RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 relative inline-block">
              Our Impact
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-4 max-w-xl mx-auto px-4 sm:px-0">
              Transforming your client journey with cutting-edge solutions & measurable results
            </p>
          </div>
        </div>

        {/* Main achievements container */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#7cc6ee]/20" />

          {/* Responsive flex container - centered */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`relative group transform transition-all duration-700 w-full md:w-1/3 max-w-sm
                          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                          ${activeIndex === index ? 'scale-100 md:scale-105 z-10' : 'scale-95 opacity-90'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-white p-4 sm:p-6 
                               border border-[#7cc6ee]/10 
                               shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1e2556] opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="p-2 sm:p-2.5 bg-[#1e2556] rounded-md
                                  transition-colors duration-300">
                      <div className="text-white transition-colors duration-300">
                        {achievement.icon}
                      </div>
                    </div>
                    <AnimatedMetric 
                      value={achievement.metric}
                      suffix={achievement.suffix}
                      prefix={achievement.prefix}
                      isVisible={isInView}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-[#1e2556]">
                      {achievement.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 md:mt-12 flex justify-center space-x-3">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300
                         ${activeIndex === i 
                           ? 'bg-[#7cc6ee] scale-125 sm:scale-150' 
                           : 'bg-white/30 hover:bg-[#7cc6ee]/50'}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedAchievements;
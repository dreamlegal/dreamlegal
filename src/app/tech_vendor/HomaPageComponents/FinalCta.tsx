"use client"
import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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

const FinalCTA = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  return (
    
 <div ref={sectionRef} className="w-full bg-gradient-to-t from-blue-50 to-white pb-24 pt-4 relative">

      <div className="max-w-7xl mx-auto px-4">
        <div className={`transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Background gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
            
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent 
                         rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-600/5 to-transparent 
                         rounded-tr-full" />

            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between 
                         gap-8 md:gap-12">
              {/* Left side with text */}
              <div className="text-center md:text-left space-y-4 max-w-2xl">
                <span className={`inline-block text-sm font-semibold text-blue-600 tracking-wider
                              transition-all duration-700 delay-300
                              ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  GET STARTED TODAY
                </span>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 transition-all duration-700 delay-500
                             ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Transform Your Legal Operations {' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  With Us
                  </span>
                </h2>
                <p className={`text-lg text-gray-600 transition-all duration-700 delay-700
                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Join thousands of companies already growing with our solutions

                </p>
              </div>
              



              {/* Right side with button */}
              <div className={`transition-all duration-700 delay-1000
                           ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl 
                                text-white font-semibold text-lg transition-all duration-300
                                hover:shadow-lg hover:shadow-blue-500/25">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
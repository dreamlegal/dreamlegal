
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, LineChart, Target, Search } from 'lucide-react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = React.useRef(null);

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

const WhyChooseUs = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: Target,
      title: "Smart Savings",
      description: "Slash consultation costs and discovery time with our intuitive compare feature.",
      gradient: "from-[#1e2556] to-[#374177]"
    },
    {
      icon: Search,
      title: "Easy Learning",
      description: "We've made catching up with legal tech super simple for professionals.",
      gradient: "from-[#7cc6ee] to-[#5eb6e0]"
    },
    {
      icon: LineChart,
      title: "Detailed Analysis",
      description: "Access detailed feature breakdowns of each legal tech solution.",
      gradient: "from-[#1e2556] to-[#374177]"
    },
    {
      icon: Zap,
      title: "Tailored Vision",
      description: "Clear alignment of software capabilities with your requirements.",
      gradient: "from-[#7cc6ee] to-[#5eb6e0]"
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-white py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255608_1px,transparent_1px),linear-gradient(to_bottom,#1e255608_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f7fa]/50 via-transparent to-[#f5f7fa]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 
                       rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
            WHY CHOOSE US
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2556]">
            What Sets Us Apart
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] mx-auto" />
          </h2>
        </motion.div>

        {/* Features Grid - Single row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl 
                         border border-[#7cc6ee]/10 transition-all duration-300"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} 
                                flex items-center justify-center mb-6 group-hover:scale-105 
                                transition-transform duration-300`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg lg:text-xl font-bold text-[#1e2556] mb-3 group-hover:text-[#7cc6ee] 
                              transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm lg:text-base text-[#2d2d2d] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa]/50 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7cc6ee]/5 
                             to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
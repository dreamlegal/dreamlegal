
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Puzzle, LineChart, Users, Sparkles, Target } from 'lucide-react';

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

const AboutFeature = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  const values = [
    {
      icon: Puzzle,
      title: "Integration",
      description: "Inculcate technology into your workflow, ensuring smooth operation."
    },
    {
      icon: LineChart,
      title: "Value for Investment",
      description: "Tangible returns on investment, that deliver functionality and ROI."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Push the boundaries of traditional legal practice, unlocking new possibilities."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Foster teamwork and connectivity, enabling effortless communication."
    },
    {
      icon: Zap,
      title: "Efficiency",
      description: "Maximise productivity, freeing up valuable time to focus on what truly matters."
    },
    {
      icon: Target,
      title: "Impact",
      description: "Driving meaningful change in how you serve clients and achieve results."
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-white via-[#f5f7fa]/50 to-white py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e25560A_1px,transparent_1px),linear-gradient(to_bottom,#1e25560A_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          
          <div className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 
                       rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
            Our Core Values
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556]">
            The values that drives everything we do
          </h2>
          <p className="mt-6 text-lg text-[#334155] max-w-2xl mx-auto">
            Our vision is to unlock these six core values in the life of legal professionals through technology.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden"
              >
                {/* Card inner wrapper */}
                <div className="p-8 relative z-10">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-[#7cc6ee]/10 rounded-xl blur-xl 
                                transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative bg-gradient-to-br from-white to-[#f5f7fa] rounded-xl p-4
                                border border-[#7cc6ee]/20 group-hover:border-[#7cc6ee]/40 
                                transition-colors duration-300">
                      <Icon className="w-8 h-8 text-[#7cc6ee]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#1e2556] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#2d2d2d] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa]/0 via-[#f5f7fa]/0 to-[#f5f7fa]/50 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Borders */}
                <div className="absolute inset-0 rounded-2xl border border-gray-100 group-hover:border-[#7cc6ee]/20
                             transition-colors duration-300" />
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee]
                             transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutFeature;
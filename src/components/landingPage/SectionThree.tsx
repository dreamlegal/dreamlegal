
import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Cog, 
  FileContract, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  Scale, 
  ChevronRight 
} from 'lucide-react';
import CreateRfps from "./CreateRfp"
import ContactForm from "./ContactForm";

const LegalServicesSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState(null);
  // const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  const services = [
    // {
    //   icon: Brain,
    //   title: "AI Strategy",
    //   description: "We help legal teams craft and execute AI-driven strategies that enhance decision-making, streamline processes, and unlock new efficiencies.",
    //   delay: 0
    // },
    // {
    //   icon: Cog,
    //   title: "Technology Implementation",
    //   description: "From selecting the right tools to ensuring seamless integration, we guide legal teams through every step of successful technology adoption.",
    //   delay: 100
    // },
    // {
    //   icon: Cog,
    //   title: "Contract Automation",
    //   description: "We enable end-to-end contract lifecycle automation, reducing turnaround times and ensuring compliance with minimal manual intervention.",
    //   delay: 200
    // },
    // {
    //   icon: ShieldCheck,
    //   title: "Compliance Automation",
    //   description: "Our solutions help legal teams stay ahead of evolving regulations, automating compliance workflows to mitigate risks and improve efficiency.",
    //   delay: 300
    // },
    {
      icon: FileText,
      title: "Confident Tech Decisions",
      description: "Make legal tech choices that don’t need second opinions.",
      delay: 400
    },
    {
      icon: Briefcase,
      title: "Increased ROI",
      description: "Maximise value, not just spend — get more from every tool you adopt.",
      delay: 500
    },
    {
      icon: Scale,
      title: "Better Efficiency",
      description: "Improve processes, drive adoption, and let your team move smoothly.",
      delay: 600
    },
    {
      title: "Share Requirements",
      isCtaCard: true,
      delay: 700
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-[#1e2556] overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header section */}
        <div className={`mb-12 md:mb-16 transition-all duration-1000 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl">
            Top goals legal teams share with us
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7cc6ee] via-[#8ad0f7] to-[#7cc6ee]">
              Designed for legal excellence
            </span>
          </h2>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 transform
                          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${service.delay}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {service.isCtaCard ? (
                  // CTA Card with blue background
                  <div className="h-full relative rounded-2xl overflow-hidden bg-[#7cc6ee] shadow-lg shadow-[#7cc6ee]/20
                               transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-[#7cc6ee]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee] to-[#5eb6e0]" />
                    <div className="h-full flex flex-col items-center justify-center p-8 relative">
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        {/* <span className="text-xl font-bold text-white mb-4">{service.title}</span> */}
                        <button 
                        onClick={() => setIsRfpFormOpen(true)}
                        className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white rounded-full text-[#1e2556] font-medium
                                       hover:bg-[#f5f7fa] transition-colors duration-300 group">
                          <span>Share Requirements</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular service card
                  <div className="h-full relative rounded-2xl overflow-hidden bg-[#f5f7fa] backdrop-blur-sm 
                               border border-[#7cc6ee]/20 shadow-lg 
                               transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-[#7cc6ee]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] via-[#f5f7fa] to-[#7cc6ee]/10" />
                    
                    <div className="h-full flex flex-col p-6 relative">
                      {/* Icon */}
                      <div className="mb-4 relative">
                        {Icon && (
                          <div className="p-3 bg-[#7cc6ee]/10 rounded-xl inline-flex items-center justify-center
                                      group-hover:bg-[#7cc6ee]/20 transition-colors duration-300">
                            <Icon className="w-5 h-5 text-[#1e2556] group-hover:text-[#1e2556] transition-colors duration-300" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-lg font-bold text-[#1e2556] mb-3 group-hover:text-[#1e2556] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-[#2d2d2d] text-sm leading-relaxed group-hover:text-[#2d2d2d] transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Accent line at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7cc6ee] via-[#5eb6e0] to-[#7cc6ee] 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
       {isRfpFormOpen && (
        <CreateRfps 
          isOpen={isRfpFormOpen} 
          onClose={() => setIsRfpFormOpen(false)} 
        />
      )}
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
"use client"

import React, { useState, useEffect, useRef } from 'react';

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

const logos = [
  { 
    id: 1, 
    imageUrl: "clients/c1.png", 
    alt: 'Company 1'
  },
  { 
    id: 2, 
    imageUrl: 'clients/c6.jpg',
    alt: 'Company 2'
  },
  { 
    id: 3, 
    imageUrl: 'clients/c3.webp',
    alt: 'Company 3'
  },
  { 
    id: 4, 
    imageUrl: 'clients/c4.jpg',
    alt: 'Company 4'
  },
  { 
    id: 5, 
    imageUrl: 'clients/c5.jpg',
    alt: 'Company 5'
  }
];

const PremiumMarquee = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [sectionRef, isInView] = useIntersectionObserver();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered) {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const allLogos = [...logos, ...logos];

  return (
    <div ref={sectionRef} className="w-full bg-[#f5f7fa] relative overflow-hidden py-10 md:py-16 lg:py-32">
      <div className={`text-center mb-8 md:mb-12 lg:mb-20 relative z-10 px-4 transition-all duration-700 transform
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="block text-xs md:text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
          TRUSTED BY INDUSTRY LEADERS
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-4">
          Powering Legal Teams Who Aim Efficiency
        </h2>
        <div className={`w-16 md:w-24 h-1 bg-[#7cc6ee] mx-auto transform origin-left transition-transform duration-1000 
                      ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>

      <div className="relative w-full max-w-screen-lg mx-auto">
        {/* Left fade */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f5f7fa] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f5f7fa] to-transparent z-10 pointer-events-none" />
        
        <div 
          className="relative overflow-hidden mx-auto px-4 md:px-12"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex infinite-scroll">
            {allLogos.map((logo, index) => (
              <div
                key={`logo-${logo.id}-${index}`}
                className="flex-shrink-0 group relative px-12 md:px-16 lg:px-20"
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="relative w-20 md:w-28 lg:w-36 h-12 md:h-16 lg:h-20 flex items-center justify-center overflow-hidden rounded-xl">
                  {/* White center radial background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 bg-white backdrop-blur-sm" />
                  </div>

                  {/* Interactive spotlight effect */}
                  <div
                    className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, white 0%, rgba(239, 246, 255, 0.8) 30%, ${logo.color}20 100%)`,
                    }}
                  />

                  {/* Logo container */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-110">
                    {/* White radial glow behind logo */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,rgba(239,246,255,0.6)_50%,transparent_100%)] blur-sm" />
                    </div>

                    {/* Logo image */}
                    <img 
                      src={logo.imageUrl}
                      alt={logo.alt}
                      className="w-full h-full object-contain p-2 transition-all duration-500 group-hover:brightness-105"
                    />
                  </div>

                  {/* Premium border effect */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#7cc6ee]/20 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#7cc6ee]/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalStyles = () => (
  <style jsx global>{`
    .infinite-scroll {
      animation: scroll 30s linear infinite;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .infinite-scroll:hover {
      animation-play-state: paused;
    }

    @media (min-width: 768px) {
      .infinite-scroll {
        animation: scroll 40s linear infinite;
      }
    }
  `}</style>
);

const TrustedSection = () => (
  <>
    <GlobalStyles />
    <PremiumMarquee />
  </>
);

export default TrustedSection;
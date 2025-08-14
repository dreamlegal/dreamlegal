"use client"

const testimonials = [
  {
    id: 1,
    content: "This product has completely transformed how we operate. The ROI we've seen is incredible, and the support team is absolutely outstanding.",
    company: {
      name: "TechCorp Industries",
      size: "500+ employees",
      location: "San Francisco, CA",
      industry: "Enterprise Software",
      global: "12 countries served"
    },
    impact: {
      revenue: "+285% Revenue",
      users: "10k+ Active Users",
      timeframe: "3 months",
      achievement: "Enterprise Solution of the Year"
    },
    user: {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      image: "/api/placeholder/120/120"
    }
  },
  {
    id: 2,
    content: "The scalability and performance gains we've achieved are beyond our expectations. Our global team collaboration has reached new heights.",
    company: {
      name: "GlobalTech Solutions",
      size: "1000+ employees",
      location: "Singapore",
      industry: "FinTech",
      global: "25 countries served"
    },
    impact: {
      revenue: "+450% Growth",
      users: "50k+ Users",
      timeframe: "6 months",
      achievement: "Digital Innovation Award"
    },
    user: {
      name: "Michael Chen",
      role: "Head of Innovation",
      image: "/api/placeholder/120/120"
    }
  },
  {
    id: 3,
    content: "We've seen unprecedented growth in user engagement and market reach. The platform's analytics capabilities have revolutionized our decision-making.",
    company: {
      name: "DataDrive Analytics",
      size: "200+ employees",
      location: "London, UK",
      industry: "Data Analytics",
      global: "8 countries served"
    },
    impact: {
      revenue: "+320% ROI",
      users: "25k+ Users",
      timeframe: "4 months",
      achievement: "Best SaaS Solution"
    },
    user: {
      name: "Emma Williams",
      role: "Growth Director",
      image: "/api/placeholder/120/120"
    }
  }
];


import React, { useState, useEffect, useRef } from 'react';
import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer, ArrowLeft, ArrowRight } from 'lucide-react';

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

const TestimonialCard = ({ testimonial, isVisible }) => {
  return (
    <div className={`w-full transition-all duration-1000 transform overflow-hidden
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#f5f7fa] rounded-2xl lg:rounded-3xl -z-10" />
        
        {/* Main testimonial content */}
        <div className="lg:w-2/3 bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-lg border border-[#7cc6ee]/10">
          <div className="flex flex-col h-full">
            {/* Company Info Banner */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4 lg:mb-6 p-3 lg:p-4 bg-[#f5f7fa]
                         rounded-xl border border-[#7cc6ee]/10
                         transition-all duration-700 delay-300 transform">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-[#7cc6ee]" />
                <span className="font-semibold text-[#1e2556] text-sm lg:text-base">{testimonial.company.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-[#7cc6ee]" />
                <span className="text-[#334155] text-sm lg:text-base">{testimonial.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-[#7cc6ee]" />
                <span className="text-[#334155] text-sm lg:text-base">{testimonial.company.global}</span>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="mb-6 lg:mb-8">
              <div className="flex gap-3 lg:gap-4">
                <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-[#7cc6ee] flex-shrink-0" />
                <p className="text-base lg:text-xl text-[#2d2d2d] leading-relaxed
                             transition-all duration-700 delay-500">
                  {testimonial.content}
                </p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-auto flex flex-wrap gap-2 lg:gap-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-[#7cc6ee]" />,
                  value: testimonial.impact.revenue,
                  label: "Revenue Impact"
                },
                {
                  icon: <Users className="w-5 h-5 lg:w-6 lg:h-6 text-[#7cc6ee]" />,
                  value: testimonial.impact.users,
                  label: "Active Users"
                },
                {
                  icon: <Timer className="w-5 h-5 lg:w-6 lg:h-6 text-[#7cc6ee]" />,
                  value: testimonial.impact.timeframe,
                  label: "Implementation"
                },
                {
                  icon: <Award className="w-5 h-5 lg:w-6 lg:h-6 text-[#7cc6ee]" />,
                  value: "Award",
                  label: "Recognition"
                }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-[#f5f7fa] rounded-lg lg:rounded-xl p-3 lg:p-4 
                           flex flex-col items-center justify-center text-center border border-[#7cc6ee]/10
                           transition-all duration-500 transform flex-1"
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  {metric.icon}
                  <p className="text-sm lg:text-lg font-bold text-[#1e2556] mt-1 lg:mt-2">{metric.value}</p>
                  <p className="text-xs lg:text-sm text-[#334155]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="lg:w-1/3">
          <div className="bg-[#1e2556] rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white h-full
                         shadow-lg">
            <div className="flex flex-col h-full justify-center items-center text-center">
              <div className="mb-4 lg:mb-6 relative">
                <div className="absolute -inset-4 bg-[#7cc6ee]/20 rounded-full blur-lg" />
                <img
                  src={testimonial.user.image}
                  alt={testimonial.user.name}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl lg:rounded-2xl object-cover ring-4 ring-white/20 relative z-10"
                />
              </div>
              <div className="space-y-1 lg:space-y-2">
                <h3 className="text-xl lg:text-2xl font-bold">{testimonial.user.name}</h3>
                <p className="text-[#7cc6ee] text-sm lg:text-base">{testimonial.user.role}</p>
                <div className="pt-2 lg:pt-4">
                  <p className="text-xs lg:text-sm text-white/80">{testimonial.company.industry}</p>
                  <p className="text-xs lg:text-sm text-white/80">{testimonial.company.size}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isInView] = useIntersectionObserver();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[#f5f7fa] py-12 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-12 lg:mb-20 text-center">
          <div className="inline-block">
            <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              GLOBAL IMPACT STORIES
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block">
              Transforming Law Firms & Enterprises 
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000" />
            </h2>
            <p className="text-[#2d2d2d] mt-4 max-w-xl mx-auto text-sm lg:text-base">
              See how leading companies achieve remarkable results with our solutions
            </p>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isVisible={isInView}
          />

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6 mt-8 lg:mt-12">
            <div className="flex gap-2 lg:gap-3 order-2 lg:order-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group relative h-2"
                >
                  <div className={`h-0.5 transition-all duration-300 rounded-full
                                ${currentIndex === index 
                                  ? 'w-8 lg:w-12 bg-[#7cc6ee]' 
                                  : 'w-4 lg:w-6 bg-[#334155]/20 group-hover:bg-[#7cc6ee]/50'}`} />
                </button>
              ))}
            </div>
            
            <div className="flex gap-3 lg:gap-4 order-1 lg:order-2">
              <button
                onClick={prevTestimonial}
                className="p-2 lg:p-3 rounded-full bg-white shadow-md lg:shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:bg-[#f5f7fa] group border border-[#7cc6ee]/10"
              >
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-[#334155] group-hover:text-[#7cc6ee] transition-colors" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 lg:p-3 rounded-full bg-white shadow-md lg:shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:bg-[#f5f7fa] group border border-[#7cc6ee]/10"
              >
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#334155] group-hover:text-[#7cc6ee] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTestimonials;
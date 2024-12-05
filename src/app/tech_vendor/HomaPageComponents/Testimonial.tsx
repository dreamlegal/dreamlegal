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
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl lg:rounded-3xl -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl lg:rounded-3xl -z-10" />
        
        {/* Main testimonial content */}
        <div className="lg:col-span-2 bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col h-full">
            {/* Company Info Banner */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4 lg:mb-6 p-3 lg:p-4 bg-gradient-to-r 
                         from-blue-50 to-blue-100/50 rounded-xl border border-blue-100/50
                         transition-all duration-700 delay-300 transform">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="font-semibold text-gray-900 text-sm lg:text-base">{testimonial.company.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="text-gray-600 text-sm lg:text-base">{testimonial.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="text-gray-600 text-sm lg:text-base">{testimonial.company.global}</span>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="mb-6 lg:mb-8">
              <div className="flex gap-3 lg:gap-4">
                <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
                <p className="text-base lg:text-xl text-gray-700 leading-relaxed
                             transition-all duration-700 delay-500">
                  {testimonial.content}
                </p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-auto grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: testimonial.impact.revenue,
                  label: "Revenue Impact"
                },
                {
                  icon: <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: testimonial.impact.users,
                  label: "Active Users"
                },
                {
                  icon: <Timer className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: testimonial.impact.timeframe,
                  label: "Implementation"
                },
                {
                  icon: <Award className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: "Award",
                  label: "Recognition"
                }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-transparent rounded-lg lg:rounded-xl p-3 lg:p-4 
                           flex flex-col items-center justify-center text-center border border-blue-100/50
                           transition-all duration-500 transform"
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  {metric.icon}
                  <p className="text-sm lg:text-lg font-bold text-gray-900 mt-1 lg:mt-2">{metric.value}</p>
                  <p className="text-xs lg:text-sm text-gray-600">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="lg:block">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white h-full
                         shadow-lg shadow-blue-500/20">
            <div className="flex flex-col h-full justify-center items-center text-center">
              <div className="mb-4 lg:mb-6 relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-transparent 
                             rounded-full blur-lg" />
                <img
                  src={testimonial.user.image}
                  alt={testimonial.user.name}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl lg:rounded-2xl object-cover ring-4 ring-white/20 relative z-10"
                />
              </div>
              <div className="space-y-1 lg:space-y-2">
                <h3 className="text-xl lg:text-2xl font-bold">{testimonial.user.name}</h3>
                <p className="text-blue-100 text-sm lg:text-base">{testimonial.user.role}</p>
                <div className="pt-2 lg:pt-4">
                  <p className="text-xs lg:text-sm text-blue-200">{testimonial.company.industry}</p>
                  <p className="text-xs lg:text-sm text-blue-200">{testimonial.company.size}</p>
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
    <div ref={sectionRef} className="w-full bg-gradient-to-br from-blue-50 to-white py-12 lg:py-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Primary blue grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* White fade overlays */}
        <div className="absolute inset-x-0 top-0 h-24 lg:h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-12 lg:mb-20 text-center">
          <div className="inline-block">
            <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
              GLOBAL IMPACT STORIES
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            Transforming Law Firms & Enterprises 
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
                           transform origin-left transition-transform duration-1000" />
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm lg:text-base">
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
                                  ? 'w-8 lg:w-12 bg-blue-600' 
                                  : 'w-4 lg:w-6 bg-blue-200 group-hover:bg-blue-300'}`} />
                </button>
              ))}
            </div>
            
            <div className="flex gap-3 lg:gap-4 order-1 lg:order-2">
              <button
                onClick={prevTestimonial}
                className="p-2 lg:p-3 rounded-full bg-white shadow-md lg:shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:bg-blue-50 group"
              >
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 lg:p-3 rounded-full bg-white shadow-md lg:shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:bg-blue-50 group"
              >
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTestimonials;

"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Star, Headphones, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Changed from 1 to 0
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      text: "DreamLegal is a highly valuable partner for any company in the legal tech sector. They helped us navigate the unique challenges of the Indian market and effectively position our product.",
      author: "Akansh Tayal",
      position: "Founder",
      company: "Casebench"
    },
    {
      id: 2,
      text: "DreamLegal is a great platform for legal tech vendors looking to reach a focused and relevant audience. The listing process was easy, and the intuitive structure makes it simple for potential buyers.",
      author: "Garvish Singh",
      position: "Marketing Manager",
      company: "Lucio"
    },
    {
      id: 3,
      text: "DreamLegal got our first inbound client when we launched our CLM module.",
      author: "Manu Grover",
      position: "Founder",
      company: "Legal Buddy"
    },
    {
      id: 4,
      text: "Collaborated posts with DreamLegal have increased our inbound presence tremendously.",
      author: "Tushar Bhargava",
      position: "Co-founder",
      company: "Mikelegal"
    }
  ];

  // Auto-slide functionality with proper looping
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % testimonials.length;
          return nextSlide;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-[#1e2556]/5" />
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 h-32 sm:w-80 sm:h-80 bg-[#1e2556]/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 sm:mb-6 leading-tight">
            Testimonials
          </h2>
        </div>

        {/* Centered Testimonial Carousel */}
        <div className="relative flex justify-center">
          {/* Carousel Container - Smaller and Centered */}
          <div 
            className="max-w-3xl w-full " // Added overflow-hidden
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slides Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 flex justify-center">
                  {/* Smaller, Centered Card */}
                  <div className="bg-[#f5f7fa] rounded-2xl p-6 sm:p-8 mx-4 shadow-lg border border-gray-100 max-w-2xl w-full text-center">
                    
                    {/* Centered Testimonial Text */}
                    <blockquote className="text-[#2d2d2d] text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-medium text-center">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Centered Author Info */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-center">
                        <div className="font-bold text-[#1e2556] text-sm sm:text-base">
                          {testimonial.author}
                        </div>
                        <div className="text-[#334155] text-xs sm:text-sm">
                          {testimonial.position} @ {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#1e2556] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#1e2556]/90 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#1e2556] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#1e2556]/90 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Centered Dots Indicator */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#1e2556] w-6 sm:w-8' 
                  : 'bg-[#7cc6ee]/40 hover:bg-[#7cc6ee]/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="mb-8 sm:mt-12 lg:mt-16">
          <div className="bg-[#7cc6ee] rounded-2xl shadow-lg mx-4 sm:mx-auto sm:max-w-5xl">
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              {/* Mobile-Optimized Heading */}
              <div className="text-center mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  We are the kingmakers of the legal tech industry
                </h3>
              </div>

              {/* Mobile-First Three Items Layout */}
              <div className="space-y-6 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:gap-8 lg:gap-12">
                
                {/* Strong Reputation */}
                <div className="flex items-center gap-4">
                  <div className="p-3 flex-shrink-0">
                    <Star className="w-7 h-7 sm:w-8 sm:h-8 text-[#1e2556]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl sm:text-xl font-bold text-white">Strong</div>
                    <div className="text-base sm:text-base text-white/90 font-medium">reputation</div>
                  </div>
                </div>

                {/* Mobile Separator */}
                <div className="block sm:hidden w-16 h-px bg-white/30 mx-auto"></div>
                {/* Desktop Separator */}
                <div className="hidden sm:block w-px h-12 bg-white/30"></div>

                {/* High Intent Deals */}
                <div className="flex items-center gap-4">
                  <div className="p-3 flex-shrink-0">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#1e2556]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl sm:text-xl font-bold text-white">High intent</div>
                    <div className="text-base sm:text-base text-white/90 font-medium">deals</div>
                  </div>
                </div>

                {/* Mobile Separator */}
                <div className="block sm:hidden w-16 h-px bg-white/30 mx-auto"></div>
                {/* Desktop Separator */}
                <div className="hidden sm:block w-px h-12 bg-white/30"></div>

                {/* Deep Market Understanding */}
                <div className="flex items-center gap-4">
                  <div className="p-3 flex-shrink-0">
                    <Headphones className="w-7 h-7 sm:w-8 sm:h-8 text-[#1e2556]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl sm:text-xl font-bold text-white">Deep market</div>
                    <div className="text-base sm:text-base text-white/90 font-medium">understanding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;


import React from 'react';
import { ArrowRight, Users, Star, Headphones, Sparkles } from 'lucide-react';

const TestimonialSection = () => {
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

        {/* Mobile-Optimized Blue Strip */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
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

        {/* Premium Testimonial Card */}
        {/* <div className="max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-[#7cc6ee]/20 p-6 sm:p-8 lg:p-10 xl:p-12 relative overflow-hidden">
           
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-bl from-[#7cc6ee]/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-tr from-[#1e2556]/10 to-transparent rounded-full blur-2xl" />
            
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
              
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#7cc6ee] to-[#1e2556] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white">
                    <div className="w-full h-full bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">IH</span>
                    </div>
                  </div>
                 
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-[#7cc6ee] rounded-full animate-bounce delay-100" />
                  <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-3 h-3 sm:w-4 sm:h-4 bg-[#1e2556] rounded-full animate-bounce delay-300" />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="mb-6 sm:mb-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl text-[#7cc6ee]/30 font-serif leading-none mb-3 sm:mb-4">"</div>
                  <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight text-[#1e2556] relative">
                    We realized every customer that we 
                    <span className="text-[#7cc6ee]"> closed a deal with</span> checked us out on 
                    <span className="text-[#7cc6ee]"> Capterra beforehand.</span>
                  </blockquote>
                </div>
                
              
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-xl sm:text-2xl font-bold mb-2 text-[#1e2556]">
                    Ilan Hertz
                  </h4>
                  <p className="text-base sm:text-lg mb-3 sm:mb-4 text-[#334155]">
                    VP of Marketing at Gaviti
                  </p>
                  
                 
                  <div className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-[#1e2556] tracking-wider">
                    GAVITI
                  </div>
                </div>
                
                
                <a 
                  href="#" 
                  className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#7cc6ee]/10 to-[#1e2556]/10 hover:from-[#7cc6ee]/20 hover:to-[#1e2556]/20 border border-[#7cc6ee]/20 hover:border-[#7cc6ee]/40 text-[#7cc6ee] font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <span className="group-hover:text-[#1e2556] transition-colors duration-300">
                    Read the Success Story
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialSection;
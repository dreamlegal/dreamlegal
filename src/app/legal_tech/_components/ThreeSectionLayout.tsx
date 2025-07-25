
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ThreeSectionLayout = () => {
  return (
    <div className="w-full">
      {/* Section 1 - Light Background: Image Left, Text Right */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="relative order-1 lg:order-1">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <img 
                  src="images/one.png" 
                  alt="Software Image" 
                  className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover rounded-lg" 
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="order-2 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#1e2556' }}>
                Build product profiles that bring trust
              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8" style={{ color: '#334155' }}>
              Upgrade your product profile to a premium vendor in our marketplace. Priority placement, enhanced presence and more content to build trust. Verified reviews, transparent features, and accessible insights on your product — all in one place.

              </p>
              <a href="#contact" className="inline-flex items-center px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 border-2 sm:border-4 border-black w-full sm:w-auto justify-center sm:justify-start" style={{ backgroundColor: '#1e2556' }}>
              Become a premium vendor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Dark Background: Text Left, Image Right */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 text-white" style={{ backgroundColor: '#1e2556' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left - Text */}
            <div className="order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Bullet proof Marketing


              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-white/90">
              We craft a unique ICP and product positioning that targets the user segment where your solution wins hands down. Then, we build a tailored legal tech marketing funnel that delivers clarity, confidence, trust, and conversions — all without chasing the wrong leads or wasting spend on the wrong channels.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-medium hover:underline transition-all duration-300 group" 
                  style={{ color: '#7cc6ee' }}
                >
                  <span>Partner with us</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative order-2">
              <div 
                className="aspect-[16/10] sm:aspect-[16/9] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl" 
                style={{ backgroundImage: 'url("images/two.png")' }}
              >
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Light Background: Image Left, Text Right */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="relative order-1 lg:order-1">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div 
                  className="aspect-[16/10] sm:aspect-[16/9] bg-cover bg-center bg-no-repeat rounded-lg" 
                  style={{ backgroundImage: 'url("/images/three.png")' }}
                >
                </div>
              </div>
            </div>

            {/* Right - Text */}
            <div className="order-2 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#1e2556' }}>
                Market insights for legal tech landscape
              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8" style={{ color: '#334155' }}>
                Catch market trends, competitive intel, and buyer preference with real-time intelligence from the DreamLegal marketplace and 100+ trusted web sources. Better product roadmaps, client proposals and competitive edge
              </p>

              <a href="#contact" className="inline-flex items-center px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-white rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 border-2 sm:border-4 border-black w-full sm:w-auto justify-center sm:justify-start" style={{ color: '#1e2556' }}>
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThreeSectionLayout;
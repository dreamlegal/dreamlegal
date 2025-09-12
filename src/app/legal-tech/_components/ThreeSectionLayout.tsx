import React from 'react';

const ThreeSectionLayout = () => {
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
    }
  ];

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
              
              <p className="text-base sm:text-lg italic" style={{ color: '#334155' }}>
                "DreamLegal is a highly valuable partner..." - {testimonials[0].author}, {testimonials[0].position}, {testimonials[0].company}
              </p>
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
                We craft a unique ICP and product positioning that targets the user segment where your solution wins hands down. Dreamlegal content delivers clarity, confidence, trust, and conversions — all without chasing the wrong leads or wasting spend on the wrong channels.
              </p>
              
              <p className="text-base sm:text-lg italic text-white/90">
                "DreamLegal is a great platform for legal..." - {testimonials[1].author}, {testimonials[1].position}, {testimonials[1].company}
              </p>
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

              <p className="text-base sm:text-lg italic" style={{ color: '#334155' }}>
                "DreamLegal got our first inbound client..." - {testimonials[2].author}, {testimonials[2].position}, {testimonials[2].company}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThreeSectionLayout;
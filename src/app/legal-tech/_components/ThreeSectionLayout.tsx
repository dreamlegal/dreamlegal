// import React from 'react';

// const ThreeSectionLayout = () => {
//   const testimonials = [
//     {
//       id: 1,
//       text: "DreamLegal is a highly valuable partner for any company in the legal tech sector. They helped us navigate the unique challenges of the Indian market and effectively position our product.",
//       author: "Akansh Tayal",
//       position: "Founder",
//       company: "Casebench"
//     },
//     {
//       id: 2,
//       text: "DreamLegal is a great platform for legal tech vendors looking to reach a focused and relevant audience. The listing process was easy, and the intuitive structure makes it simple for potential buyers.",
//       author: "Garvish Singh",
//       position: "Marketing Manager",
//       company: "Lucio"
//     },
//     {
//       id: 3,
//       text: "DreamLegal got our first inbound client when we launched our CLM module.",
//       author: "Manu Grover",
//       position: "Founder",
//       company: "Legal Buddy"
//     }
//   ];

//   return (
//     <div className="w-full">
//       {/* Section 1 - Light Background: Image Left, Text Right */}
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
//             {/* Left - Image */}
//             <div className="relative order-1 lg:order-1">
//               <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
//                 <img 
//                   src="images/one.png" 
//                   alt="Software Image" 
//                   className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover rounded-lg" 
//                 />
//               </div>
//             </div>

//             {/* Right - Text */}
//             <div className="order-2 lg:order-2">
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#1e2556' }}>
//                 Build product profiles that bring trust
//               </h2>
//               <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8" style={{ color: '#334155' }}>
//                 Upgrade your product profile to a premium vendor in our marketplace. Priority placement, enhanced presence and more content to build trust. Verified reviews, transparent features, and accessible insights on your product — all in one place.
//               </p>
              
//               <p className="text-base sm:text-lg italic" style={{ color: '#334155' }}>
//                 "DreamLegal is a highly valuable partner..." - {testimonials[0].author}, {testimonials[0].position}, {testimonials[0].company}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 2 - Dark Background: Text Left, Image Right */}
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 text-white" style={{ backgroundColor: '#1e2556' }}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
//             {/* Left - Text */}
//             <div className="order-1">
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
//                 Bullet proof Marketing
//               </h2>
//               <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-white/90">
//                 We craft a unique ICP and product positioning that targets the user segment where your solution wins hands down. Dreamlegal content delivers clarity, confidence, trust, and conversions — all without chasing the wrong leads or wasting spend on the wrong channels.
//               </p>
              
//               <p className="text-base sm:text-lg italic text-white/90">
//                 "DreamLegal is a great platform for legal..." - {testimonials[1].author}, {testimonials[1].position}, {testimonials[1].company}
//               </p>
//             </div>

//             {/* Right - Image */}
//             <div className="relative order-2">
//               <div 
//                 className="aspect-[16/10] sm:aspect-[16/9] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl" 
//                 style={{ backgroundImage: 'url("images/two.png")' }}
//               >
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 3 - Light Background: Image Left, Text Right */}
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
//             {/* Left - Image */}
//             <div className="relative order-1 lg:order-1">
//               <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
//                 <div 
//                   className="aspect-[16/10] sm:aspect-[16/9] bg-cover bg-center bg-no-repeat rounded-lg" 
//                   style={{ backgroundImage: 'url("/images/three.png")' }}
//                 >
//                 </div>
//               </div>
//             </div>

//             {/* Right - Text */}
//             <div className="order-2 lg:order-2">
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#1e2556' }}>
//                 Market insights for legal tech landscape
//               </h2>
//               <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8" style={{ color: '#334155' }}>
//                 Catch market trends, competitive intel, and buyer preference with real-time intelligence from the DreamLegal marketplace and 100+ trusted web sources. Better product roadmaps, client proposals and competitive edge
//               </p>

//               <p className="text-base sm:text-lg italic" style={{ color: '#334155' }}>
//                 "DreamLegal got our first inbound client..." - {testimonials[2].author}, {testimonials[2].position}, {testimonials[2].company}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default ThreeSectionLayout;
import React from 'react';
import { Users, HelpCircle } from 'lucide-react';

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

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-[#1e2556] rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-[#7cc6ee]" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                  Ready to accelerate your growth?
                </h3>
              </div>
              <p className="text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Join hundreds of legal tech vendors who trust DreamLegal to connect them with qualified buyers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <a href="#contact" className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg md:rounded-xl font-semibold 
                             hover:bg-white hover:text-[#1e2556] transition-all duration-300
                             flex items-center justify-center gap-2 text-sm md:text-base">
                  Talk to Partnership Team
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <div className="flex items-center justify-center gap-2 text-[#334155]">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm md:text-base">
                Still have questions? 
                <a href="#contact" className="text-[#7cc6ee] hover:text-[#6bb3db] font-semibold ml-1 transition-colors">
                  
                </a>
                {' '} - {' '}
                <a href="https://calendly.com/ranjansinghania1909/30min" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-[#7cc6ee] hover:text-[#6bb3db] font-semibold transition-colors">
                  Talk to our founder
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThreeSectionLayout;

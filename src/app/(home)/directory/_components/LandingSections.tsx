// "use client"
// import React from 'react';
// import { BarChart3, Users, ChevronRight, ThumbsUp, Download, PieChart, Sparkles } from 'lucide-react';

// const LandingSections = () => {
//   return (
//     <div className="w-full">
//       {/* 1. Review Section */}
//       <section className="py-20 bg-white">
//   <div className="max-w-7xl mx-auto px-4">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//       <div className="flex justify-center">
//         {/* Single Review Image */}
//         <div className="relative">
//         <img 
//   src="/images/Assessment_logo.png" 
//   alt="Customer reviews" 
//   className="rounded-lg shadow-xl w-full aspect-video object-cover"
// />
//           {/* Optional overlay elements */}
//           <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full px-3 py-1 text-sm font-bold">
//             4.7/5
//           </div>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-4xl font-bold text-purple-800 mb-6">Using software?<br />Write a review.</h2>
//         <p className="text-xl text-gray-700 mb-10">Help over 5 million monthly Buyers on G2 make the right choice for their business.</p>
//         <a href="#" className="inline-block px-10 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors">Write a Review</a>
//       </div>
//     </div>
//   </div>
// </section>
//       {/* 2. Sign Up Section - Testimonial */}
//       <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-800/50 rounded-full mb-8">
//                 <Sparkles className="w-4 h-4 text-blue-300" />
//                 <span className="text-sm font-semibold text-blue-300">
//                   TESTIMONIAL
//                 </span>
//               </div>
//               <h2 className="text-4xl font-bold mb-10 leading-tight">
//                 "G2 has been a great place for me to both <span className="text-orange-500">find</span> and <span className="text-orange-500">review</span> software...it's actually been fun to see my reviews go up, get marked helpful..."
//               </h2>
//               <div>
//                 <p className="font-semibold text-xl">Matthew Gardner</p>
//                 <p className="text-blue-300">Co-founder, RouteThis</p>
//                 <p className="text-blue-300">G2 Reviewer</p>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <div className="relative">
//                 <div className="w-64 h-64 bg-purple-600 rounded-full overflow-hidden border-4 border-blue-400">
//                   <img 
//                     src="/api/placeholder/200/200" 
//                     alt="Matthew Gardner" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="absolute inset-0">
//                   <div className="absolute top-0 right-0 w-8 h-8 bg-teal-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
//                 </div>
//                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
//                   <circle 
//                     cx="100" 
//                     cy="100" 
//                     r="90" 
//                     fill="none" 
//                     stroke="rgba(96, 165, 250, 0.3)" 
//                     strokeWidth="1" 
//                     strokeDasharray="4 4" 
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. Report Section */}
//       <section className="py-20 bg-pink-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">The 2024 G2 Buyer Behavior Report</h2>
//               <p className="text-lg text-gray-700 mb-8">
//                 AI fuels software spending, but buyers expect fast ROI, finds G2's 2024 Buyer Behavior Report—based on a survey of 1,900+ B2B buyers across the globe.
//               </p>
//               <a href="#" className="inline-flex items-center px-8 py-3 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-800 transition-colors">
//                 <Download className="w-5 h-5 mr-2" />
//                 Download the report
//               </a>
//             </div>
//             <div className="flex justify-center">
//               <div className="max-w-md">
//                 <div className="bg-orange-500 rounded-t-lg px-6 py-4 text-white flex items-center">
//                   <BarChart3 className="w-5 h-5 mr-3" />
//                   <span className="font-semibold">Buyer Behavior Report 2024</span>
//                 </div>
//                 <div className="bg-white rounded-b-lg p-6 shadow-lg">
//                   <p className="text-gray-700 mb-8 font-medium">Over half of buyers are gearing up to spend more in 2025.</p>
                  
//                   <div className="flex justify-between items-end mb-2">
//                     <div className="text-center">
//                       <div className="h-32 w-16 bg-teal-400 rounded-t-lg flex items-end justify-center pb-2">
//                         <span className="text-white font-bold">52%</span>
//                       </div>
//                       <p className="text-sm text-gray-700 mt-2 max-w-[80px]">Spending will increase</p>
//                     </div>
                    
//                     <div className="text-center">
//                       <div className="h-24 w-16 bg-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
//                         <span className="text-white font-bold">42%</span>
//                       </div>
//                       <p className="text-sm text-gray-700 mt-2 max-w-[80px]">Spending will remain the same</p>
//                     </div>
                    
//                     <div className="text-center">
//                       <div className="h-10 w-16 bg-orange-300 rounded-t-lg flex items-end justify-center pb-2">
//                         <span className="text-white font-bold">6%</span>
//                       </div>
//                       <p className="text-sm text-gray-700 mt-2 max-w-[80px]">Spending will decrease</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-center mt-8">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-300"></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-300"></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-300"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. Why Us Section */}
//       <section className="py-20 bg-white">
//   <div className="max-w-7xl mx-auto px-4">
//     <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
//       <div className="md:col-span-5">
//         <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools to Make Decisions With Confidence</h2>
//         <p className="text-lg text-gray-700 mb-8">
//           Discover Peer Insights features that help you to make decisions with ease.
//         </p>
        
//         {/* Image replacing the complex UI mockup */}
//         <div className="relative">
//           <img 
//             src="/api/placeholder/450/350" 
//             alt="Decision making tools" 
//             className="w-full rounded-lg shadow-lg aspect-video object-cover"
//           />
//         </div>
//       </div>
      
//       <div className="md:col-span-7">
//         <div className="space-y-8">
//           <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
//             <div className="text-blue-500 flex-shrink-0">
//               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Summarized Data</h3>
//               <p className="text-gray-700">
//                 Download and showcase Peer Insights data in a compelling format to influence your team.
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
//             <div className="text-blue-500 flex-shrink-0">
//               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M7 16L13 10L18 15M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Comparisons</h3>
//               <p className="text-gray-700">
//                 Understand how products stack up against each other.
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
//             <div className="text-blue-500 flex-shrink-0">
//               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice of the Customer (VoC)</h3>
//               <p className="text-gray-700">
//                 Voice of the Customer reports* help you confidently make purchasing decisions by providing a clearer overall perspective into a specific market.
//               </p>
//               <p className="text-xs text-gray-500 mt-2">*Availability based on Gartner product entitlements</p>
//             </div>
//           </div>
          
//           <div className="flex items-start gap-4">
//             <div className="text-blue-500 flex-shrink-0 relative">
//               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M8 14C8 12.8954 9.79086 12 12 12C14.2091 12 16 12.8954 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full text-white text-xs font-bold flex items-center justify-center">+</span>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Peer Lessons Learned (PLL)</h3>
//               <p className="text-gray-700">
//                 Peer Lessons Learned reports include lessons that peers learned while implementing the product, review demographic data, and peer recommendations
//               </p>
//               <p className="text-xs text-gray-500 mt-2">*Availability based on Gartner product entitlements</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
//     </div>
//   );
// };

// export default LandingSections;
"use client"
import React, { useState } from 'react';
import { BarChart3, Users, ChevronRight,ChevronLeft, ThumbsUp, Download, PieChart, Sparkles } from 'lucide-react';

const LandingSections = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/images/1.png",
    "/images/29.png",
    "/images/32.png",
    "/images/33.png"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  return (
    <div className="w-full">
      {/* 1. Review Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#1e2556] mb-6">Unlock Smarter Legal Tech Choices. Sign Up Today.</h2>
            <p className="text-xl text-[#334155] mb-10">Join thousands of legal professionals in discovering, comparing, and choosing the best legal technology for your needs.</p>
            <a href="/auth/user/signup" className="inline-block px-10 py-3 bg-[#1e2556] text-white border-2 border-[#1e2556] rounded-full font-semibold hover:bg-[#1e2556]/90 transition-colors">Sign Up</a>
          </div>
        </div>
      </section>
      
      {/* 2. Sign Up Section - Testimonial */}
      <section className="py-20 bg-[#1e2556] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1e2556]/50 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-[#7cc6ee]" />
                <span className="text-sm font-semibold text-[#7cc6ee]">
                  TESTIMONIAL
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-10 leading-tight">
                "A one-stop hub for LegalTech! The legal technology directory captures every essential tool, making it effortless to <span className="text-[#7cc6ee]">discover</span>, <span className="text-[#7cc6ee]">compare</span>, and <span className="text-[#7cc6ee]">choose</span> the right solutions."
              </h2>
              <div>
                <p className="font-semibold text-xl">Suruchi Kanoongo</p>
                <p className="text-[#7cc6ee]">Senior Process Executive, Infosys</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="relative">
                <div className="w-64 h-64 bg-[#7cc6ee] rounded-full overflow-hidden border-4 border-[#7cc6ee]/70">
                  <img 
                    src="/images/review1.jpg" 
                    alt="Suruchi Kanoongo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#7cc6ee] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="90" 
                    fill="none" 
                    stroke="rgba(124, 198, 238, 0.3)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Report Section */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1e2556] mb-6">The 2025 LegalTech Trends Report</h2>
              <p className="text-lg text-[#2d2d2d] mb-8">
                AI fuels legal software spending, but buyers expect fast ROI, finds DreamLegal's 2024 Trends Report—based on a survey of 1,900+ legal professionals across the globe.
              </p>
              <a href="/download/Legal Tech Predictions Report 2025.pdf" className="inline-flex items-center px-8 py-3 bg-[#1e2556] text-white rounded-full font-semibold hover:bg-[#1e2556]/90 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download the report
              </a>
            </div>
            <div className="flex justify-center">
      <div className="max-w-md w-full">
        <div className="bg-[#7cc6ee] rounded-t-lg px-6 py-4 text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-3" />
          <span className="font-semibold">LegalTech Trends Report 2025</span>
        </div>
        
        <div className="bg-white rounded-b-lg p-6 shadow-lg">
          <div className="relative overflow-hidden h-64 mb-4">
            {/* Images */}
            <div 
              className="flex transition-transform duration-300 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="min-w-full h-full flex-shrink-0">
                <img 
                  src="/images/1.png" 
                  alt="Slide 1" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-full h-full flex-shrink-0">
                <img 
                  src="/images/29.png" 
                  alt="Slide 2" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-full h-full flex-shrink-0">
                <img 
                  src="/images/32.png" 
                  alt="Slide 3" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-full h-full flex-shrink-0">
                <img 
                  src="/images/33.png" 
                  alt="Slide 4" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Simple navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Simple dots */}
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${currentSlide === 0 ? 'bg-[#7cc6ee]' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(0)}
              ></div>
              <div
                className={`w-2 h-2 rounded-full ${currentSlide === 1 ? 'bg-[#7cc6ee]' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(1)}
              ></div>
              <div
                className={`w-2 h-2 rounded-full ${currentSlide === 2 ? 'bg-[#7cc6ee]' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(2)}
              ></div>
              <div
                className={`w-2 h-2 rounded-full ${currentSlide === 3 ? 'bg-[#7cc6ee]' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(3)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
      </section>

      {/* 4. Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h2 className="text-4xl font-bold text-[#1e2556] mb-4">Finding the Right Legal Technology</h2>
              <p className="text-lg text-[#334155] mb-8">
                Finding the right legal technology can be overwhelming. DreamLegal makes it easier by providing everything you need in one place.
              </p>
              
              {/* Image replacing the complex UI mockup */}
              <div className="relative">
                <div className="absolute inset-0 border border-gray-200/50 rounded-lg"></div>
                <img 
                  src="/images/Light Blue White Minimalist We Are Hiring Project Manager Linkedin Post.png" 
                  alt="Legal technology decision-making tools" 
                  className="w-full rounded-lg aspect-video object-cover"
                />
              </div>
            </div>
            
            <div className="md:col-span-7">
              <div className="space-y-8">
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="text-[#7cc6ee] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Find the Right Fit</h3>
                    <p className="text-[#2d2d2d]">
                      Get tailored recommendations based on your team's specific needs and workflows—no more guesswork.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="text-[#7cc6ee] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 16L13 10L18 15M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Compare and Evaluate with Clarity</h3>
                    <p className="text-[#2d2d2d]">
                      Access side-by-side product comparisons, feature breakdowns, and insights to make informed decisions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="text-[#7cc6ee] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Make Confident Decisions</h3>
                    <p className="text-[#2d2d2d]">
                      Structured evaluations and expert insights help legal teams assess solutions with a clear understanding.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#7cc6ee] flex-shrink-0 relative">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 14C8 12.8954 9.79086 12 12 12C14.2091 12 16 12.8954 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#7cc6ee] rounded-full text-white text-xs font-bold flex items-center justify-center">+</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Learn from Trusted Peer Reviews</h3>
                    <p className="text-[#2d2d2d]">
                      Gain real-world insights from professionals who have used these tools, ensuring you make the right choice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingSections;
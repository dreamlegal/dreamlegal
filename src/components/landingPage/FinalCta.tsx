// import React, { useState } from 'react'
// import CreateRfps from "./CreateRfp"

// const CTASection = () => {
//   const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <>
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto">
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-tight md:leading-tight lg:leading-tight" 
//                 style={{ color: '#1e2556' }}>
//               No more tool fatigue. We help you pick and launch the best fit legal tech- without chaos, burnout or vendor regret
//             </h2>
            
//             <button 
//               className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
//               style={{ 
//                 backgroundColor: isHovered ? '#7cc6ee' : '#1e2556', 
//                 color: 'white'
//               }}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               onClick={() => setIsRfpFormOpen(true)}
//             >
//               Share Your Requirements
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* RFP Modal */}
//       {isRfpFormOpen && (
//         <CreateRfps 
//           isOpen={isRfpFormOpen} 
//           onClose={() => setIsRfpFormOpen(false)} 
//         />
//       )}
//     </>
//   )
// }

// export default CTASection
import React, { useState } from 'react'
import { CheckCircle, Users, Clock, Shield, ArrowRight, Star } from 'lucide-react'
import CreateRfps from "./CreateRfp"

const CTASection = () => {
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    { icon: CheckCircle, text: "Expert technology assessment" },
    { icon: Clock, text: "Save 80% implementation time" },
    { icon: Shield, text: "Risk-free vendor selection" },
    { icon: Users, text: "Dedicated support team" }
  ];

  const stats = [
    { number: "500+", label: "Legal Teams Helped" },
    { number: "99.2%", label: "Success Rate" },
    { number: "60%", label: "Cost Savings" }
  ];

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
               style={{ backgroundColor: '#f5f7fa' }}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e2556_1px,transparent_1px),linear-gradient(-45deg,#1e2556_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#7cc6ee]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#1e2556]/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#7cc6ee]/5 rounded-full blur-lg"></div>

        <div className="max-w-6xl mx-auto relative">
          {/* Stats Bar */}
          {/* <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-[#1e2556]">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div> */}

          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#7cc6ee]/20 
                          rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-[#7cc6ee] fill-current" />
              <span className="text-sm font-medium text-[#1e2556]">Trusted by Most Legal Teams</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight" 
                style={{ color: '#1e2556' }}>
              No more tool fatigue. We help you pick and launch the best fit legal tech- 
              <span className="block mt-2">
                <span className="text-[#7cc6ee]">without chaos, burnout</span> or vendor regret
              </span>
            </h2>

            {/* Benefits Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} 
                     className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 
                              hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
                  <benefit.icon className="w-6 h-6 text-[#7cc6ee] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#1e2556]">{benefit.text}</p>
                </div>
              ))}
            </div> */}
            
            {/* CTA Button with additional info */}
            <div className="space-y-4">
              <button 
                className="group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 
                         hover:transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto overflow-hidden"
                style={{ 
                  backgroundColor: isHovered ? '#7cc6ee' : '#1e2556', 
                  color: 'white'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsRfpFormOpen(true)}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Share Your Requirements
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Button gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7cc6ee] to-[#1e2556] opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <p className="text-sm text-gray-600 max-w-md mx-auto">
              No obligation call • Get started instantly  
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-12 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-3xl mx-auto">
              <p className="text-sm text-gray-600 mb-4">Trusted by leading organizations:</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-lg font-bold text-[#1e2556]">Fortune 500</div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="text-lg font-bold text-[#1e2556]">AmLaw 100</div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="text-lg font-bold text-[#1e2556]">Global Enterprises</div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="text-lg font-bold text-[#1e2556]">Startups</div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* RFP Modal */}
      {isRfpFormOpen && (
        <CreateRfps 
          isOpen={isRfpFormOpen} 
          onClose={() => setIsRfpFormOpen(false)} 
        />
      )}
    </>
  )
}

export default CTASection
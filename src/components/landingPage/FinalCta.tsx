import React, { useState } from 'react'
import CreateRfps from "./CreateRfp"

const CTASection = () => {
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-tight md:leading-tight lg:leading-tight" 
                style={{ color: '#1e2556' }}>
              No more tool fatigue. We help you pick and launch the best fit legal tech- without chaos, burnout or vendor regret
            </h2>
            
            <button 
              className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
              style={{ 
                backgroundColor: isHovered ? '#7cc6ee' : '#1e2556', 
                color: 'white'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsRfpFormOpen(true)}
            >
              Share Your Requirements
            </button>
          </div>
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
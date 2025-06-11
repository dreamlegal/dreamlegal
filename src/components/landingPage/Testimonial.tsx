

// import React, { useState, useEffect } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const Testimonial = () => {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0)
//   const testimonials = [
//     {
//       quote: "A one-stop hub for LegalTech! The legal technology directory captures every essential tool, making it effortless to discover, compare, and choose the right solutions.",
//       name: "Suruchi Kanoongo",
//       position: "Senior Process Executive, Infosys",
//       image: "/images/review1.jpg"
//     },
//     {
//       quote: "Dream Legal has been exceptional in bridging traditional legal practices with modern tools. Their professionalism and guidance make them invaluable for modernizing legal workflows and adopting technologies",
//       name: "Ayush Chandra",
//       position: "In-House Legal Expert",
//       image: "/images/review2.jpg"
//     },
//     {
//       quote: "DreamLegal is a trusted resource for dependable insights on legal tech solutions. Their evaluations are unbiased and tailored to meet the specific needs of legal teams.",
//       name: "Rahul Hingmire",
//       position: "Managing Partner at Vis Legis Law Practice",
//       image: "/images/review3.jpg"
//     }
//   ]

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
//     }, 5000) // Change slide every 5 seconds

//     return () => clearInterval(interval)
//   }, [testimonials.length])

//   const handleNext = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
//   }

//   const handlePrev = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//   }

//   const goToSlide = (index) => {
//     setCurrentTestimonial(index)
//   }

//   return (
//     <section className="py-10 bg-white text-gray-900">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h2 className="text-3xl mb-8 leading-tight">
//                 {testimonials[currentTestimonial].quote}
//               </h2>
//               <div>
//                 <p className="font-semibold text-xl">{testimonials[currentTestimonial].name}</p>
//                 <p className="text-[#7cc6ee] font-bold">{testimonials[currentTestimonial].position}</p>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <div className="relative">
//                 <img 
//                   src={testimonials[currentTestimonial].image} 
//                   alt={testimonials[currentTestimonial].name} 
//                   className="w-64 h-64 bg-[#f5f7fa] rounded-full overflow-hidden border-4 border-[#f5f7fa]/70"
//                 />
//               </div>
//             </div>
//           </div>
          
//           {/* Navigation with icons and dot indicators */}
//           <div className="flex justify-center items-center mt-8 gap-6">
//             <button 
//               onClick={handlePrev} 
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//             </button>
            
//             {/* Dot indicators */}
//             <div className="flex gap-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-colors duration-200 ${
//                     index === currentTestimonial 
//                       ? 'bg-[#7cc6ee]' 
//                       : 'bg-gray-300 hover:bg-gray-400'
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
            
//             <button 
//               onClick={handleNext} 
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//             </button>
//           </div>
//         </div>
//       </section>
//   )
// }

// export default Testimonial
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonials = [
    {
      quote: "A one-stop hub for LegalTech! The legal technology directory captures every essential tool, making it effortless to discover, compare, and choose the right solutions.",
      name: "Suruchi Kanoongo",
      position: "Senior Process Executive, Infosys",
      image: "/images/review1.jpg"
    },
    {
      quote: "Dream Legal has been exceptional in bridging traditional legal practices with modern tools. Their professionalism and guidance make them invaluable for modernizing legal workflows and adopting technologies",
      name: "Ayush Chandra",
      position: "In-House Legal Expert",
      image: "/images/review2.jpg"
    },
    {
      quote: "DreamLegal is a trusted resource for dependable insights on legal tech solutions. Their evaluations are unbiased and tailored to meet the specific needs of legal teams.",
      name: "Rahul Hingmire",
      position: "Managing Partner at Vis Legis Law Practice",
      image: "/images/review3.jpg"
    },
    {
      quote: "I 'm thrilled to recommend Mr. Ranjan Singhania, Co-Founder of Dream Legal. Ranjan's expertise in legal tech and innovation has been instrumental in reshaping our approach at Tuhin & Partners.  DreamLegal's partnership has been invaluable in our journey to becoming a tech-powered firm. Mr. Ranjan is the ideal collaborator if you want to innovate and thrive in the legal sector.",
      name: "Osman Gani Tuhin",
      position: "CEO Tuhin & Partners",
      image: "/images/review4.jpg"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 3000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentTestimonial(index)
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 leading-relaxed md:leading-tight font-medium">
              "{testimonials[currentTestimonial].quote}"
            </h2>
            <div className="space-y-1">
              <p className="font-semibold text-lg md:text-xl">{testimonials[currentTestimonial].name}</p>
              <p className="text-[#7cc6ee] font-bold text-sm md:text-base">{testimonials[currentTestimonial].position}</p>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative">
              <img 
                src={testimonials[currentTestimonial].image} 
                alt={testimonials[currentTestimonial].name} 
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-[#f5f7fa] rounded-full object-cover border-4 border-[#f5f7fa]/70 shadow-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Navigation with icons and dot indicators */}
        <div className="flex justify-center items-center mt-6 md:mt-8 gap-4 md:gap-6">
          <button 
            onClick={handlePrev} 
            className="p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-900" />
          </button>
          
          {/* Dot indicators */}
          <div className="flex gap-2 md:gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-200 touch-manipulation ${
                  index === currentTestimonial 
                    ? 'bg-[#7cc6ee]' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext} 
            className="p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
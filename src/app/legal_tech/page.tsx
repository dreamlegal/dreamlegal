import React from 'react'
import HeroSection from './_components/HeroSection'
import ThreeSectionLayout from './_components/ThreeSectionLayout'
import TestimonialSection from './_components/TestimonialSection'
import ContactFormSection from './_components/ContactFormSection'
  
const page = () => {
  return (
    <div>
        <HeroSection />
        <TestimonialSection />
        <ThreeSectionLayout />
        <ContactFormSection />
    </div>
    )
}

export default page
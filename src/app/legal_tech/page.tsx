import React from 'react'
import HeroSection from './_components/HeroSection'
import ThreeSectionLayout from './_components/ThreeSectionLayout'
import TestimonialSection from './_components/TestimonialSection'
import ContactFormSection from './_components/ContactFormSection'
import Achievements from './_components/Achievements'
import ProblemSection from './_components/ProblemSection'
const page = () => {
  return (
    <div>
        <HeroSection />
        <TestimonialSection />
        <ProblemSection />
        <ThreeSectionLayout />
        <Achievements />
        <ContactFormSection />
    </div>
    )
}

export default page
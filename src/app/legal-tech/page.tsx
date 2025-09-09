import React from 'react'
import HeroSection from './_components/HeroSection'
import ThreeSectionLayout from './_components/ThreeSectionLayout'
import TestimonialSection from './_components/TestimonialSection'
import ContactFormSection from './_components/ContactFormSection'
import Achievements from './_components/Achievements'
import ProblemSection from './_components/ProblemSection'
import VendorPricingSection from './_components/VendorPricingSection'
import FAQSection from './_components/FAQSection'
const page = () => {
  return (
    <div>
        <HeroSection />
        <TestimonialSection />
        <ProblemSection />
        <VendorPricingSection/>
        <ThreeSectionLayout />
        <Achievements />
        <ContactFormSection />
        <FAQSection/>
    </div>
    )
}

export default page
import HomeHero from '@/components/HomeHero';
import React from 'react'
import Hero from "./_components/Hero"
import BenefitsSection from './_components/BenefitsSection';


import "@/app/globals.css"
import FinalCTA from "./_components/FinalCTA"


const PartnersPage: React.FC = () => {
  return (
    <>
    
      <Hero/>
    
      {/* <TrustedClients />
      <Features />
      <ProblemSection /> */}
      <BenefitsSection />
      

      {/* <PremiumTestimonials /> */}
      <FinalCTA/>
    </>
  );
};

export default PartnersPage;

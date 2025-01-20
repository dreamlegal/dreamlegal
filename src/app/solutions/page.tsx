import HomeHero from '@/components/HomeHero';
import React from 'react'
import Hero from "./_components/Hero"
import ProductSuite from './_components/ProductShowcase';
import Achievements from "./_components/Achievements"

import "@/app/globals.css"
import FinalCTA from "./_components/FinalCta"


const SolutionsPage: React.FC = () => {
  return (
    <>
    
      <Hero/>
    
      {/* <TrustedClients />
      <Features />
      <ProblemSection /> */}
      <ProductSuite />
      <Achievements/>

      {/* <PremiumTestimonials /> */}
      <FinalCTA/>
    </>
  );
};

export default SolutionsPage;

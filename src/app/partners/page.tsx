import HomeHero from '@/components/HomeHero';
import React from 'react'
import Hero from "./_components/Hero"
import BenefitsSection from './_components/BenefitsSection';


import "@/app/globals.css"
import FinalCTA from "./_components/FinalCTA"
import Layout from "./_components/Layout"

const PartnersPage: React.FC = () => {
  return (
    <>
    
      <Hero/>
    
      {/* <TrustedClients />
      <Features />
      <ProblemSection /> */}
      <Layout />
      <BenefitsSection />
      

      {/* <PremiumTestimonials /> */}
      <FinalCTA/>
    </>
  );
};

export default PartnersPage;

export const metadata = {
  title: 'Legal tradition partnership with collaboration - Dreamlegal',
  
};

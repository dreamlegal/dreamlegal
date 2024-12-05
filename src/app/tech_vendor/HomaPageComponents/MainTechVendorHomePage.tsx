import HomeHero from '@/components/HomeHero';
import React from 'react'
import Hero from "./Hero"
import TrustedClients from "./TrustedClients"
import Features from "./Features"
import ProblemSection from "./ProblemSection"
import Achievements from "./Achievements"
import PremiumTestimonials from "./Testimonial"

import FinalCTA from "./FinalCta"


const MainHomePage: React.FC = () => {
  return (
    <>
    
      <Hero/>
    
      <TrustedClients />
      <Features />
      <ProblemSection />
      <Achievements/>

      <PremiumTestimonials />
      <FinalCTA/>
    </>
  );
};

export default MainHomePage;

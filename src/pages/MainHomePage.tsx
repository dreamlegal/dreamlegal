import HomeHero from '@/components/HomeHero';
import React from 'react'
import TrustedClients from './homePageComponents/TrustedClients';
import Features from './homePageComponents/Features';
import PremiumTestimonials from './homePageComponents/Testimonial';
import Hero from './homePageComponents/Hero';
import Achievements from './homePageComponents/Achievements';
import FinalCTA from './homePageComponents/FinalCta';
import ProblemSection from './homePageComponents/ProblemSection';
const MainHomePage: React.FC = () => {
  return (
    <>
    
      <Hero />
      <TrustedClients />
      <Features />
      <ProblemSection />
      <Achievements/>

      {/* <PremiumTestimonials /> */}
      <FinalCTA/>
    </>
  );
};

export default MainHomePage;

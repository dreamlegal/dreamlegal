"use client"
import AboutFaq from "@/components/AboutFaq";
import AboutFeature from "@/components/AboutFeature";
import AboutHero from "@/components/AboutHero";
import  WhyChooseUs  from "@/components/WhyChooseUs";
import React from "react";

function AboutUsPage() {
  return (
    <div>
      <AboutHero />
      <WhyChooseUs />
      <AboutFeature />
      {/*  */}
      {/* <AboutFaq /> */}
    </div>
  );
}

export default AboutUsPage;

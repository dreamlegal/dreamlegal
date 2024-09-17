"use client";

import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../animated-ui/infinite-moving-cards";

export function Testomonial() {
  return (
    <div className=" rounded-md flex flex-col  bg-[#f8f8fb]  items-center justify-center relative overflow-hidden py-20">
      <h2 className="  text-3xl md:text-[39px] text-center font-bold ">
        The DreamLegal Network
      </h2>
      <p className=" text-sm text-[#46526a] text-center md:w-[400px] font-semibold  mb-10 mt-4 ">
        The most engaging community of legal innovators who drive efficiency,
        optimization and growth.
      </p>
      <InfiniteMovingCards
        items={testimonials1}
        direction="right"
        speed="normal"
      />
      <InfiniteMovingCards
        items={testimonials2}
        direction="left"
        speed="normal"
      />
    </div>
  );
}

const testimonials1 = [
  {
    location: "India",
    name: "Sohini Shrivastava ",
    title: "Lexo Consultancy Private Limited",
    image: "/t3.jpg",
  },
  {
    location: "Nigeria",
    name: "Ibrahim Sule",
    title: "Elaws Consulting Nigeria Ltd.",
    image: "/t2.jpg",
  },
  {
    location: "India",
    name: "Avdhesh Varshney",
    title: "Justicewings Lexedge Solutions LLP",
    image: "/t1.jpg",
  },
  {
    location: "Delhi",
    name: "Roopali Grover",
    title: "Roopali Grover & Associates",
    image: "/t4.jpg",
  },
  {
    location: "Bengaluru",
    name: " Ashwin Dhawle",
    title: "VisionComply Corporate Services LLP",
    image: "/t8.png",
  },
 


  
];

const testimonials2 = [
  {
    location: "Delhi",
    name: " Adv. Tarun Solanki",
    title: "Individual Practitioner",
    image: "/t5.jpg",

  },
  {
    location: "Bangladesh",
    name: "Osman Gani Tuhin",
    title: "Tuhin & Partners",
    image: "/t6.jpg",

  },
  {
    location: "Noida",
    name: "Sandeep Sharma",
    title: "Sargas Legal",
    image: "/t7.jpg",
    


  },
  {
    location: "Pune",
    name: "Ravi Bhardwaj ",
    title: "Startup Legal",
    image: "/t9.jpg",
    
    
   
    

  },
];

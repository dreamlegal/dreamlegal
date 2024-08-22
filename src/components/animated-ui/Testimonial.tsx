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
      The most engaging community of legal innovators who drive efficiency, optimization and growth.
      </p>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    location: "London, UK",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    location: "London, UK",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    location: "Mumbai, India",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    location: "Benguluru, India",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    location: "Chennai, India",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

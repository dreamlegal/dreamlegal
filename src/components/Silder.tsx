"use client";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface SliderElementProps {
  children: React.ReactNode;
}

function SliderElement({ children }: SliderElementProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {React.Children.map(children, (child, index) => (
            <div className="embla__slide" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className=" inset-0 flex items-center justify-between px-4 z-50">
        <button
          className="absolute left-0 top-[50%] embla__prev bg-gray-900/60 h-10 w-10 md:h-16 md:w-16 rounded-full flex justify-center items-center"
          onClick={scrollPrev}
        >
          <IoArrowBack className="text-[22px] text-white" />
        </button>
        <button
          className="absolute right-0 top-[50%] embla__next bg-gray-900/60 h-10 w-10 md:h-16 md:w-16 rounded-full flex justify-center items-center"
          onClick={scrollNext}
        >
          <IoArrowForward className="text-[22px] text-white" />
        </button>
      </div>
    </div>
  );
}

export default SliderElement;

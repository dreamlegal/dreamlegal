"use client";
import React, { useState } from "react";
import Search from "./animated-ui/Search";
import FilterCategory from "./animated-ui/FilterCategory";
import { useRouter } from "next/navigation";

const placeholders = [
  "Contract Management",
  "Case Management",
  "Compliance Management",
  
];

function HomeHero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/directory");
    console.log("submitted");
  };

  return (
    <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 font-clarity">
      <div className="hidden md:block">
        {" "}
        <div className=" rounded-md relative">
          <img src="/background.png" alt="" />
          <div className="absolute top-0 left-0 w-full h-full ">
            <div className="flex flex-col items-center justify-center h-full">
              <div className=" grid grid-cols-10">
                <div className="col-span-3"></div>
                <div className="col-span-4 flex flex-col  gap-4">
                  <h2 className="text-[33px] font-bold text-center"> 
                    Discover technology  tailored for legal professionals
                  </h2>
                  <p className=" text-sm text-[#46526a] text-center ">
                  Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
                  </p>
                 <div className="w-full relative">
                 <div className=" absolute -ml-28 ">
                  <div className="flex gap-3 items-center justify-center w-full"> 
                      <div className="flex w-[60%]">
                        <Search
                          placeholders={placeholders}
                          onChange={handleChange}
                          onSubmit={onSubmit}
                        />
                      </div>
                      <div className="flex w-[20%]">
                        <FilterCategory />
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
                <div className="col-span-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className=" rounded-md relative w-full">
          <img src="/background2.png" className="w-full" alt="" />
          <div className="absolute top-0 left-0 w-full h-full ">
            <div className="flex flex-col items-center justify-center h-full px-4">
              <h2 className="text-2xl font-bold text-center">
              Discover technology  tailored for legal professionals
              </h2>
              <p className=" text-sm text-[#46526a] text-center my-2 ">
              Optimize legal process and operations- Find, compare and evaluate the best technology for your unique legal needs.
              </p>
              <div className="flex flex-col items-center  justify-center gap-3 w-full mt-3">
                <div className="flex-initial w-full">
                  <Search
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                  />
                </div>
                <div className="flex items-center justify-center w-full">
                  <FilterCategory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;

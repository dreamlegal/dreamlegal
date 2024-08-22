import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiStar } from "react-icons/ci";

function HomeCta() {
  return (
    <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 font-clarity">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="h-[450px] md:h-[350px] col-span-1   ">
          <div className=" px-4">
            <div className="h-[450px] md:h-[350px] bg-primary2 rounded-xl px-8 py-10 flex flex-col gap-5 relative overflow-clip ">
              <div className=" h-12 w-12 rounded-full bg-primary1 inline-flex justify-center items-center z-20">
                <FaArrowUp className=" text-white text-[28px]" />
              </div>
              <h3 className=" font-bold text-3xl z-20 md: w-2/3 ">
                Publish a free product!
              </h3>
              <p className=" text-sm text-slate-500 z-20  w-2/3">
                Lorem ipsum dolor amet consectetur adipiscing elit ut gravida
                sit vel.
              </p>
              <button className="z-20 flex gap-2 rounded-full transition-all duration-200 bg-primary1 text-white font-bold px-6 py-3 text-xs w-fit items-center hover:bg-gray-900 hover:gap-4">
                Publish now
                <IoIosArrowRoundForward className=" text-xl" />
              </button>
              <div className=" absolute bottom-[-155px] right-[-155px] md:bottom-[-100px] md:right-[-100px] w-96 h-96 bg-primary1 opacity-10 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="h-[450px] md:h-[350px] col-span-1   ">
          <div className=" px-4">
            <div className="h-[450px] md:h-[350px] bg-primary1 rounded-xl px-8 py-10 flex flex-col gap-5 relative overflow-clip ">
              <div className=" h-12 w-12 rounded-full bg-white inline-flex justify-center items-center z-20">
                <CiStar className=" text-primary1 text-[28px]" />
              </div>
              <h3 className=" font-bold text-3xl z-20  text-white ">
                Publish a featured product!
              </h3>
              <p className=" text-sm text-white z-20  md:w-2/3">
                Lorem ipsum dolor amet consectetur adipiscing elit ut gravida
                sit vel.
              </p>
              <button className="z-20 flex gap-2 rounded-full transition-all duration-200 bg-gray-900 text-white font-bold px-6 py-3 text-xs w-fit items-center hover:bg-gray-900/80 hover:gap-4">
                Publish now
                <IoIosArrowRoundForward className=" text-xl" />
              </button>
              <div className=" absolute bottom-[-155px] right-[-155px] md:bottom-[-100px] md:right-[-100px] w-96 h-96 bg-primary2 opacity-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCta;

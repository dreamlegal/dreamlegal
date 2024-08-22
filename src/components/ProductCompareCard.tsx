import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function ProductCompareCard() {
  return (
    <div className=" bg-white px-5 py-4 border shadow rounded-2xl w-full md:w-[300px] group hover:border-primary1 transition-all duration-200 hover:translate-y-1 hover:cursor-pointer">
      <div className=" flex gap-2 items-center">
        <img
          src="https://assets-global.website-files.com/63bed0273cfe5e611e742359/63c82fe038b315197d0623d9_startuper-featured-image-aggregator-x-webflow-template.svg"
          className="w-12 h-12 rounded-full"
          alt=""
        />
        <div className="flex flex-col ">
          <h3 className="text-base font-bold ml-3">Product name</h3>

          <button className="  flex gap-2 rounded-full  text-primary1 font-bold px-6 py-3 text-xs transition-all  w-fit items-center group-hover:bg-primary2 group-hover:gap-4">
            Compare
            <IoIosArrowRoundForward className=" text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCompareCard;

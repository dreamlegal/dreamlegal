import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function BookMarkCard({product}:any) {
  return (
    <>
  

    <div className="w-full px-10 py-7  rounded-xl border  font-clarity bg-gray-50 border-gray-300 shadow-md">
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4 items-center">
        <img
            src={product.logoUrl}
          className="w-14 h-14 rounded-full shadow-blue-50 shadow-sm"
          alt=""
        />
        <div className="flex flex-col gap-1 ml-1">
          <div>
            <h3 className="font-bold text-base">{product.title}</h3>
          </div>
          <div className="px-2 py-1 bg-primary2 rounded-full">
            {" "}
            <span className="text-xs text-primary1 font-bold">
              {product.category}
            </span>
          </div>
        </div>
       
      </div>
     
      <div></div>
    </div>
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs text-slate-400 mt-4 mb-1">Overview</div>
        <div>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
   
    <div className="md:ml-auto pt-4 mt-4 md:mt-0 flex gap-4 items-center">
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="flex gap-2 items-center bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit  hover:bg-primary2 hover:text-primary1 hover:border-primary1 rounded-full hover:gap-4"
          >
            View
            <IoIosArrowRoundForward className="text-xl" />
          </Link>
        </div>
    </div>

   
    </div>
    </>
  );
}

export default BookMarkCard;

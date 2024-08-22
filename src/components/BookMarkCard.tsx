import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function BookMarkCard({product}:any) {
  return (
    <div className="w-full px-10 py-7 bg-secondary1 rounded-xl border shadow-md">
      <div className="grid grid-cols-1 ">
        <div className="md:col-span-2 inline-flex flex-col  gap-4">
          <img
            src={product.logoUrl}
            width={80}
            height={80}
            alt="logo"
            className="rounded-full w-20 h-20 object-cover"
          ></img>
          <div>
            <h3 className=" font-bold text-base">{product.title}</h3>
            <p className=" text-sm text-slate-500 mt-2">
              {product.description}
            </p>
            <div className=" flex gap-3 items-center mt-3 ">
              <div>
                {/* {product.category.map((category: string, index: number) => (
                  <p key={index} className=" bg-primary2 px-2 py-2 text-xs rounded-full text-primary1 font-bold">
                  {" "}
                    {category}
                </p>
                ))} */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 mt-2">
          <div className=" md:items-center justify-center h-full ">
            <button className=" flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-gray-900 hover:gap-4">
              View Product
              <IoIosArrowRoundForward className=" text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMarkCard;

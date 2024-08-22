"use client";
import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GrCycle } from "react-icons/gr";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";
import { VscReferences } from "react-icons/vsc";
import { FaRegStar } from "react-icons/fa";

function ProductSidebar({ product }: any) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-clarity md:w-[300px]">
      <div>
        <img
          src={product.logoUrl}
          alt=""
          className={`rounded-3xl w-[150px] h-[150px] md:w-[300px] md:h-[300px] md:sticky md:top-0 ${
            isSticky ? "sticky-img sticky" : "sticky-img"
          }`}
        />
      </div>

      <div className="my-4 md:my-8 hidden md:block">
        <ul className="flex flex-col gap-4 px-2 py-6 rounded-2xl border">
          <a href="#company">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <MdOutlineBusinessCenter className="text-xl" />
              <span>Company Information</span>
            </li>
          </a>

          <a href="#product">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <AiOutlineProduct className="text-xl" />
              <span>Product Information</span>
            </li>
          </a>

          <a href="#overviews">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <MdGridView className="text-xl" />
              <span>Overview</span>
            </li>
          </a>

          <a href="#customers">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <FaRegUser className="text-xl" />
              <span>Customers</span>
            </li>
          </a>

          <a href="#lifecycle">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <GrCycle className="text-xl" />
              <span>Process Lifecycle</span>
            </li>
          </a>

          <a href="#features">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <MdOutlineFeaturedPlayList className="text-xl" />
              <span>Features</span>
            </li>
          </a>

          <a href="#pricing">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <RiMoneyRupeeCircleLine className="text-xl" />
              <span>Pricing</span>
            </li>
          </a>

          <a href="#support">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <MdOutlineContactSupport className="text-xl" />
              <span>Support & Services </span>
            </li>
          </a>

          <a href="#post">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <MdOutlineContactSupport className="text-xl" />
              <span>Post Implementation </span>
            </li>
          </a>

          <a href="#reference">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <VscReferences className="text-xl" />
              <span>Reference</span>
            </li>
          </a>

          <a href="#reviews">
            <li className="flex items-center gap-2 text-primary1 hover:bg-primary2/70 hover:cursor-pointer px-4     transition-all duration-200 rounded-full">
              <FaRegStar className="text-xl" />
              <span>Reviews</span>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default ProductSidebar;

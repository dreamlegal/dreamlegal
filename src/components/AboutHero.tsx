import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function AboutHero() {
  return (
    <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 font-clarity">
      <div className="grid grid-cols-1 md:grid-cols-7  gap-4">
        <div className=" col-span-4 flex flex-col justify-center px-10  gap-4">
          <h1 className="text-4xl md:text-[46px] font-bold">
            About DreamLegal
          </h1>
          <p className="text-base text-slate-500 text-justify">
            We simplify selection, onboarding and management of technology for
            legal professionals and teams. Our mission is to simplify every
            legal professional ’s journey with technology, making it an
            effortless part of your daily workflow. We understand the unique
            challenges that legal professionals face and we're here to ensure
            that technology enhances your practice and eases your workload.
          </p>
          <div className=" flex gap-6">
            <Link href={"/directory"}>
              <button className=" flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary2 hover:text-primary1 hover:gap-4">
                Directory
                <IoIosArrowRoundForward className=" text-xl" />
              </button>
            </Link>

            <a href="https://blog.dreamlegal.in">
              <button className=" flex gap-2 rounded-full bg-primary2 text-primary1 font-bold px-6 py-3 text-xs transition-all  w-fit items-center border-primary1 hover:bg-primary1 hover:text-white hover:gap-4">
                Resources
                <IoIosArrowRoundForward className=" text-xl" />
              </button>
            </a>
          </div>
        </div>
        <div className=" col-span-3">
          <Image
            src={`/aboutus2.png`}
            width={1260}
            height={750}
            alt=""
            className="rounded-3xl w-full h-full"
          ></Image>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center mt-12 mb-8">
        <div>
          <span className="text-lg font-bold">Our Achievements</span>
        </div>
        <div className="flex gap-4 flex-wrap items-center justify-center  ">
          <a href="https://www.f6s.com/companies/legaltech/india/co">
            <img
              src="/1.png"
              className=" h-8 md:h-20 w-auto filter grayscale mix-blend-multiply"
              alt=""
            />
          </a>

          <a href="https://wardblawg.com/best-legal-technologists-consultants/ranjan-singhania-helping-legal-teams-to-find-the-best-technology-solutions-co-founder-legal-technology-enthusiast/">
            <img
              src="/2.png"
              className=" h-8 md:h-20 w-auto filter grayscale mix-blend-multiply"
              alt=""
            />
          </a>


          <img
            src="/3.png"
            className=" h-8 md:h-20 w-auto filter grayscale mix-blend-multiply"
            alt=""
          />
          <img
            src="/4.png"
            className=" h-8 md:h-20 w-auto filter grayscale mix-blend-multiply"
            alt=""
          />
          <img
            src="/5.png"
            className=" h-8 md:h-20 w-auto filter grayscale mix-blend-multiply"
            alt=""
          />
          <img
            src="/6.png"
            className=" h-8 md:h-20 w-auto filter grayscale mix-blend-multiply"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default AboutHero;

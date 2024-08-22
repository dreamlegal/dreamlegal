import React from "react";
import BlogCarosel from "./BlogCarosel";

function HomeBlog() {

  return (
    <div className=" bg-[#f8f8fb] w-full py-10">
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 font-clarity">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className=" col-span-1 px-4 flex flex-col gap-4  justify-center  ">
            <div className=" ">
              <h2 className=" text-3xl font-bold ">Article & resources</h2>
              <p className=" text-sm text-slate-500 ">
                Explore legal tech articles, surveys, reports, events and case studies.
              </p>
              <div className=" w-full  mt-5 ">
                <a href="https://blog.dreamlegal.in">
                  <button className=" flex gap-2 rounded-full bg-white text-gray-900 border border-gray-700 font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary1 hover:text-white hover:border-white">
                    Browse all
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className=" col-span-2">
            <BlogCarosel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBlog;

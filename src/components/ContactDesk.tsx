import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function ContactDesk() {
  return (
    <>
      <div className="  py-16 lg:py-20">
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8  font-clarity">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col mb-16 sm:text-center">
              <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                <h2 className="max-w-lg mb-6   text-3xl font-bold leading-none  text-gray-900 sm:text-4xl md:mx-auto">
                  Contact us directly
                </h2>
              
              </div>
            </div>
          </div>
        </div>

        <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity ">
          <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
            <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-2xl hover:border-primary1 hover:cursor-pointer shadow-sm hover:scale-105 group hover:shadow-xl">
              <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0  group-hover:scale-x-100" />
              <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0  group-hover:scale-y-100" />
              <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0  group-hover:scale-x-100" />
              <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0  group-hover:scale-y-100" />
              <div className="relative p-5 bg-white rounded-sm">
                <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-primary2 lg:mb-0">
                    <img src="/supporticon.svg" alt="" />
                  </div>
                  <h6 className="font-bold leading-5 text-xl">User Support</h6>
                </div>
                <p className="mb-2 mt-4 text-sm text-slate-500">
                Explore how we ensure exceptional user support. Reach out for assistance today!
                </p>
                <div className="flex items-center gap-3 transition-all duration-200 group-hover:gap-5">
                  <a href="mailto:support@dreamlegal.in">
                  <p className="text-sm font-bold text-gray-900">
                    support@dreamlegal.in
                  </p>
                  </a>
                  <IoIosArrowRoundForward className="text-xl text-primary1" />
                </div>
              </div>
            </div>
            <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-2xl hover:border-primary1 hover:cursor-pointer  shadow-sm hover:scale-105 group hover:shadow-xl">
              <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0  group-hover:scale-x-100" />
              <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0  group-hover:scale-y-100" />
              <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0  group-hover:scale-x-100" />
              <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0  group-hover:scale-y-100" />
              <div className="relative p-5 bg-white rounded-sm">
                <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-primary2 lg:mb-0">
                    <img src="/featuredicon.svg" alt="" />
                  </div>
                  <h6 className="font-bold leading-5 text-xl">
                    Career opportunities
                  </h6>
                </div>
                <p className="mb-2 mt-4 text-sm text-slate-500">
                Discover rewarding career opportunities with us. Join our team and grow professionally!
                </p>

                <div className="flex items-center gap-3 transition-all duration-200 group-hover:gap-5">
                 <a href="mailto:career@dreamlegal.in">
                 <p className="text-sm font-bold text-gray-900">
                    career@dreamlegal.in
                  </p>
                 </a>
                  <IoIosArrowRoundForward className="text-xl text-primary1" />
                </div>
              </div>
            </div>
            <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-2xl hover:border-primary1 hover:cursor-pointer shadow-sm hover:scale-105 group hover:shadow-xl">
              <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0  group-hover:scale-x-100" />
              <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0  group-hover:scale-y-100" />
              <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0  group-hover:scale-x-100" />
              <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0  group-hover:scale-y-100" />
              <div className="relative p-5 bg-white rounded-sm">
                <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-primary2 lg:mb-0">
                    <img src="/partnericon.svg" alt="" />
                  </div>
                  <h6 className="font-bold leading-5 text-xl">
                    Vendor support
                  </h6>
                </div>
                <p className="mb-2 mt-4 text-sm text-slate-500">
                Learn about our dedicated vendor support services. Connect with us to discuss partnerships and support.
                </p>
                <div className="flex items-center gap-3 transition-all duration-200 group-hover:gap-5">
                  <a href="mailto:vendor@dreamlegal.in">
                  <p className="text-sm font-bold text-gray-900">
                    vendor@dreamlegal.in
                  </p>
                  </a>
                  <IoIosArrowRoundForward className="text-xl text-primary1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDesk;

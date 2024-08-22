"use client";
import { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { HiMenuAlt4 } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const vendorId =
    typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="inline-flex items-center mr-8">
            <span className="ml-2 text-xl  tracking-wide text-black font-bold ">
              Dream <span className="text-primary1">Legal</span>
            </span>
          </a>
          <ul className=" ml-4 flex items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/"
                className="font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/directory"
                className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
              >
                Directory
              </a>
            </li>
            <li>
              <a
                href="/about"
                aria-label="Product pricing"
                title="Product pricing"
                className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://blog.dreamlegal.in/"
                aria-label="Blog"
                title="About us"
                className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
              >
                Blog
              </a>
            </li>

            <li>
              <a
                href="/contact"
                aria-label="Contact us"
                title="About us"
                className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
        {userId && (
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link href={"/user/" + userId}>
                <button className="inline-flex items-center justify-center gap-2 font-bold text-xs  text-gray-900 transition-all duration-300 hover:text-white hover:bg-primary1 rounded-full border border-black hover:border-primary1 px-5 py-3 hover:scale-95 hover:-translate-y-1">
                  <RiLoginCircleLine className=" text-base" /> Profile
                </button>
              </Link>
            </li>
          </ul>
        )}
        {vendorId && (
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link href={"/vendor"}>
                <button className="inline-flex items-center justify-center gap-2 font-bold text-xs  text-gray-900 transition-all duration-300 hover:text-white hover:bg-primary1 rounded-full border border-black hover:border-primary1 px-5 py-3 hover:scale-95 hover:-translate-y-1">
                  <RiLoginCircleLine className=" text-base" /> Profile
                </button>
              </Link>
            </li>
          </ul>
        )}

        {!userId && !vendorId && (
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link href={"/sign-up"}>
                <button className="inline-flex items-center justify-center gap-2 font-bold text-xs  text-gray-900 transition-all duration-300 hover:text-white hover:bg-primary1 rounded-full border border-black hover:border-primary1 px-5 py-3 hover:scale-95 hover:-translate-y-1">
                  <RiLoginCircleLine className=" text-base" />  Signup
                </button>
              </Link>
            </li>
            <li>
              <Link href={"sign-in"}>
                <button className="inline-flex items-center justify-center gap-2 font-bold text-xs bg-primary1  text-white transition-all duration-300 hover:text-primary1 hover:bg-primary2 rounded-full border   px-5 py-3  hover:-translate-y-1">
                  <FaUser className=" text-base" /> Login
                </button>
              </Link>
            </li>
          </ul>
        )}
        <div className="lg:hidden">
          <button
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline text-primary1 text-[30px] "
            onClick={() => setIsMenuOpen(true)}
          >
            <HiMenuAlt4 />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-[100]">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div></div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="/"
                        className="font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/directory"
                        className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
                      >
                        Directory
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        aria-label="Product pricing"
                        title="Product pricing"
                        className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="About us"
                        title="About us"
                        className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
                      >
                        Blog
                      </a>
                    </li>

                    <li>
                      <a
                        href="/contact"
                        aria-label="About us"
                        title="About us"
                        className=" font-medium text-sm tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary1"
                      >
                        Contact us
                      </a>
                    </li>
                    {userId && (
                     
                        <li>
                          <Link href={"/user/" + userId}>
                            <button className="inline-flex items-center justify-center gap-2 font-bold text-xs  text-gray-900 transition-all duration-300 hover:text-white hover:bg-primary1 rounded-full border border-black hover:border-primary1 px-5 py-3 hover:scale-95 hover:-translate-y-1">
                              <RiLoginCircleLine className=" text-base" />{" "}
                              Profile
                            </button>
                          </Link>
                        </li>
                    
                    )}
                    {vendorId && (
                     
                        <li>
                          <Link href={"/vendor"}>
                            <button className="inline-flex items-center justify-center gap-2 font-bold text-xs  text-gray-900 transition-all duration-300 hover:text-white hover:bg-primary1 rounded-full border border-black hover:border-primary1 px-5 py-3 hover:scale-95 hover:-translate-y-1">
                              <RiLoginCircleLine className=" text-base" />{" "}
                              Profile
                            </button>
                          </Link>
                        </li>
                     
                    )}

                    {!userId && !vendorId && (
                     <>
                        <li>
                          <Link href={"/sign-up"}>
                            <button className="inline-flex items-center justify-center gap-2 font-bold text-xs  text-gray-900 transition-all duration-300 hover:text-white hover:bg-primary1 rounded-full border border-black hover:border-primary1 px-5 py-3 hover:scale-95 hover:-translate-y-1">
                              <RiLoginCircleLine className=" text-base" /> User
                              signup
                            </button>
                          </Link>
                        </li>
                        <li>
                          <Link href={"sign-in"}>
                            <button className="inline-flex items-center justify-center gap-2 font-bold text-xs bg-primary1  text-white transition-all duration-300 hover:text-primary1 hover:bg-primary2 rounded-full border   px-5 py-3  hover:-translate-y-1">
                              <FaUser className=" text-base" /> User Login
                            </button>
                          </Link>
                        </li>
                        </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

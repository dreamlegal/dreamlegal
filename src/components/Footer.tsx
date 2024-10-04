import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-primary2 w-full shadow-2xl">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <span className="text-xl font-bold tracking-wide text-gray-800 uppercase">
                About DreamLegal
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-gray-800">
                We simplify selection, onboarding and management of technology
                for legal professionals and teams.
              </p>
              <p className="mt-4 text-sm text-gray-800"></p>
              <div className="flex items-center space-x-4 mt-5">
                <a
                  href="/"
                  className="flex items-center bg-[#dc2f75] text-[#fff]  px-3 py-2 rounded-[30px] transition-all duration-300 hover:text-deep-purple-accent-400 hover:scale-110"
                >
                  <Link
                    href={"https://www.instagram.com/dreamlegal_/"}
                    className="flex gap-1 items-center"
                    target="_blank"
                  >
                    <FaInstagram size={18} color="#fff" />
                    <p>Instagram</p>
                  </Link>
                </a>
                <a
                  href="/"
                  className=" flex items-center hover:scale-110 bg-[#2e64bc] text-white px-3 py-2  rounded-[30px] transition-all duration-300 hover:text-deep-purple-accent-400"
                >
                  <Link
                    href={"https://in.linkedin.com/company/dreamlegal"}
                    className="flex gap-1 items-center"
                    target="_blank"
                  >
                    <FaLinkedinIn size={18} color="#fff" />
                    <p>LinkedIn</p>
                  </Link>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-800"></p>
              <ul className="text-gray-80 space-y-2 text-base">
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/"}>Home</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory"}>Directory</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/about"}>About Us</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/contact"}>Contact Us</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/"}>Privacy Policy</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/"}>Terms and Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <span className="text-xl font-bold tracking-wide text-gray-800 uppercase">
                Browse Categories
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <ul className="text-gray-800 space-y-2 text-base">
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={
                      "/directory?category=Client%20Relationship%20Management"
                    }
                  >
                    Client Relationship Management
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={
                      "/directory?category=Contract%20Management%20Software"
                    }
                  >
                    Contract Lifecycle Management
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={"/directory?category=Document%20Management%20System"}
                  >
                    Document Management System
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={"/directory?category=E-billing%20and%20Invoicing"}
                  >
                    E-Billing and Invoicing
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?category=E-discovery"}>
                    E-Discovery
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?category=E-Signature"}>
                    E-Signature
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={
                      "/directory?category=Governance%20and%20Compliance%20and%20Risk%20Management"
                    }
                  >
                    Governance, Risk and Compliance
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={
                      "/directory?category=Intellectual%20Property%20Management"
                    }
                  >
                    Intellectual Property Management
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?category=Legal%20Research"}>
                    Legal Research
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={"/directory?category=Legal%20Workflow%20Automation"}
                  >
                    Legal Workflow Automation
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link
                    href={
                      "/directory?category=Litigation%20Management%20and%20Analytics"
                    }
                  >
                    Litigation Management and Analytics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <span className="text-xl font-bold tracking-wide text-gray-800 uppercase">
                User
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <ul className="text-gray-800 space-y-2 text-base">
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=Law%20firms"}>Law Firm</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=Enterprises"}>
                    Enterprise
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=Individual%20Practitioner"}>
                    Individual Practitioner
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=Startups"}>Startup</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=Government%20departments"}>
                    Government Department
                  </Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=Judiciary"}>Judiciary</Link>
                </li>
                <li className="hover:text-primary1 transition-all cursor-pointer">
                  <Link href={"/directory?customer=In-House%20Counsels"}>
                    In-House Counsel
                  </Link>
                </li>
              </ul>

              <div className="mt-6 space-x-2">
                <a
                  href="/sign-in"
                  className="bg-primary2 border-2 border-gray-800 text-gray-800 px-3 py-3 rounded-[30px] hover:border-primary2 transition-all duration-300 shadow-md"
                >
                  Log In
                </a>
                <a
                  href="/sign-up"
                  className="bg-primary2 border-2 border-gray-800 text-gray-800 px-3 py-3 rounded-[30px] hover:border-primary2 transition-all duration-300 shadow-md"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-400 sm:flex-row">
          <p className="text-base text-gray-800">
            Copyright 2024 —{" "}
            <Link className="font-semibold" href={"https://dreamlegal.in/"}>
              dreamlegal.in
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-[#d8e2fc] w-full">
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
              <p className="text-sm text-gray-800">
                We simplify selection, onboarding and management of technology
                for legal professionals and teams.
              </p>
              <p className="mt-4 text-sm text-gray-800"></p>
              <div className="flex items-center space-x-4 mt-5">
                <a
                  href="/"
                  className="flex items-center bg-[#dc2f75] text-[#fff]  px-3 py-2 rounded-[30px] transition-all duration-300 hover:text-deep-purple-accent-400 hover:scale-110"
                >
                  <div className="flex gap-1 items-center">
                    <FaInstagram size={18} color="#fff" />
                    <p>Instagram</p>
                  </div>
                </a>
                <a
                  href="/"
                  className=" flex items-center hover:scale-110 bg-[#2e64bc] text-white px-3 py-2  rounded-[30px] transition-all duration-300 hover:text-deep-purple-accent-400"
                >
                  <div className="flex gap-1 items-center">
                    <FaLinkedinIn size={18} color="#fff" />
                    <p>LinkedIn</p>
                  </div>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-800"></p>
              <ul className="text-muted-foreground space-y-2 text-base">
                <li>Home</li>
                <li>Directory</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
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
              <ul className="text-muted-foreground space-y-2 text-base">
                <li>Client Relationship Management</li>
                <li>Contract Lifecycle Management</li>
                <li>Document Management Software</li>
                <li>E-Billing and Invoicing</li>
                <li>E-Discovery</li>
                <li>E-Signature</li>
                <li>Governance, Risk and Compliance</li>
                <li>Intellectual Property Management</li>
                <li>Legal Research</li>
                <li>Legal Workflow Automation</li>
                <li>Litigation Management and Analytics</li>
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
                Users
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <ul className="text-muted-foreground space-y-2 text-base">
                <li>Enterprise</li>
                <li>Government Departments</li>
                <li>Individual Practitioner</li>
                <li>Inhouse Counsel</li>
                <li>Law Firm</li>
                <li>Startups</li>
              </ul>

              <div className="mt-6">
                <a
                  href="/"
                  className="bg-[#d8e2fc] border-2 border-[#333334] text-[#333334] px-3 py-3 rounded-[30px] 
               transition-transform duration-300 ease-in-out transform hover:scale-[2]"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-400 sm:flex-row">
          <p className="text-base text-gray-600">
            Copyright 2024 —{" "}
            <Link href={"https://dreamlegal.in/"}>dreamlegal.in</Link>. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

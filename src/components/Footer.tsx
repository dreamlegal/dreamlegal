// import Link from "next/link";
// import React from "react";
// import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

// export const Footer = () => {
//   return (
//     <div className="bg-primary2 w-full shadow-2xl">
//       <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
//         <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
//           <div className="md:max-w-md lg:col-span-2">
//             <a
//               href="/"
//               aria-label="Go home"
//               title="Company"
//               className="inline-flex items-center"
//             >
//               <span className="text-xl font-bold tracking-wide text-gray-800 uppercase">
//                 About DreamLegal
//               </span>
//             </a>
//             <div className="mt-4 lg:max-w-sm">
//               <p className="text-gray-800">
//                 We simplify selection, onboarding and management of technology
//                 for legal professionals and teams.
//               </p>
//               <p className="mt-4 text-sm text-gray-800"></p>
//               <div className="flex items-center space-x-4 mt-5">
//                 <a
//                   href="/"
//                   className="flex items-center bg-[#dc2f75] text-[#fff]  px-3 py-2 rounded-[30px] transition-all duration-300 hover:text-deep-purple-accent-400 hover:scale-110"
//                 >
//                   <Link
//                     href={"https://www.instagram.com/dreamlegal_/"}
//                     className="flex gap-1 items-center"
//                     target="_blank"
//                   >
//                     <FaInstagram size={18} color="#fff" />
//                     <p>Instagram</p>
//                   </Link>
//                 </a>
//                 <a
//                   href="/"
//                   className=" flex items-center hover:scale-110 bg-[#2e64bc] text-white px-3 py-2  rounded-[30px] transition-all duration-300 hover:text-deep-purple-accent-400"
//                 >
//                   <Link
//                     href={"https://in.linkedin.com/company/dreamlegal"}
//                     className="flex gap-1 items-center"
//                     target="_blank"
//                   >
//                     <FaLinkedinIn size={18} color="#fff" />
//                     <p>LinkedIn</p>
//                   </Link>
//                 </a>
//               </div>
//               <p className="mt-4 text-sm text-gray-800"></p>
//               <ul className="text-gray-80 space-y-2 text-base">
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/"}>Home</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory"}>Directory</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/about"}>About Us</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/contact"}>Contact Us</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/"}>Privacy Policy</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/"}>Terms and Conditions</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="md:max-w-md lg:col-span-2">
//             <a
//               href="/"
//               aria-label="Go home"
//               title="Company"
//               className="inline-flex items-center"
//             >
//               <span className="text-xl font-bold tracking-wide text-gray-800 uppercase">
//                 Browse Categories
//               </span>
//             </a>
//             <div className="mt-4 lg:max-w-sm">
//               <ul className="text-gray-800 space-y-2 text-base">
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={
//                       "/directory?category=Client%20Relationship%20Management"
//                     }
//                   >
//                     Client Relationship Management
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={
//                       "/directory?category=Contract%20Management%20Software"
//                     }
//                   >
//                     Contract Lifecycle Management
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={"/directory?category=Document%20Management%20System"}
//                   >
//                     Document Management System
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={"/directory?category=E-billing%20and%20Invoicing"}
//                   >
//                     E-Billing and Invoicing
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?category=E-discovery"}>
//                     E-Discovery
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?category=E-Signature"}>
//                     E-Signature
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={
//                       "/directory?category=Governance%20and%20Compliance%20and%20Risk%20Management"
//                     }
//                   >
//                     Governance, Risk and Compliance
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={
//                       "/directory?category=Intellectual%20Property%20Management"
//                     }
//                   >
//                     Intellectual Property Management
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?category=Legal%20Research"}>
//                     Legal Research
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={"/directory?category=Legal%20Workflow%20Automation"}
//                   >
//                     Legal Workflow Automation
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link
//                     href={
//                       "/directory?category=Litigation%20Management%20and%20Analytics"
//                     }
//                   >
//                     Litigation Management and Analytics
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="md:max-w-md lg:col-span-2">
//             <a
//               href="/"
//               aria-label="Go home"
//               title="Company"
//               className="inline-flex items-center"
//             >
//               <span className="text-xl font-bold tracking-wide text-gray-800 uppercase">
//                 User
//               </span>
//             </a>
//             <div className="mt-4 lg:max-w-sm">
//               <ul className="text-gray-800 space-y-2 text-base">
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=Law%20firms"}>Law Firm</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=Enterprises"}>
//                     Enterprise
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=Individual%20Practitioner"}>
//                     Individual Practitioner
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=Startups"}>Startup</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=Government%20departments"}>
//                     Government Department
//                   </Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=Judiciary"}>Judiciary</Link>
//                 </li>
//                 <li className="hover:text-primary1 transition-all cursor-pointer">
//                   <Link href={"/directory?customer=In-House%20Counsels"}>
//                     In-House Counsel
//                   </Link>
//                 </li>
//               </ul>

//               <div className="mt-6 space-x-2">
//                 <a
//                   href="/sign-in"
//                   className="bg-primary2 border-2 border-gray-800 text-gray-800 px-3 py-3 rounded-[30px] hover:border-primary2 transition-all duration-300 shadow-md"
//                 >
//                   Log In
//                 </a>
//                 <a
//                   href="/sign-up"
//                   className="bg-primary2 border-2 border-gray-800 text-gray-800 px-3 py-3 rounded-[30px] hover:border-primary2 transition-all duration-300 shadow-md"
//                 >
//                   Sign Up
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-400 sm:flex-row">
//           <p className="text-base text-gray-800">
//             Copyright 2024 —{" "}
//             <Link className="font-semibold" href={"https://dreamlegal.in/"}>
//               dreamlegal.in
//             </Link>
//             . All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Premium grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Diagonal accent strips */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-x-full top-1/3 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent 
                     transform -translate-y-1/2 -rotate-6" />
        <div className="absolute -inset-x-full top-2/3 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent 
                     transform -translate-y-1/2 rotate-6" />
      </div> */}

      <div className="relative px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          {/* About Section */}
          <div className="md:max-w-md lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <span className="text-xl font-bold tracking-wider text-gray-900">
                About DreamLegal
              </span>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-gray-600">
                We simplify selection, onboarding and management of technology
                for legal professionals and teams.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                <Link
                  href="https://www.instagram.com/dreamlegal_/"
                  target="_blank"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 
                           rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 
                           hover:-translate-y-0.5"
                >
                  <FaInstagram size={18} />
                  <span>Instagram</span>
                </Link>
                <Link
                  href="https://in.linkedin.com/company/dreamlegal"
                  target="_blank"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 
                           rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 
                           hover:-translate-y-0.5"
                >
                  <FaLinkedinIn size={18} />
                  <span>LinkedIn</span>
                </Link>
              </div>

              {/* Quick Links */}
              <ul className="mt-6 space-y-2">
                {["Home", "Directory", "About Us", "Contact Us", "Privacy Policy", "Terms and Conditions"].map((item) => (
                  <li key={item}>
                    <Link 
                      href="/" 
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categories Section */}
          <div className="md:max-w-md lg:col-span-2">
            <span className="text-xl font-bold tracking-wider text-gray-900">
              Browse Categories
            </span>
            <div className="mt-4 lg:max-w-sm">
              <ul className="space-y-2">
                {[
                  "Client Relationship Management",
                  "Contract Lifecycle Management",
                  "Document Management System",
                  "E-Billing and Invoicing",
                  "E-Discovery",
                  "E-Signature",
                  "Governance, Risk and Compliance",
                  "Intellectual Property Management",
                  "Legal Research",
                  "Legal Workflow Automation",
                  "Litigation Management and Analytics"
                ].map((category) => (
                  <li key={category}>
                    <Link 
                      href={`/directory?category=${encodeURIComponent(category)}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Section */}
          <div className="md:max-w-md lg:col-span-2">
            <span className="text-xl font-bold tracking-wider text-gray-900">
              User
            </span>
            <div className="mt-4 lg:max-w-sm">
              <ul className="space-y-2">
                {[
                  { label: "Law Firm", query: "Law%20firms" },
                  { label: "Enterprise", query: "Enterprises" },
                  { label: "Individual Practitioner", query: "Individual%20Practitioner" },
                  { label: "Startup", query: "Startups" },
                  { label: "Government Department", query: "Government%20departments" },
                  { label: "Judiciary", query: "Judiciary" },
                  { label: "In-House Counsel", query: "In-House%20Counsels" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={`/directory?customer=${item.query}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Auth Buttons */}
              <div className="mt-8 flex gap-4">
                <Link
                  href="/sign-in"
                  className="px-6 py-2 rounded-full bg-white border border-blue-200 text-blue-600 
                           hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                           hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 
                           transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center pt-5 pb-10 border-t border-blue-100">
          <p className="text-center text-gray-600">
            Copyright 2024 —{" "}
            <Link 
              href="https://dreamlegal.in/" 
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              dreamlegal.in
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

// // // import Link from "next/link";
// // // import React from "react";
// // // import {
// // //   FaLinkedinIn,
// // //   FaInstagram,
// // //   FaTwitter,
// // //   FaFacebookF,
// // //   FaGithub,
// // // } from "react-icons/fa";
// // // import { MdEmail } from "react-icons/md"; // Added for email icon

// // // export const Footer = () => {
// // //   // Social media links data
// // //   const socialLinks = [
// // //     {
// // //       href: "https://www.linkedin.com/company/dreamlegal",
// // //       icon: FaLinkedinIn,
// // //       label: "LinkedIn",
// // //     },
// // //     { href: "mailto:ranjan@dreamlegal.in ", icon: MdEmail, label: "Email" },
// // //     {
// // //       href: "https://www.instagram.com/dreamlegal_/",
// // //       icon: FaInstagram,
// // //       label: "Instagram",
// // //     },
// // //     { href: "https://x.com/_DreamLegal_", icon: FaTwitter, label: "Twitter" },
// // //   ];

// // //   // First column links
// // //   const firstColumnLinks = [
// // //     { href: "/about", label: "About us" },
// // //     { href: "/contact", label: "Contact us" },
// // //     { href: "/partners", label: "Partners" },
// // //     { href: "/tech_vendor", label: "For technology companies" },
// // //   ];

// // //   // Second column sections
// // //   const secondColumnSections = [
// // //     {
// // //       title: "For Legal Teams",
// // //       links: [
// // //         { href: "/directory", label: "Technology discovery platform" },
// // //         { href: "/community", label: "Legal technology community" },
// // //         { href: "/solutions", label: "Legal technology advisory" },
// // //       ],
// // //     },
// // //     {
// // //       title: "Resources",
// // //       links: [
// // //         { href: "/legal_blogs", label: "Legal Blogs" },
// // //         { href: "/learning_hub", label: "Learning hub" },
// // //         { href: "/resources", label: "Insights and leadership" },
// // //         {
// // //           href: "/digital_readiness_test",
// // //           label: "Digital readiness evaluation",
// // //         },
// // //       ],
// // //     },
// // //   ];

// // //   // Third column links
// // //   const thirdColumnLinks = [
// // //     { href: "/community_guidelines", label: "Community guidelines" },
// // //     { href: "/privacy_policy", label: "Privacy policy" },
// // //     { href: "/cookie_policy", label: "Cookie policy" },
// // //     { href: "/terms_of_use", label: "Terms of use" },
// // //     { href: "/refund_policy", label: "Refund policy" },
// // //   ];

// // //   // Action buttons
// // //   const actionButtons = [
// // //     {
// // //       href: "/auth/user/signup",
// // //       label: "Sign Up",
// // //       className:
// // //         "px-6 py-2 text-center rounded-full bg-[#7cc6ee] text-white hover:bg-[#5eb3df] transition-all duration-300 hover:scale-105",
// // //     },
// // //     {
// // //       href: "/contact",
// // //       label: "Contact Us",
// // //       className:
// // //         "px-6 py-2 text-center rounded-full bg-[#1e2556] text-white border border-white hover:bg-[#283070] transition-all duration-300 hover:scale-105",
// // //     },
// // //   ];

// // //   // Common link style
// // //   const linkStyle =
// // //     "text-white hover:text-[#7cc6ee] transition-colors duration-300";

// // //   return (
// // //     <div className="relative bg-[#1e2556] text-white overflow-hidden">
// // //       <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
// // //         <div className="grid gap-10 row-gap-6 mb-8 lg:grid-cols-4 md:grid-cols-2">
// // //           {/* First Column */}
// // //           <div className="md:max-w-md">
// // //             <Link href="/" className="inline-flex items-center mb-6">
// // //               <span className="text-xl font-bold tracking-wider text-white">
// // //                 DreamLegal
// // //               </span>
// // //             </Link>
// // //             <ul className="mt-4 space-y-3">
// // //               {firstColumnLinks.map((link) => (
// // //                 <li key={link.label}>
// // //                   <Link href={link.href} className={linkStyle}>
// // //                     {link.label}
// // //                   </Link>
// // //                 </li>
// // //               ))}
// // //             </ul>

// // //             {/* Social Links */}
// // //             <div className="flex items-center space-x-4 mt-6">
// // //               {socialLinks.map((social) => (
// // //                 <Link
// // //                   key={social.label}
// // //                   href={social.href}
// // //                   target="_blank"
// // //                   aria-label={social.label}
// // //                   className={linkStyle}
// // //                 >
// // //                   <social.icon size={20} />
// // //                 </Link>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Second Column - Split in two sections */}
// // //           <div className="md:max-w-md">
// // //             {secondColumnSections.map((section, index) => (
// // //               <div key={section.title} className={index === 0 ? "mb-6" : ""}>
// // //                 <h3 className="text-lg font-bold text-white mb-4">
// // //                   {section.title}
// // //                 </h3>
// // //                 <ul className="space-y-3">
// // //                   {section.links.map((link) => (
// // //                     <li key={link.label}>
// // //                       <Link href={link.href} className={linkStyle}>
// // //                         {link.label}
// // //                       </Link>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Third Column */}
// // //           <div className="md:max-w-md">
// // //             <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
// // //             <ul className="space-y-3">
// // //               {thirdColumnLinks.map((link) => (
// // //                 <li key={link.label}>
// // //                   <Link href={link.href} className={linkStyle}>
// // //                     {link.label}
// // //                   </Link>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>

// // //           {/* Fourth Column */}
// // //           <div className="md:max-w-md">
// // //             <h3 className="text-lg font-bold text-white mb-4">DreamLegal</h3>
// // //             <p className="text-white mb-6">
// // //               We are the trusted strategic partner for law firms and legal
// // //               departments, driving innovation, accelerating technology adoption,
// // //               and integrating AI to enhance efficiency and transform legal
// // //               operations.
// // //             </p>

// // //             {/* Buttons */}
// // //             <div className="flex flex-col sm:flex-row gap-4">
// // //               {actionButtons.map((button) => (
// // //                 <Link
// // //                   key={button.label}
// // //                   href={button.href}
// // //                   className={button.className}
// // //                 >
// // //                   {button.label}
// // //                 </Link>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Copyright */}
// // //         <div className="flex flex-col justify-center pt-5 pb-10 border-t border-[#334155]">
// // //           <p className="text-center text-white">
// // //             Copyright © {new Date().getFullYear()} —{" "}
// // //             <Link
// // //               href="https://dreamlegal.in/"
// // //               className="font-semibold text-white hover:text-[#7cc6ee] transition-colors"
// // //             >
// // //               dreamlegal.in
// // //             </Link>
// // //             . All rights reserved.
// // //           </p>
// // //           <p className="text-center text-white text-sm mt-2">
// // //             This brand is owned by KYLT Automation Services Private Limited
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Footer;

// // import Link from "next/link";
// // import React from "react";
// // import {
// //   FaLinkedinIn,
// //   FaInstagram,
// //   FaTwitter,
// //   FaFacebookF,
// // } from "react-icons/fa";
// // import { MdEmail } from "react-icons/md";
// // import { 
// //   Home, Briefcase, Scale, BookOpen, HelpCircle, Building,
// //   FileText, Brain, FolderOpen, Gavel, Shield, SearchIcon, Eye
// // } from 'lucide-react';

// // export const Footer = () => {
// //   // Social media links data
// //   const socialLinks = [
// //     {
// //       href: "https://www.linkedin.com/company/dreamlegal",
// //       icon: FaLinkedinIn,
// //       label: "LinkedIn",
// //     },
// //     { 
// //       href: "mailto:ranjan@dreamlegal.in", 
// //       icon: MdEmail, 
// //       label: "Email" 
// //     },
// //     {
// //       href: "https://www.instagram.com/dreamlegal_/",
// //       icon: FaInstagram,
// //       label: "Instagram",
// //     },
// //     { 
// //       href: "https://x.com/_DreamLegal_", 
// //       icon: FaTwitter, 
// //       label: "Twitter" 
// //     },
// //   ];

// //   // Navigation sections
// //   const navigationSections = [
// //     {
// //       title: "Platform",
// //       links: [
// //         { href: "/", label: "Home", icon: <Home size={14} /> },
// //         { href: "/compare", label: "Compare", icon: <Scale size={14} /> },
// //         { href: "/resources", label: "Resources", icon: <BookOpen size={14} /> },
// //         { href: "/community", label: "Community", icon: null },
// //       ],
// //     },
// //     {
// //       title: "Legal Categories",
// //       links: [
// //         { href: "/category/contract-lifecycle-management", label: "Contract Management", icon: <FileText size={14} /> },
// //         { href: "/category/legal-ai", label: "Legal AI", icon: <Brain size={14} /> },
// //         { href: "/category/document-management-system", label: "Document Management", icon: <FolderOpen size={14} /> },
// //         { href: "/category/litigation-management-and-analytics", label: "Litigation & Analytics", icon: <Gavel size={14} /> },
// //       ],
// //     },
// //     {
// //       title: "More Categories",
// //       links: [
// //         { href: "/category/intellectual-property-management", label: "IP Management", icon: <Shield size={14} /> },
// //         { href: "/category/legal-research", label: "Legal Research", icon: <SearchIcon size={14} /> },
// //         { href: "/category/e-discovery", label: "E-Discovery", icon: <Eye size={14} /> },
// //         { href: "/ask-question", label: "Ask a Question", icon: <HelpCircle size={14} /> },
// //       ],
// //     },
// //   ];

// //   // Company and legal links
// //   const companyLinks = [
// //     { href: "/about", label: "About Us" },
// //     { href: "/contact", label: "Contact Us" },
// //     { href: "/partners", label: "Partners" },
// //     { href: "/legal_tech", label: "For Vendors", icon: <Building size={14} /> },
// //   ];

// //   const legalLinks = [
// //     { href: "/privacy_policy", label: "Privacy Policy" },
// //     { href: "/terms_of_use", label: "Terms of Use" },
// //     { href: "/cookie_policy", label: "Cookie Policy" },
// //     { href: "/community_guidelines", label: "Community Guidelines" },
// //     { href: "/refund_policy", label: "Refund Policy" },
// //   ];

// //   const resourceLinks = [
// //     { href: "/legal_blogs", label: "Legal Blogs" },
// //     { href: "/learning_hub", label: "Learning Hub" },
// //     { href: "/digital_readiness_test", label: "Digital Readiness Test" },
// //     { href: "/solutions", label: "Legal Tech Advisory" },
// //   ];

// //   // Common link style
// //   const linkStyle = `text-white hover:text-[#7cc6ee] transition-colors duration-300 flex items-center gap-2`;

// //   return (
// //     <div className="relative bg-[#1e2556] text-white overflow-hidden">
// //       {/* Main Footer Content */}
// //       <div className="px-4 pt-16 pb-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
// //         <div className="grid gap-8 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
          
// //           {/* Brand Column */}
// //           <div className="lg:col-span-2 md:col-span-3 sm:col-span-2">
// //             <Link href="/" className="inline-flex items-center mb-6">
// //               <img 
// //                 src="/logos/DreamLegal_logo_allblue.png" 
// //                 alt="DreamLegal Logo" 
// //                 className="h-8 brightness-0 invert" 
// //               />
// //             </Link>
// //             <p className="text-white mb-6 leading-relaxed" style={{ color: '#e2e8f0' }}>
// //               We are the trusted strategic partner for law firms and legal departments, 
// //               driving innovation, accelerating technology adoption, and integrating AI to 
// //               enhance efficiency and transform legal operations.
// //             </p>

// //             {/* Action Buttons */}
// //             <div className="flex flex-col sm:flex-row gap-3 mb-6">
// //               <Link
// //                 href="/auth/user/register"
// //                 className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#7cc6ee] rounded-lg hover:bg-[#5eb3df] transition-all duration-300 hover:scale-105 hover:shadow-lg"
// //               >
// //                 Get Started
// //               </Link>
// //               <Link
// //                 href="/ask-question"
// //                 className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#1e2556] transition-all duration-300 hover:scale-105"
// //               >
// //                 <HelpCircle size={16} className="mr-2" />
// //                 Ask a Question
// //               </Link>
// //             </div>

// //             {/* Social Links */}
// //             <div className="flex items-center space-x-4">
// //               <span className="text-sm font-medium" style={{ color: '#e2e8f0' }}>Follow us:</span>
// //               {socialLinks.map((social) => (
// //                 <Link
// //                   key={social.label}
// //                   href={social.href}
// //                   target="_blank"
// //                   aria-label={social.label}
// //                   className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7cc6ee] transition-all duration-300 hover:scale-110"
// //                 >
// //                   <social.icon size={18} />
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Navigation Sections */}
// //           {navigationSections.map((section, index) => (
// //             <div key={section.title}>
// //               <h3 className="text-lg font-bold text-white mb-4" style={{ color: '#ffffff' }}>
// //                 {section.title}
// //               </h3>
// //               <ul className="space-y-3">
// //                 {section.links.map((link) => (
// //                   <li key={link.label}>
// //                     <Link href={link.href} className={linkStyle}>
// //                       {link.icon && (
// //                         <span style={{ color: '#7cc6ee' }}>{link.icon}</span>
// //                       )}
// //                       <span className="text-sm">{link.label}</span>
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}

// //           {/* Company & Resources Column */}
// //           <div>
// //             <h3 className="text-lg font-bold text-white mb-4">Company</h3>
// //             <ul className="space-y-3 mb-6">
// //               {companyLinks.map((link) => (
// //                 <li key={link.label}>
// //                   <Link href={link.href} className={linkStyle}>
// //                     {link.icon && (
// //                       <span style={{ color: '#7cc6ee' }}>{link.icon}</span>
// //                     )}
// //                     <span className="text-sm">{link.label}</span>
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>

// //             <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
// //             <ul className="space-y-3">
// //               {resourceLinks.map((link) => (
// //                 <li key={link.label}>
// //                   <Link href={link.href} className={linkStyle}>
// //                     <span className="text-sm">{link.label}</span>
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>

// //         {/* Legal Links Section */}
// //         <div className="mt-12 pt-8 border-t border-white/20">
// //           <div className="flex flex-wrap items-center justify-between gap-4">
// //             <div className="flex flex-wrap gap-6">
// //               {legalLinks.map((link, index) => (
// //                 <React.Fragment key={link.label}>
// //                   <Link 
// //                     href={link.href} 
// //                     className="text-sm text-white/80 hover:text-[#7cc6ee] transition-colors duration-300"
// //                   >
// //                     {link.label}
// //                   </Link>
// //                   {index < legalLinks.length - 1 && (
// //                     <span className="text-white/40">•</span>
// //                   )}
// //                 </React.Fragment>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Copyright Section */}
// //       <div className="bg-[#1a2142] py-6">
// //         <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
// //           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// //             <p className="text-sm text-white/80 text-center md:text-left">
// //               Copyright © {new Date().getFullYear()} —{" "}
// //               <Link
// //                 href="https://dreamlegal.in/"
// //                 className="font-semibold text-white hover:text-[#7cc6ee] transition-colors"
// //               >
// //                 dreamlegal.in
// //               </Link>
// //               . All rights reserved.
// //             </p>
// //             <p className="text-sm text-white/60 text-center md:text-right">
// //               Owned by KYLT Automation Services Private Limited
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Footer;
// import Link from "next/link";
// import React from "react";
// import {
//   FaLinkedinIn,
//   FaInstagram,
//   FaTwitter,
//   FaFacebookF,
// } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { 
//   Home, Briefcase, Scale, BookOpen, HelpCircle, Building,
//   FileText, Brain, FolderOpen, Gavel, Shield, SearchIcon, Eye
// } from 'lucide-react';

// export const Footer = () => {
//   // Social media links data
//   const socialLinks = [
//     {
//       href: "https://www.linkedin.com/company/dreamlegal",
//       icon: FaLinkedinIn,
//       label: "LinkedIn",
//     },
//     { 
//       href: "mailto:ranjan@dreamlegal.in", 
//       icon: MdEmail, 
//       label: "Email" 
//     },
//     {
//       href: "https://www.instagram.com/dreamlegal_/",
//       icon: FaInstagram,
//       label: "Instagram",
//     },
//     { 
//       href: "https://x.com/_DreamLegal_", 
//       icon: FaTwitter, 
//       label: "Twitter" 
//     },
//   ];

//   // Navigation sections
//   const navigationSections = [
//     {
//       title: "Platform",
//       links: [
//         { href: "/", label: "Home", icon: <Home size={14} /> },
//         { href: "/compare", label: "Compare", icon: <Scale size={14} /> },
//         { href: "/resources", label: "Resources", icon: <BookOpen size={14} /> },
//         { href: "/community", label: "Community", icon: null },
//       ],
//     },
//     {
//       title: "Legal Categories",
//       links: [
//         { href: "/category/contract-lifecycle-management", label: "Contract Management", icon: <FileText size={14} /> },
//         { href: "/category/legal-ai", label: "Legal AI", icon: <Brain size={14} /> },
//         { href: "/category/document-management-system", label: "Document Management", icon: <FolderOpen size={14} /> },
//         { href: "/category/litigation-management-and-analytics", label: "Litigation & Analytics", icon: <Gavel size={14} /> },
//       ],
//     },
//     {
//       title: "More Categories",
//       links: [
//         { href: "/category/intellectual-property-management", label: "IP Management", icon: <Shield size={14} /> },
//         { href: "/category/legal-research", label: "Legal Research", icon: <SearchIcon size={14} /> },
//         { href: "/category/e-discovery", label: "E-Discovery", icon: <Eye size={14} /> },
//         { href: "/ask-question", label: "Ask a Question", icon: <HelpCircle size={14} /> },
//       ],
//     },
//   ];

//   // Company and legal links
//   const companyLinks = [
//     { href: "/about", label: "About Us" },
//     { href: "/contact", label: "Contact Us" },
//     { href: "/partners", label: "Partners" },
//     { href: "/legal_tech", label: "For Vendors", icon: <Building size={14} /> },
//   ];

//   const legalLinks = [
//     { href: "/privacy_policy", label: "Privacy Policy" },
//     { href: "/terms_of_use", label: "Terms of Use" },
//     { href: "/cookie_policy", label: "Cookie Policy" },
//     { href: "/community_guidelines", label: "Community Guidelines" },
//     { href: "/refund_policy", label: "Refund Policy" },
//   ];

//   const resourceLinks = [
//     { href: "/legal_blogs", label: "Legal Blogs" },
//     { href: "/learning_hub", label: "Learning Hub" },
//     { href: "/digital_readiness_test", label: "Digital Readiness Test" },
//     { href: "/solutions", label: "Legal Tech Advisory" },
//   ];

//   // Common link style
//   const linkStyle = `text-white hover:text-[#7cc6ee] transition-colors duration-300 flex items-center gap-2`;

//   return (
//     <div className="relative bg-[#1e2556] text-white overflow-hidden">
//       {/* Main Footer Content */}
//       <div className="px-4 pt-16 pb-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//         <div className="grid gap-8 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
          
//           {/* Brand Column */}
//           <div className="lg:col-span-2 md:col-span-3 sm:col-span-2">
//             <Link href="/" className="inline-flex items-center mb-6">
//               <img 
//                 src="/logos/DreamLegal_logo_allblue.png" 
//                 alt="DreamLegal Logo" 
//                 className="h-8 brightness-0 invert" 
//               />
//             </Link>
//             <p className="text-white mb-6 leading-relaxed" style={{ color: '#e2e8f0' }}>
//               We are the trusted strategic partner for law firms and legal departments, 
//               driving innovation, accelerating technology adoption, and integrating AI to 
//               enhance efficiency and transform legal operations.
//             </p>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 mb-6">
//               <Link
//                 href="/auth/user/register"
//                 className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#7cc6ee] rounded-lg hover:bg-[#5eb3df] transition-all duration-300 hover:scale-105 hover:shadow-lg"
//               >
//                 Get Started
//               </Link>
//               <Link
//                 href="/ask-question"
//                 className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#1e2556] transition-all duration-300 hover:scale-105"
//               >
//                 <HelpCircle size={16} className="mr-2" />
//                 Ask a Question
//               </Link>
//             </div>

//             {/* Social Links */}
//             <div className="flex items-center space-x-4">
//               <span className="text-sm font-medium" style={{ color: '#e2e8f0' }}>Follow us:</span>
//               {socialLinks.map((social) => (
//                 <Link
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   aria-label={social.label}
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7cc6ee] transition-all duration-300 hover:scale-110"
//                 >
//                   <social.icon size={18} />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Sections */}
//           {navigationSections.map((section, index) => (
//             <div key={section.title}>
//               <h3 className="text-lg font-bold text-white mb-4" style={{ color: '#ffffff' }}>
//                 {section.title}
//               </h3>
//               <ul className="space-y-3">
//                 {section.links.map((link) => (
//                   <li key={link.label}>
//                     <Link href={link.href} className={linkStyle}>
//                       {link.icon && (
//                         <span style={{ color: '#7cc6ee' }}>{link.icon}</span>
//                       )}
//                       <span className="text-sm">{link.label}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Company & Resources Column */}
//           <div>
//             <h3 className="text-lg font-bold text-white mb-4">Company</h3>
//             <ul className="space-y-3 mb-6">
//               {companyLinks.map((link) => (
//                 <li key={link.label}>
//                   <Link href={link.href} className={linkStyle}>
//                     {link.icon && (
//                       <span style={{ color: '#7cc6ee' }}>{link.icon}</span>
//                     )}
//                     <span className="text-sm">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
//             <ul className="space-y-3">
//               {resourceLinks.map((link) => (
//                 <li key={link.label}>
//                   <Link href={link.href} className={linkStyle}>
//                     <span className="text-sm">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Legal Links Section */}
//         <div className="mt-12 pt-8 border-t border-white/20">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex flex-wrap gap-6">
//               {legalLinks.map((link, index) => (
//                 <React.Fragment key={link.label}>
//                   <Link 
//                     href={link.href} 
//                     className="text-sm text-white/80 hover:text-[#7cc6ee] transition-colors duration-300"
//                   >
//                     {link.label}
//                   </Link>
//                   {index < legalLinks.length - 1 && (
//                     <span className="text-white/40">•</span>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="bg-[#1a2142] py-6">
//         <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-white/80 text-center md:text-left">
//               Copyright © {new Date().getFullYear()} —{" "}
//               <Link
//                 href="https://dreamlegal.in/"
//                 className="font-semibold text-white hover:text-[#7cc6ee] transition-colors"
//               >
//                 dreamlegal.in
//               </Link>
//               . All rights reserved.
//             </p>
//             <p className="text-sm text-white/60 text-center md:text-right">
//               Owned by KYLT Automation Services Private Limited
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import Link from "next/link";
import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { 
  HelpCircle, Building, FileText, Brain, FolderOpen, 
  Gavel, Shield, SearchIcon, Eye
} from 'lucide-react';

export const Footer = () => {
  // Social media links data
  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/dreamlegal",
      icon: FaLinkedinIn,
      label: "LinkedIn",
    },
    { 
      href: "mailto:ranjan@dreamlegal.in", 
      icon: MdEmail, 
      label: "Email" 
    },
    {
      href: "https://www.instagram.com/dreamlegal_/",
      icon: FaInstagram,
      label: "Instagram",
    },
    { 
      href: "https://x.com/_DreamLegal_", 
      icon: FaTwitter, 
      label: "Twitter" 
    },
  ];

  // Popular categories for left column (in 2 columns as requested)
  const popularCategories = [
    { href: "/category/contract-lifecycle-management", label: "Contract Lifecycle Management", icon: <FileText size={14} /> },
    { href: "/category/legal-ai", label: "Legal AI", icon: <Brain size={14} /> },
    { href: "/category/document-management-system", label: "Document Management System", icon: <FolderOpen size={14} /> },
    { href: "/category/litigation-management-and-analytics", label: "Litigation Management & Analytics", icon: <Gavel size={14} /> },
    { href: "/category/intellectual-property-management", label: "IP Management", icon: <Shield size={14} /> },
    { href: "/category/legal-research", label: "Legal Research", icon: <SearchIcon size={14} /> },
    { href: "/category/e-discovery", label: "E-Discovery", icon: <Eye size={14} /> },
  ];

  // For Vendors links
  const vendorLinks = [
    // { href: "/legal_tech", label: "For Technology Companies", icon: <Building size={14} /> },
    { href: "/legal-tech", label: "Premium Profile" },
    { href: "/legal-tech", label: "Marketing Strategy" },
    { href: "/legal-tech", label: "Market Research" },
  ];

  // Legal links
  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-use", label: "Terms of Use" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/community-guidelines", label: "Community Guidelines" },
    { href: "/refund-policy", label: "Refund Policy" },
  ];

  // Common link style
  const linkStyle = `text-white hover:text-[#7cc6ee] transition-colors duration-300 flex items-center gap-2`;

  return (
    <div className="relative bg-[#1e2556] text-white overflow-hidden">
      {/* Top Section - 3 Columns */}
      <div className="px-4 pt-16 pb-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-1">
          
          {/* Left Column - Popular Categories (in 2 columns) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Popular Categories</h3>
            <div className="grid grid-cols-1 gap-3">
              {popularCategories.map((category) => (
                <Link 
                  key={category.label} 
                  href={category.href} 
                  className={`${linkStyle} text-sm`}
                >
                  <span style={{ color: '#7cc6ee' }}>{category.icon}</span>
                  <span>{category.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Column - For Vendors */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">For Vendors</h3>
            <div className="space-y-3">
              {vendorLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className={`${linkStyle} text-sm`}
                >
                  {link.icon && (
                    <span style={{ color: '#7cc6ee' }}>{link.icon}</span>
                  )}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Legal */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className={`${linkStyle} text-sm`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - 3 Columns */}
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 border-t border-white/20">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-1">
          
          {/* Left - DreamLegal Logo & Description */}
          <div>
            <Link href="/" className="inline-flex items-center mb-4">
              <img 
                src="/logos/DreamLegal_logo_allblue.png" 
                alt="DreamLegal Logo" 
                className="h-8 brightness-0 invert" 
              />
            </Link>
            <p className="text-white leading-relaxed text-sm" style={{ color: '#e2e8f0' }}>
              We simplify technology decisions with trusted product data and industry insights for legal teams.
            </p>
          </div>

          {/* Middle - Let's Get Social */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Let's Get Social</h3>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7cc6ee] transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Get Started (2 buttons) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Get Started</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="https://dreamlegal.in/directory/products"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#7cc6ee] rounded-lg hover:bg-[#5eb3df] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Explore Marketplace
              </Link>
              <Link
                href="/ask-question"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#1e2556] transition-all duration-300 hover:scale-105"
              >
                <HelpCircle size={16} className="mr-2" />
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="bg-[#1a2142] py-6">
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-white/80">
              <Link href="/about" className="hover:text-[#7cc6ee] transition-colors">
                About us
              </Link>
              <span>|</span>
              <Link href="/contact" className="hover:text-[#7cc6ee] transition-colors">
                Contact us
              </Link>
              <span>|</span>
              <Link href="/resources" className="hover:text-[#7cc6ee] transition-colors">
                Resources
              </Link>
            </div>
            <p className="text-sm text-white/80 text-center md:text-right">
              © {new Date().getFullYear()} DreamLegal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
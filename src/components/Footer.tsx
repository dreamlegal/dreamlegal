import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // Added for email icon

export const Footer = () => {
  // Social media links data
  const socialLinks = [
    { href: "https://www.linkedin.com/company/dreamlegal", icon: FaLinkedinIn, label: "LinkedIn" },
    { href: "mailto:ranjan@dreamlegal.in ", icon: MdEmail, label: "Email" },
    { href: "https://www.instagram.com/dreamlegal_/", icon: FaInstagram, label: "Instagram" },
    { href: "https://x.com/_DreamLegal_", icon: FaTwitter, label: "Twitter" },
  ];

  // First column links
  const firstColumnLinks = [
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/partners", label: "Partners" },
    { href: "/tech_vendor", label: "For technology companies" },
  ];

  // Second column sections
  const secondColumnSections = [
    {
      title: "For Legal Teams",
      links: [
        { href: "/directory", label: "Technology discovery platform" },
        { href: "/community", label: "Legal technology community" },
        { href: "/solutions", label: "Legal technology advisory" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "https://blog.dreamlegal.in/", label: "Learning hub" },
        { href: "/resources", label: "Insights and leadership" },
        { href: "/digital_readiness_test", label: "Digital readiness evaluation" },
      ],
    },
  ];

  // Third column links
  const thirdColumnLinks = [
    { href: "/community_guidelines", label: "Community guidelines" },
    { href: "/privacy_policy", label: "Privacy policy" },
    { href: "/cookie_policy", label: "Cookie policy" },
    { href: "/terms_of_use", label: "Terms of use" },
  ];

  // Action buttons
  const actionButtons = [
    { 
      href: "/auth/user/signup", 
      label: "Sign Up",
      className: "px-6 py-2 text-center rounded-full bg-[#7cc6ee] text-white hover:bg-[#5eb3df] transition-all duration-300 hover:scale-105"

       },
    { 
      href: "/contact", 
      label: "Contact Us",
      className: "px-6 py-2 text-center rounded-full bg-[#1e2556] text-white border border-white hover:bg-[#283070] transition-all duration-300 hover:scale-105"
  
        },
  ];

  // Common link style
  const linkStyle = "text-white hover:text-[#7cc6ee] transition-colors duration-300";

  return (
    <div className="relative bg-[#1e2556] text-white overflow-hidden">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-6 mb-8 lg:grid-cols-4 md:grid-cols-2">
          {/* First Column */}
          <div className="md:max-w-md">
            <Link href="/" className="inline-flex items-center mb-6">
              <span className="text-xl font-bold tracking-wider text-white">
                DreamLegal
              </span>
            </Link>
            <ul className="mt-4 space-y-3">
              {firstColumnLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  className={linkStyle}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Second Column - Split in two sections */}
          <div className="md:max-w-md">
            {secondColumnSections.map((section, index) => (
              <div key={section.title} className={index === 0 ? "mb-6" : ""}>
                <h3 className="text-lg font-bold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className={linkStyle}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Third Column */}
          <div className="md:max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {thirdColumnLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fourth Column */}
          <div className="md:max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">
              DreamLegal
            </h3>
            <p className="text-white mb-6">
           
We are the trusted strategic partner for law firms and legal departments, driving innovation, accelerating technology adoption, and integrating AI to enhance efficiency and transform legal operations.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {actionButtons.map((button) => (
                <Link
                  key={button.label}
                  href={button.href}
                  className={button.className}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center pt-5 pb-10 border-t border-[#334155]">
          <p className="text-center text-white">
            Copyright © {new Date().getFullYear()} —{" "}
            <Link 
              href="https://dreamlegal.in/" 
              className="font-semibold text-white hover:text-[#7cc6ee] transition-colors"
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
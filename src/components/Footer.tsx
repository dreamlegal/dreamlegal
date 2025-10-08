
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
import { FolderKanban, ShieldCheck, FileSearch } from 'lucide-react';
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
    { href: "/category/case-management", label: "Case Management Software", icon: <FolderKanban size={14} /> },
{ href: "/category/governance-risk-compliance", label: "Governance, Risk & Compliance (GRC)", icon: <ShieldCheck size={14} /> },
{ href: "/category/legal-due-diligence", label: "Legal Due Diligence Software", icon: <FileSearch size={14} /> },
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
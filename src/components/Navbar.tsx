
'use client'
// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/authContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isLoading, userType } = useAuth()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show a minimal loading state
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 w-full pt-6 px-4 z-[9999]">
        <div className={`
          relative max-w-6xl mx-auto h-16
          rounded-2xl
          bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        `} />
      </div>
    )
  }

  const navItems = [
    {
      title: 'Home',
      hasDropdown: false,
      href: '/'
    },
    {
      title: 'Legal Professionals',
      hasDropdown: false,
      href: '/legal_professionals'
    },
    {
      title: 'Tech Vendors',
      hasDropdown: false,
      href: '/tech_vendor'
    },
    {
      title: 'Blog',
      hasDropdown: false,
      href: 'https://blog.dreamlegal.in/'
    },
    {
      title: 'About us',
      hasDropdown: false,
      href: '/about'
    },
    {
      title: 'Contact us',
      hasDropdown: false,
      href: '/contact'
    },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  // const { userId,vendorId, userType } = useAuth();

  return (
    <>
      {/* Increased z-index to 9999 to ensure it stays on top */}
      <div className="fixed top-0 left-0 right-0 w-full pt-6 px-4 z-[9999]">
        <nav className={`
          relative max-w-6xl mx-auto 
          rounded-2xl
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
            : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          }
        `}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="block">
                  <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <div key={index} className="relative group px-3">
                    <a 
                      href={item.href}
                      className="flex items-center space-x-1 text-gray-600 hover:text-black py-2 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                      )}
                    </a>
                    
                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/70 backdrop-blur-lg border border-gray-100">
                          <div className="py-1">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <a
                                key={idx}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50/50 transition-colors duration-200"
                              >
                                {dropdownItem}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-3">
              <a href="/signup" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
                    Sign Up
                  </a>

                {userType === 'vendor' ? (
                  <a href="/tech_vendor/dashboard" className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
                    Dashboard
                  </a>
                ) : userType === 'user' ? (
                  <a href="/legal_professionals/dashboard" className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
                    Dashboard
                  </a>
                ) : null}
                {!userType && (
                 <a href="/login" className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
                 Log in
               </a>
                )}
               
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setActiveDropdown(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with adjusted z-index */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with lower z-index */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[9997] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content with proper z-index */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-24 left-4 right-4 z-[9998] md:hidden"
            >
              <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <a
                          href={item.href}
                          className="w-full flex items-center justify-between p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                        >
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.hasDropdown && (
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform duration-200 ${
                                activeDropdown === index ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                  <div className="space-y-2">
                    <a href="/signup" className="block w-full p-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      Sign Up
                    </a>
                    <a href="/login" className="block w-full p-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
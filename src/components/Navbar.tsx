
'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, ChevronDown, Bell, Search, User, Bookmark, LogOut, MessageCircle, 
  Home, Users, Briefcase, BookOpen, LineChart, Cpu, FileText, Building, Mail, Handshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/authContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isLoading, userType, userEmail, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Show a minimal loading state
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 w-full z-[9999]">
        <div className={`
          relative w-full h-16
          bg-white/70 backdrop-blur-lg shadow-[0_2px_10px_rgb(0,0,0,0.08)]
        `} />
      </div>
    );
  }

  const navItems = [
    {
      title: 'Home',
      icon: <Home size={16} />,
      hasDropdown: false,
      href: '/'
    },
    {
      title: 'For Legal teams',
      icon: <Briefcase size={16} />,
      hasDropdown: true,
      dropdownItems: [
        { 
          title: 'Technology discovery platform', 
          description: 'Technology discovery and evaluation for legal teams.',
          icon: <Cpu size={16} />,
          href: '/directory' 
        },
        { 
          title: 'Legal Technology community', 
          description: 'Digital hangout for legal tech enthusiasts.',
          icon: <Users size={16} />,
          href: '/community' 
        },
        { 
          title: 'Legal technology advisory', 
          description: 'Partner with us for technology strategy and implementation.',
          icon: <FileText size={16} />,
          href: '/solutions' 
        }
      ]
    },
    {
      title: 'For technology companies',
      icon: <Cpu size={16} />,
      hasDropdown: false,
      href: '/vendor'
    },
    {
      title: 'Resources',
      icon: <BookOpen size={16} />,
      hasDropdown: true,
      dropdownItems: [
        { 
          title: 'Learning hub', 
          description: 'Content hub for legal tech beginners.',
          icon: <BookOpen size={16} />,
          href: 'https://blog.dreamlegal.in' 
        },
        { 
          title: 'Insights and leadership', 
          description: 'Trends, strategies, and industry insights, market maps.',
          icon: <LineChart size={16} />,
          href: '/resources' 
        },
        { 
          title: 'Digital readiness evaluation', 
          description: 'Assess your efficiency and tech readiness in minutes.',
          icon: <FileText size={16} />,
          href: '/digital_readiness_test' 
        }
      ]
    },
    {
      title: 'Company',
      icon: <Building size={16} />,
      hasDropdown: true,
      dropdownItems: [
        { 
          title: 'About us', 
          description: 'Learn our mission and vision.',
          icon: <Building size={16} />,
          href: '/about' 
        },
        { 
          title: 'Contact us', 
          description: 'Reach out for queries and support.',
          icon: <Mail size={16} />,
          href: '/contact' 
        },
        { 
          title: 'Partners', 
          description: 'Collaborate and grow with us.',
          icon: <Handshake size={16} />,
          href: '/partners' 
        }
      ]
    }
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

  const userMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15
      }
    }
  };

  // Get initials from email
  const getInitials = () => {
    if (!userEmail) return 'U';
    const parts = userEmail.split('@');
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Always fixed navbar at top with subtle transition on scroll
  const navbarClasses = 'fixed top-0 left-0 right-0 w-full border-b border-gray-100';
  
  const innerNavbarClasses = 'w-full bg-white transition-all duration-300 ease-in-out';

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };


  return (
    <>
      {/* Fixed navbar with z-index */}
      <div className={`${navbarClasses} z-[9999] transition-all duration-300`}>
        <nav className={innerNavbarClasses}>
          <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="block">
                  <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-7" />
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.hasDropdown ? (
                      <button 
                        className="flex items-center space-x-1.5 text-gray-600 hover:text-black py-2 transition-colors duration-200"
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      >
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                    ) : (
                      <a 
                        href={item.href}
                        className="flex items-center space-x-1.5 text-gray-600 hover:text-black py-2 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                      </a>
                    )}
                    
                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-1 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 overflow-hidden">
                          <div className="py-2 px-2">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                                                              <a
                                  key={idx}
                                  href={dropdownItem.href}
                                  className="block rounded-md px-3 py-2.5 text-sm hover:bg-gray-50/80 transition-colors duration-200"
                                >
                                  <div className="flex items-center">
                                    {dropdownItem.icon && (
                                      <span className="text-indigo-500 mr-2">{dropdownItem.icon}</span>
                                    )}
                                    <div>
                                      <div className="font-medium text-[#1e2556]">{dropdownItem.title}</div>
                                      <div className="text-gray-500 text-xs mt-0.5 line-clamp-2">{dropdownItem.description}</div>
                                    </div>
                                  </div>
                                </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons and User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                {/* For logged in users */}
                {userType && (
                  <>
                    <div className="relative user-menu-container ml-2">
                      <button 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                          {getInitials()}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={userMenuVariants}
                            className="absolute right-0 mt-2 w-56 origin-top-right"
                          >
                            <div className="rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
                              <div className="p-3 border-b border-gray-100">
                                <div className="text-sm font-medium text-gray-800">{userEmail}</div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
                                </div>
                              </div>
                              <div className="py-1">
                                <a 
                                  href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'} 
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <User size={16} className="mr-3 text-gray-500" />
                                  Dashboard
                                </a>
                                <a 
                                  href="/community" 
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <MessageCircle size={16} className="mr-3 text-gray-500" />
                                  Community
                                </a>
                                {/* <a 
                                  href="/saved" 
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Bookmark size={16} className="mr-3 text-gray-500" />
                                  Saved Items
                                </a> */}
                              </div>
                              <div className="py-1 border-t border-gray-100">
                                <button 
                                  onClick={handleLogout}
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 transition-colors duration-150"
                                  >
                                  <LogOut size={16} className="mr-3" />
                                  Log out
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}

                {/* For logged out users */}
                {!userType && (
                  <a 
                    href={window.location.pathname === '/vendor' ? '/auth/vendor/login' : '/auth/user/login'}
                    className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-200"
                  >
                    Log in
                  </a>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setActiveDropdown(null);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[9997] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-16 left-4 right-4 z-[9998] md:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
            >
              <div className="bg-white shadow-lg rounded-xl border border-gray-100">
                <div className="p-4">                  
                  {/* User info for mobile */}
                  {userType && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium mr-3">
                          {getInitials()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{userEmail}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <a
                          href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'}
                          className="text-center text-xs font-medium text-gray-700 bg-white py-2 px-3 rounded-md border border-gray-200"
                        >
                          Dashboard
                        </a>
                        <button
                          onClick={handleLogout}
                          className="text-center text-xs font-medium text-red-600 bg-white py-2 px-3 rounded-md border border-gray-200"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <div key={index} className="space-y-1">
                        {item.hasDropdown ? (
                          <>
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                              className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                            >
                              <span className="text-sm font-medium">
                                {item.title}
                              </span>
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  activeDropdown === index ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {activeDropdown === index && (
                              <div className="mt-1 ml-6 space-y-1">
                                {item.dropdownItems?.map((dropdownItem, idx) => (
                                    <a
                                      key={idx}
                                      href={dropdownItem.href}
                                      className="block p-2.5 text-sm rounded-lg hover:bg-gray-50/80 transition-colors"
                                    >
                                      <div className="flex items-start">
                                        {dropdownItem.icon && (
                                          <span className="text-indigo-500 mr-2 mt-0.5">{dropdownItem.icon}</span>
                                        )}
                                        <div>
                                          <div className="font-medium text-[#1e2556]">{dropdownItem.title}</div>
                                          <div className="text-gray-500 text-xs mt-0.5">{dropdownItem.description}</div>
                                        </div>
                                      </div>
                                    </a>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <a
                            href={item.href}
                            className="w-full flex items-center p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                          >
                            <span className="text-sm font-medium">{item.title}</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                  {/* For logged out users in mobile menu */}
                  {!userType && (
                    <a 
                      href={window.location.pathname === '/vendor' ? '/auth/vendor/login' : '/auth/user/login'}
                      className="block w-full p-2.5 text-sm font-medium text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      Log in
                    </a>
                  )}
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
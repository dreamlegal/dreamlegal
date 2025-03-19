// // original 
// 'use client'
// // export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '@/context/authContext';
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const { isLoading, userType } = useAuth()
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Show a minimal loading state
//   if (isLoading) {
//     return (
//       <div className="fixed top-0 left-0 right-0 w-full pt-6 px-4 z-[9999]">
//         <div className={`
//           relative max-w-6xl mx-auto h-16
//           rounded-2xl
//           bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]
//         `} />
//       </div>
//     )
//   }


//   const navItems = [
//     {
//       title: 'Home',
//       hasDropdown: false,
//       href: '/'
//     },
//     {
//       title: 'Solutions',
//       hasDropdown: false,
//       href: '/solutions'
//     },
   
//     {
//       title: 'Directory',
//       hasDropdown: false,
//       href: '/directory'
//     },
//     {
//       title: 'Tech Vendor',
//       hasDropdown: false,
//       href: '/tech_vendor'
//     },
//     {
//       title: 'Partners',
//       hasDropdown: false,
//       href: '/partners'
//     },
//     {
//       title: 'Blog',
//       hasDropdown: false,
//       href: 'https://blog.dreamlegal.in/'
//     },
//     {
//       title: 'About us',
//       hasDropdown: false,
//       href: '/about'
//     },
//     // {
//     //   title: 'Contact us',
//     //   hasDropdown: false,
//     //   href: '/contact'
//     // },
//   ];

//   const mobileMenuVariants = {
//     closed: {
//       opacity: 0,
//       y: -20,
//       transition: {
//         duration: 0.2
//       }
//     },
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.2
//       }
//     }
//   };
//   // const { userId,vendorId, userType } = useAuth();

//   return (
//     <>
//       {/* Increased z-index to 9999 to ensure it stays on top */}
//       <div className="fixed top-0 left-0 right-0 w-full pt-6 px-4 z-[9999]">
//         <nav className={`
//           relative max-w-6xl mx-auto 
//           rounded-2xl
//           transition-all duration-300 ease-in-out
//           ${scrolled 
//             ? 'bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//             : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
//           }
//         `}>
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <a href="/" className="block">
//                   <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
//                 </a>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-1">
//                 {navItems.map((item, index) => (
//                   <div key={index} className="relative group px-3">
//                     <a 
//                       href={item.href}
//                       className="flex items-center space-x-1 text-gray-600 hover:text-black py-2 transition-colors duration-200"
//                     >
//                       <span className="text-sm font-medium">{item.title}</span>
//                       {item.hasDropdown && (
//                         <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
//                       )}
//                     </a>
                    
//                     {item.hasDropdown && (
//                       <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
//                         <div className="rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/70 backdrop-blur-lg border border-gray-100">
//                           <div className="py-1">
//                             {item.dropdownItems?.map((dropdownItem, idx) => (
//                               <a
//                                 key={idx}
//                                 href="#"
//                                 className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50/50 transition-colors duration-200"
//                               >
//                                 {dropdownItem}
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* CTA Buttons */}
//               <div className="hidden md:flex items-center space-x-3">
//               <a href="/contact" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
//                   Contact Us
//                   </a>

//                 {/* {userType === 'vendor' ? (
//                   <a href="/tech_vendor/dashboard" className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
//                     Dashboard
//                   </a>
//                 ) : userType === 'user' ? (
//                   <a href="/legal_professionals/dashboard" className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
//                     Dashboard
//                   </a>
//                 ) : null}
//                 {!userType && (
//                  <a href="/login" className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
//                  Log in
//                </a>
//                 )} */}
//                 {/* For logged in users */}
// {userType && (
//   <>
//     {userType === 'vendor' && (
//       <a 
//         href="/tech_vendor/dashboard" 
//         className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
//       >
//         Dashboard
//       </a>
//     )}
//     {userType === 'user' && (
//       <a 
//         href="/legal_professionals/dashboard" 
//         className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
//       >
//         Dashboard
//       </a>
//     )}
//   </>
// )}

// {/* For logged out users */}
// {!userType && (
//   <a 
//     href={window.location.pathname === '/tech_vendor' ? '/auth/vendor/login' : '/auth/user/login'}
//     className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
//   >
//     Log in
//   </a>
// )}
               
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden">
//                 <button
//                   onClick={() => {
//                     setIsOpen(!isOpen);
//                     setActiveDropdown(null);
//                   }}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   {isOpen ? <X size={20} /> : <Menu size={20} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu with adjusted z-index */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop with lower z-index */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[9997] md:hidden"
//               onClick={() => setIsOpen(false)}
//             />
            
//             {/* Menu Content with proper z-index */}
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={mobileMenuVariants}
//               className="fixed top-24 left-4 right-4 z-[9998] md:hidden"
//             >
//               <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden">
//                 <div className="p-4">
//                   <div className="space-y-1">
//                     {navItems.map((item, index) => (
//                       <div key={index} className="space-y-2">
//                         <a
//                           href={item.href}
//                           className="w-full flex items-center justify-between p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
//                         >
//                           <span className="text-sm font-medium">{item.title}</span>
//                           {item.hasDropdown && (
//                             <ChevronDown 
//                               className={`w-4 h-4 transition-transform duration-200 ${
//                                 activeDropdown === index ? 'rotate-180' : ''
//                               }`}
//                             />
//                           )}
//                         </a>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

//                   <div className="space-y-2">
//                     <a href="/contact" className="block w-full p-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
//                      Contact Us
//                     </a>
//                     {userType && (
//   <>
//     {userType === 'vendor' && (
//       <a 
//         href="/tech_vendor/dashboard" 
//         className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
//       >
//         Dashboard
//       </a>
//     )}
//     {userType === 'user' && (
//       <a 
//         href="/legal_professionals/dashboard" 
//         className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
//       >
//         Dashboard
//       </a>
//     )}
//   </>
// )}

// {/* For logged out users */}
// {!userType && (
//   <a 
//     href={window.location.pathname === '/tech_vendor' ? '/auth/vendor/login' : '/auth/user/login'}
//     className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
//   >
//     Log in
//   </a>
// )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;

'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Bell, Search, User, Bookmark, LogOut, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/authContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isLoading, userType, userEmail ,logout } = useAuth();
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
      hasDropdown: false,
      href: '/home'
    },
    {
      title: 'For Legal teams',
      hasDropdown: true,
      dropdownItems: [
        { title: 'Technology discovery platform', href: '/directory' },
        { title: 'Legal Technology community', href: '/community' },
        { title: 'Legal technology advisory', href: '/solutions' }
      ]
    },
    {
      title: 'For technology companies',
      hasDropdown: false,
      href: '/vendor'
    },
    {
      title: 'Resources',
      hasDropdown: true,
      dropdownItems: [
        { title: 'Learning hub', href: 'https://blog.dreamlegal.in' },
        { title: 'Insights and leadership', href: '/resources' },
        { title: 'Digital readiness evaluation', href: '/digital_readiness_test' }
      ]
    },
    {
      title: 'Company',
      hasDropdown: true,
      dropdownItems: [
        { title: 'About us', href: '/about' },
        { title: 'Contact us', href: '/contact' }
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
                        className="flex items-center space-x-1 text-gray-600 hover:text-black py-2 transition-colors duration-200"
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                        <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                    ) : (
                      <a 
                        href={item.href}
                        className="flex items-center text-gray-600 hover:text-black py-2 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                      </a>
                    )}
                    
                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100">
                          <div className="py-1">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <a
                                key={idx}
                                href={dropdownItem.href}
                                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-200"
                              >
                                {dropdownItem.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Search removed */}

              {/* CTA Buttons and User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                {/* For logged in users */}
                {userType && (
                  <>
                    {/* Notification icon */}
                    {/* <button className="p-1.5 text-gray-600 hover:text-blue-600 rounded-full transition-colors">
                      <Bell size={20} />
                    </button>
                     */}
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
                                <a 
                                  href="/saved" 
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Bookmark size={16} className="mr-3 text-gray-500" />
                                  Saved Items
                                </a>
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
                {/* {userType && (
                  <button className="p-1.5 mr-2 text-gray-600 hover:text-blue-600 rounded-full transition-colors">
                    <Bell size={20} />
                  </button>
                )} */}
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
                  {/* Search in mobile menu removed */}
                  
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
                              <span className="text-sm font-medium">{item.title}</span>
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  activeDropdown === index ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {activeDropdown === index && (
                              <div className="mt-1 ml-4 pl-2 border-l-2 border-gray-200 space-y-1">
                                {item.dropdownItems?.map((dropdownItem, idx) => (
                                  <a
                                    key={idx}
                                    href={dropdownItem.href}
                                    className="block p-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50/80 transition-colors"
                                  >
                                    {dropdownItem.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <a
                            href={item.href}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
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
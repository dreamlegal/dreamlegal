
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   Send,Share,Plus, Menu, X, ChevronDown, Bell, Search, User, Bookmark, LogOut, MessageCircle, 
//   Home, Users, Briefcase, BookOpen, LineChart, Cpu, FileText, Building, Mail, Handshake
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '@/context/authContext';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const { isLoading, userType, userEmail, logout } = useAuth();
//   const router = useRouter();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     // Close user menu when clicking outside
//     const handleClickOutside = (event) => {
//       if (showUserMenu && !event.target.closest('.user-menu-container')) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showUserMenu]);

//   // Show a minimal loading state
//   if (isLoading) {
//     return (
//       <div className="fixed top-0 left-0 right-0 w-full z-[9999]">
//         <div className={`
//           relative w-full h-16
//           bg-white/70 backdrop-blur-lg shadow-[0_2px_10px_rgb(0,0,0,0.08)]
//         `} />
//       </div>
//     );
//   }

//   const navItems = [
//     {
//       title: 'Home',
//       icon: <Home size={16} />,
//       hasDropdown: false,
//       href: '/'
//     },
//     {
//       title: 'For Legal teams',
//       icon: <Briefcase size={16} />,
//       hasDropdown: true,
//       dropdownItems: [
//         { 
//           title: 'Explore MarketPlace', 
//           description: 'Technology discovery and evaluation for legal teams.',
//           icon: <Send size={16} />,
//           href: '/directory' 
//         },
//         { 
//           title: 'Share Requirements', 
//           description: 'Submit an RFP to connect with legal tech providers.',
//           icon: <Plus size={16} />,
//           href: '/create_rfps' 
//         }, 
//         { 
//           title: 'Explore Resources', 
//           description: 'Discover curated resources for your legal teams.',
//           icon: <FileText size={16} />,
//           href: '/resources' 
//         }
//       ]
//     },
//     {
//       title: 'For technology companies',
//       icon: <Cpu size={16} />,
//       hasDropdown: false,
//       href: '/legal_tech'
//     },
//     {
//       title: 'Resources',
//       icon: <BookOpen size={16} />,
//       hasDropdown: false,
//       href: '/resources'
//       // dropdownItems: [
//       //   { 
//       //     title: 'Learning hub', 
//       //     description: 'Content hub for legal tech beginners.',
//       //     icon: <BookOpen size={16} />,
//       //     href: '/learning_hub' 
//       //   },
//       //   { 
//       //     title: 'Insights and leadership', 
//       //     description: 'Trends, strategies, and industry insights, market maps.',
//       //     icon: <LineChart size={16} />,
//       //     href: '/resources' 
//       //   },
//       //   { 
//       //     title: 'Digital readiness evaluation', 
//       //     description: 'Assess your efficiency and tech readiness in minutes.',
//       //     icon: <FileText size={16} />,
//       //     href: '/digital_readiness_test' 
//       //   }
//       // ]
//     },
//     {
//       title: 'Company',
//       icon: <Building size={16} />,
//       hasDropdown: true,
//       dropdownItems: [
//         { 
//           title: 'About us', 
//           description: 'Learn our mission and vision.',
//           icon: <Building size={16} />,
//           href: '/about' 
//         },
//         { 
//           title: 'Contact us', 
//           description: 'Reach out for queries and support.',
//           icon: <Mail size={16} />,
//           href: '/contact' 
//         },
//         { 
//           title: 'Partners', 
//           description: 'Collaborate and grow with us.',
//           icon: <Handshake size={16} />,
//           href: '/partners' 
//         }
//       ]
//     }
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

//   const userMenuVariants = {
//     closed: {
//       opacity: 0,
//       scale: 0.95,
//       y: -10,
//       transition: {
//         duration: 0.15
//       }
//     },
//     open: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.15
//       }
//     }
//   };

//   // Get initials from email
//   const getInitials = () => {
//     if (!userEmail) return 'U';
//     const parts = userEmail.split('@');
//     return parts[0].substring(0, 2).toUpperCase();
//   };

//   // Always fixed navbar at top with subtle transition on scroll
//   const navbarClasses = 'fixed top-0 left-0 right-0 w-full border-b border-gray-100';
  
//   const innerNavbarClasses = 'w-full bg-white transition-all duration-300 ease-in-out';

//   const handleLogout = async () => {
//     await logout();
//     router.push('/');
//   };


//   return (
//     <>
//       {/* Fixed navbar with z-index */}
//       <div className={`${navbarClasses} z-[9998] transition-all duration-300`}>
//         <nav className={innerNavbarClasses}>
//           <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
//             <div className="flex items-center justify-between h-16">
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <a href="/" className="block">
//                   <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-7" />
//                 </a>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-6">
//                 {navItems.map((item, index) => (
//                   <div key={index} className="relative group">
//                     {item.hasDropdown ? (
//                       <button 
//                         className="flex items-center space-x-1.5 text-gray-600 hover:text-black py-2 transition-colors duration-200"
//                         onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
//                       >
//                         <span className="text-sm font-medium">
//                           {item.title}
//                         </span>
//                         <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
//                       </button>
//                     ) : (
//                       <a 
//                         href={item.href}
//                         className="flex items-center space-x-1.5 text-gray-600 hover:text-black py-2 transition-colors duration-200"
//                       >
//                         <span className="text-sm font-medium">{item.title}</span>
//                       </a>
//                     )}
                    
//                     {item.hasDropdown && (
//                       <div className="absolute left-0 mt-1 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
//                         <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 overflow-hidden">
//                           <div className="py-2 px-2">
//                             {item.dropdownItems?.map((dropdownItem, idx) => (
//                                                               <a
//                                   key={idx}
//                                   href={dropdownItem.href}
//                                   className="block rounded-md px-3 py-2.5 text-sm hover:bg-gray-50/80 transition-colors duration-200"
//                                 >
//                                   <div className="flex items-center">
//                                     {dropdownItem.icon && (
//                                       <span className="text-indigo-500 mr-2">{dropdownItem.icon}</span>
//                                     )}
//                                     <div>
//                                       <div className="font-medium text-[#1e2556]">{dropdownItem.title}</div>
//                                       <div className="text-gray-500 text-xs mt-0.5 line-clamp-2">{dropdownItem.description}</div>
//                                     </div>
//                                   </div>
//                                 </a>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* CTA Buttons and User Menu */}
//               <div className="hidden md:flex items-center space-x-3">
//                 {/* For logged in users */}
//                 {userType && (
//                   <>
//                     <div className="relative user-menu-container ml-2">
//                       <button 
//                         onClick={() => setShowUserMenu(!showUserMenu)}
//                         className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
//                           {getInitials()}
//                         </div>
//                       </button>
                      
//                       <AnimatePresence>
//                         {showUserMenu && (
//                           <motion.div
//                             initial="closed"
//                             animate="open"
//                             exit="closed"
//                             variants={userMenuVariants}
//                             className="absolute right-0 mt-2 w-56 origin-top-right"
//                           >
//                             <div className="rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
//                               <div className="p-3 border-b border-gray-100">
//                                 <div className="text-sm font-medium text-gray-800">{userEmail}</div>
//                                 <div className="text-xs text-gray-500 mt-0.5">
//                                   {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                                 </div>
//                               </div>
//                               <div className="py-1">
//                                 <a 
//                                   href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'} 
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                                 >
//                                   <User size={16} className="mr-3 text-gray-500" />
//                                   Dashboard
//                                 </a>
//                                 <a 
//                                   href="/community" 
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                                 >
//                                   <MessageCircle size={16} className="mr-3 text-gray-500" />
//                                   Community
//                                 </a>
//                                 {/* <a 
//                                   href="/saved" 
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                                 >
//                                   <Bookmark size={16} className="mr-3 text-gray-500" />
//                                   Saved Items
//                                 </a> */}
//                               </div>
//                               <div className="py-1 border-t border-gray-100">
//                                 <button 
//                                   onClick={handleLogout}
//                                   className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 transition-colors duration-150"
//                                   >
//                                   <LogOut size={16} className="mr-3" />
//                                   Log out
//                                 </button>
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </>
//                 )}

//                 {/* For logged out users */}
//                 {!userType && (
//                   <a 
//                     href={window.location.pathname === '/vendor' ? '/auth/vendor/login' : '/auth/user/login'}
//                     className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-200"
//                   >
//                     Log in
//                   </a>
//                 )}
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden flex items-center">
//                 <button
//                   onClick={() => {
//                     setIsOpen(!isOpen);
//                     setActiveDropdown(null);
//                   }}
//                   className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
//                 >
//                   {isOpen ? <X size={22} /> : <Menu size={22} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[9997] md:hidden"
//               onClick={() => setIsOpen(false)}
//             />
            
//             {/* Menu Content */}
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={mobileMenuVariants}
//               className="fixed top-16 left-4 right-4 z-[9998] md:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
//             >
//               <div className="bg-white shadow-lg rounded-xl border border-gray-100">
//                 <div className="p-4">                  
//                   {/* User info for mobile */}
//                   {userType && (
//                     <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium mr-3">
//                           {getInitials()}
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-800">{userEmail}</div>
//                           <div className="text-xs text-gray-500 mt-0.5">
//                             {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-3 grid grid-cols-2 gap-2">
//                         <a
//                           href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'}
//                           className="text-center text-xs font-medium text-gray-700 bg-white py-2 px-3 rounded-md border border-gray-200"
//                         >
//                           Dashboard
//                         </a>
//                         <button
//                           onClick={handleLogout}
//                           className="text-center text-xs font-medium text-red-600 bg-white py-2 px-3 rounded-md border border-gray-200"
//                         >
//                           Log out
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="space-y-1">
//                     {navItems.map((item, index) => (
//                       <div key={index} className="space-y-1">
//                         {item.hasDropdown ? (
//                           <>
//                             <button
//                               onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
//                               className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
//                             >
//                               <span className="text-sm font-medium">
//                                 {item.title}
//                               </span>
//                               <ChevronDown 
//                                 className={`w-4 h-4 transition-transform duration-200 ${
//                                   activeDropdown === index ? 'rotate-180' : ''
//                                 }`}
//                               />
//                             </button>
//                             {activeDropdown === index && (
//                               <div className="mt-1 ml-6 space-y-1">
//                                 {item.dropdownItems?.map((dropdownItem, idx) => (
//                                     <a
//                                       key={idx}
//                                       href={dropdownItem.href}
//                                       className="block p-2.5 text-sm rounded-lg hover:bg-gray-50/80 transition-colors"
//                                     >
//                                       <div className="flex items-start">
//                                         {dropdownItem.icon && (
//                                           <span className="text-indigo-500 mr-2 mt-0.5">{dropdownItem.icon}</span>
//                                         )}
//                                         <div>
//                                           <div className="font-medium text-[#1e2556]">{dropdownItem.title}</div>
//                                           <div className="text-gray-500 text-xs mt-0.5">{dropdownItem.description}</div>
//                                         </div>
//                                       </div>
//                                     </a>
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <a
//                             href={item.href}
//                             className="w-full flex items-center p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
//                           >
//                             <span className="text-sm font-medium">{item.title}</span>
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

//                   {/* For logged out users in mobile menu */}
//                   {!userType && (
//                     <a 
//                       href={window.location.pathname === '/vendor' ? '/auth/vendor/login' : '/auth/user/login'}
//                       className="block w-full p-2.5 text-sm font-medium text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all duration-200"
//                     >
//                       Log in
//                     </a>
//                   )}
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
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   Send, Share, Plus, Menu, X, ChevronDown, Bell, Search, User, Bookmark, LogOut, MessageCircle, 
//   Home, Users, Briefcase, BookOpen, LineChart, Cpu, FileText, Building, Mail, Handshake, HelpCircle,
//   Scale, Brain, FolderOpen, Gavel, Shield, SearchIcon, Eye
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '@/context/authContext';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const { isLoading, userType, userEmail, logout } = useAuth();
//   const router = useRouter();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     // Close user menu when clicking outside
//     const handleClickOutside = (event) => {
//       if (showUserMenu && !event.target.closest('.user-menu-container')) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showUserMenu]);

//   // Show a minimal loading state
//   if (isLoading) {
//     return (
//       <div className="fixed top-0 left-0 right-0 w-full z-[9999]">
//         <div className={`
//           relative w-full h-16
//           bg-white/70 backdrop-blur-lg shadow-[0_2px_10px_rgb(0,0,0,0.08)]
//         `} />
//       </div>
//     );
//   }

//   // Category mapping with icons and display names
//   const categories = [
//     {
//       slug: 'contract-lifecycle-management',
//       name: 'Contract Lifecycle Management',
//       icon: <FileText size={16} />,
//       description: 'End-to-end contract management solutions'
//     },
//     {
//       slug: 'legal-ai',
//       name: 'Legal AI',
//       icon: <Brain size={16} />,
//       description: 'AI-powered legal technology solutions'
//     },
//     {
//       slug: 'document-management-system',
//       name: 'Document Management System',
//       icon: <FolderOpen size={16} />,
//       description: 'Organize and manage legal documents efficiently'
//     },
//     {
//       slug: 'litigation-management-and-analytics',
//       name: 'Litigation Management & Analytics',
//       icon: <Gavel size={16} />,
//       description: 'Litigation tracking and analytics tools'
//     },
//     {
//       slug: 'intellectual-property-management',
//       name: 'IP Management',
//       icon: <Shield size={16} />,
//       description: 'Intellectual property management solutions'
//     },
//     {
//       slug: 'legal-research',
//       name: 'Legal Research',
//       icon: <SearchIcon size={16} />,
//       description: 'Advanced legal research and case law tools'
//     },
//     {
//       slug: 'e-discovery',
//       name: 'E-Discovery',
//       icon: <Eye size={16} />,
//       description: 'Electronic discovery and data analysis'
//     }
//   ];

//   const navItems = [
//     {
//       title: 'Home',
//       icon: <Home size={16} />,
//       hasDropdown: false,
//       href: '/'
//     },
//     {
//       title: 'Categories',
//       icon: <Briefcase size={16} />,
//       hasDropdown: true,
//       dropdownItems: categories.map(category => ({
//         title: category.name,
//         description: category.description,
//         icon: category.icon,
//         href: `/category/${category.slug}`
//       }))
//     },
//     {
//       title: 'Compare',
//       icon: <Scale size={16} />,
//       hasDropdown: false,
//       href: '/compare'
//     },
//     {
//       title: 'Resources',
//       icon: <Scale size={16} />,
//       hasDropdown: false,
//       href: '/resources'
//     },
//     {
//       title: 'For Vendors',
//       icon: <Scale size={16} />,
//       hasDropdown: false,
//       href: '/legal_tech'
//     },
//     {
//       title: 'Ask a Question',
//       icon: <HelpCircle size={16} />,
//       hasDropdown: false,
//       href: '/ask-question'
//     }
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

//   const userMenuVariants = {
//     closed: {
//       opacity: 0,
//       scale: 0.95,
//       y: -10,
//       transition: {
//         duration: 0.15
//       }
//     },
//     open: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.15
//       }
//     }
//   };

//   // Get initials from email
//   const getInitials = () => {
//     if (!userEmail) return 'U';
//     const parts = userEmail.split('@');
//     return parts[0].substring(0, 2).toUpperCase();
//   };

//   // Always fixed navbar at top with subtle transition on scroll
//   const navbarClasses = 'fixed top-0 left-0 right-0 w-full border-b border-gray-100';
  
//   const innerNavbarClasses = 'w-full bg-white transition-all duration-300 ease-in-out';

//   const handleLogout = async () => {
//     await logout();
//     router.push('/');
//   };

//   return (
//     <>
//       {/* Fixed navbar with z-index */}
//       <div className={`${navbarClasses} z-[9998] transition-all duration-300`}>
//         <nav className={innerNavbarClasses}>
//           <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
//             <div className="flex items-center justify-between h-16">
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <a href="/" className="block">
//                   <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-7" />
//                 </a>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-6">
//                 {navItems.map((item, index) => (
//                   <div key={index} className="relative group">
//                     {item.hasDropdown ? (
//                       <button 
//                         className="flex items-center space-x-1.5 text-gray-600 hover:text-black py-2 transition-colors duration-200"
//                         onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
//                       >
//                         <span className="text-sm font-medium">
//                           {item.title}
//                         </span>
//                         <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
//                       </button>
//                     ) : (
//                       <a 
//                         href={item.href}
//                         className="flex items-center space-x-1.5 text-gray-600 hover:text-black py-2 transition-colors duration-200"
//                       >
//                         <span className="text-sm font-medium">{item.title}</span>
//                       </a>
//                     )}
                    
//                     {item.hasDropdown && (
//                       <div className="absolute left-0 mt-1 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
//                         <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 overflow-hidden">
//                           <div className="py-2 px-2">
//                             {item.dropdownItems?.map((dropdownItem, idx) => (
//                               <a
//                                 key={idx}
//                                 href={dropdownItem.href}
//                                 className="block rounded-md px-3 py-2.5 text-sm hover:bg-gray-50/80 transition-colors duration-200"
//                               >
//                                 <div className="flex items-center">
//                                   {dropdownItem.icon && (
//                                     <span className="text-indigo-500 mr-3 flex-shrink-0">{dropdownItem.icon}</span>
//                                   )}
//                                   <div>
//                                     <div className="font-medium text-[#1e2556]">{dropdownItem.title}</div>
//                                     <div className="text-gray-500 text-xs mt-0.5 line-clamp-2">{dropdownItem.description}</div>
//                                   </div>
//                                 </div>
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Profile Icon and User Menu */}
//               <div className="hidden md:flex items-center space-x-3">
//                 <div className="relative user-menu-container ml-2">
//                   <button 
//                     onClick={() => setShowUserMenu(!showUserMenu)}
//                     className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     {userType ? (
//                       <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
//                         {getInitials()}
//                       </div>
//                     ) : (
//                       <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
//                         <User size={18} />
//                       </div>
//                     )}
//                   </button>
                  
//                   <AnimatePresence>
//                     {showUserMenu && (
//                       <motion.div
//                         initial="closed"
//                         animate="open"
//                         exit="closed"
//                         variants={userMenuVariants}
//                         className="absolute right-0 mt-2 w-56 origin-top-right"
//                       >
//                         <div className="rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
//                           {userType ? (
//                             <>
//                               <div className="p-3 border-b border-gray-100">
//                                 <div className="text-sm font-medium text-gray-800">{userEmail}</div>
//                                 <div className="text-xs text-gray-500 mt-0.5">
//                                   {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                                 </div>
//                               </div>
//                               <div className="py-1">
//                                 <a 
//                                   href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'} 
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                                 >
//                                   <User size={16} className="mr-3 text-gray-500" />
//                                   Dashboard
//                                 </a>
//                                 <a 
//                                   href="/community" 
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                                 >
//                                   <MessageCircle size={16} className="mr-3 text-gray-500" />
//                                   Community
//                                 </a>
//                               </div>
//                               <div className="py-1 border-t border-gray-100">
//                                 <button 
//                                   onClick={handleLogout}
//                                   className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 transition-colors duration-150"
//                                 >
//                                   <LogOut size={16} className="mr-3" />
//                                   Log out
//                                 </button>
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <div className="p-3 border-b border-gray-100">
//                                 <div className="text-sm font-medium text-gray-800">Welcome to DreamLegal</div>
//                                 <div className="text-xs text-gray-500 mt-0.5">Sign in to access your account</div>
//                               </div>
//                               <div className="py-1">
//                                 <a 
//                                   href="/auth/user/login"
//                                   className="flex items-center w-full px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors duration-150"
//                                 >
//                                   <User size={16} className="mr-3" />
//                                   Sign In
//                                 </a>
//                                 <a 
//                                   href="/auth/user/register"
//                                   className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
//                                 >
//                                   <Plus size={16} className="mr-3" />
//                                   Create Account
//                                 </a>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden flex items-center">
//                 <button
//                   onClick={() => {
//                     setIsOpen(!isOpen);
//                     setActiveDropdown(null);
//                   }}
//                   className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
//                 >
//                   {isOpen ? <X size={22} /> : <Menu size={22} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[9997] md:hidden"
//               onClick={() => setIsOpen(false)}
//             />
            
//             {/* Menu Content */}
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={mobileMenuVariants}
//               className="fixed top-16 left-4 right-4 z-[9998] md:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
//             >
//               <div className="bg-white shadow-lg rounded-xl border border-gray-100">
//                 <div className="p-4">                  
//                   {/* User info for mobile */}
//                   {userType ? (
//                     <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium mr-3">
//                           {getInitials()}
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-800">{userEmail}</div>
//                           <div className="text-xs text-gray-500 mt-0.5">
//                             {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-3 grid grid-cols-2 gap-2">
//                         <a
//                           href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'}
//                           className="text-center text-xs font-medium text-gray-700 bg-white py-2 px-3 rounded-md border border-gray-200"
//                         >
//                           Dashboard
//                         </a>
//                         <button
//                           onClick={handleLogout}
//                           className="text-center text-xs font-medium text-red-600 bg-white py-2 px-3 rounded-md border border-gray-200"
//                         >
//                           Log out
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center mb-3">
//                         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
//                           <User size={18} />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-800">Welcome to DreamLegal</div>
//                           <div className="text-xs text-gray-500 mt-0.5">Sign in to get started</div>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2">
//                         <a
//                           href="/auth/user/login"
//                           className="text-center text-xs font-medium text-indigo-600 bg-white py-2 px-3 rounded-md border border-indigo-200"
//                         >
//                           Sign In
//                         </a>
//                         <a
//                           href="/auth/user/register"
//                           className="text-center text-xs font-medium text-gray-700 bg-white py-2 px-3 rounded-md border border-gray-200"
//                         >
//                           Register
//                         </a>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="space-y-1">
//                     {navItems.map((item, index) => (
//                       <div key={index} className="space-y-1">
//                         {item.hasDropdown ? (
//                           <>
//                             <button
//                               onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
//                               className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
//                             >
//                               <span className="text-sm font-medium">
//                                 {item.title}
//                               </span>
//                               <ChevronDown 
//                                 className={`w-4 h-4 transition-transform duration-200 ${
//                                   activeDropdown === index ? 'rotate-180' : ''
//                                 }`}
//                               />
//                             </button>
//                             {activeDropdown === index && (
//                               <div className="mt-1 ml-6 space-y-1">
//                                 {item.dropdownItems?.map((dropdownItem, idx) => (
//                                   <a
//                                     key={idx}
//                                     href={dropdownItem.href}
//                                     className="block p-2.5 text-sm rounded-lg hover:bg-gray-50/80 transition-colors"
//                                   >
//                                     <div className="flex items-start">
//                                       {dropdownItem.icon && (
//                                         <span className="text-indigo-500 mr-2 mt-0.5 flex-shrink-0">{dropdownItem.icon}</span>
//                                       )}
//                                       <div>
//                                         <div className="font-medium text-[#1e2556]">{dropdownItem.title}</div>
//                                         <div className="text-gray-500 text-xs mt-0.5">{dropdownItem.description}</div>
//                                       </div>
//                                     </div>
//                                   </a>
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <a
//                             href={item.href}
//                             className="w-full flex items-center p-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
//                           >
//                             <span className="text-sm font-medium">{item.title}</span>
//                           </a>
//                         )}
//                       </div>
//                     ))}
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
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   Send, Share, Plus, Menu, X, ChevronDown, Bell, Search, User, Bookmark, LogOut, MessageCircle, 
//   Home, Users, Briefcase, BookOpen, LineChart, Cpu, FileText, Building, Mail, Handshake, HelpCircle,
//   Scale, Brain, FolderOpen, Gavel, Shield, SearchIcon, Eye
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '@/context/authContext';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const { isLoading, userType, userEmail, logout } = useAuth();
//   const router = useRouter();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     // Close user menu when clicking outside
//     const handleClickOutside = (event) => {
//       if (showUserMenu && !event.target.closest('.user-menu-container')) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showUserMenu]);

//   // Show a minimal loading state
//   if (isLoading) {
//     return (
//       <div className="fixed top-0 left-0 right-0 w-full z-[9999]">
//         <div className={`
//           relative w-full h-16
//           bg-white/70 backdrop-blur-lg shadow-[0_2px_10px_rgb(0,0,0,0.08)]
//         `} />
//       </div>
//     );
//   }

//   // Category mapping with icons and display names
//   const categories = [
//     {
//       slug: 'contract-lifecycle-management',
//       name: 'Contract Lifecycle Management',
//       icon: <FileText size={16} />,
//       description: 'End-to-end contract management solutions'
//     },
//     {
//       slug: 'legal-ai',
//       name: 'Legal AI',
//       icon: <Brain size={16} />,
//       description: 'AI-powered legal technology solutions'
//     },
//     {
//       slug: 'document-management-system',
//       name: 'Document Management System',
//       icon: <FolderOpen size={16} />,
//       description: 'Organize and manage legal documents efficiently'
//     },
//     {
//       slug: 'litigation-management-and-analytics',
//       name: 'Litigation Management & Analytics',
//       icon: <Gavel size={16} />,
//       description: 'Litigation tracking and analytics tools'
//     },
//     {
//       slug: 'intellectual-property-management',
//       name: 'IP Management',
//       icon: <Shield size={16} />,
//       description: 'Intellectual property management solutions'
//     },
//     {
//       slug: 'legal-research',
//       name: 'Legal Research',
//       icon: <SearchIcon size={16} />,
//       description: 'Advanced legal research and case law tools'
//     },
//     {
//       slug: 'e-discovery',
//       name: 'E-Discovery',
//       icon: <Eye size={16} />,
//       description: 'Electronic discovery and data analysis'
//     }
//   ];

//   const navItems = [
//     {
//       title: 'Home',
//       icon: <Home size={16} />,
//       hasDropdown: false,
//       href: '/'
//     },
//     {
//       title: 'Categories',
//       icon: <Briefcase size={16} />,
//       hasDropdown: true,
//       dropdownItems: categories.map(category => ({
//         title: category.name,
//         description: category.description,
//         icon: category.icon,
//         href: `/category/${category.slug}`
//       }))
//     },
//     {
//       title: 'Compare',
//       icon: <Scale size={16} />,
//       hasDropdown: false,
//       href: '/compare'
//     },
//     {
//       title: 'Resources',
//       icon: <Scale size={16} />,
//       hasDropdown: false,
//       href: '/resources'
//     },
//     {
//       title: 'For Vendors',
//       icon: <Scale size={16} />,
//       hasDropdown: false,
//       href: '/legal_tech'
//     }
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

//   const userMenuVariants = {
//     closed: {
//       opacity: 0,
//       scale: 0.95,
//       y: -10,
//       transition: {
//         duration: 0.15
//       }
//     },
//     open: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.15
//       }
//     }
//   };

//   // Get initials from email
//   const getInitials = () => {
//     if (!userEmail) return 'U';
//     const parts = userEmail.split('@');
//     return parts[0].substring(0, 2).toUpperCase();
//   };

//   // Always fixed navbar at top with subtle transition on scroll
//   const navbarClasses = 'fixed top-0 left-0 right-0 w-full border-b border-gray-100';
  
//   const innerNavbarClasses = 'w-full bg-white transition-all duration-300 ease-in-out';

//   const handleLogout = async () => {
//     await logout();
//     router.push('/');
//   };

//   return (
//     <>
//       {/* Fixed navbar with z-index */}
//       <div className={`${navbarClasses} z-[9998] transition-all duration-300`}>
//         <nav className={innerNavbarClasses}>
//           <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
//             <div className="flex items-center justify-between h-16">
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <a href="/" className="block">
//                   <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-7" />
//                 </a>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-6">
//                 {navItems.map((item, index) => (
//                   <div key={index} className="relative group">
//                     {item.hasDropdown ? (
//                       <button 
//                         className="flex items-center space-x-1.5 py-2 transition-colors duration-200"
//                         style={{ color: '#334155' }}
//                         onMouseEnter={() => setActiveDropdown(index)}
//                         onMouseLeave={() => setActiveDropdown(null)}
//                       >
//                         <span className="text-sm font-medium hover:text-[#1e2556] transition-colors">
//                           {item.title}
//                         </span>
//                         <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
//                       </button>
//                     ) : (
//                       <a 
//                         href={item.href}
//                         className="flex items-center space-x-1.5 py-2 transition-colors duration-200 hover:text-[#1e2556]"
//                         style={{ color: '#334155' }}
//                       >
//                         <span className="text-sm font-medium">{item.title}</span>
//                       </a>
//                     )}
                    
//                     {item.hasDropdown && (
//                       <div 
//                         className={`absolute left-0 mt-1 w-80 transition-all duration-200 transform ${
//                           activeDropdown === index 
//                             ? 'opacity-100 visible translate-y-0' 
//                             : 'opacity-0 invisible translate-y-2'
//                         }`}
//                         onMouseEnter={() => setActiveDropdown(index)}
//                         onMouseLeave={() => setActiveDropdown(null)}
//                       >
//                         <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 overflow-hidden">
//                           <div className="py-2 px-2">
//                             {item.dropdownItems?.map((dropdownItem, idx) => (
//                               <a
//                                 key={idx}
//                                 href={dropdownItem.href}
//                                 className="block rounded-md px-3 py-2.5 text-sm transition-colors duration-200"
//                                 style={{ backgroundColor: 'transparent' }}
//                                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                                 onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                               >
//                                 <div className="flex items-center">
//                                   {dropdownItem.icon && (
//                                     <span className="mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }}>
//                                       {dropdownItem.icon}
//                                     </span>
//                                   )}
//                                   <div>
//                                     <div className="font-medium" style={{ color: '#1e2556' }}>
//                                       {dropdownItem.title}
//                                     </div>
//                                     <div className="text-xs mt-0.5 line-clamp-2" style={{ color: '#334155' }}>
//                                       {dropdownItem.description}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
                
//                 {/* Ask a Question Button - Styled separately */}
//                 <div className="ml-4">
//                   <a 
//                     href="/ask-question"
//                     className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
//                     style={{ backgroundColor: '#1e2556' }}
//                     onMouseEnter={(e) => e.target.style.backgroundColor = '#2d3564'}
//                     onMouseLeave={(e) => e.target.style.backgroundColor = '#1e2556'}
//                   >
//                     <HelpCircle size={16} />
//                     <span>Ask a Question</span>
//                   </a>
//                 </div>
//               </div>

//               {/* Profile Icon and User Menu */}
//               <div className="hidden md:flex items-center space-x-3">
//                 <div className="relative user-menu-container ml-2">
//                   <button 
//                     onClick={() => setShowUserMenu(!showUserMenu)}
//                     className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     {userType ? (
//                       <div 
//                         className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium"
//                         style={{ backgroundColor: '#1e2556' }}
//                       >
//                         {getInitials()}
//                       </div>
//                     ) : (
//                       <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
//                         <User size={18} />
//                       </div>
//                     )}
//                   </button>
                  
//                   <AnimatePresence>
//                     {showUserMenu && (
//                       <motion.div
//                         initial="closed"
//                         animate="open"
//                         exit="closed"
//                         variants={userMenuVariants}
//                         className="absolute right-0 mt-2 w-56 origin-top-right"
//                       >
//                         <div className="rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
//                           {userType ? (
//                             <>
//                               <div className="p-3 border-b border-gray-100">
//                                 <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
//                                   {userEmail}
//                                 </div>
//                                 <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
//                                   {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                                 </div>
//                               </div>
//                               <div className="py-1">
//                                 <a 
//                                   href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'} 
//                                   className="flex items-center px-4 py-2 text-sm transition-colors"
//                                   style={{ color: '#2d2d2d' }}
//                                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                                 >
//                                   <User size={16} className="mr-3" style={{ color: '#334155' }} />
//                                   Dashboard
//                                 </a>
//                                 <a 
//                                   href="/community" 
//                                   className="flex items-center px-4 py-2 text-sm transition-colors"
//                                   style={{ color: '#2d2d2d' }}
//                                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                                 >
//                                   <MessageCircle size={16} className="mr-3" style={{ color: '#334155' }} />
//                                   Community
//                                 </a>
//                               </div>
//                               <div className="py-1 border-t border-gray-100">
//                                 <button 
//                                   onClick={handleLogout}
//                                   className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 transition-colors duration-150"
//                                 >
//                                   <LogOut size={16} className="mr-3" />
//                                   Log out
//                                 </button>
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <div className="p-3 border-b border-gray-100">
//                                 <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
//                                   Welcome to DreamLegal
//                                 </div>
//                                 <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
//                                   Sign in to access your account
//                                 </div>
//                               </div>
//                               <div className="py-1">
//                                 <a 
//                                   href="/auth/user/login"
//                                   className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-150"
//                                   style={{ color: '#7cc6ee' }}
//                                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
//                                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                                 >
//                                   <User size={16} className="mr-3" />
//                                   Sign In
//                                 </a>
//                                 <a 
//                                   href="/auth/user/register"
//                                   className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-150"
//                                   style={{ color: '#2d2d2d' }}
//                                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                                 >
//                                   <Plus size={16} className="mr-3" />
//                                   Create Account
//                                 </a>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden flex items-center">
//                 <button
//                   onClick={() => {
//                     setIsOpen(!isOpen);
//                     setActiveDropdown(null);
//                   }}
//                   className="p-2 rounded-lg transition-colors"
//                   style={{ color: '#334155' }}
//                 >
//                   {isOpen ? <X size={22} /> : <Menu size={22} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[9997] md:hidden"
//               onClick={() => setIsOpen(false)}
//             />
            
//             {/* Menu Content */}
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={mobileMenuVariants}
//               className="fixed top-16 left-4 right-4 z-[9998] md:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
//             >
//               <div className="bg-white shadow-lg rounded-xl border border-gray-100">
//                 <div className="p-4">                  
//                   {/* User info for mobile */}
//                   {userType ? (
//                     <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//                       <div className="flex items-center">
//                         <div 
//                           className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3"
//                           style={{ backgroundColor: '#1e2556' }}
//                         >
//                           {getInitials()}
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
//                             {userEmail}
//                           </div>
//                           <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
//                             {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-3 grid grid-cols-2 gap-2">
//                         <a
//                           href={userType === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard'}
//                           className="text-center text-xs font-medium bg-white py-2 px-3 rounded-md border border-gray-200"
//                           style={{ color: '#2d2d2d' }}
//                         >
//                           Dashboard
//                         </a>
//                         <button
//                           onClick={handleLogout}
//                           className="text-center text-xs font-medium text-red-600 bg-white py-2 px-3 rounded-md border border-gray-200"
//                         >
//                           Log out
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//                       <div className="flex items-center mb-3">
//                         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
//                           <User size={18} />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
//                             Welcome to DreamLegal
//                           </div>
//                           <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
//                             Sign in to get started
//                           </div>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2">
//                         <a
//                           href="/auth/user/login"
//                           className="text-center text-xs font-medium bg-white py-2 px-3 rounded-md border"
//                           style={{ color: '#7cc6ee', borderColor: '#7cc6ee' }}
//                         >
//                           Sign In
//                         </a>
//                         <a
//                           href="/auth/user/register"
//                           className="text-center text-xs font-medium bg-white py-2 px-3 rounded-md border border-gray-200"
//                           style={{ color: '#2d2d2d' }}
//                         >
//                           Register
//                         </a>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="space-y-1">
//                     {navItems.map((item, index) => (
//                       <div key={index} className="space-y-1">
//                         {item.hasDropdown ? (
//                           <>
//                             <button
//                               onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
//                               className="w-full flex items-center justify-between p-2.5 rounded-lg transition-all duration-200"
//                               style={{ color: '#2d2d2d' }}
//                               onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                             >
//                               <span className="text-sm font-medium">
//                                 {item.title}
//                               </span>
//                               <ChevronDown 
//                                 className={`w-4 h-4 transition-transform duration-200 ${
//                                   activeDropdown === index ? 'rotate-180' : ''
//                                 }`}
//                               />
//                             </button>
//                             {activeDropdown === index && (
//                               <div className="mt-1 ml-6 space-y-1">
//                                 {item.dropdownItems?.map((dropdownItem, idx) => (
//                                   <a
//                                     key={idx}
//                                     href={dropdownItem.href}
//                                     className="block p-2.5 text-sm rounded-lg transition-colors"
//                                     onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                                     onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                                   >
//                                     <div className="flex items-start">
//                                       {dropdownItem.icon && (
//                                         <span className="mr-2 mt-0.5 flex-shrink-0" style={{ color: '#7cc6ee' }}>
//                                           {dropdownItem.icon}
//                                         </span>
//                                       )}
//                                       <div>
//                                         <div className="font-medium" style={{ color: '#1e2556' }}>
//                                           {dropdownItem.title}
//                                         </div>
//                                         <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
//                                           {dropdownItem.description}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </a>
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <a
//                             href={item.href}
//                             className="w-full flex items-center p-2.5 rounded-lg transition-all duration-200"
//                             style={{ color: '#2d2d2d' }}
//                             onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
//                             onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                           >
//                             <span className="text-sm font-medium">{item.title}</span>
//                           </a>
//                         )}
//                       </div>
//                     ))}
                    
//                     {/* Ask a Question Button for Mobile */}
//                     <div className="pt-2">
//                       <a
//                         href="/ask-question"
//                         className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-sm font-medium text-white transition-all duration-200"
//                         style={{ backgroundColor: '#1e2556' }}
//                       >
//                         <HelpCircle size={16} />
//                         <span>Ask a Question</span>
//                       </a>
//                     </div>
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
import { 
  Send, Share, Plus, Menu, X, ChevronDown, Bell, Search, User, Bookmark, LogOut, MessageCircle, 
  Home, Users, Briefcase, BookOpen, LineChart, Cpu, FileText, Building, Mail, Handshake, HelpCircle,
  Scale, Brain, FolderOpen, Gavel, Shield, SearchIcon, Eye,
  Pencil
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

  // Category mapping with icons and display names
  const categories = [
    {
      slug: 'contract-lifecycle-management',
      name: 'Contract Lifecycle Management',
      icon: <FileText size={16} />,
      description: 'End-to-end contract management solutions'
    },
    {
      slug: 'legal-ai',
      name: 'Legal AI',
      icon: <Brain size={16} />,
      description: 'AI-powered legal technology solutions'
    },
    {
      slug: 'document-management-system',
      name: 'Document Management System',
      icon: <FolderOpen size={16} />,
      description: 'Organize and manage legal documents efficiently'
    },
    {
      slug: 'litigation-management-and-analytics',
      name: 'Litigation Management & Analytics',
      icon: <Gavel size={16} />,
      description: 'Litigation tracking and analytics tools'
    },
    {
      slug: 'intellectual-property-management',
      name: 'IP Management',
      icon: <Shield size={16} />,
      description: 'Intellectual property management solutions'
    },
    {
      slug: 'legal-research',
      name: 'Legal Research',
      icon: <SearchIcon size={16} />,
      description: 'Advanced legal research and case law tools'
    },
    {
      slug: 'e-discovery',
      name: 'E-Discovery',
      icon: <Eye size={16} />,
      description: 'Electronic discovery and data analysis'
    }
  ];

  // Updated navItems - removed "For Vendors" from main navigation
  const navItems = [
    {
      title: 'Home',
      icon: <Home size={16} />,
      hasDropdown: false,
      href: '/'
    },
    {
      title: 'Categories',
      icon: <Briefcase size={16} />,
      hasDropdown: true,
      dropdownItems: categories.map(category => ({
        title: category.name,
        description: category.description,
        icon: category.icon,
        href: `/category/${category.slug}`
      }))
    },
    {
      title: 'Compare',
      icon: <Scale size={16} />,
      hasDropdown: false,
      href: '/compare'
    },
    {
      title: 'Resources',
      icon: <BookOpen size={16} />,
      hasDropdown: false,
      href: '/resources'
    },
    {
      title: 'Prompts',
      icon: <Pencil size={16} />,
      hasDropdown: false,
      href: '/prompts'
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
      <div className={`${navbarClasses} z-[9998] transition-all duration-300`}>
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
                        className="flex items-center space-x-1.5 py-2 transition-colors duration-200"
                        style={{ color: '#334155' }}
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <span className="text-sm font-medium hover:text-[#1e2556] transition-colors">
                          {item.title}
                        </span>
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                    ) : (
                      <a 
                        href={item.href}
                        className="flex items-center space-x-1.5 py-2 transition-colors duration-200 hover:text-[#1e2556]"
                        style={{ color: '#334155' }}
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                      </a>
                    )}
                    
                    {item.hasDropdown && (
                      <div 
                        className={`absolute left-0 mt-1 w-80 transition-all duration-200 transform ${
                          activeDropdown === index 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible translate-y-2'
                        }`}
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 overflow-hidden">
                          <div className="py-2 px-2">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <a
                                key={idx}
                                href={dropdownItem.href}
                                className="block rounded-md px-3 py-2.5 text-sm transition-colors duration-200"
                                style={{ backgroundColor: 'transparent' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                <div className="flex items-center">
                                  {dropdownItem.icon && (
                                    <span className="mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }}>
                                      {dropdownItem.icon}
                                    </span>
                                  )}
                                  <div>
                                    <div className="font-medium" style={{ color: '#1e2556' }}>
                                      {dropdownItem.title}
                                    </div>
                                    <div className="text-xs mt-0.5 line-clamp-2" style={{ color: '#334155' }}>
                                      {dropdownItem.description}
                                    </div>
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

              {/* Right side items - Ask Question, For Vendors, Profile */}
              <div className="hidden md:flex items-center space-x-3">
                {/* Ask a Question Button */}
                <a 
                  href="/ask-question"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  style={{ backgroundColor: '#1e2556' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2d3564'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1e2556'}
                >
                  <HelpCircle size={16} />
                  <span>Ask a Question</span>
                </a>

                {/* For Vendors Button - Styled as outline button */}
                <a 
                  href="/legal-tech"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                  style={{ 
                    color: '#1e2556', 
                    borderColor: '#1e2556',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1e2556';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#1e2556';
                  }}
                >
                  <Building size={16} />
                  <span>For Vendors</span>
                </a>

                {/* Profile Icon and User Menu */}
                <div className="relative user-menu-container ml-2">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {userType ? (
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ backgroundColor: '#1e2556' }}
                      >
                        {getInitials()}
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        <User size={18} />
                      </div>
                    )}
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
                          {userType ? (
                            <>
                              <div className="p-3 border-b border-gray-100">
                                <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                                  {userEmail}
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
                                  {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
                                </div>
                              </div>
                              <div className="py-1">
                                <a 
                                  href={userType === 'vendor' ? '/tech-vendor/dashboard' : '/legal-professionals/dashboard/profile'} 
                                  className="flex items-center px-4 py-2 text-sm transition-colors"
                                  style={{ color: '#2d2d2d' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  <User size={16} className="mr-3" style={{ color: '#334155' }} />
                                  {userType === 'vendor' ? 'Dashboard' : 'Profile'}
                                </a>
                                <a 
                                  href="/community" 
                                  className="flex items-center px-4 py-2 text-sm transition-colors"
                                  style={{ color: '#2d2d2d' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  <MessageCircle size={16} className="mr-3" style={{ color: '#334155' }} />
                                  Community
                                </a>
                              </div>
                              <div className="py-1 border-t border-gray-100">
                                <button 
                                  onClick={handleLogout}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 transition-colors duration-150"
                                >
                                  <LogOut size={16} className="mr-3" />
                                  Log out
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="p-3 border-b border-gray-100">
                                <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                                  Welcome to DreamLegal
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: '#334155' }}>
                                  Sign in to access your account
                                </div>
                              </div>
                              <div className="py-1">
                                <a 
                                  href="/auth/user/login"
                                  className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-150"
                                  style={{ color: '#7cc6ee' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  <User size={16} className="mr-3" />
                                  Sign In
                                </a>
                                <a 
                                  href="/auth/user/register"
                                  className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-150"
                                  style={{ color: '#2d2d2d' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f7fa'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  <Plus size={16} className="mr-3" />
                                  Create Account
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setActiveDropdown(null);
                  }}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#334155' }}
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
                  
                  {/* Main Navigation Links - Made more prominent */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: '#7cc6ee' }}>
                      Navigate
                    </div>
                    <div className="space-y-1">
                      {navItems.map((item, index) => (
                        <div key={index} className="space-y-1">
                          {item.hasDropdown ? (
                            <>
                              <button
                                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                className="w-full flex items-center justify-between p-3 rounded-lg font-medium transition-all duration-200 border"
                                style={{ 
                                  color: '#1e2556',
                                  backgroundColor: activeDropdown === index ? '#f8fafc' : 'transparent',
                                  borderColor: activeDropdown === index ? '#7cc6ee' : '#e2e8f0'
                                }}
                              >
                                <div className="flex items-center space-x-3">
                                  <span style={{ color: '#7cc6ee' }}>{item.icon}</span>
                                  <span className="text-sm font-medium">
                                    {item.title}
                                  </span>
                                </div>
                                <ChevronDown 
                                  className={`w-4 h-4 transition-transform duration-200 ${
                                    activeDropdown === index ? 'rotate-180' : ''
                                  }`}
                                  style={{ color: '#7cc6ee' }}
                                />
                              </button>
                              {activeDropdown === index && (
                                <div className="mt-2 ml-4 mr-2 space-y-1 border-l-2 pl-4" style={{ borderColor: '#e2e8f0' }}>
                                  {item.dropdownItems?.map((dropdownItem, idx) => (
                                    <a
                                      key={idx}
                                      href={dropdownItem.href}
                                      className="block p-3 text-sm rounded-lg transition-colors border border-gray-100"
                                      style={{ backgroundColor: '#f8fafc' }}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = '#f8fafc'}
                                    >
                                      <div className="flex items-start">
                                        {dropdownItem.icon && (
                                          <span className="mr-2 mt-0.5 flex-shrink-0" style={{ color: '#7cc6ee' }}>
                                            {dropdownItem.icon}
                                          </span>
                                        )}
                                        <div>
                                          <div className="font-medium" style={{ color: '#1e2556' }}>
                                            {dropdownItem.title}
                                          </div>
                                          <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                                            {dropdownItem.description}
                                          </div>
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
                              className="w-full flex items-center p-3 rounded-lg font-medium transition-all duration-200 border border-gray-200"
                              style={{ color: '#1e2556' }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.borderColor = '#7cc6ee';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.borderColor = '#e2e8f0';
                              }}
                            >
                              <span className="mr-3" style={{ color: '#7cc6ee' }}>{item.icon}</span>
                              <span className="text-sm font-medium">{item.title}</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: '#7cc6ee' }}>
                      Quick Actions
                    </div>
                    <div className="space-y-2">
                      <a
                        href="/ask-question"
                        className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-sm font-medium text-white transition-all duration-200"
                        style={{ backgroundColor: '#1e2556' }}
                      >
                        <HelpCircle size={16} />
                        <span>Ask a Question</span>
                      </a>
                      <a
                        href="/legal-tech"
                        className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-sm font-medium border-2 transition-all duration-200"
                        style={{ 
                          color: '#1e2556', 
                          borderColor: '#1e2556',
                          backgroundColor: 'transparent'
                        }}
                      >
                        <Building size={16} />
                        <span>For Vendors</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* User info section - Made less prominent */}
                  {userType ? (
                    <div className="p-3 rounded-lg border border-gray-200" style={{ backgroundColor: '#f8fafc' }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#7cc6ee' }}>
                        Account
                      </div>
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3"
                          style={{ backgroundColor: '#1e2556' }}
                        >
                          {getInitials()}
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                            {userEmail}
                          </div>
                          <div className="text-xs" style={{ color: '#64748b' }}>
                            {userType === 'vendor' ? 'Tech Vendor' : 'Legal Professional'}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={userType === 'vendor' ? '/tech-vendor/dashboard' : '/legal-professionals/dashboard/profile'}
                          className="text-center text-xs font-medium bg-white py-2 px-3 rounded-md border border-gray-200 transition-colors"
                          style={{ color: '#1e2556' }}
                        >
                          {userType === 'vendor' ? 'Dashboard' : 'Profile'}
                        </a>
                        <button
                          onClick={handleLogout}
                          className="text-center text-xs font-medium text-red-600 bg-white py-2 px-3 rounded-md border border-gray-200 hover:bg-red-50 transition-colors"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg border border-gray-200" style={{ backgroundColor: '#f8fafc' }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#7cc6ee' }}>
                        Account
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                          <User size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                            Welcome to DreamLegal
                          </div>
                          <div className="text-xs" style={{ color: '#64748b' }}>
                            Sign in to get started
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="/auth/user/login"
                          className="text-center text-xs font-medium bg-white py-2 px-3 rounded-md border transition-colors"
                          style={{ color: '#7cc6ee', borderColor: '#7cc6ee' }}
                        >
                          Sign In
                        </a>
                        <a
                          href="/auth/user/register"
                          className="text-center text-xs font-medium bg-white py-2 px-3 rounded-md border border-gray-200 transition-colors"
                          style={{ color: '#1e2556' }}
                        >
                          Register
                        </a>
                      </div>
                    </div>
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
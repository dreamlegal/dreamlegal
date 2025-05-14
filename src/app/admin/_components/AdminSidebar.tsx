
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';
// // // import { useAdmin } from './AdminContext';

// // // // Import icons
// // // import { AiOutlineTags, AiOutlineDashboard } from 'react-icons/ai';
// // // import { FaChevronDown } from 'react-icons/fa';
// // // import { CiLogout } from 'react-icons/ci';
// // // import { BsFilePost } from 'react-icons/bs';
// // // import { FaUsersCog } from 'react-icons/fa';
// // // import { MdOutlineAnalytics } from 'react-icons/md';

// // // const AdminSidebar = () => {
// // //   const pathname = usePathname();
// // //   const { adminData, hasTabAccess, hasPermission, logout } = useAdmin();
  
// // //   // State for expandable menus
// // //   const [expandedMenus, setExpandedMenus] = useState({
// // //     Products: false,
// // //     Vendors: false,
// // //     Blog: false,
// // //     Admins: false
// // //   });

// // //   // Auto-expand menu based on current path
// // //   useEffect(() => {
// // //     if (pathname.startsWith('/admin/products')) {
// // //       setExpandedMenus(prev => ({ ...prev, Products: true }));
// // //     } else if (pathname.startsWith('/admin/vendors') || pathname.startsWith('/admin/users')) {
// // //       setExpandedMenus(prev => ({ ...prev, Vendors: true }));
// // //     } else if (pathname.startsWith('/admin/blog')) {
// // //       setExpandedMenus(prev => ({ ...prev, Blog: true }));
// // //     } else if (
// // //       pathname.startsWith('/admin/admins') ||
// // //       pathname.startsWith('/admin/analytics') ||
// // //       pathname.startsWith('/admin/notifications') ||
// // //       pathname.startsWith('/admin/leads')
// // //     ) {
// // //       setExpandedMenus(prev => ({ ...prev, Admins: true }));
// // //     }
// // //   }, [pathname]);

// // //   const toggleMenu = (menuName) => {
// // //     setExpandedMenus(prev => ({
// // //       ...prev,
// // //       [menuName]: !prev[menuName]
// // //     }));
// // //   };

// // //   // Check if a route is active
// // //   const isActive = (path) => {
// // //     return pathname === path || pathname.startsWith(`${path}/`);
// // //   };

// // //   if (!adminData) return null;

// // //   return (
// // //     <div className="flex flex-col h-full bg-gray-900 text-white">
// // //       <div className="p-4 border-b border-gray-800">
// // //         <h1 className="text-xl font-bold">Admin Panel</h1>
// // //         <p className="text-sm text-gray-400">{adminData.name || adminData.email}</p>
// // //         <p className="text-xs text-gray-500 capitalize">Role: {adminData.role || 'User'}</p>
// // //       </div>

// // //       <div className="flex-grow overflow-y-auto">
// // //         <ul className="py-2">
// // //           {/* Dashboard - Everyone gets access */}
// // //           <li>
// // //             <Link 
// // //               href="/admin"
// // //               className={`flex items-center px-4 py-3 text-sm transition-colors ${
// // //                 isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/vendors') && 
// // //                 !isActive('/admin/blog') && !isActive('/admin/admins')
// // //                   ? "text-white bg-[#034b8a]" 
// // //                   : "text-slate-300 hover:bg-gray-800"
// // //               } rounded-md mx-2 my-1`}
// // //             >
// // //               <AiOutlineDashboard className="text-lg mr-3" />
// // //               Dashboard
// // //             </Link>
// // //           </li>

// // //           {/* Products Tab */}
// // //           {hasTabAccess('Products') && (
// // //             <li className="mb-1">
// // //               <div
// // //                 onClick={() => toggleMenu('Products')}
// // //                 className={`flex justify-between items-center px-4 py-3 text-sm transition-colors rounded-md mx-2 my-1 cursor-pointer ${
// // //                   isActive('/admin/products')
// // //                     ? "text-white bg-[#034b8a]" 
// // //                     : "text-slate-300 hover:bg-gray-800"
// // //                 }`}
// // //               >
// // //                 <span className="flex items-center">
// // //                   <AiOutlineTags className="text-lg mr-3" />
// // //                   Products
// // //                 </span>
// // //                 <FaChevronDown className={`transition-transform ${expandedMenus.Products ? 'rotate-180' : ''}`} />
// // //               </div>
              
// // //               {expandedMenus.Products && (
// // //                 <ul className="ml-9 space-y-1 mt-1">
// // //                   {/* Only show All Products if they have permission */}
// // //                   {hasPermission('AllProduct') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/products" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/products') && !isActive('/admin/products/new') && !isActive('/admin/products/claims')
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         All Products
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show New Product if they have permission */}
// // //                   {hasPermission('NewProduct') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/products/new" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/products/new') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         New Product
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show Product Claims if they have permission */}
// // //                   {hasPermission('AdminProductClaimsPage') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/products/claims" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/products/claims') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Product Claims
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show Admin Product Creation if they have permission */}
// // //                   {hasPermission('AdminProductCreation') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/products/create" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/products/create') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Admin Product Creation
// // //                       </Link>
// // //                     </li>
// // //                   )}
// // //                 </ul>
// // //               )}
// // //             </li>
// // //           )}

// // //           {/* Vendors Tab */}
// // //           {hasTabAccess('Vendors') && (
// // //             <li className="mb-1">
// // //               <div
// // //                 onClick={() => toggleMenu('Vendors')}
// // //                 className={`flex justify-between items-center px-4 py-3 text-sm transition-colors rounded-md mx-2 my-1 cursor-pointer ${
// // //                   isActive('/admin/vendors') || isActive('/admin/users')
// // //                     ? "text-white bg-[#034b8a]" 
// // //                     : "text-slate-300 hover:bg-gray-800"
// // //                 }`}
// // //               >
// // //                 <span className="flex items-center">
// // //                   <AiOutlineTags className="text-lg mr-3" />
// // //                   Vendors
// // //                 </span>
// // //                 <FaChevronDown className={`transition-transform ${expandedMenus.Vendors ? 'rotate-180' : ''}`} />
// // //               </div>
              
// // //               {expandedMenus.Vendors && (
// // //                 <ul className="ml-9 space-y-1 mt-1">
// // //                   {/* Only show Vendors Management if they have permission */}
// // //                   {hasPermission('VendorsPage') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/vendors" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/vendors')
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Vendors Management
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show Users Management if they have permission */}
// // //                   {hasPermission('UsersPage') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/users" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/users') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Users Management
// // //                       </Link>
// // //                     </li>
// // //                   )}
// // //                 </ul>
// // //               )}
// // //             </li>
// // //           )}

// // //           {/* Blog Section (for SEO) */}
// // //           {hasTabAccess('Blog') && (
// // //             <li className="mb-1">
// // //               <div
// // //                 onClick={() => toggleMenu('Blog')}
// // //                 className={`flex justify-between items-center px-4 py-3 text-sm transition-colors rounded-md mx-2 my-1 cursor-pointer ${
// // //                   isActive('/admin/blog')
// // //                     ? "text-white bg-[#034b8a]" 
// // //                     : "text-slate-300 hover:bg-gray-800"
// // //                 }`}
// // //               >
// // //                 <span className="flex items-center">
// // //                   <BsFilePost className="text-lg mr-3" />
// // //                   Blog
// // //                 </span>
// // //                 <FaChevronDown className={`transition-transform ${expandedMenus.Blog ? 'rotate-180' : ''}`} />
// // //               </div>
              
// // //               {expandedMenus.Blog && (
// // //                 <ul className="ml-9 space-y-1 mt-1">
// // //                   {/* Only show Blog Management if they have permission */}
// // //                   {hasPermission('adminblog') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/blog" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/blog') && !isActive('/admin/blog/new')
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Blog Management
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show Create Blog if they have permission */}
// // //                   {/* {hasPermission('CreateBlog') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/blog/new" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/blog/new') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Create Blog
// // //                       </Link>
// // //                     </li>
// // //                   )} */}
// // //                 </ul>
// // //               )}
// // //             </li>
// // //           )}

// // //           {/* Admin Management - Only for super_admin or those with Admins tab access */}
// // //           {(adminData.role === 'super_admin' || hasTabAccess('Admins')) && (
// // //             <li className="mb-1">
// // //               <div
// // //                 onClick={() => toggleMenu('Admins')}
// // //                 className={`flex justify-between items-center px-4 py-3 text-sm transition-colors rounded-md mx-2 my-1 cursor-pointer ${
// // //                   isActive('/admin/admins') || isActive('/admin/analytics') || 
// // //                   isActive('/admin/notifications') || isActive('/admin/leads')
// // //                     ? "text-white bg-[#034b8a]" 
// // //                     : "text-slate-300 hover:bg-gray-800"
// // //                 }`}
// // //               >
// // //                 <span className="flex items-center">
// // //                   <FaUsersCog className="text-lg mr-3" />
// // //                   Admin Management
// // //                 </span>
// // //                 <FaChevronDown className={`transition-transform ${expandedMenus.Admins ? 'rotate-180' : ''}`} />
// // //               </div>
              
// // //               {expandedMenus.Admins && (
// // //                 <ul className="ml-9 space-y-1 mt-1">
// // //                   {/* Always show Manage Admins for super_admin */}
// // //                   {adminData.role === 'super_admin' && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/admins" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/admins') && !isActive('/admin/admins/new')
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Manage Admins
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Always show Create Admin for super_admin */}
// // //                   {/* {adminData.role === 'super_admin' && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/admins/new" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/admins/new') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Create Admin
// // //                       </Link>
// // //                     </li>
// // //                   )} */}
                  
// // //                   {/* Only show Analytics if they have permission */}
// // //                   {hasPermission('addAnalytics') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/analytics" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/analytics') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Analytics
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show Notifications if they have permission */}
// // //                   {hasPermission('sendNotification') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/notifications" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/notifications') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         Notifications
// // //                       </Link>
// // //                     </li>
// // //                   )}
                  
// // //                   {/* Only show All Leads if they have permission */}
// // //                   {hasPermission('adminLeads') && (
// // //                     <li>
// // //                       <Link 
// // //                         href="/admin/leads" 
// // //                         className={`block px-3 py-2 text-sm rounded-md ${
// // //                           isActive('/admin/leads') 
// // //                             ? "text-white bg-gray-800" 
// // //                             : "text-slate-300 hover:bg-gray-800"
// // //                         }`}
// // //                       >
// // //                         All Leads
// // //                       </Link>
// // //                     </li>
// // //                   )}
// // //                 </ul>
// // //               )}
// // //             </li>
// // //           )}
// // //         </ul>
// // //       </div>

// // //       {/* Logout Button */}
// // //       <div className="border-t border-gray-800 p-4">
// // //         <button
// // //           onClick={logout}
// // //           className="flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors rounded-md w-full"
// // //         >
// // //           <CiLogout className="text-lg mr-3" />
// // //           Logout
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminSidebar;
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { useAdmin } from './AdminContext';

// // // Import icons
// // import { BsTags, BsLayoutTextWindowReverse, BsArrowBarRight } from 'react-icons/bs';
// // import { RiDashboardLine, RiArrowDownSLine } from 'react-icons/ri';
// // import { HiOutlineUsers } from 'react-icons/hi';
// // import { TbArticle } from 'react-icons/tb';
// // import { MdOutlineAdminPanelSettings } from 'react-icons/md';

// // const AdminSidebar = () => {
// //   const pathname = usePathname();
// //   const { adminData, hasTabAccess, hasPermission, logout } = useAdmin();
  
// //   // State for expandable menus
// //   const [expandedMenus, setExpandedMenus] = useState({
// //     Products: false,
// //     Vendors: false,
// //     Blog: false,
// //     Admins: false
// //   });
  
// //   // State for admin details dropdown
// //   const [showAdminDetails, setShowAdminDetails] = useState(false);
// //   const popupRef = useRef(null);
// //   const btnRef = useRef(null);

// //   // Close popup when clicking outside
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (popupRef.current && 
// //           !popupRef.current.contains(event.target) && 
// //           btnRef.current &&
// //           !btnRef.current.contains(event.target) && 
// //           showAdminDetails) {
// //         setShowAdminDetails(false);
// //       }
// //     }
    
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [showAdminDetails]);

// //   // Auto-expand menu based on current path
// //   useEffect(() => {
// //     if (pathname.startsWith('/admin/products')) {
// //       setExpandedMenus(prev => ({ ...prev, Products: true }));
// //     } else if (pathname.startsWith('/admin/vendors') || pathname.startsWith('/admin/users')) {
// //       setExpandedMenus(prev => ({ ...prev, Vendors: true }));
// //     } else if (pathname.startsWith('/admin/blog')) {
// //       setExpandedMenus(prev => ({ ...prev, Blog: true }));
// //     } else if (
// //       pathname.startsWith('/admin/admins') ||
// //       pathname.startsWith('/admin/analytics') ||
// //       pathname.startsWith('/admin/notifications') ||
// //       pathname.startsWith('/admin/leads')
// //     ) {
// //       setExpandedMenus(prev => ({ ...prev, Admins: true }));
// //     }
// //   }, [pathname]);

// //   const toggleMenu = (menuName) => {
// //     setExpandedMenus(prev => ({
// //       ...prev,
// //       [menuName]: !prev[menuName]
// //     }));
// //   };

// //   // Check if a route is active
// //   const isActive = (path) => {
// //     return pathname === path || pathname.startsWith(`${path}/`);
// //   };

// //   const adminLogout = () => {
// //     logout();
// //   };

// //   if (!adminData) return null;

// //   return (
// //     <div className="flex flex-col h-full bg-[#1e2556] text-white relative">
// //       {/* Rectangular rounded strip header */}
// //       <div className="p-4">
// //         <div 
// //           ref={btnRef}
// //           className="bg-[#242b5d] rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-[#2a3166] transition-all p-3 border border-[#7cc6ee] border-opacity-20"
// //           onClick={() => setShowAdminDetails(!showAdminDetails)}
// //         >
// //           <div className="flex items-center">
// //             <div className="bg-[#1e2556] p-2 rounded-lg mr-3 shadow-inner">
// //               <BsLayoutTextWindowReverse className="text-[#7cc6ee] text-lg" />
// //             </div>
// //             <div>
// //               <h1 className="font-semibold text-white">Admin Panel</h1>
// //               <p className="text-xs text-slate-300">Head of Tech</p>
// //             </div>
// //           </div>
// //           <div className="bg-[#1e2556] rounded-full p-1 hover:bg-[#7cc6ee] hover:bg-opacity-20 transition-colors">
// //             <RiArrowDownSLine className={`text-[#7cc6ee] transition-transform duration-300 ${showAdminDetails ? 'rotate-180' : ''}`} />
// //           </div>
// //         </div>
// //       </div>
        
// //       {/* Vertical popup for admin details - positioned below header */}
// //       {showAdminDetails && (
// //         <div 
// //           ref={popupRef}
// //           className="absolute top-20 left-4 z-20 w-[calc(100%-2rem)] bg-[#242b5d] rounded-lg shadow-xl border border-[#7cc6ee] border-opacity-30"
// //           style={{
// //             transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
// //             animation: 'fadeIn 0.3s forwards',
// //           }}
// //         >
// //           <div className="p-4">
// //             {/* Profile section */}
// //             <div className="flex items-start mb-4">
// //               <div className="w-12 h-12 rounded-full bg-[#7cc6ee] bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
// //                 <span className="text-[#7cc6ee] font-medium text-lg">
// //                   {(adminData.name || adminData.email || "A").charAt(0).toUpperCase()}
// //                 </span>
// //               </div>
// //               <div>
// //                 <p className="text-white font-medium">{adminData.name || "Head of Tech"}</p>
// //                 <p className="text-[#7cc6ee] text-xs mt-1">{adminData.email || "rohanvkumarv@gmail.com"}</p>
// //                 <div className="flex items-center mt-2">
// //                   <div className="h-2 w-2 rounded-full bg-[#7cc6ee] mr-2 animate-pulse"></div>
// //                   <p className="text-xs text-slate-300 capitalize">
// //                     {adminData.role || 'Super_admin'}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
              
// //             {/* ACCESS PERMISSIONS with header */}
// //             <div className="mt-4 pt-4 border-t border-[#7cc6ee] border-opacity-10">
// //               <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">ACCESS PERMISSIONS</p>
              
// //               <div className="space-y-2">
// //                 {/* List of permissions - styled like in the image */}
// //                 <div className="flex items-center text-sm">
// //                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
// //                   <span className="text-slate-200">Blog</span>
// //                 </div>
// //                 <div className="flex items-center text-sm">
// //                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
// //                   <span className="text-slate-200">Vendors</span>
// //                 </div>
// //                 <div className="flex items-center text-sm">
// //                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
// //                   <span className="text-slate-200">Analytics</span>
// //                 </div>
// //                 <div className="flex items-center text-sm">
// //                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
// //                   <span className="text-slate-200">Admins</span>
// //                 </div>
// //                 <div className="flex items-center text-sm">
// //                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
// //                   <span className="text-slate-200">Products</span>
// //                 </div>
// //               </div>
// //             </div>
            
// //             {/* Close button at bottom */}
// //             <div className="mt-4 flex justify-end">
// //               <button 
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setShowAdminDetails(false);
// //                 }} 
// //                 className="bg-[#1e2556] text-xs text-white py-1.5 px-4 rounded-md hover:bg-[#7cc6ee] transition-colors"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="flex-grow overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#7cc6ee] scrollbar-track-transparent">
// //         <div className="text-xs uppercase text-slate-400 px-6 mb-2 font-medium">Navigation</div>
// //         <ul className="px-3">
// //           {/* Dashboard - Everyone gets access */}
// //           <li className="mb-1">
// //             <Link 
// //               href="/admin"
// //               className={`flex items-center px-3 py-3 text-sm transition-all rounded-lg ${
// //                 isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/vendors') && 
// //                 !isActive('/admin/blog') && !isActive('/admin/admins')
// //                   ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
// //                   : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
// //               }`}
// //             >
// //               <RiDashboardLine className="text-lg mr-3" />
// //               Dashboard
// //             </Link>
// //           </li>

// //           {/* Products Tab */}
// //           {hasTabAccess('Products') && (
// //             <li className="mb-1">
// //               <div
// //                 onClick={() => toggleMenu('Products')}
// //                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
// //                   isActive('/admin/products')
// //                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
// //                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
// //                 }`}
// //               >
// //                 <span className="flex items-center">
// //                   <BsTags className="text-lg mr-3" />
// //                   Products
// //                 </span>
// //                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Products ? 'rotate-180' : ''}`} />
// //               </div>
              
// //               {expandedMenus.Products && (
// //                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
// //                   {/* Only show All Products if they have permission */}
// //                   {hasPermission('AllProduct') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/products" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/products') && !isActive('/admin/products/new') && !isActive('/admin/products/claims')
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         All Products
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Only show New Product if they have permission */}
// //                   {hasPermission('NewProduct') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/products/new" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/products/new') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         New Product
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Only show Product Claims if they have permission */}
// //                   {hasPermission('AdminProductClaimsPage') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/products/claims" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/products/claims') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Product Claims
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Only show Admin Product Creation if they have permission */}
// //                   {hasPermission('AdminProductCreation') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/products/create" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/products/create') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Admin Product Creation
// //                       </Link>
// //                     </li>
// //                   )}
// //                 </ul>
// //               )}
// //             </li>
// //           )}

// //           {/* Vendors Tab */}
// //           {hasTabAccess('Vendors') && (
// //             <li className="mb-1">
// //               <div
// //                 onClick={() => toggleMenu('Vendors')}
// //                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
// //                   isActive('/admin/vendors') || isActive('/admin/users')
// //                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
// //                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
// //                 }`}
// //               >
// //                 <span className="flex items-center">
// //                   <HiOutlineUsers className="text-lg mr-3" />
// //                   Vendors
// //                 </span>
// //                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Vendors ? 'rotate-180' : ''}`} />
// //               </div>
              
// //               {expandedMenus.Vendors && (
// //                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
// //                   {/* Only show Vendors Management if they have permission */}
// //                   {hasPermission('VendorsPage') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/vendors" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/vendors')
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Vendors Management
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Only show Users Management if they have permission */}
// //                   {hasPermission('UsersPage') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/users" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/users') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Users Management
// //                       </Link>
// //                     </li>
// //                   )}
// //                 </ul>
// //               )}
// //             </li>
// //           )}

// //           {/* Blog Section (for SEO) */}
// //           {hasTabAccess('Blog') && (
// //             <li className="mb-1">
// //               <div
// //                 onClick={() => toggleMenu('Blog')}
// //                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
// //                   isActive('/admin/blog')
// //                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
// //                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
// //                 }`}
// //               >
// //                 <span className="flex items-center">
// //                   <TbArticle className="text-lg mr-3" />
// //                   Blog
// //                 </span>
// //                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Blog ? 'rotate-180' : ''}`} />
// //               </div>
              
// //               {expandedMenus.Blog && (
// //                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
// //                   {/* Only show Blog Management if they have permission */}
// //                   {hasPermission('adminblog') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/blog" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/blog') && !isActive('/admin/blog/new')
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Blog Management
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Create Blog section - commented out in original code */}
// //                   {/* {hasPermission('CreateBlog') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/blog/new" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/blog/new') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Create Blog
// //                       </Link>
// //                     </li>
// //                   )} */}
// //                 </ul>
// //               )}
// //             </li>
// //           )}

// //           {/* Admin Management - Only for super_admin or those with Admins tab access */}
// //           {(adminData.role === 'super_admin' || hasTabAccess('Admins')) && (
// //             <li className="mb-1">
// //               <div
// //                 onClick={() => toggleMenu('Admins')}
// //                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
// //                   isActive('/admin/admins') || isActive('/admin/analytics') || 
// //                   isActive('/admin/notifications') || isActive('/admin/leads')
// //                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
// //                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
// //                 }`}
// //               >
// //                 <span className="flex items-center">
// //                   <MdOutlineAdminPanelSettings className="text-lg mr-3" />
// //                   Admin Management
// //                 </span>
// //                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Admins ? 'rotate-180' : ''}`} />
// //               </div>
              
// //               {expandedMenus.Admins && (
// //                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
// //                   {/* Always show Manage Admins for super_admin */}
// //                   {adminData.role === 'super_admin' && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/admins" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/admins') && !isActive('/admin/admins/new')
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Manage Admins
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Create Admin section - commented out in original code */}
// //                   {/* {adminData.role === 'super_admin' && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/admins/new" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/admins/new') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Create Admin
// //                       </Link>
// //                     </li>
// //                   )} */}
                  
// //                   {/* Only show Analytics if they have permission */}
// //                   {hasPermission('addAnalytics') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/analytics" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/analytics') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Analytics
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Only show Notifications if they have permission */}
// //                   {hasPermission('sendNotification') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/notifications" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/notifications') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         Notifications
// //                       </Link>
// //                     </li>
// //                   )}
                  
// //                   {/* Only show All Leads if they have permission */}
// //                   {hasPermission('adminLeads') && (
// //                     <li>
// //                       <Link 
// //                         href="/admin/leads" 
// //                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
// //                           isActive('/admin/leads') 
// //                             ? "text-[#7cc6ee] font-medium" 
// //                             : "text-slate-300 hover:text-[#7cc6ee]"
// //                         }`}
// //                       >
// //                         All Leads
// //                       </Link>
// //                     </li>
// //                   )}
// //                 </ul>
// //               )}
// //             </li>
// //           )}
// //         </ul>
// //       </div>

// //       {/* Logout Button */}
// //       <div className="mt-auto p-4 border-t border-[#7cc6ee] border-opacity-20">
// //         <button
// //           onClick={adminLogout}
// //           className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-[#2a3166] rounded-lg transition-colors"
// //         >
// //           <BsArrowBarRight className="text-lg mr-3" />
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSidebar;
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAdmin } from './AdminContext';

// // Import icons
// import { BsTags, BsLayoutTextWindowReverse, BsArrowBarRight } from 'react-icons/bs';
// import { RiDashboardLine, RiArrowDownSLine } from 'react-icons/ri';
// import { HiOutlineUsers } from 'react-icons/hi';
// import { TbArticle } from 'react-icons/tb';
// import { MdOutlineAdminPanelSettings } from 'react-icons/md';

// const AdminSidebar = () => {
//   const pathname = usePathname();
//   const { adminData, hasTabAccess, hasPermission, logout } = useAdmin();
  
//   // State for expandable menus
//   const [expandedMenus, setExpandedMenus] = useState({
//     Products: false,
//     Vendors: false,
//     Blog: false,
//     Admins: false
//   });
  
//   // State for admin details dropdown
//   const [showAdminDetails, setShowAdminDetails] = useState(false);
//   const popupRef = useRef(null);
//   const btnRef = useRef(null);

//   // Close popup when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && 
//           !popupRef.current.contains(event.target) && 
//           btnRef.current &&
//           !btnRef.current.contains(event.target) && 
//           showAdminDetails) {
//         setShowAdminDetails(false);
//       }
//     }
    
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showAdminDetails]);

//   // Auto-expand menu based on current path
//   useEffect(() => {
//     if (pathname.startsWith('/admin/products')) {
//       setExpandedMenus(prev => ({ ...prev, Products: true }));
//     } else if (pathname.startsWith('/admin/vendors') || pathname.startsWith('/admin/users')) {
//       setExpandedMenus(prev => ({ ...prev, Vendors: true }));
//     } else if (pathname.startsWith('/admin/blog')) {
//       setExpandedMenus(prev => ({ ...prev, Blog: true }));
//     } else if (
//       pathname.startsWith('/admin/admins') ||
//       pathname.startsWith('/admin/analytics') ||
//       pathname.startsWith('/admin/notifications') ||
//       pathname.startsWith('/admin/leads')
//     ) {
//       setExpandedMenus(prev => ({ ...prev, Admins: true }));
//     }
//   }, [pathname]);

//   const toggleMenu = (menuName) => {
//     setExpandedMenus(prev => ({
//       ...prev,
//       [menuName]: !prev[menuName]
//     }));
//   };

//   // Check if a route is active
//   const isActive = (path) => {
//     return pathname === path || pathname.startsWith(`${path}/`);
//   };

//   const adminLogout = () => {
//     logout();
//   };

//   if (!adminData) return null;

//   return (
//     <div className="flex flex-col h-full bg-[#1e2556] text-white relative">
//       {/* Rectangular rounded strip header */}
//       <div className="p-4">
//         <div 
//           ref={btnRef}
//           className="bg-[#242b5d] rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-[#2a3166] transition-all p-3 border border-[#7cc6ee] border-opacity-20"
//           onClick={() => setShowAdminDetails(!showAdminDetails)}
//         >
//           <div className="flex items-center">
//             <div className="bg-[#1e2556] p-2 rounded-lg mr-3 shadow-inner">
//               <BsLayoutTextWindowReverse className="text-[#7cc6ee] text-lg" />
//             </div>
//             <div>
//               <h1 className="font-semibold text-white">Admin Panel</h1>
//               <p className="text-xs text-slate-300">Head of Tech</p>
//             </div>
//           </div>
//           <div className="bg-[#1e2556] rounded-full p-1 hover:bg-[#7cc6ee] hover:bg-opacity-20 transition-colors">
//             <RiArrowDownSLine className={`text-[#7cc6ee] transition-transform duration-300 ${showAdminDetails ? 'rotate-180' : ''}`} />
//           </div>
//         </div>
//       </div>
        
//       {/* Vertical popup for admin details - positioned below header */}
//       {showAdminDetails && (
//         <div 
//           ref={popupRef}
//           className="absolute top-20 left-4 z-20 w-[calc(100%-2rem)] bg-[#242b5d] rounded-lg shadow-xl border border-[#7cc6ee] border-opacity-30"
//           style={{
//             transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
//             animation: 'fadeIn 0.3s forwards',
//           }}
//         >
//           <div className="p-4">
//             {/* Profile section */}
//             <div className="flex items-start mb-4">
//               <div className="w-12 h-12 rounded-full bg-[#7cc6ee] bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
//                 <span className="text-[#7cc6ee] font-medium text-lg">
//                   {(adminData.name || adminData.email || "A").charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-white font-medium">{adminData.name || "Head of Tech"}</p>
//                 <p className="text-[#7cc6ee] text-xs mt-1">{adminData.email || "rohanvkumarv@gmail.com"}</p>
//                 <div className="flex items-center mt-2">
//                   <div className="h-2 w-2 rounded-full bg-[#7cc6ee] mr-2 animate-pulse"></div>
//                   <p className="text-xs text-slate-300 capitalize">
//                     {adminData.role || 'Super_admin'}
//                   </p>
//                 </div>
//               </div>
//             </div>
              
//             {/* ACCESS PERMISSIONS with header */}
//             <div className="mt-4 pt-4 border-t border-[#7cc6ee] border-opacity-10">
//               <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">ACCESS PERMISSIONS</p>
              
//               <div className="space-y-2">
//                 {/* List of permissions - styled like in the image */}
//                 <div className="flex items-center text-sm">
//                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
//                   <span className="text-slate-200">Blog</span>
//                 </div>
//                 <div className="flex items-center text-sm">
//                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
//                   <span className="text-slate-200">Vendors</span>
//                 </div>
//                 <div className="flex items-center text-sm">
//                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
//                   <span className="text-slate-200">Analytics</span>
//                 </div>
//                 <div className="flex items-center text-sm">
//                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
//                   <span className="text-slate-200">Admins</span>
//                 </div>
//                 <div className="flex items-center text-sm">
//                   <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
//                   <span className="text-slate-200">Products</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Close button at bottom */}
//             <div className="mt-4 flex justify-end">
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowAdminDetails(false);
//                 }} 
//                 className="bg-[#1e2556] text-xs text-white py-1.5 px-4 rounded-md hover:bg-[#7cc6ee] transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex-grow overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#7cc6ee] scrollbar-track-transparent">
//         <div className="text-xs uppercase text-slate-400 px-6 mb-2 font-medium">Navigation</div>
//         <ul className="px-3">
//           {/* Dashboard - Only Super Admin gets access */}
//           {adminData.role === 'super_admin' && (
//             <li className="mb-1">
//               <Link 
//                 href="/admin"
//                 className={`flex items-center px-3 py-3 text-sm transition-all rounded-lg ${
//                   isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/vendors') && 
//                   !isActive('/admin/blog') && !isActive('/admin/admins')
//                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
//                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
//                 }`}
//               >
//                 <RiDashboardLine className="text-lg mr-3" />
//                 Dashboard
//               </Link>
//             </li>
//           )}

//           {/* Products Tab */}
//           {hasTabAccess('Products') && (
//             <li className="mb-1">
//               <div
//                 onClick={() => toggleMenu('Products')}
//                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
//                   isActive('/admin/products')
//                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
//                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
//                 }`}
//               >
//                 <span className="flex items-center">
//                   <BsTags className="text-lg mr-3" />
//                   Products
//                 </span>
//                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Products ? 'rotate-180' : ''}`} />
//               </div>
              
//               {expandedMenus.Products && (
//                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
//                   {/* Only show All Products if they have permission */}
//                   {hasPermission('AllProduct') && (
//                     <li>
//                       <Link 
//                         href="/admin/products" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/products') && !isActive('/admin/products/new') && !isActive('/admin/products/claims')
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         All Products
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Only show New Product if they have permission */}
//                   {hasPermission('NewProduct') && (
//                     <li>
//                       <Link 
//                         href="/admin/products/new" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/products/new') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         New Product
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Only show Product Claims if they have permission */}
//                   {hasPermission('AdminProductClaimsPage') && (
//                     <li>
//                       <Link 
//                         href="/admin/products/claims" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/products/claims') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Product Claims
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Only show Admin Product Creation if they have permission */}
//                   {hasPermission('AdminProductCreation') && (
//                     <li>
//                       <Link 
//                         href="/admin/products/create" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/products/create') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Admin Product Creation
//                       </Link>
//                     </li>
//                   )}
//                 </ul>
//               )}
//             </li>
//           )}

//           {/* Vendors Tab */}
//           {hasTabAccess('Vendors') && (
//             <li className="mb-1">
//               <div
//                 onClick={() => toggleMenu('Vendors')}
//                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
//                   isActive('/admin/vendors') || isActive('/admin/users')
//                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
//                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
//                 }`}
//               >
//                 <span className="flex items-center">
//                   <HiOutlineUsers className="text-lg mr-3" />
//                   Vendors
//                 </span>
//                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Vendors ? 'rotate-180' : ''}`} />
//               </div>
              
//               {expandedMenus.Vendors && (
//                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
//                   {/* Only show Vendors Management if they have permission */}
//                   {hasPermission('VendorsPage') && (
//                     <li>
//                       <Link 
//                         href="/admin/vendors" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/vendors')
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Vendors Management
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Only show Users Management if they have permission */}
//                   {hasPermission('UsersPage') && (
//                     <li>
//                       <Link 
//                         href="/admin/users" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/users') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Users Management
//                       </Link>
//                     </li>
//                   )}
//                 </ul>
//               )}
//             </li>
//           )}

//           {/* Blog Section (for SEO) */}
//           {hasTabAccess('Blog') && (
//             <li className="mb-1">
//               <div
//                 onClick={() => toggleMenu('Blog')}
//                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
//                   isActive('/admin/blog')
//                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
//                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
//                 }`}
//               >
//                 <span className="flex items-center">
//                   <TbArticle className="text-lg mr-3" />
//                   Blog
//                 </span>
//                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Blog ? 'rotate-180' : ''}`} />
//               </div>
              
//               {expandedMenus.Blog && (
//                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
//                   {/* Only show Blog Management if they have permission */}
//                   {hasPermission('adminblog') && (
//                     <li>
//                       <Link 
//                         href="/admin/blog" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/blog') && !isActive('/admin/blog/new')
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Blog Management
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Create Blog section - commented out in original code */}
//                   {/* {hasPermission('CreateBlog') && (
//                     <li>
//                       <Link 
//                         href="/admin/blog/new" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/blog/new') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Create Blog
//                       </Link>
//                     </li>
//                   )} */}
//                 </ul>
//               )}
//             </li>
//           )}

//           {/* Admin Management - Only for super_admin or those with Admins tab access */}
//           {(adminData.role === 'super_admin' || hasTabAccess('Admins')) && (
//             <li className="mb-1">
//               <div
//                 onClick={() => toggleMenu('Admins')}
//                 className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
//                   isActive('/admin/admins') || isActive('/admin/analytics') || 
//                   isActive('/admin/notifications') || isActive('/admin/leads')
//                     ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
//                     : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
//                 }`}
//               >
//                 <span className="flex items-center">
//                   <MdOutlineAdminPanelSettings className="text-lg mr-3" />
//                   Admin Management
//                 </span>
//                 <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Admins ? 'rotate-180' : ''}`} />
//               </div>
              
//               {expandedMenus.Admins && (
//                 <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
//                   {/* Always show Manage Admins for super_admin */}
//                   {adminData.role === 'super_admin' && (
//                     <li>
//                       <Link 
//                         href="/admin/admins" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/admins') && !isActive('/admin/admins/new')
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Manage Admins
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Create Admin section - commented out in original code */}
//                   {/* {adminData.role === 'super_admin' && (
//                     <li>
//                       <Link 
//                         href="/admin/admins/new" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/admins/new') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Create Admin
//                       </Link>
//                     </li>
//                   )} */}
                  
//                   {/* Only show Analytics if they have permission */}
//                   {hasPermission('addAnalytics') && (
//                     <li>
//                       <Link 
//                         href="/admin/analytics" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/analytics') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Analytics
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Only show Notifications if they have permission */}
//                   {hasPermission('sendNotification') && (
//                     <li>
//                       <Link 
//                         href="/admin/notifications" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/notifications') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         Notifications
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Only show All Leads if they have permission */}
//                   {hasPermission('adminLeads') && (
//                     <li>
//                       <Link 
//                         href="/admin/leads" 
//                         className={`block px-3 py-2 text-sm rounded-md transition-all ${
//                           isActive('/admin/leads') 
//                             ? "text-[#7cc6ee] font-medium" 
//                             : "text-slate-300 hover:text-[#7cc6ee]"
//                         }`}
//                       >
//                         All Leads
//                       </Link>
//                     </li>
//                   )}
//                 </ul>
//               )}
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Logout Button */}
//       <div className="mt-auto p-4 border-t border-[#7cc6ee] border-opacity-20">
//         <button
//           onClick={adminLogout}
//           className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-[#2a3166] rounded-lg transition-colors"
//         >
//           <BsArrowBarRight className="text-lg mr-3" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from './AdminContext';

// Import icons
import { BsTags, BsLayoutTextWindowReverse, BsArrowBarRight } from 'react-icons/bs';
import { RiDashboardLine, RiArrowDownSLine } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import { TbArticle } from 'react-icons/tb';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { adminData, hasTabAccess, hasPermission } = useAdmin();
  
  // State for expandable menus
  const [expandedMenus, setExpandedMenus] = useState({
    Products: false,
    Vendors: false,
    Blog: false,
    Admins: false
  });
  
  // State for admin details dropdown
  const [showAdminDetails, setShowAdminDetails] = useState(false);
  const popupRef = useRef(null);
  const btnRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && 
          !popupRef.current.contains(event.target) && 
          btnRef.current &&
          !btnRef.current.contains(event.target) && 
          showAdminDetails) {
        setShowAdminDetails(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAdminDetails]);

  // Auto-expand menu based on current path
  useEffect(() => {
    if (pathname.startsWith('/admin/products')) {
      setExpandedMenus(prev => ({ ...prev, Products: true }));
    } else if (pathname.startsWith('/admin/vendors') || pathname.startsWith('/admin/users')) {
      setExpandedMenus(prev => ({ ...prev, Vendors: true }));
    } else if (pathname.startsWith('/admin/blog')) {
      setExpandedMenus(prev => ({ ...prev, Blog: true }));
    } else if (
      pathname.startsWith('/admin/admins') ||
      pathname.startsWith('/admin/analytics') ||
      pathname.startsWith('/admin/notifications') ||
      pathname.startsWith('/admin/leads')
    ) {
      setExpandedMenus(prev => ({ ...prev, Admins: true }));
    }
  }, [pathname]);

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  // Check if a route is active
  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Updated to use direct API call instead of context's logout function
  const adminLogout = async () => {
    try {
      // Direct API call to logout endpoint
      await fetch('/api/adminn/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear localStorage
      localStorage.removeItem('admin');
      
      // Redirect to login page
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem('admin');
      router.push('/admin/login');
    }
  };

  if (!adminData) return null;

  return (
    <div className="flex flex-col h-full bg-[#1e2556] text-white relative">
      {/* Rectangular rounded strip header */}
      <div className="p-4">
        <div 
          ref={btnRef}
          className="bg-[#242b5d] rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-[#2a3166] transition-all p-3 border border-[#7cc6ee] border-opacity-20"
          onClick={() => setShowAdminDetails(!showAdminDetails)}
        >
          <div className="flex items-center">
            <div className="bg-[#1e2556] p-2 rounded-lg mr-3 shadow-inner">
              <BsLayoutTextWindowReverse className="text-[#7cc6ee] text-lg" />
            </div>
            <div>
              <h1 className="font-semibold text-white">Admin Panel</h1>
              <p className="text-xs text-slate-300">Head of Tech</p>
            </div>
          </div>
          <div className="bg-[#1e2556] rounded-full p-1 hover:bg-[#7cc6ee] hover:bg-opacity-20 transition-colors">
            <RiArrowDownSLine className={`text-[#7cc6ee] transition-transform duration-300 ${showAdminDetails ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
        
      {/* Vertical popup for admin details - positioned below header */}
      {showAdminDetails && (
        <div 
          ref={popupRef}
          className="absolute top-20 left-4 z-20 w-[calc(100%-2rem)] bg-[#242b5d] rounded-lg shadow-xl border border-[#7cc6ee] border-opacity-30"
          style={{
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: 'fadeIn 0.3s forwards',
          }}
        >
          <div className="p-4">
            {/* Profile section */}
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-[#7cc6ee] bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-[#7cc6ee] font-medium text-lg">
                  {(adminData.name || adminData.email || "A").charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{adminData.name || "Head of Tech"}</p>
                <p className="text-[#7cc6ee] text-xs mt-1">{adminData.email || "rohanvkumarv@gmail.com"}</p>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full bg-[#7cc6ee] mr-2 animate-pulse"></div>
                  <p className="text-xs text-slate-300 capitalize">
                    {adminData.role || 'Super_admin'}
                  </p>
                </div>
              </div>
            </div>
              
            {/* ACCESS PERMISSIONS with header */}
            <div className="mt-4 pt-4 border-t border-[#7cc6ee] border-opacity-10">
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">ACCESS PERMISSIONS</p>
              
              <div className="space-y-2">
                {/* List of permissions - styled like in the image */}
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
                  <span className="text-slate-200">Blog</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
                  <span className="text-slate-200">Vendors</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
                  <span className="text-slate-200">Analytics</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
                  <span className="text-slate-200">Admins</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-[#7cc6ee] rounded-full mr-2"></div>
                  <span className="text-slate-200">Products</span>
                </div>
              </div>
            </div>
            
            {/* Close button at bottom */}
            <div className="mt-4 flex justify-end">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAdminDetails(false);
                }} 
                className="bg-[#1e2556] text-xs text-white py-1.5 px-4 rounded-md hover:bg-[#7cc6ee] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#7cc6ee] scrollbar-track-transparent">
        <div className="text-xs uppercase text-slate-400 px-6 mb-2 font-medium">Navigation</div>
        <ul className="px-3">
          {/* Dashboard - Only Super Admin gets access */}
          {adminData.role === 'super_admin' && (
            <li className="mb-1">
              <Link 
                href="/admin"
                className={`flex items-center px-3 py-3 text-sm transition-all rounded-lg ${
                  isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/vendors') && 
                  !isActive('/admin/blog') && !isActive('/admin/admins')
                    ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
                    : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
                }`}
              >
                <RiDashboardLine className="text-lg mr-3" />
                Dashboard
              </Link>
            </li>
          )}

          {/* Products Tab */}
          {hasTabAccess('Products') && (
            <li className="mb-1">
              <div
                onClick={() => toggleMenu('Products')}
                className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
                  isActive('/admin/products')
                    ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
                    : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
                }`}
              >
                <span className="flex items-center">
                  <BsTags className="text-lg mr-3" />
                  Products
                </span>
                <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Products ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedMenus.Products && (
                <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
                  {/* Only show All Products if they have permission */}
                  {hasPermission('AllProduct') && (
                    <li>
                      <Link 
                        href="/admin/products" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/products') && !isActive('/admin/products/new') && !isActive('/admin/products/claims')
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        All Products
                      </Link>
                    </li>
                  )}
                  
                  {/* Only show New Product if they have permission */}
                  {hasPermission('NewProduct') && (
                    <li>
                      <Link 
                        href="/admin/products/new" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/products/new') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        New Product
                      </Link>
                    </li>
                  )}
                  
                  {/* Only show Product Claims if they have permission */}
                  {hasPermission('AdminProductClaimsPage') && (
                    <li>
                      <Link 
                        href="/admin/products/claims" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/products/claims') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Product Claims
                      </Link>
                    </li>
                  )}
                  
                  {/* Only show Admin Product Creation if they have permission */}
                  {hasPermission('AdminProductCreation') && (
                    <li>
                      <Link 
                        href="/admin/products/create" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/products/create') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Admin Product Creation
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )}

          {/* Vendors Tab */}
          {hasTabAccess('Vendors') && (
            <li className="mb-1">
              <div
                onClick={() => toggleMenu('Vendors')}
                className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
                  isActive('/admin/vendors') || isActive('/admin/users')
                    ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
                    : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
                }`}
              >
                <span className="flex items-center">
                  <HiOutlineUsers className="text-lg mr-3" />
                  Vendors
                </span>
                <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Vendors ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedMenus.Vendors && (
                <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
                  {/* Only show Vendors Management if they have permission */}
                  {hasPermission('VendorsPage') && (
                    <li>
                      <Link 
                        href="/admin/vendors" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/vendors')
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Vendors Management
                      </Link>
                    </li>
                  )}
                  
                  {/* Only show Users Management if they have permission */}
                  {hasPermission('UsersPage') && (
                    <li>
                      <Link 
                        href="/admin/users" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/users') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Users Management
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )}

          {/* Blog Section (for SEO) */}
          {hasTabAccess('Blog') && (
            <li className="mb-1">
              <div
                onClick={() => toggleMenu('Blog')}
                className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
                  isActive('/admin/blog')
                    ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
                    : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
                }`}
              >
                <span className="flex items-center">
                  <TbArticle className="text-lg mr-3" />
                  Blog
                </span>
                <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Blog ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedMenus.Blog && (
                <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
                  {/* Only show Blog Management if they have permission */}
                  {hasPermission('adminblog') && (
                    <li>
                      <Link 
                        href="/admin/blog" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/blog') && !isActive('/admin/blog/new')
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Blog Management
                      </Link>
                    </li>
                  )}
                  
                  {/* Create Blog section - commented out in original code */}
                  {/* {hasPermission('CreateBlog') && (
                    <li>
                      <Link 
                        href="/admin/blog/new" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/blog/new') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Create Blog
                      </Link>
                    </li>
                  )} */}
                </ul>
              )}
            </li>
          )}

          {/* Admin Management - Only for super_admin or those with Admins tab access */}
          {(adminData.role === 'super_admin' || hasTabAccess('Admins')) && (
            <li className="mb-1">
              <div
                onClick={() => toggleMenu('Admins')}
                className={`flex justify-between items-center px-3 py-3 text-sm transition-all rounded-lg cursor-pointer ${
                  isActive('/admin/admins') || isActive('/admin/analytics') || 
                  isActive('/admin/notifications') || isActive('/admin/leads')
                    ? "text-white bg-[#7cc6ee] shadow-md font-medium" 
                    : "text-slate-300 hover:bg-[#2a3166] hover:text-white"
                }`}
              >
                <span className="flex items-center">
                  <MdOutlineAdminPanelSettings className="text-lg mr-3" />
                  Admin Management
                </span>
                <RiArrowDownSLine className={`transition-transform duration-200 ${expandedMenus.Admins ? 'rotate-180' : ''}`} />
              </div>
              
              {expandedMenus.Admins && (
                <ul className="mt-1 ml-4 pl-4 border-l border-[#7cc6ee] border-opacity-30 space-y-1 py-1">
                  {/* Always show Manage Admins for super_admin */}
                  {adminData.role === 'super_admin' && (
                    <li>
                      <Link 
                        href="/admin/admins" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/admins') && !isActive('/admin/admins/new')
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Manage Admins
                      </Link>
                    </li>
                  )}
                  
                  {/* Create Admin section - commented out in original code */}
                  {/* {adminData.role === 'super_admin' && (
                    <li>
                      <Link 
                        href="/admin/admins/new" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/admins/new') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Create Admin
                      </Link>
                    </li>
                  )} */}
                  
                  {/* Only show Analytics if they have permission */}
                  {hasPermission('addAnalytics') && (
                    <li>
                      <Link 
                        href="/admin/analytics" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/analytics') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Analytics
                      </Link>
                    </li>
                  )}
                  
                  {/* Only show Notifications if they have permission */}
                  {hasPermission('sendNotification') && (
                    <li>
                      <Link 
                        href="/admin/notifications" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/notifications') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        Notifications
                      </Link>
                    </li>
                  )}
                  
                  {/* Only show All Leads if they have permission */}
                  {hasPermission('adminLeads') && (
                    <li>
                      <Link 
                        href="/admin/leads" 
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          isActive('/admin/leads') 
                            ? "text-[#7cc6ee] font-medium" 
                            : "text-slate-300 hover:text-[#7cc6ee]"
                        }`}
                      >
                        All Leads
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto p-4 border-t border-[#7cc6ee] border-opacity-20">
        <button
          onClick={adminLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-[#2a3166] rounded-lg transition-colors"
        >
          <BsArrowBarRight className="text-lg mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
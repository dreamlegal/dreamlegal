"use client"
import { useState, useEffect } from "react";
import UserPage from "@/pages/UserPage";
// import Complete from "./_components/Complete";
import Loading from "@/components/Loading";
import ProfilePage from "../_components/ProfilePage";
import NotificationsPage from "../_components/NotificationsPage";
import BookmarksPage from "../_components/BookmarksPage";
interface UserProfile {
  success: boolean;
  profile: any;
  account: any;
}
import ReviewsPage from "../_components/ReviewsPage";

const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: UserProfile = await response.json();
    
    if (data.success) {
      return data;
    } else {
      console.error("API response error:", data);
      return null;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

export default function Page({ params }: { params: { userid: string } }) {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchProfile(params.userid);
        setData(result);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.userid]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data && data.success) {
    console.log(data)
    // return <div>hello ji</div>;
    // return <ProfilePage data={data}  userId={params.userid} />
    return <NotificationsPage   userId={params.userid} />
    // return <BookmarksPage   userId={params.userid} />
    // return <ReviewsPage   userId={params.userid} />
  }

  return <div>no no </div>;
}

// // app/user/[userid]/page.tsx
// // 'use client';

// // import { useState } from 'react';
// // import { Sidebar, navigationItems } from '../_components/Sidebar';
// // // import ProfileComponent from '../_components/ProfileComponent';
// // import DirectoryComponent from '../_components/DirectoryComponent';
// // // import ReviewsComponent from '../_components/ReviewsComponent';
// // // import WorkflowsComponent from '../_components/WorkflowsComponent';
// // // import SavedComponent from '../_components/SavedComponent';

// // const componentMap = {
// //   // 'profile': ProfileComponent,
// //   'directory': DirectoryComponent,
// //   // 'reviews': ReviewsComponent,
// //   // 'workflows': WorkflowsComponent,
// //   // 'saved': SavedComponent,
// // };

// // export default function UserProfilePage({ params }: { params: { userid: string } }) {
// //   const [activeSection, setActiveSection] = useState<string>('profile');

// //   // Get the active component
// //   const ActiveComponent = componentMap[activeSection as keyof typeof componentMap] || DirectoryComponent;

// //   return (
// //     <>
// //       <Sidebar 
// //         activeSection={activeSection} 
// //         onNavigate={setActiveSection} 
// //       />
// //       <div className="flex-1 md:pl-96 p-6 mt-16 md:mt-0">
// //         <ActiveComponent userId={params.userid} />
// //       </div>
// //     </>
// //   );
// // }



// app/[userid]/page.tsx
// 'use client'

// import { useState, useEffect } from "react"
// import { 
//   Home, 
//   Box, 
//   Briefcase, 
//   Users, 
//   Star, 
//   FileText,
//   MessageSquare,
//   Mail,
//   Phone,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Youtube,
//   Link as LinkIcon,
//   Menu,
//   X
// } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import Loading from "@/components/Loading"
// import ProfilePage from "../_components/ProfilePage";
// import NotificationsPage from "../_components/NotificationsPage";
// import BookmarksPage from "../_components/BookmarksPage";

// import ReviewsPage from "../_components/ReviewsPage";

// interface UserProfile {
//   success: boolean
//   profile: any
//   account: any
// }

// interface SidebarProps {
//   className?: string
//   activeTab: string
//   onTabChange: (tab: string) => void
//   userData: UserProfile | null
// }

// const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`)
//     if (!response.ok) throw new Error("Failed to fetch data")
//     const data: UserProfile = await response.json()
//     return data.success ? data : null
//   } catch (err) {
//     console.error("Fetch error:", err)
//     return null
//   }
// }

// const Sidebar = ({ className = '', activeTab, onTabChange, userData }: SidebarProps) => {
//   const [isVendor, setIsVendor] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)
//   const [isOpen, setIsOpen] = useState(false)

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }
//     checkMobile()
//     window.addEventListener('resize', checkMobile)
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   const navigationItems = [
//     { icon: Home, text: 'Profile', id: 'profile' },
//     { icon: Box, text: 'Reviews', id: 'reviews' },
//     { icon: Briefcase, text: 'Notifications', id: 'notifications' },
//     { icon: FileText, text: 'Bookmarks', id: 'bookmarks' },
//     { icon: Star, text: 'Saved', id: 'saved' },
//   ]

//   const socialIcons = [
//     { icon: Facebook, url: '#' },
//     { icon: Twitter, url: '#' },
//     { icon: Linkedin, url: '#' },
//     { icon: Youtube, url: '#' },
//     { icon: LinkIcon, url: '#' }
//   ]

//   const mobileMenuVariants = {
//     closed: {
//       opacity: 0,
//       y: -20,
//       transition: { duration: 0.2 }
//     },
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.2 }
//     }
//   }

//   const renderNavigationButtons = () => (
//     <div className="space-y-1 mb-6">
//       {navigationItems.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => {
//             onTabChange(item.id)
//             if (isMobile) setIsOpen(false)
//           }}
//           className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm
//             ${activeTab === item.id 
//               ? 'bg-gray-100 text-gray-900' 
//               : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//             }`}
//         >
//           <item.icon size={16} />
//           <span className="font-medium">{item.text}</span>
//         </button>
//       ))}
//     </div>
//   )

//   if (isMobile) {
//     return (
//       <>
//         <div className="fixed top-0 left-0 right-0 z-50">
//           <div className="bg-white/80 backdrop-blur-lg shadow-sm px-4 py-3 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">D</span>
//               </div>
//               <span className="font-semibold text-sm text-gray-900">
//                 DreamLegal
//               </span>
//             </div>
            
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               {isOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>

//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 variants={mobileMenuVariants}
//                 className="bg-white/80 backdrop-blur-lg shadow-lg p-4 mx-2 mt-2 rounded-xl"
//               >
//                 {renderNavigationButtons()}

//                 <div className="bg-gray-50 p-3 rounded-xl mb-4">
//                   <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
//                   <div className="flex justify-between items-center">
//                     <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//                       <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//                       <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
//                     </button>
//                     <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//                       <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//                       <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
//                     </button>
//                     <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//                       <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//                       <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 rounded-xl p-2">
//                   <div className="flex justify-between">
//                     {socialIcons.map((item, index) => (
//                       <button
//                         key={index}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
//                       >
//                         <item.icon size={16} />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </>
//     )
//   }

//   return (
//     <div className={`w-64 bg-white p-6 shadow-lg fixed top-4 left-8 bottom-4 rounded-2xl overflow-y-auto ${className}`}>
//       <div className="flex items-center gap-2 mb-6">
//         <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
//           <span className="text-white font-bold text-sm">D</span>
//         </div>
//         <span className="font-semibold text-sm text-gray-900">
//           DreamLegal
//         </span>
//       </div>

//       <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

//       {renderNavigationButtons()}

//       <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

//       <div className="mb-6 bg-gray-50 p-4 rounded-xl">
//         <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
//         <div className="flex justify-between items-center mb-2">
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
//           </button>
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
//           </button>
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-gray-50 rounded-xl p-2">
//         <div className="flex justify-between">
//           {socialIcons.map((item, index) => (
//             <button
//               key={index}
//               className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
//             >
//               <item.icon size={16} />
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="py-4">
//         <button
//           onClick={() => setIsVendor(!isVendor)}
//           className="w-full mb-6 px-3 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
//         >
//           {isVendor ? 'Logout' : 'Logout'}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default function Page({ params }: { params: { userid: string } }) {
//   const [data, setData] = useState<UserProfile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [activeTab, setActiveTab] = useState('profile')

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const result = await fetchProfile(params.userid)
//         setData(result)
//       } catch (err) {
//         setError("Failed to load data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadData()
//   }, [params.userid])

//   if (loading) return <Loading />
//   if (error) return <div>Error: {error}</div>
//   if (!data?.success) return <div>No data found</div>

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return <ProfilePage data={data} userId={params.userid} />
//       case 'reviews':
//         return <ReviewsPage userId={params.userid} />
//       case 'notifications':
//         return <NotificationsPage userId={params.userid} />
//       case 'bookmarks':
//         return <BookmarksPage userId={params.userid} />
//       case 'saved':
//         return <div>Saved Content</div>
//       default:
//         return <ProfilePage data={data} userId={params.userid} />
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar 
//         activeTab={activeTab} 
//         onTabChange={setActiveTab}
//         userData={data}
//       />
//       <div className="flex-1 md:pl-96 p-6 mt-16 md:mt-0">
//         {renderContent()}
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from "react"
// import { 
//   Home, 
//   Box, 
//   Briefcase, 
//   Users, 
//   Star, 
//   FileText,
//   MessageSquare,
//   Mail,
//   Phone,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Youtube,
//   Link as LinkIcon,
//   Menu,
//   X
// } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import Loading from "@/components/Loading"
// import ProfilePage from "../_components/ProfilePage"
// import NotificationsPage from "../_components/NotificationsPage"
// import BookmarksPage from "../_components/BookmarksPage"
// import ReviewsPage from "../_components/ReviewsPage"

// interface UserProfile {
//   success: boolean
//   profile: any
//   account: any
// }

// interface SidebarProps {
//   className?: string
//   activeTab: string
//   onTabChange: (tab: string) => void
//   userData: UserProfile | null
// }

// interface PageProps {
//   params: {
//     userid: string
//   }
// }

// const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`)
//     if (!response.ok) throw new Error("Failed to fetch data")
//     const data: UserProfile = await response.json()
//     return data.success ? data : null
//   } catch (err) {
//     console.error("Fetch error:", err)
//     return null
//   }
// }

// const Sidebar = ({ className = '', activeTab, onTabChange, userData }: SidebarProps): JSX.Element => {
//   const [isVendor, setIsVendor] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)
//   const [isOpen, setIsOpen] = useState(false)

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }
//     checkMobile()
//     window.addEventListener('resize', checkMobile)
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   const navigationItems = [
//     { icon: Home, text: 'Profile', id: 'profile' },
//     { icon: Box, text: 'Reviews', id: 'reviews' },
//     { icon: Briefcase, text: 'Notifications', id: 'notifications' },
//     { icon: FileText, text: 'Bookmarks', id: 'bookmarks' },
//     { icon: Star, text: 'Saved', id: 'saved' },
//   ]

//   const socialIcons = [
//     { icon: Facebook, url: '#' },
//     { icon: Twitter, url: '#' },
//     { icon: Linkedin, url: '#' },
//     { icon: Youtube, url: '#' },
//     { icon: LinkIcon, url: '#' }
//   ]

//   const mobileMenuVariants = {
//     closed: {
//       opacity: 0,
//       y: -20,
//       transition: { duration: 0.2 }
//     },
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.2 }
//     }
//   }

//   const renderNavigationButtons = () => (
//     <div className="space-y-1 mb-6">
//       {navigationItems.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => {
//             onTabChange(item.id)
//             if (isMobile) setIsOpen(false)
//           }}
//           className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm
//             ${activeTab === item.id 
//               ? 'bg-gray-100 text-gray-900' 
//               : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//             }`}
//         >
//           <item.icon size={16} />
//           <span className="font-medium">{item.text}</span>
//         </button>
//       ))}
//     </div>
//   )

//   if (isMobile) {
//     return (
//       <>
//         <div className="fixed top-0 left-0 right-0 z-50">
//           <div className="bg-white/80 backdrop-blur-lg shadow-sm px-4 py-3 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">D</span>
//               </div>
//               <span className="font-semibold text-sm text-gray-900">
//                 DreamLegal
//               </span>
//             </div>
            
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               {isOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>

//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 variants={mobileMenuVariants}
//                 className="bg-white/80 backdrop-blur-lg shadow-lg p-4 mx-2 mt-2 rounded-xl"
//               >
//                 {renderNavigationButtons()}

//                 <div className="bg-gray-50 p-3 rounded-xl mb-4">
//                   <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
//                   <div className="flex justify-between items-center">
//                     <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//                       <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//                       <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
//                     </button>
//                     <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//                       <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//                       <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
//                     </button>
//                     <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//                       <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//                       <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 rounded-xl p-2">
//                   <div className="flex justify-between">
//                     {socialIcons.map((item, index) => (
//                       <button
//                         key={index}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
//                       >
//                         <item.icon size={16} />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </>
//     )
//   }

//   return (
//     <div className={`w-64 bg-white p-6 shadow-lg fixed top-4 left-8 bottom-4 rounded-2xl overflow-y-auto ${className}`}>
//       <div className="flex items-center gap-2 mb-6">
//         <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
//           <span className="text-white font-bold text-sm">D</span>
//         </div>
//         <span className="font-semibold text-sm text-gray-900">
//           DreamLegal
//         </span>
//       </div>

//       <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

//       {renderNavigationButtons()}

//       <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

//       <div className="mb-6 bg-gray-50 p-4 rounded-xl">
//         <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
//         <div className="flex justify-between items-center mb-2">
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
//           </button>
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
//           </button>
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-gray-50 rounded-xl p-2">
//         <div className="flex justify-between">
//           {socialIcons.map((item, index) => (
//             <button
//               key={index}
//               className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
//             >
//               <item.icon size={16} />
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="py-4">
//         <button
//           onClick={() => setIsVendor(!isVendor)}
//           className="w-full mb-6 px-3 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
//         >
//           {isVendor ? 'Logout' : 'Logout'}
//         </button>
//       </div>
//     </div>
//   )
// }

// // const Page: React.FC<PageProps> = ({ params }) => {
// export default function Page({ params }: { params: { userid: string } }) {
//   const [data, setData] = useState<UserProfile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [activeTab, setActiveTab] = useState('profile')

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const result = await fetchProfile(params.userid)
//         setData(result)
//       } catch (err) {
//         setError("Failed to load data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadData()
//   }, [params.userid])

//   if (loading) return <Loading />
//   if (error) return <div>Error: {error}</div>
//   if (!data?.success) return <div>No data found</div>

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return <ProfilePage data={data} userId={params.userid} />
//       case 'reviews':
//         return <ReviewsPage userId={params.userid} />
//       case 'notifications':
//         return <NotificationsPage userId={params.userid} />
//       case 'bookmarks':
//         return <BookmarksPage userId={params.userid} />
//       case 'saved':
//         return <div>Saved Content</div>
//       default:
//         return <ProfilePage data={data} userId={params.userid} />
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar 
//         activeTab={activeTab} 
//         onTabChange={setActiveTab}
//         userData={data}
//       />
//       <div className="flex-1 md:pl-96 p-6 mt-16 md:mt-0">
//         {renderContent()}
//       </div>
//     </div>
//   )
// }

// // export default Page
// // 'use client'

// // import { useState, useEffect } from "react"
// // import { 
// //   Home, 
// //   Box, 
// //   Briefcase, 
// //   Users, 
// //   Star, 
// //   FileText,
// //   MessageSquare,
// //   Mail,
// //   Phone,
// //   Facebook,
// //   Twitter,
// //   Linkedin,
// //   Youtube,
// //   Link as LinkIcon,
// //   Menu,
// //   X
// // } from 'lucide-react'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import Loading from "@/components/Loading"
// // import ProfilePage from "../_components/ProfilePage"
// // import NotificationsPage from "../_components/NotificationsPage"
// // import BookmarksPage from "../_components/BookmarksPage"
// // import ReviewsPage from "../_components/ReviewsPage"

// // interface UserProfile {
// //   success: boolean
// //   profile: any
// //   account: any
// // }

// // interface SidebarProps {
// //   className?: string
// //   activeTab: string
// //   onTabChange: (tab: string) => void
// //   userData: UserProfile | null
// // }

// // // Next.js specific page props type
// // type PageProps = {
// //   params: {
// //     userid: string
// //   }
// // }

// // const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
// //   try {
// //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`)
// //     if (!response.ok) throw new Error("Failed to fetch data")
// //     const data: UserProfile = await response.json()
// //     return data.success ? data : null
// //   } catch (err) {
// //     console.error("Fetch error:", err)
// //     return null
// //   }
// // }

// // const Sidebar = ({ className = '', activeTab, onTabChange, userData }: SidebarProps) => {
// //   // ... rest of Sidebar component code remains the same ...
// // }

// // // Next.js page component
// // export default function Page({ params }: PageProps) {
// //   const [data, setData] = useState<UserProfile | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const [activeTab, setActiveTab] = useState('profile')

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const result = await fetchProfile(params.userid)
// //         setData(result)
// //       } catch (err) {
// //         setError("Failed to load data")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     loadData()
// //   }, [params.userid])

// //   if (loading) return <Loading />
// //   if (error) return <div>Error: {error}</div>
// //   if (!data?.success) return <div>No data found</div>

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case 'profile':
// //         return <ProfilePage data={data} userId={params.userid} />
// //       case 'reviews':
// //         return <ReviewsPage userId={params.userid} />
// //       case 'notifications':
// //         return <NotificationsPage userId={params.userid} />
// //       case 'bookmarks':
// //         return <BookmarksPage userId={params.userid} />
// //       case 'saved':
// //         return <div>Saved Content</div>
// //       default:
// //         return <ProfilePage data={data} userId={params.userid} />
// //     }
// //   }

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       <Sidebar 
// //         activeTab={activeTab} 
// //         onTabChange={setActiveTab}
// //         userData={data}
// //       />
// //       <div className="flex-1 md:pl-96 p-6 mt-16 md:mt-0">
// //         {renderContent()}
// //       </div>
// //     </div>
// //   )
// // }
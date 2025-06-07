
'use client'

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LineChart,
  FileText,
  FolderSearch,
  ArrowLeftRight,
  Shuffle,
  Star,
  UserCircle,
  LogOut,
  ChevronRight,
  X,
  File
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/authContext';

const SubMenuItem = ({ text, path, onClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;

  const handleClick = () => {
    router.push(path);
    onClick?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      <button
        onClick={handleClick}
        className={`group w-full pl-8 pr-3 py-2 flex items-center text-sm 
          ${isActive 
            ? "text-gray-900 font-medium" 
            : "text-gray-600 hover:text-gray-900"} 
          relative`}
      >
        <span className={`absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full 
          ${isActive 
            ? "bg-gray-900" 
            : "bg-gray-300 group-hover:bg-gray-900"} 
          transition-colors duration-200`} 
        />
        {text}
      </button>
    </motion.div>
  );
};

const MenuItem = ({ icon: Icon, text, path, subItems, subItemPaths, isActive, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if any subitem is active
  const isSubItemActive = subItemPaths?.some(subPath => pathname === subPath);

  const handleClick = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    } else if (path) {
      router.push(path);
      onClick?.();
    }
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <button 
          onClick={handleClick}
          className={`group w-full pl-4 pr-3 py-3 flex items-center gap-3 rounded-xl transition-all duration-300
            ${(isActive || isSubItemActive)
              ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/20" 
              : "text-gray-600 hover:bg-gray-50/80"}`}
        >
          <div className={`flex items-center justify-center transition-all duration-300 
            ${(isActive || isSubItemActive) ? "text-white" : "text-gray-500 group-hover:text-gray-800"}`}>
            <Icon size={20} strokeWidth={2} />
          </div>
          
          <span className={`font-medium transition-all duration-300
            ${(isActive || isSubItemActive) ? "text-white" : "text-gray-700 group-hover:text-gray-900"}`}>
            {text}
          </span>
          
          {subItems && (
            <div className={`ml-auto transition-transform duration-300 
              ${(isActive || isSubItemActive) ? "text-white" : "text-gray-400 group-hover:text-gray-600"}
              ${isOpen ? "rotate-90" : ""}`}>
              <ChevronRight size={16} />
            </div>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && subItems && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1 ml-6 relative before:absolute before:left-2.5 before:top-0 before:bottom-0 before:w-px before:bg-gray-200"
          >
            {subItems.map((item, index) => (
              <SubMenuItem
                key={index}
                text={item}
                path={subItemPaths[index]}
                onClick={onClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { 
      icon: LineChart, 
      text: 'Workflow Analysis', 
      path: '/legal_professionals/dashboard/workflow_analysis' 
    },
    { 
      icon: FileText, 
      text: 'Requirement Mapping', 
      path: '/legal_professionals/dashboard/requirement_mapping' 
    },
    { 
      icon: FolderSearch, 
      text: 'Tech Directory', 
      path: '/legal_professionals/dashboard/tech_directory' 
    },
    { 
      icon: ArrowLeftRight, 
      text: 'Comparison', 
      path: '/legal_professionals/dashboard/comparison' 
    },
    { 
      icon: Shuffle, 
      text: 'Change Management', 
      path: '/legal_professionals/dashboard/change_management' 
    },
    { 
      icon: File, 
      text: 'Create RFPs', 
      path: '/legal_professionals/dashboard/create_rfps' 
    },
    { 
      icon: Star, 
      text: 'Saved Resources',
      subItems: ['Bookmarks', 'Reviews', 'WorkFlow Reports', 'RFPs', 'Book My Calls'],
      subItemPaths: [
        '/legal_professionals/dashboard/bookmarks',
        '/legal_professionals/dashboard/reviews',
        '/legal_professionals/dashboard/workflow_reports',
        '/legal_professionals/dashboard/rfps',
        '/legal_professionals/dashboard/book_my_calls'
      ]
    },
    { 
      icon: UserCircle, 
      text: 'Profile', 
      path: '/legal_professionals/dashboard/profile' 
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/auth/user/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full relative">
      <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-md px-4 py-5 z-20">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-3 group px-2" 
            onClick={() => isMobile && setIsOpen(false)}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 mb-2 mt-4 ml-3"
            >
              <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
            </motion.div>
          </Link>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-24 pb-40">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              isActive={pathname === item.path}
              onClick={() => isMobile && setIsOpen(false)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 z-20">
        <motion.button 
          whileHover={{ x: 4 }}
          onClick={async () => {
            await handleLogout();
            isMobile && setIsOpen(false);
          }}
          className="w-full px-4 py-3 flex items-center gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 bottom-6 left-6 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50"
        >
          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <SidebarContent />
        </motion.div>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-4 left-4 bottom-4 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
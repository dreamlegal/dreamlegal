
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { IoIosNotificationsOutline } from "react-icons/io";
import Sidebar from './Sidebar';
import { useAuth } from '@/context/authContext';

const LegalProfessionalsLayout = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { userId, userType } = useAuth();
  console.log(userId, userType)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotifications();
    }
  };

  const fetchNotifications = async () => {
    
    try {
      const response = await fetch(`/api/get-user-notifications?userId=${userId}`);
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  
  

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (showNotifications && !event.target.closest('[data-notifications]')) {
  //       setShowNotifications(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [showNotifications]);

  const notificationRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  if (showNotifications) {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }
}, [showNotifications]);

  const NotificationButton = () => (
    <div className="relative" data-notifications>
      <button
        onClick={handleBellClick}
        className="h-10 w-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
      >
        <IoIosNotificationsOutline className="text-2xl" />
      </button>
      
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-gray-600">{notification.message}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="w-full px-4 h-16 flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* Push notification button to the right */}
            <div className="flex-1" />
            <NotificationButton />
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={isMobile} />
        
        {/* Main Content */}
        <div className="flex-1 min-h-screen md:ml-80">
          {/* Desktop Notification Bar */}
          {!isMobile && (
            <div className="fixed top-6 right-6 z-40">
              <NotificationButton />
            </div>
          )}

          {/* Page Content */}
          <main className="p-6 mt-20 md:mt-0 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LegalProfessionalsLayout;
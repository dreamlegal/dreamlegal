"use client"
import React, { useState, useEffect, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// import VendorSidebar from "/VendorSidebar";
import VendorSidebar from "./VendorSidebar";
import { useNewAuth } from '@/context/NewAuthContext';;

const VendorLayout = ({ children }) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
const { vendorId, userType } = useNewAuth();

  console.log(vendorId, userType)

  

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotifications();
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/get-notifications?vendorId=${vendorId}`);
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

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

  // const handleLogout = () => {
  //   localStorage.removeItem("vendorId");
  //   router.push("/sign-in");
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex">
      {/* Floating Sidebar */}
      <div className="fixed left-6 top-6 bottom-6 w-72 hidden md:block">
        <VendorSidebar selectedPath={router.pathname} />
      </div>
      
     
      <div className="flex-1 md:ml-80">
      <ScrollArea className="h-screen">
        <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  <RiMenu2Line className="text-2xl" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <VendorSidebar selectedPath={router.pathname} />
              </SheetContent>
            </Sheet>
          </div>

         
<div className="relative ml-auto">
  <button
    onClick={handleBellClick}
    className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100/80 text-blue-500 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200 ease-in-out"
  >
    <IoIosNotificationsOutline className="text-2xl" />
  </button>
  
  {showNotifications && (
    <div className="absolute right-0 mt-3 w-80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-100/80 overflow-hidden transform transition-all duration-200 ease-in-out">
      <div className="bg-gradient-to-r from-blue-50/50 to-white/90 backdrop-blur-sm border-b border-blue-100/80">
        <h3 className="font-medium px-5 py-4 text-blue-600">Notifications</h3>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="px-5 py-4 border-b border-blue-50/80 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200 ease-in-out group cursor-pointer"
            >
              <p className="text-gray-600 group-hover:text-blue-600 transition-colors">
                {notification.message}
              </p>
            </div>
          ))
        ) : (
          <div className="px-5 py-4 text-blue-400 text-center">
            No new notifications
          </div>
        )}
      </div>
    </div>
  )}
</div>
        </header>
        
        <main className="p-4">
          {children}
        </main>
      </ScrollArea>
    </div>
    </div>
  );
};

export default VendorLayout;
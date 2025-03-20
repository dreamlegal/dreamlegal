
"use client"
import React, { useState } from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { MdOutlineAddShoppingCart, MdRateReview, MdCall, MdTrendingUp, MdPeople, MdEmail ,} from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { ShoppingCart } from 'lucide-react'
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/authContext';

const SupportInfo = () => (
  <div className="p-4 bg-white rounded-xl shadow-md shadow-blue-500/10 border border-blue-100">
    <div className="space-y-3">
      <a 
        href="mailto:vendor@dreamlegal.in" 
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <MdEmail size={20} />
        <span className="text-sm">vendor@dreamlegal.in</span>
      </a>
      <a 
        href="tel:+919109507900" 
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <MdCall size={20} />
        <span className="text-sm">+91-91095-07900</span>
      </a>
    </div>
  </div>
);

const MenuItem = ({ item, isActive, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const router = useRouter();
  const pathname = usePathname();

  const hasActiveChild = item.subCategories?.some(sub => pathname === sub.path);

  const handleClick = () => {
    if (item.subCategories) {
      setIsOpen(!isOpen);
    } else if (item.path) {
      router.push(item.path);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="w-full mb-2">
      <button
        onClick={handleClick}
        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ease-in-out
          ${(!item.subCategories && isActive) || hasActiveChild
            ? "bg-white text-blue-600 shadow-lg shadow-blue-500/20 border border-blue-100" 
            : "bg-blue-50/10 text-blue-600 hover:bg-white hover:shadow-md hover:shadow-blue-500/10"
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`${(isActive && !item.subCategories) || hasActiveChild ? "text-blue-600" : "text-blue-500"}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </div>
          {item.subCategories && (
            <span className="text-blue-400">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </div>
      </button>
      {item.subCategories && isOpen && (
        <div className="ml-4 mt-2 space-y-2">
          {item.subCategories.map((subItem) => (
            <Link 
              key={subItem.name}
              href={subItem.path}
              className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out
                ${pathname === subItem.path
                  ? "bg-white text-blue-600 shadow-md shadow-blue-500/10 border border-blue-50"
                  : "bg-transparent text-blue-500 hover:bg-white hover:shadow-sm hover:shadow-blue-500/5"
                }`}
            >
              <span className="font-medium">{subItem.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const VendorSidebar = ({ className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/vendor/login');
  };

  const menuItems = [
    { 
      name: "Products", 
      icon: <MdOutlineAddShoppingCart size={20} />,
      subCategories: [
        { name: "All Products", path: "/tech_vendor/dashboard/all_products" },
        { name: "Add New Product", path: "/tech_vendor/dashboard/add_new_product" }
      ]
    },
    { 
      name: "Reviews", 
      icon: <MdRateReview size={20} />,
      path: "/tech_vendor/dashboard/reviews"
    },
    { 
      name: "Claim Products", 
      icon: <ShoppingCart size={20} />,
      path: "/tech_vendor/dashboard/claim_product"
    },
    { 
      name: "Leads",
      icon: <MdCall size={20} />,
      subCategories: [
        { name: "RFP", path: "/tech_vendor/dashboard/rfps" },
        { name: "Book My Call", path: "/tech_vendor/dashboard/call_leads" }
      ]
    },
    {
      name: "Trend and Analysis",
      icon: <MdTrendingUp size={20} />,
      path: "/tech_vendor/dashboard/trend_and_analysis"
    },
    {
      name: "Feature Validation",
      icon: <MdPeople size={20} />,
      path: "/tech_vendor/dashboard/feature_validation"
    },
    {
      name: "Client Prospecting",
      icon: <MdPeople size={20} />,
      path: "/tech_vendor/dashboard/client_prospecting"
    },
    { 
      name: "Profile", 
      icon: <RiProfileLine size={20} />,
      path: "/tech_vendor/dashboard/profile"
    },
    
  ];

  return (
    <div className={`h-full bg-gradient-to-b from-blue-50/80 to-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-500/10 border border-blue-100/80 p-6 ${className}`}>
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.2);
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(59, 130, 246, 0.4);
        }
      `}</style>
      
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 mb-6 ml-3">
          <a href="/" className="block">
            <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
          </a>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                isActive={pathname === item.path}
                defaultOpen={pathname?.includes(item.path) || item.subCategories?.some(sub => pathname === sub.path)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-4 mb-4">
          <SupportInfo />
        </div>

        <div className="pt-4 border-t border-blue-100">
          <MenuItem
            item={{
              name: "Logout",
              icon: <LogOut size={20} />,
              onClick: handleLogout
            }}
            isActive={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
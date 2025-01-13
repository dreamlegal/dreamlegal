"use client"
import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMenu2Line, RiDashboardLine, RiProfileLine } from "react-icons/ri";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MdOutlineAddShoppingCart, MdRateReview, MdCall } from "react-icons/md";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import VendorDashborad from "@/components/VendorDashborad";
import AddProduct from "@/components/AddProduct";
import AllProducts from "@/components/ui/AllProducts";
import VendorReview from "@/components/VendorReview";
import VendorProfile from "@/components/VendorProfile";
import VendorLeads from "@/components/VendorLeads";
import VendorRfps from "@/components/VendorRfps";
import VendorProposalGenerator from "@/components/VendorProposalGenerator";

// MenuItem Component
const MenuItem = ({ item, onMenuItemClick, selectedMenu, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleClick = () => {
    if (item.subCategories) {
      setIsOpen(!isOpen);
    } else {
      onMenuItemClick(item.name);
    }
  };

  const isSelected = selectedMenu === item.name || item.subCategories?.includes(selectedMenu);

  return (
    <div className="mb-3">
      <button
        onClick={handleClick}
        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ease-in-out
          ${isSelected 
            ? "bg-white text-blue-600 shadow-lg shadow-blue-500/20 border border-blue-100" 
            : "bg-blue-50/10 text-blue-600 hover:bg-white hover:shadow-md hover:shadow-blue-500/10"
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`${isSelected ? "text-blue-600" : "text-blue-500"}`}>
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
            <button
              key={subItem}
              onClick={() => onMenuItemClick(subItem)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out
                ${selectedMenu === subItem
                  ? "bg-white text-blue-600 shadow-md shadow-blue-500/10 border border-blue-50"
                  : "bg-transparent text-blue-500 hover:bg-white hover:shadow-sm hover:shadow-blue-500/5"
                }`}
            >
              <span className="font-medium">{subItem}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// VendorSidebar Component
const VendorSidebar = ({ onMenuItemClick, selectedMenu }) => {
  const menuItems = [
    { name: "Dashboard", icon: <RiDashboardLine size={20} /> },
    {
      name: "Products",
      icon: <MdOutlineAddShoppingCart size={20} />,
      subCategories: ["All Products", "Add Product"],
    },
    { name: "Review", icon: <MdRateReview size={20} /> },
    { name: "Book A Call", icon: <MdCall size={20} /> },
    { name: "RFPs", icon: <MdCall size={20} /> },
    { name: "Profile", icon: <RiProfileLine size={20} /> },
    { name: "Logout", icon: <RiProfileLine size={20} /> },
    {
      name: "Support",
      icon: <RiProfileLine size={20} />,
      subCategories: ["vendor@dreamlegal.in", "+91-91095-07900"],
    },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-blue-50/80 to-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-500/10 border border-blue-100/80 p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Menu</h2>
      </div>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            onMenuItemClick={onMenuItemClick}
            selectedMenu={selectedMenu}
            defaultOpen={item.name === "Products"}
          />
        ))}
      </div>
    </div>
  );
};

// NotificationsPanel Component
const NotificationsPanel = ({ notifications }) => {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white/80 backdrop-blur-xl shadow-xl rounded-xl border border-blue-100/80 overflow-hidden">
      <h3 className="font-bold p-4 border-b border-blue-100/80">
        Notifications
      </h3>
      <div className="max-h-72 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="p-4 border-b border-blue-50 hover:bg-blue-50/50 transition-colors"
            >
              {notification.message}
            </div>
          ))
        ) : (
          <div className="p-4 text-blue-400">No notifications</div>
        )}
      </div>
    </div>
  );
};

// Header Component
const Header = ({ onMenuClick, onBellClick, showNotifications, notifications }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-blue-100/80 sticky top-0 z-50">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="md:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  <RiMenu2Line className="text-2xl" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <VendorSidebar
                  onMenuItemClick={onMenuClick}
                  selectedMenu="Dashboard"
                />
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Dreamlegal
            </h1>
          </div>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Dreamlegal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/directory">
              <Button 
                variant="outline" 
                className="bg-white hover:bg-blue-600 hover:text-white border-blue-200 text-blue-600 transition-all duration-200"
              >
                Directory
              </Button>
            </Link>
            <div className="relative">
              <button
                onClick={onBellClick}
                className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
              >
                <IoIosNotificationsOutline className="text-2xl" />
              </button>
              {showNotifications && <NotificationsPanel notifications={notifications} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Main VendorDashboardPage Component
function VendorDashboardPage({ verified }) {
  const [selectedMenu, setSelectedMenu] = useState("All Products");
  const [vendorId, setVendorId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [getVendorId, setGetVendorId] = useState(null);
 
    useEffect(() => {
      setGetVendorId(localStorage.getItem("vendorId"));
    }, []);
  useEffect(() => {
    if (verified) {
      setSelectedMenu("Profile");
    } else {
      setSelectedMenu("All Products");
      setVendorId(localStorage.getItem("vendorId"));
    }
  }, [verified]);

  useEffect(() => {
    const fetchData = async () => {
      const storedVendorId = vendorId || localStorage.getItem("vendorId");
      if (storedVendorId) {
        try {
          const profileResponse = await fetch(`/api/company-info?id=${storedVendorId}`);
          const profileData = await profileResponse.json();
          setProfile(profileData.profile);

          const productsResponse = await fetch(`/api/get-products-userid`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: storedVendorId }),
          });
          const productsData = await productsResponse.json();
          if (productsData.success) {
            setProducts(productsData.products);
            if (productsData.products.length > 0) {
              setProductId(productsData.products[0].id);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [vendorId]);

  const handleMenuItemClick = (menuName) => {
    if (menuName === "Logout") {
      handleLogout();
    } else {
      setSelectedMenu(menuName);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorId");
    window.location.href = "/sign-in";
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

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotifications();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex">
      {/* Floating Sidebar */}
      <div className="fixed left-6 top-6 bottom-6 w-72 hidden md:block">
        <VendorSidebar
          onMenuItemClick={handleMenuItemClick}
          selectedMenu={selectedMenu}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-80">
        <ScrollArea className="h-screen">
          <Header 
            onMenuClick={handleMenuItemClick}
            onBellClick={handleBellClick}
            showNotifications={showNotifications}
            notifications={notifications}
          />
          
          <main className="max-w-full px-6 py-8">
            {selectedMenu === "Dashboard" && (
              <VendorDashborad productId={productId} allProducts={products} />
            )}
            {selectedMenu === "Add Product" && <AddProduct />}
            {selectedMenu === "All Products" && (
              <AllProducts userId={vendorId || getVendorId} />
            )}
            {selectedMenu === "Review" && (
              <VendorReview userId={vendorId || getVendorId} />
            )}
            {selectedMenu === "Book A Call" && (
              <VendorProposalGenerator />
            )}
            {selectedMenu === "RFPs" && (
              <VendorRfps userId={vendorId || getVendorId} />
            )}
            {selectedMenu === "Profile" && (
              <VendorProfile verified={verified} getProfile={profile} />
            )}
            {selectedMenu === "Support" && (
              <div className="p-6 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-blue-100/80">
                <h2 className="text-xl font-bold text-blue-600 mb-4">Support</h2>
                <p className="text-blue-600/80 mb-4">If you have any questions, feel free to reach out:</p>
                <p className="mb-2">Email: <a href="mailto:vendor@dreamlegal.in" className="text-blue-600 hover:text-blue-700">vendor@dreamlegal.in</a></p>
                <p>Phone: <span className="text-blue-600">+91-91095-07900</span></p>
              </div>
            )}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}

export default VendorDashboardPage;
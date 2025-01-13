
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
    <div className="mb-4"> {/* Increased bottom margin for more space between menu items */}
      <button
        onClick={handleClick}
        className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
          isSelected
            ? "bg-white text-blue-700 border-blue-700"
            : "bg-blue-600 text-white border-blue-800 hover:bg-blue-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.name}</span>
          </div>
          {item.subCategories && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </div>
      </button>
      {item.subCategories && isOpen && (
        <div className="ml-4 mt-2"> {/* Added margin-top for space between sub-categories */}
          {item.subCategories.map((subItem) => (
            <button
              key={subItem}
              onClick={() => onMenuItemClick(subItem)}
              className={`w-full text-left px-4 py-2 rounded-md mb-3 border transition-colors ${
                selectedMenu === subItem
                  ? "bg-white text-blue-700 border-blue-700"
                  : "bg-blue-600 text-white border-blue-800 hover:bg-blue-800"
              }`}
            >
              {subItem}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
    { name: "Logout", icon: <RiProfileLine size={20} /> }, // Add Logout Menu Item
    {
      name: "Support",
      icon: <RiProfileLine size={20} />, // Change icon if needed
      subCategories: ["vendor@dreamlegal.in", "+91-91095-07900"],
    },
  ];

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-10">Menu</h2>
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
  );
};

function VendorDashboardPage({ verified }) {
  const [selectedMenu, setSelectedMenu] = useState("All Products");
  const [vendorId, setVendorId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getVendorId =
    typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;

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
    // Redirect or refresh page as needed
    
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
    <div className="min-h-screen bg-white flex">
      <div className="w-64 bg-blue-700 text-white hidden md:block">
        <VendorSidebar
          onMenuItemClick={handleMenuItemClick}
          selectedMenu={selectedMenu}
        />
      </div>
      <div className="flex-1">
        <ScrollArea className="h-screen">
          <header className="bg-white shadow-md">
            <div className="max-w-full px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="md:hidden flex items-center gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="text-blue-700 hover:text-blue-800 transition-colors">
                        <RiMenu2Line className="text-2xl" />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-blue-700 text-white w-64">
                      <VendorSidebar
                        onMenuItemClick={handleMenuItemClick}
                        selectedMenu={selectedMenu}
                      />
                    </SheetContent>
                  </Sheet>
                  <h1 className="text-2xl font-bold text-gray-900">Dreamlegal</h1>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold text-gray-900">Dreamlegal</h1>
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/directory">
                    <Button variant="outline" className="hover:bg-blue-700 hover:text-white transition-colors">
                      Directory
                    </Button>
                  </Link>
                  <div className="relative">
                    <button
                      onClick={handleBellClick}
                      className="text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      <IoIosNotificationsOutline className="text-2xl" />
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                        <h3 className="font-bold p-3 bg-gray-100 border-b">Notifications</h3>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <div
                                key={index}
                                className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                              >
                                {notification.message}
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-gray-500">No notifications</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="max-w-full px-4 py-6">
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
              <VendorLeads userId={vendorId || getVendorId} />
            )}
            {selectedMenu === "RFPs" && (
              <VendorRfps userId={vendorId || getVendorId} />
            )}
            {selectedMenu === "Profile" && (
              <VendorProfile verified={verified} getProfile={profile} />
            )}
            {selectedMenu === "Support" && (
              <div className="p-4">
                <h2 className="text-lg font-bold">Support</h2>
                <p>If you have any questions, feel free to reach out:</p>
                <p>Email: <a href="mailto:vendor@dreamlegal.in" className="text-blue-600">vendor@dreamlegal.in</a></p>
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
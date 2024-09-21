"use client";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { AiOutlineTags } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { User } from 'lucide-react';
function VendorSidebar({ onMenuItemClick, selectedMenu }: any) {
  const [selectedItem, setSelectedItem] = useState("Products");
  const [Dashboard, setDashboard] = useState(false);
  const [Products, setProducts] = useState(true);
  const [Review, setReview] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [Logout, setLogout] = useState(false);
  const [Support, setSupport] = useState(false);
  const [BookACall, setBookACall] = useState(false);
  const router = useRouter();

  const handleMenuClick = (item: string) => {
    setSelectedItem(item);
    onMenuItemClick(item);
  };

  const handleReview = () => {
    setReview(!Review);
    handleMenuClick("Review");
  };

  const handleProfile = () => {
    setProfile(!Profile);
    handleMenuClick("Profile");
  };
  const handleBookACall = () => {
    setBookACall(!BookACall);
    handleMenuClick("BookACall");
  };

  const handlelogout = () => {
    localStorage.removeItem("vendorId");
    router.push("/");
    handleMenuClick("Logout");
  };
  return (
    <div className="bg-[#002C76] h-screen font-clarity px-4 py-6 flex flex-col">
      <h2 className="text-white text-xl font-bold">DreamLegal</h2>
      <div className="mt-10 flex flex-col flex-grow">
        <span className="text-slate-300"> Menu</span>
        <div className="flex flex-col flex-grow">
          <ul className="space-y-2 flex-grow">
            <li
              onClick={() => {
                setProducts(!Products);
                handleMenuClick("Products");
              }}
              className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                selectedItem === "Products"
                  ? "text-white bg-[#034b8a]"
                  : "text-slate-300"
              }`}
            >
              <span className={`flex gap-2 items-center `}>
                <AiOutlineTags className="text-xl" />
                Products
              </span>
              <FaChevronDown />
            </li>
            <li className="ml-10">
              <ul className={`space-y-2 ${Products ? "block" : "hidden"}`}>
                <li
                  onClick={() => handleMenuClick("AddProduct")}
                  className={`text-slate-300 hover:cursor-pointer ${
                    selectedItem === "AddProduct" ? "text-white" : ""
                  }`}
                >
                  Add Product
                </li>
                <li
                  onClick={() => handleMenuClick("allProducts")}
                  className={`text-slate-300 hover:cursor-pointer ${
                    selectedItem === "allProducts" ? "text-white" : ""
                  }`}
                >
                  All Products
                </li>
              </ul>
            </li>

            <li
              onClick={() => {
                setDashboard(!Dashboard);
                handleMenuClick("Dashboard");
              }}
              className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                selectedItem === "Dashboard"
                  ? "text-white bg-[#034b8a]"
                  : "text-slate-300"
              }`}
            >
              <span className={`flex gap-2 items-center `}>
                <LuLayoutDashboard className="text-xl" />
                Analytics
              </span>
              <FaChevronDown />
            </li>
            <li className="ml-10">
              <ul className={`space-y-2 ${Dashboard ? "block" : "hidden"}`}>
                <li
                  onClick={() => handleMenuClick("Dashboard")}
                  className={`text-slate-300 hover:cursor-pointer ${
                    selectedItem === "Dashboard" ? "text-white" : ""
                  }`}
                >
                  Product Analytics
                </li>
              </ul>
            </li>

            <li
              onClick={() => {
                 setBookACall(!BookACall);
                handleMenuClick("BookACall");
              }}
              className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                selectedItem === "BookACall"
                  ? "text-white bg-[#034b8a]"
                  : "text-slate-300"
              }`}
            >
              <span className={`flex gap-2 items-center `}>
                {/* <FaRegUserCircle className="text-xl" /> */}
                <User className= "text-xl"/>
                Leads
              </span>
            </li>
            <li
              onClick={() => {
                setReview(!Review);
                handleMenuClick("Review");
              }}
              className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                selectedItem === "Review"
                  ? "text-white bg-[#034b8a]"
                  : "text-slate-300"
              }`}
            >
              <span className={`flex gap-2 items-center `}>
                <FaRegStar className="text-xl" />
                Reviews
              </span>
            </li>

            <li
              onClick={() => {
                setProfile(!Profile);
                handleMenuClick("Profile");
              }}
              className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                selectedItem === "Profile"
                  ? "text-white bg-[#034b8a]"
                  : "text-slate-300"
              }`}
            >
              <span className={`flex gap-2 items-center `}>
                <FaRegUserCircle className="text-xl" />
                Profile
              </span>
            </li>
           

            <li
              onClick={() => {
                handlelogout();
                handleMenuClick("Logout");
              }}
              className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                selectedItem === "Logout"
                  ? "text-white bg-[#034b8a]"
                  : "text-slate-300"
              }`}
            >
              <span className={`flex gap-2 items-center `}>
                <CiLogout className="text-xl" />
                Logout
              </span>
            </li>
          </ul>
          <div className="mt-auto text-white">
            <ul className="space-y-2">
              <li
                onClick={() => {
                  setSupport(!Support);
                  handleMenuClick("Support");
                }}
                className={`flex justify-between text-sm items-center px-4 py-4 rounded-md transition-all duration-200 hover:cursor-pointer ${
                  selectedItem === "Support"
                    ? "text-white bg-[#034b8a]"
                    : "text-slate-300"
                }`}
              >
                <span className={`flex gap-2 items-center `}>
                  <FaRegUserCircle className="text-xl" />
                  Support
                </span>
                <FaChevronDown />
              </li>
              <li className="ml-10">
                <ul className={`space-y-2 ${Support ? "block" : "hidden"}`}>
                  <li className="text-slate-300"> vendor@dreamlegal.in</li>
                  <li className="text-slate-300">+91-91095-07900</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorSidebar;

"use client";

import AddAdmin from "@/components/AddAdmin";
import AddAnalytics from "@/components/AddAnalytics";
import AllAdmins from "@/components/AllAdmins";
import AllProductAdmin from "@/components/AllProductAdmin";
import AllProducts from "@/components/AllProducts";
import AllUsers from "@/components/AllUsers";
import NewProductAdmin from "@/components/NewProductAdmin";
import NewVendor from "@/components/NewVendor";
import SendNotification from "@/components/SendNotification";
import AdminSidebar from "@/components/ui/AdminSidebar";
import AdminLeads from "@/components/AdminLeads";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";

function WebAdmin() {
  const [selectedMenu, setSelectedMenu] = useState("NewProduct");
  const handleMenuItemClick = (menuName: string) => {
    setSelectedMenu(menuName);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-1">
          <div className="hidden md:block">
            {" "}
            <AdminSidebar
              onMenuItemClick={handleMenuItemClick}
              selectedMenu={selectedMenu}
            />
          </div>
        </div>
        <div className="col-span-4">
          <ScrollArea className=" h-screen">
            <div className=" w-full h-16 bg-white shadow mb-3  ">
              <div className=" w-full h-full flex items-center justify-between px-6">
                <div className="md:hidden">
                  <div className="flex items-center gap-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <button>
                          <RiMenu2Line className=" text-xl text-primary1" />
                        </button>
                      </SheetTrigger>
                      <SheetContent className="bg-[#002C76] text-white ">
                        <AdminSidebar
                          onMenuItemClick={handleMenuItemClick}
                          selectedMenu={selectedMenu}
                        />
                      </SheetContent>
                    </Sheet>
                    <div className=" font-bold text-xl ">Dreamlegal</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-5">
              {selectedMenu === "NewProduct" && <NewProductAdmin />}
              {selectedMenu === "AllProduct" && <AllProductAdmin />}
              {selectedMenu === "NewVendor" && <NewVendor />}
              {selectedMenu === "allProducts" && <AllProducts />}
              {selectedMenu === "allUsers" && <AllUsers />}
              {selectedMenu === "allAdmins" && <AllAdmins />}
              {selectedMenu === "addAdmin" && <AddAdmin />}
              {selectedMenu === "addAnalytics" && <AddAnalytics />}
              {selectedMenu === "sendNotification" && <SendNotification />}
              {selectedMenu === "adminLeads" && <AdminLeads/>}

              {/* {selectedMenu === "Dashboard" && <VendorDashborad />}
              {selectedMenu === "AddProduct" && <AddProduct />}
              {selectedMenu === "allProducts" && <AllProducts />}
              {selectedMenu === "Review" && <VendorReview />}
              {selectedMenu === "Profile" && (
                <VendorProfile verified={verified} getProfile={profile} />
              )} */}
            </div>{" "}
          </ScrollArea>
        </div>
      </div>
    </div>
  );

}

export default WebAdmin;
// "use client";

// import React, { useEffect, useState } from "react";
// import AddAdmin from "@/components/AddAdmin"; // Ensure this path is correct
// import AddAnalytics from "@/components/AddAnalytics"; // Ensure this path is correct
// import AllAdmins from "@/components/AllAdmins"; // Ensure this path is correct
// import AllProductAdmin from "@/components/AllProductAdmin"; // Ensure this path is correct
// import AllProducts from "@/components/AllProducts"; // Ensure this path is correct
// import AllUsers from "@/components/AllUsers"; // Ensure this path is correct
// import NewProductAdmin from "@/components/NewProductAdmin"; // Ensure this path is correct
// import NewVendor from "@/components/NewVendor"; // Ensure this path is correct
// import SendNotification from "@/components/SendNotification"; // Ensure this path is correct
// import AdminLeads from "@/components/AdminLeads"; // Ensure this path is correct
// import AdminSidebar from "@/components/ui/AdminSidebar"; // Ensure this path is correct
// import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this path is correct
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Ensure this path is correct
// import { RiMenu2Line } from "react-icons/ri";
// import { MdOutlineAddShoppingCart } from "react-icons/md"; 
// import { RiProfileLine } from "react-icons/ri"; 

// import {  MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"; // Updated imports
//  // Importing Chevron icons

// const MenuItem = ({ item, onMenuItemClick, selectedMenu, defaultOpen }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);

//   const handleClick = () => {
//     if (item.subCategories) {
//       setIsOpen(!isOpen);
//     } else {
//       onMenuItemClick(item.name);
//     }
//   };

//   const isSelected = selectedMenu === item.name || item.subCategories?.includes(selectedMenu);

//   return (
//     <div className="mb-4">
//       <button
//         onClick={handleClick}
//         className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
//           isSelected
//             ? "bg-white text-blue-700 border-blue-700"
//             : "bg-blue-600 text-white border-blue-800 hover:bg-blue-800"
//         }`}
//       >
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {item.icon}
//             <span>{item.name}</span>
//           </div>
         
//           {item.subCategories && (isOpen ? <MdKeyboardArrowDown size={16} /> : <MdKeyboardArrowRight size={16} />)} {/* Updated icon usage */}
//         </div>
//       </button>
//       {item.subCategories && isOpen && (
//         <div className="ml-4 mt-2">
//           {item.subCategories.map((subItem) => (
//             <button
//               key={subItem}
//               onClick={() => onMenuItemClick(subItem)}
//               className={`w-full text-left px-4 py-2 rounded-md mb-3 border transition-colors ${
//                 selectedMenu === subItem
//                   ? "bg-white text-blue-700 border-blue-700"
//                   : "bg-blue-600 text-white border-blue-800 hover:bg-blue-800"
//               }`}
//             >
//               {subItem}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// function WebAdmin() {
//   const [selectedMenu, setSelectedMenu] = useState("NewProduct");

//   const handleMenuItemClick = (menuName) => {
//     setSelectedMenu(menuName);
//   };

  
  
//   const menuItems = [
//     { name: "New Product", icon: <MdOutlineAddShoppingCart size={20} /> },
//     {
//       name: "Products",
//       icon: <MdOutlineAddShoppingCart size={20} />,
//       subCategories: ["All Product", "New Product"],
//     },
    
//     {
//       name: "Vendors",
//       icon: <RiProfileLine size={20} />,
//       subCategories: ["New Vendor", "All Vendors"],
//     },
  
//     {
//       name: "Users",
//       icon: <RiProfileLine size={20} />,
//       subCategories: ["All Users"],
//     },
  
//     {
//       name: "Admin",
//       icon: <RiProfileLine size={20} />,
//       subCategories: [
//         "All Admins",
//         "Add Admin",
//         "Add Analytics",
//         "Send Notification",
//         "Admin Leads"
//       ],
//     },
//   ];
  

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-5">
//         <div className="col-span-1">
//           <div className="hidden md:block">
//           <div className="p-4 text-white bg-[#002C76]"> {/* Updated background color */}
//               <h2 className="text-xl font-bold mb-10">Admin Menu</h2>
//               {menuItems.map((item) => (
//                 <MenuItem
//                   key={item.name}
//                   item={item}
//                   onMenuItemClick={handleMenuItemClick}
//                   selectedMenu={selectedMenu}
//                   defaultOpen={item.name === "Products"}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="col-span-4">
//           <ScrollArea className="h-full">
//             <div className="w-full h-16 bg-white shadow mb-3">
//               <div className="w-full h-full flex items-center justify-between px-6">
//                 <div className="md:hidden">
//                   <div className="flex items-center gap-4">
//                     <Sheet>
//                       <SheetTrigger asChild>
//                         <button>
//                           <RiMenu2Line className="text-xl text-primary1" />
//                         </button>
//                       </SheetTrigger>
//                       <SheetContent className="bg-[#002C76] text-white">
//                         <AdminSidebar
//                           onMenuItemClick={handleMenuItemClick}
//                           selectedMenu={selectedMenu}
//                         />
//                       </SheetContent>
//                     </Sheet>
//                     <div className="font-bold text-xl">Dreamlegal</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="px-5">
//               {selectedMenu === "New Product" && <NewProductAdmin />}
//               {selectedMenu === "All Product" && <AllProductAdmin />}
//               {selectedMenu === "New Vendor" && <NewVendor />}
//               {selectedMenu === "All Users" && <AllUsers />}
//               {selectedMenu === "All Admins" && <AllAdmins />}
//               {selectedMenu === "Add Admin" && <AddAdmin />}
//               {selectedMenu === "Add Analytics" && <AddAnalytics />}
//               {selectedMenu === "Send Notification" && <SendNotification />}
//               {selectedMenu === "Admin Leads" && <AdminLeads />}
//             </div>
//           </ScrollArea>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WebAdmin;




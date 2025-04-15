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
import AdminProductCreation from "@/components/AdminProductCreation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import  AdminBlogs from "@/components/AdminBlogs";
import AdminProductClaimsPage from "@/components/admin/AdminProductClaimsPage"
import VendorsPage from "./admin/VendorManagement";
import UsersPage  from "./admin/UserManagement"
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
              {selectedMenu === "AdminProductCreation" && <AdminProductCreation />}
              {selectedMenu === "AdminProductClaimsPage" && <AdminProductClaimsPage />}
              {selectedMenu === "allUsers" && <AllUsers />}
              {selectedMenu === "allAdmins" && <AllAdmins />}
              {selectedMenu === "addAdmin" && <AddAdmin />}
              {selectedMenu === "addAnalytics" && <AddAnalytics />}
              {selectedMenu === "sendNotification" && <SendNotification />}
              {selectedMenu === "adminLeads" && <AdminLeads/>}
              {selectedMenu === "adminblog" && <AdminBlogs/>}
              {selectedMenu === "VendorsPage" && <VendorsPage/>}
              {selectedMenu === "UsersPage " && <UsersPage />}

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

"use client";
import AddProduct from "@/components/AddProduct";
import ProductInfo from "@/components/ProductInfo";
import VendorDashborad from "@/components/VendorDashborad";
import VendorProfile from "@/components/VendorProfile";
import VendorReview from "@/components/VendorReview";
import VendorSidebar from "@/components/VendorSidebar";
import AllProducts from "@/components/ui/AllProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { useFormContext } from "@/context/formValueContext";

import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";

function Page() {
  const { formValues, setFormValues } = useFormContext();
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("ProductInfo");
  const [profile, setProfile] = useState<any>(null);
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    const storedVendorId = localStorage.getItem("vendorId");
  }, []);

  const [userId, setUserId] = useState<string | null>(null);
  const id = formValues?.id;

  const handleMenuItemClick = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  useEffect(() => {
    // Access localStorage only in client-side
    const storedUserId = localStorage.getItem("vendorId");
    setUserId(storedUserId);

    const fetchProduct = async () => {
      if (!storedUserId || !id) {
        console.error("User ID or Product ID is missing");
        return;
      }

      try {
        const response = await fetch("/api/vendor-product-detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: storedUserId, id }),
        });

        const data = await response.json();

        if (data.success) {
          const product = data.product;
          setFormValues((prevValues: any) => ({
            ...prevValues,
            ...product,
          }));
        } else {
          console.error(data.msg);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (storedUserId) {
      fetchProduct();
    }
  }, [id, setFormValues]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-1">
            <div className="hidden md:block">
              {" "}
              <VendorSidebar
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
                          <VendorSidebar
                            onMenuItemClick={handleMenuItemClick}
                            selectedMenu={selectedMenu}
                          />
                        </SheetContent>
                      </Sheet>
                      <div className=" font-bold text-xl ">Dreamlegal</div>
                    </div>
                  </div>

                  

                  <IoIosNotificationsOutline className=" ml-auto text-2xl" />
                 

                 
                </div>
              </div>
              <div className=" px-5">
                {selectedMenu === "Dashboard" && <VendorDashborad userId={vendorId!} />}
                {selectedMenu === "AddProduct" && <AddProduct />}
                {selectedMenu === "allProducts" && <AllProducts userId={vendorId!} />}
                {selectedMenu === "Review" && <VendorReview userId={vendorId!} />}
                {selectedMenu === "Profile" && (
                  <VendorProfile verified={false} getProfile={profile} />
                )}
                {selectedMenu === "ProductInfo" && (
                  <ProductInfo editing={true} />
                )}
              </div>{" "}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div> </div>
    </div>
  );
}

export default Page;

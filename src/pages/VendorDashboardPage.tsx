import { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import VendorSidebar from "@/components/VendorSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import VendorDashborad from "@/components/VendorDashborad";
import AddProduct from "@/components/AddProduct";
import AllProducts from "@/components/ui/AllProducts";
import VendorReview from "@/components/VendorReview";
import VendorProfile from "@/components/VendorProfile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiMenu2Line } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookACallForm from "@/components/BookACallForm";
import VendorLeads from "@/components/VendorLeads";
function VendorDashboardPage({ verified }: { verified: boolean }) {
  const [selectedMenu, setSelectedMenu] = useState("allProducts");
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getVendorId =
    typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;

  useEffect(() => {
    if (verified) {
      setSelectedMenu("Profile");
    } else {
      setSelectedMenu("allProducts");
      setVendorId(localStorage.getItem("vendorId"));
    }
  }, [verified]);

  useEffect(() => {
    if (vendorId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/company-info?id=${vendorId}`);
          const data = await response.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();

      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/get-products-userid`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: vendorId }),
          });
          const data = await response.json();
          if (data.success) {
            setProducts(data.products);
            if (data.products.length > 0) {
              setProductId(data.products[0].id); // Set the first product ID as default
            }
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    } else {
      const storedVendorId = localStorage.getItem("vendorId");
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `/api/company-info?id=${storedVendorId}`
          );
          const data = await response.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [vendorId]);

  const handleMenuItemClick = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductId(event.target.value);
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `/api/get-notifications?vendorId=${vendorId}`
      );
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-1">
          <div className="hidden md:block">
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

                <div className="relative ml-auto flex items-center gap-4">
                  <Link href={"/directory"}>
                    <Button variant={"outline"}>Directory</Button>
                  </Link>
                  <IoIosNotificationsOutline
                    className="text-2xl cursor-pointer"
                    onClick={handleBellClick}
                  />
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                      <h3 className="font-bold mb-2 border-b">Notifications</h3>
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <div
                            key={index}
                            className="mb-2 p-1 border-b border-gray-200 hover:bg-neutral-300 rounded"
                          >
                            {notification.message}
                          </div>
                        ))
                      ) : (
                        <div>No notifications</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" px-5">
              {selectedMenu === "Dashboard" && (
                <VendorDashborad
                  productId={productId!}
                  allProducts={products}
                />
              )}
              {selectedMenu === "AddProduct" && <AddProduct />}
              {selectedMenu === "allProducts" && (
                <AllProducts userId={vendorId! || getVendorId!} />
              )}
              {selectedMenu === "Review" && (
                <VendorReview userId={vendorId! || getVendorId!} />
              )}
              {selectedMenu === "BookACall" && (
                <VendorLeads userId={vendorId! || getVendorId!} />
              )}
              {selectedMenu === "Profile" && (
                <VendorProfile verified={verified} getProfile={profile} />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboardPage;

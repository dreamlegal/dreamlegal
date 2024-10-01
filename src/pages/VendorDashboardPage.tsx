// import { useEffect, useState } from "react";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import VendorSidebar from "@/components/VendorSidebar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import VendorDashborad from "@/components/VendorDashborad";
// import AddProduct from "@/components/AddProduct";
// import AllProducts from "@/components/ui/AllProducts";
// import VendorReview from "@/components/VendorReview";
// import VendorProfile from "@/components/VendorProfile";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { RiMenu2Line } from "react-icons/ri";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import BookACallForm from "@/components/BookACallForm";
// import VendorLeads from "@/components/VendorLeads";
// function VendorDashboardPage({ verified }: { verified: boolean }) {
//   const [selectedMenu, setSelectedMenu] = useState("allProducts");
//   const [vendorId, setVendorId] = useState<string | null>(null);
//   const [profile, setProfile] = useState<any>(null);
//   const [productId, setProductId] = useState<string | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const getVendorId =
//     typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;

//   useEffect(() => {
//     if (verified) {
//       setSelectedMenu("Profile");
//     } else {
//       setSelectedMenu("allProducts");
//       setVendorId(localStorage.getItem("vendorId"));
//     }
//   }, [verified]);

//   useEffect(() => {
//     if (vendorId) {
//       const fetchProfile = async () => {
//         try {
//           const response = await fetch(`/api/company-info?id=${vendorId}`);
//           const data = await response.json();
//           setProfile(data.profile);
//         } catch (error) {
//           console.error("Error fetching profile:", error);
//         }
//       };

//       fetchProfile();

//       const fetchProducts = async () => {
//         try {
//           const response = await fetch(`/api/get-products-userid`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ userId: vendorId }),
//           });
//           const data = await response.json();
//           if (data.success) {
//             setProducts(data.products);
//             if (data.products.length > 0) {
//               setProductId(data.products[0].id); // Set the first product ID as default
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         }
//       };

//       fetchProducts();
//     } else {
//       const storedVendorId = localStorage.getItem("vendorId");
//       const fetchProfile = async () => {
//         try {
//           const response = await fetch(
//             `/api/company-info?id=${storedVendorId}`
//           );
//           const data = await response.json();
//           setProfile(data.profile);
//         } catch (error) {
//           console.error("Error fetching profile:", error);
//         }
//       };
//       fetchProfile();
//     }
//   }, [vendorId]);

//   const handleMenuItemClick = (menuName: string) => {
//     setSelectedMenu(menuName);
//   };

//   const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setProductId(event.target.value);
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(
//         `/api/get-notifications?vendorId=${vendorId}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setNotifications(data.notifications);
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const handleBellClick = () => {
//     setShowNotifications(!showNotifications);
//     if (!showNotifications) {
//       fetchNotifications();
//     }
//   };

//   return (
//     // <div>
//     //   <div className="grid grid-cols-1 md:grid-cols-5">
//     //     <div className="col-span-1">
//     //       <div className="hidden md:block">
//     //         <VendorSidebar
//     //           onMenuItemClick={handleMenuItemClick}
//     //           selectedMenu={selectedMenu}
//     //         />
//     //       </div>
//     //     </div>
//     //     <div className="col-span-4">
//     //       <ScrollArea className=" h-screen">
//     //         <div className=" w-full h-16 bg-white shadow mb-3  ">
//     //           <div className=" w-full h-full flex items-center justify-between px-6">
//     //             <div className="md:hidden">
//     //               <div className="flex items-center gap-4">
//     //                 <Sheet>
//     //                   <SheetTrigger asChild>
//     //                     <button>
//     //                       <RiMenu2Line className=" text-xl text-primary1" />
//     //                     </button>
//     //                   </SheetTrigger>
//     //                   <SheetContent className="bg-[#002C76] text-white ">
//     //                     <VendorSidebar
//     //                       onMenuItemClick={handleMenuItemClick}
//     //                       selectedMenu={selectedMenu}
//     //                     />
//     //                   </SheetContent>
//     //                 </Sheet>
//     //                 <div className=" font-bold text-xl ">Dreamlegal</div>
//     //               </div>
//     //             </div>

//     //             <div className="relative ml-auto flex items-center gap-4">
//     //               <Link href={"/directory"}>
//     //                 <Button variant={"outline"}>Directory</Button>
//     //               </Link>
//     //               <IoIosNotificationsOutline
//     //                 className="text-2xl cursor-pointer"
//     //                 onClick={handleBellClick}
//     //               />
//     //               {showNotifications && (
//     //                 <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
//     //                   <h3 className="font-bold mb-2 border-b">Notifications</h3>
//     //                   {notifications.length > 0 ? (
//     //                     notifications.map((notification, index) => (
//     //                       <div
//     //                         key={index}
//     //                         className="mb-2 p-1 border-b border-gray-200 hover:bg-neutral-300 rounded"
//     //                       >
//     //                         {notification.message}
//     //                       </div>
//     //                     ))
//     //                   ) : (
//     //                     <div>No notifications</div>
//     //                   )}
//     //                 </div>
//     //               )}
//     //             </div>
//     //           </div>
//     //         </div>
//     //         <div className=" px-5">
//     //           {selectedMenu === "Dashboard" && (
//     //             <VendorDashborad
//     //               productId={productId!}
//     //               allProducts={products}
//     //             />
//     //           )}
//     //           {selectedMenu === "AddProduct" && <AddProduct />}
//     //           {selectedMenu === "allProducts" && (
//     //             <AllProducts userId={vendorId! || getVendorId!} />
//     //           )}
//     //           {selectedMenu === "Review" && (
//     //             <VendorReview userId={vendorId! || getVendorId!} />
//     //           )}
//     //           {selectedMenu === "BookACall" && (
//     //             <VendorLeads userId={vendorId! || getVendorId!} />
//     //           )}
//     //           {selectedMenu === "Profile" && (
//     //             <VendorProfile verified={verified} getProfile={profile} />
//     //           )}
//     //         </div>
//     //       </ScrollArea>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="min-h-screen bg-gray-100">
//     <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//       <div className="col-span-1 bg-white shadow-md">
//         <div className="hidden md:block h-full">
//           <VendorSidebar
//             onMenuItemClick={handleMenuItemClick}
//             selectedMenu={selectedMenu}
//           />
//         </div>
//       </div>
//       <div className="col-span-1 md:col-span-4">
//         <ScrollArea className="h-screen">
//           <header className="bg-white shadow-md mb-6">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="md:hidden flex items-center gap-4">
//                   <Sheet>
//                     <SheetTrigger asChild>
//                       <button className="text-primary1 hover:text-primary1-dark transition-colors">
//                         <RiMenu2Line className="text-2xl" />
//                       </button>
//                     </SheetTrigger>
//                     <SheetContent side="left" className="bg-[#002C76] text-white w-64">
//                       <VendorSidebar
//                         onMenuItemClick={handleMenuItemClick}
//                         selectedMenu={selectedMenu}
//                       />
//                     </SheetContent>
//                   </Sheet>
//                   <h1 className="text-2xl font-bold text-gray-900">Dreamlegal</h1>
//                 </div>
//                 <div className="hidden md:block">
//                   <h1 className="text-2xl font-bold text-gray-900">Dreamlegal</h1>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Link href="/directory">
//                     <Button variant="outline" className="hover:bg-primary1 hover:text-white transition-colors">
//                       Directory
//                     </Button>
//                   </Link>
//                   <div className="relative">
//                     <button
//                       onClick={handleBellClick}
//                       className="text-gray-600 hover:text-primary1 transition-colors"
//                     >
//                       <IoIosNotificationsOutline className="text-2xl" />
//                     </button>
//                     {showNotifications && (
//                       <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
//                         <h3 className="font-bold p-3 bg-gray-100 border-b">Notifications</h3>
//                         <div className="max-h-64 overflow-y-auto">
//                           {notifications.length > 0 ? (
//                             notifications.map((notification, index) => (
//                               <div
//                                 key={index}
//                                 className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
//                               >
//                                 {notification.message}
//                               </div>
//                             ))
//                           ) : (
//                             <div className="p-3 text-gray-500">No notifications</div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>
//           <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             {selectedMenu === "Dashboard" && (
//               <VendorDashborad productId={productId} allProducts={products} />
//             )}
//             {selectedMenu === "AddProduct" && <AddProduct />}
//             {selectedMenu === "allProducts" && (
//               <AllProducts userId={vendorId || getVendorId} />
//             )}
//             {selectedMenu === "Review" && (
//               <VendorReview userId={vendorId || getVendorId} />
//             )}
//             {selectedMenu === "BookACall" && (
//               <VendorLeads userId={vendorId || getVendorId} />
//             )}
//             {selectedMenu === "Profile" && (
//               <VendorProfile verified={verified} getProfile={profile} />
//             )}
//           </main>
//         </ScrollArea>
//       </div>
//     </div>
//   </div>
//   );
// }

// export default VendorDashboardPage;
// import React, { useEffect, useState } from "react";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { RiMenu2Line } from "react-icons/ri";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import VendorDashborad from "@/components/VendorDashborad";
// import AddProduct from "@/components/AddProduct";
// import AllProducts from "@/components/ui/AllProducts";
// import VendorReview from "@/components/VendorReview";
// import VendorProfile from "@/components/VendorProfile";
// import VendorLeads from "@/components/VendorLeads";

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
//     <div className="mb-2">
//       <button
//         onClick={handleClick}
//         className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
//           isSelected
//             ? "bg-white text-blue-700"
//             : "text-white hover:bg-blue-800"
//         }`}
//       >
//         <div className="flex items-center justify-between">
//           <span>{item.name}</span>
//           {item.subCategories && (
//             isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
//           )}
//         </div>
//       </button>
//       {item.subCategories && isOpen && (
//         <div className="ml-4 mt-1">
//           {item.subCategories.map((subItem) => (
//             <button
//               key={subItem}
//               onClick={() => onMenuItemClick(subItem)}
//               className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
//                 selectedMenu === subItem
//                   ? "bg-white text-blue-700"
//                   : "text-white hover:bg-blue-800"
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

// const VendorSidebar = ({ onMenuItemClick, selectedMenu }) => {
//   const menuItems = [
//     { name: "Dashboard" },
//     { name: "Products", subCategories: ["All Products", "Add Product"] },
//     { name: "Review" },
//     { name: "Book A Call" },
//     { name: "Profile" },
//   ];

//   return (
//     <div className="p-4 text-white">
//       <h2 className="text-xl font-bold mb-4">Menu</h2>
//       {menuItems.map((item) => (
//         <MenuItem
//           key={item.name}
//           item={item}
//           onMenuItemClick={onMenuItemClick}
//           selectedMenu={selectedMenu}
//           defaultOpen={item.name === "Products"}
//         />
//       ))}
//     </div>
//   );
// };

// function VendorDashboardPage({ verified }) {
//   const [selectedMenu, setSelectedMenu] = useState("All Products");
//   const [vendorId, setVendorId] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [productId, setProductId] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const getVendorId =
//     typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;

//   useEffect(() => {
//     if (verified) {
//       setSelectedMenu("Profile");
//     } else {
//       setSelectedMenu("All Products");
//       setVendorId(localStorage.getItem("vendorId"));
//     }
//   }, [verified]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const storedVendorId = vendorId || localStorage.getItem("vendorId");
//       if (storedVendorId) {
//         try {
//           const profileResponse = await fetch(`/api/company-info?id=${storedVendorId}`);
//           const profileData = await profileResponse.json();
//           setProfile(profileData.profile);

//           const productsResponse = await fetch(`/api/get-products-userid`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ userId: storedVendorId }),
//           });
//           const productsData = await productsResponse.json();
//           if (productsData.success) {
//             setProducts(productsData.products);
//             if (productsData.products.length > 0) {
//               setProductId(productsData.products[0].id);
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [vendorId]);

//   const handleMenuItemClick = (menuName) => {
//     setSelectedMenu(menuName);
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(`/api/get-notifications?vendorId=${vendorId}`);
//       const data = await response.json();
//       if (data.success) {
//         setNotifications(data.notifications);
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const handleBellClick = () => {
//     setShowNotifications(!showNotifications);
//     if (!showNotifications) {
//       fetchNotifications();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex">
//       <div className="w-64 bg-blue-700 text-white hidden md:block">
//         <VendorSidebar
//           onMenuItemClick={handleMenuItemClick}
//           selectedMenu={selectedMenu}
//         />
//       </div>
//       <div className="flex-1">
//         <ScrollArea className="h-screen">
//           <header className="bg-white shadow-md">
//             <div className="max-w-full px-4 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="md:hidden flex items-center gap-4">
//                   <Sheet>
//                     <SheetTrigger asChild>
//                       <button className="text-blue-700 hover:text-blue-800 transition-colors">
//                         <RiMenu2Line className="text-2xl" />
//                       </button>
//                     </SheetTrigger>
//                     <SheetContent side="left" className="bg-blue-700 text-white w-64">
//                       <VendorSidebar
//                         onMenuItemClick={handleMenuItemClick}
//                         selectedMenu={selectedMenu}
//                       />
//                     </SheetContent>
//                   </Sheet>
//                   <h1 className="text-2xl font-bold text-gray-900">Dreamlegal</h1>
//                 </div>
//                 <div className="hidden md:block">
//                   <h1 className="text-2xl font-bold text-gray-900">Dreamlegal</h1>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Link href="/directory">
//                     <Button variant="outline" className="hover:bg-blue-700 hover:text-white transition-colors">
//                       Directory
//                     </Button>
//                   </Link>
//                   <div className="relative">
//                     <button
//                       onClick={handleBellClick}
//                       className="text-gray-600 hover:text-blue-700 transition-colors"
//                     >
//                       <IoIosNotificationsOutline className="text-2xl" />
//                     </button>
//                     {showNotifications && (
//                       <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
//                         <h3 className="font-bold p-3 bg-gray-100 border-b">Notifications</h3>
//                         <div className="max-h-64 overflow-y-auto">
//                           {notifications.length > 0 ? (
//                             notifications.map((notification, index) => (
//                               <div
//                                 key={index}
//                                 className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
//                               >
//                                 {notification.message}
//                               </div>
//                             ))
//                           ) : (
//                             <div className="p-3 text-gray-500">No notifications</div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>
//           <main className="max-w-full px-4 py-6">
//             {selectedMenu === "Dashboard" && (
//               <VendorDashborad productId={productId} allProducts={products} />
//             )}
//             {selectedMenu === "Add Product" && <AddProduct />}
//             {selectedMenu === "All Products" && (
//               <AllProducts userId={vendorId || getVendorId} />
//             )}
//             {selectedMenu === "Review" && (
//               <VendorReview userId={vendorId || getVendorId} />
//             )}
//             {selectedMenu === "Book A Call" && (
//               <VendorLeads userId={vendorId || getVendorId} />
//             )}
//             {selectedMenu === "Profile" && (
//               <VendorProfile verified={verified} getProfile={profile} />
//             )}
//           </main>
//         </ScrollArea>
//       </div>
//     </div>
//   );
// }

// export default VendorDashboardPage;

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
    { name: "Profile", icon: <RiProfileLine size={20} /> },
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
    setSelectedMenu(menuName);
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
            {selectedMenu === "Profile" && (
              <VendorProfile verified={verified} getProfile={profile} />
            )}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}

export default VendorDashboardPage;

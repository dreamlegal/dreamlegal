// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { FaBookmark } from "react-icons/fa6";
// import { FiShare2 } from "react-icons/fi";
// import { FaStar } from "react-icons/fa6";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "./ui/button";
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
//   LinkedinShareButton,
//   LinkedinIcon,
//   RedditShareButton,
//   RedditIcon,
//   TelegramShareButton,
//   TelegramIcon,
// } from "next-share";
// import { data } from "@/app/(home)/category/_components/data";
// const userCategories = [
//   { name: "Law firms", icon: "/lawfirmicon.svg" },
//   { name: "Individual Practitioner", icon: "/prac.svg" },
//   { name: "Government departments", icon: "/govdepticon.svg" },
//   { name: "Startups", icon: "/startupicon.svg" },
//   { name: "Enterprises", icon: "/enterpriceicon.svg" },
//   { name: "Judiciary", icon: "/judge1.svg" },
//   { name: "In-House Counsels", icon: "/lawyers.svg" },
// ];

// function NormalProduct({
//   id,
//   image,
//   title,
//   description,
//   category,
//   product,
// }: any) {
//   const userId =
//     typeof window !== "undefined" && localStorage.getItem("userId");
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   useEffect(() => {
//     // Fetch initial bookmark status if needed
//     // This can be an API call to check if the product is already bookmarked by the user
//   }, []);

//   useEffect(() => {
//     const checkBookmark = async () => {
//       if (!userId) return;

//       try {
//         const response = await fetch("/api/check-bookmark", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId, productId: id }),
//         });

//         if (response.ok) {
//           const result = await response.json();
//           setIsBookmarked(result.isBookmarked);
//         }
//       } catch (error) {
//         console.error("Error checking bookmark", error);
//       }
//     };

//     checkBookmark();
//   }, [userId, id]);
 
 

//   const handleBookmarkClick = async () => {
//     if (!userId) {
//       alert("Please log in to bookmark products");
//       return;
//     }

//     try {
//       const response = await fetch("/api/save-product", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, productId: id }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(!isBookmarked);
//         alert(result.message);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error("Error bookmarking product", error);
//       alert("Failed to bookmark product");
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         alert("Copied to clipboard!");
//       })
//       .catch((error) => {
//         console.error("Failed to copy to clipboard: ", error);
//       });
//   };

//   // const userCategoryIcons = product.userCategory
//   //   .map((userCat: any) => {
//   //     const categoryObj = userCategories.find((cat) => cat.name === userCat);
//   //     return categoryObj ? categoryObj : null;
//   //   })
//   //   .filter(Boolean); // Filter out null values

//   const industries = product.industry;
//   const isOdd = industries.length % 2 !== 0;

//   console.log(product);

//   const [ratings, setRatings] = useState({
//     overallRating: 0,
//     message: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRatings = async (id: any) => {
//       try {
//         const response = await fetch("/api/cal-review", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ productId: id }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("data rating", data);

//         // Update the state with the fetched data
//         if (data.message === "No reviews found for this product") {
//           setRatings({
//             overallRating: 0,
//             message: "No reviews found for this product",
//           });
//         } else {
//           setRatings(data);
//         }
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (product && product.id) {
//       fetchRatings(product.id);
//     } else {
//       setLoading(false);
//       setError("Product ID is missing.");
//     }
//   }, [product]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   const { overallRating } = ratings;

//   // Round the overall rating
//   const roundedOverallRating = (overallRating ?? 0).toFixed(1);
//   const parseUserCategory = (category) => {
//     const [name, ,] = category.split("|"); // Extract only the first part which is the name
//     return name;
//   };

//   // Map the user categories to match the parsed name with the appropriate icon
//   const userCategoryIcons = product.userCategory
//     .map((category) => {
//       const parsedCategory = parseUserCategory(category); // Get the name part
//       const categoryObj = userCategories.find(
//         (cat) => cat.name === parsedCategory
//       ); // Find matching category object from predefined list
//       return categoryObj || null; // Return matching object or null if not found
//     })
//     .filter(Boolean); // Filter out any null values

//   return (
//     <div className="w-full px-10 py-7  rounded-xl border  font-clarity bg-gray-50 border-gray-300 shadow-md">
//       <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
//         <div className="flex gap-4 items-center">
//           <img
//             src={image}
//             className="w-14 h-14 rounded-full shadow-blue-50 shadow-sm"
//             alt=""
//           />
//           <div className="flex flex-col gap-1 ml-1">
//             <div>
//               <h3 className="font-bold text-base">{title}</h3>
//             </div>
//             {/* <div className="px-2 py-1 bg-primary2 rounded-full">
//               {" "}
//               <span className="text-xs text-primary1 font-bold">
//                 {category}
//               </span>
//             </div> */}
//             <div className="flex flex-col">
//             {category
//   .reduce((rows, cat, index) => {
//     if (index % 2 === 0) rows.push([]);
//     rows[rows.length - 1].push(cat);
//     return rows;
//   }, [])
//   .map((row, rowIndex) => (
//     <div key={rowIndex} className="flex flex-row mb-2">
//       {row.map((cat) => (
//         <div key={cat} className="px-2 py-1 bg-primary2 rounded-full inline-block mr-2">
//           <span className="text-xs text-primary1 font-bold">
//             {data.map((item) => {
//               let formattedStr = cat.toLowerCase().replace(/ /g, "-");
//               return (
//                 <Link href={`/category/${item.slug}`} key={item.slug}>
//                   {formattedStr === item.slug && item.name}
//                 </Link>
//               );
//             })}
//           </span>
//         </div>
//       ))}
//     </div>
//   ))}

//             </div>
            
//           </div>
//         </div>
//         <div className=" hidden md:block md:ml-auto">
//           <div className="md:ml-auto mt-4 md:mt-0 flex gap-4 items-center">
//             <div>
//               <Link
//                 href={`/product/${product.slug}`}
//                 className="flex gap-2 items-center bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit  hover:bg-primary2 hover:text-primary1 hover:border-primary1 rounded-full hover:gap-4"
//               >
//                 View
//                 <IoIosArrowRoundForward className="text-xl" />
//               </Link>
//             </div>

//             <div
//               className="flex gap-2 text-slate-800 text-lg items-center "
//               onClick={handleBookmarkClick}
//             >
//               {/* Bookemark button */}{" "}
//               <FaBookmark
//                 className={
//                   isBookmarked
//                     ? "text-primary1"
//                     : "text-gray-300 hover:text-primary1 cursor-pointer transition-all duration-200"
//                 }
//               />{" "}
//             </div>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <div className="flex gap-2 text-slate-800 text-lg items-center">
//                   {" "}
//                   <FiShare2 />{" "}
//                 </div>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                   <DialogTitle>Share link</DialogTitle>
//                   <DialogDescription>
//                     Anyone who has this link will be able to view this.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="flex items-center space-x-2">
//                   <div className="grid flex-1 gap-2">
//                     <Label htmlFor="link" className="sr-only">
//                       Link
//                     </Label>
//                     <Input
//                       id="link"
//                       defaultValue={`https://www.dreamlegal.in/product/${product.slug}`}
//                       readOnly
//                     />
//                   </div>
//                   <div className="">
//                     <Button
//                       variant="outline"
//                       onClick={() =>
//                         copyToClipboard(
//                           `https://www.dreamlegal.in/product/${product.slug}`
//                         )
//                       }
//                     >
//                       Copy
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex gap-4">
//                   <div>
//                     <FacebookShareButton
//                       url={`https://www.dreamlegal.in/product/${product.slug}`}
//                     >
//                       <FacebookIcon size={32} round />
//                     </FacebookShareButton>
//                   </div>
//                   <div>
//                     <TwitterShareButton
//                       url={`https://www.dreamlegal.in/product/${product.slug}`}
//                     >
//                       <TwitterIcon size={32} round />
//                     </TwitterShareButton>
//                   </div>
//                   <div>
//                     <WhatsappShareButton
//                       url={`https://www.dreamlegal.in/product/${product.slug}`}
//                     >
//                       <WhatsappIcon size={32} round />
//                     </WhatsappShareButton>
//                   </div>
//                   <div>
//                     <LinkedinShareButton
//                       url={`https://www.dreamlegal.in/product/${product.slug}`}
//                     >
//                       <LinkedinIcon size={32} round />
//                     </LinkedinShareButton>
//                   </div>
//                   <div>
//                     <RedditShareButton
//                       url={`https://www.dreamlegal.in/product/${product.slug}`}
//                     >
//                       <RedditIcon size={32} round />
//                     </RedditShareButton>
//                   </div>
//                   <div>
//                     <TelegramShareButton
//                       url={`https://www.dreamlegal.in/product/${product.slug}`}
//                     >
//                       <TelegramIcon size={32} round />
//                     </TelegramShareButton>
//                   </div>
//                 </div>
//                 <DialogFooter className="sm:justify-start">
//                   <DialogClose asChild>
//                     <Button type="button" variant="secondary">
//                       Close
//                     </Button>
//                   </DialogClose>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//         <div></div>
//       </div>
//       <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <div className="text-xs text-slate-400 mt-4 mb-1">Overview</div>
//           <div>
//             <p className="text-sm text-gray-600">{description}</p>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="text-xs text-slate-400 mt-4 mb-1">Users</div>
//         <div className="flex flex-col sm:flex-row sm:justify-between">
          
//          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:overflow-x-auto">
//     {userCategoryIcons.map((category, index) => (
//       <div
//         key={category.name}
//         className="relative group flex items-center bg-primary2 rounded-md p-2"
//       >
//         <img
//           src={category.icon}
//           alt={category.name}
//           className="w-6 h-6"
//         />
//         <div className="hidden group-hover:block text-[10px] font-clarity font-bold transition-all duration-200 cursor-pointer ml-2">
//           {category.name}
//         </div>
//       </div>
//     ))}
//   </div>

//           <div className="flex flex-col sm:flex-row sm:gap-5 mt-4 sm:mt-0">
//             <div className="text-xs text-slate-400 mb-1">
//               <p className="text-sm text-gray-600"> Average Adoption Time</p>
//               <p>{product.avgTimeAdoption}</p>
//             </div>
//             <div className="text-xs text-slate-400 mb-1 flex flex-col">
//               <p className="text-sm text-gray-600">Rating</p>
//               <p className="text-[#FDB52A] text-[17px]">
//                 {roundedOverallRating}
//                 <span className="text-[12px]">/5</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className=" block md:hidden">
//         <div className="md:ml-auto mt-4 md:mt-0 flex gap-4 items-center">
//           <div>
//             <Link
//               href={`/product/${product.slug}`}
//               className="flex gap-2 items-center bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit  hover:bg-primary2 hover:text-primary1 hover:border-primary1 rounded-full hover:gap-4"
//             >
//               View
//               <IoIosArrowRoundForward className="text-xl" />
//             </Link>
//           </div>

//           <div
//             className="flex gap-2 text-slate-800 text-lg items-center "
//             onClick={handleBookmarkClick}
//           >
//             {/* Bookemark button */}{" "}
//             <FaBookmark
//               className={
//                 isBookmarked
//                   ? "text-primary1"
//                   : "text-gray-300 hover:text-primary1 cursor-pointer transition-all duration-200"
//               }
//             />{" "}
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <div className="flex gap-2 text-slate-800 text-lg items-center">
//                 {" "}
//                 <FiShare2 />{" "}
//               </div>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//               <DialogHeader>
//                 <DialogTitle>Share link</DialogTitle>
//                 <DialogDescription>
//                   Anyone who has this link will be able to view this.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="flex items-center space-x-2">
//                 <div className="grid flex-1 gap-2">
//                   <Label htmlFor="link" className="sr-only">
//                     Link
//                   </Label>
//                   <Input
//                     id="link"
//                     defaultValue={`https://www.dreamlegal.in/product/${product.slug}`}
//                     readOnly
//                   />
//                   <div className="">
//                     <Button
//                       variant="outline"
//                       onClick={() =>
//                         copyToClipboard(
//                           `https://www.dreamlegal.in/product/${product.slug}`
//                         )
//                       }
//                     >
//                       Copy
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 flex gap-4">
//                 <div>
//                   <FacebookShareButton
//                     url={`https://www.dreamlegal.in/product/${product.slug}`}
//                   >
//                     <FacebookIcon size={32} round />
//                   </FacebookShareButton>
//                 </div>
//                 <div>
//                   <TwitterShareButton
//                     url={`https://www.dreamlegal.in/product/${product.slug}`}
//                   >
//                     <TwitterIcon size={32} round />
//                   </TwitterShareButton>
//                 </div>
//                 <div>
//                   <WhatsappShareButton
//                     url={`https://www.dreamlegal.in/product/${product.slug}`}
//                   >
//                     <WhatsappIcon size={32} round />
//                   </WhatsappShareButton>
//                 </div>
//                 <div>
//                   <LinkedinShareButton
//                     url={`https://www.dreamlegal.in/product/${product.slug}`}
//                   >
//                     <LinkedinIcon size={32} round />
//                   </LinkedinShareButton>
//                 </div>
//                 <div>
//                   <RedditShareButton
//                     url={`https://www.dreamlegal.in/product/${product.slug}`}
//                   >
//                     <RedditIcon size={32} round />
//                   </RedditShareButton>
//                 </div>
//                 <div>
//                   <TelegramShareButton
//                     url={`https://www.dreamlegal.in/product/${product.slug}`}
//                   >
//                     <TelegramIcon size={32} round />
//                   </TelegramShareButton>
//                 </div>
//               </div>
//               <DialogFooter className="sm:justify-start">
//                 <DialogClose asChild>
//                   <Button type="button" variant="secondary">
//                     Close
//                   </Button>
//                 </DialogClose>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NormalProduct;

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaBookmark } from 'react-icons/fa6';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { data } from "@/app/(home)/category/_components/data";

const userCategories = [
  { name: "Law firms", icon: "/lawfirmicon.svg" },
  { name: "Individual Practitioner", icon: "/prac.svg" },
  { name: "Government departments", icon: "/govdepticon.svg" },
  { name: "Startups", icon: "/startupicon.svg" },
  { name: "Enterprises", icon: "/enterpriceicon.svg" },
  { name: "Judiciary", icon: "/judge1.svg" },
  { name: "In-House Counsels", icon: "/lawyers.svg" },
];

// const ProductCard = ({ id, image, title, description, category, product }) => {
//   const userId = typeof window !== "undefined" && localStorage.getItem("userId");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [ratings, setRatings] = useState({ overallRating: 0, message: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkBookmark = async () => {
//       if (!userId) return;
//       try {
//         const response = await fetch("/api/check-bookmark", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId, productId: id }),
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setIsBookmarked(result.isBookmarked);
//         }
//       } catch (error) {
//         console.error("Error checking bookmark", error);
//       }
//     };
//     checkBookmark();
//   }, [userId, id]);

//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const response = await fetch("/api/cal-review", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: id }),
//         });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         if (data.message === "No reviews found for this product") {
//           setRatings({
//             overallRating: 0,
//             message: "No reviews found for this product",
//           });
//         } else {
//           setRatings(data);
//         }
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (product?.id) {
//       fetchRatings();
//     } else {
//       setLoading(false);
//       setError("Product ID is missing.");
//     }
//   }, [product, id]);

//   const handleBookmarkClick = async () => {
//     if (!userId) {
//       alert("Please log in to bookmark products");
//       return;
//     }
//     try {
//       const response = await fetch("/api/save-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: id }),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(!isBookmarked);
//         alert(result.message);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error("Error bookmarking product", error);
//       alert("Failed to bookmark product");
//     }
//   };

//   const roundedRating = (ratings.overallRating ?? 0).toFixed(1);
//   const parseUserCategory = (category) => {
//     const [name] = category.split("|");
//     return name;
//   };

//   const userCategoryIcons = product.userCategory
//     .map((category) => {
//       const parsedCategory = parseUserCategory(category);
//       return userCategories.find((cat) => cat.name === parsedCategory) || null;
//     })
//     .filter(Boolean);

//   if (loading) {
//     return (
//       <div className="w-full px-6 py-4 bg-white rounded-xl border border-gray-200">
//         <div className="animate-pulse flex space-x-4">
//           <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
//           <div className="flex-1 space-y-4 py-1">
//             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gray-200 rounded"></div>
//               <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full p-6 bg-red-50 rounded-xl">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-8 py-6 rounded-xl border bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row md:items-start gap-6">
//         {/* Left Section - Image and Title */}
//         <div className="flex gap-4 flex-1">
//           <div className="relative">
//             <img
//               src={image}
//               alt={title}
//               className="w-16 h-16 rounded-xl object-cover"
//             />
//             <span className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary1 rounded-full ring-2 ring-white" />
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-lg text-gray-900 mb-3">{title}</h3>
//             <div className="flex flex-wrap gap-2">
//               {category.map((cat) => (
//                 <div key={cat} className="bg-primary2/10 px-3 py-1.5 rounded-full">
//                   <span className="text-xs font-medium text-primary1">
//                     {data.map((item) => {
//                       const formattedStr = cat.toLowerCase().replace(/ /g, "-");
//                       return (
//                         formattedStr === item.slug && (
//                           <Link 
//                             href={`/category/${item.slug}`} 
//                             key={item.slug}
//                             className="hover:text-primary1/80"
//                           >
//                             {item.name}
//                           </Link>
//                         )
//                       );
//                     })}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-4  ">
//           <Link
//             href={`/product/${product.slug}`}
//             className="flex items-center gap-2 bg-primary1 text-white px-6 py-3 rounded-full
//                      text-sm font-medium transition-all duration-300 hover:bg-primary2 
//                      hover:text-primary1 group"
//           >
//             View Details
//             <IoIosArrowRoundForward className="text-xl transition-transform group-hover:translate-x-1" />
//           </Link>

//           <button
//             onClick={handleBookmarkClick}
//             className="p-3 rounded-full border border-gray-200 hover:border-primary1 
//                      hover:bg-gray-50 transition-all duration-300"
//           >
//             <FaBookmark
//               className={`text-xl ${
//                 isBookmarked ? "text-primary1" : "text-gray-400"
//               }`}
//             />
//           </button>

//           <button
//             className="p-3 rounded-full border border-gray-200 hover:border-primary1 
//                      hover:bg-gray-50 transition-all duration-300"
//           >
//             <FiShare2 className="text-xl text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <h4 className="text-sm font-medium text-gray-500 mb-2">Overview</h4>
//         <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
//       </div>

//       {/* Footer */}
//       <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-6">
//         {/* User Categories */}
//         <div className="flex-1">
//           <h4 className="text-sm font-medium text-gray-500 mb-3">Target Users</h4>
//           <div className="flex flex-wrap gap-3">
//             {userCategoryIcons.map((category) => (
//               <div key={category.name} className="group relative">
//                 <div className="p-2.5 bg-gray-50 rounded-lg transition-colors hover:bg-primary2/10">
//                   <img src={category.icon} alt={category.name} className="w-6 h-6" />
//                   <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 
//                                  bg-gray-900 text-white text-xs rounded opacity-0 
//                                  group-hover:opacity-100 whitespace-nowrap transition-opacity">
//                     {category.name}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex gap-8">
//           <div>
//             <h4 className="text-sm font-medium text-gray-500 mb-1">Adoption Time</h4>
//             <p className="text-sm font-semibold text-gray-900">
//               {product.avgTimeAdoption}
//             </p>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
//             <p className="text-lg font-bold text-yellow-500">
//               {roundedRating}
//               <span className="text-sm text-gray-400 ml-1">/5</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaBookmark } from 'react-icons/fa6';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { data } from "@/app/(home)/category/_components/data";

// const ProductCard = ({ id, image, title, description, category, product }) => {
//   // ... keep all your existing state and effects code ...
//   const userId = typeof window !== "undefined" && localStorage.getItem("userId");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [ratings, setRatings] = useState({ overallRating: 0, message: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkBookmark = async () => {
//       if (!userId) return;
//       try {
//         const response = await fetch("/api/check-bookmark", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId, productId: id }),
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setIsBookmarked(result.isBookmarked);
//         }
//       } catch (error) {
//         console.error("Error checking bookmark", error);
//       }
//     };
//     checkBookmark();
//   }, [userId, id]);

//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const response = await fetch("/api/cal-review", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: id }),
//         });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         if (data.message === "No reviews found for this product") {
//           setRatings({
//             overallRating: 0,
//             message: "No reviews found for this product",
//           });
//         } else {
//           setRatings(data);
//         }
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (product?.id) {
//       fetchRatings();
//     } else {
//       setLoading(false);
//       setError("Product ID is missing.");
//     }
//   }, [product, id]);

//   const handleBookmarkClick = async () => {
//     if (!userId) {
//       alert("Please log in to bookmark products");
//       return;
//     }
//     try {
//       const response = await fetch("/api/save-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: id }),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(!isBookmarked);
//         alert(result.message);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error("Error bookmarking product", error);
//       alert("Failed to bookmark product");
//     }
//   };

//   const roundedRating = (ratings.overallRating ?? 0).toFixed(1);
//   const parseUserCategory = (category) => {
//     const [name] = category.split("|");
//     return name;
//   };

//   const userCategoryIcons = product.userCategory
//     .map((category) => {
//       const parsedCategory = parseUserCategory(category);
//       return userCategories.find((cat) => cat.name === parsedCategory) || null;
//     })
//     .filter(Boolean);

//   if (loading) {
//     return (
//       <div className="w-full p-8">
//         <div className="animate-pulse flex space-x-4">
//           <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
//           <div className="flex-1 space-y-4 py-1">
//             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gray-200 rounded"></div>
//               <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full p-8">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-8 pt-16"> {/* Added top padding for Compare button */}
//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row md:items-start gap-6">
//         {/* Left Section - Image and Title */}
//         <div className="flex gap-4 flex-1">
//           <div className="relative">
//             <img
//               src={image}
//               alt={title}
//               className="w-14 h-14 rounded-xl object-cover"
//             />
//             <span className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary1 rounded-full ring-2 ring-white" />
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-lg text-gray-900 mb-3">{title}</h3>
//             <div className="flex flex-wrap gap-2">
//               {category.map((cat) => (
//                 <div key={cat} className="bg-primary2/10 px-3 py-1.5 rounded-full">
//                   <span className="text-xs font-medium text-primary1">
//                     {data.map((item) => {
//                       const formattedStr = cat.toLowerCase().replace(/ /g, "-");
//                       return (
//                         formattedStr === item.slug && (
//                           <Link 
//                             href={`/category/${item.slug}`} 
//                             key={item.slug}
//                             className="hover:text-primary1/80"
//                           >
//                             {item.name}
//                           </Link>
//                         )
//                       );
//                     })}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-3">
//           <Link
//             href={`/product/${product.slug}`}
//             className="flex items-center gap-2 bg-primary1 text-white px-6 py-3 rounded-full
//                      text-sm font-medium transition-all duration-300 hover:bg-primary2 
//                      hover:text-primary1 group"
//           >
//             View Details
//             <IoIosArrowRoundForward className="text-xl transition-transform group-hover:translate-x-1" />
//           </Link>

//           <button
//             onClick={handleBookmarkClick}
//             className="p-3 rounded-full hover:bg-gray-50/80 transition-all duration-300"
//           >
//             <FaBookmark
//               className={`text-xl ${
//                 isBookmarked ? "text-primary1" : "text-gray-400"
//               }`}
//             />
//           </button>

//           <button
//             className="p-3 rounded-full hover:bg-gray-50/80 transition-all duration-300"
//           >
//             <FiShare2 className="text-xl text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <h4 className="text-sm font-medium text-gray-500 mb-2">Overview</h4>
//         <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
//       </div>

//       {/* Footer */}
//       <div className="mt-6 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row gap-6">
//         {/* User Categories */}
//         <div className="flex-1">
//           <h4 className="text-sm font-medium text-gray-500 mb-3">Target Users</h4>
//           <div className="flex flex-wrap gap-3">
//             {userCategoryIcons.map((category) => (
//               <div key={category.name} className="group relative">
//                 <div className="p-2.5 bg-gray-50/80 rounded-lg transition-colors hover:bg-purple-50/50">
//                   <img src={category.icon} alt={category.name} className="w-6 h-6" />
//                   <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 
//                                  bg-gray-900 text-white text-xs rounded opacity-0 
//                                  group-hover:opacity-100 whitespace-nowrap transition-opacity">
//                     {category.name}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex gap-8">
//           <div>
//             <h4 className="text-sm font-medium text-gray-500 mb-1">Adoption Time</h4>
//             <p className="text-sm font-semibold text-gray-900">
//               {product.avgTimeAdoption}
//             </p>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
//             <p className="text-lg font-bold text-yellow-500">
//               {roundedRating}
//               <span className="text-sm text-gray-400 ml-1">/5</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaBookmark } from 'react-icons/fa6';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { data } from "@/app/(home)/category/_components/data";

// const ProductCard = ({ id, image, title, description, category, product }) => {
//   // ... keep existing state and effects code ...
//   const userId = typeof window !== "undefined" && localStorage.getItem("userId");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [ratings, setRatings] = useState({ overallRating: 0, message: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkBookmark = async () => {
//       if (!userId) return;
//       try {
//         const response = await fetch("/api/check-bookmark", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId, productId: id }),
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setIsBookmarked(result.isBookmarked);
//         }
//       } catch (error) {
//         console.error("Error checking bookmark", error);
//       }
//     };
//     checkBookmark();
//   }, [userId, id]);

//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const response = await fetch("/api/cal-review", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: id }),
//         });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         if (data.message === "No reviews found for this product") {
//           setRatings({
//             overallRating: 0,
//             message: "No reviews found for this product",
//           });
//         } else {
//           setRatings(data);
//         }
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (product?.id) {
//       fetchRatings();
//     } else {
//       setLoading(false);
//       setError("Product ID is missing.");
//     }
//   }, [product, id]);

//   const handleBookmarkClick = async () => {
//     if (!userId) {
//       alert("Please log in to bookmark products");
//       return;
//     }
//     try {
//       const response = await fetch("/api/save-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: id }),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(!isBookmarked);
//         alert(result.message);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error("Error bookmarking product", error);
//       alert("Failed to bookmark product");
//     }
//   };

//   const roundedRating = (ratings.overallRating ?? 0).toFixed(1);
//   const parseUserCategory = (category) => {
//     const [name] = category.split("|");
//     return name;
//   };

//   const userCategoryIcons = product.userCategory
//     .map((category) => {
//       const parsedCategory = parseUserCategory(category);
//       return userCategories.find((cat) => cat.name === parsedCategory) || null;
//     })
//     .filter(Boolean);

//   if (loading) {
//     return (
//       <div className="w-full p-8">
//         <div className="animate-pulse flex space-x-4">
//           <div className="w-14 h-14 bg-purple-100/50 rounded-xl"></div>
//           <div className="flex-1 space-y-4 py-1">
//             <div className="h-4 bg-purple-100/50 rounded-full w-3/4"></div>
//             <div className="space-y-2">
//               <div className="h-4 bg-purple-100/50 rounded-full"></div>
//               <div className="h-4 bg-purple-100/50 rounded-full w-5/6"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-8 pt-16">
//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row md:items-start gap-6">
//         {/* Left Section - Image and Title */}
//         <div className="flex gap-4 flex-1">
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
//                           rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
//             <img
//               src={image}
//               alt={title}
//               className="w-14 h-14 rounded-xl object-cover transition-transform duration-300 
//                        group-hover:scale-105"
//             />
//             <span className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary1 rounded-full 
//                           ring-2 ring-white shadow-lg" />
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-purple-700 
//                         transition-colors duration-300">{title}</h3>
//             <div className="flex flex-wrap gap-2">
//               {category.map((cat) => (
//                 <div 
//                   key={cat} 
//                   className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 
//                            to-pink-500/10 px-3 py-1.5 rounded-full group/tag hover:from-purple-500/20 
//                            hover:to-pink-500/20 transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
//                                opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300" />
//                   <span className="relative text-xs font-medium text-purple-700">
//                     {data.map((item) => {
//                       const formattedStr = cat.toLowerCase().replace(/ /g, "-");
//                       return (
//                         formattedStr === item.slug && (
//                           <Link 
//                             href={`/category/${item.slug}`} 
//                             key={item.slug}
//                             className="hover:text-purple-900 transition-colors duration-300"
//                           >
//                             {item.name}
//                           </Link>
//                         )
//                       );
//                     })}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-3">
//           <Link
//             href={`/product/${product.slug}`}
//             className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 
//                      text-white px-6 py-3 rounded-full text-sm font-medium 
//                      transition-all duration-300 hover:from-purple-500 hover:to-purple-600 
//                      shadow-md hover:shadow-lg hover:scale-105"
//           >
//             View Details
//             <IoIosArrowRoundForward className="text-xl transition-transform duration-300 
//                                            group-hover:translate-x-1" />
//           </Link>

//           <button
//             onClick={handleBookmarkClick}
//             className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-purple-50 
//                      transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
//           >
//             <FaBookmark
//               className={`text-xl transition-colors duration-300 ${
//                 isBookmarked ? "text-purple-600" : "text-gray-400"
//               }`}
//             />
//           </button>

//           <button
//             className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-purple-50 
//                      transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
//           >
//             <FiShare2 className="text-xl text-gray-600 hover:text-purple-600 
//                               transition-colors duration-300" />
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-8">
//         <h4 className="text-sm font-medium text-purple-700 mb-2">Overview</h4>
//         <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
//       </div>

//       {/* Footer */}
//       <div className="mt-8 pt-6 border-t border-purple-100 flex flex-col sm:flex-row gap-6">
//         {/* User Categories */}
//         <div className="flex-1">
//           <h4 className="text-sm font-medium text-purple-700 mb-4">Target Users</h4>
//           <div className="flex flex-wrap gap-4">
//             {userCategoryIcons.map((category) => (
//               <div key={category.name} className="group/icon relative">
//                 <div className="relative overflow-hidden p-3 bg-white rounded-xl shadow-sm 
//                              hover:shadow-md transition-all duration-300 hover:scale-105
//                              hover:bg-purple-50/50">
//                   <div className="relative z-10">
//                     <img 
//                       src={category.icon} 
//                       alt={category.name} 
//                       className="w-6 h-6 transition-transform duration-300 
//                                group-hover/icon:scale-110" 
//                     />
//                   </div>
                  
//                   {/* Premium Tooltip */}
//                   <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 
//                                opacity-0 group-hover/icon:opacity-100 transition-all duration-300
//                                pointer-events-none z-20">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-gray-900 rounded-lg opacity-95" />
//                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 
//                                   border-8 border-transparent border-b-gray-900" />
//                       <span className="relative text-white text-xs font-medium whitespace-nowrap">
//                         {category.name}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex gap-8">
//           <div className="group">
//             <h4 className="text-sm font-medium text-purple-700 mb-1">Adoption Time</h4>
//             <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 
//                        transition-colors duration-300">
//               {product.avgTimeAdoption}
//             </p>
//           </div>
//           <div className="group">
//             <h4 className="text-sm font-medium text-purple-700 mb-1">Rating</h4>
//             <p className="flex items-baseline">
//               <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 
//                            bg-clip-text text-transparent group-hover:from-yellow-500 
//                            group-hover:to-yellow-400 transition-all duration-300">
//                 {roundedRating}
//               </span>
//               <span className="text-sm text-gray-400 ml-1">/5</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaBookmark } from 'react-icons/fa6';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { data } from "@/app/(home)/category/_components/data";

// const ProductCard = ({ id, image, title, description, category, product }) => {
//   // ... keep existing state and effects code ...
//   const userId = typeof window !== "undefined" && localStorage.getItem("userId");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [ratings, setRatings] = useState({ overallRating: 0, message: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkBookmark = async () => {
//       if (!userId) return;
//       try {
//         const response = await fetch("/api/check-bookmark", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId, productId: id }),
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setIsBookmarked(result.isBookmarked);
//         }
//       } catch (error) {
//         console.error("Error checking bookmark", error);
//       }
//     };
//     checkBookmark();
//   }, [userId, id]);

//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const response = await fetch("/api/cal-review", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: id }),
//         });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         if (data.message === "No reviews found for this product") {
//           setRatings({
//             overallRating: 0,
//             message: "No reviews found for this product",
//           });
//         } else {
//           setRatings(data);
//         }
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (product?.id) {
//       fetchRatings();
//     } else {
//       setLoading(false);
//       setError("Product ID is missing.");
//     }
//   }, [product, id]);

//   const handleBookmarkClick = async () => {
//     if (!userId) {
//       alert("Please log in to bookmark products");
//       return;
//     }
//     try {
//       const response = await fetch("/api/save-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: id }),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(!isBookmarked);
//         alert(result.message);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error("Error bookmarking product", error);
//       alert("Failed to bookmark product");
//     }
//   };

//   const roundedRating = (ratings.overallRating ?? 0).toFixed(1);
//   const parseUserCategory = (category) => {
//     const [name] = category.split("|");
//     return name;
//   };

//   const userCategoryIcons = product.userCategory
//     .map((category) => {
//       const parsedCategory = parseUserCategory(category);
//       return userCategories.find((cat) => cat.name === parsedCategory) || null;
//     })
//     .filter(Boolean);

//   if (loading) {
//     return (
//       <div className="w-full p-8">
//         <div className="animate-pulse flex space-x-4">
//           <div className="w-14 h-14 bg-blue-100/50 rounded-xl"></div>
//           <div className="flex-1 space-y-4 py-1">
//             <div className="h-4 bg-blue-100/50 rounded-full w-3/4"></div>
//             <div className="space-y-2">
//               <div className="h-4 bg-blue-100/50 rounded-full"></div>
//               <div className="h-4 bg-blue-100/50 rounded-full w-5/6"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-8 py-6 pt-16">
//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row md:items-start gap-6">
//         {/* Left Section - Image and Title */}
//         <div className="flex gap-4 flex-1">
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 
//                           rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
//             <img
//               src={image}
//               alt={title}
//               className="w-16 h-16 rounded-xl object-cover transition-transform duration-300 
//                        group-hover:scale-105"
//             />
//             <span className="absolute -right-1 -bottom-1 w-3 h-3 bg-blue-600 rounded-full 
//                           ring-2 ring-white shadow-lg" />
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-700 
//                         transition-colors duration-300">{title}</h3>
//             <div className="flex flex-wrap gap-2">
//               {category.map((cat) => (
//                 <div 
//                   key={cat} 
//                   className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-sky-500/10 
//                            px-3 py-1.5 rounded-full group/tag hover:from-blue-500/20 hover:to-sky-500/20 
//                            transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10 
//                                opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300" />
//                   <span className="relative text-xs font-medium text-blue-700">
//                     {data.map((item) => {
//                       const formattedStr = cat.toLowerCase().replace(/ /g, "-");
//                       return (
//                         formattedStr === item.slug && (
//                           <Link 
//                             href={`/category/${item.slug}`} 
//                             key={item.slug}
//                             className="hover:text-blue-900 transition-colors duration-300"
//                           >
//                             {item.name}
//                           </Link>
//                         )
//                       );
//                     })}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-3">
//           <Link
//             href={`/product/${product.slug}`}
//             className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 
//                      text-white px-6 py-3 rounded-full text-sm font-medium shadow-md 
//                      hover:shadow-lg hover:scale-105 transition-all duration-300"
//           >
//             View Details
//             <IoIosArrowRoundForward className="text-xl transition-transform duration-300 
//                                            group-hover:translate-x-1" />
//           </Link>

//           <button
//             onClick={handleBookmarkClick}
//             className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-blue-50 
//                      transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
//           >
//             <FaBookmark
//               className={`text-xl transition-colors duration-300 ${
//                 isBookmarked ? "text-blue-600" : "text-gray-400"
//               }`}
//             />
//           </button>

//           <button
//             className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-blue-50 
//                      transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
//           >
//             <FiShare2 className="text-xl text-gray-600 hover:text-blue-600 
//                               transition-colors duration-300" />
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <h4 className="text-sm font-medium text-gray-500 mb-2">Overview</h4>
//         <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
//       </div>

//       {/* Footer */}
//       <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
//         {/* User Categories */}
//         <div className="flex-1">
//           <h4 className="text-sm font-medium text-gray-500 mb-4">Target Users</h4>
//           <div className="flex flex-wrap gap-3">
//             {userCategoryIcons.map((category) => (
//               <div key={category.name} className="group/icon relative">
//                 <div className="relative overflow-hidden p-2.5 bg-white rounded-lg shadow-sm 
//                              hover:shadow-md transition-all duration-300 hover:scale-105 
//                              hover:bg-blue-50/50">
//                   <div className="relative z-10">
//                     <img 
//                       src={category.icon} 
//                       alt={category.name} 
//                       className="w-6 h-6 transition-transform duration-300 
//                                group-hover/icon:scale-110" 
//                     />
//                   </div>
                  
//                   {/* Premium Tooltip */}
//                   <div className="absolute -bottom-[4.5rem] left-1/2 -translate-x-1/2 w-max 
//                                pointer-events-none opacity-0 group-hover/icon:opacity-100
//                                transition-all duration-200 z-20 px-2 py-1.5">
//                     <div className="relative bg-gray-900/95 text-white text-xs font-medium 
//                                 rounded-lg px-3 py-2">
//                       {category.name}
//                       <div className="absolute -top-1 left-1/2 -translate-x-1/2 
//                                   border-[6px] border-transparent border-b-gray-900/95" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex gap-8">
//           <div className="group">
//             <h4 className="text-sm font-medium text-gray-500 mb-1">Adoption Time</h4>
//             <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 
//                        transition-colors duration-300">
//               {product.avgTimeAdoption}
//             </p>
//           </div>
//           <div className="group">
//             <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
//             <p className="flex items-baseline">
//               <span className="text-xl font-bold text-yellow-400 group-hover:text-yellow-500 
//                            transition-colors duration-300">
//                 {roundedRating}
//               </span>
//               <span className="text-sm text-gray-400 ml-1">/5</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBookmark } from 'react-icons/fa6';
import { FiShare2 } from 'react-icons/fi';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { data } from "@/app/(home)/category/_components/data";
import { useAuth } from '@/context/authContext';

const ProductCard = ({ id, image, title, description, category, product }) => {
  // ... keep existing state and effects code ...
  // const userId = typeof window !== "undefined" && localStorage.getItem("userId");
   const { userId, userType } = useAuth();
   console.log(`userId: ${userId}, userType: ${userType}`);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ratings, setRatings] = useState({ overallRating: 0, message: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!userId) return;
      
      try {
        const response = await fetch("/api/check-bookmark", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId: id }),
        });
        if (response.ok) {
          const result = await response.json();
          setIsBookmarked(result.isBookmarked);
        }
      } catch (error) {
        console.error("Error checking bookmark", error);
      }
    };
    checkBookmark();
  }, [userId, id]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch("/api/cal-review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data.message === "No reviews found for this product") {
          setRatings({
            overallRating: 0,
            message: "No reviews found for this product",
          });
        } else {
          setRatings(data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (product?.id) {
      fetchRatings();
    } else {
      setLoading(false);
      setError("Product ID is missing.");
    }
  }, [product, id]);

  const handleBookmarkClick = async () => {
    if (userType === "vendor") {
      alert("Vendor can't bookmark products");
      return;
    }
    if (!userId) {
      alert("Please log in as User to bookmark products");
      return;
    }
    
    try {
      console.log(id);
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product.id }),
      });
      if (response.ok) {
        const result = await response.json();
        setIsBookmarked(!isBookmarked);
        alert(result.message);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error bookmarking product", error);
      alert("Failed to bookmark product");
    }
  };

  const roundedRating = (ratings.overallRating ?? 0).toFixed(1);
  const parseUserCategory = (category) => {
    const [name] = category.split("|");
    return name;
  };

  const userCategoryIcons = product.userCategory
    .map((category) => {
      const parsedCategory = parseUserCategory(category);
      return userCategories.find((cat) => cat.name === parsedCategory) || null;
    })
    .filter(Boolean);

  if (loading) {
    return (
      <div className="w-full p-8">
        <div className="animate-pulse flex space-x-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 animate-gradient"></div>
          </div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gradient-to-r from-blue-100 to-transparent rounded-full w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-blue-50 to-transparent rounded-full"></div>
              <div className="h-4 bg-gradient-to-r from-blue-50 to-transparent rounded-full w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-6 pt-16">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Left Section - Logo and Title */}
        <div className="flex gap-5 flex-1">
          {/* Enhanced Logo Section */}
          <div className="relative group">
            {/* Background Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-sky-500 
                          rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all 
                          duration-500"></div>
            
            {/* Logo Container */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-0.5">
                <div className="relative w-full h-full rounded-xl overflow-hidden 
                             ring-1 ring-black/5 shadow-sm">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 
                             group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 
                               via-transparent to-sky-500/10 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-500"></div>
                </div>
              </div>
              
              {/* Status Indicator */}
              <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-gradient-to-r 
                           from-blue-600 to-blue-500 rounded-full ring-2 ring-white 
                           shadow-lg flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping 
                             opacity-50"></span>
              </span>
            </div>
          </div>
          
          {/* Title and Categories */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-700 
                        transition-colors duration-300">{title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.map((cat) => (
                <div 
                  key={cat} 
                  className="group/tag relative overflow-hidden"
                >
                  <div className="relative px-4 py-2 rounded-full bg-gradient-to-br 
                               from-blue-50 via-blue-50/80 to-white backdrop-blur-sm 
                               shadow-sm hover:shadow transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                                to-sky-500/10 opacity-0 group-hover/tag:opacity-100 
                                transition-all duration-300"></div>
                    <span className="relative text-xs font-medium bg-gradient-to-r 
                                 from-blue-700 to-blue-600 bg-clip-text text-transparent">
                      {data.map((item) => {
                        const formattedStr = cat.toLowerCase().replace(/ /g, "-");
                        return formattedStr === item.slug && item.name;
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full 
                     text-sm font-medium transition-all duration-300"
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 
                          rounded-full transition-all duration-300 group-hover:scale-105"></div>
            
            {/* Button Content */}
            <span className="relative text-white flex items-center gap-2">
              View Details
              <IoIosArrowRoundForward className="text-xl transition-transform duration-300 
                                             group-hover:translate-x-1" />
            </span>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 
                          transition-opacity duration-300 blur-md bg-gradient-to-r 
                          from-blue-600 to-blue-400"></div>
          </Link>

          {/* Action Buttons with Enhanced Styling */}
          {['bookmark', 'share'].map((action, index) => (
            <button
              key={action}
              onClick={action === 'bookmark' ? handleBookmarkClick : undefined}
              className="relative p-3 rounded-full bg-gradient-to-br from-white to-blue-50/80 
                       shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              {action === 'bookmark' ? (
                <FaBookmark
                  className={`text-xl transition-colors duration-300 ${
                    isBookmarked ? "text-blue-600" : "text-gray-400"
                  }`}
                />
              ) : (
                <FiShare2 className="text-xl text-gray-600 hover:text-blue-600 
                                 transition-colors duration-300" />
              )}
              
              {/* Button Glow on Hover */}
              <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 
                          transition-opacity duration-300 blur-sm bg-blue-500"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <div className="mt-8">
        <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
                     bg-clip-text text-transparent mb-2">Overview</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Footer Section */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
        {/* User Categories */}
        <div className="flex-1">
          <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
                     bg-clip-text text-transparent mb-4">Target Users</h4>
          <div className="flex flex-wrap gap-4">
            {userCategoryIcons.map((category) => (
              <div key={category.name} className="group/icon relative">
                <div className="relative overflow-hidden p-3 rounded-xl bg-gradient-to-br 
                             from-white to-blue-50/80 shadow-sm hover:shadow-md 
                             transition-all duration-300 hover:scale-105">
                  {/* Icon Container */}
                  <div className="relative z-10">
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className="w-6 h-6 transition-transform duration-300 
                               group-hover/icon:scale-110" 
                    />
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 
                               group-hover/icon:opacity-20 transition-opacity duration-300 
                               blur-sm bg-blue-500"></div>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 
                               opacity-0 group-hover/icon:opacity-100 transition-all 
                               duration-300 pointer-events-none z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gray-900/95 rounded-lg blur-sm"></div>
                      <div className="relative bg-gray-900/95 text-white text-xs font-medium 
                                  rounded-lg px-3 py-2 whitespace-nowrap">
                        {category.name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                                    border-[6px] border-transparent 
                                    border-b-gray-900/95"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats with Enhanced Styling */}
        {/* <div className="flex gap-8">
          <div className="group">
            <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
                        bg-clip-text text-transparent mb-1">Adoption Time</h4>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 
                       transition-colors duration-300">
              {product.avgTimeAdoption}
            </p>
          </div>
          <div className="group">
            <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
                        bg-clip-text text-transparent mb-1">Rating</h4>
            <div className="flex items-baseline">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 
                           to-yellow-500 bg-clip-text text-transparent">
                {roundedRating}
              </span>
              <span className="text-sm text-gray-400 ml-1">/5</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
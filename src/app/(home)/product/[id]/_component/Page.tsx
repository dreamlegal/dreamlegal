"use client";
import ProductCompareCard from "@/components/ProductCompareCard";
import ProductInfoTab from "@/components/ProductInfoTab";
import ProductSidebar from "@/components/ProductSidebar";
import SliderElement from "@/components/Silder";
import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowRoundForward } from "react-icons/io";
import { IoLinkSharp, IoReturnUpBackOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder, MdOutlineInfo } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
// import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, X, AlertCircle } from "lucide-react";


import { TbPointFilled } from "react-icons/tb";
import Chart from "@/components/Chart";
import ProcessLifecycle from "@/components/ProcessLifecycle";
import ProductFeature from "@/components/ProductFeature";
import ProductPricingTable from "@/components/ProductPricingTable";
import ProductService from "@/components/ProductService";
import ProductReference from "@/components/ProductReference";
import ProductReview from "@/components/ProductReview";
import ProductMobileSidebar from "@/components/ProductMobileSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import useGeoLocation from "react-ipgeolocation";
import { GoShareAndroid } from "react-icons/go";
import { FiPrinter } from "react-icons/fi";
import ReactApexChart from "react-apexcharts";
import Loading from "@/components/Loading";
import BookACallForm from "@/components/BookACallForm";
import RfpForm from "@/components/RfpForm";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PostImplementation from "@/components/PostImplementation";
import PdfDownload from "./PdfDownload";
import CompatibilityResults from "./CompatibilityResults"
const countryNames: { [key: string]: string } = {
  US: "United States of America",
  IN: "India",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  FR: "France",
  DE: "Germany",
  JP: "Japan",
  CN: "China",
  BR: "Brazil",
  RU: "Russia",
  ZA: "South Africa",
  IT: "Italy",
  ES: "Spain",
  MX: "Mexico",
  KR: "South Korea",
  NG: "Nigeria",
  AR: "Argentina",
  SA: "Saudi Arabia",
  TR: "Turkey",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  NL: "Netherlands",
  BE: "Belgium",
  CH: "Switzerland",
  AT: "Austria",
  IE: "Ireland",
  NZ: "New Zealand",
  SG: "Singapore",
  MY: "Malaysia",
  TH: "Thailand",
  ID: "Indonesia",
  PH: "Philippines",
  VN: "Vietnam",
  EG: "Egypt",
  KE: "Kenya",
  GH: "Ghana",
  PK: "Pakistan",
  BD: "Bangladesh",
  LK: "Sri Lanka",
  IR: "Iran",
  IQ: "Iraq",
  IL: "Israel",
  AE: "United Arab Emirates",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  BH: "Bahrain",
  JO: "Jordan",
  LB: "Lebanon",
  SY: "Syria",
  YE: "Yemen",
  MA: "Morocco",
  DZ: "Algeria",
  TN: "Tunisia",
  LY: "Libya",
  SD: "Sudan",
  ET: "Ethiopia",
  UG: "Uganda",
  TZ: "Tanzania",
  ZM: "Zambia",
  MZ: "Mozambique",
  AO: "Angola",
  CM: "Cameroon",
  SN: "Senegal",
  CI: "Ivory Coast",

  NE: "Niger",
  BF: "Burkina Faso",
  ML: "Mali",
  MR: "Mauritania",
  GM: "Gambia",
  GN: "Guinea",
  SL: "Sierra Leone",
  LR: "Liberia",
  TG: "Togo",
  BJ: "Benin",
  NA: "Namibia",
  BW: "Botswana",
  SZ: "Eswatini",
  LS: "Lesotho",
  MW: "Malawi",
  RW: "Rwanda",
  BI: "Burundi",
  SO: "Somalia",
  DJ: "Djibouti",
  ER: "Eritrea",
  GQ: "Equatorial Guinea",
  GA: "Gabon",
  CG: "Republic of the Congo",
  CD: "Democratic Republic of the Congo",
  ST: "Sao Tome and Principe",
  CV: "Cape Verde",
  GW: "Guinea-Bissau",
  KM: "Comoros",
  SC: "Seychelles",
  MU: "Mauritius",
  MG: "Madagascar",
  RE: "Reunion",
  YT: "Mayotte",
};
import ChatInterface from "./ChatInterface";
import ReactToPrint from "react-to-print";

function PageComponent({ data }: any) {
  console.log(data);
  const location = useGeoLocation();
  const countryName = countryNames[location.country];
  console.log(countryName);
  const componentRef = useRef(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null; // Check if window is defined

  // add view
  const hasViewed = useRef(false); // Ref to track if the view has been added

  useEffect(() => {
    const viewedKey = `viewed_product_${data.product.id}`; // Unique key for sessionStorage

    const fetchUserData = async () => {
      if (!userId) {
        return "Uncategorized"; // Return default orgType if user is not logged in
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        if (userData.success) {
          console.log("User data fetched successfully:", userData);
          return userData.profile.CompanyType || "Uncategorized"; // Return orgType
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        console.error(err.message || "Error fetching user data");
        return "Uncategorized"; // Fallback to 'Uncategorized' on error
      }
    };

    const addView = async (userOrgType) => {
      if (!countryName) {
        console.warn("Country name is not available yet");
        return; // Exit if countryName is not ready
      }

      try {
        const response = await fetch("/api/add-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: data.product.id, // Sending the product ID
            userOrgType: userOrgType, // Use the fetched orgType
            country: countryName || "Unknown Country", // Ensure country is defined
          }),
        });

        const result = await response.json(); // Parse the JSON response

        if (response.ok) {
          console.log("View added successfully:", result.data);
          sessionStorage.setItem(viewedKey, "true"); // Mark as viewed for this session
        } else {
          console.error("Failed to add view:", result.message);
        }
      } catch (error) {
        console.error("Error adding view:", error);
      }
    };

    const handleAddView = async () => {
      if (!hasViewed.current && !sessionStorage.getItem(viewedKey)) {
        // Check if view has not been added
        hasViewed.current = true; // Mark as viewed
        const userOrgType = await fetchUserData(); // Fetch the user's orgType
        await addView(userOrgType); // Add the view with the orgType
      } else {
        console.log("Product already viewed in this session");
      }
    };

    if (countryName) {
      handleAddView(); // Trigger the logic to add the view only if countryName is available
    } else {
      console.warn("Country name is still loading");
    }
  }, [data.product, userId, countryName]); // Include countryName as a dependency

  const [product, setProduct] = useState(data.product);
  const [company, setCompany] = useState(data.company);
  const [user, _setUser] = useState(data.user);
  const [error, setError] = useState(null);
  const usps = product.usp ? product.usp.split(",") : [];
  const [isBookmarked, setIsBookmarked] = useState(false);


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return "Uncategorized"; // Return default orgType if user is not logged in
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        if (userData.success) {
          console.log("User data fetched successfully:", userData);
          setUserData(userData.profile); // Store user data in state
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        console.error(err.message || "Error fetching user data");
      }
    };

    fetchUserData();
  }, [userId]);

  console.log("product data: ",product);
  console.log("company", company);

  console.log("user data :",userData)


  // page functions 
  const savePageAsPDF = async () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
 

  const handleBookmarkClick = async () => {
    if (!userId) {
      alert("Please log in to bookmark products");
      return;
    }
    const userOrgType = await fetchUserOrgType();

    try {
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: data.product.slug,
          idForBookmark: data.product.id, // Include the additional field
          userOrgType,
          country: countryName || "Unknown Country",
        }),
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

  
  const handleDownload = async () => {
    const element = componentRef.current;
    if (!element) {
      console.error("Element is not defined");
      return;
    }

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [215.9, 279.4]); // Custom dimensions: 8.5in x 11in in mm

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Adjust the image size to fit the page dimensions
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    } catch (error) {
      console.error("Error generating PDF: ", error);
    }
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");

      // Check if the share has been recorded
      if (!hasShared) {
        const userOrgType = await fetchUserOrgType(); // Fetch orgType like views
        // API call to store share data
        const response = await fetch("/api/add-share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: data.product.id,
            userOrgType: userOrgType, // Include userOrgType
            country: countryName,
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log("Share recorded successfully:", result.share);
          setHasShared(true); // Mark as shared
        } else {
          console.error("Failed to record share:", result.msg);
        }
      }
    } catch (error) {
      console.error("Failed to copy to clipboard: ", error);
    }
  };

  // Analytics
  useEffect(() => {
    const checkBookmark = async () => {
      if (!userId) return;

      try {
        const response = await fetch("/api/check-bookmark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId: data.product.slug }),
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
  }, [userId, data.product]);

  const [hasShared, setHasShared] = useState(false);

  const handleShare = async () => {
    if (!hasShared) {
      const userOrgType = await fetchUserOrgType(); // Fetch orgType like views
      // API call to store share data
      const response = await fetch("/api/add-share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data.product.id,
          userOrgType: userOrgType, // Include userOrgType
          country: countryName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Share recorded successfully:", result.share);
        setHasShared(true); // Mark as shared
      } else {
        console.error("Failed to record share:", result.msg);
      }
    }
  };
  const fetchUserOrgType = async () => {
    if (!userId) {
      return "Uncategorized";
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      return userData.success
        ? userData.profile.CompanyType || "Uncategorized"
        : "Uncategorized";
    } catch (err) {
      console.error(err.message || "Error fetching user data");
      return "Uncategorized";
    }
  };


  // forms  bookmycall and rfp
  const CustomerUserId =
  typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  console.log(CustomerUserId);

 

  const [showBookACallForm, setShowBookACallForm] = useState(false);
  const [showRfpForm, setShowRfpForm] = useState(false);

  const handleOpenBookACallForm = () => {
    setShowBookACallForm(true);
  };

  const handleCloseBookACallForm = () => {
    setShowBookACallForm(false);
  };

  const handleOpenRfpForm = () => {
    setShowRfpForm(true);
  };

  const handleCloseRfpForm = () => {
    setShowRfpForm(false);
  };

  //compatibilty test
  // const [isOpen, setIsOpen] = useState(false);
  // const [results, setResults] = useState(null);


  // const [error, setError] = useState(null);

//   const formatDataForCompatibility = (productData, userData) => {
//     // Format industry data from product
//     const formattedIndustry = productData.industry.map(ind => {
//       const [industry, percentage, available] = ind.split('|');
//       return {
//         industry,
//         percentage: parseInt(percentage),
//         available: available === 'true'
//       };
//     });
  
//     // Format team size data from product
//     const formattedTeamSize = productData.teamSize.map(size => {
//       const [sizeRange, percentage, available] = size.split('|');
//       return {
//         size: sizeRange,
//         percentage: parseInt(percentage),
//         available: available === 'true'
//       };
//     });
  
//     // Format user category data from product
//     const formattedUserCategory = productData.userCategory.map(cat => {
//       const [category, percentage, available] = cat.split('|');
//       return {
//         category,
//         percentage: parseInt(percentage),
//         available: available === 'true'
//       };
//     });
  
//     // Structure the data in the required format
//     const formattedData = {
//       product_profile: {
//         focusCountries: productData.focusCountries,
//         languages: productData.languages,
//         userCategory: formattedUserCategory,
//         industry: formattedIndustry,
//         teamSize: formattedTeamSize
//       },
//       user_profile: {
//         Location: userData.Location,
//         CompanyType: userData.CompanyType,
//         PrimaryLanguage: userData.PrimaryLanguage,
//         Industry: userData.Industry,
//         TeamSize: userData.TeamSize,
//         Goals: userData.Goals
//       }
//     };
  
//     return formattedData;
//   };

//  // In your CompatibilityChecker component:
// const checkCompatibility = async () => {
//   try {
//     setError(null);
//     const formattedData = formatDataForCompatibility(product, userData);
    
//     const response = await fetch('http://localhost:8000/compatibility/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formattedData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to check compatibility');
//     }

//     const data = await response.json();
//     setResults(data);
//     setIsOpen(true);
//   } catch (err) {
//     setError(err instanceof Error ? err.message : 'An error occurred');
//   }
// };

//   const getMatchColor = (isMatch) => {
//     return isMatch ? 'bg-green-100' : 'bg-red-100';
//   };

//   const getMatchIcon = (isMatch) => {
//     return isMatch ? (
//       <Check className="h-5 w-5 text-green-600" />
//     ) : (
//       <X className="h-5 w-5 text-red-600" />
//     );
//   };

const formatDataForCompatibility = (productData, userData) => {
  // Format industry data from product
  const formattedIndustry = productData.industry.map(ind => {
    const [industry, percentage, available] = ind.split('|');
    return {
      industry,
      percentage: parseInt(percentage),
      available: available === 'true'
    };
  });

  // Format team size data from product
  const formattedTeamSize = productData.teamSize.map(size => {
    const [sizeRange, percentage, available] = size.split('|');
    return {
      size: sizeRange,
      percentage: parseInt(percentage),
      available: available === 'true'
    };
  });

  // Format user category data from product
  const formattedUserCategory = productData.userCategory.map(cat => {
    const [category, percentage, available] = cat.split('|');
    return {
      category,
      percentage: parseInt(percentage),
      available: available === 'true'
    };
  });

  return {
    product_profile: {
      focusCountries: productData.focusCountries,
      languages: productData.languages,
      userCategory: formattedUserCategory,
      industry: formattedIndustry,
      teamSize: formattedTeamSize
    },
    user_profile: {
      Location: userData.Location,
      CompanyType: userData.CompanyType,
      PrimaryLanguage: userData.PrimaryLanguage,
      Industry: userData.Industry,
      TeamSize: userData.TeamSize,
      Goals: userData.Goals
    }
  };
};


  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);

  const [loading, setLoading] = useState(false);

  const calculateOverallMatch = () => {
    if (!results) return 0;
    const matches = Object.values(results.response).filter(value => value).length;
    return Math.round((matches / Object.values(results.response).length) * 100);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-blue-100 text-blue-800";
    if (percentage >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const checkCompatibility = async () => {
    // If we already have results, just open the dialog
    if (results) {
      setIsOpen(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const formattedData = formatDataForCompatibility(product, userData);
      
      const response = await fetch('http://localhost:8000/compatibility/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Failed to check compatibility');
      }

      const data = await response.json();
      setResults(data);
      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const matchPercentage = calculateOverallMatch();




  if (!product) {
    return <Loading />;
  }
  return (

<>

    <div>
  

    {/* {error && (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )} */}

{/* <CompatibilityResults 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        results={results}
      /> */}

{/* <ChatInterface 
  userData={product} 
  productData={userData}
/> */}

<ChatInterface 
  productId={product.id}
  userId={CustomerUserId}
/>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">
              Compatibility Analysis
            </DialogTitle>
          </DialogHeader>

          {results && (
            <div className="space-y-4">
              {/* Overall Match Card */}
              <div className={cn(
                "p-4 rounded-lg flex items-center justify-between",
                getMatchColor(matchPercentage)
              )}>
                <div>
                  <h3 className="text-lg font-semibold">Overall Match</h3>
                  <Progress 
                    value={matchPercentage} 
                    className="h-2 w-40 mt-2"
                  />
                </div>
                <span className="text-2xl font-bold">{matchPercentage}%</span>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(results.response).map(([key, value]) => (
                  <div
                    key={key}
                    className={cn(
                      "p-3 rounded-lg flex items-center justify-between",
                      value ? "bg-green-50" : "bg-red-50"
                    )}
                  >
                    <span className="font-medium text-sm">{key}</span>
                    {value ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
  
  </div>
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
      <Link href={`/directory`}>
        <div className=" flex gap-2  text-gray-900  my-4 transition-all duration-200 hover:cursor-pointer hover:translate-y-[-3px] hover:text-primary1 hover:gap-3 items-center ">
          <IoReturnUpBackOutline className=" text-[22px] " />
          <span className=" text-sm font-bold">Browse all products</span>
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className=" w-full md:col-span-1 md:h-fit md:sticky md:top-0  ">
          <ProductSidebar product={product} />
        </div>

        <div className=" md:col-span-3 overflow-y-scroll no-scrollbar ">
          <div className="block md:hidden">
            <div className="fixed right-0 top-1/2  z-50 ">
              <Sheet>
                <SheetTrigger asChild>
                  <button className=" bg-black text-white py-4 px-4 rounded-full text-xs">
                    <HiDotsVertical />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <ProductMobileSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
            <div className="flex justify-end p-4">
            {/* <Button 
              onClick={checkCompatibility}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Check Compatibility
            </Button> */}
             <Button 
        onClick={checkCompatibility}
        className="bg-blue-600 hover:bg-blue-700 text-white"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Compatibility"}
      </Button>
            </div>
          <div className=" border shadow-md rounded-3xl px-4 md:px-16 py-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 md:flex-row  md:items-center">
                <h1 className="font-bold text-xl md:text-3xl ">
                  {product.name}
                </h1>
                <div className=" flex gap-3 flex-wrap sm:flex-nowrap">
                  <div className="pl-1">
                    <div className=" flex gap-3 flex-wrap sm:flex-nowrap">
                      <Button
                      className="bg-primary1 transition-all duration-300 rounded-[20px] flex items-center"
                      onClick={handleOpenRfpForm}
                      >
                      <Pencil className="mr-2 h-4 w-4" />
                      <p className="mt-1">Request a Proposal</p>
                      </Button>
                      <Button
                      className="bg-primary1 transition-all duration-300 rounded-[20px] flex items-center"
                      onClick={handleOpenBookACallForm}
                      >
                      <Calendar className="mr-2 h-4 w-4" />
                      <p className="mt-1">Book a Call</p>
                      </Button>
                    </div>

                    {showBookACallForm && (
                      <BookACallForm
                        onClose={handleCloseBookACallForm}
                        CustomerUserId={CustomerUserId}
                        vendorId={company.userId}
                        productId={product.id}
                        vendorName={company.companyName}
                        productName={product.name}
                      />
                    )}
                    {showRfpForm && (
                      <RfpForm
                        onClose={handleCloseRfpForm}
                        CustomerUserId={CustomerUserId}
                        vendorId={company.userId}
                        productId={product.id}
                        vendorName={company.companyName}
                        productName={product.name}
                        parentFeatures={product.features}
                        productCategory={product.category}
                      />
                    )}
                  </div>
                  <div
                    className="text-xl text-primary1 p-2 rounded-full border border-primary1"
                    onClick={handleBookmarkClick}
                  >
                    <MdOutlineBookmarkBorder
                      className={isBookmarked ? "text-teal-500" : ""}
                    />
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="text-xl text-primary1 p-2 rounded-full border border-primary1">
                        <GoShareAndroid />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                          Anyone who has this link will be able to view this.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="link"
                            defaultValue={`https://www.dreamlegal.in/product/${data.product.slug}`}
                            readOnly
                          />
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(
                                `https://www.dreamlegal.in/product/${data.product.slug}`
                              )
                            }
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        {/* Social Share Buttons */}
                        <FacebookShareButton
                          url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          onClick={() => handleShare("Facebook")}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <TwitterShareButton
                          url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          onClick={() => handleShare("Twitter")}
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        <WhatsappShareButton
                          url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          onClick={() => handleShare("Whatsapp")}
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        <LinkedinShareButton
                          url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          onClick={() => handleShare("LinkedIn")}
                        >
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>

                        <RedditShareButton
                          url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          onClick={() => handleShare("Reddit")}
                        >
                          <RedditIcon size={32} round />
                        </RedditShareButton>

                        <TelegramShareButton
                          url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          onClick={() => handleShare("Telegram")}
                        >
                          <TelegramIcon size={32} round />
                        </TelegramShareButton>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div>
                    <ReactToPrint
                      trigger={() => (
                        <div className="text-xl text-primary1 p-2 rounded-full border border-primary1">
                          <FiPrinter />
                        </div>
                      )}
                      content={() => componentRef.current}
                      pageStyle="@page { size: 8.5in 11in; margin: 1in; }" // Custom page size and margin
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className=" inline-flex gap-3 flex-wrap">
                  {product?.category?.map(
                    (
                      cat:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <div
                        key={index}
                        className="py-1 px-2.5 border  transition-all duration-200 hover:cursor-pointer  rounded-full text-xs bg-primary2 border-primary1 text-primary1"
                      >
                        {cat}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div id="company" className=" flex flex-col gap-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-900 font-bold">
                      Company Name
                    </p>
                    <p className="text-sm text-slate-500">
                      {company?.companyName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">
                      Year Founded
                    </p>
                    {/* <p className="text-sm text-slate-500">
                      {company.yearFounded}
                    </p> */}
                    <div className="relative">
  {!data.product.isVendorVerified && (
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />
  )}
  <p className={`text-sm text-slate-500 ${!product.isVendorVerified ? 'select-none' : ''}`}>
    {company.yearFounded}
  </p>
</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Awards</p>
                    <p className="text-sm text-slate-500">{company.Awards}</p>
                  </div>
                </div>

                <div className=" flex flex-col gap-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-900 font-bold">
                      Headquarters
                    </p>
                    <p className="text-sm text-slate-500">
                      {company.headQuaters}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Founders</p>
                    <p className="text-sm text-slate-500">
                      {company.NameOfFounders}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-900 font-bold">
                      Team size{" "}
                    </p>
                    <p className="text-sm text-slate-500">{company.TeamSize}</p>
                  </div>
                </div>

                <div className=" flex flex-col gap-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Email</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Phone</p>
                    <p className="text-sm text-slate-500">{company.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Website</p>
                    <p className="text-sm text-slate-500">
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {company.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 my-4"></div>
              <div>
                <div className=" my-8 flex flex-col">
                  <h2 id="product" className="text-2xl font-bold">
                    About the product
                  </h2>
                  <p className="text-sm text-slate-500 my-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <ProductInfoTab product={product} />

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <h2 id="overviews" className="text-2xl font-bold">
                Overview
              </h2>

              <div className="flex flex-col gap-4">
                <div className="bg-primary2/40 px-5 py-3 rounded-2xl">
                  <div className="flex it  gap-2 items-center mb-2">
                    <h2 className=" text-lg font-bold text-gray-900">USP</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <MdOutlineInfo className="text-slate-500 text-sm" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> What's different in this product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[15px] ">{product.usp}</p>
                    {/* <ul className="flex flex-col gap-4 py-3">
                      {usps.map((usp: string, index: number) => (
                        <li key={index} className="flex gap-3 items-center">
                          <TbPointFilled className="text-primary1" />
                          <p className="text-gray-900">{usp.trim()}</p>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                </div>

                <div className=" flex flex-col gap-4 ">
                  <div className="bg-primary2/40 px-5 py-3 rounded-2xl">
                    <div className="flex  gap-2 items-center  mb-2">
                      <h2 className=" text-lg font-bold text-gray-900">
                        Pain point addressed
                      </h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineInfo className="text-slate-500 text-sm" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>About the company</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className=" text-sm text-slate-500">
                      {product.painPointAddressed}
                    </p>
                  </div>

                  <div className="bg-primary2/40 px-5 py-3 rounded-2xl">
                    <div className="flex  gap-2 items-center  mb-2">
                      <h2 className=" text-lg font-bold text-gray-900">
                        Upcoming Updates
                      </h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineInfo className="text-slate-500 text-sm" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>: Future feature teasers</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className=" text-sm text-slate-500">
                      {product.upcomingUpdates}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex flex-col gap-4 w-full">
                <h2
                  id="lifecycle"
                  className=" text-4xl font-bold text-gray-900"
                >
                  Customer Segments
                </h2>
                <div className="w-full h-px bg-slate-200 my-4"></div>
                <Chart product={product} />
              </div>

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2
                  id="lifecycle"
                  className=" text-2xl font-bold text-gray-900"
                >
                  Process Lifecycle
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Process and Workflow Impact of the product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <ProcessLifecycle product={product} />

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2 id="features" className=" text-2xl font-bold text-gray-900">
                  Features
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Capabilities of this product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <ProductFeature
                features={product.features}
                productId={product.slug}
                productIdForFeatures={data.product.id}
              />

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2 id="pricing" className=" text-2xl font-bold text-gray-900">
                  Pricing
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Terms of product costing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className=" flex flex-col md:flex-row justify-between">
                <div>
                  <p className="text-lg text-gray-900 font-bold">Free Trial</p>
                  <p className="text-sm text-slate-500">{product.freeTrial}</p>
                </div>

                <div>
                  <p className="text-lg text-gray-900 font-bold">
                    Time period{" "}
                    <span className="text-slate-500 text-sm">(Free Trial)</span>
                  </p>
                  <p className="text-sm text-slate-500">{product.timePeriod}</p>
                </div>

                <div>
                  <p className="text-lg text-gray-900 font-bold">
                    Free version
                  </p>
                  <p className="text-sm text-slate-500">
                    {product.freeVersion}
                  </p>
                </div>
              </div>

              {product.pricingParams.length > 0 ? (
                <div>
                  <div className="flex  gap-2 items-center mb-3">
                    <h2 className=" text-lg  font-bold text-gray-900 ">
                      Pricing parameter
                    </h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <MdOutlineInfo className="text-slate-500 text-sm" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Factors that impact pricing of this product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className=" inline-flex gap-3 flex-wrap">
                      {product.pricingParams.map((parameter: string) => (
                        <div
                          key={parameter}
                          className="py-1 px-2.5 border  transition-all duration-200 hover:cursor-pointer  rounded-full text-xs bg-primary2 border-primary1 text-primary1"
                        >
                          {parameter}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {product.nameofPlan && product.nameofPlan.length > 0 ? (
                <>
                  <ProductPricingTable
                    nameofPlan={product.nameofPlan}
                    validity={product.validity}
                    price={product.price}
                  />
                </>
              ) : (
                <Label className="text-lg w-[50%] font-semibold bg-white rounded-[5px] shadow-md p-3">
                  No Fixed Pricing Plans Chosen
                </Label>
              )}

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2 id="support" className=" text-2xl font-bold text-gray-900">
                  Support & Services
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assistance by the company for this product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <ProductService product={product} />

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2 id="post" className=" text-2xl font-bold text-gray-900">
                  Post Implementation
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Assistance for this product after the
                        purchase/installation{" "}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <PostImplementation product={product} />

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2
                  id="reference"
                  className=" text-2xl font-bold text-gray-900"
                >
                  Reference
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Social and public presence</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div>
                <SliderElement>
                  {product?.Images?.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      className="w-full rounded-3xl"
                      alt=""
                    />
                  ))}
                </SliderElement>
              </div>

              <ProductReference product={product} />

              <div className="w-full h-px bg-slate-200 my-4"></div>

              <div className="flex  gap-2 items-center">
                <h2 id="reviews" className=" text-2xl font-bold text-gray-900">
                  Reviews
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Word From the Users</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <ProductReview product={product} />
            </div>
          </div>

          <div className=" block ">
            <h2 className="text-xl md:text-2xl font-bold my-4">
              Similar products
            </h2>
            <div className="flex flex-col  gap-3 md:px-2 my-5">
              <ProductCompareCard />
              <ProductCompareCard />
              <ProductCompareCard />
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div ref={componentRef}>
          <PdfDownload data={data} />
        </div>
      </div>
    </div>
    </>
  );
}

export default PageComponent;

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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbPointFilled } from "react-icons/tb";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PostImplementation from "@/components/PostImplementation";
import PdfDownload from "./PdfDownload";

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
import ReactToPrint from "react-to-print";
function PageComponent({ data }: any) {
  console.log(data)
  const location = useGeoLocation();
  const countryName = countryNames[location.country];
  console.log(countryName);
  const componentRef = useRef(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null; // Check if window is defined

  useEffect(() => {
    const addAnalytics = async () => {
      const loginsViews = userId ? 1 : 0;
      const userAgent = navigator.userAgent;
      let desktopViews = 0;
      let mobileViews = 0;
      let tabletViews = 0;

      if (/Mobi|Android/i.test(userAgent)) {
        mobileViews = 1;
      } else if (/Tablet|iPad/i.test(userAgent)) {
        tabletViews = 1;
      } else {
        desktopViews = 1;
      }

      try {
        const response = await fetch("/api/add-analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.product.userId,
            productId: data.product.slug,
            views: 1,
            loginsViews: loginsViews,
            desktopViews: desktopViews,
            mobileViews: mobileViews,
            tabletViews: tabletViews,
            country: countryName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add analytics");
        }

        const result = await response.json();
        console.log("Analytics added:", result);
      } catch (error) {
        console.error("Error adding analytics:", error);
      }
    };

    const addInterest = async () => {
      if (!userId) return;
      try {
        const response = await fetch("/api/add-interest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId: data.product.id }),
        });
        if (!response.ok) {
          console.error("Failed to add interest");
        }

        const result = await response.json();
        console.log("Interest added:", result);
      } catch (error) {
        console.error("Error adding interest:", error);
      }
    };

    addAnalytics();
    addInterest();
  }, [data, countryName, userId]);
  const [product, setProduct] = useState(data.product);
  const [company, setCompany] = useState(data.company);
  const [user, _setUser] = useState(data.user);
  const [error, setError] = useState(null);
  const usps = product.usp ? product.usp.split(",") : [];
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Fetch initial bookmark status if needed
    // This can be an API call to check if the product is already bookmarked by the user
  }, []);
  const savePageAsPDF = async () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
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

  const handleBookmarkClick = async () => {
    if (!userId) {
      alert("Please log in to bookmark products");
      return;
    }

    try {
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: data.product.slug }),
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

  if (!product) {
    return <Loading />;
  }

  console.log(product);
  console.log(company);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard: ", error);
      });
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

  return (
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
          <div className=" border shadow-md rounded-3xl px-4 md:px-16 py-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row  md:items-center">
                <h1 className="font-bold text-xl md:text-3xl">
                  {product.name}
                </h1>
                <div className="flex gap-3 md:ml-auto">
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
                        <div className="">
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
                        <div>
                          <FacebookShareButton
                            url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                        </div>
                        <div>
                          <TwitterShareButton
                            url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </div>
                        <div>
                          <WhatsappShareButton
                            url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                        </div>
                        <div>
                          <LinkedinShareButton
                            url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </div>
                        <div>
                          <RedditShareButton
                            url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          >
                            <RedditIcon size={32} round />
                          </RedditShareButton>
                        </div>
                        <div>
                          <TelegramShareButton
                            url={`https://www.dreamlegal.in/product/${data.product.slug}`}
                          >
                            <TelegramIcon size={32} round />
                          </TelegramShareButton>
                        </div>
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
              <div className="flex ">
                <div className=" md:w-3/4">
                  <p className="text-sm text-slate-500">
                    {`${product?.description}`}
                  </p>
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
                {/* <button className="  flex gap-2 rounded-full bg-black  text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary1 hover:gap-4">
                  <Link href={company.website}>
                    {" "}
                    Visit
                    <IoIosArrowRoundForward className=" text-xl" />
                  </Link>
                </button> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div id="company" className=" flex flex-col gap-3">
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
                    <p className="text-sm text-slate-500">
                      {company.yearFounded}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Awards</p>
                    <p className="text-sm text-slate-500">{company.Awards}</p>
                  </div>
                </div>

                <div className=" flex flex-col gap-3">
                  <div>
                    <p className="text-sm text-gray-900 font-bold">
                      Headquaters
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

                <div className=" flex flex-col gap-3">
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Email</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Phone</p>
                    <p className="text-sm text-slate-500">{company.contact}</p>
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
              {/* Overview */}

              <h2 id="overviews" className="text-2xl font-bold">
                Overview
              </h2>

              <div className="flex flex-col gap-4">
                <div className="bg-primary2/40 px-5 py-3 rounded-2xl">
                  <div className="flex it  gap-2 items-center">
                    <h2 className=" text-lg font-bold text-gray-900 mb-2">
                      USP
                    </h2>
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
                    <div className="flex  gap-2 items-center">
                      <h2 className=" text-lg font-bold text-gray-900 mb-2">
                        Product Brief
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
                      {product.description}
                    </p>
                  </div>

                  <div className="bg-primary2/40 px-5 py-3 rounded-2xl">
                    <div className="flex  gap-2 items-center">
                      <h2 className=" text-lg font-bold text-gray-900 mb-2">
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

              {/* Segments */}

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col md:flex-row w-full gap-4">
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <h2
                        id="customers"
                        className="text-2xl font-bold text-gray-900 mb-3"
                      >
                        Customer segments
                      </h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineInfo className="text-slate-500 text-sm" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Type of company's clientele</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="inline-flex gap-3 flex-wrap">
                        {product.userCategory.map((segment: string) => (
                          <div
                            key={segment}
                            className="py-1 px-2.5 border  transition-all duration-200 hover:cursor-pointer  rounded-full text-xs bg-primary2 border-primary1 text-primary1"
                          >
                            {segment}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <div
                      id="chart"
                      style={{ maxWidth: "90%", margin: "0 auto" }}
                      className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center"
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          theme: {
                            palette: "palette10",
                          },
                          labels: product.userCategory,
                          legend: {
                            position: "bottom",
                          },
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: 100, // Change width to 100px for mobile
                                },
                              },
                            },
                            {
                              breakpoint: 1024,
                              options: {
                                chart: {
                                  width: 300, // Keep width as 400px for desktop
                                },
                              },
                            },
                          ],
                        }}
                        series={product.userCategoryPercentage.map(
                          (percentage: string) => parseFloat(percentage)
                        )}
                        type="pie"
                        width={300}
                      />
                      <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
                        Distribution
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200 my-4"></div>
                <div className="flex flex-col md:flex-row  w-full gap-4">
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Industries
                      </h2>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineInfo className="text-slate-500 text-sm" />
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>
                              Sectors this product is making an impacting in
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="inline-flex gap-3 flex-wrap">
                        {product.industry.map((segment: string) => (
                          <div
                            key={segment}
                            className="py-1 px-2.5 border  transition-all duration-200 hover:cursor-pointer  rounded-full text-xs bg-primary2 border-primary1 text-primary1"
                          >
                            {segment}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1  mt-4 md:mt-0">
                    <div
                      id="chart"
                      style={{ maxWidth: "90%", margin: "0 auto" }}
                      className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center"
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          theme: {
                            palette: "palette10",
                          },
                          labels: product.industry,
                          legend: {
                            position: "bottom",
                          },
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: 100, // Change width to 100px for mobile
                                },
                              },
                            },
                            {
                              breakpoint: 1024,
                              options: {
                                chart: {
                                  width: 300, // Keep width as 400px for desktop
                                },
                              },
                            },
                          ],
                        }}
                        series={product.industryPercentage.map(
                          (percentage: string) => parseFloat(percentage)
                        )}
                        type="pie"
                        width={300}
                      />
                      <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
                        Distribution
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200 my-4"></div>
                <div className="flex flex-col md:flex-row w-full gap-4">
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <h2 className="text-2xl mb-3 font-bold text-gray-900">
                        Practice Area
                      </h2>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineInfo className="text-slate-500 text-sm" />
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>
                              Legal practice areas supported by this product
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="inline-flex gap-3 flex-wrap">
                        {product.practiceAreas.map((segment: string) => (
                          <div
                            key={segment}
                            className="py-1 px-2.5 border  transition-all duration-200 hover:cursor-pointer  rounded-full text-xs bg-primary2 border-primary1 text-primary1"
                          >
                            {segment}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 mt-4 md:mt-0">
                    <div
                      id="chart"
                      style={{ maxWidth: "90%", margin: "0 auto" }}
                      className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center"
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          theme: {
                            palette: "palette10",
                          },
                          labels: product.practiceAreas,
                          legend: {
                            position: "bottom",
                          },
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: 100, // Change width to 100px for mobile
                                },
                              },
                            },
                            {
                              breakpoint: 1024,
                              options: {
                                chart: {
                                  width: 300, // Keep width as 400px for desktop
                                },
                              },
                            },
                          ],
                        }}
                        series={product.practiceAreasPercentage.map(
                          (percentage: string) => parseFloat(percentage)
                        )}
                        type="pie"
                        width={300}
                      />
                      <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
                        Distribution
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200 my-4"></div>
                <div className="flex flex-col md:flex-row w-full gap-4">
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <h2
                        id="customers"
                        className="text-2xl font-bold text-gray-900 mb-3"
                      >
                        Client’s team size
                      </h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineInfo className="text-slate-500 text-sm" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Type of company's clientele</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="inline-flex gap-3 flex-wrap">
                        {product.teamSize.map((segment: string) => (
                          <div
                            key={segment}
                            className="py-1 px-2.5 border  transition-all duration-200 hover:cursor-pointer  rounded-full text-xs bg-primary2 border-primary1 text-primary1"
                          >
                            {segment}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <div
                      id="chart"
                      style={{ maxWidth: "90%", margin: "0 auto" }}
                      className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center"
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          theme: {
                            palette: "palette10",
                          },
                          labels: product.teamSize,
                          legend: {
                            position: "bottom",
                          },
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: 100, // Change width to 100px for mobile
                                },
                              },
                            },
                            {
                              breakpoint: 1024,
                              options: {
                                chart: {
                                  width: 300, // Keep width as 400px for desktop
                                },
                              },
                            },
                          ],
                        }}
                        series={product.teamsizePercentage.map(
                          (percentage: string) => parseFloat(percentage)
                        )}
                        type="pie"
                        width={300}
                      />
                      <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
                        Distribution
                      </h2>
                    </div>
                  </div>
                </div>
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
              {/* Features */}

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
                  <div className="flex  gap-2 items-center">
                    <h2 className=" text-lg  font-bold text-gray-900 mb-3">
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

              <ProductPricingTable
                nameofPlan={product.nameofPlan}
                validity={product.validity}
                price={product.price}
              />

              <div className="w-full h-px bg-slate-200 my-4"></div>
              {/* Support */}
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
              {/* Reviews */}
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
  );
}

export default PageComponent;

"use client";
import PostImplementation from "@/components/PostImplementation";
import ProcessLifecycle from "@/components/ProcessLifecycle";
import ProductFeature from "@/components/ProductFeature";
import ProductFeature2 from "@/components/ProductFeature2";
import ProductInfoTab from "@/components/ProductInfoTab";
import ProductPricingTable from "@/components/ProductPricingTable";
import ProductReference from "@/components/ProductReference";
import ProductService from "@/components/ProductService";
import SliderElement from "@/components/Silder";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { MdOutlineInfo } from "react-icons/md";

function PdfDownload({ data }: any) {
  const [product, setProduct] = useState(data.product);
  const [company, setCompany] = useState(data.company);
  return (
    <div className="font-clarity px-4">
      <div className="mt-10 flex flex-col justify-between">
        <span className="text-4xl font-bold">Dreamlegal</span>
        <span className="text-sm font-bold italic text-blue-500">Visit: {`https://www.dreamlegal.in/product/${product.slug}`}</span>
      </div>
      <div className="h-10">
        <h1 className="text-2xl font-bold">Product Details</h1>
      </div>
      <hr />
      <div className=" border shadow-md rounded-3xl px-4 md:px-16 py-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row  md:items-center">
            <h1 className="font-bold text-xl md:text-3xl">{product.name}</h1>
            <div className="flex gap-3 md:ml-auto"></div>
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
          </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div id="company" className=" flex flex-col gap-3">
              <div>
                <p className="text-sm text-gray-900 font-bold">Company Name</p>
                <p className="text-sm text-slate-500">{company?.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-900 font-bold">Founded Date</p>
                <p className="text-sm text-slate-500">{company.yearFounded}</p>
              </div>

              <div>
                <p className="text-sm text-gray-900 font-bold">Region</p>
                <p className="text-sm text-slate-500">{company.regionServed}</p>
              </div>
            </div>

            <div className=" flex flex-col gap-3">
              <div>
                <p className="text-sm text-gray-900 font-bold">Headquaters</p>
                <p className="text-sm text-slate-500">{company.headQuaters}</p>
              </div>
              <div>
                <p className="text-sm text-gray-900 font-bold">Founders</p>
                <p className="text-sm text-slate-500">
                  {company.NameOfFounders}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-900 font-bold">Team size </p>
                <p className="text-sm text-slate-500">{company.TeamSize}</p>
              </div>
            </div>

            <div className=" flex flex-col gap-3">
              <div>
                <p className="text-sm text-gray-900 font-bold">Email</p>
                <p className="text-sm text-slate-500">contact@manupatra.com</p>
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
              <div className="flex  gap-2 items-center">
                <h2 className=" text-lg font-bold text-gray-900 mb-2">USP</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdOutlineInfo className="text-slate-500 text-sm" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Unique selling points</p>
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
                    Company Overview
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdOutlineInfo className="text-slate-500 text-sm" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Overview of company,products in short</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className=" text-sm text-slate-500">{company.overview}</p>
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
                        <p>Founder vision of company,growth</p>
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
                        <p>Overview of company, products in short</p>
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
                        <p>Overview of company, products in short</p>
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
                        <p>Overview of company, products in short</p>
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
          </div>

          <div className="w-full h-px bg-slate-200 my-4"></div>

          <div className="flex  gap-2 items-center">
            <h2 id="lifecycle" className=" text-2xl font-bold text-gray-900">
              Process Lifecycle
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MdOutlineInfo className="text-slate-500 text-sm" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lifecycle of process</p>
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
                  <p>Lifecycle of process</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <ProductFeature2
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
                  <p>Lifecycle of process</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className=" flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-lg text-gray-900 font-bold">Free trail</p>
              <p className="text-sm text-slate-500">{product.freeTrial}</p>
            </div>

            <div>
              <p className="text-lg text-gray-900 font-bold">Time period</p>
              <p className="text-sm text-slate-500">{product.timePeriod}</p>
            </div>

            <div>
              <p className="text-lg text-gray-900 font-bold">Free version</p>
              <p className="text-sm text-slate-500">{product.freeVersion}</p>
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
                      <p>Overview of company,products in short</p>
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
                  <p>Lifecycle of process</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <ProductService product={product} />

          <div className="w-full h-px bg-slate-200 my-4"></div>
          <div className="flex  gap-2 items-center">
            <h2 id="support" className=" text-2xl font-bold text-gray-900">
              Post Implementation
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MdOutlineInfo className="text-slate-500 text-sm" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lifecycle of process</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <PostImplementation product={product} />

          <div className="w-full h-px bg-slate-200 my-4"></div>

          <div className="flex  gap-2 items-center">
            <h2 id="reference" className=" text-2xl font-bold text-gray-900">
              Reference
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MdOutlineInfo className="text-slate-500 text-sm" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lifecycle of process</p>
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
        </div>
      </div>
    </div>
  );
}

export default PdfDownload;

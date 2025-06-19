"use client";
import PostImplementation from "@/components/PostImplementation";
import ProcessLifecycle from "@/components/ProcessLifecycle";
// import ProductFeature from "@/components/ProductFeature";
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
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { MdOutlineInfo } from "react-icons/md";
import Chart from  "@/components/Chart";
import ProductFeaturePdf from "@/components/ProductFeaturePdf";


function PdfDownload({ data }: any) {
  const [product, setProduct] = useState(data.product);
  const [company, setCompany] = useState(data.company);
   const [user, _setUser] = useState(data.user);
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
                <h1 className="font-bold text-xl md:text-3xl">
                  {product.name}
                </h1>
               
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
                  <div>
                    <p className="text-sm text-gray-900 font-bold">Awards</p>
                    <p className="text-sm text-slate-500">{company.Awards}</p>
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
                    Legal Buddy addresses the pain point of complex and disorganized contract management, where unclear clauses, lack of privacy controls, and limited data insights often lead to inefficiencies. By simplifying the contract lifecycle, it helps businesses avoid confusion, reduce risks, and make informed decisions with ease.
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

              

              <div className="flex flex-col gap-4 w-full p-6 my-8">
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

              <div className="flex  gap-2 items-center mt-6">
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

              <ProductFeaturePdf
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


              {(product.nameofPlan && product.nameofPlan.length > 0) ? (
                <>
                <ProductPricingTable
                              nameofPlan={product.nameofPlan}
                              validity={product.validity}
                              price={product.price}
                            />
                </>
                ) : ( 
                    <Label className="text-lg w-[50%] font-semibold bg-white rounded-[5px] shadow-md p-3">No Fixed Pricing Plans Chosen</Label>
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

              <div className="space-y-4">
      {product?.Images?.map((image, index) => (
        <div key={index} className="w-full">
          <img
            src={image}
            className="w-full h-auto object-cover rounded-lg"
            alt={`Product image ${index + 1}`}
          />
        </div>
      ))}
    </div>

              <ProductReference product={product} />

              <div className="w-full h-px bg-slate-200 my-4"></div>

            
             
            </div>
          </div>
    </div>
    
  );
}

export default PdfDownload;

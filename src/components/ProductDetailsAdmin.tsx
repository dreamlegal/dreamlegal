"use client";
import React, { useEffect, useState } from "react";
import ProductInfoTab from "./ProductInfoTab";
import ReactApexChart from "react-apexcharts";
import ProcessLifecycle from "./ProcessLifecycle";
import ProductFeature from "./ProductFeature";
import ProductPricingTable from "./ProductPricingTable";
import ProductService from "./ProductService";
import PostImplementation from "./PostImplementation";
import SliderElement from "./Silder";
import ProductReference from "./ProductReference";

type CompanyInfo = {
  id: string;
  userId: string;
  companyName?: string;
  website?: string;
  yearFounded?: string;
  headQuaters?: string;
  NameOfFounders?: string;
  contact?: string;
  founderVision?: string;
  regionServed?: string;
  TeamSize?: string;
  overview?: string;
  Awards?: string;
  PointOfContactName?: string;
  PointOfContactPhone?: string;
  PointOfContactDesignation?: string;
};

type Product = {
  id: string;
  userId: string;
  companyId: string;
  name: string;
  slug: string;
  logoUrl: string;
  active: string;
  featured: boolean;
  category: string[];
  deployement: string[];
  mobileAvailable?: string;
  focusCountries: string[];
  avgTimeAdoption?: string;
  languages: string[];
  securityCertificate?: string;
  integration: string[];
  description?: string;
  usp?: string;
  upcomingUpdates?: string;
  userCategory: string[];
  userCategoryPercentage: string[];
  industry: string[];
  industryPercentage: string[];
  practiceAreas: string[];
  practiceAreasPercentage: string[];
  teamSize: string[];
  teamsizePercentage: string[];
  processLifecycle?: object;
  features?: object;
  freeTrial?: string;
  timePeriod?: string;
  freeVersion?: string;
  pricingModel: string[];
  contractPeriod?: string;
  nameofPlan: string[];
  validity: string[];
  price: string[];
  pricingParams: string[];
  Demo: string[];
  DemoNote?: string;
  support: string[];
  supportNote?: string;
  training: string[];
  trainingNote?: string;
  storage: string[];
  storageNote?: string;
  fileSize: string[];
  fileSizeNote?: string;
  maintenance?: string;
  maintenanceNote?: string;
  reqForChange?: string;
  reqForChangeNote?: string;
  trainingReq?: string;
  trainingReqNote?: string;
  dataMigration?: string;
  dataMigrationNote?: string;
  Images: string[];
  videoUrl?: string;
  attachments: string[];
  youtubeUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
};

function ProductDetailsAdmin({ id }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const [company, setCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/get-product-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        setProduct(data.product);
        setCompany(data.company);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-clarity">
      <div className="px-4 flex gap-2">
        {/* <div>
            <img className="rounded-lg h-28 w-28" src="https://assets-global.website-files.com/63bed0273cfe5e611e742359/63c82fd5f0b9d119f5e3d6c0_webtech-featured-image-aggregator-x-webflow-template.svg" alt="" />
        </div>
        <div>
            <h1>Product Name</h1>
        </div> */}

        <div className=" border shadow-md rounded-3xl px-4 md:px-16 py-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row  md:items-center">
              <h1 className="font-bold text-xl md:text-3xl">{product?.name}</h1>
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
              {/* <button className="  flex gap-2 rounded-full bg-black  text-white font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary1 hover:gap-4">
                  <Link href={company.website}>
                    {" "}
                    Visit
                    <IoIosArrowRoundForward className=" text-xl" />
                  </Link>
                </button> */}
            </div>

            <div className="flex flex-col md:flex-row justify-between">
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
                    Founded Date
                  </p>
                  <p className="text-sm text-slate-500">
                    {company?.yearFounded}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-900 font-bold">Region</p>
                  <p className="text-sm text-slate-500">
                    {company?.regionServed}
                  </p>
                </div>
              </div>

              <div className=" flex flex-col gap-3">
                <div>
                  <p className="text-sm text-gray-900 font-bold">Headquaters</p>
                  <p className="text-sm text-slate-500">
                    {company?.headQuaters}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-bold">Founders</p>
                  <p className="text-sm text-slate-500">
                    {company?.NameOfFounders}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-900 font-bold">Team size </p>
                  <p className="text-sm text-slate-500">{company?.TeamSize}</p>
                </div>
              </div>

              <div className=" flex flex-col gap-3">
                <div>
                  <p className="text-sm text-gray-900 font-bold">Phone</p>
                  <p className="text-sm text-slate-500">{company?.contact}</p>
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
                  </div>
                  <p className=" text-sm text-slate-500">{company?.overview}</p>
                </div>

                <div className="bg-primary2/40 px-5 py-3 rounded-2xl">
                  <div className="flex  gap-2 items-center">
                    <h2 className=" text-lg font-bold text-gray-900 mb-2">
                      Upcoming Updates
                    </h2>
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
            </div>

            <ProcessLifecycle product={product} />

            <div className="w-full h-px bg-slate-200 my-4"></div>
            {/* Features */}

            <div className="flex  gap-2 items-center">
              <h2 id="features" className=" text-2xl font-bold text-gray-900">
                Features
              </h2>
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
            </div>

            <ProductService product={product} />

            <div className="w-full h-px bg-slate-200 my-4"></div>
            <div className="flex  gap-2 items-center">
              <h2 id="support" className=" text-2xl font-bold text-gray-900">
                Post Implementation
              </h2>
            </div>

            <PostImplementation product={product as any} />

            <div className="w-full h-px bg-slate-200 my-4"></div>

            <div className="flex  gap-2 items-center">
              <h2 id="reference" className=" text-2xl font-bold text-gray-900">
                Reference
              </h2>
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
            </div>
            {/* Reviews */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsAdmin;

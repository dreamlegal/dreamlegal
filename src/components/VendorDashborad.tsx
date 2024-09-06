"use client";
import { useEffect, useState } from "react";
import CardDataStats from "./CardDataStat";
import { FaRegEye } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";
import { GoIterations } from "react-icons/go";
import { FiShare2 } from "react-icons/fi";
import dynamic from "next/dynamic";
import { Progress } from "./ui/progress";
import { useSearchParams } from "next/navigation";

const ChartOne = dynamic(() => import("./ChartOne"), { ssr: false });
const ChartTwo = dynamic(() => import("./ChartTwo"), { ssr: false });

interface AnalyticsData {
  productId: string;
  data: { x: string; y: number }[];
}

interface DashboardData {
  totalViews: number;
  totalFollowers: number;
  totalLogins: number;
  totalShares: number;
  analytics: AnalyticsData;
  country: Record<string, number>;
}

function VendorDashboard({ productId, allProducts }: any) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [features, setFeatures] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [totalClick, settotalClick] = useState(0);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [productId2, setProductId] = useState<string | null>(null);

  // @ts-ignore
  const verify = searchParams.get("verified") ? true : false;

  useEffect(() => {
    async function fetchDashboardData(productId: any) {
      try {
        const response = await fetch("/api/vendor-dashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (data.success) {
          setDashboardData(data.data);
        } else {
          setError(data.msg);
        }
      } catch (err) {
        console.error("Failed to load dashboard data");
        setError("Failed to load dashboard data.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function fetchMoreDetails() {
      try {
        const response = await fetch("/api/more-details-productid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (data.success) {
          setFeatures(data.features);
          setAnalytics(data.analytics);
          settotalClick(data.totalClicks);
        } else {
          console.error("Failed to fetch data:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchDashboardData(productId);
      fetchMoreDetails();
    }
  }, [productId]);

  if (verify) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Please complete your profile
        </h1>
        <center>
          {" "}
          <span className="text-sm text-slate-500 text-center">
            You need to complete your profile, By clicking on profile
          </span>
        </center>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = {
    series: [
      {
        name: `Product ${dashboardData?.analytics.productId}`,
        data:
          dashboardData?.analytics.data.map((item) => ({
            x: item.x,
            y: item.y,
          })) || [],
      },
    ],
  };

  function calculatePercentage(value: number, total: number): number {
    return total === 0 ? 0 : (value / total) * 100;
  }

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductId(event.target.value);
  };

  return (
    <div>Coming Soon</div>
    // <div>
    //   <div>
    //     <div>
    //       <select
    //         value={productId || ""}
    //         onChange={handleProductChange}
    //         className="border border-gray-300 rounded-md p-2 w-[200px]"
    //       >
    //         {allProducts.map((product: any) => (
    //           <option key={product.id} value={product.id}>
    //             {product.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
    //     <CardDataStats
    //       title="Unique Views"
    //       total={`${dashboardData?.totalViews || 0}`}
    //       rate="0.43%"
    //       levelUp
    //     >
    //       <FaRegEye className="fill-primary1 h-6 w-6" />
    //     </CardDataStats>
    //     <CardDataStats
    //       title="Total Followers"
    //       total={`${dashboardData?.totalFollowers || 0}`}
    //       rate="4.35%"
    //       levelUp
    //     >
    //       <RiUserFollowLine className="fill-primary1 h-6 w-6" />
    //     </CardDataStats>
    //     <CardDataStats
    //       title="Login users visits"
    //       total={`${dashboardData?.totalLogins || 0}`}
    //       rate="2.59%"
    //       levelUp
    //     >
    //       <GoIterations className="fill-primary1 h-6 w-6" />
    //     </CardDataStats>
    //     <CardDataStats
    //       title="Total Share"
    //       total={`${dashboardData?.totalShares || 0}`}
    //       rate="0.95%"
    //       levelDown
    //     >
    //       <FiShare2 className="fill-primary1 h-6 w-6" />
    //     </CardDataStats>
    //   </div>
    //   <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
    //     <div className="col-span-12 lg:col-span-6">
    //       <ChartOne series={chartData.series} />
    //     </div>
    //     <div className="col-span-12 lg:col-span-6">
    //       <ChartTwo countryData={dashboardData?.country || {}} />
    //     </div>

    //     <div className="col-span-12 lg:col-span-6 font-clarity">
    //       <div className=" border rounded-md shadow-md p-5 px-6">
    //         <h4 className=" font-bold text-sm">Interested in Features</h4>
    //         {/* <span className="text-sm text-gray-500 italic">Your traffic is more interested in</span> */}
    //         <div>
    //           {features.map((feature: any, index) => {
    //             const total = totalClick;
    //             const featureName = Object.keys(feature)[0];
    //             const featureValue = feature[featureName];
    //             return (
    //               <div
    //                 key={index}
    //                 className="w-full flex gap-2 items-center mt-4"
    //               >
    //                 <span className="text-sm text-gray-600">{featureName}</span>
    //                 <Progress
    //                   value={calculatePercentage(featureValue, total)}
    //                   className="w-[60%] h-1"
    //                 />
    //                 <span className="text-sm text-gray-400">
    //                   {calculatePercentage(featureValue, total).toFixed(2)}%
    //                 </span>
    //               </div>
    //             );
    //           })}
    //         </div>
    //         {totalClick === 0 && (
    //           <p className="text-sm text-gray-500 italic">No data available</p>
    //         )}
    //       </div>
    //     </div>
    //     <div className="col-span-12 lg:col-span-6 font-clarity">
    //       <div className=" border rounded-md shadow-md p-5 px-6 ">
    //         <h4 className="font-bold text-sm">User Distributions</h4>
    //         {/* <span className="text-sm text-gray-500 italic">Your traffic user distributions</span> */}
    //         <div>
    //           {analytics.map((analytic: any, index) => {
    //             const total = analytics.reduce(
    //               (sum: any, a: any) => sum + a.count,
    //               0
    //             );
    //             return (
    //               <div
    //                 key={index}
    //                 className="w-full flex gap-2 items-center mt-4"
    //               >
    //                 <span className="text-sm text-gray-600">
    //                   {analytic.companyType}
    //                 </span>
    //                 <Progress
    //                   value={calculatePercentage(analytic.count, total)}
    //                   className="w-[60%] h-1"
    //                 />
    //                 <span className="text-sm text-gray-400">
    //                   {calculatePercentage(analytic.count, total).toFixed(2)}%
    //                 </span>
    //               </div>
    //             );
    //           })}

    //           {analytics.length === 0 && (
    //             <p className="text-sm text-gray-500 italic">
    //               No data available
    //             </p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default VendorDashboard;

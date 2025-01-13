
// import React, { useState, useEffect, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import WorldMap from "./WorldMap";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { ArrowUpIcon, ArrowDownIcon, BarChart3, Eye, Bookmark, Share2 } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import ReactToPrint from 'react-to-print';
// const MetricCard = ({ title, current, previous, percentageChange, icon: Icon }) => (
//   <Card className="w-full">
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="text-sm font-medium">{title}</CardTitle>
//       <Icon className="h-4 w-4 text-muted-foreground" />
//     </CardHeader>
//     <CardContent>
//       <div className="text-2xl font-bold">{current}</div>
//       <p className="text-xs text-muted-foreground">Previous: {previous}</p>
//       <div className="flex items-center pt-1">
//         {percentageChange.startsWith('-') ? (
//           <ArrowDownIcon className="h-4 w-4 text-red-500" />
//         ) : (
//           <ArrowUpIcon className="h-4 w-4 text-green-500" />
//         )}
//         <span className={`text-xs font-medium ${percentageChange.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
//           {percentageChange}
//         </span>
//       </div>
//     </CardContent>
//   </Card>
// );

// const TopSegmentCard = ({ segment }) => (
//   <Card className="w-full">
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="text-sm font-medium">Top Segment</CardTitle>
//       <BarChart3 className="h-4 w-4 text-muted-foreground" />
//     </CardHeader>
//     <CardContent>
//       <div className="text-2xl font-bold">{segment}</div>
//     </CardContent>
//   </Card>
// );

// const ProgressBar = ({ label, percentage }) => (
//   <div className="space-y-1">
//     <div className="flex items-center justify-between text-sm">
//       <span className="font-medium text-muted-foreground">{label}</span>
//       <span className="font-medium text-muted-foreground">{percentage}%</span>
//     </div>
//     <div className="overflow-hidden rounded-full bg-secondary">
//       <div
//         className="h-2 rounded-full bg-primary"
//         style={{ width: `${percentage}%` }}
//       />
//     </div>
//   </div>
// );

// function VendorDashboard({ allProducts }) {
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [engagementData, setEngagementData] = useState(null);
//   const [productFeaturesData, setProductFeaturesData] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [timePeriod, setTimePeriod] = useState("today");
//   const printRef = useRef();
//   const searchParams = useSearchParams();
//   const verify = searchParams.get("verified") ? true : false;

//   useEffect(() => {
//     if (selectedProduct) {
//       handleFetchAnalytics();
//       fetchCustomerEngagement();
//       fetchProductFeatures();
//     }
//   }, [selectedProduct, timePeriod]);

//   if (verify) {
//     return (
//       <div className="flex h-full items-center justify-center p-4">
//         <div className="text-center">
//           <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
//             Please complete your profile
//           </h1>
//           <span className="text-sm sm:text-lg text-muted-foreground">
//             You need to complete your profile by clicking on profile.
//           </span>
//         </div>
//       </div>
//     );
//   }

//   const handleFetchAnalytics = async () => {
//         if (!selectedProduct) {
//           alert("Please select a product");
//           return;
//         }
    
//         try {
//           const response = await fetch("/api/get-analytics", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ productId: selectedProduct, timePeriod }),
//           });
    
//           const result = await response.json();
//           console.log("Analytics API response:", result);
    
//           if (result.success) {
//             setAnalyticsData(result.data);
//           } else {
//             alert(result.msg);
//           }
//         } catch (error) {
//           console.error("Error fetching analytics:", error);
//           alert("Failed to fetch analytics");
//         }
//       };
    
//       const fetchCustomerEngagement = async () => {
//         try {
//           const response = await fetch("/api/get-customer-engagement", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ productId: selectedProduct, timePeriod }),
//           });
    
//           const result = await response.json();
//           console.log("Customer Engagement API response:", result);
//           setEngagementData(result);
//         } catch (error) {
//           console.error("Error fetching customer engagement:", error);
//         }
//       };
    
//       const fetchProductFeatures = async () => {
//         try {
//           const response = await fetch("/api/get-product-features-counts", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ productId: selectedProduct, timePeriod }),
//           });
    
//           const result = await response.json();
//           console.log("Product Features API response:", result);
//           if (result.success) {
//             setProductFeaturesData(result.data);
//           }
//         } catch (error) {
//           console.error("Error fetching product features:", error);
//         }
//       };
    

//   return (

//     <ScrollArea className="h-full w-full">
//       <div className="container mx-auto p-8 space-y-12">
//         <div ref={printRef} className="print-content space-y-12">
//           <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
//             <h1 className="text-3xl sm:text-4xl font-bold text-gradient">Product Analytics</h1>
            
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
//             <ReactToPrint
//                 trigger={() => <Button className="w-full md:w-auto shadow-neon">Print or Save as PDF</Button>}
//                 content={() => printRef.current}
//                 pageStyle={`
//                   @page {
//                     margin: 1cm;
//                   }
//                   body {
//                     margin: 1cm;
//                   }
//                 `}
//               />
//               <Select value={selectedProduct || ""} onValueChange={setSelectedProduct}>
//                 <SelectTrigger className="w-full md:w-[220px] shadow-neon">
//                   <SelectValue placeholder="Select Product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {allProducts.map((product) => (
//                     <SelectItem key={product.id} value={product.id}>
//                       {product.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select value={timePeriod} onValueChange={setTimePeriod}>
//                 <SelectTrigger className="w-full md:w-[220px] shadow-neon">
//                   <SelectValue placeholder="Select Time Period" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="today">Today</SelectItem>
//                   <SelectItem value="yesterday">Yesterday</SelectItem>
//                   <SelectItem value="last_week">Last Week</SelectItem>
//                   <SelectItem value="last_month">Last Month</SelectItem>
//                   <SelectItem value="last_quarter">Last Quarter</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {analyticsData && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               <MetricCard
//                 title="Views"
//                 current={analyticsData.views.current}
//                 previous={analyticsData.views.previous}
//                 percentageChange={analyticsData.views.percentageChange}
//                 icon={Eye}
//               />
//               <MetricCard
//                 title="Bookmarks"
//                 current={analyticsData.bookmarks.current}
//                 previous={analyticsData.bookmarks.previous}
//                 percentageChange={analyticsData.bookmarks.percentageChange}
//                 icon={Bookmark}
//               />
//               <MetricCard
//                 title="Shares"
//                 current={analyticsData.shares.current}
//                 previous={analyticsData.shares.previous}
//                 percentageChange={analyticsData.shares.percentageChange}
//                 icon={Share2}
//               />
//               {engagementData && engagementData.topSegment && (
//                 <TopSegmentCard segment={engagementData.topSegment.userOrgType} />
//               )}
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {engagementData && engagementData.engagementData && (
//               <Card className="shadow-3d">
//                 <CardHeader>
//                   <CardTitle className="text-2xl">Customer Segment Engagement</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {engagementData.engagementData.map((data, index) => (
//                     <ProgressBar
//                       key={index}
//                       label={data.userOrgType}
//                       percentage={parseFloat(data.percentage)}
//                     />
//                   ))}
//                 </CardContent>
//               </Card>
//             )}

//             {productFeaturesData && (
//               <Card className="shadow-3d">
//                 <CardHeader>
//                   <CardTitle className="text-2xl">Feature Preferences</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {Object.entries(productFeaturesData).map(([feature, percentage], index) => (
//                     <ProgressBar
//                       key={index}
//                       label={feature}
//                       percentage={parseFloat(percentage)}
//                     />
//                   ))}
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* <div className="space-y-8">
//             <h3 className="text-3xl sm:text-4xl font-bold text-gradient">Demographic Engagement</h3>
//             <WorldMap productId={selectedProduct} timePeriod={timePeriod} />
//           </div> */}
//           <div className="space-y-8">
//             <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
//               Demographic Engagement
//             </h3>
//             <div className="w-full">
//               <WorldMap productId={selectedProduct} timePeriod={timePeriod} />
//             </div>
//           </div>

//         </div>
//       </div>
//     </ScrollArea>
    
//   );
// }

// export default VendorDashboard;

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  BarChart3, 
  Eye, 
  Bookmark, 
  Share2,
  RefreshCw,
  Calendar,
  ChevronDown,
  Check,
  Loader2
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactToPrint from 'react-to-print';
import WorldMap from "./WorldMap";

// MetricCard Component with consistent shadow
// const MetricCard = ({ title, current, previous, percentageChange, icon: Icon }) => (
//   <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.07)] transition-shadow duration-300">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-sm font-medium text-gray-600">{title}</h3>
//       <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
//         <Icon className="h-5 w-5 text-gray-600" />
//       </div>
//     </div>
//     <div className="space-y-2">
//       <div className="text-3xl font-bold text-indigo-600">
//         {current}
//       </div>
//       <div className="flex items-center gap-2">
//         <span className="text-sm text-gray-500">Previous: {previous}</span>
//         <div className={`flex items-center gap-1 text-sm font-medium ${
//           percentageChange.startsWith('-') ? 'text-red-500' : 'text-green-500'
//         }`}>
//           {percentageChange.startsWith('-') ? (
//             <ArrowDownIcon className="h-4 w-4" />
//           ) : (
//             <ArrowUpIcon className="h-4 w-4" />
//           )}
//           {percentageChange}
//         </div>
//       </div>
//     </div>
//   </div>
// );
const MetricCard = ({ title, current, previous, percentageChange, icon: Icon }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5  rounded-2xl blur opacity-30  transition duration-1000"></div>
    <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
          <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {current}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Previous: {previous}</span>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            percentageChange.startsWith('-') ? 'text-red-500' : 'text-green-500'
          }`}>
            {percentageChange.startsWith('-') ? (
              <ArrowDownIcon className="h-4 w-4" />
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
            )}
            {percentageChange}
          </div>
        </div>
      </div>
    </div>
  </div>
);
// Enhanced Progress Bar with better styling
const ProgressBar = ({ label, percentage }) => (
  <div className="space-y-2 group">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
        {label}
      </span>
      <span className="font-medium text-gray-600">
        {percentage}%
      </span>
    </div>
    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-indigo-500 transition-all duration-1000 ease-out"
        style={{ 
          width: `${percentage}%`,
          transform: 'translateX(0)',
          animation: 'slideIn 1s ease-out'
        }}
      />
    </div>
  </div>
);

// Custom Select with consistent styling
const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-xl px-4 py-2.5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 
                 flex items-center justify-between hover:border-indigo-300 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-gray-500" />}
          <span className="text-sm text-gray-700">
            {value ? options.find(opt => opt.value === value)?.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
            >
              <span className="flex-grow">{option.label}</span>
              {value === option.value && (
                <Check className="h-4 w-4 text-indigo-600" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function RefinedAnalyticsDashboard({ allProducts }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [engagementData, setEngagementData] = useState(null);
  const [productFeaturesData, setProductFeaturesData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timePeriod, setTimePeriod] = useState("today");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const printRef = useRef();

  const timeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_week", label: "Last Week" },
    { value: "last_month", label: "Last Month" },
    { value: "last_quarter", label: "Last Quarter" }
  ];

  const productOptions = allProducts.map(product => ({
    value: product.id,
    label: product.name
  }));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      handleFetchAnalytics(),
      fetchCustomerEngagement(),
      fetchProductFeatures()
    ]);
    setIsRefreshing(false);
  };
  const handleFetchAnalytics = async () => {
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    try {
      const response = await fetch("/api/get-analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: selectedProduct, timePeriod }),
      });

      const result = await response.json();
      console.log("Analytics API response:", result);

      if (result.success) {
        setAnalyticsData(result.data);
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      alert("Failed to fetch analytics");
    }
  };

  const fetchCustomerEngagement = async () => {
    try {
      const response = await fetch("/api/get-customer-engagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: selectedProduct, timePeriod }),
      });

      const result = await response.json();
      console.log("Customer Engagement API response:", result);
      setEngagementData(result);
    } catch (error) {
      console.error("Error fetching customer engagement:", error);
    }
  };

  const fetchProductFeatures = async () => {
    try {
      const response = await fetch("/api/get-product-features-counts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: selectedProduct, timePeriod }),
      });

      const result = await response.json();
      console.log("Product Features API response:", result);
      if (result.success) {
        setProductFeaturesData(result.data);
      }
    } catch (error) {
      console.error("Error fetching product features:", error);
    }
  };

  return (
    <ScrollArea className="h-full w-full bg-gray-50/50">
      <div className="container mx-auto p-8 space-y-8">
        <div ref={printRef} className="space-y-8">
          {/* Main Header with refined styling */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-3xl transform -skew-y-1"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">
                  Product Analytics
                  <span className="block h-1 w-24 bg-indigo-600 mt-2 rounded-full"></span>
                </h1>
                <p className="text-gray-600">Track and analyze your product performance</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <CustomSelect
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  options={productOptions}
                  placeholder="Select Product"
                  icon={BarChart3}
                />

                <CustomSelect
                  value={timePeriod}
                  onChange={setTimePeriod}
                  options={timeOptions}
                  placeholder="Select Time Period"
                  icon={Calendar}
                />

                <button
                  onClick={handleRefresh}
                  className={`p-2.5 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100
                           hover:border-indigo-300 transition-all duration-200 ${
                             isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                           }`}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>

                <ReactToPrint
                  trigger={() => (
                    <button className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium 
                                   hover:bg-indigo-700 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                      Export Report
                    </button>
                  )}
                  content={() => printRef.current}
                />
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          {analyticsData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Views"
                current={analyticsData.views.current}
                previous={analyticsData.views.previous}
                percentageChange={analyticsData.views.percentageChange}
                icon={Eye}
              />
              <MetricCard
                title="Bookmarks"
                current={analyticsData.bookmarks.current}
                previous={analyticsData.bookmarks.previous}
                percentageChange={analyticsData.bookmarks.percentageChange}
                icon={Bookmark}
              />
              <MetricCard
                title="Total Shares"
                current={analyticsData.shares.current}
                previous={analyticsData.shares.previous}
                percentageChange={analyticsData.shares.percentageChange}
                icon={Share2}
              />
              {engagementData?.topSegment && (
                <MetricCard
                  title="Top Segment"
                  current={engagementData.topSegment.userOrgType}
                  previous="Previous Leader"
                  percentageChange="+5.2%"
                  icon={BarChart3}
                />
              )}
            </div>
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Engagement Card */}
            {engagementData?.engagementData && (
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">
                  Customer Segment Engagement
                </h3>
                <div className="space-y-4">
                  {engagementData.engagementData.map((data, index) => (
                    <ProgressBar
                      key={index}
                      label={data.userOrgType}
                      percentage={parseFloat(data.percentage)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Feature Preferences Card */}
            {productFeaturesData && (
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">
                  Feature Preferences
                </h3>
                <div className="space-y-4">
                  {Object.entries(productFeaturesData).map(([feature, percentage], index) => (
                    <ProgressBar
                      key={index}
                      label={feature}
                      percentage={parseFloat(percentage)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Demographic Engagement
              <span className="block h-1 w-16 bg-indigo-600 mt-1 rounded-full"></span>
            </h3>
            
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="aspect-[21/9]">
                <WorldMap productId={selectedProduct} timePeriod={timePeriod} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media print {
          .print-content {
            margin: 2cm;
          }
        }
      `}</style>
    </ScrollArea>
  );
}

export default RefinedAnalyticsDashboard;

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import WorldMap from "./WorldMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowUpIcon, ArrowDownIcon, BarChart3, Eye, Bookmark, Share2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactToPrint from 'react-to-print';
const MetricCard = ({ title, current, previous, percentageChange, icon: Icon }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{current}</div>
      <p className="text-xs text-muted-foreground">Previous: {previous}</p>
      <div className="flex items-center pt-1">
        {percentageChange.startsWith('-') ? (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        ) : (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        )}
        <span className={`text-xs font-medium ${percentageChange.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
          {percentageChange}
        </span>
      </div>
    </CardContent>
  </Card>
);

const TopSegmentCard = ({ segment }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Top Segment</CardTitle>
      <BarChart3 className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{segment}</div>
    </CardContent>
  </Card>
);

const ProgressBar = ({ label, percentage }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="font-medium text-muted-foreground">{percentage}%</span>
    </div>
    <div className="overflow-hidden rounded-full bg-secondary">
      <div
        className="h-2 rounded-full bg-primary"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

function VendorDashboard({ allProducts }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [engagementData, setEngagementData] = useState(null);
  const [productFeaturesData, setProductFeaturesData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timePeriod, setTimePeriod] = useState("today");
  const printRef = useRef();
  const searchParams = useSearchParams();
  const verify = searchParams.get("verified") ? true : false;

  useEffect(() => {
    if (selectedProduct) {
      handleFetchAnalytics();
      fetchCustomerEngagement();
      fetchProductFeatures();
    }
  }, [selectedProduct, timePeriod]);

  if (verify) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            Please complete your profile
          </h1>
          <span className="text-sm sm:text-lg text-muted-foreground">
            You need to complete your profile by clicking on profile.
          </span>
        </div>
      </div>
    );
  }

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
    // <ScrollArea className="h-full w-full">
    //   <div className="container mx-auto p-4 space-y-6">
    //     <div ref={printRef} className="print-content">
    //     {/* <div className="flex flex-col space-y-4">
    //       <h1 className="text-2xl sm:text-3xl font-bold">Product Analytics</h1>
          
    //       <div className="flex flex-col space-y-2 w-full">
    //         <Select value={selectedProduct || ""} onValueChange={setSelectedProduct}>
    //           <SelectTrigger className="w-full">
    //             <SelectValue placeholder="Select Product" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {allProducts.map((product) => (
    //               <SelectItem key={product.id} value={product.id}>
    //                 {product.name}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>

    //         <Select value={timePeriod} onValueChange={setTimePeriod}>
    //           <SelectTrigger className="w-full">
    //             <SelectValue placeholder="Select Time Period" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="today">Today</SelectItem>
    //             <SelectItem value="yesterday">Yesterday</SelectItem>
    //             <SelectItem value="last_week">Last Week</SelectItem>
    //             <SelectItem value="last_month">Last Month</SelectItem>
    //             <SelectItem value="last_quarter">Last Quarter</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     </div> */}
    //     <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
    //       <h1 className="text-2xl sm:text-3xl font-bold">Product Analytics</h1>
          
    //       <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
    //       <ReactToPrint
    //           trigger={() => <Button>Print or Save as PDF</Button>}
    //           content={() => printRef.current}
    //         />
    //         <Select value={selectedProduct || ""} onValueChange={setSelectedProduct}>
    //           <SelectTrigger className="w-full md:w-[200px]">
    //             <SelectValue placeholder="Select Product" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {allProducts.map((product) => (
    //               <SelectItem key={product.id} value={product.id}>
    //                 {product.name}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>

    //         <Select value={timePeriod} onValueChange={setTimePeriod}>
    //           <SelectTrigger className="w-full md:w-[200px]">
    //             <SelectValue placeholder="Select Time Period" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="today">Today</SelectItem>
    //             <SelectItem value="yesterday">Yesterday</SelectItem>
    //             <SelectItem value="last_week">Last Week</SelectItem>
    //             <SelectItem value="last_month">Last Month</SelectItem>
    //             <SelectItem value="last_quarter">Last Quarter</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     </div>

    //     {analyticsData && (
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    //         <MetricCard
    //           title="Views"
    //           current={analyticsData.views.current}
    //           previous={analyticsData.views.previous}
    //           percentageChange={analyticsData.views.percentageChange}
    //           icon={Eye}
    //         />
    //         <MetricCard
    //           title="Bookmarks"
    //           current={analyticsData.bookmarks.current}
    //           previous={analyticsData.bookmarks.previous}
    //           percentageChange={analyticsData.bookmarks.percentageChange}
    //           icon={Bookmark}
    //         />
    //         <MetricCard
    //           title="Shares"
    //           current={analyticsData.shares.current}
    //           previous={analyticsData.shares.previous}
    //           percentageChange={analyticsData.shares.percentageChange}
    //           icon={Share2}
    //         />
    //         {engagementData && engagementData.topSegment && (
    //           <TopSegmentCard segment={engagementData.topSegment.userOrgType} />
    //         )}
    //       </div>
    //     )}

    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    //       {engagementData && engagementData.engagementData && (
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Customer Segment Engagement</CardTitle>
    //           </CardHeader>
    //           <CardContent className="space-y-4">
    //             {engagementData.engagementData.map((data, index) => (
    //               <ProgressBar
    //                 key={index}
    //                 label={data.userOrgType}
    //                 percentage={parseFloat(data.percentage)}
    //               />
    //             ))}
    //           </CardContent>
    //         </Card>
    //       )}

    //       {productFeaturesData && (
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Feature preferences</CardTitle>
    //           </CardHeader>
    //           <CardContent className="space-y-4">
    //             {Object.entries(productFeaturesData).map(([feature, percentage], index) => (
    //               <ProgressBar
    //                 key={index}
    //                 label={feature}
    //                 percentage={parseFloat(percentage)}
    //               />
    //             ))}
    //           </CardContent>
    //         </Card>
    //       )}
    //     </div>

       
    //      <h3 className="text-2xl sm:text-3xl font-bold">Demographic Engagement</h3>
          
    //     <WorldMap productId={selectedProduct} timePeriod={timePeriod} />
    //     </div>
    //   </div>
    // </ScrollArea>
    <ScrollArea className="h-full w-full">
      <div className="container mx-auto p-8 space-y-12">
        <div ref={printRef} className="print-content space-y-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">Product Analytics</h1>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <ReactToPrint
                trigger={() => <Button className="w-full md:w-auto shadow-neon">Print or Save as PDF</Button>}
                content={() => printRef.current}
                pageStyle={`
                  @page {
                    margin: 1cm;
                  }
                  body {
                    margin: 1cm;
                  }
                `}
              />
              <Select value={selectedProduct || ""} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-full md:w-[220px] shadow-neon">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {allProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-full md:w-[220px] shadow-neon">
                  <SelectValue placeholder="Select Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last_week">Last Week</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="last_quarter">Last Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {analyticsData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <MetricCard
                title="Views"
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
                title="Shares"
                current={analyticsData.shares.current}
                previous={analyticsData.shares.previous}
                percentageChange={analyticsData.shares.percentageChange}
                icon={Share2}
              />
              {engagementData && engagementData.topSegment && (
                <TopSegmentCard segment={engagementData.topSegment.userOrgType} />
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {engagementData && engagementData.engagementData && (
              <Card className="shadow-3d">
                <CardHeader>
                  <CardTitle className="text-2xl">Customer Segment Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {engagementData.engagementData.map((data, index) => (
                    <ProgressBar
                      key={index}
                      label={data.userOrgType}
                      percentage={parseFloat(data.percentage)}
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {productFeaturesData && (
              <Card className="shadow-3d">
                <CardHeader>
                  <CardTitle className="text-2xl">Feature Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(productFeaturesData).map(([feature, percentage], index) => (
                    <ProgressBar
                      key={index}
                      label={feature}
                      percentage={parseFloat(percentage)}
                    />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-gradient">Demographic Engagement</h3>
            <WorldMap productId={selectedProduct} timePeriod={timePeriod} />
          </div> */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
              Demographic Engagement
            </h3>
            <div className="w-full">
              <WorldMap productId={selectedProduct} timePeriod={timePeriod} />
            </div>
          </div>

        </div>
      </div>
    </ScrollArea>
    
  );
}

export default VendorDashboard;


// import React, { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";

// const GeoChartWithAPI = ({ productId, timePeriod }) => {
//   const [chartData, setChartData] = useState([["Country", "Engagement Weight"]]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDemographicEngagement = async () => {
//       try {
//         console.log("Fetching data with:", { productId, timePeriod });

//         // Uncomment to test with actual API call
     
//         const response = await fetch("/api/get-demographic-engagement", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ productId, timePeriod }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
        

//         // Simulating API response with your actual structure for testing
//         // const result = [
//         //   {
//         //     "country": "Afghanistan",
//         //     "viewCount": 0,
//         //     "shareCount": 0,
//         //     "bookmarkCount": 0,
//         //     "engagementWeight": 0,
//         //     "percentage": "0.00%"
//         //   },
//         //   {
//         //     "country": "Germany",
//         //     "viewCount": 50,
//         //     "shareCount": 20,
//         //     "bookmarkCount": 10,
//         //     "engagementWeight": 200,
//         //     "percentage": "5.00%"
//         //   },
//         //   {
//         //     "country": "United States",
//         //     "viewCount": 150,
//         //     "shareCount": 80,
//         //     "bookmarkCount": 40,
//         //     "engagementWeight": 500,
//         //     "percentage": "15.00%"
//         //   },
//         //   {
//         //     "country": "India",
//         //     "viewCount": 100,
//         //     "shareCount": 30,
//         //     "bookmarkCount": 20,
//         //     "engagementWeight": 100,
//         //     "percentage": "3.00%"
//         //   }
//         // ];

//         console.log("API Response:", result);

//         // Extract 'country' and 'engagementWeight' from the API response
//         const formattedData = result.map(({ country, engagementWeight }) => [
//           country,
//           engagementWeight || 0, // Ensure it's 0 if undefined
//         ]);

//         console.log("Formatted Data for Chart:", formattedData);

//         // Set chart data with header and formatted data
//         setChartData([["Country", "Engagement Weight"], ...formattedData]);
//       } catch (error) {
//         console.error("Error fetching demographic engagement:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDemographicEngagement();
//   }, [productId, timePeriod]);

//   const maxWeight = Math.max(...chartData.slice(1).map(([_, weight]) => weight)) || 1;

//   console.log("Final Chart Data:", chartData);
//   console.log("Max Weight for Color Axis:", maxWeight);

//   return (
//     // <div style={{ width: "100%", height: "600px" }}>
//     //   {loading ? (
//     //     <div>Loading...</div>
//     //   ) : (
//     //     <Chart
//     //       chartEvents={[
//     //         {
//     //           eventName: "select",
//     //           callback: ({ chartWrapper }) => {
//     //             const chart = chartWrapper.getChart();
//     //             const selection = chart.getSelection();
//     //             if (selection.length === 0) return;
//     //             const region = chartData[selection[0].row + 1];
//     //             console.log("Selected:", region);
//     //           },
//     //         },
//     //       ]}
//     //       chartType="GeoChart"
//     //       data={chartData}
       
//     //       options={{
//     //         colorAxis: { 
//     //           colors: ["#E2AEFF", "#5E32CA"], // Light purple to dark purple
//     //           minValue: 0, 
//     //           maxValue: maxWeight,  // Define the maximum engagementWeight based on your data
//     //         },
//     //         backgroundColor: "#282c34",
//     //         datalessRegionColor: "#E2AEFF",  // Use the same light purple for countries with no data
//     //         defaultColor: "#E2AEFF",         // This is for countries not defined in the dataset
//     //         tooltip: { isHtml: true },
//     //       }}
          

//     //       width="100%"
//     //       height="600px"
//     //     />
//     //   )}
//     // </div>

//     <div className="w-full h-[600px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
//       {loading ? (
//         <div className="flex items-center justify-center h-full">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <Chart
//           chartEvents={[
//             {
//               eventName: "select",
//               callback: ({ chartWrapper }) => {
//                 const chart = chartWrapper.getChart();
//                 const selection = chart.getSelection();
//                 if (selection.length === 0) return;
//                 const region = chartData[selection[0].row + 1];
//                 console.log("Selected:", region);
//               },
//             },
//           ]}
//           chartType="GeoChart"
//           data={chartData}
//           options={{
//             colorAxis: { 
//               colors: ["#E6F3FF", "#0066CC"], // Light blue to dark blue
//               minValue: 0, 
//               maxValue: maxWeight,
//             },
//             backgroundColor: "#FFFFFF", // White background
//             datalessRegionColor: "#E6F3FF", // Light gray for countries with no data
//             defaultColor: "#E6F3FF", // Light blue for countries not in the dataset
//             legend: {
//               textStyle: { color: '#333333', fontSize: 14 }, // Dark gray text for legend
//             },
//             tooltip: { 
//               isHtml: true,
//               textStyle: { color: '#333333', fontSize: 14 },
//               showColorCode: true,
//             },
//             geochartVersion: 11,
//           }}
//           width="100%"
//           height="100%"
//         />
//       )}
//     </div>
//   );
// };

// export default GeoChartWithAPI;

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const GeoChartWithAPI = ({ productId, timePeriod }) => {
  const [chartData, setChartData] = useState([["Country", "Percentage"]]); // Changed header to "Percentage"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemographicEngagement = async () => {
      try {
        console.log("Fetching data with:", { productId, timePeriod });

        // Uncomment to test with actual API call
        const response = await fetch("/api/get-demographic-engagement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, timePeriod }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        console.log("API Response:", result);

        // Extract 'country' and 'percentage' from the API response
        const formattedData = result.map(({ country, percentage }) => [
          country,
          parseFloat(percentage) || 0, // Convert percentage to a float and ensure it's 0 if undefined
        ]);

        console.log("Formatted Data for Chart:", formattedData);

        // Set chart data with header and formatted data
        setChartData([["Country", "Percentage"], ...formattedData]);
      } catch (error) {
        console.error("Error fetching demographic engagement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemographicEngagement();
  }, [productId, timePeriod]);

  const maxPercentage = Math.max(...chartData.slice(1).map(([_, percentage]) => percentage)) || 1; // Calculate max percentage

  console.log("Final Chart Data:", chartData);
  console.log("Max Percentage for Color Axis:", maxPercentage);

  return (
    // <div className="w-full h-[600px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
    //   {loading ? (
    //     <div className="flex items-center justify-center h-full">
    //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    //     </div>
    //   ) : (
    //     <Chart
    //       chartEvents={[
    //         {
    //           eventName: "select",
    //           callback: ({ chartWrapper }) => {
    //             const chart = chartWrapper.getChart();
    //             const selection = chart.getSelection();
    //             if (selection.length === 0) return;
    //             const region = chartData[selection[0].row + 1];
    //             console.log("Selected:", region);
    //           },
    //         },
    //       ]}
    //       chartType="GeoChart"
    //       data={chartData}
    //       options={{
    //         colorAxis: {
    //           colors: ["#E6F3FF", "#0066CC"], // Light blue to dark blue
    //           minValue: 0,
    //           maxValue: maxPercentage, // Use max percentage for color axis
    //         },
    //         backgroundColor: "#FFFFFF", // White background
    //         datalessRegionColor: "#E6F3FF", // Light gray for countries with no data
    //         defaultColor: "#E6F3FF", // Light blue for countries not in the dataset
    //         legend: {
    //           textStyle: { color: '#333333', fontSize: 14 }, // Dark gray text for legend
    //         },
    //         tooltip: {
    //           isHtml: true,
    //           textStyle: { color: '#333333', fontSize: 14 },
    //           showColorCode: true,
    //         },
    //         geochartVersion: 11,
    //       }}
    //       width="100%"
    //       height="100%"
    //     />
    //   )}
    // </div>
    <div className="w-full aspect-video bg-gray-100 rounded-lg shadow-lg overflow-hidden">
    <div className="w-full h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = chartData[selection[0].row + 1];
                console.log("Selected:", region);
              },
            },
          ]}
          chartType="GeoChart"
          data={chartData}
          options={{
            colorAxis: {
              colors: ["#E6F3FF", "#0066CC"],
              minValue: 0,
              maxValue: maxPercentage,
            },
            backgroundColor: "#FFFFFF",
            datalessRegionColor: "#E6F3FF",
            defaultColor: "#E6F3FF",
            legend: {
              textStyle: { color: '#333333', fontSize: 14 },
            },
            tooltip: {
              isHtml: true,
              textStyle: { color: '#333333', fontSize: 14 },
              showColorCode: true,
            },
            geochartVersion: 11,
          }}
          width="100%"
          height="100%"
        />
      )}
    </div>
  </div>
  );
};

export default GeoChartWithAPI;


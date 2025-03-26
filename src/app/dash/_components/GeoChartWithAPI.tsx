
// import React, { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";

// const GeoChartWithAPI = ({ data }) => {
//   const [chartData, setChartData] = useState([["Country", "Count"]]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!data || data.length === 0) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Processing headquarters data:", data);

//       // Format the data for Google Charts - no need to filter cities as API now maps them to countries
//       const formattedData = data
//         .filter(item => item.country !== "Unknown") // Only filter "Unknown" entries
//         .map(({ country, count }) => [
//           country,
//           count
//         ]);

//       console.log("Formatted Data for Chart:", formattedData);
//       setChartData([["Country", "Count"], ...formattedData]);
//     } catch (error) {
//       console.error("Error processing map data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [data]);

//   // Find max count for scaling
//   const maxCount = Math.max(...chartData.slice(1).map(([_, count]) => count || 0)) || 100;

//   return (
//     <div className="w-full h-full rounded-lg overflow-hidden">
//       {loading ? (
//         <div className="flex items-center justify-center h-full bg-gray-50">
//           <div className="flex flex-col items-center gap-3">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             <p className="text-sm text-gray-600">Loading map data...</p>
//           </div>
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
//               colors: ["#E6F3FF", "#0066CC"],
//               minValue: 0,
//               maxValue: maxCount,
//             },
//             backgroundColor: "#FFFFFF",
//             datalessRegionColor: "#F3F4F6", // Light gray for countries with no data
//             defaultColor: "#E6F3FF", // Light blue for countries not in the dataset
//             legend: {
//               textStyle: { color: '#333333', fontSize: 12 },
//             },
//             tooltip: {
//               isHtml: true,
//               textStyle: { color: '#333333', fontSize: 12 },
//               showColorCode: true,
//             },
//             geochartVersion: 11,
//           }}
//           width="100%"
//           height="100%"
//           style={{ borderRadius: '8px' }}
//         />
//       )}
//     </div>
//   );
// };

// export default GeoChartWithAPI;

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const GeoChartWithAPI = ({ data }) => {
  const [chartData, setChartData] = useState([["Country", "Count"]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Processing headquarters data:", data);

      // Format the data for Google Charts - no need to filter cities as API now maps them to countries
      const formattedData = data
        .filter(item => item.country !== "Unknown") // Only filter "Unknown" entries
        .map(({ country, count }) => [
          country,
          count
        ]);

      console.log("Formatted Data for Chart:", formattedData);
      setChartData([["Country", "Count"], ...formattedData]);
    } catch (error) {
      console.error("Error processing map data:", error);
    } finally {
      setLoading(false);
    }
  }, [data]);

  // Find max count for scaling
  const maxCount = Math.max(...chartData.slice(1).map(([_, count]) => count || 0)) || 100;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-600">Loading map data...</p>
          </div>
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
                colors: ["#f4f1de", "#e6b89c", "#9a8c98", "#4a4e69", "#22223b"],
            //   colors: ["#E6F3FF", "#4cc9f0", "#4361ee", "#7209b7", "#f72585"], // Vibrant color gradient
              minValue: 0,
              maxValue: maxCount,
            },
            backgroundColor: "#FFFFFF",
            datalessRegionColor: "#F3F4F6", // Light gray for countries with no data
            defaultColor: "#E6F3FF", // Light blue for countries not in the dataset
            legend: {
              textStyle: { color: '#333333', fontSize: 12 },
            },
            tooltip: {
              isHtml: true,
              textStyle: { color: '#333333', fontSize: 12 },
              showColorCode: true,
            },
            geochartVersion: 11,
          }}
          width="100%"
          height="100%"
          style={{ borderRadius: '8px' }}
        />
      )}
    </div>
  );
};

export default GeoChartWithAPI;
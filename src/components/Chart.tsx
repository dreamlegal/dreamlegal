// import React from 'react';
// import dynamic from 'next/dynamic';
// import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
// import { MdOutlineInfo } from 'react-icons/md';

// // Dynamically import ApexCharts with SSR disabled
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const parseChartData = (data) => {
//   if (!Array.isArray(data)) return [];
//   return data.map(item => {
//     if (typeof item !== 'string') return { label: 'Unknown', percentage: 0 };
//     const [label, percentage] = item.split('|');
//     return { 
//       label: label || 'Unknown', 
//       percentage: parseFloat(percentage) || 0 
//     };
//   }).filter(item => item.percentage > 0);
// };

// const ChartSection = ({ title, tooltip, data }) => {
//   const chartData = parseChartData(data);

//   const chartOptions = {
//     chart: { type: 'pie' },
//     labels: chartData.map(item => item.label),
//     responsive: [{
//       breakpoint: 480,
//       options: { chart: { width: 200 } },
//     }],
//     legend: { position: 'bottom' },
//   };

//   const series = chartData.map(item => item.percentage);

//   return (
//     <div className="flex flex-col md:flex-row w-full gap-4">
//       <div className="flex-1">
//         <div className="flex gap-2 items-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger>
//                 <MdOutlineInfo className="text-slate-500 text-sm" />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{tooltip}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="inline-flex gap-3 flex-wrap">
//             {chartData.map(({ label }) => (
//               <div
//                 key={label}
//                 className="py-1 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
//               >
//                 {label}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 mt-4 md:mt-0">
//         <div
//           style={{ maxWidth: "90%", margin: "0 auto" }}
//           className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center p-4"
//         >
//           {typeof window !== 'undefined' && chartData.length > 0 ? (
//             <Chart
//               options={chartOptions}
//               series={series}
//               type="pie"
//               width="100%"
//               height={300}
//             />
//           ) : (
//             <p>No data available for chart</p>
//           )}
//           <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
//             Distribution
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dashboard = ({ product }) => {
//   return (
//     <>
//       <ChartSection
//         title="Customer segments"
//         tooltip="Type of company's clientele"
//         data={product.userCategory}
//       />
//       <div className="w-full h-px bg-slate-200 my-4"></div>
//       <ChartSection
//         title="Industries"
//         tooltip="Sectors this product is making an impact in"
//         data={product.industry}
//       />
//       <div className="w-full h-px bg-slate-200 my-4"></div>
//       <ChartSection
//         title="Practice Area"
//         tooltip="Legal practice areas supported by this product"
//         data={product.practiceAreas}
//       />
//       <div className="w-full h-px bg-slate-200 my-4"></div>
//       <ChartSection
//         title="Client's team size"
//         tooltip="Size of the client's team"
//         data={product.teamSize}
//       />
//     </>
//   );
// };

// export default Dashboard;


import React from 'react';
import dynamic from 'next/dynamic';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { MdOutlineInfo } from 'react-icons/md';

// Dynamically import ApexCharts with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const parseChartData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(item => {
    if (typeof item !== 'string') return { label: 'Unknown', percentage: 0 };
    const [label, percentage] = item.split('|');
    return { 
      label: label || 'Unknown', 
      percentage: parseFloat(percentage) || 0 
    };
  });
};

// const ChartSection = ({ title, tooltip, data }) => {
//   const chartData = parseChartData(data);

//   const chartOptions = {
//     chart: { type: 'pie' },
//     labels: chartData.map(item => item.label),
//     responsive: [{
//       breakpoint: 480,
//       options: { chart: { width: 200 } },
//     }],
//     legend: { position: 'bottom' },
//   };

//   const series = chartData.map(item => item.percentage);

//   return (
//     <div className="flex mb-6 flex-col md:flex-row w-full gap-4">
//       <div className="flex-1">
//         <div className="flex gap-2 items-center mb-3">
//           <h2 className="text-2xl font-bold text-gray-700 ">{title}</h2>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger>
//                 <MdOutlineInfo className="text-slate-500 text-sm" />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{tooltip}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="inline-flex gap-3 flex-wrap">
//             {chartData.map(({ label, percentage }) => (
//               <div
//                 key={label}
//                 className={`py-1 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs ${
//                   percentage > 0 ? 'bg-primary2 border-primary1 text-primary1' : 'bg-gray-200 border-gray-300 text-gray-500'
//                 }`}
//               >
//                 {label}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 mt-4 md:mt-0">
//         <div
//           style={{ maxWidth: "90%", margin: "0 auto" }}
//           className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center p-4"
//         >
//           {typeof window !== 'undefined' && chartData.some(item => item.percentage > 0) ? (
//             <Chart
//               options={chartOptions}
//               series={series.filter(s => s > 0)}
//               type="pie"
//               width="100%"
//               height={300}
//             />
//           ) : (
//             <p>No data available for chart</p>
//           )}
//           <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
//              Existing Distribution
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dashboard = ({ product }) => {
//   return (
//     <>
//     <div className="flex flex-col gap-5">

//        <div>
//        <ChartSection
//         title="Target Users"
//         tooltip="Type of company's clientele"
//         data={product.userCategory}
//       />
//       <div className="w-full h-px bg-slate-200 my-4"></div>
//        </div>
     
//      <div className="">
//      <ChartSection
//         title="Target Industries"
//         tooltip="Sectors this product is making an impact in"
//         data={product.industry}

//       />
//       <div className="w-full h-px bg-slate-200 my-4"></div>
//      </div>
//      <div>
//      <ChartSection
//         title="Target Practice Areas"
//         tooltip="Legal practice areas supported by this product"
//         data={product.practiceAreas}
//       />
//       <div className="w-full h-px bg-slate-200 my-4"></div>
//      </div>
//      <div>
//      <ChartSection
//         title="Target Client Team Size"
//         tooltip="Size of the client's team"
//         data={product.teamSize}
//       />
//      </div>
     
//       </div>
//     </>
//   );
// };
// const ChartSection = ({ title, tooltip, data }) => {
//   const hasData = Array.isArray(data) && data.length > 0;
  
//   // If we have data, show normal chart
//   if (hasData) {
//     const chartData = parseChartData(data);
//     const chartOptions = {
//       chart: { type: 'pie' },
//       labels: chartData.map(item => item.label),
//       responsive: [{
//         breakpoint: 480,
//         options: { chart: { width: 200 } },
//       }],
//       legend: { position: 'bottom' },
//     };
//     const series = chartData.map(item => item.percentage);

//     return (
//       <div className="flex mb-6 flex-col md:flex-row w-full gap-4">
//         <div className="flex-1">
//           <div className="flex gap-2 items-center mb-3">
//             <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <MdOutlineInfo className="text-slate-500 text-sm" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{tooltip}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="inline-flex gap-3 flex-wrap">
//               {chartData.map(({ label, percentage }) => (
//                 <div
//                   key={label}
//                   className={`py-1 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs ${
//                     percentage > 0 ? 'bg-primary2 border-primary1 text-primary1' : 'bg-gray-200 border-gray-300 text-gray-500'
//                   }`}
//                 >
//                   {label}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 mt-4 md:mt-0">
//           <div className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center p-4" style={{ maxWidth: "90%", margin: "0 auto" }}>
//             {typeof window !== 'undefined' && chartData.some(item => item.percentage > 0) ? (
//               <Chart options={chartOptions} series={series.filter(s => s > 0)} type="pie" width="100%" height={300} />
//             ) : (
//               <p>No data available for chart</p>
//             )}
//             <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">Existing Distribution</h2>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show blurred placeholder when no data
//   return (
//     <div className="flex mb-6 flex-col md:flex-row w-full gap-4">
//       <div className="flex-1">
//         <div className="flex gap-2 items-center mb-3">
//           <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger>
//                 <MdOutlineInfo className="text-slate-500 text-sm" />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{tooltip}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="inline-flex gap-3 flex-wrap blur-[3px] select-none">
//             {["Category 1", "Category 2", "Category 3", "Category 4"].map((label) => (
//               <div
//                 key={label}
//                 className="py-1 px-2.5 border rounded-full text-xs bg-primary2 border-primary1 text-primary1"
//               >
//                 {label}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 mt-4 md:mt-0">
//         <div
//           className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center p-4 blur-[3px] select-none"
//           style={{ maxWidth: "90%", margin: "0 auto" }}
//         >
//           <div className="w-full h-[300px] bg-gradient-to-r from-gray-200 via-primary2/50 to-gray-200 rounded-full animate-pulse" />
//           <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
//             Existing Distribution
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dashboard = ({ product }) => {
//   return (
//     <div className="flex flex-col gap-5">
//       <div>
//         <ChartSection
//           title="Target Users"
//           tooltip="Type of company's clientele"
//           data={product?.userCategory}
//         />
//         <div className="w-full h-px bg-slate-200 my-4"></div>
//       </div>

//       <div>
//         <ChartSection
//           title="Target Industries"
//           tooltip="Sectors this product is making an impact in"
//           data={product?.industry}
//         />
//         <div className="w-full h-px bg-slate-200 my-4"></div>
//       </div>

//       <div>
//         <ChartSection
//           title="Target Practice Areas"
//           tooltip="Legal practice areas supported by this product"
//           data={product?.practiceAreas}
//         />
//         <div className="w-full h-px bg-slate-200 my-4"></div>
//       </div>

//       <div>
//         <ChartSection
//           title="Target Client Team Size"
//           tooltip="Size of the client's team"
//           data={product?.teamSize}
//         />
//       </div>
//     </div>
//   );
// };


const ChartSection = ({ title, tooltip, data }) => {
  const hasData = Array.isArray(data) && data.length > 0;
  
  // Dummy data for each chart type
  const dummyData = {
    "Target Users": [
      "Enterprise|40",
      "Mid-Market|30",
      "Small Business|20",
      "Startups|10"
    ],
    "Target Industries": [
      "Legal Services|35",
      "Financial Services|25",
      "Healthcare|20",
      "Technology|20"
    ],
    "Target Practice Areas": [
      "Corporate Law|30",
      "Litigation|25",
      "Intellectual Property|25",
      "Regulatory|20"
    ],
    "Target Client Team Size": [
      "1-10 employees|20",
      "11-50 employees|30",
      "51-200 employees|35",
      "201+ employees|15"
    ]
  };
  
  // Use real data if available, otherwise use dummy data
  const chartData = hasData ? parseChartData(data) : parseChartData(dummyData[title]);

  const chartOptions = {
    chart: { type: 'pie' },
    labels: chartData.map(item => item.label),
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 200 } },
    }],
    legend: { position: 'bottom' },
    colors: ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%"
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
  };

  const series = chartData.map(item => item.percentage);

  return (
    <div className={`flex mb-6 flex-col md:flex-row w-full gap-4 ${!hasData ? 'blur-[3px] select-none' : ''}`}>
      <div className="flex-1">
        <div className="flex gap-2 items-center mb-3">
          <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdOutlineInfo className="text-slate-500 text-sm" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex justify-between items-center">
          <div className="inline-flex gap-3 flex-wrap">
            {chartData.map(({ label, percentage }) => (
              <div
                key={label}
                className={`py-1 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs ${
                  percentage > 0 ? 'bg-primary2 border-primary1 text-primary1' : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 mt-4 md:mt-0">
        <div
          className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center p-4"
          style={{ maxWidth: "90%", margin: "0 auto" }}
        >
          {typeof window !== 'undefined' && (
            <Chart 
              options={chartOptions} 
              series={series} 
              type="pie" 
              width="100%" 
              height={300} 
            />
          )}
          <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
            {hasData ? 'Existing Distribution' : 'Sample Distribution'}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ product }) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <ChartSection
          title="Target Users"
          tooltip="Type of company's clientele"
          data={product?.userCategory}
        />
        <div className="w-full h-px bg-slate-200 my-4"></div>
      </div>

      <div>
        <ChartSection
          title="Target Industries"
          tooltip="Sectors this product is making an impact in"
          data={product?.industry}
        />
        <div className="w-full h-px bg-slate-200 my-4"></div>
      </div>

      <div>
        <ChartSection
          title="Target Practice Areas"
          tooltip="Legal practice areas supported by this product"
          data={product?.practiceAreas}
        />
        <div className="w-full h-px bg-slate-200 my-4"></div>
      </div>

      <div>
        <ChartSection
          title="Target Client Team Size"
          tooltip="Size of the client's team"
          data={product?.teamSize}
        />
      </div>
    </div>
  );
};
export default Dashboard;
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

const ChartSection = ({ title, tooltip, data }) => {
  const chartData = parseChartData(data);

  const chartOptions = {
    chart: { type: 'pie' },
    labels: chartData.map(item => item.label),
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 200 } },
    }],
    legend: { position: 'bottom' },
  };

  const series = chartData.map(item => item.percentage);

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">{title}</h2>
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
          style={{ maxWidth: "90%", margin: "0 auto" }}
          className="bg-primary2/40 rounded-2xl flex flex-col items-center justify-center p-4"
        >
          {typeof window !== 'undefined' && chartData.some(item => item.percentage > 0) ? (
            <Chart
              options={chartOptions}
              series={series.filter(s => s > 0)}
              type="pie"
              width="100%"
              height={300}
            />
          ) : (
            <p>No data available for chart</p>
          )}
          <h2 className="text-xs my-2 font-bold italic text-primary1 md:text-center">
            Distribution
          </h2>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ product }) => {
  return (
    <>
      <ChartSection
        title="Target Users"
        tooltip="Type of company's clientele"
        data={product.userCategory}
      />
      <div className="w-full h-px bg-slate-200 my-4"></div>
      <ChartSection
        title="Target Industriess"
        tooltip="Sectors this product is making an impact in"
        data={product.industry}
      />
      <div className="w-full h-px bg-slate-200 my-4"></div>
      <ChartSection
        title="Target Practice Areas"
        tooltip="Legal practice areas supported by this product"
        data={product.practiceAreas}
      />
      <div className="w-full h-px bg-slate-200 my-4"></div>
      <ChartSection
        title="Target Client Team Size"
        tooltip="Size of the client's team"
        data={product.teamSize}
      />
    </>
  );
};

export default Dashboard;
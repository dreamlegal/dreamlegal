import React from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

interface ChartOneProps {
  series: {
    name: string;
    data: { x: string; y: number }[];
  }[];
}

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [], // This will be set dynamically
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

const ChartOne: React.FC<ChartOneProps> = ({ series }) => {
  // Extract unique dates from series data to set categories
  const allDates = series.flatMap(s => s.data.map(d => d.x));
  const uniqueDates = Array.from(new Set(allDates));

  // Update options with dynamic categories
  const updatedOptions: ApexOptions = {
    ...options,
    xaxis: {
      ...options.xaxis,
      categories: uniqueDates,
    },
  };

  if (!series || series.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-8 font-clarity">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#3056D3]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#3056D3]"></span>
            </span>
            <div className="w-full">
              <p className=" text-sm text-[#3056D3]">Unique Visitors</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#80CAEE]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#80CAEE]"></span>
            </span>
            <div className="w-full">
              <p className=" text-sm text-[#80CAEE]">Login User Visitors</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={updatedOptions}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

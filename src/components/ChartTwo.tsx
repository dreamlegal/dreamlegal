"use client";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [], // To be filled dynamically
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoProps {
  countryData: Record<string, number>;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ countryData }) => {
  const [state, setState] = useState<{
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  }>({
    series: [
      {
        name: "Traffic",
        data: [],
      },
    ],
    categories: [],
  });

  useEffect(() => {
    const categories = Object.keys(countryData);
    const data = Object.values(countryData);

    setState({
      series: [
        {
          name: "Traffic",
          data: data,
        },
      ],
      categories: categories,
    });
  }, [countryData]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 shadow k xl:col-span-4 font-clarity">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-sm font-semibold text-black dark:text-white">
            Traffic by Country
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { categories: state.categories } }}
            series={state.series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;

"use client";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/css/jsvectormap.css";
import { useEffect } from "react";
import "jsvectormap/dist/maps/world";
const MapOne: React.FC = () => {
  useEffect(() => {
    const mapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "world",
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        selected: { fill: "#3056D3" },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },

      selectedRegions: ["EG", "US"],

      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1];
          },
        },
      },
    });

    return () => {
      mapOne.destroy();
    };
  }, []);

  return (
    <div className="col-span-12 rounded-sm border  bg-white px-7 py-4 shadow font-clarity">
      <h4 className="mb-2 text-sm font-semibold text-black ">Region labels</h4>
      <div className="h-90">
        <div id="mapOne" className="mapOne map-btn w-full"></div>
      </div>
    </div>
  );
};

export default MapOne;

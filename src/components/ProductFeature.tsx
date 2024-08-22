"use client";
import React, { useState } from "react";
import { FiAward } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

function ProductFeature({ features, productId }: any) {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExpand = (index: number, category: string) => {
    console.log(`Toggled category at index: ${index}, category: ${category}`);
    sendClickDataToBackend(productId, category);

    setExpanded((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((i) => i !== index)
        : [...prevExpanded, index]
    );
  };

  const sendClickDataToBackend = async (productId: string, category: string) => {
    console.log(`Sending click data for productId: ${productId}, category: ${category}`);
    try {
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, category }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Click data sent successfully');
    } catch (error) {
      console.error('Error sending click data:', error);
    }
  };

  return (
    <div>
      <div className="grid max-w-md gap-5 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3 font-clarity">
        {features.map((feature: any, index: any) => (
          <div key={index} className="flex flex-col sm:flex-row w-full" >
            <div className="sm:mr-4">
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
                <FiAward className="text-primary1 w-4 h-4" />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2 flex justify-between items-center font-bold text-sm leading-5 cursor-pointer w-full">
                <h6
                  // mb-2 flex gap-2  justify-between items-center font-bold text-sm leading-5 cursor-pointer
                  className="col-span-3"
                  onClick={() => toggleExpand(index, feature.category)}
                >
                  {feature.category}
                </h6>
                <div className="col-span-1 ml-3"><IoChevronDown className=" text-gray-400 " /></div>
              </div>

              {expanded.includes(index) && (
                <ul className="mb-4 -ml-1 space-y-2">
                  {feature.subcategories.map(
                    (subcategory: any, subIndex: any) => (
                      <li key={subIndex} className="flex items-start text-sm text-gray-700">
                        <span className="mr-1">
                          <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                        </span>
                        {subcategory}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFeature;
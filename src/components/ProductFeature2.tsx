"use client";
import React from "react";
import { FiAward } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";

function ProductFeature2({ features, productId }: any) {
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
          <div key={index} className="flex flex-col sm:flex-row">
            <div className="sm:mr-4">
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
                <FiAward className="text-primary1 w-4 h-4" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 flex gap-2 justify-between items-center font-bold text-sm leading-5">
                {feature.category}
              </h6>
              <ul className="mb-4 -ml-1 space-y-2">
                {feature.subcategories.map((subcategory: any, subIndex: any) => (
                  <li key={subIndex} className="flex items-start text-sm text-gray-700">
                    <span className="mr-1">
                      <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                    </span>
                    {subcategory}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFeature2;

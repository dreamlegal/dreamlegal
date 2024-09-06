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
     <div className="flex w-[100%] flex-wrap gap-5 sm:mx-auto lg:max-w-full font-clarity">
        {features.map((feature: any, index: any) => (
            <div key={index} className="flex flex-col w-full lg:w-100 ">
                
                
                <h6 className="text-lg font-bold mb-4 text-blue-500">{feature.category}</h6>

            <ul className="space-y-2">
                {feature.subcategories.map((subcategory: any, subIndex: any) => (
                <li key={subIndex} className="text-gray-700">
                    {subcategory}
                </li>
                ))}
            </ul>
            <hr className="mt-2 mb-2"  /> 
            
            </div>
        ))}
</div>


    </div>
  );
}

export default ProductFeature;
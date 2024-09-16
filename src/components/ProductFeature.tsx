// "use client";
// import React, { useState } from "react";
// import { FiAward } from "react-icons/fi";
// import { FaCircleCheck } from "react-icons/fa6";
// import { IoChevronDown } from "react-icons/io5";

// function ProductFeature({ features, productId }: any) {
//   const [expanded, setExpanded] = useState<number[]>([]);

//   const toggleExpand = (index: number, category: string) => {
//     console.log(`Toggled category at index: ${index}, category: ${category}`);
//     sendClickDataToBackend(productId, category);

//     setExpanded((prevExpanded) =>
//       prevExpanded.includes(index)
//         ? prevExpanded.filter((i) => i !== index)
//         : [...prevExpanded, index]
//     );
//   };

//   const sendClickDataToBackend = async (productId: string, category: string) => {
//     console.log(`Sending click data for productId: ${productId}, category: ${category}`);
//     try {
//       const response = await fetch('/api/track-click', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ productId, category }),
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       console.log('Click data sent successfully');
//     } catch (error) {
//       console.error('Error sending click data:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="grid max-w-md gap-5 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3 font-clarity">
//         {features.map((feature: any, index: any) => (
//           <div key={index} className="flex flex-col sm:flex-row w-full" >
//             <div className="sm:mr-4">
//               <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
//                 <FiAward className="text-primary1 w-4 h-4" />
//               </div>
//             </div>
//             <div className="w-full">
//               <div className="mb-2 flex justify-between items-center font-bold text-sm leading-5 cursor-pointer w-full">
//                 <h6
//                   // mb-2 flex gap-2  justify-between items-center font-bold text-sm leading-5 cursor-pointer
//                   className="col-span-3"
//                   onClick={() => toggleExpand(index, feature.category)}
//                 >
//                   {feature.category}
//                 </h6>
//                 <div className="col-span-1 ml-3"><IoChevronDown className=" text-gray-400 "  onClick={() => toggleExpand(index, feature.category)} /></div>
//               </div>

//               {expanded.includes(index) && (
//                 <ul className="mb-4 -ml-1 space-y-2">
//                   {feature.subcategories.map(
//                     (subcategory: any, subIndex: any) => (
//                       <li key={subIndex} className="flex items-start text-sm text-gray-700">
//                         <span className="mr-1">
//                           <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
//                         </span>
//                         {subcategory}
//                       </li>
//                     )
//                   )}
//                 </ul>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductFeature;

import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { FiAward } from "react-icons/fi";
// import { FaCircleCheck } from "react-icons/fa6";
// import { IoChevronDown } from "react-icons/io5";

function ProductFeature({ features }: any) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (subcategory: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [subcategory]: !prevExpanded[subcategory]
    }));
  };

  return (
    <div>
     <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 font-clarity">
      {Object.entries(features).map(([category, subcategories], categoryIndex) => (
        <div key={categoryIndex} className="w-full">
          {Object.entries(subcategories).map(([subcategory, values], subIndex) => (
            <div key={subIndex} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-4 bg-gray-50 flex justify-between items-center font-bold text-sm leading-5 cursor-pointer"
                onClick={() => toggleExpand(subcategory)}
              >
                <h6 className="flex items-center space-x-2">
                  <FiAward className="text-primary1 w-4 h-4" />
                  <span>{subcategory}</span>
                </h6>
                <IoChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${expanded[subcategory] ? "transform rotate-180" : ""}`}
                />
              </div>
              
              {expanded[subcategory] && (
                <ul className="p-4 space-y-2">
                  {values.length > 0 ? (
                    values.map((value, valueIndex) => (
                      <li key={valueIndex} className="flex items-start text-sm text-gray-700">
                        <FaCircleCheck className="w-5 h-5 mt-px text-teal-500 mr-2 flex-shrink-0" />
                        <span>{value}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500">No More Details to show</li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
}

export default ProductFeature;

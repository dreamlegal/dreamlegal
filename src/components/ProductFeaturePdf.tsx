import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { FiAward } from "react-icons/fi";

function ProductFeaturePdf({ features }) {
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    // Initialize all subcategories as expanded
    const initialExpanded = {};
    Object.entries(features).forEach(([category, subcategories]) => {
      Object.keys(subcategories).forEach((subcategory) => {
        initialExpanded[subcategory] = true;
      });
    });
    setExpanded(initialExpanded);
  }, [features]);

  const toggleExpand = (subcategory) => {
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

export default ProductFeaturePdf;
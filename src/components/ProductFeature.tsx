

// import React, { useState } from "react";
// import { FaCircleCheck } from "react-icons/fa6";
// import { IoChevronDown } from "react-icons/io5";

// import { FiAward } from "react-icons/fi";

// function ProductFeature({ features }: any) {
//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

//   const toggleExpand = (subcategory: string) => {
//     setExpanded((prevExpanded) => ({
//       ...prevExpanded,
//       [subcategory]: !prevExpanded[subcategory]
//     }));
//   };

//   return (
//     <div>
//      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 font-clarity">
//       {Object.entries(features).map(([category, subcategories], categoryIndex) => (
//         <div key={categoryIndex} className="w-full">
//           {Object.entries(subcategories).map(([subcategory, values], subIndex) => (
//             <div key={subIndex} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
//               <div 
//                 className="p-4 bg-gray-50 flex justify-between items-center font-bold text-sm leading-5 cursor-pointer"
//                 onClick={() => toggleExpand(subcategory)}
//               >
//                 <h6 className="flex items-center space-x-2">
//                   <FiAward className="text-primary1 w-4 h-4" />
//                   <span>{subcategory}</span>
//                 </h6>
//                 <IoChevronDown
//                   className={`text-gray-400 transition-transform duration-300 ${expanded[subcategory] ? "transform rotate-180" : ""}`}
//                 />
//               </div>
              
//               {expanded[subcategory] && (
//                 <ul className="p-4 space-y-2">
//                   {values.length > 0 ? (
//                     values.map((value, valueIndex) => (
//                       <li key={valueIndex} className="flex items-start text-sm text-gray-700">
//                         <FaCircleCheck className="w-5 h-5 mt-px text-teal-500 mr-2 flex-shrink-0" />
//                         <span>{value}</span>
//                       </li>
//                     ))
//                   ) : (
//                     <li className="text-sm text-gray-500">No More Details to show</li>
//                   )}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// }

// export default ProductFeature;
import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { FiAward } from "react-icons/fi";
import useGeoLocation from "react-ipgeolocation";

interface ProductFeatureProps {
  features: any;
  productIdForFeatures: string;
}
const countryNames: { [key: string]: string } = {
  US: "United States of America",
  IN: "India",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  FR: "France",
  DE: "Germany",
  JP: "Japan",
  CN: "China",
  BR: "Brazil",
  RU: "Russia",
  ZA: "South Africa",
  IT: "Italy",
  ES: "Spain",
  MX: "Mexico",
  KR: "South Korea",
  NG: "Nigeria",
  AR: "Argentina",
  SA: "Saudi Arabia",
  TR: "Turkey",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  NL: "Netherlands",
  BE: "Belgium",
  CH: "Switzerland",
  AT: "Austria",
  IE: "Ireland",
  NZ: "New Zealand",
  SG: "Singapore",
  MY: "Malaysia",
  TH: "Thailand",
  ID: "Indonesia",
  PH: "Philippines",
  VN: "Vietnam",
  EG: "Egypt",
  KE: "Kenya",
  GH: "Ghana",
  PK: "Pakistan",
  BD: "Bangladesh",
  LK: "Sri Lanka",
  IR: "Iran",
  IQ: "Iraq",
  IL: "Israel",
  AE: "United Arab Emirates",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  BH: "Bahrain",
  JO: "Jordan",
  LB: "Lebanon",
  SY: "Syria",
  YE: "Yemen",
  MA: "Morocco",
  DZ: "Algeria",
  TN: "Tunisia",
  LY: "Libya",
  SD: "Sudan",
  ET: "Ethiopia",
  UG: "Uganda",
  TZ: "Tanzania",
  ZM: "Zambia",
  MZ: "Mozambique",
  AO: "Angola",
  CM: "Cameroon",
  SN: "Senegal",
  CI: "Ivory Coast",

  NE: "Niger",
  BF: "Burkina Faso",
  ML: "Mali",
  MR: "Mauritania",
  GM: "Gambia",
  GN: "Guinea",
  SL: "Sierra Leone",
  LR: "Liberia",
  TG: "Togo",
  BJ: "Benin",
  NA: "Namibia",
  BW: "Botswana",
  SZ: "Eswatini",
  LS: "Lesotho",
  MW: "Malawi",
  RW: "Rwanda",
  BI: "Burundi",
  SO: "Somalia",
  DJ: "Djibouti",
  ER: "Eritrea",
  GQ: "Equatorial Guinea",
  GA: "Gabon",
  CG: "Republic of the Congo",
  CD: "Democratic Republic of the Congo",
  ST: "Sao Tome and Principe",
  CV: "Cape Verde",
  GW: "Guinea-Bissau",
  KM: "Comoros",
  SC: "Seychelles",
  MU: "Mauritius",
  MG: "Madagascar",
  RE: "Reunion",
  YT: "Mayotte",
};

function ProductFeature({ features, productIdForFeatures }: ProductFeatureProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [categoryOpenCounts, setCategoryOpenCounts] = useState<{ [key: string]: number }>({});
  const [userOrgType, setUserOrgType] = useState<string>('Uncategorized');
  const location = useGeoLocation();
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchUserOrgType = async () => {
      if (!userId) {
        setUserOrgType('Uncategorized');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserOrgType(userData.success ? userData.profile.CompanyType || 'Uncategorized' : 'Uncategorized');
      } catch (err) {
        console.error(err.message || "Error fetching user data");
        setUserOrgType('Uncategorized');
      }
    };

    fetchUserOrgType();
  }, [userId]);

  useEffect(() => {
    const initialCounts: { [key: string]: number } = {};

    Object.entries(features).forEach(([category, subcategories]) => {
      Object.keys(subcategories).forEach((subcategory) => {
        initialCounts[subcategory] = 0;
      });
    });

    setCategoryOpenCounts(initialCounts);
  }, [features]);

  const toggleExpand = (subcategory: string) => {
    if (!expanded[subcategory]) {
      setCategoryOpenCounts((prevCounts) => ({
        ...prevCounts,
        [subcategory]: prevCounts[subcategory] + 1
      }));
    }

    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [subcategory]: !prevExpanded[subcategory]
    }));
  };

  const sendCategoryCountsToApi = async () => {
    const country = countryNames[location.country]
    
    console.log("Sending the following data to the API:", {
      categoryData: categoryOpenCounts,
      country,
      userOrgType,
      productID: "yourProductId" // Replace with your actual product ID
    });

    try {
      const response = await fetch("/api/add-features-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categoryData: categoryOpenCounts,
          country,
          userOrgType,
          productID: productIdForFeatures // Replace with your actual product ID
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send data to API");
      }

      console.log("Category counts sent successfully");
    } catch (error) {
      console.error("Error sending category counts:", error);
    }
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     sendCategoryCountsToApi();
  //     event.preventDefault();
  //     event.returnValue = '';
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [categoryOpenCounts, location.country, userOrgType]);

  useEffect(() => {
    const sendCategoryCountsToApi = async () => {
      const country = countryNames[location.country];

      const hasCounts = Object.values(categoryOpenCounts).some(count => count > 0);
    
      if (!hasCounts) {
        console.log("No category counts greater than zero. Not sending data.");
        return; // Exit if all counts are zero
      }
      
      // Log the data that will be sent
      console.log("Sending the following data to the API:", {
        categoryData: categoryOpenCounts,
        country,
        userOrgType,
        productID: productIdForFeatures, // Replace with your actual product ID
      });
  
      try {
        // Using navigator.sendBeacon for a non-blocking call
        const blob = new Blob(
          [JSON.stringify({
            categoryData: categoryOpenCounts,
            country,
            userOrgType,
            productID: productIdForFeatures, // Replace with your actual product ID
          })],
          { type: "application/json" }
        );
  
        // Use sendBeacon for the API call
        navigator.sendBeacon("/api/add-features-count", blob);
        console.log("Category counts sent successfully");
      } catch (error) {
        console.error("Error sending category counts:", error);
      }
    };
  
    const handleUnload = () => {
      sendCategoryCountsToApi();
    };
  
    window.addEventListener("unload", handleUnload);
  
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [categoryOpenCounts, location.country, userOrgType]);
  
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3 font-clarity">
        {Object.entries(features).flatMap(([category, subcategories]) =>
          Object.entries(subcategories).map(([subcategory, values], subIndex) => (
            <div key={subcategory} className="w-full">
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
          ))
        )}
      </div>
  
      <div className="mt-6">
        <h4 className="font-bold">Category Open Counts:</h4>
        <ul className="mt-2">
          {Object.entries(categoryOpenCounts).map(([category, count], index) => (
            <li key={index} className="text-sm text-gray-700">
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductFeature;


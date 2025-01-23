
// import React, { useState } from 'react';
// import { IoArrowForward } from "react-icons/io5";
// import { MdOutlineBusinessCenter } from "react-icons/md";

// // Filter options arrays
// const languages = [
//   "English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", 
//   "Japanese", "Korean", "Russian", "Arabic", "Hindi", "Dutch", "Swedish"
// ];

// const countries = [
//   "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", 
//   "India", "Singapore", "Netherlands", "Switzerland", "Japan", "Brazil", "Spain"
// ];

// const industries = [
//   "Legal Services", "Financial Services", "Healthcare", "Real Estate", "Technology",
//   "Manufacturing", "Retail", "Government", "Education", "Non-profit", "Energy",
//   "Transportation", "Construction", "Telecommunications"
// ];

// const practiceAreas = [
//   "Corporate Law", "Intellectual Property", "Litigation", "Real Estate Law",
//   "Employment Law", "Tax Law", "Criminal Law", "Family Law", "Immigration Law",
//   "Environmental Law", "Banking & Finance", "Mergers & Acquisitions"
// ];

// const categories = [
//   "Client Relationship Management",
//   "Contract Lifecycle Management",
//   "E-Signature",
//   "Document Management System",
//   "E-billing and Invoicing",
//   "E-discovery",
//   "Legal Research",
//   "Practice Management",
//   "Legal Analytics"
// ];

// const userCategories = [
//   "Individual Practitioner",
//   "Law firms",
//   "Government departments",
//   "Startups",
//   "Enterprises",
//   "Judiciary",
//   "In-House Counsels"
// ];

// const DirectoryFilter = ({
//   selectedFilters,
//   handleFilterChange,
//   setSelectedFilters,
// }) => {
//   // Search states for filterable sections
//   const [searchQueries, setSearchQueries] = useState({
//     language: "",
//     country: "",
//     industry: "",
//     practice: "",
//     category: "",
//     userCategory: ""
//   });

//   // Section open/close state
//   const [openSections, setOpenSections] = useState({
//     category: true,
//     customer: false,
//     price: false,
//     language: false,
//     country: false,
//     industry: false,
//     practice: false,
//     mobile: false
//   });

//   // Toggle section visibility
//   const toggleSection = (section) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   // Filter section component
//   const FilterSection = ({ 
//     title, 
//     section, 
//     options, 
//     filterKey,
//     searchable = false,
//     searchPlaceholder = "" 
//   }) => {
//     const filteredOptions = searchable 
//       ? options.filter(option => 
//           option.toLowerCase().includes((searchQueries[filterKey] || "").toLowerCase())
//         )
//       : options;

//     return (
//       <div className="border-b border-gray-200 last:border-b-0">
//         <div
//           onClick={() => toggleSection(section)}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50
//                    transition-colors duration-200"
//         >
//           <div className="flex items-center gap-2">
//             <div className="bg-purple-100 p-1.5 rounded-lg">
//               <MdOutlineBusinessCenter className="text-purple-600 w-4 h-4" />
//             </div>
//             <span className="font-medium text-gray-900">{title}</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 text-gray-400
//                      ${openSections[section] ? 'rotate-90' : ''}`} 
//           />
//         </div>

//         {openSections[section] && (
//           <div className="p-4 bg-gray-50">
//             {searchable && (
//               <div className="relative group mb-3">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
//                              rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200" />
//                 <input
//                   type="text"
//                   className="relative w-full p-2 rounded-lg border border-gray-200 
//                          focus:ring-2 focus:ring-purple-500 focus:border-transparent
//                          bg-white"
//                   placeholder={searchPlaceholder}
//                   value={searchQueries[filterKey] || ""}
//                   onChange={(e) => setSearchQueries(prev => ({
//                     ...prev,
//                     [filterKey]: e.target.value
//                   }))}
//                 />
//               </div>
//             )}
            
//             <div className="space-y-2 max-h-60 overflow-y-auto">
//               {filteredOptions.map((option) => (
//                 <label 
//                   key={option} 
//                   className="flex items-center gap-2 p-2 rounded-lg hover:bg-white 
//                          cursor-pointer transition-colors duration-200"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters[filterKey].includes(option)}
//                     onChange={() => handleFilterChange(filterKey, option)}
//                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500
//                            transition-colors duration-200"
//                   />
//                   <span className="text-sm text-gray-700">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Reset filters function
//   const handleReset = () => {
//     setSelectedFilters({
//       categories: [],
//       userCategory: [],
//       language: [],
//       country: [],
//       industry: [],
//       practiceAreas: [],
//       mobileAvailable: [],
//       price: []
//     });
//     setSearchQueries({
//       language: "",
//       country: "",
//       industry: "",
//       practice: "",
//       category: "",
//       userCategory: ""
//     });
//   };

//   return (
//     <div>
//       {/* Filter Header */}
//       <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
//         <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//           Filters
//         </h2>
//       </div>

//       {/* Filter Sections */}
//       <FilterSection
//         title="Category"
//         section="category"
//         options={categories}
//         filterKey="categories"
//         searchable
//         searchPlaceholder="Search categories..."
//       />

//       <FilterSection
//         title="User Category"
//         section="customer"
//         options={userCategories}
//         filterKey="userCategory"
//       />

//       <FilterSection
//         title="Language"
//         section="language"
//         options={languages}
//         filterKey="language"
//         searchable
//         searchPlaceholder="Search languages..."
//       />

//       <FilterSection
//         title="Headquarter"
//         section="country"
//         options={countries}
//         filterKey="country"
//         searchable
//         searchPlaceholder="Search countries..."
//       />

//       <FilterSection
//         title="Industry"
//         section="industry"
//         options={industries}
//         filterKey="industry"
//         searchable
//         searchPlaceholder="Search industries..."
//       />

//       <FilterSection
//         title="Practice Area"
//         section="practice"
//         options={practiceAreas}
//         filterKey="practiceAreas"
//         searchable
//         searchPlaceholder="Search practice areas..."
//       />

//       <FilterSection
//         title="Price"
//         section="price"
//         options={["Fixed", "Custom", "Both"]}
//         filterKey="price"
//       />

//       <FilterSection
//         title="Mobile Available"
//         section="mobile"
//         options={["Yes", "No"]}
//         filterKey="mobileAvailable"
//       />

//       {/* Reset Button */}
//       <div className="p-4 border-t border-gray-200 bg-gray-50">
//         <button
//           onClick={handleReset}
//           className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-500 
//                    text-white rounded-lg hover:from-purple-600 hover:to-pink-600
//                    transition-all duration-200 transform hover:scale-[1.02]
//                    focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
//                    font-medium shadow-lg"
//         >
//           Reset Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DirectoryFilter;
// import React, { useState } from 'react';
// import { IoArrowForward } from "react-icons/io5";
// import { MdOutlineBusinessCenter } from "react-icons/md";

// // Filter options arrays
// const languages = [
//   "English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", 
//   "Japanese", "Korean", "Russian", "Arabic", "Hindi", "Dutch", "Swedish"
// ];

// const countries = [
//   "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", 
//   "India", "Singapore", "Netherlands", "Switzerland", "Japan", "Brazil", "Spain"
// ];

// const industries = [
//   "Legal Services", "Financial Services", "Healthcare", "Real Estate", "Technology",
//   "Manufacturing", "Retail", "Government", "Education", "Non-profit", "Energy",
//   "Transportation", "Construction", "Telecommunications"
// ];

// const practiceAreas = [
//   "Corporate Law", "Intellectual Property", "Litigation", "Real Estate Law",
//   "Employment Law", "Tax Law", "Criminal Law", "Family Law", "Immigration Law",
//   "Environmental Law", "Banking & Finance", "Mergers & Acquisitions"
// ];

// const categories = [
//   "Client Relationship Management",
//   "Contract Lifecycle Management",
//   "E-Signature",
//   "Document Management System",
//   "E-billing and Invoicing",
//   "E-discovery",
//   "Legal Research",
//   "Practice Management",
//   "Legal Analytics"
// ];

// const userCategories = [
//   "Individual Practitioner",
//   "Law firms",
//   "Government departments",
//   "Startups",
//   "Enterprises",
//   "Judiciary",
//   "In-House Counsels"
// ];

// const DirectoryFilter = ({
//   selectedFilters,
//   handleFilterChange,
//   setSelectedFilters,
// }) => {
//   // Search states for filterable sections
//   const [searchQueries, setSearchQueries] = useState({
//     language: "",
//     country: "",
//     industry: "",
//     practice: "",
//     category: "",
//     userCategory: ""
//   });

//   // Section open/close state
//   const [openSections, setOpenSections] = useState({
//     category: true,
//     customer: false,
//     price: false,
//     language: false,
//     country: false,
//     industry: false,
//     practice: false,
//     mobile: false
//   });

//   // Toggle section visibility
//   const toggleSection = (section) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   // Filter section component
//   const FilterSection = ({ 
//     title, 
//     section, 
//     options, 
//     filterKey,
//     searchable = false,
//     searchPlaceholder = "" 
//   }) => {
//     const filteredOptions = searchable 
//       ? options.filter(option => 
//           option.toLowerCase().includes((searchQueries[filterKey] || "").toLowerCase())
//         )
//       : options;

//     return (
//       <div className="border-b border-gray-200 last:border-b-0">
//         <div
//           onClick={() => toggleSection(section)}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50
//                    transition-colors duration-200"
//         >
//           <div className="flex items-center gap-2">
//             <div className="bg-blue-100 p-1.5 rounded-lg">
//               <MdOutlineBusinessCenter className="text-blue-600 w-4 h-4" />
//             </div>
//             <span className="font-medium text-gray-900">{title}</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 text-gray-400
//                      ${openSections[section] ? 'rotate-90' : ''}`} 
//           />
//         </div>

//         {openSections[section] && (
//           <div className="p-4 bg-gray-50">
//             {searchable && (
//               <div className="relative group mb-3">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-sky-500/20 
//                              rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200" />
//                 <input
//                   type="text"
//                   className="relative w-full p-2 rounded-lg border border-gray-200 
//                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                          bg-white"
//                   placeholder={searchPlaceholder}
//                   value={searchQueries[filterKey] || ""}
//                   onChange={(e) => setSearchQueries(prev => ({
//                     ...prev,
//                     [filterKey]: e.target.value
//                   }))}
//                 />
//               </div>
//             )}
            
//             <div className="space-y-2 max-h-60 overflow-y-auto">
//               {filteredOptions.map((option) => (
//                 <label 
//                   key={option} 
//                   className="flex items-center gap-2 p-2 rounded-lg hover:bg-white 
//                          cursor-pointer transition-colors duration-200"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters[filterKey].includes(option)}
//                     onChange={() => handleFilterChange(filterKey, option)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500
//                            transition-colors duration-200"
//                   />
//                   <span className="text-sm text-gray-700">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Reset filters function
//   const handleReset = () => {
//     setSelectedFilters({
//       categories: [],
//       userCategory: [],
//       language: [],
//       country: [],
//       industry: [],
//       practiceAreas: [],
//       mobileAvailable: [],
//       price: []
//     });
//     setSearchQueries({
//       language: "",
//       country: "",
//       industry: "",
//       practice: "",
//       category: "",
//       userCategory: ""
//     });
//   };

//   return (
//     <div>
//       {/* Filter Header */}
//       <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-sky-50">
//         <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//           Filters
//         </h2>
//       </div>

//       {/* Filter Sections */}
//       <FilterSection
//         title="Category"
//         section="category"
//         options={categories}
//         filterKey="categories"
//         searchable
//         searchPlaceholder="Search categories..."
//       />

//       <FilterSection
//         title="User Category"
//         section="customer"
//         options={userCategories}
//         filterKey="userCategory"
//       />

//       <FilterSection
//         title="Language"
//         section="language"
//         options={languages}
//         filterKey="language"
//         searchable
//         searchPlaceholder="Search languages..."
//       />

//       <FilterSection
//         title="Headquarter"
//         section="country"
//         options={countries}
//         filterKey="country"
//         searchable
//         searchPlaceholder="Search countries..."
//       />

//       <FilterSection
//         title="Industry"
//         section="industry"
//         options={industries}
//         filterKey="industry"
//         searchable
//         searchPlaceholder="Search industries..."
//       />

//       <FilterSection
//         title="Practice Area"
//         section="practice"
//         options={practiceAreas}
//         filterKey="practiceAreas"
//         searchable
//         searchPlaceholder="Search practice areas..."
//       />

//       <FilterSection
//         title="Price"
//         section="price"
//         options={["Fixed", "Custom", "Both"]}
//         filterKey="price"
//       />

//       <FilterSection
//         title="Mobile Available"
//         section="mobile"
//         options={["Yes", "No"]}
//         filterKey="mobileAvailable"
//       />

//       {/* Reset Button */}
//       <div className="p-4 border-t border-gray-200 bg-gray-50">
//         <button
//           onClick={handleReset}
//           className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-sky-500 
//                    text-white rounded-lg hover:from-blue-600 hover:to-sky-600
//                    transition-all duration-200 transform hover:scale-[1.02]
//                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                    font-medium shadow-lg"
//         >
//           Reset Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DirectoryFilter;
import React, { useState } from 'react';
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";

// Filter options arrays
// const languages = [
//   "English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", 
//   "Japanese", "Korean", "Russian", "Arabic", "Hindi", "Dutch", "Swedish"
// ];

// const countries = [
//   "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", 
//   "India", "Singapore", "Netherlands", "Switzerland", "Japan", "Brazil", "Spain"
// ];

// const industries = [
//   "Legal Services", "Financial Services", "Healthcare", "Real Estate", "Technology",
//   "Manufacturing", "Retail", "Government", "Education", "Non-profit", "Energy",
//   "Transportation", "Construction", "Telecommunications"
// ];

// const practiceAreas = [
//   "Corporate Law", "Intellectual Property", "Litigation", "Real Estate Law",
//   "Employment Law", "Tax Law", "Criminal Law", "Family Law", "Immigration Law",
//   "Environmental Law", "Banking & Finance", "Mergers & Acquisitions"
// ];

const categories = [
  "Client Relationship Management",
  "Contract Lifecycle Management",
  "E-Signature",
  "Document Management System",
  "E-billing and Invoicing",
  "E-discovery",
  "Legal Research",
  "Practice Management",
  "Legal Analytics"
];

// const userCategories = [
//   "Individual Practitioner",
//   "Law firms",
//   "Government departments",
//   "Startups",
//   "Enterprises",
//   "Judiciary",
//   "In-House Counsels"
// ];

// llll
const userCategories = [
  'Legal Tech',
  'Document Management',
  'Contract Management',
  'E-Discovery',
  'Legal Research',
];

const priceOptions = [
  'Free',
  'Paid',
  'Custom Quote',
];

const languages = [
  "Arabic",
  "Bulgarian",
  "Chinese",
  "Configurable",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Estonian",
  "Finnish",
  "Flemish",
  "French",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Latvian",
  "Lithuanian",
  "Malay",
  "Maltese",
  "Mongolian",
  "Norwegian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swedish",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Vietnamese",
  "Welsh",
  "Yiddish",
  "Zulu",
];
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City (Holy See)",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const industries = [
  "Accounting firms",
  "Agriculture",
  "Banking and Finance",
  "Construction and Engineering",
  "Consulting firms",
  "Education",
  "Energy and Utilities",
  "Government and Public Sector",
  "Healthcare",
  "Hospitality and Tourism",
  "Insurance",
  "Legal Services Providers",
  "Manufacturing",
  "Media and Entertainment",
  "Non-Profit Organizations",
  "Neutral",
  "Pharmaceutical and Life Sciences",
  "Real Estate",
  "Retail and Consumer Goods",
  "Technology and Software",
  "Telecommunications",
  "Transportation and Logistics",
];

const practiceAreas = [
  "Appellate Law",
  "Antitrust Law",
  "Alternative Dispute Resolution",
  "Aviation",
  "Banking & Finance",
  "Business Law",
  "Civil Law",
  "Company",
  "Contract",
  "Consumer Protection",
  "Competition/Anti-Trust Law",
  "Construction",
  "Corporate Law",
  "Cybersecurity and Privacy Law",
  "Mergers and Acquisitions (M&A)",
  "Defense Law",
  "Dispute Resolution",
  "Election Law",
  "Education Law",
  "Energy and Natural Resources",
  "Environmental Law",
  "Labour and Employment Law",
  "Franchise Law",
  "Foreign Exchange Law",
  "Family and Succession",
  "Food and Drug Law",
  "Gaming Law",
  "Human Rights Law",
  "Healthcare",
  "International Law",
  "Immigration Law",
  "Infrastructure",
  "Insolvency and Banking",
  "Insurance",
  "Information Technology",
  "Intellectual Property Law",
  "Investment Law",
  "International Trade and Customs Law",
  "Management of Litigation",
  "Manufacturing in India",
  "Metals and Mining",
  "Technology Law",
  "Tax Law",
  "Telecommunication Law",
  "Personal Injury Law",
  "Product Liability",
  "Pharma and Life Sciences",
  "Public Interest Law",
  "Public Finance Law",
  "Railways",
  "Real Estate/Property Law",
  "Social Security and Disability Law",
  "Securities Law",
  "Sports, Media, Entertainment and Advertising",
  "Shipping",
  "Tax-Exempt Organizations Law",
  "Transportation Law",
  "Trade and commerce",
  "Trust",
  "Other",
];

const DirectoryFilter = ({
  selectedFilters,
  handleFilterChange,
  setSelectedFilters,
  isMobileView = false
}) => {
  // Search states for filterable sections
  const [searchQueries, setSearchQueries] = useState({
    language: "",
    country: "",
    industry: "",
    practice: "",
    category: "",
    userCategory: ""
  });

  // Section open/close state
  const [openSections, setOpenSections] = useState({
    category: true,
    customer: false,
    price: false,
    language: false,
    country: false,
    industry: false,
    practice: false,
    mobile: false
  });

  // Toggle section visibility
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter section component with responsive design
  const FilterSection = ({ 
    title, 
    section, 
    options, 
    filterKey,
    searchable = false,
    searchPlaceholder = "" 
  }) => {
    const filteredOptions = searchable 
      ? options.filter(option => 
          option.toLowerCase().includes((searchQueries[filterKey] || "").toLowerCase())
        )
      : options;

    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <div
          onClick={() => toggleSection(section)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50
                   transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-lg">
              <MdOutlineBusinessCenter className="text-blue-600 w-4 h-4" />
            </div>
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 text-gray-400
                     ${openSections[section] ? 'rotate-90' : ''}`} 
          />
        </div>

        {openSections[section] && (
          <div className="p-4 bg-gray-50">
            {searchable && (
              <div className="relative group mb-3">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-sky-500/20 
                             rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200" />
                <input
                  type="text"
                  className="relative w-full p-2 rounded-lg border border-gray-200 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white"
                  placeholder={searchPlaceholder}
                  value={searchQueries[filterKey] || ""}
                  onChange={(e) => setSearchQueries(prev => ({
                    ...prev,
                    [filterKey]: e.target.value
                  }))}
                />
              </div>
            )}
            
            <div className={`space-y-2 overflow-y-auto ${isMobileView ? 'max-h-40' : 'max-h-60'}`}>
              {filteredOptions.map((option) => (
                <label 
                  key={option} 
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white 
                         cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters[filterKey].includes(option)}
                    onChange={() => handleFilterChange(filterKey, option)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500
                           transition-colors duration-200 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 select-none">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Reset filters function
  const handleReset = () => {
    setSelectedFilters({
      categories: [],
      userCategory: [],
      language: [],
      country: [],
      industry: [],
      practiceAreas: [],
      mobileAvailable: [],
      price: []
    });
    setSearchQueries({
      language: "",
      country: "",
      industry: "",
      practice: "",
      category: "",
      userCategory: ""
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-sky-50">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Filters
        </h2>
      </div>

      {/* Scrollable Filter Sections */}
      <div className="flex-1 overflow-y-auto">
        <FilterSection
          title="Category"
          section="category"
          options={categories}
          filterKey="categories"
          searchable
          searchPlaceholder="Search categories..."
        />

        <FilterSection
          title="User Category"
          section="customer"
          options={userCategories}
          filterKey="userCategory"
        />

        <FilterSection
          title="Language"
          section="language"
          options={languages}
          filterKey="language"
          searchable
          searchPlaceholder="Search languages..."
        />

        <FilterSection
          title="Headquarter"
          section="country"
          options={countries}
          filterKey="country"
          searchable
          searchPlaceholder="Search countries..."
        />

        <FilterSection
          title="Industry"
          section="industry"
          options={industries}
          filterKey="industry"
          searchable
          searchPlaceholder="Search industries..."
        />

        <FilterSection
          title="Practice Area"
          section="practice"
          options={practiceAreas}
          filterKey="practiceAreas"
          searchable
          searchPlaceholder="Search practice areas..."
        />

        <FilterSection
          title="Price"
          section="price"
          options={["Fixed", "Custom", "Both"]}
          filterKey="price"
        />

        <FilterSection
          title="Mobile Available"
          section="mobile"
          options={["Yes", "No"]}
          filterKey="mobileAvailable"
        />
      </div>

      {/* Reset Button - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
        <button
          onClick={handleReset}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-sky-500 
                   text-white rounded-lg hover:from-blue-600 hover:to-sky-600
                   transition-all duration-200 transform hover:scale-[1.02]
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   font-medium shadow-lg"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DirectoryFilter;
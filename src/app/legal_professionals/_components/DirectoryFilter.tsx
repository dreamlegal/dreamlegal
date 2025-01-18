
const categories = [
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

const Industries = [
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

const practiseArea = [
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

// import React, { useState } from 'react';
// import { IoArrowForward } from "react-icons/io5";
// import { MdOutlineBusinessCenter } from "react-icons/md";

// const DirectoryFilter = ({
//   selectedFilters,
//   handleFilterChange,
//   setSelectedFilters,
// }) => {
//   const [openCategory, setOpenCategory] = useState({
//     category: false,
//     customer: false,
//     country: false,
//     price: false,
//     lang: false,
//     industry: false,
//     practice: false,
//     mobile: false,
//   });

//   const toggleCategory = (category) => {
//     setOpenCategory(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };

//   return (
//     <div className="space-y-4 bg-white p-4 rounded-lg">
//       <div className="text-xl font-semibold mb-6">Filters</div>
      
//       {/* Category Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('category')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Category</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.category ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.category && (
//           <div className="border-t p-4">
//             <div className="space-y-2">
//               {[
//                 "Client Relationship Management",
//                 "Contract Lifecycle Management",
//                 "E-Signature",
//                 "Document Management System",
//                 "E-billing and Invoicing",
//                 "E-discovery"
//               ].map((category) => (
//                 <label key={category} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.categories.includes(category)}
//                     onChange={() => handleFilterChange('categories', category)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{category}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* User Category Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('customer')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">User Category</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.customer ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.customer && (
//           <div className="border-t p-4">
//             <div className="space-y-2">
//               {[
//                 "Individual Practitioner",
//                 "Law firms",
//                 "Government departments",
//                 "Startups",
//                 "Enterprises",
//                 "Judiciary",
//                 "In-House Counsels"
//               ].map((user) => (
//                 <label key={user} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.userCategory.includes(user)}
//                     onChange={() => handleFilterChange('userCategory', user)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{user}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>


// {/* Price Section */}
// <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('price')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Price</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.price ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.price && (
//           <div className="border-t p-4">
//             <div className="space-y-2">
//               {["fixed", "custom", "both"].map((price) => (
//                 <label key={price} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.price.includes(price)}
//                     onChange={() => handleFilterChange('price', price)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm capitalize">{price}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Language Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('lang')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Language</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.lang ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.lang && (
//           <div className="border-t p-4">
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg mb-3"
//               placeholder="Search languages..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div className="space-y-2">
//               {filteredLanguages.map((language) => (
//                 <label key={language} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.language.includes(language)}
//                     onChange={() => handleFilterChange('language', language)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{language}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Country/Headquarter Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('country')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Headquarter</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.country ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.country && (
//           <div className="border-t p-4">
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg mb-3"
//               placeholder="Search countries..."
//               onChange={(e) => setSearchQueryCountry(e.target.value)}
//             />
//             <div className="space-y-2 max-h-60 overflow-y-auto">
//               {filteredCountries.map((country) => (
//                 <label key={country} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.country.includes(country)}
//                     onChange={() => handleFilterChange('country', country)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{country}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Industry Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('industry')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Industry</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.industry ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.industry && (
//           <div className="border-t p-4">
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg mb-3"
//               placeholder="Search industries..."
//               onChange={(e) => setSearchQueryIndustry(e.target.value)}
//             />
//             <div className="space-y-2 max-h-60 overflow-y-auto">
//               {filteredIndustries.map((industry) => (
//                 <label key={industry} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.industry.includes(industry)}
//                     onChange={() => handleFilterChange('industry', industry)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{industry}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Practice Area Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('practice')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Practice Area</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.practice ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.practice && (
//           <div className="border-t p-4">
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg mb-3"
//               placeholder="Search practice areas..."
//               onChange={(e) => setSearchQueryPractice(e.target.value)}
//             />
//             <div className="space-y-2 max-h-60 overflow-y-auto">
//               {filteredPracticeAreas.map((practice) => (
//                 <label key={practice} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.practiceAreas.includes(practice)}
//                     onChange={() => handleFilterChange('practiceAreas', practice)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{practice}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile Availability Section */}
//       <div className="border rounded-lg overflow-hidden">
//         <div
//           onClick={() => toggleCategory('mobile')}
//           className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//         >
//           <div className="flex items-center gap-2">
//             <MdOutlineBusinessCenter className="text-gray-500" />
//             <span className="font-medium">Mobile Availability</span>
//           </div>
//           <IoArrowForward 
//             className={`transform transition-transform duration-200 ${
//               openCategory.mobile ? 'rotate-90' : ''
//             }`}
//           />
//         </div>
//         {openCategory.mobile && (
//           <div className="border-t p-4">
//             <div className="space-y-2">
//               {["yes", "no"].map((option) => (
//                 <label key={option} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.mobileAvailable.includes(option)}
//                     onChange={() => handleFilterChange('mobileAvailable', option)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm capitalize">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Add other filter sections following the same pattern */}

//       {/* Action Buttons */}
//       <div className="flex gap-3 mt-6">
//         <button
//           onClick={() => setSelectedFilters({
//             categories: [],
//             userCategory: [],
//             price: [],
//             language: [],
//             country: [],
//             industry: [],
//             practiceAreas: [],
//             mobileAvailable: [],
//           })}
//           className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
//         >
//           Reset
//         </button>
//         <button
//           className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DirectoryFilter;
import React, { useState } from 'react';
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";

const DirectoryFilter = ({
  selectedFilters,
  handleFilterChange,
  setSelectedFilters,
}) => {
  // Search states for filterable sections
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuerycountry, setSearchQueryCountry] = useState("");
  const [searchQueryIndustry, setSearchQueryIndustry] = useState("");
  const [searchQueryPractice, setSearchQueryPractice] = useState("");

  // Filter sections open/close state
  const [openCategory, setOpenCategory] = useState({
    category: false,
    customer: false,
    country: false,
    price: false,
    lang: false,
    industry: false,
    practice: false,
    mobile: false,
  });

  // Handle category expansion without closing on selection
  const toggleCategory = (categoryName, e) => {
    e?.stopPropagation();
    setOpenCategory(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Handle checkbox changes without closing the section
  const handleCheckboxClick = (e, filterType, value) => {
    e.stopPropagation();
    handleFilterChange(filterType, value);
  };

  // Filter arrays based on search input
  const filteredLanguages = languages.filter(language =>
    language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchQuerycountry.toLowerCase())
  );

  const filteredIndustries = Industries.filter(industry =>
    industry.toLowerCase().includes(searchQueryIndustry.toLowerCase())
  );

  const filteredPracticeAreas = practiseArea.filter(practiceArea =>
    practiceArea.toLowerCase().includes(searchQueryPractice.toLowerCase())
  );

  // Reset all filters
  const handleResetFilters = (e) => {
    e?.stopPropagation();
    setSelectedFilters({
      categories: [],
      userCategory: [],
      price: [],
      language: [],
      country: [],
      industry: [],
      practiceAreas: [],
      mobileAvailable: [],
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="text-xl font-semibold mb-6">Filters</div>
      
      {/* Category Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('category', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Category</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.category ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.category && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              {[
                "Client Relationship Management",
                "Contract Lifecycle Management",
                "E-Signature",
                "Document Management System",
                "E-billing and Invoicing",
                "E-discovery"
              ].map((category) => (
                <label 
                  key={category} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.categories.includes(category)}
                    onChange={(e) => handleCheckboxClick(e, 'categories', category)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Category Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('customer', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">User Category</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.customer ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.customer && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              {[
                "Individual Practitioner",
                "Law firms",
                "Government departments",
                "Startups",
                "Enterprises",
                "Judiciary",
                "In-House Counsels"
              ].map((user) => (
                <label 
                  key={user} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.userCategory.includes(user)}
                    onChange={(e) => handleCheckboxClick(e, 'userCategory', user)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{user}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('price', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Price</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.price ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.price && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              {["fixed", "custom", "both"].map((price) => (
                <label 
                  key={price} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.price.includes(price)}
                    onChange={(e) => handleCheckboxClick(e, 'price', price)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm capitalize">{price}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Language Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('lang', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Language</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.lang ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.lang && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-3"
              placeholder="Search languages..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredLanguages.map((language) => (
                <label 
                  key={language} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.language.includes(language)}
                    onChange={(e) => handleCheckboxClick(e, 'language', language)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{language}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Country/Headquarter Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('country', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Headquarter</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.country ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.country && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-3"
              placeholder="Search countries..."
              onChange={(e) => setSearchQueryCountry(e.target.value)}
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCountries.map((country) => (
                <label 
                  key={country} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.country.includes(country)}
                    onChange={(e) => handleCheckboxClick(e, 'country', country)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{country}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Industry Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('industry', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Industry</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.industry ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.industry && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-3"
              placeholder="Search industries..."
              onChange={(e) => setSearchQueryIndustry(e.target.value)}
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredIndustries.map((industry) => (
                <label 
                  key={industry} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.industry.includes(industry)}
                    onChange={(e) => handleCheckboxClick(e, 'industry', industry)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{industry}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Practice Area Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('practice', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Practice Area</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.practice ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.practice && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-3"
              placeholder="Search practice areas..."
              onChange={(e) => setSearchQueryPractice(e.target.value)}
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredPracticeAreas.map((practice) => (
                <label 
                  key={practice} 
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.practiceAreas.includes(practice)}
                    onChange={(e) => handleCheckboxClick(e, 'practiceAreas', practice)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{practice}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Availability Section */}
      <div className="border rounded-lg overflow-hidden">
        <div
          onClick={(e) => toggleCategory('mobile', e)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <MdOutlineBusinessCenter className="text-gray-500" />
            <span className="font-medium">Mobile Availability</span>
          </div>
          <IoArrowForward 
            className={`transform transition-transform duration-200 ${
              openCategory.mobile ? 'rotate-90' : ''
            }`}
          />
        </div>
        {openCategory.mobile && (
          <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-2">
            {["yes", "no"].map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.mobileAvailable.includes(option)}
                  onChange={(e) => handleCheckboxClick(e, 'mobileAvailable', option)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Action Buttons */}
    <div className="flex gap-3 mt-6">
      <button
        onClick={handleResetFilters}
        className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
      >
        Reset
      </button>
      <button
        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Apply Filters
      </button>
    </div>
  </div>
);
};

export default DirectoryFilter;
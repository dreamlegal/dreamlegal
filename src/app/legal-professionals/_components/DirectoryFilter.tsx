
import React, { useState } from 'react';
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";





const categories = [
  "Client Relationship Management",
   "Contract Lifecycle Management",
   "E-Signature",
   "Document Management System",
   "E-billing and Invoicing",
   "E-discovery",
    "Governance, Risk and Compliance",
     "Intellectual Property Management",
     "Legal Research",
     "Legal Workflow Automation",
      "Litigation Management and Analytics"
 ];
 
 
 
 const User = [
 
 
   "Individual Practitioner",
                 "Law firms",
                 "Government departments",
                 "Startups",
                 "Enterprises",
                 "Judiciary",
                 "In-House Counsels"
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
// Filter Section Component
const FilterSection = ({ 
  title, 
  section, 
  options, 
  filterKey,
  searchable = false,
  searchQuery = "",
  onSearchChange,
  selectedFilters,
  handleFilterChange,
  openSections,
  toggleSection
}) => {
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <MdOutlineBusinessCenter className="text-purple-600 w-4 h-4" />
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                           rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200" />
              <input
                type="text"
                className="relative w-full p-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       bg-white"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => onSearchChange(filterKey, e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2 overflow-y-auto max-h-60 custom-scrollbar">
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
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500
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

// Main Directory Filter Component
const DirectoryFilter = ({
  selectedFilters,
  handleFilterChange,
  setSelectedFilters,
  onClose
}) => {
  // Search states
  const [searchQueries, setSearchQueries] = useState({
    language: "",
    country: "",
    industry: "",
    practiceAreas: "",
    categories: "",
    userCategory: ""
  });

  // Section states
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

  // Toggle section
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle search
  const handleSearchChange = (key, value) => {
    setSearchQueries(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset filters
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
      practiceAreas: "",
      categories: "",
      userCategory: ""
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Filters
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <FilterSection
          title="Category"
          section="category"
          options={categories}
          filterKey="categories"
          searchable
          searchQuery={searchQueries.categories}
          onSearchChange={handleSearchChange}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="User"
          section="customer"
          options={User}
          filterKey="userCategory"
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="Price"
          section="price"
          options={["Fixed", "Custom", "Both"]}
          filterKey="price"
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="Language"
          section="language"
          options={languages}
          filterKey="language"
          searchable
          searchQuery={searchQueries.language}
          onSearchChange={handleSearchChange}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="Headquarter"
          section="country"
          options={countries}
          filterKey="country"
          searchable
          searchQuery={searchQueries.country}
          onSearchChange={handleSearchChange}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="Industry"
          section="industry"
          options={industries}
          filterKey="industry"
          searchable
          searchQuery={searchQueries.industry}
          onSearchChange={handleSearchChange}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="Practice Area"
          section="practice"
          options={practiceAreas}
          filterKey="practiceAreas"
          searchable
          searchQuery={searchQueries.practiceAreas}
          onSearchChange={handleSearchChange}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <FilterSection
          title="Mobile Availability"
          section="mobile"
          options={["Yes", "No"]}
          filterKey="mobileAvailable"
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={handleReset}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-500 
                   text-white rounded-lg hover:from-purple-600 hover:to-pink-600
                   transition-all duration-200 transform hover:scale-[1.02]
                   focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                   font-medium shadow-lg"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

// Add custom scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export default DirectoryFilter;

// const languages = [
//   "Arabic",
//   "Bulgarian",
//   "Chinese",
//   "Configurable",
//   "Croatian",
//   "Czech",
//   "Danish",
//   "Dutch",
//   "English",
//   "Estonian",
//   "Finnish",
//   "Flemish",
//   "French",
//   "German",
//   "Greek",
//   "Hebrew",
//   "Hindi",
//   "Hungarian",
//   "Icelandic",
//   "Indonesian",
//   "Italian",
//   "Japanese",
//   "Korean",
//   "Latvian",
//   "Lithuanian",
//   "Malay",
//   "Maltese",
//   "Mongolian",
//   "Norwegian",
//   "Polish",
//   "Portuguese",
//   "Romanian",
//   "Russian",
//   "Slovak",
//   "Slovenian",
//   "Spanish",
//   "Swedish",
//   "Thai",
//   "Turkish",
//   "Ukrainian",
//   "Urdu",
//   "Vietnamese",
//   "Welsh",
//   "Yiddish",
//   "Zulu",
// ];
// const countries = [
//   "Afghanistan",
//   "Albania",
//   "Algeria",
//   "Andorra",
//   "Angola",
//   "Antigua and Barbuda",
//   "Argentina",
//   "Armenia",
//   "Australia",
//   "Austria",
//   "Azerbaijan",
//   "Bahamas",
//   "Bahrain",
//   "Bangladesh",
//   "Barbados",
//   "Belarus",
//   "Belgium",
//   "Belize",
//   "Benin",
//   "Bhutan",
//   "Bolivia",
//   "Bosnia and Herzegovina",
//   "Botswana",
//   "Brazil",
//   "Brunei",
//   "Bulgaria",
//   "Burkina Faso",
//   "Burundi",
//   "Cabo Verde",
//   "Cambodia",
//   "Cameroon",
//   "Canada",
//   "Central African Republic",
//   "Chad",
//   "Chile",
//   "China",
//   "Colombia",
//   "Comoros",
//   "Congo, Democratic Republic of the",
//   "Congo, Republic of the",
//   "Costa Rica",
//   "Croatia",
//   "Cuba",
//   "Cyprus",
//   "Czech Republic",
//   "Denmark",
//   "Djibouti",
//   "Dominica",
//   "Dominican Republic",
//   "East Timor (Timor-Leste)",
//   "Ecuador",
//   "Egypt",
//   "El Salvador",
//   "Equatorial Guinea",
//   "Eritrea",
//   "Estonia",
//   "Eswatini",
//   "Ethiopia",
//   "Fiji",
//   "Finland",
//   "France",
//   "Gabon",
//   "Gambia",
//   "Georgia",
//   "Germany",
//   "Ghana",
//   "Greece",
//   "Grenada",
//   "Guatemala",
//   "Guinea",
//   "Guinea-Bissau",
//   "Guyana",
//   "Haiti",
//   "Honduras",
//   "Hungary",
//   "Iceland",
//   "India",
//   "Indonesia",
//   "Iran",
//   "Iraq",
//   "Ireland",
//   "Israel",
//   "Italy",
//   "Jamaica",
//   "Japan",
//   "Jordan",
//   "Kazakhstan",
//   "Kenya",
//   "Kiribati",
//   "Korea, North",
//   "Korea, South",
//   "Kosovo",
//   "Kuwait",
//   "Kyrgyzstan",
//   "Laos",
//   "Latvia",
//   "Lebanon",
//   "Lesotho",
//   "Liberia",
//   "Libya",
//   "Liechtenstein",
//   "Lithuania",
//   "Luxembourg",
//   "Madagascar",
//   "Malawi",
//   "Malaysia",
//   "Maldives",
//   "Mali",
//   "Malta",
//   "Marshall Islands",
//   "Mauritania",
//   "Mauritius",
//   "Mexico",
//   "Micronesia, Federated States of",
//   "Moldova",
//   "Monaco",
//   "Mongolia",
//   "Montenegro",
//   "Morocco",
//   "Mozambique",
//   "Myanmar (Burma)",
//   "Namibia",
//   "Nauru",
//   "Nepal",
//   "Netherlands",
//   "New Zealand",
//   "Nicaragua",
//   "Niger",
//   "Nigeria",
//   "North Macedonia",
//   "Norway",
//   "Oman",
//   "Pakistan",
//   "Palau",
//   "Panama",
//   "Papua New Guinea",
//   "Paraguay",
//   "Peru",
//   "Philippines",
//   "Poland",
//   "Portugal",
//   "Qatar",
//   "Romania",
//   "Russia",
//   "Rwanda",
//   "Saint Kitts and Nevis",
//   "Saint Lucia",
//   "Saint Vincent and the Grenadines",
//   "Samoa",
//   "San Marino",
//   "Sao Tome and Principe",
//   "Saudi Arabia",
//   "Senegal",
//   "Serbia",
//   "Seychelles",
//   "Sierra Leone",
//   "Singapore",
//   "Slovakia",
//   "Slovenia",
//   "Solomon Islands",
//   "Somalia",
//   "South Africa",
//   "South Sudan",
//   "Spain",
//   "Sri Lanka",
//   "Sudan",
//   "Suriname",
//   "Sweden",
//   "Switzerland",
//   "Syria",
//   "Taiwan",
//   "Tajikistan",
//   "Tanzania",
//   "Thailand",
//   "Togo",
//   "Tonga",
//   "Trinidad and Tobago",
//   "Tunisia",
//   "Turkey",
//   "Turkmenistan",
//   "Tuvalu",
//   "Uganda",
//   "Ukraine",
//   "United Arab Emirates",
//   "United Kingdom",
//   "United States",
//   "Uruguay",
//   "Uzbekistan",
//   "Vanuatu",
//   "Vatican City (Holy See)",
//   "Venezuela",
//   "Vietnam",
//   "Yemen",
//   "Zambia",
//   "Zimbabwe",
// ];

// const industries = [
//   "Accounting firms",
//   "Agriculture",
//   "Banking and Finance",
//   "Construction and Engineering",
//   "Consulting firms",
//   "Education",
//   "Energy and Utilities",
//   "Government and Public Sector",
//   "Healthcare",
//   "Hospitality and Tourism",
//   "Insurance",
//   "Legal Services Providers",
//   "Manufacturing",
//   "Media and Entertainment",
//   "Non-Profit Organizations",
//   "Neutral",
//   "Pharmaceutical and Life Sciences",
//   "Real Estate",
//   "Retail and Consumer Goods",
//   "Technology and Software",
//   "Telecommunications",
//   "Transportation and Logistics",
// ];

// const practiceAreas = [
//   "Appellate Law",
//    "Antitrust Law",
//    "Alternative Dispute Resolution",
//    "Aviation",
//    "Banking & Finance",
//    "Business Law",
//    "Civil Law",
//    "Company",
//    "Contract",
//    "Consumer Protection",
//    "Competition/Anti-Trust Law",
//    "Construction",
//    "Corporate Law",
//    "Cybersecurity and Privacy Law",
//    "Mergers and Acquisitions (M&A)",
//    "Defense Law",
//    "Dispute Resolution",
//    "Election Law",
//    "Education Law",
//    "Energy and Natural Resources",
//    "Environmental Law",
//    "Labour and Employment Law",
//    "Franchise Law",
//    "Foreign Exchange Law",
//    "Family and Succession",
//    "Food and Drug Law",
//    "Gaming Law",
//    "Human Rights Law",
//    "Healthcare",
//    "International Law",
//    "Immigration Law",
//    "Infrastructure",
//    "Insolvency and Banking",
//    "Insurance",
//    "Information Technology",
//    "Intellectual Property Law",
//    "Investment Law",
//    "International Trade and Customs Law",
//    "Management of Litigation",
//    "Manufacturing in India",
//    "Metals and Mining",
//    "Technology Law",
//    "Tax Law",
//    "Telecommunication Law",
//    "Personal Injury Law",
//    "Product Liability",
//    "Pharma and Life Sciences",
//    "Public Interest Law",
//    "Public Finance Law",
//    "Railways",
//    "Real Estate/Property Law",
//    "Social Security and Disability Law",
//    "Securities Law",
//    "Sports, Media, Entertainment and Advertising",
//    "Shipping",
//    "Tax-Exempt Organizations Law",
//    "Transportation Law",
//    "Trade and commerce",
//    "Trust",
//    "Other",
// ];


// import React, { useState } from 'react';
// import { IoArrowForward } from "react-icons/io5";
// import { MdOutlineBusinessCenter } from "react-icons/md";

// // Constants
// const categories = [
//   "Client Relationship Management",
//   "Contract Lifecycle Management",
//   "E-Signature",
//   "Document Management System",
//   "E-billing and Invoicing",
//   "E-discovery",
//   "Governance, Risk and Compliance",
//   "Intellectual Property Management",
//   "Legal Research",
//   "Legal Workflow Automation",
//   "Litigation Management and Analytics"
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
//   const [searchStates, setSearchStates] = useState({
//     language: "",
//     country: "",
//     industry: "",
//     practice: "",
//   });

//   // Section open/close state
//   const [openSections, setOpenSections] = useState({
//     category: false,
//     customer: false,
//     price: false,
//     language: false,
//     country: false,
//     industry: false,
//     practice: false,
//     mobile: false,
//   });

//   // Toggle section visibility
//   const toggleSection = (sectionName, e) => {
//     e?.stopPropagation();
//     setOpenSections(prev => ({
//       ...prev,
//       [sectionName]: !prev[sectionName]
//     }));
//   };

//   // Handle checkbox click without closing section
//   const handleCheckboxClick = (e, filterType, value) => {
//     e.stopPropagation();
//     handleFilterChange(filterType, value);
//   };

//   // Handle search input change
//   const handleSearchChange = (section, value) => {
//     setSearchStates(prev => ({
//       ...prev,
//       [section]: value
//     }));
//   };

//   // Filter arrays based on search
//   const getFilteredItems = (items, searchKey) => {
//     const searchTerm = searchStates[searchKey]?.toLowerCase() || "";
//     return items.filter(item =>
//       item.toLowerCase().includes(searchTerm)
//     );
//   };

//   // Reset filters
//   const handleResetFilters = (e) => {
//     e?.stopPropagation();
//     setSelectedFilters({
//       categories: [],
//       userCategory: [],
//       price: [],
//       language: [],
//       country: [],
//       industry: [],
//       practiceAreas: [],
//       mobileAvailable: [],
//     });
//     setSearchStates({
//       language: "",
//       country: "",
//       industry: "",
//       practice: "",
//     });
//   };

//   // Filter section component
//   const FilterSection = ({ 
//     title, 
//     section, 
//     options, 
//     filterKey, 
//     searchable = false,
//     searchPlaceholder = ""
//   }) => (
//     <div className="border rounded-lg overflow-hidden mb-4">
//       <div
//         onClick={(e) => toggleSection(section, e)}
//         className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//       >
//         <div className="flex items-center gap-2">
//           <MdOutlineBusinessCenter className="text-gray-500" />
//           <span className="font-medium">{title}</span>
//         </div>
//         <IoArrowForward 
//           className={`transform transition-transform duration-200 ${
//             openSections[section] ? 'rotate-90' : ''
//           }`}
//         />
//       </div>
      
//       {openSections[section] && (
//         <div className="border-t p-4" onClick={(e) => e.stopPropagation()}>
//           {searchable && (
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg mb-3"
//               placeholder={searchPlaceholder}
//               value={searchStates[section] || ""}
//               onChange={(e) => handleSearchChange(section, e.target.value)}
//             />
//           )}
          
//           <div className="space-y-2 max-h-60 overflow-y-auto">
//             {(searchable ? getFilteredItems(options, section) : options).map((option) => (
//               <label 
//                 key={option} 
//                 className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedFilters[filterKey].includes(option)}
//                   onChange={(e) => handleCheckboxClick(e, filterKey, option)}
//                   className="rounded border-gray-300"
//                 />
//                 <span className="text-sm">{option}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="space-y-4 bg-white p-4 rounded-lg">
//       <div className="text-xl font-semibold mb-6">Filters</div>
      
//       {/* Category Section */}
//       <FilterSection
//         title="Category"
//         section="category"
//         options={categories}
//         filterKey="categories"
//       />

//       {/* User Category Section */}
//       <FilterSection
//         title="User"
//         section="customer"
//         options={userCategories}
//         filterKey="userCategory"
//       />

//       {/* Price Section */}
//       <FilterSection
//         title="Price"
//         section="price"
//         options={["fixed", "custom", "both"]}
//         filterKey="price"
//       />

//       {/* Language Section */}
//       <FilterSection
//         title="Language"
//         section="language"
//         options={languages}
//         filterKey="language"
//         searchable
//         searchPlaceholder="Search languages..."
//       />

//       {/* Industry Section */}
//       <FilterSection
//         title="Industry"
//         section="industry"
//         options={industries}
//         filterKey="industry"
//         searchable
//         searchPlaceholder="Search industries..."
//       />

//       {/* Practice Area Section */}
//       <FilterSection
//         title="Practice Area"
//         section="practice"
//         options={practiceAreas}
//         filterKey="practiceAreas"
//         searchable
//         searchPlaceholder="Search practice areas..."
//       />

//       {/* Mobile Availability Section */}
//       <FilterSection
//         title="Mobile Availability"
//         section="mobile"
//         options={["yes", "no"]}
//         filterKey="mobileAvailable"
//       />

//       {/* Action Buttons */}
//       <div className="flex gap-3 mt-6">
//         <button
//           onClick={handleResetFilters}
//           className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           Reset
//         </button>
//         <button
//           className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 
//                    transition-colors"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DirectoryFilter;
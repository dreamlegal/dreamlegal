
// "use client"
// // import React from 'react';
// // import { useRouter } from 'next/navigation';

// interface CoreFunctionButtonProps {
//   text: string;
//   onClick: () => void;
// }

// const CoreFunctionButton: React.FC<CoreFunctionButtonProps> = ({ text, onClick }) => (
//   <button 
//     onClick={onClick}
//     className="px-6 py-3 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-full text-sm text-gray-800"
//   >
//     {text}
//   </button>
// );


// import React from 'react';
// import { useRouter } from 'next/navigation';
// // import CoreFunctionButton from './CoreFunctionButton';

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

// const DirectoryLanding: React.FC = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [selectedCategory, setSelectedCategory] = React.useState('');
//   const [selectedUserCategory, setSelectedUserCategory] = React.useState('');

//   // Helper function to update URL query parameters with current filters
//   const updateFiltersInUrl = (category: string, userCategory: string, search?: string) => {
//     const params = new URLSearchParams();
//     if (search) {
//       params.append('q', search);
//     }
//     if (category) {
//       params.append('category', category);
//     }
//     if (userCategory) {
//       params.append('userCategory', userCategory);
//     }
//     router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
//   };

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     updateFiltersInUrl(selectedCategory, selectedUserCategory, searchQuery);
//   };

//   const handleCategoryClick = (category: string) => {
//     // Toggle the legal category if the same button is clicked twice
//     const newCategory = selectedCategory === category ? '' : category;
//     setSelectedCategory(newCategory);
//     updateFiltersInUrl(newCategory, selectedUserCategory, searchQuery);
//   };

//   const handleUserCategoryClick = (userCategory: string) => {
//     // Toggle the user category if the same button is clicked twice
//     const newUserCategory = selectedUserCategory === userCategory ? '' : userCategory;
//     setSelectedUserCategory(newUserCategory);
//     updateFiltersInUrl(selectedCategory, newUserCategory, searchQuery);
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="relative">
//         {/* Search Form */}
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <form onSubmit={handleSearch} className="flex gap-4 justify-center">
//             <input
//               type="text"
//               placeholder="Search for legal technology solutions..."
//               className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button 
//               type="submit"
//               className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
//             >
//               Search
//             </button>
//           </form>
//         </div>

//         {/* Core Legal Functions Section */}
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <h2 className="text-xl font-semibold mb-6 text-center">
//             Search by Core Legal Functions:
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             {categories.map((category) => (
//               <CoreFunctionButton 
//                 key={category}
//                 text={category} 
//                 onClick={() => handleCategoryClick(category)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* User Categories Section */}
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <h2 className="text-xl font-semibold mb-6 text-center">
//             Search by User Category:
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             {userCategories.map((userCategory) => (
//               <CoreFunctionButton 
//                 key={userCategory}
//                 text={userCategory} 
//                 onClick={() => handleUserCategoryClick(userCategory)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default DirectoryLanding;
// "use client"
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Search, Sparkles } from 'lucide-react';
// import ProductCategories from './_components/ProductsPart';

// // Utility function to convert category name to URL-friendly format
// const toUrlSlug = (name) => {
//   return name
//     .replace(/[^A-Za-z0-9 ]+/g, '')  // Remove special characters but keep letters (in their original case) and spaces
//     .replace(/\s+/g, '+');           // Replace spaces with plus signs
// };




// // First row categories
// const firstRowCategories = [
//   { id: 1, name: "CONTRACTS", slug: "Contract Lifecycle Management" },
//   { id: 2, name: "COMPLIANCE", slug: "Governance, Risk and Compliance" },
//   { id: 3, name: "INTELLECTUAL PROPERTY", slug: "Intellectual Property Management" },
//   { id: 4, name: "RESEARCH", slug: "Legal Research" }
// ];

// // Second row categories
// const secondRowCategories = [
//   { id: 5, name: "DOCUMENTS", slug:  "Document Management System"},
//   { id: 6, name: "E-SIGNATURE", slug:  "E-Signature" },
//   { id: 7, name: "E-DISCOVERY", slug:"E-discovery"},
//   { id: 8, name: "BILLING & INVOICING", slug:   "E-billing and Invoicing" },
//   { id: 9, name: "Litigation/ Client management", slug: ["Client Relationship Management", "Litigation Management and Analytics"] } // }
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

// const DirectoryLanding = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedUserCategory, setSelectedUserCategory] = useState('');

  

//   const handleSearch = (e) => {
//     e.preventDefault();
//     updateFiltersInUrl(selectedCategory, selectedUserCategory, searchQuery);
//   };

  

//   const updateFiltersInUrl = (category, userCategory, search) => {
//     const params = new URLSearchParams();
//     if (search) params.append('q', search);
//     if (category) {
//       params.append('category', toUrlSlug(category));
//     }
//     if (userCategory) {
//       params.append('userCategory', toUrlSlug(userCategory));
//     }
//     router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
//   };
  
//   // Update the handleCategoryClick function
//   const handleCategoryClick = (categoryName) => {
//     const category = secondRowCategories.find(cat => cat.name === categoryName);
//     const categorySlug = category ? category.slug : categoryName;
    
//     // Handle selection/deselection
//     const newCategory = selectedCategory === categoryName ? '' : categorySlug;
//     setSelectedCategory(categoryName); // Store the name for UI highlighting
//     updateFiltersInUrl(newCategory, selectedUserCategory, searchQuery);
//   };
//   const handleUserCategoryClick = (userCategory) => {
//     const newUserCategory = selectedUserCategory === userCategory ? '' : userCategory;
//     setSelectedUserCategory(newUserCategory);
//     updateFiltersInUrl(selectedCategory, newUserCategory, searchQuery);
//   };

//   return (
//     <>
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden pt-24 -pb-24">
//       {/* Grid Pattern Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-xl backdrop-blur-sm"
//             style={{
//               width: `${Math.random() * 40 + 20}px`,
//               height: `${Math.random() * 40 + 20}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${4 + i}s ease-in-out infinite`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white/80 to-white/40 
//                          backdrop-blur-md rounded-full border border-blue-100 shadow-lg mb-8">
//             <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
//             <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
//                            bg-clip-text text-transparent">
//               LEGAL TECH DIRECTORY
//             </span>
//           </div>
          
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Find the Perfect Legal Technology Solution
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
//             Compare and evaluate the best technology for your legal needs
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="max-w-3xl mx-auto mb-20">
//           <form onSubmit={handleSearch}>
//             <div className="flex items-center p-2 bg-white rounded-2xl shadow-lg">
//               <input
//                 type="text"
//                 placeholder="Search for legal technology solutions..."
//                 className="w-full px-6 py-4 text-lg border-0 focus:ring-0 focus:outline-none"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button 
//                 type="submit"
//                 className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
//                          transition-colors duration-200 flex items-center gap-2"
//               >
//                 <Search className="w-5 h-5" />
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* User Categories */}
//         <div className="mb-20">
//           <h2 className="text-2xl font-semibold mb-8 text-center">What Describes You The Best?</h2>
//           <div className="flex flex-wrap justify-center gap-3">
//             {userCategories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleUserCategoryClick(category)}
//                 className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 
//                   ${selectedUserCategory === category 
//                     ? 'bg-blue-100 text-blue-700 shadow-md scale-105' 
//                     : 'bg-white/80 text-gray-600 hover:bg-blue-50'} 
//                   backdrop-blur-sm border border-blue-100`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Core Legal Functions */}
//         <div className="mb-20">
//           <h2 className="text-2xl font-semibold mb-12 text-center">Core Legal Functions</h2>
          
     
//           {/* Main container with max width and perfect alignment */}
//           <div className="w-full px-4 py-8">
//       {/* First Row - 4 items */}
//       <div className="w-full md:max-w-[80%] mx-auto mb-6">
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-6">
//           {firstRowCategories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => handleCategoryClick(category.slug)}
//               className={`
//                 group relative p-4
//                 bg-white/70 backdrop-blur-sm rounded-xl
//                 border transition-all duration-300
//                 ${selectedCategory === category.name 
//                   ? 'border-blue-400 shadow-lg scale-102 bg-white/80' 
//                   : 'border-blue-100 hover:border-blue-300 hover:shadow-lg'}
//                 transform hover:-translate-y-1
//               `}
//             >
//               <span className="block text-center font-semibold text-gray-900">{category.name}</span>
              
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent 
//                             rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Second Row - 5 items */}
//       <div className="w-full md:max-w-[95%] mx-auto">
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-6">
//           {secondRowCategories.map((category, index) => (
//             <button
//               key={category.id}
//               onClick={() => handleCategoryClick(category.name)}
//               className={`
//                 group relative p-4
//                 bg-white/70 backdrop-blur-sm rounded-xl
//                 border transition-all duration-300
//                 ${selectedCategory === category.name 
//                   ? 'border-blue-400 shadow-lg scale-102 bg-white/80' 
//                   : 'border-blue-100 hover:border-blue-300 hover:shadow-lg'}
//                 transform hover:-translate-y-1
//                 ${index === secondRowCategories.length - 1 ? 'md:col-span-1' : ''}
//               `}
//             >
//               <span className="block text-center font-semibold text-gray-900">{category.name}</span>
              
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent 
//                             rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//         </div>
//       </div>



//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           50% { transform: translate(15px, -15px) rotate(8deg); }
//         }
//       `}</style>
//     </div>
//     <ProductCategories />
//     </>
//   );
// };

// export default DirectoryLanding;
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import ProductCategories from './_components/ProductsPart';

// Modified categories to use simple strings
const categories = [
  "Client Relationship Management",
  "Contract Lifecycle Management",
  "E-Signature",
  "Document Management System",
  "E-billing and Invoicing",
  "E-discovery",
  "Governance,Risk and Compliance",
  "Intellectual Property Management",
  "Legal Research",
  "Legal Workflow Automation",
  "Litigation Management and Analytics"
];

// First row categories
const firstRowCategories = [
  { id: 1, name: "CONTRACTS", category: "Contract Lifecycle Management" },
  { id: 2, name: "COMPLIANCE", category: "Governance,Risk and Compliance" },
  { id: 3, name: "INTELLECTUAL PROPERTY", category: "Intellectual Property Management" },
  { id: 4, name: "RESEARCH", category: "Legal Research" }
];

// Second row categories
const secondRowCategories = [
  { id: 5, name: "DOCUMENTS", category: "Document Management System"},
  { id: 6, name: "E-SIGNATURE", category: "E-Signature" },
  { id: 7, name: "E-DISCOVERY", category: "E-discovery"},
  { id: 8, name: "BILLING & INVOICING", category: "E-billing and Invoicing" },
  // { id: 9, name: "Litigation/ Client management", category: "Client Relationship Management" }
  { 
    id: 9, 
    name: "Litigation/ Client management", 
    category: ["Client Relationship Management", "Litigation Management and Analytics"] 
  }
];

const userCategories = [
  "Individual Practitioner",
  "Law firms",
  "Government departments",
  "Startups",
  "Enterprises",
  "Judiciary",
  "In-House Counsels"
];

const DirectoryLanding = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUserCategory, setSelectedUserCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    updateFiltersInUrl(selectedCategory, selectedUserCategory, searchQuery);
  };

  const updateFiltersInUrl = (category, userCategory, search) => {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (category) {
      // Don't modify the category string - send as is
      params.append('category', category);
    }
    if (userCategory) {
      params.append('userCategory', userCategory);
    }
    router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleFirstRowCategoryClick = (category) => {
    const newCategory = selectedCategory === category.name ? '' : category.category;
    setSelectedCategory(category.name);
    updateFiltersInUrl(newCategory, selectedUserCategory, searchQuery);
  };

  const handleSecondRowCategoryClick = (category) => {
    const newCategory = selectedCategory === category.name ? '' : category.category;
    setSelectedCategory(category.name);
    updateFiltersInUrl(newCategory, selectedUserCategory, searchQuery);
  };

  const handleUserCategoryClick = (userCategory) => {
    const newUserCategory = selectedUserCategory === userCategory ? '' : userCategory;
    setSelectedUserCategory(newUserCategory);
    updateFiltersInUrl(selectedCategory, newUserCategory, searchQuery);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden pt-24 -pb-24">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-xl backdrop-blur-sm"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white/80 to-white/40 
                         backdrop-blur-md rounded-full border border-blue-100 shadow-lg mb-8">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
                           bg-clip-text text-transparent">
              LEGAL TECH DIRECTORY
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Perfect Legal Technology Solution
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Compare and evaluate the best technology for your legal needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-20">
          <form onSubmit={handleSearch}>
            <div className="flex items-center p-2 bg-white rounded-2xl shadow-lg">
              <input
                type="text"
                placeholder="Search for legal technology solutions..."
                className="w-full px-6 py-4 text-lg border-0 focus:ring-0 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                         transition-colors duration-200 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* User Categories */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">What Describes You The Best?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {userCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleUserCategoryClick(category)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 
                  ${selectedUserCategory === category 
                    ? 'bg-blue-100 text-blue-700 shadow-md scale-105' 
                    : 'bg-white/80 text-gray-600 hover:bg-blue-50'} 
                  backdrop-blur-sm border border-blue-100`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Core Legal Functions */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-12 text-center">Core Legal Functions</h2>
          
          {/* Main container with max width and perfect alignment */}
          <div className="w-full px-4 py-8">
            {/* First Row - 4 items */}
            <div className="w-full md:max-w-[80%] mx-auto mb-6">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-6">
                {firstRowCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleFirstRowCategoryClick(category)}
                    className={`
                      group relative p-4
                      bg-white/70 backdrop-blur-sm rounded-xl
                      border transition-all duration-300
                      ${selectedCategory === category.name 
                        ? 'border-blue-400 shadow-lg scale-102 bg-white/80' 
                        : 'border-blue-100 hover:border-blue-300 hover:shadow-lg'}
                      transform hover:-translate-y-1
                    `}
                  >
                    <span className="block text-center font-semibold text-gray-900">{category.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent 
                                  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Second Row - 5 items */}
            <div className="w-full md:max-w-[95%] mx-auto">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-6">
                {secondRowCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => handleSecondRowCategoryClick(category)}
                    className={`
                      group relative p-4
                      bg-white/70 backdrop-blur-sm rounded-xl
                      border transition-all duration-300
                      ${selectedCategory === category.name 
                        ? 'border-blue-400 shadow-lg scale-102 bg-white/80' 
                        : 'border-blue-100 hover:border-blue-300 hover:shadow-lg'}
                      transform hover:-translate-y-1
                      ${index === secondRowCategories.length - 1 ? 'md:col-span-1' : ''}
                    `}
                  >
                    <span className="block text-center font-semibold text-gray-900">{category.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent 
                                  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(8deg); }
        }
      `}</style>
    </div>
    <ProductCategories />
    </>
  );
};

export default DirectoryLanding;
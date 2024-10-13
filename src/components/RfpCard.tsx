// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// const RfpCard = ({ userId }) => {
//   const [rfpData, setRfpData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentRfpIndex, setCurrentRfpIndex] = useState(0);
//   const [expandedVendors, setExpandedVendors] = useState({});

//   useEffect(() => {
//     fetchRFPData();
//   }, [userId]);

//   const fetchRFPData = async () => {
//     try {
//       const response = await fetch('/api/get-rfp-data-by-user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         setRfpData(result.data);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError('Failed to fetch RFP data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleVendorDetails = (vendorIndex) => {
//     setExpandedVendors(prev => ({
//       ...prev,
//       [vendorIndex]: !prev[vendorIndex]
//     }));
//   };

//   const nextRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex + 1) % rfpData.length);
//   };

//   const prevRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex - 1 + rfpData.length) % rfpData.length);
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (rfpData.length === 0) return <div className="text-center py-10">No RFP data available.</div>;

//   const currentRfp = rfpData[currentRfpIndex];

//   return (
//     <div className="container mx-auto p-4 max-w-7xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">RFP Dashboard</h1>
//       <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-2xl p-8">
//         <div className="flex justify-between items-center mb-6">
//           <button onClick={prevRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
//             <ChevronLeft size={24} />
//           </button>
//           <h2 className="text-2xl font-semibold">RFP #{currentRfpIndex + 1}</h2>
//           <button onClick={nextRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
//             <ChevronRight size={24} />
//           </button>
//         </div>
        
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Basic Info Book */}
//           <div className="bg-white rounded-lg shadow-lg p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
//             <h3 className="text-xl font-semibold mb-4 text-indigo-600">Basic Details</h3>
//             <div className="space-y-2">
//               {Object.entries(currentRfp.basicDetails).map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center border-b border-gray-200 py-2">
//                   <span className="font-medium text-gray-600">{key}:</span>
//                   <span className="text-gray-800">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Vendor Responses */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold mb-4 text-indigo-600">Vendor Responses</h3>
//             {currentRfp.vendorResponses.map((vendor, vendorIndex) => (
//               <div key={vendorIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleVendorDetails(vendorIndex)}>
//                   <span className="font-medium">{vendor.vendorName}</span>
//                   <div className="flex items-center">
//                     <span className="mr-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">{vendor.score}</span>
//                     {expandedVendors[vendorIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                   </div>
//                 </div>
//                 {expandedVendors[vendorIndex] && (
//                   <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
//                     <p className="mb-2"><span className="font-medium">Urgency Response:</span> {vendor.urgencyResponse}</p>
//                     <p className="mb-2"><span className="font-medium">Budget Response:</span> {vendor.budgetResponse}</p>
//                     <h4 className="font-medium mt-4 mb-2">Feature Responses:</h4>
//                     <div className="grid grid-cols-2 gap-2">
//                       {vendor.featureResponses.map((feature, featureIndex) => (
//                         <div key={featureIndex} className="bg-white rounded-md p-2 shadow">
//                           <p className="font-medium">{feature.feature}:</p>
//                           <p className="text-indigo-600">{feature.response}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpCard;
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// const RfpCard = ({ userId }) => {
//   const [rfpData, setRfpData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentRfpIndex, setCurrentRfpIndex] = useState(0);
//   const [expandedVendors, setExpandedVendors] = useState({});

//   useEffect(() => {
//     fetchRFPData();
//   }, [userId]);

//   const fetchRFPData = async () => {
//     try {
//       const response = await fetch('/api/get-rfp-data-by-user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         setRfpData(result.data);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError('Failed to fetch RFP data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleVendorDetails = (vendorIndex) => {
//     setExpandedVendors(prev => ({
//       ...prev,
//       [vendorIndex]: !prev[vendorIndex]
//     }));
//   };

//   const nextRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex + 1) % rfpData.length);
//   };

//   const prevRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex - 1 + rfpData.length) % rfpData.length);
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (rfpData.length === 0) return <div className="text-center py-10">No RFP data available.</div>;

//   const currentRfp = rfpData[currentRfpIndex];

//   return (
//     <div className="container mx-auto p-4 max-w-7xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">RFP Dashboard</h1>
//       <div className="relative bg-white rounded-xl shadow-2xl p-8">
//         <div className="flex justify-between items-center mb-6">
//           <button onClick={prevRfp} className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200">
//             <ChevronLeft size={24} />
//           </button>
//           <h2 className="text-2xl font-semibold">RFP #{currentRfpIndex + 1}</h2>
//           <button onClick={nextRfp} className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200">
//             <ChevronRight size={24} />
//           </button>
//         </div>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Basic Info */}
//           <div className="col-span-1">
//             <h3 className="text-xl font-semibold mb-4 text-indigo-600">Basic Details</h3>
//             <div className="space-y-2">
//               {Object.entries(currentRfp.basicDetails).map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center border-b border-gray-200 py-2">
//                   <span className="font-medium text-gray-600">{key}:</span>
//                   <span className="text-gray-800">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Vendor Responses */}
//           <div className="col-span-2 space-y-4">
//             <h3 className="text-xl font-semibold mb-4 text-indigo-600">Vendor Responses</h3>
//             {currentRfp.vendorResponses.map((vendor, vendorIndex) => (
//               <div key={vendorIndex} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-l-lg shadow-md overflow-hidden">
//                 <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleVendorDetails(vendorIndex)}>
//                   <span className="font-medium">{vendor.vendorName}</span>
//                   <div className="flex items-center">
//                     <span className="mr-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">{vendor.score}</span>
//                     {expandedVendors[vendorIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                   </div>
//                 </div>
//                 {expandedVendors[vendorIndex] && (
//                   <div className="p-4">
//                     <p className="mb-2"><span className="font-medium">Urgency Response:</span> {vendor.urgencyResponse}</p>
//                     <p className="mb-2"><span className="font-medium">Budget Response:</span> {vendor.budgetResponse}</p>
//                     <h4 className="font-medium mt-4 mb-2">Feature Responses:</h4>
//                     <div className="grid grid-cols-2 gap-2">
//                       {vendor.featureResponses.map((feature, featureIndex) => (
//                         <div key={featureIndex} className="bg-white rounded-md p-2 shadow">
//                           <p className="font-medium">{feature.feature}:</p>
//                           <p className="text-indigo-600">{feature.response}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpCard;

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// const RfpCard = ({ userId }) => {
//   const [rfpData, setRfpData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentRfpIndex, setCurrentRfpIndex] = useState(0);
//   const [expandedVendors, setExpandedVendors] = useState({});

//   useEffect(() => {
//     fetchRFPData();
//   }, [userId]);

//   const fetchRFPData = async () => {
//     try {
//       const response = await fetch('/api/get-rfp-data-by-user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         setRfpData(result.data);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError('Failed to fetch RFP data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleVendorDetails = (vendorIndex) => {
//     setExpandedVendors(prev => ({
//       ...prev,
//       [vendorIndex]: !prev[vendorIndex]
//     }));
//   };

//   const nextRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex + 1) % rfpData.length);
//   };

//   const prevRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex - 1 + rfpData.length) % rfpData.length);
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (rfpData.length === 0) return <div className="text-center py-10">No RFP data available.</div>;

//   const currentRfp = rfpData[currentRfpIndex];

//   return (
//     <div className="container mx-auto p-4 max-w-7xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">RFP Dashboard</h1>
//       <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-2xl p-8">
//         <div className="flex justify-between items-center mb-6">
//           <button onClick={prevRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
//             <ChevronLeft size={24} />
//           </button>
//           <h2 className="text-2xl font-semibold">RFP #{currentRfpIndex + 1}</h2>
//           <button onClick={nextRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
//             <ChevronRight size={24} />
//           </button>
//         </div>
        
//         <div className="flex">
//           {/* Basic Info */}
//           <div className="w-1/3 pr-8">
//             <h3 className="text-xl font-semibold mb-4 text-indigo-600">Basic Details</h3>
//             <div className="space-y-2">
//               {Object.entries(currentRfp.basicDetails).map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center border-b border-gray-200 py-2">
//                   <span className="font-medium text-gray-600">{key}:</span>
//                   <span className="text-gray-800">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Curved Partition */}
//           <div className="w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-4 relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100" style={{
//               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 50% 50%)',
//               width: '20px',
//               left: '-10px'
//             }}></div>
//           </div>

//           {/* Vendor Responses */}
//           <div className="w-2/3 space-y-4">
//             <h3 className="text-xl font-semibold mb-4 text-indigo-600">Vendor Responses</h3>
//             {currentRfp.vendorResponses.map((vendor, vendorIndex) => (
//               <div key={vendorIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleVendorDetails(vendorIndex)}>
//                   <span className="font-medium">{vendor.vendorName}</span>
//                   <div className="flex items-center">
//                     <span className="mr-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">{vendor.score}</span>
//                     {expandedVendors[vendorIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                   </div>
//                 </div>
//                 {expandedVendors[vendorIndex] && (
//                   <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
//                     <p className="mb-2"><span className="font-medium">Urgency Response:</span> {vendor.urgencyResponse}</p>
//                     <p className="mb-2"><span className="font-medium">Budget Response:</span> {vendor.budgetResponse}</p>
//                     <h4 className="font-medium mt-4 mb-2">Feature Responses:</h4>
//                     <div className="grid grid-cols-2 gap-2">
//                       {vendor.featureResponses.map((feature, featureIndex) => (
//                         <div key={featureIndex} className="bg-white rounded-md p-2 shadow">
//                           <p className="font-medium">{feature.feature}:</p>
//                           <p className="text-indigo-600">{feature.response}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpCard;


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// const RfpCard = ({ userId }) => {
//   const [rfpData, setRfpData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentRfpIndex, setCurrentRfpIndex] = useState(0);
//   const [expandedVendors, setExpandedVendors] = useState({});

//   useEffect(() => {
//     fetchRFPData();
//   }, [userId]);

//   const fetchRFPData = async () => {
//         try {
//           const response = await fetch('/api/get-rfp-data-by-user', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userId }),
//           });
//           const result = await response.json();
//           if (result.success) {
//             setRfpData(result.data);
//           } else {
//             setError(result.message);
//           }
//         } catch (err) {
//           setError('Failed to fetch RFP data');
//         } finally {
//           setLoading(false);
//         }
//       };

//   const toggleVendorDetails = (vendorIndex) => {
//     setExpandedVendors(prev => ({
//       ...prev,
//       [vendorIndex]: !prev[vendorIndex]
//     }));
//   };

//   const nextRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex + 1) % rfpData.length);
//   };

//   const prevRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex - 1 + rfpData.length) % rfpData.length);
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (rfpData.length === 0) return <div className="text-center py-10">No RFP data available.</div>;

//   const currentRfp = rfpData[currentRfpIndex];

//   return (
//     <div className="container mx-auto p-4 max-w-7xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">RFP Dashboard</h1>
//       <div className="relative bg-gradient-to-r from-blue-100 to-purple-100  rounded-xl shadow-2xl overflow-hidden">
//         <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 ">
//           <button onClick={prevRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
//             <ChevronLeft size={24} />
//           </button>
//           <h2 className="text-2xl font-semibold">RFP #{currentRfpIndex + 1}</h2>
//           <button onClick={nextRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
//             <ChevronRight size={24} />
//           </button>
//         </div>
        
//         <div className="flex">
//           {/* Basic Info */}
//           <div className="w-2/5  p-6">
//             <h3 className="text-xl font-semibold mb-4 text-blue-800">Basic Details</h3>
//             <div className="space-y-3">
//               {Object.entries(currentRfp.basicDetails).map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center border-b border-blue-200 py-2">
//                   <span className="font-medium text-blue-700">{key}:</span>
//                   <span className="text-blue-900">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Vendor Responses */}
//           <div className="w-3/5 bg-purple-100 p-6 rounded-l-3xl">
//             <h3 className="text-xl font-semibold mb-4 text-purple-800">Vendor Responses</h3>
//             <div className="space-y-4">
//               {currentRfp.vendorResponses.map((vendor, vendorIndex) => (
//                 <div key={vendorIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleVendorDetails(vendorIndex)}>
//                     <span className="font-medium text-purple-700">{vendor.vendorName}</span>
//                     <div className="flex items-center">
//                       <span className="mr-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">{vendor.score}</span>
//                       {expandedVendors[vendorIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                     </div>
//                   </div>
//                   {expandedVendors[vendorIndex] && (
//                     <div className="p-4 bg-purple-50">
//                       <p className="mb-2"><span className="font-medium text-purple-700">Urgency Response:</span> {vendor.urgencyResponse}</p>
//                       <p className="mb-2"><span className="font-medium text-purple-700">Budget Response:</span> {vendor.budgetResponse}</p>
//                       <h4 className="font-medium mt-4 mb-2 text-purple-800">Feature Responses:</h4>
//                       <div className="grid grid-cols-2 gap-2">
//                         {vendor.featureResponses.map((feature, featureIndex) => (
//                           <div key={featureIndex} className="bg-white rounded-md p-2 shadow">
//                             <p className="font-medium text-purple-700">{feature.feature}:</p>
//                             <p className="text-purple-900">{feature.response}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpCard;

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// const RfpCard = ({ userId }) => {
//   const [rfpData, setRfpData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentRfpIndex, setCurrentRfpIndex] = useState(0);
//   const [expandedVendors, setExpandedVendors] = useState({});

//   useEffect(() => {
//     fetchRFPData();
//   }, [userId]);

//   const fetchRFPData = async () => {
//             try {
//               const response = await fetch('/api/get-rfp-data-by-user', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId }),
//               });
//               const result = await response.json();
//               if (result.success) {
//                 setRfpData(result.data);
//               } else {
//                 setError(result.message);
//               }
//             } catch (err) {
//               setError('Failed to fetch RFP data');
//             } finally {
//               setLoading(false);
//             }
//           };

//   const toggleVendorDetails = (vendorIndex) => {
//     setExpandedVendors(prev => ({
//       ...prev,
//       [vendorIndex]: !prev[vendorIndex]
//     }));
//   };

//   const nextRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex + 1) % rfpData.length);
//   };

//   const prevRfp = () => {
//     setCurrentRfpIndex((prevIndex) => (prevIndex - 1 + rfpData.length) % rfpData.length);
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (rfpData.length === 0) return <div className="text-center py-10">No RFP data available.</div>;

//   const currentRfp = rfpData[currentRfpIndex];

//   return (
//     <div className="container mx-auto p-4 max-w-7xl">
//       {/* <h1 className="text-3xl font-bold mb-6 text-center">RFP Dashboard</h1> */}
//       <div className="relative bg-purple-100 rounded-xl shadow-2xl overflow-hidden">
//         <div className="flex justify-between items-center p-4 bg-purple-100">
//           <button onClick={prevRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
//             <ChevronLeft size={24} />
//           </button>
//           <h2 className="text-2xl font-semibold">RFP #{currentRfpIndex + 1}</h2>
//           <button onClick={nextRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
//             <ChevronRight size={24} />
//           </button>
//         </div>
        
//         <div className="flex flex-col md:flex-row">
//           {/* Basic Info */}
//           <div className="w-full md:w-2/5 p-6">
//             <h3 className="text-xl font-semibold mb-4 text-blue-800">Basic Details</h3>
//             <div className="space-y-3">
//               {Object.entries(currentRfp.basicDetails).map(([key, value]) => (
//                 <div key={key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-blue-200 py-2">
//                   <span className="font-medium text-blue-700 mb-1 sm:mb-0">{key}:</span>
//                   <span className="text-blue-900 break-words max-w-full sm:max-w-[60%] text-right">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Vendor Responses */}
//           <div className="w-full md:w-3/5 bg-purple-100 p-6 md:rounded-l-3xl">
//             <h3 className="text-xl font-semibold mb-4 text-purple-800">Vendor Responses</h3>
//             <div className="space-y-4">
//               {currentRfp.vendorResponses.map((vendor, vendorIndex) => (
//                 <div key={vendorIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div 
//                     className="flex justify-between items-center p-4 cursor-pointer hover:bg-purple-50 transition-colors duration-200" 
//                     onClick={() => toggleVendorDetails(vendorIndex)}
//                   >
//                     <span className="font-medium text-purple-700">{vendor.vendorName}</span>
//                     <div className="flex items-center">
//                       <span className="mr-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">{vendor.score}</span>
//                       {expandedVendors[vendorIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                     </div>
//                   </div>
//                   {expandedVendors[vendorIndex] && (
//                     <div className="p-4 bg-purple-50">
//                       <p className="mb-2"><span className="font-medium text-purple-700">Urgency Response:</span> {vendor.urgencyResponse}</p>
//                       <p className="mb-2"><span className="font-medium text-purple-700">Budget Response:</span> {vendor.budgetResponse}</p>
//                       <h4 className="font-medium mt-4 mb-2 text-purple-800">Feature Responses:</h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         {vendor.featureResponses.map((feature, featureIndex) => (
//                           <div key={featureIndex} className="bg-white rounded-md p-2 shadow">
//                             <p className="font-medium text-purple-700">{feature.feature}:</p>
//                             <p className="text-purple-900 mt-1">{feature.response}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpCard;
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const RfpCard = ({ userId }) => {
  const [rfpData, setRfpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRfpIndex, setCurrentRfpIndex] = useState(0);
  const [expandedVendors, setExpandedVendors] = useState({});

  useEffect(() => {
    fetchRFPData();
  }, [userId]);

  const fetchRFPData = async () => {
    try {
      const response = await fetch('/api/get-rfp-data-by-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const result = await response.json();
      if (result.success) {
        setRfpData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch RFP data');
    } finally {
      setLoading(false);
    }
  };

  const toggleVendorDetails = (vendorIndex) => {
    setExpandedVendors(prev => ({
      ...prev,
      [vendorIndex]: !prev[vendorIndex]
    }));
  };

  const nextRfp = () => {
    setCurrentRfpIndex((prevIndex) => (prevIndex + 1) % rfpData.length);
  };

  const prevRfp = () => {
    setCurrentRfpIndex((prevIndex) => (prevIndex - 1 + rfpData.length) % rfpData.length);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return (
    <div className="flex justify-center items-center py-10">
      <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <svg className="fill-current w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-10a1.5 1.5 0 00-1.5 1.5v4a1.5 1.5 0 003 0v-4A1.5 1.5 0 0010 5z"/>
        </svg>
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );
  if (rfpData.length === 0) return <div className="text-center py-10">No RFP data available.</div>;

  const currentRfp = rfpData[currentRfpIndex];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="relative bg-purple-100 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-purple-100">
          <button onClick={prevRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
            <ChevronLeft size={24} />
          </button>
          {/* <h2 className="text-2xl font-semibold">RFP #{currentRfpIndex + 1}</h2> */}
          <button onClick={nextRfp} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Basic Info */}
          <div className="w-full md:w-2/5 p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Basic Details</h3>
            <div className="space-y-3">
              {Object.entries(currentRfp.basicDetails).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-blue-200 py-2">
                  <span className="font-medium text-blue-700 mb-1 sm:mb-0">{key}:</span>
                  <span className="text-blue-900 break-words max-w-full sm:max-w-[60%] text-right">
                    {value || 'Not specified'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Responses */}
          <div className="w-full md:w-3/5 bg-purple-100 p-6 md:rounded-l-3xl">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">Vendor Responses</h3>
            {currentRfp.vendorResponses && currentRfp.vendorResponses.length > 0 ? (
              <div className="space-y-4">
                {currentRfp.vendorResponses.map((vendor, vendorIndex) => (
                  <div key={vendorIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-purple-50 transition-colors duration-200" 
                      onClick={() => toggleVendorDetails(vendorIndex)}
                    >
                      <span className="font-medium text-purple-700">{vendor.vendorName}</span>
                      <div className="flex items-center">
                        <span className="mr-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">{vendor.score}</span>
                        {expandedVendors[vendorIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    {expandedVendors[vendorIndex] && (
                      <div className="p-4 bg-purple-50">
                        <p className="mb-2">
                          <span className="font-medium text-purple-700">Urgency Response:</span> {vendor.urgencyResponse || 'No response'}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium text-purple-700">Budget Response:</span> {vendor.budgetResponse || 'No response'}
                        </p>
                        <h4 className="font-medium mt-4 mb-2 text-purple-800">Feature Responses:</h4>
                        {vendor.featureResponses && vendor.featureResponses.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {vendor.featureResponses.map((feature, featureIndex) => (
                              <div key={featureIndex} className="bg-white rounded-md p-2 shadow">
                                <p className="font-medium text-purple-700">{feature.feature}:</p>
                                <p className="text-purple-900 mt-1">{feature.response || 'No response'}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-purple-700">No feature responses available.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-purple-700">No vendor responses available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfpCard;
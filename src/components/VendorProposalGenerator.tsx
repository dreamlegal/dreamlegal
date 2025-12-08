// "use client"

// import React, { useState, useEffect } from 'react';
// import { 
//   Search, 
//   Building2, 
//   Users, 
//   Briefcase,
//   FileText,
//   Package,
//   ArrowRight,
//   CheckCircle2,
//   Sparkles,
//   Target,
//   Star
// } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { useNewAuth } from '@/context/NewAuthContext';;
// const VendorProposalGenerator = () => {
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [proposalResponse, setProposalResponse] = useState(null);
//    const { vendorId, userType } = useNewAuth()
  
//   // Client Profile State
//   const [clientSector, setClientSector] = useState('');
//   const [clientTeamSize, setClientTeamSize] = useState('');
//   const [clientCategory, setClientCategory] = useState('');

//   const categories = [
//     "Client Relationship Management",
//     "Governance, Risk and Compliance",
//     "Contract Lifecycle Management",
//     "E-Signature",
//     "Document Management System",
//     "E-billing and Invoicing",
//     "E-discovery",
//     "Intellectual Property Management",
//     "Litigation Management and Analytics",
//     "Legal Workflow Automation",
//     "Legal Research",
//   ];

//   const teamSizes = [
//     "1",
//     "2-20",
//     "21-50",
//     "51- 200",
//     "201-500",
//     "500+",
//   ];

//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   const [credits, setCredits] = useState(null);
  
//     // Fetch credits on component mount
//     useEffect(() => {
//       fetchCredits();
//     }, [vendorId]);
  
//     const fetchCredits = async () => {
//       try {
//         const response = await fetch('/api/get-vendor-credits', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ vendorId })
//         });
//         const data = await response.json();
//         setCredits(data);
//       } catch (error) {
//         console.error('Error fetching credits:', error);
//       }
//     };
  

//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
//       // const vendorId = localStorage.getItem("vendorId");
//       const response = await fetch('/api/get-all-product-by-vendor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: vendorId
//         }),
//       });
//       const data = await response.json();
//       const productArray = Array.isArray(data) ? data : data.data || [];
//       setProducts(productArray);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   };

  
  
// // Proposal Generation Handler
// const handleGenerateProposal = async () => {
//   if (!selectedProduct || !clientSector || !clientTeamSize || !clientCategory) return;
//   if (!credits?.proposalCredits) {
//     alert('You have no proposal credits remaining');
//     return;
//   }
  
//   setLoading(true);
//   try {
//     const response = await fetch('/api/create-custom-proposal', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         product_profile: selectedProduct,
//         client_profile: {
//           Sector: clientSector,
//           "Team Size": parseInt(clientTeamSize),
//           Category: clientCategory
//         },
//         vendorId
//       }),
//     });
    
//     const data = await response.json();
    
//     if (response.ok) {
//       setProposalResponse(data.proposal);
//       // Update credits immediately
//       setCredits(prev => ({
//         ...prev,
//         proposalCredits: data.remainingCredits
//       }));
//     } else {
//       alert(data.error);
//       // Update credits even on error to stay in sync
//       if (data.remainingCredits !== undefined) {
//         setCredits(prev => ({
//           ...prev,
//           proposalCredits: data.remainingCredits
//         }));
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred during proposal generation');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="pt-12 pb-8 text-center space-y-6">
//           <div className="flex items-center justify-center space-x-3 mb-2">
//             <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
//               <Package className="w-6 h-6" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Proposal Generator
//             </h1>
//           </div>
//           <p className="text-gray-600 text-lg max-w-xl mx-auto">
//             Generate tailored proposals by selecting your product and client details
//           </p>
//           <div className="mb-4">
//         <p className="text-sm font-medium">
//           Remaining Proposal Credits: {credits?.proposalCredits ?? 'Loading...'}
//         </p>
//       </div>
//         </div>

//         {/* Main Input Section */}
//         <div className="relative z-10">
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
//           <Card className="relative bg-white shadow-2xl rounded-2xl overflow-hidden">
//             <CardContent className="p-8 space-y-8">
//               {/* Product Selection */}
//               <div className="space-y-4">
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <div className="max-h-48 overflow-y-auto pr-4">
//                       {productsLoading ? (
//                         <div className="flex items-center justify-center p-8">
//                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
//                           <span className="ml-3 text-gray-600">Loading products...</span>
//                         </div>
//                       ) : products.length === 0 ? (
//                         <div className="text-center p-8 text-gray-500">
//                           No products found. Please try again later.
//                         </div>
//                       ) : (
//                         <div className="space-y-3">
//                           {products.map((product) => (
//                             <button
//                               key={product.id}
//                               onClick={() => setSelectedProduct(product)}
//                               className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
//                                 selectedProduct?.id === product.id
//                                   ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500'
//                                   : 'bg-white border border-gray-100 hover:border-indigo-200'
//                               }`}
//                             >
//                               <img 
//                                 src={product.logoUrl} 
//                                 alt={product.name}
//                                 className="w-12 h-12 rounded-lg object-cover"
//                               />
//                               <div className="flex-1 text-left">
//                                 <h3 className="font-medium text-gray-900">{product.name}</h3>
//                                 <p className="text-sm text-gray-500">{product.category.join(', ')}</p>
//                               </div>
//                               <CheckCircle2 
//                                 className={`w-6 h-6 ${
//                                   selectedProduct?.id === product.id
//                                     ? 'text-indigo-500'
//                                     : 'text-gray-200'
//                                 }`}
//                               />
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Client Details */}
//               <div className="space-y-6">
//                 {/* Sector Input */}
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <input
//                       type="text"
//                       value={clientSector}
//                       onChange={(e) => setClientSector(e.target.value)}
//                       placeholder="Enter client sector / practice area..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Team Size Selection */}
//                 <div className="space-y-4">
//                   <h3 className="text-center text-lg text-gray-600 font-medium">Select Team Size</h3>
//                   <div className="flex flex-wrap justify-center gap-3">
//                     {teamSizes.map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setClientTeamSize(size)}
//                         className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
//                           clientTeamSize === size
//                             ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
//                             : 'bg-white text-gray-600 shadow-md hover:shadow-lg border border-gray-100'
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Category Selection */}
//                 <div className="space-y-4">
//                   <h3 className="text-center text-lg text-gray-600 font-medium">Select Category</h3>
//                   <div className="flex flex-wrap justify-center gap-3">
//                     {categories.map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => setClientCategory(category)}
//                         className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
//                           clientCategory === category
//                             ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
//                             : 'bg-white text-gray-600 shadow-md hover:shadow-lg border border-gray-100'
//                         }`}
//                       >
//                         {category}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Generate Button */}
//               <button
//                 onClick={handleGenerateProposal}
//                 disabled={!selectedProduct || !clientSector || !clientTeamSize || !clientCategory || loading}
//                 className={`w-full py-4 px-6 rounded-xl font-medium text-lg shadow-lg transform transition-all duration-300 ${
//                   selectedProduct && clientSector && clientTeamSize && clientCategory
//                     ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:-translate-y-0.5'
//                     : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                     Generating Proposal...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center">
//                     <FileText className="w-6 h-6 mr-3" />
//                     Generate Proposal
//                   </span>
//                 )}
//               </button>
//             </CardContent>
//           </Card>
//         </div>



// {(loading || proposalResponse) && (
//   <div className="mt-8 transform transition-all duration-500">
//     <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//       <CardContent className="p-8">
//         {loading ? (
//           <div className="min-h-[400px] flex flex-col items-center justify-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
//             <p className="mt-6 text-lg text-gray-600">Analyzing your feature...</p>
//             <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
//           </div>
//         ) : (
//           <ProposalDisplay proposalResponse={proposalResponse} />
//         )}
//       </CardContent>
//     </Card>
//   </div>
// )}
//       </div>
//     </div>
//   );
// };

// export default VendorProposalGenerator;


// const ProposalDisplay = ({ proposalResponse }) => {
//   if (!proposalResponse?.response?.Proposal) return null;

//   const proposal = proposalResponse.response.Proposal;
//   const analysis = proposalResponse.response["Analysis of Customer Preferences"];

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8">
//       {/* Enhanced Title Section */}
//       <div className="text-center space-y-6 py-8">
//         <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//           {proposal.Title || 'Generated Proposal'}
//         </h2>
       
//       </div>

//       {/* Problems Addressed with Enhanced Visual Appeal */}
//       {proposal["Problems Addressed"] && (
//         <Card className="overflow-hidden transform hover:scale-[1.01] transition-transform duration-200">
//           <CardContent className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="p-3 rounded-xl bg-white shadow-md">
//                 <Target className="w-6 h-6 text-indigo-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Problems Addressed</h3>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {proposal["Problems Addressed"].map((problem, index) => (
//                 <div 
//                   key={index} 
//                   className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//                   <span className="text-gray-700 leading-relaxed">{problem}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Enhanced Top Features */}
//       {proposal["Top Features"] && (
//         <Card className="transform hover:scale-[1.01] transition-transform duration-200">
//           <CardContent className="p-8">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-md">
//                 <Sparkles className="w-6 h-6 text-purple-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Key Features</h3>
//             </div>
//             <div className="grid gap-8">
//               {proposal["Top Features"].map((feature, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <div className="flex items-start gap-6">
//                     <div className="p-3 rounded-xl bg-white shadow-md">
//                       <CheckCircle2 className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <div className="space-y-3">
//                       <h4 className="text-xl font-semibold text-purple-800">{feature.Feature}</h4>
//                       {Array.isArray(feature.Details) ? (
//                         <p className="text-gray-700 leading-relaxed">{feature.Details[0]}</p>
//                       ) : (
//                         <p className="text-gray-700 leading-relaxed">{feature.Details}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Enhanced Top Functionalities */}
//       {proposal["Top Functionalities"] && (
//         <Card className="transform hover:scale-[1.01] transition-transform duration-200">
//           <CardContent className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="p-3 rounded-xl bg-white shadow-md">
//                 <ArrowRight className="w-6 h-6 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Top Functionalities</h3>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {proposal["Top Functionalities"].map((functionality, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4"
//                 >
//                   <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
//                   <span className="text-gray-700 leading-relaxed">{functionality}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Enhanced Best Version & Company Description */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {proposal["Best Version of Product"] && (
//           <Card className="transform hover:scale-[1.01] transition-transform duration-200">
//             <CardContent className="p-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 rounded-xl bg-white shadow-md">
//                   <Star className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800">Best Version</h3>
//               </div>
//               <p className="text-gray-700 leading-relaxed">
//                 {proposal["Best Version of Product"]}
//               </p>
//             </CardContent>
//           </Card>
//         )}

//         {proposal["Company Description"] && (
//           <Card className="transform hover:scale-[1.01] transition-transform duration-200">
//             <CardContent className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 rounded-xl bg-white shadow-md">
//                   <Building2 className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800">Company Overview</h3>
//               </div>
//               <p className="text-gray-700 leading-relaxed">
//                 {proposal["Company Description"]}
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* Enhanced How Product Can Help */}
//       {proposal["How the Product Can Help"] && (
//         <Card className="transform hover:scale-[1.01] transition-transform duration-200">
//           <CardContent className="p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-3 rounded-xl bg-white shadow-md">
//                 <FileText className="w-6 h-6 text-indigo-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">How This Product Helps</h3>
//             </div>
//             <p className="text-gray-700 leading-relaxed">
//               {proposal["How the Product Can Help"]}
//             </p>
//           </CardContent>
//         </Card>
//       )}

//       {/* Enhanced Customer Analysis */}
//       {analysis && (
//         <Card className="transform hover:scale-[1.01] transition-transform duration-200">
//           <CardContent className="p-8">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-md">
//                 <Users className="w-6 h-6 text-indigo-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Customer Analysis</h3>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {Object.entries(analysis).map(([key, value], index) => (
//                 <div 
//                   key={key} 
//                   className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <h4 className="text-lg font-semibold text-indigo-700 mb-4">{key}</h4>
//                   <p className="text-gray-700 leading-relaxed">
//                     {Array.isArray(value) ? value[0] : value}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Building2, 
  Users, 
  Briefcase,
  FileText,
  Package,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNewAuth } from '@/context/NewAuthContext';;

const VendorProposalGenerator = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { vendorId } = useNewAuth();
  // const vendorId ="cm164le6u0000vaf5r6hehl1f";
  const [credits, setCredits] = useState(null);

  // Client Information States
  const [clientSector, setClientSector] = useState('');
  const [clientTeamSize, setClientTeamSize] = useState('');
  const [clientCategory, setClientCategory] = useState('');
  const [clientProblems, setClientProblems] = useState('');
  const [clientRequirements, setClientRequirements] = useState('');

  // ROI States
  const [roiTime, setRoiTime] = useState('');
  const [roiCost, setRoiCost] = useState('');
  const [roiKpi, setRoiKpi] = useState('');

  // Testimonial State
  const [testimonial, setTestimonial] = useState({
    name: '',
    designation: '',
    organization: '',
    message: ''
  });

  // Company Description State
  const [companyDescription, setCompanyDescription] = useState('');

  const categories = [
    "Client Relationship Management",
    "Governance, Risk and Compliance",
    "Contract Lifecycle Management",
    "E-Signature",
    "Document Management System",
    "E-billing and Invoicing",
    "E-discovery",
    "Intellectual Property Management",
    "Litigation Management and Analytics",
    "Legal Workflow Automation",
    "Legal Research",
  ];

  const teamSizes = ["1", "2-20", "21-50", "51-200", "201-500", "500+"];

  useEffect(() => {
    fetchProducts();
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/get-vendor-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId })
      });
      const data = await response.json();
      setCredits(data);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await fetch('/api/get-all-product-by-vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: vendorId }),
      });
      const data = await response.json();
      const productArray = Array.isArray(data) ? data : data.data || [];
      setProducts(productArray);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  
  const handleGenerateProposal = async () => {
    if (!selectedProduct || !clientSector || !clientTeamSize || !clientCategory) return;
    if (!credits?.proposalCredits) {
      alert('You have no proposal credits remaining');
      return;
    }
    
    const formData = {
      product_profile: selectedProduct,
      client_profile: {
        Sector: clientSector,
        "Team Size": clientTeamSize,
        Category: clientCategory,
        Problems: clientProblems,
        "Particular Requirements": clientRequirements
      },
      vendor_information: {
        ROI: {
          Time: roiTime,
          Cost: roiCost,
          KPI: roiKpi
        },
        Testimonial: {
          Name: testimonial.name,
          Designation: testimonial.designation,
          Organisation: testimonial.organization,
          Message: testimonial.message
        },
        AboutCompany: companyDescription
      }
    };
    
    setLoading(true);
    try {
      // First save the form data
      const formResponse = await fetch('/api/save-proposal-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId,
          formData
        }),
      });
  
      const { id } = await formResponse.json();
      // const sdc=await formResponse.json();
      const proposalId = id;
      console.log(`Proposal ID: ${proposalId}`);
    
  
      // Then generate the AI proposal with the same form data
      const generateResponse = await fetch('/api/create-custom-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          proposalId,
          vendorId,
          formData 
        }),
      });
  
      const data = await generateResponse.json();
      
      if (generateResponse.ok) {
        window.open(`/proposals/${proposalId}`, '_blank');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during proposal generation');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="pt-12 pb-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Proposal Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Generate tailored proposals by selecting your product and client details
          </p>
          <div className="mb-4">
            <p className="text-sm font-medium">
              Remaining Proposal Credits: {credits?.proposalCredits ?? 'Loading...'}
            </p>
          </div>
        </div>

        {/* Main Input Section */}
        <div className="relative z-10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
          <Card className="relative bg-white shadow-2xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 space-y-8">
              {/* Product Selection */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <div className="max-h-48 overflow-y-auto pr-4">
                      {productsLoading ? (
                        <div className="flex items-center justify-center p-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                          <span className="ml-3 text-gray-600">Loading products...</span>
                        </div>
                      ) : products.length === 0 ? (
                        <div className="text-center p-8 text-gray-500">
                          No products found. Please try again later.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {products.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => setSelectedProduct(product)}
                              className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                                selectedProduct?.id === product.id
                                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500'
                                  : 'bg-white border border-gray-100 hover:border-indigo-200'
                              }`}
                            >
                              <img 
                                src={product.logoUrl} 
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1 text-left">
                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.category.join(', ')}</p>
                              </div>
                              <CheckCircle2 
                                className={`w-6 h-6 ${
                                  selectedProduct?.id === product.id
                                    ? 'text-indigo-500'
                                    : 'text-gray-200'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Details */}
              <div className="space-y-6">
                {/* Sector Input */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <input
                      type="text"
                      value={clientSector}
                      onChange={(e) => setClientSector(e.target.value)}
                      placeholder="Enter client sector / practice area..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Team Size Selection */}
                <div className="space-y-4">
                  <h3 className="text-center text-lg text-gray-600 font-medium">Select Team Size</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {teamSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setClientTeamSize(size)}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          clientTeamSize === size
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 shadow-md hover:shadow-lg border border-gray-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-4">
                  <h3 className="text-center text-lg text-gray-600 font-medium">Select Category</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setClientCategory(category)}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          clientCategory === category
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 shadow-md hover:shadow-lg border border-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Problems */}
              <div className="space-y-4">
                <h3 className="text-center text-lg text-gray-600 font-medium">Client's Problems</h3>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={clientProblems}
                      onChange={(e) => setClientProblems(e.target.value)}
                      placeholder="Describe the client's problems..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400 min-h-32"
                    />
                  </div>
                </div>
              </div>

              {/* Particular Requirements */}
              <div className="space-y-4">
                <h3 className="text-center text-lg text-gray-600 font-medium">Particular Requirements</h3>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={clientRequirements}
                      onChange={(e) => setClientRequirements(e.target.value)}
                      placeholder="List any specific requirements..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400 min-h-32"
                    />
                  </div>
                </div>
              </div>

              {/* ROI Section */}
              <div className="space-y-6">
                <h3 className="text-center text-lg text-gray-600 font-medium">Expected Return on Investment</h3>
                
                {/* Time ROI */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={roiTime}
                      onChange={(e) => setRoiTime(e.target.value)}
                      placeholder="Describe time-based ROI..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Cost ROI */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={roiCost}
                      onChange={(e) => setRoiCost(e.target.value)}
                      placeholder="Describe cost-based ROI..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* KPI ROI */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={roiKpi}
                      onChange={(e) => setRoiKpi(e.target.value)}
                      placeholder="Describe KPI-based ROI..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial Section */}
              <div className="space-y-6">
                <h3 className="text-center text-lg text-gray-600 font-medium">Testimonial</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-white rounded-xl p-1">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => setTestimonial({...testimonial, name: e.target.value})}
                        placeholder="Name"
                        className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-white rounded-xl p-1">
                      <input
                        type="text"
                        value={testimonial.designation}
                        onChange={(e) => setTestimonial({...testimonial, designation: e.target.value})}
                        placeholder="Designation"
                        className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <input
                      type="text"
                      value={testimonial.organization}
                      onChange={(e) => setTestimonial({...testimonial, organization: e.target.value})}
                      placeholder="Organization"
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={testimonial.message}
                      onChange={(e) => setTestimonial({...testimonial, message: e.target.value})}
                      placeholder="Testimonial message..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400 min-h-32"
                    />
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="space-y-4">
                <h3 className="text-center text-lg text-gray-600 font-medium">About the Company</h3>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white rounded-xl p-1">
                    <textarea
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      placeholder="Write about your company (50 words)..."
                      className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
                      // maxLength={300}
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateProposal}
                disabled={!selectedProduct || !clientSector || !clientTeamSize || !clientCategory || loading}
                className={`w-full py-4 px-6 rounded-xl font-medium text-lg shadow-lg transform transition-all duration-300 ${
                  selectedProduct && clientSector && clientTeamSize && clientCategory
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Generating Proposal...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FileText className="w-6 h-6 mr-3" />
                    Generate Proposal
                  </span>
                )}
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Proposal Response Section */}
       
      </div>
    </div>
  );
};
export default VendorProposalGenerator;


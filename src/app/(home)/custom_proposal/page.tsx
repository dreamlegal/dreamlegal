




"use client"

import React, { useState, useEffect } from 'react';
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
import { useAuth } from '@/context/authContext';
const VendorProposalGenerator = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proposalResponse, setProposalResponse] = useState(null);
//    const { vendorId, userType } = useAuth()
     const vendorId ="cm6nhfvhc00017yrghnecaewm"
  
  // Client Profile State
  const [clientSector, setClientSector] = useState('');
  const [clientTeamSize, setClientTeamSize] = useState('');
  const [clientCategory, setClientCategory] = useState('');

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

  const teamSizes = [
    "1",
    "2-20",
    "21-50",
    "51- 200",
    "201-500",
    "500+",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);
  const [credits, setCredits] = useState(null);
  
    // Fetch credits on component mount
    useEffect(() => {

      fetchCredits();
    }, [vendorId]);
  
    const fetchCredits = async () => {
      try {
        const response = await fetch('/api/get-vendor-credits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
      // const vendorId = localStorage.getItem("vendorId");
      const response = await fetch('/api/get-all-product-by-vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: vendorId
        }),
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
    
    setLoading(true);
    try {
      const response = await fetch('https://dreamlegal.in/ai/proposal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_profile: selectedProduct,
          client_profile: {
            Sector: clientSector,
            "Team Size": parseInt(clientTeamSize),
            Category: clientCategory
          }
        }),
      });
      
      const data = await response.json();
      setProposalResponse(data);
    } catch (error) {
      console.error('Error:', error);
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

        


{(loading || proposalResponse) && (
  <div className="mt-8 transform transition-all duration-500">
    <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-8">
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
            <p className="mt-6 text-lg text-gray-600">Analyzing your feature...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          </div>
        ) : (
          <ProposalDisplay proposalResponse={proposalResponse} />
        )}
      </CardContent>
    </Card>
  </div>
)}
      </div>
    </div>
  );
};

export default VendorProposalGenerator;




const ProposalDisplay = ({ proposalResponse }) => {
  if (!proposalResponse?.response?.Proposal) return null;

  const proposal = proposalResponse.response.Proposal;
  const analysis = proposalResponse.response["Analysis of Customer Preferences"];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Enhanced Title Section */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {proposal.Title || 'Generated Proposal'}
        </h2>
       
      </div>

      {/* Problems Addressed with Enhanced Visual Appeal */}
      {proposal["Problems Addressed"] && (
        <Card className="overflow-hidden transform hover:scale-[1.01] transition-transform duration-200">
          <CardContent className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-white shadow-md">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Problems Addressed</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proposal["Problems Addressed"].map((problem, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  <span className="text-gray-700 leading-relaxed">{problem}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Top Features */}
      {proposal["Top Features"] && (
        <Card className="transform hover:scale-[1.01] transition-transform duration-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-md">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Key Features</h3>
            </div>
            <div className="grid gap-8">
              {proposal["Top Features"].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-white shadow-md">
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-purple-800">{feature.Feature}</h4>
                      {Array.isArray(feature.Details) ? (
                        <p className="text-gray-700 leading-relaxed">{feature.Details[0]}</p>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{feature.Details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Top Functionalities */}
      {proposal["Top Functionalities"] && (
        <Card className="transform hover:scale-[1.01] transition-transform duration-200">
          <CardContent className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-white shadow-md">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Top Functionalities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proposal["Top Functionalities"].map((functionality, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <span className="text-gray-700 leading-relaxed">{functionality}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Best Version & Company Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {proposal["Best Version of Product"] && (
          <Card className="transform hover:scale-[1.01] transition-transform duration-200">
            <CardContent className="p-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white shadow-md">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Best Version</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {proposal["Best Version of Product"]}
              </p>
            </CardContent>
          </Card>
        )}

        {proposal["Company Description"] && (
          <Card className="transform hover:scale-[1.01] transition-transform duration-200">
            <CardContent className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white shadow-md">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Company Overview</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {proposal["Company Description"]}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced How Product Can Help */}
      {proposal["How the Product Can Help"] && (
        <Card className="transform hover:scale-[1.01] transition-transform duration-200">
          <CardContent className="p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white shadow-md">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">How This Product Helps</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {proposal["How the Product Can Help"]}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Customer Analysis */}
      {analysis && (
        <Card className="transform hover:scale-[1.01] transition-transform duration-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-md">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Customer Analysis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(analysis).map(([key, value], index) => (
                <div 
                  key={key} 
                  className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h4 className="text-lg font-semibold text-indigo-700 mb-4">{key}</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {Array.isArray(value) ? value[0] : value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};










// // updated code 
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
// import { useAuth } from '@/context/authContext';

// const VendorProposalGenerator = () => {
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [proposalResponse, setProposalResponse] = useState(null);
//   const vendorId = "cm164oz7v0002vaf5fc8rx9of";

//   // Client Information States
//   const [clientSector, setClientSector] = useState('');
//   const [clientTeamSize, setClientTeamSize] = useState('');
//   const [clientCategory, setClientCategory] = useState('');
//   const [clientProblems, setClientProblems] = useState('');
//   const [clientRequirements, setClientRequirements] = useState('');

//   // ROI States
//   const [roiTime, setRoiTime] = useState('');
//   const [roiCost, setRoiCost] = useState('');
//   const [roiKpi, setRoiKpi] = useState('');

//   // Testimonial State
//   const [testimonial, setTestimonial] = useState({
//     name: '',
//     designation: '',
//     organization: '',
//     message: ''
//   });

//   // Company Description State
//   const [companyDescription, setCompanyDescription] = useState('');

//   const [credits, setCredits] = useState(null);

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
//     fetchCredits();
//   }, []);

//   const fetchCredits = async () => {
//     try {
//       const response = await fetch('/api/get-vendor-credits', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ vendorId })
//       });
//       const data = await response.json();
//       setCredits(data);
//     } catch (error) {
//       console.error('Error fetching credits:', error);
//     }
//   };

//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
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

//   const handleGenerateProposal = async () => {
//     if (!selectedProduct || !clientSector || !clientTeamSize || !clientCategory) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/ai/proposal', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           product_profile: selectedProduct,
//           client_profile: {
//             Sector: clientSector,
//             "Team Size": parseInt(clientTeamSize),
//             Category: clientCategory,
//             Problems: clientProblems,
//             Requirements: clientRequirements
//           },
//           vendor_profile: {
//             ROI: {
//               Time: roiTime,
//               Cost: roiCost,
//               KPI: roiKpi
//             },
//             Testimonial: {
//               Name: testimonial.name,
//               Designation: testimonial.designation,
//               Organization: testimonial.organization,
//               Message: testimonial.message
//             },
//             CompanyDescription: companyDescription
//           }
//         }),
//       });
      
//       const data = await response.json();
//       setProposalResponse(data);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const proposalData = {
//     "Challenges": {
//       "Problems": "AI-driven suggestions on how the tool fits into their current process. Detailed version based on response input.",
//       "Particular Requirements": [
//         "Requirement 1 - Brief explanation of how it is met",
//         "Requirement 2 - Brief explanation of how it is met",
//         "Requirement 3 - Brief explanation of how it is met"
//       ]
//     },
//     "Why_A_Category_Tool": {
//       "Competitive Edge": [
//         "Early adopters experience X% increase in efficiency",
//         "Reduces manual workload by Y%",
//         "Faster decision-making with AI insights"
//       ],
//       "Cost of Inaction": [
//         "Teams continue facing inefficiencies and increased costs",
//         "Missed opportunities for data-driven decision-making",
//         "Higher risk of compliance issues and legal errors"
//       ],
//       "Success Stories & ROI Predictions": [
//         "Company X saw a Z% reduction in contract processing time",
//         "Legal team at Company Y saved $X annually by automating processes",
//         "Firm Z improved client response time by Y% using AI-driven tools"
//       ]
//     },
//     "Product_&_Offering_Information": {
//       "Product Overview": "Concise summary of what the product does, generated by AI based on user profile.",
//       "Problems Addressed": [
//         "Pain point 1 solved for legal teams",
//         "Pain point 2 solved for legal teams",
//         "Pain point 3 solved for legal teams"
//       ],
//       "Key Features & Functionalities": [
//         "Feature 1 - Brief description",
//         "Feature 2 - Brief description",
//         "Feature 3 - Brief description"
//       ],
//       "Best Version Use Cases": [
//         "Ideal for mid-sized law firms",
//         "Suitable for in-house legal teams in tech companies",
//         "Beneficial for compliance teams in financial services"
//       ]
//     },
//     "Testimonial": {
//       "Testimonials": [
//         "'This tool transformed our legal workflow.' - Client A",
//         "'A must-have for any legal team looking to improve efficiency.' - Client B",
//         "'We saw immediate ROI within the first three months.' - Client C"
//       ]
//     },
//     "About_The_Company": {
//       "Description": "Brief company overview based on responses from questions."
//     }
//   }
  

//   return (
//     <div className="min-h-screen p-12">
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
//             <p className="text-sm font-medium">
//               Remaining Proposal Credits: {credits?.proposalCredits ?? 'Loading...'}
//             </p>
//           </div>
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

//               {/* Client Problems */}
//               <div className="space-y-4">
//                 <h3 className="text-center text-lg text-gray-600 font-medium">Client's Problems</h3>
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={clientProblems}
//                       onChange={(e) => setClientProblems(e.target.value)}
//                       placeholder="Describe the client's problems..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400 min-h-32"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Particular Requirements */}
//               <div className="space-y-4">
//                 <h3 className="text-center text-lg text-gray-600 font-medium">Particular Requirements</h3>
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={clientRequirements}
//                       onChange={(e) => setClientRequirements(e.target.value)}
//                       placeholder="List any specific requirements..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400 min-h-32"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* ROI Section */}
//               <div className="space-y-6">
//                 <h3 className="text-center text-lg text-gray-600 font-medium">Expected Return on Investment</h3>
                
//                 {/* Time ROI */}
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={roiTime}
//                       onChange={(e) => setRoiTime(e.target.value)}
//                       placeholder="Describe time-based ROI..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Cost ROI */}
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={roiCost}
//                       onChange={(e) => setRoiCost(e.target.value)}
//                       placeholder="Describe cost-based ROI..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                     />
//                   </div>
//                 </div>

//                 {/* KPI ROI */}
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={roiKpi}
//                       onChange={(e) => setRoiKpi(e.target.value)}
//                       placeholder="Describe KPI-based ROI..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Testimonial Section */}
//               <div className="space-y-6">
//                 <h3 className="text-center text-lg text-gray-600 font-medium">Testimonial</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="relative group">
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                     <div className="relative bg-white rounded-xl p-1">
//                       <input
//                         type="text"
//                         value={testimonial.name}
//                         onChange={(e) => setTestimonial({...testimonial, name: e.target.value})}
//                         placeholder="Name"
//                         className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                       />
//                     </div>
//                   </div>

//                   <div className="relative group">
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                     <div className="relative bg-white rounded-xl p-1">
//                       <input
//                         type="text"
//                         value={testimonial.designation}
//                         onChange={(e) => setTestimonial({...testimonial, designation: e.target.value})}
//                         placeholder="Designation"
//                         className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <input
//                       type="text"
//                       value={testimonial.organization}
//                       onChange={(e) => setTestimonial({...testimonial, organization: e.target.value})}
//                       placeholder="Organization"
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                     />
//                   </div>
//                 </div>

//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={testimonial.message}
//                       onChange={(e) => setTestimonial({...testimonial, message: e.target.value})}
//                       placeholder="Testimonial message..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400 min-h-32"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Company Description */}
//               <div className="space-y-4">
//                 <h3 className="text-center text-lg text-gray-600 font-medium">About the Company</h3>
//                 <div className="relative group">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <textarea
//                       value={companyDescription}
//                       onChange={(e) => setCompanyDescription(e.target.value)}
//                       placeholder="Write about your company (50 words)..."
//                       className="w-full px-8 py-4 text-lg rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                       // maxLength={300}
//                     />
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

//         {/* Proposal Response Section */}
//         {/* {(loading || proposalResponse) && ( */}
//   <div className="mt-8 transform transition-all duration-500">
//     <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//       <CardContent className="p-8">

//       <ProposalDisplay  proposal={proposalData}/>
//         {loading ? (
//           <div className="min-h-[400px] flex flex-col items-center justify-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
//             <p className="mt-6 text-lg text-gray-600">Analyzing your feature...</p>
//             <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
//           </div>
//         ) : (
//           proposalResponse && (
//             <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[600px]">
//               {JSON.stringify(proposalResponse, null, 2)}
//             </pre>
//           )
//         )}
//       </CardContent>
//     </Card>
//   </div>
// {/* )} */}
//       </div>
//     </div>
//   );
// };
// export default VendorProposalGenerator;




// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// import { Edit2, Save, X,  } from 'lucide-react';

// const ProposalDisplay = ({ proposal: initialProposal }) => {
//   const [proposal, setProposal] = useState(initialProposal);
//   const [editingSection, setEditingSection] = useState(null);
//   const [editingField, setEditingField] = useState(null);

//   const handleSave = (section, field, value) => {
//     setProposal(prev => ({
//       ...prev,
//       [section]: field ? {
//         ...prev[section],
//         [field]: value
//       } : value
//     }));
//     setEditingSection(null);
//     setEditingField(null);
//   };

//   const EditableText = ({ text, onSave }) => {
//     const [value, setValue] = useState(text);
    
//     return (
//       <div className="flex flex-col gap-2">
//         <Textarea 
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           className="min-h-[100px] bg-white border-0 shadow-sm"
//         />
//         <div className="flex gap-2">
//           <Button 
//             size="sm"
//             onClick={() => onSave(value)}
//             className="bg-green-500 hover:bg-green-600"
//           >
//             <Save className="w-4 h-4 mr-1" />
//             Save
//           </Button>
//           <Button 
//             size="sm"
//             variant="outline"
//             onClick={() => {
//               setEditingSection(null);
//               setEditingField(null);
//             }}
//           >
//             <X className="w-4 h-4 mr-1" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   const EditableList = ({ items, onSave }) => {
//     const [values, setValues] = useState(items);

//     return (
//       <div className="flex flex-col gap-2">
//         {values.map((item, index) => (
//           <div key={index} className="flex gap-2">
//             <Input
//               value={item}
//               onChange={(e) => setValues(values.map((v, i) => i === index ? e.target.value : v))}
//               className="flex-1 bg-white border-0 shadow-sm"
//             />
//             <Button 
//               size="sm"
//               variant="outline"
//               onClick={() => setValues(values.filter((_, i) => i !== index))}
//               className="text-red-500"
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>
//         ))}
//         <div className="flex gap-2 mt-2">
//           <Button 
//             size="sm"
//             onClick={() => setValues([...values, ''])}
//             variant="outline"
//           >
//             Add Item
//           </Button>
//           <Button 
//             size="sm"
//             onClick={() => onSave(values)}
//             className="bg-green-500 hover:bg-green-600"
//           >
//             <Save className="w-4 h-4 mr-1" />
//             Save
//           </Button>
//           <Button 
//             size="sm"
//             variant="outline"
//             onClick={() => {
//               setEditingSection(null);
//               setEditingField(null);
//             }}
//           >
//             <X className="w-4 h-4 mr-1" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   const Section = ({ title, sectionKey, icon: Icon, children }) => (
//     <Card className="overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 shadow-xl rounded-xl border-0 bg-gradient-to-r from-white to-gray-50">
//       <CardContent className="p-8">
//         <div className="flex items-center gap-4 mb-6">
//           {Icon && (
//             <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
//               <Icon className="w-6 h-6 text-white" />
//             </div>
//           )}
//           <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>
//           <Button
//             size="sm"
//             variant="outline"
//             className="ml-auto text-indigo-600"
//             onClick={() => {
//               setEditingSection(sectionKey);
//               setEditingField(null);
//             }}
//           >
//             <Edit2 className="w-4 h-4" />
//           </Button>
//         </div>
//         <div className="space-y-6">
//           {children}
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const BulletList = ({ title, items, sectionKey, fieldKey }) => (
//     <div className="space-y-4">
//       {title && (
//         <div className="flex justify-between items-center">
//           <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
//           <Button
//             size="sm"
//             variant="outline"
//             className="text-indigo-600"
//             onClick={() => {
//               setEditingSection(sectionKey);
//               setEditingField(fieldKey);
//             }}
//           >
//             <Edit2 className="w-4 h-4" />
//           </Button>
//         </div>
//       )}
//       {editingSection === sectionKey && editingField === fieldKey ? (
//         <EditableList
//           items={items}
//           onSave={(value) => handleSave(sectionKey, fieldKey, value)}
//         />
//       ) : (
//         <div className="space-y-4">
//           {items?.map((item, index) => (
//             <div 
//               key={index}
//               className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//               <span className="text-gray-700 leading-relaxed">{item}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const Paragraph = ({ text, sectionKey, fieldKey }) => (
//     <div className="relative group">
//       {editingSection === sectionKey && editingField === fieldKey ? (
//         <EditableText
//           text={text}
//           onSave={(value) => handleSave(sectionKey, fieldKey, value)}
//         />
//       ) : (
//         <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
//           <p className="text-gray-700 leading-relaxed">
//             {text}
//           </p>
//           <Button
//             size="sm"
//             variant="outline"
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600"
//             onClick={() => {
//               setEditingSection(sectionKey);
//               setEditingField(fieldKey);
//             }}
//           >
//             <Edit2 className="w-4 h-4" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       <div className="text-center space-y-6 py-8">
//         <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//           AI-Generated Business Proposal
//         </h2>
//         <p className="text-gray-600">
//           A comprehensive analysis and recommendation tailored to your needs
//         </p>
//       </div>

//       <Section title="Challenges" sectionKey="Challenges" icon={Target}>
//         <Paragraph
//           text={proposal.Challenges.Problems}
//           sectionKey="Challenges"
//           fieldKey="Problems"
//         />
//         <BulletList
//           title="Particular Requirements"
//           items={proposal.Challenges["Particular Requirements"]}
//           sectionKey="Challenges"
//           fieldKey="Particular Requirements"
//         />
//       </Section>

//       <Section title="Why Choose This Solution?" sectionKey="Why_A_Category_Tool" icon={Sparkles}>
//         <BulletList
//           title="Competitive Edge"
//           items={proposal.Why_A_Category_Tool["Competitive Edge"]}
//           sectionKey="Why_A_Category_Tool"
//           fieldKey="Competitive Edge"
//         />
//         <BulletList
//           title="Cost of Inaction"
//           items={proposal.Why_A_Category_Tool["Cost of Inaction"]}
//           sectionKey="Why_A_Category_Tool"
//           fieldKey="Cost of Inaction"
//         />
//         <BulletList
//           title="Success Stories"
//           items={proposal.Why_A_Category_Tool["Success Stories & ROI Predictions"]}
//           sectionKey="Why_A_Category_Tool"
//           fieldKey="Success Stories & ROI Predictions"
//         />
//       </Section>

//       <Section title="Product & Features" sectionKey="Product_&_Offering_Information" icon={CheckCircle2}>
//         <Paragraph
//           text={proposal["Product_&_Offering_Information"]["Product Overview"]}
//           sectionKey="Product_&_Offering_Information"
//           fieldKey="Product Overview"
//         />
//         <BulletList
//           title="Problems Addressed"
//           items={proposal["Product_&_Offering_Information"]["Problems Addressed"]}
//           sectionKey="Product_&_Offering_Information"
//           fieldKey="Problems Addressed"
//         />
//         <BulletList
//           title="Key Features"
//           items={proposal["Product_&_Offering_Information"]["Key Features & Functionalities"]}
//           sectionKey="Product_&_Offering_Information"
//           fieldKey="Key Features & Functionalities"
//         />
//         <BulletList
//           title="Best Use Cases"
//           items={proposal["Product_&_Offering_Information"]["Best Version Use Cases"]}
//           sectionKey="Product_&_Offering_Information"
//           fieldKey="Best Version Use Cases"
//         />
//       </Section>

//       <Section title="Client Testimonials" sectionKey="Testimonial" icon={Users}>
//         <BulletList
//           items={proposal.Testimonial.Testimonials}
//           sectionKey="Testimonial"
//           fieldKey="Testimonials"
//         />
//       </Section>

//       <Section title="About Us" sectionKey="About_The_Company" icon={Building2}>
//         <Paragraph
//           text={proposal.About_The_Company.Description}
//           sectionKey="About_The_Company"
//           fieldKey="Description"
//         />
//       </Section>

//       <div className="flex justify-center pt-8">
//         <Button
//           size="lg"
//           className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
//           onClick={() => console.log(JSON.stringify(proposal, null, 2))}
//         >
//           Export Proposal
//         </Button>
//       </div>
//     </div>
//   );
// };

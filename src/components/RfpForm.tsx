// import React, { useState, useEffect } from "react";
// import { X, ChevronDown, ChevronUp } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


// const organizationTypes = [
//   "Law firms",
//   "Enterprises",
//   "Individual Practitioners",
//   "Startups",
//   "Government Departments",
//   "Judiciary",
//   "In-House Counsels",
// ];

// const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"];

// const urgencyOptions = [
//   "Critical (Address Immediately)",
//   "High (Address in three months)",
//   "Moderate (Address in six to twelve months)",
//   "Low (Can be considered next year)",
// ];

// const currencies = ["USD", "EUR", "GBP", "INR"];


// const categoryOptions = {
//     // 'Common Features': {
//     //   'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     //   'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     //   'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     //   'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control']
//     // },
//   'Client Relationship Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
//     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
//     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
//     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
//     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
//     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
//   },
//   'Governance, Risk and Compliance': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
//     'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
//     'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
//   },
//   'Contract Lifecycle Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Contract Creation and Authoring': [
//       'Contract Authoring',
//       'Text Editor',
//       'Contract Templatization',
//       'Format Customization',
//       'Version control',
//     ],
//     'Contract Repository': [
//       'Document Storage',
//       'Multiple file formats',
//       'Categorization and Retrieval',
//     ],
//     'Contract Negotiation': [
//       'Collaboration workspace',
//       'Comments and Annotations',
//       'Messaging and Emailing',
//     ],
//     'Lifecycle Management': [
//       'Approval Management',
//       'Milestone tracking',
//       'Obligation tracking',
//       'Calendar Alerts',
//     ],
//     'Clause Library': [
//       'Clause Library',
//       'Text editor',
//       'Clause review and approval',
//       'Version control for clauses',
//     ],
//   },
//   'E-Signature': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Fields Creation': [
//       'Signature fields',
//       'Multiple signature styles',
//       'Data fields',
//       'Customization and labelling',
//     ],
//     'Tracking and Validity': [
//       'Legal validity',
//       'Audit trail',
//       'Document recording and retention',
//     ],
//     'Document Management and Templates': [
//       'Document creation',
//       'Version control',
//       'Granular permission for collaborators',
//     ],
//     'Document Capturing': [
//       'Document uploads',
//       'Multiple file supports',
//       'OCR',
//     ],
//   },
//   'Legal Research': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Case Law Research': [
//       'Comprehensive case law databases',
//       'Jurisdictional filters',
//       'Citation search and validation',
//       'Historical case law archives',
//     ],
//     'Statutory Research': [
//       'Statutes and regulations databases',
//       'Annotations and historical versions',
//       'Legislative tracking and updates',
//       'Secondary Sources',
//       'Legal treatises and commentaries',
//       'Journals and law reviews',
//       'International treaties and conventions',
//     ],
//     'Advanced Search Capabilities': [
//       'Search Functionality',
//       'Boolean and logical search',
//       'AI-powered search and chat',
//       'Document upload',
//     ],
//     'Filter and Sorting': [
//       'Jurisdiction and court level',
//       'Date range and publication type',
//       'Relevance and citation frequency',
//     ],
//   },
//   'Document Management System': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Document Creation and Templates': [
//       'Document creation',
//       'Text editor',
//       'Document Templatization',
//       'Central repository',
//       'Co-authoring features',
//     ],
//     'Document Search and Navigation': [
//       'Categorizing and tagging',
//       'Search capabilities',
//       'Filter and sorting',
//     ],
//     'Authentication': [
//       'MFA (Multi factor Authentication)',
//       'Electronic signature capabilities.',
//     ],
//     'Task Allotment': [
//       'Customizable workflows',
//       'Internal work delegation',
//       'Task tracking',
//     ],
//   },
//   'E-billing and Invoicing': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Budgeting, Expense and Time Tracking': [
//       'Budget management',
//       'Time tracking',
//       'Multiple fee arrangements',
//       'Approval management',
//     ],
//     'Client Management': [
//       'Central client repository',
//       'Client communications',
//       'Billing schedules',
//       'Payment processing',
//     ],
//     'Invoice Generation and Review': [
//       'Customizable invoice templates',
//       'Automated invoice generation',
//       'Multiple currencies',
//       'Tax entries and calculations',
//       'Payment tracking and recording',
//     ],
//   },
//   'E-discovery': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Data Identification and Collection': [
//       'Data source identification',
//       'Remote Collection',
//       'Network-based collection',
//       'Forensic imaging',
//       'Custodian self-collection',
//       'Validation mechanisms',
//     ],
//     'Search, Processing and Analysis': [
//       'Search functionality',
//       'Filter and sorting',
//       'Duplicity elimination',
//       'Data processing',
//       'Cluster similar documents',
//     ],
//     'Review and Production': [
//       'Review and Analysis',
//       'Coding and annotations',
//       'Process control',
//       'Review workflow',
//       'Audit trail',
//     ],
//     'Legal Hold Management': [
//       'Legal hold tracking',
//       'Legal hold notice management',
//       'Receipt Acknowledgement',
//       'Data custodian Management',
//     ],
//   },
//   'Intellectual Property Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Ideation and Creation': [
//       'Idea intake and management',
//       'Innovation workflow management',
//     ],
//     'Lifecycle Management': [
//       'Workflow management system (IP lifecycle)',
//       'Renewal management',
//       'Management of licensing agreements, contracts',
//     ],
//     'Search and Discovery': [
//       'Database integration',
//       'Advanced search capabilities',
//       'Filter and sorting',
//     ],
//     'Storage and Repository': [
//       'Centralized repository',
//       'Categorization and tagging',
//       'Accessibility control',
//       'Access audit',
//     ],
//   },
//   'Litigation Management and Analytics': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Matter Lifecycle Tracking': [
//       'Task management',
//       'Document organisation',
//     ],
//     'Court and Case Search': [
//       'Automated case alerts',
//       'Court docket systems',
//       'Real-time updates',
//     ],
//     'Budget, Expense and Time Tracking': [
//       'Budget Management',
//       'Time tracking',
//       'Approval Management',
//       'Client invoicing',
//       'Payment processing',
//     ],
//     'Litigation Docketing Features': [
//       'Collaborative timeline tracking',
//       'Court Rule tracking',
//       'Court database integration',
//       'Customized docket entries',
//     ],
//   },
//   'Legal Workflow Automation': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Workflow Design and Configuration': [
//       'Workflow designer',
//       'Branching',
//       'Task management',
//       'Data routing',
//       'Workflow templates',
//     ],
//     'Assignment Allotment and Tracking': [
//       'Task creation',
//       'Task allotment',
//       'Task tracking',
//     ],
//     'Document Creation and Management': [
//       'Document creation',
//       'Templatization',
//       'Indexing and tagging of documents',
//       'Document search and retrieval',
//     ],
//     'Laws, Compliance and Regulatory Tracking': [
//       'Sectoral differentiation',
//       'Compliance applicability',
//       'Law and compliance updates',
//     ],
//   },
// };



// const RfpForm = ({ CustomerUserId, onClose }) => {
//   // Existing state variables
//   const [userOrgType, setUserOrgType] = useState("");
//   const [userTeamSize, setUserTeamSize] = useState("");
//   const [customisation, setCustomisation] = useState("");
//   const [urgency, setUrgency] = useState("");
//   const [urgencyResponse, setUrgencyResponse] = useState([]);
//   const [budgetMin, setBudgetMin] = useState("");
//   const [budgetMax, setBudgetMax] = useState("");
//   const [budgetUnit, setBudgetUnit] = useState("")
//   const [budgetResponse, setBudgetResponse] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // New state variables for feature selection
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [expandedSubcategories, setExpandedSubcategories] = useState({});
//   const [selectedFeatures, setSelectedFeatures] = useState({});
//   const [products, setProducts] = useState<any[]>([]);

  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!CustomerUserId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${CustomerUserId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const userData = await response.json();

//         if (userData.success) {
//           console.log("user data ", userData)
//           const { profile } = userData;
//           setUserOrgType(profile.CompanyType || "");
//           setUserTeamSize(profile.TeamSize || "");
//         } else {
//           throw new Error("Failed to fetch user data");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching user data");
//       } finally {
//         setLoading(false);
//       }
//     };

  

//     fetchUserData();
    
    

//   }, [CustomerUserId]);

//   useEffect(()=>{
//     const fetchProducts = async () => {
//       if (!CustomerUserId) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch('/api/rfpForm-allProducts', {
//           method: 'POST', // Use POST if your API requires it, otherwise you can use GET
//           headers: {
//             'Content-Type': 'application/json', // Set the content type to JSON
//           },
//           // Optionally, you can send a body if your API expects it
//           // body: JSON.stringify({ yourKey: 'yourValue' }), 
//         });

//         // Check if the response is okay (status in the range 200-299)
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json(); // Parse the JSON response
//         setProducts(data); // Set the products state

//       } catch (err: any) {
//         setError(err.message); // Handle any errors
//       }
//     };
//     fetchProducts();
//   },[])

//   console.log(products)

//   const handleFeatureChange = (category, subcategory, feature) => {
//     setSelectedFeatures(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [subcategory]: {
//           ...prev[category]?.[subcategory],
//           [feature]: {
//             selected: !prev[category]?.[subcategory]?.[feature]?.selected,
//             responses: [],  // Placeholder for future responses
            
//           }
//         }
//       }
//     }));
//   };

//   const toggleSubcategory = (subcategory) => {
//     setExpandedSubcategories(prev => ({
//       ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), // Collapse others
//       [subcategory]: !prev[subcategory]
//     }));
//   };
  
  
//   const [vendorSelectionType, setVendorSelectionType] = useState("");
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [vendors, setVendors] = useState({
//     byProduct: {
//       selected: false,
//       products: []
//     },
//     byCategory: {
//       selected: false,
//       vendors: []
//     }
//   });

  
//   const getVendorsForCategory = (category) => {
//     const vendorsSet = new Set();
//     const vendorsArray = products
//       .filter(product => product.category.includes(category))
//       .map(product => ({
//         vendorId: product.company.userId,
//         vendorName: product.company.companyName
//       }))
//       .filter(vendor => {
//         const vendorKey = `${vendor.vendorId}-${vendor.vendorName}`;
//         if (!vendorsSet.has(vendorKey)) {
//           vendorsSet.add(vendorKey);
//           return true;
//         }
//         return false;
//       });
//     return vendorsArray;
//   };

//   const handleVendorSelectionTypeChange = (value) => {
//     setVendorSelectionType(value);
//     if (value === "byCategory") {
//       const categoryVendors = getVendorsForCategory(selectedCategory);
//       setVendors({
//         byProduct: {
//           selected: false,
//           products: []
//         },
//         byCategory: {
//           selected: true,
//           vendors: categoryVendors
//         }
//       });
//     } else {
//       setVendors({
//         byProduct: {
//           selected: true,
//           products: []
//         },
//         byCategory: {
//           selected: false,
//           vendors: []
//         }
//       });
//     }
//     setSelectedProducts([]);
//   };
//   const handleProductSelection = (product) => {
//     setSelectedProducts(prev => {
//       const isSelected = prev.some(p => p.id === product.id);
//       if (isSelected) {
//         return prev.filter(p => p.id !== product.id);
//       } else {
//         return [...prev, product];
//       }
//     });

//     setVendors(prev => ({
//       ...prev,
//       byProduct: {
//         ...prev.byProduct,
//         products: prev.byProduct.products.some(p => p.productId === product.id)
//           ? prev.byProduct.products.filter(p => p.productId !== product.id)
//           : [...prev.byProduct.products, {
//               productId: product.id,
//               productName:product.name,
//               vendorId: product.company.userId,
//               vendorName: product.company.companyName
//             }]
//       }
//     }));
//   };
  


  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       userId: CustomerUserId,
//       userOrgType,
//       userTeamSize,
//       customisation,
//       urgency: {
//         askedUrgency: urgency,
//         urgencyResponse,
//       },
//       budget: {
//         askedMin: budgetMin,
//         askedMax: budgetMax,
//         budgetUnit,
//         budgetResponse,
//       },
//       selectedFeatures,
//       vendors
//     };
//     console.log("Form submitted:", formData);
//     // Here you would typically send this data to your API
//     onClose();
//     try {
//       const response = await fetch('/api/submit-rfp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const result = await response.json();
  
//       if (result.success) {
//         console.log('RFP submitted successfully:', result.data);
//       } else {
//         console.error('Failed to submit RFP:', result.message);
//       }
//     } catch (error) {
//       console.error('Error submitting RFP:', error);
//     }
//   };
  
//   if (loading) {
//     return <div>Loading user data...</div>;
//   }





//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
//       <Card className="w-full max-w-4xl">
//         <Button
//           variant="ghost"
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X className="h-5 w-5" />
//         </Button>
//         <CardHeader>
//           <CardTitle className="text-2xl">Request for Proposal (RFP)</CardTitle>
//           <CardDescription>
//             Please fill in the details for your RFP
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Existing form fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="userOrgType">Organisation Type</Label>
//                 <Select value={userOrgType} onValueChange={setUserOrgType}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select organization type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {organizationTypes.map((type) => (
//                       <SelectItem key={type} value={type}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="userTeamSize">Team Size</Label>
//                 <Select value={userTeamSize} onValueChange={setUserTeamSize}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select team size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {teamSizes.map((size) => (
//                       <SelectItem key={size} value={size}>
//                         {size}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="urgency">Urgency</Label>
//                 <Select value={urgency} onValueChange={setUrgency}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select urgency" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {urgencyOptions.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="budgetMin">Min Budget</Label>
//                 <Input
//                   type="text"
//                   id="budgetMin"
//                   value={budgetMin}
//                   onChange={(e) =>
//                     setBudgetMin(e.target.value)
//                   }
//                   className="w-full"
//                 />
//               </div>
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="budgetMax">Max Budget</Label>
//                 <Input
//                   type="text"
//                   id="budgetMax"
//                   value={budgetMax}
//                   onChange={(e) =>
//                     setBudgetMax(e.target.value)
//                   }
//                   className="w-full"
//                 />
//               </div>
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="currency">Currency</Label>
//                 <Select
//                   value={budgetUnit}
//                   onValueChange={(value) => {
//                     setBudgetUnit(value);
//                   }}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Currency" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {currencies.map((currency) => (
//                       <SelectItem key={currency} value={currency}>
//                         {currency}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="customisation">
//                 Specific Customisation Requirements
//               </Label>
//               <Textarea
//                 id="customisation"
//                 value={customisation}
//                 onChange={(e) => setCustomisation(e.target.value)}
//                 rows={3}
//                 className="w-full"
//               />
//             </div>

//             {/* Feature Selection Section */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center ">
//                 <h3 className="text-lg font-semibold">Features</h3>
//                 <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                   <SelectTrigger className="w-[200px]">
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.keys(categoryOptions).map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//           </div>

        
//           {selectedCategory && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {Object.entries(categoryOptions[selectedCategory] || {}).map(([subcategory, features]) => (
//         <div key={subcategory} className="w-full">
//           <div className="border rounded-lg shadow-sm bg-white overflow-hidden h-[60px]">
//             <div 
//               className="p-3 cursor-pointer bg-gray-50 flex justify-between items-center h-full"
//               onClick={() => toggleSubcategory(subcategory)}
//             >
//               <h3 className="font-semibold text-sm truncate">{subcategory}</h3>
//               {expandedSubcategories[subcategory] ? 
//                 <ChevronUp className="h-4 w-4 flex-shrink-0 text-gray-500" /> : 
//                 <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-500" />
//               }
//             </div>
//           </div>
//           {expandedSubcategories[subcategory] && (
//             <div className="p-3 border border-t-0 rounded-b-lg">
//               {features.map((feature) => (
//                 <div key={feature} className="flex items-center space-x-2 py-1">
//                   <input
//                     type="checkbox"
//                     id={`${selectedCategory}-${subcategory}-${feature}`}
//                     checked={selectedFeatures[selectedCategory]?.[subcategory]?.[feature] || false}
//                     onChange={() => handleFeatureChange(selectedCategory, subcategory, feature)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <label 
//                     htmlFor={`${selectedCategory}-${subcategory}-${feature}`}
//                     className="text-xs text-gray-700"
//                   >
//                     {feature}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//            )}
//             </div>


//             {selectedCategory && (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Vendor Selection</h3>
//                 <RadioGroup value={vendorSelectionType} onValueChange={handleVendorSelectionTypeChange}>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="byCategory" id="byCategory" />
//                     <Label htmlFor="byCategory">Send to all vendors in the selected category</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="byProduct" id="byProduct" />
//                     <Label htmlFor="byProduct">Select specific products</Label>
//                   </div>
//                 </RadioGroup>

//                 {vendorSelectionType === "byProduct" && (
//                   <div className="space-y-2">
//                     <Label>Select Products</Label>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {products
//                         .filter(product => product.category.includes(selectedCategory))
//                         .map(product => (
//                           <div key={product.id} className="flex items-center space-x-2">
//                             <Checkbox
//                               id={`product-${product.id}`}
//                               checked={selectedProducts.some(p => p.id === product.id)}
//                               onCheckedChange={() => handleProductSelection(product)}
//                             />
//                             <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
//                           </div>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
            
         

 

//             {error && <div className="text-red-500">{error}</div>}
//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               Submit RFP
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RfpForm;

// import React, { useState, useEffect } from "react";
// import { X, ChevronDown, ChevronUp } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { z } from "zod";
// import { toast } from "@/components/ui/use-toast";




// const organizationTypes = [
//   "Law firms",
//   "Enterprises",
//   "Individual Practitioners",
//   "Startups",
//   "Government Departments",
//   "Judiciary",
//   "In-House Counsels",
// ] as const ;

// const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"] as const;

// const urgencyOptions = [
//   "Critical (Address Immediately)",
//   "High (Address in three months)",
//   "Moderate (Address in six to twelve months)",
//   "Low (Can be considered next year)",
// ] as const;

// const currencies = ["USD", "EUR", "GBP", "INR"] as const;


// const categoryOptions = {
  
//   'Client Relationship Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
//     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
//     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
//     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
//     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
//     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
//   },
  
// } as const;


// const categoryNames = Object.keys(categoryOptions) as Array<keyof typeof categoryOptions>;

// const allFeatures = Object.values(categoryOptions).flatMap(subcategories =>
//   Object.values(subcategories).flatMap(features => features)
// );

// const RfpFormSchema = z.object({
//   userOrgType: z.enum(organizationTypes, {
//     errorMap: () => ({ message: "Please select an organization type" }),
//   }),
//   userTeamSize: z.enum(teamSizes, {
//     errorMap: () => ({ message: "Please select a team size" }),
//   }),
//   customisation: z.string().optional(),
//   urgency: z.enum(urgencyOptions, {
//     errorMap: () => ({ message: "Please select an urgency level" }),
//   }),
//   budgetUnit: z.enum(currencies, {
//     errorMap: () => ({ message: "Please select a currency" }),
//   }),
//   budgetMin: z.string().min(1, "Minimum budget is required"),
//   budgetMax: z.string().min(1, "Maximum budget is required"),
//   selectedCategory: z.enum(categoryNames, {
//     errorMap: () => ({ message: "Please select a category" }),
//   }),
//   // selectedFeatures: z.record(z.record(z.record(z.boolean()))),
//   vendorSelectionType: z.enum(["byCategory", "byProduct"]),
//   selectedProducts: z.array(z.object({
//     id: z.string(),
//     name: z.string()
//   })).optional(),
//   selectedFeatures: z.array(z.enum(allFeatures, {
//     errorMap: () => ({ message: "Please select valid features" }),
//   })),
// });

// const RfpForm = ({ CustomerUserId, onClose }) => {
//   // Existing state variables
//   const [userOrgType, setUserOrgType] = useState("");
//   const [userTeamSize, setUserTeamSize] = useState("");
//   const [customisation, setCustomisation] = useState("");
//   const [urgency, setUrgency] = useState("");
//   const [urgencyResponse, setUrgencyResponse] = useState([]);
//   const [budgetMin, setBudgetMin] = useState("");
//   const [budgetMax, setBudgetMax] = useState("");
//   const [budgetUnit, setBudgetUnit] = useState("")
//   const [budgetResponse, setBudgetResponse] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // New state variables for feature selection
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [expandedSubcategories, setExpandedSubcategories] = useState({});
//   const [selectedFeatures, setSelectedFeatures] = useState({});
//   const [products, setProducts] = useState<any[]>([]);

  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!CustomerUserId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${CustomerUserId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const userData = await response.json();

//         if (userData.success) {
//           console.log("user data ", userData)
//           const { profile } = userData;
//           setUserOrgType(profile.CompanyType || "");
//           setUserTeamSize(profile.TeamSize || "");
//         } else {
//           throw new Error("Failed to fetch user data");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching user data");
//       } finally {
//         setLoading(false);
//       }
//     };

  

//     fetchUserData();
    
    

//   }, [CustomerUserId]);

//   useEffect(()=>{
//     const fetchProducts = async () => {
//       if (!CustomerUserId) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch('/api/rfpForm-allProducts', {
//           method: 'POST', // Use POST if your API requires it, otherwise you can use GET
//           headers: {
//             'Content-Type': 'application/json', // Set the content type to JSON
//           },
//           // Optionally, you can send a body if your API expects it
//           // body: JSON.stringify({ yourKey: 'yourValue' }), 
//         });

//         // Check if the response is okay (status in the range 200-299)
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json(); // Parse the JSON response
//         setProducts(data); // Set the products state

//       } catch (err: any) {
//         setError(err.message); // Handle any errors
//       }
//     };
//     fetchProducts();
//   },[])

//   console.log(products)

//   const handleFeatureChange = (category, subcategory, feature) => {
//     setSelectedFeatures(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [subcategory]: {
//           ...prev[category]?.[subcategory],
//           [feature]: {
//             selected: !prev[category]?.[subcategory]?.[feature]?.selected,
//             responses: [],  // Placeholder for future responses
            
//           }
//         }
//       }
//     }));
//   };

//   const toggleSubcategory = (subcategory) => {
//     setExpandedSubcategories(prev => ({
//       ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), // Collapse others
//       [subcategory]: !prev[subcategory]
//     }));
//   };
  
  
//   const [vendorSelectionType, setVendorSelectionType] = useState("");
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [vendors, setVendors] = useState({
//     byProduct: {
//       selected: false,
//       products: []
//     },
//     byCategory: {
//       selected: false,
//       vendors: []
//     }
//   });

  
//   const getVendorsForCategory = (category) => {
//     const vendorsSet = new Set();
//     const vendorsArray = products
//       .filter(product => product.category.includes(category))
//       .map(product => ({
//         vendorId: product.company.userId,
//         vendorName: product.company.companyName
//       }))
//       .filter(vendor => {
//         const vendorKey = `${vendor.vendorId}-${vendor.vendorName}`;
//         if (!vendorsSet.has(vendorKey)) {
//           vendorsSet.add(vendorKey);
//           return true;
//         }
//         return false;
//       });
//     return vendorsArray;
//   };

//   const handleVendorSelectionTypeChange = (value) => {
//     setVendorSelectionType(value);
//     if (value === "byCategory") {
//       const categoryVendors = getVendorsForCategory(selectedCategory);
//       setVendors({
//         byProduct: {
//           selected: false,
//           products: []
//         },
//         byCategory: {
//           selected: true,
//           vendors: categoryVendors
//         }
//       });
//     } else {
//       setVendors({
//         byProduct: {
//           selected: true,
//           products: []
//         },
//         byCategory: {
//           selected: false,
//           vendors: []
//         }
//       });
//     }
//     setSelectedProducts([]);
//   };
//   const handleProductSelection = (product) => {
//     setSelectedProducts(prev => {
//       const isSelected = prev.some(p => p.id === product.id);
//       if (isSelected) {
//         return prev.filter(p => p.id !== product.id);
//       } else {
//         return [...prev, product];
//       }
//     });

//     setVendors(prev => ({
//       ...prev,
//       byProduct: {
//         ...prev.byProduct,
//         products: prev.byProduct.products.some(p => p.productId === product.id)
//           ? prev.byProduct.products.filter(p => p.productId !== product.id)
//           : [...prev.byProduct.products, {
//               productId: product.id,
//               productName:product.name,
//               vendorId: product.company.userId,
//               vendorName: product.company.companyName
//             }]
//       }
//     }));
//   };
  


  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       userId: CustomerUserId,
//       userOrgType,
//       userTeamSize,
//       customisation,
//       urgency: {
//         askedUrgency: urgency,
//         urgencyResponse,
//       },
//       budget: {
//         askedMin: budgetMin,
//         askedMax: budgetMax,
//         budgetUnit,
//         budgetResponse,
//       },
//       selectedFeatures,
//       vendors
//     };
//     console.log("Form submitted:", formData);
//     // Here you would typically send this data to your API
//     onClose();
//     try {
//       const response = await fetch('/api/submit-rfp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const result = await response.json();
  
//       if (result.success) {
//         console.log('RFP submitted successfully:', result.data);
//       } else {
//         console.error('Failed to submit RFP:', result.message);
//       }
//     } catch (error) {
//       console.error('Error submitting RFP:', error);
//     }
//   };
  
//   if (loading) {
//     return <div>Loading user data...</div>;
//   }





//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
//       <Card className="w-full max-w-4xl">
//         <Button
//           variant="ghost"
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X className="h-5 w-5" />
//         </Button>
//         <CardHeader>
//           <CardTitle className="text-2xl">Request for Proposal (RFP)</CardTitle>
//           <CardDescription>
//             Please fill in the details for your RFP
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Existing form fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="userOrgType">Organisation Type</Label>
//                 <Select value={userOrgType} onValueChange={setUserOrgType}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select organization type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {organizationTypes.map((type) => (
//                       <SelectItem key={type} value={type}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="userTeamSize">Team Size</Label>
//                 <Select value={userTeamSize} onValueChange={setUserTeamSize}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select team size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {teamSizes.map((size) => (
//                       <SelectItem key={size} value={size}>
//                         {size}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="urgency">Urgency</Label>
//                 <Select value={urgency} onValueChange={setUrgency}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select urgency" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {urgencyOptions.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="budgetMin">Min Budget</Label>
//                 <Input
//                   type="text"
//                   id="budgetMin"
//                   value={budgetMin}
//                   onChange={(e) =>
//                     setBudgetMin(e.target.value)
//                   }
//                   className="w-full"
//                 />
//               </div>
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="budgetMax">Max Budget</Label>
//                 <Input
//                   type="text"
//                   id="budgetMax"
//                   value={budgetMax}
//                   onChange={(e) =>
//                     setBudgetMax(e.target.value)
//                   }
//                   className="w-full"
//                 />
//               </div>
//               <div className="col-span-1 space-y-2">
//                 <Label htmlFor="currency">Currency</Label>
//                 <Select
//                   value={budgetUnit}
//                   onValueChange={(value) => {
//                     setBudgetUnit(value);
//                   }}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Currency" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {currencies.map((currency) => (
//                       <SelectItem key={currency} value={currency}>
//                         {currency}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="customisation">
//                 Specific Customisation Requirements
//               </Label>
//               <Textarea
//                 id="customisation"
//                 value={customisation}
//                 onChange={(e) => setCustomisation(e.target.value)}
//                 rows={3}
//                 className="w-full"
//               />
//             </div>

//             {/* Feature Selection Section */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center ">
//                 <h3 className="text-lg font-semibold">Features</h3>
//                 <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                   <SelectTrigger className="w-[200px]">
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.keys(categoryOptions).map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//           </div>

        
//           {selectedCategory && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {Object.entries(categoryOptions[selectedCategory] || {}).map(([subcategory, features]) => (
//         <div key={subcategory} className="w-full">
//           <div className="border rounded-lg shadow-sm bg-white overflow-hidden h-[60px]">
//             <div 
//               className="p-3 cursor-pointer bg-gray-50 flex justify-between items-center h-full"
//               onClick={() => toggleSubcategory(subcategory)}
//             >
//               <h3 className="font-semibold text-sm truncate">{subcategory}</h3>
//               {expandedSubcategories[subcategory] ? 
//                 <ChevronUp className="h-4 w-4 flex-shrink-0 text-gray-500" /> : 
//                 <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-500" />
//               }
//             </div>
//           </div>
//           {expandedSubcategories[subcategory] && (
//             <div className="p-3 border border-t-0 rounded-b-lg">
//               {features.map((feature) => (
//                 <div key={feature} className="flex items-center space-x-2 py-1">
//                   <input
//                     type="checkbox"
//                     id={`${selectedCategory}-${subcategory}-${feature}`}
//                     checked={selectedFeatures[selectedCategory]?.[subcategory]?.[feature] || false}
//                     onChange={() => handleFeatureChange(selectedCategory, subcategory, feature)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <label 
//                     htmlFor={`${selectedCategory}-${subcategory}-${feature}`}
//                     className="text-xs text-gray-700"
//                   >
//                     {feature}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//            )}
//             </div>


//             {selectedCategory && (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Vendor Selection</h3>
//                 <RadioGroup value={vendorSelectionType} onValueChange={handleVendorSelectionTypeChange}>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="byCategory" id="byCategory" />
//                     <Label htmlFor="byCategory">Send to all vendors in the selected category</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="byProduct" id="byProduct" />
//                     <Label htmlFor="byProduct">Select specific products</Label>
//                   </div>
//                 </RadioGroup>

//                 {vendorSelectionType === "byProduct" && (
//                   <div className="space-y-2">
//                     <Label>Select Products</Label>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {products
//                         .filter(product => product.category.includes(selectedCategory))
//                         .map(product => (
//                           <div key={product.id} className="flex items-center space-x-2">
//                             <Checkbox
//                               id={`product-${product.id}`}
//                               checked={selectedProducts.some(p => p.id === product.id)}
//                               onCheckedChange={() => handleProductSelection(product)}
//                             />
//                             <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
//                           </div>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
            
         

 

//             {error && <div className="text-red-500">{error}</div>}
//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               Submit RFP
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RfpForm;





const organizationTypes = [
  "Law firms",
  "Enterprises",
  "Individual Practitioners",
  "Startups",
  "Government Departments",
  "Judiciary",
  "In-House Counsels",
] as const ;

const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"] as const;

const urgencyOptions = [
  "Critical (Address Immediately)",
  "High (Address in three months)",
  "Moderate (Address in six to twelve months)",
  "Low (Can be considered next year)",
] as const;

const currencies = ["USD", "EUR", "GBP", "INR"] as const;


const categoryOptions = {
  
  'Client Relationship Management': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
    'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
    'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
    'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
    'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
    'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
  },
  'Governance, Risk and Compliance': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
    'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
    'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
  },
  'Contract Lifecycle Management': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Contract Creation and Authoring': [
      'Contract Authoring',
      'Text Editor',
      'Contract Templatization',
      'Format Customization',
      'Version control',
    ],
    'Contract Repository': [
      'Document Storage',
      'Multiple file formats',
      'Categorization and Retrieval',
    ],
    'Contract Negotiation': [
      'Collaboration workspace',
      'Comments and Annotations',
      'Messaging and Emailing',
    ],
    'Lifecycle Management': [
      'Approval Management',
      'Milestone tracking',
      'Obligation tracking',
      'Calendar Alerts',
    ],
    'Clause Library': [
      'Clause Library',
      'Text editor',
      'Clause review and approval',
      'Version control for clauses',
    ],
  },
  'E-Signature': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Fields Creation': [
      'Signature fields',
      'Multiple signature styles',
      'Data fields',
      'Customization and labelling',
    ],
    'Tracking and Validity': [
      'Legal validity',
      'Audit trail',
      'Document recording and retention',
    ],
    'Document Management and Templates': [
      'Document creation',
      'Version control',
      'Granular permission for collaborators',
    ],
    'Document Capturing': [
      'Document uploads',
      'Multiple file supports',
      'OCR',
    ],
  },
  'Legal Research': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Case Law Research': [
      'Comprehensive case law databases',
      'Jurisdictional filters',
      'Citation search and validation',
      'Historical case law archives',
    ],
    'Statutory Research': [
      'Statutes and regulations databases',
      'Annotations and historical versions',
      'Legislative tracking and updates',
      'Secondary Sources',
      'Legal treatises and commentaries',
      'Journals and law reviews',
      'International treaties and conventions',
    ],
    'Advanced Search Capabilities': [
      'Search Functionality',
      'Boolean and logical search',
      'AI-powered search and chat',
      'Document upload',
    ],
    'Filter and Sorting': [
      'Jurisdiction and court level',
      'Date range and publication type',
      'Relevance and citation frequency',
    ],
  },
  'Document Management System': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Document Creation and Templates': [
      'Document creation',
      'Text editor',
      'Document Templatization',
      'Central repository',
      'Co-authoring features',
    ],
    'Document Search and Navigation': [
      'Categorizing and tagging',
      'Search capabilities',
      'Filter and sorting',
    ],
    'Authentication': [
      'MFA (Multi factor Authentication)',
      'Electronic signature capabilities.',
    ],
    'Task Allotment': [
      'Customizable workflows',
      'Internal work delegation',
      'Task tracking',
    ],
  },
  'E-billing and Invoicing': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Budgeting, Expense and Time Tracking': [
      'Budget management',
      'Time tracking',
      'Multiple fee arrangements',
      'Approval management',
    ],
    'Client Management': [
      'Central client repository',
      'Client communications',
      'Billing schedules',
      'Payment processing',
    ],
    'Invoice Generation and Review': [
      'Customizable invoice templates',
      'Automated invoice generation',
      'Multiple currencies',
      'Tax entries and calculations',
      'Payment tracking and recording',
    ],
  },
  'E-discovery': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Data Identification and Collection': [
      'Data source identification',
      'Remote Collection',
      'Network-based collection',
      'Forensic imaging',
      'Custodian self-collection',
      'Validation mechanisms',
    ],
    'Search, Processing and Analysis': [
      'Search functionality',
      'Filter and sorting',
      'Duplicity elimination',
      'Data processing',
      'Cluster similar documents',
    ],
    'Review and Production': [
      'Review and Analysis',
      'Coding and annotations',
      'Process control',
      'Review workflow',
      'Audit trail',
    ],
    'Legal Hold Management': [
      'Legal hold tracking',
      'Legal hold notice management',
      'Receipt Acknowledgement',
      'Data custodian Management',
    ],
  },
  'Intellectual Property Management': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Ideation and Creation': [
      'Idea intake and management',
      'Innovation workflow management',
    ],
    'Lifecycle Management': [
      'Workflow management system (IP lifecycle)',
      'Renewal management',
      'Management of licensing agreements, contracts',
    ],
    'Search and Discovery': [
      'Database integration',
      'Advanced search capabilities',
      'Filter and sorting',
    ],
    'Storage and Repository': [
      'Centralized repository',
      'Categorization and tagging',
      'Accessibility control',
      'Access audit',
    ],
  },
  'Litigation Management and Analytics': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Matter Lifecycle Tracking': [
      'Task management',
      'Document organisation',
    ],
    'Court and Case Search': [
      'Automated case alerts',
      'Court docket systems',
      'Real-time updates',
    ],
    'Budget, Expense and Time Tracking': [
      'Budget Management',
      'Time tracking',
      'Approval Management',
      'Client invoicing',
      'Payment processing',
    ],
    'Litigation Docketing Features': [
      'Collaborative timeline tracking',
      'Court Rule tracking',
      'Court database integration',
      'Customized docket entries',
    ],
  },
  'Legal Workflow Automation': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Workflow Design and Configuration': [
      'Workflow designer',
      'Branching',
      'Task management',
      'Data routing',
      'Workflow templates',
    ],
    'Assignment Allotment and Tracking': [
      'Task creation',
      'Task allotment',
      'Task tracking',
    ],
    'Document Creation and Management': [
      'Document creation',
      'Templatization',
      'Indexing and tagging of documents',
      'Document search and retrieval',
    ],
    'Laws, Compliance and Regulatory Tracking': [
      'Sectoral differentiation',
      'Compliance applicability',
      'Law and compliance updates',
    ],
  },
} as const;


import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";


const categoryNames = Object.keys(categoryOptions) as Array<keyof typeof categoryOptions>;

// const allFeatures = Object.values(categoryOptions).flatMap(subcategories =>
//   Object.values(subcategories).flatMap(features => features)
// );
const allFeatures = Object.values(categoryOptions)
  .flatMap(subcategories => Object.values(subcategories).flatMap(features => features)) as [string, ...string[]];  // Cast as a tuple

console.log(allFeatures)
console.log(categoryNames)

const RfpFormSchema = z.object({
  userOrgType: z.enum(organizationTypes, {
    errorMap: () => ({ message: "Please select an organization type" }),
  }),
  userTeamSize: z.enum(teamSizes, {
    errorMap: () => ({ message: "Please select a team size" }),
  }),
  customisation: z.string().optional(),
  urgency: z.enum(urgencyOptions, {
    errorMap: () => ({ message: "Please select an urgency level" }),
  }),
  budgetUnit: z.enum(currencies, {
    errorMap: () => ({ message: "Please select a currency" }),
  }),
  // budgetMin: z.number({
  //   errorMap: () => ({ message: "Minimum budget must be a number" }),
  // }).min(1, "Minimum budget is required"),
  // budgetMax: z.number({
  //   errorMap: () => ({ message: "Maximum budget must be a number" }),
  // }).min(1, "Maximum budget is required"),
  budgetMin: z.string().min(1, "Minimum budget is required"),
  budgetMax: z.string().min(1, "Maximum budget is required"),
  // selectedCategory: z.enum(categoryNames, {
  //   errorMap: () => ({ message: "Please select a category and features" }),
  // }),
  // vendorSelectionType: z.enum(["byCategory", "byProduct"]),
  // selectedProducts: z.array(z.object({
  //   id: z.string(),
  //   name: z.string(),
  // })).optional(),
  // selectedFeatures: z.array(
  //   z.enum(allFeatures, {
  //     errorMap: () => ({ message: "Please select valid features" }),
  //   })
  // ).nonempty("Please select at least one feature"),
  // selectedFeatures: z.array(
  //   z.enum(allFeatures, {
  //     errorMap: () => ({ message: "Please select valid features" }),
  //   })
  // ).nonempty("Please select at least one feature"),
// });


selectedCategory: z.enum(categoryNames, {
  errorMap: () => ({ message: "Please select a category and features" }),
}),
vendorSelectionType: z.enum(["byCategory", "byProduct"]),
selectedProducts: z.array(z.object({
  id: z.string(),
  name: z.string(),
})).optional(),
selectedFeatures: z.array(
  z.enum(allFeatures, {
    errorMap: () => ({ message: "Please select valid features" }),
  })
).nonempty("Please select at least one feature"),
vendors: z.object({
  byProduct: z.object({
    selected: z.boolean(),
    products: z.array(z.object({
      productId: z.string(),
      productName: z.string(),
      vendorId: z.string(),
      vendorName: z.string(),
    })),
  }),
  byCategory: z.object({
    selected: z.boolean(),
    vendors: z.array(z.object({
      vendorId: z.string(),
      vendorName: z.string(),
    })),
  }),
}),
});

type FormData = z.infer<typeof RfpFormSchema>;

const RfpForm = ({ CustomerUserId, onClose }) => {
  const [userOrgType, setUserOrgType] = useState<(typeof organizationTypes)[number] | "">("");
  const [userTeamSize, setUserTeamSize] = useState<(typeof teamSizes)[number] | "">("");
  const [customisation, setCustomisation] = useState("");
  const [urgency, setUrgency] = useState<(typeof urgencyOptions)[number] | "">("");
  const [urgencyResponse, setUrgencyResponse] = useState([]);
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [budgetUnit, setBudgetUnit] = useState<(typeof currencies)[number] | "">("");
  const [budgetResponse, setBudgetResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryNames)[number] | "">("");
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [products, setProducts] = useState<any[]>([]);
  const [vendorSelectionType, setVendorSelectionType] = useState<"byCategory" | "byProduct" | "">("");
  const [selectedProducts, setSelectedProducts] = useState<Array<{ id: string; name: string }>>([]);

  
    const [vendors, setVendors] = useState({
      byProduct: {
        selected: false,
        products: []
      },
      byCategory: {
        selected: false,
        vendors: []
      }
    });
  
    
  
  
 
    

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!CustomerUserId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${CustomerUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();

        if (userData.success) {
          const { profile } = userData;
          setUserOrgType(profile.CompanyType || "");
          setUserTeamSize(profile.TeamSize || "");
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [CustomerUserId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!CustomerUserId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/rfpForm-allProducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const validateField = (field: keyof FormData, value: any): string => {
    try {
      RfpFormSchema.shape[field].parse(value);
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || `Invalid ${field}`;
      }
      return `Invalid ${field}`;
    }
  };

  const handleChange = (value: any, field: keyof FormData) => {
    switch (field) {
      case "userOrgType":
        setUserOrgType(value);
        break;
      case "userTeamSize":
        setUserTeamSize(value);
        break;
      case "customisation":
        setCustomisation(value);
        break;
      case "urgency":
        setUrgency(value);
        break;
      case "budgetUnit":
        setBudgetUnit(value);
        break;
      case "budgetMin":
        setBudgetMin(value);
        break;
      case "budgetMax":
        setBudgetMax(value);
        break;
      case "selectedCategory":
        setSelectedCategory(value);
        break;
      case "vendorSelectionType":
        setVendorSelectionType(value);
        break;
      // Add cases for other fields as needed
    }

    const errorMessage = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: errorMessage }));
  };

  const handleFeatureChange = (category, subcategory, feature) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category]?.[subcategory],
          [feature]: {
            selected: !prev[category]?.[subcategory]?.[feature]?.selected,
            responses: [],
          }
        }
      }
    }));
  };

  const toggleSubcategory = (subcategory) => {
    setExpandedSubcategories(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [subcategory]: !prev[subcategory]
    }));
  };

  // const handleVendorSelectionTypeChange = (value: "byCategory" | "byProduct") => {
  //   setVendorSelectionType(value);
  //   if (value === "byCategory") {
  //     const categoryVendors = getVendorsForCategory(selectedCategory);
  //     setVendors({
  //       byProduct: {
  //         selected: false,
  //         products: []
  //       },
  //       byCategory: {
  //         selected: true,
  //         vendors: categoryVendors
  //       }
  //     });
  //   } else {
  //     setVendors({
  //       byProduct: {
  //         selected: true,
  //         products: []
  //       },
  //       byCategory: {
  //         selected: false,
  //         vendors: []
  //       }
  //     });
  //   }
  //   setSelectedProducts([]);
  // };

  // const handleProductSelection = (product) => {
  //   setSelectedProducts(prev => {
  //     const isSelected = prev.some(p => p.id === product.id);
  //     if (isSelected) {
  //       return prev.filter(p => p.id !== product.id);
  //     } else {
  //       return [...prev, { id: product.id, name: product.name }];
  //     }
  //   });
  // };


  const handleVendorSelectionTypeChange = (value: "byCategory" | "byProduct") => {
    setVendorSelectionType(value);
    if (value === "byCategory") {
      const categoryVendors = getVendorsForCategory(selectedCategory);
      setVendors({
        byProduct: {
          selected: false,
          products: []
        },
        byCategory: {
          selected: true,
          vendors: categoryVendors
        }
      });
    } else {
      setVendors({
        byProduct: {
          selected: true,
          products: []
        },
        byCategory: {
          selected: false,
          vendors: []
        }
      });
    }
    setSelectedProducts([]);
  };
  
  // 3. Update the handleProductSelection function
  const handleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, { id: product.id, name: product.name }];
      }
    });
  
    setVendors(prev => ({
      ...prev,
      byProduct: {
        ...prev.byProduct,
        products: prev.byProduct.products.some(p => p.productId === product.id)
          ? prev.byProduct.products.filter(p => p.productId !== product.id)
          : [...prev.byProduct.products, {
              productId: product.id,
              productName: product.name,
              vendorId: product.company.userId,
              vendorName: product.company.companyName
            }]
      }
    }));
  };
  
  const getVendorsForCategory = (category) => {
    const vendorsSet = new Set();
    const vendorsArray = products
      .filter(product => product.category.includes(category))
      .map(product => ({
        vendorId: product.company.userId,
        vendorName: product.company.companyName
      }))
      .filter(vendor => {
        const vendorKey = `${vendor.vendorId}-${vendor.vendorName}`;
        if (!vendorsSet.has(vendorKey)) {
          vendorsSet.add(vendorKey);
          return true;
        }
        return false;
      });
    return vendorsArray;
  };

 
    
    
  
    
    
  const validateAllFields = (): boolean => {
    const formData: FormData = {
      userOrgType: userOrgType as (typeof organizationTypes)[number],
      userTeamSize: userTeamSize as (typeof teamSizes)[number],
      customisation,
      urgency: urgency as (typeof urgencyOptions)[number],
      budgetUnit: budgetUnit as (typeof currencies)[number],
      budgetMin,
      budgetMax,
      selectedCategory: selectedCategory as (typeof categoryNames)[number],
      vendorSelectionType: vendorSelectionType as "byCategory" | "byProduct",
      selectedProducts,
      selectedFeatures: Object.entries(selectedFeatures).flatMap(([category, subcategories]) =>
        Object.entries(subcategories).flatMap(([subcategory, features]) =>
          Object.entries(features)
            .filter(([_, { selected }]) => selected)
            .map(([feature]) => feature as (typeof allFeatures)[number])
        )
      ),
    };

    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    const formData = {
      userId: CustomerUserId,
      userOrgType,
      userTeamSize,
      customisation,
      urgency: {
        askedUrgency: urgency,
        urgencyResponse,
      },
      budget: {
        askedMin: budgetMin,
        askedMax: budgetMax,
        budgetUnit,
        budgetResponse,
      },
      selectedFeatures,
      vendorSelectionType,
      selectedProducts,
      vendors,
         
    };

    try {
      const response = await fetch('/api/submit-rfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "RFP submitted successfully!",
          variant: "success",
        });
        onClose();
      } else {
        setError(result.msg || "Failed to submit RFP.");
        toast({
          title: "Error",
          description: result.msg || "Failed to submit RFP.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting RFP:", error);
      setError("An error occurred while submitting the form. Please try again.");
      toast({
        title: "Error",
        description: "An error occurred while submitting the RFP.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <Button
          variant="ghost"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <CardHeader>
          <CardTitle className="text-2xl">Request for Proposal (RFP)</CardTitle>
          <CardDescription>
            Please fill in the details for your RFP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userOrgType">Organisation Type</Label>
                <Select value={userOrgType} onValueChange={(value) => handleChange(value, "userOrgType")}>
                  <SelectTrigger className={errors.userOrgType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.userOrgType && <p className="text-red-500 text-sm">{errors.userOrgType}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userTeamSize">Team Size</Label>
                <Select value={userTeamSize} onValueChange={(value) => handleChange(value, "userTeamSize")}>
                  <SelectTrigger className={errors.userTeamSize ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.userTeamSize && <p className="text-red-500 text-sm">{errors.userTeamSize}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={urgency} onValueChange={(value) => handleChange(value, "urgency")}>
                  <SelectTrigger className={errors.urgency ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency}</p>}
              </div>
              <div className="col-span-1 space-y-2">
                <Label htmlFor="budgetMin">Min Budget</Label>
                <Input
                  type="text"
                  id="budgetMin"
                  value={budgetMin}
                  onChange={(e) => handleChange(e.target.value, "budgetMin")}
                  className={`w-full ${errors.budgetMin ? 'border-red-500' : ''}`}
                />
                {errors.budgetMin && <p className="text-red-500 text-sm">{errors.budgetMin}</p>}
              </div>
              <div className="col-span-1 space-y-2">
                <Label htmlFor="budgetMax">Max Budget</Label>
                <Input
                  type="text"
                  id="budgetMax"
                  value={budgetMax}
                  onChange={(e) => handleChange(e.target.value, "budgetMax")}
                  className={`w-full ${errors.budgetMax ? 'border-red-500' : ''}`}
                />
                {errors.budgetMax && <p className="text-red-500 text-sm">{errors.budgetMax}</p>}
              </div>
              <div className="col-span-1 space-y-2">
                <Label htmlFor="budgetUnit">Currency</Label>
                <Select value={budgetUnit} onValueChange={(value) => handleChange(value, "budgetUnit")}>
                  <SelectTrigger className={errors.budgetUnit ? "border-red-500" : ""}>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budgetUnit && <p className="text-red-500 text-sm">{errors.budgetUnit}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customisation">
                Specific Customisation Requirements
              </Label>
              <Textarea
                id="customisation"
                value={customisation}
                onChange={(e) => handleChange(e.target.value, "customisation")}
                rows={3}
                className={`w-full ${errors.customisation ? 'border-red-500' : ''}`}
              />
              {errors.customisation && <p className="text-red-500 text-sm">{errors.customisation}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Features</h3>
                <Select value={selectedCategory} onValueChange={(value) => handleChange(value, "selectedCategory")}>
                  <SelectTrigger className={`w-[200px] ${errors.selectedCategory ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryNames.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.selectedCategory && <p className="text-red-500 text-sm">{errors.selectedCategory}</p>}

              {selectedCategory && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(categoryOptions[selectedCategory] || {}).map(([subcategory, features]) => (
                    <div key={subcategory} className="w-full">
                      <div className="border rounded-lg shadow-sm bg-white overflow-hidden h-[60px]">
                        <div 
                          className="p-3 cursor-pointer bg-gray-50 flex justify-between items-center h-full"
                          onClick={() => toggleSubcategory(subcategory)}
                        >
                          <h3 className="font-semibold text-sm truncate">{subcategory}</h3>
                          {expandedSubcategories[subcategory] ? 
                            <ChevronUp className="h-4 w-4 flex-shrink-0 text-gray-500" /> : 
                            <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          }
                        </div>
                      </div>
                      {expandedSubcategories[subcategory] && (
                        <div className="p-3 border border-t-0 rounded-b-lg">
                          {features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2 py-1">
                              <Checkbox
                                id={`${selectedCategory}-${subcategory}-${feature}`}
                                checked={selectedFeatures[selectedCategory]?.[subcategory]?.[feature]?.selected || false}
                                onCheckedChange={() => handleFeatureChange(selectedCategory, subcategory, feature)}
                              />
                              <Label 
                                htmlFor={`${selectedCategory}-${subcategory}-${feature}`}
                                className="text-xs text-gray-700"
                              >
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedCategory && (
              // <div className="space-y-4">
              //   <h3 className="text-lg font-semibold">Vendor Selection</h3>
              //   <RadioGroup value={vendorSelectionType} onValueChange={(value: "byCategory" | "byProduct") => handleVendorSelectionTypeChange(value)}>
              //     <div className="flex items-center space-x-2">
              //       <RadioGroupItem value="byCategory" id="byCategory" />
              //       <Label htmlFor="byCategory">Send to all vendors in the selected category</Label>
              //     </div>
              //     <div className="flex items-center space-x-2">
              //       <RadioGroupItem value="byProduct" id="byProduct" />
              //       <Label htmlFor="byProduct">Select specific products</Label>
              //     </div>
              //   </RadioGroup>
              //   {errors.vendorSelectionType && <p className="text-red-500 text-sm">{errors.vendorSelectionType}</p>}

              //   {vendorSelectionType === "byProduct" && (
              //     <div className="space-y-2">
              //       <Label>Select Products</Label>
              //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              //         {products
              //           .filter(product => product.category.includes(selectedCategory))
              //           .map(product => (
              //             <div key={product.id} className="flex items-center space-x-2">
              //               <Checkbox
              //                 id={`product-${product.id}`}
              //                 checked={selectedProducts.some(p => p.id === product.id)}
              //                 onCheckedChange={() => handleProductSelection(product)}
              //               />
              //               <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
              //             </div>
              //           ))
              //         }
              //       </div>
              //       {errors.selectedProducts && <p className="text-red-500 text-sm">{errors.selectedProducts}</p>}
              //     </div>
              //   )}
              // </div>
              <div className="space-y-4">
      <h3 className="text-lg font-semibold">Vendor Selection</h3>
      <RadioGroup 
        value={vendorSelectionType} 
        onValueChange={(value) => handleVendorSelectionTypeChange(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="byCategory" id="byCategory" />
          <Label htmlFor="byCategory">Send to all vendors in the selected category</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="byProduct" id="byProduct" />
          <Label htmlFor="byProduct">Select specific products</Label>
        </div>
      </RadioGroup>
      {errors.vendorSelectionType && (
        <p className="text-red-500 text-sm">{errors.vendorSelectionType}</p>
      )}

      {vendorSelectionType === "byProduct" && (
        <div className="space-y-2">
          <Label>Select Products</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(product => product.category.includes(selectedCategory))
              .map(product => (
                <div key={product.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`product-${product.id}`}
                    checked={selectedProducts.some(p => p.id === product.id)}
                    onCheckedChange={() => handleProductSelection(product)}
                  />
                  <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
                </div>
              ))
            }
          </div>
          {errors.selectedProducts && (
            <p className="text-red-500 text-sm">{errors.selectedProducts}</p>
          )}
        </div>
      )}
    </div>
            )}

            {error && <div className="text-red-500">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit RFP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RfpForm;
"use client"



// const categoryOptions = {
//     'Client Relationship Management': [
//       'Tracking and capture',
//       'Lead assignment',
//       'Follow Up',
//       'Profile Management',
//       'Appointment Management', 
//       'Task Tracking',
//       'Client Communication',
//       'Document creation',
//       'Document Templatization',
//       'Version control',
//       'Granular permissions',
//       'Event based notifications',
//       'Case schedules updates',
//       'Document changes alert',
//       'Budget Management',
//       'Time tracking',
//       'Approval Management',
//       'Multiple fee arrangement',
//       'Invoice creation',
//       'Automated Invoicing'
//     ],
//     'Governance, Risk and Compliance': [
//       'Policy creation',
//       'Centralized repository',
//       'Version control',
//       'Policy reviews',
//       'Policy monitoring',
//       'Incident reporting',
//       'Issue assessment',
//       'Action tracking',
//       'Response measuring',
//       'Sectoral relevance',
//       'Compliance applicability',
//       'Law and compliance updates'
//     ],
//     'Contract Lifecycle Management': [
//       'Contract Authoring',
//       'Text Editor',
//       'Contract Templatization',
//       'Format Customization',
//       'Version control',
//       'Document Storage',
//       'Multiple file formats',
//       'Categorization and Retrieval',
//       'Collaboration workspace',
//       'Comments and Annotations',
//       'Messaging and Emailing',
//       'Approval Management',
//       'Milestone tracking',
//       'Obligation tracking',
//       'Calendar Alerts',
//       'Clause Library',
//       'Text editor',
//       'Clause review and approval',
//       'Version control for clauses'
//     ],
//     'E-Signature': [
//       'Signature fields',
//       'Multiple signature styles',
//       'Data fields',
//       'Customization and labelling',
//       'Legal validity',
//       'Audit trail',
//       'Document recording and retention',
//       'Document creation',
//       'Version control',
//       'Granular permission for collaborators',
//       'Document uploads',
//       'Multiple file supports',
//       'OCR'
//     ],
//     'Legal Research': [
//       'Comprehensive case law databases',
//       'Jurisdictional filters',
//       'Citation search and validation',
//       'Historical case law archives',
//       'Statutes and regulations databases',
//       'Annotations and historical versions',
//       'Legislative tracking and updates',
//       'Secondary Sources',
//       'Legal treatises and commentaries',
//       'Journals and law reviews',
//       'International treaties and conventions',
//       'Search Functionality',
//       'Boolean and logical search',
//       'AI-powered search and chat',
//       'Document upload',
//       'Jurisdiction and court level',
//       'Date range and publication type',
//       'Relevance and citation frequency'
//     ],
//     'Document Management System': [
//       'Document creation',
//       'Text editor',
//       'Document Templatization',
//       'Central repository',
//       'Co-authoring features',
//       'Categorizing and tagging',
//       'Search capabilities',
//       'Filter and sorting',
//       'MFA (Multi factor Authentication)',
//       'Electronic signature capabilities',
//       'Customizable workflows',
//       'Internal work delegation',
//       'Task tracking'
//     ],
//     'E-billing and Invoicing': [
//       'Budget management',
//       'Time tracking',
//       'Multiple fee arrangements',
//       'Approval management',
//       'Central client repository',
//       'Client communications',
//       'Billing schedules',
//       'Payment processing',
//       'Customizable invoice templates',
//       'Automated invoice generation',
//       'Multiple currencies',
//       'Tax entries and calculations',
//       'Payment tracking and recording'
//     ],
//     'E-discovery': [
//       'Data source identification',
//       'Remote Collection',
//       'Network-based collection',
//       'Forensic imaging',
//       'Custodian self-collection',
//       'Validation mechanisms',
//       'Search functionality',
//       'Filter and sorting',
//       'Duplicity elimination',
//       'Data processing',
//       'Cluster similar documents',
//       'Review and Analysis',
//       'Coding and annotations',
//       'Process control',
//       'Review workflow',
//       'Audit trail',
//       'Legal hold tracking',
//       'Legal hold notice management',
//       'Receipt Acknowledgement',
//       'Data custodian Management'
//     ],
//     'Intellectual Property Management': [
//       'Idea intake and management',
//       'Innovation workflow management',
//       'Workflow management system (IP lifecycle)',
//       'Renewal management',
//       'Management of licensing agreements, contracts',
//       'Database integration',
//       'Advanced search capabilities',
//       'Filter and sorting',
//       'Centralized repository',
//       'Categorization and tagging',
//       'Accessibility control',
//       'Access audit'
//     ],
//     'Litigation Management and Analytics': [
//       'Task management',
//       'Document organisation',
//       'Automated case alerts',
//       'Court docket systems',
//       'Real-time updates',
//       'Budget Management',
//       'Time tracking',
//       'Approval Management',
//       'Client invoicing',
//       'Payment processing',
//       'Collaborative timeline tracking',
//       'Court Rule tracking',
//       'Court database integration',
//       'Customized docket entries'
//     ],
//     'Legal Workflow Automation': [
//       'Workflow designer',
//       'Branching',
//       'Task management',
//       'Data routing',
//       'Workflow templates',
//       'Task creation',
//       'Task allotment',
//       'Task tracking',
//       'Document creation',
//       'Templatization',
//       'Indexing and tagging of documents',
//       'Document search and retrieval',
//       'Sectoral differentiation',
//       'Compliance applicability',
//       'Law and compliance updates'
//     ],
//     'commonFeatures': [
//         'Messaging and Communication',
//         'Notification',
//         'Document sharing',
//         'Real time Document editing',
//         'Messaging and Communication',
//         'Notification',
//         'Document sharing',
//         'Real time Document editing',
//         'Analytics dashboard',
//         'Report generation',
//         'Dashboard Customization',
//         'Report Customization',
//         'Multiple User role',
//         'Granular Permission',
//         'Information access control',
//         'Role based access control'

//     ]
//   };
// import React, { useState } from 'react';
// import { 
//   Search, 
//   ArrowRight, 
//   Sparkles, 
//   Box, 
//   Activity, 
//   PieChart, 
//   TrendingUp, 
//   Star, 
//   FileText, 
//   Scale, 
//   GitCommit, 
//   Target, 
//   ShieldCheck 
// } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';

// const FeatureAnalysisDashboard = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFeature, setSelectedFeature] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

 

//   const allFeatures = Object.values(categoryOptions)
//     .flat()
//     .filter((feature, index, self) => self.indexOf(feature) === index);

//   const filteredFeatures = allFeatures.filter(feature => 
//     feature.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAnalyze = async () => {
//     if (!selectedFeature) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch('https://ai-backend-y6mq.onrender.com/feature_analysis/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           feature_name: selectedFeature,
//           category: "general"
//         }),
//       });
      
//       const data = await response.json();
//       setAnalysisResult(data.response);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const safeArray = (data, path) => {
//     return data && data[path] ? 
//       (Array.isArray(data[path]) ? data[path] : [data[path]]) 
//       : [];
//   };
  
//   const safeString = (data, path) => {
//     return data && data[path] ? data[path] : '';
//   };
  

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Hero Search Section */}
//         <div className="pt-12 pb-8 text-center space-y-6">
//           <div className="flex items-center justify-center space-x-3 mb-2">
//             <div className="p-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
//               <Sparkles className="w-6 h-6" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Feature Analysis
//             </h1>
//           </div>
//           <p className="text-gray-600 text-lg max-w-xl mx-auto">
//             Search and analyze any feature to discover market insights
//           </p>
//           <div className="relative z-50 max-w-2xl mx-auto group">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-white rounded-xl">
//               <input
//                 type="text"
//                 placeholder="Search features..."
//                 className="w-full px-8 py-5 rounded-xl text-lg bg-white border-2 border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-lg transition-all duration-300"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" size={24} />
//             </div>
//           </div>
//         </div>

//         {/* Features Selection Section */}
//         <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
//           <CardContent className="p-8 relative">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-indigo-100">
//                   <Star className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900">Available Features</h2>
//               </div>
//               <span className="text-sm text-gray-500">{filteredFeatures.length} features</span>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 max-h-[320px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
//               {filteredFeatures.map((feature, idx) => (
//                 <div 
//                   key={idx}
//                   className={`group flex items-center space-x-3 p-4 rounded-xl cursor-pointer transform transition-all duration-300 hover:shadow-md ${
//                     selectedFeature === feature 
//                       ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 translate-x-2' 
//                       : 'hover:bg-gray-50 hover:translate-x-1 border border-gray-100'
//                   }`}
//                   onClick={() => setSelectedFeature(feature)}
//                 >
//                   <Checkbox 
//                     checked={selectedFeature === feature}
//                     onCheckedChange={() => setSelectedFeature(feature)}
//                     className="border-2 border-indigo-200"
//                   />
//                   <span className="text-sm text-gray-700">{feature}</span>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={handleAnalyze}
//               disabled={!selectedFeature || loading}
//               className={`mt-6 w-full py-4 px-6 rounded-xl font-medium text-lg shadow-lg transform transition-all duration-300 ${
//                 selectedFeature 
//                   ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:-translate-y-0.5' 
//                   : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <Activity className="w-6 h-6 mr-3 animate-pulse" />
//                   Analyzing Feature...
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center">
//                   <TrendingUp className="w-6 h-6 mr-3" />
//                   Generate Analysis Report
//                 </span>
//               )}
//             </button>
//           </CardContent>
//         </Card>

     
//         <div className={`transform transition-all duration-500 ${loading || analysisResult ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-4'}`}>
//           <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
//             <CardContent className="p-8 relative">
//               {loading ? (
//                 <div className="min-h-[400px] flex flex-col items-center justify-center">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
//                   <p className="mt-6 text-lg text-gray-600">Analyzing your selected feature...</p>
//                   <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
//                 </div>
//               ) : analysisResult ? (
//                 <div className="space-y-8">
//                   {/* Description Section */}
//                   <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50">
//                     <div className="flex items-center gap-3 mb-4">
//                       <FileText className="w-6 h-6 text-indigo-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Feature Overview</h3>
//                     </div>
//                     <p className="text-gray-700 leading-relaxed">
//                       {safeString(analysisResult, 'Description of feature') || 
//                       safeString(analysisResult, 'description') || 
//                       'No description available'}
//                     </p>
//                   </div>

//                   {/* Scalability Section */}
//                   <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
//                     <div className="flex items-center gap-3 mb-4">
//                       <Scale className="w-6 h-6 text-blue-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Scalability Analysis</h3>
//                     </div>
//                     <p className="text-gray-700 leading-relaxed">
//                       {safeString(analysisResult, 'Overall scalability comment') || 
//                       safeString(analysisResult, 'scalability') || 
//                       'Scalability information not available'}
//                     </p>
//                   </div>

//                   {/* Process Lifecycle Impact */}
//                   <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
//                     <div className="flex items-center gap-3 mb-4">
//                       <GitCommit className="w-6 h-6 text-purple-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Process Lifecycle Impact</h3>
//                     </div>
//                     <p className="text-gray-700 leading-relaxed">
//                       {safeString(analysisResult, 'Impact on process lifecycle') || 
//                       safeString(analysisResult, 'process_impact') || 
//                       'Process lifecycle impact information not available'}
//                     </p>
//                   </div>

//                   {/* Top Insights Grid */}
//                   <div className="grid grid-cols-2 gap-6">
//                     {/* Top Sectors */}
//                     <div className="p-6 rounded-xl bg-indigo-50 border border-indigo-100">
//                       <div className="flex items-center gap-3 mb-4">
//                         <PieChart className="w-5 h-5 text-indigo-600" />
//                         <h4 className="text-lg font-semibold text-gray-900">Top Sectors</h4>
//                       </div>
//                       <div className="space-y-3">
//                         {safeArray(analysisResult, 'Top sectors/ Top practice areas')
//                         .concat(safeArray(analysisResult, 'top_sectors'))
//                         .filter(Boolean)
//                         .map((sector, idx) => (
//                           <div key={idx} className="flex items-center group">
//                             <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3 group-hover:scale-110 transition-transform"></div>
//                             <span className="text-gray-700">{sector}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Key Roles */}
//                     <div className="p-6 rounded-xl bg-violet-50 border border-violet-100">
//                       <div className="flex items-center gap-3 mb-4">
//                         <Star className="w-5 h-5 text-violet-600" />
//                         <h4 className="text-lg font-semibold text-gray-900">Key Roles</h4>
//                       </div>
//                       <div className="space-y-3">
//                         {safeArray(analysisResult, 'Key Beneficiary legal roles')
//                         .concat(safeArray(analysisResult, 'key_roles'))
//                         .filter(Boolean)
//                         .map((role, idx) => (
//                           <div key={idx} className="flex items-center group">
//                             <div className="w-2 h-2 rounded-full bg-violet-500 mr-3 group-hover:scale-110 transition-transform"></div>
//                             <span className="text-gray-700">{role}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Problem Statements */}
//                   <div className="p-6 rounded-xl bg-amber-50 border border-amber-100">
//                     <div className="flex items-center gap-3 mb-4">
//                       <Target className="w-6 h-6 text-amber-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Key Problem Statements</h3>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       {safeArray(analysisResult, 'Top problem statements')
//                       .concat(safeArray(analysisResult, 'problems'))
//                       .filter(Boolean)
//                       .map((problem, idx) => (
//                         <div key={idx} className="flex items-center group">
//                           <div className="w-2 h-2 rounded-full bg-amber-500 mr-3 group-hover:scale-110 transition-transform"></div>
//                           <span className="text-gray-700">{problem}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Market Analysis */}
//                   <div className="space-y-6">
//                     {/* Positive Trends */}
//                     <div className="p-6 rounded-xl bg-green-50 border border-green-100">
//                       <div className="flex items-center gap-3 mb-4">
//                         <TrendingUp className="w-6 h-6 text-green-600" />
//                         <h4 className="text-lg font-semibold text-green-800">Positive Market Trends</h4>
//                       </div>
//                       <div className="grid gap-4">
//                         {safeArray(analysisResult, 'Positive market trends')
//                         .concat(safeArray(analysisResult, 'positive_trends'))
//                         .filter(Boolean)
//                         .map((trend, idx) => (
//                           <div key={idx} className="flex items-start group">
//                             <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 group-hover:scale-110 transition-transform"></div>
//                             <p className="text-gray-700 leading-relaxed">{trend}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Negative Trends */}
//                     <div className="p-6 rounded-xl bg-red-50 border border-red-100">
//                       <div className="flex items-center gap-3 mb-4">
//                         <ShieldCheck className="w-6 h-6 text-red-600" />
//                         <h4 className="text-lg font-semibold text-red-800">Market Challenges</h4>
//                       </div>
//                       <div className="grid gap-4">
//                         {safeArray(analysisResult, 'Negative market trends')
//                         .concat(safeArray(analysisResult, 'negative_trends'))
//                         .filter(Boolean)
//                         .map((trend, idx) => (
//                           <div key={idx} className="flex items-start group">
//                             <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 group-hover:scale-110 transition-transform"></div>
//                             <p className="text-gray-700 leading-relaxed">{trend}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Market Viability */}
//                   <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50">
//                     <div className="flex items-center gap-3 mb-4">
//                       <Target className="w-6 h-6 text-indigo-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Market Viability</h3>
//                     </div>
//                     <p className="text-gray-700 leading-relaxed">
//                       {safeString(analysisResult, 'Market viability') || 
//                       safeString(analysisResult, 'market_viability') || 
//                       'Market viability information not available'}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
//                   <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
//                     <PieChart className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-gray-900 mb-3">Analysis Report</h3>
//                   <p className="text-gray-600 mb-8 max-w-md">
//                     Select a feature from above and generate an analysis to view detailed insights
//                   </p>
//                   <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
//                     <div className="p-4 rounded-xl bg-indigo-50 text-center">
//                       <PieChart className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
//                       <span className="text-sm text-gray-600">Market Sectors</span>
//                     </div>
//                     <div className="p-4 rounded-xl bg-purple-50 text-center">
//                       <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
//                       <span className="text-sm text-gray-600">Key Roles</span>
//                     </div>
//                     <div className="p-4 rounded-xl bg-pink-50 text-center">
//                       <TrendingUp className="w-8 h-8 text-pink-500 mx-auto mb-2" />
//                       <span className="text-sm text-gray-600">Market Trends</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureAnalysisDashboard;

// import React, { useState } from 'react';
// import { 
//   Search, 
//   Activity, 
//   PieChart, 
//   TrendingUp, 
//   Star, 
//   FileText, 
//   Scale, 
//   GitCommit, 
//   Target, 
//   ShieldCheck,
//   Sparkles
// } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const FeatureAnalysisDashboard = () => {
//   const [featureName, setFeatureName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

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

//   const handleAnalyze = async () => {
//     if (!featureName || !selectedCategory) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch('https://ai-backend-y6mq.onrender.com/feature_analysis/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           feature_name: featureName,
//           category: selectedCategory
//         }),
//       });
      
//       const data = await response.json();
//       setAnalysisResult(data.response);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const safeArray = (data, path) => {
//     return data && data[path] ? 
//       (Array.isArray(data[path]) ? data[path] : [data[path]]) 
//       : [];
//   };
  
//   const safeString = (data, path) => {
//     return data && data[path] ? data[path] : '';
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="pt-12 pb-8 text-center space-y-6">
//           <div className="flex flex-col items-center justify-center space-y-4">
//             <div className="p-3 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
//               <Sparkles className="w-8 h-8" />
//             </div>
//             <div className="space-y-3">
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Feature Analysis
//               </h1>
//               <p className="text-lg text-gray-600 max-w-xl mx-auto">
//                 Discover market insights for any legal tech feature
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Floating Input Section */}
//         <div className="relative z-10">
//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
//           <Card className="relative bg-white shadow-2xl rounded-2xl overflow-hidden">
//             <CardContent className="p-8 space-y-6">
//               {/* Feature Input */}
//               <div className="space-y-6">
//                 <div className="relative group">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
//                   <div className="relative bg-white rounded-xl p-1">
//                     <input
//                       type="text"
//                       placeholder="What feature would you like to analyze?"
//                       className="w-full px-8 py-6 text-xl rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-400"
//                       value={featureName}
//                       onChange={(e) => setFeatureName(e.target.value)}
//                     />
//                     <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" size={28} />
//                   </div>
//                 </div>

//                 {/* Category Tabs */}
//                 <div className="space-y-4">
//                   <h3 className="text-center text-lg text-gray-600 font-medium">Select Feature Category</h3>
//                   <div className="flex flex-wrap justify-center gap-3 p-2">
//                     {categories.map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => setSelectedCategory(category)}
//                         className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
//                           selectedCategory === category
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

//               {/* Analyze Button */}
//               <button
//                 onClick={handleAnalyze}
//                 disabled={!featureName || !selectedCategory || loading}
//                 className={`w-full py-4 px-6 rounded-xl font-medium text-lg shadow-lg transform transition-all duration-300 ${
//                   featureName && selectedCategory
//                     ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:-translate-y-0.5'
//                     : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <Activity className="w-6 h-6 mr-3 animate-pulse" />
//                     Analyzing Feature...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center">
//                     <TrendingUp className="w-6 h-6 mr-3" />
//                     Generate Analysis Report
//                   </span>
//                 )}
//               </button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Analysis Result Section - Keeping the existing visualization */}
//         <div className={`transform transition-all duration-500 ${loading || analysisResult ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-4'}`}>
//           <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
//             <CardContent className="p-8 relative">
//               {loading ? (
//                 <div className="min-h-[400px] flex flex-col items-center justify-center">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
//                   <p className="mt-6 text-lg text-gray-600">Analyzing your selected feature...</p>
//                   <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
//                 </div>
//               ) : analysisResult ? (
//                 <div className="space-y-8">
//                   {/* Feature Overview */}
//                   <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50">
//                     <div className="flex items-center gap-3 mb-4">
//                       <FileText className="w-6 h-6 text-indigo-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Feature Overview</h3>
//                     </div>
//                     <p className="text-gray-700 leading-relaxed">
//                       {safeString(analysisResult, 'Description of feature') || 
//                       safeString(analysisResult, 'description') || 
//                       'No description available'}
//                     </p>
//                   </div>

//                   {/* Rest of the visualization components remain the same... */}
//                   {/* ... */}

//                 </div>
//               ) : (
//                 <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
//                   <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
//                     <PieChart className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-gray-900 mb-3">Analysis Report</h3>
//                   <p className="text-gray-600 mb-8 max-w-md">
//                     Enter a feature name and select a category above to generate detailed insights
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureAnalysisDashboard;
import React, { useState } from 'react';
import { 
  Search, 
  Activity, 
  PieChart, 
  TrendingUp, 
  Star, 
  FileText, 
  Scale, 
  GitCommit, 
  Target, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeatureAnalysisDashboard = () => {
  const [featureName, setFeatureName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleAnalyze = async () => {
    if (!featureName || !selectedCategory) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://ai-backend-y6mq.onrender.com/feature_analysis/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feature_name: featureName,
          category: selectedCategory
        }),
      });
      
      const data = await response.json();
      setAnalysisResult(data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const safeArray = (data, path) => {
    return data && data[path] ? 
      (Array.isArray(data[path]) ? data[path] : [data[path]]) 
      : [];
  };
  
  const safeString = (data, path) => {
    return data && data[path] ? data[path] : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-block p-3 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300 mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Feature Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover market insights for any legal tech feature
          </p>
        </div>

        {/* Main Content Section with Overlapping Input */}
        <div className="relative">
          {/* Overlapping Input */}
          <div className="absolute -top-7 left-0 right-0 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your feature name..."
                    className="w-full px-8 py-5 text-lg bg-white rounded-xl shadow-xl border-0 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300"
                    value={featureName}
                    onChange={(e) => setFeatureName(e.target.value)}
                  />
                  <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
            <CardContent className="p-8 pt-16">
              {/* Category Selection */}
              <div className="mt-6 space-y-4">
                <h3 className="text-center text-lg text-gray-600 font-medium">Select Feature Category</h3>
                <div className="flex flex-wrap justify-center gap-3 p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-600 shadow-md hover:shadow-lg border border-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="mt-8">
                <button
                  onClick={handleAnalyze}
                  disabled={!featureName || !selectedCategory || loading}
                  className={`w-full py-4 px-6 rounded-xl font-medium text-lg shadow-lg transform transition-all duration-300 ${
                    featureName && selectedCategory
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Activity className="w-6 h-6 mr-3 animate-pulse" />
                      Analyzing Feature...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 mr-3" />
                      Generate Analysis Report
                    </span>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results Section */}
        {(loading || analysisResult) && (
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
                  <div className="space-y-8">
                    {/* Feature Overview */}
                    <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-6 h-6 text-indigo-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Feature Overview</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {safeString(analysisResult, 'Description of feature') || 
                        safeString(analysisResult, 'description') || 
                        'No description available'}
                      </p>
                    </div>

                    {/* Scalability Section */}
                    <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-3 mb-4">
                        <Scale className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Scalability Analysis</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {safeString(analysisResult, 'Overall scalability comment') || 
                        safeString(analysisResult, 'scalability') || 
                        'Scalability information not available'}
                      </p>
                    </div>

                    {/* Other sections as needed... */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureAnalysisDashboard;
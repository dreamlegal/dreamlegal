// // // // // "use client"
// // // // // import React, { useState } from 'react';
// // // // // import { 
// // // // //   ChevronRight,
// // // // //   FileText,
// // // // //   Settings,
// // // // //   DollarSign,
// // // // //   Package,
// // // // //   Target
// // // // // } from 'lucide-react';

// // // // // const FileItem = ({ name, content, icon: Icon = FileText }) => {
// // // // //   const [isExpanded, setIsExpanded] = useState(false);

// // // // //   return (
// // // // //     <div className="relative pl-8 group">
// // // // //       <div className="absolute left-0 top-6 w-8 h-px bg-slate-300"></div>

// // // // //       <div
// // // // //         className={`
// // // // //           border border-slate-200 rounded-lg overflow-hidden transition-all duration-300
// // // // //           ${isExpanded ? 'shadow-md' : 'hover:shadow-sm'}
// // // // //         `}
// // // // //       >
// // // // //         <div
// // // // //           className={`
// // // // //             flex items-center gap-3 cursor-pointer p-3
// // // // //             ${isExpanded ? 'bg-blue-100' : 'hover:bg-slate-50'}
// // // // //           `}
// // // // //           onClick={() => setIsExpanded(!isExpanded)}
// // // // //         >
// // // // //           <div className="p-2 rounded-lg bg-blue-50">
// // // // //             <Icon
// // // // //               className={`w-5 h-5 ${isExpanded ? 'text-blue-600' : 'text-slate-500'}`}
// // // // //               strokeWidth={1.5}
// // // // //             />
// // // // //           </div>
// // // // //           <span className={`text-sm font-semibold ${isExpanded ? 'text-blue-700' : 'text-slate-700'}`}>
// // // // //             {name}
// // // // //           </span>
// // // // //         </div>

// // // // //         {isExpanded && (
// // // // //           <div className="p-4 bg-white animate-slideDown">
// // // // //             <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const Solution = ({ data, isLast }) => {
// // // // //   const [isExpanded, setIsExpanded] = useState(true);
// // // // //   const priorityColor = data["Priority Level"].toLowerCase().includes("high") ? "blue" : "amber";

// // // // //   return (
// // // // //     <div className={`relative pl-8 ${!isLast ? 'mb-8' : ''}`}>
// // // // //       {!isLast && (
// // // // //         <div className="absolute left-0 top-12 bottom-0 w-px bg-slate-300"></div>
// // // // //       )}
// // // // //       <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md">
// // // // //         <div
// // // // //           className={`
// // // // //             flex items-center gap-3 cursor-pointer p-4
// // // // //             bg-gradient-to-r from-white via-slate-50 to-white hover:from-slate-50
// // // // //             ${isExpanded ? 'shadow-inner' : ''}
// // // // //           `}
// // // // //           onClick={() => setIsExpanded(!isExpanded)}
// // // // //         >
// // // // //           <ChevronRight
// // // // //             className={`w-5 h-5 text-${priorityColor}-500 transition-transform duration-300 
// // // // //               ${isExpanded ? 'rotate-90' : ''}`}
// // // // //             strokeWidth={1.5}
// // // // //           />
// // // // //           <div className={`p-2 rounded-lg bg-${priorityColor}-50`}>
// // // // //             <Settings
// // // // //               className={`w-5 h-5 text-${priorityColor}-600`}
// // // // //               strokeWidth={1.5}
// // // // //             />
// // // // //           </div>
// // // // //           <span className="text-slate-800 font-medium text-sm">{data.Solution}</span>
// // // // //           <span className={`
// // // // //             ml-auto text-xs font-medium px-3 py-1 rounded-full
// // // // //             bg-${priorityColor}-100 text-${priorityColor}-700
// // // // //           `}>
// // // // //             {data["Priority Level"]} Priority
// // // // //           </span>
// // // // //         </div>

// // // // //         {isExpanded && (
// // // // //           <div className="bg-white">
// // // // //             <div className="relative ml-12 p-4 space-y-4">
// // // // //               <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent"></div>

// // // // //               <FileItem
// // // // //                 name="Cost-Benefit Analysis"
// // // // //                 content={data["Cost-Benefit Analysis"]}
// // // // //                 icon={(props) => <DollarSign {...props} />}
// // // // //               />
// // // // //               <FileItem
// // // // //                 name="Resource Requirements"
// // // // //                 content={data["Resource Requirements"]}
// // // // //                 icon={(props) => <Package {...props} />}
// // // // //               />
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const FileStructureStrategy = ({ data }) => {
// // // // //   // Transform the data into the required format
// // // // //   const solutions = data?.Strategic_Recommendations?.["Detailed_Solutions"]?.map(solution => ({
// // // // //     "Solution": solution,
// // // // //     "Cost-Benefit Analysis": data?.Strategic_Recommendations?.["Cost-benefit_Analysis"] || "",
// // // // //     "Priority Level": data?.Strategic_Recommendations?.["Priority_Levels"] || "Medium",
// // // // //     "Resource Requirements": data?.Strategic_Recommendations?.["Resource_Requirements"] || ""
// // // // //   })) || [];

// // // // //   return (
// // // // //     <div className="p-8">
// // // // //       <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 ">
// // // // //         <div className="relative mb-8">
// // // // //           <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
// // // // //             <div className="p-3 bg-purple-50 rounded-lg">
// // // // //               <Target className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
// // // // //             </div>
// // // // //             <span className="text-lg font-semibold text-slate-900">Strategic Recommendations</span>
// // // // //           </div>

// // // // //           <div className="absolute left-8 top-[72px] h-4 w-px bg-slate-300"></div>
// // // // //         </div>

// // // // //         <div className="relative pl-8">
// // // // //           <div className="absolute left-0 top-0 bottom-12 w-px bg-gradient-to-b from-slate-300 via-slate-300 to-transparent"></div>

// // // // //           {solutions.map((solution, index) => (
// // // // //             <Solution
// // // // //               key={index}
// // // // //               data={solution}
// // // // //               isLast={index === solutions.length - 1}
// // // // //             />
// // // // //           ))}
// // // // //         </div>

// // // // //         <style>{`
// // // // //           @keyframes slideDown {
// // // // //             from {
// // // // //               opacity: 0;
// // // // //               transform: translateY(-10px);
// // // // //             }
// // // // //             to {
// // // // //               opacity: 1;
// // // // //               transform: translateY(0);
// // // // //             }
// // // // //           }

// // // // //           .animate-slideDown {
// // // // //             animation: slideDown 0.3s ease-out;
// // // // //           }
// // // // //         `}</style>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default FileStructureStrategy;

// // // // "use client"
// // // // import React, { useState } from 'react';
// // // // import { 
// // // //   ChevronRight,
// // // //   FileText,
// // // //   Settings,
// // // //   DollarSign,
// // // //   Package,
// // // //   Target
// // // // } from 'lucide-react';

// // // // const FileItem = ({ name, content, icon: Icon = FileText }) => {
// // // //   // Changed to true for default expanded state
// // // //   const [isExpanded, setIsExpanded] = useState(true);

// // // //   return (
// // // //     <div className="relative pl-8 group">
// // // //       <div className="absolute left-0 top-6 w-8 h-px bg-slate-300"></div>

// // // //       <div className="border border-slate-200 rounded-lg overflow-hidden shadow-md">
// // // //         <div
// // // //           className="flex items-center gap-3 cursor-pointer p-3 bg-blue-100"
// // // //           onClick={() => setIsExpanded(!isExpanded)}
// // // //         >
// // // //           <div className="p-2 rounded-lg bg-blue-50">
// // // //             <Icon
// // // //               className="w-5 h-5 text-blue-600"
// // // //               strokeWidth={1.5}
// // // //             />
// // // //           </div>
// // // //           <span className="text-sm font-semibold text-blue-700">
// // // //             {name}
// // // //           </span>
// // // //         </div>

// // // //         {isExpanded && (
// // // //           <div className="p-4 bg-white">
// // // //             <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const Solution = ({ data, isLast }) => {
// // // //   // Changed to true for default expanded state
// // // //   const [isExpanded, setIsExpanded] = useState(true);
// // // //   const priorityColor = data["Priority Level"].toLowerCase().includes("high") ? "blue" : "amber";

// // // //   return (
// // // //     <div className={`relative pl-8 ${!isLast ? 'mb-8' : ''}`}>
// // // //       {!isLast && (
// // // //         <div className="absolute left-0 top-12 bottom-0 w-px bg-slate-300"></div>
// // // //       )}
// // // //       <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md">
// // // //         <div
// // // //           className={`
// // // //             flex items-center gap-3 cursor-pointer p-4
// // // //             bg-gradient-to-r from-white via-slate-50 to-white
// // // //             shadow-inner
// // // //           `}
// // // //           onClick={() => setIsExpanded(!isExpanded)}
// // // //         >
// // // //           <ChevronRight
// // // //             className={`w-5 h-5 text-${priorityColor}-500 transition-transform duration-300 rotate-90`}
// // // //             strokeWidth={1.5}
// // // //           />
// // // //           <div className={`p-2 rounded-lg bg-${priorityColor}-50`}>
// // // //             <Settings
// // // //               className={`w-5 h-5 text-${priorityColor}-600`}
// // // //               strokeWidth={1.5}
// // // //             />
// // // //           </div>
// // // //           <span className="text-slate-800 font-medium text-sm">{data.Solution}</span>
// // // //           <span className={`
// // // //             ml-auto text-xs font-medium px-3 py-1 rounded-full
// // // //             bg-${priorityColor}-100 text-${priorityColor}-700
// // // //           `}>
// // // //             {data["Priority Level"]} Priority
// // // //           </span>
// // // //         </div>

// // // //         {isExpanded && (
// // // //           <div className="bg-white">
// // // //             <div className="relative ml-12 p-4 space-y-4">
// // // //               <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent"></div>

// // // //               <FileItem
// // // //                 name="Cost-Benefit Analysis"
// // // //                 content={data["Cost-Benefit Analysis"]}
// // // //                 icon={(props) => <DollarSign {...props} />}
// // // //               />
// // // //               <FileItem
// // // //                 name="Resource Requirements"
// // // //                 content={data["Resource Requirements"]}
// // // //                 icon={(props) => <Package {...props} />}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const FileStructureStrategy = ({ data }) => {
// // //   // const solutions = data?.Strategic_Recommendations?.["Detailed_Solutions"]?.map(solution => ({
// // //   //   "Solution": solution,
// // //   //   "Cost-Benefit Analysis": data?.Strategic_Recommendations?.["Cost-benefit_Analysis"] || "",
// // //   //   "Priority Level": data?.Strategic_Recommendations?.["Priority_Levels"] || "Medium",
// // //   //   "Resource Requirements": data?.Strategic_Recommendations?.["Resource_Requirements"] || ""
// // //   // })) || [];

// // // //   return (
// // // //     <div className="p-8">
// // // //       <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-slate-200">
// // // //         <div className="relative mb-8">
// // // //           <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
// // // //             <div className="p-3 bg-purple-50 rounded-lg">
// // // //               <Target className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
// // // //             </div>
// // // //             <span className="text-lg font-semibold text-slate-900">Strategic Recommendations</span>
// // // //           </div>

// // // //           <div className="absolute left-8 top-[72px] h-4 w-px bg-slate-300"></div>
// // // //         </div>

// // // //         <div className="relative pl-8">
// // // //           <div className="absolute left-0 top-0 bottom-12 w-px bg-gradient-to-b from-slate-300 via-slate-300 to-transparent"></div>

// // // //           {solutions.map((solution, index) => (
// // // //             <Solution
// // // //               key={index}
// // // //               data={solution}
// // // //               isLast={index === solutions.length - 1}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default FileStructureStrategy;

// // // "use client"
// // // import React from 'react';
// // // import { 
// // //   Target,
// // //   Lightbulb,
// // //   DollarSign,
// // //   Package,
// // //   ArrowRight
// // // } from 'lucide-react';

// // // const IconWrapper = ({ children, color }) => (
// // //   <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
// // //     {children}
// // //   </div>
// // // );

// // // const RecommendationCard = ({ icon: Icon, title, content, className = "" }) => (
// // //   <div className={`flex gap-4 p-6 rounded-xl border border-slate-200 bg-white ${className}`}>
// // //     <IconWrapper color="slate">
// // //       <Icon className="w-5 h-5" strokeWidth={1.5} />
// // //     </IconWrapper>
// // //     <div className="space-y-1">
// // //       <h3 className="font-medium text-sm text-slate-900">{title}</h3>
// // //       <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
// // //     </div>
// // //   </div>
// // // );

// // // const SolutionItem = ({ solution, index }) => (
// // //   <div className="flex items-start gap-4 p-4">
// // //     <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
// // //       {index + 1}
// // //     </div>
// // //     <p className="text-sm text-slate-700 leading-relaxed">{solution}</p>
// // //   </div>
// // // );

// // // const StrategicRecommendations = ({ data }) => {
// // //   const {
// // //     "Priority Levels": priorityLevel,
// // //     "Detailed Solutions": solutions,
// // //     "Cost-benefit Analysis": costBenefit,
// // //     "Resource Requirements": resources
// // //   } = data.Strategic_Recommendations;


// // //   return (
// // //     <div className="p-8 max-w-6xl mx-auto">
// // //       <div className="mb-8 flex items-center gap-4">
// // //         <IconWrapper color="purple">
// // //           <Target className="w-6 h-6" strokeWidth={1.5} />
// // //         </IconWrapper>
// // //         <h2 className="text-xl font-semibold text-slate-900">Strategic Recommendations</h2>
// // //       </div>

// // //       <div className="grid gap-6">
// // //         {/* Priority Level Section */}
// // //         <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6">
// // //           <div className="flex items-start gap-4 mb-4">
// // //             <IconWrapper color="blue">
// // //               <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
// // //             </IconWrapper>
// // //             <div>
// // //               <h3 className="font-medium text-blue-900 mb-2">Priority Level</h3>
// // //               <p className="text-sm text-blue-800">{priorityLevel}</p>
// // //             </div>
// // //           </div>

// // //           {/* Solutions */}
// // //           <div className="ml-10 mt-6 space-y-2">
// // //             {solutions.map((solution, index) => (
// // //               <SolutionItem key={index} solution={solution} index={index} />
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Analysis Grid */}
// // //         <div className="grid md:grid-cols-2 gap-6">
// // //           <RecommendationCard
// // //             icon={DollarSign}
// // //             title="Cost-Benefit Analysis"
// // //             content={costBenefit}
// // //           />
// // //           <RecommendationCard
// // //             icon={Package}
// // //             title="Resource Requirements"
// // //             content={resources}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Implementation Steps Indicator */}
// // //       <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
// // //         <span className="w-2 h-2 rounded-full bg-blue-400" />
// // //         <span>Planning</span>
// // //         <ArrowRight className="w-4 h-4" />
// // //         <span className="w-2 h-2 rounded-full bg-slate-300" />
// // //         <span>Implementation</span>
// // //         <ArrowRight className="w-4 h-4" />
// // //         <span className="w-2 h-2 rounded-full bg-slate-300" />
// // //         <span>Review</span>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default StrategicRecommendations;

// // "use client"
// // import React from 'react';
// // import { 
// //   Target,
// //   Lightbulb,
// //   DollarSign,
// //   Package,
// //   ArrowRight,
// //   Loader
// // } from 'lucide-react';

// // const IconWrapper = ({ children, color }) => (
// //   <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
// //     {children}
// //   </div>
// // );

// // const RecommendationCard = ({ icon: Icon, title, content = "Loading...", className = "" }) => (
// //   <div className={`flex gap-4 p-6 rounded-xl border border-slate-200 bg-white ${className}`}>
// //     <IconWrapper color="slate">
// //       <Icon className="w-5 h-5" strokeWidth={1.5} />
// //     </IconWrapper>
// //     <div className="space-y-1">
// //       <h3 className="font-medium text-sm text-slate-900">{title}</h3>
// //       <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
// //     </div>
// //   </div>
// // );

// // const SolutionItem = ({ solution, index }) => (
// //   <div className="flex items-start gap-4 p-4">
// //     <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
// //       {index + 1}
// //     </div>
// //     <p className="text-sm text-slate-700 leading-relaxed">{solution}</p>
// //   </div>
// // );

// // const LoadingState = () => (
// //   <div className="flex items-center justify-center p-8">
// //     <Loader className="w-6 h-6 text-blue-500 animate-spin" />
// //   </div>
// // );

// // const StrategicRecommendations = ({ data }) => {
// //   // Check if data exists and has the required structure
// //   if (!data?.Strategic_Recommendations) {
// //     return <LoadingState />;
// //   }

// //   const recommendations = data.Strategic_Recommendations;
  
// //   // Provide default values for all properties
// //   const {
// //     "Priority Levels": priorityLevel = "Priority level information loading...",
// //     "Detailed Solutions": solutions = [],
// //     "Cost-benefit Analysis": costBenefit = "Cost-benefit analysis loading...",
// //     "Resource Requirements": resources = "Resource requirements loading..."
// //   } = recommendations;

// //   return (
// //     <div className="p-8 max-w-6xl mx-auto">
// //       <div className="mb-8 flex items-center gap-4">
// //         <IconWrapper color="purple">
// //           <Target className="w-6 h-6" strokeWidth={1.5} />
// //         </IconWrapper>
// //         <h2 className="text-xl font-semibold text-slate-900">Strategic Recommendations</h2>
// //       </div>

// //       <div className="grid gap-6">
// //         {/* Priority Level Section */}
// //         <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6">
// //           <div className="flex items-start gap-4 mb-4">
// //             <IconWrapper color="blue">
// //               <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
// //             </IconWrapper>
// //             <div>
// //               <h3 className="font-medium text-blue-900 mb-2">Priority Level</h3>
// //               <p className="text-sm text-blue-800">{priorityLevel}</p>
// //             </div>
// //           </div>

// //           {/* Solutions */}
// //           <div className="ml-10 mt-6 space-y-2">
// //             {solutions && solutions.length > 0 ? (
// //               solutions.map((solution, index) => (
// //                 <SolutionItem key={index} solution={solution} index={index} />
// //               ))
// //             ) : (
// //               <p className="text-sm text-slate-500 italic">No solutions available</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Analysis Grid */}
// //         <div className="grid md:grid-cols-2 gap-6">
// //           <RecommendationCard
// //             icon={DollarSign}
// //             title="Cost-Benefit Analysis"
// //             content={costBenefit}
// //           />
// //           <RecommendationCard
// //             icon={Package}
// //             title="Resource Requirements"
// //             content={resources}
// //           />
// //         </div>
// //       </div>

// //       {/* Implementation Steps Indicator */}
// //       <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
// //         <span className="w-2 h-2 rounded-full bg-blue-400" />
// //         <span>Planning</span>
// //         <ArrowRight className="w-4 h-4" />
// //         <span className="w-2 h-2 rounded-full bg-slate-300" />
// //         <span>Implementation</span>
// //         <ArrowRight className="w-4 h-4" />
// //         <span className="w-2 h-2 rounded-full bg-slate-300" />
// //         <span>Review</span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StrategicRecommendations;.

// "use client"
// import React, { useEffect, useState } from 'react';
// import { 
//   Target,
//   Lightbulb,
//   DollarSign,
//   Package,
//   ArrowRight,
//   Loader,
//   CheckCircle2,
//   Share2
// } from 'lucide-react';

// const IconWrapper = ({ children, color = "slate", size = "small" }) => (
//   <div className={`
//     ${size === "large" ? "p-4" : "p-2"} 
//     rounded-xl bg-${color}-50 text-${color}-600
//     transition-all duration-300 hover:shadow-md hover:scale-105
//   `}>
//     {children}
//   </div>
// );

// const RecommendationCard = ({ icon: Icon, title, content = "Loading...", className = "" }) => (
//   <div className={`
//     flex gap-4 p-6 rounded-xl border border-slate-200 bg-white
//     transition-all duration-300 hover:shadow-lg hover:border-blue-200
//     ${className}
//   `}>
//     <IconWrapper>
//       <Icon className="w-5 h-5" strokeWidth={1.5} />
//     </IconWrapper>
//     <div className="space-y-1 flex-1">
//       <h3 className="font-medium text-sm text-slate-900">{title}</h3>
//       <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
//     </div>
//   </div>
// );

// const SolutionItem = ({ solution, index }) => (
//   <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200">
//     <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium
//       group-hover:bg-blue-200 transition-colors duration-200">
//       {index + 1}
//     </div>
//     <div className="flex-1">
//       <p className="text-sm text-slate-700 leading-relaxed group-hover:text-blue-700 transition-colors duration-200">
//         {solution}
//       </p>
//     </div>
//     <Share2 className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//   </div>
// );

// const LoadingState = () => (
//   <div className="min-h-[400px] flex flex-col items-center justify-center p-8 space-y-4">
//     <Loader className="w-8 h-8 text-blue-500 animate-spin" />
//     <p className="text-sm text-slate-500">Loading recommendations...</p>
//   </div>
// );




// // ... (Previous component definitions remain the same) ...

// const StrategicRecommendations = ({ data }) => {
//   const [recommendations, setRecommendations] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     console.log('Initial data received:', data);
    
//     if (!data) {
//       console.log('No data available');
//       setIsLoading(true);
//       return;
//     }

//     try {
//       // Direct assignment without destructuring first
//       const strategicRecs = data.Strategic_Recommendations;
//       console.log('Strategic Recommendations:', strategicRecs);

//       if (strategicRecs) {
//         setRecommendations({
//           "Priority Levels": strategicRecs["Priority Levels"] || "No priority information available",
//           "Detailed Solutions": strategicRecs["Detailed Solutions"] || [],
//           "Cost-benefit Analysis": strategicRecs["Cost-benefit Analysis"] || "No analysis available",
//           "Resource Requirements": strategicRecs["Resource Requirements"] || "No requirements specified"
//         });
//         setIsLoading(false);
//       } else {
//         console.log('No Strategic_Recommendations found in data');
//         setIsLoading(true);
//       }
//     } catch (error) {
//       console.error('Error processing data:', error);
//       setIsLoading(true);
//     }
//   }, [data]);

//   // Add debug logging for render cycle
//   console.log('Current state:', { recommendations, isLoading });

//   if (isLoading || !recommendations) {
//     return <LoadingState />;
//   }

//   // Destructure after we're sure we have data
//   const {
//     "Priority Levels": priorityLevel,
//     "Detailed Solutions": solutions,
//     "Cost-benefit Analysis": costBenefit,
//     "Resource Requirements": resources
//   } = recommendations;

//   console.log('Rendering with data:', { priorityLevel, solutions, costBenefit, resources });

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//         <IconWrapper color="purple" size="large">
//           <Target className="w-8 h-8" strokeWidth={1.5} />
//         </IconWrapper>
//         <div>
//           <h2 className="text-2xl font-semibold text-slate-900 mb-1">Strategic Recommendations</h2>
//           <p className="text-sm text-slate-500">Comprehensive analysis and action plans</p>
//         </div>
//         <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
//           <CheckCircle2 className="w-4 h-4 text-green-500" />
//           <span className="text-sm font-medium text-green-700">Updated Today</span>
//         </div>
//       </div>

//       <div className="grid gap-6">
//         {/* Priority Level Section */}
//         <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8">
//           <div className="flex items-start gap-4 mb-6">
//             <IconWrapper color="blue">
//               <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
//             </IconWrapper>
//             <div className="flex-1">
//               <h3 className="font-medium text-blue-900 mb-2">Priority Level</h3>
//               <p className="text-sm text-blue-800 leading-relaxed">{priorityLevel}</p>
//             </div>
//           </div>

//           {/* Solutions with null check */}
//           <div className="ml-12 space-y-1">
//             {Array.isArray(solutions) && solutions.length > 0 ? (
//               solutions.map((solution, index) => (
//                 <SolutionItem 
//                   key={index} 
//                   solution={solution} 
//                   index={index} 
//                 />
//               ))
//             ) : (
//               <p className="text-sm text-slate-500 italic">No solutions available at the moment</p>
//             )}
//           </div>
//         </div>

//         {/* Analysis Grid */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <RecommendationCard
//             icon={DollarSign}
//             title="Cost-Benefit Analysis"
//             content={costBenefit}
//           />
//           <RecommendationCard
//             icon={Package}
//             title="Resource Requirements"
//             content={resources}
//           />
//         </div>
//       </div>

//       {/* Implementation Steps Indicator */}
//       <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-full">
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-100" />
//           <span className="text-sm font-medium text-slate-700">Planning</span>
//         </div>
//         <ArrowRight className="w-4 h-4 text-slate-400" />
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
//           <span className="text-sm text-slate-500">Implementation</span>
//         </div>
//         <ArrowRight className="w-4 h-4 text-slate-400" />
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
//           <span className="text-sm text-slate-500">Review</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StrategicRecommendations;
// // const StrategicRecommendations = ({ data }) => {
// //   const [recommendations, setRecommendations] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const processData = () => {
// //       if (data?.Strategic_Recommendations) {
// //         setRecommendations(data.Strategic_Recommendations);
// //         setIsLoading(false);
// //       }
// //     };

// //     processData();
// //   }, [data]);

// //   if (isLoading || !recommendations) {
// //     return <LoadingState />;
// //   }

// //   const {
// //     "Priority Levels": priorityLevel = "Priority level information loading...",
// //     "Detailed Solutions": solutions = [],
// //     "Cost-benefit Analysis": costBenefit = "Cost-benefit analysis loading...",
// //     "Resource Requirements": resources = "Resource requirements loading..."
// //   } = recommendations;

// //   return (
// //     <div className="p-8 max-w-6xl mx-auto">
// //       {/* Header */}
// //       <div className="mb-8 flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
// //         <IconWrapper color="purple" size="large">
// //           <Target className="w-8 h-8" strokeWidth={1.5} />
// //         </IconWrapper>
// //         <div>
// //           <h2 className="text-2xl font-semibold text-slate-900 mb-1">Strategic Recommendations</h2>
// //           <p className="text-sm text-slate-500">Comprehensive analysis and action plans</p>
// //         </div>
// //         <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
// //           <CheckCircle2 className="w-4 h-4 text-green-500" />
// //           <span className="text-sm font-medium text-green-700">Updated Today</span>
// //         </div>
// //       </div>

// //       <div className="grid gap-6">
// //         {/* Priority Level Section */}
// //         <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8">
// //           <div className="flex items-start gap-4 mb-6">
// //             <IconWrapper color="blue">
// //               <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
// //             </IconWrapper>
// //             <div className="flex-1">
// //               <h3 className="font-medium text-blue-900 mb-2">Priority Level</h3>
// //               <p className="text-sm text-blue-800 leading-relaxed">{priorityLevel}</p>
// //             </div>
// //           </div>

// //           {/* Solutions */}
// //           <div className="ml-12 space-y-1">
// //             {solutions && solutions.length > 0 ? (
// //               solutions.map((solution, index) => (
// //                 <SolutionItem key={index} solution={solution} index={index} />
// //               ))
// //             ) : (
// //               <p className="text-sm text-slate-500 italic">No solutions available at the moment</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Analysis Grid */}
// //         <div className="grid md:grid-cols-2 gap-6">
// //           <RecommendationCard
// //             icon={DollarSign}
// //             title="Cost-Benefit Analysis"
// //             content={costBenefit}
// //           />
// //           <RecommendationCard
// //             icon={Package}
// //             title="Resource Requirements"
// //             content={resources}
// //           />
// //         </div>
// //       </div>

// //       {/* Implementation Steps Indicator */}
// //       <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-full">
// //         <div className="flex items-center gap-2">
// //           <span className="w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-100" />
// //           <span className="text-sm font-medium text-slate-700">Planning</span>
// //         </div>
// //         <ArrowRight className="w-4 h-4 text-slate-400" />
// //         <div className="flex items-center gap-2">
// //           <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
// //           <span className="text-sm text-slate-500">Implementation</span>
// //         </div>
// //         <ArrowRight className="w-4 h-4 text-slate-400" />
// //         <div className="flex items-center gap-2">
// //           <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
// //           <span className="text-sm text-slate-500">Review</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StrategicRecommendations;
"use client"
import React from 'react';
import { 
  Target,
  Lightbulb,
  DollarSign,
  Package,
  ArrowRight,
  CheckCircle2,
  Share2
} from 'lucide-react';

const IconWrapper = ({ children, color = "slate", size = "small" }) => (
  <div className={`
    ${size === "large" ? "p-4" : "p-2"} 
    rounded-xl bg-${color}-50 text-${color}-600
    transition-all duration-300 hover:shadow-md hover:scale-105
  `}>
    {children}
  </div>
);

const RecommendationCard = ({ icon: Icon, title, content = "Loading...", className = "" }) => (
  <div className={`
    flex gap-4 p-6 rounded-xl border border-slate-200 bg-white
    transition-all duration-300 hover:shadow-lg hover:border-blue-200
    ${className}
  `}>
    <IconWrapper>
      <Icon className="w-5 h-5" strokeWidth={1.5} />
    </IconWrapper>
    <div className="space-y-1 flex-1">
      <h3 className="font-medium text-sm text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
    </div>
  </div>
);

const SolutionItem = ({ solution, index }) => (
  <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200">
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium
      group-hover:bg-blue-200 transition-colors duration-200">
      {index + 1}
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-700 leading-relaxed group-hover:text-blue-700 transition-colors duration-200">
        {solution}
      </p>
    </div>
    {/* <Share2 className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
  </div>
);

const StrategicRecommendations = ({ data }) => {
  // Transform the data into the required format - similar to original code
  const solutions = data?.Strategic_Recommendations?.["Detailed_Solutions"]?.map(solution => ({
    "Solution": solution,
    "Cost-Benefit Analysis": data?.Strategic_Recommendations?.["Cost-benefit_Analysis"] || "",
    "Priority Level": data?.Strategic_Recommendations?.["Priority_Levels"] || "Medium",
    "Resource Requirements": data?.Strategic_Recommendations?.["Resource_Requirements"] || ""
  })) || [];

  // Extract the first solution's data for the main display
  const mainData = solutions[0] || {
    "Priority Level": data?.Strategic_Recommendations?.["Priority_Levels"] || "Priority information unavailable",
    "Cost-Benefit Analysis": data?.Strategic_Recommendations?.["Cost-benefit_Analysis"] || "Analysis not available",
    "Resource Requirements": data?.Strategic_Recommendations?.["Resource_Requirements"] || "Requirements not specified"
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <IconWrapper color="purple" size="large">
          <Target className="w-8 h-8" strokeWidth={1.5} />
        </IconWrapper>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Strategic Recommendations</h2>
          <p className="text-sm text-slate-500">Comprehensive analysis and action plans</p>
        </div>
        {/* <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-700">Updated Today</span>
        </div> */}
      </div>

      <div className="grid gap-6">
        {/* Priority Level Section */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8">
          <div className="flex items-start gap-4 mb-6">
            <IconWrapper color="blue">
              <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
            </IconWrapper>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 mb-2">Priority Level</h3>
              <p className="text-sm text-blue-800 leading-relaxed">{mainData["Priority Level"]}</p>
            </div>
          </div>

          {/* Solutions */}
          <div className="ml-12 space-y-1">
            {data?.Strategic_Recommendations?.["Detailed_Solutions"]?.map((solution, index) => (
              <SolutionItem 
                key={index} 
                solution={solution} 
                index={index} 
              />
            )) || (
              <p className="text-sm text-slate-500 italic">No solutions available at the moment</p>
            )}
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <RecommendationCard
            icon={DollarSign}
            title="Cost-Benefit Analysis"
            content={mainData["Cost-Benefit Analysis"]}
          />
          <RecommendationCard
            icon={Package}
            title="Resource Requirements"
            content={mainData["Resource Requirements"]}
          />
        </div>
      </div>

      {/* Implementation Steps Indicator */}
      {/* <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-full">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-100" />
          <span className="text-sm font-medium text-slate-700">Planning</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
          <span className="text-sm text-slate-500">Implementation</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
          <span className="text-sm text-slate-500">Review</span>
        </div>
      </div> */}
    </div>
  );
};

export default StrategicRecommendations;
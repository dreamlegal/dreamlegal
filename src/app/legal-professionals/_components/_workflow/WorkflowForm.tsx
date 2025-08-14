// "use client";
// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { ChevronUp, ChevronDown, X, Plus, GripVertical } from "lucide-react";
// // import { useRouter } from "next/router";

// // import { useRouter } from 'next/router';
// import { useRouter } from "next/navigation";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { toast } from "@/components/ui/use-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// import {
//   Code2,
//   Megaphone,
//   HeadphonesIcon,
//   BarChart2,
//   Briefcase,
//   PenTool,
//   ArrowRight,
//   ArrowLeft,
//   Gavel,
//   Settings,
//   BookOpen,
//   Lightbulb,
//   Shield,
//   Search,
//   DollarSign,
//   FileText,
//   PlusCircle,
//   PlusSquare,
//   CheckCircle
// } from "lucide-react";





// const CustomSlider = ({ value, onChange, label, min = 0, max = 5 }) => {
//   // Enhanced gradient function with smoother color transition
//   const getGradient = (value, max = 5) => {
//     const percentage = (value / max) * 100;
//     return `linear-gradient(to right, 
//       #3b82f6 0%,
//       #60a5fa ${percentage}%,
//       #e2e8f0 ${percentage}%,
//       #e2e8f0 100%
//     )`;
//   };

//   const labels = ['None', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];

//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between items-baseline">
//         <Label className="text-sm font-medium">{label}</Label>
//         <span className="text-lg font-semibold text-blue-600">
//           {value.toFixed(1)}
//         </span>
//       </div>

//       <div className="text-center">
//         <span className="text-xs font-medium text-gray-600">
//           {labels[value]}
//         </span>
//       </div>

//       <div className="relative py-4">
//         {/* Slider Input */}
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={value}
//           onChange={(e) => onChange(Number(e.target.value))}
//           className="absolute top-4 w-full h-2 appearance-none bg-transparent cursor-pointer z-20"
//           style={{
//             WebkitAppearance: 'none',
//             MozAppearance: 'none'
//           }}
//         />
        
//         {/* Custom Track */}
//         <div 
//           className="absolute top-4 w-full h-2 rounded-lg pointer-events-none"
//           style={{
//             background: getGradient(value),
//           }}
//         />

//         {/* Step Indicators */}
//         <div className="flex justify-between px-1 mt-8">
//           {[0, 1, 2, 3, 4, 5].map((step) => (
//             <button
//               key={step}
//               onClick={() => onChange(step)}
//               className="group relative flex flex-col items-center"
//             >
//               <div 
//                 className={`
//                   w-3 h-3 rounded-full transition-all duration-150
//                   ${value === step 
//                     ? 'bg-blue-600 scale-125' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                   }
//                 `}
//               />
//               <span 
//                 className={`
//                   mt-2 text-xs font-medium transition-colors duration-150
//                   ${value === step 
//                     ? 'text-blue-600' 
//                     : 'text-gray-500 hover:text-gray-700'
//                   }
//                 `}
//               >
//                 {step}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SortableStep = ({
//   step,
//   index,
//   onRemove,
//   onUpdateStep,
//   categoryName,
//   teamRoles,
//   stepsMap
// }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: step.step });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   const toggleTeamRole = (role) => {
//     const currentRoles = step.teamRoles || [];
//     const newRoles = currentRoles.includes(role)
//       ? currentRoles.filter((r) => r !== role)
//       : [...currentRoles, role];

//     onUpdateStep(index, { ...step, teamRoles: newRoles });
//   };

//   const toggleSubstep = (substep) => {
//     const currentSubsteps = step.selectedSteps || [];
//     const newSubsteps = currentSubsteps.includes(substep)
//       ? currentSubsteps.filter((s) => s !== substep)
//       : [...currentSubsteps, substep];
  
//     onUpdateStep(index, {
//       ...step,
//       selectedSteps: newSubsteps
//     });
//   };
 
//   const handleAddCustomSubstep = (customSubstep) => {
//     const trimmedStep = customSubstep.trim();
//     if (trimmedStep) {
//       const currentSubsteps = step.selectedSteps || [];
//       if (!currentSubsteps.includes(trimmedStep)) {
//         onUpdateStep(index, {
//           ...step,
//           selectedSteps: [...currentSubsteps, trimmedStep]
//         });
//       }
//     }
//   };

//   // Get substeps for the current stage
//   const currentStageSubsteps = stepsMap[categoryName]?.substeps[step.step] || [];

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="bg-secondary p-6 rounded-lg space-y-6 mb-3 shadow-sm"
//     >
//       <div className="flex items-center space-x-4">
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-move hover:opacity-70 transition-opacity"
//         >
//           <GripVertical className="h-5 w-5 text-gray-500" />
//         </div>
//         <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-medium">
//           {index + 1}
//         </span>
//         <span className="flex-1 font-medium text-foreground">{step.step}</span>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           className="hover:bg-destructive/10 hover:text-destructive transition-colors"
//           onClick={() => onRemove(index)}
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="space-y-8">
//         {/* Repetitiveness Slider */}
//         <CustomSlider
//           label="Repetitiveness"
//           value={step.repetitiveness}
//           onChange={(value) => onUpdateStep(index, { ...step, repetitiveness: value })}
//         />

//         {/* Exhaustion Rate Slider */}
//         <CustomSlider
//           label="Exhaustion Rate"
//           value={step.exhaustionScale}
//           onChange={(value) => onUpdateStep(index, { ...step, exhaustionScale: value })}
//         />

//         {/* Team Roles Section */}
//         <div className="space-y-2">
//           <Label className="text-sm font-medium">Team Roles</Label>
//           <div className="flex flex-wrap gap-2">
//             {teamRoles.map((role) => {
//               const isSelected = (step.teamRoles || []).includes(role);
//               return (
//                 <Button
//                   key={role}
//                   type="button"
//                   variant={isSelected ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => toggleTeamRole(role)}
//                   className={`relative group ${
//                     isSelected
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   {role}
//                   {isSelected && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleTeamRole(role);
//                       }}
//                       className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   )}
//                 </Button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Steps Section */}
//         <div className="space-y-2">
//           <Label className="text-sm font-medium">Steps</Label>
//           <div className="flex flex-wrap gap-2">
//             {currentStageSubsteps.map((substep) => {
//               const isSelected = (step.selectedSteps || []).includes(substep);
//               return (
//                 <Button
//                   key={substep}
//                   type="button"
//                   variant={isSelected ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => toggleSubstep(substep)}
//                   className={`relative group ${
//                     isSelected
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   {substep}
//                   {isSelected && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleSubstep(substep);
//                       }}
//                       className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   )}
//                 </Button>
//               );
//             })}
//           </div>

//           {/* Selected Custom Steps */}
//           {step.selectedSteps?.filter(substep => !currentStageSubsteps.includes(substep)).length > 0 && (
//             <div className="mt-2">
//               <Label className="text-sm font-medium">Custom Action Items</Label>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {step.selectedSteps
//                   .filter(substep => !currentStageSubsteps.includes(substep))
//                   .map((substep) => (
//                     <Button
//                       key={substep}
//                       type="button"
//                       variant="default"
//                       size="sm"
//                       className="relative group bg-blue-600 text-white hover:bg-blue-700"
//                     >
//                       {substep}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleSubstep(substep);
//                         }}
//                         className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </Button>
//                   ))}
//               </div>
//             </div>
//           )}

//           {/* Custom substep input */}
//           <div className="flex space-x-2 mt-2">
//             <Input
//               id={`custom-input-${step.step}`}
//               placeholder="Add custom action item"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && e.target.value.trim()) {
//                   e.preventDefault();
//                   handleAddCustomSubstep(e.target.value);
//                   e.target.value = "";
//                 }
//               }}
//             />
//             <Button
//               type="button"
//               onClick={() => {
//                 const input = document.getElementById(`custom-input-${step.step}`);
//                 if (input && input.value.trim()) {
//                   handleAddCustomSubstep(input.value);
//                   input.value = "";
//                 }
//               }}
//               className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               <Plus className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// import { Loader2 } from 'lucide-react';

// type WorkflowCategory = 
//   | "Client Management"
//   | "Contract Management"
//   | "E-Signature"
//   | "Document Management"
//   | "Billing and Invoicing"
//   | "Discovery"
//   | "Compliance Management"
//   | "IP Management"
//   | "Legal Research"
//   | "Workflow Automation"
//   | "Litigation Management";

// interface LoadingProps {
//   isLoading: boolean;
//   category: WorkflowCategory;
// }

// const categoryMessages: Record<WorkflowCategory, string[]> = {
//   "Client Management": [
//     "Strengthening client bonds—one legal insight at a time.",
//     "Building trust with your clients through smarter workflows.",
//     "Optimizing your client interactions for better outcomes."
//   ],
//   "Contract Management": [
//     "Tracking contracts from start to signature—your workflow is in good hands!",
//     "Mapping the lifecycle of your contracts for better control.",
//     "Transforming contract bottlenecks into streamlined solutions!"
//   ],
//   "E-Signature": [
//     "Digitizing your approvals—every signature counts!",
//     "Sealing the deal with smoother e-signature workflows.",
//     "Simplifying document execution with a touch of technology."
//   ],
//   "Document Management": [
//     "Organizing your documents for a seamless legal journey...",
//     "Turning your document chaos into an efficient repository!",
//     "Scanning your document trail to unlock smarter storage solutions."
//   ],
//   "Billing and Invoicing": [
//     "Streamlining legal billing—because time is money!",
//     "Ensuring every bill tells a clear, concise story.",
//     "Simplifying your invoicing for greater financial clarity."
//   ],
//   "Discovery": [
//     "Uncovering the facts—your data search starts here.",
//     "Sifting through digital evidence to reveal actionable insights.",
//     "Bringing clarity to your discovery process with precision tools."
//   ],
//   "Compliance Management": [
//     "Charting your compliance roadmap for a risk-free future.",
//     "Bringing order to your governance and compliance frameworks.",
//     "Ensuring your workflows stay risk-aware and regulation-ready."
//   ],
//   "IP Management": [
//     "Protecting your intellectual assets with smart workflows.",
//     "Mapping the lifecycle of your IP for maximum value.",
//     "Streamlining the management of your creative and legal properties."
//   ],
//   "Legal Research": [
//     "Diving deep into legal knowledge—your insights are on the way!",
//     "Curating the legal answers you need to make informed decisions.",
//     "Bringing clarity to your research with precision tools."
//   ],
//   "Workflow Automation": [
//     "Automating the mundane—your legal team deserves better!",
//     "Simplifying workflows for faster, smarter outcomes.",
//     "Unlocking efficiency with every automated task."
//   ],
//   "Litigation Management": [
//     "Turning case complexities into manageable workflows.",
//     "Your litigation strategy is being streamlined—just a moment!",
//     "Bringing data-driven insights to your litigation approach."
//   ]
// };

// const commonMessages = [
//   "Hold tight! Your legal workflow blueprint is coming to life.",
//   "Mapping out the flow of your legal team—one step at a time.",
//   "Your custom workflow insights are being crafted with precision!",
//   "Transforming data into actionable insights—just a moment more!",
//   "Every legal step counts, and we're capturing them all for you.",
//   "Hang on! We're turning your workflow pain points into progress paths.",
//   "From data to direction: Your personalized legal workflow is almost ready.",
//   "We're piecing together your legal efficiency puzzle—stay tuned!"
// ];

// const WorkflowLoading: React.FC<LoadingProps> = ({ isLoading, category }) => {
//   const [progress, setProgress] = useState(0);
//   const [currentMessage, setCurrentMessage] = useState('');

//   useEffect(() => {
//     if (isLoading) {
//       // Progress interval
//       const progressInterval = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(progressInterval);
//             return 100;
//           }
//           return prev + 1;
//         });
//       }, 50);

//       // Message interval
//       const messageInterval = setInterval(() => {
//         const messages = progress < 30 ? categoryMessages[category] 
//           : progress < 70 ? commonMessages 
//           : categoryMessages[category];
        
//         const randomIndex = Math.floor(Math.random() * messages.length);
//         setCurrentMessage(messages[randomIndex]);
//       }, 2000);

//       return () => {
//         clearInterval(progressInterval);
//         clearInterval(messageInterval);
//       };
//     } else {
//       setProgress(0);
//       setCurrentMessage('');
//     }
//   }, [isLoading, category, progress]);

//   return (
//     <AnimatePresence>
//       {isLoading && (
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 100, opacity: 0 }}
//           className="fixed bottom-6 right-6 max-w-sm bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 z-50"
//         >
//           <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
//           <div className="flex-1 min-w-[200px]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentMessage}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="text-sm text-gray-600 mb-2"
//               >
//                 {currentMessage}
//               </motion.div>
//             </AnimatePresence>
//             <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 className="h-full bg-blue-500 rounded-full"
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };



// const CustomNotification = ({ notification, position = "bottom-right" }) => {
//   const positions = {
//     "bottom-right": "bottom-24 right-6",
//     "top-right": "top-6 right-6",
//     "top-center": "top-6 left-1/2 -translate-x-1/2",
//     "bottom-center": "bottom-6 left-1/2 -translate-x-1/2"
//   };

//   return (
//     <AnimatePresence>
//       {notification && (
//         <motion.div
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: 100, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 25 }}
//           className={`fixed ${positions[position]} z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg`}
//           style={{
//             background: notification.success ? 'rgba(52, 211, 153, 0.95)' : 'rgba(239, 68, 68, 0.95)',
//             backdropFilter: 'blur(8px)',
//           }}
//         >
//           {notification.success ? (
//             <CheckCircle className="w-5 h-5 text-white" />
//           ) : (
//             <CheckCircle className="w-5 h-5 text-white" />
//           )}
//           <span className="text-white text-sm font-medium">
//             {notification.message}
//           </span>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };


// import { useAuth } from '@/context/authContext';


// const WorkflowForm = () => {
//   // forms  bookmycall and rfp
//   // const CustomerUserId =
//   //   typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   const { userId, userType } = useAuth();

//   const CustomerUserId = userId;
//   console.log(userId, userType)
//   console.log(CustomerUserId);
//   // const router = useRouter();

//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [formData, setFormData] = useState({
//     userOrgType: "",
//     userTeamSize: "",
//     catOfWorkFlow: "",
//     teamRoles: [],
//     toolsUsed: [],
//     steps: [],
//   });

//   //  user data fetching
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
//           const { profile } = userData;

//           // Use setFormData with the spread operator to update state immutably
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             userOrgType: profile.CompanyType || "",
//             userTeamSize: profile.TeamSize || "",
//           }));
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

//   // data
//   const orgTypes = [
//     "Individual Practitioner",
//     "Law Firms",
//     "Government Departments",
//     "Startups",
//     "Enterprises",
//     "Judiciary",
//     "In-House Counsels",
//   ];

//   const teamSizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

//   const workflowCategories = [
//     "Client Management",
//     "Contract Management",
//     "E-Signature",
//     "Document Management",
//     "Billing and Invoicing",
//     "Discovery",
//     "Compliance Management",
//     "IP Management",
//     "Legal Research",
//     "Workflow Automation",
//     "Litigation Management",
//   ];

//   const teamRolesMap = {
//     "Individual Practitioner": [
//       "Lawyer",
//       "Junior Lawyer",
//       "Paralegal",
//       "Externally Associated Counsel",
//       "Intern",
//       "Administrative Support",
//     ],
//     "Law Firms": [
//       "Managing Partner",
//       "Senior Partner",
//       "Partner",
//       "Principal Associate",
//       "Senior Associate",
//       "Associate",
//       "Junior Associate",
//       "Paralegal",
//       "Company Secretary",
//       "Case Manager/Clerk",
//       "Administrative Support",
//       "Intern",
//     ],
//     "Government Departments": [
//       "Chief Legal Officer",
//       "Compliance Officer",
//       "Legal Analyst",
//       "Policy Advisor",
//       "Administrative Officer",
//       "Clerk",
//       "Intern",
//       "Outsourced Lawyer/Firm",
//     ],
//     Startups: [
//       "Legal Head",
//       "Compliance Officer",
//       "Legal Associate",
//       "Contract Manager",
//       "Operations Manager",
//       "Outsourced Lawyer/Firm",
//     ],
//     Enterprises: [
//       "General Counsel",
//       "Legal President",
//       "Legal Vice President",
//       "Legal Director",
//       "Legal Manager",
//       "Legal Operations Manager",
//       "Contract Specialist",
//       "Compliance Manager",
//       "Outsourced Lawyer/Firm",
//     ],
//     Judiciary: [
//       "Judge",
//       "Court Clerk",
//       "Judicial Assistant",
//       "Research Attorney",
//       "Case Administrator",
//     ],
//     "In-House Counsels": [
//       "General Counsel",
//       "Legal Counsel",
//       "Compliance Officer",
//       "Legal Operations Manager",
//       "Paralegal/Legal Assistant",
//     ],
//   };

//   const toolsMap = {
//     "Client Management": [
//       "Client Intake Software",
//       "Case Management Software",
//       "Communication Platforms",
//       "Client Portal Software",
//       "Relationship Tracking Tools",
//     ],
//     "Contract Management": [
//       "Contract Drafting Tools",
//       "Contract Review Platforms",
//       "Contract Repository",
//       "Approval Workflow Software",
//       "Contract Analytics Tools",
//       "Lifecycle Management Software",
//     ],
//     "E-Signature": [
//       "Digital Signature Software",
//       "Authentication Tools",
//       "Secure Document Sharing",
//       "Signature Tracking Software",
//       "Compliance-Based E-Sign Solutions",
//     ],
//     "Document Management": [
//       "Document Storage Solutions",
//       "Version Control Software",
//       "Access Control Tools",
//       "Document Sharing Platforms",
//       "Document Search and Retrieval",
//     ],
//     "Billing and Invoicing": [
//       "Billing Management Software",
//       "Invoice Generation Tools",
//       "Payment Tracking Systems",
//       "Expense Management Tools",
//       "Automated Billing Workflows",
//     ],
//     Discovery: [
//       "Document Review Tools",
//       "Data Collection Software",
//       "Redaction Tools",
//       "Data Processing Tools",
//       "Legal Hold Management Software",
//     ],
//     "Compliance Management": [
//       "Compliance Management Tools",
//       "Risk Assessment Software",
//       "Policy Management Tools",
//       "Audit Management Solutions",
//       "Incident Management Tools",
//     ],
//     "IP Management": [
//       "IP Portfolio Management Software",
//       "Patent and Trademark Management Tools",
//       "IP Search and Monitoring Tools",
//       "IP Filing Software",
//       "Licensing and Royalty Management",
//     ],
//     "Legal Research": [
//       "Legal Database Access Tools",
//       "Case Law Research Platforms",
//       "Statutory and Regulatory Databases",
//       "AI-Powered Research Tools",
//       "Citation Management Tools",
//     ],
//     "Workflow Automation": [
//       "Workflow Design Software",
//       "Task Automation Tools",
//       "Workflow Management Platforms",
//       "Approval Workflow Software",
//       "Document Automation Tools",
//     ],
//     "Litigation Management": [
//       "Case Tracking Tools",
//       "Analytics for Litigation Trends",
//       "Court Docket Management",
//       "Case Data Analytics",
//       "Outcome Prediction Software",
//     ],
//   };

//   // Team Roles handlers
//   const handleAddTeamRole = (role) => {
//     if (!formData.teamRoles.find((r) => r.role === role)) {
//       const newRole = {
//         role,
//         count: 1,
//       };
//       setFormData((prev) => ({
//         ...prev,
//         teamRoles: [...prev.teamRoles, newRole],
//       }));
//     }
//   };

//   const handleAddCustomTeamRole = (customRole) => {
//     if (
//       customRole.trim() &&
//       !formData.teamRoles.find((r) => r.role === customRole.trim())
//     ) {
//       handleAddTeamRole(customRole.trim());
//     }
//   };

//   const handleUpdateRoleCount = (role, count) => {
//     setFormData((prev) => ({
//       ...prev,
//       teamRoles: prev.teamRoles.map((r) =>
//         r.role === role ? { ...r, count: parseInt(count) || 0 } : r
//       ),
//     }));
//   };

//   const handleRemoveRole = (roleToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       teamRoles: prev.teamRoles.filter((r) => r.role !== roleToRemove),
//     }));
//   };

//   // Tools handlers
//   const handleAddTool = (tool) => {
//     if (!formData.toolsUsed.includes(tool)) {
//       setFormData((prev) => ({
//         ...prev,
//         toolsUsed: [...prev.toolsUsed, tool],
//       }));
//     }
//   };

//   const handleAddCustomTool = (customTool) => {
//     if (customTool.trim() && !formData.toolsUsed.includes(customTool.trim())) {
//       handleAddTool(customTool.trim());
//     }
//   };

//   const handleRemoveTool = (tool) => {
//     setFormData((prev) => ({
//       ...prev,
//       toolsUsed: prev.toolsUsed.filter((t) => t !== tool),
//     }));
//   };

//   const stepsMap = {
//     "Client Management": {
//       stages: [
//         "Client Onboarding",
//         "Client Interaction",
//         "Client Information Management",
//         "Billing and Invoicing",
//         "Feedback Collection",
//         "Client Retention and Development",
//       ],
//       substeps: {
//         "Client Onboarding": [
//           "Gather client details",
//           "Verify credentials",
//           "Draft engagement contracts",
//           "Set up communication preferences",
//           "Assign account managers"
//         ],
//         "Client Interaction": [
//           "Schedule meetings",
//           "Record meeting notes",
//           "Share case or project updates",
//           "Address client concerns"
//         ],
//         "Client Information Management": [
//           "Organize client files",
//           "Update and sync records",
//           "Maintain data privacy standards"
//         ],
//         "Billing and Invoicing": [
//           "Generate invoices",
//           "Track payments and dues",
//           "Resolve disputes or discrepancies"
//         ],
//         "Feedback Collection": [
//           "Conduct satisfaction surveys",
//           "Record client feedback",
//           "Analyze and report trends"
//         ],
//         "Client Retention and Development": [
//           "Identify upselling or cross-selling opportunities",
//           "Send newsletters or updates",
//           "Host webinars and events"
//         ]
//       }
//     },
//     "Contract Management": {
//       stages: [
//         "Initiation",
//         "Drafting",
//         "Negotiation",
//         "Approval",
//         "Execution",
//         "Post-Execution Management"
//       ],
//       substeps: {
//         "Initiation": [
//           "Identify contract need",
//           "Gather necessary inputs",
//           "Define roles and responsibilities"
//         ],
//         "Drafting": [
//           "Use templates or create new drafts",
//           "Include compliance and jurisdiction-specific clauses",
//           "Review and approve internally"
//         ],
//         "Negotiation": [
//           "Exchange redlines with counterparties",
//           "Resolve key terms and disputes",
//           "Finalize language for approval"
//         ],
//         "Approval": [
//           "Send drafts to stakeholders",
//           "Ensure compliance with internal policies",
//           "Obtain approval for finalized drafts"
//         ],
//         "Execution": [
//           "Authenticate parties' identities",
//           "Route for digital or physical signatures",
//           "Distribute signed contracts"
//         ],
//         "Post-Execution Management": [
//           "Track key dates and milestones",
//           "Monitor performance and obligations",
//           "Manage renewals and amendments"
//         ]
//       }
//     },
//     "E-Signature": {
//       stages: [
//         "Document Preparation",
//         "Signatory Identification",
//         "Sending for Signature",
//         "Signature Verification",
//         "Completion",
//         "Post-Signing Workflow"
//       ],
//       substeps: {
//         "Document Preparation": [
//           "Format documents for signature",
//           "Assign roles and fields"
//         ],
//         "Signatory Identification": [
//           "Verify identities",
//           "Determine signing order"
//         ],
//         "Sending for Signature": [
//           "Send documents to signatories",
//           "Notify parties of deadlines"
//         ],
//         "Signature Verification": [
//           "Validate signed documents",
//           "Ensure compliance with legal standards"
//         ],
//         "Completion": [
//           "Consolidate signed documents",
//           "Distribute finalized copies"
//         ],
//         "Post-Signing Workflow": [
//           "Archive documents",
//           "Record transaction details for audits"
//         ]
//       }
//     },
//     "Document Management": {
//       stages: [
//         "Document Creation",
//         "Document Categorization",
//         "Collaboration",
//         "Storage",
//         "Access Control",
//         "Archiving and Retention"
//       ],
//       substeps: {
//         "Document Creation": [
//           "Draft new documents",
//           "Use templates or AI-based tools"
//         ],
//         "Document Categorization": [
//           "Classify by type or department",
//           "Assign metadata tags"
//         ],
//         "Collaboration": [
//           "Enable role-based access",
//           "Track changes with versioning"
//         ],
//         "Storage": [
//           "Save in secure repositories",
//           "Organize by folder structure"
//         ],
//         "Access Control": [
//           "Define access permissions",
//           "Monitor document activity"
//         ],
//         "Archiving and Retention": [
//           "Apply retention schedules",
//           "Safely archive inactive documents"
//         ]
//       }
//     },
//     "Billing and Invoicing": {
//       stages: [
//         "Client Rate Agreement",
//         "Time Tracking",
//         "Invoice Creation",
//         "Invoice Approval",
//         "Payment Processing",
//         "Reporting and Analysis"
//       ],
//       substeps: {
//         "Client Rate Agreement": [
//           "Establish rates and terms",
//           "Define billing cycles"
//         ],
//         "Time Tracking": [
//           "Track billable and non-billable hours",
//           "Sync logs with invoice systems"
//         ],
//         "Invoice Creation": [
//           "Generate itemized invoices",
//           "Include applicable taxes and discounts"
//         ],
//         "Invoice Approval": [
//           "Send for internal reviews",
//           "Approve and distribute invoices"
//         ],
//         "Payment Processing": [
//           "Monitor payments",
//           "Send reminders for overdue invoices"
//         ],
//         "Reporting and Analysis": [
//           "Track billing trends",
//           "Generate financial reports"
//         ]
//       }
//     },
//     "Discovery": {
//       stages: [
//         "Data Collection",
//         "Data Processing",
//         "Review and Analysis",
//         "Legal Holds",
//         "Production",
//         "Post-Discovery Evaluation"
//       ],
//       substeps: {
//         "Data Collection": [
//           "Identify relevant sources",
//           "Preserve evidence integrity"
//         ],
//         "Data Processing": [
//           "Filter by relevance",
//           "Remove duplicates"
//         ],
//         "Review and Analysis": [
//           "Categorize data by priority",
//           "Highlight key documents"
//         ],
//         "Legal Holds": [
//           "Notify custodians",
//           "Monitor compliance"
//         ],
//         "Production": [
//           "Convert documents for submission",
//           "Share with relevant parties"
//         ],
//         "Post-Discovery Evaluation": [
//           "Assess lessons learned",
//           "Refine future processes"
//         ]
//       }
//     },
//     "Compliance Management": {
//       stages: [
//         "Policy Development",
//         "Risk Assessment",
//         "Compliance Monitoring",
//         "Incident Management",
//         "Training and Awareness",
//         "Reporting and Improvement"
//       ],
//       substeps: {
//         "Policy Development": [
//           "Draft governance policies",
//           "Ensure legal and regulatory compliance"
//         ],
//         "Risk Assessment": [
//           "Identify key risks",
//           "Evaluate impact and likelihood"
//         ],
//         "Compliance Monitoring": [
//           "Track adherence to policies",
//           "Conduct periodic audits"
//         ],
//         "Incident Management": [
//           "Report violations",
//           "Take corrective actions"
//         ],
//         "Training and Awareness": [
//           "Educate employees",
//           "Update policies regularly"
//         ],
//         "Reporting and Improvement": [
//           "Create compliance reports",
//           "Implement recommendations"
//         ]
//       }
//     },
//     "IP Management": {
//       stages: [
//         "Asset Identification",
//         "Registration",
//         "Monitoring",
//         "Licensing and Agreements",
//         "Litigation and Enforcement",
//         "Portfolio Management"
//       ],
//       substeps: {
//         "Asset Identification": [
//           "Catalog IP assets",
//           "Conduct audits"
//         ],
//         "Registration": [
//           "File applications",
//           "Manage renewals"
//         ],
//         "Monitoring": [
//           "Track usage and infringements",
//           "Enforce IP rights"
//         ],
//         "Licensing and Agreements": [
//           "Draft license agreements",
//           "Monitor compliance"
//         ],
//         "Litigation and Enforcement": [
//           "Handle disputes",
//           "Take legal action"
//         ],
//         "Portfolio Management": [
//           "Analyze asset value",
//           "Optimize asset strategies"
//         ]
//       }
//     },
//     "Legal Research": {
//       stages: [
//         "Topic Identification",
//         "Source Collection",
//         "Analysis",
//         "Drafting",
//         "Review",
//         "Storage"
//       ],
//       substeps: {
//         "Topic Identification": [
//           "Define the research objective",
//           "Identify jurisdictions"
//         ],
//         "Source Collection": [
//           "Gather case laws and statutes",
//           "Access legal databases"
//         ],
//         "Analysis": [
//           "Interpret findings",
//           "Highlight precedents"
//         ],
//         "Drafting": [
//           "Create research memos",
//           "Provide actionable insights"
//         ],
//         "Review": [
//           "Verify findings",
//           "Ensure citations are accurate"
//         ],
//         "Storage": [
//           "Archive research for reuse",
//           "Update databases regularly"
//         ]
//       }
//     },
//     "Workflow Automation": {
//       stages: [
//         "Workflow Mapping",
//         "Tool Selection",
//         "Implementation",
//         "Monitoring",
//         "Training",
//         "Optimization"
//       ],
//       substeps: {
//         "Workflow Mapping": [
//           "Identify tasks for automation",
//           "Define dependencies"
//         ],
//         "Tool Selection": [
//           "Choose automation platforms",
//           "Integrate with existing tools"
//         ],
//         "Implementation": [
//           "Set up workflows",
//           "Conduct pilot testing"
//         ],
//         "Monitoring": [
//           "Track efficiency",
//           "Fix issues promptly"
//         ],
//         "Training": [
//           "Educate users",
//           "Provide troubleshooting support"
//         ],
//         "Optimization": [
//           "Gather feedback",
//           "Update workflows regularly"
//         ]
//       }
//     },
//     "Litigation Management": {
//       stages: [
//         "Case Intake",
//         "Pleadings",
//         "Discovery",
//         "Trial Preparation",
//         "Analytics",
//         "Post-Trial Management"
//       ],
//       substeps: {
//         "Case Intake": [
//           "Collect case details",
//           "Assign case numbers"
//         ],
//         "Pleadings": [
//           "Draft complaints",
//           "Respond to motions"
//         ],
//         "Discovery": [
//           "Manage evidence",
//           "Respond to requests"
//         ],
//         "Trial Preparation": [
//           "Develop arguments",
//           "Organize exhibits"
//         ],
//         "Analytics": [
//           "Review litigation trends",
//           "Assess case outcomes"
//         ],
//         "Post-Trial Management": [
//           "Archive records",
//           "Conduct debriefs"
//         ]
//       }
//     }
//   };


//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );
  
//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       setFormData((prev) => {
//         const oldIndex = prev.steps.findIndex(
//           (step) => step.step === active.id
//         );
//         const newIndex = prev.steps.findIndex((step) => step.step === over.id);
//         return {
//           ...prev,
//           steps: arrayMove(prev.steps, oldIndex, newIndex),
//         };
//       });
//     }
//   };
  
//   const handleUpdateStep = (index, updatedStep) => {
//     const newSteps = [...formData.steps];
//     newSteps[index] = updatedStep;
//     setFormData((prev) => ({ ...prev, steps: newSteps }));
//   };
  
//   // For adding a new stage (either from predefined or custom)
//   const handleAddStep = (step) => {
//     if (!formData.steps.find((s) => s.step === step)) {
//       const newStep = {
//         step,
//         repetitiveness: 3,
//         exhaustionScale: 3,
//         selectedSteps: [], // Initialize empty array for substeps
//         teamRoles: []
//       };
//       setFormData((prev) => ({
//         ...prev,
//         steps: [...prev.steps, newStep],
//       }));
//     }
//   };




//   //  sending data
//   const [isReportModalOpen, setIsReportModalOpen] = useState(true);
//   const [reportData, setReportData] = useState(null);

 
//   const [step, setStep] = useState(1);

//   const workflowCategoriess = [
//     {
//       id: "client-management",
//       name: "Client Management",
//       icon: Megaphone,
//       description: "Manage client interactions and relationships effectively",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: "contract-management",
//       name: "Contract Management",
//       icon: Briefcase,
//       description: "Streamline contract creation, negotiation, and management",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       id: "e-signature",
//       name: "E-Signature",
//       icon: PenTool,
//       description: "Facilitate secure and efficient electronic signatures",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       id: "document-management",
//       name: "Document Management",
//       icon: FileText,
//       description: "Organize and manage documents efficiently",
//       color: "from-orange-500 to-amber-500",
//     },
//     {
//       id: "billing-invoicing",
//       name: "Billing and Invoicing",
//       icon: DollarSign,
//       description: "Optimize billing and invoicing processes",
//       color: "from-indigo-500 to-violet-500",
//     },
//     {
//       id: "discovery",
//       name: "Discovery",
//       icon: Search,
//       description: "Enhance discovery processes and data collection",
//       color: "from-rose-500 to-red-500",
//     },
//     {
//       id: "compliance-management",
//       name: "Compliance Management",
//       icon: Shield,
//       description: "Ensure compliance with regulations and standards",
//       color: "from-teal-500 to-blue-500",
//     },
//     {
//       id: "ip-management",
//       name: "IP Management",
//       icon: Lightbulb,
//       description: "Manage intellectual property effectively",
//       color: "from-yellow-500 to-orange-500",
//     },
//     {
//       id: "legal-research",
//       name: "Legal Research",
//       icon: BookOpen,
//       description: "Conduct thorough and efficient legal research",
//       color: "from-red-500 to-pink-500",
//     },
//     {
//       id: "workflow-automation",
//       name: "Workflow Automation",
//       icon: Settings,
//       description: "Automate and optimize workflows",
//       color: "from-green-500 to-teal-500",
//     },
//     {
//       id: "litigation-management",
//       name: "Litigation Management",
//       icon: Gavel,
//       description: "Manage litigation processes effectively",
//       color: "from-blue-500 to-indigo-500",
//     },
//   ];

//   const handleCategorySelect = (categoryName) => {
//     // Set the selected category
//     setFormData((prev) => ({ ...prev, catOfWorkFlow: categoryName }));

//     // Add CSS class for transition
//     const formContainer = document.getElementById("form-container");
//     formContainer.classList.add("slide-out");

//     // Delay the step change to ensure animation completes
//     setTimeout(() => {
//       setStep(2);
//       formContainer.classList.remove("slide-out"); // Optionally remove the class after setting step
//     }, 300);
//   };
 
//   const [customRoleInput, setCustomRoleInput] = useState("");
//   const [customToolInput, setCustomToolInput] = useState("");

//   // Combine predefined and custom roles
//   const allRoles = [
//     ...(teamRolesMap[formData.userOrgType] || []),
//     ...formData.teamRoles
//       .filter(
//         (role) => !teamRolesMap[formData.userOrgType]?.includes(role.role)
//       )
//       .map((role) => role.role),
//   ];

//   // Combine predefined and custom tools
//   const allTools = [
//     ...(toolsMap[formData.catOfWorkFlow] || []),
//     ...formData.toolsUsed.filter(
//       (tool) => !toolsMap[formData.catOfWorkFlow]?.includes(tool)
//     ),
//   ];

//   const handleCustomRoleAdd = () => {
//     if (customRoleInput.trim()) {
//       handleAddCustomTeamRole(customRoleInput);
//       setCustomRoleInput("");
//     }
//   };

//   const handleCustomToolAdd = () => {
//     if (customToolInput.trim()) {
//       handleAddCustomTool(customToolInput);
//       setCustomToolInput("");
//     }
//   };
//   const teamRoleNames = formData.teamRoles.map(({ role }) => role);

//   const [isLoading, setIsLoading] = useState(false);
//   const [notification, setNotification] = useState<{
//     success: boolean;
//     message: string;
//   } | null>(null);


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // First API call to save workflow data and get the formId
//       const workflowRequestBody = {
//          // userID: CustomerUserId,
//         userOrgType: formData.userOrgType,
//         userTeamSize: formData.userTeamSize,
//         categoryOfWorkflow: formData.catOfWorkFlow,
//         teamRoles: formData.teamRoles,
//         toolsUsed: formData.toolsUsed,
//         workFlowSteps: formData.steps,
//       };
  
//       const workflowResponse = await fetch("/api/submit-workFlowData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(workflowRequestBody),
//       });
  
//       const workflowResult = await workflowResponse.json();
  
//       if (!workflowResponse.ok) {
//         throw new Error(workflowResult.message || "Failed to submit workflow data");
//       }
  
//       const formId = workflowResult.id; // Extract formId from the first response
  
//       // Second API call to generate the report
//       const reportRequestBody = {
//         workflow_report: {
//           userOrgType: formData.userOrgType,
//           userTeamSize: formData.userTeamSize,
//           categoryOfWorkflow: formData.catOfWorkFlow,
//           teamRoles: formData.teamRoles,
//           toolsUsed: formData.toolsUsed,
//           steps: formData.steps,
//         },
//       };
  
//       const reportResponse = await fetch("https://ai-backend-y6mq.onrender.com/workflow_report/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(reportRequestBody),
//       });
  
//       const reportResult = await reportResponse.json();
  
//       if (!reportResponse.ok) {
//         throw new Error("Failed to generate the workflow report");
//       }
  
//       // Third API call to save the report data with the formId
//       const saveReportRequestBody = {
//         formId, // Use the formId from the first API response
//         data: reportResult.response, // The report data
//         // name: `Report_${Date.now()}`, // Randomly generate a name
//         // isSaved: false,
//         categoryOfAnalysis:  formData.catOfWorkFlow, // Update if needed
//         userId: CustomerUserId, // Replace with your actual user ID variable
//       };
  
//       const saveReportResponse = await fetch("/api/saveWorkflowResponse", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(saveReportRequestBody),
//       });
  
//       const saveReportResult = await saveReportResponse.json();
  
//       if (!saveReportResponse.ok) {
//         throw new Error("Failed to save the workflow response");
//       }
  
//       setIsLoading(false);
//       // Redirect to the report page using the formId
//       router.push(`/workflow/report/${formId}`);
//       setNotification({
//         success: true,
//         message: "Workflow and report submitted successfully!"
//       });
  
//       // toast({
//       //   title: "Success",
//       //   description: "Workflow and report submitted successfully!",
//       //   variant: "success",
//       // });
//     } catch (error: any) {
//       // console.error("Error:", error);
//       // toast({
//       //   title: "Error",
//       //   description:
//       //     error.message || "An error occurred while submitting the workflow.",
//       //   variant: "destructive",
//       // });
//         setIsLoading(false);
//       setNotification({
//         success: false,
//         message: error.message || "An error occurred while submitting the workflow."
//       });
//     }
//   };
 

 
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       {/* Your existing form JSX */}
//       <WorkflowLoading 
//         isLoading={isLoading}
//         category={formData.catOfWorkFlow}
//       />
//       <CustomNotification notification={notification} position="bottom-right" />
//       {/* <LoadingOverlay 
//         isLoading={isLoading} 
//         currentPhase={currentPhase}
//       /> */}


//       {/* <WorkflowReportModal
//         isOpen={isReportModalOpen}
//         onClose={() => setIsReportModalOpen(false)}
//         report={reportData}
//       /> */}

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideOut {
//           to {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//         }

//         .slide-out {
//           animation: slideOut 0.3s ease-in-out forwards;
//         }

//         .workflow-card {
//           transition: all 0.3s ease;
//         }

//         .workflow-card:hover {
//           transform: translateY(-4px);
//         }
//       `}</style>

//       <div className="max-w-5xl bg-gray-50 mx-auto" id="form-container">
//         {step === 1 ? (
//           <div
//             className="space-y-8"
//             style={{ animation: "fadeIn 0.5s ease-out" }}
//           >
//             <div className="text-center space-y-4">
//               <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//                 Select Which Workflow to Analyse
//               </h1>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                 Select your workflow category to begin optimizing your business
//                 processes
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//               {workflowCategoriess.map((category) => {
//                 const Icon = category.icon;
//                 return (
//                   <Card
//                     key={category.id}
//                     className="workflow-card hover:shadow-xl cursor-pointer border-0 shadow-md"
//                     onClick={() => handleCategorySelect(category.name)}
//                   >
//                     <CardContent className="p-6 space-y-4">
//                       <div
//                         className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
//                       >
//                         <Icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div className="space-y-2">
//                         <h3 className="text-xl font-semibold text-gray-900">
//                           {category.name}
//                         </h3>
//                         <p className="text-gray-500 text-sm">
//                           {category.description}
//                         </p>
//                       </div>
//                       <div className="pt-2 flex items-center text-sm text-gray-600 group">
//                         <span>Get started</span>
//                         <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <div style={{ animation: "fadeIn 0.5s ease-out" }}>
//             <Button
//               variant="ghost"
//               onClick={() => setStep(1)}
//               className="mb-6 text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Categories
//             </Button>

//             <div className="flex items-center space-x-3">
//               {workflowCategories.find((c) => c.name === formData.catOfWorkFlow)
//                 ?.icon && (
//                 <div
//                   className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
//                     workflowCategories.find(
//                       (c) => c.name === formData.catOfWorkFlow
//                     )?.color
//                   } flex items-center justify-center`}
//                 >
//                   {React.createElement(
//                     workflowCategories.find(
//                       (c) => c.name === formData.catOfWorkFlow
//                     )?.icon,
//                     { className: "w-5 h-5 text-white" }
//                   )}
//                 </div>
//               )}
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Card className="p-6 mb-6">
//                 <CardTitle className="text-2xl font-bold">
//                   Configure {formData.catOfWorkFlow} Workflow
//                 </CardTitle>
//               </Card>
//               <Card className="p-6 mb-6">
//                 <div className="space-y-2 mb-6 ">
//                   <Label>Organization Type</Label>
//                   <Select
//                     value={formData.userOrgType}
//                     onValueChange={(value) =>
//                       setFormData((prev) => ({ ...prev, userOrgType: value }))
//                     }
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select organization type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {orgTypes.map((type) => (
//                         <SelectItem key={type} value={type}>
//                           {type}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2 mb-6">
//                   <Label>Team Size</Label>
//                   <Select
//                     value={formData.userTeamSize}
//                     onValueChange={(value) =>
//                       setFormData((prev) => ({ ...prev, userTeamSize: value }))
//                     }
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select team size" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {teamSizes.map((size) => (
//                         <SelectItem key={size} value={size}>
//                           {size}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </Card>

//               <Card className="p-6 mb-6">
//                 {formData.userOrgType && (
//                   <div className="space-y-4 mb-6">
//                     <CardTitle className="text-2xl font-bold">
//                       Team Roles Involved In The Workflow
//                     </CardTitle>

//                     <div className="grid grid-cols-1 gap-2">
//                       {allRoles.map((role) => {
//                         const isSelected = formData.teamRoles.some(
//                           (tr) => tr.role === role
//                         );
//                         const selectedRole = formData.teamRoles.find(
//                           (tr) => tr.role === role
//                         );

//                         return (
//                           <div key={role} className="relative">
//                             {!isSelected ? (
//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={() => handleAddTeamRole(role)}
//                                 className="w-full text-left justify-start break-words"
//                               >
//                                 {role}
//                               </Button>
//                             ) : (
//                               <div className="flex items-center bg-blue-600 text-white px-2 rounded-lg space-x-2">
//                                 <div className="flex items-center space-x-2 flex-1">
//                                   <span className="flex-1 break-words">
//                                     {role}
//                                   </span>
//                                   <span className="text-sm font-semibold">
//                                     Count:
//                                   </span>
//                                   <Input
//                                     type="text"
//                                     value={selectedRole.count}
//                                     onChange={(e) =>
//                                       handleUpdateRoleCount(
//                                         role,
//                                         e.target.value
//                                       )
//                                     }
//                                     className="w-16 md:w-20 bg-white/50 py-1 border-white/20 text-white placeholder-white/50"
//                                     min="1"
//                                   />
//                                 </div>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleRemoveRole(role)}
//                                   className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>



//                     <div className="flex space-x-2">
//                       <Input
//                         placeholder="Add custom role"
//                         value={customRoleInput}
//                         onChange={(e) => setCustomRoleInput(e.target.value)}
//                         onKeyPress={(e) => {
//                           if (e.key === "Enter") {
//                             handleCustomRoleAdd();
//                           }
//                         }}
//                       />
//                       <Button
//                         type="button"
//                         onClick={handleCustomRoleAdd}
//                         className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </Card>

//               <Card className="p-6 mb-6">
//                 {formData.catOfWorkFlow && toolsMap[formData.catOfWorkFlow] && (
//                   <div className="space-y-4 mb-6">
//                     <CardTitle className="text-2xl font-bold">
//                       Tools Used
//                     </CardTitle>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//                       {allTools.map((tool) => {
//                         const isSelected = formData.toolsUsed.includes(tool);

//                         return (
//                           <div key={tool} className="relative">
//                             {!isSelected ? (
//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={() => handleAddTool(tool)}
//                                 className="h-auto py-2 px-3 text-sm w-full text-left justify-start break-words"
//                               >
//                                 {tool}
//                               </Button>
//                             ) : (
//                               <div className="flex items-center bg-blue-600 text-white p-2 rounded-lg space-x-2">
//                                 <span className="flex-1 break-words text-sm">
//                                   {tool}
//                                 </span>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleRemoveTool(tool)}
//                                   className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>

//                     <div className="flex space-x-2">
//                       <Input
//                         placeholder="Add custom tool"
//                         value={customToolInput}
//                         onChange={(e) => setCustomToolInput(e.target.value)}
//                         onKeyPress={(e) => {
//                           if (e.key === "Enter") {
//                             handleCustomToolAdd();
//                           }
//                         }}
//                       />
//                       <Button
//                         type="button"
//                         onClick={handleCustomToolAdd}
//                         className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </Card>


                    
//               <Card className="p-6 mb-4">
//   {formData.catOfWorkFlow && (
//     <div className="space-y-4">
//       <CardTitle className="text-2xl font-bold">
//         Workflow Steps
//       </CardTitle>
//       <div className="grid grid-cols-1 gap-2">
//         {stepsMap[formData.catOfWorkFlow]?.stages?.map((step) => {
//           const isSelected = formData.steps.some(
//             (s) => s.step === step
//           );
//           return (
//             <Button
//               type="button"
//               key={step}
//               variant={isSelected ? "default" : "outline"}
//               onClick={() => handleAddStep(step)}
//               className={`w-full text-left justify-start break-words ${
//                 isSelected
//                   ? "bg-blue-600 hover:bg-blue-700 text-white"
//                   : ""
//               }`}
//               disabled={isSelected}
//             >
//               {step}
//             </Button>
//           );
//         })}
//       </div>

//       <div className="flex space-x-2">
//         <Input
//           placeholder="Add custom step"
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               handleAddCustomStep(e.target.value);
//               e.target.value = "";
//             }
//           }}
//         />
//         <Button
//           type="button"
//           onClick={() => {
//             const input = document.querySelector(
//               'input[placeholder="Add custom step"]'
//             );
//             handleAddCustomStep(input.value);
//             input.value = "";
//           }}
//           className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           <Plus className="h-4 w-4" />
//         </Button>
//       </div>

//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={formData.steps.map((step) => step.step)}
//           strategy={verticalListSortingStrategy}
//         >
//           {formData.steps.map((step, index) => (
//             <SortableStep
//               key={step.step}
//               step={step}
//               index={index}
//               onRemove={(index) => {
//                 const newSteps = formData.steps.filter(
//                   (_, i) => i !== index
//                 );
//                 setFormData((prev) => ({
//                   ...prev,
//                   steps: newSteps,
//                 }));
//               }}
//               onUpdateStep={handleUpdateStep}
//               categoryName={formData.catOfWorkFlow}  // Changed from userOrgType to catOfWorkFlow
//               teamRoles={teamRoleNames}
//               stepsMap={stepsMap}  // Pass stepsMap as prop
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//       {formData.steps.length > 1 && (
//         <div className="display flex">
//           <p className="text-sm text-gray-500 ml-2">
//             <i>Drag to reorder using &nbsp; </i>
//           </p>
//           <GripVertical className="h-5 w-5 text-gray-500" />
//         </div>
//       )}
//     </div>
//   )}
//               </Card>
//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
//               >
//                 Analyse
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>
//       {/* <pre className="p-4 bg-secondary rounded-lg overflow-auto">
//         {JSON.stringify(formData, null, 2)}
//       </pre> */}
//     </div>
//   );
// };

// export default WorkflowForm;

"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronUp, ChevronDown, X, Plus, GripVertical ,UserCircle ,Wrench } from "lucide-react";
// import { useRouter } from "next/router";

// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Code2,
  Megaphone,
  HeadphonesIcon,
  BarChart2,
  Briefcase,
  PenTool,
  ArrowRight,
  ArrowLeft,
  Gavel,
  Settings,
  BookOpen,
  Lightbulb,
  Shield,
  Search,
  DollarSign,
  FileText,
  PlusCircle,
  PlusSquare,
  CheckCircle
} from "lucide-react";





const CustomSlider = ({ value, onChange, label, min = 0, max = 5 }) => {
  // Enhanced gradient function with smoother color transition
  const getGradient = (value, max = 5) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(to right, 
      #3b82f6 0%,
      #60a5fa ${percentage}%,
      #e2e8f0 ${percentage}%,
      #e2e8f0 100%
    )`;
  };

  const labels = ['None', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-lg font-semibold text-blue-600">
          {value.toFixed(1)}
        </span>
      </div>

      <div className="text-center">
        <span className="text-xs font-medium text-gray-600">
          {labels[value]}
        </span>
      </div>

      <div className="relative py-4">
        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-4 w-full h-2 appearance-none bg-transparent cursor-pointer z-20"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
        />
        
        {/* Custom Track */}
        <div 
          className="absolute top-4 w-full h-2 rounded-lg pointer-events-none"
          style={{
            background: getGradient(value),
          }}
        />

        {/* Step Indicators */}
        <div className="flex justify-between px-1 mt-8">
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <button
              key={step}
              onClick={() => onChange(step)}
              className="group relative flex flex-col items-center"
            >
              <div 
                className={`
                  w-3 h-3 rounded-full transition-all duration-150
                  ${value === step 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
              <span 
                className={`
                  mt-2 text-xs font-medium transition-colors duration-150
                  ${value === step 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                {step}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SortableStep = ({
  step,
  index,
  onRemove,
  onUpdateStep,
  categoryName,
  teamRoles,
  stepsMap
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.step });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const toggleTeamRole = (role) => {
    const currentRoles = step.teamRoles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];

    onUpdateStep(index, { ...step, teamRoles: newRoles });
  };

  const toggleSubstep = (substep) => {
    const currentSubsteps = step.selectedSteps || [];
    const newSubsteps = currentSubsteps.includes(substep)
      ? currentSubsteps.filter((s) => s !== substep)
      : [...currentSubsteps, substep];
  
    onUpdateStep(index, {
      ...step,
      selectedSteps: newSubsteps
    });
  };
 
  const handleAddCustomSubstep = (customSubstep) => {
    const trimmedStep = customSubstep.trim();
    if (trimmedStep) {
      const currentSubsteps = step.selectedSteps || [];
      if (!currentSubsteps.includes(trimmedStep)) {
        onUpdateStep(index, {
          ...step,
          selectedSteps: [...currentSubsteps, trimmedStep]
        });
      }
    }
  };

  // Get substeps for the current stage
  const currentStageSubsteps = stepsMap[categoryName]?.substeps[step.step] || [];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-secondary p-6 rounded-lg space-y-6 mb-3 shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move hover:opacity-70 transition-opacity"
        >
          <GripVertical className="h-5 w-5 text-gray-500" />
        </div>
        <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-medium">
          {index + 1}
        </span>
        <span className="flex-1 font-medium text-foreground">{step.step}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          onClick={() => onRemove(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-8">
        {/* Repetitiveness Slider */}
        <CustomSlider
          label="Repetitiveness"
          value={step.repetitiveness}
          onChange={(value) => onUpdateStep(index, { ...step, repetitiveness: value })}
        />

        {/* Exhaustion Rate Slider */}
        <CustomSlider
          label="Exhaustion Rate"
          value={step.exhaustionScale}
          onChange={(value) => onUpdateStep(index, { ...step, exhaustionScale: value })}
        />

        {/* Team Roles Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Team Roles</Label>
          <div className="flex flex-wrap gap-2">
            {teamRoles.map((role) => {
              const isSelected = (step.teamRoles || []).includes(role);
              return (
                <Button
                  key={role}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTeamRole(role)}
                  className={`relative group ${
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {role}
                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTeamRole(role);
                      }}
                      className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Steps</Label>
          <div className="flex flex-wrap gap-2">
            {currentStageSubsteps.map((substep) => {
              const isSelected = (step.selectedSteps || []).includes(substep);
              return (
                <Button
                  key={substep}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSubstep(substep)}
                  className={`relative group ${
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {substep}
                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubstep(substep);
                      }}
                      className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Selected Custom Steps */}
          {step.selectedSteps?.filter(substep => !currentStageSubsteps.includes(substep)).length > 0 && (
            <div className="mt-2">
              <Label className="text-sm font-medium">Custom Action Items</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {step.selectedSteps
                  .filter(substep => !currentStageSubsteps.includes(substep))
                  .map((substep) => (
                    <Button
                      key={substep}
                      type="button"
                      variant="default"
                      size="sm"
                      className="relative group bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {substep}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubstep(substep);
                        }}
                        className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {/* Custom substep input */}
          <div className="flex space-x-2 mt-2">
            <Input
              id={`custom-input-${step.step}`}
              placeholder="Add custom action item"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  e.preventDefault();
                  handleAddCustomSubstep(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const input = document.getElementById(`custom-input-${step.step}`);
                if (input && input.value.trim()) {
                  handleAddCustomSubstep(input.value);
                  input.value = "";
                }
              }}
              className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


// const CustomSlider = ({ value, onChange, label, min = 0, max = 5 }) => {
//   const getGradient = (value, max = 5) => {
//     const percentage = (value / max) * 100;
//     return `linear-gradient(to right, 
//       #2563eb 0%,
//       #3b82f6 ${percentage}%,
//       #e2e8f0 ${percentage}%,
//       #e2e8f0 100%
//     )`;
//   };

//   const labels = ['None', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];

//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between items-baseline">
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//         <span className="text-lg font-semibold text-blue-600">
//           {value.toFixed(1)}
//         </span>
//       </div>

//       <div className="text-center">
//         <span className="text-xs font-medium text-gray-600">
//           {labels[value]}
//         </span>
//       </div>

//       <div className="relative py-4">
//         {/* Main Slider Track */}
//         <div 
//           className="absolute top-4 w-full h-2 rounded-full pointer-events-none"
//           style={{
//             background: getGradient(value),
//           }}
//         />

//         {/* Custom Slider Input */}
//         <input
//           type="range"
//           min={min}
//           max={max}
//           step="1"
//           value={value}
//           onChange={(e) => onChange(Number(e.target.value))}
//           className="absolute top-4 w-full h-2 appearance-none bg-transparent cursor-pointer z-20"
//           style={{
//             WebkitAppearance: 'none',
//             MozAppearance: 'none'
//           }}
//         />

//         {/* Step Indicators */}
//         <div className="flex justify-between px-1 mt-8">
//           {[0, 1, 2, 3, 4, 5].map((step) => (
//             <button
//               key={step}
//               onClick={() => onChange(step)}
//               className="group relative flex flex-col items-center"
//             >
//               <div 
//                 className={`
//                   w-3 h-3 rounded-full transition-all duration-150
//                   ${value === step 
//                     ? 'bg-blue-600 scale-125' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                   }
//                 `}
//               />
//               <span 
//                 className={`
//                   mt-2 text-xs font-medium transition-colors duration-150
//                   ${value === step 
//                     ? 'text-blue-600' 
//                     : 'text-gray-500 hover:text-gray-700'
//                   }
//                 `}
//               >
//                 {step}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// const SortableStep = ({
//   step,
//   index,
//   onRemove,
//   onUpdateStep,
//   categoryName,
//   teamRoles,
//   stepsMap
// }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: step.step });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   const currentStageSubsteps = stepsMap[categoryName]?.substeps[step.step] || [];

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="bg-gray-50/80 p-6 rounded-xl space-y-6 mb-3 shadow-md border border-gray-100/80"
//     >
//       <div className="flex items-center space-x-4">
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-move hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
//         >
//           <GripVertical className="h-5 w-5 text-gray-500" />
//         </div>
//         <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full flex items-center justify-center font-medium shadow-md">
//           {index + 1}
//         </div>
//         <span className="flex-1 font-medium text-gray-700">{step.step}</span>
//         <button
//           type="button"
          
//           onClick={() => onRemove(index)}
//           className="p-1.5 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-lg transition-colors"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>

//       <div className="space-y-8">
//         <CustomSlider
//           label="Repetitiveness"
//           value={step.repetitiveness}
//           onChange={(value) => onUpdateStep(index, { ...step, repetitiveness: value })}
//         />

//         <CustomSlider
//           label="Exhaustion Rate"
//           value={step.exhaustionScale}
//           onChange={(value) => onUpdateStep(index, { ...step, exhaustionScale: value })}
//         />
//       </div>

//       <div className="space-y-2">
//         <span className="text-sm font-medium text-gray-700">Team Roles</span>
//         <div className="flex flex-wrap gap-2">
//           {teamRoles.map((role) => {
//             const isSelected = (step.teamRoles || []).includes(role);
//             return (
//               <button
//                 key={role}
//                 // onClick={() => toggleTeamRole(role)}
//                 onClick={(e) => {
//                   e.preventDefault(); // Add this
//                   toggleTeamRole(role);
//                 }}
//                 className={`group relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
//                   ${isSelected 
//                     ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm" 
//                     : "bg-white border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-gray-50"
//                   }`}
//               >
//                 {role}
//                 {isSelected && (
//                   <button
//                     onClick={(e) => {
                      
//                       e.stopPropagation();
//                       toggleTeamRole(role);
//                     }}
//                     className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white 
//                       flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Steps Section */}
//       <div className="space-y-2">
//         <span className="text-sm font-medium text-gray-700">Steps</span>
//         <div className="flex flex-wrap gap-2">
//           {currentStageSubsteps.map((substep) => (
//             <button
//               key={substep}
//               onClick={() => toggleSubstep(substep)}
//               className={`group relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
//                 ${(step.selectedSteps || []).includes(substep)
//                   ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm"
//                   : "bg-white border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-gray-50"
//                 }`}
//             >
//               {substep}
//               {(step.selectedSteps || []).includes(substep) && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleSubstep(substep);
//                   }}
//                   className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 text-white 
//                     flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="flex space-x-2 mt-4">
//           <input
//             id={`custom-input-${step.step}`}
//             placeholder="Add custom action item"
//             className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm
//               focus:border-blue-400 focus:outline-none transition-all"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && e.target.value.trim()) {
//                 e.preventDefault();
//                 handleAddCustomSubstep(e.target.value);
//                 e.target.value = "";
//               }
//             }}
//           />
//           <button
//             type="button"
//             onClick={() => {
//               const input = document.getElementById(`custom-input-${step.step}`);
//               if (input && input.value.trim()) {
//                 handleAddCustomSubstep(input.value);
//                 input.value = "";
//               }
//             }}
//             className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg 
//               shadow-md hover:shadow-lg transition-all duration-200"
//           >
//             <Plus className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
     
//     </div>
//   );
// };


import { Loader2 } from 'lucide-react';

type WorkflowCategory = 
  | "Client Management"
  | "Contract Management"
  | "E-Signature"
  | "Document Management"
  | "Billing and Invoicing"
  | "Discovery"
  | "Compliance Management"
  | "IP Management"
  | "Legal Research"
  | "Workflow Automation"
  | "Litigation Management";

interface LoadingProps {
  isLoading: boolean;
  category: WorkflowCategory;
}

const categoryMessages: Record<WorkflowCategory, string[]> = {
  "Client Management": [
    "Strengthening client bonds—one legal insight at a time.",
    "Building trust with your clients through smarter workflows.",
    "Optimizing your client interactions for better outcomes."
  ],
  "Contract Management": [
    "Tracking contracts from start to signature—your workflow is in good hands!",
    "Mapping the lifecycle of your contracts for better control.",
    "Transforming contract bottlenecks into streamlined solutions!"
  ],
  "E-Signature": [
    "Digitizing your approvals—every signature counts!",
    "Sealing the deal with smoother e-signature workflows.",
    "Simplifying document execution with a touch of technology."
  ],
  "Document Management": [
    "Organizing your documents for a seamless legal journey...",
    "Turning your document chaos into an efficient repository!",
    "Scanning your document trail to unlock smarter storage solutions."
  ],
  "Billing and Invoicing": [
    "Streamlining legal billing—because time is money!",
    "Ensuring every bill tells a clear, concise story.",
    "Simplifying your invoicing for greater financial clarity."
  ],
  "Discovery": [
    "Uncovering the facts—your data search starts here.",
    "Sifting through digital evidence to reveal actionable insights.",
    "Bringing clarity to your discovery process with precision tools."
  ],
  "Compliance Management": [
    "Charting your compliance roadmap for a risk-free future.",
    "Bringing order to your governance and compliance frameworks.",
    "Ensuring your workflows stay risk-aware and regulation-ready."
  ],
  "IP Management": [
    "Protecting your intellectual assets with smart workflows.",
    "Mapping the lifecycle of your IP for maximum value.",
    "Streamlining the management of your creative and legal properties."
  ],
  "Legal Research": [
    "Diving deep into legal knowledge—your insights are on the way!",
    "Curating the legal answers you need to make informed decisions.",
    "Bringing clarity to your research with precision tools."
  ],
  "Workflow Automation": [
    "Automating the mundane—your legal team deserves better!",
    "Simplifying workflows for faster, smarter outcomes.",
    "Unlocking efficiency with every automated task."
  ],
  "Litigation Management": [
    "Turning case complexities into manageable workflows.",
    "Your litigation strategy is being streamlined—just a moment!",
    "Bringing data-driven insights to your litigation approach."
  ]
};

const commonMessages = [
  "Hold tight! Your legal workflow blueprint is coming to life.",
  "Mapping out the flow of your legal team—one step at a time.",
  "Your custom workflow insights are being crafted with precision!",
  "Transforming data into actionable insights—just a moment more!",
  "Every legal step counts, and we're capturing them all for you.",
  "Hang on! We're turning your workflow pain points into progress paths.",
  "From data to direction: Your personalized legal workflow is almost ready.",
  "We're piecing together your legal efficiency puzzle—stay tuned!"
];

const WorkflowLoading: React.FC<LoadingProps> = ({ isLoading, category }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
      // Progress interval
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      // Message interval
      const messageInterval = setInterval(() => {
        const messages = progress < 30 ? categoryMessages[category] 
          : progress < 70 ? commonMessages 
          : categoryMessages[category];
        
        const randomIndex = Math.floor(Math.random() * messages.length);
        setCurrentMessage(messages[randomIndex]);
      }, 2000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      };
    } else {
      setProgress(0);
      setCurrentMessage('');
    }
  }, [isLoading, category, progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 max-w-sm bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 z-50"
        >
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
          <div className="flex-1 min-w-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-gray-600 mb-2"
              >
                {currentMessage}
              </motion.div>
            </AnimatePresence>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



const CustomNotification = ({ notification, position = "bottom-right" }) => {
  const positions = {
    "bottom-right": "bottom-24 right-6",
    "top-right": "top-6 right-6",
    "top-center": "top-6 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2"
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`fixed ${positions[position]} z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg`}
          style={{
            background: notification.success ? 'rgba(52, 211, 153, 0.95)' : 'rgba(239, 68, 68, 0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {notification.success ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <CheckCircle className="w-5 h-5 text-white" />
          )}
          <span className="text-white text-sm font-medium">
            {notification.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


import { useAuth } from '@/context/authContext';


const WorkflowForm = () => {
  // forms  bookmycall and rfp
  // const CustomerUserId =
  //   typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { userId, userType } = useAuth();

  const CustomerUserId = userId;
  console.log(userId, userType)
  console.log(CustomerUserId);
  // const router = useRouter();

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    userOrgType: "",
    userTeamSize: "",
    catOfWorkFlow: "",
    teamRoles: [],
    toolsUsed: [],
    steps: [],
  });

  //  user data fetching
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

          // Use setFormData with the spread operator to update state immutably
          setFormData((prevFormData) => ({
            ...prevFormData,
            userOrgType: profile.CompanyType || "",
            userTeamSize: profile.TeamSize || "",
          }));
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

  // data
  const orgTypes = [
    "Individual Practitioner",
    "Law Firms",
    "Government Departments",
    "Startups",
    "Enterprises",
    "Judiciary",
    "In-House Counsels",
  ];

  const teamSizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

  const workflowCategories = [
    "Client Management",
    "Contract Management",
    "E-Signature",
    "Document Management",
    "Billing and Invoicing",
    "Discovery",
    "Compliance Management",
    "IP Management",
    "Legal Research",
    "Workflow Automation",
    "Litigation Management",
  ];

  const teamRolesMap = {
    "Individual Practitioner": [
      "Lawyer",
      "Junior Lawyer",
      "Paralegal",
      "Externally Associated Counsel",
      "Intern",
      "Administrative Support",
    ],
    "Law Firms": [
      "Managing Partner",
      "Senior Partner",
      "Partner",
      "Principal Associate",
      "Senior Associate",
      "Associate",
      "Junior Associate",
      "Paralegal",
      "Company Secretary",
      "Case Manager/Clerk",
      "Administrative Support",
      "Intern",
    ],
    "Government Departments": [
      "Chief Legal Officer",
      "Compliance Officer",
      "Legal Analyst",
      "Policy Advisor",
      "Administrative Officer",
      "Clerk",
      "Intern",
      "Outsourced Lawyer/Firm",
    ],
    Startups: [
      "Legal Head",
      "Compliance Officer",
      "Legal Associate",
      "Contract Manager",
      "Operations Manager",
      "Outsourced Lawyer/Firm",
    ],
    Enterprises: [
      "General Counsel",
      "Legal President",
      "Legal Vice President",
      "Legal Director",
      "Legal Manager",
      "Legal Operations Manager",
      "Contract Specialist",
      "Compliance Manager",
      "Outsourced Lawyer/Firm",
    ],
    Judiciary: [
      "Judge",
      "Court Clerk",
      "Judicial Assistant",
      "Research Attorney",
      "Case Administrator",
    ],
    "In-House Counsels": [
      "General Counsel",
      "Legal Counsel",
      "Compliance Officer",
      "Legal Operations Manager",
      "Paralegal/Legal Assistant",
    ],
  };

  const toolsMap = {
    "Client Management": [
      "Client Intake Software",
      "Case Management Software",
      "Communication Platforms",
      "Client Portal Software",
      "Relationship Tracking Tools",
    ],
    "Contract Management": [
      "Contract Drafting Tools",
      "Contract Review Platforms",
      "Contract Repository",
      "Approval Workflow Software",
      "Contract Analytics Tools",
      "Lifecycle Management Software",
    ],
    "E-Signature": [
      "Digital Signature Software",
      "Authentication Tools",
      "Secure Document Sharing",
      "Signature Tracking Software",
      "Compliance-Based E-Sign Solutions",
    ],
    "Document Management": [
      "Document Storage Solutions",
      "Version Control Software",
      "Access Control Tools",
      "Document Sharing Platforms",
      "Document Search and Retrieval",
    ],
    "Billing and Invoicing": [
      "Billing Management Software",
      "Invoice Generation Tools",
      "Payment Tracking Systems",
      "Expense Management Tools",
      "Automated Billing Workflows",
    ],
    Discovery: [
      "Document Review Tools",
      "Data Collection Software",
      "Redaction Tools",
      "Data Processing Tools",
      "Legal Hold Management Software",
    ],
    "Compliance Management": [
      "Compliance Management Tools",
      "Risk Assessment Software",
      "Policy Management Tools",
      "Audit Management Solutions",
      "Incident Management Tools",
    ],
    "IP Management": [
      "IP Portfolio Management Software",
      "Patent and Trademark Management Tools",
      "IP Search and Monitoring Tools",
      "IP Filing Software",
      "Licensing and Royalty Management",
    ],
    "Legal Research": [
      "Legal Database Access Tools",
      "Case Law Research Platforms",
      "Statutory and Regulatory Databases",
      "AI-Powered Research Tools",
      "Citation Management Tools",
    ],
    "Workflow Automation": [
      "Workflow Design Software",
      "Task Automation Tools",
      "Workflow Management Platforms",
      "Approval Workflow Software",
      "Document Automation Tools",
    ],
    "Litigation Management": [
      "Case Tracking Tools",
      "Analytics for Litigation Trends",
      "Court Docket Management",
      "Case Data Analytics",
      "Outcome Prediction Software",
    ],
  };

  // Team Roles handlers
  const handleAddTeamRole = (role) => {
    if (!formData.teamRoles.find((r) => r.role === role)) {
      const newRole = {
        role,
        count: 1,
      };
      setFormData((prev) => ({
        ...prev,
        teamRoles: [...prev.teamRoles, newRole],
      }));
    }
  };

  const handleAddCustomTeamRole = (customRole) => {
    if (
      customRole.trim() &&
      !formData.teamRoles.find((r) => r.role === customRole.trim())
    ) {
      handleAddTeamRole(customRole.trim());
    }
  };

  const handleUpdateRoleCount = (role, count) => {
    setFormData((prev) => ({
      ...prev,
      teamRoles: prev.teamRoles.map((r) =>
        r.role === role ? { ...r, count: parseInt(count) || 0 } : r
      ),
    }));
  };

  const handleRemoveRole = (roleToRemove) => {
    setFormData((prev) => ({
      ...prev,
      teamRoles: prev.teamRoles.filter((r) => r.role !== roleToRemove),
    }));
  };

  // Tools handlers
  const handleAddTool = (tool) => {
    if (!formData.toolsUsed.includes(tool)) {
      setFormData((prev) => ({
        ...prev,
        toolsUsed: [...prev.toolsUsed, tool],
      }));
    }
  };

  const handleAddCustomTool = (customTool) => {
    if (customTool.trim() && !formData.toolsUsed.includes(customTool.trim())) {
      handleAddTool(customTool.trim());
    }
  };

  const handleRemoveTool = (tool) => {
    setFormData((prev) => ({
      ...prev,
      toolsUsed: prev.toolsUsed.filter((t) => t !== tool),
    }));
  };

  const stepsMap = {
    "Client Management": {
      stages: [
        "Client Onboarding",
        "Client Interaction",
        "Client Information Management",
        "Billing and Invoicing",
        "Feedback Collection",
        "Client Retention and Development",
      ],
      substeps: {
        "Client Onboarding": [
          "Gather client details",
          "Verify credentials",
          "Draft engagement contracts",
          "Set up communication preferences",
          "Assign account managers"
        ],
        "Client Interaction": [
          "Schedule meetings",
          "Record meeting notes",
          "Share case or project updates",
          "Address client concerns"
        ],
        "Client Information Management": [
          "Organize client files",
          "Update and sync records",
          "Maintain data privacy standards"
        ],
        "Billing and Invoicing": [
          "Generate invoices",
          "Track payments and dues",
          "Resolve disputes or discrepancies"
        ],
        "Feedback Collection": [
          "Conduct satisfaction surveys",
          "Record client feedback",
          "Analyze and report trends"
        ],
        "Client Retention and Development": [
          "Identify upselling or cross-selling opportunities",
          "Send newsletters or updates",
          "Host webinars and events"
        ]
      }
    },
    "Contract Management": {
      stages: [
        "Initiation",
        "Drafting",
        "Negotiation",
        "Approval",
        "Execution",
        "Post-Execution Management"
      ],
      substeps: {
        "Initiation": [
          "Identify contract need",
          "Gather necessary inputs",
          "Define roles and responsibilities"
        ],
        "Drafting": [
          "Use templates or create new drafts",
          "Include compliance and jurisdiction-specific clauses",
          "Review and approve internally"
        ],
        "Negotiation": [
          "Exchange redlines with counterparties",
          "Resolve key terms and disputes",
          "Finalize language for approval"
        ],
        "Approval": [
          "Send drafts to stakeholders",
          "Ensure compliance with internal policies",
          "Obtain approval for finalized drafts"
        ],
        "Execution": [
          "Authenticate parties' identities",
          "Route for digital or physical signatures",
          "Distribute signed contracts"
        ],
        "Post-Execution Management": [
          "Track key dates and milestones",
          "Monitor performance and obligations",
          "Manage renewals and amendments"
        ]
      }
    },
    "E-Signature": {
      stages: [
        "Document Preparation",
        "Signatory Identification",
        "Sending for Signature",
        "Signature Verification",
        "Completion",
        "Post-Signing Workflow"
      ],
      substeps: {
        "Document Preparation": [
          "Format documents for signature",
          "Assign roles and fields"
        ],
        "Signatory Identification": [
          "Verify identities",
          "Determine signing order"
        ],
        "Sending for Signature": [
          "Send documents to signatories",
          "Notify parties of deadlines"
        ],
        "Signature Verification": [
          "Validate signed documents",
          "Ensure compliance with legal standards"
        ],
        "Completion": [
          "Consolidate signed documents",
          "Distribute finalized copies"
        ],
        "Post-Signing Workflow": [
          "Archive documents",
          "Record transaction details for audits"
        ]
      }
    },
    "Document Management": {
      stages: [
        "Document Creation",
        "Document Categorization",
        "Collaboration",
        "Storage",
        "Access Control",
        "Archiving and Retention"
      ],
      substeps: {
        "Document Creation": [
          "Draft new documents",
          "Use templates or AI-based tools"
        ],
        "Document Categorization": [
          "Classify by type or department",
          "Assign metadata tags"
        ],
        "Collaboration": [
          "Enable role-based access",
          "Track changes with versioning"
        ],
        "Storage": [
          "Save in secure repositories",
          "Organize by folder structure"
        ],
        "Access Control": [
          "Define access permissions",
          "Monitor document activity"
        ],
        "Archiving and Retention": [
          "Apply retention schedules",
          "Safely archive inactive documents"
        ]
      }
    },
    "Billing and Invoicing": {
      stages: [
        "Client Rate Agreement",
        "Time Tracking",
        "Invoice Creation",
        "Invoice Approval",
        "Payment Processing",
        "Reporting and Analysis"
      ],
      substeps: {
        "Client Rate Agreement": [
          "Establish rates and terms",
          "Define billing cycles"
        ],
        "Time Tracking": [
          "Track billable and non-billable hours",
          "Sync logs with invoice systems"
        ],
        "Invoice Creation": [
          "Generate itemized invoices",
          "Include applicable taxes and discounts"
        ],
        "Invoice Approval": [
          "Send for internal reviews",
          "Approve and distribute invoices"
        ],
        "Payment Processing": [
          "Monitor payments",
          "Send reminders for overdue invoices"
        ],
        "Reporting and Analysis": [
          "Track billing trends",
          "Generate financial reports"
        ]
      }
    },
    "Discovery": {
      stages: [
        "Data Collection",
        "Data Processing",
        "Review and Analysis",
        "Legal Holds",
        "Production",
        "Post-Discovery Evaluation"
      ],
      substeps: {
        "Data Collection": [
          "Identify relevant sources",
          "Preserve evidence integrity"
        ],
        "Data Processing": [
          "Filter by relevance",
          "Remove duplicates"
        ],
        "Review and Analysis": [
          "Categorize data by priority",
          "Highlight key documents"
        ],
        "Legal Holds": [
          "Notify custodians",
          "Monitor compliance"
        ],
        "Production": [
          "Convert documents for submission",
          "Share with relevant parties"
        ],
        "Post-Discovery Evaluation": [
          "Assess lessons learned",
          "Refine future processes"
        ]
      }
    },
    "Compliance Management": {
      stages: [
        "Policy Development",
        "Risk Assessment",
        "Compliance Monitoring",
        "Incident Management",
        "Training and Awareness",
        "Reporting and Improvement"
      ],
      substeps: {
        "Policy Development": [
          "Draft governance policies",
          "Ensure legal and regulatory compliance"
        ],
        "Risk Assessment": [
          "Identify key risks",
          "Evaluate impact and likelihood"
        ],
        "Compliance Monitoring": [
          "Track adherence to policies",
          "Conduct periodic audits"
        ],
        "Incident Management": [
          "Report violations",
          "Take corrective actions"
        ],
        "Training and Awareness": [
          "Educate employees",
          "Update policies regularly"
        ],
        "Reporting and Improvement": [
          "Create compliance reports",
          "Implement recommendations"
        ]
      }
    },
    "IP Management": {
      stages: [
        "Asset Identification",
        "Registration",
        "Monitoring",
        "Licensing and Agreements",
        "Litigation and Enforcement",
        "Portfolio Management"
      ],
      substeps: {
        "Asset Identification": [
          "Catalog IP assets",
          "Conduct audits"
        ],
        "Registration": [
          "File applications",
          "Manage renewals"
        ],
        "Monitoring": [
          "Track usage and infringements",
          "Enforce IP rights"
        ],
        "Licensing and Agreements": [
          "Draft license agreements",
          "Monitor compliance"
        ],
        "Litigation and Enforcement": [
          "Handle disputes",
          "Take legal action"
        ],
        "Portfolio Management": [
          "Analyze asset value",
          "Optimize asset strategies"
        ]
      }
    },
    "Legal Research": {
      stages: [
        "Topic Identification",
        "Source Collection",
        "Analysis",
        "Drafting",
        "Review",
        "Storage"
      ],
      substeps: {
        "Topic Identification": [
          "Define the research objective",
          "Identify jurisdictions"
        ],
        "Source Collection": [
          "Gather case laws and statutes",
          "Access legal databases"
        ],
        "Analysis": [
          "Interpret findings",
          "Highlight precedents"
        ],
        "Drafting": [
          "Create research memos",
          "Provide actionable insights"
        ],
        "Review": [
          "Verify findings",
          "Ensure citations are accurate"
        ],
        "Storage": [
          "Archive research for reuse",
          "Update databases regularly"
        ]
      }
    },
    "Workflow Automation": {
      stages: [
        "Workflow Mapping",
        "Tool Selection",
        "Implementation",
        "Monitoring",
        "Training",
        "Optimization"
      ],
      substeps: {
        "Workflow Mapping": [
          "Identify tasks for automation",
          "Define dependencies"
        ],
        "Tool Selection": [
          "Choose automation platforms",
          "Integrate with existing tools"
        ],
        "Implementation": [
          "Set up workflows",
          "Conduct pilot testing"
        ],
        "Monitoring": [
          "Track efficiency",
          "Fix issues promptly"
        ],
        "Training": [
          "Educate users",
          "Provide troubleshooting support"
        ],
        "Optimization": [
          "Gather feedback",
          "Update workflows regularly"
        ]
      }
    },
    "Litigation Management": {
      stages: [
        "Case Intake",
        "Pleadings",
        "Discovery",
        "Trial Preparation",
        "Analytics",
        "Post-Trial Management"
      ],
      substeps: {
        "Case Intake": [
          "Collect case details",
          "Assign case numbers"
        ],
        "Pleadings": [
          "Draft complaints",
          "Respond to motions"
        ],
        "Discovery": [
          "Manage evidence",
          "Respond to requests"
        ],
        "Trial Preparation": [
          "Develop arguments",
          "Organize exhibits"
        ],
        "Analytics": [
          "Review litigation trends",
          "Assess case outcomes"
        ],
        "Post-Trial Management": [
          "Archive records",
          "Conduct debriefs"
        ]
      }
    }
  };


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.steps.findIndex(
          (step) => step.step === active.id
        );
        const newIndex = prev.steps.findIndex((step) => step.step === over.id);
        return {
          ...prev,
          steps: arrayMove(prev.steps, oldIndex, newIndex),
        };
      });
    }
  };
  
  const handleUpdateStep = (index, updatedStep) => {
    const newSteps = [...formData.steps];
    newSteps[index] = updatedStep;
    setFormData((prev) => ({ ...prev, steps: newSteps }));
  };
  
  

  
    // For adding a new stage (either from predefined or custom)
    const handleAddStep = (step) => {
      if (!formData.steps.find((s) => s.step === step)) {
        const newStep = {
          step,
          repetitiveness: 3,
          exhaustionScale: 3,
          selectedSteps: [], // Initialize empty array for substeps
          teamRoles: []
        };
        setFormData((prev) => ({
          ...prev,
          steps: [...prev.steps, newStep],
        }));
      }
    };
    
  
    const [customStepInput, setCustomStepInput] = useState("");
    const handleAddCustomStep = (customStep) => {
      const trimmedStep = customStep.trim();
      if (trimmedStep && !formData.steps.find((s) => s.step === trimmedStep)) {
        const newStep = {
          step: trimmedStep,
          repetitiveness: 3,
          exhaustionScale: 3,
          selectedSteps: [],
          teamRoles: []
        };
        setFormData((prev) => ({
          ...prev,
          steps: [...prev.steps, newStep],
        }));
        setCustomStepInput(""); // Clear input after adding
      }
    };
    




  //  sending data
  const [isReportModalOpen, setIsReportModalOpen] = useState(true);
  const [reportData, setReportData] = useState(null);

 
  const [step, setStep] = useState(1);

  const workflowCategoriess = [
    {
      id: "client-management",
      name: "Client Management",
      icon: Megaphone,
      description: "Manage client interactions and relationships effectively",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "contract-management",
      name: "Contract Management",
      icon: Briefcase,
      description: "Streamline contract creation, negotiation, and management",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "e-signature",
      name: "E-Signature",
      icon: PenTool,
      description: "Facilitate secure and efficient electronic signatures",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "document-management",
      name: "Document Management",
      icon: FileText,
      description: "Organize and manage documents efficiently",
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "billing-invoicing",
      name: "Billing and Invoicing",
      icon: DollarSign,
      description: "Optimize billing and invoicing processes",
      color: "from-indigo-500 to-violet-500",
    },
    {
      id: "discovery",
      name: "Discovery",
      icon: Search,
      description: "Enhance discovery processes and data collection",
      color: "from-rose-500 to-red-500",
    },
    {
      id: "compliance-management",
      name: "Compliance Management",
      icon: Shield,
      description: "Ensure compliance with regulations and standards",
      color: "from-teal-500 to-blue-500",
    },
    {
      id: "ip-management",
      name: "IP Management",
      icon: Lightbulb,
      description: "Manage intellectual property effectively",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "legal-research",
      name: "Legal Research",
      icon: BookOpen,
      description: "Conduct thorough and efficient legal research",
      color: "from-red-500 to-pink-500",
    },
    {
      id: "workflow-automation",
      name: "Workflow Automation",
      icon: Settings,
      description: "Automate and optimize workflows",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "litigation-management",
      name: "Litigation Management",
      icon: Gavel,
      description: "Manage litigation processes effectively",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const handleCategorySelect = (categoryName) => {
    // Set the selected category
    setFormData((prev) => ({ ...prev, catOfWorkFlow: categoryName }));

    // Add CSS class for transition
    const formContainer = document.getElementById("form-container");
    formContainer.classList.add("slide-out");

    // Delay the step change to ensure animation completes
    setTimeout(() => {
      setStep(2);
      formContainer.classList.remove("slide-out"); // Optionally remove the class after setting step
    }, 300);
  };
 
  const [customRoleInput, setCustomRoleInput] = useState("");
  const [customToolInput, setCustomToolInput] = useState("");

  // Combine predefined and custom roles
  const allRoles = [
    ...(teamRolesMap[formData.userOrgType] || []),
    ...formData.teamRoles
      .filter(
        (role) => !teamRolesMap[formData.userOrgType]?.includes(role.role)
      )
      .map((role) => role.role),
  ];

  // Combine predefined and custom tools
  const allTools = [
    ...(toolsMap[formData.catOfWorkFlow] || []),
    ...formData.toolsUsed.filter(
      (tool) => !toolsMap[formData.catOfWorkFlow]?.includes(tool)
    ),
  ];

  const handleCustomRoleAdd = () => {
    if (customRoleInput.trim()) {
      handleAddCustomTeamRole(customRoleInput);
      setCustomRoleInput("");
    }
  };

  const handleCustomToolAdd = () => {
    if (customToolInput.trim()) {
      handleAddCustomTool(customToolInput);
      setCustomToolInput("");
    }
  };
  const teamRoleNames = formData.teamRoles.map(({ role }) => role);

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    success: boolean;
    message: string;
  } | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First API call to save workflow data and get the formId
      const workflowRequestBody = {
         // userID: CustomerUserId,
        userOrgType: formData.userOrgType,
        userTeamSize: formData.userTeamSize,
        categoryOfWorkflow: formData.catOfWorkFlow,
        teamRoles: formData.teamRoles,
        toolsUsed: formData.toolsUsed,
        workFlowSteps: formData.steps,
      };
  
      const workflowResponse = await fetch("/api/submit-workFlowData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowRequestBody),
      });
  
      const workflowResult = await workflowResponse.json();
  
      if (!workflowResponse.ok) {
        throw new Error(workflowResult.message || "Failed to submit workflow data");
      }
  
      const formId = workflowResult.id; // Extract formId from the first response
  
      // Second API call to generate the report
      const reportRequestBody = {
        workflow_report: {
          userOrgType: formData.userOrgType,
          userTeamSize: formData.userTeamSize,
          categoryOfWorkflow: formData.catOfWorkFlow,
          teamRoles: formData.teamRoles,
          toolsUsed: formData.toolsUsed,
          steps: formData.steps,
        },
      };
  
      const reportResponse = await fetch("https://dreamlegal.in/ai/workflow_report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportRequestBody),
      });
  
      const reportResult = await reportResponse.json();
  
      if (!reportResponse.ok) {
        throw new Error("Failed to generate the workflow report");
      }
  
      // Third API call to save the report data with the formId
      const saveReportRequestBody = {
        formId, // Use the formId from the first API response
        data: reportResult.response, // The report data
        // name: `Report_${Date.now()}`, // Randomly generate a name
        // isSaved: false,
        categoryOfAnalysis:  formData.catOfWorkFlow, // Update if needed
        userId: CustomerUserId, // Replace with your actual user ID variable
      };
  
      const saveReportResponse = await fetch("/api/saveWorkflowResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveReportRequestBody),
      });
  
      const saveReportResult = await saveReportResponse.json();
  
      if (!saveReportResponse.ok) {
        throw new Error("Failed to save the workflow response");
      }
  
      setIsLoading(false);
      // Redirect to the report page using the formId
      router.push(`/workflow/report/${formId}`);
      setNotification({
        success: true,
        message: "Workflow and report submitted successfully!"
      });
  
      // toast({
      //   title: "Success",
      //   description: "Workflow and report submitted successfully!",
      //   variant: "success",
      // });
    } catch (error: any) {
      // console.error("Error:", error);
      // toast({
      //   title: "Error",
      //   description:
      //     error.message || "An error occurred while submitting the workflow.",
      //   variant: "destructive",
      // });
        setIsLoading(false);
      setNotification({
        success: false,
        message: error.message || "An error occurred while submitting the workflow."
      });
    }
  };
  const handleRemoveStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      steps: newSteps,
    }));
  };
 

 
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Your existing form JSX */}
      <WorkflowLoading 
        isLoading={isLoading}
        category={formData.catOfWorkFlow}
      />
      <CustomNotification notification={notification} position="bottom-right" />
      {/* <LoadingOverlay 
        isLoading={isLoading} 
        currentPhase={currentPhase}
      /> */}


      {/* <WorkflowReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={reportData}
      /> */}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        .slide-out {
          animation: slideOut 0.3s ease-in-out forwards;
        }

        .workflow-card {
          transition: all 0.3s ease;
        }

        .workflow-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className="max-w-5xl bg-gray-50 mx-auto" id="form-container">
        {step === 1 ? (
          <div
            className="space-y-8"
            style={{ animation: "fadeIn 0.5s ease-out" }}
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Select Which Workflow to Analyse
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select your workflow category to begin optimizing your business
                processes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {workflowCategoriess.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="workflow-card hover:shadow-xl cursor-pointer border-0 shadow-md"
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center text-sm text-gray-600 group">
                        <span>Get started</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ animation: "fadeIn 0.5s ease-out" }}>
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              className="mb-6 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>

            <div className="flex items-center space-x-3">
              {workflowCategories.find((c) => c.name === formData.catOfWorkFlow)
                ?.icon && (
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                    workflowCategories.find(
                      (c) => c.name === formData.catOfWorkFlow
                    )?.color
                  } flex items-center justify-center`}
                >
                  {React.createElement(
                    workflowCategories.find(
                      (c) => c.name === formData.catOfWorkFlow
                    )?.icon,
                    { className: "w-5 h-5 text-white" }
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="p-6 mb-6">
                <CardTitle className="text-2xl font-bold">
                  Configure {formData.catOfWorkFlow} Workflow
                </CardTitle>
              </Card>
              <Card className="p-6 mb-6">
                <div className="space-y-2 mb-6 ">
                  <Label>Organization Type</Label>
                  <Select
                    value={formData.userOrgType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, userOrgType: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      {orgTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mb-6">
                  <Label>Team Size</Label>
                  <Select
                    value={formData.userTeamSize}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, userTeamSize: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
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
                </div>
              </Card>
              {/* First Card - Configure Workflow */}
{/* <div className="p-6 bg-gradient-to-br from-white via-gray-50/90 to-white rounded-xl shadow-2xl relative overflow-hidden border border-white/60 backdrop-blur-sm mb-6">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
  <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
  
  <div className="relative">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
      Configure {formData.catOfWorkFlow} Workflow
    </h2>
    <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
  </div>
</div> */}

{/* Second Card - Organization Settings */}
{/* <div className="p-6 bg-gradient-to-br from-white via-gray-50/90 to-white rounded-xl shadow-2xl relative overflow-hidden border border-white/60 backdrop-blur-sm mb-6">
 
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
  <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl" />
  
  <div className="space-y-6 relative">
    <div className="space-y-2 group">
      <Label className="text-sm font-medium text-gray-700">Organization Type</Label>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
        <Select
          value={formData.userOrgType}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, userOrgType: value }))
          }
        >
          <SelectTrigger className="w-full bg-white relative border-gray-200 group-hover:border-blue-200 transition-colors">
            <SelectValue placeholder="Select organization type" />
          </SelectTrigger>
          <SelectContent>
            {orgTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="space-y-2 group">
      <Label className="text-sm font-medium text-gray-700">Team Size</Label>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
        <Select
          value={formData.userTeamSize}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, userTeamSize: value }))
          }
        >
          <SelectTrigger className="w-full bg-white relative border-gray-200 group-hover:border-blue-200 transition-colors">
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
      </div>
    </div>
  </div>
</div> */}

              <Card className="p-6 mb-6">
                {formData.userOrgType && (
                  <div className="space-y-4 mb-6">
                    <CardTitle className="text-2xl font-bold">
                      Team Roles Involved In The Workflow
                    </CardTitle>

                    <div className="grid grid-cols-1 gap-2">
                      {allRoles.map((role) => {
                        const isSelected = formData.teamRoles.some(
                          (tr) => tr.role === role
                        );
                        const selectedRole = formData.teamRoles.find(
                          (tr) => tr.role === role
                        );

                        return (
                          <div key={role} className="relative">
                            {!isSelected ? (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleAddTeamRole(role)}
                                className="w-full text-left justify-start break-words"
                              >
                                {role}
                              </Button>
                            ) : (
                              <div className="flex items-center bg-blue-600 text-white px-2 rounded-lg space-x-2">
                                <div className="flex items-center space-x-2 flex-1">
                                  <span className="flex-1 break-words">
                                    {role}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Count:
                                  </span>
                                  <Input
                                    type="text"
                                    value={selectedRole.count}
                                    onChange={(e) =>
                                      handleUpdateRoleCount(
                                        role,
                                        e.target.value
                                      )
                                    }
                                    className="w-16 md:w-20 bg-white/50 py-1 border-white/20 text-white placeholder-white/50"
                                    min="1"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveRole(role)}
                                  className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>



                    <div className="flex space-x-2">
                                         <Input
                                           placeholder="Add custom role"
                                           value={customRoleInput}
                                           onChange={(e) => setCustomRoleInput(e.target.value)}
                                           onKeyDown={(e) => {
                                             if (e.key === "Enter") {
                                               e.preventDefault();
                                               if (customRoleInput.trim()) {
                                                 handleCustomRoleAdd();
                                               }
                                             }
                                           }}
                                         />
                                         <Button
                                           type="button"
                                           onClick={(e) => {
                                             e.preventDefault();
                                             if (customRoleInput.trim()) {
                                               handleCustomRoleAdd();
                                             }
                                           }}
                                           className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                                         >
                                           <Plus className="h-4 w-4" />
                                         </Button>
                                       </div>
                  </div>
                )}
              </Card>
      
      {/* <div className="p-6 bg-gradient-to-br from-white via-gray-50/90 to-white rounded-xl shadow-2xl relative overflow-hidden border border-white/60 backdrop-blur-sm">
  
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
  <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
  <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl" />
  
  {formData.userOrgType && (
    <div className="space-y-6 relative">
    
      <div className="relative">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
          Team Roles Involved In The Workflow
        </h2>
        <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {allRoles.map((role) => {
          const isSelected = formData.teamRoles.some((tr) => tr.role === role);
          const selectedRole = formData.teamRoles.find((tr) => tr.role === role);

          return (
            <div key={role} className="relative group transform transition-all duration-300">
              {!isSelected ? (
                <button
                  type="button"
                  onClick={() => handleAddTeamRole(role)}
                  className="w-full px-4 py-2.5 text-left justify-start break-words
                    bg-gradient-to-br from-white to-gray-50 hover:to-blue-50
                    border border-gray-100 hover:border-blue-200 rounded-lg
                    group-hover:shadow-[0_6px_12px_-4px_rgba(79,114,205,0.2)]
                    group-hover:scale-[1.01] relative overflow-hidden
                    transition-all duration-300 ease-out"
                >
                 
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                      <UserCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{role}</span>
                  </div>
                </button>
              ) : (
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-0.5 rounded-lg shadow-lg shadow-blue-500/20">
                  <div className="flex items-center bg-gradient-to-br from-blue-600/95 to-indigo-600/95 backdrop-blur-sm text-white p-3 rounded-[6px] space-x-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                        <UserCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="flex-1 break-words text-sm font-medium">{role}</span>
                      <span className="text-xs font-semibold text-blue-100">Count:</span>
                      <input
                        type="text"
                        value={selectedRole.count}
                        onChange={(e) => handleUpdateRoleCount(role, e.target.value)}
                        className="w-16 bg-white/10 py-1.5 px-2 rounded-md border border-white/20 
                          text-white text-sm placeholder-white/50 focus:bg-white/20 focus:border-white/40 
                          transition-all duration-300 outline-none text-center"
                        min="1"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200
                        focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative mt-6 group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex space-x-2">
          <input
            type="text"
            placeholder="Add custom role"
            value={customRoleInput}
            onChange={(e) => setCustomRoleInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCustomRoleAdd();
              }
            }}
            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm
              focus:border-blue-400 focus:outline-none transition-all duration-300
              group-hover:shadow-md shadow-blue-500/5 placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={handleCustomRoleAdd}
            className="shrink-0 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
              hover:to-indigo-700 text-white rounded-lg shadow-md shadow-blue-500/30 hover:shadow-lg 
              hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )}
</div> */}
              <Card className="p-6 mb-6">
                {formData.catOfWorkFlow && toolsMap[formData.catOfWorkFlow] && (
                  <div className="space-y-4 mb-6">
                    <CardTitle className="text-2xl font-bold">
                      Tools Used
                    </CardTitle>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {allTools.map((tool) => {
                        const isSelected = formData.toolsUsed.includes(tool);

                        return (
                          <div key={tool} className="relative">
                            {!isSelected ? (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleAddTool(tool)}
                                className="h-auto py-2 px-3 text-sm w-full text-left justify-start break-words"
                              >
                                {tool}
                              </Button>
                            ) : (
                              <div className="flex items-center bg-blue-600 text-white p-2 rounded-lg space-x-2">
                                <span className="flex-1 break-words text-sm">
                                  {tool}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveTool(tool)}
                                  className="shrink-0 text-white hover:text-white/80 hover:bg-blue-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* <div className="flex space-x-2">
                      <Input
                        placeholder="Add custom tool"
                        value={customToolInput}
                        onChange={(e) => setCustomToolInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleCustomToolAdd();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={handleCustomToolAdd}
                        className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div> */}
                     <div className="flex space-x-2">
                                          <Input
                                            placeholder="Add custom tool"
                                            value={customToolInput}
                                            onChange={(e) => setCustomToolInput(e.target.value)}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                e.preventDefault();
                                                if (customToolInput.trim()) {
                                                  handleCustomToolAdd();
                                                }
                                              }
                                            }}
                                          />
                                          <Button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              if (customToolInput.trim()) {
                                                handleCustomToolAdd();
                                              }
                                            }}
                                            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                  </div>
                )}
              </Card>
              {/* <div className="p-6 bg-gradient-to-br from-white via-gray-50/90 to-white rounded-xl shadow-2xl relative overflow-hidden border border-white/60 backdrop-blur-sm mb-6">
  
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
  <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
  <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl" />
  
  {formData.catOfWorkFlow && toolsMap[formData.catOfWorkFlow] && (
    <div className="space-y-6 relative">
      
      <div className="relative">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
          Tools Used
        </h2>
        <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allTools.map((tool) => {
          const isSelected = formData.toolsUsed.includes(tool);

          return (
            <div key={tool} className="relative group transform transition-all duration-300">
              {!isSelected ? (
                <button
                  type="button"
                  onClick={() => handleAddTool(tool)}
                  className="w-full px-4 py-2.5 text-left justify-start break-words
                    bg-gradient-to-br from-white to-gray-50 hover:to-blue-50
                    border border-gray-100 hover:border-blue-200 rounded-lg
                    group-hover:shadow-[0_6px_12px_-4px_rgba(79,114,205,0.2)]
                    group-hover:scale-[1.01] relative overflow-hidden
                    transition-all duration-300 ease-out"
                >
                
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                      <Wrench className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{tool}</span>
                  </div>
                </button>
              ) : (
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-0.5 rounded-lg shadow-lg shadow-blue-500/20">
                  <div className="flex items-center bg-gradient-to-br from-blue-600/95 to-indigo-600/95 backdrop-blur-sm text-white p-2.5 rounded-[6px] space-x-2">
                    <div className="flex items-center space-x-2.5 flex-1">
                      <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                      <span className="flex-1 break-words text-sm font-medium">{tool}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTool(tool)}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200
                        focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative mt-6 group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex space-x-2">
          <input
            type="text"
            placeholder="Add custom tool"
            value={customToolInput}
            onChange={(e) => setCustomToolInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCustomToolAdd();
              }
            }}
            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm
              focus:border-blue-400 focus:outline-none transition-all duration-300
              group-hover:shadow-md shadow-blue-500/5 placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={handleCustomToolAdd}
            className="shrink-0 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
              hover:to-indigo-700 text-white rounded-lg shadow-md shadow-blue-500/30 hover:shadow-lg 
              hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )}
</div> */}


                    
              <Card className="p-6 mb-4">
  {formData.catOfWorkFlow && (
    <div className="space-y-4">
      <CardTitle className="text-2xl font-bold">
        Workflow Steps
      </CardTitle>
      <div className="grid grid-cols-1 gap-2">
      {[
          ...(stepsMap[formData.catOfWorkFlow]?.stages || []),
          ...formData.steps
            .filter(step => !stepsMap[formData.catOfWorkFlow]?.stages?.includes(step.step))
            .map(step => step.step)
        ].map((step) => {
          const isSelected = formData.steps.some(
            (s) => s.step === step
          );
          return (
            <Button
              type="button"
              key={step}
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleAddStep(step)}
              className={`w-full text-left justify-start break-words ${
                isSelected
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }`}
              disabled={isSelected}
            >
              {step}
            </Button>
          );
        })}
      </div>

      {/* <div className="flex space-x-2">
        <Input
          placeholder="Add custom step"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddCustomStep(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <Button
          type="button"
          onClick={() => {
            const input = document.querySelector(
              'input[placeholder="Add custom step"]'
            );
            handleAddCustomStep(input.value);
            input.value = "";
          }}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div> */}
<div className="flex space-x-2">
        <Input
          placeholder="Add custom step"
          value={customStepInput}
          onChange={(e) => setCustomStepInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustomStep(customStepInput);
            }
          }}
        />
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleAddCustomStep(customStepInput);
          }}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={formData.steps.map((step) => step.step)}
          strategy={verticalListSortingStrategy}
        >
          {formData.steps.map((step, index) => (
            <SortableStep
              key={step.step}
              step={step}
              index={index}
              onRemove={(index) => {
                const newSteps = formData.steps.filter(
                  (_, i) => i !== index
                );
                setFormData((prev) => ({
                  ...prev,
                  steps: newSteps,
                }));
              }}
              onUpdateStep={handleUpdateStep}
              categoryName={formData.catOfWorkFlow}  // Changed from userOrgType to catOfWorkFlow
              teamRoles={teamRoleNames}
              stepsMap={stepsMap}  // Pass stepsMap as prop
            />
          ))}
        </SortableContext>
      </DndContext>
      {formData.steps.length > 1 && (
        <div className="display flex">
          <p className="text-sm text-gray-500 ml-2">
            <i>Drag to reorder using &nbsp; </i>
          </p>
          <GripVertical className="h-5 w-5 text-gray-500" />
        </div>
      )}
    </div>
  )}
              </Card>


{/* <div className="p-6 bg-gradient-to-br from-white via-gray-50/90 to-white rounded-xl shadow-2xl relative overflow-hidden border border-white/60 backdrop-blur-sm mb-6">
 
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
  <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
  <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl" />
  
  {formData.catOfWorkFlow && (
    <div className="space-y-6 relative">
    
      <div className="relative">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
          Workflow Steps
        </h2>
        <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {stepsMap[formData.catOfWorkFlow]?.stages?.map((step) => {
          const isSelected = formData.steps.some((s) => s.step === step);
          return (
            <div key={step} className="relative group transform transition-all duration-300">
              <button
                type="button"
                onClick={() => handleAddStep(step)}
                disabled={isSelected}
                className={`w-full px-4 py-2.5 text-left justify-start break-words
                  ${isSelected 
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                    : "bg-gradient-to-br from-white to-gray-50 hover:to-blue-50 border border-gray-100 hover:border-blue-200"
                  } rounded-lg relative overflow-hidden group-hover:shadow-[0_6px_12px_-4px_rgba(79,114,205,0.2)]
                  transition-all duration-300`}
              >
                {!isSelected && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent transition-opacity duration-300" />
                  </>
                )}
                <span className="relative z-10 text-sm">{step}</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="relative mt-6 group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex space-x-2">
          <input
            placeholder="Add custom step"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddCustomStep(e.target.value);
                e.target.value = "";
              }
            }}
            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm
              focus:border-blue-400 focus:outline-none transition-all duration-300
              group-hover:shadow-md shadow-blue-500/5 placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.querySelector('input[placeholder="Add custom step"]');
              handleAddCustomStep(input.value);
              input.value = "";
            }}
            className="shrink-0 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
              hover:to-indigo-700 text-white rounded-lg shadow-md shadow-blue-500/30 hover:shadow-lg 
              hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={formData.steps.map((step) => step.step)}
          strategy={verticalListSortingStrategy}
        >
          {formData.steps.map((step, index) => (
            <SortableStep
              key={step.step}
              step={step}
              index={index}
              // onRemove={onRemove}
              onRemove={handleRemoveStep}
              onUpdateStep={handleUpdateStep}
              categoryName={formData.catOfWorkFlow}
              teamRoles={teamRoleNames}
              stepsMap={stepsMap}
            />
          ))}
        </SortableContext>
      </DndContext>

      {formData.steps.length > 1 && (
        <div className="flex items-center text-gray-500">
          <p className="text-sm italic">Drag to reorder using</p>
          <GripVertical className="h-5 w-5 ml-2" />
        </div>
      )}
    </div>
  )}
</div> */}
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
              >
                Analyse
              </Button>
            </form>
          </div>
        )}
      </div>
      {/* <pre className="p-4 bg-secondary rounded-lg overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre> */}
    </div>
  );
};

export default WorkflowForm;

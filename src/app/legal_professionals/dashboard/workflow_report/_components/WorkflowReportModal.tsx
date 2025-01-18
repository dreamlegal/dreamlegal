// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const WorkflowReportModal = ({ isOpen, onClose, report }) => {
//   if (!report) return null;
//   console.log(report);
//   return (
  
// <Dialog open={isOpen} onOpenChange={onClose}>
//   <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//     <DialogHeader>
//       <DialogTitle className="text-2xl font-bold">Workflow Analysis Report</DialogTitle>
//     </DialogHeader>
//     <Card className="mb-4">
//       <CardHeader>
//         <CardTitle>Response Data</CardTitle>
//       </CardHeader>
//       <CardContent className="overflow-x-auto bg-gray-50 p-4 rounded-md">
//         <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//           {JSON.stringify(report.response, null, 2)}
//         </pre>
//       </CardContent>
//     </Card>
//   </DialogContent>
// </Dialog>


//   );
// };

// export default WorkflowReportModal;


// "use client";

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Dashboard from "../_components/CurrenObservation";
// import QuantitativeAnalysis from "../_components/QuantitativeAnalysis";
// import FlagsDashboard from "../_components/RiskAssesment";
// import OptimizationDashboard from "../_components/OptimisationOppurtunities";
// import FileStructureStrategy from "../_components/StrategicRecommendation";
// import PremiumRoadmap from "../_components/ImplementationRoadmap";
// import PerformanceTracking from "../_components/PerformanceTracking";
// import ExecutiveSummary from "../_components/Conclusion";

// const transformKey = (key) => key.replace(/\s+/g, "_");

// const transformData = (rawData) => {
//   const transformed = {};

//   Object.entries(rawData).forEach(([key, value]) => {
//     const newKey = transformKey(key);

//     if (typeof value === "object" && value !== null) {
//       if (Array.isArray(value)) {
//         transformed[newKey] = value;
//       } else {
//         transformed[newKey] = Object.entries(value).reduce((acc, [subKey, subValue]) => {
//           acc[transformKey(subKey)] = subValue;
//           return acc;
//         }, {});
//       }
//     } else {
//       transformed[newKey] = value;
//     }
//   });

//   return transformed;
// };

// const WorkflowReportModal = ({ isOpen, onClose, report }) => {
//   if (!report || !report.response) return null;

//   const transformedData = transformData(report.response);

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">
//             Workflow Analysis Report
//           </DialogTitle>
//         </DialogHeader>
//         <Card className="mb-4">
//           <CardHeader>
//             <CardTitle>Response Data</CardTitle>
//           </CardHeader>
//           <CardContent className="overflow-x-auto bg-gray-50 p-4 rounded-md">
//             {/* <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//               {JSON.stringify(transformedData, null, 2)}
//             </pre> */}
//               <div className="p-4">
//           <Dashboard data={transformedData} />
//           <QuantitativeAnalysis data={transformedData} />
//           <FlagsDashboard data={transformedData} />
//           <OptimizationDashboard data={transformedData} />
//           <FileStructureStrategy data={transformedData} />
//           <PremiumRoadmap data={transformedData} />
//           <PerformanceTracking data={transformedData} />
//           <ExecutiveSummary data={transformedData} />
//         </div>
//           </CardContent>
//         </Card>

      
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default WorkflowReportModal;


"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Activity, FileText, Target, Settings, Zap } from 'lucide-react';
import Dashboard from "../_components/CurrenObservation";
import QuantitativeAnalysis from "../_components/QuantitativeAnalysis";
import FlagsDashboard from "../_components/RiskAssesment";
import OptimizationDashboard from "../_components/OptimisationOppurtunities";
import FileStructureStrategy from "../_components/StrategicRecommendation";
import PremiumRoadmap from "../_components/ImplementationRoadmap";
import PerformanceTracking from "../_components/PerformanceTracking";
import ExecutiveSummary from "../_components/Conclusion";

const NavigationTab = ({ icon: Icon, label, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      flex items-center gap-3 p-3 rounded-lg cursor-pointer
      transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
          : 'hover:bg-gray-50 text-gray-600'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
    <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-200 ${
      isActive ? 'rotate-90' : ''
    }`} />
  </motion.div>
);

const SectionWrapper = ({ children, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const transformKey = (key) => key.replace(/\s+/g, "_");

const transformData = (rawData) => {
  const transformed = {};
  Object.entries(rawData).forEach(([key, value]) => {
    const newKey = transformKey(key);
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        transformed[newKey] = value;
      } else {
        transformed[newKey] = Object.entries(value).reduce((acc, [subKey, subValue]) => {
          acc[transformKey(subKey)] = subValue;
          return acc;
        }, {});
      }
    } else {
      transformed[newKey] = value;
    }
  });
  return transformed;
};

const WorkflowReportModal = ({ isOpen, onClose, report }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  if (!report || !report.response) return null;
  
  const transformedData = transformData(report.response);
  
  const sections = [
    { id: 'dashboard', label: 'Current Observation', icon: Activity, component: Dashboard },
    { id: 'quantitative', label: 'Quantitative Analysis', icon: FileText, component: QuantitativeAnalysis },
    { id: 'flags', label: 'Risk Assessment', icon: Target, component: FlagsDashboard },
    { id: 'optimization', label: 'Optimization', icon: Settings, component: OptimizationDashboard },
    { id: 'strategy', label: 'Strategic Recommendations', icon: Target, component: FileStructureStrategy },
    { id: 'roadmap', label: 'Implementation Roadmap', icon: Zap, component: PremiumRoadmap },
    { id: 'performance', label: 'Performance Tracking', icon: Activity, component: PerformanceTracking },
    { id: 'summary', label: 'Executive Summary', icon: FileText, component: ExecutiveSummary }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0">
        <div className="grid grid-cols-12 h-full">
          {/* Sidebar Navigation */}
          <div className="col-span-3 border-r border-gray-200 p-4 bg-white">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Workflow Analysis
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="h-[calc(90vh-8rem)]">
              <div className="space-y-2 pr-4">
                {sections.map((section) => (
                  <NavigationTab
                    key={section.id}
                    icon={section.icon}
                    label={section.label}
                    isActive={activeSection === section.id}
                    onClick={() => setActiveSection(section.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 bg-gray-50">
            <ScrollArea className="h-[90vh]">
              <div className="p-6">
                {sections.map((section) => (
                  <SectionWrapper key={section.id} isVisible={activeSection === section.id}>
                    {activeSection === section.id && (
                      <section.component data={transformedData} />
                    )}
                  </SectionWrapper>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowReportModal;
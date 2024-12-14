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

// //   return (
  
// // <Dialog open={isOpen} onOpenChange={onClose}>
// //   <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// //     <DialogHeader>
// //       <DialogTitle className="text-2xl font-bold">Workflow Analysis Report</DialogTitle>
// //     </DialogHeader>
// //     <Card className="mb-4">
// //       <CardHeader>
// //         <CardTitle>Response Data</CardTitle>
// //       </CardHeader>
// //       <CardContent className="overflow-x-auto bg-gray-50 p-4 rounded-md">
// //         <pre className="text-sm text-gray-800 whitespace-pre-wrap">
// //           {JSON.stringify(report.response, null, 2)}
// //         </pre>
// //       </CardContent>
// //     </Card>
// //   </DialogContent>
// // </Dialog>


// //   );
// // };

// // export default WorkflowReportModal;

// "use client"
// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";


// import Dashboard from '../_components/CurrenObservation';
// import QuantitativeAnalysis from '../_components/QuantitativeAnalysis';
// import FlagsDashboard from '../_components/RiskAssesment';
// import OptimizationDashboard from '../_components/OptimisationOppurtunities';
// import FileStructureStrategy from '../_components/StrategicRecommendation';
// import PremiumRoadmap from '../_components/ImplementationRoadmap';
// import PerformanceTracking from '../_components/PerformanceTracking';
// // import ExecutiveSummary from '../_components/Conclusion;
// import ExecutiveSummary from '../_components/Conclusion';

// const WorkflowReportModal = () => {
//   const data = {
//     "Current Observation": {
//       "Team Structure Analysis": "The legal team is compact, consisting of one Lawyer, one Junior Lawyer, and one Intern, indicating a small-scale operation likely focused on managing a handful of cases at a time. Each role is critical, with responsibilities seemingly well-distributed across different stages of litigation management. However, given the workload and high exhaustion levels reported, this setup suggests potential over-reliance on the limited team members, which could lead to burnout and decreased productivity.",
//       "Technical Workflow Assessment": "The workflow is centered on Litigation Management with the use of a Court Docket Management tool. Case Intake and Pleadings stages are notably repetitive and exhausting, particularly managed by the Junior Lawyer and Lawyer respectively. Despite these challenges, the team employs a structured approach to legal procedures, but lacks automation that could alleviate stress. The technical setup could benefit significantly from digital tools aimed at reducing repetitive tasks.",
//       "Key Performance Metrics": "Key performance metrics revolve around stage-specific exhaustion and repetitiveness, with Case Intake and Pleadings scoring the highest on both scales (5/5 each). Discovery also reports a high exhaustion score (5/5) despite low repetitiveness, indicating a need for enhanced resource allocation or workflow optimization.",
//       "Resource Utilization Insights": "Resource allocation appears to depend heavily on the Lawyer and Junior Lawyer, with the Intern handling less critical tasks. The absence of task-specific tools and support mechanisms is notable, particularly in high-exhaustion stages where resource redistribution or process automation could yield positive outcomes."
//     },
//     "Quantitative Analysis": {
//       "Lost Opportunities with Numerical Data": "Considering the high repetitiveness and exhaustion, particularly in Case Intake and Pleadings involving the Lawyer and Junior Lawyer, there are substantial lost opportunities in time efficiency—likely costing the team upwards of 30% potential productivity gains monthly.",
//       "Comparative Performance Metrics": "Compared to industry benchmarks where advanced automation reduces manual input by 20-30%, this team lags in efficiency, particularly in tasks like drafting and responding to motions, impacting overall case throughput and turnaround times.",
//       "Financial Impact Assessment": "The lack of automation and reliance on human resources for repetitive tasks could imply potential financial losses, approximating additional costs in overtime or delayed case resolutions. Potentially, operational costs might be reduced by introducing tech solutions, saving approximately 10-15% in annual legal expenditure."
//     },
//     "Risk Assessment": {
//       "Critical Red Flags": [
//         "High Exhaustion Levels: Case Intake and Pleadings show exhaustion scores of 5/5, indicating risks of burnout and error proliferation.",
//         "Over-dependence on Personnel: A small team faces critical risks if any member is unavailable, potentially stalling operations.",
//         "Limited Technological Integration: Without adequate technological support, the current workflow faces inefficiencies and reduced agility."
//       ],
//       "Positive Green Flags": [
//         "Roles Clearly Defined: Each stage has designated roles, showcasing clarity in task assignment.",
//         "Court Docket Management Tool Usage: Indicates an openness to technological solutions, which can be a foundation for further integration."
//       ],
//       "Potential Risks with Mitigation Strategies": [
//         {
//           "Risk": "Burnout due to High Exhaustion Levels",
//           "Mitigation": "Implement regular breaks and task rotations."
//         },
//         {
//           "Risk": "Operational Delays in Key Stages",
//           "Mitigation": "Adopt lean workflow strategies to streamline Case Intake and Pleadings."
//         },
//         {
//           "Risk": "Inaccuracy in High-pressure Stages",
//           "Mitigation": "Introduce checklist and verification systems to enhance task accuracy."
//         }
//       ]
//     },
//     "Optimization Opportunities": {
//       "Actionable Workflow Improvements": [
//         "Adopt Document Management Software to automate repetitive tasks like creation and categorization, thus improving processing speeds significantly.",
//         "Reallocate task roles, leveraging administrative staff to handle primary document categorization and storage, enabling Associates to focus on complex legal work.",
//         "Implement Access Control Systems to enhance security while reducing Partners' involvement in monitoring document activity."
//       ],
//       "Expected Impact Metrics": "Implementation of these automation and role reallocation strategies should cut down document processing time by at least 40%, with potential cost savings of 25% on annual operational spending.",
//       "Implementation Complexity Rating": "Medium—most improvements involve software integration and role adjustments without requiring significant infrastructural changes but necessitate training and change management."
//     },
//     "Strategic Recommendations": {
//       "Detailed Solutions": [
//         "Implement AI-driven document drafting tools: Cost-effective and decreases manual drafting time by an estimated 25%.",
//         "Develop standardized document templates: Reduces variations and errors, enhancing efficiency.",
//         "Formalize Paralegal and Administrative Support Roles: Clearer definitions and responsibilities will help optimize resource allocation."
//       ],
//       "Cost-benefit Analysis": "Initial software setup costs are offset by reductions in manual labor, improved document turnaround times, and lower error margins that improve overall client satisfaction and retention.",
//       "Priority Levels": "High for automation tools, Medium for role optimization, Low for process standardization (templates).",
//       "Resource Requirements": "Initial investment in software and training for employees across all levels in utilizing new integrated systems."
//     },
  
//     "Implementation Roadmap": {
//       "30 Day Action Plan": "Conduct requirements gathering for a document management system and begin vendor evaluations.",
//       "60 Day Action Plan": "Initiate pilot testing of selected tools with a focus group of Associates and Paralegals.",
//       "90 Day Action Plan": "Rollout complete software solutions firm-wide, supported by a training program and analytics setup for tracking performance metrics.",
//       "Key Milestones": "Software deployment, First report on time savings, Full training completion.",
//       "Success Criteria": "Achieving a 30% reduction in document processing times within the first 90 days post-system introduction.",
//       "Resource Allocation": "Allocate technological budgets for AI systems, designate cross-functional task teams for implementation oversight."
//     },
//     "Performance Tracking": {
//       "KPIs with Baselines": [
//         "Document Turnaround Time: Current baseline at 48 hours, target <24 hours.",
//         "Role Utilization Metrics: Measure administrative role engagement increase by 40%.",
//         "Cost Reduction: Aim to reduce recurrent operational costs by at least 15% in the first year."
//       ],
//       "Measurement Methodology": "Use an analytics dashboard to capture real-time data on document processing times, role task allocation, and associated costs.",
//       "Target Thresholds": "Aim for monthly reviews, targeting performance indicators meeting 90% of revised expectations."
//     },
//     "Executive Summary": {
//       "Overall Assessment": "The current document management workflow within the law firm shows substantial room for efficiency gains through the introduction of automated systems and better role distribution.",
//       "Critical Findings": "High exhaustion and repetition scores highlight urgent needs for automation and optimized task delegation.",
//       "Strategic Direction": "Invest strategically in technology and role restructuring to not only enhance current operations but also position the firm competitively in terms of client service efficiency and cost management."
//     }
//   }

//   return (
   
//       <>
//             {/* <Dashboard data={data} />
      
//             <QuantitativeAnalysis data={data} />
        
//             <FlagsDashboard data={data} />
         
//             <OptimizationDashboard data={data} />
          
//             <FileStructureStrategy data={data} />
          
//             <PremiumRoadmap data={data} />
         
//             <PerformanceTracking data={data} /> */}
        
//             <ExecutiveSummary data={data} />
//     </>  
      
//   );
// };

// export default WorkflowReportModal;



"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import Dashboard from '../_components/CurrenObservation';
import QuantitativeAnalysis from '../_components/QuantitativeAnalysis';
import FlagsDashboard from '../_components/RiskAssesment';
import OptimizationDashboard from '../_components/OptimisationOppurtunities';
import FileStructureStrategy from '../_components/StrategicRecommendation';
import PremiumRoadmap from '../_components/ImplementationRoadmap';
import PerformanceTracking from '../_components/PerformanceTracking';
// import ExecutiveSummary from '../_components/Conclusion;
import ExecutiveSummary from '../_components/Conclusion';




const TestWorkflowReport = () => {
  // Raw data with spaces


  // utils/transformData.ts

 const transformKey = (key: string): string => {
    return key.replace(/\s+/g, '_');
  };
  
  const transformData = (rawData: any) => {
    const transformed: any = {};
  
    // Transform top-level keys
    Object.entries(rawData).forEach(([key, value]) => {
      const newKey = transformKey(key);
      
      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          transformed[newKey] = value;
        } else {
          // Transform nested object keys
          transformed[newKey] = Object.entries(value).reduce((acc: any, [subKey, subValue]) => {
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
  const rawData = {
    "Current Observation": {
     
      "Technical Workflow Assessment": "The workflow is centered on Litigation Management with the use of a Court Docket Management tool. Case Intake and Pleadings stages are notably repetitive and exhausting, particularly managed by the Junior Lawyer and Lawyer respectively. Despite these challenges, the team employs a structured approach to legal procedures, but lacks automation that could alleviate stress. The technical setup could benefit significantly from digital tools aimed at reducing repetitive tasks.",
      "Key Performance Metrics": "Key performance metrics revolve around stage-specific exhaustion and repetitiveness, with Case Intake and Pleadings scoring the highest on both scales (5/5 each). Discovery also reports a high exhaustion score (5/5) despite low repetitiveness, indicating a need for enhanced resource allocation or workflow optimization.",
      "Resource Utilization Insights": "Resource allocation appears to depend heavily on the Lawyer and Junior Lawyer, with the Intern handling less critical tasks. The absence of task-specific tools and support mechanisms is notable, particularly in high-exhaustion stages where resource redistribution or process automation could yield positive outcomes."
    },
    "Quantitative Analysis": {
      "Lost Opportunities with Numerical Data": "Considering the high repetitiveness and exhaustion, particularly in Case Intake and Pleadings involving the Lawyer and Junior Lawyer, there are substantial lost opportunities in time efficiency—likely costing the team upwards of 30% potential productivity gains monthly.",
      "Comparative Performance Metrics": "Compared to industry benchmarks where advanced automation reduces manual input by 20-30%, this team lags in efficiency, particularly in tasks like drafting and responding to motions, impacting overall case throughput and turnaround times.",
      "Financial Impact Assessment": "The lack of automation and reliance on human resources for repetitive tasks could imply potential financial losses, approximating additional costs in overtime or delayed case resolutions. Potentially, operational costs might be reduced by introducing tech solutions, saving approximately 10-15% in annual legal expenditure."
    },
    "Risk Assessment": {
      "Critical Red Flags": [
        "High Exhaustion Levels: Case Intake and Pleadings show exhaustion scores of 5/5, indicating risks of burnout and error proliferation.",
        "Over-dependence on Personnel: A small team faces critical risks if any member is unavailable, potentially stalling operations.",
        "Limited Technological Integration: Without adequate technological support, the current workflow faces inefficiencies and reduced agility."
      ],
      "Positive Green Flags": [
        "Roles Clearly Defined: Each stage has designated roles, showcasing clarity in task assignment.",
        "Court Docket Management Tool Usage: Indicates an openness to technological solutions, which can be a foundation for further integration."
      ],
      "Potential Risks with Mitigation Strategies": [
        {
          "Risk": "Burnout due to High Exhaustion Levels",
          "Mitigation": "Implement regular breaks and task rotations."
        },
        {
          "Risk": "Operational Delays in Key Stages",
          "Mitigation": "Adopt lean workflow strategies to streamline Case Intake and Pleadings."
        },
        {
          "Risk": "Inaccuracy in High-pressure Stages",
          "Mitigation": "Introduce checklist and verification systems to enhance task accuracy."
        }
      ]
    },
    "Optimization Opportunities": {
      "Actionable Workflow Improvements": [
        "Adopt Document Management Software to automate repetitive tasks like creation and categorization, thus improving processing speeds significantly.",
        "Reallocate task roles, leveraging administrative staff to handle primary document categorization and storage, enabling Associates to focus on complex legal work.",
        "Implement Access Control Systems to enhance security while reducing Partners' involvement in monitoring document activity."
      ],
      "Expected Impact Metrics": "Implementation of these automation and role reallocation strategies should cut down document processing time by at least 40%, with potential cost savings of 25% on annual operational spending.",
      "Implementation Complexity Rating": "Medium—most improvements involve software integration and role adjustments without requiring significant infrastructural changes but necessitate training and change management."
    },
    "Strategic Recommendations": {
      "Detailed Solutions": [
        "Implement AI-driven document drafting tools: Cost-effective and decreases manual drafting time by an estimated 25%.",
        "Develop standardized document templates: Reduces variations and errors, enhancing efficiency.",
        "Formalize Paralegal and Administrative Support Roles: Clearer definitions and responsibilities will help optimize resource allocation."
      ],
      "Cost-benefit Analysis": "Initial software setup costs are offset by reductions in manual labor, improved document turnaround times, and lower error margins that improve overall client satisfaction and retention.",
      "Priority Levels": "High for automation tools, Medium for role optimization, Low for process standardization (templates).",
      "Resource Requirements": "Initial investment in software and training for employees across all levels in utilizing new integrated systems."
    },
  
    "Implementation Roadmap": {
      "30 Day Action Plan": "Conduct requirements gathering for a document management system and begin vendor evaluations.",
      "60 Day Action Plan": "Initiate pilot testing of selected tools with a focus group of Associates and Paralegals.",
      "90 Day Action Plan": "Rollout complete software solutions firm-wide, supported by a training program and analytics setup for tracking performance metrics.",
      "Key Milestones": "Software deployment, First report on time savings, Full training completion.",
      "Success Criteria": "Achieving a 30% reduction in document processing times within the first 90 days post-system introduction.",
      "Resource Allocation": "Allocate technological budgets for AI systems, designate cross-functional task teams for implementation oversight."
    },
    "Performance Tracking": {
      "KPIs with Baselines": [
        "Document Turnaround Time: Current baseline at 48 hours, target <24 hours.",
        "Role Utilization Metrics: Measure administrative role engagement increase by 40%.",
        "Cost Reduction: Aim to reduce recurrent operational costs by at least 15% in the first year."
      ],
      "Measurement Methodology": "Use an analytics dashboard to capture real-time data on document processing times, role task allocation, and associated costs.",
      "Target Thresholds": "Aim for monthly reviews, targeting performance indicators meeting 90% of revised expectations."
    },
    "Executive Summary": {
      "Overall Assessment": "The current document management workflow within the law firm shows substantial room for efficiency gains through the introduction of automated systems and better role distribution.",
      "Critical Findings": "High exhaustion and repetition scores highlight urgent needs for automation and optimized task delegation.",
      "Strategic Direction": "Invest strategically in technology and role restructuring to not only enhance current operations but also position the firm competitively in terms of client service efficiency and cost management."
    }
  }


  // Transform the data
  const transformedData = transformData(rawData);
  console.log(transformedData);

  return (
    <div className="p-8">
      {/* Test one component at a time with transformed data */}
      
      
      
      <Dashboard data={transformedData} />
      <QuantitativeAnalysis data={transformedData} />
      <FlagsDashboard data={transformedData} />
       <OptimizationDashboard data={transformedData} />
    
        <FileStructureStrategy data={transformedData} />
     
     <PremiumRoadmap data={transformedData} />
      <PerformanceTracking data={transformedData} />
      <ExecutiveSummary data={transformedData} />
     
    </div>
  );
};

export default TestWorkflowReport;
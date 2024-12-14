// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Modal from "@/components/Modal"; // Assuming you have a Modal component
// import { useParams } from "next/navigation"; 
// const ReportPage = () => {
//   const router = useRouter();
//   const { id } = useParams(); // Get the formId from the URL
//   const [formData, setFormData] = useState<any>(null);
//   const [responseData, setResponseData] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     // Fetch workflow process and response data using the id
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/getWorkflowData", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ formId: id }), // Send formId in the request body
//         });

//         const data = await res.json();
//         if (res.ok) {
//           setFormData(data.workFlowProcess);
//           setResponseData(data.workflowResponse);
//         } else {
//           toast.error(data.message || "Failed to fetch report data");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while fetching report data");
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (!formData || !responseData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="report-container">
//       <h1>Report for Workflow ID: {id}</h1>

//       <div className="form-section">
//         <h2>Form Data</h2>
//         <div>
//           <strong>Organization Type: </strong> {formData.userOrgType}
//         </div>
//         <div>
//           <strong>Team Size: </strong> {formData.userTeamSize}
//         </div>
//         <div>
//           <strong>Category of Workflow: </strong> {formData.categoryOfWorkflow}
//         </div>
//         <div>
//           <strong>Team Roles: </strong> {JSON.stringify(formData.teamRoles)}
//         </div>
//         <div>
//           <strong>Tools Used: </strong> {JSON.stringify(formData.toolsUsed)}
//         </div>
//         <div>
//           <strong>Workflow Steps: </strong> {JSON.stringify(formData.workFlowSteps)}
//         </div>
//       </div>

//       <div className="response-section">
//         <h2>Report Data</h2>
//         <div>
//           <strong>Report Name: </strong> {responseData.name}
//         </div>
//         <div>
//           <strong>Category of Analysis: </strong> {responseData.categoryOfAnalysis}
//         </div>
//         <div>
//           <strong>Report Data: </strong> {JSON.stringify(responseData.data)}
//         </div>
//         <div>
//           <button onClick={() => setIsModalOpen(true)}>View Full Report</button>
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default ReportPage;


"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "@/components/Modal"; // Assuming you have a Modal component
import { motion, AnimatePresence ,useAnimation } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Activity, FileText, Target, Settings, Zap, Menu, X } from 'lucide-react';
import Dashboard from "../../_components/CurrenObservation";
import QuantitativeAnalysis from "../../_components/QuantitativeAnalysis";
import FlagsDashboard from "../../_components/RiskAssesment";
import OptimizationDashboard from "../../_components/OptimisationOppurtunities";
import FileStructureStrategy from "../../_components/StrategicRecommendation";
import PremiumRoadmap from "../../_components/ImplementationRoadmap";
import PerformanceTracking from "../../_components/PerformanceTracking";
import ExecutiveSummary from "../../_components/Conclusion";
import { ChevronLeft ,FileDown } from 'lucide-react';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import ReactDOMServer from 'react-dom/server';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { CheckCircle, XCircle } from 'lucide-react';
const transformKey = (key: string) => key.replace(/\s+/g, "_");



const transformData = (rawData: any) => {
  const transformed: any = {};
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

// const NavigationTab = ({ icon: Icon, label, isActive, onClick }) => (
//   <motion.div
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.98 }}
//     onClick={onClick}
//     className={`
//       flex items-center gap-3 p-3 rounded-lg cursor-pointer
//       transition-all duration-200 ${
//         isActive
//           ? 'bg-indigo-50 text-indigo-600 shadow-sm'
//           : 'hover:bg-gray-50 text-gray-600'
//       }
//     `}
//   >
//     <Icon className="w-5 h-5" />
//     <span className="text-sm font-medium">{label}</span>
//     <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-200 ${
//       isActive ? 'rotate-90' : ''
//     }`} />
//   </motion.div>
// );
const NavigationTab = ({ icon: Icon, label, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="
            flex items-center gap-3 p-3 rounded-lg cursor-pointer
            transition-all duration-200 hover:bg-gray-50 text-gray-600
        "
    >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
        {/* <ChevronRight className="w-4 h-4 ml-auto transition-transform duration-200" /> */}
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
            <XCircle className="w-5 h-5 text-white" />
          )}
          <span className="text-white text-sm font-medium">
            {notification.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



const PdfHeaderAndToc = ({ sections }) => {
  return (
    <div className="pdf-container max-w-4xl mx-auto">
      {/* Main wrapper with background and shadow */}
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-gray-100">

      
        {/* Header Section */}
        <div className="text-center py-8 border-b border-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Workflow Analysis Report
          </h1>
          <h2 className="text-xl text-gray-600">
            by DreamLegal
          </h2>
        </div>

        {/* Table of Contents */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Table of Contents
          </h3>
          
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className="flex items-center group hover:bg-white/70 rounded-lg p-3 transition-all duration-200"
              >
                {/* Number indicator with gradient */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium text-sm mr-4 shadow-sm">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                {/* Icon */}
                <section.icon className="w-5 h-5 text-gray-600 mr-3" />
                
                {/* Section label */}
                <span className="text-base text-gray-700">
                  {section.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page break after table of contents */}
      <div style={{ pageBreakAfter: 'always' }} />
    </div>
  );
};

// Add print styles
const styles = `
  @media print {
    .pdf-container {
      padding: 1.5rem;
      max-width: 100%;
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}




const ReportPage = () => {
  const contentRef = useRef(null);

  const { id } = useParams(); // Get the formId from the URL
  const [formData, setFormData] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAllSections, setShowAllSections] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [exportMode, setExportMode] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!id) return;

    // Fetch workflow process and response data using the id
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getWorkflowData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formId: id }), // Send formId in the request body
        });

        const data = await res.json();
        if (res.ok) {
          setFormData(data.workFlowProcess);
          setResponseData(data.workflowResponse);
        } else {
          toast.error(data.message || "Failed to fetch report data");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching report data");
      }
    };

    fetchData();
  }, [id]);

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

  const animationControls = sections.reduce((acc, section) => {
    acc[section.id] = useAnimation();
    return acc;
  }, {});

// Initialize as false until we get the real value from API
const [isSaved, setIsSaved] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [notification, setNotification] = useState(null);

// Update only when we have valid responseData
useEffect(() => {
  if (responseData && typeof responseData.isSaved === 'boolean') {
    setIsSaved(responseData.isSaved);
  }

  setTimeout(() => {
    // Start all animations after loading is done
    Promise.all(
        Object.values(animationControls).map((controls) =>
            controls.start({ opacity: 1, y: 0 })
        )
    ).then(() => {
        setIsLoading(false); // Remove loading indicator
    });
}, 1000); // Adjust timeout based on your data processing time

}, [responseData?.isSaved],animationControls);

  const showNotification = (success, message) => {
    setNotification({ success, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // const handleSaveToggle = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`/api/save-report`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ saved: !isSaved }),
  //     });

  //     if (!response.ok) throw new Error('Failed to update save status');

  //     const data = await response.json();
  //     setIsSaved(data.isSaved);
      
  //     showNotification(
  //       true, 
  //       data.isSaved ? "Report saved successfully" : "Report removed from saved items"
  //     );
  //   } catch (error) {
  //     console.error('Error toggling save status:', error);
  //     showNotification(false, "Failed to update save status");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSaveToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/save-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ saved: !isSaved, formId: responseData.formId }),
      });
  
      if (!response.ok) throw new Error('Failed to update save status');
  
      const data = await response.json();
      setIsSaved(data.isSaved);
  
      showNotification(
        true, 
        data.isSaved ? "Report saved successfully" : "Report removed from saved items"
      );
    } catch (error) {
      console.error('Error toggling save status:', error);
      showNotification(false, "Failed to update save status");
    } finally {
      setIsLoading(false);
    }
  };
  
  const [showTooltip, setShowTooltip] = useState(false);

  if (!formData || !responseData) {
    return <div>Loading...</div>;
  }

  const transformedData = transformData(responseData.data);




  
  //  const generatePDF = async () => {
  //   // Temporarily show all sections for PDF export
  //   setShowAllSections(true);

  //   // Ensure the DOM is fully rendered
  //   await new Promise((resolve) => {
  //     requestAnimationFrame(() => {
  //       setTimeout(resolve, 100); // Give it a moment for the browser to render all sections
  //     });
  //   });

  //   // Generate the PDF from the content
  //   const element = contentRef.current;
  //   html2pdf()
  //     .from(element)
  //     .save('workflow-analysis.pdf')
  //     .then(() => {
  //       // Revert to original state after PDF generation
  //       setShowAllSections(false);
  //     });
  // };

//   const generatePDF = () => {
//     // Clone the contentRef element
//     const element = contentRef.current.cloneNode(true);

//     // Ensure all sections are visible in the cloned element
//     Array.from(element.querySelectorAll('[style]')).forEach((el) => {
//         el.style.display = 'block'; // Make all sections visible
//     });

//     // Generate PDF from the cloned element
//     html2pdf()
//         .from(element)
//         .save('workflow-analysis.pdf')
//         .then(() => {
//             console.log('PDF generated successfully!');
//         })
//         .catch((error) => {
//             console.error('Error generating PDF:', error);
//         });
// };

// const generatePDF = () => {
//   // Clone the contentRef element
//   const element = contentRef.current.cloneNode(true);

//   // Ensure all sections are visible in the cloned element
//   Array.from(element.querySelectorAll('[style]')).forEach((el) => {
//       el.style.display = 'block'; // Make all sections visible
//   });

//   // Generate PDF from the cloned element
//   html2pdf()
//       .set({
//           margin: [10, 10, 10, 10],
//           filename: 'workflow-analysis.pdf',
//           image: { type: 'jpeg', quality: 1.0 },
//           html2canvas: {
//               scale: 3,
//               logging: true,
//               useCORS: true,
//           },
//           jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//       })
//       .from(element)
//       .save()
//       .then(() => {
//           console.log('PDF generated successfully!');
//       })
//       .catch((error) => {
//           console.error('Error generating PDF:', error);
//       });
// };

// const generatePDF = () => {
//   // Clone the contentRef element
//   const element = contentRef.current.cloneNode(true);

//   // Ensure all sections are visible
//   Array.from(element.querySelectorAll('[style]')).forEach((el) => {
//       el.style.display = 'block'; // Make all sections visible
//   });

//   // Disable animations and transitions
//   Array.from(element.querySelectorAll('*')).forEach((el) => {
//       el.style.animation = 'none';
//       el.style.transition = 'none';
//   });

//   // Handle lazy-loaded images
//   Array.from(element.querySelectorAll('img')).forEach((img) => {
//       if (!img.complete) {
//           img.onload = () => img.style.visibility = 'visible';
//       }
//   });

//   // Append to DOM for debugging (optional)
//   // document.body.appendChild(element);

//   // Generate PDF
//   html2pdf()
//       .set({
//           margin: [10, 10, 10, 10],
//           filename: 'workflow-analysis.pdf',
//           image: { type: 'jpeg', quality: 1.0 },
//           html2canvas: {
//               scale: 3,
//               logging: true,
//               useCORS: true,
//               ignoreElements: (el) => el.tagName === 'SCRIPT',
//           },
//           jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//       })
//       .from(element)
//       .save()
//       .then(() => console.log('PDF generated successfully!'))
//       .catch((error) => console.error('Error generating PDF:', error));
// };



// const generatePDF = () => {
//   // Stop all animations and set their final states
//   Promise.all(
//       Object.values(animationControls).map((controls) => {
//           controls.stop();
//           return controls.set({ opacity: 1, y: 0 }); // Set the final state
//       })
//   ).then(() => {
//       // Clone the contentRef element
//       const element = contentRef.current.cloneNode(true);

//       // Disable animations and transitions in the cloned DOM
//       Array.from(element.querySelectorAll('[style], [data-motion-style]')).forEach((el) => {
//           el.style.animation = 'none';
//           el.style.transition = 'none';
//       });

//       // Generate PDF
//       html2pdf()
//           .set({
//               margin: [10, 10, 10, 10],
//               filename: 'workflow-analysis.pdf',
//               image: { type: 'jpeg', quality: 1.0 },
//               html2canvas: {
//                   scale: 3,
//                   useCORS: true,
//               },
//               jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//           })
//           .from(element)
//           .save()
//           .then(() => console.log('PDF generated successfully!'))
//           .catch((error) => console.error('Error generating PDF:', error));
//   });
// };


// useEffect(() => {
//   // Simulate data/animation loading
//   setTimeout(() => {
//       // Start all animations after loading is done
//       Promise.all(
//           Object.values(animationControls).map((controls) =>
//               controls.start({ opacity: 1, y: 0 })
//           )
//       ).then(() => {
//           setIsLoading(false); // Remove loading indicator
//       });
//   }, 1000); // Adjust timeout based on your data processing time
// }, []);

// const generatePDF = () => {
//   // Stop all animations and set their final states
//   Promise.all(
//       Object.values(animationControls).map((controls) => {
//           controls.stop();
//           return controls.set({ opacity: 1, y: 0 });
//       })
//   ).then(() => {
//       // Clone the contentRef element
//       const element = contentRef.current.cloneNode(true);

//       // Disable animations and transitions in the cloned DOM
//       Array.from(element.querySelectorAll('[style], [data-motion-style]')).forEach((el) => {
//           el.style.animation = 'none';
//           el.style.transition = 'none';
//       });

//       // Generate PDF
//       html2pdf()
//           .set({
//               margin: [10, 10, 10, 10],
//               filename: 'workflow-analysis.pdf',
//               image: { type: 'jpeg', quality: 1.0 },
//               html2canvas: {
//                   scale: 3,
//                   useCORS: true,
//               },
//               jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//           })
//           .from(element)
//           .save()
//           .then(() => console.log('PDF generated successfully!'))
//           .catch((error) => console.error('Error generating PDF:', error));
//   });
// };

// const generatePDF = () => {
//   // Import createRoot dynamically since it's a client-side only operation
//   const { createRoot } = require('react-dom/client');

//   // Stop all animations and set their final states
//   Promise.all(
//     Object.values(animationControls).map((controls) => {
//       controls.stop();
//       return controls.set({ opacity: 1, y: 0 });
//     })
//   ).then(() => {
//     // Clone the contentRef element
//     const element = contentRef.current.cloneNode(true);
    
//     // Create and insert header and TOC at the beginning
//     const wrapper = document.createElement('div');
//     const root = createRoot(wrapper);
    
//     // Create a promise to handle the render completion
//     new Promise(resolve => {
//       root.render(<PdfHeaderAndToc sections={sections} />);
//       // Give a small delay to ensure render is complete
//       setTimeout(resolve, 100);
//     }).then(() => {
//       // Insert the header/TOC before the existing content
//       element.insertBefore(wrapper, element.firstChild);
      
//       // Disable animations and transitions in the cloned DOM
//       Array.from(element.querySelectorAll('[style], [data-motion-style]')).forEach((el) => {
//         el.style.animation = 'none';
//         el.style.transition = 'none';
//       });

//       // Generate PDF
//       html2pdf()
//         .set({
//           margin: [10, 10, 10, 10],
//           filename: 'workflow-analysis.pdf',
//           image: { type: 'jpeg', quality: 1.0 },
//           html2canvas: {
//             scale: 3,
//             useCORS: true,
//           },
//           jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//         })
//         .from(element)
//         .save()
//         .then(() => {
//           console.log('PDF generated successfully!');
//           // Cleanup
//           root.unmount();
//         })
//         .catch((error) => {
//           console.error('Error generating PDF:', error);
//           root.unmount();
//         });
//     });
//   });
// };
// const generatePDF = () => {
//   // Import createRoot dynamically since it's a client-side only operation
//   const { createRoot } = require('react-dom/client');
//   // Stop all animations and set their final states
//   Promise.all(
//     Object.values(animationControls).map((controls) => {
//       controls.stop();
//       return controls.set({ opacity: 1, y: 0 });
//     })
//   ).then(() => {
//     // Clone the contentRef element
//     const element = contentRef.current.cloneNode(true);
   
//     // Create wrapper with dark blue background
//     const wrapper = document.createElement('div');
//     wrapper.style.backgroundColor = '#1a365d'; // Dark blue color
//     wrapper.style.minHeight = '100%';
//     wrapper.style.color = 'white'; // Make text white for better contrast
//     wrapper.style.padding = '20px'; // Add some padding
    
//     const root = createRoot(wrapper);
   
//     // Create a promise to handle the render completion
//     new Promise(resolve => {
//       root.render(<PdfHeaderAndToc sections={sections} />);
//       // Give a small delay to ensure render is complete
//       setTimeout(resolve, 100);
//     }).then(() => {
//       // Insert the header/TOC before the existing content
//       element.insertBefore(wrapper, element.firstChild);
     
//       // Apply background color to the main content element as well
//       element.style.backgroundColor = '#1a365d';
//       element.style.color = 'white';
      
//       // Make sure all text elements are visible against dark background
//       Array.from(element.querySelectorAll('*')).forEach((el) => {
//         const computedStyle = window.getComputedStyle(el);
//         if (computedStyle.color === 'rgb(0, 0, 0)' || computedStyle.color === '#000000') {
//           el.style.color = 'white';
//         }
//       });
      
//       // Disable animations and transitions in the cloned DOM
//       Array.from(element.querySelectorAll('[style], [data-motion-style]')).forEach((el) => {
//         el.style.animation = 'none';
//         el.style.transition = 'none';
//       });
      
//       // Generate PDF with background color enabled
//       html2pdf()
//         .set({
//           margin: [10, 10, 10, 10],
//           filename: 'workflow-analysis.pdf',
//           image: { type: 'jpeg', quality: 1.0 },
//           html2canvas: {
//             scale: 3,
//             useCORS: true,
//             backgroundColor: '#1a365d', // Set canvas background color
//           },
//           jsPDF: { 
//             unit: 'mm', 
//             format: 'a4', 
//             orientation: 'portrait',
//             putTotalPages: true,
//           },
//         })
//         .from(element)
//         .save()
//         .then(() => {
//           console.log('PDF generated successfully!');
//           // Cleanup
//           root.unmount();
//         })
//         .catch((error) => {
//           console.error('Error generating PDF:', error);
//           root.unmount();
//         });
//     });
//   });
// };
const generatePDF = () => {
  const { createRoot } = require('react-dom/client');
  
  Promise.all(
    Object.values(animationControls).map((controls) => {
      controls.stop();
      return controls.set({ opacity: 1, y: 0 });
    })
  ).then(() => {
    const element = contentRef.current.cloneNode(true);
    
    // Create outer container for full bleed background
    const container = document.createElement('div');
    container.style.backgroundColor = '#1a365d';
    container.style.position = 'relative';
    container.style.width = '210mm'; // A4 width
    container.style.minHeight = '297mm'; // A4 height
    container.style.margin = '0';
    container.style.padding = '0';
    
    // Create wrapper for content
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = '#1a365d';
    wrapper.style.minHeight = '100%';
    wrapper.style.color = 'white';
    wrapper.style.padding = '20px';
    wrapper.style.boxSizing = 'border-box';
    
    container.appendChild(wrapper);
    const root = createRoot(wrapper);
   
    new Promise(resolve => {
      root.render(<PdfHeaderAndToc sections={sections} />);
      setTimeout(resolve, 100);
    }).then(() => {
      element.insertBefore(container, element.firstChild);
      
      // Apply background color to the main content element
      element.style.backgroundColor = '#1a365d';
      element.style.color = 'white';
      element.style.margin = '0';
      element.style.padding = '0';
      
      // Make sure all text elements are visible against dark background
      Array.from(element.querySelectorAll('*')).forEach((el) => {
        const computedStyle = window.getComputedStyle(el);
        if (computedStyle.color === 'rgb(0, 0, 0)' || computedStyle.color === '#000000') {
          el.style.color = 'white';
        }
      });
      
      // Disable animations
      Array.from(element.querySelectorAll('[style], [data-motion-style]')).forEach((el) => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
      
      // Generate PDF with no margins
      html2pdf()
        .set({
          margin: 0, // Remove all margins
          filename: 'workflow-analysis.pdf',
          image: { type: 'jpeg', quality: 1.0 },
          html2canvas: {
            scale: 3,
            useCORS: true,
            backgroundColor: '#1a365d',
            
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            putTotalPages: true,
            compress: true,
          },
        })
        .from(element)
        .save()
        .then(() => {
          console.log('PDF generated successfully!');
          root.unmount();
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
          root.unmount();
        });
    });
  });
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <h1 className="text-2xl font-bold p-6">Report for Workflow ID: {id}</h1> */}


     

      <CustomNotification notification={notification} position="bottom-right" />
      
      {/* <motion.button
        onClick={handleSaveToggle}
        disabled={isLoading}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-lg hover:shadow-xl
          transition-colors duration-200
          ${isSaved 
            ? 'bg-indigo-600 hover:bg-indigo-700' 
            : 'bg-gray-800 hover:bg-gray-900'
          }
          ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={false}
          animate={{ 
            scale: isLoading ? 0.8 : 1,
            rotate: isLoading ? 180 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          {isSaved ? (
            <BookmarkCheck className="w-6 h-6 text-white" />
          ) : (
            <Bookmark className="w-6 h-6 text-white" />
          )}
        </motion.div>

        {isSaved && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full rounded-full bg-indigo-400"
          />
        )}
      </motion.button> */}

      {/* cloning  */}

<div className="relative">
      <motion.button
        onClick={handleSaveToggle}
        disabled={isLoading}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          fixed bottom-6 right-6 z-40
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-lg 
          transition-colors duration-200
          ${isSaved
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-800 hover:bg-gray-900'
          }
          ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isLoading ? 0.8 : 1,
            rotate: isLoading ? 180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {isSaved ? (
            <BookmarkCheck className="w-6 h-6 text-white" />
          ) : (
            <Bookmark className="w-6 h-6 text-white" />
          )}
        </motion.div>
        {isSaved && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full rounded-full bg-indigo-400"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
          >
            {isSaved ? 'Remove Report' : 'Save Report'}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {/* <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:sticky top-0 left-0 z-30 w-72 h-screen bg-white border-r border-gray-200 shadow-lg lg:shadow-none"
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 ">
                  Table Of Contents
                </h1>
                
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <div className="space-y-2 pr-4">
                    {sections.map((section) => (
                      <NavigationTab
                        key={section.id}
                        icon={section.icon}
                        label={section.label}
                        isActive={activeSection === section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          if (window.innerWidth < 1024) {
                            setIsSidebarOpen(false);
                          }
                        }}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
     */}
 
 

{/* <AnimatePresence>
  {isSidebarOpen && (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3 }}
      className="fixed lg:sticky top-0 left-0 z-30 w-72 h-screen bg-white border-r border-gray-200 shadow-lg lg:shadow-none"
    >
      <div className="p-6">
        
        <motion.button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center mb-6 rounded-xl bg-gray-900/95 hover:bg-gray-800 text-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Table Of Contents
        </h1>
        
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2 pr-4">
            {sections.map((section) => (
              <NavigationTab
                key={section.id}
                icon={section.icon}
                label={section.label}
                isActive={activeSection === section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  )}
</AnimatePresence>
     */}



<AnimatePresence>
  {isSidebarOpen && (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3 }}
      className="fixed lg:sticky top-0 left-0 z-30 w-72 h-screen bg-white border-r border-gray-200 shadow-lg lg:shadow-none flex flex-col"
    >
      <div className="p-6 flex-1">
        {/* Premium Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center mb-6 rounded-xl bg-gray-900/95 hover:bg-gray-800 text-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Table Of Contents
        </h1>
        
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <div className="space-y-2 pr-4">
            {sections.map((section) => (
              <NavigationTab
                key={section.id}
                icon={section.icon}
                label={section.label}
                isActive={activeSection === section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Compact Export PDF Button */}
      <div className="px-6 pb-8">
        <motion.button
          // onClick={() => {
            
          //   // Add your PDF export logic here
          //   console.log('Exporting PDF...');
          // }}
          onClick={generatePDF}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-all duration-200"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FileDown className="w-4 h-4" />
          <span>Export PDF</span>
        </motion.button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">

          <div className="container mx-auto p-6">
            
            {/* Form Data */}
            <div className="form-section">
              {/* <h2>Form Data</h2>
              <div><strong>Organization Type: </strong> {formData.userOrgType}</div>
              <div><strong>Team Size: </strong> {formData.userTeamSize}</div>
              <div><strong>Category of Workflow: </strong> {formData.categoryOfWorkflow}</div>
              <div><strong>Team Roles: </strong> {JSON.stringify(formData.teamRoles)}</div>
              <div><strong>Tools Used: </strong> {JSON.stringify(formData.toolsUsed)}</div>
              <div><strong>Workflow Steps: </strong> {JSON.stringify(formData.workFlowSteps)}</div> */}

               <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 mt-4"
                      >
                        <div className="flex items-center justify-center mb-4 space-x-2">
                          <Zap className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-500 uppercase tracking-widest">
                            Workflow Analysis Report
                          </span>
                          <Zap className="w-5 h-5 text-gray-400" />
                        </div>
                        {/* <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                          Comprehensive Analysis
                          <br />
                          <span className="text-gray-600">of Team Performance</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                          Detailed insights into team structure, performance metrics, resource utilization, and technical workflow assessment
                        </p> */}
                      </motion.div>
            </div>


            {/* <div ref={contentRef}> */}
           
            {/* {sections.map((section) => (
              <SectionWrapper key={section.id} isVisible={activeSection === section.id}>
                {activeSection === section.id && (
                  <section.component data={transformedData} />
                )}
              </SectionWrapper>
            ))}

            </div> */}

          {/* <div ref={contentRef}>
                  {sections.map((section) => (
                    <SectionWrapper
                      key={section.id}
                      isVisible={showAllSections || activeSection === section.id}
                    >
                      {(showAllSections || activeSection === section.id) && (
                        <section.component data={transformedData} />
                      )}
                    </SectionWrapper>
                  ))}
            </div> */}

            {/* cloning  */}
  {/* <div ref={contentRef}>
                {sections.map((section) => (
                    <div
                        key={section.id}
                        style={{
                            display: activeSection === section.id ? 'block' : 'none',
                        }}
                    >
                        <section.component data={transformedData} />
                    </div>
                ))}
            </div> */}
{/* Main content to be rendered */}
{/* <div ref={contentRef}>
                {sections.map((section) => (
                    <div
                        key={section.id}
                        style={{
                            display: activeSection === section.id ? 'block' : 'none',
                            pageBreakAfter: 'always', // Ensure each section starts on a new page
                        }}
                    >
                        <section.component data={transformedData} />
                    </div>
                ))}
            </div> */}


<div ref={contentRef}>
                {sections.map((section) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={animationControls[section.id]}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                      
                          pageBreakAfter: 'always', // Ensure each section starts on a new page
                      }}
                    >
                        <section.component data={transformedData} />
                    </motion.div>
                ))}
            </div>


          </div>
        </main>
      </div>
    </div>
  );
};



export default ReportPage;

import React from "react";

interface ProcessLifecycleProps {
  product: {
    processLifecycle: {
      category: string;
      subcategories: string[];
    }[];
  };
}

const lifecycleStages = [
  {
    category: "Client Management Software",
    stages: [
      "Intake",
      "Assessment",
      "Strategize",
      "Represent",
      "Communication",
      "Review",
    ],
  },
  {
    category: "Governance and Compliance and Risk Management",
    stages: [
      "Coverage",
      "Assessment",
      "Validation",
      "Implementation",
      "Monitoring",
      "Analysis",
    ],
  },
  {
    category: "Contract Management Software",
    stages: [
      "Create",
      "Negotiation",
      "Authentication",
      "Execute",
      "Store",
      "Tracking",
    ],
  },
  {
    category: "Digital Signature",
    stages: [
      "Document Preparation",
      "Authentication",
      "Signing",
      "Encryption",
      "Verification",
      "Distribution",
    ],
  },
  {
    category: "Document Management and Automation",
    stages: [
      "Capture",
      "Change management",
      "Review",
      "Organize",
      "Access management",
      "Retrieval",
    ],
  },
  {
    category: "Document Management and Automation Software",
    stages: [
      "Capture",
      "Change management",
      "Review",
      "Organize",
      "Access management",
      "Retrieval",
    ],
  },
  {
    category: "E-billing and Invoicing",
    stages: [
      "Invoice generation",
      "Authorization",
      "Distribution and Accessibility",
      "Payment Facilitation",
      "Tracking",
      "Analysis",
    ],
  },
  {
    category: "E-discovery",
    stages: [
      "Discover",
      "Preserve",
      "Acquire",
      "Examine",
      "Evaluate",
      "Present",
    ],
  },
  {
    category: "Intellectual Property Management",
    stages: [
      "Cataloging",
      "Analysis",
      "Protection",
      "Monitoring",
      "Enforcement",
      "Reporting",
    ],
  },
  {
    category: "Litigation Management and Analytics",
    stages: [
      "Intake",
      "Strategize",
      "Preparation",
      "Litigation Support",
      "Analytics",
      "Outcome evaluation",
    ],
  },
  {
    category: "Legal Workflow Automation",
    stages: [
      "Process Identification",
      "Workflow configuration",
      "Validation",
      "Implementation",
      "Tracking",
      "Optimization",
    ],
  },
];

const ProcessLifecycle = ({ product }: any) => {
  const selectedCategory = product.processLifecycle[0].category;
  const selectedStages = product.processLifecycle[0].subcategories;

  const lifecycle = lifecycleStages.find(
    (stage) => stage.category === selectedCategory
  );

  return (
    <div>
    {lifecycle && (
      <>
        <div className="grid gap-4 mb-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {lifecycle.stages.slice(0, 3).map((stage, index) => (
            <div
              key={index}
              className={`p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2 ${
                selectedStages.includes(stage)
                  ? "border-teal-500"
                  : "border-red-500 opacity-90"
              }`}
            >
              <div className="flex items-center gap-5">
                <p
                  className={`flex items-center justify-center w-6 h-6 font-bold rounded ${
                    selectedStages.includes(stage)
                      ? "text-teal-500 bg-teal-100"
                      : "text-red-500 bg-red-100"
                  }`}
                >
                  {index + 1}
                </p>
                <p className="text-sm font-bold leading-5 mb-2">{stage}</p>
              </div>
            </div>
          ))}
        </div>
  
        <div className="grid gap-4 mb-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {lifecycle.stages.slice(3).map((stage, index) => (
            <div
              key={index + 3}
              className={`p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2 ${
                selectedStages.includes(stage)
                  ? "border-teal-500"
                  : "border-red-500 opacity-90"
              }`}
            >
              <div className="flex items-center gap-5">
                <p
                  className={`flex items-center justify-center w-6 h-6 font-bold rounded ${
                    selectedStages.includes(stage)
                      ? "text-teal-500 bg-teal-100"
                      : "text-red-500 bg-red-100"
                  }`}
                >
                  {index + 4}
                </p>
                <p className="text-sm font-bold leading-5 mb-2">{stage}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
  
  );
};

export default ProcessLifecycle;

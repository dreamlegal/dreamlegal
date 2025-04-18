// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// // Handle GET requests to fetch competitor analysis data
// export async function GET(request) {
//   try {
//     // Get query parameters
//     const url = new URL(request.url);
//     const category = url.searchParams.get('category');

//     if (!category) {
//       return NextResponse.json(
//         { error: "Category parameter is required" },
//         { status: 400 }
//       );
//     }

//     // Get all published products in the specified category
//     const products = await prisma.product.findMany({
//       where: {
//         active: "publish",
//         category: {
//           has: category
//         }
//       },
//       include: {
//         company: true,
//       },
//     });

//     // Total products count
//     const totalProducts = products.length;

//     // User Category distribution
//     const userCategories = [
//       "Individual Practitioner",
//       "Law firms",
//       "Government departments",
//       "Startups",
//       "Enterprises",
//       "Judiciary",
//       "In-House Counsels",
//     ];

//     const userCategoryDistribution = userCategories.map((userCategory) => {
//       const count = products.filter((product) =>
//         product.userCategory.some((uc) => uc.startsWith(`${userCategory}|`))
//       ).length;
//       return {
//         category: userCategory,
//         count,
//         percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
//       };
//     }).sort((a, b) => b.count - a.count);

//     // Pricing model distribution
//     const pricingModels = [
//       { id: 'Annual Fee', name: 'Annual Subscription' },
//       { id: 'Monthly subscription', name: 'Monthly subscription' },
//       { id: 'Perpetual', name: 'Perpetual' },
//       { id: 'Volume based', name: 'Volume based' },
//       { id: 'One time', name: 'One time' }
//     ];

//     const pricingDistribution = pricingModels.map((pricing) => {
//       const count = products.filter((product) =>
//         product.pricingModel.includes(pricing.id)
//       ).length;
//       return {
//         model: pricing.name,
//         id: pricing.id,
//         count,
//         percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
//       };
//     }).sort((a, b) => b.count - a.count);

//     // Deployment type distribution
//     const deploymentTypes = [
//       { id: 'On-premise', name: 'On premise deployment' },
//       { id: 'Cloud', name: 'Cloud based deployment' },
//       { id: 'Hybrid', name: 'Hybrid deployment' },
//       { id: 'SaaS', name: 'Software as a Service' },
//     ];

//     const deploymentDistribution = deploymentTypes.map((deployment) => {
//       const count = products.filter((product) =>
//         product.deployement.includes(deployment.id)
//       ).length;
//       return {
//         type: deployment.name,
//         id: deployment.id,
//         count,
//         percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
//       };
//     }).sort((a, b) => b.count - a.count);

//     // Founding year distribution
//     const foundingYearRanges = [
//       { range: "Before 2000", min: 0, max: 1999 },
//       { range: "2000-2005", min: 2000, max: 2005 },
//       { range: "2006-2010", min: 2006, max: 2010 },
//       { range: "2011-2015", min: 2011, max: 2015 },
//       { range: "2016-2020", min: 2016, max: 2020 },
//       { range: "2021-Present", min: 2021, max: 9999 },
//     ];

//     const foundingYearDistribution = foundingYearRanges.map((range) => {
//       const count = products.filter((product) => {
//         const yearFounded = product.ByAdminYearFounded || 
//                           (product.company && product.company.yearFounded) || null;
//         if (!yearFounded) return false;
        
//         const year = parseInt(yearFounded);
//         return !isNaN(year) && year >= range.min && year <= range.max;
//       }).length;
      
//       return {
//         range: range.range,
//         count,
//         percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
//       };
//     });

//     // Lifecycle stage analysis
//     const lifecycleStages = {
//       'Client Relationship Management': [
//         'Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'
//       ],
//       'Governance, Risk and Compliance': [
//         'Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'
//       ],
//       'Contract Lifecycle Management': [
//         'Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'
//       ],
//       'E-Signature': [
//         'Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'
//       ],
//       'Document Management System': [
//         'Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'
//       ],
//       'E-billing and Invoicing': [
//         'Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Facilitation', 'Tracking', 'Analysis'
//       ],
//       'E-discovery': [
//         'Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'
//       ],
//       'Intellectual Property Management': [
//         'Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'
//       ],
//       'Litigation Management and Analytics': [
//         'Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'
//       ],
//       'Legal Workflow Automation': [
//         'Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'
//       ],
//       'Legal Research': [
//         'Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval'
//       ]
//     };

//     const currentStages = lifecycleStages[category] || [];
    
//     // For each product, score how many lifecycle stages it covers
//     const productLifecycleScores = products.map(product => {
//       let score = 0;
//       let coveredStages = [];
      
//       if (product.processLifecycle) {
//         const lifecycleData = typeof product.processLifecycle === 'string' 
//           ? JSON.parse(product.processLifecycle) 
//           : product.processLifecycle;
        
//         // Check each stage if it's covered by the product
//         currentStages.forEach(stage => {
//           if (lifecycleData[stage] || 
//               (Array.isArray(lifecycleData) && 
//                lifecycleData.some(item => item.stage === stage || item.name === stage))) {
//             score++;
//             coveredStages.push(stage);
//           }
//         });
//       }
      
//       return {
//         id: product.id,
//         name: product.name,
//         score,
//         totalStages: currentStages.length,
//         percentage: currentStages.length > 0 ? (score / currentStages.length) * 100 : 0,
//         coveredStages
//       };
//     }).sort((a, b) => b.score - a.score);
    
//     // Calculate stage coverage
//     const stageCoverage = currentStages.map(stage => {
//       const count = productLifecycleScores.filter(product => 
//         product.coveredStages.includes(stage)
//       ).length;
      
//       return {
//         stage,
//         count,
//         percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
//       };
//     });

//     // Functionality analysis based on the categoryOptions object
//     // Using the provided category options structure
//     const categoryOptions = {
//       'Client Relationship Management': {
//         'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
//         'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
//         'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
//         'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
//         'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
//         'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
//       },
//       'Governance, Risk and Compliance': {
//         'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
//         'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
//         'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
//       },
//       'Contract Lifecycle Management': {
//         'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
//         'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
//         'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
//         'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
//         'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses']
//       },
//       'E-Signature': {
//         'Fields Creation': ['Signature fields', 'Multiple signature styles', 'Data fields', 'Customization and labelling'],
//         'Tracking and Validity': ['Legal validity', 'Audit trail', 'Document recording and retention'],
//         'Document Management and Templates': ['Document creation', 'Version control', 'Granular permission for collaborators'],
//         'Document Capturing': ['Document uploads', 'Multiple file supports', 'OCR']
//       },
//       'Document Management System': {
//         'Document Creation and Templates': ['Document creation', 'Text editor', 'Document Templatization', 'Central repository', 'Co-authoring features'],
//         'Document Search and Navigation': ['Categorizing and tagging', 'Search capabilities', 'Filter and sorting'],
//         'Authentication': ['MFA (Multi factor Authentication)', 'Electronic signature capabilities.'],
//         'Task Allotment': ['Customizable workflows', 'Internal work delegation', 'Task tracking']
//       },
//       'E-billing and Invoicing': {
//         'Budgeting, Expense and Time Tracking': ['Budget management', 'Time tracking', 'Multiple fee arrangements', 'Approval management'],
//         'Client Management': ['Central client repository', 'Client communications', 'Billing schedules', 'Payment processing'],
//         'Invoice Generation and Review': ['Customizable invoice templates', 'Automated invoice generation', 'Multiple currencies', 'Tax entries and calculations', 'Payment tracking and recording']
//       },
//       'E-discovery': {
//         'Data Identification and Collection': ['Data source identification', 'Remote Collection', 'Network-based collection', 'Forensic imaging', 'Custodian self-collection', 'Validation mechanisms'],
//         'Search, Processing and Analysis': ['Search functionality', 'Filter and sorting', 'Duplicity elimination', 'Data processing', 'Cluster similar documents'],
//         'Review and Production': ['Review and Analysis', 'Coding and annotations', 'Process control', 'Review workflow', 'Audit trail'],
//         'Legal Hold Management': ['Legal hold tracking', 'Legal hold notice management', 'Receipt Acknowledgement', 'Data custodian Management']
//       },
//       'Intellectual Property Management': {
//         'Ideation and Creation': ['Idea intake and management', 'Innovation workflow management'],
//         'Lifecycle Management': ['Workflow management system (IP lifecycle)', 'Renewal management', 'Management of licensing agreements, contracts'],
//         'Search and Discovery': ['Database integration', 'Advanced search capabilities', 'Filter and sorting'],
//         'Storage and Repository': ['Centralized repository', 'Categorization and tagging', 'Accessibility control', 'Access audit']
//       },
//       'Litigation Management and Analytics': {
//         'Matter Lifecycle Tracking': ['Task management', 'Document organisation'],
//         'Court and Case Search': ['Automated case alerts', 'Court docket systems', 'Real-time updates'],
//         'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management', 'Client invoicing', 'Payment processing'],
//         'Litigation Docketing Features': ['Collaborative timeline tracking', 'Court Rule tracking', 'Court database integration', 'Customized docket entries']
//       },
//       'Legal Workflow Automation': {
//         'Workflow Design and Configuration': ['Workflow designer', 'Branching', 'Task management', 'Data routing', 'Workflow templates'],
//         'Assignment Allotment and Tracking': ['Task creation', 'Task allotment', 'Task tracking'],
//         'Document Creation and Management': ['Document creation', 'Templatization', 'Indexing and tagging of documents', 'Document search and retrieval'],
//         'Laws, Compliance and Regulatory Tracking': ['Sectoral differentiation', 'Compliance applicability', 'Law and compliance updates']
//       },
//       'Legal Research': {
//         'Case Law Research': ['Comprehensive case law databases', 'Jurisdictional filters', 'Citation search and validation', 'Historical case law archives'],
//         'Statutory Research': ['Statutes and regulations databases', 'Annotations and historical versions', 'Legislative tracking and updates', 'Secondary Sources', 'Legal treatises and commentaries', 'Journals and law reviews', 'International treaties and conventions'],
//         'Advanced Search Capabilities': ['Search Functionality', 'Boolean and logical search', 'AI-powered search and chat', 'Document upload'],
//         'Filter and Sorting': ['Jurisdiction and court level', 'Date range and publication type', 'Relevance and citation frequency']
//       }
//     };
    
//     const functionalities = categoryOptions[category] || {};
//     const mainFunctionalities = Object.keys(functionalities);
    
//     // For each product, check which functionalities it covers
//     const productFunctionalityScores = products.map(product => {
//       let score = 0;
//       let coveredFunctionalities = [];
      
//       if (product.features) {
//         const featuresData = typeof product.features === 'string' 
//           ? JSON.parse(product.features) 
//           : product.features;
        
//         // Check each functionality if it's covered by the product
//         mainFunctionalities.forEach(functionality => {
//           // This is a simplification - in a real application, you'd need to match the functionalities more accurately
//           if (featuresData[functionality] || 
//               (Array.isArray(featuresData) && 
//               featuresData.some(item => 
//                 item.name === functionality || 
//                 item.category === functionality ||
//                 (item.functionalities && item.functionalities.includes(functionality))
//               ))) {
//             score++;
//             coveredFunctionalities.push(functionality);
//           }
//         });
//       }
      
//       return {
//         id: product.id,
//         name: product.name,
//         score,
//         totalFunctionalities: mainFunctionalities.length,
//         percentage: mainFunctionalities.length > 0 ? (score / mainFunctionalities.length) * 100 : 0,
//         coveredFunctionalities
//       };
//     }).sort((a, b) => b.score - a.score);
    
//     // Calculate functionality coverage
//     const functionalityCoverage = mainFunctionalities.map(functionality => {
//       const count = productFunctionalityScores.filter(product => 
//         product.coveredFunctionalities.includes(functionality)
//       ).length;
      
//       return {
//         functionality,
//         count,
//         percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
//       };
//     });

//     const response = {
//       category,
//       totalProducts,
//       userCategoryDistribution,
//       pricingDistribution,
//       deploymentDistribution,
//       foundingYearDistribution,
//       lifecycleAnalysis: {
//         stages: currentStages,
//         productScores: productLifecycleScores,
//         stageCoverage
//       },
//       functionalityAnalysis: {
//         productScores: productFunctionalityScores,
//         functionalityCoverage
//       }
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error("Error fetching competitor analysis data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch competitor analysis data" },
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests to fetch competitor analysis data
export async function GET(request) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Get all published products in the specified category
    const products = await prisma.product.findMany({
      where: {
        active: "publish",
        category: {
          has: category
        }
      },
      include: {
        company: true,
      },
    });

    // Total products count
    const totalProducts = products.length;

    // User Category distribution
    const userCategories = [
      "Individual Practitioner",
      "Law firms",
      "Government departments",
      "Startups",
      "Enterprises",
      "Judiciary",
      "In-House Counsels",
    ];

    const userCategoryDistribution = userCategories.map((userCategory) => {
      const count = products.filter((product) =>
        product.userCategory.some((uc) => uc.startsWith(`${userCategory}|`))
      ).length;
      return {
        category: userCategory,
        count,
        percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
      };
    }).sort((a, b) => b.count - a.count);

    // Pricing model distribution
    const pricingModels = [
      { id: 'Annual Fee', name: 'Annual Subscription' },
      { id: 'Monthly subscription', name: 'Monthly subscription' },
      { id: 'Perpetual', name: 'Perpetual' },
      { id: 'Volume based', name: 'Volume based' },
      { id: 'One time', name: 'One time' }
    ];

    const pricingDistribution = pricingModels.map((pricing) => {
      const count = products.filter((product) =>
        product.pricingModel.includes(pricing.id)
      ).length;
      return {
        model: pricing.name,
        id: pricing.id,
        count,
        percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
      };
    }).sort((a, b) => b.count - a.count);

    // Deployment type distribution
    const deploymentTypes = [
      { id: 'On-premise', name: 'On premise deployment' },
      { id: 'Cloud', name: 'Cloud based deployment' },
      { id: 'Hybrid', name: 'Hybrid deployment' },
      { id: 'SaaS', name: 'Software as a Service' },
    ];

    const deploymentDistribution = deploymentTypes.map((deployment) => {
      const count = products.filter((product) =>
        product.deployement.includes(deployment.id)
      ).length;
      return {
        type: deployment.name,
        id: deployment.id,
        count,
        percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
      };
    }).sort((a, b) => b.count - a.count);

    // Founding year distribution
    const foundingYearRanges = [
      { range: "Before 2000", min: 0, max: 1999 },
      { range: "2000-2005", min: 2000, max: 2005 },
      { range: "2006-2010", min: 2006, max: 2010 },
      { range: "2011-2015", min: 2011, max: 2015 },
      { range: "2016-2020", min: 2016, max: 2020 },
      { range: "2021-Present", min: 2021, max: 9999 },
    ];

    const foundingYearDistribution = foundingYearRanges.map((range) => {
      const count = products.filter((product) => {
        const yearFounded = product.ByAdminYearFounded || 
                          (product.company && product.company.yearFounded) || null;
        if (!yearFounded) return false;
        
        const year = parseInt(yearFounded);
        return !isNaN(year) && year >= range.min && year <= range.max;
      }).length;
      
      return {
        range: range.range,
        count,
        percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
      };
    });

    // Lifecycle stage analysis
    const lifecycleStages = {
      'Client Relationship Management': [
        'Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'
      ],
      'Governance, Risk and Compliance': [
        'Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'
      ],
      'Contract Lifecycle Management': [
        'Create', 'Authentication', 'Store', 'Execute', 'Tracking', 'Negotiation'
      ],
      'E-Signature': [
        'Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'
      ],
      'Document Management System': [
        'Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'
      ],
      'E-billing and Invoicing': [
        'Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Facilitation', 'Tracking', 'Analysis'
      ],
      'E-discovery': [
        'Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'
      ],
      'Intellectual Property Management': [
        'Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'
      ],
      'Litigation Management and Analytics': [
        'Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'
      ],
      'Legal Workflow Automation': [
        'Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'
      ],
      'Legal Research': [
        'Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval'
      ]
    };

    const currentStages = lifecycleStages[category] || [];
    
    // For each product, score how many lifecycle stages it covers
    const productLifecycleScores = products.map(product => {
      let score = 0;
      let coveredStages = [];
      
      // Check if processLifecycle exists and is properly formatted
      if (product.processLifecycle) {
        let lifecycleData = product.processLifecycle;
        
        // Convert to object if it's a string
        if (typeof lifecycleData === 'string') {
          try {
            lifecycleData = JSON.parse(lifecycleData);
          } catch (e) {
            lifecycleData = {};
          }
        }
        
        // If it's an object like in the image
        if (typeof lifecycleData === 'object' && lifecycleData !== null) {
          // First, check if the current category is in the processLifecycle object
          if (lifecycleData[category]) {
            const categoryStages = lifecycleData[category];
            
            // If category stages is an array, check each expected stage
            if (Array.isArray(categoryStages)) {
              currentStages.forEach(stage => {
                if (categoryStages.includes(stage)) {
                  score++;
                  coveredStages.push(stage);
                }
              });
            }
          } 
          // It might also be directly an array without the category key
          else if (Array.isArray(lifecycleData)) {
            currentStages.forEach(stage => {
              if (lifecycleData.includes(stage)) {
                score++;
                coveredStages.push(stage);
              }
            });
          }
        }
      }
      
      return {
        id: product.id,
        name: product.name,
        score,
        totalStages: currentStages.length,
        percentage: currentStages.length > 0 ? (score / currentStages.length) * 100 : 0,
        coveredStages
      };
    }).sort((a, b) => b.score - a.score);
    
    // Calculate stage coverage
    const stageCoverage = currentStages.map(stage => {
      const count = productLifecycleScores.filter(product => 
        product.coveredStages.includes(stage)
      ).length;
      
      return {
        stage,
        count,
        percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
      };
    });

    // Functionality analysis based on main feature categories
    // For Contract Lifecycle Management, the main functionalities are:
    const categoryFunctionalities = {
      'Client Relationship Management': [
        'Intake and Lead Management',
        'Client Portal',
        'Document Management',
        'Case Alerts',
        'Budget, Expense and Time Tracking',
        'Client Billing and Invoicing'
      ],
      'Governance, Risk and Compliance': [
        'Policy Management',
        'Issue Management',
        'Laws, Compliance and Regulatory Tracking'
      ],
      'Contract Lifecycle Management': [
        'Contract Creation and Authoring',
        'Contract Repository',
        'Contract Negotiation',
        'Lifecycle Management',
        'Clause Library',
        'Analytics and Reporting',
        'External Collaboration',
        'Internal Collaboration',
        'Tool Administration and Control'
      ],
      'E-Signature': [
        'Fields Creation',
        'Tracking and Validity',
        'Document Management and Templates',
        'Document Capturing'
      ],
      'Document Management System': [
        'Document Creation and Templates',
        'Document Search and Navigation',
        'Authentication',
        'Task Allotment'
      ],
      'E-billing and Invoicing': [
        'Budgeting, Expense and Time Tracking',
        'Client Management',
        'Invoice Generation and Review'
      ],
      'E-discovery': [
        'Data Identification and Collection',
        'Search, Processing and Analysis',
        'Review and Production',
        'Legal Hold Management'
      ],
      'Intellectual Property Management': [
        'Ideation and Creation',
        'Lifecycle Management',
        'Search and Discovery',
        'Storage and Repository'
      ],
      'Litigation Management and Analytics': [
        'Matter Lifecycle Tracking',
        'Court and Case Search',
        'Budget, Expense and Time Tracking',
        'Litigation Docketing Features'
      ],
      'Legal Workflow Automation': [
        'Workflow Design and Configuration',
        'Assignment Allotment and Tracking',
        'Document Creation and Management',
        'Laws, Compliance and Regulatory Tracking'
      ],
      'Legal Research': [
        'Case Law Research',
        'Statutory Research',
        'Advanced Search Capabilities',
        'Filter and Sorting'
      ]
    };
    
    const mainFunctionalities = categoryFunctionalities[category] || [];
    
    // For each product, check which functionalities it covers
    const productFunctionalityScores = products.map(product => {
      let score = 0;
      let coveredFunctionalities = [];
      
      // Check if features exists
      if (product.features) {
        let featuresData = product.features;
        
        // Parse if it's a string
        if (typeof featuresData === 'string') {
          try {
            featuresData = JSON.parse(featuresData);
          } catch (e) {
            featuresData = {};
          }
        }
        
        // Look for direct matches of main functionality categories
        // Based on your image, we're looking for "Common Features" and specific categories
        // like "Contract Lifecycle Management", etc.
        mainFunctionalities.forEach(functionality => {
          let found = false;
          
          // For object-based features (like in your image)
          if (typeof featuresData === 'object' && featuresData !== null) {
            // Check for "Common Features" section (if this functionality is there)
            if (featuresData["Common Features"] && 
                Object.keys(featuresData["Common Features"]).some(key => 
                  key === functionality || key.includes(functionality))) {
              found = true;
            }
            
            // Check for category-specific section
            if (featuresData[category] && 
                Object.keys(featuresData[category]).some(key => 
                  key === functionality || key.includes(functionality))) {
              found = true;
            }
            
            // Check direct keys in features
            if (Object.keys(featuresData).some(key => 
                key === functionality || key.includes(functionality))) {
              found = true;
            }
          }
          
          // For array-based features
          if (Array.isArray(featuresData)) {
            if (featuresData.some(item => {
              if (typeof item === 'string') {
                return item === functionality || item.includes(functionality);
              }
              if (typeof item === 'object' && item !== null) {
                return (
                  item.name === functionality || 
                  item.category === functionality ||
                  (item.features && Object.keys(item.features).some(f => f === functionality))
                );
              }
              return false;
            })) {
              found = true;
            }
          }
          
          if (found) {
            score++;
            coveredFunctionalities.push(functionality);
          }
        });
      }
      
      return {
        id: product.id,
        name: product.name,
        score,
        totalFunctionalities: mainFunctionalities.length,
        percentage: mainFunctionalities.length > 0 ? (score / mainFunctionalities.length) * 100 : 0,
        coveredFunctionalities
      };
    }).sort((a, b) => b.score - a.score);
    
    // Calculate functionality coverage
    const functionalityCoverage = mainFunctionalities.map(functionality => {
      const count = productFunctionalityScores.filter(product => 
        product.coveredFunctionalities.includes(functionality)
      ).length;
      
      return {
        functionality,
        count,
        percentage: totalProducts > 0 ? (count / totalProducts) * 100 : 0
      };
    });

    const response = {
      category,
      totalProducts,
      userCategoryDistribution,
      pricingDistribution,
      deploymentDistribution,
      foundingYearDistribution,
      lifecycleAnalysis: {
        stages: currentStages,
        productScores: productLifecycleScores,
        stageCoverage
      },
      functionalityAnalysis: {
        productScores: productFunctionalityScores,
        functionalityCoverage
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching competitor analysis data:", error);
    return NextResponse.json(
      { error: "Failed to fetch competitor analysis data" },
      { status: 500 }
    );
  }
}
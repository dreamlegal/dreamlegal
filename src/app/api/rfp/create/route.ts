// // rfp create
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const {
//       userId,
//       category,
//       coreProblem,
//       priority,
//       implementationTimeline,
//       budgetMin,
//       budgetMax,
//       currency,
//       teamType,
//       teamSize,
//       vendorCountry
//     } = await request.json();

//     // Validate required fields
//     if (!category || !coreProblem || !priority || !implementationTimeline || 
//         !budgetMin || !budgetMax || !currency || !teamType || !teamSize || !vendorCountry) {
//       return NextResponse.json({
//         success: false,
//         message: 'Missing required fields'
//       }, { status: 400 });
//     }

//     // Save to RfpAi table
//     const rfpAi = await prisma.rfpAi.create({
//       data: {
//         category,
//         coreProblem,
//         priority,
//         implementationTimeline,
//         budgetMin: parseInt(budgetMin) || null,
//         budgetMax: parseInt(budgetMax) || null,
//         teamType,
//         teamSize,
//         vendorCountry
//       }
//     });

//     // Get currency symbol for display
//     const currencySymbols = {
//       'USD': '$', 'EUR': '€', 'GBP': '£', 'CAD': 'C$', 
//       'AUD': 'A$', 'INR': '₹', 'JPY': '¥', 'SGD': 'S$'
//     };
//     const currencySymbol = currencySymbols[currency] || '$';

//     // Generate RFP using AI
//     const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'gpt-4',
//         messages: [{
//           role: 'system',
//           content: `You are an expert RFP writer specializing in legal technology procurement. Generate a professional RFP structure based on the user's requirements.

// Your response must be a valid JSON object with this exact structure:
// {
//   "problemStatement": "A detailed problem statement (200-300 words)",
//   "objectives": ["objective1", "objective2", "objective3", "objective4", "objective5"],
//   "keyRequirements": [
//     {"head": "Requirement Title", "description": "Detailed requirement description"},
//     {"head": "Another Requirement", "description": "Another detailed description"}
//   ],
//   "additionalQuestions": ["question1", "question2", "question3", "question4", "question5"]
// }

// Make sure all strings are properly escaped for JSON and the response is complete and valid.`
//         }, {
//           role: 'user',
//           content: `Generate a comprehensive RFP for legal software procurement with the following specifications:

// BUSINESS CONTEXT:
// - Category: ${category.replace(/-/g, ' ').toLowerCase()}
// - Team Type: ${teamType}
// - Team Size: ${teamSize}
// - Location: ${vendorCountry}

// REQUIREMENTS:
// - Core Problem: ${coreProblem}
// - Priority: ${priority}
// - Implementation Timeline: ${implementationTimeline}
// - Budget Range: ${currencySymbol}${parseInt(budgetMin).toLocaleString()} - ${currencySymbol}${parseInt(budgetMax).toLocaleString()} ${currency}

// Please create a professional RFP that:
// 1. Clearly articulates the business problem and context
// 2. Sets 5 specific, measurable objectives aligned with their priority (${priority})
// 3. Defines 5-7 key technical and business requirements
// 4. Includes 5 strategic questions for vendor evaluation

// Focus on ${priority.toLowerCase()} as the primary evaluation criteria. Consider the team size (${teamSize}) and implementation timeline (${implementationTimeline}) in your requirements.`
//         }],
//         temperature: 0.7,
//         max_tokens: 2500
//       })
//     });

//     if (!aiResponse.ok) {
//       throw new Error(`AI API failed: ${aiResponse.status}`);
//     }

//     const aiData = await aiResponse.json();
    
//     if (!aiData.choices || !aiData.choices[0] || !aiData.choices[0].message) {
//       throw new Error('Invalid AI response format');
//     }

//     let generatedRfp;
//     try {
//       generatedRfp = JSON.parse(aiData.choices[0].message.content);
//     } catch (parseError) {
//       console.error('AI response parse error:', parseError);
//       // Fallback RFP structure
//       generatedRfp = {
//         problemStatement: `Our ${teamType.toLowerCase()} is seeking a ${category.replace(/-/g, ' ').toLowerCase()} solution to address: ${coreProblem}. With a team of ${teamSize} and ${implementationTimeline.toLowerCase()}, we need a solution that prioritizes ${priority.toLowerCase()}.`,
//         objectives: [
//           "Streamline current workflows and processes",
//           "Improve operational efficiency and productivity", 
//           "Enhance collaboration and communication",
//           "Ensure compliance and risk management",
//           "Achieve measurable ROI within 12 months"
//         ],
//         keyRequirements: [
//           {"head": "Ease of Implementation", "description": "Solution must be deployable within the specified timeline with minimal disruption"},
//           {"head": "Scalability", "description": "Must accommodate current team size and future growth"},
//           {"head": "Integration Capabilities", "description": "Seamless integration with existing legal and business systems"},
//           {"head": "Security & Compliance", "description": "Enterprise-grade security meeting legal industry standards"},
//           {"head": "Training & Support", "description": "Comprehensive training and ongoing support services"}
//         ],
//         additionalQuestions: [
//           "What is your implementation timeline and methodology?",
//           "How do you handle data migration from existing systems?",
//           "What training and change management support do you provide?",
//           "Can you provide references from similar organizations?",
//           "What are your pricing models and total cost of ownership?"
//         ]
//       };
//     }

//     // Get user email from auth context or use placeholder
//     const contactEmail = userId ? `user-${userId}@company.com` : 'contact@company.com';

//     // Save structured RFP
//     const rfpStructured = await prisma.rfpStructured.create({
//       data: {
//         teamType,
//         category: category.replace(/-/g, ' '),
//         requirementUrgency: implementationTimeline,
//         locationPreference: vendorCountry,
//         contactEmail,
//         problemStatement: generatedRfp.problemStatement,
//         objectives: generatedRfp.objectives,
//         keyRequirements: generatedRfp.keyRequirements,
//         additionalQuestions: generatedRfp.additionalQuestions,
//         vendors: [] // Initialize empty vendors array
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       rfpId: rfpStructured.id,
//       message: 'RFP generated successfully',
//       data: {
//         rfpAiId: rfpAi.id,
//         rfpStructuredId: rfpStructured.id
//       }
//     });

//   } catch (error) {
//     console.error('Error creating RFP:', error);
    
//     // Return appropriate error message
//     if (error.message.includes('AI API')) {
//       return NextResponse.json({
//         success: false,
//         message: 'AI service temporarily unavailable. Please try again.',
//         error: 'AI_SERVICE_ERROR'
//       }, { status: 503 });
//     }
    
//     if (error.message.includes('Database')) {
//       return NextResponse.json({
//         success: false,
//         message: 'Database error. Please try again.',
//         error: 'DATABASE_ERROR'
//       }, { status: 500 });
//     }

//     return NextResponse.json({
//       success: false,
//       message: 'Failed to create RFP. Please try again.',
//       error: 'INTERNAL_ERROR'
//     }, { status: 500 });
//   }
// }


// app/api/rfp/create/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Category functionalities mapping
const CATEGORY_FUNCTIONALITIES = {
  'CONTRACT-LIFECYCLE-MANAGEMENT': {
    functionalities: [
      'Internal/External Collaboration',
      'Analytics and Reporting', 
      'Tool Administration and Control',
      'Contract Creation and Authoring',
      'Contract Repository',
      'Contract Negotiation',
      'Lifecycle Management',
      'Clause Library'
    ],
    features: {
      'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
      'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
      'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
      'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
      'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses']
    }
  },
  'LEGAL-AI': {
    functionalities: [
      'Drafting and Document Automation',
      'Data Processing and Manipulation',
      'Contract Specific Capabilities',
      'Compliance and Risk Management',
      'Research and Litigation',
      'Workflow Automation'
    ],
    features: {
      'Drafting and Document Automation': ['Template based drafting', 'Precedent based drafting', 'Legal style and consistency check', 'Smart summarization', 'Clause and language optimization'],
      'Data Processing and Manipulation': ['Command-based data extraction', 'OCR and text recognition', 'Data comparison', 'Reference-based search', 'Automated redaction'],
      'Contract Specific Capabilities': ['Contract generation', 'Contract review and assessment', 'Obligation tracking', 'Negotiation intelligence', 'Clause library and standardization'],
      'Compliance and Risk Management': ['Regulatory monitoring', 'Automated policy drafting', 'Risk scoring and alerts'],
      'Research and Litigation': ['Case analysis', 'Smart legal research', 'Predictive analysis for outcome', 'Automated e-discovery', 'Argument builder'],
      'Workflow Automation': ['Task allocation', 'Lifecycle automation']
    }
  },
  'DOCUMENT-MANAGEMENT-SYSTEM': {
    functionalities: [
      'Internal/External Collaboration',
      'Analytics and Reporting',
      'Tool Administration and Control',
      'Document Creation and Templates',
      'Document Search and Navigation',
      'Authentication',
      'Task Allotment'
    ],
    features: {
      'Document Creation and Templates': ['Document creation', 'Text editor', 'Document Templatization', 'Central repository', 'Co-authoring features'],
      'Document Search and Navigation': ['Categorizing and tagging', 'Search capabilities', 'Filter and sorting'],
      'Authentication': ['MFA (Multi factor Authentication)', 'Electronic signature capabilities'],
      'Task Allotment': ['Customizable workflows', 'Internal work delegation', 'Task tracking']
    }
  },
  'E-DISCOVERY': {
    functionalities: [
      'Internal/External Collaboration',
      'Analytics and Reporting',
      'Tool Administration and Control',
      'Data Identification and Collection',
      'Search, Processing and Analysis',
      'Review and Production',
      'Legal Hold Management'
    ],
    features: {
      'Data Identification and Collection': ['Data source identification', 'Remote Collection', 'Network-based collection', 'Forensic imaging', 'Custodian self-collection', 'Validation mechanisms'],
      'Search, Processing and Analysis': ['Search functionality', 'Filter and sorting', 'Duplicity elimination', 'Data processing', 'Cluster similar documents'],
      'Review and Production': ['Review and Analysis', 'Coding and annotations', 'Process control', 'Review workflow', 'Audit trail'],
      'Legal Hold Management': ['Legal hold tracking', 'Legal hold notice management', 'Receipt Acknowledgement', 'Data custodian Management']
    }
  },
  'IP-MANAGEMENT': {
    functionalities: [
      'Internal/External Collaboration',
      'Analytics and Reporting',
      'Tool Administration and Control',
      'Ideation and Creation',
      'Lifecycle Management',
      'Search and Discovery',
      'Storage and Repository'
    ],
    features: {
      'Ideation and Creation': ['Idea intake and management', 'Innovation workflow management'],
      'Lifecycle Management': ['Workflow management system (IP lifecycle)', 'Renewal management', 'Management of licensing agreements, contracts'],
      'Search and Discovery': ['Database integration', 'Advanced search capabilities', 'Filter and sorting'],
      'Storage and Repository': ['Centralized repository', 'Categorization and tagging', 'Accessibility control', 'Access audit']
    }
  },
  'LEGAL-RESEARCH': {
    functionalities: [
      'Internal/External Collaboration',
      'Analytics and Reporting',
      'Tool Administration and Control',
      'Case Law Research',
      'Statutory Research',
      'Advanced Search Capabilities',
      'Filter and Sorting'
    ],
    features: {
      'Case Law Research': ['Comprehensive case law databases', 'Jurisdictional filters', 'Citation search and validation', 'Historical case law archives'],
      'Statutory Research': ['Statutes and regulations databases', 'Annotations and historical versions', 'Legislative tracking and updates', 'Secondary Sources', 'Legal treatises and commentaries', 'Journals and law reviews', 'International treaties and conventions'],
      'Advanced Search Capabilities': ['Search Functionality', 'Boolean and logical search', 'AI-powered search and chat', 'Document upload'],
      'Filter and Sorting': ['Jurisdiction and court level', 'Date range and publication type', 'Relevance and citation frequency']
    }
  },
  'LITIGATION-MANAGEMENT-AND-ANALYTICS': {
    functionalities: [
      'Internal/External Collaboration',
      'Analytics and Reporting',
      'Tool Administration and Control',
      'Matter Lifecycle Tracking',
      'Court and Case Search',
      'Budget Expense and Time Tracking',
      'Litigation Docketing Features'
    ],
    features: {
      'Matter Lifecycle Tracking': ['Task management', 'Document organisation'],
      'Court and Case Search': ['Automated case alerts', 'Court docket systems', 'Real-time updates'],
      'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management', 'Client invoicing', 'Payment processing'],
      'Litigation Docketing Features': ['Collaborative timeline tracking', 'Court Rule tracking', 'Court database integration', 'Customized docket entries']
    }
  }
};

export async function POST(request) {
  try {
    const {
      userId,
      category,
      coreProblem,
      implementationTimeline,
      teamType,
      teamSize,
      vendorCountry,
      priority
    } = await request.json();

    // Validate required fields
    if (!category || !coreProblem || !implementationTimeline || 
        !teamType || !teamSize || !vendorCountry || !priority) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    // Save to RfpAi table (without budget fields)
    const rfpAi = await prisma.rfpAi.create({
      data: {
        category,
        coreProblem,
        implementationTimeline,
        teamType,
        teamSize,
        vendorCountry,
        priority
      }
    });

    // Get category functionalities and features
    const categoryMap = CATEGORY_FUNCTIONALITIES[category];
    if (!categoryMap) {
      return NextResponse.json({
        success: false,
        message: `Category "${category}" not supported`
      }, { status: 400 });
    }

    // Generate RFP using AI with structured approach
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `You are an expert RFP writer specializing in legal technology procurement. Generate a professional, process-focused RFP structure based on the user's requirements.

CRITICAL INSTRUCTIONS:
- Your response must be ONLY a valid JSON object - NO markdown formatting, NO explanations
- Focus on process improvement and operational efficiency in objectives
- Select features and functionalities ONLY from the provided category-specific lists
- Make objectives specific to the implementation timeline and team type
- Ensure all content is professional and actionable

Required JSON structure:
{
  "problemStatement": "A detailed, business-focused problem statement (200-300 words)",
  "objectives": ["objective1", "objective2", "objective3", "objective4", "objective5"],
  "keyFeatures": [
    {"name": "Feature Name", "description": "Why this feature is essential for solving the problem"},
    {"name": "Another Feature", "description": "Business justification for this feature"}
  ],
  "keyFunctionalities": [
    {"name": "Functionality Name", "description": "How this functionality improves processes"},
    {"name": "Another Functionality", "description": "Process improvement this enables"}
  ]
}

Make sure all JSON strings are properly escaped and the response is complete.`
        }, {
          role: 'user',
          content: `Generate a comprehensive RFP for ${category.replace(/-/g, ' ').toLowerCase()} software with these specifications:

BUSINESS CONTEXT:
- Team Type: ${teamType}
- Team Size: ${teamSize}
- Location: ${vendorCountry}
- Priority: ${priority}
- Timeline: ${implementationTimeline}
- Core Problem: ${coreProblem}

AVAILABLE FUNCTIONALITIES for ${category}:
${categoryMap.functionalities.join(', ')}

AVAILABLE FEATURES by Functionality:
${Object.entries(categoryMap.features).map(([func, features]) => 
  `${func}: ${features.join(', ')}`
).join('\n')}

REQUIREMENTS:
1. Problem Statement: Expand on the core problem with business context, current challenges, and expected outcomes
2. Objectives: Create 5 process-focused objectives aligned with ${priority} and ${implementationTimeline}
3. Key Features: Select 4-6 most relevant features from the available list that address the core problem
4. Key Functionalities: Select 4-6 most relevant functionalities that improve current processes

Focus on ${priority.toLowerCase()} as the primary criteria. Consider ${teamSize} team scale and ${implementationTimeline} urgency.`
        }],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    
    if (!aiData.choices || !aiData.choices[0] || !aiData.choices[0].message) {
      throw new Error('Invalid AI response format');
    }

    let generatedRfp;
    try {
      // Clean the AI response content
      let content = aiData.choices[0].message.content.trim();
      
      // Remove markdown code blocks if present
      if (content.startsWith('```json')) {
        content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (content.startsWith('```')) {
        content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      generatedRfp = JSON.parse(content);
    } catch (parseError) {
      console.error('AI response parse error:', parseError);
      // Enhanced fallback RFP structure with category-specific data
      const categoryName = category.replace(/-/g, ' ').toLowerCase();
      const selectedFunctionalities = categoryMap.functionalities.slice(0, 5);
      const selectedFeatures = Object.values(categoryMap.features).flat().slice(0, 6);
      
      generatedRfp = {
        problemStatement: `Our ${teamType.toLowerCase()} faces significant challenges with ${coreProblem}. With a team of ${teamSize} and ${implementationTimeline.toLowerCase()}, we need a comprehensive ${categoryName} solution that prioritizes ${priority.toLowerCase()}. Current manual processes are inefficient, error-prone, and don't scale with our growing demands. We require a solution that streamlines operations, ensures compliance, improves collaboration, and provides measurable ROI. The implementation must be smooth with minimal disruption to daily operations while delivering immediate value to our legal operations.`,
        objectives: [
          `Streamline ${categoryName} workflows to improve operational efficiency by 40%`,
          `Implement automated processes to reduce manual effort and human error`,
          `Enhance team collaboration and communication across all legal processes`,
          `Ensure compliance and risk management with built-in controls and audit trails`,
          `Achieve measurable ROI and cost savings within 6 months of implementation`
        ],
        keyFeatures: selectedFeatures.slice(0, 5).map((feature, index) => ({
          name: feature,
          description: `Essential ${feature.toLowerCase()} capability to address our core operational challenges and improve process efficiency.`
        })),
        keyFunctionalities: selectedFunctionalities.slice(0, 5).map((func, index) => ({
          name: func,
          description: `Critical ${func.toLowerCase()} functionality to streamline current processes and enable scalable operations.`
        }))
      };
    }

    // Get user email from your existing route or use placeholder
    const contactEmail = userId ? `user-${userId}@company.com` : 'contact@company.com';

    // Save structured RFP with new fields
    const rfpStructured = await prisma.rfpStructured.create({
      data: {
        teamType,
        teamSize, // Now included
        category: category.replace(/-/g, ' '),
        requirementUrgency: implementationTimeline,
        locationPreference: vendorCountry,
        contactEmail,
        problemStatement: generatedRfp.problemStatement,
        objectives: generatedRfp.objectives,
        keyFeatures: generatedRfp.keyFeatures, // New field
        keyFunctionalities: generatedRfp.keyFunctionalities, // New field
        vendors: [] // Initialize empty vendors array
      }
    });

    return NextResponse.json({
      success: true,
      rfpId: rfpStructured.id,
      message: 'RFP generated successfully',
      data: {
        rfpAiId: rfpAi.id,
        rfpStructuredId: rfpStructured.id
      }
    });

  } catch (error) {
    console.error('Error creating RFP:', error);
    
    // Return appropriate error message
    if (error.message.includes('AI API')) {
      return NextResponse.json({
        success: false,
        message: 'AI service temporarily unavailable. Please try again.',
        error: 'AI_SERVICE_ERROR'
      }, { status: 503 });
    }
    
    if (error.message.includes('Database')) {
      return NextResponse.json({
        success: false,
        message: 'Database error. Please try again.',
        error: 'DATABASE_ERROR'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to create RFP. Please try again.',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}
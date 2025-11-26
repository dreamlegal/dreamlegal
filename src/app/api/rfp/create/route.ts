
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
  },
  'CASE-MANAGEMENT': {
  functionalities: [
    'Internal/External Collaboration',
    'Analytics and Reporting',
    'Tool Administration and Control',
    'Case Intake and Assignment',
    'Document and Evidence Management',
    'Task and Deadline Tracking',
    'Calendar and Hearing Management',
    'Communication and Collaboration Tools',
    'Timekeeping and Billing Integration',
    'Case Progress Monitoring and Reporting'
  ],
  features: {
    'Case Intake and Assignment': ['Case intake forms', 'Automated assignment rules', 'Client information management'],
    'Document and Evidence Management': ['Centralized document repository', 'Evidence tracking', 'Version control'],
    'Task and Deadline Tracking': ['Task management', 'Deadline alerts', 'Milestone tracking'],
    'Calendar and Hearing Management': ['Court date scheduling', 'Hearing reminders', 'Calendar integration'],
    'Communication and Collaboration Tools': ['Internal messaging', 'Client communication portal', 'Team collaboration workspace'],
    'Timekeeping and Billing Integration': ['Time tracking', 'Billing integration', 'Expense management'],
    'Case Progress Monitoring and Reporting': ['Case status dashboards', 'Progress reports', 'Performance analytics']
  }
},
'TIMEKEEPING-SOFTWARE': {
  functionalities: [
    'Internal/External Collaboration',
    'Analytics and Reporting',
    'Tool Administration and Control',
    'Time Capture',
    'Billing & Invoicing',
    'Matter/Project Association',
    'Approvals & Compliance'
  ],
  features: {
    'Time Capture': ['Automated timers', 'Manual time entry', 'Activity-based capture', 'Email and document integration'],
    'Billing & Invoicing': ['Billable vs non-billable classification', 'Rate management', 'Invoice generation'],
    'Matter/Project Association': ['Matter linking', 'Client association', 'Project categorization'],
    'Approvals & Compliance': ['Time entry approval workflow', 'Compliance tracking', 'Audit trail']
  }
},
'LEGAL-INTAKE-SOFTWARE': {
  functionalities: [
    'Internal/External Collaboration',
    'Analytics and Reporting',
    'Tool Administration and Control',
    'Request Capture',
    'Triage & Routing',
    'Information Validation',
    'Workflow Management'
  ],
  features: {
    'Request Capture': ['Intake forms', 'Multi-channel submission', 'Request categorization'],
    'Triage & Routing': ['Automated routing rules', 'Priority assessment', 'Assignment logic'],
    'Information Validation': ['Data validation', 'Conflict checking', 'Completeness verification'],
    'Workflow Management': ['Status tracking', 'Automated notifications', 'Workflow customization']
  }
},
'TRANSACTION-MANAGEMENT-SOFTWARE': {
  functionalities: [
    'Internal/External Collaboration',
    'Analytics and Reporting',
    'Tool Administration and Control',
    'Transaction Checklists',
    'Document Management',
    'Collaboration Hub',
    'Signatures & Closing',
    'Closing Books'
  ],
  features: {
    'Transaction Checklists': ['Customizable checklists', 'Obligation tracking', 'Progress monitoring'],
    'Document Management': ['Document repository', 'Version control', 'Document organization'],
    'Collaboration Hub': ['Unified workspace', 'Real-time collaboration', 'Stakeholder communication'],
    'Signatures & Closing': ['E-signature integration', 'Closing coordination', 'Document execution'],
    'Closing Books': ['Automated closing book generation', 'Document compilation', 'Final deliverable creation']
  }
},
'GOVERNANCE-RISK-COMPLIANCE': {
  functionalities: [
    'Internal/External Collaboration',
    'Analytics and Reporting',
    'Tool Administration and Control',
    'Risk Identification and Assessment',
    'Policy and Procedure Management',
    'Compliance Tracking and Reporting',
    'Audit Management',
    'Incident and Issue Management',
    'Regulatory Change Management',
    'Dashboard and Analytics'
  ],
  features: {
    'Risk Identification and Assessment': ['Risk register', 'Risk scoring', 'Risk assessment workflows', 'Heat maps'],
    'Policy and Procedure Management': ['Policy library', 'Version control', 'Policy distribution', 'Acknowledgement tracking'],
    'Compliance Tracking and Reporting': ['Compliance calendar', 'Requirement tracking', 'Automated reporting', 'Compliance dashboards'],
    'Audit Management': ['Audit planning', 'Finding tracking', 'Corrective action management', 'Audit trail'],
    'Incident and Issue Management': ['Incident reporting', 'Investigation workflow', 'Root cause analysis', 'Issue resolution tracking'],
    'Regulatory Change Management': ['Regulatory updates', 'Change impact assessment', 'Implementation tracking'],
    'Dashboard and Analytics': ['Executive dashboards', 'Risk analytics', 'Compliance metrics', 'Trend analysis']
  }
},
'LEGAL-DUE-DILIGENCE': {
  functionalities: [
    'Internal/External Collaboration',
    'Analytics and Reporting',
    'Tool Administration and Control',
    'Data Room and Document Management',
    'Litigation Report',
    'Asset Verification',
    'Automated Document Review and Tagging',
    'Issue and Risk Flagging',
    'Collaboration and Task Management',
    'Customizable Checklists and Templates',
    'Reporting and Analytics',
    'Integration with Contract and Compliance Systems'
  ],
  features: {
    'Data Room and Document Management': ['Virtual data room', 'Document organization', 'Access control', 'Activity tracking'],
    'Litigation Report': ['Litigation history', 'Case summaries', 'Risk assessment'],
    'Asset Verification': ['Asset inventory', 'Ownership verification', 'Lien searches'],
    'Automated Document Review and Tagging': ['AI-powered review', 'Automatic tagging', 'Document classification'],
    'Issue and Risk Flagging': ['Red flag detection', 'Risk categorization', 'Issue tracking'],
    'Collaboration and Task Management': ['Task assignment', 'Q&A management', 'Stakeholder collaboration'],
    'Customizable Checklists and Templates': ['Due diligence checklists', 'Template library', 'Workflow customization'],
    'Reporting and Analytics': ['Due diligence reports', 'Risk summaries', 'Analytics dashboards'],
    'Integration with Contract and Compliance Systems': ['Contract integration', 'Compliance data linking', 'System interoperability']
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
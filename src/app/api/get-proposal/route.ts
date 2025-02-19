// // app/api/get-proposal/route.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const { proposalId } = await request.json();
    
//     const proposal = await prisma.aiProposal.findUnique({
//       where: { id: proposalId }
//     });

//     if (!proposal) {
//       return NextResponse.json(
//         { error: 'Proposal not found' },
//         { status: 404 }
//       );
//     }

//     // Determine current content - either latest version or AI response
//     let currentContent;
    
//     if (proposal.versions && Array.isArray(proposal.versions) && proposal.versions.length > 0) {
//       // If versions exist, get the latest one
//       const sortedVersions = [...proposal.versions].sort((a, b) => 
//         new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       currentContent = sortedVersions[0].content;
//     } else {
//       // If no versions exist, use the AI response
//       currentContent = proposal.aiResponse;
//     }

//     return NextResponse.json({
//       id: proposal.id,
//       status: proposal.status,
//       currentContent,
//       hasVersions: proposal.versions?.length > 0 || false
//     });

//   } catch (error) {
//     console.error('Error fetching proposal:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch proposal' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the standard order for section groups
const SECTION_ORDER = [
  {
    title: "Overview",
    sections: ["Title","Problems Addressed", "Particular Requirements",]
  },
  {
    title: "Business Value",
    sections: ["Why the Intellectual Property Management is best fit for the client",]
  },
  {
    title: "Requirements & Problems",
    sections: [ "Product Overview","Pain Points","Top Features",]
  },
  {
    title: "Solution Details",
    sections: [  "Top Functionalities", "Best Version of Product" ,"How the Product Can Help", ]
  },
 
 
  {
    title: "Social Proof",
    sections: [ "Analysis of Customer Preferences","Testimonials","About the company"]
  }
];

function formatProposalData(content) {
  // Check if content has the nested structure
  const proposalData = content?.response?.Proposal || {};
  
  // Create a new ordered object
  const orderedProposal = {};
  
  // Flatten all sections into a single array
  const allSections = SECTION_ORDER.reduce((acc, group) => [...acc, ...group.sections], []);
  
  // Add sections in the defined order
  allSections.forEach(section => {
    const key = Object.keys(proposalData).find(k => 
      k.toLowerCase().replace(/[\[\]]/g, '').trim() === section.toLowerCase().replace(/[\[\]]/g, '').trim()
    );
    
    if (key && proposalData[key]) {
      orderedProposal[key] = proposalData[key];
    }
  });
  
  // Add any remaining sections that weren't in our order
  Object.keys(proposalData).forEach(key => {
    if (!orderedProposal[key]) {
      orderedProposal[key] = proposalData[key];
    }
  });
  
  return orderedProposal;
}

export async function POST(request) {
  try {
    const { proposalId } = await request.json();
    
    const proposal = await prisma.aiProposal.findUnique({
      where: { id: proposalId }
    });

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Determine current content - either latest version or AI response
    let currentContent;
    
    if (proposal.versions && Array.isArray(proposal.versions) && proposal.versions.length > 0) {
      // If versions exist, get the latest one
      const sortedVersions = [...proposal.versions].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      currentContent = sortedVersions[0].content;
    } else {
      // If no versions exist, use the AI response
      currentContent = proposal.aiResponse;
    }

    // Format the content before sending
    const formattedContent = formatProposalData(currentContent);

    return NextResponse.json({
      id: proposal.id,
      status: proposal.status,
      currentContent: formattedContent,
      hasVersions: proposal.versions?.length > 0 || false
    });

  } catch (error) {
    console.error('Error fetching proposal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proposal' },
      { status: 500 }
    );
  }
}
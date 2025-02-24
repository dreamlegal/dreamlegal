
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the field ordering for different objects
const FIELD_ORDER = {
  Proposal: [
    "Title",
    "Problems Addressed",
    "Particular Requirements",
    "Why the Contract Lifecycle Management is best fit for the client",
    "Product Overview",
    "Pain Points",
    "Top Features",
    "Top Functionalities",
    "Best Version of Product",
    "Company Description",
    "How the Product Can Help",
    "Analysis of Customer Preferences",
    "Testimonials",
    "About the company"
  ],
  Testimonials: ["Name", "Designation", "Organization", "Message"],
  TopFeatures: ["Feature", "Details"],
  TopFunctionalities: ["functionality", "features"],
  AnalysisOfCustomerPreferences: ["Nature", "Tech Friendliness", "Preferences"],
  WhyBestFit: ["CE", "COI", "ROI"]
};

function deepOrderObject(obj, orderKey = 'Proposal') {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        return deepOrderObject(item, orderKey);
      }
      return item;
    });
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const orderedObj = {};
  const orderArray = FIELD_ORDER[orderKey] || Object.keys(obj);

  // First, add fields in the specified order
  orderArray.forEach(field => {
    if (obj[field] !== undefined) {
      if (typeof obj[field] === 'object' && obj[field] !== null) {
        // Determine the correct order key for nested objects
        let nestedOrderKey = field.replace(/s$/, ''); // Remove trailing 's' for arrays
        orderedObj[field] = deepOrderObject(obj[field], nestedOrderKey);
      } else {
        orderedObj[field] = obj[field];
      }
    }
  });

  // Then add any remaining fields
  Object.keys(obj).forEach(field => {
    if (!orderArray.includes(field)) {
      if (typeof obj[field] === 'object' && obj[field] !== null) {
        let nestedOrderKey = field.replace(/s$/, '');
        orderedObj[field] = deepOrderObject(obj[field], nestedOrderKey);
      } else {
        orderedObj[field] = obj[field];
      }
    }
  });

  return orderedObj;
}

export async function POST(request) {
  try {
    console.log('1. Starting POST request');
    
    const { proposalId, vendorId, formData } = await request.json();
    console.log('2. Received data:', { proposalId, vendorId });

    if (!proposalId || !vendorId || !formData) {
      console.log('3. Validation failed:', { proposalId, vendorId, formData });
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Check vendor credits
    const credits = await prisma.vendorCredits.findFirst({
      where: { vendorId }
    });

    if (!credits || credits.proposalCredits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient credits',
        remainingCredits: credits?.proposalCredits || 0
      }, { status: 400 });
    }

    // Call AI API
    const aiResponse = await fetch('https://dreamlegal.in/ai/proposal/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!aiResponse.ok) {
      throw new Error('AI API response was not successful');
    }

    const aiData = await aiResponse.json();
    
    // Order the response deeply
    const orderedResponse = {
      response: {
        Proposal: deepOrderObject(aiData.response.Proposal)
      }
    };

    // Update proposal with transaction
    const [updatedProposal] = await prisma.$transaction([
      prisma.aiProposal.update({
        where: { id: proposalId },
        data: {
          aiResponse: orderedResponse,
          status: 'UNSAVED',
          updatedAt: new Date()
        }
      }),
      prisma.vendorCredits.update({
        where: { id: credits.id },
        data: {
          proposalCredits: credits.proposalCredits - 1
        }
      })
    ]);

    // Return ordered response
    return NextResponse.json({
      proposalId: updatedProposal.id,
      ...orderedResponse
    });

  } catch (error) {
    console.error('ERROR in proposal generation:', {
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json({ 
      error: 'Failed to generate proposal',
      message: error.message 
    }, { status: 500 });
  }
}
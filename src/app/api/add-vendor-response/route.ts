import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function POST(req: Request) {
  try {
    // Check if prisma client is properly initialized
   
    
    const { rfpId, vendorId, responses } = await req.json();

    if (!rfpId || !vendorId) {
      return NextResponse.json({ 
        success: false, 
        message: 'RFP ID and Vendor ID are required' 
      }, { status: 400 });
    }

    // First, retrieve the current RFP data
    const rfp = await prisma.rfpForms.findUnique({
      where: {
        id: rfpId
      }
    });

    if (!rfp) {
      return NextResponse.json({ 
        success: false, 
        message: 'RFP not found' 
      }, { status: 404 });
    }

    // Check if this vendor has already responded to this RFP
    const hasVendorResponded = checkVendorHasResponded(rfp, vendorId);
    
    if (hasVendorResponded) {
      return NextResponse.json({ 
        success: false, 
        message: 'You have already submitted a response to this RFP' 
      }, { status: 400 });
    }

    // Create updated RFP data with vendor responses
    const updatedRfp = addVendorResponses(rfp, vendorId, responses);

    // Update the RFP in the database
    const result = await prisma.rfpForms.update({
      where: {
        id: rfpId
      },
      data: updatedRfp
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Response submitted successfully',
      data: result
    }, { status: 200 });
  } catch (error) {
    console.error('Error submitting vendor response:', error);
    
    let errorMessage = 'Failed to submit response';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ 
      success: false, 
      message: errorMessage 
    }, { status: 500 });
  }
}

// Helper function to check if vendor has already responded
function checkVendorHasResponded(rfp, vendorId) {
  // Check basic fields with responses
  const basicFields = ['userOrgType', 'userTeamSize', 'keyProblems', 'keyGoals', 'customisation', 'urgency', 'budget'];
  
  for (const field of basicFields) {
    if (rfp[field] && 
        rfp[field].responses && 
        Array.isArray(rfp[field].responses) && 
        rfp[field].responses.some(response => response.vendorId === vendorId)) {
      return true;
    }
  }
  
  // Check process lifecycle
  if (rfp.processLifecycle) {
    for (const stage in rfp.processLifecycle) {
      if (rfp.processLifecycle[stage].responses && 
          Array.isArray(rfp.processLifecycle[stage].responses) && 
          rfp.processLifecycle[stage].responses.some(response => response.vendorId === vendorId)) {
        return true;
      }
    }
  }
  
  // Check features
  if (rfp.features) {
    for (const category in rfp.features) {
      for (const functionality in rfp.features[category]) {
        if (functionality === 'selected') continue; // Skip the 'selected' property
        
        for (const feature in rfp.features[category][functionality]) {
          if (feature === 'selected') continue; // Skip the 'selected' property
          
          if (rfp.features[category][functionality][feature].responses && 
              Array.isArray(rfp.features[category][functionality][feature].responses) &&
              rfp.features[category][functionality][feature].responses.some(response => response.vendorId === vendorId)) {
            return true;
          }
        }
      }
    }
  }
  
  return false;
}

// Helper function to add vendor responses to the RFP data
function addVendorResponses(rfp, vendorId, responses) {
  const timestamp = new Date().toISOString();
  const updatedRfp = { ...rfp };
  
  // Process basic fields with responses
  const basicFields = ['userOrgType', 'userTeamSize', 'keyProblems', 'keyGoals', 'customisation'];
  for (const field of basicFields) {
    if (responses[field] && rfp[field]) {
      // Ensure the responses array exists
      if (!updatedRfp[field].responses) {
        updatedRfp[field].responses = [];
      }
      
      // Add the vendor's response
      updatedRfp[field].responses.push({
        vendorId,
        response: responses[field].response,
        timestamp
      });
    }
  }
  
  // Process urgency
  if (responses.urgency && rfp.urgency) {
    if (!updatedRfp.urgency.responses) {
      updatedRfp.urgency.responses = [];
    }
    
    updatedRfp.urgency.responses.push({
      vendorId,
      meetable: responses.urgency.meetable,
      proposedTimeline: responses.urgency.proposedTimeline,
      timestamp
    });
  }
  
  // Process budget
  if (responses.budget && rfp.budget) {
    if (!updatedRfp.budget.responses) {
      updatedRfp.budget.responses = [];
    }
    
    updatedRfp.budget.responses.push({
      vendorId,
      meetable: responses.budget.meetable,
      quotedAmount: responses.budget.quotedAmount,
      pricingDetails: responses.budget.pricingDetails,
      timestamp
    });
  }
  
  // Process lifecycle stages
  if (responses.processLifecycle && rfp.processLifecycle) {
    for (const stage in responses.processLifecycle) {
      if (updatedRfp.processLifecycle[stage]) {
        if (!updatedRfp.processLifecycle[stage].responses) {
          updatedRfp.processLifecycle[stage].responses = [];
        }
        
        updatedRfp.processLifecycle[stage].responses.push({
          vendorId,
          available: responses.processLifecycle[stage].available,
          details: responses.processLifecycle[stage].details,
          timestamp
        });
      }
    }
  }
  
  // Process features
  if (responses.features && rfp.features) {
    for (const category in responses.features) {
      if (updatedRfp.features[category]) {
        for (const functionality in responses.features[category]) {
          if (updatedRfp.features[category][functionality]) {
            for (const feature in responses.features[category][functionality]) {
              if (updatedRfp.features[category][functionality][feature] && 
                 feature !== 'selected') {
                
                if (!updatedRfp.features[category][functionality][feature].responses) {
                  updatedRfp.features[category][functionality][feature].responses = [];
                }
                
                updatedRfp.features[category][functionality][feature].responses.push({
                  vendorId,
                  available: responses.features[category][functionality][feature].available,
                  details: responses.features[category][functionality][feature].details,
                  timestamp
                });
              }
            }
          }
        }
      }
    }
  }
  
  return updatedRfp;
}
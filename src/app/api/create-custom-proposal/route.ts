
// // // // // import { NextResponse } from 'next/server';
// // // // // import prisma from '@/lib/prisma';

// // // // // // Define the standard order for proposal sections
// // // // // const STANDARD_ORDER = [
// // // // //   "Title",
// // // // //   "Problems Addressed",
// // // // //   "Particular Requirements",
// // // // //   "Why the Intellectual Property Management is best fit for the client",
// // // // //   "Product Overview",
// // // // //   "Pain Points",
// // // // //   "Top Features",
// // // // //   "Top Functionalities",
// // // // //   "Best Version of Product",
// // // // //   "How the Product Can Help",
// // // // //   "Analysis of Customer Preferences",
// // // // //   "Testimonials",
// // // // //   "About the company",
// // // // //   "Company Description"
// // // // // ];

// // // // // const standardizeProposal = (aiData) => {
// // // // //   // Extract the Proposal object
// // // // //   const originalProposal = aiData?.response?.Proposal;
// // // // //   if (!originalProposal) return aiData;

// // // // //   // Create ordered proposal object
// // // // //   const orderedProposal = {};
  
// // // // //   // Add properties in standard order
// // // // //   STANDARD_ORDER.forEach(key => {
// // // // //     if (originalProposal[key] !== undefined) {
// // // // //       orderedProposal[key] = originalProposal[key];
// // // // //     }
// // // // //   });

// // // // //   // Add any remaining properties not in standard order
// // // // //   Object.keys(originalProposal).forEach(key => {
// // // // //     if (!STANDARD_ORDER.includes(key)) {
// // // // //       orderedProposal[key] = originalProposal[key];
// // // // //     }
// // // // //   });

// // // // //   // Return standardized structure
// // // // //   return {
// // // // //     response: {
// // // // //       Proposal: orderedProposal
// // // // //     }
// // // // //   };
// // // // // };

// // // // // export async function POST(request) {
// // // // //   try {
// // // // //     const { proposalId, vendorId, formData } = await request.json();

// // // // //     // Validate required fields
// // // // //     if (!proposalId) {
// // // // //       return NextResponse.json({ 
// // // // //         error: 'Missing proposalId' 
// // // // //       }, { status: 400 });
// // // // //     }

// // // // //     if (!vendorId) {
// // // // //       return NextResponse.json({ 
// // // // //         error: 'Missing vendorId' 
// // // // //       }, { status: 400 });
// // // // //     }

// // // // //     if (!formData) {
// // // // //       return NextResponse.json({ 
// // // // //         error: 'Missing formData' 
// // // // //       }, { status: 400 });
// // // // //     }

// // // // //     // Check vendor credits
// // // // //     const credits = await prisma.vendorCredits.findFirst({
// // // // //       where: { vendorId }
// // // // //     });

// // // // //     if (!credits || credits.proposalCredits <= 0) {
// // // // //       return NextResponse.json({ 
// // // // //         error: 'Insufficient credits',
// // // // //         remainingCredits: credits?.proposalCredits || 0
// // // // //       }, { status: 400 });
// // // // //     }

// // // // //     // Call AI API for proposal generation
// // // // //     const aiResponse = await fetch('https://ai-backend-y6mq.onrender.com/ai/proposal/', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify(formData)
// // // // //     });

// // // // //     if (!aiResponse.ok) {
// // // // //       throw new Error('AI API response was not successful');
// // // // //     }

// // // // //     const aiData = await aiResponse.json();
    
// // // // //     // Standardize the AI response
// // // // //     const standardizedResponse = standardizeProposal(aiData);

// // // // //     // Update proposal with standardized response
// // // // //     const updatedProposal = await prisma.aiProposal.update({
// // // // //       where: { id: proposalId },
// // // // //       data: {
// // // // //         aiResponse: standardizedResponse,
// // // // //         status: 'UNSAVED',
// // // // //         updatedAt: new Date()
// // // // //       }
// // // // //     });

// // // // //     // Deduct credit after successful generation
// // // // //     await prisma.vendorCredits.update({
// // // // //       where: { id: credits.id },
// // // // //       data: {
// // // // //         proposalCredits: credits.proposalCredits - 1
// // // // //       }
// // // // //     });

// // // // //     // Return standardized response
// // // // //     return NextResponse.json({
// // // // //       proposalId: updatedProposal.id,
// // // // //       ...standardizedResponse
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error('Error generating proposal:', error);
    
// // // // //     // Return appropriate error response
// // // // //     return NextResponse.json({ 
// // // // //       error: 'Failed to generate proposal',
// // // // //       message: error.message 
// // // // //     }, { status: 500 });
// // // // //   }
// // // // // }

// // // // import { NextResponse } from 'next/server';
// // // // import prisma from '@/lib/prisma';

// // // // export async function POST(request) {
// // // //   try {
// // // //     console.log('1. Starting POST request');
    
// // // //     const { proposalId, vendorId, formData } = await request.json();
// // // //     console.log('2. Received data:', { proposalId, vendorId, formData });

// // // //     // Validate required fields
// // // //     if (!proposalId || !vendorId || !formData) {
// // // //       console.log('3. Validation failed:', { proposalId, vendorId, formData });
// // // //       return NextResponse.json({ 
// // // //         error: 'Missing required fields' 
// // // //       }, { status: 400 });
// // // //     }

// // // //     // Check vendor credits
// // // //     console.log('4. Checking vendor credits for vendorId:', vendorId);
// // // //     const credits = await prisma.vendorCredits.findFirst({
// // // //       where: { vendorId }
// // // //     });
// // // //     console.log('5. Found credits:', credits);

// // // //     if (!credits || credits.proposalCredits <= 0) {
// // // //       console.log('6. Insufficient credits:', credits?.proposalCredits);
// // // //       return NextResponse.json({ 
// // // //         error: 'Insufficient credits',
// // // //         remainingCredits: credits?.proposalCredits || 0
// // // //       }, { status: 400 });
// // // //     }

// // // //     // Call AI API
// // // //     console.log('7. Calling AI API with formData:', formData);
// // // //     const aiResponse = await fetch('https://ai-backend-y6mq.onrender.com/ai/proposal/', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify(formData)
// // // //     });

// // // //     if (!aiResponse.ok) {
// // // //       console.log('8. AI API error:', { 
// // // //         status: aiResponse.status, 
// // // //         statusText: aiResponse.statusText 
// // // //       });
// // // //       throw new Error('AI API response was not successful');
// // // //     }

// // // //     const aiData = await aiResponse.json();
// // // //     console.log('9. AI API response:', aiData);

// // // //     // Update proposal
// // // //     console.log('10. Updating proposal in database');
// // // //     const updatedProposal = await prisma.aiProposal.update({
// // // //       where: { id: proposalId },
// // // //       data: {
// // // //         aiResponse: aiData,
// // // //         status: 'UNSAVED',
// // // //         updatedAt: new Date()
// // // //       }
// // // //     });
// // // //     console.log('11. Updated proposal:', updatedProposal);

// // // //     // Deduct credit
// // // //     console.log('12. Deducting credit');
// // // //     await prisma.vendorCredits.update({
// // // //       where: { id: credits.id },
// // // //       data: {
// // // //         proposalCredits: credits.proposalCredits - 1
// // // //       }
// // // //     });
// // // //     console.log('13. Credit deducted successfully');

// // // //     // Return response
// // // //     console.log('14. Sending final response');
// // // //     return NextResponse.json({
// // // //       proposalId: updatedProposal.id,
// // // //       ...aiData
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('ERROR in proposal generation:', {
// // // //       message: error.message,
// // // //       stack: error.stack,
// // // //       cause: error.cause
// // // //     });
    
// // // //     return NextResponse.json({ 
// // // //       error: 'Failed to generate proposal',
// // // //       message: error.message 
// // // //     }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/prisma';

// // // export async function POST(request) {
// // //   try {
// // //     console.log('1. Starting POST request');
    
// // //     const { proposalId, vendorId, formData } = await request.json();
// // //     console.log('2. Received data:', { proposalId, vendorId, formData });

// // //     // Validate required fields
// // //     if (!proposalId || !vendorId || !formData) {
// // //       console.log('3. Validation failed:', { proposalId, vendorId, formData });
// // //       return NextResponse.json({ 
// // //         error: 'Missing required fields' 
// // //       }, { status: 400 });
// // //     }

// // //     // Check vendor credits
// // //     console.log('4. Checking vendor credits for vendorId:', vendorId);
// // //     const credits = await prisma.vendorCredits.findFirst({
// // //       where: { vendorId }
// // //     });
// // //     console.log('5. Found credits:', credits);

// // //     if (!credits || credits.proposalCredits <= 0) {
// // //       console.log('6. Insufficient credits:', credits?.proposalCredits);
// // //       return NextResponse.json({ 
// // //         error: 'Insufficient credits',
// // //         remainingCredits: credits?.proposalCredits || 0
// // //       }, { status: 400 });
// // //     }

// // //     // Call AI API
// // //     console.log('7. Calling AI API with formData:', formData);
// // //     const aiResponse = await fetch('https://ai-backend-y6mq.onrender.com/ai/proposal/', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify(formData)
// // //     });

// // //     if (!aiResponse.ok) {
// // //       console.log('8. AI API error:', { 
// // //         status: aiResponse.status, 
// // //         statusText: aiResponse.statusText 
// // //       });
// // //       throw new Error('AI API response was not successful');
// // //     }

// // //     const aiData = await aiResponse.json();
// // //     console.log('9. AI API response:', aiData);

// // //     // Process and save the response
// // //     const proposalData = {
// // //       id: proposalId,
// // //       aiResponse: aiData,
// // //       status: 'UNSAVED',
// // //       updatedAt: new Date()
// // //     };

// // //     // Update proposal with transaction
// // //     console.log('10. Starting database transaction');
// // //     const [updatedProposal] = await prisma.$transaction([
// // //       prisma.aiProposal.update({
// // //         where: { id: proposalId },
// // //         data: proposalData
// // //       }),
// // //       prisma.vendorCredits.update({
// // //         where: { id: credits.id },
// // //         data: {
// // //           proposalCredits: credits.proposalCredits - 1
// // //         }
// // //       })
// // //     ]);
// // //     console.log('11. Transaction completed, proposal updated:', updatedProposal);

// // //     // Return the response
// // //     return NextResponse.json({
// // //       proposalId: updatedProposal.id,
// // //       aiResponse: aiData
// // //     });

// // //   } catch (error) {
// // //     console.error('ERROR in proposal generation:', {
// // //       message: error.message,
// // //       stack: error.stack,
// // //       cause: error.cause
// // //     });
    
// // //     return NextResponse.json({ 
// // //       error: 'Failed to generate proposal',
// // //       message: error.message 
// // //     }, { status: 500 });
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import prisma from '@/lib/prisma';

// // export async function POST(request) {
// //   try {
// //     console.log('1. Starting POST request');
    
// //     const { proposalId, vendorId, formData } = await request.json();
// //     console.log('2. Received data:', { proposalId, vendorId });

// //     // Validate required fields
// //     if (!proposalId || !vendorId || !formData) {
// //       console.log('3. Validation failed:', { proposalId, vendorId, formData });
// //       return NextResponse.json({ 
// //         error: 'Missing required fields' 
// //       }, { status: 400 });
// //     }

// //     // Check vendor credits
// //     console.log('4. Checking vendor credits for vendorId:', vendorId);
// //     const credits = await prisma.vendorCredits.findFirst({
// //       where: { vendorId }
// //     });
// //     console.log('5. Found credits:', credits);

// //     if (!credits || credits.proposalCredits <= 0) {
// //       console.log('6. Insufficient credits:', credits?.proposalCredits);
// //       return NextResponse.json({ 
// //         error: 'Insufficient credits',
// //         remainingCredits: credits?.proposalCredits || 0
// //       }, { status: 400 });
// //     }

// //     // Call AI API
// //     console.log('7. Calling AI API');
// //     const aiResponse = await fetch('https://ai-backend-y6mq.onrender.com/ai/proposal/', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(formData)
// //     });

// //     if (!aiResponse.ok) {
// //       console.log('8. AI API error:', { 
// //         status: aiResponse.status, 
// //         statusText: aiResponse.statusText 
// //       });
// //       throw new Error('AI API response was not successful');
// //     }

// //     const aiData = await aiResponse.json();
// //     console.log('9. AI API response:', JSON.stringify(aiData, null, 2));

// //     // Prepare data for database update
// //     const proposalData = {
// //       id: proposalId,
// //       aiResponse: aiData,  // Store only the AI response
// //       status: 'UNSAVED',
// //       updatedAt: new Date()
// //     };

// //     // Update proposal with transaction
// //     console.log('10. Starting database transaction');
// //     const [updatedProposal] = await prisma.$transaction([
// //       prisma.aiProposal.update({
// //         where: { id: proposalId },
// //         data: {
// //           aiResponse: aiData,  // Store only the AI response
// //           status: 'UNSAVED',
// //           updatedAt: new Date()
// //         }
// //       }),
// //       prisma.vendorCredits.update({
// //         where: { id: credits.id },
// //         data: {
// //           proposalCredits: credits.proposalCredits - 1
// //         }
// //       })
// //     ]);
// //     console.log('11. Transaction completed');
// //     console.log('12. Updated proposal aiResponse:', JSON.stringify(updatedProposal.aiResponse, null, 2));

// //     // Return response
// //     return NextResponse.json({
// //       proposalId: updatedProposal.id,
// //       ...aiData  // Return the AI response directly
// //     });

// //   } catch (error) {
// //     console.error('ERROR in proposal generation:', {
// //       message: error.message,
// //       stack: error.stack,
// //       cause: error.cause
// //     });
    
// //     return NextResponse.json({ 
// //       error: 'Failed to generate proposal',
// //       message: error.message 
// //     }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// // Define the standard order for proposal fields
// const FIELD_ORDER = [
//   "Title",
//   "Problems Addressed",
//   "Particular Requirements",
//   "Why the Contract Lifecycle Management is best fit for the client",
//   "Product Overview",
//   "Pain Points",
//   "Top Features",
//   "Top Functionalities",
//   "Best Version of Product",
//   "Company Description",
//   "How the Product Can Help",
//   "Analysis of Customer Preferences",
//   "Testimonials",
//   "About the company"
// ];

// function orderProposalFields(proposal) {
//   if (!proposal || typeof proposal !== 'object') return proposal;

//   const orderedProposal = {};
  
//   // First add fields in the specified order
//   FIELD_ORDER.forEach(field => {
//     if (proposal[field] !== undefined) {
//       orderedProposal[field] = proposal[field];
//     }
//   });

//   // Then add any remaining fields that weren't in the order list
//   Object.keys(proposal).forEach(field => {
//     if (!FIELD_ORDER.includes(field)) {
//       orderedProposal[field] = proposal[field];
//     }
//   });

//   return orderedProposal;
// }

// export async function POST(request) {
//   try {
//     console.log('1. Starting POST request');
    
//     const { proposalId, vendorId, formData } = await request.json();
//     console.log('2. Received data:', { proposalId, vendorId });

//     // Validate required fields
//     if (!proposalId || !vendorId || !formData) {
//       console.log('3. Validation failed:', { proposalId, vendorId, formData });
//       return NextResponse.json({ 
//         error: 'Missing required fields' 
//       }, { status: 400 });
//     }

//     // Check vendor credits
//     console.log('4. Checking vendor credits for vendorId:', vendorId);
//     const credits = await prisma.vendorCredits.findFirst({
//       where: { vendorId }
//     });
//     console.log('5. Found credits:', credits);

//     if (!credits || credits.proposalCredits <= 0) {
//       console.log('6. Insufficient credits:', credits?.proposalCredits);
//       return NextResponse.json({ 
//         error: 'Insufficient credits',
//         remainingCredits: credits?.proposalCredits || 0
//       }, { status: 400 });
//     }

//     // Call AI API
//     console.log('7. Calling AI API');
//     const aiResponse = await fetch('https://ai-backend-y6mq.onrender.com/ai/proposal/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });

//     if (!aiResponse.ok) {
//       console.log('8. AI API error:', { 
//         status: aiResponse.status, 
//         statusText: aiResponse.statusText 
//       });
//       throw new Error('AI API response was not successful');
//     }

//     const aiData = await aiResponse.json();
//     console.log('9. Original AI API response:', JSON.stringify(aiData, null, 2));

//     // Order the fields in the response
//     const orderedResponse = {
//       response: {
//         Proposal: orderProposalFields(aiData.response.Proposal)
//       }
//     };

//     console.log('10. Ordered response:', JSON.stringify(orderedResponse, null, 2));

//     // Update proposal with transaction
//     console.log('11. Starting database transaction');
//     const [updatedProposal] = await prisma.$transaction([
//       prisma.aiProposal.update({
//         where: { id: proposalId },
//         data: {
//           aiResponse: orderedResponse,  // Store the ordered response
//           status: 'UNSAVED',
//           updatedAt: new Date()
//         }
//       }),
//       prisma.vendorCredits.update({
//         where: { id: credits.id },
//         data: {
//           proposalCredits: credits.proposalCredits - 1
//         }
//       })
//     ]);
//     console.log('12. Transaction completed');
//     console.log('13. Updated proposal aiResponse:', JSON.stringify(updatedProposal.aiResponse, null, 2));

//     // Return ordered response
//     return NextResponse.json({
//       proposalId: updatedProposal.id,
//       ...orderedResponse
//     });

//   } catch (error) {
//     console.error('ERROR in proposal generation:', {
//       message: error.message,
//       stack: error.stack,
//       cause: error.cause
//     });
    
//     return NextResponse.json({ 
//       error: 'Failed to generate proposal',
//       message: error.message 
//     }, { status: 500 });
//   }
// }
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
    const aiResponse = await fetch('https://ai-backend-y6mq.onrender.com/ai/proposal/', {
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
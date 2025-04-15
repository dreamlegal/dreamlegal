// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const {
//       userId,
//       userOrgType,
//       userTeamSize,
//       customisation,
//       urgency,
//       budget,
//       selectedFeatures,
//       vendors
//     } = body;

//     // Save the data to the database
//     const rfp = await prisma.rfpForm.create({
//       data: {
//         userID: userId,
//         userOrgType,
//         userTeamSize,
//         customisation,
//         urgency,
//         budget,
//         features: selectedFeatures,
//         vendors,
//       },
//     });

//     // Respond with success and the created data
//     return NextResponse.json({ success: true, data: rfp }, { status: 200 });
//   } catch (error) {
//     console.error('Error submitting RFP:', error);
//     // Respond with an error
//     return NextResponse.json({ success: false, message: 'Failed to submit RFP' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      userOrgType,
      userTeamSize,
      keyProblems,
      keyGoals,
      customisation,
      selectedCategory,
      processLifecycle,
      features,
      urgency,
      budget
    } = body;

    console.log('Received RFP data:', JSON.stringify(body, null, 2));

    // Save the data to the database with the new structure
    const rfp = await prisma.rfpForms.create({
      data: {
        userID: userId,
        userOrgType: userOrgType,
        userTeamSize: userTeamSize,
        keyProblems: keyProblems,
        keyGoals: keyGoals,
        customisation: customisation,
        selectedCategory: selectedCategory,
        processLifecycle: processLifecycle,
        features: features,
        urgency: urgency,
        budget: budget,
      },
    });

    // Respond with success and the created data
    return NextResponse.json({ success: true, data: rfp }, { status: 200 });
  } catch (error) {
    console.error('Error submitting RFP:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to submit RFP';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // Respond with an error
    return NextResponse.json({ 
      success: false, 
      message: errorMessage 
    }, { status: 500 });
  }
}
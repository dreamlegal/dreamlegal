// // In /app/api/generate-proposal/route.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const { product_profile, client_profile, vendorId } = await request.json();

//     // First find the vendor credits record
//     const credits = await prisma.vendorCredits.findFirst({
//       where: { vendorId },
//     });

//     if (!credits || credits.proposalCredits <= 0) {
//       return NextResponse.json({ 
//         error: 'Insufficient credits for proposal generation' 
//       }, { status: 400 });
//     }

//     // Call the render API for proposal generation
//     const proposalResponse = await fetch('https://ai-backend-y6mq.onrender.com/proposal/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         product_profile,
//         client_profile
//       }),
//     });

//     const proposalData = await proposalResponse.json();

//     // Update credits using the id we got from findFirst
//     const updatedCredits = await prisma.vendorCredits.update({
//       where: { id: credits.id },
//       data: {
//         proposalCredits: credits.proposalCredits - 1
//       },
//     });

//     return NextResponse.json({
//       proposal: proposalData,
//       remainingCredits: updatedCredits.proposalCredits
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Proposal generation failed' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { product_profile, client_profile, vendorId } = await request.json();

    // First find the vendor credits record
    const credits = await prisma.vendorCredits.findFirst({
      where: { vendorId },
    });

    if (!credits || credits.proposalCredits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient credits for proposal generation' 
      }, { status: 400 });
    }

    // Early return if no credits
    if (!credits || credits.proposalCredits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient credits for proposal generation',
        remainingCredits: credits?.proposalCredits || 0
      }, { status: 400 });
    }

    // Call the render API for proposal generation
    const proposalResponse = await fetch('https://ai-backend-y6mq.onrender.com/proposal/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_profile,
        client_profile
      }),
    });

    const proposalData = await proposalResponse.json();

    // Update credits using the id we got from findFirst
    const updatedCredits = await prisma.vendorCredits.update({
      where: { id: credits.id },
      data: {
        proposalCredits: credits.proposalCredits - 1
      },
    });

    return NextResponse.json({
      proposal: proposalData,
      remainingCredits: updatedCredits.proposalCredits
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Proposal generation failed' }, { status: 500 });
  }
}
// // app/api/vendor-credits/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { vendorId } = body;

//     if (!vendorId) {
//       return NextResponse.json(
//         { error: 'Vendor ID is required' },
//         { status: 400 }
//       );
//     }

//     // Calculate next renewal date (30 days from now)
//     const nextRenewalDate = new Date();
//     nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);

//     // Update existing credits or create if doesn't exist
//     const vendorCredits = await prisma.vendorCredits.upsert({
//       where: { vendorId },
//       update: {
//         proposalCredits: 10,
//         validationCredits: 10,
//         nextRenewalDate
//       },
//       create: {
//         vendorId,
//         proposalCredits: 10,
//         validationCredits: 10,
//         nextRenewalDate
//       }
//     });

//     return NextResponse.json(
//       { success: true, data: vendorCredits },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error updating vendor credits:', error);
//     return NextResponse.json(
//       { error: 'Failed to update vendor credits' },
//       { status: 500 }
//     );
//   }
// }
// app/api/update-credits/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorId } = body;

    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      );
    }

    // Calculate next renewal date (30 days from now)
    const nextRenewalDate = new Date();
    nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);

    // Find existing credits
    const existingCredits = await prisma.vendorCredits.findFirst({
      where: { vendorId }
    });

    let vendorCredits;

    if (existingCredits) {
      // Update if exists
      vendorCredits = await prisma.vendorCredits.update({
        where: { id: existingCredits.id },
        data: {
          proposalCredits: 30,
          validationCredits: 30,
          nextRenewalDate
        }
      });
    } else {
      // Create if doesn't exist
      vendorCredits = await prisma.vendorCredits.create({
        data: {
          vendorId,
          proposalCredits: 10,
          validationCredits: 10,
          nextRenewalDate
        }
      });
    }

    return NextResponse.json(
      { success: true, data: vendorCredits },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating vendor credits:', error);
    return NextResponse.json(
      { error: 'Failed to update vendor credits' },
      { status: 500 }
    );
  }
}
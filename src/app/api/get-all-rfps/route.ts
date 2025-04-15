// // app/api/rfpforms/route.ts
// import { NextResponse } from 'next/server';

// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const allRfpForms = await prisma.rfpForms.findMany({
//       orderBy: { createdAt: 'desc' }, // optional sorting
//     });

//     return NextResponse.json({ success: true, data: allRfpForms }, { status: 200 });
//   } catch (error) {
//     console.error('[RFP_FETCH_ERROR]', error);
//     return NextResponse.json({ success: false, error: 'Failed to fetch RFP forms' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function GET(req: Request) {
  try {
    // Retrieve all RFPs from the database
    const rfps = await prisma.rfpForms.findMany({
      orderBy: {
        createdAt: 'desc' // Most recent first
      }
    });

    // Return the RFPs
    return NextResponse.json({ 
      success: true, 
      data: rfps 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching all RFPs:', error);
    
    let errorMessage = 'Failed to fetch RFPs';
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

export async function DELETE(req: Request) {
    try {
      // Delete all RFPs from the database
      await prisma.rfpForms.deleteMany({});
      
      // Return success response without count
      return NextResponse.json({ 
        success: true, 
        message: `All RFPs deleted successfully`
      }, { status: 200 });
    } catch (error) {
      console.error('Error deleting all RFPs:', error);
      
      let errorMessage = 'Failed to delete RFPs';
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
  
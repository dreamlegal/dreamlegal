// app/api/market-intelligence/route.js
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch the most recent market intelligence data
    const marketIntelligence = await prisma.marketIntelligence.findFirst({
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        insights: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!marketIntelligence) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'No market intelligence data found',
          insights: {}
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: marketIntelligence,
      insights: marketIntelligence.insights || {}
    });

  } catch (error) {
    console.error('Error fetching market intelligence:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch market intelligence data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        insights: {}
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { insights, dashboardData, miData } = body;

//     // Validate required fields
//     if (!insights) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: 'Insights data is required' 
//         },
//         { status: 400 }
//       );
//     }

//     // Create new market intelligence record
//     const marketIntelligence = await prisma.marketIntelligence.create({
//       data: {
//         insights,
//         dashboardData: dashboardData || null,
//         miData: miData || null
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Market intelligence data created successfully',
//       data: marketIntelligence
//     });

//   } catch (error) {
//     console.error('Error creating market intelligence:', error);
    
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to create market intelligence data',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function PUT(request) {
//   try {
//     const body = await request.json();
//     const { id, insights, dashboardData, miData } = body;

//     if (!id) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: 'ID is required for update' 
//         },
//         { status: 400 }
//       );
//     }

//     // Update existing market intelligence record
//     const marketIntelligence = await prisma.marketIntelligence.update({
//       where: { id },
//       data: {
//         insights: insights || undefined,
//         dashboardData: dashboardData || undefined,
//         miData: miData || undefined
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Market intelligence data updated successfully',
//       data: marketIntelligence
//     });

//   } catch (error) {
//     console.error('Error updating market intelligence:', error);
    
//     if (error.code === 'P2025') {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: 'Market intelligence record not found' 
//         },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to update market intelligence data',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
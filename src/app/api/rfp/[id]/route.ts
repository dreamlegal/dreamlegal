
// // app/api/rfp/[id]/route.js
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
    
//     if (!id || isNaN(parseInt(id))) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'Invalid RFP ID' 
//       }, { status: 400 });
//     }
    
//     const rfp = await prisma.rfpStructured.findUnique({
//       where: { id: parseInt(id) }
//     });

//     if (!rfp) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'RFP not found' 
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: rfp,
//       ...rfp // For backward compatibility
//     });
    
//   } catch (error) {
//     console.error('Error fetching RFP:', error);
//     return NextResponse.json({ 
//       success: false,
//       message: 'Failed to fetch RFP' 
//     }, { status: 500 });
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
    
//     if (!id || isNaN(parseInt(id))) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'Invalid RFP ID' 
//       }, { status: 400 });
//     }

//     const body = await request.json();
    
//     // Validate that the RFP exists first
//     const existingRfp = await prisma.rfpStructured.findUnique({
//       where: { id: parseInt(id) }
//     });

//     if (!existingRfp) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'RFP not found' 
//       }, { status: 404 });
//     }

//     // Filter allowed fields for update
//     const allowedFields = [
//       'teamType', 'category', 'requirementUrgency', 'locationPreference', 
//       'contactEmail', 'problemStatement', 'objectives', 'keyRequirements', 
//       'additionalQuestions'
//     ];
    
//     const updateData = {};
//     Object.keys(body).forEach(key => {
//       if (allowedFields.includes(key)) {
//         updateData[key] = body[key];
//       }
//     });

//     if (Object.keys(updateData).length === 0) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'No valid fields provided for update' 
//       }, { status: 400 });
//     }

//     const updatedRfp = await prisma.rfpStructured.update({
//       where: { id: parseInt(id) },
//       data: updateData
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'RFP updated successfully',
//       data: updatedRfp,
//       ...updatedRfp // For backward compatibility
//     });
    
//   } catch (error) {
//     console.error('Error updating RFP:', error);
    
//     if (error.code === 'P2025') {
//       return NextResponse.json({ 
//         success: false,
//         message: 'RFP not found' 
//       }, { status: 404 });
//     }
    
//     return NextResponse.json({ 
//       success: false,
//       message: 'Failed to update RFP' 
//     }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     const { id } = params;
    
//     if (!id || isNaN(parseInt(id))) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'Invalid RFP ID' 
//       }, { status: 400 });
//     }

//     // Check if RFP exists
//     const existingRfp = await prisma.rfpStructured.findUnique({
//       where: { id: parseInt(id) }
//     });

//     if (!existingRfp) {
//       return NextResponse.json({ 
//         success: false,
//         message: 'RFP not found' 
//       }, { status: 404 });
//     }

//     // Delete the RFP
//     await prisma.rfpStructured.delete({
//       where: { id: parseInt(id) }
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'RFP deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('Error deleting RFP:', error);
//     return NextResponse.json({ 
//       success: false,
//       message: 'Failed to delete RFP' 
//     }, { status: 500 });
//   }
// }

// app/api/rfp/[id]/route.js - GET, UPDATE, DELETE RFP
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid RFP ID' 
      }, { status: 400 });
    }
    
    const rfp = await prisma.rfpStructured.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rfp) {
      return NextResponse.json({ 
        success: false,
        message: 'RFP not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: rfp,
      ...rfp // For backward compatibility
    });
    
  } catch (error) {
    console.error('Error fetching RFP:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch RFP' 
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid RFP ID' 
      }, { status: 400 });
    }

    const body = await request.json();
    
    // Validate that the RFP exists first
    const existingRfp = await prisma.rfpStructured.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingRfp) {
      return NextResponse.json({ 
        success: false,
        message: 'RFP not found' 
      }, { status: 404 });
    }

    // Filter allowed fields for update
    const allowedFields = [
      'teamType', 'category', 'requirementUrgency', 'locationPreference', 
      'contactEmail', 'problemStatement', 'objectives', 'keyRequirements', 
      'additionalQuestions', 'vendors'
    ];
    
    const updateData = {};
    Object.keys(body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = body[key];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ 
        success: false,
        message: 'No valid fields provided for update' 
      }, { status: 400 });
    }

    const updatedRfp = await prisma.rfpStructured.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: 'RFP updated successfully',
      data: updatedRfp,
      ...updatedRfp // For backward compatibility
    });
    
  } catch (error) {
    console.error('Error updating RFP:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ 
        success: false,
        message: 'RFP not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: false,
      message: 'Failed to update RFP' 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid RFP ID' 
      }, { status: 400 });
    }

    // Check if RFP exists
    const existingRfp = await prisma.rfpStructured.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingRfp) {
      return NextResponse.json({ 
        success: false,
        message: 'RFP not found' 
      }, { status: 404 });
    }

    // Delete the RFP
    await prisma.rfpStructured.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'RFP deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting RFP:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to delete RFP' 
    }, { status: 500 });
  }
}
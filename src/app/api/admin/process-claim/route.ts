// // app/api/admin/process-claim/route.js
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { claimId, status } = await request.json();
    
//     if (!claimId || !status) {
//       return NextResponse.json(
//         { success: false, message: 'Claim ID and status are required' },
//         { status: 400 }
//       );
//     }

//     // Get the claim request with product and vendor information
//     const claim = await prisma.productClaim.findUnique({
//       where: { id: claimId },
//       include: {
//         product: true,
//         vendor: true
//       }
//     });

//     if (!claim) {
//       return NextResponse.json(
//         { success: false, message: 'Claim request not found' },
//         { status: 404 }
//       );
//     }

//     // If accepted, update the product's userId
//     if (status === 'ACCEPTED') {
//       await prisma.product.update({
//         where: { id: claim.productId },
//         data: {
//           userId: claim.vendorId,
//           CompanyName: claim.vendor.name || claim.vendor.email.split('@')[0] || 'Vendor Company'
//         }
//       });
//     }

//     // Delete the claim after processing
//     await prisma.productClaim.delete({
//       where: { id: claimId }
//     });

//     return NextResponse.json({
//       success: true,
//       message: `Claim ${status.toLowerCase()} successfully`
//     });

//   } catch (error) {
//     console.error('Error processing claim:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to process claim request' },
//       { status: 500 }
//     );
//   }
// }
// app/api/admin/process-claim/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { claimId, status } = await request.json();
    
    if (!claimId || !status) {
      return NextResponse.json(
        { success: false, message: 'Claim ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['approved', 'rejected'].includes(status.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: 'Invalid status. Must be approved or rejected.' },
        { status: 400 }
      );
    }

    // Get the claim request with legal software and vendor information
    const claim = await prisma.legalSoftwareClaimRequest.findUnique({
      where: { id: claimId },
      include: {
        legalSoftware: true,
        vendor: true
      }
    });

    if (!claim) {
      return NextResponse.json(
        { success: false, message: 'Claim request not found' },
        { status: 404 }
      );
    }

    // If approved, update the legal software's vendorId
    if (status.toLowerCase() === 'approved') {
      await prisma.legalSoftware.update({
        where: { id: claim.legalSoftwareId },
        data: {
          vendorId: claim.vendorId,
          // Optionally update company name if vendor has one
          companyName: claim.vendor.name || claim.legalSoftware.companyName
        }
      });
    }

    // Update the claim status instead of deleting (for audit trail)
    await prisma.legalSoftwareClaimRequest.update({
      where: { id: claimId },
      data: {
        status: status.toLowerCase(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: `Claim ${status.toLowerCase()} successfully`
    });

  } catch (error) {
    console.error('Error processing claim:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process claim request' },
      { status: 500 }
    );
  }
}
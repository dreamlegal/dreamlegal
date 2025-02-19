// // app/api/get-vendor-proposals/route.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const { vendorId } = await request.json();

//     if (!vendorId) {
//       return NextResponse.json(
//         { error: 'Vendor ID is required' },
//         { status: 400 }
//       );
//     }

//     const proposals = await prisma.aiProposal.findMany({
//       where: { 
//         vendorId 
//       },
//       orderBy: {
//         createdAt: 'desc'
//       },
//       select: {
//         id: true,
//         name: true,
//         status: true,
//         createdAt: true,
//         formData: true,
//         aiResponse: true,
//         versions: true,
//       }
//     });

//     // Format response to get the latest content and additional metadata
//     const formattedProposals = proposals.map(proposal => {
//       let currentContent;
//       let latestVersion;

//       if (proposal.versions && Array.isArray(proposal.versions) && proposal.versions.length > 0) {
//         // Get latest version
//         latestVersion = [...proposal.versions].sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         )[0];
//         currentContent = latestVersion.content;
//       } else {
//         currentContent = proposal.aiResponse;
//       }

//       return {
//         id: proposal.id,
//         name: proposal.name || "Untitled Proposal",
//         status: proposal.status,
//         createdAt: proposal.createdAt,
//         lastModified: latestVersion?.createdAt || proposal.createdAt,
//         versionsCount: proposal.versions?.length || 0,
//         productName: proposal.formData?.product_profile?.name || "Unknown Product",
//         clientSector: proposal.formData?.client_profile?.Sector || "Unknown Sector",
//         currentContent
//       };
//     });

//     return NextResponse.json(formattedProposals);

//   } catch (error) {
//     console.error('Error fetching vendor proposals:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch proposals' },
//       { status: 500 }
//     );
//   }
// }

// app/api/get-vendor-proposals/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { vendorId } = await request.json();

    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      );
    }

    const proposals = await prisma.aiProposal.findMany({
      where: { 
        vendorId 
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(proposals);

  } catch (error) {
    console.error('Error fetching vendor proposals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
}
// // app/api/admin/product-claims/route.js
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     // Fetch all product claims with related product and vendor information
//     const claims = await prisma.productClaim.findMany({
//       include: {
//         product: {
//           select: {
//             id: true,
//             name: true,
//             logoUrl: true,
//             slug: true,
//             description: true,
//             category: true
//           }
//         },
//         vendor: {
//           select: {
//             id: true,
//             name: true,
//             email: true
//           }
//         }
//       },
//       orderBy: {
//         createdAt: 'desc'  
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       claims
//     });

//   } catch (error) {
//     console.error('Error fetching product claims:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch product claims' },
//       { status: 500 }
//     );
//   }
// }
// app/api/admin/product-claims/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Fetch all product claims with related product and vendor information
    const claims = await prisma.productClaim.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            slug: true,
            description: true,
            category: true
          }
        },
        vendor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'  
      }
    });

    return NextResponse.json({
      success: true,
      claims
    });

  } catch (error) {
    console.error('Error fetching product claims:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product claims' },
      { status: 500 }
    );
  }
}

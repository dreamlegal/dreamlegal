
// import { NextResponse } from 'next/server';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();
// import prisma from "@/lib/prisma";
// export async function GET(request, { params }) {
//   try {
//     const { slug } = params;

//     if (!slug) {
//       return NextResponse.json(
//         { error: 'Slug parameter is required' },
//         { status: 400 }
//       );
//     }

//     // Find the software by slug
//     const software = await prisma.legalSoftware.findFirst({
//       where: {
//         slug: slug
//       }
//     });

//     if (!software) {
//       return NextResponse.json(
//         { error: 'Software not found' },
//         { status: 404 }
//       );
//     }

//     // Helper function to safely parse JSON or return the object if it's already parsed
//     const safeJsonParse = (data, fallback = null) => {
//       if (!data) return fallback;
//       if (typeof data === 'string') {
//         try {
//           return JSON.parse(data);
//         } catch (error) {
//           console.error('JSON parse error:', error);
//           return fallback;
//         }
//       }
//       // If it's already an object, return as is
//       return data;
//     };

//     // Parse JSON fields only if they are strings
//     const parsedSoftware = {
//       ...software,
//       keyFeatures: safeJsonParse(software.keyFeatures, []),
//       lifecycleStages: safeJsonParse(software.lifecycleStages, []),
//       sources: safeJsonParse(software.sources, {})
//     };

//     return NextResponse.json(parsedSoftware);

//   } catch (error) {
//     console.error('Error fetching software:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Find the software by slug
    const software = await prisma.legalSoftware.findFirst({
      where: {
        slug: slug
      }
    });

    if (!software) {
      return NextResponse.json(
        { error: 'Software not found' },
        { status: 404 }
      );
    }

    // Helper function to safely parse JSON or return the object if it's already parsed
    const safeJsonParse = (data, fallback = null) => {
      if (!data) return fallback;
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error('JSON parse error:', error);
          return fallback;
        }
      }
      // If it's already an object, return as is
      return data;
    };

    // Parse JSON fields only if they are strings
    const parsedSoftware = {
      ...software,
      keyFeatures: safeJsonParse(software.keyFeatures, []),
      lifecycleStages: safeJsonParse(software.lifecycleStages, []),
      sources: safeJsonParse(software.sources, {}),
      faqs: safeJsonParse(software.faqs, [])
    };

    // Fetch similar products from the same category
    let similarProducts = [];
    if (software.category) {
      similarProducts = await prisma.legalSoftware.findMany({
        where: {
          category: software.category,
          id: {
            not: software.id // Exclude the current product
          }
        },
        select: {
          id: true,
          slug: true,
          productName: true,
          companyName: true,
          logoUrl: true,
          description: true,
          category: true
        },
        take: 3, // Limit to 3 similar products
        orderBy: {
          createdAt: 'desc' // Get the most recent ones
        }
      });
    }

    // Add similar products to the response
    const responseData = {
      ...parsedSoftware,
      similarProducts
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching software:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
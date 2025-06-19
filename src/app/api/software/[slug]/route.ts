// // app/api/software/[slug]/route.js
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

//     // Parse JSON fields if they exist
//     const parsedSoftware = {
//       ...software,
//       keyFeatures: software.keyFeatures ? JSON.parse(software.keyFeatures) : [],
//       lifecycleStages: software.lifecycleStages ? JSON.parse(software.lifecycleStages) : [],
//       sources: software.sources ? JSON.parse(software.sources) : {}
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
// app/api/software/[slug]/route.js
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
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
      sources: safeJsonParse(software.sources, {})
    };

    return NextResponse.json(parsedSoftware);

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
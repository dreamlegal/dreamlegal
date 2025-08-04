// import { NextRequest, NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";

// // POST - Create or find existing comparison
// export async function POST(request: NextRequest) {
//   try {
//     const { softwareSlugs } = await request.json();

//     if (!softwareSlugs || !Array.isArray(softwareSlugs) || softwareSlugs.length < 2 || softwareSlugs.length > 3) {
//       return NextResponse.json(
//         { error: 'Please provide 2-3 software slugs for comparison' },
//         { status: 400 }
//       );
//     }

//     // Sort slugs to handle different order scenarios
//     const sortedSlugs = [...softwareSlugs].sort();
//     const comparisonSlug = sortedSlugs.join('-vs-');

//     // Check if comparison already exists (considering different orders)
//     let existingComparison = await prisma.comparison.findFirst({
//       where: {
//         OR: [
//           { slug: comparisonSlug },
//           // Check all possible permutations of the slugs
//           {
//             AND: [
//               { softwareSlugs: { hasEvery: softwareSlugs } },
//               { softwareSlugs: { array_length: softwareSlugs.length } }
//             ]
//           }
//         ]
//       }
//     });

//     if (existingComparison) {
//       return NextResponse.json({
//         success: true,
//         comparison: existingComparison,
//         redirect: `/compare/${existingComparison.slug}`
//       });
//     }

//     // Verify all software exist
//     const softwareList = await prisma.legalSoftware.findMany({
//       where: {
//         slug: {
//           in: softwareSlugs
//         }
//       },
//       select: {
//         slug: true,
//         productName: true
//       }
//     });

//     if (softwareList.length !== softwareSlugs.length) {
//       const foundSlugs = softwareList.map(s => s.slug);
//       const missingSlugs = softwareSlugs.filter(slug => !foundSlugs.includes(slug));
//       return NextResponse.json(
//         { error: `Software not found: ${missingSlugs.join(', ')}` },
//         { status: 404 }
//       );
//     }

//     // Create new comparison
//     const newComparison = await prisma.comparison.create({
//       data: {
//         slug: comparisonSlug,
//         softwareSlugs: sortedSlugs,
//         description: null, // To be filled by admin
//         qna: null, // To be filled by admin
//         metaTitle: `${softwareList.map(s => s.productName).join(' vs ')} - Detailed Comparison`,
//         metaDescription: `Compare ${softwareList.map(s => s.productName).join(', ')} side by side. Features, pricing, pros and cons.`
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       comparison: newComparison,
//       redirect: `/compare/${comparisonSlug}`
//     });

//   } catch (error) {
//     console.error('Comparison creation error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create comparison' },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// POST - Create or find existing comparison
export async function POST(request: NextRequest) {
  try {
    const { softwareSlugs } = await request.json();

    if (!softwareSlugs || !Array.isArray(softwareSlugs) || softwareSlugs.length < 2 || softwareSlugs.length > 3) {
      return NextResponse.json(
        { error: 'Please provide 2-3 software slugs for comparison' },
        { status: 400 }
      );
    }

    // Sort slugs to handle different order scenarios
    const sortedSlugs = [...softwareSlugs].sort();
    const comparisonSlug = sortedSlugs.join('-vs-');

    // Check if comparison already exists by slug first
    let existingComparison = await prisma.comparison.findUnique({
      where: { slug: comparisonSlug }
    });

    // If not found by slug, check for existing comparisons with same software (different orders)
    if (!existingComparison) {
      const potentialMatches = await prisma.comparison.findMany({
        where: {
          softwareSlugs: {
            hasSome: sortedSlugs
          }
        }
      });

      // Find exact match manually (same software, same count)
      existingComparison = potentialMatches.find(comp => {
        const compSlugs = [...comp.softwareSlugs].sort();
        return compSlugs.length === sortedSlugs.length &&
               compSlugs.every((slug, index) => slug === sortedSlugs[index]);
      }) || null;
    }

    if (existingComparison) {
      return NextResponse.json({
        success: true,
        comparison: existingComparison,
        redirect: `/compare/${existingComparison.slug}`
      });
    }

    // Verify all software exist
    const softwareList = await prisma.legalSoftware.findMany({
      where: {
        slug: {
          in: softwareSlugs
        }
      },
      select: {
        slug: true,
        productName: true
      }
    });

    if (softwareList.length !== softwareSlugs.length) {
      const foundSlugs = softwareList.map(s => s.slug);
      const missingSlugs = softwareSlugs.filter(slug => !foundSlugs.includes(slug));
      return NextResponse.json(
        { error: `Software not found: ${missingSlugs.join(', ')}` },
        { status: 404 }
      );
    }

    // Create new comparison
    const newComparison = await prisma.comparison.create({
      data: {
        slug: comparisonSlug,
        softwareSlugs: sortedSlugs,
        description: null, // To be filled by admin
        qna: null, // To be filled by admin
        metaTitle: `${softwareList.map(s => s.productName).join(' vs ')} - Detailed Comparison`,
        metaDescription: `Compare ${softwareList.map(s => s.productName).join(', ')} side by side. Features, pricing, pros and cons.`
      }
    });

    return NextResponse.json({
      success: true,
      comparison: newComparison,
      redirect: `/compare/${comparisonSlug}`
    });

  } catch (error) {
    console.error('Comparison creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create comparison' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get trending comparisons - you can modify this logic based on your needs
    // For now, getting random recent comparisons with software data
    const trendingComparisons = await prisma.comparison.findMany({
      take: 8, // Get 8 trending comparisons
      orderBy: [
        { createdAt: 'desc' }, // Recent comparisons first
        { updatedAt: 'desc' }  // Recently updated
      ],
     
    });

    // Get software details for each comparison
    const enrichedComparisons = await Promise.all(
      trendingComparisons.map(async (comparison) => {
        const software = await prisma.legalSoftware.findMany({
          where: {
            slug: {
              in: comparison.softwareSlugs
            }
          },
          select: {
            slug: true,
            productName: true,
            logoUrl: true,
            companyName: true,
            category: true
          }
        });

        // Sort software to match the order in comparison.softwareSlugs
        const orderedSoftware = comparison.softwareSlugs.map(slug => 
          software.find(s => s.slug === slug)
        ).filter(Boolean);

        return {
          id: comparison.id,
          slug: comparison.slug,
          software: orderedSoftware,
          hasContent: !!(comparison.description || comparison.qna)
        };
      })
    );

    // Filter out comparisons without complete software data
    const validComparisons = enrichedComparisons.filter(comp => 
      comp.software.length >= 2
    );

    // If we don't have enough trending comparisons, fill with hardcoded popular ones
    if (validComparisons.length < 6) {
      const hardcodedComparisons = await getHardcodedPopularComparisons();
      validComparisons.push(...hardcodedComparisons.slice(0, 6 - validComparisons.length));
    }

    return NextResponse.json({
      success: true,
      comparisons: validComparisons.slice(0, 8) // Return max 8
    });

  } catch (error) {
    console.error('Trending comparisons error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending comparisons' },
      { status: 500 }
    );
  }
}

// Hardcoded popular comparisons as fallback
async function getHardcodedPopularComparisons() {
  try {
    const popularSlugs = [
      ['salesforce-crm', 'hubspot'],
      ['zoom', 'microsoft-teams'],
      ['slack', 'microsoft-teams'],
      ['notion', 'confluence'],
      ['figma', 'sketch'],
      ['trello', 'asana']
    ];

    const hardcodedComparisons = await Promise.all(
      popularSlugs.map(async (slugPair) => {
        const software = await prisma.legalSoftware.findMany({
          where: {
            slug: {
              in: slugPair
            }
          },
          select: {
            slug: true,
            productName: true,
            logoUrl: true,
            companyName: true,
            category: true
          }
        });

        if (software.length >= 2) {
          return {
            id: `hardcoded-${slugPair.join('-vs-')}`,
            slug: slugPair.join('-vs-'),
            software: slugPair.map(slug => software.find(s => s.slug === slug)).filter(Boolean),
            hasContent: false
          };
        }
        return null;
      })
    );

    return hardcodedComparisons.filter(Boolean);
  } catch (error) {
    console.error('Error fetching hardcoded comparisons:', error);
    return [];
  }
}
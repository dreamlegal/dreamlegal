import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// Weight configuration
const WEIGHTS = {
  engagementMomentum: 0.3,
  trustCredibility: 0.3,
  buyerIntent: 0.4
};

// Action weights for each category
const ACTION_WEIGHTS = {
  profileClicks: 1,
  shareButtonClicks: 3,
  reviewsAdded: 5,
  articleMentions: 4,
  vendorRecommends: 5,
  demoRequests: 5,
  comparisonsCreated: 4,
  bookmarks: 3
};

function calculateDLBand(score: number): string {
  if (score >= 80) return 'TOP_PERFORMER';
  if (score >= 60) return 'STRONG_MOMENTUM';
  if (score >= 40) return 'STEADY_PLAYER';
  if (score >= 20) return 'LOW_VISIBILITY';
  return 'DORMANT';
}

function calculatePercentile(value: number, allValues: number[]): number {
  if (allValues.length === 0) return 0;
  const sorted = [...allValues].sort((a, b) => a - b);
  const rank = sorted.filter(v => v < value).length;
  return (rank / sorted.length) * 100;
}

export async function POST(req: NextRequest) {
  try {
    const { month, year } = await req.json();
    
    if (!month || !year) {
      return NextResponse.json(
        { error: 'Month and year are required' },
        { status: 400 }
      );
    }

    const results = {
      totalCategories: 0,
      processedCategories: 0,
      totalProducts: 0,
      processedProducts: 0,
      errors: [] as string[]
    };

    // Get all categories
    const categories = await prisma.legalSoftware.findMany({
      select: { category: true },
      distinct: ['category']
    });

    results.totalCategories = categories.length;

    // Process each category
    for (const { category } of categories) {
      try {
        // Get all products in this category
        const products = await prisma.legalSoftware.findMany({
          where: { category },
          select: { id: true, productName: true }
        });

        results.totalProducts += products.length;

        // Arrays to store category-wide counts for percentile calculation
        const engagementCounts: number[] = [];
        const trustCounts: number[] = [];
        const intentCounts: number[] = [];
        const productScores: Map<string, {
          engagementCount: number;
          trustCount: number;
          intentCount: number;
        }> = new Map();

        // Step 1: Calculate raw counts for all products in category
        for (const product of products) {
          // Get or create product activity for this month
          const activity = await prisma.productActivity.findFirst({
            where: {
              productId: product.id,
              month,
              year
            }
          });

          if (!activity) {
            // Create default activity if doesn't exist
            await prisma.productActivity.create({
              data: {
                productId: product.id,
                category,
                month,
                year,
                profileClicks: 0,
                shareButtonClicks: 0,
                reviewsAdded: 0,
                articleMentions: 0,
                vendorRecommends: 0,
                demoRequests: 0,
                comparisonsCreated: 0,
                bookmarks: 0
              }
            });

            engagementCounts.push(0);
            trustCounts.push(0);
            intentCounts.push(0);
            productScores.set(product.id, {
              engagementCount: 0,
              trustCount: 0,
              intentCount: 0
            });
            continue;
          }

          // Calculate category counts
          const engagementCount = 
            (activity.profileClicks * ACTION_WEIGHTS.profileClicks) +
            (activity.shareButtonClicks * ACTION_WEIGHTS.shareButtonClicks);

          const trustCount = 
            (activity.reviewsAdded * ACTION_WEIGHTS.reviewsAdded) +
            (activity.articleMentions * ACTION_WEIGHTS.articleMentions);

          const intentCount = 
            (activity.vendorRecommends * ACTION_WEIGHTS.vendorRecommends) +
            (activity.demoRequests * ACTION_WEIGHTS.demoRequests) +
            (activity.comparisonsCreated * ACTION_WEIGHTS.comparisonsCreated) +
            (activity.bookmarks * ACTION_WEIGHTS.bookmarks);

          engagementCounts.push(engagementCount);
          trustCounts.push(trustCount);
          intentCounts.push(intentCount);

          productScores.set(product.id, {
            engagementCount,
            trustCount,
            intentCount
          });
        }

        // Step 2: Calculate percentiles and DL scores for each product
        for (const product of products) {
          const scores = productScores.get(product.id);
          if (!scores) continue;

          // Calculate percentiles
          const engagementPercentile = calculatePercentile(
            scores.engagementCount,
            engagementCounts
          );
          const trustPercentile = calculatePercentile(
            scores.trustCount,
            trustCounts
          );
          const intentPercentile = calculatePercentile(
            scores.intentCount,
            intentCounts
          );

          // Calculate final DL score
          const dlScore = 
            (engagementPercentile * WEIGHTS.engagementMomentum) +
            (trustPercentile * WEIGHTS.trustCredibility) +
            (intentPercentile * WEIGHTS.buyerIntent);

          const dlBand = calculateDLBand(dlScore);

          // Save or update monthly score
          await prisma.monthlyScore.upsert({
            where: {
              productId_month_year: {
                productId: product.id,
                month,
                year
              }
            },
            create: {
              productId: product.id,
              category,
              month,
              year,
              engagementMomentumCount: scores.engagementCount,
              trustCredibilityCount: scores.trustCount,
              buyerIntentCount: scores.intentCount,
              engagementMomentumPercent: engagementPercentile,
              trustCredibilityPercent: trustPercentile,
              buyerIntentPercent: intentPercentile,
              dlScore,
              dlBand
            },
            update: {
              engagementMomentumCount: scores.engagementCount,
              trustCredibilityCount: scores.trustCount,
              buyerIntentCount: scores.intentCount,
              engagementMomentumPercent: engagementPercentile,
              trustCredibilityPercent: trustPercentile,
              buyerIntentPercent: intentPercentile,
              dlScore,
              dlBand
            }
          });

          results.processedProducts++;
        }

        results.processedCategories++;
      } catch (error) {
        results.errors.push(`Error processing category ${category}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'DL Score calculation completed',
      results
    });

  } catch (error) {
    console.error('Error calculating DL scores:', error);
    return NextResponse.json(
      { error: 'Failed to calculate DL scores', details: String(error) },
      { status: 500 }
    );
  }
}
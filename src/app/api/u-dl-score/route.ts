// app/api/view-dl-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Optional filters
    const productId = searchParams.get('productId');
    const category = searchParams.get('category');
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;

    // Build where clause for ProductActivity
    const activityWhere: any = {};
    if (productId) activityWhere.productId = productId;
    if (category) activityWhere.category = category;
    if (month) activityWhere.month = parseInt(month);
    if (year) activityWhere.year = parseInt(year);

    // Get Product Activities with product details
    const activities = await prisma.productActivity.findMany({
      where: activityWhere,
      include: {
        product: {
          select: {
            id: true,
            productName: true,
            companyName: true,
            category: true,
            slug: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ],
      take: limit
    });

    // Build where clause for MonthlyScore
    const scoreWhere: any = {};
    if (productId) scoreWhere.productId = productId;
    if (category) scoreWhere.category = category;
    if (month) scoreWhere.month = parseInt(month);
    if (year) scoreWhere.year = parseInt(year);

    // Get Monthly Scores with product details
    const scores = await prisma.monthlyScore.findMany({
      where: scoreWhere,
      include: {
        product: {
          select: {
            id: true,
            productName: true,
            companyName: true,
            category: true,
            slug: true
          }
        }
      },
      orderBy: [
        { dlScore: 'desc' },
        { year: 'desc' },
        { month: 'desc' }
      ],
      take: limit
    });

    // Get summary statistics
    const totalActivities = await prisma.productActivity.count({ where: activityWhere });
    const totalScores = await prisma.monthlyScore.count({ where: scoreWhere });

    // Get unique products count
    const uniqueProducts = await prisma.productActivity.findMany({
      where: activityWhere,
      select: { productId: true },
      distinct: ['productId']
    });

    // Get category breakdown
    const categoryBreakdown = await prisma.productActivity.groupBy({
      by: ['category'],
      where: activityWhere,
      _count: {
        id: true
      }
    });

    // Get top performers (highest DL scores)
    const topPerformers = await prisma.monthlyScore.findMany({
      where: {
        ...scoreWhere,
        dlScore: { not: null }
      },
      include: {
        product: {
          select: {
            productName: true,
            companyName: true
          }
        }
      },
      orderBy: {
        dlScore: 'desc'
      },
      take: 10
    });

    return NextResponse.json({
      success: true,
      summary: {
        totalActivities,
        totalScores,
        uniqueProducts: uniqueProducts.length,
        categoriesTracked: categoryBreakdown.length
      },
      categoryBreakdown: categoryBreakdown.map(cat => ({
        category: cat.category,
        count: cat._count.id
      })),
      topPerformers: topPerformers.map(score => ({
        productName: score.product.productName,
        companyName: score.product.companyName,
        dlScore: score.dlScore,
        dlBand: score.dlBand,
        month: score.month,
        year: score.year
      })),
      activities: activities.map(activity => ({
        id: activity.id,
        product: {
          id: activity.product.id,
          name: activity.product.productName,
          company: activity.product.companyName,
          category: activity.product.category,
          slug: activity.product.slug
        },
        month: activity.month,
        year: activity.year,
        metrics: {
          profileClicks: activity.profileClicks,
          shareButtonClicks: activity.shareButtonClicks,
          reviewsAdded: activity.reviewsAdded,
          articleMentions: activity.articleMentions,
          vendorRecommends: activity.vendorRecommends,
          demoRequests: activity.demoRequests,
          comparisonsCreated: activity.comparisonsCreated,
          bookmarks: activity.bookmarks
        },
        totalActivity: activity.profileClicks + 
                      activity.shareButtonClicks + 
                      activity.reviewsAdded + 
                      activity.articleMentions + 
                      activity.vendorRecommends + 
                      activity.demoRequests + 
                      activity.comparisonsCreated + 
                      activity.bookmarks
      })),
      scores: scores.map(score => ({
        id: score.id,
        product: {
          id: score.product.id,
          name: score.product.productName,
          company: score.product.companyName,
          category: score.product.category,
          slug: score.product.slug
        },
        month: score.month,
        year: score.year,
        counts: {
          engagementMomentum: score.engagementMomentumCount,
          trustCredibility: score.trustCredibilityCount,
          buyerIntent: score.buyerIntentCount
        },
        percentiles: {
          engagementMomentum: score.engagementMomentumPercent,
          trustCredibility: score.trustCredibilityPercent,
          buyerIntent: score.buyerIntentPercent
        },
        dlScore: score.dlScore,
        dlBand: score.dlBand
      })),
      filters: {
        productId: productId || 'all',
        category: category || 'all',
        month: month || 'all',
        year: year || 'all',
        limit
      }
    });

  } catch (error) {
    console.error('Error fetching DL data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch DL data', details: String(error) },
      { status: 500 }
    );
  }
}

// Example usage:
// GET /api/view-dl-data - Get all data (limited to 50)
// GET /api/view-dl-data?limit=100 - Get 100 records
// GET /api/view-dl-data?category=LEGAL_AI - Filter by category
// GET /api/view-dl-data?month=10&year=2025 - Filter by month/year
// GET /api/view-dl-data?productId=abc123 - Filter by specific product
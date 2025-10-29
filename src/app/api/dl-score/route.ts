// app/api/dl-score/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const productId = searchParams.get('productId');
    const slug = searchParams.get('slug');
    const includeBreakdown = searchParams.get('breakdown') === 'true';

    // Must provide either productId or slug
    if (!productId && !slug) {
      return NextResponse.json(
        { error: 'Product ID or slug is required' },
        { status: 400 }
      );
    }

    // Get product ID if slug provided
    let finalProductId = productId;
    if (!finalProductId && slug) {
      const product = await prisma.legalSoftware.findFirst({
        where: { slug },
        select: { id: true }
      });

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      finalProductId = product.id;
    }

    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Fetch the most recent score (current month or latest available)
    const score = await prisma.monthlyScore.findFirst({
      where: {
        productId: finalProductId
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ],
      select: {
        dlScore: true,
        dlBand: true,
        month: true,
        year: true,
        engagementMomentumPercent: true,
        trustCredibilityPercent: true,
        buyerIntentPercent: true,
        engagementMomentumCount: true,
        trustCredibilityCount: true,
        buyerIntentCount: true
      }
    });

    // If no score found, return zeros
    if (!score) {
      return NextResponse.json({
        success: true,
        hasScore: false,
        dlScore: 0,
        dlBand: null,
        month: currentMonth,
        year: currentYear,
        breakdown: includeBreakdown ? {
          engagementMomentum: {
            percent: 0,
            count: 0
          },
          trustCredibility: {
            percent: 0,
            count: 0
          },
          buyerIntent: {
            percent: 0,
            count: 0
          }
        } : undefined
      });
    }

    // Prepare response
    const response: any = {
      success: true,
      hasScore: true,
      dlScore: Math.round(score.dlScore || 0),
      dlBand: score.dlBand,
      month: score.month,
      year: score.year
    };

    // Include breakdown if requested
    if (includeBreakdown) {
      response.breakdown = {
        engagementMomentum: {
          percent: Math.round(score.engagementMomentumPercent || 0),
          count: score.engagementMomentumCount || 0
        },
        trustCredibility: {
          percent: Math.round(score.trustCredibilityPercent || 0),
          count: score.trustCredibilityCount || 0
        },
        buyerIntent: {
          percent: Math.round(score.buyerIntentPercent || 0),
          count: score.buyerIntentCount || 0
        }
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching DL score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch DL score', details: String(error) },
      { status: 500 }
    );
  }
}

// Example usage:
// GET /api/dl-score?productId=abc123 - Get just the score
// GET /api/dl-score?slug=clio&breakdown=true - Get score with breakdown
// GET /api/dl-score?productId=abc123&breakdown=true - Get everything
// app/api/track-activity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// Action type mapping to database fields
const ACTION_FIELD_MAP = {
  profileClick: 'profileClicks',
  shareClick: 'shareButtonClicks',
  review: 'reviewsAdded',
  articleMention: 'articleMentions',
  vendorRecommend: 'vendorRecommends',
  demoRequest: 'demoRequests',
  comparison: 'comparisonsCreated',
  bookmark: 'bookmarks'
} as const;

type ActionType = keyof typeof ACTION_FIELD_MAP;

export async function POST(req: NextRequest) {
  try {
    const { productId, slug, actionType, increment = 1 } = await req.json();

    // Validate action type
    if (!actionType || !ACTION_FIELD_MAP[actionType as ActionType]) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400 }
      );
    }

    // Get product ID (handle both productId and slug)
    let finalProductId = productId;
    let productCategory = null;

    if (!finalProductId && slug) {
      const product = await prisma.legalSoftware.findFirst({
        where: { slug },
        select: { id: true, category: true }
      });

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      finalProductId = product.id;
      productCategory = product.category;
    } else if (finalProductId) {
      const product = await prisma.legalSoftware.findUnique({
        where: { id: finalProductId },
        select: { category: true }
      });

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      productCategory = product.category;
    } else {
      return NextResponse.json(
        { error: 'Product ID or slug is required' },
        { status: 400 }
      );
    }

    // Auto-detect current month and year
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();

    // Get the database field name
    const fieldName = ACTION_FIELD_MAP[actionType as ActionType];

    // Check if ProductActivity exists for this product and current month
    const existingActivity = await prisma.productActivity.findFirst({
      where: {
        productId: finalProductId,
        month: currentMonth,
        year: currentYear
      }
    });

    if (existingActivity) {
      // Update existing record - increment the specific field
      await prisma.productActivity.update({
        where: { id: existingActivity.id },
        data: {
          [fieldName]: {
            increment: increment
          },
          updatedAt: new Date()
        }
      });
    } else {
      // Create new record for this month with the action
      await prisma.productActivity.create({
        data: {
          productId: finalProductId,
          category: productCategory,
          month: currentMonth,
          year: currentYear,
          [fieldName]: increment,
          profileClicks: actionType === 'profileClick' ? increment : 0,
          shareButtonClicks: actionType === 'shareClick' ? increment : 0,
          reviewsAdded: actionType === 'review' ? increment : 0,
          articleMentions: actionType === 'articleMention' ? increment : 0,
          vendorRecommends: actionType === 'vendorRecommend' ? increment : 0,
          demoRequests: actionType === 'demoRequest' ? increment : 0,
          comparisonsCreated: actionType === 'comparison' ? increment : 0,
          bookmarks: actionType === 'bookmark' ? increment : 0
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Activity tracked successfully',
      data: {
        productId: finalProductId,
        actionType,
        month: currentMonth,
        year: currentYear,
        increment
      }
    });

  } catch (error) {
    console.error('Error tracking activity:', error);
    return NextResponse.json(
      { error: 'Failed to track activity', details: String(error) },
      { status: 500 }
    );
  }
}

// Utility function to track multiple products at once (for bulk operations)
export async function trackMultipleProducts(
  productIds: string[],
  actionType: ActionType,
  increment: number = 1
) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const fieldName = ACTION_FIELD_MAP[actionType];

  const results = await Promise.allSettled(
    productIds.map(async (productId) => {
      const product = await prisma.legalSoftware.findUnique({
        where: { id: productId },
        select: { category: true }
      });

      if (!product) return null;

      const existingActivity = await prisma.productActivity.findFirst({
        where: {
          productId,
          month: currentMonth,
          year: currentYear
        }
      });

      if (existingActivity) {
        return await prisma.productActivity.update({
          where: { id: existingActivity.id },
          data: {
            [fieldName]: { increment },
            updatedAt: new Date()
          }
        });
      } else {
        return await prisma.productActivity.create({
          data: {
            productId,
            category: product.category,
            month: currentMonth,
            year: currentYear,
            [fieldName]: increment,
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
      }
    })
  );

  return results;
}
// app/api/admin/comparisons/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// GET - Fetch single comparison
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const comparison = await prisma.comparison.findUnique({
      where: { id }
    });

    if (!comparison) {
      return NextResponse.json(
        { error: 'Comparison not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      comparison
    });

  } catch (error) {
    console.error('Admin comparison fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comparison' },
      { status: 500 }
    );
  }
}

// PUT - Update comparison
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { description, qna, metaTitle, metaDescription } = await request.json();

    // Validate QNA structure if provided
    if (qna && Array.isArray(qna)) {
      for (const item of qna) {
        if (!item.question || !item.answer) {
          return NextResponse.json(
            { error: 'Each QNA item must have both question and answer' },
            { status: 400 }
          );
        }
      }
    }

    const updatedComparison = await prisma.comparison.update({
      where: { id },
      data: {
        description,
        qna,
        metaTitle,
        metaDescription,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      comparison: updatedComparison
    });

  } catch (error) {
    console.error('Admin comparison update error:', error);
    return NextResponse.json(
      { error: 'Failed to update comparison' },
      { status: 500 }
    );
  }
}

// DELETE - Delete comparison
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.comparison.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Comparison deleted successfully'
    });

  } catch (error) {
    console.error('Admin comparison delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete comparison' },
      { status: 500 }
    );
  }
}
// app/api/legal-software/check-slug/route.js
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Check if slug exists in database
    const existingProduct = await prisma.legalSoftware.findUnique({
      where: { slug },
      select: { id: true } // Only select id to minimize data transfer
    });

    return NextResponse.json({
      exists: !!existingProduct,
      slug: slug
    });
  } catch (error) {
    console.error('Error checking slug:', error);
    return NextResponse.json(
      { error: 'Failed to check slug availability' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
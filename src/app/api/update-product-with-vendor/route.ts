// app/api/products/update-vendor/route.ts
import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productIds, vendorId } = body

    // Validate input
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or missing productIds. Must be an array with at least one ID.' },
        { status: 400 }
      )
    }

    if (!vendorId) {
      return NextResponse.json(
        { error: 'vendorId is required' },
        { status: 400 }
      )
    }

    // Verify vendor exists
    const vendor = await prisma.user.findUnique({
      where: { id: vendorId }
    })

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Update all specified products
    const updateResult = await prisma.product.updateMany({
      where: {
        id: {
          in: productIds
        }
      },
      data: {
        userId: vendorId
      }
    })

    return NextResponse.json({
      success: true,
      message: `Updated ${updateResult.count} products`,
      updatedCount: updateResult.count
    })

  } catch (error) {
    console.error('Error updating products:', error)
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
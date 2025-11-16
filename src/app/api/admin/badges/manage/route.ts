// app/api/admin/badges/manage/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, badgeId, productId, category, text, borderColor, displayOrder } = await req.json();

    // CREATE BADGE
    if (action === "create") {
      if (!productId || !category || !text || !borderColor) {
        return NextResponse.json(
          { error: "Product ID, category, text, and border color are required" },
          { status: 400 }
        );
      }

      // Verify product exists
      const product = await prisma.legalSoftware.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      // Get the next display order
      const maxOrder = await prisma.productBadge.findFirst({
        where: { productId },
        orderBy: { displayOrder: 'desc' },
        select: { displayOrder: true },
      });

      const badge = await prisma.productBadge.create({
        data: {
          productId,
          category,
          text,
          borderColor,
          displayOrder: displayOrder ?? (maxOrder?.displayOrder ?? 0) + 1,
        },
      });

      return NextResponse.json(
        { msg: "Badge created successfully", badge },
        { status: 201 }
      );
    }

    // UPDATE BADGE
    if (action === "update") {
      if (!badgeId) {
        return NextResponse.json(
          { error: "Badge ID is required" },
          { status: 400 }
        );
      }

      const updateData: any = {};
      if (category !== undefined) updateData.category = category;
      if (text !== undefined) updateData.text = text;
      if (borderColor !== undefined) updateData.borderColor = borderColor;
      if (displayOrder !== undefined) updateData.displayOrder = displayOrder;

      const badge = await prisma.productBadge.update({
        where: { id: badgeId },
        data: updateData,
      });

      return NextResponse.json(
        { msg: "Badge updated successfully", badge },
        { status: 200 }
      );
    }

    // DELETE BADGE
    if (action === "delete") {
      if (!badgeId) {
        return NextResponse.json(
          { error: "Badge ID is required" },
          { status: 400 }
        );
      }

      await prisma.productBadge.delete({
        where: { id: badgeId },
      });

      return NextResponse.json(
        { msg: "Badge deleted successfully" },
        { status: 200 }
      );
    }

    // TOGGLE ACTIVE STATUS
    if (action === "toggle") {
      if (!badgeId) {
        return NextResponse.json(
          { error: "Badge ID is required" },
          { status: 400 }
        );
      }

      const badge = await prisma.productBadge.findUnique({
        where: { id: badgeId },
      });

      if (!badge) {
        return NextResponse.json(
          { error: "Badge not found" },
          { status: 404 }
        );
      }

      const updatedBadge = await prisma.productBadge.update({
        where: { id: badgeId },
        data: { isActive: !badge.isActive },
      });

      return NextResponse.json(
        { msg: "Badge status toggled successfully", badge: updatedBadge },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error managing badge:", error);
    return NextResponse.json(
      { error: "Failed to manage badge" },
      { status: 500 }
    );
  }
}
// /app/api/update-premium-info/route.js
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { 
      productId, 
      vendorId, 
      tag, 
      caseStudies, 
      valueMetrics, 
      vendorComments 
    } = await request.json();

    if (!productId || !vendorId) {
      return NextResponse.json(
        { msg: "Product ID and Vendor ID are required" },
        { status: 400 }
      );
    }

    // Verify the product belongs to the vendor
    const existingProduct = await prisma.legalSoftware.findFirst({
      where: {
        id: productId,
        vendorId: vendorId
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { msg: "Product not found or unauthorized" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      isPremium: true, // Always set to true when premium info is updated
    };

    // Only update fields that have values
    if (tag && tag.trim()) {
      updateData.tag = tag.trim();
    }

    if (caseStudies && caseStudies.length > 0) {
      // Filter out empty case studies
      const validCaseStudies = caseStudies.filter(cs => 
        cs.name?.trim() || cs.comment?.trim() || cs.companyName?.trim()
      );
      if (validCaseStudies.length > 0) {
        updateData.caseStudies = validCaseStudies;
      }
    }

    if (valueMetrics && valueMetrics.length > 0) {
      // Filter out empty value metrics
      const validValueMetrics = valueMetrics.filter(vm => vm.heading?.trim());
      if (validValueMetrics.length > 0) {
        updateData.valueMetrics = validValueMetrics;
      }
    }

    if (vendorComments) {
      // Clean up vendor comments - remove empty sections
      const cleanedComments = {};
      Object.keys(vendorComments).forEach(section => {
        const sectionData = vendorComments[section];
        if (sectionData.description?.trim() || 
            (sectionData.points && sectionData.points.some(point => point?.trim()))) {
          cleanedComments[section] = {
            description: sectionData.description?.trim() || '',
            points: sectionData.points?.filter(point => point?.trim()) || []
          };
        }
      });
      
      if (Object.keys(cleanedComments).length > 0) {
        updateData.vendorComments = cleanedComments;
      }
    }

    // Update the product
    const updatedProduct = await prisma.legalSoftware.update({
      where: {
        id: productId
      },
      data: updateData
    });

    return NextResponse.json(
      {
        ...updatedProduct,
        msg: "Premium information updated successfully"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating premium info:", error);
    return NextResponse.json(
      { msg: "Failed to update premium information" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

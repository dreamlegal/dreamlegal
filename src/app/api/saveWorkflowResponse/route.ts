import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formId, userId, categoryOfAnalysis, data } = body;
    console.log("body", body);

    // Validate required fields
    if (!formId || !userId || !data || !categoryOfAnalysis) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save the response data
    const workflowResponse = await prisma.workflowResponse.create({
      data: {
        formId,
        userId,
        name: `Response_${Math.random().toString(36).substring(2, 8)}`,
        categoryOfAnalysis,
        data,
        
      },
    });

    return NextResponse.json(
      { success: true, data: workflowResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving workflow response:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save workflow response" },
      { status: 500 }
    );
  }
}

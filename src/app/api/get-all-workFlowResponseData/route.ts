
// app/api/workflow/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all workflow responses
export async function GET() {
  try {
    const workflows = await prisma.workflowResponse.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(workflows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch workflow responses" },
      { status: 500 }
    );
  }
}

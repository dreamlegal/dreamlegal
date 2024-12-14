import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Prisma instance

export async function POST(req: Request) {
  try {
    const { formId } = await req.json(); // Read formId from the request body

    if (!formId) {
      return NextResponse.json(
        { success: false, message: "formId is required" },
        { status: 400 }
      );
    }

    // Fetch workFlowProcess and workflowResponse data using formId
    const workFlowProcess = await prisma.workFlowProcess.findUnique({
      where: { id: formId },
    });

    if (!workFlowProcess) {
      return NextResponse.json(
        { success: false, message: "Workflow data not found" },
        { status: 404 }
      );
    }

    const workflowResponse = await prisma.workflowResponse.findUnique({
      where: { formId },
    });

    if (!workflowResponse) {
      return NextResponse.json(
        { success: false, message: "Workflow response not found" },
        { status: 404 }
      );
    }

    // Return both workFlowProcess and workflowResponse
    return NextResponse.json(
      {
        success: true,
        workFlowProcess,
        workflowResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching workflow data:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching workflow data" },
      { status: 500 }
    );
  }
}

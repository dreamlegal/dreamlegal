// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const { userId } = await request.json(); // Get userId from request body

//     const workflows = await prisma.workflowResponse.findMany({
//       where: {
//         userId: userId
//       },
//       orderBy: {
//         createdAt: 'desc'  // Most recent first
//       }
//     });

//     if (!workflows || workflows.length === 0) {
//       return NextResponse.json(
//         { error: "No workflow responses found for this user" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(workflows);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch workflow responses" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    console.log("userId", userId);
    // First get all workflow responses for the user
    const workflows = await prisma.workflowResponse.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log("workflows", workflows);

    if (!workflows || workflows.length === 0) {
      return NextResponse.json(
        { error: "No workflow responses found for this user" },
        { status: 404 }
      );
    }

    // Get all formIds from the workflows
    const formIds = workflows.map(workflow => workflow.formId).filter(id => id !== null) as string[];

    // Fetch associated workflow form data
    const workflowForms = await prisma.workFlowProcess.findMany({
      where: {
        id: {
          in: formIds
        }
      }
    });

    // Combine the data
    const combinedData = workflows.map(workflow => {
      const associatedForm = workflowForms.find(form => form.id === workflow.formId);
      return {
        response: workflow,
        formData: associatedForm || null
      };
    });

    return NextResponse.json({
      success: true,
      data: combinedData,
      totalCount: workflows.length
    });

  } catch (error) {
    console.error("Error fetching workflow data:", error);
    return NextResponse.json(
      { error: "Failed to fetch workflow responses and form data" },
      { status: 500 }
    );
  }
}
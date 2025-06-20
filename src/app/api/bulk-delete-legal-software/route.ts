
// app/api/bulk-delete-legal-software/route.js
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return Response.json(
        {
          msg: "Legal software IDs array is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // Delete multiple legal software in a transaction
    const deletedSoftware = await prisma.$transaction(
      ids.map(id => 
        prisma.legalSoftware.delete({
          where: { id }
        })
      )
    );

    return Response.json(
      {
        msg: "Legal software deleted successfully",
        success: true,
        software: deletedSoftware,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while deleting the legal software.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
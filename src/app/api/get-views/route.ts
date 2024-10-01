// pages/api/get-views.ts

import prisma from "@/lib/prisma"; // Ensure you're using the correct import for Prisma
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch all product views from the database
    const views = await prisma.productView.findMany(); // Updated to use ProductView

    if (views.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "No views found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: views,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error fetching views",
      }),
      { status: 500 }
    );
  }
}

// // pages/api/add-share.ts
// import prisma from "@/lib/prisma";
// import { NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { productId, userOrgType } = await request.json();

//     if (!productId) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "Product ID is required" }),
//         { status: 400 }
//       );
//     }

//     // Save the share information to the database
//     const share = await prisma.Share.create({
//       data: {
//         productId,
//         userOrgType: userOrgType || null, // Use null for uncategorized users
//       },
//     });

//     return new Response(
//       JSON.stringify({ success: true, share }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ success: false, msg: "Error saving share data" }),
//       { status: 500 }
//     );
//   }
// }
// pages/api/add-share.ts
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, userOrgType,country } = await request.json(); // Destructure userOrgType


    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, msg: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Save the share information to the database
    const share = await prisma.Share.create({
      data: {
        productId,
        userOrgType: userOrgType || null, // Use null if userOrgType is not provided
        country,
      },
    });

    return new Response(
      JSON.stringify({ success: true, share }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, msg: "Error saving share data" }),
      { status: 500 }
    );
  }
}

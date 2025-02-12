// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const { userId, productId } = await request.json();

//   try {
//     const existingSaveProduct = await prisma.saveProduct.findFirst({
//       where: {
//         userId: userId,
//         productId: {
//           has: productId,
//         },
//       },
//     });

//     if (existingSaveProduct) {
//       return new Response(JSON.stringify({ isBookmarked: true }), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } else {
//       return new Response(JSON.stringify({ isBookmarked: false }), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error checking bookmark", error);
//     return new Response(JSON.stringify({ message: "Failed to check bookmark" }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';


// app/api/check-bookmark/route.ts
export async function POST(request: Request) {
  try {
    const { userId, productId } = await request.json();
    
    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const savedProduct = await prisma.saveProduct.findFirst({
      where: {
        userId: userId,
        productId: {
          has: productId
        }
      }
    });

    return NextResponse.json({
      success: true,
      isBookmarked: !!savedProduct
    });

  } catch (error) {
    console.error('Error checking bookmark:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check bookmark status' },
      { status: 500 }
    );
  }
}



// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const { userId } = await request.json();

//   try {
//     // Fetch SaveProduct records
//     const savedProducts = await prisma.saveProduct.findMany({
//       where: {
//         userId: userId,
//       },
//     });

//     // Extract all product IDs
//     const productIds = savedProducts.flatMap((savedProduct) => savedProduct.productId);

//     // Fetch products by IDs
//     const products = await prisma.product.findMany({
//       where: {
//         id: { in: productIds },
//       },
//       select: {
//         id: true,
//         name: true,
//         logoUrl: true,
//         description: true,
//         category: true,
//       },
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         products,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching saved products", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Failed to fetch saved products",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const { userId } = await request.json();

//   try {
//     // Fetch SaveProduct records
//     const savedProducts = await prisma.saveProduct.findMany({
//       where: {
//         userId: userId,
//       },
//     });

//     // Log fetched saved products for debugging
//     console.log("Fetched saved products:", savedProducts);

//     // Extract all product IDs (assuming productId is an array)
//     const productIds = savedProducts.flatMap((savedProduct) => savedProduct.productId);

//     if (productIds.length === 0) {
//       return new Response(
//         JSON.stringify({
//           success: true,
//           products: [],
//           message: "No products found",
//         }),
//         {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Fetch products by IDs
//     const products = await prisma.product.findMany({
//       where: {
//         id: { in: productIds },
//       },
//       select: {
//         id: true,
//         name: true,
//         logoUrl: true,
//         description: true,
//         category: true,
//       },
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         products,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching saved products", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Failed to fetch saved products",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId } = await request.json();

  try {
    // Fetch SaveProduct records
    const savedProducts = await prisma.saveProduct.findMany({
      where: {
        userId: userId,
      },
    });

    // Log fetched saved products for debugging
    console.log("Fetched saved products:", savedProducts);

    // Extract all product IDs (assuming productId is an array)
    const productIds = savedProducts.flatMap((savedProduct) => savedProduct.productId);

    if (productIds.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          products: [],
          message: "No products found",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Fetch products by their slug or identifier (if productId in SaveProduct is a slug or custom identifier)
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { id: { in: productIds } },   // If the productId stored in SaveProduct is the actual Product ID
          { slug: { in: productIds } }, // If the productId stored in SaveProduct is a slug or custom identifier
        ]
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true,
        category: true,
        slug: true,  // If you're using slug, ensure you select it as well
      },
    });

    // Log fetched products for debugging
    console.log("Fetched products:", products);

    return new Response(
      JSON.stringify({
        success: true,
        products,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching saved products", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch saved products",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

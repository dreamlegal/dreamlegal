// // import prisma from "@/lib/prisma";

// // export async function POST(request: Request) {
// //   const { id, slug } = await request.json();

// //   if (!id && !slug) {
// //     return Response.json(
// //       {
// //         msg: "Provide Product ID or Slug",
// //         success: false,
// //       },
// //       {
// //         status: 400,
// //       }
// //     );
// //   }

// //   const product = await prisma.product.findFirst({
// //     where: {
// //       OR: [
// //         { id },
// //         { slug },
// //       ],
// //     },
// //   });

// //   if (product) {
// //     const companyInfo = await prisma.companyInfo.findFirst({
// //       where: {
// //         id: product.companyId,
// //       },
// //     });

// //     const userInfo = await prisma.user.findFirst({
// //       where: {
// //         id: product.userId,
// //       },
// //       select: {
// //         name: true,
// //         email: true,
// //         image: true,
// //       },
// //     });

// //     return Response.json(
// //       {
// //         msg: "Product fetched successfully",
// //         success: true,
// //         product,
// //         company: companyInfo,
// //         user: userInfo,
// //       },
// //       {
// //         status: 200,
// //       }
// //     );
// //   } else {
// //     return Response.json(
// //       {
// //         msg: "Product not found",
// //         success: false,
// //       },
// //       {
// //         status: 404,
// //       }
// //     );
// //   }
// // }
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const { id, slug } = await request.json();

//   if (!id && !slug) {
//     return Response.json(
//       {
//         msg: "Provide Product ID or Slug",
//         success: false,
//       },
//       {
//         status: 400,
//       }
//     );
//   }

//   const product = await prisma.product.findFirst({
//     where: {
//       OR: [
//         { id },
//         { slug },
//       ],
//     },
//   });

//   if (product) {
//     // Check if both companyId and userId are empty or null
//     if (!product.companyId || product.companyId === "" || 
//         !product.userId || product.userId === "") {
//       return Response.json(
//         {
//           msg: "Product fetched successfully",
//           success: true,
//           product,
//         },
//         {
//           status: 200,
//         }
//       );
//     }

//     // If both IDs exist, fetch the additional info
//     const companyInfo = await prisma.companyInfo.findFirst({
//       where: {
//         id: product.companyId,
//       },
//     });

//     const userInfo = await prisma.user.findFirst({
//       where: {
//         id: product.userId,
//       },
//       select: {
//         name: true,
//         email: true,
//         image: true,
//       },
//     });

//     return Response.json(
//       {
//         msg: "Product fetched successfully",
//         success: true,
//         product,
//         company: companyInfo,
//         user: userInfo,
//       },
//       {
//         status: 200,
//       }
//     );
//   } else {
//     return Response.json(
//       {
//         msg: "Product not found",
//         success: false,
//       },
//       {
//         status: 404,
//       }
//     );
//   }
// }

import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { id, slug } = await request.json();

  if (!id && !slug) {
    return Response.json(
      {
        msg: "Provide Product ID or Slug",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id },
        { slug },
      ],
    },
  });

  if (!product) {
    return Response.json(
      {
        msg: "Product not found",
        success: false,
      },
      {
        status: 404,
      }
    );
  }

  // Initialize variables for company and user info
  let companyInfo = null;
  let userInfo = null;

  // If product has a userId, fetch the user info
  if (product.userId && product.userId !== "") {
    userInfo = await prisma.user.findFirst({
      where: {
        id: product.userId,
      },
      select: {
        name: true,
        email: true,
        image: true,
      },
    });

    // Get the company info based on the userId, not the product's companyId
    companyInfo = await prisma.companyInfo.findFirst({
      where: {
        userId: product.userId,
      },
    });
  }

  // If no company info was found through user, fallback to product's companyId
  if (!companyInfo && product.companyId && product.companyId !== "") {
    companyInfo = await prisma.companyInfo.findFirst({
      where: {
        id: product.companyId,
      },
    });
  }

  return Response.json(
    {
      msg: "Product fetched successfully",
      success: true,
      product,
      company: companyInfo,
      user: userInfo,
    },
    {
      status: 200,
    }
  );
}
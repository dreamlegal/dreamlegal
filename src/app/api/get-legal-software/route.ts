// // app/api/get-legal-software/route.js
// import prisma from "@/lib/prisma";

// export async function POST(request) {
//   try {
//     const { page = 1, limit = 10 } = await request.json();
//     const skip = (page - 1) * limit;

//     // Get total count for pagination
//     const totalCount = await prisma.legalSoftware.count();

//     // Fetch legal software with pagination
//     const software = await prisma.legalSoftware.findMany({
//       take: limit,
//       skip: skip,
//       orderBy: {
//         updatedAt: 'desc'
//       }
//     });

//     return Response.json(
//       {
//         msg: "Legal software fetched successfully",
//         success: true,
//         software,
//         total: totalCount,
//         currentPage: page,
//         totalPages: Math.ceil(totalCount / limit)
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       {
//         msg: "An error occurred while fetching the legal software.",
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


// app/api/get-legal-software/route.js
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { page = 1, limit = 10, premiumOnly = false } = await request.json();
    const skip = (page - 1) * limit;

    // Build where clause
    let where = {};
    if (premiumOnly) {
      where.isPremium = true;
    }

    // Get total count for pagination
    const totalCount = await prisma.legalSoftware.count({
      where
    });

    // Fetch legal software with pagination
    const software = await prisma.legalSoftware.findMany({
      where,
      take: limit,
      skip: skip,
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return Response.json(
      {
        msg: "Legal software fetched successfully",
        success: true,
        software,
        total: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit)
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while fetching the legal software.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
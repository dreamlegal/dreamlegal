
// // app/api/search-legal-software/route.js
// import prisma from "@/lib/prisma";

// export async function POST(request) {
//   try {
//     const { searchTerm, page = 1, limit = 10 } = await request.json();
//     const skip = (page - 1) * limit;

//     // Build the where clause for search
//     const where = {
//       OR: [
//         { productName: { contains: searchTerm, mode: 'insensitive' } },
//         { description: { contains: searchTerm, mode: 'insensitive' } },
//         { companyName: { contains: searchTerm, mode: 'insensitive' } },
//         { category: { equals: searchTerm.toUpperCase().replace(/\s+/g, '_') } }
//       ]
//     };

//     // Get total count for pagination
//     const totalCount = await prisma.legalSoftware.count({
//       where: searchTerm ? where : {}
//     });

//     // Fetch legal software with pagination
//     const software = await prisma.legalSoftware.findMany({
//       where: searchTerm ? where : {},
//       take: limit,
//       skip: skip,
//       orderBy: {
//         updatedAt: 'desc'
//       }
//     });

//     return Response.json({
//       success: true,
//       software,
//       total: totalCount,
//       currentPage: page,
//       totalPages: Math.ceil(totalCount / limit)
//     });

//   } catch (error) {
//     console.error('Error searching legal software:', error);
//     return Response.json(
//       { 
//         success: false, 
//         message: 'Failed to search legal software'
//       },
//       { 
//         status: 500 
//       }
//     );
//   }
// }
// app/api/search-legal-software/route.js
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { searchTerm, page = 1, limit = 10 } = await request.json();
    const skip = (page - 1) * limit;

    // Build the where clause for search (only by names, not category)
    let where = {};
    
    if (searchTerm && searchTerm.trim() !== '') {
      where = {
        OR: [
          { productName: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { companyName: { contains: searchTerm, mode: 'insensitive' } }
        ]
      };
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

    return Response.json({
      success: true,
      software,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error) {
    console.error('Error searching legal software:', error);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to search legal software',
        error: error.message
      },
      { 
        status: 500 
      }
    );
  }
}
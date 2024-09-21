// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     // Extract the vendorId from the request body
//     const { vendorId } = await request.json();

//     if (!vendorId) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "Vendor ID is required" }),
//         { status: 400 }
//       );
//     }

//     // Fetch all leads (bookings) associated with the specific vendor
//     const leads = await prisma.booking.findMany({
//       where: {
//         vendorId: vendorId,
//       },
//       include: {
//         product: true, // Fetch related product data
//       },
//       orderBy: {
//         createdAt: "desc", // Order by the most recent bookings
//       },
//     });

//     if (leads.length === 0) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "No leads found for this vendor" }),
//         { status: 404 }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         leads,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         msg: "Error fetching leads",
//       }),
//       { status: 500 }
//     );
//   }
// }

import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Extract the vendorId from the request body
    const { vendorId } = await request.json();

    if (!vendorId) {
      return new Response(
        JSON.stringify({ success: false, msg: "Vendor ID is required" }),
        { status: 400 }
      );
    }

    // Fetch all leads (bookings) associated with the specific vendor
    const leads = await prisma.booking.findMany({
      where: {
        vendorId: vendorId,
      },
      orderBy: {
        createdAt: "desc", // Order by the most recent bookings
      },
    });

    if (leads.length === 0) {
      return new Response(

        JSON.stringify({ success: false, msg: "No leads found for this vendor" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        leads, // Returning leads with all their fields, including bookingTime
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error fetching leads",
      }),
      { status: 500 }
    );
  }
}


// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     // Fetch all bookings (leads) without filtering by vendor
//     const leads = await prisma.booking.findMany({
//       include: {
//         product: true, // Fetch related product data
//       },
//       orderBy: {
//         createdAt: "desc", // Order by the most recent bookings
//       },
//     });

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

export async function GET() {
  try {
    console.log("API Request: Fetching all leads started");

    // Fetch all leads (bookings) without filtering by vendor
    const leads = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("API Response: Leads fetched", leads); // Log the leads for debugging

    if (!leads || leads.length === 0) {
      console.warn("No leads found");
      return new Response(
        JSON.stringify({
          success: false,
          msg: "No leads found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        leads,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leads:", error); // Log the full error for debugging
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error fetching leads",
        error: error.message, // Include the error message in the response
      }),
      { status: 500 }
    );
  }
}

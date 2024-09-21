import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const {
    productName,
    vendorName,
    contactEmail,
    designation,
    name,
    organisationName,
    organisationType,
    productId,
    vendorId,
    requirements,
    scheduleDemo,
    teamSize
  } = await request.json();

  // Validate required fields
  if (!vendorId || !productId || !productName || !vendorName || !contactEmail) {
    return new Response(
      JSON.stringify({ success: false, msg: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    // Find the vendor associated with the vendorId
    const vendor = await prisma.companyInfo.findMany({
        where: { userId: vendorId },
      });

    if (!vendor) {
      return new Response(
        JSON.stringify({ success: false, msg: "Vendor not found" }),
        { status: 404 }
      );
    }

    // Calculate the booking time (current date and time)
    const bookingTime = new Date();

    // Create a new booking
    const booking = await prisma.booking.create({
      data: {
        productId,
        vendorId,
        ProductName: productName,
        VendorName: vendorName,
        contactEmail,
        designation,
        name,
        organisationName,
        organisationType,
        requirements,
        scheduleDemo,
        teamSize,
        bookingTime, // Using server-side bookingTime
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        msg: "Booking created successfully",
        booking, // Returning full booking data
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error creating booking",
      }),
      { status: 500 }
    );
  }
}


import { sendVendorWelcomeEmail } from '@/app/(auth)/_helpers/sendVendorWelcome';
import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function POST(request: Request) {
  try {
    const { email, password, companyName } = await request.json();

    if (!email || !password || !companyName) {
      return Response.json(
        { msg: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Create new vendor
    const newVendor = await prisma.user.create({
      data: {
        email,
        password,
        name: companyName,
        type: 'vendor',
      },
    });

    // Send welcome email
    await sendVendorWelcomeEmail(email, password);

    return Response.json(
      { msg: "Vendor created successfully", success: true, vendor: newVendor },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred while creating the vendor.", success: false },
      { status: 500 }
    );
  }
}

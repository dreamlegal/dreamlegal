// File: /app/api/admin/login/route.ts

import prisma from '@/lib/prisma'; // Adjust the import according to your project structure


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate the incoming data
    if (!email || !password) {
      return Response.json(
        { msg: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    // Find the admin by email
    const admin = await prisma.admins.findUnique({
      where: { email },
    });

    if (!admin || admin.password !== password) {
      return Response.json(
        { msg: "Invalid email or password", success: false },
        { status: 401 }
      );
    }

    // Return the admin's ID on successful login
    return Response.json(
      { msg: "Login successful", success: true, adminId: admin.id },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred during login.", success: false },
      { status: 500 }
    );
  }
}

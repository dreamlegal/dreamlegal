// File: /app/api/admin/add/route.ts

import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function POST(request: Request) {
  try {
    const { email, password, user } = await request.json();

    // Validate the incoming data
    if (!email || !password || !user) {
      return Response.json(
        { msg: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Create new admin without password encryption
    const newAdmin = await prisma.admins.create({
      data: {
        email,
        password, // Storing the password as is
        user: user,
      },
    });

    // Respond with success
    return Response.json(
      { msg: "Admin created successfully", success: true, admin: newAdmin },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred while creating the admin.", success: false },
      { status: 500 }
    );
  }
}

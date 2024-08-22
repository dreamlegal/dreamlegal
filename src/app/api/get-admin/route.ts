// File: /app/api/admin/list/route.ts

import prisma from '@/lib/prisma'; // Adjust the import according to your project structure


export async function GET() {
  try {
    // Fetch all admin accounts from the database
    const admins = await prisma.admins.findMany();

    // Respond with the list of admins
    return Response.json(
      { success: true, admins },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred while fetching admins.", success: false },
      { status: 500 }
    );
  }
}

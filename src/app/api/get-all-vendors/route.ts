
import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function GET() {
  try {
    const vendors = await prisma.user.findMany({
      where: { type: 'vendor' },
    });

    return Response.json(
      { msg: "Vendors fetched successfully", success: true, vendors },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred while fetching vendors.", success: false },
      { status: 500 }
    );
  }
}

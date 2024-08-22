import prisma from '@/lib/prisma'; // Adjust the import according to your project structure


export async function GET() {
  try {
    // Get the current date and time
    const now = new Date();
    
    // Calculate the date and time 24 hours ago
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    // Query the database for signups in the last 24 hours
    const signups = await prisma.user.groupBy({
      by: ['type'],
      where: {
        createdAt: {
          gte: twentyFourHoursAgo
        }
      },
      _count: {
        id: true
      }
    });

    // Format the result
    const result = signups.map((signup) => ({
      type: signup.type,
      count: signup._count.id
    }));

    // Respond with the signup counts
    return Response.json(
      { success: true, signups: result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred while retrieving signup counts.", success: false },
      { status: 500 }
    );
  }
}

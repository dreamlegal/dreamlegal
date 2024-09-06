import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, productId } = await request.json();

    // Validate incoming data
    if (!userId || !productId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const getCompanyType = await prisma.userAccount.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        CompanyType: true,
      },
    });

    if (getCompanyType) {
      const interest = await prisma.interest.create({
        data: {
          userId,
          productId,
          companyId: getCompanyType?.id!,
          companyTypeFromUser: getCompanyType?.CompanyType!,
          createdAt: new Date(), // Set current date and time
        },
      });
      return new Response(JSON.stringify(interest), { status: 201 });
    }

    return new Response(JSON.stringify({ error: "Unkown user" }), {
      status: 200,
    });

    // Create the Interest record
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add interest" }), {
      status: 500,
    });
  }
}

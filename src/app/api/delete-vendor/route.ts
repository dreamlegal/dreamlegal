
import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json(
        { msg: "Vendor ID is required", success: false },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return Response.json(
      { msg: "Vendor deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { msg: "An error occurred while deleting the vendor.", success: false },
      { status: 500 }
    );
  }
}

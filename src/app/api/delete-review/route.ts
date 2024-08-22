import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const { reviewId } = await request.json();

    if (!reviewId) {
      return new Response(
        JSON.stringify({ msg: "Review ID is required", success: false }),
        { status: 400 }
      );
    }

    const deletedReview = await prisma.review.delete({
      where: { id: reviewId },
    });

    return new Response(
      JSON.stringify({ msg: "Review deleted successfully", success: true, review: deletedReview }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ msg: "An error occurred while deleting the review.", success: false }),
      { status: 500 }
    );
  }
}

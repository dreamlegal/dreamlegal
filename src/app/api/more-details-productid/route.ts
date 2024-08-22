// import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

// export async function POST(req: Request) {
//   try {
//     const { productId } = await req.json();

//     // Validate the input
//     if (!productId) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "productId is required" }),
//         { status: 400 }
//       );
//     }

//     // Find the userId associated with the given productId
//     const findUser = await prisma.product.findUnique({
//       where: { id: productId },
//       select: { userId: true },
//     });

//     if (!findUser?.userId) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // Retrieve all product slugs associated with the found userId
//     const allProducts = await prisma.product.findMany({
//       where: { userId: findUser.userId },
//       select: { slug: true },
//     });

//     const allSlugs = allProducts.map((product) => product.slug);

//     // Fetch all feature clicks for the products associated with the userId
//     const clickData = await prisma.clickCount.findMany({
//       where: { productId: { in: allSlugs } },
//       select: { feature: true },
//     });

//     // Handle the JsonValue safely and calculate average feature values
//     let featureCounts: Record<string, { sum: number; count: number }> = {};

//     clickData.forEach((click) => {
//       let features = {};
//       if (click.feature) {
//         features = typeof click.feature === 'string' ? JSON.parse(click.feature) : click.feature;
//       }

//       Object.entries(features).forEach(([key, value]) => {
//         if (key in featureCounts) {
//           featureCounts[key].sum += value as number;
//           featureCounts[key].count += 1;
//         } else {
//           featureCounts[key] = { sum: value as number, count: 1 };
//         }
//       });
//     });

//     // Calculate the average for each feature
//     const averagedFeatures = Object.entries(featureCounts).map(([key, { sum, count }]) => ({
//       [key]: sum / count,
//     }));

//     // Calculate the total clicks for all features (sum of averages)
//     const totalClicks = averagedFeatures.reduce(
//       (sum, feature) => sum + Object.values(feature)[0],
//       0
//     );

//     // Fetch and aggregate interests for the product
//     const interests = await prisma.interest.groupBy({
//       by: ['companyTypeFromUser'],
//       where: { productId },
//       _count: { id: true },
//     });

//     // Map and sort the aggregated interests
//     const analytics = interests
//       .map((interest) => ({
//         companyType: interest.companyTypeFromUser,
//         count: interest._count.id,
//       }))
//       .sort((a, b) => b.count - a.count);

//     // Prepare the response
//     return new Response(
//       JSON.stringify({
//         success: true,
//         features: averagedFeatures,
//         totalClicks,
//         analytics,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ msg: "An error occurred while retrieving data.", success: false }),
//       { status: 500 }
//     );
//   }
// }



import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    // Validate the input
    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, msg: "productId is required" }),
        { status: 400 }
      );
    }

    // Find the product slug associated with the given productId
    const findSlug = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        slug: true,
      },
    });

    if (!findSlug?.slug) {
      return new Response(
        JSON.stringify({ success: false, msg: "Product not found" }),
        { status: 404 }
      );
    }

    // Fetch the feature clicks for the product
    const clickData = await prisma.clickCount.findFirst({
      where: {
        productId: findSlug.slug,
      },
      select: {
        feature: true,
      },
    });

    // Handle the JsonValue safely
    let features = {};
    if (clickData?.feature) {
      if (typeof clickData.feature === 'string') {
        features = JSON.parse(clickData.feature);
      } else {
        features = clickData.feature;
      }
    }

    // Calculate the total clicks for all features
    const totalClicks = Object.values(features).reduce((sum : number, value) => sum + (value as number), 0);

    // Fetch and aggregate interests for the product
    const interests = await prisma.interest.groupBy({
      by: ['companyTypeFromUser'],
      where: {
        productId,
      },
      _count: { id: true },
    });

    // Map and sort the aggregated interests
    const analytics = interests
      .map(interest => ({
        companyType: interest.companyTypeFromUser,
        count: interest._count.id,
      }))
      .sort((a, b) => b.count - a.count);

    // Prepare the response
    return new Response(
      JSON.stringify({
        success: true,
        features: Object.entries(features).map(([key, value]) => ({ [key]: value })),
        totalClicks,
        analytics,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ msg: "An error occurred while retrieving data.", success: false }),
      { status: 500 }
    );
  }
}

// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { productId, timePeriod } = await req.json();

//     // Set date boundaries based on the time period
//     let startDate, endDate;
//     const today = new Date();

//     if (timePeriod === "today") {
//       startDate = new Date(today.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "yesterday") {
//       startDate = new Date(today.setDate(today.getDate() - 1)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else if (timePeriod === "last_week") {
//       startDate = new Date(today.setDate(today.getDate() - 7)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else if (timePeriod === "last_month") {
//       startDate = new Date(today.setMonth(today.getMonth() - 1)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else if (timePeriod === "last_quarter") {
//       const month = today.getMonth();
//       startDate = new Date(today.setMonth(month - 3)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else {
//       throw new Error("Invalid time period");
//     }

//     // Fetch features for the given productId and time period
//     const features = await prisma.features.findMany({
//       where: {
//         productID: productId,
//         time: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     // Aggregate category data
//     const categoryCounts = features.reduce((acc, feature) => {
//       const categories = feature.categoryData; // Assuming this is an object or array

//       for (const [category, count] of Object.entries(categories)) {
//         if (!acc[category]) {
//           acc[category] = 0;
//         }
//         acc[category] += count; // Add up the counts for the same category
//       }
//       return acc;
//     }, {});

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: categoryCounts,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching category data:", error.message);
//     return new Response(
//       JSON.stringify({ success: false, message: "Error fetching category data" }),
//       { status: 500 }
//     );
//   }
// }



// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { productId, timePeriod } = await req.json();

//     // Set date boundaries based on the time period
//     let startDate, endDate;
//     const today = new Date();

//     if (timePeriod === "today") {
//         startDate = new Date(today.setHours(0, 0, 0, 0));
//         endDate = new Date(today.setHours(23, 59, 59, 999));
//       } else if (timePeriod === "yesterday") {
//         const yesterday = new Date(today);
//         yesterday.setDate(today.getDate() - 1);
//         startDate = new Date(yesterday.setHours(0, 0, 0, 0)); // Create a new Date object
//         endDate = new Date(yesterday.setHours(23, 59, 59, 999)); // Create a new Date object
//       } else if (timePeriod === "last_week") {
//         const lastWeek = new Date(today);
//         lastWeek.setDate(today.getDate() - 7);
//         startDate = new Date(lastWeek.setHours(0, 0, 0, 0));
//         endDate = new Date(today.setHours(23, 59, 59, 999)); // Up to the end of the previous day
//       } else if (timePeriod === "last_month") {
//         const lastMonth = new Date(today);
//         lastMonth.setMonth(today.getMonth() - 1);
//         startDate = new Date(lastMonth.setHours(0, 0, 0, 0));
//         endDate = new Date(today.setHours(23, 59, 59, 999)); // Up to the end of the previous day
//       } else if (timePeriod === "last_quarter") {
//         const lastQuarter = new Date(today);
//         const currentMonth = today.getMonth();
//         const quarterStartMonth = currentMonth - (currentMonth % 3) - 3; // Calculate the start month of the last quarter
//         lastQuarter.setMonth(quarterStartMonth);
//         startDate = new Date(lastQuarter.setHours(0, 0, 0, 0));
//         endDate = new Date(today.setHours(23, 59, 59, 999)); // Up to the end of the previous day
//       } else {
//         throw new Error("Invalid time period");
//       }
      

//     // Fetch features for the given productId and time period
//     const features = await prisma.features.findMany({
//       where: {
//         productID: productId,
//         time: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     // Aggregate category data
//     const categoryCounts = features.reduce((acc, feature) => {
//       const categories = feature.categoryData; // Assuming this is an object or array

//       for (const [category, count] of Object.entries(categories)) {
//         if (!acc[category]) {
//           acc[category] = 0;
//         }
//         acc[category] += count; // Add up the counts for the same category
//       }
//       return acc;
//     }, {});

//     // Calculate total counts for percentage calculation
//     const totalCounts = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

//     // Calculate percentage for each category
//     const categoryPercentages = {};
//     for (const [category, count] of Object.entries(categoryCounts)) {
//       categoryPercentages[category] = totalCounts > 0 ? ((count / totalCounts) * 100).toFixed(2) : 0;
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: categoryPercentages,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching category data:", error.message);
//     return new Response(
//       JSON.stringify({ success: false, message: "Error fetching category data" }),
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";

const getSubCategoriesByProductId = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { features: true },
  });

  if (!product || !product.features) return {};

  const subCategories = {};
  
  for (const mainCategory of Object.keys(product.features)) {
    for (const subCategory of Object.keys(product.features[mainCategory])) {
      subCategories[subCategory] = 0;
    }
  }

  return subCategories;
};

export async function POST(req: Request) {
  try {
    const { productId, timePeriod } = await req.json();

    // Set date boundaries based on the time period
    let startDate, endDate;
    const today = new Date();

    if (timePeriod === "today") {
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (timePeriod === "yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      startDate = new Date(yesterday.setHours(0, 0, 0, 0));
      endDate = new Date(yesterday.setHours(23, 59, 59, 999));
    } else if (timePeriod === "last_week") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      startDate = new Date(lastWeek.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (timePeriod === "last_month") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      startDate = new Date(lastMonth.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (timePeriod === "last_quarter") {
      const lastQuarter = new Date(today);
      const currentMonth = today.getMonth();
      const quarterStartMonth = currentMonth - (currentMonth % 3) - 3;
      lastQuarter.setMonth(quarterStartMonth);
      startDate = new Date(lastQuarter.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else {
      throw new Error("Invalid time period");
    }

    // Get all subcategories for the product
    const subCategories = await getSubCategoriesByProductId(productId);

    // Fetch features for the given productId and time period
    const timeBasedFeatures = await prisma.features.findMany({
      where: {
        productID: productId,
        time: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    let categoryPercentages = { ...subCategories };

    if (timeBasedFeatures.length > 0) {
      // Aggregate category data
      const categoryCounts = timeBasedFeatures.reduce((acc, feature) => {
        const categories = feature.categoryData;
        for (const [category, count] of Object.entries(categories)) {
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += count;
        }
        return acc;
      }, {});

      // Calculate total counts for percentage calculation
      const totalCounts = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

      // Calculate percentage for each category
      for (const [category, count] of Object.entries(categoryCounts)) {
        categoryPercentages[category] = totalCounts > 0 ? ((count / totalCounts) * 100).toFixed(2) : "0.00";
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: categoryPercentages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching category data:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching category data" }),
      { status: 500 }
    );
  }
}
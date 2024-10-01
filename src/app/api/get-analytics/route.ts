// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     // Correctly refer to 'req' instead of 'request'
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
//     } else if (timePeriod === "lastWeek") {
//       startDate = new Date(today.setDate(today.getDate() - 7)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else if (timePeriod === "lastMonth") {
//       startDate = new Date(today.setMonth(today.getMonth() - 1)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else if (timePeriod === "lastQuarter") {
//       const month = today.getMonth();
//       startDate = new Date(today.setMonth(month - 3)).setHours(0, 0, 0, 0);
//       endDate = new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
//     } else {
//       throw new Error("Invalid time period");
//     }

//     // Query counts from the database
//     const views = await prisma.productView.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     const bookmarks = await prisma.bookmark.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     const shares = await prisma.share.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: { views, bookmarks, shares },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     // Improved error logging
//     console.error("Error fetching analytics data:", error.message);
//     console.error(error.stack); // Log the stack trace for more details
//     return new Response(
//       JSON.stringify({ success: false, message: "Error fetching analytics data" }),
//       { status: 500 }
//     );
//   }
// }


// import prisma from "@/lib/prisma";

// goodone 
// export async function POST(req: Request) {
//   try {
//     const { productId, timePeriod } = await req.json();

//     // Set date boundaries for the current period
//     let startDate, endDate, previousStartDate, previousEndDate;
//     const today = new Date();

//     if (timePeriod === "today") {
//       startDate = new Date(today.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));

//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       previousStartDate = new Date(yesterday.setHours(0, 0, 0, 0));
//       previousEndDate = new Date(yesterday.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "yesterday") {
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       startDate = new Date(yesterday.setHours(0, 0, 0, 0));
//       endDate = new Date(yesterday.setHours(23, 59, 59, 999));

//       const dayBeforeYesterday = new Date(yesterday);
//       dayBeforeYesterday.setDate(yesterday.getDate() - 1);
//       previousStartDate = new Date(dayBeforeYesterday.setHours(0, 0, 0, 0));
//       previousEndDate = new Date(dayBeforeYesterday.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_week") {
//       const lastWeek = new Date(today);
//       lastWeek.setDate(today.getDate() - 7);
//       startDate = new Date(lastWeek.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));

//       const weekBefore = new Date(today);
//       weekBefore.setDate(today.getDate() - 14);
//       previousStartDate = new Date(weekBefore.setHours(0, 0, 0, 0));
//       previousEndDate = new Date(lastWeek.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_month") {
//       const lastMonth = new Date(today);
//       lastMonth.setMonth(today.getMonth() - 1);
//       startDate = new Date(lastMonth.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));

//       const monthBefore = new Date(today);
//       monthBefore.setMonth(today.getMonth() - 2);
//       previousStartDate = new Date(monthBefore.setHours(0, 0, 0, 0));
//       previousEndDate = new Date(lastMonth.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_quarter") {
//       const lastQuarter = new Date(today);
//       const currentMonth = today.getMonth();
//       const quarterStartMonth = currentMonth - (currentMonth % 3) - 3;
//       lastQuarter.setMonth(quarterStartMonth);
//       startDate = new Date(lastQuarter.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));

//       const previousQuarter = new Date(lastQuarter);
//       previousQuarter.setMonth(lastQuarter.getMonth() - 3);
//       previousStartDate = new Date(previousQuarter.setHours(0, 0, 0, 0));
//       previousEndDate = new Date(lastQuarter.setHours(23, 59, 59, 999));
//     } else {
//       throw new Error("Invalid time period");
//     }

//     // Fetch counts for the current period
//     const currentViews = await prisma.productView.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     const currentBookmarks = await prisma.bookmark.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     const currentShares = await prisma.share.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     // Fetch counts for the previous period
//     const previousViews = await prisma.productView.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: previousStartDate,
//           lte: previousEndDate,
//         },
//       },
//     });

//     const previousBookmarks = await prisma.bookmark.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: previousStartDate,
//           lte: previousEndDate,
//         },
//       },
//     });

//     const previousShares = await prisma.share.count({
//       where: {
//         productId,
//         createdAt: {
//           gte: previousStartDate,
//           lte: previousEndDate,
//         },
//       },
//     });

//     // Calculate percentage change
//     const calculatePercentageChange = (current, previous) => {
//       if (previous === 0 && current > 0) return 100; // Full increase
//       if (previous === 0 && current === 0) return 0;  // No change
//       return ((current - previous) / previous) * 100;
//     };

//     const viewsChange = calculatePercentageChange(currentViews, previousViews);
//     const bookmarksChange = calculatePercentageChange(currentBookmarks, previousBookmarks);
//     const sharesChange = calculatePercentageChange(currentShares, previousShares);

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: {
//           current: { views: currentViews, bookmarks: currentBookmarks, shares: currentShares },
//           previous: { views: previousViews, bookmarks: previousBookmarks, shares: previousShares },
//           percentageChange: {
//             views: viewsChange.toFixed(2) + '%',
//             bookmarks: bookmarksChange.toFixed(2) + '%',
//             shares: sharesChange.toFixed(2) + '%',
//           },
//         },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching analytics data:", error.message);
//     return new Response(
//       JSON.stringify({ success: false, message: "Error fetching analytics data" }),
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { productId, timePeriod } = await req.json();

    // Set date boundaries for the current period
    let startDate, endDate, previousStartDate, previousEndDate;
    const today = new Date();

    if (timePeriod === "today") {
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      previousStartDate = new Date(yesterday.setHours(0, 0, 0, 0));
      previousEndDate = new Date(yesterday.setHours(23, 59, 59, 999));
    } else if (timePeriod === "yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      startDate = new Date(yesterday.setHours(0, 0, 0, 0));
      endDate = new Date(yesterday.setHours(23, 59, 59, 999));

      const dayBeforeYesterday = new Date(yesterday);
      dayBeforeYesterday.setDate(yesterday.getDate() - 1);
      previousStartDate = new Date(dayBeforeYesterday.setHours(0, 0, 0, 0));
      previousEndDate = new Date(dayBeforeYesterday.setHours(23, 59, 59, 999));
    } else if (timePeriod === "last_week") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      startDate = new Date(lastWeek.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));

      const weekBefore = new Date(today);
      weekBefore.setDate(today.getDate() - 14);
      previousStartDate = new Date(weekBefore.setHours(0, 0, 0, 0));
      previousEndDate = new Date(lastWeek.setHours(23, 59, 59, 999));
    } else if (timePeriod === "last_month") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      startDate = new Date(lastMonth.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));

      const monthBefore = new Date(today);
      monthBefore.setMonth(today.getMonth() - 2);
      previousStartDate = new Date(monthBefore.setHours(0, 0, 0, 0));
      previousEndDate = new Date(lastMonth.setHours(23, 59, 59, 999));
    } else if (timePeriod === "last_quarter") {
      const lastQuarter = new Date(today);
      const currentMonth = today.getMonth();
      const quarterStartMonth = currentMonth - (currentMonth % 3) - 3;
      lastQuarter.setMonth(quarterStartMonth);
      startDate = new Date(lastQuarter.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));

      const previousQuarter = new Date(lastQuarter);
      previousQuarter.setMonth(lastQuarter.getMonth() - 3);
      previousStartDate = new Date(previousQuarter.setHours(0, 0, 0, 0));
      previousEndDate = new Date(lastQuarter.setHours(23, 59, 59, 999));
    } else {
      throw new Error("Invalid time period");
    }

    // Fetch counts for the current period
    const currentViews = await prisma.productView.count({
      where: {
        productId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const currentBookmarks = await prisma.bookmark.count({
      where: {
        productId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const currentShares = await prisma.share.count({
      where: {
        productId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Fetch counts for the previous period
    const previousViews = await prisma.productView.count({
      where: {
        productId,
        createdAt: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    const previousBookmarks = await prisma.bookmark.count({
      where: {
        productId,
        createdAt: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    const previousShares = await prisma.share.count({
      where: {
        productId,
        createdAt: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    // Calculate percentage change
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0 && current > 0) return 100; // Full increase
      if (previous === 0 && current === 0) return 0;  // No change
      return ((current - previous) / previous) * 100;
    };

    const viewsChange = calculatePercentageChange(currentViews, previousViews);
    const bookmarksChange = calculatePercentageChange(currentBookmarks, previousBookmarks);
    const sharesChange = calculatePercentageChange(currentShares, previousShares);

    // Structure the response in the desired format
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          views: {
            current: currentViews,
            previous: previousViews,
            percentageChange: viewsChange.toFixed(2) + '%',
          },
          bookmarks: {
            current: currentBookmarks,
            previous: previousBookmarks,
            percentageChange: bookmarksChange.toFixed(2) + '%',
          },
          shares: {
            current: currentShares,
            previous: previousShares,
            percentageChange: sharesChange.toFixed(2) + '%',
          }
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching analytics data:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching analytics data" }),
      { status: 500 }
    );
  }
}

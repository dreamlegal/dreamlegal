import prisma from "@/lib/prisma";

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
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       startDate = new Date(yesterday.setHours(0, 0, 0, 0));
//       endDate = new Date(yesterday.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_week") {
//       const lastWeek = new Date(today);
//       lastWeek.setDate(today.getDate() - 7);
//       startDate = new Date(lastWeek.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_month") {
//       const lastMonth = new Date(today);
//       lastMonth.setMonth(today.getMonth() - 1);
//       startDate = new Date(lastMonth.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_quarter") {
//       const lastQuarter = new Date(today);
//       const currentMonth = today.getMonth();
//       const quarterStartMonth = currentMonth - (currentMonth % 3) - 3;
//       lastQuarter.setMonth(quarterStartMonth);
//       startDate = new Date(lastQuarter.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else {
//       throw new Error("Invalid time period");
//     }

//     // Query views, shares, and bookmarks for the given productId and date range
//     const views = await prisma.productView.groupBy({
//       by: ['userOrgType'],
//       where: {
//         productId: productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       _count: {
//         id: true,
//       },
//     });

//     const shares = await prisma.share.groupBy({
//       by: ['userOrgType'],
//       where: {
//         productId: productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       _count: {
//         id: true,
//       },
//     });

//     const bookmarks = await prisma.bookmark.groupBy({
//       by: ['userOrgType'],
//       where: {
//         productId: productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       _count: {
//         id: true,
//       },
//     });

//     // Define all userOrgType categories
//     const categories = [
//       "Individual Practitioner",
//       "Law firms",
//       "Government departments",
//       "Startups",
//       "Enterprises",
//       "Judiciary",
//       "In-House Counsels",
//     ];

//     // Calculate the engagement weight for each category
//     const engagementData = categories.map((category) => {
//       const viewCount = views.find(v => v.userOrgType === category)?._count.id || 0;
//       const shareCount = shares.find(s => s.userOrgType === category)?._count.id || 0;
//       const bookmarkCount = bookmarks.find(b => b.userOrgType === category)?._count.id || 0;

//       const engagementWeight = (viewCount * 1) + (shareCount * 3) + (bookmarkCount * 2);

//       return {
//         userOrgType: category,
//         viewCount,
//         shareCount,
//         bookmarkCount,
//         engagementWeight
//       };
//     });

//     return new Response(JSON.stringify(engagementData), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


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
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       startDate = new Date(yesterday.setHours(0, 0, 0, 0));
//       endDate = new Date(yesterday.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_week") {
//       const lastWeek = new Date(today);
//       lastWeek.setDate(today.getDate() - 7);
//       startDate = new Date(lastWeek.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_month") {
//       const lastMonth = new Date(today);
//       lastMonth.setMonth(today.getMonth() - 1);
//       startDate = new Date(lastMonth.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else if (timePeriod === "last_quarter") {
//       const lastQuarter = new Date(today);
//       const currentMonth = today.getMonth();
//       const quarterStartMonth = currentMonth - (currentMonth % 3) - 3;
//       lastQuarter.setMonth(quarterStartMonth);
//       startDate = new Date(lastQuarter.setHours(0, 0, 0, 0));
//       endDate = new Date(today.setHours(23, 59, 59, 999));
//     } else {
//       throw new Error("Invalid time period");
//     }

//     // Query views, shares, and bookmarks for the given productId and date range
//     const views = await prisma.productView.groupBy({
//       by: ['userOrgType'],
//       where: {
//         productId: productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       _count: {
//         id: true,
//       },
//     });

//     const shares = await prisma.share.groupBy({
//       by: ['userOrgType'],
//       where: {
//         productId: productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       _count: {
//         id: true,
//       },
//     });

//     const bookmarks = await prisma.bookmark.groupBy({
//       by: ['userOrgType'],
//       where: {
//         productId: productId,
//         createdAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       _count: {
//         id: true,
//       },
//     });

//     // Define all userOrgType categories
//     const categories = [
//       "Individual Practitioner",
//       "Law firms",
//       "Government departments",
//       "Startups",
//       "Enterprises",
//       "Judiciary",
//       "In-House Counsels",
//     ];

//     // Calculate the engagement weight for each category
//     const engagementData = categories.map((category) => {
//       const viewCount = views.find(v => v.userOrgType === category)?._count.id || 0;
//       const shareCount = shares.find(s => s.userOrgType === category)?._count.id || 0;
//       const bookmarkCount = bookmarks.find(b => b.userOrgType === category)?._count.id || 0;

//       const engagementWeight = (viewCount * 1) + (shareCount * 3) + (bookmarkCount * 2);

//       return {
//         userOrgType: category,
//         viewCount,
//         shareCount,
//         bookmarkCount,
//         engagementWeight
//       };
//     });

//     // Calculate the total engagement across all categories
//     const totalEngagementWeight = engagementData.reduce((sum, item) => sum + item.engagementWeight, 0);

//     // Add percentage to each category
//     const engagementDataWithPercentage = engagementData.map((item) => {
//       const percentage = totalEngagementWeight > 0 ? (item.engagementWeight / totalEngagementWeight) * 100 : 0;
//       return {
//         ...item,
//         percentage: percentage.toFixed(2) + '%' // Formatting percentage to 2 decimal places
//       };
//     });

//     return new Response(JSON.stringify(engagementDataWithPercentage), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


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

    // Query views, shares, and bookmarks for the given productId and date range
    const views = await prisma.productView.groupBy({
      by: ['userOrgType'],
      where: {
        productId: productId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const shares = await prisma.share.groupBy({
      by: ['userOrgType'],
      where: {
        productId: productId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const bookmarks = await prisma.bookmark.groupBy({
      by: ['userOrgType'],
      where: {
        productId: productId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Define all userOrgType categories
    const categories = [
      "Individual Practitioner",
      "Law firms",
      "Government departments",
      "Startups",
      "Enterprises",
      "Judiciary",
      "In-House Counsels",
    ];

    // Calculate the engagement weight for each category
    const engagementData = categories.map((category) => {
      const viewCount = views.find(v => v.userOrgType === category)?._count.id || 0;
      const shareCount = shares.find(s => s.userOrgType === category)?._count.id || 0;
      const bookmarkCount = bookmarks.find(b => b.userOrgType === category)?._count.id || 0;

      const engagementWeight = (viewCount * 1) + (shareCount * 3) + (bookmarkCount * 2);

      return {
        userOrgType: category,
        viewCount,
        shareCount,
        bookmarkCount,
        engagementWeight
      };
    });

    // Calculate the total engagement across all categories
    const totalEngagementWeight = engagementData.reduce((sum, item) => sum + item.engagementWeight, 0);

    // Add percentage to each category and find the top segment
    let topSegment = null;

    const engagementDataWithPercentage = engagementData.map((item) => {
      const percentage = totalEngagementWeight > 0 ? (item.engagementWeight / totalEngagementWeight) * 100 : 0;
      const itemWithPercentage = {
        ...item,
        percentage: percentage.toFixed(2) + '%', // Formatting percentage to 2 decimal places
      };

      // Find the top segment with the highest percentage
      if (!topSegment || percentage > parseFloat(topSegment.percentage)) {
        topSegment = {
          ...itemWithPercentage,
          percentage: percentage.toFixed(2) + '%'
        };
      }

      return itemWithPercentage;
    });

    // Return the engagement data along with the top segment
    return new Response(
      JSON.stringify({
        engagementData: engagementDataWithPercentage,
        topSegment
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

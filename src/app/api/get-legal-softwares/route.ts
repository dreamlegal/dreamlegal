
// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { page = 1, limit = 12, filters = {} } = await request.json();

//     console.log("\n===== Incoming Filters ======");
//     console.log(filters);

//     const skip = (page - 1) * limit;
//     const where: any = {};

//     /* ------------------------- CATEGORY FILTER ------------------------- */
//     // if (filters.categories?.length > 0) {
//     //   where.category = {
//     //     in: filters.categories.map((c: string) => c.trim().toUpperCase()),
//     //   };
//     // }
//     if (filters.categories?.length > 0) {
//   where.categories = {
//     hasSome: filters.categories.map((c) => c.trim().toUpperCase()),
//   };
// }


//     /* ------------------------- PRICING FILTER ------------------------- */
//     if (filters.pricingTiers?.length > 0) {
//       where.pricingTier = {
//         in: filters.pricingTiers.map((p: string) => p.trim().toUpperCase()),
//       };
//     }

//     /* ------------------------- TARGET USERS FILTER (fuzzy matching) ------------------------- */

//     const userGroups: Record<string, string[]> = {
//       ENTERPRISE: [
//         "enterprise",
//         "enterprises",
//         "large enterprise",
//         "corporate legal departments",
//         "enterprise legal ops",
//       ],

//       LAW_FIRM: [
//         "law firm",
//         "law firms",
//         "litigation firm",
//         "attorneys",
//         "boutique firm",
//         "legal practice",
//       ],

//       INHOUSE: [
//         "in-house",
//         "in house",
//         "legal department",
//         "legal departments",
//         "counsel",
//         "legal ops",
//         "corporate counsel",
//       ],

//       INDIVIDUAL: [
//         "solo",
//         "individual",
//         "independent",
//         "freelancer",
//         "chamber",
//         "chambers",
//         "chamber lawyers",
//       ],
//     };

//     if (filters.targetUserGroup) {
//       const keywords = userGroups[filters.targetUserGroup];

//       if (keywords) {
//         where.AND = [
//           {
//             OR: keywords.map((word: string) => ({
//               targetUsers: {
//                 contains: word,
//                 mode: "insensitive",
//               },
//             })),
//           },
//         ];
//       }
//     }

//     console.log("\n===== FINAL WHERE CLAUSE =====");
//     console.log(JSON.stringify(where, null, 2));

//     /* ------------------------- COUNT TOTAL ------------------------- */
//     const totalCount = await prisma.legalSoftware.count({ where });

//     /* ------------------------- FETCH PRODUCTS ------------------------- */
//     const allProducts = await prisma.legalSoftware.findMany({
//       where,
//       orderBy: { createdAt: "desc" },
//     });

//     /* ------------------------- PREMIUM SORTING ------------------------- */
//     const premium = allProducts.filter((p) => p.isPremium);
//     const regular = allProducts.filter((p) => !p.isPremium);

//     const shuffle = (arr: any[]) => {
//       const copy = [...arr];
//       for (let i = copy.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [copy[i], copy[j]] = [copy[j], copy[i]];
//       }
//       return copy;
//     };

//     const sorted = [...shuffle(premium), ...shuffle(regular)];

//     /* ------------------------- PAGINATION ------------------------- */
//     const products = sorted.slice(skip, skip + limit);

//     return NextResponse.json({
//       success: true,
//       products,
//       total: totalCount,
//       hasMore: skip + products.length < totalCount,
//     });
//   } catch (error: any) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message || "Unknown error occurred",
//       },
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { page = 1, limit = 12, filters = {} } = await request.json();

    console.log("\n===== Incoming Filters ======");
    console.log(filters);

    const skip = (page - 1) * limit;
    const where: any = {};

    /* ------------------------- CATEGORY FILTER (ARRAY) ------------------------- */
    if (filters.categories?.length > 0) {
     where.categories = {
  hasEvery: filters.categories.map((c) => c.trim().toUpperCase()),
};

    }

    /* ------------------------- PRICING FILTER ------------------------- */
    if (filters.pricingTiers?.length > 0) {
      where.pricingTier = {
        in: filters.pricingTiers.map((p: string) => p.trim().toUpperCase()),
      };
    }

    /* ------------------------- TARGET USERS FILTER (fuzzy matching) ------------------------- */
    const userGroups: Record<string, string[]> = {
      ENTERPRISE: [
        "enterprise",
        "enterprises",
        "large enterprise",
        "corporate legal departments",
        "enterprise legal ops",
      ],

      LAW_FIRM: [
        "law firm",
        "law firms",
        "litigation firm",
        "attorneys",
        "boutique firm",
        "legal practice",
      ],

      INHOUSE: [
        "in-house",
        "in house",
        "legal department",
        "legal departments",
        "counsel",
        "legal ops",
        "corporate counsel",
      ],

      INDIVIDUAL: [
        "solo",
        "individual",
        "independent",
        "freelancer",
        "chamber",
        "chambers",
        "chamber lawyers",
      ],
    };

    if (filters.targetUserGroup) {
      const keywords = userGroups[filters.targetUserGroup];

      if (keywords) {
        where.AND = [
          {
            OR: keywords.map((word: string) => ({
              targetUsers: {
                contains: word,
                mode: "insensitive",
              },
            })),
          },
        ];
      }
    }

    console.log("\n===== FINAL WHERE CLAUSE =====");
    console.log(JSON.stringify(where, null, 2));

    /* ------------------------- COUNT TOTAL ------------------------- */
    const totalCount = await prisma.legalSoftware.count({ where });

    /* ------------------------- FETCH PRODUCTS ------------------------- */
    const allProducts = await prisma.legalSoftware.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    /* ------------------------- PREMIUM SORTING ------------------------- */
    const premium = allProducts.filter((p) => p.isPremium);
    const regular = allProducts.filter((p) => !p.isPremium);

    const shuffle = (arr: any[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const sorted = [...shuffle(premium), ...shuffle(regular)];

    /* ------------------------- PAGINATION ------------------------- */
    const products = sorted.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      products,
      total: totalCount,
      hasMore: skip + products.length < totalCount,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}


// // import prisma from "@/lib/prisma";
// // import { NextRequest, NextResponse } from "next/server";

// // // Handle GET requests to fetch legal software by category
// // export async function GET(request: NextRequest) {
// //   try {
// //     const url = new URL(request.url);
// //     const category = url.searchParams.get("category");
    
// //     console.log(`API received request for category: ${category}`);
    
// //     if (!category) {
// //       console.log("No category provided");
// //       return NextResponse.json({ 
// //         error: "Category parameter is required",
// //         products: [] 
// //       }, { status: 400 });
// //     }

// //     // Validate that the category is a valid enum value
// //     const validCategories = [
// //       'CONTRACT_LIFECYCLE_MANAGEMENT',
// //       'LEGAL_AI',
// //       'DOCUMENT_MANAGEMENT_SYSTEM',
// //       'LITIGATION_MANAGEMENT_AND_ANALYTICS',
// //       'IP_MANAGEMENT',
// //       'LEGAL_RESEARCH',
// //       'E_DISCOVERY'
// //     ];

// //     if (!validCategories.includes(category)) {
// //       console.log(`Invalid category: ${category}`);
// //       return NextResponse.json({ 
// //         error: "Invalid category parameter",
// //         products: [] 
// //       }, { status: 400 });
// //     }

// //     // Fetch legal software that matches the category
// //     const products = await prisma.legalSoftware.findMany({
// //       where: {
// //         category: category as any, // Cast to enum type
// //       },
// //       select: {
// //         id: true,
// //         productName: true,
// //         logoUrl: true,
// //         category: true,
// //         slug: true,
// //         companyName: true,
// //         description: true,
// //       },
// //       take: 9, // Limit to 9 products
// //       orderBy: {
// //         createdAt: 'desc', // Order by most recently created
// //       },
// //     });

// //     console.log(`Found ${products.length} products for category ${category}`);
    
// //     // For debugging - log some info about the found products
// //     if (products.length > 0) {
// //       products.forEach((product, index) => {
// //         if (index < 3) { // Only log first 3 to avoid console spam
// //           console.log(`- Product: ${product.productName}, Category: ${product.category}`);
// //         }
// //       });
// //     } else {
// //       // If no products found, check if any products exist at all
// //       const totalProducts = await prisma.legalSoftware.count();
// //       console.log(`No products found for category "${category}". Total products in DB: ${totalProducts}`);
      
// //       // Try to get a sample of products to see what categories exist
// //       const sampleProducts = await prisma.legalSoftware.findMany({
// //         select: {
// //           id: true,
// //           productName: true,
// //           category: true
// //         },
// //         take: 5
// //       });
// //       console.log("Sample products in DB:");
// //       sampleProducts.forEach(p => console.log(`- ${p.productName}: ${p.category}`));
// //     }

// //     return NextResponse.json({ products });
// //   } catch (error) {
// //     console.error("Error fetching legal software:", error);
// //     return NextResponse.json({ 
// //       error: "Failed to fetch products",
// //       products: [] 
// //     }, { status: 500 });
// //   }
// // }
// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// // Handle GET requests to fetch legal software by category
// export async function GET(request: NextRequest) {
//   try {
//     const url = new URL(request.url);
//     const category = url.searchParams.get("category");
    
//     console.log(`API received request for category: ${category}`);
    
//     if (!category) {
//       console.log("No category provided");
//       return NextResponse.json({ 
//         error: "Category parameter is required",
//         products: [] 
//       }, { status: 400 });
//     }

//     // Validate that the category is a valid enum value
//     const validCategories = [
//       'CONTRACT_LIFECYCLE_MANAGEMENT',
//       'LEGAL_AI',
//       'DOCUMENT_MANAGEMENT_SYSTEM',
//       'LITIGATION_MANAGEMENT_AND_ANALYTICS',
//       'IP_MANAGEMENT',
//       'LEGAL_RESEARCH',
//       'E_DISCOVERY',
//       'CASE_MANAGEMENT',
//       'GOVERNANCE_RISK_COMPLIANCE',
//       'LEGAL_DUE_DILIGENCE'

//     ];

//     if (!validCategories.includes(category)) {
//       console.log(`Invalid category: ${category}`);
//       return NextResponse.json({ 
//         error: "Invalid category parameter",
//         products: [] 
//       }, { status: 400 });
//     }

//     // Fetch all legal software that matches the category
//     const allProducts = await prisma.legalSoftware.findMany({
//       where: {
//         category: category as any, // Cast to enum type
//       },
//       select: {
//         id: true,
//         productName: true,
//         logoUrl: true,
//         category: true,
//         slug: true,
//         companyName: true,
//         description: true,
//         isPremium: true,
//         tag: true,
//         createdAt: true,
//       },
//       orderBy: {
//         createdAt: 'desc', // Order by most recently created initially
//       },
//     });

//     console.log(`Found ${allProducts.length} total products for category ${category}`);

//     // Separate premium and non-premium products
//     const premiumProducts = allProducts.filter(product => product.isPremium);
//     const regularProducts = allProducts.filter(product => !product.isPremium);

//     console.log(`Premium products: ${premiumProducts.length}, Regular products: ${regularProducts.length}`);

//     // Randomize both arrays
//     const shuffleArray = (array: any[]) => {
//       const shuffled = [...array];
//       for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//       }
//       return shuffled;
//     };

//     const shuffledPremium = shuffleArray(premiumProducts);
//     const shuffledRegular = shuffleArray(regularProducts);

//     // Combine: premium first, then regular
//     const sortedProducts = [...shuffledPremium, ...shuffledRegular];

//     // Take only first 9 products after prioritization
//     const products = sortedProducts.slice(0, 9);
    
//     // For debugging - log some info about the found products
//     if (products.length > 0) {
//       products.forEach((product, index) => {
//         if (index < 3) { // Only log first 3 to avoid console spam
//           console.log(`- Product: ${product.productName}, Category: ${product.category}, Premium: ${product.isPremium}`);
//         }
//       });
//     } else {
//       // If no products found, check if any products exist at all
//       const totalProducts = await prisma.legalSoftware.count();
//       console.log(`No products found for category "${category}". Total products in DB: ${totalProducts}`);
      
//       // Try to get a sample of products to see what categories exist
//       const sampleProducts = await prisma.legalSoftware.findMany({
//         select: {
//           id: true,
//           productName: true,
//           category: true,
//           isPremium: true
//         },
//         take: 5
//       });
//       console.log("Sample products in DB:");
//       sampleProducts.forEach(p => console.log(`- ${p.productName}: ${p.category} (Premium: ${p.isPremium})`));
//     }

//     return NextResponse.json({ 
//       products,
//       debug: {
//         category,
//         totalFound: allProducts.length,
//         premiumCount: premiumProducts.length,
//         regularCount: regularProducts.length,
//         returned: products.length
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching legal software:", error);
//     return NextResponse.json({ 
//       error: "Failed to fetch products",
//       products: [] 
//     }, { status: 500 });
//   }
// }
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    console.log(`API received request for category: ${category}`);

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required", products: [] },
        { status: 400 }
      );
    }

    const validCategories = [
      "CONTRACT_LIFECYCLE_MANAGEMENT",
      "LEGAL_AI",
      "DOCUMENT_MANAGEMENT_SYSTEM",
      "LITIGATION_MANAGEMENT_AND_ANALYTICS",
      "IP_MANAGEMENT",
      "LEGAL_RESEARCH",
      "E_DISCOVERY",
      "CASE_MANAGEMENT",
      "GOVERNANCE_RISK_COMPLIANCE",
      "LEGAL_DUE_DILIGENCE",
      "TIMEKEEPING_SOFTWARE",
      "LEGAL_INTAKE_SOFTWARE",
      "TRANSACTION_MANAGEMENT_SOFTWARE"
    ];

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category parameter", products: [] },
        { status: 400 }
      );
    }

    // ✅ NEW → Query products where categories array CONTAINS the category
    const allProducts = await prisma.legalSoftware.findMany({
      where: {
        categories: {
          has: category
        }
      },
      select: {
        id: true,
        productName: true,
        logoUrl: true,
        categories: true,   // <-- updated
        slug: true,
        companyName: true,
        description: true,
        isPremium: true,
        tag: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    console.log(`Found ${allProducts.length} products in new categories array.`);

    const premiumProducts = allProducts.filter((p) => p.isPremium);
    const regularProducts = allProducts.filter((p) => !p.isPremium);

    const shuffle = (arr: any[]) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const sorted = [...shuffle(premiumProducts), ...shuffle(regularProducts)];
    const products = sorted.slice(0, 9);

    return NextResponse.json({
      products,
      debug: {
        category,
        totalFound: allProducts.length,
        premium: premiumProducts.length,
        regular: regularProducts.length,
        returned: products.length
      }
    });

  } catch (error) {
    console.error("Error fetching legal software:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", products: [] },
      { status: 500 }
    );
  }
}

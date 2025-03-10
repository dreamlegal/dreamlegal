// // /app/api/paid-listing-products/route.ts
// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// // Helper function to process user categories
// function processUserCategories(categories) {
//   if (!categories || !Array.isArray(categories)) return [];
//   return categories;
// }

// // Handle GET requests to fetch products by category
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

//     // Fetch products that match the category
//     // Using array containment operator for Prisma
//     const products = await prisma.product.findMany({
//       where: {
//         category: {
//           hasSome: [category]  // Changed from 'has' to 'hasSome' with array
//         },
//         active: "published", // Only get published products
       
//       },
//       select: {
//         id: true,
//         name: true,
//         logoUrl: true,
//         userCategory: true,
//         category: true,
//         slug: true,
//         // Add any other fields you want to return
//       },
//       take: 9, // Limit to 9 products
//       orderBy: {
//         // Order by featured first, then creation date
//         featured: 'desc',
//       },
//     });

//     console.log(`Found ${products.length} products for category ${category}`);
    
//     // For debugging - log the first few products if any
//     if (products.length > 0) {
//       console.log(`Sample product categories: ${JSON.stringify(products[0].category)}`);
//     }

//     // Process user categories for each product
//     const processedProducts = products.map(product => ({
//       ...product,
//       userCategory: processUserCategories(product.userCategory),
//     }));

//     return NextResponse.json({ products: processedProducts });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json({ 
//       error: "Failed to fetch products",
//       products: [] 
//     }, { status: 500 });
//   }
// }
// /app/api/paid-listing-products/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Helper function to process user categories
function processUserCategories(categories) {
  if (!categories || !Array.isArray(categories)) return [];
  return categories;
}

// Handle GET requests to fetch products by category
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    
    console.log(`API received request for category: ${category}`);
    
    if (!category) {
      console.log("No category provided");
      return NextResponse.json({ 
        error: "Category parameter is required",
        products: [] 
      }, { status: 400 });
    }

    // Fetch products that match the category
    // Note: active is "publish" (not "published")
    const products = await prisma.product.findMany({
      where: {
        category: {
          has: category  // Using 'has' for exact match in array
        },
        active: "publish", // Changed from "published" to "publish"
        // Removed isVendorVerified filter as it might not be needed
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        userCategory: true,
        category: true,
        slug: true,
        // Add any other fields you want to return
      },
      take: 9, // Limit to 9 products
      orderBy: {
        // Order by featured first, then creation date
        featured: 'desc',
      },
    });

    console.log(`Found ${products.length} products for category ${category}`);
    
    // For debugging - log some info about the found products
    if (products.length > 0) {
      products.forEach((product, index) => {
        if (index < 3) { // Only log first 3 to avoid console spam
          console.log(`- Product: ${product.name}, Categories: ${JSON.stringify(product.category)}`);
        }
      });
    } else {
      // If no products found, check if any products exist at all
      const totalProducts = await prisma.product.count({
        where: {
          active: "publish"
        }
      });
      console.log(`No products found for category "${category}". Total active products in DB: ${totalProducts}`);
      
      // Try a more lenient search if no products found
      const fuzzyProducts = await prisma.product.findMany({
        where: {
          active: "publish"
        },
        select: {
          id: true,
          name: true,
          category: true
        },
        take: 5
      });
      console.log("Sample products in DB:");
      fuzzyProducts.forEach(p => console.log(`- ${p.name}: ${JSON.stringify(p.category)}`));
    }

    // Process user categories for each product
    const processedProducts = products.map(product => ({
      ...product,
      userCategory: processUserCategories(product.userCategory),
    }));

    return NextResponse.json({ products: processedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ 
      error: "Failed to fetch products",
      products: [] 
    }, { status: 500 });
  }
}
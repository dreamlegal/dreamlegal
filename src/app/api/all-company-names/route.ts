// import { NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     // Fetch all legal software records with only the companyName field
//     const companies = await prisma.legalSoftware.findMany({
//       select: {
//         companyName: true,
//       },
//       distinct: ['companyName'], // Get unique company names
//       orderBy: {
//         companyName: 'asc', // Sort alphabetically
//       },
//     });

//     // Extract just the company names into an array
//     const companyNames = companies.map(company => company.companyName);

//     return NextResponse.json({
//       success: true,
//       count: companyNames.length,
//       data: companyNames,
//     });
//   } catch (error) {
//     console.error('Error fetching company names:', error);
    
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to fetch company names',
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all legal software records with product name and category
    const products = await prisma.legalSoftware.findMany({
      select: {
        id: true,
        productName: true,
        category: true,
        companyName: true,
        slug: true,
      },
      orderBy: [
        {
          category: 'asc',
        },
        {
          productName: 'asc',
        },
      ],
    });

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      const category = product.category;
      
      if (!acc[category]) {
        acc[category] = [];
      }
      
      acc[category].push({
        id: product.id,
        productName: product.productName,
        companyName: product.companyName,
        slug: product.slug,
      });
      
      return acc;
    }, {} as Record<string, Array<{
      id: string;
      productName: string;
      companyName: string;
      slug: string | null;
    }>>);

    // Calculate statistics
    const categories = Object.keys(productsByCategory);
    const totalProducts = products.length;
    const categoryCounts = categories.map(category => ({
      category,
      count: productsByCategory[category].length,
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories: categories.length,
        categoryCounts,
      },
      data: productsByCategory,
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products by category',
      },
      { status: 500 }
    );
  }
}
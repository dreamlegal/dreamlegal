// // /app/api/get-legal-software/route.ts
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { page = 1, limit = 12, filters } = await request.json();
//     console.log('Filters:', filters);
//     const skip = (page - 1) * limit;

//     // Build the where clause based on filters
//     const where: any = {};

//     if (filters) {
//       // Category filter
//       if (filters.categories?.length > 0) {
//         where.category = { in: filters.categories };
//       }
      
//       // Pricing tier filter
//       if (filters.pricingTiers?.length > 0) {
//         where.pricingTier = { in: filters.pricingTiers };
//       }
//     }

//     // Get total count for pagination
//     const totalCount = await prisma.legalSoftware.count({ where });

//     // Fetch legal software with pagination
//     const products = await prisma.legalSoftware.findMany({
//       where,
//       take: limit,
//       skip,
//       select: {
//         id: true,
//         productName: true,
//         description: true,
//         briefDescription: true,
//         slug: true,
//         logoUrl: true,
//         category: true,
//         pricingTier: true,
//         startingPrice: true,
//         freeTrial: true,
//         customPricing: true,
//         pricingModel: true,
//         targetUsers: true,
//         companyName: true,
//         headquarters: true,
//         founded: true,
//         founders: true,
//         website: true,
//         email: true,
//         phone: true,
//         coreFunctionalities: true,
//         keyFeatures: true,
//         deploymentOptions: true,
//         technologyStack: true,
//         primaryPurpose: true,
//         bestKnownFor: true,
//         topUseCases: true,
//         userSatisfaction: true,
//         criticalOpinions: true,
//         socialMedia: true,
//         images: true,
//         videos: true,
//         faqs: true,
//         lifecycleStages: true,
//         sources: true,
//         createdAt: true,
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     // Calculate if there are more products
//     const hasMore = skip + products.length < totalCount;

//     return NextResponse.json({
//       success: true,
//       products,
//       hasMore,
//       total: totalCount
//     });

//   } catch (error) {
//     console.error('Error fetching legal software:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch legal software' },
//       { status: 500 }
//     );
//   }
// }
// /app/api/get-legal-software/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { page = 1, limit = 12, filters } = await request.json();
    console.log('=== API Debug Info ===');
    console.log('Page:', page);
    console.log('Limit:', limit);
    console.log('Filters received:', JSON.stringify(filters, null, 2));
    
    const skip = (page - 1) * limit;

    // Valid enum values for validation
    const validCategories = [
      'CONTRACT_LIFECYCLE_MANAGEMENT',
      'LEGAL_AI', 
      'DOCUMENT_MANAGEMENT_SYSTEM',
      'LITIGATION_MANAGEMENT_AND_ANALYTICS',
      'IP_MANAGEMENT',
      'LEGAL_RESEARCH',
      'E_DISCOVERY'
    ];

    const validPricingTiers = [
      'BUDGET',
      'MID_RANGE', 
      'PREMIUM',
      'ENTERPRISE'
    ];

    // Build the where clause based on filters
    const where: any = {};

    if (filters) {
      // Category filter with validation
      if (filters.categories?.length > 0) {
        console.log('Categories filter:', filters.categories);
        
        // Validate categories
        const validFilterCategories = filters.categories.filter((cat: string) => 
          validCategories.includes(cat)
        );
        
        console.log('Valid categories after filtering:', validFilterCategories);
        
        if (validFilterCategories.length > 0) {
          where.category = { in: validFilterCategories };
        } else {
          console.log('No valid categories found in filter');
        }
      }
      
      // Pricing tier filter with validation
      if (filters.pricingTiers?.length > 0) {
        console.log('PricingTiers filter:', filters.pricingTiers);
        
        // Validate pricing tiers
        const validFilterPricingTiers = filters.pricingTiers.filter((tier: string) => 
          validPricingTiers.includes(tier)
        );
        
        console.log('Valid pricing tiers after filtering:', validFilterPricingTiers);
        
        if (validFilterPricingTiers.length > 0) {
          where.pricingTier = { in: validFilterPricingTiers };
        } else {
          console.log('No valid pricing tiers found in filter');
        }
      }
    }

    console.log('Final where clause:', JSON.stringify(where, null, 2));

    // Get total count for pagination
    const totalCount = await prisma.legalSoftware.count({ where });
    console.log('Total count found:', totalCount);

    // If no products found with filters, let's check what data exists
    if (totalCount === 0 && Object.keys(where).length > 0) {
      console.log('No products found with filters, checking available data...');
      
      // Check what categories actually exist in the database
      const availableCategories = await prisma.legalSoftware.findMany({
        select: { category: true },
        distinct: ['category']
      });
      console.log('Available categories in DB:', availableCategories.map(p => p.category));
      
      // Check what pricing tiers actually exist in the database
      const availablePricingTiers = await prisma.legalSoftware.findMany({
        select: { pricingTier: true },
        distinct: ['pricingTier']
      });
      console.log('Available pricing tiers in DB:', availablePricingTiers.map(p => p.pricingTier));
    }

    // Fetch legal software with pagination
    const products = await prisma.legalSoftware.findMany({
      where,
      take: limit,
      skip,
      select: {
        id: true,
        productName: true,
        description: true,
        briefDescription: true,
        slug: true,
        logoUrl: true,
        category: true,
        pricingTier: true,
        startingPrice: true,
        freeTrial: true,
        customPricing: true,
        pricingModel: true,
        targetUsers: true,
        companyName: true,
        headquarters: true,
        founded: true,
        founders: true,
        website: true,
        email: true,
        phone: true,
        coreFunctionalities: true,
        keyFeatures: true,
        deploymentOptions: true,
        technologyStack: true,
        primaryPurpose: true,
        bestKnownFor: true,
        topUseCases: true,
        userSatisfaction: true,
        criticalOpinions: true,
        socialMedia: true,
        images: true,
        videos: true,
        faqs: true,
        lifecycleStages: true,
        sources: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Products found:', products.length);
    if (products.length > 0) {
      console.log('Sample product categories:', products.slice(0, 3).map(p => ({
        name: p.productName,
        category: p.category,
        pricingTier: p.pricingTier
      })));
    }

    // Calculate if there are more products
    const hasMore = skip + products.length < totalCount;

    return NextResponse.json({
      success: true,
      products,
      hasMore,
      total: totalCount,
      debug: {
        filtersApplied: where,
        validCategories,
        validPricingTiers
      }
    });

  } catch (error) {
    console.error('Error fetching legal software:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch legal software',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
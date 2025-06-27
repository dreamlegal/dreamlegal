// // working
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { page = 1, limit = 12, filters } = await request.json();
//     console.log('=== API Debug Info ===');
//     console.log('Page:', page);
//     console.log('Limit:', limit);
//     console.log('Filters received:', JSON.stringify(filters, null, 2));
    
//     const skip = (page - 1) * limit;

//     // Valid enum values for validation
//     const validCategories = [
//       'CONTRACT_LIFECYCLE_MANAGEMENT',
//       'LEGAL_AI', 
//       'DOCUMENT_MANAGEMENT_SYSTEM',
//       'LITIGATION_MANAGEMENT_AND_ANALYTICS',
//       'IP_MANAGEMENT',
//       'LEGAL_RESEARCH',
//       'E_DISCOVERY'
//     ];

//     const validPricingTiers = [
//       'BUDGET',
//       'MID_RANGE', 
//       'PREMIUM',
//       'ENTERPRISE'
//     ];

//     // Build the where clause based on filters
//     const where: any = {};

//     if (filters) {
//       // Category filter with validation
//       if (filters.categories?.length > 0) {
//         console.log('Categories filter:', filters.categories);
        
//         // Validate categories
//         const validFilterCategories = filters.categories.filter((cat: string) => 
//           validCategories.includes(cat)
//         );
        
//         console.log('Valid categories after filtering:', validFilterCategories);
        
//         if (validFilterCategories.length > 0) {
//           where.category = { in: validFilterCategories };
//         } else {
//           console.log('No valid categories found in filter');
//         }
//       }
      
//       // Pricing tier filter with validation
//       if (filters.pricingTiers?.length > 0) {
//         console.log('PricingTiers filter:', filters.pricingTiers);
        
//         // Validate pricing tiers
//         const validFilterPricingTiers = filters.pricingTiers.filter((tier: string) => 
//           validPricingTiers.includes(tier)
//         );
        
//         console.log('Valid pricing tiers after filtering:', validFilterPricingTiers);
        
//         if (validFilterPricingTiers.length > 0) {
//           where.pricingTier = { in: validFilterPricingTiers };
//         } else {
//           console.log('No valid pricing tiers found in filter');
//         }
//       }
//     }

//     console.log('Final where clause:', JSON.stringify(where, null, 2));

//     // Get total count for pagination
//     const totalCount = await prisma.legalSoftware.count({ where });
//     console.log('Total count found:', totalCount);

//     // If no products found with filters, let's check what data exists
//     if (totalCount === 0 && Object.keys(where).length > 0) {
//       console.log('No products found with filters, checking available data...');
      
//       // Check what categories actually exist in the database
//       const availableCategories = await prisma.legalSoftware.findMany({
//         select: { category: true },
//         distinct: ['category']
//       });
//       console.log('Available categories in DB:', availableCategories.map(p => p.category));
      
//       // Check what pricing tiers actually exist in the database
//       const availablePricingTiers = await prisma.legalSoftware.findMany({
//         select: { pricingTier: true },
//         distinct: ['pricingTier']
//       });
//       console.log('Available pricing tiers in DB:', availablePricingTiers.map(p => p.pricingTier));
//     }

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

//     console.log('Products found:', products.length);
//     if (products.length > 0) {
//       console.log('Sample product categories:', products.slice(0, 3).map(p => ({
//         name: p.productName,
//         category: p.category,
//         pricingTier: p.pricingTier
//       })));
//     }

//     // Calculate if there are more products
//     const hasMore = skip + products.length < totalCount;

//     return NextResponse.json({
//       success: true,
//       products,
//       hasMore,
//       total: totalCount,
//       debug: {
//         filtersApplied: where,
//         validCategories,
//         validPricingTiers
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching legal software:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to fetch legal software',
//         error: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }
// premium 
// /app/api/get-legal-softwares/route.ts
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

    // Fetch all products first, then randomize and paginate
    const allProducts = await prisma.legalSoftware.findMany({
      where,
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
        isPremium: true,
        tag: true,
        createdAt: true,
      }
    });

    // Separate premium and non-premium products
    const premiumProducts = allProducts.filter(product => product.isPremium);
    const regularProducts = allProducts.filter(product => !product.isPremium);

    // Randomize both arrays
    const shuffleArray = (array: any[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledPremium = shuffleArray(premiumProducts);
    const shuffledRegular = shuffleArray(regularProducts);

    // Combine: premium first, then regular
    const sortedProducts = [...shuffledPremium, ...shuffledRegular];

    // Apply pagination
    const products = sortedProducts.slice(skip, skip + limit);

    console.log('Products found:', products.length);
    console.log('Premium products found:', premiumProducts.length);
    if (products.length > 0) {
      console.log('Sample product categories:', products.slice(0, 3).map(p => ({
        name: p.productName,
        category: p.category,
        pricingTier: p.pricingTier,
        isPremium: p.isPremium
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
        validPricingTiers,
        premiumCount: premiumProducts.length,
        regularCount: regularProducts.length
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
// // /app/api/search-legal-software/route.ts
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//     try {
//       const { searchTerm, page = 1, limit = 12, filters } = await request.json();
//       const skip = (page - 1) * limit;
  
//       // Build the where clause for search and filters
//       const where: any = {
//         OR: [
//           { productName: { contains: searchTerm, mode: 'insensitive' } },
//           { description: { contains: searchTerm, mode: 'insensitive' } },
//           { briefDescription: { contains: searchTerm, mode: 'insensitive' } },
//           { companyName: { contains: searchTerm, mode: 'insensitive' } },
//           { targetUsers: { contains: searchTerm, mode: 'insensitive' } },
//           { primaryPurpose: { contains: searchTerm, mode: 'insensitive' } },
//           { coreFunctionalities: { hasSome: [searchTerm] } },
//           { bestKnownFor: { hasSome: [searchTerm] } },
//           { topUseCases: { hasSome: [searchTerm] } },
//         ]
//       };
  
//       // Apply additional filters
//       if (filters) {
//         // Category filter
//         if (filters.categories?.length > 0) {
//           where.AND = [...(where.AND || []), { category: { in: filters.categories } }];
//         }
        
//         // Pricing tier filter
//         if (filters.pricingTiers?.length > 0) {
//           where.AND = [...(where.AND || []), { pricingTier: { in: filters.pricingTiers } }];
//         }
//       }
  
//       // Get total count for pagination
//       const totalCount = await prisma.legalSoftware.count({ where });
  
//       // Fetch filtered legal software
//       const products = await prisma.legalSoftware.findMany({
//         where,
//         take: limit,
//         skip,
//         select: {
//           id: true,
//           productName: true,
//           description: true,
//           briefDescription: true,
//           slug: true,
//           logoUrl: true,
//           category: true,
//           pricingTier: true,
//           startingPrice: true,
//           freeTrial: true,
//           customPricing: true,
//           pricingModel: true,
//           targetUsers: true,
//           companyName: true,
//           headquarters: true,
//           founded: true,
//           founders: true,
//           website: true,
//           email: true,
//           phone: true,
//           coreFunctionalities: true,
//           keyFeatures: true,
//           deploymentOptions: true,
//           technologyStack: true,
//           primaryPurpose: true,
//           bestKnownFor: true,
//           topUseCases: true,
//           userSatisfaction: true,
//           criticalOpinions: true,
//           socialMedia: true,
//           images: true,
//           videos: true,
//           faqs: true,
//           lifecycleStages: true,
//           sources: true,
//           createdAt: true,
//         },
//         orderBy: [
//           { productName: 'asc' }
//         ]
//       });
  
//       const hasMore = skip + products.length < totalCount;
  
//       return NextResponse.json({
//         success: true,
//         products,
//         hasMore,
//         total: totalCount
//       });
  
//     } catch (error) {
//       console.error('Error searching legal software:', error);
//       return NextResponse.json(
//         { success: false, message: 'Failed to search legal software' },
//         { status: 500 }
//       );
//     }
//   }
// premium 
// /app/api/search-legal-softwares/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
      const { searchTerm, page = 1, limit = 12, filters } = await request.json();
      const skip = (page - 1) * limit;
  
      // Build the where clause for search and filters
      const where: any = {
        OR: [
          { productName: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { briefDescription: { contains: searchTerm, mode: 'insensitive' } },
          { companyName: { contains: searchTerm, mode: 'insensitive' } },
          { targetUsers: { contains: searchTerm, mode: 'insensitive' } },
          { primaryPurpose: { contains: searchTerm, mode: 'insensitive' } },
          { coreFunctionalities: { hasSome: [searchTerm] } },
          { bestKnownFor: { hasSome: [searchTerm] } },
          { topUseCases: { hasSome: [searchTerm] } },
        ]
      };
  
      // Apply additional filters
      if (filters) {
        // Category filter
        if (filters.categories?.length > 0) {
          where.AND = [...(where.AND || []), { category: { in: filters.categories } }];
        }
        
        // Pricing tier filter
        if (filters.pricingTiers?.length > 0) {
          where.AND = [...(where.AND || []), { pricingTier: { in: filters.pricingTiers } }];
        }
      }
  
      // Get total count for pagination
      const totalCount = await prisma.legalSoftware.count({ where });

      // Fetch all filtered products first
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
  
      const hasMore = skip + products.length < totalCount;
  
      return NextResponse.json({
        success: true,
        products,
        hasMore,
        total: totalCount,
        debug: {
          searchTerm,
          filtersApplied: where,
          premiumCount: premiumProducts.length,
          regularCount: regularProducts.length
        }
      });
  
    } catch (error) {
      console.error('Error searching legal software:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to search legal software' },
        { status: 500 }
      );
    }
  }

import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { page = 1, limit = 10, filters } = await request.json();
    console.log('Filters:', filters);
    const skip = (page - 1) * limit;

    // Build the where clause based on filters
    const where: any = {
      active: "publish",
    };

    if (filters) {
      if (filters.categories?.length > 0) {
        where.category = { hasSome: filters.categories };
      }
      if (filters.userCategory?.length > 0) {
        where.userCategory = { hasSome: filters.userCategory };
      }
      if (filters.language?.length > 0) {
        where.languages = { hasSome: filters.language };
      }
      if (filters.country?.length > 0) {
        where.focusCountries = { hasSome: filters.country };
      }
      if (filters.industry?.length > 0) {
        where.industry = { hasSome: filters.industry };
      }
      if (filters.practiceAreas?.length > 0) {
        where.practiceAreas = { hasSome: filters.practiceAreas };
      }
      if (filters.mobileAvailable?.length > 0) {
        where.mobileAvailable = { in: filters.mobileAvailable };
      }
      if (filters.price?.length > 0) {
        where.pricingModel = { hasSome: filters.price };
      }
    }

    // Get total count for pagination
    const totalCount = await prisma.product.count({ where });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where,
      take: limit,
      skip,
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        logoUrl: true,
        featured: true,
        category: true,
        active: true,
        deployement: true,
        mobileAvailable: true,
        focusCountries: true,
        avgTimeAdoption: true,
        languages: true,
        securityCertificate: true,
        integration: true,
        usp: true,
        userCategory: true,
        industry: true,
        practiceAreas: true,
        teamSize: true,
        freeTrial: true,
        freeVersion: true,
        pricingModel: true,
       CompanyName: true,             
  Headquarters: true,             
  ByAdminYearFounded: true,        
  ByAdminAwards: true,            
  ByAdminTeamSize: true,           
  ByAdminEmail: true,              
  ByAdminPhone: true,            
  ByAdminWebsite: true,           
        Review: {
          select: {
            overallExperienc: true,
            recommend: true,
          }
        },
        company: {
          select: {
            companyName: true,
            headQuaters: true,
          }
        }
      },
      orderBy: {
        featured: 'desc'
      }
    });

    // Calculate if there are more products
    const hasMore = skip + products.length < totalCount;

    return NextResponse.json({
      success: true,
      products,
      hasMore,
      total: totalCount
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

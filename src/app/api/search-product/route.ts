import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// app/api/search-products/route.ts
export async function POST(request: Request) {
    try {
      const { searchTerm, page = 1, limit = 10, filters } = await request.json();
      const skip = (page - 1) * limit;
  
      // Build the where clause for search and filters
      const where: any = {
        active: "publish",
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { category: { hasSome: [searchTerm] } },
          { userCategory: { hasSome: [searchTerm] } },
          { practiceAreas: { hasSome: [searchTerm] } },
        ]
      };
  
      // Apply additional filters
      if (filters) {
        if (filters.categories?.length > 0) {
          where.AND = [...(where.AND || []), { category: { hasSome: filters.categories } }];
        }
        if (filters.userCategory?.length > 0) {
          where.AND = [...(where.AND || []), { userCategory: { hasSome: filters.userCategory } }];
        }
        // ... apply other filters similarly
      }
  
      // Get total count for pagination
      const totalCount = await prisma.product.count({ where });
  
      // Fetch filtered products
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
        orderBy: [
          { featured: 'desc' },
          { name: 'asc' }
        ]
      });
  
      const hasMore = skip + products.length < totalCount;
  
      return NextResponse.json({
        success: true,
        products,
        hasMore,
        total: totalCount
      });
  
    } catch (error) {
      console.error('Error searching products:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to search products' },
        { status: 500 }
      );
    }
  }
  

// // app/api/analyses/[id]/route.ts (Get specific analysis by ID)
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';


// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
    
//     console.log(`📊 Fetching analysis ${id} from database...`);
    
//     const analysis = await prisma.companyAnalysis.findUnique({
//       where: { id },
//       include: {
//         articles: {
//           orderBy: { category: 'asc' }
//         }
//       }
//     });
    
//     if (!analysis) {
//       return NextResponse.json(
//         { error: 'Analysis not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log(`✅ Found analysis for ${analysis.companyName}`);
    
//     return NextResponse.json(analysis);
    
//   } catch (error) {
//     console.error('🚨 Database fetch error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch analysis', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }
// app/api/analyses/[id]/route.ts (Get specific analysis by ID with Company Info)
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Normalizes a string by removing spaces, special characters, and converting to lowercase
 */
function normalizeString(str: string | null | undefined): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // Remove everything except letters and numbers
}

/**
 * Check if two normalized strings match using multiple strategies
 */
function isMatch(str1: string, str2: string): boolean {
  const normalized1 = normalizeString(str1);
  const normalized2 = normalizeString(str2);
  
  if (!normalized1 || !normalized2) return false;
  
  // Strategy 1: ct match
  if (normalized1 === normalized2) return true;
  
  // Strategy 2: One contains the other (for cases like "MikeLegal IP Suite" vs "mike legal")
  // Only match if the shorter string is at least 3 characters to avoid false positives
  const shorter = normalized1.length <= normalized2.length ? normalized1 : normalized2;
  const longer = normalized1.length > normalized2.length ? normalized1 : normalized2;
  
  if (shorter.length >= 3 && longer.includes(shorter)) {
    return true;
  }
  
  return false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    console.log(`📊 Fetching analysis ${id} with company info matching...`);
    
    // Get the analysis
    const analysis = await prisma.companyAnalysis.findUnique({
      where: { id },
      include: {
        articles: {
          orderBy: { category: 'asc' }
        }
      }
    });
    
    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      );
    }
    
    // Get all products for matching
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        CompanyName: true,
        logoUrl: true,
        category: true,
        companyId: true,
        // Fallback fields from Product table
        Headquarters: true,
        ByAdminYearFounded: true,
        ByAdminTeamSize: true,
        ByAdminWebsite: true,
        FoundersNames: true,
        ByAdminAwards: true,
        ByAdminEmail: true,
        ByAdminPhone: true,
        websiteUrl: true
      }
    });
    
    // Find matching product
    const matchingProduct = products.find(product => {
      return isMatch(analysis.companyName, product.CompanyName || '') || 
             isMatch(analysis.companyName, product.name || '');
    });
    
    let companyInfo = null;
    
    if (matchingProduct) {
      console.log(`🎯 Found matching product: ${matchingProduct.name}`);
      
      // Try to get companyInfo if product has companyId
      let dbCompanyInfo = null;
      if (matchingProduct.companyId) {
        dbCompanyInfo = await prisma.companyInfo.findUnique({
          where: { id: matchingProduct.companyId }
        });
      }
      
      // Check if companyInfo has the required fields
      const hasRequiredFields = dbCompanyInfo && 
        (dbCompanyInfo.headQuaters || dbCompanyInfo.TeamSize || 
         dbCompanyInfo.yearFounded || dbCompanyInfo.website);
      
      if (hasRequiredFields) {
        // Use companyInfo table data
        console.log(`✅ Using companyInfo table data`);
        companyInfo = {
          source: 'companyInfo',
          companyName: dbCompanyInfo.companyName,
          website: dbCompanyInfo.website,
          yearFounded: dbCompanyInfo.yearFounded,
          headquarters: dbCompanyInfo.headQuaters,
          foundersNames: dbCompanyInfo.NameOfFounders,
          contact: dbCompanyInfo.contact,
          founderVision: dbCompanyInfo.founderVision,
          regionServed: dbCompanyInfo.regionServed,
          teamSize: dbCompanyInfo.TeamSize,
          awards: dbCompanyInfo.Awards,
          pointOfContactName: dbCompanyInfo.PointOfContactName,
          pointOfContactPhone: dbCompanyInfo.PointOfContactPhone,
          pointOfContactDesignation: dbCompanyInfo.PointOfContactDesignation,
          overview: dbCompanyInfo.overview,
          productInfo: {
            id: matchingProduct.id,
            name: matchingProduct.name,
            logoUrl: matchingProduct.logoUrl,
            category: matchingProduct.category
          }
        };
      } else {
        // Fallback to Product table data
        console.log(`📋 Falling back to Product table data`);
        companyInfo = {
          source: 'product',
          companyName: matchingProduct.CompanyName,
          website: matchingProduct.ByAdminWebsite || matchingProduct.websiteUrl,
          yearFounded: matchingProduct.ByAdminYearFounded,
          headquarters: matchingProduct.Headquarters,
          foundersNames: matchingProduct.FoundersNames?.join(', '),
          teamSize: matchingProduct.ByAdminTeamSize,
          awards: matchingProduct.ByAdminAwards,
          contact: matchingProduct.ByAdminEmail || matchingProduct.ByAdminPhone,
          productInfo: {
            id: matchingProduct.id,
            name: matchingProduct.name,
            logoUrl: matchingProduct.logoUrl,
            category: matchingProduct.category
          }
        };
      }
    } else {
      console.log(`❌ No matching product found for: ${analysis.companyName}`);
    }
    
    console.log(`✅ Found analysis for ${analysis.companyName} with ${companyInfo ? 'company info' : 'no company info'}`);
    
    // Return analysis with company info
    return NextResponse.json({
      ...analysis,
      companyInfo,
      hasCompanyInfo: !!companyInfo
    });
    
  } catch (error) {
    console.error('🚨 Database fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
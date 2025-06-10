
// // app/api/company/check/route.ts (Check if company exists & handle analysis)
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";


// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { companyName } = body;
    
//     if (!companyName || typeof companyName !== 'string') {
//       return NextResponse.json(
//         { error: 'Company name is required' },
//         { status: 400 }
//       );
//     }
    
//     console.log(`🔍 Checking if company "${companyName}" already exists...`);
    
//     // Check if analysis already exists (case-insensitive)
//     const existingAnalysis = await prisma.companyAnalysis.findFirst({
//       where: {
//         companyName: {
//           equals: companyName,
//           mode: 'insensitive'
//         }
//       },
//       orderBy: {
//         createdAt: 'desc' // Get most recent if multiple exist
//       }
//     });
    
//     if (existingAnalysis) {
//       console.log(`✅ Found existing analysis for ${companyName} - ID: ${existingAnalysis.id}`);
      
//       return NextResponse.json({
//         exists: true,
//         analysisId: existingAnalysis.id,
//         redirectUrl: `/competitor_analysis/${existingAnalysis.id}`,
//         message: `Analysis for ${companyName} already exists`,
//         createdAt: existingAnalysis.createdAt
//       });
//     }
    
//     console.log(`❌ No existing analysis found for ${companyName}`);
    
//     return NextResponse.json({
//       exists: false,
//       message: `No analysis found for ${companyName}. Ready to create new analysis.`,
//       shouldAnalyze: true
//     });
    
//   } catch (error) {
//     console.error('🚨 Company check error:', error);
//     return NextResponse.json(
//       { error: 'Failed to check company', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }
// app/api/company/check/route.ts (Check if company exists & handle analysis)
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

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
  
  // Strategy 1: Exact match
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName } = body;
    
    if (!companyName || typeof companyName !== 'string') {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Checking if company "${companyName}" already exists using complex matching...`);
    
    // Get all existing analyses for complex matching
    const allAnalyses = await prisma.companyAnalysis.findMany({
      select: {
        id: true,
        companyName: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Find matching analysis using complex string matching
    const matchingAnalysis = allAnalyses.find(analysis => 
      isMatch(companyName, analysis.companyName)
    );
    
    if (matchingAnalysis) {
      console.log(`✅ Found existing analysis for ${companyName} (matched with "${matchingAnalysis.companyName}") - ID: ${matchingAnalysis.id}`);
      
      return NextResponse.json({
        exists: true,
        analysisId: matchingAnalysis.id,
        redirectUrl: `/competitor_analysis/${matchingAnalysis.id}`,
        message: `Analysis for ${companyName} already exists (matched with "${matchingAnalysis.companyName}")`,
        matchedCompanyName: matchingAnalysis.companyName,
        createdAt: matchingAnalysis.createdAt
      });
    }
    
    console.log(`❌ No existing analysis found for ${companyName} using complex matching`);
    
    return NextResponse.json({
      exists: false,
      message: `No analysis found for ${companyName}. Ready to create new analysis.`,
      shouldAnalyze: true
    });
    
  } catch (error) {
    console.error('🚨 Company check error:', error);
    return NextResponse.json(
      { error: 'Failed to check company', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
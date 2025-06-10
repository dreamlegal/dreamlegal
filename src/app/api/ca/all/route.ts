import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // If no limit is specified or limit is 'all', return all companies
    const isAll = !limitParam || limitParam === 'all';
    const limit = isAll ? undefined : parseInt(limitParam);
    
    console.log(`📊 Fetching ${isAll ? 'all' : limit} analyzed companies with flexible product matching...`);
    
    // Get all company analyses
    const analyses = await prisma.companyAnalysis.findMany({
      select: {
        id: true,
        companyName: true,
        totalArticlesCount: true,
        createdAt: true,
        _count: {
          select: {
            articles: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      ...(limit && { take: limit }),
      ...(offset > 0 && { skip: offset })
    });
    
    // Get all products for matching
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        CompanyName: true,
        logoUrl: true,
        category: true
      }
    });
    
    // Match analyses with products using flexible comparison
    const enrichedAnalyses = analyses.map(analysis => {
      // Find matching product using flexible matching
      const matchingProduct = products.find(product => {
        return isMatch(analysis.companyName, product.CompanyName || '') || 
               isMatch(analysis.companyName, product.name || '');
      });
      
      return {
        ...analysis,
        product: matchingProduct ? {
          id: matchingProduct.id,
          logoUrl: matchingProduct.logoUrl,
          category: matchingProduct.category,
          productName: matchingProduct.name
        } : null,
        hasProductMatch: !!matchingProduct
      };
    });
    
    const totalCount = await prisma.companyAnalysis.count();
    
    console.log(`✅ Found ${analyses.length} analyses, ${enrichedAnalyses.filter(a => a.hasProductMatch).length} with product matches`);
    
    return NextResponse.json({
      companies: enrichedAnalyses,
      pagination: {
        total: totalCount,
        limit: limit || totalCount,
        offset,
        hasMore: limit ? offset + limit < totalCount : false,
        isAll
      }
    });
    
  } catch (error) {
    console.error('🚨 Analyzed companies fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analyzed companies', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
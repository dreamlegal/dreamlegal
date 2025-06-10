// app/api/dashboard/route.ts (Home page data API)
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";


export async function GET(request: NextRequest) {
  try {
    console.log(`📊 Fetching dashboard data...`);
    
    // Get random 5 analyses with their articles
    const randomAnalyses = await prisma.companyAnalysis.findMany({
      include: {
        articles: {
          take: 3, // Limit articles per company for display
          orderBy: { category: 'asc' }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    
    // Get category statistics across all articles
    const categoryStats = await prisma.analyzedArticle.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    });
    
    // Ensure all categories are represented
    const allCategories = [
      'Funding', 'Partnerships', 'Client wins', 'Feature launches',
      'Geographic expansion', 'Talent moves', 'Reports', 'Beta programs',
      'Event participation', 'Miscellaneous'
    ];
    
    const categoryMap = categoryStats.reduce((acc, stat) => {
      acc[stat.category] = stat._count.category;
      return acc;
    }, {} as Record<string, number>);
    
    const chartData = allCategories.map(category => ({
      category,
      count: categoryMap[category] || 0
    }));
    
    // Get total counts for overview
    const totalAnalyses = await prisma.companyAnalysis.count();
    const totalArticles = await prisma.analyzedArticle.count();
    
    console.log(`✅ Dashboard data prepared - ${randomAnalyses.length} analyses, ${categoryStats.length} categories`);
    
    return NextResponse.json({
      randomArticles: randomAnalyses.flatMap(analysis => 
        analysis.articles.map(article => ({
          id: article.id,
          title: article.title,
          url: article.url,
          category: article.category,
          companyName: analysis.companyName,
          analysisId: analysis.id
        }))
      ).slice(0, 15), // Take up to 15 articles total
      categoryChart: chartData,
      overview: {
        totalAnalyses,
        totalArticles,
        categoriesUsed: categoryStats.length
      }
    });
    
  } catch (error) {
    console.error('🚨 Dashboard data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}



import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log('🔍 API: Market Intelligence GET request received');
  
  try {
    console.log('📊 API: Attempting to fetch market intelligence data...');
    
    // Fetch the most recent market intelligence data
    const marketIntelligence = await prisma.marketIntelligence.findFirst({
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        insights: true,
        dashboardData: true,
        miData: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('📋 API: Database query result:', {
      found: !!marketIntelligence,
      id: marketIntelligence?.id,
      hasInsights: !!marketIntelligence?.insights,
      insightsType: typeof marketIntelligence?.insights,
      createdAt: marketIntelligence?.createdAt
    });

    if (!marketIntelligence) {
      console.log('❌ API: No market intelligence data found in database');
      return NextResponse.json(
        { 
          success: false, 
          message: 'No market intelligence data found',
          insights: {},
          debug: 'No records found in MarketIntelligence table'
        },
        { status: 404 }
      );
    }

    // Debug the insights data structure
    console.log('🔍 API: Insights data structure:');
    if (marketIntelligence.insights) {
      console.log('📊 API: Insights keys:', Object.keys(marketIntelligence.insights));
      
      // Log first level of insights structure
      Object.entries(marketIntelligence.insights).forEach(([key, value]) => {
        console.log(`📋 API: ${key}:`, {
          type: typeof value,
          hasDataHeaderName: value?.data_header_name,
          subKeys: typeof value === 'object' ? Object.keys(value) : 'Not an object'
        });
      });
    } else {
      console.log('❌ API: insights field is null or undefined');
    }

    const response = {
      success: true,
      data: marketIntelligence,
      insights: marketIntelligence.insights || {},
      debug: {
        recordId: marketIntelligence.id,
        hasInsights: !!marketIntelligence.insights,
        insightsKeys: marketIntelligence.insights ? Object.keys(marketIntelligence.insights) : [],
        dataCount: marketIntelligence.insights ? Object.keys(marketIntelligence.insights).length : 0
      }
    };

    console.log('✅ API: Sending response:', {
      success: response.success,
      hasData: !!response.data,
      insightsKeysCount: Object.keys(response.insights).length,
      debug: response.debug
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ API: Error fetching market intelligence:', error);
    console.error('❌ API: Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch market intelligence data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        insights: {},
        debug: {
          errorMessage: error.message,
          errorCode: error.code
        }
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  console.log('📝 API: Market Intelligence POST request received');
  
  try {
    const body = await request.json();
    console.log('📊 API: Request body keys:', Object.keys(body));
    
    const { insights, dashboardData, miData } = body;

    // Validate required fields
    if (!insights) {
      console.log('❌ API: Insights data is missing from request');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Insights data is required' 
        },
        { status: 400 }
      );
    }

    console.log('📋 API: Creating new market intelligence record...');
    console.log('📊 API: Insights structure:', {
      type: typeof insights,
      keys: typeof insights === 'object' ? Object.keys(insights) : 'Not an object'
    });

    // Create new market intelligence record
    const marketIntelligence = await prisma.marketIntelligence.create({
      data: {
        insights,
        dashboardData: dashboardData || null,
        miData: miData || null
      }
    });

    console.log('✅ API: Market intelligence created with ID:', marketIntelligence.id);

    return NextResponse.json({
      success: true,
      message: 'Market intelligence data created successfully',
      data: marketIntelligence
    });

  } catch (error) {
    console.error('❌ API: Error creating market intelligence:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create market intelligence data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  console.log('✏️ API: Market Intelligence PUT request received');
  
  try {
    const body = await request.json();
    const { id, insights, dashboardData, miData } = body;

    if (!id) {
      console.log('❌ API: ID is missing from request');
      return NextResponse.json(
        { 
          success: false, 
          message: 'ID is required for update' 
        },
        { status: 400 }
      );
    }

    console.log('📋 API: Updating market intelligence record:', id);

    // Update existing market intelligence record
    const marketIntelligence = await prisma.marketIntelligence.update({
      where: { id },
      data: {
        insights: insights || undefined,
        dashboardData: dashboardData || undefined,
        miData: miData || undefined
      }
    });

    console.log('✅ API: Market intelligence updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Market intelligence data updated successfully',
      data: marketIntelligence
    });

  } catch (error) {
    console.error('❌ API: Error updating market intelligence:', error);
    
    if (error.code === 'P2025') {
      console.log('❌ API: Record not found for update');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Market intelligence record not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update market intelligence data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// app/api/public-mi/route.js
// import { NextResponse } from 'next/server';

// // Mock data with varied values for better charts
// const mockInsightsData = {
//   "Competitive Intel": {
//     "data_header_name": "Competitive Intel",
//     "Key Feature Types": {
//       "graph": {
//         "type": "bar",
//         "fields": ["caseStudies", "valueMetrics", "vendorComments", "isPremium", "tag"],
//         "prompt": "Horizontal bar chart: Feature Type vs Tool Count",
//         "heading": "Feature Type Distribution Across Tools",
//         "response": "Contract Lifecycle Management: 8, Legal AI: 6, Document Management System: 7, E-discovery: 4, IP Management: 5, Legal Research: 3, Litigation Management and Analytics: 6"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["slug", "productName", "description", "technologyStack", "topUseCases"],
//         "prompt": "List of top 10 feature categories with vendor count",
//         "heading": "List of top 10 feature categories with vendor count",
//         "response": [
//           "Contract Lifecycle Management: 10 vendors - Leading market segment with comprehensive solutions",
//           "Legal AI: 8 vendors - Rapidly growing segment with automation focus",
//           "Document Management System: 9 vendors - Essential infrastructure for legal operations",
//           "E-discovery: 7 vendors - Specialized tools for litigation support",
//           "IP Management: 6 vendors - Niche but critical for IP-focused firms",
//           "Legal Research: 5 vendors - Traditional segment with AI enhancement trends"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["productName", "description", "criticalOpinions", "caseStudies"],
//         "prompt": "Highlights crowded and niche feature areas",
//         "heading": "Market Saturation Analysis",
//         "response": [
//           "Contract Lifecycle Management shows highest market saturation with varied vendor capabilities",
//           "Legal AI segment experiencing rapid growth with different specialization levels",
//           "Document Management remains foundational but shows clear market leaders",
//           "E-discovery tools maintain specialization with distinct feature sets",
//           "IP Management serves niche markets with varied pricing strategies",
//           "Legal Research tools show clear differentiation in AI capabilities"
//         ]
//       }
//     },
//     "Top Functionalities": {
//       "graph": {
//         "type": "bar",
//         "fields": ["productName", "coreFunctionalities", "keyFeatures"],
//         "prompt": "Horizontal bar chart: Functionality vs Vendor Count",
//         "heading": "Vendor Functionality Scores",
//         "response": "Contract Lifecycle Management: SpotDraft: 9, ContractWorks: 7, PandaDoc: 8, DocuSign CLM: 6, Ironclad: 8, Concord: 5, Outlaw: 6, Juro: 7"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["productName", "coreFunctionalities", "keyFeatures"],
//         "prompt": "Ranked list with descriptions, top 3 vendors",
//         "heading": "Top Vendor Capabilities",
//         "response": [
//           "SpotDraft leads with comprehensive AI-powered contract analysis scoring 9/10",
//           "PandaDoc excels in document workflow automation with 8/10 functionality",
//           "Ironclad provides strong enterprise-grade contract management at 8/10",
//           "ContractWorks offers solid mid-market solutions scoring 7/10",
//           "Juro delivers good cloud-native contract platform at 7/10",
//           "DocuSign CLM provides basic but reliable functionality at 6/10"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["userSatisfaction", "topUseCases", "criticalOpinions", "bestKnownFor"],
//         "prompt": "Shows buyer-centric functionalities",
//         "heading": "Market Leadership Analysis",
//         "response": [
//           "SpotDraft demonstrates clear market leadership with highest functionality scores",
//           "PandaDoc and Ironclad tie for second place showing strong competitive positions",
//           "Mid-tier vendors (ContractWorks, Juro) serve specific market segments effectively",
//           "Lower-scoring vendors focus on niche use cases and price competitiveness",
//           "Functionality scores correlate strongly with customer satisfaction ratings",
//           "Market shows clear tiering with distinct value propositions per tier"
//         ]
//       }
//     },
//     "Market Trends": {
//       "graph": {
//         "type": "line",
//         "fields": ["trendData", "marketGrowth", "adoptionRates"],
//         "prompt": "Line chart showing market growth trends",
//         "heading": "Legal Tech Market Growth Trends (Millions USD)",
//         "response": "Q1 2023: 35, Q2 2023: 48, Q3 2023: 42, Q4 2023: 65, Q1 2024: 78, Q2 2024: 89"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["marketSize", "growthRate", "keyTrends"],
//         "prompt": "Market trend analysis",
//         "heading": "Key Market Trends and Projections",
//         "response": [
//           "Legal tech market showing accelerating growth with 35M to 89M progression",
//           "Q4 2023 marked significant inflection point with 65M milestone",
//           "2024 showing sustained growth momentum with 78M and 89M quarterly results",
//           "Small seasonal dip in Q3 2023 followed by strong recovery"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["marketOpportunities", "challenges", "predictions"],
//         "prompt": "Strategic market insights",
//         "heading": "Strategic Market Opportunities",
//         "response": [
//           "Growth trajectory suggests market will exceed 100M by Q4 2024",
//           "Seasonal patterns indicate Q3 softness followed by Q4 acceleration",
//           "2024 momentum indicates sustained enterprise adoption driving growth",
//           "Market maturation creating opportunities for specialized solutions"
//         ]
//       }
//     },
//     "Pricing Analysis": {
//       "graph": {
//         "type": "pie",
//         "fields": ["pricingTier", "features", "userCount"],
//         "prompt": "Pie chart: Market share by pricing tier",
//         "heading": "Market Share by Pricing Tier",
//         "response": "Basic Plans: 25%, Professional: 45%, Enterprise: 25%, Custom: 5%"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["pricingModel", "averageCost", "valueProposition"],
//         "prompt": "Pricing model analysis",
//         "heading": "Pricing Model Analysis",
//         "response": [
//           "Professional tier dominates with 45% market share indicating sweet spot pricing",
//           "Basic and Enterprise tiers equally balanced at 25% each",
//           "Custom solutions remain niche at 5% for specialized requirements",
//           "Pricing distribution suggests healthy market segmentation"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["pricingSensitivity", "budgetAllocation", "costBenefitAnalysis"],
//         "prompt": "Pricing insights and recommendations",
//         "heading": "Pricing Strategy Insights",
//         "response": [
//           "Professional tier represents optimal price-value balance for most customers",
//           "Equal split between Basic and Enterprise suggests clear market segmentation",
//           "Low custom percentage indicates standardized solutions meet most needs",
//           "Pricing tiers effectively capture different customer segments and budgets"
//         ]
//       }
//     }
//   },
//   "Customer Intelligence": {
//     "data_header_name": "Customer Intelligence",
//     "Buyer Personas": {
//       "graph": {
//         "type": "scatter",
//         "fields": ["firmSize", "budgetRange", "adoptionStage"],
//         "prompt": "Scatter plot: Firm size vs Budget allocation",
//         "heading": "Legal Firm Segments by Size and Budget",
//         "response": "Small Firms: (6.5, 35000), Mid-size Firms: (7.8, 180000), Large Firms: (8.9, 850000), Enterprise: (9.2, 2800000)"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["personaType", "painPoints", "buyingCriteria"],
//         "prompt": "Buyer persona characteristics",
//         "heading": "Primary Buyer Personas",
//         "response": [
//           "Small Firms: Budget-conscious with $35K average, prioritize ease of use",
//           "Mid-size Firms: Growth-focused with $180K budgets, seek scalability",
//           "Large Firms: Efficiency-driven with $850K investments, need integration",
//           "Enterprise: Strategic buyers with $2.8M budgets, require customization"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["decisionFactors", "buyingProcess", "influencers"],
//         "prompt": "Buyer decision insights",
//         "heading": "Key Buying Decision Factors",
//         "response": [
//           "Clear budget tiers correlate with firm size and feature requirements",
//           "Satisfaction scores increase with firm size and budget allocation",
//           "Enterprise segment shows highest satisfaction despite premium pricing",
//           "Small firms achieve good value despite budget constraints"
//         ]
//       }
//     },
//     "Usage Patterns": {
//       "graph": {
//         "type": "area",
//         "fields": ["monthlyUsage", "featureAdoption", "userEngagement"],
//         "prompt": "Area chart showing usage patterns over time",
//         "heading": "Feature Adoption and Usage Trends",
//         "response": "Jan: 95, Feb: 145, Mar: 210, Apr: 280, May: 420, Jun: 520"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["usageMetrics", "adoptionRates", "userBehavior"],
//         "prompt": "Usage pattern analysis",
//         "heading": "User Engagement and Adoption Patterns",
//         "response": [
//           "Steady adoption growth from 95 to 520 users over 6 months",
//           "Acceleration in Q2 with April-May showing 140-point monthly gains",
//           "June reaching 520 users represents 447% growth from January",
//           "Consistent month-over-month growth indicates strong product-market fit"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["behaviorInsights", "engagementDrivers", "retentionFactors"],
//         "prompt": "User behavior insights",
//         "heading": "User Behavior and Retention Insights",
//         "response": [
//           "Exponential growth pattern suggests viral adoption and strong word-of-mouth",
//           "Q2 acceleration indicates product improvements or market expansion",
//           "High growth sustainability suggests effective onboarding and retention",
//           "Usage trajectory supports continued investment in user experience"
//         ]
//       }
//     },
//     "Satisfaction Metrics": {
//       "graph": {
//         "type": "bar",
//         "fields": ["satisfactionScore", "featureRating", "supportRating"],
//         "prompt": "Bar chart: Satisfaction metrics by category",
//         "heading": "Customer Satisfaction Metrics by Category",
//         "response": "Overall Satisfaction: 8, Feature Quality: 7, Support Quality: 9, Value for Money: 6, Ease of Use: 7"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["npsScore", "satisfactionDrivers", "improvementAreas"],
//         "prompt": "Customer satisfaction analysis",
//         "heading": "Customer Satisfaction Analysis",
//         "response": [
//           "Support Quality leads satisfaction metrics with 9/10 rating",
//           "Overall Satisfaction maintains strong 8/10 performance",
//           "Feature Quality and Ease of Use both score solid 7/10",
//           "Value for Money shows room for improvement at 6/10"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["satisfactionTrends", "churnPredictors", "loyaltyDrivers"],
//         "prompt": "Satisfaction insights and trends",
//         "heading": "Customer Loyalty and Retention Insights",
//         "response": [
//           "Excellent support quality drives overall customer satisfaction",
//           "Value perception represents primary improvement opportunity",
//           "Feature quality and usability meet customer expectations",
//           "Strong support foundation enables customer success and retention"
//         ]
//       }
//     }
//   },
//   "Product Intelligence": {
//     "data_header_name": "Product Intelligence",
//     "Feature Comparison": {
//       "graph": {
//         "type": "bar",
//         "fields": ["featureCompleteness", "innovationScore", "usabilityRating"],
//         "prompt": "Bar chart: Product feature comparison",
//         "heading": "Product Feature Completeness Comparison",
//         "response": "Contract AI: 9, Document Mgmt: 8, Legal Research: 7, E-discovery: 6, IP Management: 5, Compliance: 8"
//       },
//       "content": {
//         "type": "point",
//         "fields": ["coreFeatures", "advancedCapabilities", "integrationOptions"],
//         "prompt": "Feature comparison analysis",
//         "heading": "Core Feature Analysis",
//         "response": [
//           "Contract AI leads feature completeness with 9/10 comprehensive capabilities",
//           "Document Management and Compliance tie at 8/10 for strong core functionality",
//           "Legal Research provides solid 7/10 coverage for research needs",
//           "E-discovery offers specialized 6/10 functionality for litigation support",
//           "IP Management serves niche requirements with 5/10 focused feature set"
//         ]
//       },
//       "insights": {
//         "type": "point",
//         "fields": ["innovationTrends", "technologyGaps", "futureCapabilities"],
//         "prompt": "Product innovation insights",
//         "heading": "Innovation Trends and Technology Gaps",
//         "response": [
//           "Contract AI dominates innovation with advanced machine learning capabilities",
//           "Document Management shows maturity with comprehensive workflow features",
//           "Compliance maintains competitive edge with regulatory automation",
//           "Legal Research faces disruption from AI-powered alternatives",
//           "Specialized tools (E-discovery, IP) maintain relevance through deep expertise"
//         ]
//       }
//     }
//   }
// };

// export async function GET() {
//   console.log('🔍 API: Public MI GET request received');
  
//   try {
//     console.log('📊 API: Returning mock insights data with varied values');
    
//     const response = {
//       success: true,
//       data: {
//         id: 'mock-data-id',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         insights: mockInsightsData,
//         dashboardData: {
//           totalVendors: 45,
//           marketSize: "25B",
//           growthRate: "15%",
//           lastUpdated: new Date().toISOString(),
//           activeCustomers: 12500,
//           marketSegments: 8
//         },
//         miData: {
//           reportVersion: "1.0",
//           dataSource: "Mock Market Intelligence Data",
//           confidence: "High",
//           lastAnalyzed: new Date().toISOString()
//         }
//       },
//       insights: mockInsightsData,
//       debug: {
//         recordId: 'mock-data-id',
//         hasInsights: true,
//         insightsKeys: Object.keys(mockInsightsData),
//         dataCount: Object.keys(mockInsightsData).length,
//         mockData: true
//       }
//     };

//     console.log('✅ API: Sending mock response with varied chart data');

//     return NextResponse.json(response);

//   } catch (error) {
//     console.error('❌ API: Error returning mock data:', error);
    
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to fetch market intelligence data',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined,
//         insights: {},
//         debug: {
//           errorMessage: error.message,
//           mockData: true
//         }
//       },
//       { status: 500 }
//     );
//   }
// }

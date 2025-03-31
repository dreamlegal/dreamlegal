import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests to fetch analytics data
export async function GET(request: NextRequest) {
  try {
    // Get all published products
    const products = await prisma.product.findMany({
      where: {
        active: "publish",
      },
      include: {
        company: true,
        Review: {
          select: {
            overallExperienc: true,
            recommend: true,
          },
        },
      },
    });

    // Total listings count
    const totalListings = products.length;

    // Category distribution
    const categories = [
      "Client Relationship Management",
      "Governance, Risk and Compliance",
      "Contract Lifecycle Management",
      "E-Signature",
      "Document Management System",
      "E-billing and Invoicing",
      "E-discovery",
      "Intellectual Property Management",
      "Litigation Management and Analytics",
      "Legal Workflow Automation",
      "Legal Research",
    ];

    const categoryDistribution = categories.map((category) => {
      const count = products.filter((product) =>
        product.category.includes(category)
      ).length;
      return {
        category,
        count,
      };
    }).sort((a, b) => b.count - a.count);

    // User Category distribution
    const userCategories = [
      "Individual Practitioner",
      "Law firms",
      "Government departments",
      "Startups",
      "Enterprises",
      "Judiciary",
      "In-House Counsels",
    ];

    const userCategoryDistribution = userCategories.map((userCategory) => {
      const count = products.filter((product) =>
        product.userCategory.some((uc) => uc.startsWith(`${userCategory}|`))
      ).length;
      return {
        category: userCategory,
        count,
      };
    }).sort((a, b) => b.count - a.count);

    // Pricing model distribution
    const pricingModels = [
      { id: 'Annual Fee', name: 'Annual Subscription' },
      { id: 'Monthly subscription', name: 'Monthly subscription' },
      { id: 'Perpetual', name: 'Perpetual' },
      { id: 'Volume based', name: 'Volume based' },
      { id: 'One time', name: 'One time' }
    ];

    const pricingDistribution = pricingModels.map((pricing) => {
      const count = products.filter((product) =>
        product.pricingModel.includes(pricing.id)
      ).length;
      return {
        model: pricing.name,
        id: pricing.id,
        count,
      };
    }).sort((a, b) => b.count - a.count);

    // Headquarters distribution with city to country mapping
    const cityToCountryMap = {
      // India cities
      "Mumbai, Maharashtra": "India",
      "Bangalore, Karnataka": "India",
      "Delhi": "India",
      "New Delhi": "India",
      "Hyderabad": "India",
      "Chennai": "India",
      "Kolkata": "India",
      "Pune": "India",
      
      // US cities
      "Dallas, Texas": "United States",
      "New York": "United States",
      "Chicago": "United States",
      "San Francisco": "United States",
      "Los Angeles": "United States",
      "Seattle": "United States",
      "Boston": "United States",
      "Austin": "United States",
      "Miami": "United States",
      "Washington, D.C.": "United States",
      "San Jose": "United States",
      "Atlanta": "United States",
      "Denver": "United States",
      "Phoenix": "United States",
      
      // UK cities
      "London": "United Kingdom",
      "Manchester": "United Kingdom",
      "Birmingham": "United Kingdom",
      "Edinburgh": "United Kingdom",
      "Glasgow": "United Kingdom",
      
      // Canada cities
      "Toronto": "Canada",
      "Vancouver": "Canada",
      "Montreal": "Canada",
      "Ottawa": "Canada",
      "Calgary": "Canada",
      
      // Australia cities
      "Sydney": "Australia",
      "Melbourne": "Australia",
      "Brisbane": "Australia",
      "Perth": "Australia",
      
      // Germany cities
      "Berlin": "Germany",
      "Munich": "Germany",
      "Hamburg": "Germany",
      "Frankfurt": "Germany",
      
      // Handle specific cases
      "Korea, South": "South Korea"
    };

    const headquartersDistribution = [];
    const headquartersMap = new Map<string, number>();

    products.forEach((product) => {
      let hq = product.Headquarters || (product.company && product.company.headQuaters) || "Unknown";
      
      // Map cities to countries
      if (cityToCountryMap[hq]) {
        hq = cityToCountryMap[hq];
      }
      
      // Consolidate entries
      if (headquartersMap.has(hq)) {
        headquartersMap.set(hq, headquartersMap.get(hq) + 1);
      } else {
        headquartersMap.set(hq, 1);
      }
    });

    headquartersMap.forEach((count, country) => {
      headquartersDistribution.push({
        country,
        count,
      });
    });

    // Unique country count
    const totalHeadquartersCount = headquartersMap.size;

    // Founding year distribution
    const foundingYearRanges = [
      { range: "Before 2000", min: 0, max: 1999 },
      { range: "2000-2005", min: 2000, max: 2005 },
      { range: "2006-2010", min: 2006, max: 2010 },
      { range: "2011-2015", min: 2011, max: 2015 },
      { range: "2016-2020", min: 2016, max: 2020 },
      { range: "2021-Present", min: 2021, max: 9999 },
    ];

    const foundingYearDistribution = foundingYearRanges.map((range) => {
      const count = products.filter((product) => {
        const yearFounded = product.ByAdminYearFounded || 
                          (product.company && product.company.yearFounded) || null;
        if (!yearFounded) return false;
        
        const year = parseInt(yearFounded);
        return !isNaN(year) && year >= range.min && year <= range.max;
      }).length;
      
      return {
        range: range.range,
        count,
      };
    });

    // Deployment type distribution
    const deploymentTypes = [
      { id: 'On-premise', name: 'On premise deployment' },
      { id: 'Cloud', name: 'Cloud based deployment' },
      { id: 'Hybrid', name: 'Hybrid deployment' },
      { id: 'SaaS', name: 'Software as a Service' },
    ];

    const deploymentDistribution = deploymentTypes.map((deployment) => {
      const count = products.filter((product) =>
        product.deployement.includes(deployment.id)
      ).length;
      return {
        type: deployment.name,
        id: deployment.id,
        count,
      };
    });

    // Mobile availability
    const mobileAvailable = products.filter(
      (product) => product.mobileAvailable === "Yes"
    ).length;

    // Average recommendation score from reviews
    let totalRecommendations = 0;
    let totalReviews = 0;

    products.forEach((product) => {
      if (product.Review && product.Review.length > 0) {
        product.Review.forEach((review) => {
          if (typeof review.recommend === 'number') {
            totalRecommendations += review.recommend;
            totalReviews++;
          }
        });
      }
    });

    const averageRecommendation = totalReviews > 0 
      ? (totalRecommendations / totalReviews).toFixed(1) 
      : "N/A";

    const response = {
      totalListings,
      categoryDistribution,
      userCategoryDistribution,
      pricingDistribution,
      headquartersDistribution,
      foundingYearDistribution,
      deploymentDistribution,
      mobileAvailable,
      totalHeadquartersCount,
      mobileNotAvailable: totalListings - mobileAvailable,
      averageRecommendation,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
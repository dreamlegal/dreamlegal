// app/api/admin/dashboard/stats/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get counts for dashboard stats
    const productsCount = await prisma.product.count();
    
    // Vendors are users with company info
    const vendorsCount = await prisma.user.count({
      where: {
        companyInfo: {
          some: {} // Has at least one company info record
        }
      },
    });
    
    // Get pending product claims count
    const claimsCount = await prisma.productClaim.count();
    
    // Aggregate all lead types
    const [demoLeadsCount, potentialLeadCount, vendorLeadsCount, commonLeadCount] = await Promise.all([
      prisma.demoLeads.count(),
      prisma.potentialLead.count(),
      prisma.vendorLeads.count(),
      prisma.commonLead.count(),
    ]);
    
    const totalLeadsCount = demoLeadsCount + potentialLeadCount + vendorLeadsCount + commonLeadCount;
    
    // Get recent activities
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Recent products
    const recentProducts = await prisma.product.findMany({
      where: { 
        createdAt: { gte: thirtyDaysAgo } 
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, createdAt: true }
    });
    
    // Recent product claims
    const recentClaims = await prisma.productClaim.findMany({
      where: { 
        createdAt: { gte: thirtyDaysAgo } 
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        product: { select: { name: true } },
        vendor: { select: { name: true, email: true } }
      }
    });
    
    // Recent blog posts
    const recentBlogs = await prisma.blog.findMany({
      where: { 
        published: true, 
        publishedAt: { gte: thirtyDaysAgo } 
      },
      orderBy: { publishedAt: "desc" },
      take: 10,
      select: { id: true, title: true, publishedAt: true }
    });
    
    // For companyInfo which doesn't have createdAt field, get most recent users with company info
    const recentVendors = await prisma.user.findMany({
      where: {
        companyInfo: { some: {} }, // Users with company info
        createdAt: { gte: thirtyDaysAgo } // Filter by user creation date instead
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        companyInfo: {
          select: {
            id: true,
            companyName: true
          },
          take: 1
        }
      }
    });
    
    // Recent leads
    const recentLeads = await prisma.commonLead.findMany({
      where: { 
        createdAt: { gte: thirtyDaysAgo } 
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, organization: true, createdAt: true }
    });
    
    // Combine all activities into a single array
    const allActivities = [
      // Products
      ...recentProducts.map(product => ({
        id: `product-${product.id}`,
        action: "New product added:",
        subject: product.name,
        timestamp: product.createdAt.toISOString(),
        link: `/admin/products`
      })),
      
      // Claims
      ...recentClaims.map(claim => ({
        id: `claim-${claim.id}`,
        action: "Product claim request from",
        subject: claim.vendor?.name || claim.vendor?.email || "Unknown vendor",
        timestamp: claim.createdAt.toISOString(),
        link: `/admin/products/claims`
      })),
      
      // Blogs
      ...recentBlogs.filter(blog => blog.publishedAt).map(blog => ({
        id: `blog-${blog.id}`,
        action: "New blog post published:",
        subject: blog.title,
        timestamp: blog.publishedAt.toISOString(),
        link: `/admin/blog`
      })),
      
      // Vendors - we're now using user creation date
      ...recentVendors.map(vendor => ({
        id: `vendor-${vendor.id}`,
        action: "New vendor registered:",
        subject: vendor.companyInfo[0]?.companyName || vendor.name || vendor.email || "Unknown company",
        timestamp: vendor.createdAt.toISOString(),
        link: `/admin/vendors`
      })),
      
      // Leads
      ...recentLeads.map(lead => ({
        id: `lead-${lead.id}`,
        action: "New lead generated for",
        subject: lead.organization,
        timestamp: lead.createdAt.toISOString(),
        link: `/admin/leads`
      }))
    ];
    
    // Sort by timestamp (newest first) and limit to 5
    const sortedActivities = allActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
    
    return NextResponse.json({
      stats: {
        products: productsCount,
        vendors: vendorsCount,
        claims: claimsCount,
        leads: totalLeadsCount
      },
      recentActivity: sortedActivities
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Implement any POST functionality here
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
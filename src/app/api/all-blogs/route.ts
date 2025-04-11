import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        bannerImage: true,
        category: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        htmlTitle: true,
        metaDescription: true,
        ogTitle: true,
        ogUrl: true,
        ogImage: true,
        slug: true,
        refLinks: true,
        tocItems: true,
        // content is intentionally excluded
      },
    });

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


export async function POST(req) {
  try {
    // Hardcoded blog titles to update
    const blogTitles = [
        "Corporate Law in India: A Primer for Global Investors",
        "Indemnity: From Ancient Assurances to Modern Risk Management",
        "Wagering Contracts in India: Legal Prohibitions, Exemptions, and Judicial  Interpretations",
        "Understanding the role of an Authorised Signatory ",
        "What is wet signatures? ",
        "Understanding Guarantee Contracts: Surety's Role.",
        "Statutory Compliances Meaning, Laws, Challenges,  Significance"
    ];
    
    // The category to set for these blogs
    const newCategory = ["blog"];
    
    // Update each blog by title
    const updatePromises = blogTitles.map(title => 
      prisma.blog.updateMany({
        where: {
          title: {
            equals: title,
            mode: 'insensitive' // Case insensitive matching
          }
        },
        data: {
          category: newCategory
        }
      })
    );
    
    // Execute all updates in parallel
    const results = await Promise.all(updatePromises);
    
    // Count total updated records
    const totalUpdated = results.reduce((sum, result) => sum + result.count, 0);
    
    // Fetch the updated blogs to return in the response
    const updatedBlogs = await prisma.blog.findMany({
      where: {
        title: {
          in: blogTitles,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        title: true,
        category: true,
        published: true,
        updatedAt: true
      }
    });
    
    return new Response(JSON.stringify({
      success: true,
      message: `Successfully updated ${totalUpdated} blog posts to category "${newCategory.join(', ')}"`,
      updatedBlogs
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error updating blog categories:", error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
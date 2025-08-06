// app/api/mentioned-blogs/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ==================== UTILITY FUNCTIONS ====================

/**
 * Extract all product widgets from blog content
 * @param {string} content - HTML content of the blog
 * @returns {Array} Array of product widget objects
 */
const extractProductWidgets = (content) => {
  if (!content) return [];

  const productWidgets = [];
  
  // Regex to match product widget divs
  const widgetRegex = /<div[^>]*data-product-widget="true"[^>]*>.*?<\/div>/gi;
  const matches = content.match(widgetRegex);

  if (!matches) return [];

  matches.forEach(widgetHtml => {
    const productInfo = extractProductInfoFromWidget(widgetHtml);
    if (productInfo) {
      productWidgets.push(productInfo);
    }
  });

  return productWidgets;
};

/**
 * Extract product information from a single widget HTML string
 * @param {string} widgetHtml - HTML string of the product widget
 * @returns {Object|null} Product information object
 */
const extractProductInfoFromWidget = (widgetHtml) => {
  if (!widgetHtml) return null;

  try {
    const productInfo = {};

    // Extract data attributes using regex
    const extractors = {
      id: /data-product-id=["']([^"']+)["']/i,
      name: /data-product-name=["']([^"']+)["']/i,
      companyName: /data-company-name=["']([^"']+)["']/i,
      logoUrl: /data-logo-url=["']([^"']+)["']/i,
      slug: /data-slug=["']([^"']+)["']/i,
      type: /data-type=["']([^"']+)["']/i
    };

    Object.keys(extractors).forEach(key => {
      const match = widgetHtml.match(extractors[key]);
      if (match && match[1]) {
        productInfo[key] = match[1];
      }
    });

    return Object.keys(productInfo).length > 0 ? productInfo : null;
  } catch (error) {
    console.error('Error extracting product info:', error);
    return null;
  }
};

/**
 * Check if a blog content mentions a specific product by slug
 * @param {string} content - Blog content HTML
 * @param {string} productSlug - Product slug to search for
 * @returns {boolean} True if product is mentioned
 */
const checkProductMention = (content, productSlug) => {
  if (!content || !productSlug) return false;

  const slugRegex = new RegExp(`data-slug=["']${productSlug}["']`, 'i');
  return slugRegex.test(content);
};

/**
 * Check if a blog content mentions a specific product by ID
 * @param {string} content - Blog content HTML
 * @param {string} productId - Product ID to search for
 * @returns {boolean} True if product is mentioned
 */
const checkProductMentionById = (content, productId) => {
  if (!content || !productId) return false;

  const idRegex = new RegExp(`data-product-id=["']${productId}["']`, 'i');
  return idRegex.test(content);
};

/**
 * Get all unique product slugs mentioned in blog content
 * @param {string} content - Blog content HTML
 * @returns {Array} Array of unique product slugs
 */
const getAllMentionedProductSlugs = (content) => {
  if (!content) return [];

  const slugs = new Set();
  const slugRegex = /data-slug=["']([^"']+)["']/gi;
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    if (match[1]) {
      slugs.add(match[1]);
    }
  }

  return Array.from(slugs);
};

/**
 * Get all unique product IDs mentioned in blog content
 * @param {string} content - Blog content HTML
 * @returns {Array} Array of unique product IDs
 */
const getAllMentionedProductIds = (content) => {
  if (!content) return [];

  const ids = new Set();
  const idRegex = /data-product-id=["']([^"']+)["']/gi;
  let match;

  while ((match = idRegex.exec(content)) !== null) {
    if (match[1]) {
      ids.add(match[1]);
    }
  }

  return Array.from(ids);
};

/**
 * Count the number of times a product is mentioned in blog content
 * @param {string} content - Blog content HTML
 * @param {string} productSlug - Product slug to count
 * @returns {number} Number of mentions
 */
const countProductMentions = (content, productSlug) => {
  if (!content || !productSlug) return 0;

  const slugRegex = new RegExp(`data-slug=["']${productSlug}["']`, 'gi');
  const matches = content.match(slugRegex);
  return matches ? matches.length : 0;
};

/**
 * Filter blogs that mention specific products
 * @param {Array} blogs - Array of blog objects
 * @param {Array} productSlugs - Array of product slugs to search for
 * @returns {Array} Filtered blogs with product mention information
 */
const filterBlogsByProductMentions = (blogs, productSlugs) => {
  if (!blogs || !blogs.length || !productSlugs || !productSlugs.length) {
    return [];
  }

  return blogs.filter(blog => {
    if (!blog.content) return false;

    // Check if any of the specified products are mentioned
    return productSlugs.some(slug => checkProductMention(blog.content, slug));
  }).map(blog => {
    // Add mentioned products info to each blog
    const mentionedProducts = productSlugs
      .filter(slug => checkProductMention(blog.content, slug))
      .map(slug => {
        const widgets = extractProductWidgets(blog.content);
        return widgets.find(widget => widget.slug === slug);
      })
      .filter(Boolean);

    return {
      ...blog,
      mentionedProducts,
      mentionCount: mentionedProducts.length
    };
  });
};

/**
 * Generate analytics for product mentions across blogs
 * @param {Array} blogs - Array of blog objects
 * @returns {Object} Analytics object with mention statistics
 */
const generateProductMentionAnalytics = (blogs) => {
  if (!blogs || !blogs.length) return {};

  const analytics = {
    totalBlogs: blogs.length,
    blogsWithMentions: 0,
    productMentions: {},
    topMentionedProducts: [],
    mentionsByCategory: {}
  };

  blogs.forEach(blog => {
    const productSlugs = getAllMentionedProductSlugs(blog.content);
    
    if (productSlugs.length > 0) {
      analytics.blogsWithMentions++;
    }

    // Count mentions by product
    productSlugs.forEach(slug => {
      analytics.productMentions[slug] = (analytics.productMentions[slug] || 0) + 1;
    });

    // Count mentions by blog category
    if (blog.category && blog.category.length > 0) {
      blog.category.forEach(cat => {
        if (!analytics.mentionsByCategory[cat]) {
          analytics.mentionsByCategory[cat] = 0;
        }
        analytics.mentionsByCategory[cat] += productSlugs.length;
      });
    }
  });

  // Generate top mentioned products
  analytics.topMentionedProducts = Object.entries(analytics.productMentions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([slug, count]) => ({ slug, count }));

  return analytics;
};

// ==================== API ROUTES ====================

// GET /api/mentioned-blogs?productSlug=legalbook&limit=6
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('productSlug');
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    // Validate required parameters
    if (!productSlug) {
      return NextResponse.json(
        { error: 'Product slug is required' }, 
        { status: 400 }
      );
    }

    // Get all published blogs first
    const allBlogs = await prisma.blog.findMany({
      where: {
        published: true,
        publishedAt: {
          not: null
        }
      },
      orderBy: { 
        publishedAt: 'desc' 
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        publishedAt: true,
        createdAt: true,
        content: true,
        category: true
      }
    });

    // Filter blogs that mention the specific product
    const mentionedBlogs = allBlogs.filter(blog => {
      if (!blog.content) return false;
      return checkProductMention(blog.content, productSlug);
    }).map(blog => {
      // Add product mention information to each blog
      const widgets = extractProductWidgets(blog.content);
      const mentionedProduct = widgets.find(widget => widget.slug === productSlug);
      const mentionCount = countProductMentions(blog.content, productSlug);
      
      return {
        ...blog,
        mentionedProduct,
        mentionCount,
        allMentionedProducts: widgets
      };
    });

    // Limit the results
    const limitedBlogs = mentionedBlogs.slice(0, limit);

    return NextResponse.json({
      blogs: limitedBlogs,
      totalCount: mentionedBlogs.length,
      productSlug: productSlug
    });

  } catch (error) {
    console.error('Failed to fetch mentioned blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentioned blogs', details: error.message }, 
      { status: 500 }
    );
  }
}

// PUT /api/mentioned-blogs - Analytics endpoint for product mentions
export async function PUT(request) {
  try {
    const body = await request.json();
    const { 
      analytics = false, 
      productSlugs = [], 
      includeContent = false,
      categoryFilter = null 
    } = body;

    if (!analytics) {
      return NextResponse.json(
        { error: 'Analytics flag must be true for this endpoint' }, 
        { status: 400 }
      );
    }

    // Build query with optional category filter
    const whereClause = {
      published: true,
      publishedAt: {
        not: null
      }
    };

    if (categoryFilter && categoryFilter.length > 0) {
      whereClause.category = {
        hasSome: categoryFilter
      };
    }

    // Get all published blogs
    const allBlogs = await prisma.blog.findMany({
      where: whereClause,
      orderBy: { 
        publishedAt: 'desc' 
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        publishedAt: true,
        createdAt: true,
        content: includeContent,
        category: true
      }
    });

    // Generate comprehensive analytics
    const analytics_data = generateProductMentionAnalytics(allBlogs);

    // If specific product slugs provided, get detailed info for those
    let productSpecificData = [];
    if (productSlugs.length > 0) {
      productSpecificData = filterBlogsByProductMentions(allBlogs, productSlugs);
    }

    // Additional analytics
    const totalProductMentions = Object.values(analytics_data.productMentions).reduce((sum, count) => sum + count, 0);
    const averageMentionsPerBlog = analytics_data.blogsWithMentions > 0 
      ? (totalProductMentions / analytics_data.blogsWithMentions).toFixed(2)
      : 0;

    return NextResponse.json({
      analytics: {
        ...analytics_data,
        totalProductMentions,
        averageMentionsPerBlog,
        mentionPercentage: ((analytics_data.blogsWithMentions / analytics_data.totalBlogs) * 100).toFixed(2)
      },
      productSpecificData,
      requestedProducts: productSlugs,
      appliedFilters: {
        categoryFilter,
        includeContent
      }
    });

  } catch (error) {
    console.error('Failed to generate analytics:', error);
    return NextResponse.json(
      { error: 'Failed to generate analytics', details: error.message }, 
      { status: 500 }
    );
  }
}

// PATCH /api/mentioned-blogs - Bulk operations for product mentions
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { 
      operation, 
      productSlugs = [], 
      limit = 50,
      excludeCategories = []
    } = body;

    if (!operation) {
      return NextResponse.json(
        { error: 'Operation type is required' }, 
        { status: 400 }
      );
    }

    // Build exclusion filter
    const whereClause = {
      published: true,
      publishedAt: {
        not: null
      }
    };

    if (excludeCategories.length > 0) {
      whereClause.category = {
        none: excludeCategories
      };
    }

    // Get blogs
    const allBlogs = await prisma.blog.findMany({
      where: whereClause,
      orderBy: { 
        publishedAt: 'desc' 
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        publishedAt: true,
        createdAt: true,
        content: true,
        category: true
      },
      take: limit * 2 // Get more to filter from
    });

    let result = {};

    switch (operation) {
      case 'find_cross_mentions':
        // Find blogs that mention multiple products
        if (productSlugs.length < 2) {
          return NextResponse.json(
            { error: 'At least 2 product slugs required for cross-mentions' }, 
            { status: 400 }
          );
        }
        
        const crossMentionBlogs = allBlogs.filter(blog => {
          const mentionedSlugs = getAllMentionedProductSlugs(blog.content);
          const matchingProducts = productSlugs.filter(slug => mentionedSlugs.includes(slug));
          return matchingProducts.length >= 2;
        }).map(blog => {
          const widgets = extractProductWidgets(blog.content);
          const relevantWidgets = widgets.filter(widget => productSlugs.includes(widget.slug));
          
          return {
            ...blog,
            crossMentionedProducts: relevantWidgets,
            crossMentionCount: relevantWidgets.length
          };
        });

        result = {
          operation: 'find_cross_mentions',
          blogs: crossMentionBlogs.slice(0, limit),
          totalFound: crossMentionBlogs.length,
          searchedProducts: productSlugs
        };
        break;

      case 'find_competing_products':
        // Find blogs that mention products but not the specified ones
        const competingBlogs = allBlogs.filter(blog => {
          const mentionedSlugs = getAllMentionedProductSlugs(blog.content);
          const hasCompetitors = mentionedSlugs.length > 0;
          const hasOurProducts = productSlugs.some(slug => mentionedSlugs.includes(slug));
          return hasCompetitors && !hasOurProducts;
        }).map(blog => {
          const widgets = extractProductWidgets(blog.content);
          return {
            ...blog,
            competingProducts: widgets,
            competingProductCount: widgets.length
          };
        });

        result = {
          operation: 'find_competing_products',
          blogs: competingBlogs.slice(0, limit),
          totalFound: competingBlogs.length,
          excludedProducts: productSlugs
        };
        break;

      case 'get_all_mentions':
        // Get all product mentions across all blogs
        const allMentionBlogs = allBlogs.filter(blog => {
          return getAllMentionedProductSlugs(blog.content).length > 0;
        }).map(blog => {
          const widgets = extractProductWidgets(blog.content);
          return {
            ...blog,
            allMentionedProducts: widgets,
            totalMentions: widgets.length
          };
        });

        result = {
          operation: 'get_all_mentions',
          blogs: allMentionBlogs.slice(0, limit),
          totalFound: allMentionBlogs.length
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid operation. Supported: find_cross_mentions, find_competing_products, get_all_mentions' }, 
          { status: 400 }
        );
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Failed to perform bulk operation:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk operation', details: error.message }, 
      { status: 500 }
    );
  }
}

// Alternative approach: More specific search with additional filters
export async function POST(request) {
  try {
    const body = await request.json();
    const { productSlug, productId, limit = 6, excludeBlogIds = [] } = body;

    if (!productSlug && !productId) {
      return NextResponse.json(
        { error: 'Either productSlug or productId is required' }, 
        { status: 400 }
      );
    }

    // Get all published blogs
    const allBlogs = await prisma.blog.findMany({
      where: {
        published: true,
        publishedAt: {
          not: null
        },
        id: {
          notIn: excludeBlogIds // Exclude specific blog IDs if provided
        }
      },
      orderBy: { 
        publishedAt: 'desc' 
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        publishedAt: true,
        createdAt: true,
        content: true,
        category: true
      }
    });

    // Filter blogs that mention the product
    const mentionedBlogs = allBlogs.filter(blog => {
      if (!blog.content) return false;
      
      let hasMatch = false;
      
      // Search by productSlug if provided
      if (productSlug) {
        hasMatch = checkProductMention(blog.content, productSlug);
      }
      
      // Search by productId if provided and slug didn't match
      if (!hasMatch && productId) {
        hasMatch = checkProductMentionById(blog.content, productId);
      }
      
      return hasMatch;
    });

    // Extract product information from the matched blogs
    const blogsWithProductInfo = mentionedBlogs.map(blog => {
      const widgets = extractProductWidgets(blog.content);
      
      // Find the specific product that matched our search
      let mentionedProductInfo = null;
      if (productSlug) {
        mentionedProductInfo = widgets.find(widget => widget.slug === productSlug);
      } else if (productId) {
        mentionedProductInfo = widgets.find(widget => widget.id === productId);
      }
      
      const mentionCount = productSlug 
        ? countProductMentions(blog.content, productSlug)
        : widgets.filter(widget => widget.id === productId).length;
      
      return {
        ...blog,
        mentionedProduct: mentionedProductInfo,
        mentionCount,
        allMentionedProducts: widgets
      };
    });

    // Limit the results
    const limitedBlogs = blogsWithProductInfo.slice(0, limit);

    return NextResponse.json({
      blogs: limitedBlogs,
      totalCount: mentionedBlogs.length,
      searchCriteria: {
        productSlug,
        productId,
        excludedBlogIds: excludeBlogIds
      }
    });

  } catch (error) {
    console.error('Failed to fetch mentioned blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentioned blogs', details: error.message }, 
      { status: 500 }
    );
  }
}
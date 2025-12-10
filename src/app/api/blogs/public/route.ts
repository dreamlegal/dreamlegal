// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export const revalidate = 300; // Cache for 5 minutes

// // GET /api/blogs/public - Get all published blogs grouped by location
// export async function GET() {
//   try {
//     // Fetch all published blogs with tags
//     const allBlogs = await prisma.blog.findMany({
//       where: {
//          published: true
//          },
//       orderBy: { publishedAt: 'desc' },
//       select: {
//         id: true,
//         title: true,
//         bannerImage: true,
//         slug: true,
//         publishedAt: true,
//         createdAt: true,
//         tags: true,
//         content: true,
//         category: true
//       }
//     });
    
//     // Initialize grouped structure
//     const blogsByLocation = {
//       hero: [],
//       belowHero: [],
//       secondCollage: [],
//       oneLineSection: [],
//       beforeLatest: [],
//       latest: [],
//       sidebar: {
//         firstMini: [],
//         middleBig: [],
//         secondMini: []
//       }
//     };
    
//     // Group blogs by location
//     allBlogs.forEach(blog => {
//       const tags = (blog.tags as any[]) || [];
      
//       tags.forEach(tag => {
//         const blogWithTag = { ...blog, currentTag: tag.tag, currentLocation: tag.location };
        
//         switch (tag.location) {
//           case 'hero':
//             if (blogsByLocation.hero.length < 4) {
//               blogsByLocation.hero.push(blogWithTag);
//             }
//             break;
//           case 'below-hero':
//             blogsByLocation.belowHero.push(blogWithTag);
//             break;
//           case 'second-collage':
//             blogsByLocation.secondCollage.push(blogWithTag);
//             break;
//           case 'one-line-section':
//             blogsByLocation.oneLineSection.push(blogWithTag);
//             break;
//           case 'before-latest':
//             blogsByLocation.beforeLatest.push(blogWithTag);
//             break;
//           case 'latest':
//             blogsByLocation.latest.push(blogWithTag);
//             break;
//           case 'sidebar-first-mini':
//             if (blogsByLocation.sidebar.firstMini.length < 4) {
//               blogsByLocation.sidebar.firstMini.push(blogWithTag);
//             }
//             break;
//           case 'sidebar-middle-big':
//             if (blogsByLocation.sidebar.middleBig.length < 1) {
//               blogsByLocation.sidebar.middleBig.push(blogWithTag);
//             }
//             break;
//           case 'sidebar-second-mini':
//             if (blogsByLocation.sidebar.secondMini.length < 4) {
//               blogsByLocation.sidebar.secondMini.push(blogWithTag);
//             }
//             break;
//         }
//       });
//     });
    
//     // Get latest articles (fallback if no 'latest' location tags)
//     if (blogsByLocation.latest.length === 0) {
//       blogsByLocation.latest = allBlogs.slice(0, 8).map(blog => ({
//         ...blog,
//         currentTag: 'Latest',
//         currentLocation: 'latest'
//       }));
//     }
    
//     // Helper function to get unique categories for a section
//     const getCategories = (blogs: any[]) => {
//       const categories = new Set<string>(['All']);
//       blogs.forEach(blog => {
//         const tags = (blog.tags as any[]) || [];
//         tags.forEach(tag => {
//           if (tag.tag && tag.tag !== 'Featured') {
//             categories.add(tag.tag);
//           }
//         });
//       });
//       return Array.from(categories);
//     };
    
//     // Build response with section metadata
//     return NextResponse.json({
//       hero: {
//         blogs: blogsByLocation.hero,
//         title: 'Featured'
//       },
//       sections: [
//         {
//           id: 'below-hero',
//           title: "DON'T MISS",
//           blogs: blogsByLocation.belowHero,
//           categories: getCategories(blogsByLocation.belowHero),
//           hasCategories: true
//         },
//         {
//           id: 'second-collage',
//           title: 'CLIENT ANNOUNCMENT',
//           blogs: blogsByLocation.secondCollage,
//           categories: getCategories(blogsByLocation.secondCollage),
//           hasCategories: true
//         },
//         {
//           id: 'one-line-section',
//           title: 'FEATURE LAUNCH',
//           blogs: blogsByLocation.oneLineSection,
//           categories: getCategories(blogsByLocation.oneLineSection),
//           hasCategories: true
//         },
//         {
//           id: 'before-latest',
//           title: 'FOR LEGAL TECH VENDORS',
//           blogs: blogsByLocation.beforeLatest,
//           categories: [],
//           hasCategories: false
//         }
//       ].filter(section => section.blogs.length > 0), // Only return sections with blogs
//       latest: {
//         blogs: blogsByLocation.latest,
//         title: 'LATEST ARTICLES'
//       },
//       sidebar: {
//         firstMini: {
//           blogs: blogsByLocation.sidebar.firstMini,
//           title: 'ANALYSIS'
//         },
//         middleBig: {
//           blogs: blogsByLocation.sidebar.middleBig,
//           title: 'FEATURED POST'
//         },
//         secondMini: {
//           blogs: blogsByLocation.sidebar.secondMini,
//           title: 'HOLIDAY RECIPES'
//         }
//       },
//       meta: {
//         totalBlogs: allBlogs.length,
//         lastUpdated: new Date().toISOString()
//       }
//     });
//   } catch (error) {
//     console.error('Failed to fetch blogs:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch blogs' }, 
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export const revalidate = 300; // Cache for 5 minutes

// // GET /api/blogs/public - Get all published blogs grouped by location
// export async function GET() {
//   try {
//     // Fetch all published blogs with tags
//     const allBlogs = await prisma.blog.findMany({
//       where: {
//          published: true
//          },
//       orderBy: { publishedAt: 'desc' },
//       select: {
//         id: true,
//         title: true,
//         bannerImage: true,
//         slug: true,
//         publishedAt: true,
//         createdAt: true,
//         tags: true,
//         content: true,
//         category: true,
//         featured: true
//       }
//     });
    
//     // Initialize grouped structure
//     const blogsByLocation = {
//       hero: [],
//       belowHero: [],
//       secondCollage: [],
//       oneLineSection: [],
//       beforeLatest: [],
//       latest: [],
//       sidebar: {
//         firstMini: [],
//         middleBig: [],
//         secondMini: []
//       }
//     };
    
//     // Get featured blogs for hero section (max 4 with unique tags)
//     const featuredBlogs = allBlogs.filter(blog => blog.featured);
//     const usedTags = new Set();
    
//     featuredBlogs.forEach(blog => {
//       const tags = (blog.tags as any[]) || [];
      
//       // Find a tag for this blog that hasn't been used yet
//       const uniqueTag = tags.find(tag => !usedTags.has(tag.tag));
      
//       if (uniqueTag && blogsByLocation.hero.length < 4) {
//         usedTags.add(uniqueTag.tag);
//         blogsByLocation.hero.push({
//           ...blog,
//           currentTag: uniqueTag.tag,
//           currentLocation: 'hero'
//         });
//       }
//     });
    
//     // Group remaining blogs by their tag locations
//     allBlogs.forEach(blog => {
//       const tags = (blog.tags as any[]) || [];
      
//       tags.forEach(tag => {
//         const blogWithTag = { ...blog, currentTag: tag.tag, currentLocation: tag.location };
        
//         // Skip if already in hero (featured)
//         const isInHero = blogsByLocation.hero.some(hb => hb.id === blog.id);
        
//         switch (tag.location) {
//           case 'below-hero':
//             blogsByLocation.belowHero.push(blogWithTag);
//             break;
//           case 'second-collage':
//             blogsByLocation.secondCollage.push(blogWithTag);
//             break;
//           case 'one-line-section':
//             blogsByLocation.oneLineSection.push(blogWithTag);
//             break;
//           case 'before-latest':
//             blogsByLocation.beforeLatest.push(blogWithTag);
//             break;
//           case 'latest':
//             blogsByLocation.latest.push(blogWithTag);
//             break;
//           case 'sidebar-first-mini':
//             if (blogsByLocation.sidebar.firstMini.length < 4) {
//               blogsByLocation.sidebar.firstMini.push(blogWithTag);
//             }
//             break;
//           case 'sidebar-middle-big':
//             if (blogsByLocation.sidebar.middleBig.length < 1) {
//               blogsByLocation.sidebar.middleBig.push(blogWithTag);
//             }
//             break;
//           case 'sidebar-second-mini':
//             if (blogsByLocation.sidebar.secondMini.length < 4) {
//               blogsByLocation.sidebar.secondMini.push(blogWithTag);
//             }
//             break;
//         }
//       });
//     });
    
//     // Get latest articles (fallback if no 'latest' location tags)
//     if (blogsByLocation.latest.length === 0) {
//       blogsByLocation.latest = allBlogs.slice(0, 8).map(blog => ({
//         ...blog,
//         currentTag: 'Latest',
//         currentLocation: 'latest'
//       }));
//     }
    
//     // Helper function to get unique categories for a section
//     const getCategories = (blogs: any[]) => {
//       const categories = new Set<string>(['All']);
//       blogs.forEach(blog => {
//         const tags = (blog.tags as any[]) || [];
//         tags.forEach(tag => {
//           if (tag.tag && tag.tag !== 'Featured') {
//             categories.add(tag.tag);
//           }
//         });
//       });
//       return Array.from(categories);
//     };
    
//     // For below-hero section: show tags for that location first, then all other tags
//     const belowHeroWithCategories = () => {
//       // Get blogs with below-hero location
//       const locationSpecificBlogs = blogsByLocation.belowHero;
      
//       // Get all tags from below-hero location
//       const locationTags = new Set<string>();
//       locationSpecificBlogs.forEach(blog => {
//         if (blog.currentTag) locationTags.add(blog.currentTag);
//       });
      
//       // Get all other tags from all blogs
//       const allTags = new Set<string>(['All']);
//       allBlogs.forEach(blog => {
//         const tags = (blog.tags as any[]) || [];
//         tags.forEach(tag => {
//           if (tag.tag) allTags.add(tag.tag);
//         });
//       });
      
//       // Combine: location tags first, then others
//       const orderedCategories = ['All', ...Array.from(locationTags), ...Array.from(allTags).filter(t => t !== 'All' && !locationTags.has(t))];
      
//       return Array.from(new Set(orderedCategories)); // Remove duplicates
//     };
    
//     // Build response with section metadata
//     return NextResponse.json({
//       hero: {
//         blogs: blogsByLocation.hero,
//         title: 'Featured'
//       },
//       sections: [
//         {
//           id: 'below-hero',
//           title: "DON'T MISS",
//           blogs: blogsByLocation.belowHero,
//           categories: belowHeroWithCategories(),
//           hasCategories: true
//         },
//         {
//           id: 'second-collage',
//           title: 'CLIENT ANNOUNCEMENTS',
//           blogs: blogsByLocation.secondCollage,
//           categories: getCategories(blogsByLocation.secondCollage),
//           hasCategories: true
//         },
//         {
//           id: 'one-line-section',
//           title: 'FEATURE LAUNCH',
//           blogs: blogsByLocation.oneLineSection,
//           categories: getCategories(blogsByLocation.oneLineSection),
//           hasCategories: true
//         },
//         {
//           id: 'before-latest',
//           title: 'FOR LEGAL TECH VENDORS',
//           blogs: blogsByLocation.beforeLatest,
//           categories: [],
//           hasCategories: false
//         }
//       ].filter(section => section.blogs.length > 0), // Only return sections with blogs
//       latest: {
//         blogs: blogsByLocation.latest,
//         title: 'LATEST ARTICLES'
//       },
//       sidebar: {
//         firstMini: {
//           blogs: blogsByLocation.sidebar.firstMini,
//           title: 'ANALYSIS'
//         },
//         middleBig: {
//           blogs: blogsByLocation.sidebar.middleBig,
//           title: 'AWARDS & RECOGNITION'
//         },
//         secondMini: {
//           blogs: blogsByLocation.sidebar.secondMini,
//           title: 'FUNDING'
//         }
//       },
//       meta: {
//         totalBlogs: allBlogs.length,
//         lastUpdated: new Date().toISOString()
//       }
//     });
//   } catch (error) {
//     console.error('Failed to fetch blogs:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch blogs' }, 
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export const revalidate = 300;

// // GET /api/blogs/public - Get all blogs with fake tags for demo
// export async function GET() {
//   try {
//     // Fetch ALL blogs (published or not for demo)
//     const allBlogs = await prisma.blog.findMany({
//       where: {
//          published: true
//          },
//       orderBy: { createdAt: 'desc' },
//       select: {
//         id: true,
//         title: true,
//         bannerImage: true,
//         slug: true,
//         publishedAt: true,
//         createdAt: true,
//         tags: true,
//         content: true,
//         category: true
//       }
//     });

//     console.log(`📊 Fetched ${allBlogs.length} total blogs for demo`);

//     // Tag names for different sections
//     const tagsBySection = {
//       hero: ['Featured', 'Top Story', 'Trending', 'Must Read'],
//       belowHero: ['Breaking News', 'Hot Topic', 'Editor\'s Pick', 'Spotlight'],
//       secondCollage: ['Travel', 'Recipes', 'Health & Fitness', 'Music', 'Style'],
//       oneLineSection: ['Architecture', 'Interior Design', 'Modern Living'],
//       beforeLatest: ['Performance', 'Training', 'Sports', 'Fitness'],
//       sidebarFirst: ['Make it Modern', 'Design Tips', 'Home Decor'],
//       sidebarSecond: ['Holiday Recipes', 'Cooking', 'Food & Drink']
//     };

//     // Ensure we have enough blogs by repeating if necessary
//     const minBlogsNeeded = 80; // Total blogs needed for full layout
//     let extendedBlogs = [...allBlogs];
    
//     while (extendedBlogs.length < minBlogsNeeded && allBlogs.length > 0) {
//       extendedBlogs = [...extendedBlogs, ...allBlogs];
//     }

//     console.log(`📦 Extended to ${extendedBlogs.length} blogs for complete layout`);

//     // Distribute blogs across sections
//     let blogIndex = 0;

//     const assignBlogsToSection = (location: string, count: number, tagPool: string[]) => {
//       const blogs = [];
//       for (let i = 0; i < count && blogIndex < extendedBlogs.length; i++) {
//         const blog = extendedBlogs[blogIndex++];
//         const randomTag = tagPool[Math.floor(Math.random() * tagPool.length)];
//         blogs.push({
//           ...blog,
//           currentTag: randomTag,
//           currentLocation: location,
//           // Override tags for demo purposes
//           tags: [{ tag: randomTag, location: location }]
//         });
//       }
//       return blogs;
//     };

//     // Assign blogs to each location
//     const blogsByLocation = {
//       hero: assignBlogsToSection('hero', 4, tagsBySection.hero),
//       belowHero: assignBlogsToSection('below-hero', 12, tagsBySection.belowHero),
//       secondCollage: assignBlogsToSection('second-collage', 10, tagsBySection.secondCollage),
//       oneLineSection: assignBlogsToSection('one-line-section', 10, tagsBySection.oneLineSection),
//       beforeLatest: assignBlogsToSection('before-latest', 10, tagsBySection.beforeLatest),
//       latest: assignBlogsToSection('latest', 24, ['Latest', 'New', 'Recent']),
//       sidebar: {
//         firstMini: assignBlogsToSection('sidebar-first-mini', 4, tagsBySection.sidebarFirst),
//         middleBig: assignBlogsToSection('sidebar-middle-big', 1, ['Featured Post']),
//         secondMini: assignBlogsToSection('sidebar-second-mini', 5, tagsBySection.sidebarSecond)
//       }
//     };

//     console.log('📍 Blogs distributed:', {
//       hero: blogsByLocation.hero.length,
//       belowHero: blogsByLocation.belowHero.length,
//       secondCollage: blogsByLocation.secondCollage.length,
//       oneLineSection: blogsByLocation.oneLineSection.length,
//       beforeLatest: blogsByLocation.beforeLatest.length,
//       latest: blogsByLocation.latest.length,
//       sidebarFirst: blogsByLocation.sidebar.firstMini.length,
//       sidebarMiddle: blogsByLocation.sidebar.middleBig.length,
//       sidebarSecond: blogsByLocation.sidebar.secondMini.length
//     });

//     // Helper function to get unique categories for a section
//     const getCategories = (blogs: any[]) => {
//       const categories = new Set<string>(['All']);
//       blogs.forEach(blog => {
//         if (blog.currentTag && blog.currentTag !== 'Featured') {
//           categories.add(blog.currentTag);
//         }
//       });
//       return Array.from(categories);
//     };

//     // Build response with section metadata
//     return NextResponse.json({
//       hero: {
//         blogs: blogsByLocation.hero,
//         title: 'Featured'
//       },
//       sections: [
//         {
//           id: 'below-hero',
//           title: "DON'T MISS",
//           blogs: blogsByLocation.belowHero,
//           categories: getCategories(blogsByLocation.belowHero),
//           hasCategories: true
//         },
//         {
//           id: 'second-collage',
//           title: 'LIFESTYLE NEWS',
//           blogs: blogsByLocation.secondCollage,
//           categories: getCategories(blogsByLocation.secondCollage),
//           hasCategories: true
//         },
//         {
//           id: 'one-line-section',
//           title: 'HOUSE DESIGN',
//           blogs: blogsByLocation.oneLineSection,
//           categories: getCategories(blogsByLocation.oneLineSection),
//           hasCategories: true
//         },
//         {
//           id: 'before-latest',
//           title: 'PERFORMANCE TRAINING',
//           blogs: blogsByLocation.beforeLatest,
//           categories: getCategories(blogsByLocation.beforeLatest),
//           hasCategories: false
//         }
//       ],
//       latest: {
//         blogs: blogsByLocation.latest,
//         title: 'LATEST ARTICLES'
//       },
//       sidebar: {
//         firstMini: {
//           blogs: blogsByLocation.sidebar.firstMini,
//           title: 'MAKE IT MODERN'
//         },
//         middleBig: {
//           blogs: blogsByLocation.sidebar.middleBig,
//           title: 'FEATURED POST'
//         },
//         secondMini: {
//           blogs: blogsByLocation.sidebar.secondMini,
//           title: 'HOLIDAY RECIPES'
//         }
//       },
//       meta: {
//         totalBlogs: allBlogs.length,
//         extendedBlogs: extendedBlogs.length,
//         lastUpdated: new Date().toISOString(),
//         demoMode: true,
//         message: 'Demo data - Real blogs with fake tags for presentation'
//       }
//     });
//   } catch (error) {
//     console.error('Failed to fetch blogs:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch blogs' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 300; // Cache for 5 minutes

// GET /api/blogs/public - Get all published blogs grouped by location
export async function GET() {
  try {
    // Fetch all published blogs with tags and featured status
    const allBlogs = await prisma.blog.findMany({
      where: {
         published: true
         },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        bannerImage: true,
        slug: true,
        publishedAt: true,
        createdAt: true,
        tags: true,
        content: true,
        category: true,
        featured: true
      }
    });
    
    // Initialize grouped structure
    const blogsByLocation = {
      hero: [],
      belowHero: [],
      secondCollage: [],
      oneLineSection: [],
      beforeLatest: [],
      latest: [],
      sidebar: {
        firstMini: [],
        middleBig: [],
        secondMini: []
      }
    };
    
    // ===== FEATURED BLOGS FOR HERO SECTION =====
    // Get blogs marked as featured=true
    const featuredBlogs = allBlogs.filter(blog => blog.featured === true);
    const usedTags = new Set();
    
    // Take max 4 featured blogs with unique tags
    for (const blog of featuredBlogs) {
      if (blogsByLocation.hero.length >= 4) break;
      
      const tags = (blog.tags as any[]) || [];
      // Find a tag that hasn't been used yet
      const uniqueTag = tags.find(tag => !usedTags.has(tag.tag));
      
      if (uniqueTag) {
        usedTags.add(uniqueTag.tag);
        blogsByLocation.hero.push({
          ...blog,
          currentTag: uniqueTag.tag,
          currentLocation: 'hero'
        });
      }
    }
    
    // ===== GROUP BLOGS BY THEIR TAG LOCATIONS =====
    allBlogs.forEach(blog => {
      const tags = (blog.tags as any[]) || [];
      
      tags.forEach(tag => {
        const blogWithTag = { ...blog, currentTag: tag.tag, currentLocation: tag.location };
        
        switch (tag.location) {
          case 'below-hero':
            blogsByLocation.belowHero.push(blogWithTag);
            break;
          case 'second-collage':
            blogsByLocation.secondCollage.push(blogWithTag);
            break;
          case 'one-line-section':
            blogsByLocation.oneLineSection.push(blogWithTag);
            break;
          case 'before-latest':
            blogsByLocation.beforeLatest.push(blogWithTag);
            break;
          case 'latest':
            blogsByLocation.latest.push(blogWithTag);
            break;
          case 'sidebar-first-mini':
            if (blogsByLocation.sidebar.firstMini.length < 4) {
              blogsByLocation.sidebar.firstMini.push(blogWithTag);
            }
            break;
          case 'sidebar-middle-big':
            if (blogsByLocation.sidebar.middleBig.length < 1) {
              blogsByLocation.sidebar.middleBig.push(blogWithTag);
            }
            break;
          case 'sidebar-second-mini':
            if (blogsByLocation.sidebar.secondMini.length < 4) {
              blogsByLocation.sidebar.secondMini.push(blogWithTag);
            }
            break;
        }
      });
    });
    
    // Get latest articles (fallback if no 'latest' location tags)
    if (blogsByLocation.latest.length === 0) {
      blogsByLocation.latest = allBlogs.slice(0, 8).map(blog => ({
        ...blog,
        currentTag: 'Latest',
        currentLocation: 'latest'
      }));
    }
    
    // Helper function to get unique categories for a section
    const getCategories = (blogs: any[]) => {
      const categories = new Set<string>(['All']);
      blogs.forEach(blog => {
        const tags = (blog.tags as any[]) || [];
        tags.forEach(tag => {
          if (tag.tag && tag.tag !== 'Featured') {
            categories.add(tag.tag);
          }
        });
      });
      return Array.from(categories);
    };
    
    // For below-hero: get ALL tags from ALL blogs
    const getAllTagsForBelowHero = () => {
      const allTagsSet = new Set<string>(['All']);
      allBlogs.forEach(blog => {
        const tags = (blog.tags as any[]) || [];
        tags.forEach(tag => {
          if (tag.tag) {
            allTagsSet.add(tag.tag);
          }
        });
      });
      return Array.from(allTagsSet);
    };
    
    // For below-hero: include ALL blogs with their complete tag arrays for filtering
    const allBlogsForBelowHero = allBlogs.map(blog => {
      const tags = (blog.tags as any[]) || [];
      return {
        ...blog,
        currentTag: tags.length > 0 ? tags[0].tag : '',
        currentLocation: tags.length > 0 ? tags[0].location : 'below-hero',
        allTagsList: tags.map(t => t.tag) // Array of tag names for easy filtering
      };
    });
    
    // Build response with section metadata
    return NextResponse.json({
      hero: {
        blogs: blogsByLocation.hero,
        title: 'Featured'
      },
      sections: [
        {
          id: 'below-hero',
          title: "DON'T MISS",
          blogs: allBlogsForBelowHero, // Pass ALL blogs for filtering
          categories: getAllTagsForBelowHero(), // ALL available tags
          hasCategories: true
        },
        {
          id: 'second-collage',
          title: 'CLIENT ANNOUNCEMENTS',
          blogs: blogsByLocation.secondCollage,
          categories: getCategories(blogsByLocation.secondCollage),
          hasCategories: true
        },
        {
          id: 'one-line-section',
          title: 'FEATURE LAUNCH',
          blogs: blogsByLocation.oneLineSection,
          categories: getCategories(blogsByLocation.oneLineSection),
          hasCategories: true
        },
        {
          id: 'before-latest',
          title: 'FOR LEGAL TECH VENDORS',
          blogs: blogsByLocation.beforeLatest,
          categories: [],
          hasCategories: false
        }
      ].filter(section => section.blogs.length > 0), // Only return sections with blogs
      latest: {
        blogs: blogsByLocation.latest,
        title: 'LATEST ARTICLES'
      },
      sidebar: {
        firstMini: {
          blogs: blogsByLocation.sidebar.firstMini,
          title: 'ANALYSIS'
        },
        middleBig: {
          blogs: blogsByLocation.sidebar.middleBig,
          title: 'AWARDS & RECOGNITION'
        },
        secondMini: {
          blogs: blogsByLocation.sidebar.secondMini,
          title: 'FUNDING'
        }
      },
      meta: {
        totalBlogs: allBlogs.length,
        featuredCount: blogsByLocation.hero.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' }, 
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     // Validate required fields
//     if (!body.productName || !body.category || !body.description || !body.logoUrl || !body.slug) {
//       return NextResponse.json(
//         { error: 'Product name, category, description, logo, and slug are required' },
//         { status: 400 }
//       );
//     }

//     if (!body.companyName || !body.headquarters || !body.founded) {
//       return NextResponse.json(
//         { error: 'Company information is required' },
//         { status: 400 }
//       );
//     }

//     // Validate category enum
//     const validCategories = [
//       'CONTRACT_LIFECYCLE_MANAGEMENT',
//       'LEGAL_AI',
//       'DOCUMENT_MANAGEMENT_SYSTEM',
//       'LITIGATION_MANAGEMENT_AND_ANALYTICS',
//       'IP_MANAGEMENT',
//       'LEGAL_RESEARCH',
//       'E_DISCOVERY'
//     ];

//     if (!validCategories.includes(body.category)) {
//       return NextResponse.json(
//         { error: 'Invalid category selected' },
//         { status: 400 }
//       );
//     }

//     // Validate pricing tier enum
//     const validPricingTiers = ['BUDGET', 'MID_RANGE', 'PREMIUM', 'ENTERPRISE'];
    
//     if (body.pricingTier && !validPricingTiers.includes(body.pricingTier)) {
//       return NextResponse.json(
//         { error: 'Invalid pricing tier selected' },
//         { status: 400 }
//       );
//     }

//     // Parse sources if it's a string
//     let sources = body.sources;
//     if (typeof sources === 'string') {
//       try {
//         sources = JSON.parse(sources);
//       } catch (e) {
//         return NextResponse.json(
//           { error: 'Invalid sources format' },
//           { status: 400 }
//         );
//       }
//     }

//     // Create the legal software entry
//     const legalSoftware = await prisma.legalSoftware.create({
//       data: {
//         // Section 1: Product Overview
//         logoUrl: body.logoUrl,
//         productName: body.productName,
//         slug: body.slug,
//         category: body.category,
//         description: body.description,
//         companyName: body.companyName,
//         headquarters: body.headquarters,
//         founded: body.founded,
//         founders: body.founders || null,
//         phone: body.phone || null,
//         website: body.website || null,
//         email: body.email || null,
//         socialMedia: body.socialMedia || null,
        
//         // Section 2: Detailed Overview
//         briefDescription: body.briefDescription,
//         targetUsers: body.targetUsers,
//         primaryPurpose: body.primaryPurpose,
//         technologyStack: body.technologyStack,
//         deploymentOptions: body.deploymentOptions,
        
//         // Section 3: Functionality and Features
//         coreFunctionalities: body.coreFunctionalities || [],
//         keyFeatures: body.keyFeatures || [],
//         lifecycleStages: body.lifecycleStages || [],
        
//         // Section 4: Pricing
//         pricingTier: body.pricingTier || 'MID_RANGE',
//         startingPrice: body.startingPrice || null,
//         pricingModel: body.pricingModel || null,
//         freeTrial: body.freeTrial || null,
//         customPricing: body.customPricing || null,
        
//         // Section 5: Market Perception
//         bestKnownFor: body.bestKnownFor || [],
//         criticalOpinions: body.criticalOpinions || [],
//         topUseCases: body.topUseCases || [],
//         userSatisfaction: body.userSatisfaction || '',
        
//         // Section 6: Sources
//         sources: sources || {}
//       }
//     });

//     return NextResponse.json(
//       { 
//         message: 'Legal software created successfully',
//         id: legalSoftware.id 
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating legal software:', error);
    
//     // Handle Prisma errors
//     if (error.code === 'P2002') {
//       const targetField = error.meta?.target?.[0];
//       if (targetField === 'slug') {
//         return NextResponse.json(
//           { error: 'A product with this slug already exists' },
//           { status: 409 }
//         );
//       }
//       return NextResponse.json(
//         { error: 'A product with this name already exists' },
//         { status: 409 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: 'Failed to create legal software entry' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (id) {
//       // Get single legal software by ID
//       const legalSoftware = await prisma.legalSoftware.findUnique({
//         where: { id }
//       });

//       if (!legalSoftware) {
//         return NextResponse.json(
//           { error: 'Legal software not found' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(legalSoftware);
//     } else {
//       // Get all legal software entries
//       const legalSoftwareList = await prisma.legalSoftware.findMany({
//         orderBy: { createdAt: 'desc' }
//       });

//       return NextResponse.json(legalSoftwareList);
//     }
//   } catch (error) {
//     console.error('Error fetching legal software:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch legal software' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function PUT(request) {
//   try {
//     const body = await request.json();
//     const { id, ...updateData } = body;

//     if (!id) {
//       return NextResponse.json(
//         { error: 'ID is required for update' },
//         { status: 400 }
//       );
//     }

//     // Parse sources if it's a string
//     if (updateData.sources && typeof updateData.sources === 'string') {
//       try {
//         updateData.sources = JSON.parse(updateData.sources);
//       } catch (e) {
//         return NextResponse.json(
//           { error: 'Invalid sources format' },
//           { status: 400 }
//         );
//       }
//     }

//     const updatedLegalSoftware = await prisma.legalSoftware.update({
//       where: { id },
//       data: updateData
//     });

//     return NextResponse.json({
//       message: 'Legal software updated successfully',
//       data: updatedLegalSoftware
//     });
//   } catch (error) {
//     console.error('Error updating legal software:', error);
    
//     if (error.code === 'P2025') {
//       return NextResponse.json(
//         { error: 'Legal software not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: 'Failed to update legal software' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function DELETE(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { error: 'ID is required for deletion' },
//         { status: 400 }
//       );
//     }

//     await prisma.legalSoftware.delete({
//       where: { id }
//     });

//     return NextResponse.json({
//       message: 'Legal software deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting legal software:', error);
    
//     if (error.code === 'P2025') {
//       return NextResponse.json(
//         { error: 'Legal software not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: 'Failed to delete legal software' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.productName || !body.category || !body.description || !body.slug) {
      return NextResponse.json(
        { error: 'Product name, category, description, logo, and slug are required' },
        { status: 400 }
      );
    }

    if (!body.companyName || !body.headquarters || !body.founded) {
      return NextResponse.json(
        { error: 'Company information is required' },
        { status: 400 }
      );
    }

    // Validate category enum
    const validCategories = [
      'CONTRACT_LIFECYCLE_MANAGEMENT',
      'LEGAL_AI',
      'DOCUMENT_MANAGEMENT_SYSTEM',
      'LITIGATION_MANAGEMENT_AND_ANALYTICS',
      'IP_MANAGEMENT',
      'LEGAL_RESEARCH',
      'E_DISCOVERY',
      'CASE_MANAGEMENT',
    'GOVERNANCE_RISK_COMPLIANCE',
    'LEGAL_DUE_DILIGENCE'
    ];

    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: 'Invalid category selected' },
        { status: 400 }
      );
    }

    // Validate pricing tier enum
    const validPricingTiers = ['BUDGET', 'MID_RANGE', 'PREMIUM', 'ENTERPRISE'];
    
    if (body.pricingTier && !validPricingTiers.includes(body.pricingTier)) {
      return NextResponse.json(
        { error: 'Invalid pricing tier selected' },
        { status: 400 }
      );
    }

    // Parse sources if it's a string
    let sources = body.sources;
    if (typeof sources === 'string') {
      try {
        sources = JSON.parse(sources);
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid sources format' },
          { status: 400 }
        );
      }
    }

    // Create the legal software entry
    const legalSoftware = await prisma.legalSoftware.create({
      data: {
        // Section 1: Product Overview
        logoUrl: body.logoUrl,
        productName: body.productName,
        slug: body.slug,
        category: body.category,
        description: body.description,
        companyName: body.companyName,
        headquarters: body.headquarters,
        founded: body.founded,
        founders: body.founders || null,
        phone: body.phone || null,
        website: body.website || null,
        email: body.email || null,
        socialMedia: body.socialMedia || null,
        
        // Section 2: Detailed Overview
        briefDescription: body.briefDescription,
        targetUsers: body.targetUsers,
        primaryPurpose: body.primaryPurpose,
        technologyStack: body.technologyStack,
        deploymentOptions: body.deploymentOptions,
        
        // Section 3: Functionality and Features
        coreFunctionalities: body.coreFunctionalities || [],
        keyFeatures: body.keyFeatures || [],
        lifecycleStages: body.lifecycleStages || [],
        
        // Section 4: Pricing
        pricingTier: body.pricingTier || 'MID_RANGE',
        startingPrice: body.startingPrice || null,
        pricingModel: body.pricingModel || null,
        freeTrial: body.freeTrial || null,
        customPricing: body.customPricing || null,
        
        // Section 5: Market Perception
        bestKnownFor: body.bestKnownFor || [],
        criticalOpinions: body.criticalOpinions || [],
        topUseCases: body.topUseCases || [],
        userSatisfaction: body.userSatisfaction || '',
        
        // Section 6: Sources
        sources: sources || {},
        
        // Section 7: Media
        images: body.images || [],
        videos: body.videos || [],
        
        // Section 8: FAQs
        faqs: body.faqs || []
      }
    });

    return NextResponse.json(
      { 
        message: 'Legal software created successfully',
        id: legalSoftware.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating legal software:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      const targetField = error.meta?.target?.[0];
      if (targetField === 'slug') {
        return NextResponse.json(
          { error: 'A product with this slug already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'A product with this name already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create legal software entry' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Get single legal software by ID
      const legalSoftware = await prisma.legalSoftware.findUnique({
        where: { id }
      });

      if (!legalSoftware) {
        return NextResponse.json(
          { error: 'Legal software not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(legalSoftware);
    } else {
      // Get all legal software entries
      const legalSoftwareList = await prisma.legalSoftware.findMany({
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json(legalSoftwareList);
    }
  } catch (error) {
    console.error('Error fetching legal software:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legal software' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for update' },
        { status: 400 }
      );
    }

    // Parse sources if it's a string
    if (updateData.sources && typeof updateData.sources === 'string') {
      try {
        updateData.sources = JSON.parse(updateData.sources);
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid sources format' },
          { status: 400 }
        );
      }
    }

    const updatedLegalSoftware = await prisma.legalSoftware.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      message: 'Legal software updated successfully',
      data: updatedLegalSoftware
    });
  } catch (error) {
    console.error('Error updating legal software:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Legal software not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update legal software' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for deletion' },
        { status: 400 }
      );
    }

    await prisma.legalSoftware.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Legal software deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting legal software:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Legal software not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete legal software' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
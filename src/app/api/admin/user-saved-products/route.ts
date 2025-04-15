
// File: /app/api/admin/user-saved-products/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get saved products for user
    const savedProductsData = await prisma.saveProduct.findMany({
      where: { userId },
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            category: true,
            slug: true,
            user: {
              select: { 
                name: true,
                companyInfo: {
                  select: { companyName: true }
                }
              }
            }
          }
        }
      }
    });

    // Transform data for response
    const products = [];
    
    savedProductsData.forEach(saveProduct => {
      if (saveProduct.productId && saveProduct.productId.length > 0) {
        // Extract product IDs from productId array
        saveProduct.productId.forEach(productId => {
          // Find matching product from Product array
          const matchingProduct = saveProduct.Product.find(p => p.id === productId);
          
          if (matchingProduct) {
            const product = {
              id: matchingProduct.id,
              name: matchingProduct.name,
              logoUrl: matchingProduct.logoUrl,
              category: matchingProduct.category,
              slug: matchingProduct.slug,
              vendorName: matchingProduct.user?.companyInfo?.[0]?.companyName || matchingProduct.user?.name || 'Unknown vendor',
              savedAt: saveProduct.createdAt
            };
            
            products.push(product);
          }
        });
      }
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching user saved products:', error);
    return NextResponse.json({ error: 'Failed to fetch saved products' }, { status: 500 });
  }
}

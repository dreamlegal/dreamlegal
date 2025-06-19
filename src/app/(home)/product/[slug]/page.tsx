
// import PageComponent from "./_component/Page";
// import type { Metadata, ResolvingMetadata } from 'next';

// // This function fetches the product data
// async function getData(id: string) {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-product-id`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ slug: id }),
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return response.json();
// }

// // Generate dynamic metadata based on the product data
// export async function generateMetadata(
//   { params }: { params: { id: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // Fetch product data
//   const productData = await getData(params.id);
//   const product = productData.product;
  
//   // Use the product's custom metadata if available, otherwise use the product name
//   // The parent template in layout.tsx will add "| DreamLegal" automatically
//   const productTitle = product.metaTitle || product.name;
  
//   // Default description fallback if not provided
//   const productDescription = product.metaDescription || product.description || 'Explore this legal tech product on DreamLegal';
  
//   return {
//     // The title will be formatted using the template in layout.tsx
//     title: productTitle,
//     description: productDescription,
    
//     // OpenGraph and Twitter metadata
//     openGraph: {
//       title: product.ogTitle || productTitle,
//       description: product.ogDescription || productDescription,
//       images: product.ogImage ? [product.ogImage] : [product.logoUrl || '/images/default-og-image.jpg'],
//       type: 'website',
//       siteName: 'DreamLegal',
//     },
    
//     twitter: {
//       card: 'summary_large_image',
//       title: product.ogTitle || productTitle,
//       description: product.ogDescription || productDescription,
//       images: product.ogImage ? [product.ogImage] : [product.logoUrl || '/images/default-og-image.jpg'],
//     },
//   };
// }

// export default async function Page({ params }: { params: { id: string } }) {
//   const data = await getData(params.id);
//   return (
//     <div>
//       <PageComponent data={data} />
//     </div>
//   );
// }

import SoftwareDetailPage from "./_component/SoftwareDetailPage";
import type { Metadata, ResolvingMetadata } from 'next';

// This function fetches the product data for metadata generation
async function getData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/software/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

// Generate dynamic metadata based on the product data
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Fetch product data
    const software = await getData(params.slug);
    
    // Use the software's custom metadata if available, otherwise use the product name
    // The parent template in layout.tsx will add "| DreamLegal" automatically
    const productTitle = software.metaTitle || software.productName;
    
    // Default description fallback if not provided
    const productDescription = software.metaDescription || software.description || 'Explore this legal tech product on DreamLegal';
    
    return {
      // The title will be formatted using the template in layout.tsx
      title: productTitle,
      description: productDescription,
      
      // OpenGraph and Twitter metadata
      openGraph: {
        title: software.ogTitle || productTitle,
        description: software.ogDescription || productDescription,
        images: software.ogImage ? [software.ogImage] : [software.logoUrl || '/images/default-og-image.jpg'],
        type: 'website',
        siteName: 'DreamLegal',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${params.slug}`,
      },
      
      twitter: {
        card: 'summary_large_image',
        title: software.ogTitle || productTitle,
        description: software.ogDescription || productDescription,
        images: software.ogImage ? [software.ogImage] : [software.logoUrl || '/images/default-og-image.jpg'],
      },
      
      // Additional SEO metadata
      keywords: software.keywords || `${productTitle}, legal software, legal tech, contract management`,
      authors: [{ name: 'DreamLegal' }],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata if product fetch fails
    return {
      title: 'Legal Software | DreamLegal',
      description: 'Discover comprehensive legal software solutions on DreamLegal',
      openGraph: {
        title: 'Legal Software | DreamLegal',
        description: 'Discover comprehensive legal software solutions on DreamLegal',
        images: ['/images/default-og-image.jpg'],
        type: 'website',
        siteName: 'DreamLegal',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Legal Software | DreamLegal',
        description: 'Discover comprehensive legal software solutions on DreamLegal',
        images: ['/images/default-og-image.jpg'],
      },
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <SoftwareDetailPage slug={params.slug} />
    </div>
  );
}
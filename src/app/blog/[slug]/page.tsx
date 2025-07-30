
import React from 'react';
import { Metadata } from 'next';
import BlogPage from "../_components/BlogPage";
import prisma from '@/lib/prisma';

// Direct database call to fetch blog metadata
async function fetchBlogMetadata(slug: string) {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug: slug,
      },
      select: {
        title: true,
        htmlTitle: true,
        metaDescription: true,
        ogTitle: true,
        ogUrl: true,
        ogImage: true,
      },
    });
    
    return blog;
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    return null;
  }
}

// Generate metadata using direct database access
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const metaData = await fetchBlogMetadata(slug);
  
  if (!metaData) {
    return {
      title: 'Blog',
      description: 'Blog post',
    };
  }
  
  return {
    title: metaData.htmlTitle || metaData.title,
    description: metaData.metaDescription,
    openGraph: {
      title: metaData.ogTitle || metaData.title,
      description: metaData.metaDescription,
      url: metaData.ogUrl,
      images: metaData.ogImage ? [{ url: metaData.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.ogTitle || metaData.title,
      description: metaData.metaDescription,
      images: metaData.ogImage ? [metaData.ogImage] : [],
    },
  };
}

// The page component
export default function Page({ params }: { params: { slug: string } }) {
  return (
    <BlogPage slug={params.slug} />
  );
}
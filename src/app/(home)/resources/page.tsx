import { Metadata } from 'next';
import PublicBlogsPage from '@/components/PublicBlogsPage';

export const metadata: Metadata = {
  title: 'Blog - DreamLegal',
  description: 'Explore articles on legal technology, AI, compliance, and industry insights.',
  keywords: 'legal tech, legal AI, compliance, law technology, legal innovation',
  openGraph: {
    title: 'Blog - DreamLegal',
    description: 'Explore articles on legal technology, AI, compliance, and industry insights.',
    type: 'website',
    url: 'https://dreamlegal.in/blogs',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'DreamLegal Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - DreamLegal',
    description: 'Explore articles on legal technology, AI, compliance, and industry insights.',
    images: ['/og-image-blog.jpg']
  }
};

export default function BlogsPage() {
  return <PublicBlogsPage />;
}
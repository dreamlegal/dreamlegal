
'use client';

import dynamic from 'next/dynamic';

// Dynamically import BlogEditorPage since it uses browser APIs
const BlogEditorPage = dynamic(() => import('../_components/BlogEditorPage'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function EditorPage() {
  return <BlogEditorPage />;
}
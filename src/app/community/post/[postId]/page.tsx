"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loader, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import the PostRenderer component
import PostRenderer from '../../_components/PostRenderer';
import { usePostPageView } from '../../_components/view-tracker';

export default function PostPage() {
  const params = useParams();
  const postId = params.postId;
  
  const [post, setPost] = useState(null);
  const [totalReplies, setTotalReplies] = useState(0); // New state for total replies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReply, setIsReply] = useState(false);
  
  // Track view for this post
  usePostPageView(postId);
  
  // Fetch post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the appropriate API route to fetch post details
        const response = await fetch(`/api/posts/get-post-details?postId=${postId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Store total replies from API response
        setTotalReplies(data.totalReplies || 0);
        console.log(data.totalReplies);
        console.log(totalReplies);
        // Check if this is a reply post (has a parentId)
        setIsReply(!!data.post.parentId);
        
        // Parse content if it's stored as a JSON string
        if (data.post && data.post.content && typeof data.post.content === 'string') {
          try {
            data.post.parsedContent = JSON.parse(data.post.content);
          } catch (err) {
            console.error('Error parsing post content:', err);
            // For replies with simple text content, create a basic text block
            if (data.post.parentId) {
              data.post.parsedContent = [
                {
                  id: 'text-content',
                  type: 'text',
                  content: data.post.content
                }
              ];
            } else {
              data.post.parsedContent = [];
            }
          }
        }
        
        setPost(data.post);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    
    if (postId) {
      fetchPostData();
    }
  }, [postId]);
  
  // Handle post interactions
  const handlePostUpdate = async (updatedData) => {
    try {
      // Make API call to update post data
      const response = await fetch(`/api/posts/update-post?postId=${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.statusText}`);
      }
      
      // Update local state
      const data = await response.json();
      setPost(data.post);
      
      // Update total replies if it's included in the response
      if (data.totalReplies !== undefined) {
        setTotalReplies(data.totalReplies);
      }
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="animate-spin text-blue-500 mx-auto mb-4" size={40} />
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
          <h2 className="text-lg font-semibold mb-2 text-red-600">Error Loading Post</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-2" />
            Return to home
          </Link>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
          <h2 className="text-lg font-semibold mb-2">Post Not Found</h2>
          <p className="text-gray-700 mb-4">The post you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-2" />
            Return to home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen mr-24 bg-gray-50 py-8">
      <div className="max-w-xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" />
            Back to feed
          </Link>
        </div>
        
        {/* Display Parent Post Link if this is a reply */}
        {isReply && post.parentId && (
          <div className="mb-4 bg-blue-50 p-3 rounded-lg">
            <Link 
              href={`/post/${post.parentId}`} 
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span>View Parent Post</span>
            </Link>
          </div>
        )}
        
        {/* Post Content */}
        <PostRenderer 
          postId={post.id}
          contentBlocks={post.parsedContent || []}
          author={post.username || post.user?.name || 'Unknown User'}
          timestamp={new Date(post.createdAt)}
          upvotes={post.upvotes || []}
          downvotes={post.downvotes || []}
          onUpdatePost={handlePostUpdate}
          views={post.views || 0}
          poll={post.poll}
          totalReplies={totalReplies} // Pass the total replies count to PostRenderer
        />
        
        {/* Post Details */}
        <div className="mt-4 mb-8 text-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Last updated {new Date(post.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { Loader } from 'lucide-react';

// // Import the PostRenderer component
// import PostRenderer from '../../_components/PostRenderer';

// export default function PostPage() {
//   const params = useParams();
//   const postId = params.postId; // Changed from params.id to params.postId to match URL structure
  
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Fetch post data
//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Use the appropriate API route to fetch post details
//         const response = await fetch(`/api/posts/get-post-details?postId=${postId}`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch post: ${response.statusText}`);
//         }
        
//         const data = await response.json();
        
//         // Parse content if it's stored as a JSON string
//         if (data.post && data.post.content && typeof data.post.content === 'string') {
//           try {
//             data.post.parsedContent = JSON.parse(data.post.content);
//           } catch (err) {
//             console.error('Error parsing post content:', err);
//             data.post.parsedContent = [];
//           }
//         }
        
//         setPost(data.post);
//       } catch (err) {
//         console.error('Error fetching post:', err);
//         setError(err.message || 'Failed to load post');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (postId) {
//       fetchPostData();
//     }
//   }, [postId]);
  
//   // Handle post interactions
//   const handlePostUpdate = async (updatedData) => {
//     try {
//       // Make API call to update post data
//       const response = await fetch(`/api/posts/update-post?postId=${postId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedData)
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to update post: ${response.statusText}`);
//       }
      
//       // Update local state
//       const data = await response.json();
//       setPost(data.post);
//     } catch (err) {
//       console.error('Error updating post:', err);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <Loader className="animate-spin text-blue-500" size={32} />
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 text-red-500 rounded-lg max-w-xl mx-auto my-8">
//         <h2 className="text-lg font-semibold mb-2">Error Loading Post</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }
  
//   if (!post) {
//     return (
//       <div className="p-4 bg-gray-50 rounded-lg max-w-xl mx-auto my-8">
//         <h2 className="text-lg font-semibold mb-2">Post Not Found</h2>
//         <p>The post you're looking for doesn't exist or has been removed.</p>
//       </div>
//     );
//   }
  
//   return (
//     <div className="max-w-xl mx-auto my-8 px-4">
//       <PostRenderer 
//         contentBlocks={post.parsedContent || []}
//         author={post.username || post.user?.name || 'Unknown User'}
//         timestamp={new Date(post.createdAt)}
//         // onUpdatePost={handlePostUpdate}
//       />
      
//       {/* Additional post metadata */}
//       <div className="mt-4 text-sm text-gray-500">
//         {post.views || 0} views • Last updated {new Date(post.updatedAt).toLocaleDateString()}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

// Import the PostRenderer component
import PostRenderer from '../../_components/PostRenderer';
import ThreadedReplies from '../../_components/ThreadedReplies';

export default function PostPage() {
  const params = useParams();
  const postId = params.postId;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReply, setIsReply] = useState(false);
  
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
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg max-w-xl mx-auto my-8">
        <h2 className="text-lg font-semibold mb-2">Error Loading Post</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg max-w-xl mx-auto my-8">
        <h2 className="text-lg font-semibold mb-2">Post Not Found</h2>
        <p>The post you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-xl mx-auto my-8 px-4">
      {/* Display Parent Post Link if this is a reply */}
      {isReply && post.parentId && (
        <div className="mb-4 text-sm">
          <div className="flex items-center text-blue-500">
            <span className="mr-2">↩</span>
            <a href={`/post/${post.parentId}`} className="hover:underline">
              View Parent Post
            </a>
          </div>
        </div>
      )}
      
      {/* Post Content */}
      <PostRenderer 
        contentBlocks={post.parsedContent || []}
        author={post.username || post.user?.name || 'Unknown User'}
        timestamp={new Date(post.createdAt)}
        onUpdatePost={handlePostUpdate}
      />
      
      {/* Additional post metadata */}
      <div className="mt-4 text-sm text-gray-500">
        {post.views || 0} views • Last updated {new Date(post.updatedAt).toLocaleDateString()}
      </div>
      
      {/* Threaded Replies */}
      <ThreadedReplies postId={postId} />
    </div>
  );
}
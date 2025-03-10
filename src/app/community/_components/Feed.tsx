// "use client";
// import React, { useState, useEffect } from 'react';
// import { Loader } from 'lucide-react';
// import Link from 'next/link';
// import PostRenderer from './PostRenderer';
// import { PostViewTracker } from './view-tracker';

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/posts/get-posts');

//         if (!response.ok) {
//           throw new Error(`Failed to fetch posts: ${response.statusText}`);
//         }

//         const data = await response.json();
        
//         if (data.success && data.data) {
//           // Process posts to parse content if needed
//           const processedPosts = data.data.map(post => {
//             // Parse content if it's a string
//             if (post.content && typeof post.content === 'string') {
//               try {
//                 post.parsedContent = JSON.parse(post.content);
//               } catch (err) {
//                 console.error('Error parsing post content:', err);
//                 post.parsedContent = [];
//               }
//             } else {
//               post.parsedContent = post.content || [];
//             }
            
//             return post;
//           });
          
//           setPosts(processedPosts);
//         } else {
//           throw new Error('Failed to get posts data');
//         }
//       } catch (err) {
//         console.error('Error fetching posts:', err);
//         setError(err.message || 'Failed to load posts');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <div className="text-center">
//           <Loader className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
//           <p className="text-gray-500">Loading posts...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 text-red-500 rounded-lg max-w-xl mx-auto my-6 shadow-sm">
//         <h2 className="text-lg font-semibold mb-2">Error Loading Posts</h2>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()} 
//           className="mt-4 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!posts || posts.length === 0) {
//     return (
//       <div className="p-6 bg-white rounded-lg max-w-xl mx-auto my-6 shadow-sm text-center">
//         <h2 className="text-lg font-semibold mb-2">No Posts Found</h2>
//         <p className="text-gray-600 mb-4">There are no posts available at this time.</p>
//         <div className="border-t pt-4 mt-4">
//           <p className="text-sm text-gray-500">Check back later for new content</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 py-6">
//       <div className="space-y-6 max-w-xl mx-auto px-4">
//         {posts.map(post => (
//           <PostViewTracker key={post.id} postId={post.id}>
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <PostRenderer
//                 postId={post.id}
//                 contentBlocks={post.parsedContent || []}
//                 author={post.username || post.user?.name || 'Anonymous User'}
//                 timestamp={new Date(post.createdAt)}
//                 upvotes={post.upvotes || []}
//                 downvotes={post.downvotes || []}
//                 views={post.views || 0}
//                 poll={post.poll}
//                 totalReplies={post.totalReplies || 0} // Pass the total replies count
//               />
//             </div>
//           </PostViewTracker>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;
"use client";
import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import PostRenderer from './PostRenderer';
import { PostViewTracker } from './view-tracker';

const Feed = ({ searchQuery = '' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 20;

  useEffect(() => {
    // Reset when search query changes
    if (searchQuery) {
      setPosts([]);
      setPage(1);
      setHasMore(true);
    }
    
    fetchPosts();
  }, [searchQuery, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Construct the API endpoint with query parameters
      let endpoint = `/api/posts/get-posts?page=${page}&limit=${postsPerPage}`;
      if (searchQuery) {
        endpoint += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        // Check if we've reached the end of available posts
        if (data.data.length < postsPerPage) {
          setHasMore(false);
        }
        
        // Process posts to parse content if needed
        const processedPosts = data.data.map(post => {
          // Parse content if it's a string
          if (post.content && typeof post.content === 'string') {
            try {
              post.parsedContent = JSON.parse(post.content);
            } catch (err) {
              console.error('Error parsing post content:', err);
              post.parsedContent = [];
            }
          } else {
            post.parsedContent = post.content || [];
          }
          
          return post;
        });
        
        // If loading more posts (page > 1), append them; otherwise replace
        if (page > 1) {
          setPosts(prevPosts => [...prevPosts, ...processedPosts]);
        } else {
          setPosts(processedPosts);
        }
      } else {
        throw new Error('Failed to get posts data');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Show loader only on initial load, not when loading more
  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <Loader className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
          <p className="text-gray-500">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-500 rounded-lg max-w-xl mx-auto my-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Error Loading Posts</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setPage(1);
            fetchPosts();
          }} 
          className="mt-4 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg max-w-full mx-auto my-6 shadow-sm text-center">
        <h2 className="text-lg font-semibold mb-2">No Posts Found</h2>
        <p className="text-gray-600 mb-4">
          {searchQuery 
            ? `No posts match your search for "${searchQuery}"`
            : "There are no posts available at this time."}
        </p>
        {searchQuery && (
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View All Posts
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <div className="space-y-6 w-full md:w-3/4 mx-auto">
      {posts.map(post => (
        <PostViewTracker key={post.id} postId={post.id}>
        <PostRenderer
          postId={post.id}
          contentBlocks={post.parsedContent || []}
          author={post.username || post.user?.name || 'Anonymous User'}
          timestamp={new Date(post.createdAt)}
          upvotes={post.upvotes || []}
          downvotes={post.downvotes || []}
          views={post.views || 0}
          poll={post.poll}
          totalReplies={post.totalReplies || 0}
        />
        </PostViewTracker>
      ))}
      
      {/* Load more button - controlled by parent component */}
      {loading && page > 1 && (
        <div className="text-center py-4">
        <Loader className="animate-spin text-blue-500 mx-auto" size={24} />
        <p className="text-gray-500 mt-2">Loading more posts...</p>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="text-center">
        <button 
          onClick={loadMorePosts}
          className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:shadow-md transition-all"
        >
          Load More
        </button>
        </div>
      )}
      </div>
      <div className="w-1/4">
      {/* Additional content can be placed here */}
      </div>
    </div>
  );
};

export default Feed;
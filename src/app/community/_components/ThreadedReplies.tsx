// "use client";
// import React, { useState, useEffect } from 'react';
// import { ThumbsUp, ThumbsDown, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import Link from 'next/link';

// // Current user mock - would come from auth context in a real app
// const CURRENT_USER = {
//   id: "user-1",
//   name: "John Doe"
// };

// const Reply = ({ reply, level = 0, maxLevel = 2 }) => {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [showFullReplies, setShowFullReplies] = useState(false);
//   const [displayedReplies, setDisplayedReplies] = useState([]);
//   const [hasMoreReplies, setHasMoreReplies] = useState(false);
//   const [isUpvoted, setIsUpvoted] = useState(false);
//   const [isDownvoted, setIsDownvoted] = useState(false);
//   const [voteCount, setVoteCount] = useState(reply.upvotes?.length - reply.downvotes?.length || 0);

//   const isMaximumDepth = level >= maxLevel;
//   const formattedDate = new Date(reply.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });

//   useEffect(() => {
//     // Only show the first 2 replies and set hasMore flag if needed
//     if (reply.replies && reply.replies.length > 0) {
//       setDisplayedReplies(reply.replies.slice(0, 2));
//       setHasMoreReplies(reply.replies.length > 2);
//     }

//     // Check if current user has already voted
//     if (reply.upvotes?.includes(CURRENT_USER.id)) {
//       setIsUpvoted(true);
//     } else if (reply.downvotes?.includes(CURRENT_USER.id)) {
//       setIsDownvoted(true);
//     }
//   }, [reply.replies, reply.upvotes, reply.downvotes]);

//   const handleUpvote = async () => {
//     // Toggle upvote state locally first
//     let newVoteCount = voteCount;
    
//     if (isUpvoted) {
//       setIsUpvoted(false);
//       newVoteCount--;
//     } else {
//       setIsUpvoted(true);
//       newVoteCount++;
      
//       // If downvoted, remove downvote
//       if (isDownvoted) {
//         setIsDownvoted(false);
//         newVoteCount++;
//       }
//     }
    
//     setVoteCount(newVoteCount);
    
//     // Make API call to update vote
//     try {
//       await fetch(`/api/posts/vote`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           postId: reply.id,
//           userId: CURRENT_USER.id,
//           voteType: isUpvoted ? 'remove' : 'upvote'
//         })
//       });
//     } catch (error) {
//       console.error('Error updating vote:', error);
//       // Revert on error
//       setIsUpvoted(!isUpvoted);
//       setVoteCount(voteCount);
//     }
//   };

//   const handleDownvote = async () => {
//     // Toggle downvote state locally first
//     let newVoteCount = voteCount;
    
//     if (isDownvoted) {
//       setIsDownvoted(false);
//       newVoteCount++;
//     } else {
//       setIsDownvoted(true);
//       newVoteCount--;
      
//       // If upvoted, remove upvote
//       if (isUpvoted) {
//         setIsUpvoted(false);
//         newVoteCount--;
//       }
//     }
    
//     setVoteCount(newVoteCount);
    
//     // Make API call to update vote
//     try {
//       await fetch(`/api/posts/vote`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           postId: reply.id,
//           userId: CURRENT_USER.id,
//           voteType: isDownvoted ? 'remove' : 'downvote'
//         })
//       });
//     } catch (error) {
//       console.error('Error updating vote:', error);
//       // Revert on error
//       setIsDownvoted(!isDownvoted);
//       setVoteCount(voteCount);
//     }
//   };

//   const handleSubmitReply = async (e) => {
//     e.preventDefault();
    
//     if (!replyText.trim()) return;
    
//     try {
//       const response = await fetch('/api/posts/create-reply', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           content: replyText,
//           parentId: reply.id,
//           userId: CURRENT_USER.id,
//           username: CURRENT_USER.name
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to post reply');
//       }
      
//       const data = await response.json();
      
//       // Reset form and close it
//       setReplyText('');
//       setShowReplyForm(false);
      
//       // You'd typically refetch the thread here or update the state directly
//       // For now, let's just add it to displayed replies
//       setDisplayedReplies([...displayedReplies, data.post]);
      
//     } catch (error) {
//       console.error('Error posting reply:', error);
//     }
//   };

//   return (
//     <div className={`pl-${level > 0 ? '4' : '0'} border-l-2 border-gray-100 ml-${level > 0 ? '2' : '0'} mb-4`}>
//       <div className="p-3 bg-white rounded-lg">
//         {/* Vote Controls */}
//         <div className="flex">
//           <div className="flex flex-col items-center mr-3">
//             <button 
//               className={`p-1 rounded-md ${isUpvoted ? 'text-orange-500' : 'text-gray-500'} hover:bg-gray-100`}
//               onClick={handleUpvote}
//             >
//               <ThumbsUp size={16} />
//             </button>
//             <span className="text-xs font-medium my-1">{voteCount}</span>
//             <button 
//               className={`p-1 rounded-md ${isDownvoted ? 'text-blue-500' : 'text-gray-500'} hover:bg-gray-100`}
//               onClick={handleDownvote}
//             >
//               <ThumbsDown size={16} />
//             </button>
//           </div>
          
//           <div className="flex-1">
//             {/* Reply Header */}
//             <div className="flex items-center text-xs text-gray-500 mb-1">
//               <span className="font-medium text-gray-700">{reply.username}</span>
//               <span className="mx-1">•</span>
//               <span>{formattedDate}</span>
//             </div>
            
//             {/* Reply Content */}
//             <div className="text-sm mb-2">{reply.content}</div>
            
//             {/* Reply Actions */}
//             <div className="flex text-xs text-gray-500">
//               <button 
//                 className="mr-4 hover:text-gray-700"
//                 onClick={() => setShowReplyForm(!showReplyForm)}
//               >
//                 <MessageCircle size={14} className="inline mr-1" />
//                 Reply
//               </button>
              
//               {isMaximumDepth && reply.replies?.length > 0 && (
//                 <Link 
//                   href={`/post/${reply.id}`}
//                   className="hover:text-gray-700"
//                 >
//                   <span>Continue this thread</span>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Reply Form */}
//       {showReplyForm && (
//         <div className="ml-5 mt-2 mb-4">
//           <form onSubmit={handleSubmitReply}>
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//               rows={3}
//               placeholder="What are your thoughts?"
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//             />
//             <div className="flex justify-end mt-2">
//               <button
//                 type="button"
//                 className="px-3 py-1 mr-2 text-sm text-gray-500 hover:text-gray-700"
//                 onClick={() => setShowReplyForm(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
//                 disabled={!replyText.trim()}
//               >
//                 Reply
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
      
//       {/* Nested Replies */}
//       {!isMaximumDepth && displayedReplies.length > 0 && (
//         <div className="ml-5 mt-2">
//           {displayedReplies.map((nestedReply) => (
//             <Reply 
//               key={nestedReply.id} 
//               reply={nestedReply} 
//               level={level + 1} 
//               maxLevel={maxLevel} 
//             />
//           ))}
          
//           {hasMoreReplies && !showFullReplies && (
//             <button 
//               className="flex items-center text-sm text-gray-500 hover:text-gray-700 mt-2"
//               onClick={() => {
//                 setShowFullReplies(true);
//                 setDisplayedReplies(reply.replies);
//               }}
//             >
//               <ChevronDown size={16} className="mr-1" />
//               Show more replies
//             </button>
//           )}
          
//           {showFullReplies && displayedReplies.length > 2 && (
//             <button 
//               className="flex items-center text-sm text-gray-500 hover:text-gray-700 mt-2"
//               onClick={() => {
//                 setShowFullReplies(false);
//                 setDisplayedReplies(reply.replies.slice(0, 2));
//               }}
//             >
//               <ChevronUp size={16} className="mr-1" />
//               Show less
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const ThreadedReplies = ({ postId }) => {
//   const [replies, setReplies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [replyText, setReplyText] = useState('');
  
//   // Fetch replies
//   useEffect(() => {
//     const fetchReplies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(`/api/posts/get-replies?postId=${postId}`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch replies: ${response.statusText}`);
//         }
        
//         const data = await response.json();
//         setReplies(data.replies || []);
//       } catch (err) {
//         console.error('Error fetching replies:', err);
//         setError(err.message || 'Failed to load replies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (postId) {
//       fetchReplies();
//     }
//   }, [postId]);
  
//   const handleSubmitReply = async (e) => {
//     e.preventDefault();
    
//     if (!replyText.trim()) return;
    
//     try {
//       const response = await fetch('/api/posts/create-reply', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           content: replyText,
//           parentId: postId,
//           userId: CURRENT_USER.id,
//           username: CURRENT_USER.name
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to post reply');
//       }
      
//       const data = await response.json();
      
//       // Add new reply to the list
//       setReplies([data.post, ...replies]);
      
//       // Reset form
//       setReplyText('');
      
//     } catch (error) {
//       console.error('Error posting reply:', error);
//     }
//   };
  
//   // Loading state
//   if (loading) {
//     return (
//       <div className="text-center p-4">
//         <div className="animate-pulse">Loading replies...</div>
//       </div>
//     );
//   }
  
//   // Error state
//   if (error) {
//     return (
//       <div className="text-red-500 p-4 border border-red-200 rounded-lg">
//         <div>Error loading replies: {error}</div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="mt-6 bg-gray-50 p-4 rounded-lg">
//       <h2 className="text-lg font-medium mb-4">
//         {replies.length > 0 
//           ? `${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}`
//           : 'No replies yet'
//         }
//       </h2>
      
//       {/* Reply Form */}
//       <div className="mb-6">
//         <form onSubmit={handleSubmitReply}>
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//             rows={4}
//             placeholder="What are your thoughts?"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//           />
//           <div className="flex justify-end mt-2">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
//               disabled={!replyText.trim()}
//             >
//               Post Reply
//             </button>
//           </div>
//         </form>
//       </div>
      
//       {/* Replies List */}
//       <div>
//         {replies.map((reply) => (
//           <Reply key={reply.id} reply={reply} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ThreadedReplies;
"use client";
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// Use the auth context to get the current user
import { useAuth } from '@/context/authContext';

const Reply = ({ reply, level = 0, maxLevel = 2 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showFullReplies, setShowFullReplies] = useState(false);
  const [displayedReplies, setDisplayedReplies] = useState([]);
  const [hasMoreReplies, setHasMoreReplies] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(reply.upvotes?.length - reply.downvotes?.length || 0);
  
  // Get authenticated user from context
const { userId, vendorId, userType, userEmail } = useAuth();

const getActualUserId = () => {
    if (userType === 'vendor') {
        return vendorId;
    } else {
        return userId;
    }
};

console.log('userId:', userId);
console.log('vendorId:', vendorId);
console.log('userType:', userType);
console.log('userEmail:', userEmail);
console.log('Actual UserId:', getActualUserId());


  // Extract username from email
  const username = userEmail ? userEmail.split('@')[0] : 'anonymous';

  const isMaximumDepth = level >= maxLevel;
  const formattedDate = new Date(reply.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  useEffect(() => {
    // Only show the first 2 replies and set hasMore flag if needed
    if (reply.replies && reply.replies.length > 0) {
      setDisplayedReplies(reply.replies.slice(0, 2));
      setHasMoreReplies(reply.replies.length > 2);
    }

    // Check if current user has already voted
    if (userId && reply.upvotes?.includes(userId)) {
      setIsUpvoted(true);
    } else if (userId && reply.downvotes?.includes(userId)) {
      setIsDownvoted(true);
    }
  }, [reply.replies, reply.upvotes, reply.downvotes, userId]);

  const handleUpvote = async () => {
    // Check if user is logged in
    if (!userId) {
      alert('Please log in to vote');
      return;
    }
    
    // Toggle upvote state locally first
    let newVoteCount = voteCount;
    
    if (isUpvoted) {
      setIsUpvoted(false);
      newVoteCount--;
    } else {
      setIsUpvoted(true);
      newVoteCount++;
      
      // If downvoted, remove downvote
      if (isDownvoted) {
        setIsDownvoted(false);
        newVoteCount++;
      }
    }
    
    setVoteCount(newVoteCount);
    
    // Make API call to update vote
    try {
      await fetch(`/api/posts/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: reply.id,
          voteType: isUpvoted ? 'remove' : 'upvote'
        })
      });
    } catch (error) {
      console.error('Error updating vote:', error);
      // Revert on error
      setIsUpvoted(!isUpvoted);
      setVoteCount(voteCount);
    }
  };

  const handleDownvote = async () => {
    // Check if user is logged in
    if (!userId) {
      alert('Please log in to vote');
      return;
    }
    
    // Toggle downvote state locally first
    let newVoteCount = voteCount;
    
    if (isDownvoted) {
      setIsDownvoted(false);
      newVoteCount++;
    } else {
      setIsDownvoted(true);
      newVoteCount--;
      
      // If upvoted, remove upvote
      if (isUpvoted) {
        setIsUpvoted(false);
        newVoteCount--;
      }
    }
    
    setVoteCount(newVoteCount);
    
    // Make API call to update vote
    try {
      await fetch(`/api/posts/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: reply.id,
          voteType: isDownvoted ? 'remove' : 'downvote'
        })
      });
    } catch (error) {
      console.error('Error updating vote:', error);
      // Revert on error
      setIsDownvoted(!isDownvoted);
      setVoteCount(voteCount);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    console.log(getActualUserId)
    if (!getActualUserId) {
      alert('Please log in to reply');
      return;
    }
    
    if (!replyText.trim()) return;
    
    try {
      const response = await fetch('/api/posts/create-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: replyText,
          parentId: reply.id,
          username
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to post reply');
      }
      
      const data = await response.json();
      
      // Reset form and close it
      setReplyText('');
      setShowReplyForm(false);
      
      // You'd typically refetch the thread here or update the state directly
      // For now, let's just add it to displayed replies
      setDisplayedReplies([...displayedReplies, data.post]);
      
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div className={`pl-${level > 0 ? '4' : '0'} border-l-2 border-gray-100 ml-${level > 0 ? '2' : '0'} mb-4`}>
      <div className="p-3 bg-white rounded-lg">
        {/* Vote Controls */}
        <div className="flex">
          <div className="flex flex-col items-center mr-3">
            <button 
              className={`p-1 rounded-md ${isUpvoted ? 'text-orange-500' : 'text-gray-500'} hover:bg-gray-100`}
              onClick={handleUpvote}
            >
              <ThumbsUp size={16} />
            </button>
            <span className="text-xs font-medium my-1">{voteCount}</span>
            <button 
              className={`p-1 rounded-md ${isDownvoted ? 'text-blue-500' : 'text-gray-500'} hover:bg-gray-100`}
              onClick={handleDownvote}
            >
              <ThumbsDown size={16} />
            </button>
          </div>
          
          <div className="flex-1">
            {/* Reply Header */}
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{reply.username}</span>
              <span className="mx-1">•</span>
              <span>{formattedDate}</span>
            </div>
            
            {/* Reply Content */}
            <div className="text-sm mb-2">{reply.content}</div>
            
            {/* Reply Actions */}
            <div className="flex text-xs text-gray-500">
              <button 
                className="mr-4 hover:text-gray-700"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <MessageCircle size={14} className="inline mr-1" />
                Reply
              </button>
              
              {isMaximumDepth && reply.replies?.length > 0 && (
                <Link 
                  href={`/post/${reply.id}`}
                  className="hover:text-gray-700"
                >
                  <span>Continue this thread</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reply Form */}
      {showReplyForm && (
        <div className="ml-5 mt-2 mb-4">
          <form onSubmit={handleSubmitReply}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
              placeholder="What are your thoughts?"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="px-3 py-1 mr-2 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                disabled={!replyText.trim()}
              >
                Reply
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Nested Replies */}
      {!isMaximumDepth && displayedReplies.length > 0 && (
        <div className="ml-5 mt-2">
          {displayedReplies.map((nestedReply) => (
            <Reply 
              key={nestedReply.id} 
              reply={nestedReply} 
              level={level + 1} 
              maxLevel={maxLevel} 
            />
          ))}
          
          {hasMoreReplies && !showFullReplies && (
            <button 
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 mt-2"
              onClick={() => {
                setShowFullReplies(true);
                setDisplayedReplies(reply.replies);
              }}
            >
              <ChevronDown size={16} className="mr-1" />
              Show more replies
            </button>
          )}
          
          {showFullReplies && displayedReplies.length > 2 && (
            <button 
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 mt-2"
              onClick={() => {
                setShowFullReplies(false);
                setDisplayedReplies(reply.replies.slice(0, 2));
              }}
            >
              <ChevronUp size={16} className="mr-1" />
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ThreadedReplies = ({ postId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState('');
  // Get authenticated user from context
//   const { userId, userEmail } = useAuth();


  
  // Get authenticated user from context
const { userId, vendorId, userType, userEmail } = useAuth();

const getActualUserId = () => {
    if (userType === 'vendor') {
        return vendorId;
    } else {
        return userId;
    }
};

console.log('userId:', userId);
console.log('vendorId:', vendorId);
console.log('userType:', userType);
console.log('userEmail:', userEmail);
console.log('Actual UserId:', getActualUserId());
  
  // Extract username from email
  const username = userEmail ? userEmail.split('@')[0] : 'anonymous';
  
  // Fetch replies
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/posts/get-replies?postId=${postId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch replies: ${response.statusText}`);
        }
        
        const data = await response.json();
        setReplies(data.replies || []);
      } catch (err) {
        console.error('Error fetching replies:', err);
        setError(err.message || 'Failed to load replies');
      } finally {
        setLoading(false);
      }
    };
    
    if (postId) {
      fetchReplies();
    }
  }, [postId]);
  
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!getActualUserId) {
      alert('Please log in to reply');
      return;
    }
    
    if (!replyText.trim()) return;
    
    try {
      const response = await fetch('/api/posts/create-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: replyText,
          parentId: postId,
          username,
          userId:getActualUserId,
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to post reply');
      }
      
      const data = await response.json();
      
      // Add new reply to the list
      setReplies([data.post, ...replies]);
      
      // Reset form
      setReplyText('');
      
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">Loading replies...</div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded-lg">
        <div>Error loading replies: {error}</div>
      </div>
    );
  }
  
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-medium mb-4">
        {replies.length > 0 
          ? `${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}`
          : 'No replies yet'
        }
      </h2>
      
      {/* Reply Form */}
      <div className="mb-6">
        <form onSubmit={handleSubmitReply}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={4}
            placeholder="What are your thoughts?"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={!replyText.trim()}
            >
              Post Reply
            </button>
          </div>
        </form>
      </div>
      
      {/* Replies List */}
      <div>
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default ThreadedReplies;
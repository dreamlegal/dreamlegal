

// "use client"
// import React, { useState, useEffect } from 'react';
// import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Check ,Share ,ExternalLink ,Send} from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// import ThreadedReplies from './ThreadedReplies';

// // Helper function to get domain from URL for preview
// const getDomain = (url) => {
//   try {
//     if (!url) return 'example.com';
//     if (!url.startsWith('http')) url = 'https://' + url;
//     return new URL(url).hostname;
//   } catch (e) {
//     return 'example.com';
//   }
// };

// // This component takes the contentBlocks data from PostCreator and renders it
// const PostRenderer = ({ 
//   totalReplies,
//   postId, 
//   contentBlocks, 
//   author = "John Doe", 
//   timestamp = new Date(), 
//   onUpdatePost = null, 
//   upvotes = [], 
//   downvotes = [], 
//   poll = null,
//   views = 0 // New prop for view count
// }) => {
//   // Get the current user ID from auth hook
//   const { userId, vendorId, userType, userEmail } = useAuth();
  
//   // Get the correct user ID based on user type
//   const getCurrentUserId = () => {
//     if (userType === 'vendor') {
//       return vendorId;
//     } else {
//       return userId;
//     }
//   };
  
//   const currentUserId = getCurrentUserId();
  
//   // Format the date
//   const formattedDate = new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format(timestamp);
  
//   // Initialize poll state with data from both contentBlocks and the poll prop
//   const [polls, setPolls] = useState(() => {
//     const pollState = {};
    
//     // First check if we have a dedicated poll prop
//     if (poll) {
//       pollState["main-poll"] = {
//         options: poll.options.map(option => ({
//           text: option.title,
//           votes: option.voters || []
//         })),
//         type: poll.isMultiselect ? 'multiple' : 'single',
//         question: poll.title || '',
//         settings: {
//           allowMultiple: poll.isMultiselect
//         }
//       };
//     }
    
//     // Then process any polls in contentBlocks
//     if (contentBlocks && Array.isArray(contentBlocks)) {
//       contentBlocks.forEach(block => {
//         if (block.type === 'poll') {
//           // For contentBlocks, we need to parse the content if it's a string
//           let pollContent = block.content;
//           if (typeof block.content === 'string') {
//             try {
//               pollContent = JSON.parse(block.content);
//             } catch (e) {
//               console.error("Failed to parse poll content:", e);
//             }
//           }
          
//           pollState[block.id] = {
//             // Initialize votes as empty arrays if not present
//             options: (pollContent.options || []).map(option => ({
//               text: option.title || (typeof option === 'string' ? option : (option.text || '')),
//               votes: Array.isArray(option.voters || option.votes) ? (option.voters || option.votes) : []
//             })),
//             type: pollContent.type || (pollContent.isMultiselect ? 'multiple' : 'single'),
//             question: pollContent.question || pollContent.title || '',
//             settings: {
//               allowMultiple: pollContent.isMultiselect || pollContent.type === 'multiple'
//             }
//           };
//         }
//       });
//     }
    
//     return pollState;
//   });
  
//   // State for votes (upvote/downvote)
//   const [votes, setVotes] = useState({
//     upvotes: upvotes || [],
//     downvotes: downvotes || [],
//     hasUpvoted: (upvotes || []).includes(currentUserId),
//     hasDownvoted: (downvotes || []).includes(currentUserId)
//   });
  
//   // Update votes when props change or user ID changes
//   useEffect(() => {
//     setVotes({
//       upvotes: upvotes || [],
//       downvotes: downvotes || [],
//       hasUpvoted: (upvotes || []).includes(currentUserId),
//       hasDownvoted: (downvotes || []).includes(currentUserId)
//     });
//   }, [upvotes, downvotes, currentUserId]);
  
//   // State for comments visibility
//   const [showComments, setShowComments] = useState(false);
  
//   // Handle poll vote with error handling and console logging
//   const handleVote = async (pollId, optionIndex) => {
//     try {
//       console.log('Voting on poll:', pollId, 'option:', optionIndex, 'user:', currentUserId);
      
//       // Update local state optimistically
//       setPolls(currentPolls => {
//         const pollData = currentPolls[pollId];
//         if (!pollData) return currentPolls;
        
//         const updatedOptions = [...pollData.options];
        
//         // For single choice polls, remove user from all other options first
//         if (!pollData.settings.allowMultiple) {
//           updatedOptions.forEach(option => {
//             option.votes = option.votes.filter(id => id !== currentUserId);
//           });
//         }
        
//         // Check if user already voted for this option
//         const alreadyVoted = updatedOptions[optionIndex].votes.includes(currentUserId);
        
//         if (alreadyVoted) {
//           // Remove vote if already voted
//           updatedOptions[optionIndex].votes = updatedOptions[optionIndex].votes.filter(id => id !== currentUserId);
//         } else {
//           // Add vote
//           updatedOptions[optionIndex].votes = [...updatedOptions[optionIndex].votes, currentUserId];
//         }
        
//         return {
//           ...currentPolls,
//           [pollId]: {
//             ...pollData,
//             options: updatedOptions
//           }
//         };
//       });
      
//       // Call the API endpoint
//       const response = await fetch('/api/posts/poll-vote', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           postId,
//           pollId,
//           optionIndex,
//           userId: currentUserId
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`Poll vote failed: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Poll vote successful, response:', data);
      
//       // ALWAYS update state with server response to ensure consistency across clients
//       if (data.poll) {
//         setPolls(currentPolls => {
//           // Create a new poll object with the server data
//           const updatedPoll = {
//             options: data.poll.options.map(opt => ({
//               text: opt.title || "",
//               votes: opt.voters || []
//             })),
//             type: data.poll.isMultiselect ? 'multiple' : 'single',
//             question: data.poll.title || '',
//             settings: {
//               allowMultiple: data.poll.isMultiselect
//             }
//           };
          
//           return {
//             ...currentPolls,
//             [pollId]: updatedPoll
//           };
//         });
//       }
//     } catch (error) {
//       console.error('Error updating poll vote:', error);
//       // Get fresh data from server to reset optimistic update
//       try {
//         const response = await fetch(`/api/posts?postId=${postId}`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.post && data.post.poll) {
//             // Update polls state with fresh data
//             setPolls(currentPolls => {
//               // Create a new poll object with the fresh data
//               const freshPoll = {
//                 options: data.post.poll.options.map(opt => ({
//                   text: opt.title || "",
//                   votes: opt.voters || []
//                 })),
//                 type: data.post.poll.isMultiselect ? 'multiple' : 'single',
//                 question: data.post.poll.title || '',
//                 settings: {
//                   allowMultiple: data.post.poll.isMultiselect
//                 }
//               };
              
//               return {
//                 ...currentPolls,
//                 [pollId]: freshPoll
//               };
//             });
//           }
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh poll data:', refreshError);
//       }
//     }
//   };
  
//   // Handle vote (upvote or downvote) with better logging
//   const handleVotePost = async (voteType) => {
//     try {
//       console.log(`User ${currentUserId} attempting to ${voteType} post ${postId}`);
//       console.log("Current votes state:", votes);
      
//       // Create a copy of the current votes
//       const newVotes = {
//         upvotes: [...votes.upvotes],
//         downvotes: [...votes.downvotes],
//         hasUpvoted: votes.hasUpvoted,
//         hasDownvoted: votes.hasDownvoted
//       };
      
//       if (voteType === 'upvote') {
//         if (votes.hasUpvoted) {
//           // Remove upvote if already upvoted
//           console.log("Removing upvote (toggle off)");
//           newVotes.upvotes = newVotes.upvotes.filter(id => id !== currentUserId);
//           newVotes.hasUpvoted = false;
//         } else {
//           // Add upvote
//           console.log("Adding upvote");
//           newVotes.upvotes.push(currentUserId);
//           newVotes.hasUpvoted = true;
          
//           // Remove from downvotes if present
//           if (votes.hasDownvoted) {
//             console.log("Removing previous downvote");
//             newVotes.downvotes = newVotes.downvotes.filter(id => id !== currentUserId);
//             newVotes.hasDownvoted = false;
//           }
//         }
//       } else if (voteType === 'downvote') {
//         if (votes.hasDownvoted) {
//           // Remove downvote if already downvoted
//           console.log("Removing downvote (toggle off)");
//           newVotes.downvotes = newVotes.downvotes.filter(id => id !== currentUserId);
//           newVotes.hasDownvoted = false;
//         } else {
//           // Add downvote
//           console.log("Adding downvote");
//           newVotes.downvotes.push(currentUserId);
//           newVotes.hasDownvoted = true;
          
//           // Remove from upvotes if present
//           if (votes.hasUpvoted) {
//             console.log("Removing previous upvote");
//             newVotes.upvotes = newVotes.upvotes.filter(id => id !== currentUserId);
//             newVotes.hasUpvoted = false;
//           }
//         }
//       }
      
//       // Update state optimistically
//       console.log("Updating state optimistically:", newVotes);
//       setVotes(newVotes);
      
//       // Make the API call
//       console.log("Calling API");
//       const response = await fetch('/api/posts/vote', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           postId,
//           userId: currentUserId,
//           voteType
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`Post vote failed: ${response.status} ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log("API response:", data);
      
//       // Update with server response data to ensure consistency
//       if (data.votes) {
//         console.log("Updating state with server data:", data.votes);
//         setVotes({
//           upvotes: data.votes.upvotes || [],
//           downvotes: data.votes.downvotes || [],
//           hasUpvoted: (data.votes.upvotes || []).includes(currentUserId),
//           hasDownvoted: (data.votes.downvotes || []).includes(currentUserId)
//         });
//       }
//     } catch (error) {
//       console.error(`Error ${voteType}ing post:`, error);
      
//       // Fetch fresh data from server to reset UI state
//       try {
//         const response = await fetch(`/api/posts?postId=${postId}`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.post) {
//             setVotes({
//               upvotes: data.post.upvotes || [],
//               downvotes: data.post.downvotes || [],
//               hasUpvoted: (data.post.upvotes || []).includes(currentUserId),
//               hasDownvoted: (data.post.downvotes || []).includes(currentUserId)
//             });
//           }
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh post data:', refreshError);
//       }
//     }
//   };

//   // Render a specific content block
//   const renderContentBlock = (block) => {
//     switch (block?.type) {
//       case 'text':
//         return (
//           <div key={block.id} className="mb-4">
//             {/* Split text by newlines and preserve formatting */}
//             {block.content?.split('\n').map((line, i) => (
//               <p key={i} className="text-gray-800">
//                 {line || <br />}
//               </p>
//             ))}
//           </div>
//         );
        
//       case 'image':
//         return (
//           <div key={block.id} className="mb-4">
//             <img 
//               src={block.content?.fileUrl || block.content?.previewUrl} 
//               alt={block.content?.caption || "Post image"} 
//               className="w-full rounded-lg" 
//             />
//             {block.content?.caption && (
//               <p className="text-sm text-gray-500 mt-1">{block.content.caption}</p>
//             )}
//           </div>
//         );
        
//       case 'link':
//         return (
//           <div key={block.id} className="mb-4">
//             <a 
//               href={block.content?.url?.startsWith('http') ? block.content.url : `https://${block.content?.url}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block p-3 border rounded-lg hover:bg-gray-50"
//             >
//               <div className="text-blue-600 text-sm font-medium">
//                 {block.content?.url}
//               </div>
//               <div className="text-gray-500 text-xs mt-1">
//                 {getDomain(block.content?.url)}
//               </div>
//             </a>
//           </div>
//         );
        
//       case 'poll':
//         // Get poll data from state
//         const pollData = polls[block.id];
//         if (!pollData) return null;
        
//         // Calculate total votes
//         const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes.length, 0);
        
//         return (
//           <div key={block.id} className="mb-4 border rounded-lg p-4">
//             {pollData.question && (
//               <h3 className="text-lg font-medium mb-2">{pollData.question}</h3>
//             )}
            
//             <div className="text-xs text-gray-500 mb-3">
//               {pollData.settings.allowMultiple ? 'Multiple choice poll' : 'Single choice poll'} · 
//               {' '}{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
//             </div>
            
//             <div className="space-y-2">
//               {pollData.options.map((option, idx) => {
//                 const voteCount = option.votes.length;
//                 const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
//                 const isVoted = option.votes.includes(currentUserId);
                
//                 return (
//                   <button
//                     key={idx}
//                     className={`w-full text-left p-3 rounded-lg border relative overflow-hidden ${
//                       isVoted ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                     }`}
//                     onClick={() => handleVote(block.id, idx)}
//                   >
//                     {/* Background fill based on votes */}
//                     <div 
//                       className="absolute left-0 top-0 bottom-0 bg-blue-100 z-0"
//                       style={{ 
//                         width: `${percentage}%`,
//                         transition: 'width 0.3s ease'
//                       }}
//                     />
                    
//                     {/* Option content */}
//                     <div className="flex items-center justify-between z-10 relative">
//                       <div className="flex items-center">
//                         {pollData.settings.allowMultiple ? (
//                           <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
//                             isVoted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'
//                           }`}>
//                             {isVoted && <Check size={16} />}
//                           </div>
//                         ) : (
//                           <div className={`w-5 h-5 rounded-full mr-2 ${
//                             isVoted ? 'bg-blue-500 border-blue-500' : 'border border-gray-400'
//                           }`} />
//                         )}
//                         <span>{option.text}</span>
//                       </div>
//                       <div className="text-sm font-medium">
//                         {percentage}%
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
            
//             {/* Add a small footer with instructions if multiple choice */}
//             {pollData.settings.allowMultiple && (
//               <div className="mt-3 text-xs text-gray-500">
//                 You may select multiple options
//               </div>
//             )}
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   // Render the standalone poll if present (from the poll prop)
//   const renderMainPoll = () => {
//     const pollData = polls["main-poll"];
//     if (!pollData) return null;
    
//     // Calculate total votes
//     const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes.length, 0);
    
//     return (
//       <div className="mb-4 border rounded-lg p-4">
//         {pollData.question && (
//           <h3 className="text-lg font-medium mb-2">{pollData.question}</h3>
//         )}
        
//         <div className="text-xs text-gray-500 mb-3">
//           {pollData.settings.allowMultiple ? 'Multiple choice poll' : 'Single choice poll'} · 
//           {' '}{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
//         </div>
        
//         <div className="space-y-2">
//           {pollData.options.map((option, idx) => {
//             const voteCount = option.votes.length;
//             const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
//             const isVoted = option.votes.includes(currentUserId);
            
//             return (
//               <button
//                 key={idx}
//                 className={`w-full text-left p-3 rounded-lg border relative overflow-hidden ${
//                   isVoted ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                 }`}
//                 onClick={() => handleVote("main-poll", idx)}
//               >
//                 {/* Background fill based on votes */}
//                 <div 
//                   className="absolute left-0 top-0 bottom-0 bg-blue-100 z-0"
//                   style={{ 
//                     width: `${percentage}%`,
//                     transition: 'width 0.3s ease'
//                   }}
//                 />
                
//                 {/* Option content */}
//                 <div className="flex items-center justify-between z-10 relative">
//                   <div className="flex items-center">
//                     {pollData.settings.allowMultiple ? (
//                       <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
//                         isVoted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'
//                       }`}>
//                         {isVoted && <Check size={16} />}
//                       </div>
//                     ) : (
//                       <div className={`w-5 h-5 rounded-full mr-2 ${
//                         isVoted ? 'bg-blue-500 border-blue-500' : 'border border-gray-400'
//                       }`} />
//                     )}
//                     <span>{option.text}</span>
//                   </div>
//                   <div className="text-sm font-medium">
//                     {percentage}%
//                   </div>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
        
//         {/* Add a small footer with instructions if multiple choice */}
//         {pollData.settings.allowMultiple && (
//           <div className="mt-3 text-xs text-gray-500">
//             You may select multiple options
//           </div>
//         )}
//       </div>
//     );
//   };

//   // If no content blocks, show the poll if it exists, otherwise show no content message
//   if (!contentBlocks || !Array.isArray(contentBlocks) || contentBlocks.length === 0) {
//     if (polls["main-poll"]) {
//       return (
//         <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
//           <div className="p-4 border-b">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
//                 <span className="text-gray-600 font-medium">{author.substring(0, 2).toUpperCase()}</span>
//               </div>
//               <div>
//                 <div className="font-medium">{author}</div>
//                 <div className="text-xs text-gray-500">Posted {formattedDate}</div>
//               </div>
//             </div>
//           </div>
//           <div className="p-4">
//             {renderMainPoll()}
//           </div>
          
//           {/* Post Stats */}
//           <div className="px-4 py-2 flex items-center space-x-6 text-sm border-t">
//             <button 
//               className={`flex items-center ${votes.hasUpvoted ? 'text-green-500' : 'text-gray-500'} hover:text-green-600`}
//               onClick={() => handleVotePost('upvote')}
//             >
//               <ThumbsUp size={16} className="mr-1" />
//               <span>{votes.upvotes.length}</span>
//             </button>
            
//             <button 
//               className={`flex items-center ${votes.hasDownvoted ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
//               onClick={() => handleVotePost('downvote')}
//             >
//               <ThumbsDown size={16} className="mr-1" />
//               <span>{votes.downvotes.length}</span>
//             </button>
            
//             <div className="text-sm text-gray-500">
//               Score: {votes.upvotes.length - votes.downvotes.length}
//             </div>
            
//             <div className="flex items-center text-gray-500">
//               <Eye size={16} className="mr-1" />
//               <span>{views}</span>
//             </div>
//           </div>
          
//           {/* Comment Action */}
//           <div className="p-4 border-t">
//             <button 
//               className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
//               onClick={() => setShowComments(!showComments)}
//             >
//               <MessageCircle size={18} className="mr-2" />
//               {showComments ? "Hide comments" : "Reply and view all comments"}
//             </button>
            
//             {/* Comments Section */}
//             {showComments && (
//               <ThreadedReplies postId={postId} />
//             )}
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
//         <div className="p-4">
//           <p className="text-gray-500 text-center">This post has no content</p>
//         </div>
//       </div>
//     );
//   }
  

//   return (
//     <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
//       {/* Post Header */}
//       <div className="p-4 border-b">
//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
//             <span className="text-gray-600 font-medium">{author.substring(0, 2).toUpperCase()}</span>
//           </div>
//           <div>
//             <div className="font-medium">{author}</div>
//             <div className="text-xs text-gray-500">Posted {formattedDate}</div>
//           </div>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="p-4">
//         {/* Render the main poll if present */}
//         {polls["main-poll"] && renderMainPoll()}
        
//         {/* Render content blocks */}
//         {contentBlocks.map((block) => (
//           <React.Fragment key={block.id}>
//             {renderContentBlock(block)}
//           </React.Fragment>
//         ))}
//       </div>
      
//       {/* Post Stats */}
//       <div className="px-4 py-2 flex items-center justify-between text-sm border-t">
//         <div className="flex items-center space-x-6">
//           <button 
//             className={`flex items-center ${votes.hasUpvoted ? 'text-green-500' : 'text-gray-500'} hover:text-green-600`}
//             onClick={() => handleVotePost('upvote')}
//           >
//             <ThumbsUp size={16} className="mr-1" />
//             <span>{votes.upvotes.length}</span>
//           </button>
          
//           <button 
//             className={`flex items-center ${votes.hasDownvoted ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
//             onClick={() => handleVotePost('downvote')}
//           >
//             <ThumbsDown size={16} className="mr-1" />
//             <span>{votes.downvotes.length}</span>
//           </button>
          
//           <div className="text-sm text-gray-500">
//             Score: {votes.upvotes.length - votes.downvotes.length}
//           </div>
//         </div>
        
//         <div className="flex items-center text-gray-500">
//           <Eye size={16} className="mr-1" />
//           <span>{views} views</span>
//         </div>
//         <div className="flex items-center text-gray-500">
//           <MessageCircle size={16} className="mr-1" />
//           <span>{totalReplies} Comments</span>
//         </div>
//         <a href={`/community/post/${postId}`} className="flex items-center text-gray-500">
//           <ExternalLink size={16} className="mr-1" />
//           Open
//         </a>    
//         <button 
//           className="flex items-center text-gray-500 hover:text-gray-700"
//           onClick={() => {
//             navigator.clipboard.writeText(`${window.location.origin}/community/post/${postId}`);
//             alert('Link copied to clipboard!');
//           }}
//         >
//           <Send size={16} className="mr-1" />
//           Send Link
//         </button>    </div>

//       {/* Comment Action */}
//       <div className="p-4 border-t">
//         <button 
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
//           onClick={() => setShowComments(!showComments)}
//         >
//           <MessageCircle size={18} className="mr-2" />
//           {showComments ? "Hide comments" : "Reply and view all comments"}
//         </button>
        
//         {/* Comments Section */}
//         {showComments && (
//           <ThreadedReplies postId={postId} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostRenderer;
"use client"
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Check, Share, ExternalLink, Send, Calendar, Clock, Award, BookmarkPlus, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import ThreadedReplies from './ThreadedReplies';

// Helper function to get domain from URL for preview
const getDomain = (url) => {
  try {
    if (!url) return 'example.com';
    if (!url.startsWith('http')) url = 'https://' + url;
    return new URL(url).hostname;
  } catch (e) {
    return 'example.com';
  }
};

// Helper function to format time ago
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now - then) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
  return `${Math.floor(seconds / 31536000)} years ago`;
};

// This component takes the contentBlocks data from PostCreator and renders it
const PostRenderer = ({ 
  totalReplies = 0,
  postId, 
  contentBlocks, 
  author = "John Doe", 
  timestamp = new Date(), 
  onUpdatePost = null, 
  upvotes = [], 
  downvotes = [], 
  poll = null,
  views = 0,
  title = "",
  categories = []
}) => {
  // Get the current user ID from auth hook
  const { userId, vendorId, userType, userEmail } = useAuth();
  
  // Get the correct user ID based on user type
  const getCurrentUserId = () => {
    if (userType === 'vendor') {
      return vendorId;
    } else {
      return userId;
    }
  };
  
  const currentUserId = getCurrentUserId();
  
  // Format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
  
  // Get time ago for more user-friendly display
  const timeAgo = getTimeAgo(timestamp);
  
  // Initialize poll state with data from both contentBlocks and the poll prop
  const [polls, setPolls] = useState(() => {
    const pollState = {};
    
    // First check if we have a dedicated poll prop
    if (poll) {
      pollState["main-poll"] = {
        options: poll.options.map(option => ({
          text: option.title,
          votes: option.voters || []
        })),
        type: poll.isMultiselect ? 'multiple' : 'single',
        question: poll.title || '',
        settings: {
          allowMultiple: poll.isMultiselect
        }
      };
    }
    
    // Then process any polls in contentBlocks
    if (contentBlocks && Array.isArray(contentBlocks)) {
      contentBlocks.forEach(block => {
        if (block.type === 'poll') {
          // For contentBlocks, we need to parse the content if it's a string
          let pollContent = block.content;
          if (typeof block.content === 'string') {
            try {
              pollContent = JSON.parse(block.content);
            } catch (e) {
              console.error("Failed to parse poll content:", e);
            }
          }
          
          pollState[block.id] = {
            // Initialize votes as empty arrays if not present
            options: (pollContent.options || []).map(option => ({
              text: option.title || (typeof option === 'string' ? option : (option.text || '')),
              votes: Array.isArray(option.voters || option.votes) ? (option.voters || option.votes) : []
            })),
            type: pollContent.type || (pollContent.isMultiselect ? 'multiple' : 'single'),
            question: pollContent.question || pollContent.title || '',
            settings: {
              allowMultiple: pollContent.isMultiselect || pollContent.type === 'multiple'
            }
          };
        }
      });
    }
    
    return pollState;
  });
  
  // State for votes (upvote/downvote)
  const [votes, setVotes] = useState({
    upvotes: upvotes || [],
    downvotes: downvotes || [],
    hasUpvoted: (upvotes || []).includes(currentUserId),
    hasDownvoted: (downvotes || []).includes(currentUserId)
  });
  
  // Update votes when props change or user ID changes
  useEffect(() => {
    setVotes({
      upvotes: upvotes || [],
      downvotes: downvotes || [],
      hasUpvoted: (upvotes || []).includes(currentUserId),
      hasDownvoted: (downvotes || []).includes(currentUserId)
    });
  }, [upvotes, downvotes, currentUserId]);
  
  // State for comments visibility
  const [showComments, setShowComments] = useState(false);
  
  // State for share tooltip
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // Copy link and show confirmation tooltip
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/community/post/${postId}`);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };
  
  // Handle poll vote with error handling and console logging
  const handleVote = async (pollId, optionIndex) => {
    try {
      console.log('Voting on poll:', pollId, 'option:', optionIndex, 'user:', currentUserId);
      
      // Update local state optimistically
      setPolls(currentPolls => {
        const pollData = currentPolls[pollId];
        if (!pollData) return currentPolls;
        
        const updatedOptions = [...pollData.options];
        
        // For single choice polls, remove user from all other options first
        if (!pollData.settings.allowMultiple) {
          updatedOptions.forEach(option => {
            option.votes = option.votes.filter(id => id !== currentUserId);
          });
        }
        
        // Check if user already voted for this option
        const alreadyVoted = updatedOptions[optionIndex].votes.includes(currentUserId);
        
        if (alreadyVoted) {
          // Remove vote if already voted
          updatedOptions[optionIndex].votes = updatedOptions[optionIndex].votes.filter(id => id !== currentUserId);
        } else {
          // Add vote
          updatedOptions[optionIndex].votes = [...updatedOptions[optionIndex].votes, currentUserId];
        }
        
        return {
          ...currentPolls,
          [pollId]: {
            ...pollData,
            options: updatedOptions
          }
        };
      });
      
      // Call the API endpoint
      const response = await fetch('/api/posts/poll-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          pollId,
          optionIndex,
          userId: currentUserId
        })
      });

      if (!response.ok) {
        throw new Error(`Poll vote failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Poll vote successful, response:', data);
      
      // ALWAYS update state with server response to ensure consistency across clients
      if (data.poll) {
        setPolls(currentPolls => {
          // Create a new poll object with the server data
          const updatedPoll = {
            options: data.poll.options.map(opt => ({
              text: opt.title || "",
              votes: opt.voters || []
            })),
            type: data.poll.isMultiselect ? 'multiple' : 'single',
            question: data.poll.title || '',
            settings: {
              allowMultiple: data.poll.isMultiselect
            }
          };
          
          return {
            ...currentPolls,
            [pollId]: updatedPoll
          };
        });
      }
    } catch (error) {
      console.error('Error updating poll vote:', error);
      // Get fresh data from server to reset optimistic update
      try {
        const response = await fetch(`/api/posts?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.post && data.post.poll) {
            // Update polls state with fresh data
            setPolls(currentPolls => {
              // Create a new poll object with the fresh data
              const freshPoll = {
                options: data.post.poll.options.map(opt => ({
                  text: opt.title || "",
                  votes: opt.voters || []
                })),
                type: data.post.poll.isMultiselect ? 'multiple' : 'single',
                question: data.post.poll.title || '',
                settings: {
                  allowMultiple: data.post.poll.isMultiselect
                }
              };
              
              return {
                ...currentPolls,
                [pollId]: freshPoll
              };
            });
          }
        }
      } catch (refreshError) {
        console.error('Failed to refresh poll data:', refreshError);
      }
    }
  };
  
  // Handle vote (upvote or downvote) with better logging
  const handleVotePost = async (voteType) => {
    try {
      console.log(`User ${currentUserId} attempting to ${voteType} post ${postId}`);
      console.log("Current votes state:", votes);
      
      // Create a copy of the current votes
      const newVotes = {
        upvotes: [...votes.upvotes],
        downvotes: [...votes.downvotes],
        hasUpvoted: votes.hasUpvoted,
        hasDownvoted: votes.hasDownvoted
      };
      
      if (voteType === 'upvote') {
        if (votes.hasUpvoted) {
          // Remove upvote if already upvoted
          console.log("Removing upvote (toggle off)");
          newVotes.upvotes = newVotes.upvotes.filter(id => id !== currentUserId);
          newVotes.hasUpvoted = false;
        } else {
          // Add upvote
          console.log("Adding upvote");
          newVotes.upvotes.push(currentUserId);
          newVotes.hasUpvoted = true;
          
          // Remove from downvotes if present
          if (votes.hasDownvoted) {
            console.log("Removing previous downvote");
            newVotes.downvotes = newVotes.downvotes.filter(id => id !== currentUserId);
            newVotes.hasDownvoted = false;
          }
        }
      } else if (voteType === 'downvote') {
        if (votes.hasDownvoted) {
          // Remove downvote if already downvoted
          console.log("Removing downvote (toggle off)");
          newVotes.downvotes = newVotes.downvotes.filter(id => id !== currentUserId);
          newVotes.hasDownvoted = false;
        } else {
          // Add downvote
          console.log("Adding downvote");
          newVotes.downvotes.push(currentUserId);
          newVotes.hasDownvoted = true;
          
          // Remove from upvotes if present
          if (votes.hasUpvoted) {
            console.log("Removing previous upvote");
            newVotes.upvotes = newVotes.upvotes.filter(id => id !== currentUserId);
            newVotes.hasUpvoted = false;
          }
        }
      }
      
      // Update state optimistically
      console.log("Updating state optimistically:", newVotes);
      setVotes(newVotes);
      
      // Make the API call
      console.log("Calling API");
      const response = await fetch('/api/posts/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          userId: currentUserId,
          voteType
        })
      });
      
      if (!response.ok) {
        throw new Error(`Post vote failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API response:", data);
      
      // Update with server response data to ensure consistency
      if (data.votes) {
        console.log("Updating state with server data:", data.votes);
        setVotes({
          upvotes: data.votes.upvotes || [],
          downvotes: data.votes.downvotes || [],
          hasUpvoted: (data.votes.upvotes || []).includes(currentUserId),
          hasDownvoted: (data.votes.downvotes || []).includes(currentUserId)
        });
      }
    } catch (error) {
      console.error(`Error ${voteType}ing post:`, error);
      
      // Fetch fresh data from server to reset UI state
      try {
        const response = await fetch(`/api/posts?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.post) {
            setVotes({
              upvotes: data.post.upvotes || [],
              downvotes: data.post.downvotes || [],
              hasUpvoted: (data.post.upvotes || []).includes(currentUserId),
              hasDownvoted: (data.post.downvotes || []).includes(currentUserId)
            });
          }
        }
      } catch (refreshError) {
        console.error('Failed to refresh post data:', refreshError);
      }
    }
  };

  // Extract first paragraph of text content for excerpt if no title
  const getContentExcerpt = () => {
    if (title) return title;
    
    if (contentBlocks && Array.isArray(contentBlocks)) {
      const firstTextBlock = contentBlocks.find(block => block?.type === 'text' && block.content);
      if (firstTextBlock) {
        const firstLine = firstTextBlock.content.split('\n')[0];
        if (firstLine.length > 100) {
          return firstLine.substring(0, 100) + '...';
        }
        return firstLine;
      }
    }
    
    // If we have a poll but no content, use the poll question
    if (polls["main-poll"] && polls["main-poll"].question) {
      return polls["main-poll"].question;
    }
    
    return "Untitled post";
  };

  // Map category IDs to display names and colors
  const getCategoryDisplay = (categoryId) => {
    const categoryMap = {
      'LEGAL_UPDATES': { name: 'Legal Updates', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'LEGAL_TECH': { name: 'Legal Tech', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      'KNOWLEDGE_SHARING': { name: 'Knowledge Sharing', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      'QUESTION': { name: 'Question', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      'DISCUSSION': { name: 'Discussion', color: 'bg-green-100 text-green-700 border-green-200' }
    };
    
    return categoryMap[categoryId] || { name: categoryId, color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  // Render a specific content block
  const renderContentBlock = (block) => {
    switch (block?.type) {
      case 'text':
        return (
          <div key={block.id} className="mb-5">
            {/* Split text by newlines and preserve formatting */}
            {block.content?.split('\n').map((line, i) => (
              <p key={i} className="text-gray-800 mb-3 leading-relaxed">
                {line || <br />}
              </p>
            ))}
          </div>
        );
        
      case 'image':
        return (
          <div key={block.id} className="mb-6">
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src={block.content?.fileUrl || block.content?.previewUrl} 
                alt={block.content?.caption || "Post image"} 
                className="w-full object-cover" 
              />
              {block.content?.caption && (
                <div className="bg-gray-50 p-3 text-sm text-gray-600 italic border-t border-gray-100">
                  {block.content.caption}
                </div>
              )}
            </div>
          </div>
        );
        
      case 'link':
        return (
          <div key={block.id} className="mb-5">
            <a 
              href={block.content?.url?.startsWith('http') ? block.content.url : `https://${block.content?.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-2">
                <ExternalLink size={14} className="text-blue-500 mr-2" />
                <div className="text-blue-600 font-medium truncate">
                  {block.content?.url}
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
                  {getDomain(block.content?.url)}
                </div>
              </div>
            </a>
          </div>
        );
        
      case 'poll':
        // Get poll data from state
        const pollData = polls[block.id];
        if (!pollData) return null;
        
        // Calculate total votes
        const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes.length, 0);
        
        return (
          <div key={block.id} className="mb-6 border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            {pollData.question && (
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{pollData.question}</h3>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {pollData.settings.allowMultiple ? 'Multiple choice' : 'Single choice'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
              </div>
            </div>
            
            <div className="space-y-2.5">
              {pollData.options.map((option, idx) => {
                const voteCount = option.votes.length;
                const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                const isVoted = option.votes.includes(currentUserId);
                
                return (
                  <button
  key={idx}
  className={`w-full text-left p-3 rounded-lg border relative overflow-hidden ${
    isVoted ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
  }`}
  onClick={() => handleVote(block.id, idx)}
>
  {/* Background fill based on votes */}
  <div 
    className="absolute left-0 top-0 bottom-0 bg-blue-100 z-0"
    style={{ 
      width: `${percentage}%`,
      transition: 'width 0.3s ease'
    }}
  />
                    
                    {/* Option content */}
                    <div className="flex items-center justify-between z-10 relative">
                      <div className="flex items-center">
                        {pollData.settings.allowMultiple ? (
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
                            isVoted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                          }`}>
                            {isVoted && <Check size={14} />}
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-colors ${
                            isVoted ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                          }`} />
                        )}
                        <span className="font-medium text-gray-800">{option.text}</span>
                      </div>
                      <div className="text-sm font-bold">
                        {percentage}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Add a small footer with instructions if multiple choice */}
            {pollData.settings.allowMultiple && (
              <div className="mt-3 text-xs text-gray-500 flex items-center">
                <Check size={12} className="mr-1 text-purple-500" />
                You may select multiple options
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // Render the standalone poll if present (from the poll prop)
  const renderMainPoll = () => {
    const pollData = polls["main-poll"];
    if (!pollData) return null;
    
    // Calculate total votes
    const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes.length, 0);
    
    return (
      <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        {pollData.question && (
          <h3 className="text-lg font-semibold mb-3 text-gray-800">{pollData.question}</h3>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              {pollData.settings.allowMultiple ? 'Multiple choice' : 'Single choice'}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
          </div>
        </div>
        
        <div className="space-y-2.5">
          {pollData.options.map((option, idx) => {
            const voteCount = option.votes.length;
            const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
            const isVoted = option.votes.includes(currentUserId);
            
            return (
              <button
                key={idx}
                className={`w-full text-left p-3 rounded-lg relative overflow-hidden transition-all duration-300 ${
                  isVoted 
                    ? 'border-2 border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
                onClick={() => handleVote("main-poll", idx)}
              >
                {/* Background fill based on votes */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-100 to-blue-50 z-0"
                  style={{ 
                    width: `${percentage}%`,
                    transition: 'width 0.4s ease-in-out'
                  }}
                />
                
                {/* Option content */}
                <div className="flex items-center justify-between z-10 relative">
                  <div className="flex items-center">
                    {pollData.settings.allowMultiple ? (
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
                        isVoted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                      }`}>
                        {isVoted && <Check size={14} />}
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-colors ${
                        isVoted ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`} />
                    )}
                    <span className="font-medium text-gray-800">{option.text}</span>
                  </div>
                  <div className="text-sm font-bold">
                    {percentage}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Add a small footer with instructions if multiple choice */}
        {pollData.settings.allowMultiple && (
          <div className="mt-3 text-xs text-gray-500 flex items-center">
            <Check size={12} className="mr-1 text-purple-500" />
            You may select multiple options
          </div>
        )}
      </div>
    );
  };

  // If no content blocks, show the poll if it exists, otherwise show no content message
  if (!contentBlocks || !Array.isArray(contentBlocks) || contentBlocks.length === 0) {
    if (polls["main-poll"]) {
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-3 flex items-center justify-center text-white font-bold shadow-sm">
                <span>{author.substring(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <div className="font-medium text-gray-800">{author}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar size={12} className="mr-1" />
                  <span className="mr-2">{formattedDate}</span>
                  <Clock size={12} className="mr-1" />
                  <span>{timeAgo}</span>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap mt-3 gap-2">
                {categories.map((category, index) => {
                  const categoryDisplay = getCategoryDisplay(category);
                  return (
                    <span 
                      key={index} 
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryDisplay.color}`}
                    >
                      {categoryDisplay.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="p-5">
            {/* Title/Excerpt */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {getContentExcerpt()}
            </h2>
            
            {renderMainPoll()}
          </div>
          
          {/* Post Stats */}
          <div className="px-5 py-3 flex flex-wrap items-center justify-between text-sm border-t border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-4">
              <button 
                className={`flex items-center px-2 py-1 rounded-md transition-colors ${
                  votes.hasUpvoted 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => handleVotePost('upvote')}
              >
                <ThumbsUp size={16} className="mr-1.5" />
                <span className="font-medium">{votes.upvotes.length}</span>
              </button>
              
              <button 
                className={`flex items-center px-2 py-1 rounded-md transition-colors ${
                  votes.hasDownvoted 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => handleVotePost('downvote')}
              >
                <ThumbsDown size={16} className="mr-1.5" />
                <span className="font-medium">{votes.downvotes.length}</span>
              </button>
              
              <div className="text-sm font-medium flex items-center px-2 py-1 text-blue-600 bg-blue-50 rounded-md">
                <Award size={16} className="mr-1.5" />
                Score: {votes.upvotes.length - votes.downvotes.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
              <div className="flex items-center text-gray-500 px-2 py-1">
                <Eye size={16} className="mr-1.5" />
                <span className="font-medium">{views}</span>
              </div>
              
              <div className="flex items-center text-gray-500 px-2 py-1">
                <MessageCircle size={16} className="mr-1.5" />
                <span className="font-medium">{totalReplies}</span>
              </div>
              
              <a href={`/community/post/${postId}`} className="flex items-center text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
                <ExternalLink size={16} className="mr-1.5" />
                <span className="hidden sm:inline">Open</span>
              </a>
              
              <div className="relative">
                <button 
                  className="flex items-center text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={copyLinkToClipboard}
                >
                  <Share size={16} className="mr-1.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                
                {showShareTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
                    Link copied!
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Comment Action */}
          <div className="p-5 border-t border-gray-100">
            <button 
              className={`flex items-center text-blue-600 hover:text-blue-800 mb-4 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors ${
                showComments ? 'bg-blue-50' : ''
              }`}
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle size={18} className="mr-2" />
              {showComments ? "Hide comments" : "Reply and view all comments"}
              <ChevronDown size={16} className={`ml-2 transition-transform ${showComments ? 'transform rotate-180' : ''}`} />
            </button>
            
            {/* Comments Section */}
            {showComments && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <ThreadedReplies postId={postId} />
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <MessageCircle size={24} />
          </div>
          <p className="text-gray-500">This post has no content</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Post Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-3 flex items-center justify-center text-white font-bold shadow-sm">
            <span>{author.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium text-gray-800">{author}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar size={12} className="mr-1" />
              <span className="mr-2">{formattedDate}</span>
              <Clock size={12} className="mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap mt-3 gap-2">
            {categories.map((category, index) => {
              const categoryDisplay = getCategoryDisplay(category);
              return (
                <span 
                  key={index} 
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryDisplay.color}`}
                >
                  {categoryDisplay.name}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-5">
        {/* Title/Excerpt */}
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">
          {getContentExcerpt()}
        </h2> */}
        
        {/* Render the main poll if present */}
        {/* {polls["main-poll"] && renderMainPoll()} */}
        
        {/* Render content blocks */}
        <div className="mt-4">
          {contentBlocks.map((block) => (
            <React.Fragment key={block.id}>
              {renderContentBlock(block)}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Post Stats */}
      <div className="px-5 py-3 flex flex-wrap items-center justify-between text-sm border-t border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-4">
          <button 
            className={`flex items-center px-2 py-1 rounded-md transition-colors ${
              votes.hasUpvoted 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleVotePost('upvote')}
          >
            <ThumbsUp size={16} className="mr-1.5" />
            <span className="font-medium">{votes.upvotes.length}</span>
          </button>
          
          <button 
            className={`flex items-center px-2 py-1 rounded-md transition-colors ${
              votes.hasDownvoted 
                ? 'text-red-600 bg-red-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleVotePost('downvote')}
          >
            <ThumbsDown size={16} className="mr-1.5" />
            <span className="font-medium">{votes.downvotes.length}</span>
          </button>
          
          <div className="text-sm font-medium flex items-center px-2 py-1 text-blue-600 bg-blue-50 rounded-md">
            <Award size={16} className="mr-1.5" />
            Score: {votes.upvotes.length - votes.downvotes.length}
          </div>
        </div>
        
        <div className="flex items-center space-x-3 mt-2 sm:mt-0">
          <div className="flex items-center text-gray-500 px-2 py-1">
            <Eye size={16} className="mr-1.5" />
            <span className="font-medium">{views}</span>
          </div>
          
          <div className="flex items-center text-gray-500 px-2 py-1">
            <MessageCircle size={16} className="mr-1.5" />
            <span className="font-medium">{totalReplies}</span>
          </div>
          
          <a href={`/community/post/${postId}`} className="flex items-center text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
            <ExternalLink size={16} className="mr-1.5" />
            <span className="hidden sm:inline">Open</span>
          </a>
          
          <div className="relative">
            <button 
              className="flex items-center text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={copyLinkToClipboard}
            >
              <Share size={16} className="mr-1.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            
            {showShareTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
                Link copied!
              </div>
            )}
          </div>
          
          <button className="flex items-center text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
            <BookmarkPlus size={16} className="mr-1.5" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {/* Comment Action */}
      <div className="p-5 border-t border-gray-100">
        <button 
          className={`flex items-center text-blue-600 hover:text-blue-800 mb-4 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors ${
            showComments ? 'bg-blue-50' : ''
          }`}
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} className="mr-2" />
          {showComments ? "Hide comments" : "Reply and view all comments"}
          <ChevronDown size={16} className={`ml-2 transition-transform ${showComments ? 'transform rotate-180' : ''}`} />
        </button>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ThreadedReplies postId={postId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostRenderer;
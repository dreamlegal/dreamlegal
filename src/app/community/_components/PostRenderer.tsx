"use client"
// import { useState } from 'react';
import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share, Check } from 'lucide-react';

// Current user mock - would come from auth context in a real app
const CURRENT_USER = {
  id: "user-1",
  name: "John Doe"
};

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

// This component takes the contentBlocks data from PostCreator and renders it
const PostRenderer = ({ contentBlocks, author = "John Doe", timestamp = new Date(), onUpdatePost = null }) => {
  // Format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
  
  // State for poll votes
  const [polls, setPolls] = useState(() => {
    // Initialize poll state from contentBlocks
    const pollState = {};
    if (contentBlocks && Array.isArray(contentBlocks)) {
      contentBlocks.forEach(block => {
        if (block.type === 'poll') {
          pollState[block.id] = {
            // Initialize votes as empty arrays if not present
            options: block.content.options.map(option => ({
              text: option.title || (typeof option === 'string' ? option : (option.text || '')),
              votes: Array.isArray(option.voters || option.votes) ? (option.voters || option.votes) : []
            })),
            type: block.content.type || (block.content.isMultiselect ? 'multiple' : 'single'),
            question: block.content.question || block.content.title || '',
            settings: {
              allowMultiple: block.content.isMultiselect || block.content.type === 'multiple'
            }
          };
        }
      });
    }
    return pollState;
  });
  
  // State for likes, comments
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [shares, setShares] = useState(0);
  
  // Handle poll vote
  const handleVote = async (pollId, optionIndex) => {
    setPolls(currentPolls => {
      const pollData = currentPolls[pollId];
      if (!pollData) return currentPolls;
      
      const userId = CURRENT_USER.id;
      const updatedOptions = [...pollData.options];
      
      // For single choice polls, remove user from all other options first
      if (!pollData.settings.allowMultiple) {
        updatedOptions.forEach(option => {
          option.votes = option.votes.filter(id => id !== userId);
        });
      }
      
      // Check if user already voted for this option
      const alreadyVoted = updatedOptions[optionIndex].votes.includes(userId);
      
      if (alreadyVoted) {
        // Remove vote if already voted
        updatedOptions[optionIndex].votes = updatedOptions[optionIndex].votes.filter(id => id !== userId);
      } else {
        // Add vote
        updatedOptions[optionIndex].votes = [...updatedOptions[optionIndex].votes, userId];
      }
      
      const newPollState = {
        ...currentPolls,
        [pollId]: {
          ...pollData,
          options: updatedOptions
        }
      };
      
      // If we have a callback for updating the post, call it
      if (onUpdatePost && contentBlocks) {
        const updatedBlocks = contentBlocks.map(block => {
          if (block.type === 'poll' && block.id === pollId) {
            // Format the poll data for the API
            const updatedPoll = {
              ...block.content,
              options: updatedOptions.map(opt => ({
                title: opt.text,
                voters: opt.votes,
                count: opt.votes.length
              }))
            };
            return { ...block, content: updatedPoll };
          }
          return block;
        });
        
        // Call the update callback
        onUpdatePost(updatedBlocks);
        
        // Also make API call to update poll votes
        try {
          fetch(`/api/posts/${pollId}/poll/vote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              optionIndex,
              userId: CURRENT_USER.id
            })
          });
        } catch (error) {
          console.error('Error updating poll vote:', error);
        }
      }
      
      return newPollState;
    });
  };
  
  // Handle adding a comment
  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        user: CURRENT_USER.name,
        timestamp: new Date()
      };
      
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };
  
  // Handle like
  const handleLike = () => {
    if (likes.includes(CURRENT_USER.id)) {
      setLikes(likes.filter(id => id !== CURRENT_USER.id));
    } else {
      setLikes([...likes, CURRENT_USER.id]);
    }
  };
  
  // Handle share
  const handleShare = () => {
    setShares(shares + 1);
  };

  // Render a specific content block
  const renderContentBlock = (block) => {
    switch (block?.type) {
      case 'text':
        return (
          <div key={block.id} className="mb-4">
            {/* Split text by newlines and preserve formatting */}
            {block.content?.split('\n').map((line, i) => (
              <p key={i} className="text-gray-800">
                {line || <br />}
              </p>
            ))}
          </div>
        );
        
      case 'image':
        return (
          <div key={block.id} className="mb-4">
            <img 
              src={block.content?.fileUrl || block.content?.previewUrl} 
              alt={block.content?.caption || "Post image"} 
              className="w-full rounded-lg" 
            />
            {block.content?.caption && (
              <p className="text-sm text-gray-500 mt-1">{block.content.caption}</p>
            )}
          </div>
        );
        
      case 'link':
        return (
          <div key={block.id} className="mb-4">
            <a 
              href={block.content?.url?.startsWith('http') ? block.content.url : `https://${block.content?.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="text-blue-600 text-sm font-medium">
                {block.content?.url}
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {getDomain(block.content?.url)}
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
          <div key={block.id} className="mb-4 border rounded-lg p-4">
            {pollData.question && (
              <h3 className="text-lg font-medium mb-2">{pollData.question}</h3>
            )}
            
            <div className="text-xs text-gray-500 mb-3">
              {pollData.settings.allowMultiple ? 'Multiple choice poll' : 'Single choice poll'} · 
              {' '}{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
            </div>
            
            <div className="space-y-2">
              {pollData.options.map((option, idx) => {
                const voteCount = option.votes.length;
                const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                const isVoted = option.votes.includes(CURRENT_USER.id);
                
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
                          <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                            isVoted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'
                          }`}>
                            {isVoted && <Check size={16} />}
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full mr-2 ${
                            isVoted ? 'bg-blue-500 border-blue-500' : 'border border-gray-400'
                          }`} />
                        )}
                        <span>{option.text}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {percentage}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Add a small footer with instructions if multiple choice */}
            {pollData.settings.allowMultiple && (
              <div className="mt-3 text-xs text-gray-500">
                You may select multiple options
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // If no content blocks, show a message
  if (!contentBlocks || !Array.isArray(contentBlocks) || contentBlocks.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4">
          <p className="text-gray-500 text-center">This post has no content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* Post Header */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
            <span className="text-gray-600 font-medium">{author.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-xs text-gray-500">Posted {formattedDate}</div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        {contentBlocks.map((block) => (
          <React.Fragment key={block.id}>
            {renderContentBlock(block)}
          </React.Fragment>
        ))}
      </div>

      {/* Social Stats */}
      {(likes.length > 0 || comments.length > 0 || shares > 0) && (
        <div className="px-4 py-2 border-t text-xs text-gray-500 flex justify-between">
          <div>
            {likes.length > 0 && (
              <span>
                <ThumbsUp size={12} className="inline mr-1 text-blue-500" />
                {likes.length}
              </span>
            )}
          </div>
          <div>
            {comments.length > 0 && <span className="mr-2">{comments.length} comments</span>}
            {shares > 0 && <span>{shares} shares</span>}
          </div>
        </div>
      )}

      {/* Post Footer */}
      <div className="p-4 border-t flex items-center space-x-4 text-sm text-gray-500">
        <button 
          className={`flex items-center hover:text-blue-600 ${likes.includes(CURRENT_USER.id) ? 'text-blue-600' : ''}`}
          onClick={handleLike}
        >
          <ThumbsUp size={18} className="mr-1" />
          Like
        </button>
        <button 
          className="flex items-center hover:text-blue-600"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} className="mr-1" />
          Comment
        </button>
        <button 
          className="flex items-center hover:text-blue-600"
          onClick={handleShare}
        >
          <Share size={18} className="mr-1" />
          Share
        </button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="border-t p-4">
          {/* Comment Input */}
          <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
              <span className="text-gray-600 text-xs font-medium">{CURRENT_USER.name.substring(0, 2)}</span>
            </div>
            <div className="flex-1 flex">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                Post
              </button>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className="flex">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                  <span className="text-gray-600 text-xs font-medium">{comment.user.substring(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <div className="text-sm font-medium">{comment.user}</div>
                    <div className="text-sm">{comment.text}</div>
                  </div>
                  <div className="flex text-xs text-gray-500 mt-1">
                    <button className="mr-2 hover:text-blue-600">Like</button>
                    <button className="hover:text-blue-600">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostRenderer;
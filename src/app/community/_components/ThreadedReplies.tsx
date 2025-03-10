// app/_components/ThreadedReplies.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/authContext';
import { Loader, ChevronDown, ChevronRight, Send } from 'lucide-react';
import Link from 'next/link';

const ThreadedReplies = ({ postId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  
  const replyInputRef = useRef(null);
  const { userId, vendorId, userType, userEmail } = useAuth();
    
  // const { userId, userEmail } = useAuth();
  const getActualUserId = () => {
    if (userType === 'vendor') {
      return vendorId;
    } else {
      return userId;
    }
  };
  
  // Extract username from email
  const extractedUsername = userEmail ? userEmail.split('@')[0] : '';
  
  // Fetch replies for this post
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
        setReplies(data.replies);
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
  
  // Handle reply submission
  const handleSubmitReply = async () => {
    const userId = getActualUserId();
    try {
      if (!replyText.trim()) return;
      
      setSubmitting(true);
      
      const parentId = replyingTo || postId;
      
      const replyData = {
        userId,
        username: extractedUsername,
        content: replyText,
        parentId,
        categories: ['REPLY']
      };
      
      const response = await fetch('/api/posts/create-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(replyData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit reply: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Refresh replies after posting
      const refreshResponse = await fetch(`/api/posts/get-replies?postId=${postId}`);
      const refreshData = await refreshResponse.json();
      setReplies(refreshData.replies);
      
      // Clear the input and reset replying state
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Error submitting reply:', err);
      alert('Failed to submit reply. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Toggle expanded state for a reply thread
  const toggleExpanded = (replyId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };
  
  // Start replying to a specific post
  const handleReplyTo = (replyId) => {
    setReplyingTo(replyId);
    setReplyText('');
    
    // Scroll to reply input
    setTimeout(() => {
      if (replyInputRef.current) {
        replyInputRef.current.focus();
      }
    }, 0);
  };
  
  // Cancel replying to a specific post
  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
  };
  
  // Render a reply and its nested replies
  const renderReply = (reply, depth = 0) => {
    const hasReplies = reply.replies && reply.replies.length > 0;
    const isExpanded = expandedReplies[reply.id] || false;
    
    return (
      <div 
        key={reply.id} 
        className="mt-3 border-l-2 border-gray-200"
        style={{ marginLeft: depth * 16, paddingLeft: 12 }}
      >
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
              <span className="text-gray-600 text-xs">{reply.username?.substring(0, 2).toUpperCase()}</span>
            </div>
            <div>
              <div className="text-sm font-medium">{reply.username || 'Anonymous'}</div>
              <div className="text-xs text-gray-500">
                {new Date(reply.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="text-sm mb-2">
            {/* Handle different content formats */}
            {typeof reply.content === 'string' && !reply.content.startsWith('[{') ? (
              reply.content
            ) : (
              <div className="text-gray-500">Complex post content...</div>
            )}
          </div>
          
          <div className="flex items-center text-xs space-x-3 text-gray-500">
            <button 
              className="hover:text-blue-600"
              onClick={() => handleReplyTo(reply.id)}
            >
              Reply
            </button>
            
            <Link href={`/community/post/${reply.id}`} className="hover:text-blue-600">
              View Thread
            </Link>
          </div>
        </div>
        
        {/* Replies to this reply */}
        {hasReplies && (
          <div className="mt-2">
            {/* Toggle button for expanding replies */}
            <button 
              className="flex items-center text-xs text-blue-600 mb-1"
              onClick={() => toggleExpanded(reply.id)}
            >
              {isExpanded ? (
                <>
                  <ChevronDown size={14} className="mr-1" />
                  Hide replies
                </>
              ) : (
                <>
                  <ChevronRight size={14} className="mr-1" />
                  Show {reply.replies.length} {reply.replies.length === 1 ? 'reply' : 'replies'}
                </>
              )}
            </button>
            
            {/* Display nested replies when expanded */}
            {isExpanded && (
              <div className="space-y-2">
                {/* Show limited number of replies */}
                {reply.replies.slice(0, 3).map((nestedReply) => 
                  renderReply(nestedReply, depth + 1)
                )}
                
                {/* Show "View all" link if there are more replies */}
                {reply.replies.length > 3 && (
                  <div className="pl-4 mt-1">
                    <Link 
                      href={`/community/post/${reply.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View all {reply.replies.length} replies
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Comments</h3>
      
      {/* Reply input */}
      <div className="mb-6">
        {replyingTo && (
          <div className="mb-2 text-sm flex justify-between items-center">
            <div className="text-blue-600">
              Replying to a comment
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700 text-xs"
              onClick={cancelReply}
            >
              Cancel
            </button>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center mb-2 sm:mb-0">
            <span className="text-gray-600 text-xs">{extractedUsername.substring(0, 2).toUpperCase()}</span>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row">
            <input
              type="text"
              ref={replyInputRef}
              className="flex-1 border rounded-lg px-3 py-2 mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Write a comment..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={submitting}
            />
            <button
              className={`px-3 py-1 ${
          submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg flex items-center justify-center`}
              onClick={handleSubmitReply}
              disabled={submitting || !replyText.trim()}
            >
              {submitting ? 'Posting...' : <><Send size={14} className="mr-1" /> Post</>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Loader className="animate-spin text-blue-500" size={24} />
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="p-3 bg-red-50 text-red-500 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* No replies yet */}
      {!loading && !error && replies.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
      
      {/* Display replies */}
      <div className="space-y-4">
        {replies.map((reply) => renderReply(reply))}
      </div>
    </div>
  );
};

export default ThreadedReplies;
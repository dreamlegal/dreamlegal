
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Image, Link, Plus, X, Send, PlusCircle, Upload, BarChart2, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/authContext';

const PostCreator = () => {
  // Get user data from auth context
  const { userId, vendorId, userType, userEmail } = useAuth();
  
  // Extract username from email (everything before @)
  const extractedUsername = userEmail ? userEmail.split('@')[0] : '';
  
  // State for anonymous posting
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Array of content blocks in order
  const [contentBlocks, setContentBlocks] = useState([
    { type: 'text', id: Date.now(), content: '' }
  ]);
  
  // Track current active block and cursor position
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Poll creation states
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollType, setPollType] = useState('single');
  const [pollQuestion, setPollQuestion] = useState('');
  const [currentEditingPollId, setCurrentEditingPollId] = useState(null);
  
  // Categories for post categorization (optional)
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Loading state for file uploads and post submission
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  
  // Error state
  const [error, setError] = useState(null);
  
  // Success state
  const [postSuccess, setPostSuccess] = useState(false);
  
  // Refs for all text areas to manage focus
  const textareaRefs = useRef({});
  // Ref for file input
  const fileInputRef = useRef(null);
  
  // Check if there's already a poll
  const hasPoll = contentBlocks.some(block => block.type === 'poll');
  
  // Set the initial active block to the first text block
  useEffect(() => {
    if (contentBlocks.length > 0 && contentBlocks[0].type === 'text') {
      setActiveBlockId(contentBlocks[0].id);
    }
  }, []);

  // Get the actual user ID based on user type
  const getActualUserId = () => {
    if (userType === 'vendor') {
      return vendorId;
    } else {
      return userId;
    }
  };

  // Upload file to S3
  const uploadFileToS3 = async (file) => {
    try {
      setError(null);
      
      // Create form data for the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Track upload progress (note: Next.js fetch API doesn't support progress tracking directly)
      const blockId = parseInt(fileInputRef.current.getAttribute('data-target-block-id'));
      setUploadProgress({
        ...uploadProgress,
        [blockId]: 10 // Just indicate that upload started
      });
      
      // Upload to S3 via API route
      const response = await fetch('/api/posts/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      
      // Update progress to done
      setUploadProgress({
        ...uploadProgress,
        [blockId]: 100
      });
      
      const data = await response.json();
      return data.url;
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload image. Please try again.');
      return null;
    }
  };

  // Add a new content block at a specific position
  const addContentBlock = (type, position) => {
    const newBlocks = [...contentBlocks];
    let newBlock = { type, id: Date.now() };
    
    // Initialize content based on block type
    switch(type) {
      case 'text':
        newBlock.content = '';
        break;
      case 'image':
        newBlock.content = { 
          caption: '',
          fileUrl: '',
          file: null,
          previewUrl: null
        };
        break;
      case 'link':
        newBlock.content = { url: '' };
        break;
      case 'poll':
        // Don't add poll here, it will be added after creation
        return;
      default:
        break;
    }
    
    // Insert the new block at the specified position
    newBlocks.splice(position, 0, newBlock);
    setContentBlocks(newBlocks);
    
    // If it's an image block, trigger file selection
    if (type === 'image' && fileInputRef.current) {
      setTimeout(() => {
        fileInputRef.current.click();
        fileInputRef.current.setAttribute('data-target-block-id', newBlock.id);
      }, 0);
    }
  };

  // Handle file selection for image blocks
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const targetBlockId = parseInt(fileInputRef.current.getAttribute('data-target-block-id'));
    
    if (file && targetBlockId) {
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      
      // Update the image block with the file data and preview
      setContentBlocks(contentBlocks.map(block => 
        block.id === targetBlockId ? { 
          ...block, 
          content: { 
            ...block.content, 
            file, 
            previewUrl,
            fileName: file.name
          } 
        } : block
      ));
    }
    
    // Reset the file input
    e.target.value = null;
  };

  // Update content of a block
  const updateBlockContent = (id, content, selectionStart = null) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
    
    // Update cursor position if provided
    if (selectionStart !== null) {
      setCursorPosition(selectionStart);
    }
  };
  
  // Handle key down events in text blocks
  const handleKeyDown = (e, blockId, blockIndex) => {
    const block = contentBlocks.find(b => b.id === blockId);
    
    // Handle backspace at the beginning of a block
    if (e.key === 'Backspace' && e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
      // If this isn't the first block, merge with previous block
      if (blockIndex > 0) {
        e.preventDefault();
        
        const prevBlock = contentBlocks[blockIndex - 1];
        
        // Only merge if previous block is a text block
        if (prevBlock.type === 'text') {
          const newContent = prevBlock.content + block.content;
          const cursorPos = prevBlock.content.length;
          
          // Create updated blocks array without current block
          const newBlocks = contentBlocks.filter(b => b.id !== blockId);
          
          // Update previous block's content
          const updatedBlocks = newBlocks.map(b => 
            b.id === prevBlock.id ? { ...b, content: newContent } : b
          );
          
          setContentBlocks(updatedBlocks);
          
          // Focus the previous block and set cursor position
          setTimeout(() => {
            if (textareaRefs.current[prevBlock.id]) {
              const textarea = textareaRefs.current[prevBlock.id];
              textarea.focus();
              textarea.selectionStart = cursorPos;
              textarea.selectionEnd = cursorPos;
            }
          }, 0);
        } else {
          // If previous block is not text, just remove this block if it's empty
          if (!block.content) {
            removeContentBlock(blockId);
            
            // Focus the previous block
            setTimeout(() => {
              if (blockIndex > 1) {
                const prevTextBlock = [...contentBlocks].reverse().find(b => 
                  b.type === 'text' && contentBlocks.indexOf(b) < blockIndex
                );
                if (prevTextBlock && textareaRefs.current[prevTextBlock.id]) {
                  textareaRefs.current[prevTextBlock.id].focus();
                }
              }
            }, 0);
          }
        }
      }
    }
    
    // Handle enter key to insert new text block below
    if (e.key === 'Enter' && !e.shiftKey) {
      const textarea = e.target;
      const value = textarea.value;
      const selectionStart = textarea.selectionStart;
      
      // Split the content
      const contentBefore = value.substring(0, selectionStart);
      const contentAfter = value.substring(selectionStart);
      
      // Only split if we're not at the end with no content after cursor
      if (contentAfter.trim()) {
        e.preventDefault();
        
        // Update current block with content before cursor
        updateBlockContent(blockId, contentBefore);
        
        // Add new block with content after cursor
        const newBlockId = Date.now();
        const newBlocks = [...contentBlocks];
        newBlocks.splice(blockIndex + 1, 0, { 
          type: 'text', 
          id: newBlockId, 
          content: contentAfter 
        });
        setContentBlocks(newBlocks);
        
        // Focus the new block
        setTimeout(() => {
          if (textareaRefs.current[newBlockId]) {
            textareaRefs.current[newBlockId].focus();
          }
        }, 0);
      }
    }
  };

  // Remove a content block
  const removeContentBlock = (id) => {
    // Clean up any preview URLs for images to prevent memory leaks
    const block = contentBlocks.find(block => block.id === id);
    if (block?.type === 'image' && block.content?.previewUrl) {
      URL.revokeObjectURL(block.content.previewUrl);
    }
    
    // Make sure we always have at least one block
    if (contentBlocks.length <= 1) {
      setContentBlocks([{ type: 'text', id: Date.now(), content: '' }]);
      return;
    }
    
    setContentBlocks(contentBlocks.filter(block => block.id !== id));
  };

  // Replace image in an existing image block
  const replaceImage = (blockId) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-target-block-id', blockId);
      fileInputRef.current.click();
    }
  };

  // Insert content at active block's cursor position
  const insertAtCursor = (type, data = {}) => {
    if (!activeBlockId) return;
    
    const activeBlock = contentBlocks.find(block => block.id === activeBlockId);
    if (!activeBlock || activeBlock.type !== 'text') return;
    
    const activeBlockIndex = contentBlocks.findIndex(block => block.id === activeBlockId);
    const activeTextarea = textareaRefs.current[activeBlockId];
    
    if (!activeTextarea) return;
    
    const selStart = activeTextarea.selectionStart;
    const selEnd = activeTextarea.selectionEnd;
    const text = activeBlock.content;
    
    // Text before and after cursor
    const textBefore = text.substring(0, selStart);
    const textAfter = text.substring(selEnd);
    
    // If the split happens in the middle of text, create two text blocks with the new content in between
    if (textBefore && textAfter) {
      // Update the current block with text before cursor
      updateBlockContent(activeBlockId, textBefore);
      
      // Create the new content block
      const newBlocks = [...contentBlocks];
      const newBlockId = Date.now();
      
      if (type === 'image') {
        // Special handling for image - update its initial content
        data = { 
          caption: '',
          fileUrl: '',
          file: null,
          previewUrl: null
        };
      }
      
      newBlocks.splice(activeBlockIndex + 1, 0, { type, id: newBlockId, content: data });
      
      // Add another text block with the content after cursor
      const afterTextId = Date.now() + 1;
      newBlocks.splice(activeBlockIndex + 2, 0, { 
        type: 'text', 
        id: afterTextId, 
        content: textAfter 
      });
      
      setContentBlocks(newBlocks);
      
      // If it's an image, trigger file selection after adding the block
      if (type === 'image' && fileInputRef.current) {
        fileInputRef.current.setAttribute('data-target-block-id', newBlockId);
        fileInputRef.current.click();
      } else {
        // Focus the text block after the inserted content
        setTimeout(() => {
          if (textareaRefs.current[afterTextId]) {
            textareaRefs.current[afterTextId].focus();
          }
        }, 0);
      }
    } 
    // If cursor is at the end, just add the new block after
    else if (!textAfter) {
      // Add the new block right after the active block
      const newBlocks = [...contentBlocks];
      const newBlockId = Date.now();
      
      if (type === 'image') {
        // Special handling for image - update its initial content
        data = { 
          caption: '',
          fileUrl: '',
          file: null,
          previewUrl: null
        };
      }
      
      newBlocks.splice(activeBlockIndex + 1, 0, { type, id: newBlockId, content: data });
      
      // If there's no text in the current block and it's not the first block, remove it
      if (!textBefore && activeBlockIndex > 0) {
        newBlocks.splice(activeBlockIndex, 1);
      }
      
      setContentBlocks(newBlocks);
      
      // If it's an image, trigger file selection
      if (type === 'image' && fileInputRef.current) {
        fileInputRef.current.setAttribute('data-target-block-id', newBlockId);
        fileInputRef.current.click();
      } 
      // Add a new text block after the inserted content
      else if (activeBlockIndex === contentBlocks.length - 1) {
        const afterTextId = Date.now() + 1;
        newBlocks.push({ type: 'text', id: afterTextId, content: '' });
        
        // Focus the new text block
        setTimeout(() => {
          if (textareaRefs.current[afterTextId]) {
            textareaRefs.current[afterTextId].focus();
          }
        }, 0);
      }
    }
    // If cursor is at the beginning, add the new block before
    else if (!textBefore) {
      // Add the new block right before the active block
      const newBlocks = [...contentBlocks];
      const newBlockId = Date.now();
      
      if (type === 'image') {
        // Special handling for image - update its initial content
        data = { 
          caption: '',
          fileUrl: '',
          file: null,
          previewUrl: null
        };
      }
      
      newBlocks.splice(activeBlockIndex, 0, { type, id: newBlockId, content: data });
      setContentBlocks(newBlocks);
      
      // If it's an image, trigger file selection
      if (type === 'image' && fileInputRef.current) {
        fileInputRef.current.setAttribute('data-target-block-id', newBlockId);
        fileInputRef.current.click();
      }
    }
  };

  // Add a poll option
  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  // Update poll option
  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  // Remove poll option
  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = [...pollOptions];
      newOptions.splice(index, 1);
      setPollOptions(newOptions);
    }
  };

  // Add poll to content blocks
  const addPoll = () => {
    const filteredOptions = pollOptions.filter(opt => opt.trim());
    if (filteredOptions.length < 2) return;
    
    // Format options to match the Post model's poll structure
    const formattedOptions = filteredOptions.map(title => ({
      title,
      count: 0,
      voters: []
    }));
    
    // Create poll content object
    const pollContent = {
      title: pollQuestion.trim(),
      options: formattedOptions,
      isMultiselect: pollType === 'multiple'
    };
    
    // If we're editing an existing poll
    if (currentEditingPollId) {
      updateBlockContent(currentEditingPollId, pollContent);
    } else {
      // Add a new poll
      const newBlocks = [...contentBlocks];
      const newBlock = {
        type: 'poll',
        id: Date.now(),
        content: pollContent
      };
      newBlocks.push(newBlock);
      setContentBlocks(newBlocks);
    }
    
    // Reset poll creator
    setShowPollCreator(false);
    setPollOptions(['', '']);
    setPollType('single');
    setPollQuestion('');
    setCurrentEditingPollId(null);
  };

  // Edit an existing poll
  const editPoll = (id) => {
    const pollBlock = contentBlocks.find(block => block.id === id);
    if (pollBlock && pollBlock.type === 'poll') {
      // Extract poll data
      const { title, options, isMultiselect } = pollBlock.content;
      
      // Set poll creator state
      setPollOptions(options.map(opt => opt.title));
      setPollType(isMultiselect ? 'multiple' : 'single');
      setPollQuestion(title || '');
      setCurrentEditingPollId(id);
      setShowPollCreator(true);
    }
  };

  // Get domain from URL for preview
  const getDomain = (url) => {
    try {
      if (!url) return 'example.com';
      if (!url.startsWith('http')) url = 'https://' + url;
      return new URL(url).hostname;
    } catch (e) {
      return 'example.com';
    }
  };

  // Handle form submission
  // const handlePost = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
      
  //     // Check if there's content to post
  //     const hasContent = contentBlocks.some(block => {
  //       if (block.type === 'text') return block.content.trim() !== '';
  //       return true;
  //     });
      
  //     if (!hasContent) {
  //       setError("Please add some content to your post.");
  //       setIsLoading(false);
  //       return;
  //     }
      
  //     // Process content blocks: convert file objects to URLs, extract poll data
  //     let pollData = null;
  //     let processedContent = [];
      
  //     // Upload all images first
  //     for (const block of contentBlocks) {
  //       if (block.type === 'image' && block.content.file) {
  //         const fileUrl = await uploadFileToS3(block.content.file);
  //         if (fileUrl) {
  //           block.content.fileUrl = fileUrl;
  //           block.content.file = null; // Remove file object
  //         }
  //       }
        
  //       // Extract poll data
  //       if (block.type === 'poll') {
  //         pollData = block.content;
  //       }
        
  //       // Add block to processed content
  //       processedContent.push(block);
  //     }
      
  //     // Create post object based on your Prisma model
  //     // const post = {
  //     //   userId: getActualUserId(),
  //     //   username: isAnonymous ? 'anonymous' : extractedUsername,
  //     //   content: JSON.stringify(processedContent),
  //     //   poll: pollData,
  //     //   categories: ["LEGAL_UPDATES",
  //     //   replyIds: []
  //     // };
  //     const post = {
  //       userId: getActualUserId(),
  //       username: isAnonymous ? 'anonymous' : extractedUsername,
  //       content: JSON.stringify(processedContent),
  //       poll: pollData,
  //       categories: "LEGAL_UPDATES" , // Dummy category object
  //       replyIds: [],
  //     };
      
      
  //     // Send post to API
  //     const response = await fetch('/api/posts/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(post),
  //     });
      
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || 'Failed to create post');
  //     }
      
  //     // Handle successful post
  //     setPostSuccess(true);
      
  //     // Reset the post creator
  //     setContentBlocks([{ type: 'text', id: Date.now(), content: '' }]);
  //     setIsAnonymous(false);
  //     setSelectedCategories([]);
      
  //     // Show success message briefly, then reset
  //     setTimeout(() => {
  //       setPostSuccess(false);
  //     }, 3000);
      
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     setError(error.message || 'Failed to create post. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Update the handlePost function in your PostCreator component

// Replace this code in your PostCreator.jsx file:

// Handle form submission
const handlePost = async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    // Check if there's content to post
    const hasContent = contentBlocks.some(block => {
      if (block.type === 'text') return block.content.trim() !== '';
      return true;
    });
    
    if (!hasContent) {
      setError("Please add some content to your post.");
      setIsLoading(false);
      return;
    }
    
    // Process content blocks: convert file objects to URLs, extract poll data
    let pollData = null;
    let processedContent = [];
    
    // Upload all images first
    for (const block of contentBlocks) {
      if (block.type === 'image' && block.content.file) {
        const fileUrl = await uploadFileToS3(block.content.file);
        if (fileUrl) {
          block.content.fileUrl = fileUrl;
          block.content.file = null; // Remove file object
        }
      }
      
      // Extract poll data
      if (block.type === 'poll') {
        pollData = block.content;
      }
      
      // Add block to processed content
      processedContent.push(block);
    }
    
    // Create post object based on your Prisma model
    const post = {
      userId: getActualUserId(),
      username: isAnonymous ? 'anonymous' : extractedUsername,
      content: JSON.stringify(processedContent),
      poll: pollData,
      categories: selectedCategories.length > 0 ? selectedCategories : ["LEGAL_UPDATES"],
      // Don't include replyIds as it's not in the schema
    };
    
    // Send post to API
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create post');
    }
    
    // Handle successful post
    setPostSuccess(true);
    
    // Reset the post creator
    setContentBlocks([{ type: 'text', id: Date.now(), content: '' }]);
    setIsAnonymous(false);
    setSelectedCategories([]);
    
    // Show success message briefly, then reset
    setTimeout(() => {
      setPostSuccess(false);
    }, 3000);
    
  } catch (error) {
    console.error('Error creating post:', error);
    setError(error.message || 'Failed to create post. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  // // Generate a human-readable file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Render a specific content block
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id} className="canvas-block py-0 px-0 relative group">
            <textarea
              ref={el => textareaRefs.current[block.id] = el}
              className="w-full p-3 border-none resize-none focus:outline-none focus:ring-0 min-h-12 text-gray-800"
              placeholder="Start typing..."
              rows={block.content ? Math.max(1, Math.min(5, (block.content.split('\n').length))) : 1}
              value={block.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value, e.target.selectionStart)}
              onKeyDown={(e) => handleKeyDown(e, block.id, index)}
              onFocus={() => setActiveBlockId(block.id)}
              onClick={(e) => {
                setActiveBlockId(block.id);
                setCursorPosition(e.target.selectionStart);
              }}
              autoFocus={block.content === ''}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                onClick={() => insertAtCursor('image')}
              >
                <Image size={14} />
              </button>
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                onClick={() => insertAtCursor('link', { url: '' })}
              >
                <Link size={14} />
              </button>
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                onClick={() => {
                  if (!hasPoll) {
                    setShowPollCreator(true);
                  }
                }}
                disabled={hasPoll}
              >
                <BarChart2 size={14} />
              </button>
            </div>
          </div>
        );
      case 'image':
        return (
          <div key={block.id} className="canvas-block p-0 relative group">
            <div className="overflow-hidden mb-0 border border-gray-200 rounded-lg">
              <div className="relative">
                {block.content.previewUrl ? (
                  <div className="relative">
                    <img 
                      src={block.content.previewUrl} 
                      alt={block.content.fileName || "User uploaded"} 
                      className="w-full max-h-96 object-contain bg-gray-50"
                    />
                    {/* Upload progress indicator */}
                    {uploadProgress[block.id] > 0 && uploadProgress[block.id] < 100 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${uploadProgress[block.id]}%` }}
                          ></div>
                        </div>
                        <div className="absolute text-white text-sm mt-6">
                          Uploading...
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-40 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => replaceImage(block.id)}>
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                  </div>
                )}
                {block.content.file && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded">
                    {formatFileSize(block.content.file.size)}
                  </div>
                )}
              </div>
              <div className="flex items-center border-t border-gray-100">
                <input
                  type="text"
                  placeholder="Add a caption..."
                  className="flex-1 p-3 focus:outline-none"
                  value={block.content.caption || ''}
                  onChange={(e) => updateBlockContent(block.id, { 
                    ...block.content, 
                    caption: e.target.value 
                  })}
                />
                {block.content.previewUrl && (
                  <button
                    className="p-2 text-blue-600 hover:text-blue-800"
                    onClick={() => replaceImage(block.id)}
                  >
                    <Upload size={16} />
                  </button>
                )}
              </div>
            </div>
            {/* Add text below button */}
            <div className="flex justify-center mb-2">
              <button
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => {
                  const blockIndex = contentBlocks.findIndex(b => b.id === block.id);
                  const newBlockId = Date.now();
                  const newBlock = { type: 'text', id: newBlockId, content: '' };
                  
                  const newBlocks = [...contentBlocks];
                  newBlocks.splice(blockIndex + 1, 0, newBlock);
                  setContentBlocks(newBlocks);
                  
                  setTimeout(() => {
                    if (textareaRefs.current[newBlockId]) {
                      textareaRefs.current[newBlockId].focus();
                    }
                  }, 0);
                }}
              >
                <Plus size={14} className="mr-1" /> Add text below
              </button>
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="p-1 rounded-full bg-gray-800 bg-opacity-70 text-white"
                onClick={() => removeContentBlock(block.id)}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        );
      case 'link':
        return (
          <div key={block.id} className="canvas-block p-0 mb-2 relative group">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-3">
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  value={block.content.url}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, url: e.target.value })}
                />
                <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                  <div className="text-sm font-medium">Link Preview</div>
                  <div className="text-xs text-gray-500">{getDomain(block.content.url)}</div>
                </div>
              </div>
            </div>
            {/* Add text below button */}
            <div className="flex justify-center">
              <button
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => {
                  const blockIndex = contentBlocks.findIndex(b => b.id === block.id);
                  const newBlockId = Date.now();
                  const newBlock = { type: 'text', id: newBlockId, content: '' };
                  
                  const newBlocks = [...contentBlocks];
                  newBlocks.splice(blockIndex + 1, 0, newBlock);
                  setContentBlocks(newBlocks);
                  
                  setTimeout(() => {
                    if (textareaRefs.current[newBlockId]) {
                      textareaRefs.current[newBlockId].focus();
                    }
                  }, 0);
                }}
              >
                <Plus size={14} className="mr-1" /> Add text below
              </button>
            </div>
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="p-1 rounded-full bg-gray-200 text-gray-500"
                onClick={() => removeContentBlock(block.id)}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        );
      case 'poll':
        const pollContent = block.content;
        return (
          <div key={block.id} className="canvas-block p-0 mb-2 relative group">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-3 relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Poll</h3>
                </div>
                
                {pollContent.title && (
                  <div className="text-lg font-medium mb-2">{pollContent.title}</div>
                )}
                
                <div className="text-xs text-gray-500 mb-2">
                  {pollContent.isMultiselect ? 'Multiple choice' : 'Single choice'}
                </div>
                
                {pollContent.options.map((option, idx) => (
                  <div key={idx} className="flex items-center mb-1">
                    <div className="mr-2">
                      {pollContent.isMultiselect ? (
                        <div className="w-4 h-4 border border-gray-400 rounded" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-400 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 p-1 bg-gray-100 rounded">{option.title}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Add text below button */}
            <div className="flex justify-center">
              <button
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => {
                  const blockIndex = contentBlocks.findIndex(b => b.id === block.id);
                  const newBlockId = Date.now();
                  const newBlock = { type: 'text', id: newBlockId, content: '' };
                  
                  const newBlocks = [...contentBlocks];
                  newBlocks.splice(blockIndex + 1, 0, newBlock);
                  setContentBlocks(newBlocks);
                  
                  setTimeout(() => {
                    if (textareaRefs.current[newBlockId]) {
                      textareaRefs.current[newBlockId].focus();
                    }
                  }, 0);
                }}
              >
                <Plus size={14} className="mr-1" /> Add text below
              </button>
            </div>
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
              <button 
                className="p-1 rounded-full bg-gray-200 text-gray-500 mr-1"
                onClick={() => editPoll(block.id)}
              >
                <PlusCircle size={14} />
              </button>
              <button 
                className="p-1 rounded-full bg-gray-200 text-gray-500"
                onClick={() => removeContentBlock(block.id)}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* Header with author info */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {isAnonymous ? "A" : extractedUsername.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-medium">
                {isAnonymous ? "Anonymous" : extractedUsername}
                <span className="text-xs text-gray-500 ml-2">({userEmail})</span>
              </div>
              <div className="flex items-center">
                <label className="text-xs flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-1 rounded"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  Post anonymously
                </label>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Public</div>
        </div>
      </div>

      {/* Canvas-like editor */}
      <div className="bg-white">
        {contentBlocks.map((block, index) => (
          <React.Fragment key={block.id}>
            {renderContentBlock(block, index)}
          </React.Fragment>
        ))}
      </div>
      
      {/* Error message */}
      {error && (
        <div className="p-3 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {/* Success message */}
      {postSuccess && (
        <div className="p-3 text-green-500 text-sm">
          Post created successfully!
        </div>
      )}

      {/* Footer with toolbar */}
      <div className="border-t border-gray-100 p-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => {
                if (activeBlockId) {
                  insertAtCursor('image');
                } else {
                  addContentBlock('image', contentBlocks.length);
                }
              }}
              disabled={isLoading}
            >
              <Image size={18} className="text-green-600" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => {
                if (activeBlockId) {
                  insertAtCursor('link', { url: '' });
                } else {
                  addContentBlock('link', contentBlocks.length);
                }
              }}
              disabled={isLoading}
            >
              <Link size={18} className="text-blue-600" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setShowPollCreator(true)}
              disabled={hasPoll || isLoading}
            >
              <BarChart2 size={18} className="text-purple-600" />
            </button>
          </div>
          
          <button 
            className={`px-4 py-2 text-white rounded-lg flex items-center ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handlePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <Send size={16} className="mr-1" /> Post
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hidden file input for image uploads */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {/* Poll creator */}
      {showPollCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create Poll</h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => {
                  setShowPollCreator(false);
                  setCurrentEditingPollId(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Poll question:</label>
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Poll type:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    checked={pollType === 'single'} 
                    onChange={() => setPollType('single')} 
                    className="mr-1"
                  />
                  <span>Single choice</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    checked={pollType === 'multiple'} 
                    onChange={() => setPollType('multiple')} 
                    className="mr-1"
                  />
                  <span>Multiple choice</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Options:</label>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                  />
                  {pollOptions.length > 2 && (
                    <button 
                      className="p-1 text-gray-500 hover:text-gray-700"
                      onClick={() => removePollOption(index)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <div className="flex mt-2">
                <button 
                  className="flex items-center text-sm text-blue-600"
                  onClick={addPollOption}
                >
                  <PlusCircle size={16} className="mr-1" /> Add option
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="mr-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                onClick={() => {
                  setShowPollCreator(false);
                  setCurrentEditingPollId(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={addPoll}
              >
                {currentEditingPollId ? 'Update Poll' : 'Add Poll'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreator;

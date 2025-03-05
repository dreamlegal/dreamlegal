"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Image, Link, Plus, X, Send, PlusCircle, Upload } from 'lucide-react';

const PostCreator = () => {
  // Array of content blocks in order
  const [contentBlocks, setContentBlocks] = useState([
    { type: 'text', id: Date.now(), content: '' }
  ]);
  
  // Track current active block and cursor position
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollType, setPollType] = useState('single');
  const [pollQuestion, setPollQuestion] = useState('');
  const [currentEditingPollId, setCurrentEditingPollId] = useState(null);
  
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
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const targetBlockId = parseInt(fileInputRef.current.getAttribute('data-target-block-id'));
    
    if (file && targetBlockId) {
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      
      // Update the image block with the file data
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
    
    // If we're editing an existing poll
    if (currentEditingPollId) {
      updateBlockContent(currentEditingPollId, {
        options: filteredOptions,
        type: pollType,
        question: pollQuestion.trim()
      });
    } else {
      // Add a new poll
      const newBlocks = [...contentBlocks];
      const newBlock = {
        type: 'poll',
        id: Date.now(),
        content: {
          options: filteredOptions,
          type: pollType,
          question: pollQuestion.trim()
        }
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
    const poll = contentBlocks.find(block => block.id === id);
    if (poll && poll.type === 'poll') {
      setPollOptions(poll.content.options);
      setPollType(poll.content.type);
      setPollQuestion(poll.content.question || '');
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

  // Handle form submission - would upload files to AWS in actual implementation
  // const handlePost = () => {
  //   // Find image blocks that contain files
  //   const blocksWithFiles = contentBlocks.filter(
  //     block => block.type === 'image' && block.content.file
  //   );
    
  //   console.log('Would upload these files to AWS:', blocksWithFiles.map(b => b.content.file.name));
    
  //   // In real implementation, you would:
  //   // 1. Upload each file to AWS S3
  //   // 2. Get the URLs for each uploaded file
  //   // 3. Update the blocks with the file URLs
  //   // 4. Then submit the entire post content
    
  //   alert('Post content prepared for submission. Files would be uploaded to AWS.');
    
  //   // For demo purposes, show what would be sent to the server
  //   console.log('Post content:', contentBlocks);
  // };
  // Add this state at the top of your PostCreator component
const [publishedPosts, setPublishedPosts] = useState([]);

// Modify your handlePost function
const handlePost = () => {
  // Find image blocks that contain files
  const blocksWithFiles = contentBlocks.filter(
    block => block.type === 'image' && block.content.file
  );
  
  console.log('Would upload these files to AWS:', blocksWithFiles.map(b => b.content.file.name));
  
  // Process blocks for submission
  const processedBlocks = contentBlocks.map(block => {
    if (block.type === 'image' && block.content.file) {
      return {
        ...block,
        content: {
          ...block.content,
          fileUrl: block.content.previewUrl, // In a real app, this would be the S3 URL
          file: null // Don't include the file object
        }
      };
    }
    return block;
  });
  
  // Add the new post to the posts array
  setPublishedPosts([
    {
      id: Date.now(),
      author: "John Doe",
      timestamp: new Date(),
      contentBlocks: processedBlocks
    },
    ...publishedPosts
  ]);
  
  // Reset the editor
  setContentBlocks([{ type: 'text', id: Date.now(), content: '' }]);
};

  // Generate a human-readable file size
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
                <span className="text-xs">📊</span>
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
                  <img 
                    src={block.content.previewUrl} 
                    alt={block.content.fileName || "User uploaded"} 
                    className="w-full max-h-96 object-contain bg-gray-50"
                  />
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
        return (
          <div key={block.id} className="canvas-block p-0 mb-2 relative group">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-3 relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Poll</h3>
                </div>
                
                {block.content.question && (
                  <div className="text-lg font-medium mb-2">{block.content.question}</div>
                )}
                
                <div className="text-xs text-gray-500 mb-2">
                  {block.content.type === 'single' ? 'Single choice' : 'Multiple choice'}
                </div>
                
                {block.content.options.map((option, idx) => (
                  <div key={idx} className="flex items-center mb-1">
                    <div className="mr-2">
                      {block.content.type === 'single' ? (
                        <div className="w-4 h-4 border border-gray-400 rounded-full" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-400 rounded" />
                      )}
                    </div>
                    <div className="flex-1 p-1 bg-gray-100 rounded">{option}</div>
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
    <>
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-gray-500">Public</div>
          </div>
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
            >
              <Link size={18} className="text-blue-600" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setShowPollCreator(true)}
              disabled={hasPoll}
            >
              <span className="text-base text-purple-600">📊</span>
            </button>
          </div>
          
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
            onClick={handlePost}
          >
            <Send size={16} className="mr-1" /> Post
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
              <label className="block text-sm font-medium mb-1">Poll question (optional):</label>
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
     {publishedPosts.length > 0 && (
      <div className="mt-8 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Posts</h2>
        {publishedPosts.map(post => (
          <div key={post.id} className="mb-6">
            <PostRenderer 
              contentBlocks={post.contentBlocks}
              author={post.author}
              timestamp={post.timestamp}
            />
          </div>
        ))}
      </div>
    )}
    </>
  );
};

export default PostCreator;



// // This component takes the contentBlocks data from your PostCreator and renders it
// const PostRenderer = ({ contentBlocks, author = "John Doe", timestamp = new Date() }) => {
//   // Format the date
//   const formattedDate = new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format(timestamp);

//   // Render a specific content block
//   const renderContentBlock = (block) => {
//     switch (block.type) {
//       case 'text':
//         return (
//           <div key={block.id} className="mb-4">
//             {/* Split text by newlines and preserve formatting */}
//             {block.content.split('\n').map((line, i) => (
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
//               src={block.content.fileUrl || block.content.previewUrl} 
//               alt={block.content.caption || "Post image"} 
//               className="w-full rounded-lg" 
//             />
//             {block.content.caption && (
//               <p className="text-sm text-gray-500 mt-1">{block.content.caption}</p>
//             )}
//           </div>
//         );
        
//       case 'link':
//         return (
//           <div key={block.id} className="mb-4">
//             <a 
//               href={block.content.url.startsWith('http') ? block.content.url : `https://${block.content.url}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block p-3 border rounded-lg hover:bg-gray-50"
//             >
//               <div className="text-blue-600 text-sm font-medium">
//                 {block.content.url}
//               </div>
//               <div className="text-gray-500 text-xs mt-1">
//                 {getDomain(block.content.url)}
//               </div>
//             </a>
//           </div>
//         );
        
//       case 'poll':
//         return (
//           <div key={block.id} className="mb-4 border rounded-lg p-4">
//             {block.content.question && (
//               <h3 className="text-lg font-medium mb-2">{block.content.question}</h3>
//             )}
            
//             <div className="text-xs text-gray-500 mb-2">
//               {block.content.type === 'single' ? 'Single choice poll' : 'Multiple choice poll'}
//             </div>
            
//             {block.content.options.map((option, idx) => (
//               <div key={idx} className="flex items-center mb-2">
//                 <div className="mr-2">
//                   {block.content.type === 'single' ? (
//                     <div className="w-4 h-4 border border-gray-400 rounded-full" />
//                   ) : (
//                     <div className="w-4 h-4 border border-gray-400 rounded" />
//                   )}
//                 </div>
//                 <div className="flex-1 p-2 bg-gray-100 rounded">{option}</div>
//               </div>
//             ))}
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   // Helper function to get domain from URL for preview
//   const getDomain = (url) => {
//     try {
//       if (!url) return 'example.com';
//       if (!url.startsWith('http')) url = 'https://' + url;
//       return new URL(url).hostname;
//     } catch (e) {
//       return 'example.com';
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
//       {/* Post Header */}
//       <div className="p-4 border-b">
//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
//           <div>
//             <div className="font-medium">{author}</div>
//             <div className="text-xs text-gray-500">Posted {formattedDate}</div>
//           </div>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="p-4">
//         {contentBlocks.map((block) => (
//           <React.Fragment key={block.id}>
//             {renderContentBlock(block)}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Post Footer */}
//       <div className="p-4 border-t flex items-center space-x-4 text-sm text-gray-500">
//         <button className="flex items-center hover:text-blue-600">
//           <span className="mr-1">👍</span> Like
//         </button>
//         <button className="flex items-center hover:text-blue-600">
//           <span className="mr-1">💬</span> Comment
//         </button>
//         <button className="flex items-center hover:text-blue-600">
//           <span className="mr-1">↗️</span> Share
//         </button>
//       </div>
//     </div>
//   );
// };


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
const PostRenderer = ({ contentBlocks, author = "John Doe", timestamp = new Date() }) => {
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
    contentBlocks.forEach(block => {
      if (block.type === 'poll') {
        pollState[block.id] = {
          // Initialize votes as empty arrays if not present
          options: block.content.options.map(option => ({
            text: typeof option === 'string' ? option : option.text,
            votes: Array.isArray(option.votes) ? option.votes : []
          })),
          type: block.content.type,
          question: block.content.question,
          settings: {
            allowMultiple: block.content.type === 'multiple'
          }
        };
      }
    });
    return pollState;
  });
  
  // State for likes, comments
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [shares, setShares] = useState(0);
  
  // Handle poll vote
  const handleVote = (pollId, optionIndex) => {
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
      
      return {
        ...currentPolls,
        [pollId]: {
          ...pollData,
          options: updatedOptions
        }
      };
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
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id} className="mb-4">
            {/* Split text by newlines and preserve formatting */}
            {block.content.split('\n').map((line, i) => (
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
              src={block.content.fileUrl || block.content.previewUrl} 
              alt={block.content.caption || "Post image"} 
              className="w-full rounded-lg" 
            />
            {block.content.caption && (
              <p className="text-sm text-gray-500 mt-1">{block.content.caption}</p>
            )}
          </div>
        );
        
      case 'link':
        return (
          <div key={block.id} className="mb-4">
            <a 
              href={block.content.url.startsWith('http') ? block.content.url : `https://${block.content.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="text-blue-600 text-sm font-medium">
                {block.content.url}
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {getDomain(block.content.url)}
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

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* Post Header */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
            <span className="text-gray-600 font-medium">{author.substring(0, 2)}</span>
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


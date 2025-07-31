
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import FontSize from '@tiptap/extension-font-size';
import { useEditor, EditorContent } from '@tiptap/react';
import { Node } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Dropcursor from '@tiptap/extension-dropcursor';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/core';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Blockquote from '@tiptap/extension-blockquote';
import FontFamily from '@tiptap/extension-font-family';
import {
  Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight,
  Link2, List, ListOrdered, RefreshCw, Save,
  X, Quote, Code as CodeIcon, Strikethrough, 
  Subscript as SubIcon, Superscript as SupIcon, Palette, Highlighter,
  Minus, CheckSquare, Undo, Redo, Eraser, MoreHorizontal, ChevronDown,
  Search, Package, ExternalLink, Image as ImageIcon, Table as TableIcon,
  Upload, AlertTriangle
} from 'lucide-react';

// Register languages for syntax highlighting
lowlight.registerLanguage('javascript', js);
lowlight.registerLanguage('typescript', ts);
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('java', java);
lowlight.registerLanguage('json', json);

// Enhanced Image Modal with S3 upload capability
const ImageModal = ({ onClose, onInsert }) => {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('auto');
  const [alignment, setAlignment] = useState('center');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // S3 Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  // Check if URL is valid
  const checkImageUrl = (url) => {
    if (!url) {
      setIsValidUrl(false);
      return;
    }

    setIsImageLoading(true);
    const imgElement = new window.Image();
    imgElement.onload = () => {
      setIsValidUrl(true);
      setIsImageLoading(false);
    };
    imgElement.onerror = () => {
      setIsValidUrl(false);
      setIsImageLoading(false);
    };
    imgElement.src = url;
  };

  // Handle URL change
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    checkImageUrl(url);
  };

  // Handle file upload to S3
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Setup XHR for progress tracking
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Handle response
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            setImageUrl(response.url);
            setIsValidUrl(true);
            setIsUploading(false);
          } catch (error) {
            setUploadError('Error parsing server response');
            setIsUploading(false);
          }
        } else {
          setUploadError('Failed to upload image');
          setIsUploading(false);
        }
      };

      // Handle errors
      xhr.onerror = () => {
        setUploadError('Network error occurred during upload');
        setIsUploading(false);
      };

      // Send the upload request
      xhr.open('POST', '/api/blogs/upload');
      xhr.send(formData);

    } catch (err) {
      setUploadError(err.message || 'An unexpected error occurred during upload');
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInsert = () => {
    if (imageUrl && isValidUrl) {
      onInsert(imageUrl, width, height, alignment);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-xl"
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#f5f7fa' }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Insert Image</h3>

        {/* S3 Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>Upload Image</label>

          <div
            onClick={triggerFileInput}
            className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
            style={{ borderColor: '#7cc6ee', backgroundColor: '#ffffff' }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#1e2556';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#7cc6ee';
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
            />

            {isUploading ? (
              <div className="w-full px-8">
                <div className="text-center mb-2">
                  <p style={{ color: '#334155' }}>Uploading... {uploadProgress}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ 
                      width: `${uploadProgress}%`,
                      backgroundColor: '#1e2556'
                    }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 mb-2" style={{ color: '#334155' }} />
                <p className="font-medium" style={{ color: '#334155' }}>Click to upload image</p>
                <p className="text-sm" style={{ color: '#334155' }}>JPG, PNG, GIF or WEBP (max. 5MB)</p>
              </>
            )}
          </div>

          {uploadError && (
            <div className="mt-2 p-2 bg-red-50 text-red-600 rounded text-sm">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>Or Enter Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlChange}
            className="w-full p-2 border-2 rounded focus:outline-none focus:ring-2 transition"
            style={{ 
              borderColor: '#7cc6ee',
              color: '#2d2d2d'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1e2556';
              e.target.style.boxShadow = '0 0 0 2px rgba(30, 37, 86, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#7cc6ee';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Enhanced Image Preview */}
        {imageUrl && (
          <div className="mb-4 relative">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#1e2556' }}></div>
              </div>
            )}

            {isValidUrl ? (
              <div className="relative p-4 rounded border bg-white" style={{ borderColor: '#7cc6ee' }}>
                <h4 className="text-sm font-medium mb-2" style={{ color: '#334155' }}>Preview:</h4>
                
                {/* Alignment Preview Container */}
                <div className={`relative min-h-[120px] ${
                  alignment === 'center' ? 'text-center' : 
                  alignment === 'right' ? 'text-right' : 'text-left'
                }`}>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className={`img-align-${alignment} rounded border shadow-sm ${
                      alignment === 'left' ? 'float-left mr-4 mb-2' :
                      alignment === 'right' ? 'float-right ml-4 mb-2' :
                      'mx-auto block'
                    }`}
                    style={{
                      width: width !== '100%' ? width : null,
                      height: height !== 'auto' ? height : null,
                      maxWidth: alignment === 'center' ? '100%' : '200px',
                      maxHeight: '100px',
                      objectFit: 'contain',
                      borderColor: '#7cc6ee'
                    }}
                  />
                  
                  {/* Sample text to show text flow */}
                  {alignment !== 'center' && (
                    <p className="text-xs text-gray-500 leading-relaxed">
                      This is sample text that demonstrates how your content will flow around the image. 
                      {alignment === 'left' && ' The text wraps around the right side of the left-aligned image, creating a natural reading flow.'}
                      {alignment === 'right' && ' The text wraps around the left side of the right-aligned image, creating an elegant layout.'}
                      The actual text in your blog will wrap just like this preview shows.
                    </p>
                  )}
                  
                  {alignment === 'center' && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 text-center">
                        Center-aligned image with text above and below
                      </p>
                    </div>
                  )}
                  
                  <div className="clear-both"></div>
                </div>
              </div>
            ) : !isImageLoading && (
              <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
                Unable to load image. Please check the URL.
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>Width</label>
            <select
              value={width}
              onChange={e => setWidth(e.target.value)}
              className="w-full p-2 border-2 rounded focus:outline-none focus:ring-2 transition"
              style={{ 
                borderColor: '#7cc6ee',
                color: '#2d2d2d'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1e2556';
                e.target.style.boxShadow = '0 0 0 2px rgba(30, 37, 86, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#7cc6ee';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="100%">Full width</option>
              <option value="300px">Small (300px)</option>
              <option value="500px">Medium (500px)</option>
              <option value="700px">Large (700px)</option>
              <option value="200px">Extra Small (200px)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>Height</label>
            <select
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="w-full p-2 border-2 rounded focus:outline-none focus:ring-2 transition"
              style={{ 
                borderColor: '#7cc6ee',
                color: '#2d2d2d'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1e2556';
                e.target.style.boxShadow = '0 0 0 2px rgba(30, 37, 86, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#7cc6ee';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="auto">Auto</option>
              <option value="200px">Small (200px)</option>
              <option value="300px">Medium (300px)</option>
              <option value="400px">Large (400px)</option>
              <option value="500px">Extra Large (500px)</option>
            </select>
          </div>
        </div>

        {/* Enhanced Image Alignment Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-3" style={{ color: '#334155' }}>
            Image Position & Text Flow
          </label>
          <div className="grid grid-cols-3 gap-3">
            {/* Left Alignment */}
            <div
              onClick={() => setAlignment('left')}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                alignment === 'left' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              style={{
                borderColor: alignment === 'left' ? '#1e2556' : '#7cc6ee',
                backgroundColor: alignment === 'left' ? '#f0f4f8' : 'white'
              }}
            >
              <div className="text-center mb-2">
                <div className="w-8 h-6 bg-gray-400 rounded mx-auto mb-1"></div>
                <div className="flex gap-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                </div>
              </div>
              <p className="text-xs text-center font-medium" style={{ color: '#334155' }}>
                Left
              </p>
              <p className="text-xs text-center" style={{ color: '#6b7280' }}>
                Text wraps right
              </p>
            </div>

            {/* Center Alignment */}
            <div
              onClick={() => setAlignment('center')}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                alignment === 'center' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              style={{
                borderColor: alignment === 'center' ? '#1e2556' : '#7cc6ee',
                backgroundColor: alignment === 'center' ? '#f0f4f8' : 'white'
              }}
            >
              <div className="text-center mb-2">
                <div className="w-8 h-6 bg-gray-400 rounded mx-auto mb-1"></div>
                <div className="flex gap-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                </div>
              </div>
              <p className="text-xs text-center font-medium" style={{ color: '#334155' }}>
                Center
              </p>
              <p className="text-xs text-center" style={{ color: '#6b7280' }}>
                Text above/below
              </p>
            </div>

            {/* Right Alignment */}
            <div
              onClick={() => setAlignment('right')}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                alignment === 'right' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              style={{
                borderColor: alignment === 'right' ? '#1e2556' : '#7cc6ee',
                backgroundColor: alignment === 'right' ? '#f0f4f8' : 'white'
              }}
            >
              <div className="text-center mb-2">
                <div className="flex gap-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                </div>
                <div className="w-8 h-6 bg-gray-400 rounded mx-auto mt-1"></div>
              </div>
              <p className="text-xs text-center font-medium" style={{ color: '#334155' }}>
                Right
              </p>
              <p className="text-xs text-center" style={{ color: '#6b7280' }}>
                Text wraps left
              </p>
            </div>
          </div>
          
          {/* Alignment Description */}
          <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#f0f4f8' }}>
            <p className="text-sm" style={{ color: '#334155' }}>
              {alignment === 'left' && '📍 Image will float to the left with text wrapping around the right side.'}
              {alignment === 'center' && '📍 Image will be centered with text flowing above and below it.'}
              {alignment === 'right' && '📍 Image will float to the right with text wrapping around the left side.'}
            </p>
            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>
              On mobile devices, images automatically stack for better readability.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border-2 rounded-lg hover:bg-gray-100 transition"
            style={{ borderColor: '#7cc6ee', color: '#2d2d2d' }}
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="px-4 py-2 rounded-lg transition text-white disabled:opacity-50"
            style={{ backgroundColor: isValidUrl && imageUrl ? '#1e2556' : '#334155' }}
            onMouseEnter={(e) => {
              if (isValidUrl && imageUrl) e.target.style.backgroundColor = '#7cc6ee';
            }}
            onMouseLeave={(e) => {
              if (isValidUrl && imageUrl) e.target.style.backgroundColor = '#1e2556';
            }}
            disabled={!imageUrl || !isValidUrl}
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Search Modal Component
const ProductSearchModal = ({ onClose, onInsert, type = 'inline' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Debounced search function
  const searchProducts = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Product search error:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search queries
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchProducts]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleInsert = () => {
    if (selectedProduct) {
      onInsert(selectedProduct, type);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#f5f7fa' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: '#1e2556' }}>
            {type === 'inline' ? 'Insert Product Reference' : 'Add Product at End'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} style={{ color: '#334155' }} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
            style={{ 
              borderColor: '#7cc6ee',
              color: '#2d2d2d'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1e2556';
              e.target.style.boxShadow = '0 0 0 2px rgba(30, 37, 86, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#7cc6ee';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Search for legal software products..."
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="max-h-64 overflow-y-auto mb-4">
          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 mx-auto" style={{ borderColor: '#1e2556' }}></div>
              <p className="mt-2" style={{ color: '#334155' }}>Searching products...</p>
            </div>
          )}

          {!isLoading && searchQuery.length >= 2 && products.length === 0 && (
            <div className="text-center py-4">
              <Package size={48} className="mx-auto mb-2" style={{ color: '#334155' }} />
              <p style={{ color: '#334155' }}>No products found for "{searchQuery}"</p>
            </div>
          )}

          {!isLoading && products.length > 0 && (
            <div className="space-y-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`p-3 rounded-lg cursor-pointer transition flex items-center space-x-3 ${
                    selectedProduct?.id === product.id 
                      ? 'bg-white border-2' 
                      : 'bg-white border border-gray-200 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selectedProduct?.id === product.id ? '#1e2556' : '#e5e7eb'
                  }}
                >
                  <img
                    src={product.logoUrl || '/default-product-logo.png'}
                    alt={product.productName}
                    className="w-12 h-12 object-contain rounded"
                    onError={(e) => {
                      e.target.src = '/default-product-logo.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate" style={{ color: '#1e2556' }}>
                      {product.productName}
                    </h4>
                    <p className="text-sm truncate" style={{ color: '#334155' }}>
                      {product.companyName}
                    </p>
                    <p className="text-xs" style={{ color: '#334155' }}>
                      {product.category}
                    </p>
                  </div>
                  {selectedProduct?.id === product.id && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: '#1e2556' }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            style={{ borderColor: '#7cc6ee', color: '#2d2d2d' }}
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!selectedProduct}
            className="px-4 py-2 rounded-lg transition text-white flex items-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: selectedProduct ? '#1e2556' : '#334155' }}
            onMouseEnter={(e) => {
              if (selectedProduct) e.target.style.backgroundColor = '#7cc6ee';
            }}
            onMouseLeave={(e) => {
              if (selectedProduct) e.target.style.backgroundColor = '#1e2556';
            }}
          >
            <Package size={16} />
            Insert Product
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Product Extension for TipTap
const ProductWidget = Node.create({
  name: 'productWidget',

  group: 'inline',

  content: '',

  inline: true,

  atom: true,

  addAttributes() {
    return {
      productId: {
        default: null,
      },
      productName: {
        default: '',
      },
      companyName: {
        default: '',
      },
      logoUrl: {
        default: '',
      },
      slug: {
        default: '',
      },
      type: {
        default: 'inline', // 'inline' or 'end'
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-product-widget]',
        getAttrs: (element) => ({
          productId: element.getAttribute('data-product-id'),
          productName: element.getAttribute('data-product-name'),
          companyName: element.getAttribute('data-company-name'),
          logoUrl: element.getAttribute('data-logo-url'),
          slug: element.getAttribute('data-slug'),
          type: element.getAttribute('data-type') || 'inline',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes.type || 'inline';
    
    if (type === 'inline') {
      return [
        'div',
        {
          'data-product-widget': true,
          'data-product-id': HTMLAttributes.productId,
          'data-product-name': HTMLAttributes.productName,
          'data-company-name': HTMLAttributes.companyName,
          'data-logo-url': HTMLAttributes.logoUrl,
          'data-slug': HTMLAttributes.slug,
          'data-type': HTMLAttributes.type,
          class: `product-widget product-widget-inline`,
          style: 'display: inline-flex; align-items: center; gap: 0.375rem; margin: 0 0.25rem; padding: 0.25rem 0.5rem; border-radius: 1rem; border: 1px solid #7cc6ee; background-color: #f5f7fa; vertical-align: middle; white-space: nowrap; max-width: 180px; line-height: 1; height: 1.5rem; cursor: pointer; transition: all 0.3s ease;',
          onclick: `window.open('/product/${HTMLAttributes.slug}', '_blank')`
        },
        [
          'img',
          {
            src: HTMLAttributes.logoUrl || '/default-product-logo.png',
            alt: HTMLAttributes.productName,
            style: 'width: 1.25rem; height: 1.25rem; object-fit: contain; border-radius: 0.25rem; background-color: white; padding: 0.125rem; flex-shrink: 0;',
            onerror: "this.src='/default-product-logo.png'"
          }
        ],
        [
          'span',
          {
            style: 'font-size: 0.8rem; font-weight: 600; color: #1e2556; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0;'
          },
          HTMLAttributes.productName
        ],
        [
          'div',
          {
            style: 'display: flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; background-color: #1e2556; color: white; border-radius: 50%; transition: all 0.3s ease; flex-shrink: 0;'
          },
          [
            'svg',
            {
              width: '10',
              height: '10',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '2'
            },
            [
              'path',
              {
                d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'
              }
            ],
            [
              'polyline',
              {
                points: '15,3 21,3 21,9'
              }
            ],
            [
              'line',
              {
                x1: '10',
                y1: '14',
                x2: '21',
                y2: '3'
              }
            ]
          ]
        ]
      ];
    } else {
      return [
        'div',
        {
          'data-product-widget': true,
          'data-product-id': HTMLAttributes.productId,
          'data-product-name': HTMLAttributes.productName,
          'data-company-name': HTMLAttributes.companyName,
          'data-logo-url': HTMLAttributes.logoUrl,
          'data-slug': HTMLAttributes.slug,
          'data-type': HTMLAttributes.type,
          class: `product-widget product-widget-end`,
          style: 'display: inline-block; margin: 1rem 0; padding: 0.75rem 1rem; border-radius: 0.5rem; border: 2px solid #7cc6ee; background-color: #f5f7fa; max-width: 280px; width: auto; vertical-align: top; cursor: pointer; transition: all 0.3s ease;',
          onclick: `window.open('/product/${HTMLAttributes.slug}', '_blank')`
        },
        [
          'div',
          {
            style: 'display: flex; align-items: center; gap: 0.75rem; position: relative;'
          },
          [
            'img',
            {
              src: HTMLAttributes.logoUrl || '/default-product-logo.png',
              alt: HTMLAttributes.productName,
              style: 'width: 2.5rem; height: 2.5rem; object-fit: contain; border-radius: 0.375rem; background-color: white; padding: 0.25rem; border: 1px solid #7cc6ee; flex-shrink: 0;',
              onerror: "this.src='/default-product-logo.png'"
            }
          ],
          [
            'div',
            {
              style: 'flex: 1; min-width: 0;'
            },
            [
              'h4',
              {
                style: 'font-size: 0.9rem; font-weight: 700; color: #1e2556; margin: 0 0 0.125rem 0; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'
              },
              HTMLAttributes.productName
            ],
            [
              'p',
              {
                style: 'font-size: 0.75rem; color: #334155; margin: 0; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'
              },
              HTMLAttributes.companyName
            ]
          ],
          [
            'div',
            {
              style: 'display: flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; background-color: #1e2556; color: white; border-radius: 50%; transition: all 0.3s ease; flex-shrink: 0;'
            },
            [
              'svg',
              {
                width: '14',
                height: '14',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2'
              },
              [
                'path',
                {
                  d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'
                }
              ],
              [
                'polyline',
                {
                  points: '15,3 21,3 21,9'
                }
              ],
              [
                'line',
                {
                  x1: '10',
                  y1: '14',
                  x2: '21',
                  y2: '3'
                }
              ]
            ]
          ]
        ]
      ];
    }
  },

  addNodeView() {
    return ({ node }) => {
      const div = document.createElement('div');
      div.className = `product-widget product-widget-${node.attrs.type}`;
      
      if (node.attrs.type === 'inline') {
        // Small inline widget - just logo, name, and click icon
        div.innerHTML = `
          <img src="${node.attrs.logoUrl || '/default-product-logo.png'}" 
               alt="${node.attrs.productName}" 
               class="product-widget-inline-logo"
               onerror="this.src='/default-product-logo.png'">
          <span class="product-widget-inline-name">${node.attrs.productName}</span>
          <div class="product-widget-inline-action">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15,3 21,3 21,9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        `;
      } else {
        // Compact end widget - left aligned, smaller
        div.innerHTML = `
          <div class="product-widget-end-content">
            <img src="${node.attrs.logoUrl || '/default-product-logo.png'}" 
                 alt="${node.attrs.productName}" 
                 class="product-widget-end-logo"
                 onerror="this.src='/default-product-logo.png'">
            <div class="product-widget-end-info">
              <h4 class="product-widget-end-name">${node.attrs.productName}</h4>
              <p class="product-widget-end-company">${node.attrs.companyName}</p>
            </div>
            <div class="product-widget-end-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15,3 21,3 21,9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </div>
        `;
      }

      div.addEventListener('click', () => {
        window.open(`/product/${node.attrs.slug}`, '_blank');
      });

      return {
        dom: div,
      };
    };
  },
});

// Custom Image Extension with proper alignment and size support
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: element => element.getAttribute('height'),
        renderHTML: attributes => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height,
          };
        },
      },
      alignment: {
        default: 'center',
        parseHTML: element => {
          const className = element.getAttribute('class') || '';
          if (className.includes('img-align-left')) return 'left';
          if (className.includes('img-align-center')) return 'center';
          if (className.includes('img-align-right')) return 'right';
          return 'center';
        },
        renderHTML: attributes => {
          return {
            class: `blog-image img-align-${attributes.alignment || 'center'}`,
          };
        },
      },
    };
  },
});

// Color Picker Component
const ColorPicker = ({ onColorSelect, type = 'text' }) => {
  const colors = [
    '#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6',
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
    '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899',
    '#F43F5E', '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D',
    '#059669', '#0891B2', '#2563EB', '#4F46E5', '#7C3AED', '#9333EA'
  ];

  return (
    <div className="grid grid-cols-6 gap-1 p-2 bg-white border rounded-lg shadow-lg">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
          title={color}
        />
      ))}
      <button
        type="button"
        className="w-6 h-6 rounded border border-gray-300 bg-white hover:scale-110 transition-transform relative"
        onClick={() => onColorSelect('')}
        title="Remove color"
      >
        <X size={12} className="text-red-500 absolute inset-0 m-auto" />
      </button>
    </div>
  );
};

// Font Family Selector
const FontFamilySelector = ({ editor }) => {
  const fontFamilies = [
    { label: 'Default', value: '' },
    { label: 'Inter', value: 'Inter' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS' },
    { label: 'Palatino', value: 'Palatino' }
  ];

  const handleFontChange = (fontFamily) => {
    if (fontFamily) {
      editor.chain().focus().setFontFamily(fontFamily).run();
    } else {
      editor.chain().focus().unsetFontFamily().run();
    }
  };

  return (
    <select
      className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onChange={(e) => handleFontChange(e.target.value)}
      defaultValue=""
    >
      {fontFamilies.map((font) => (
        <option 
          key={font.value} 
          value={font.value}
          style={{ fontFamily: font.value }}
        >
          {font.label}
        </option>
      ))}
    </select>
  );
};

// Font Size Selector
const FontSizeSelector = ({ editor }) => {
  const fontSizes = [
    { label: 'Default', value: '' },
    { label: '10px', value: '10px' },
    { label: '12px', value: '12px' },
    { label: '14px', value: '14px' },
    { label: '16px', value: '16px' },
    { label: '18px', value: '18px' },
    { label: '20px', value: '20px' },
    { label: '24px', value: '24px' },
    { label: '28px', value: '28px' },
    { label: '32px', value: '32px' },
    { label: '36px', value: '36px' },
    { label: '48px', value: '48px' },
    { label: '60px', value: '60px' },
    { label: '72px', value: '72px' }
  ];

  const handleFontSizeChange = (fontSize) => {
    if (fontSize) {
      editor.chain().focus().setFontSize(fontSize).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  // Get current font size from editor
  const getCurrentFontSize = () => {
    const { fontSize } = editor.getAttributes('textStyle');
    return fontSize || '';
  };

  return (
    <select
      className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[80px]"
      onChange={(e) => handleFontSizeChange(e.target.value)}
      value={getCurrentFontSize()}
    >
      {fontSizes.map((size) => (
        <option key={size.value} value={size.value}>
          {size.label}
        </option>
      ))}
    </select>
  );
};

// FIXED: Utility function to generate slug from text
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Remove multiple consecutive hyphens
    .trim();
};

// FIXED: Function to extract headings from the editor content
const extractHeadings = (editor) => {
  if (!editor) return [];

  const headings = [];
  const content = editor.getJSON();

  const processNode = (node) => {
    if (node.type === 'heading' && node.content) {
      // Extract text content properly
      const text = node.content
        .filter(child => child.type === 'text')
        .map(child => child.text)
        .join('') || 'Untitled';
      
      const slug = generateSlug(text);
      
      headings.push({
        level: node.attrs.level,
        content: text,
        id: slug
      });
    }

    if (node.content) {
      node.content.forEach(child => processNode(child));
    }
  };

  if (content.content) {
    content.content.forEach(node => processNode(node));
  }

  return headings;
};

// FIXED: Function to add IDs to headings in HTML content
const addIdsToHeadingsInHTML = (htmlContent) => {
  if (!htmlContent) return htmlContent;
  
  // More robust regex that handles various heading formats including H4-H5
  const headingRegex = /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi;
  
  return htmlContent.replace(headingRegex, (match, tag, attributes, content) => {
    // Extract text content (remove any nested HTML tags)
    const textContent = content.replace(/<\/?[^>]+(>|$)/g, '').trim();
    
    if (!textContent) return match;
    
    const slug = generateSlug(textContent);
    
    // Check if ID already exists in attributes
    if (attributes && attributes.includes('id=')) {
      return match; // Don't modify if ID already exists
    }
    
    // Add ID to the heading
    const newAttributes = attributes ? `${attributes} id="${slug}"` : ` id="${slug}"`;
    return `<${tag}${newAttributes}>${content}</${tag}>`;
  });
};

// Enhanced toolbar with advanced formatting options
const EditorToolbar = ({ editor, onImageAdd, onExtractToc }) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [productSearchType, setProductSearchType] = useState('inline');

  if (!editor) return null;

  // Use mousedown instead of click to prevent focus loss
  const handleMouseDown = (action) => (e) => {
    e.preventDefault();
    action();
    editor.view.focus();
  };

  // Function to handle heading application - NOW SUPPORTS 5 LEVELS
  const applyHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  // Function to apply heading-like styling to selected text only
  const applyTextStyle = (fontSize, isBold = true) => {
    if (isBold) {
      editor.chain()
        .focus()
        .setFontSize(fontSize)
        .toggleBold()
        .run();
    } else {
      editor.chain()
        .focus()
        .setFontSize(fontSize)
        .run();
    }
  };

  // Handle product insertion
  const handleProductInsert = (product, type) => {
    editor.chain().focus().insertContent({
      type: 'productWidget',
      attrs: {
        productId: product.id,
        productName: product.productName,
        companyName: product.companyName,
        logoUrl: product.logoUrl,
        slug: product.slug,
        type: type,
      },
    }).run();
    setShowProductSearch(false);
  };

  return (
    <div className="border-b sticky top-4 bg-white z-10 shadow-sm rounded-t-lg">
      {/* Primary Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 relative editor-toolbar">
        {/* Undo/Redo */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().undo().run())}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().redo().run())}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>

        {/* Font Family & Size */}
        <div className="flex items-center gap-2 border-r pr-2 mr-2">
          <FontFamilySelector editor={editor} />
          <FontSizeSelector editor={editor} />
        </div>

        {/* Headings - NOW 5 LEVELS! */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyHeading(1))}
            className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyHeading(2))}
            className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyHeading(3))}
            className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyHeading(4))}
            className={`p-2 rounded ${editor.isActive('heading', { level: 4 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Heading 4"
          >
            H4
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyHeading(5))}
            className={`p-2 rounded ${editor.isActive('heading', { level: 5 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Heading 5"
          >
            H5
          </button>
        </div>
        
        {/* Text Style buttons */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyTextStyle('24px'))}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            title="Large text"
          >
            T1
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyTextStyle('20px'))}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            title="Medium text"
          >
            T2
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => applyTextStyle('16px'))}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            title="Small text"
          >
            T3
          </button>
        </div>

        {/* Basic Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBold().run())}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().toggleItalic().run())}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().toggleUnderline().run())}
            className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().toggleStrike().run())}
            className={`p-2 rounded ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
        </div>

        {/* Colors */}
        <div className="flex gap-1 border-r pr-2 mr-2 relative">
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowTextColorPicker(!showTextColorPicker);
                setShowHighlightPicker(false);
              }}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
              title="Text Color"
            >
              <Palette size={18} />
            </button>
            {showTextColorPicker && (
              <div className="absolute top-full left-0 mt-1 z-20">
                <ColorPicker
                  onColorSelect={(color) => {
                    if (color) {
                      editor.chain().focus().setColor(color).run();
                    } else {
                      editor.chain().focus().unsetColor().run();
                    }
                    setShowTextColorPicker(false);
                  }}
                  type="text"
                />
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowHighlightPicker(!showHighlightPicker);
                setShowTextColorPicker(false);
              }}
              className={`p-2 rounded ${editor.isActive('highlight') ? 'bg-yellow-400 text-black' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Highlight"
            >
              <Highlighter size={18} />
            </button>
            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1 z-20">
                <ColorPicker
                  onColorSelect={(color) => {
                    if (color) {
                      editor.chain().focus().toggleHighlight({ color }).run();
                    } else {
                      editor.chain().focus().unsetHighlight().run();
                    }
                    setShowHighlightPicker(false);
                  }}
                  type="highlight"
                />
              </div>
            )}
          </div>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('left').run())}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('center').run())}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('right').run())}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
        </div>

        {/* Media & Tools */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              const url = window.prompt('Enter the URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
              editor.view.focus();
            }}
            className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Insert Link"
          >
            <Link2 size={18} />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              onImageAdd();
            }}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            type="button"
            onMouseDown={handleMouseDown(() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            title="Insert Table"
          >
            <TableIcon size={18} />
          </button>
        </div>

        {/* Product & CTA */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setProductSearchType('inline');
              setShowProductSearch(true);
            }}             
            className="p-2 rounded text-white"
            style={{ backgroundColor: '#7cc6ee' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1e2556';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7cc6ee';
            }}
            title="Insert Inline Product"
          >
            <Package size={18} />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setProductSearchType('end');
              setShowProductSearch(true);
            }}
            className="px-3 py-2 rounded text-white flex items-center gap-1"
            style={{ backgroundColor: '#1e2556' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7cc6ee';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#1e2556';
            }}
            title="Add Product CTA at End"
          >
            <Package size={14} />
            <span className="text-xs">End CTA</span>
          </button>
        </div>

        {/* Show/Hide Advanced Tools */}
        <button
          type="button"
          onClick={() => setShowAdvancedTools(!showAdvancedTools)}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
          title={showAdvancedTools ? "Hide Advanced Tools" : "Show Advanced Tools"}
        >
          <MoreHorizontal size={18} />
          <ChevronDown size={14} className={`transform transition-transform ${showAdvancedTools ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Advanced Toolbar - Toggleable */}
      {showAdvancedTools && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border-t">
          {/* Lists and Quote */}
          <div className="flex gap-1 border-r pr-2 mr-2">
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBulletList().run())}
              className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Bullet List"
            >
              <List size={18} />
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleOrderedList().run())}
              className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleTaskList().run())}
              className={`p-2 rounded ${editor.isActive('taskList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Task List"
            >
              <CheckSquare size={18} />
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBlockquote().run())}
              className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Quote"
            >
              <Quote size={18} />
            </button>
          </div>

          {/* Code and Scripts */}
          <div className="flex gap-1 border-r pr-2 mr-2">
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleCode().run())}
              className={`p-2 rounded ${editor.isActive('code') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Inline Code"
            >
              <CodeIcon size={18} />
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleCodeBlock().run())}
              className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Code Block"
            >
              <div className="flex flex-col items-center">
                <CodeIcon size={14} />
                <div className="text-xs">{ }</div>
              </div>
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleSubscript().run())}
              className={`p-2 rounded ${editor.isActive('subscript') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Subscript"
            >
              <SubIcon size={18} />
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().toggleSuperscript().run())}
              className={`p-2 rounded ${editor.isActive('superscript') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Superscript"
            >
              <SupIcon size={18} />
            </button>
          </div>

          {/* Utilities */}
          <div className="flex gap-1 border-r pr-2 mr-2">
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().setHorizontalRule().run())}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
              title="Horizontal Rule"
            >
              <Minus size={18} />
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => {
                // Insert a clear break to stop text wrapping around images
                editor.chain().focus().insertContent('<div style="clear: both; height: 0; margin: 0; padding: 0;"></div>').run();
              })}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
              title="Clear Image Wrap (Stop text wrapping around images)"
            >
              <div className="flex flex-col items-center">
                <div className="w-4 h-2 border-b border-gray-600"></div>
                <div className="text-xs mt-1">↓</div>
              </div>
            </button>
            <button
              type="button"
              onMouseDown={handleMouseDown(() => editor.chain().focus().clearNodes().unsetAllMarks().run())}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
              title="Clear All Formatting"
            >
              <Eraser size={18} />
            </button>
          </div>

          <div className="flex gap-1">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                if (onExtractToc) {
                  const headings = extractHeadings(editor);
                  onExtractToc(headings);
                }
                editor.view.focus();
              }}
              className="px-3 py-2 rounded text-white flex items-center gap-2"
              style={{ backgroundColor: '#1e2556' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7cc6ee';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1e2556';
              }}
              title="Update Table of Contents"
            >
              <RefreshCw size={16} />
              Update TOC
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close color pickers */}
      {(showTextColorPicker || showHighlightPicker) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowTextColorPicker(false);
            setShowHighlightPicker(false);
          }}
        />
      )}

      {/* Product Search Modal */}
      {showProductSearch && (
        <ProductSearchModal
          onClose={() => setShowProductSearch(false)}
          onInsert={handleProductInsert}
          type={productSearchType}
        />
      )}
    </div>
  );
};

// Enhanced CSS for editor styling with brand colors + image + table support
const customStyles = `
.ProseMirror {
  min-height: 400px;
  border-radius: 0.5rem;
  position: relative;
  padding: 1rem;
  color: #2d2d2d;
}

.editor-toolbar {
  position: relative;
  background-color: #f5f7fa;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

.editor-toolbar-tooltip {
  animation: fadeInOut 2s ease-in-out forwards;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #334155;
  pointer-events: none;
  height: 0;
}

/* Enhanced Image styling with better text wrapping */
.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.ProseMirror img:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Left aligned images with text wrapping */
.ProseMirror img.img-align-left {
  float: left;
  margin: 0 1.5rem 1rem 0;
  clear: left;
  shape-outside: margin-box;
  max-width: 50%;
}

/* Center aligned images - no text wrapping */
.ProseMirror img.img-align-center {
  display: block !important;
  margin: 1.5rem auto !important;
  float: none !important;
  clear: both !important;
  max-width: 100%;
}

/* Right aligned images with text wrapping */
.ProseMirror img.img-align-right {
  float: right;
  margin: 0 0 1rem 1.5rem;
  clear: right;
  shape-outside: margin-box;
  max-width: 50%;
}

/* Ensure proper text flow around floating images */
.ProseMirror p {
  margin-bottom: 0.75rem;
  color: #2d2d2d;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* Clear floats after floating images */
.ProseMirror img.img-align-left + p,
.ProseMirror img.img-align-right + p {
  text-align: justify;
  text-justify: inter-word;
}

/* Responsive behavior for mobile devices */
@media (max-width: 768px) {
  .ProseMirror img.img-align-left,
  .ProseMirror img.img-align-right {
    float: none !important;
    display: block !important;
    margin: 1rem auto !important;
    max-width: 100% !important;
    clear: both !important;
  }
  
  .ProseMirror img.img-align-left + p,
  .ProseMirror img.img-align-right + p {
    text-align: left;
    margin-top: 1rem;
  }
  
  /* Reduce image margins on mobile */
  .ProseMirror img {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .ProseMirror img {
    border-radius: 0.25rem;
    margin-bottom: 0.75rem;
  }
  
  .ProseMirror img.img-align-center {
    margin: 1rem auto !important;
  }
}

/* Table styling */
.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
  border: 2px solid #7cc6ee;
  border-radius: 0.5rem;
}

.ProseMirror table td,
.ProseMirror table th {
  border: 1px solid #7cc6ee;
  padding: 0.75rem;
  position: relative;
  vertical-align: top;
  background-color: white;
}

.ProseMirror table th {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #1e2556;
}

.ProseMirror table .selectedCell:after {
  background: rgba(124, 198, 238, 0.3);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.ProseMirror ul,
.ProseMirror ol {
  padding-left: 1.5rem;
}

.ProseMirror ul li {
  list-style-type: disc;
  color: #2d2d2d;
}

.ProseMirror ol li {
  list-style-type: decimal;
  color: #2d2d2d;
}

.ProseMirror ul[data-type="taskList"] {
  list-style: none;
  padding-left: 0;
}

.ProseMirror ul[data-type="taskList"] li {
  display: flex;
  align-items: flex-start;
  color: #2d2d2d;
}

.ProseMirror ul[data-type="taskList"] li > label {
  margin-right: 0.5rem;
  user-select: none;
}

.ProseMirror ul[data-type="taskList"] li > div {
  flex: 1;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 4px solid #7cc6ee;
  margin: 1.5rem 0;
  font-style: italic;
  color: #334155;
  background-color: #f5f7fa;
  padding: 1rem;
  border-radius: 0.5rem;
}

/* 5 levels of headings with proper sizing */
.ProseMirror h1 {
  font-size: 2.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1e2556;
  font-weight: bold;
}

.ProseMirror h2 {
  font-size: 1.875rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1e2556;
  font-weight: bold;
}

.ProseMirror h3 {
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1e2556;
  font-weight: bold;
}

.ProseMirror h4 {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #334155;
  font-weight: bold;
}

.ProseMirror h5 {
  font-size: 1.125rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #334155;
  font-weight: bold;
}

.ProseMirror h6 {
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #334155;
  font-weight: bold;
}

.ProseMirror p {
  margin-bottom: 0.75rem;
  color: #2d2d2d;
}

.ProseMirror a {
  color: #7cc6ee;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.ProseMirror a:hover {
  color: #1e2556;
}

.ProseMirror code {
  background-color: #f5f7fa;
  color: #1e2556;
  padding: 0.25rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Courier New', monospace;
  border: 1px solid #7cc6ee;
}

.ProseMirror pre {
  background: #1e2556;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 2px solid #7cc6ee;
}

.ProseMirror pre code {
  background: none;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  border: none;
}

.ProseMirror hr {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid #7cc6ee;
}

.ProseMirror mark {
  background-color: #7cc6ee;
  color: #1e2556;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

/* Font size styling in editor */
.ProseMirror [style*="font-size"] {
  line-height: 1.4;
}

/* Ensure small font sizes remain readable */
.ProseMirror [style*="font-size: 10px"] {
  line-height: 1.6;
}

.ProseMirror [style*="font-size: 12px"] {
  line-height: 1.5;
}

/* Ensure large font sizes don't break layout */
.ProseMirror [style*="font-size: 48px"],
.ProseMirror [style*="font-size: 60px"],
.ProseMirror [style*="font-size: 72px"] {
  line-height: 1.2;
  margin: 0.5rem 0;
}

/* Clearfix utility for floating images */
.ProseMirror::after {
  content: "";
  display: table;
  clear: both;
}

.clear-both {
  clear: both;
}

/* Improve text flow around images */
.ProseMirror p:last-child {
  margin-bottom: 0;
}

/* Better spacing for content after floating images */
.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  clear: both;
  margin-top: 2rem;
}

.ProseMirror h1:first-child,
.ProseMirror h2:first-child,
.ProseMirror h3:first-child,
.ProseMirror h4:first-child,
.ProseMirror h5:first-child,
.ProseMirror h6:first-child {
  margin-top: 1rem;
}

/* Toolbar button styling with brand colors */
.editor-toolbar button {
  transition: all 0.2s ease;
}

.editor-toolbar button:hover {
  background-color: #7cc6ee !important;
  color: white !important;
}

.editor-toolbar button.bg-blue-600 {
  background-color: #1e2556 !important;
  color: white !important;
}

.editor-toolbar button.bg-indigo-600 {
  background-color: #1e2556 !important;
  color: white !important;
}

.editor-toolbar button.bg-indigo-600:hover {
  background-color: #7cc6ee !important;
}

.editor-toolbar select {
  border-color: #7cc6ee;
  color: #2d2d2d;
  background-color: white;
  transition: all 0.2s ease;
}

.editor-toolbar select:focus {
  border-color: #1e2556;
  box-shadow: 0 0 0 2px rgba(30, 37, 86, 0.1);
  outline: none;
}

.editor-toolbar select:hover {
  border-color: #1e2556;
}

/* Product Widget Styling */
.product-widget {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.product-widget:hover {
  transform: translateY(-1px);
}

/* Inline Product Widget - Truly Inline */
.product-widget-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin: 0 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid #7cc6ee;
  background-color: #f5f7fa;
  vertical-align: middle;
  white-space: nowrap;
  max-width: 180px;
  line-height: 1;
  height: 1.5rem;
}

.product-widget-inline:hover {
  border-color: #1e2556;
  box-shadow: 0 1px 4px rgba(30, 37, 86, 0.15);
}

.product-widget-inline-logo {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
  border-radius: 0.25rem;
  background-color: white;
  padding: 0.125rem;
  flex-shrink: 0;
}

.product-widget-inline-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1e2556;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.product-widget-inline-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: #1e2556;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.product-widget-inline:hover .product-widget-inline-action {
  background-color: #7cc6ee;
  transform: scale(1.1);
}

/* End Product Widget - Compact Left-Aligned */
.product-widget-end {
  display: inline-block;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #7cc6ee;
  background-color: #f5f7fa;
  max-width: 280px;
  width: auto;
  vertical-align: top;
}

.product-widget-end:hover {
  border-color: #1e2556;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(30, 37, 86, 0.15);
}

.product-widget-end-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.product-widget-end-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  border-radius: 0.375rem;
  background-color: white;
  padding: 0.25rem;
  border: 1px solid #7cc6ee;
  flex-shrink: 0;
}

.product-widget-end-info {
  flex: 1;
  min-width: 0;
}

.product-widget-end-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e2556;
  margin: 0 0 0.125rem 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-widget-end-company {
  font-size: 0.75rem;
  color: #334155;
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-widget-end-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  background-color: #1e2556;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.product-widget-end:hover .product-widget-end-action {
  background-color: #7cc6ee;
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .product-widget-inline-name {
    font-size: 0.75rem;
  }
  
  .product-widget-end {
    max-width: 240px;
  }
  
  .product-widget-end-name {
    font-size: 0.85rem;
  }
  
  /* Stack editor toolbar items on small screens */
  .editor-toolbar {
    flex-wrap: wrap;
  }
  
  .editor-toolbar > div {
    margin-bottom: 0.5rem;
  }
  
  /* Improve font size selector on mobile */
  .editor-toolbar select {
    min-width: 70px;
    font-size: 0.875rem;
  }
}
`;

const TipTapEditor = ({
  onSave,
  initialContent = '<p>Start writing your blog post...</p>',
  onTocUpdate,
  isSaving = false
}) => {
  const editorRef = useRef(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Initialize editor with all required extensions INCLUDING 5 HEADING LEVELS
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 100,
          newGroupDelay: 500
        },
        heading: {
          levels: [1, 2, 3, 4, 5] // NOW 5 LEVELS!
        },
        code: false, // We'll use our custom code extension
        codeBlock: false, // We'll use code block lowlight
        strike: false, // We'll use the dedicated Strike extension
        blockquote: false // We'll use the dedicated Blockquote extension
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog here...',
        emptyEditorClass: 'is-editor-empty',
      }),
      // Enhanced Image with custom attributes
      CustomImage.configure({
        inline: false,
        HTMLAttributes: {
          class: 'blog-image',
        },
      }),
      // Table support
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Heading.configure({
        levels: [1, 2, 3, 4, 5], // 5 HEADING LEVELS!
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
          style: 'color: #7cc6ee;',
        },
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextStyle,
      Color,
      Underline,
      Strike,
      Code.configure({
        HTMLAttributes: {
          class: 'inline-code',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'code-block',
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'quote-block',
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      HorizontalRule,
      Dropcursor,
      Typography,
      CharacterCount.configure({
        limit: 50000,
      }),
      ProductWidget,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // FIXED: Extract and update TOC on every content change
      if (onTocUpdate) {
        const headings = extractHeadings(editor);
        onTocUpdate(headings);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none w-full max-w-full',
        spellcheck: 'false',
      },
    },
  });

  // Store editor reference
  useEffect(() => {
    if (editor) {
      editorRef.current = editor;
    }
  }, [editor]);

  // FIXED: Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  // FIXED: Extract TOC when editor is initialized
  useEffect(() => {
    if (editor && onTocUpdate) {
      // Small delay to ensure editor is fully ready
      setTimeout(() => {
        const headings = extractHeadings(editor);
        onTocUpdate(headings);
      }, 100);
    }
  }, [editor, onTocUpdate]);

  // Handle image insertion with proper attributes
  const handleImageInsert = useCallback((url, width, height, alignment) => {
    if (!editor || !url) return;

    editor.chain().focus().setImage({
      src: url,
      alt: 'Blog image',
      width: width,
      height: height,
      alignment: alignment
    }).run();

    setShowImageModal(false);
  }, [editor]);

  // FIXED: Save content and TOC
  const handleSave = useCallback(() => {
    if (onSave && editor) {
      console.log('=== TIPTAP SAVE DEBUG ===');
      
      // Get fresh content directly from editor
      const freshContent = editor.getHTML();
      console.log('Fresh content from editor:', freshContent);
      console.log('Content length:', freshContent?.length);
      
      // Extract current headings
      const headings = extractHeadings(editor);
      console.log('Extracted headings:', headings);
      
      // Add IDs to headings in the HTML
      const contentWithIds = addIdsToHeadingsInHTML(freshContent);
      console.log('Content with IDs:', contentWithIds);
      console.log('========================');
      
      // Call parent save function with fresh content
      onSave(contentWithIds, headings);
    }
  }, [editor, onSave]);

  if (!editor) {
    return <div className="border rounded-lg shadow-md p-4">Loading editor...</div>;
  }

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <style>{customStyles}</style>

      <EditorToolbar
        editor={editor}
        onImageAdd={() => setShowImageModal(true)}
        onExtractToc={(headings) => {
          if (onTocUpdate) {
            onTocUpdate(headings);
          }
        }}
      />

      <div className="min-h-[400px] bg-white">
        <EditorContent editor={editor} />
      </div>

      <div className="flex justify-between p-4 bg-gray-50 border-t" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-sm" style={{ color: '#334155' }}>
          {editor.storage.characterCount ? `${editor.storage.characterCount.characters()} characters` : '0 characters'}
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md flex items-center gap-2"
          style={{ 
            backgroundColor: '#1e2556',
            backgroundImage: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#7cc6ee';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#1e2556';
          }}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Blog
            </>
          )}
        </button>
      </div>

      {showImageModal && (
        <ImageModal
          onClose={() => setShowImageModal(false)}
          onInsert={handleImageInsert}
        />
      )}
    </div>
  );
};

export default TipTapEditor;
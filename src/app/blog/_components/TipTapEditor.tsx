
// 'use client';

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import FontSize from '@tiptap/extension-font-size';
// import { useEditor, EditorContent } from '@tiptap/react';
// import { Node } from '@tiptap/core';
// import StarterKit from '@tiptap/starter-kit';
// import Placeholder from '@tiptap/extension-placeholder';
// import Heading from '@tiptap/extension-heading';
// import Link from '@tiptap/extension-link';
// import TextStyle from '@tiptap/extension-text-style';
// import Color from '@tiptap/extension-color';
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Dropcursor from '@tiptap/extension-dropcursor';
// import Typography from '@tiptap/extension-typography';
// import CharacterCount from '@tiptap/extension-character-count';
// import Highlight from '@tiptap/extension-highlight';
// import Subscript from '@tiptap/extension-subscript';
// import Superscript from '@tiptap/extension-superscript';
// import Strike from '@tiptap/extension-strike';
// import Code from '@tiptap/extension-code';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { lowlight } from 'lowlight/lib/core';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
// import html from 'highlight.js/lib/languages/xml';
// import css from 'highlight.js/lib/languages/css';
// import python from 'highlight.js/lib/languages/python';
// import java from 'highlight.js/lib/languages/java';
// import json from 'highlight.js/lib/languages/json';
// import HorizontalRule from '@tiptap/extension-horizontal-rule';
// import TaskList from '@tiptap/extension-task-list';
// import TaskItem from '@tiptap/extension-task-item';
// import Blockquote from '@tiptap/extension-blockquote';
// import FontFamily from '@tiptap/extension-font-family';
// import {
//   Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight,
//   Link2, List, ListOrdered, RefreshCw, Save,
//   X, Quote, Code as CodeIcon, Strikethrough, 
//   Subscript as SubIcon, Superscript as SupIcon, Palette, Highlighter,
//   Minus, CheckSquare, Undo, Redo, Eraser, MoreHorizontal, ChevronDown,
//   Search, Package, ExternalLink
// } from 'lucide-react';

// // Register languages for syntax highlighting
// lowlight.registerLanguage('javascript', js);
// lowlight.registerLanguage('typescript', ts);
// lowlight.registerLanguage('html', html);
// lowlight.registerLanguage('css', css);
// lowlight.registerLanguage('python', python);
// lowlight.registerLanguage('java', java);
// lowlight.registerLanguage('json', json);

// // Product Search Modal Component
// const ProductSearchModal = ({ onClose, onInsert, type = 'inline' }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // Debounced search function
//   const searchProducts = useCallback(async (query) => {
//     if (!query || query.trim().length < 2) {
//       setProducts([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
//       setProducts(data.products || []);
//     } catch (error) {
//       console.error('Product search error:', error);
//       setProducts([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Debounce search queries
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       searchProducts(searchQuery);
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [searchQuery, searchProducts]);

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleInsert = () => {
//     if (selectedProduct) {
//       onInsert(selectedProduct, type);
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
//         onClick={e => e.stopPropagation()}
//         style={{ backgroundColor: '#f5f7fa' }}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-bold" style={{ color: '#1e2556' }}>
//             {type === 'inline' ? 'Insert Product Reference' : 'Add Product at End'}
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-200 rounded-full transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Search Input */}
//         <div className="relative mb-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={20} style={{ color: '#334155' }} />
//           </div>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
//             style={{ 
//               borderColor: '#7cc6ee',
//               color: '#2d2d2d'
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#1e2556';
//               e.target.style.boxShadow = '0 0 0 2px rgba(30, 37, 86, 0.1)';
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#7cc6ee';
//               e.target.style.boxShadow = 'none';
//             }}
//             placeholder="Search for legal software products..."
//             autoFocus
//           />
//         </div>

//         {/* Search Results */}
//         <div className="max-h-64 overflow-y-auto mb-4">
//           {isLoading && (
//             <div className="text-center py-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 mx-auto" style={{ borderColor: '#1e2556' }}></div>
//               <p className="mt-2" style={{ color: '#334155' }}>Searching products...</p>
//             </div>
//           )}

//           {!isLoading && searchQuery.length >= 2 && products.length === 0 && (
//             <div className="text-center py-4">
//               <Package size={48} className="mx-auto mb-2" style={{ color: '#334155' }} />
//               <p style={{ color: '#334155' }}>No products found for "{searchQuery}"</p>
//             </div>
//           )}

//           {!isLoading && products.length > 0 && (
//             <div className="space-y-2">
//               {products.map((product) => (
//                 <div
//                   key={product.id}
//                   onClick={() => handleProductSelect(product)}
//                   className={`p-3 rounded-lg cursor-pointer transition flex items-center space-x-3 ${
//                     selectedProduct?.id === product.id 
//                       ? 'bg-white border-2' 
//                       : 'bg-white border border-gray-200 hover:shadow-md'
//                   }`}
//                   style={{
//                     borderColor: selectedProduct?.id === product.id ? '#1e2556' : '#e5e7eb'
//                   }}
//                 >
//                   <img
//                     src={product.logoUrl || '/default-product-logo.png'}
//                     alt={product.productName}
//                     className="w-12 h-12 object-contain rounded"
//                     onError={(e) => {
//                       e.target.src = '/default-product-logo.png';
//                     }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold truncate" style={{ color: '#1e2556' }}>
//                       {product.productName}
//                     </h4>
//                     <p className="text-sm truncate" style={{ color: '#334155' }}>
//                       {product.companyName}
//                     </p>
//                     <p className="text-xs" style={{ color: '#334155' }}>
//                       {product.category}
//                     </p>
//                   </div>
//                   {selectedProduct?.id === product.id && (
//                     <div 
//                       className="w-6 h-6 rounded-full flex items-center justify-center text-white"
//                       style={{ backgroundColor: '#1e2556' }}
//                     >
//                       ✓
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//             style={{ borderColor: '#7cc6ee', color: '#2d2d2d' }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleInsert}
//             disabled={!selectedProduct}
//             className="px-4 py-2 rounded-lg transition text-white flex items-center gap-2 disabled:opacity-50"
//             style={{ backgroundColor: selectedProduct ? '#1e2556' : '#334155' }}
//             onMouseEnter={(e) => {
//               if (selectedProduct) e.target.style.backgroundColor = '#7cc6ee';
//             }}
//             onMouseLeave={(e) => {
//               if (selectedProduct) e.target.style.backgroundColor = '#1e2556';
//             }}
//           >
//             <Package size={16} />
//             Insert Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Custom Product Extension for TipTap
// const ProductWidget = Node.create({
//   name: 'productWidget',

//   group: 'inline',

//   content: '',

//   inline: true,

//   atom: true,

//   addAttributes() {
//     return {
//       productId: {
//         default: null,
//       },
//       productName: {
//         default: '',
//       },
//       companyName: {
//         default: '',
//       },
//       logoUrl: {
//         default: '',
//       },
//       slug: {
//         default: '',
//       },
//       type: {
//         default: 'inline', // 'inline' or 'end'
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[data-product-widget]',
//         getAttrs: (element) => ({
//           productId: element.getAttribute('data-product-id'),
//           productName: element.getAttribute('data-product-name'),
//           companyName: element.getAttribute('data-company-name'),
//           logoUrl: element.getAttribute('data-logo-url'),
//           slug: element.getAttribute('data-slug'),
//           type: element.getAttribute('data-type') || 'inline',
//         }),
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       'div',
//       {
//         'data-product-widget': true,
//         'data-product-id': HTMLAttributes.productId,
//         'data-product-name': HTMLAttributes.productName,
//         'data-company-name': HTMLAttributes.companyName,
//         'data-logo-url': HTMLAttributes.logoUrl,
//         'data-slug': HTMLAttributes.slug,
//         'data-type': HTMLAttributes.type,
//         class: `product-widget product-widget-${HTMLAttributes.type}`,
//       },
//     ];
//   },

//   addNodeView() {
//     return ({ node }) => {
//       const div = document.createElement('div');
//       div.className = `product-widget product-widget-${node.attrs.type}`;
      
//       if (node.attrs.type === 'inline') {
//         // Small inline widget - just logo, name, and click icon
//         div.innerHTML = `
//           <img src="${node.attrs.logoUrl || '/default-product-logo.png'}" 
//                alt="${node.attrs.productName}" 
//                class="product-widget-inline-logo"
//                onerror="this.src='/default-product-logo.png'">
//           <span class="product-widget-inline-name">${node.attrs.productName}</span>
//           <div class="product-widget-inline-action">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//               <polyline points="15,3 21,3 21,9"></polyline>
//               <line x1="10" y1="14" x2="21" y2="3"></line>
//             </svg>
//           </div>
//         `;
//       } else {
//         // Compact end widget - left aligned, smaller
//         div.innerHTML = `
//           <div class="product-widget-end-content">
//             <img src="${node.attrs.logoUrl || '/default-product-logo.png'}" 
//                  alt="${node.attrs.productName}" 
//                  class="product-widget-end-logo"
//                  onerror="this.src='/default-product-logo.png'">
//             <div class="product-widget-end-info">
//               <h4 class="product-widget-end-name">${node.attrs.productName}</h4>
//               <p class="product-widget-end-company">${node.attrs.companyName}</p>
//             </div>
//             <div class="product-widget-end-action">
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//                 <polyline points="15,3 21,3 21,9"></polyline>
//                 <line x1="10" y1="14" x2="21" y2="3"></line>
//               </svg>
//             </div>
//           </div>
//         `;
//       }

//       div.addEventListener('click', () => {
//         window.open(`/product/${node.attrs.slug}`, '_blank');
//       });

//       return {
//         dom: div,
//       };
//     };
//   },
// });

// // Color Picker Component
// const ColorPicker = ({ onColorSelect, type = 'text' }) => {
//   const colors = [
//     '#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6',
//     '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
//     '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899',
//     '#F43F5E', '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D',
//     '#059669', '#0891B2', '#2563EB', '#4F46E5', '#7C3AED', '#9333EA'
//   ];

//   return (
//     <div className="grid grid-cols-6 gap-1 p-2 bg-white border rounded-lg shadow-lg">
//       {colors.map((color) => (
//         <button
//           key={color}
//           type="button"
//           className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
//           style={{ backgroundColor: color }}
//           onClick={() => onColorSelect(color)}
//           title={color}
//         />
//       ))}
//       <button
//         type="button"
//         className="w-6 h-6 rounded border border-gray-300 bg-white hover:scale-110 transition-transform relative"
//         onClick={() => onColorSelect('')}
//         title="Remove color"
//       >
//         <X size={12} className="text-red-500 absolute inset-0 m-auto" />
//       </button>
//     </div>
//   );
// };

// // Font Family Selector
// const FontFamilySelector = ({ editor }) => {
//   const fontFamilies = [
//     { label: 'Default', value: '' },
//     { label: 'Inter', value: 'Inter' },
//     { label: 'Arial', value: 'Arial' },
//     { label: 'Helvetica', value: 'Helvetica' },
//     { label: 'Georgia', value: 'Georgia' },
//     { label: 'Times New Roman', value: 'Times New Roman' },
//     { label: 'Courier New', value: 'Courier New' },
//     { label: 'Verdana', value: 'Verdana' },
//     { label: 'Trebuchet MS', value: 'Trebuchet MS' },
//     { label: 'Palatino', value: 'Palatino' }
//   ];

//   const handleFontChange = (fontFamily) => {
//     if (fontFamily) {
//       editor.chain().focus().setFontFamily(fontFamily).run();
//     } else {
//       editor.chain().focus().unsetFontFamily().run();
//     }
//   };

//   return (
//     <select
//       className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//       onChange={(e) => handleFontChange(e.target.value)}
//       defaultValue=""
//     >
//       {fontFamilies.map((font) => (
//         <option 
//           key={font.value} 
//           value={font.value}
//           style={{ fontFamily: font.value }}
//         >
//           {font.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// // FIXED: Utility function to generate slug from text
// const generateSlug = (text) => {
//   return text
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, '') // Remove special characters
//     .replace(/\s+/g, '-')     // Replace spaces with hyphens
//     .replace(/-+/g, '-')      // Remove multiple consecutive hyphens
//     .trim();
// };

// // FIXED: Function to extract headings from the editor content
// const extractHeadings = (editor) => {
//   if (!editor) return [];

//   const headings = [];
//   const content = editor.getJSON();

//   const processNode = (node) => {
//     if (node.type === 'heading' && node.content) {
//       // Extract text content properly
//       const text = node.content
//         .filter(child => child.type === 'text')
//         .map(child => child.text)
//         .join('') || 'Untitled';
      
//       const slug = generateSlug(text);
      
//       headings.push({
//         level: node.attrs.level,
//         content: text,
//         id: slug
//       });
//     }

//     if (node.content) {
//       node.content.forEach(child => processNode(child));
//     }
//   };

//   if (content.content) {
//     content.content.forEach(node => processNode(node));
//   }

//   return headings;
// };

// // FIXED: Function to add IDs to headings in HTML content
// const addIdsToHeadingsInHTML = (htmlContent) => {
//   if (!htmlContent) return htmlContent;
  
//   // More robust regex that handles various heading formats
//   const headingRegex = /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi;
  
//   return htmlContent.replace(headingRegex, (match, tag, attributes, content) => {
//     // Extract text content (remove any nested HTML tags)
//     const textContent = content.replace(/<\/?[^>]+(>|$)/g, '').trim();
    
//     if (!textContent) return match;
    
//     const slug = generateSlug(textContent);
    
//     // Check if ID already exists in attributes
//     if (attributes && attributes.includes('id=')) {
//       return match; // Don't modify if ID already exists
//     }
    
//     // Add ID to the heading
//     const newAttributes = attributes ? `${attributes} id="${slug}"` : ` id="${slug}"`;
//     return `<${tag}${newAttributes}>${content}</${tag}>`;
//   });
// };

// // Enhanced toolbar with advanced formatting options
// const EditorToolbar = ({ editor, onExtractToc }) => {
//   const [showTextColorPicker, setShowTextColorPicker] = useState(false);
//   const [showHighlightPicker, setShowHighlightPicker] = useState(false);
//   const [showAdvancedTools, setShowAdvancedTools] = useState(false);
//   const [showProductSearch, setShowProductSearch] = useState(false);
//   const [productSearchType, setProductSearchType] = useState('inline');

//   if (!editor) return null;

//   // Use mousedown instead of click to prevent focus loss
//   const handleMouseDown = (action) => (e) => {
//     e.preventDefault();
//     action();
//     editor.view.focus();
//   };

//   // Function to handle heading application
//   const applyHeading = (level) => {
//     editor.chain().focus().toggleHeading({ level }).run();
//   };

//   // Function to apply heading-like styling to selected text only
//   const applyTextStyle = (fontSize, isBold = true) => {
//     if (isBold) {
//       editor.chain()
//         .focus()
//         .setFontSize(fontSize)
//         .toggleBold()
//         .run();
//     } else {
//       editor.chain()
//         .focus()
//         .setFontSize(fontSize)
//         .run();
//     }
//   };

//   // Handle product insertion
//   const handleProductInsert = (product, type) => {
//     editor.chain().focus().insertContent({
//       type: 'productWidget',
//       attrs: {
//         productId: product.id,
//         productName: product.productName,
//         companyName: product.companyName,
//         logoUrl: product.logoUrl,
//         slug: product.slug,
//         type: type,
//       },
//     }).run();
//     setShowProductSearch(false);
//   };

//   return (
//     <div className="border-b sticky top-4 bg-white z-10 shadow-sm rounded-t-lg">
//       {/* Primary Toolbar */}
//       <div className="flex flex-wrap gap-2 p-3 relative editor-toolbar">
//         {/* Undo/Redo */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().undo().run())}
//             className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//             disabled={!editor.can().undo()}
//             title="Undo"
//           >
//             <Undo size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().redo().run())}
//             className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//             disabled={!editor.can().redo()}
//             title="Redo"
//           >
//             <Redo size={18} />
//           </button>
//         </div>

//         {/* Font Family */}
//         <div className="flex items-center border-r pr-2 mr-2">
//           <FontFamilySelector editor={editor} />
//         </div>

//         {/* Headings */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => applyHeading(1))}
//             className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Heading 1"
//           >
//             H1
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => applyHeading(2))}
//             className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Heading 2"
//           >
//             H2
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => applyHeading(3))}
//             className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Heading 3"
//           >
//             H3
//           </button>
//         </div>
        
//         {/* Text Style buttons */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => applyTextStyle('24px'))}
//             className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//             title="Large text"
//           >
//             T1
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => applyTextStyle('20px'))}
//             className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//             title="Medium text"
//           >
//             T2
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => applyTextStyle('16px'))}
//             className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//             title="Small text"
//           >
//             T3
//           </button>
//         </div>

//         {/* Basic Formatting */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBold().run())}
//             className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Bold"
//           >
//             <Bold size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().toggleItalic().run())}
//             className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Italic"
//           >
//             <Italic size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().toggleUnderline().run())}
//             className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Underline"
//           >
//             <UnderlineIcon size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().toggleStrike().run())}
//             className={`p-2 rounded ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Strikethrough"
//           >
//             <Strikethrough size={18} />
//           </button>
//         </div>

//         {/* Colors */}
//         <div className="flex gap-1 border-r pr-2 mr-2 relative">
//           <div className="relative">
//             <button
//               type="button"
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 setShowTextColorPicker(!showTextColorPicker);
//                 setShowHighlightPicker(false);
//               }}
//               className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//               title="Text Color"
//             >
//               <Palette size={18} />
//             </button>
//             {showTextColorPicker && (
//               <div className="absolute top-full left-0 mt-1 z-20">
//                 <ColorPicker
//                   onColorSelect={(color) => {
//                     if (color) {
//                       editor.chain().focus().setColor(color).run();
//                     } else {
//                       editor.chain().focus().unsetColor().run();
//                     }
//                     setShowTextColorPicker(false);
//                   }}
//                   type="text"
//                 />
//               </div>
//             )}
//           </div>
//           <div className="relative">
//             <button
//               type="button"
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 setShowHighlightPicker(!showHighlightPicker);
//                 setShowTextColorPicker(false);
//               }}
//               className={`p-2 rounded ${editor.isActive('highlight') ? 'bg-yellow-400 text-black' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Highlight"
//             >
//               <Highlighter size={18} />
//             </button>
//             {showHighlightPicker && (
//               <div className="absolute top-full left-0 mt-1 z-20">
//                 <ColorPicker
//                   onColorSelect={(color) => {
//                     if (color) {
//                       editor.chain().focus().toggleHighlight({ color }).run();
//                     } else {
//                       editor.chain().focus().unsetHighlight().run();
//                     }
//                     setShowHighlightPicker(false);
//                   }}
//                   type="highlight"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Alignment */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('left').run())}
//             className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Align Left"
//           >
//             <AlignLeft size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('center').run())}
//             className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Align Center"
//           >
//             <AlignCenter size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('right').run())}
//             className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Align Right"
//           >
//             <AlignRight size={18} />
//           </button>
//         </div>

//         {/* Product & Link & Tools */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <button
//             type="button"
//             onMouseDown={(e) => {
//               e.preventDefault();
//               const url = window.prompt('Enter the URL:');
//               if (url) {
//                 editor.chain().focus().setLink({ href: url }).run();
//               }
//               editor.view.focus();
//             }}
//             className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             title="Insert Link"
//           >
//             <Link2 size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={(e) => {
//               e.preventDefault();
//               setProductSearchType('inline');
//               setShowProductSearch(true);
//             }}             
//             className="p-2 rounded text-white"
//             style={{ backgroundColor: '#7cc6ee' }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#1e2556';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#7cc6ee';
//             }}
//             title="Insert Inline Product"
//           >
//             <Package size={18} />
//           </button>
//           <button
//             type="button"
//             onMouseDown={(e) => {
//               e.preventDefault();
//               setProductSearchType('end');
//               setShowProductSearch(true);
//             }}
//             className="px-3 py-2 rounded text-white flex items-center gap-1"
//             style={{ backgroundColor: '#1e2556' }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#7cc6ee';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#1e2556';
//             }}
//             title="Add Product CTA at End"
//           >
//             <Package size={14} />
//             <span className="text-xs">End CTA</span>
//           </button>
//         </div>

//         {/* Show/Hide Advanced Tools */}
//         <button
//           type="button"
//           onClick={() => setShowAdvancedTools(!showAdvancedTools)}
//           className="p-2 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
//           title={showAdvancedTools ? "Hide Advanced Tools" : "Show Advanced Tools"}
//         >
//           <MoreHorizontal size={18} />
//           <ChevronDown size={14} className={`transform transition-transform ${showAdvancedTools ? 'rotate-180' : ''}`} />
//         </button>
//       </div>

//       {/* Advanced Toolbar - Toggleable */}
//       {showAdvancedTools && (
//         <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border-t">
//           {/* Lists and Quote */}
//           <div className="flex gap-1 border-r pr-2 mr-2">
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBulletList().run())}
//               className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Bullet List"
//             >
//               <List size={18} />
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleOrderedList().run())}
//               className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Numbered List"
//             >
//               <ListOrdered size={18} />
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleTaskList().run())}
//               className={`p-2 rounded ${editor.isActive('taskList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Task List"
//             >
//               <CheckSquare size={18} />
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBlockquote().run())}
//               className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Quote"
//             >
//               <Quote size={18} />
//             </button>
//           </div>

//           {/* Code and Scripts */}
//           <div className="flex gap-1 border-r pr-2 mr-2">
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleCode().run())}
//               className={`p-2 rounded ${editor.isActive('code') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Inline Code"
//             >
//               <CodeIcon size={18} />
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleCodeBlock().run())}
//               className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Code Block"
//             >
//               <div className="flex flex-col items-center">
//                 <CodeIcon size={14} />
//                 <div className="text-xs">{ }</div>
//               </div>
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleSubscript().run())}
//               className={`p-2 rounded ${editor.isActive('subscript') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Subscript"
//             >
//               <SubIcon size={18} />
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().toggleSuperscript().run())}
//               className={`p-2 rounded ${editor.isActive('superscript') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//               title="Superscript"
//             >
//               <SupIcon size={18} />
//             </button>
//           </div>

//           {/* Utilities */}
//           <div className="flex gap-1 border-r pr-2 mr-2">
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().setHorizontalRule().run())}
//               className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//               title="Horizontal Rule"
//             >
//               <Minus size={18} />
//             </button>
//             <button
//               type="button"
//               onMouseDown={handleMouseDown(() => editor.chain().focus().clearNodes().unsetAllMarks().run())}
//               className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//               title="Clear Formatting"
//             >
//               <Eraser size={18} />
//             </button>
//           </div>

//           <div className="flex gap-1">
//             <button
//               type="button"
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 if (onExtractToc) {
//                   const headings = extractHeadings(editor);
//                   onExtractToc(headings);
//                 }
//                 editor.view.focus();
//               }}
//               className="px-3 py-2 rounded text-white flex items-center gap-2"
//               style={{ backgroundColor: '#1e2556' }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = '#7cc6ee';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = '#1e2556';
//               }}
//               title="Update Table of Contents"
//             >
//               <RefreshCw size={16} />
//               Update TOC
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Click outside to close color pickers */}
//       {(showTextColorPicker || showHighlightPicker) && (
//         <div
//           className="fixed inset-0 z-10"
//           onClick={() => {
//             setShowTextColorPicker(false);
//             setShowHighlightPicker(false);
//           }}
//         />
//       )}

//       {/* Product Search Modal */}
//       {showProductSearch && (
//         <ProductSearchModal
//           onClose={() => setShowProductSearch(false)}
//           onInsert={handleProductInsert}
//           type={productSearchType}
//         />
//       )}
//     </div>
//   );
// };

// // Enhanced CSS for editor styling with brand colors
// const customStyles = `
// .ProseMirror {
//   min-height: 400px;
//   border-radius: 0.5rem;
//   position: relative;
//   padding: 1rem;
//   color: #2d2d2d;
// }

// .editor-toolbar {
//   position: relative;
//   background-color: #f5f7fa;
// }

// @keyframes fadeInOut {
//   0% { opacity: 0; }
//   20% { opacity: 1; }
//   80% { opacity: 1; }
//   100% { opacity: 0; }
// }

// .editor-toolbar-tooltip {
//   animation: fadeInOut 2s ease-in-out forwards;
// }

// .ProseMirror:focus {
//   outline: none;
// }

// .ProseMirror p.is-editor-empty:first-child::before {
//   content: attr(data-placeholder);
//   float: left;
//   color: #334155;
//   pointer-events: none;
//   height: 0;
// }

// .ProseMirror ul,
// .ProseMirror ol {
//   padding-left: 1.5rem;
// }

// .ProseMirror ul li {
//   list-style-type: disc;
//   color: #2d2d2d;
// }

// .ProseMirror ol li {
//   list-style-type: decimal;
//   color: #2d2d2d;
// }

// .ProseMirror ul[data-type="taskList"] {
//   list-style: none;
//   padding-left: 0;
// }

// .ProseMirror ul[data-type="taskList"] li {
//   display: flex;
//   align-items: flex-start;
//   color: #2d2d2d;
// }

// .ProseMirror ul[data-type="taskList"] li > label {
//   margin-right: 0.5rem;
//   user-select: none;
// }

// .ProseMirror ul[data-type="taskList"] li > div {
//   flex: 1;
// }

// .ProseMirror blockquote {
//   padding-left: 1rem;
//   border-left: 4px solid #7cc6ee;
//   margin: 1.5rem 0;
//   font-style: italic;
//   color: #334155;
//   background-color: #f5f7fa;
//   padding: 1rem;
//   border-radius: 0.5rem;
// }

// .ProseMirror h1 {
//   font-size: 2rem;
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
//   color: #1e2556;
//   font-weight: bold;
// }

// .ProseMirror h2 {
//   font-size: 1.5rem;
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
//   color: #1e2556;
//   font-weight: bold;
// }

// .ProseMirror h3 {
//   font-size: 1.25rem;
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
//   color: #1e2556;
//   font-weight: bold;
// }

// .ProseMirror h4,
// .ProseMirror h5,
// .ProseMirror h6 {
//   color: #334155;
//   font-weight: bold;
// }

// .ProseMirror p {
//   margin-bottom: 0.75rem;
//   color: #2d2d2d;
// }

// .ProseMirror a {
//   color: #7cc6ee;
//   text-decoration: underline;
//   transition: color 0.2s ease;
// }

// .ProseMirror a:hover {
//   color: #1e2556;
// }

// .ProseMirror code {
//   background-color: #f5f7fa;
//   color: #1e2556;
//   padding: 0.25rem 0.375rem;
//   border-radius: 0.25rem;
//   font-size: 0.875em;
//   font-family: 'Courier New', monospace;
//   border: 1px solid #7cc6ee;
// }

// .ProseMirror pre {
//   background: #1e2556;
//   color: #ffffff;
//   font-family: 'Courier New', monospace;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   overflow-x: auto;
//   margin: 1rem 0;
//   border: 2px solid #7cc6ee;
// }

// .ProseMirror pre code {
//   background: none;
//   color: inherit;
//   padding: 0;
//   border-radius: 0;
//   font-size: inherit;
//   border: none;
// }

// .ProseMirror hr {
//   margin: 2rem 0;
//   border: none;
//   border-top: 2px solid #7cc6ee;
// }

// .ProseMirror mark {
//   background-color: #7cc6ee;
//   color: #1e2556;
//   padding: 0.125rem 0.25rem;
//   border-radius: 0.25rem;
// }

// /* Toolbar button styling with brand colors */
// .editor-toolbar button {
//   transition: all 0.2s ease;
// }

// .editor-toolbar button:hover {
//   background-color: #7cc6ee !important;
//   color: white !important;
// }

// .editor-toolbar button.bg-blue-600 {
//   background-color: #1e2556 !important;
//   color: white !important;
// }

// .editor-toolbar button.bg-indigo-600 {
//   background-color: #1e2556 !important;
//   color: white !important;
// }

// .editor-toolbar button.bg-indigo-600:hover {
//   background-color: #7cc6ee !important;
// }

// .editor-toolbar select {
//   border-color: #7cc6ee;
//   color: #2d2d2d;
// }

// .editor-toolbar select:focus {
//   border-color: #1e2556;
//   box-shadow: 0 0 0 2px rgba(30, 37, 86, 0.1);
// }

// /* Product Widget Styling */
// .product-widget {
//   cursor: pointer;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
// }

// .product-widget:hover {
//   transform: translateY(-1px);
// }

// /* Inline Product Widget - Truly Inline */
// .product-widget-inline {
//   display: inline-flex;
//   align-items: center;
//   gap: 0.375rem;
//   margin: 0 0.25rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 1rem;
//   border: 1px solid #7cc6ee;
//   background-color: #f5f7fa;
//   vertical-align: middle;
//   white-space: nowrap;
//   max-width: 180px;
//   line-height: 1;
//   height: 1.5rem;
// }

// .product-widget-inline:hover {
//   border-color: #1e2556;
//   box-shadow: 0 1px 4px rgba(30, 37, 86, 0.15);
// }

// .product-widget-inline-logo {
//   width: 1.25rem;
//   height: 1.25rem;
//   object-fit: contain;
//   border-radius: 0.25rem;
//   background-color: white;
//   padding: 0.125rem;
//   flex-shrink: 0;
// }

// .product-widget-inline-name {
//   font-size: 0.8rem;
//   font-weight: 600;
//   color: #1e2556;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   flex: 1;
//   min-width: 0;
// }

// .product-widget-inline-action {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 1rem;
//   height: 1rem;
//   background-color: #1e2556;
//   color: white;
//   border-radius: 50%;
//   transition: all 0.3s ease;
//   flex-shrink: 0;
// }

// .product-widget-inline:hover .product-widget-inline-action {
//   background-color: #7cc6ee;
//   transform: scale(1.1);
// }

// /* End Product Widget - Compact Left-Aligned */
// .product-widget-end {
//   display: inline-block;
//   margin: 1rem 0;
//   padding: 0.75rem 1rem;
//   border-radius: 0.5rem;
//   border: 2px solid #7cc6ee;
//   background-color: #f5f7fa;
//   max-width: 280px;
//   width: auto;
//   vertical-align: top;
// }

// .product-widget-end:hover {
//   border-color: #1e2556;
//   background-color: #ffffff;
//   box-shadow: 0 4px 12px rgba(30, 37, 86, 0.15);
// }

// .product-widget-end-content {
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   position: relative;
// }

// .product-widget-end-logo {
//   width: 2.5rem;
//   height: 2.5rem;
//   object-fit: contain;
//   border-radius: 0.375rem;
//   background-color: white;
//   padding: 0.25rem;
//   border: 1px solid #7cc6ee;
//   flex-shrink: 0;
// }

// .product-widget-end-info {
//   flex: 1;
//   min-width: 0;
// }

// .product-widget-end-name {
//   font-size: 0.9rem;
//   font-weight: 700;
//   color: #1e2556;
//   margin: 0 0 0.125rem 0;
//   line-height: 1.3;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }

// .product-widget-end-company {
//   font-size: 0.75rem;
//   color: #334155;
//   margin: 0;
//   line-height: 1.3;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }

// .product-widget-end-action {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 1.75rem;
//   height: 1.75rem;
//   background-color: #1e2556;
//   color: white;
//   border-radius: 50%;
//   transition: all 0.3s ease;
//   flex-shrink: 0;
// }

// .product-widget-end:hover .product-widget-end-action {
//   background-color: #7cc6ee;
//   transform: scale(1.1);
// }

// /* Responsive adjustments */
// @media (max-width: 640px) {
//   .product-widget-inline-name {
//     font-size: 0.75rem;
//   }
  
//   .product-widget-end {
//     max-width: 240px;
//   }
  
//   .product-widget-end-name {
//     font-size: 0.85rem;
//   }
// }
// `;

// const TipTapEditor = ({
//   onSave,
//   initialContent = '<p>Start writing your blog post...</p>',
//   onTocUpdate,
//   isSaving = false
// }) => {
//   const editorRef = useRef(null);

//   // Initialize editor with all required extensions
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         history: {
//           depth: 100,
//           newGroupDelay: 500
//         },
//         heading: {
//           levels: [1, 2, 3]
//         },
//         code: false, // We'll use our custom code extension
//         codeBlock: false, // We'll use code block lowlight
//         strike: false, // We'll use the dedicated Strike extension
//         blockquote: false // We'll use the dedicated Blockquote extension
//       }),
//       Placeholder.configure({
//         placeholder: 'Start writing your blog here...',
//         emptyEditorClass: 'is-editor-empty',
//       }),
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: 'text-blue-600 underline',
//           style: 'color: #7cc6ee;',
//         },
//       }),
//       FontSize,
//       FontFamily.configure({
//         types: ['textStyle'],
//       }),
//       TextStyle,
//       Color,
//       Underline,
//       Strike,
//       Code.configure({
//         HTMLAttributes: {
//           class: 'inline-code',
//         },
//       }),
//       CodeBlockLowlight.configure({
//         lowlight,
//         HTMLAttributes: {
//           class: 'code-block',
//         },
//       }),
//       Highlight.configure({
//         multicolor: true,
//       }),
//       Subscript,
//       Superscript,
//       TextAlign.configure({
//         types: ['heading', 'paragraph', 'image'],
//       }),
//       Blockquote.configure({
//         HTMLAttributes: {
//           class: 'quote-block',
//         },
//       }),
//       TaskList,
//       TaskItem.configure({
//         nested: true,
//       }),
//       HorizontalRule,
//       Dropcursor,
//       Typography,
//       CharacterCount.configure({
//         limit: 50000,
//       }),
//       ProductWidget,
//     ],
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       // FIXED: Extract and update TOC on every content change
//       if (onTocUpdate) {
//         const headings = extractHeadings(editor);
//         onTocUpdate(headings);
//       }
//     },
//     editorProps: {
//       attributes: {
//         class: 'prose focus:outline-none w-full max-w-full',
//         spellcheck: 'false',
//       },
//     },
//   });

//   // Store editor reference
//   useEffect(() => {
//     if (editor) {
//       editorRef.current = editor;
//     }
//   }, [editor]);

//   // FIXED: Update editor content when initialContent changes
//   useEffect(() => {
//     if (editor && initialContent && editor.getHTML() !== initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [editor, initialContent]);

//   // FIXED: Extract TOC when editor is initialized
//   useEffect(() => {
//     if (editor && onTocUpdate) {
//       // Small delay to ensure editor is fully ready
//       setTimeout(() => {
//         const headings = extractHeadings(editor);
//         onTocUpdate(headings);
//       }, 100);
//     }
//   }, [editor, onTocUpdate]);

//   // FIXED: Save content and TOC
//   const handleSave = useCallback(() => {
//     if (onSave && editor) {
//       console.log('=== TIPTAP SAVE DEBUG ===');
      
//       // Get fresh content directly from editor
//       const freshContent = editor.getHTML();
//       console.log('Fresh content from editor:', freshContent);
//       console.log('Content length:', freshContent?.length);
      
//       // Extract current headings
//       const headings = extractHeadings(editor);
//       console.log('Extracted headings:', headings);
      
//       // Add IDs to headings in the HTML
//       const contentWithIds = addIdsToHeadingsInHTML(freshContent);
//       console.log('Content with IDs:', contentWithIds);
//       console.log('========================');
      
//       // Call parent save function with fresh content
//       onSave(contentWithIds, headings);
//     }
//   }, [editor, onSave]);

//   if (!editor) {
//     return <div className="border rounded-lg shadow-md p-4">Loading editor...</div>;
//   }

//   return (
//     <div className="border rounded-lg shadow-md overflow-hidden">
//       <style>{customStyles}</style>

//       <EditorToolbar
//         editor={editor}
//         onExtractToc={(headings) => {
//           if (onTocUpdate) {
//             onTocUpdate(headings);
//           }
//         }}
//       />

//       <div className="min-h-[400px] bg-white">
//         <EditorContent editor={editor} />
//       </div>

//       <div className="flex justify-between p-4 bg-gray-50 border-t" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-sm" style={{ color: '#334155' }}>
//           {editor.storage.characterCount ? `${editor.storage.characterCount.characters()} characters` : '0 characters'}
//         </div>
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md flex items-center gap-2"
//           style={{ 
//             backgroundColor: '#1e2556',
//             backgroundImage: 'none'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = '#7cc6ee';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = '#1e2556';
//           }}
//           disabled={isSaving}
//         >
//           {isSaving ? (
//             <>
//               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
//               Saving...
//             </>
//           ) : (
//             <>
//               <Save size={16} />
//               Save Blog
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TipTapEditor;
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import FontSize from '@tiptap/extension-font-size';
import { useEditor, EditorContent } from '@tiptap/react';
import { Node } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
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
  Search, Package, ExternalLink
} from 'lucide-react';

// Register languages for syntax highlighting
lowlight.registerLanguage('javascript', js);
lowlight.registerLanguage('typescript', ts);
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('java', java);
lowlight.registerLanguage('json', json);

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
  
  // More robust regex that handles various heading formats
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
const EditorToolbar = ({ editor, onExtractToc }) => {
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

  // Function to handle heading application
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

        {/* Font Family */}
        <div className="flex items-center border-r pr-2 mr-2">
          <FontFamilySelector editor={editor} />
        </div>

        {/* Headings */}
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

        {/* Product & Link & Tools */}
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
              onMouseDown={handleMouseDown(() => editor.chain().focus().clearNodes().unsetAllMarks().run())}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
              title="Clear Formatting"
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

// Enhanced CSS for editor styling with brand colors
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

.ProseMirror h1 {
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1e2556;
  font-weight: bold;
}

.ProseMirror h2 {
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1e2556;
  font-weight: bold;
}

.ProseMirror h3 {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1e2556;
  font-weight: bold;
}

.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
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
}

.editor-toolbar select:focus {
  border-color: #1e2556;
  box-shadow: 0 0 0 2px rgba(30, 37, 86, 0.1);
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
}
`;

const TipTapEditor = ({
  onSave,
  initialContent = '<p>Start writing your blog post...</p>',
  onTocUpdate,
  isSaving = false
}) => {
  const editorRef = useRef(null);

  // Initialize editor with all required extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 100,
          newGroupDelay: 500
        },
        heading: {
          levels: [1, 2, 3]
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
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
          style: 'color: #7cc6ee;',
        },
      }),
      FontSize,
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
    </div>
  );
};

export default TipTapEditor;
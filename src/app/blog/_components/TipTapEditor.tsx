// 'use client';

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import FontSize from '@tiptap/extension-font-size';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
// import Placeholder from '@tiptap/extension-placeholder';
// import Table from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableCell from '@tiptap/extension-table-cell';
// import TableHeader from '@tiptap/extension-table-header';
// import Heading from '@tiptap/extension-heading';
// import Link from '@tiptap/extension-link';
// import TextStyle from '@tiptap/extension-text-style';
// import Color from '@tiptap/extension-color';
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Dropcursor from '@tiptap/extension-dropcursor';
// import Typography from '@tiptap/extension-typography';
// import CharacterCount from '@tiptap/extension-character-count';
// import {
//   Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight,
//   Link2, Image as ImageIcon, Table as TableIcon, List, ListOrdered, RefreshCw, Save,
//   Upload, X, AlertTriangle
// } from 'lucide-react';

// // Enhanced Image Modal with S3 upload capability
// const ImageModal = ({ onClose, onInsert }) => {
//   const fileInputRef = useRef(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [width, setWidth] = useState('100%');
//   const [height, setHeight] = useState('auto');
//   const [alignment, setAlignment] = useState('center');
//   const [isValidUrl, setIsValidUrl] = useState(false);
//   const [isImageLoading, setIsImageLoading] = useState(false);

//   // S3 Upload States
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState('');

//   // Check if URL is valid
//   const checkImageUrl = (url) => {
//     if (!url) {
//       setIsValidUrl(false);
//       return;
//     }

//     setIsImageLoading(true);

//     // Use the browser's built-in Image constructor
//     const imgElement = new window.Image();
//     imgElement.onload = () => {
//       setIsValidUrl(true);
//       setIsImageLoading(false);
//     };
//     imgElement.onerror = () => {
//       setIsValidUrl(false);
//       setIsImageLoading(false);
//     };
//     imgElement.src = url;
//   };

//   // Handle URL change
//   const handleUrlChange = (e) => {
//     const url = e.target.value;
//     setImageUrl(url);
//     checkImageUrl(url);
//   };

//   // Handle file upload to S3
//   const handleFileUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (!validTypes.includes(file.type)) {
//       setUploadError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('Image size should be less than 5MB');
//       return;
//     }

//     setIsUploading(true);
//     setUploadProgress(0);
//     setUploadError('');

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       // Setup XHR for progress tracking
//       const xhr = new XMLHttpRequest();

//       // Track upload progress
//       xhr.upload.addEventListener('progress', (event) => {
//         if (event.lengthComputable) {
//           const percentComplete = Math.round((event.loaded / event.total) * 100);
//           setUploadProgress(percentComplete);
//         }
//       });

//       // Handle response
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           try {
//             const response = JSON.parse(xhr.responseText);
//             setImageUrl(response.url);
//             setIsValidUrl(true);
//             setIsUploading(false);
//           } catch (error) {
//             setUploadError('Error parsing server response');
//             setIsUploading(false);
//           }
//         } else {
//           setUploadError('Failed to upload image');
//           setIsUploading(false);
//         }
//       };

//       // Handle errors
//       xhr.onerror = () => {
//         setUploadError('Network error occurred during upload');
//         setIsUploading(false);
//       };

//       // Send the upload request
//       xhr.open('POST', '/api/blogs/upload');
//       xhr.send(formData);

//     } catch (err) {
//       setUploadError(err.message || 'An unexpected error occurred during upload');
//       setIsUploading(false);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleInsert = () => {
//     if (imageUrl && isValidUrl) {
//       onInsert(imageUrl, width, height, alignment);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg w-full max-w-xl"
//         onClick={e => e.stopPropagation()}
//       >
//         <h3 className="text-xl font-bold mb-4 text-gray-800">Insert Image</h3>

//         {/* S3 Image Upload */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1 text-gray-700">Upload Image</label>

//           <div
//             onClick={triggerFileInput}
//             className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-gray-50"
//           >
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileUpload}
//               accept="image/jpeg,image/png,image/gif,image/webp"
//               className="hidden"
//             />

//             {isUploading ? (
//               <div className="w-full px-8">
//                 <div className="text-center mb-2">
//                   <p className="text-gray-600">Uploading... {uploadProgress}%</p>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <Upload className="h-8 w-8 text-gray-400 mb-2" />
//                 <p className="text-gray-600 font-medium">Click to upload image</p>
//                 <p className="text-gray-500 text-sm">JPG, PNG, GIF or WEBP (max. 5MB)</p>
//               </>
//             )}
//           </div>

//           {uploadError && (
//             <div className="mt-2 p-2 bg-red-50 text-red-600 rounded text-sm">
//               <div className="flex items-start">
//                 <AlertTriangle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
//                 <span>{uploadError}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1 text-gray-700">Or Enter Image URL</label>
//           <input
//             type="url"
//             value={imageUrl}
//             onChange={handleUrlChange}
//             className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="https://example.com/image.jpg"
//           />
//         </div>

//         {/* Image Preview */}
//         {imageUrl && (
//           <div className="mb-4 relative">
//             {isImageLoading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             )}

//             {isValidUrl ? (
//               <div className={`relative p-3 bg-gray-50 rounded border ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}>
//                 <img
//                   src={imageUrl}
//                   alt="Preview"
//                   className={`img-align-${alignment} rounded max-h-40 border`}
//                   style={{
//                     width: width !== '100%' ? width : null,
//                     height: height !== 'auto' ? height : null,
//                     maxWidth: '100%',
//                     objectFit: 'contain'
//                   }}
//                 />
//               </div>
//             ) : !isImageLoading && (
//               <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
//                 Unable to load image. Please check the URL.
//               </div>
//             )}
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-700">Width</label>
//             <select
//               value={width}
//               onChange={e => setWidth(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="100%">Full width</option>
//               <option value="300px">Small (300px)</option>
//               <option value="500px">Medium (500px)</option>
//               <option value="700px">Large (700px)</option>
//               <option value="200px">Extra Small (200px)</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-700">Height</label>
//             <select
//               value={height}
//               onChange={e => setHeight(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="auto">Auto</option>
//               <option value="200px">Small (200px)</option>
//               <option value="300px">Medium (300px)</option>
//               <option value="400px">Large (400px)</option>
//               <option value="500px">Extra Large (500px)</option>
//             </select>
//           </div>
//         </div>

//         {/* <div className="mb-6">
//           <label className="block text-sm font-medium mb-1 text-gray-700">Alignment</label>
//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={() => setAlignment('left')}
//               className={`px-3 py-2 rounded flex-1 ${alignment === 'left' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//             >
//               <div className="flex items-center justify-center">
//                 <AlignLeft size={16} className="mr-1" />
//                 Left
//               </div>
//             </button>
//             <button
//               type="button"
//               onClick={() => setAlignment('center')}
//               className={`px-3 py-2 rounded flex-1 ${alignment === 'center' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//             >
//               <div className="flex items-center justify-center">
//                 <AlignCenter size={16} className="mr-1" />
//                 Center
//               </div>
//             </button>
//             <button
//               type="button"
//               onClick={() => setAlignment('right')}
//               className={`px-3 py-2 rounded flex-1 ${alignment === 'right' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//             >
//               <div className="flex items-center justify-center">
//                 <AlignRight size={16} className="mr-1" />
//                 Right
//               </div>
//             </button>
//           </div>
//         </div> */}

//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleInsert}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//             disabled={!imageUrl || !isValidUrl}
//           >
//             Insert Image
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Function to extract headings from the editor content
// const extractHeadings = (editor) => {
//   if (!editor) return [];

//   const headings = [];
//   const content = editor.getJSON();

//   const processNode = (node) => {
//     if (node.type === 'heading') {
//       const text = node.content?.[0]?.text || 'Untitled';
//       const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
//       headings.push({
//         level: node.attrs.level,
//         content: text,
//         id
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

// // Enhanced toolbar with better styling and organization
// const EditorToolbar = ({ editor, onImageAdd, onExtractToc }) => {
//   if (!editor) return null;

//   // Use mousedown instead of click to prevent focus loss
//   const handleMouseDown = (action) => (e) => {
//     e.preventDefault();
//     action();
//     editor.view.focus();
//   };

//   // Function to handle heading application
//   const applyHeading = (level) => {
//     // Simpler approach - use the standard toggleHeading
//     // Headings are block-level elements and will apply to the whole paragraph
//     editor.chain().focus().toggleHeading({ level }).run();
    
//     // Add an informative tooltip that appears temporarily
//     const toolbarEl = document.querySelector('.editor-toolbar');
//     if (toolbarEl) {
//       const tooltip = document.createElement('div');
//       tooltip.className = 'bg-gray-800 text-white px-3 py-1.5 rounded text-sm absolute -bottom-8 z-20 editor-toolbar-tooltip';
//       tooltip.innerText = 'Headings apply to entire paragraphs';
//       tooltip.style.left = '50%';
//       tooltip.style.transform = 'translateX(-50%)';
//       toolbarEl.appendChild(tooltip);
      
//       // Remove tooltip after 2 seconds
//       setTimeout(() => {
//         if (tooltip.parentNode === toolbarEl) {
//           toolbarEl.removeChild(tooltip);
//         }
//       }, 2000);
//     }
//   };

//   // Function to apply heading-like styling to selected text only
//   const applyTextStyle = (fontSize, isBold = true) => {
//     editor.chain()
//       .focus()
//       .setFontSize(fontSize)
//       .setTextStyle({ fontWeight: isBold ? 'bold' : 'normal' })
//       .run();
//   };

//   return (
//     <div className="flex flex-wrap gap-2 p-3 mb-2 border-b sticky top-4 bg-white z-10 shadow-sm rounded-t-lg relative editor-toolbar">
//       <div className="flex gap-1 border-r pr-2 mr-2">
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => applyHeading(1))}
//           className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Heading 1 - Applies to entire paragraph"
//         >
//           H1
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => applyHeading(2))}
//           className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Heading 2 - Applies to entire paragraph"
//         >
//           H2
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => applyHeading(3))}
//           className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Heading 3 - Applies to entire paragraph"
//         >
//           H3
//         </button>
//       </div>
      
//       {/* Text Style buttons that work on selections */}
//       <div className="flex gap-1 border-r pr-2 mr-2">
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => applyTextStyle('24px'))}
//           className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//           title="Large text - Applies to selected text only"
//         >
//           T1
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => applyTextStyle('20px'))}
//           className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//           title="Medium text - Applies to selected text only"
//         >
//           T2
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => applyTextStyle('16px'))}
//           className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//           title="Small text - Applies to selected text only"
//         >
//           T3
//         </button>
//       </div>

//       <div className="flex gap-1 border-r pr-2 mr-2">
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBold().run())}
//           className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Bold"
//         >
//           <Bold size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().toggleItalic().run())}
//           className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Italic"
//         >
//           <Italic size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().toggleUnderline().run())}
//           className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Underline"
//         >
//           <UnderlineIcon size={18} />
//         </button>
//       </div>

//       <div className="flex gap-1 border-r pr-2 mr-2">
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('left').run())}
//           className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Align Left"
//         >
//           <AlignLeft size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('center').run())}
//           className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Align Center"
//         >
//           <AlignCenter size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().setTextAlign('right').run())}
//           className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Align Right"
//         >
//           <AlignRight size={18} />
//         </button>
//       </div>

//       <div className="flex gap-1 border-r pr-2 mr-2">
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().toggleBulletList().run())}
//           className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Bullet List"
//         >
//           <List size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().toggleOrderedList().run())}
//           className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Numbered List"
//         >
//           <ListOrdered size={18} />
//         </button>
//       </div>

//       <div className="flex gap-1">
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             const url = window.prompt('Enter the URL:');
//             if (url) {
//               editor.chain().focus().setLink({ href: url }).run();
//             }
//             editor.view.focus();
//           }}
//           className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//           title="Insert Link"
//         >
//           <Link2 size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             onImageAdd();
//           }}
//           className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//           title="Insert Image"
//         >
//           <ImageIcon size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={handleMouseDown(() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
//           className="p-2 rounded bg-gray-100 hover:bg-gray-200"
//           title="Insert Table"
//         >
//           <TableIcon size={18} />
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             if (onExtractToc) {
//               const headings = extractHeadings(editor);
//               onExtractToc(headings);
//             }
//             editor.view.focus();
//           }}
//           className="ml-2 px-3 py-2 rounded bg-indigo-600 text-white flex items-center gap-2 hover:bg-indigo-700"
//           title="Update Table of Contents"
//         >
//           <RefreshCw size={16} />
//           Update TOC
//         </button>
//       </div>
//     </div>
//   );
// };

// // Custom Image Extension with proper alignment and size support
// const CustomImage = Image.extend({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       width: {
//         default: null,
//         parseHTML: element => element.getAttribute('width'),
//         renderHTML: attributes => {
//           if (!attributes.width) {
//             return {};
//           }
//           return {
//             width: attributes.width,
//           };
//         },
//       },
//       height: {
//         default: null,
//         parseHTML: element => element.getAttribute('height'),
//         renderHTML: attributes => {
//           if (!attributes.height) {
//             return {};
//           }
//           return {
//             height: attributes.height,
//           };
//         },
//       },
//       alignment: {
//         default: 'center',
//         parseHTML: element => {
//           const className = element.getAttribute('class') || '';
//           if (className.includes('img-align-left')) return 'left';
//           if (className.includes('img-align-center')) return 'center';
//           if (className.includes('img-align-right')) return 'right';
//           return 'center';
//         },
//         renderHTML: attributes => {
//           return {
//             class: `blog-image img-align-${attributes.alignment || 'center'}`,
//           };
//         },
//       },
//     };
//   },
// });

// // CSS for editor styling
// const customStyles = `
// /* Fix for scroll jumping */
// .ProseMirror {
//   min-height: 400px;
//   border-radius: 0.5rem;
//   position: relative;
//   padding: 1rem;
// }

// /* Editor toolbar tooltip */
// .editor-toolbar {
//   position: relative;
// }

// /* Custom tooltip animation */
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
//   color: #adb5bd;
//   pointer-events: none;
//   height: 0;
// }

// .ProseMirror img {
//   max-width: 100%;
//   height: auto;
//   border-radius: 0.375rem;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
// }

// /* Image alignment classes */
// .ProseMirror img.img-align-left {
//   float: left;
//   margin-right: 1rem;
//   margin-bottom: 0.5rem;
//   clear: left;
// }

// .ProseMirror img.img-align-center {
//   display: block !important;
//   margin-left: auto !important;
//   margin-right: auto !important;
//   float: none !important;
//   clear: both !important;
// }

// .ProseMirror img.img-align-right {
//   float: right;
//   margin-left: 1rem;
//   margin-bottom: 0.5rem;
//   clear: right;
// }

// .ProseMirror table {
//   border-collapse: collapse;
//   table-layout: fixed;
//   width: 100%;
//   margin: 1rem 0;
//   overflow: hidden;
// }

// .ProseMirror table td,
// .ProseMirror table th {
//   border: 2px solid #ced4da;
//   padding: 0.5rem;
//   position: relative;
//   vertical-align: top;
// }

// .ProseMirror table th {
//   background-color: #f8f9fa;
//   font-weight: bold;
// }

// .ProseMirror ul,
// .ProseMirror ol {
//   padding-left: 1.5rem;
// }

// .ProseMirror ul li {
//   list-style-type: disc;
// }

// .ProseMirror ol li {
//   list-style-type: decimal;
// }

// .ProseMirror h1 {
//   font-size: 2rem;
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
// }

// .ProseMirror h2 {
//   font-size: 1.5rem;
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
// }

// .ProseMirror h3 {
//   font-size: 1.25rem;
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
// }

// .ProseMirror p {
//   margin-bottom: 0.75rem;
// }

// .ProseMirror .selectedCell:after {
//   background: rgba(200, 200, 255, 0.4);
//   content: "";
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   pointer-events: none;
//   position: absolute;
//   z-index: 2;
// }
// `;

// const TipTapEditor = ({
//   onSave,
//   initialContent = '<p>Start writing your blog post...</p>',
//   onTocUpdate,
//   isSaving = false
// }) => {
//   const [content, setContent] = useState('');
//   const [showImageModal, setShowImageModal] = useState(false);
//   const editorRef = useRef(null);
//   const editorWrapperRef = useRef(null);

//   // Add function to add heading IDs
//   const addHeadingIds = (editor) => {
//     if (!editor) return;

//     // Wait for the editor to be ready
//     setTimeout(() => {
//       const editorElement = document.querySelector('.ProseMirror');
//       if (!editorElement) return;

//       // Find all heading elements in the editor
//       const headings = editorElement.querySelectorAll('h1, h2, h3');

//       // Apply IDs to each heading based on its content
//       headings.forEach(heading => {
//         if (!heading.id) {
//           const text = heading.textContent || 'heading';
//           const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
//           heading.id = id;
//         }
//       });
//     }, 100);
//   };

//   // Initialize editor with all required extensions
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         // Configure history for better paste handling
//         history: {
//           depth: 100,
//           newGroupDelay: 500
//         },
//         // Configure heading to be more intelligent with selections
//         heading: {
//           levels: [1, 2, 3]
//         }
//       }),
//       Placeholder.configure({
//         placeholder: 'Start writing your blog here...',
//         emptyEditorClass: 'is-editor-empty',
//       }),
//       // Use the CustomImage extension instead of the standard Image
//       CustomImage.configure({
//         inline: false,
//         HTMLAttributes: {
//           class: 'blog-image',
//         },
//       }),
//       Table.configure({
//         resizable: true,
//       }),
//       TableRow,
//       TableHeader,
//       TableCell,
//       // Custom heading configuration to work better with text selections
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: 'text-blue-600 underline',
//         },
//       }),
//       FontSize,
//       TextStyle,
//       Color,
//       Underline,
//       TextAlign.configure({
//         types: ['heading', 'paragraph', 'image'],
//       }),
//       Dropcursor,
//       Typography,
//       CharacterCount.configure({
//         limit: 50000, // Optional: set a character limit
//       }),
//     ],
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       setContent(editor.getHTML());
      
//       // Extract headings on each update
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

//   // Extract TOC when editor is initialized
//   useEffect(() => {
//     if (editor && onTocUpdate) {
//       const headings = extractHeadings(editor);
//       onTocUpdate(headings);
//     }
//   }, [editor, onTocUpdate]);

//   // Apply heading IDs when editor updates
//   useEffect(() => {
//     if (editor) {
//       editor.on('update', () => {
//         addHeadingIds(editor);
//       });

//       // Also apply when editor is ready
//       addHeadingIds(editor);
//     }

//     return () => {
//       if (editor) {
//         editor.off('update');
//       }
//     };
//   }, [editor]);

//   // Set up MutationObserver to track content changes
//   useEffect(() => {
//     if (!editor) return;

//     // Set up a MutationObserver to detect changes to the editor content
//     const editorElement = document.querySelector('.ProseMirror');
//     if (!editorElement) return;

//     // Store the editor DOM element reference
//     editorWrapperRef.current = editorElement;

//     const observer = new MutationObserver(() => {
//       // When content changes, reapply heading IDs
//       addHeadingIds(editor);
//     });

//     observer.observe(editorElement, {
//       childList: true,
//       subtree: true,
//       characterData: true
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [editor]);

//   // Handle image insertion with proper attributes
//   const handleImageInsert = useCallback((url, width, height, alignment) => {
//     if (!editor || !url) return;

//     // Insert the image with explicit attributes
//     editor.chain().focus().setImage({
//       src: url,
//       alt: 'Blog image',
//       width: width,
//       height: height,
//       alignment: alignment
//     }).run();

//     setShowImageModal(false);
//   }, [editor]);

//   function addIdsToHeadingsWithRegex(htmlContent) {
//     const headingRegex = /<(h[1-6])>(.*?)<\/\1>/gi;
//     return htmlContent.replace(headingRegex, (match, tag, content) => {
//       const textContent = content.replace(/<\/?[^>]+(>|$)/g, '').trim();
//       const slug = textContent
//         // .toLowerCase()
//         .replace(/[^\w\s-]/g, '')
//         .replace(/\s+/g, '-')
//         .replace(/-+/g, '-');
//       if (slug) {
//         return `<${tag} id="${slug}">${content}</${tag}>`;
//       }
//       return match;
//     });
//   }

//   // Save content and TOC
//   const handleSave = useCallback(() => {
//     if (onSave && editor) {
//       const headings = extractHeadings(editor);
//       const updatedContent = addIdsToHeadingsWithRegex(content);
//       onSave(updatedContent, headings);
//     }
//   }, [content, editor, onSave]);

//   if (!editor) {
//     return <div className="border rounded-lg shadow-md p-4">Loading editor...</div>;
//   }

//   return (
//     <div className="border rounded-lg shadow-md overflow-hidden">
//       <style>{customStyles}</style>

//       <EditorToolbar
//         editor={editor}
//         onImageAdd={() => setShowImageModal(true)}
//         onExtractToc={(headings) => {
//           if (onTocUpdate) {
//             onTocUpdate(headings);
//           }
//         }}
//       />

//       <div className="min-h-[400px] bg-white">
//         <EditorContent editor={editor} />
//       </div>

//       <div className="flex justify-between p-4 bg-gray-50 border-t">
//         <div className="text-gray-500 text-sm">
//           {editor.storage.characterCount ? `${editor.storage.characterCount.characters()} characters` : '0 characters'}
//         </div>
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md flex items-center gap-2"
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : (
//             <>
//               <Save size={16} />
//               Save Blog
//             </>
//           )}
//         </button>
//       </div>

//       {showImageModal && (
//         <ImageModal
//           onClose={() => setShowImageModal(false)}
//           onInsert={handleImageInsert}
//         />
//       )}
//     </div>
//   );
// };

// export default TipTapEditor;
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import FontSize from '@tiptap/extension-font-size';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Dropcursor from '@tiptap/extension-dropcursor';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import {
  Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight,
  Link2, Image as ImageIcon, Table as TableIcon, List, ListOrdered, RefreshCw, Save,
  Upload, X, AlertTriangle
} from 'lucide-react';

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

    // Use the browser's built-in Image constructor
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
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800">Insert Image</h3>

        {/* S3 Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Upload Image</label>

          <div
            onClick={triggerFileInput}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-gray-50"
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
                  <p className="text-gray-600">Uploading... {uploadProgress}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">Click to upload image</p>
                <p className="text-gray-500 text-sm">JPG, PNG, GIF or WEBP (max. 5MB)</p>
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
          <label className="block text-sm font-medium mb-1 text-gray-700">Or Enter Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="mb-4 relative">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {isValidUrl ? (
              <div className={`relative p-3 bg-gray-50 rounded border ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className={`img-align-${alignment} rounded max-h-40 border`}
                  style={{
                    width: width !== '100%' ? width : null,
                    height: height !== 'auto' ? height : null,
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
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
            <label className="block text-sm font-medium mb-1 text-gray-700">Width</label>
            <select
              value={width}
              onChange={e => setWidth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="100%">Full width</option>
              <option value="300px">Small (300px)</option>
              <option value="500px">Medium (500px)</option>
              <option value="700px">Large (700px)</option>
              <option value="200px">Extra Small (200px)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Height</label>
            <select
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="auto">Auto</option>
              <option value="200px">Small (200px)</option>
              <option value="300px">Medium (300px)</option>
              <option value="400px">Large (400px)</option>
              <option value="500px">Extra Large (500px)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInsert}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={!imageUrl || !isValidUrl}
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
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

// Enhanced toolbar with better styling and organization
const EditorToolbar = ({ editor, onImageAdd, onExtractToc }) => {
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
    editor.chain()
      .focus()
      .setFontSize(fontSize)
      .setTextStyle({ fontWeight: isBold ? 'bold' : 'normal' })
      .run();
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 mb-2 border-b sticky top-4 bg-white z-10 shadow-sm rounded-t-lg relative editor-toolbar">
      <div className="flex gap-1 border-r pr-2 mr-2">
        <button
          type="button"
          onMouseDown={handleMouseDown(() => applyHeading(1))}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          title="Heading 1 - Applies to entire paragraph"
        >
          H1
        </button>
        <button
          type="button"
          onMouseDown={handleMouseDown(() => applyHeading(2))}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          title="Heading 2 - Applies to entire paragraph"
        >
          H2
        </button>
        <button
          type="button"
          onMouseDown={handleMouseDown(() => applyHeading(3))}
          className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          title="Heading 3 - Applies to entire paragraph"
        >
          H3
        </button>
      </div>
      
      {/* Text Style buttons that work on selections */}
      <div className="flex gap-1 border-r pr-2 mr-2">
        <button
          type="button"
          onMouseDown={handleMouseDown(() => applyTextStyle('24px'))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          title="Large text - Applies to selected text only"
        >
          T1
        </button>
        <button
          type="button"
          onMouseDown={handleMouseDown(() => applyTextStyle('20px'))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          title="Medium text - Applies to selected text only"
        >
          T2
        </button>
        <button
          type="button"
          onMouseDown={handleMouseDown(() => applyTextStyle('16px'))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          title="Small text - Applies to selected text only"
        >
          T3
        </button>
      </div>

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
      </div>

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
      </div>

      <div className="flex gap-1">
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
          className="ml-2 px-3 py-2 rounded bg-indigo-600 text-white flex items-center gap-2 hover:bg-indigo-700"
          title="Update Table of Contents"
        >
          <RefreshCw size={16} />
          Update TOC
        </button>
      </div>
    </div>
  );
};

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

// CSS for editor styling
const customStyles = `
.ProseMirror {
  min-height: 400px;
  border-radius: 0.5rem;
  position: relative;
  padding: 1rem;
}

.editor-toolbar {
  position: relative;
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
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.ProseMirror img.img-align-left {
  float: left;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  clear: left;
}

.ProseMirror img.img-align-center {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  float: none !important;
  clear: both !important;
}

.ProseMirror img.img-align-right {
  float: right;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  clear: right;
}

.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
}

.ProseMirror table td,
.ProseMirror table th {
  border: 2px solid #ced4da;
  padding: 0.5rem;
  position: relative;
  vertical-align: top;
}

.ProseMirror table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.ProseMirror ul,
.ProseMirror ol {
  padding-left: 1.5rem;
}

.ProseMirror ul li {
  list-style-type: disc;
}

.ProseMirror ol li {
  list-style-type: decimal;
}

.ProseMirror h1 {
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.ProseMirror h2 {
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.ProseMirror h3 {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.ProseMirror p {
  margin-bottom: 0.75rem;
}

.ProseMirror .selectedCell:after {
  background: rgba(200, 200, 255, 0.4);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}
`;

const TipTapEditor = ({
  onSave,
  initialContent = '<p>Start writing your blog post...</p>',
  onTocUpdate,
  isSaving = false
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
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
        }
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog here...',
        emptyEditorClass: 'is-editor-empty',
      }),
      CustomImage.configure({
        inline: false,
        HTMLAttributes: {
          class: 'blog-image',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      FontSize,
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Dropcursor,
      Typography,
      CharacterCount.configure({
        limit: 50000,
      }),
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

  // FIXED: Save content and TOC - This is the main fix!
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

      <div className="flex justify-between p-4 bg-gray-50 border-t">
        <div className="text-gray-500 text-sm">
          {editor.storage.characterCount ? `${editor.storage.characterCount.characters()} characters` : '0 characters'}
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md flex items-center gap-2"
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
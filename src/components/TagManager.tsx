

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { X, Plus, Tag as TagIcon, AlertCircle, Sparkles, Star, MapPin } from 'lucide-react';

// // Predefined tags with their auto-assigned locations
// const PREDEFINED_TAGS = [
//   { name: 'Funding', location: 'sidebar-second-mini', icon: '💰' },
//   { name: 'Acquisitions & Mergers', location: 'below-hero', icon: '🤝' },
//   { name: 'Partnerships', location: 'below-hero', icon: '🔗' },
//   { name: 'Client Announcements', location: 'second-collage', icon: '📢' },
//   { name: 'Feature Launch', location: 'one-line-section', icon: '🚀' },
//   { name: 'Product Updates', location: 'below-hero', icon: '🔄' },
//   { name: 'Geographic Expansion', location: 'below-hero', icon: '🌍' },
//   { name: 'Leadership Changes', location: 'below-hero', icon: '👔' },
//   { name: 'Awards & Recognition', location: 'sidebar-middle-big', icon: '🏆' },
//   { name: 'For Legal Tech Vendors', location: 'before-latest', icon: '⚖️' },
//   { name: 'Analysis', location: 'sidebar-first-mini', icon: '📊' },
//   { name: 'Law Firms', location: 'below-hero', icon: '🏛️' },
//   { name: 'In-house Counsels', location: 'below-hero', icon: '👨‍💼' },
//   { name: 'Enterprises', location: 'below-hero', icon: '🏢' },
// ];

// interface BlogTag {
//   tag: string;
//   location: string;
// }

// interface TagManagerProps {
//   blogId: string;
//   initialTags?: BlogTag[];
//   initialFeatured?: boolean;
//   onTagsUpdate?: (tags: BlogTag[], featured: boolean) => void;
// }

// export default function TagManager({ 
//   blogId, 
//   initialTags = [], 
//   initialFeatured = false,
//   onTagsUpdate 
// }: TagManagerProps) {
//   const [tags, setTags] = useState<BlogTag[]>(initialTags);
//   const [featured, setFeatured] = useState(initialFeatured);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Load tags when component mounts or blogId changes
//   useEffect(() => {
//     if (blogId) {
//       loadTags();
//     }
//   }, [blogId]);

//   const loadTags = async () => {
//     try {
//       const response = await fetch(`/api/blogs/${blogId}/tags`);
//       if (response.ok) {
//         const data = await response.json();
//         setTags(data.tags || []);
//         setFeatured(data.featured || false);
//         if (onTagsUpdate) onTagsUpdate(data.tags || [], data.featured || false);
//       }
//     } catch (err) {
//       console.error('Failed to load tags:', err);
//     }
//   };

//   const handleToggleFeatured = async () => {
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch(`/api/blogs/${blogId}/featured`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           featured: !featured
//         })
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || 'Failed to update featured status');
//       }

//       const data = await response.json();
//       setFeatured(data.blog.featured);
//       if (onTagsUpdate) onTagsUpdate(tags, data.blog.featured);
      
//       setSuccess(`Blog ${!featured ? 'added to' : 'removed from'} featured section!`);
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err: any) {
//       setError(err.message || 'Failed to update featured status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getLocationForTag = (tagName: string): string => {
//     const predefined = PREDEFINED_TAGS.find(t => t.name === tagName);
//     return predefined ? predefined.location : 'below-hero';
//   };

//   const handleAddTag = async (tagName: string) => {
//     if (!tagName.trim()) {
//       setError('Please enter a tag name');
//       return;
//     }

//     // Check if tag already exists
//     const tagExists = tags.some(t => t.tag === tagName.trim());
//     if (tagExists) {
//       setError('This tag is already added');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const location = getLocationForTag(tagName.trim());
      
//       const response = await fetch(`/api/blogs/${blogId}/tags`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           tag: tagName.trim(),
//           location: location
//         })
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || 'Failed to add tag');
//       }

//       const data = await response.json();
//       setTags(data.blog.tags);
//       if (onTagsUpdate) onTagsUpdate(data.blog.tags, featured);
      
//       setSearchTerm('');
//       setSuccess('Tag added successfully!');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err: any) {
//       setError(err.message || 'Failed to add tag');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveTag = async (tag: string) => {
//     if (!confirm(`Remove tag "${tag}"?`)) return;

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch(
//         `/api/blogs/${blogId}/tags?tag=${encodeURIComponent(tag)}`,
//         { method: 'DELETE' }
//       );

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || 'Failed to remove tag');
//       }

//       const data = await response.json();
//       setTags(data.blog.tags);
//       if (onTagsUpdate) onTagsUpdate(data.blog.tags, featured);
      
//       setSuccess('Tag removed successfully!');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err: any) {
//       setError(err.message || 'Failed to remove tag');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getLocationLabel = (location: string): string => {
//     const labels: { [key: string]: string } = {
//       'hero': '🎯 Hero Section',
//       'below-hero': '📰 Below Hero',
//       'second-collage': '🖼️ Client Announcements',
//       'one-line-section': '➡️ Feature Launch',
//       'before-latest': '⬆️ For Legal Tech Vendors',
//       'latest': '🕒 Latest Articles',
//       'sidebar-first-mini': '📌 Analysis',
//       'sidebar-middle-big': '📌 Awards & Recognition',
//       'sidebar-second-mini': '📌 Funding',
//     };
//     return labels[location] || location;
//   };

//   // Filter predefined tags based on search
//   const filteredPredefinedTags = PREDEFINED_TAGS.filter(
//     tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
//            !tags.some(t => t.tag === tag.name)
//   );

//   // Check if search term is a new tag
//   const isNewTag = searchTerm.trim() && 
//     !PREDEFINED_TAGS.some(t => t.name.toLowerCase() === searchTerm.toLowerCase()) &&
//     !tags.some(t => t.tag === searchTerm.trim());

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//       <div className="flex items-center gap-2 mb-6">
//         <TagIcon className="text-blue-600" size={24} />
//         <h3 className="text-xl font-bold text-gray-900">Tag Management</h3>
//       </div>

//       {/* Error/Success Messages */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
//           <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
//           <p className="text-sm text-red-700">{error}</p>
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//           <p className="text-sm text-green-700">{success}</p>
//         </div>
//       )}

//       {/* Featured Toggle */}
//       <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Star className={`${featured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} size={24} />
//             <div>
//               <h4 className="font-semibold text-gray-900">Featured Article</h4>
//               <p className="text-xs text-gray-600">
//                 {featured ? 'This blog will appear in the hero section' : 'Mark this blog to appear in the hero section (max 4 unique tags)'}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={handleToggleFeatured}
//             disabled={loading}
//             className={`px-4 py-2 rounded-lg font-medium transition-all ${
//               featured 
//                 ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             } disabled:opacity-50 disabled:cursor-not-allowed`}
//           >
//             {featured ? 'Featured ★' : 'Mark Featured'}
//           </button>
//         </div>
//       </div>

//       {/* Search/Add Tag */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Search or Add Tag
//         </label>
//         <div className="relative">
//           <input
//             ref={inputRef}
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search predefined tags or type new tag name..."
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             disabled={loading}
//           />
//           {isNewTag && (
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-green-600">
//               <Sparkles size={14} />
//               <span>New tag</span>
//             </div>
//           )}
//         </div>

//         {/* Predefined Tags Grid */}
//         {searchTerm && filteredPredefinedTags.length > 0 && (
//           <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
//             <p className="text-xs font-medium text-gray-600 mb-2">Predefined Tags</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {filteredPredefinedTags.map(tag => (
//                 <button
//                   key={tag.name}
//                   onClick={() => handleAddTag(tag.name)}
//                   disabled={loading}
//                   className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left disabled:opacity-50"
//                 >
//                   <span className="text-lg">{tag.icon}</span>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">{tag.name}</p>
//                     <p className="text-xs text-gray-500 truncate">{getLocationLabel(tag.location)}</p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Add New Tag Button */}
//         {isNewTag && (
//           <button
//             onClick={() => handleAddTag(searchTerm)}
//             disabled={loading}
//             className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-sm"
//           >
//             <Plus size={18} />
//             {loading ? 'Adding...' : `Create New Tag: "${searchTerm}" → ${getLocationLabel('below-hero')}`}
//           </button>
//         )}
//       </div>

//       {/* Current Tags List */}
//       <div>
//         <h4 className="text-sm font-semibold text-gray-700 mb-3">
//           Current Tags ({tags.length})
//         </h4>
        
//         {tags.length === 0 ? (
//           <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
//             <TagIcon size={48} className="mx-auto mb-2 opacity-20" />
//             <p className="text-sm">No tags added yet</p>
//             <p className="text-xs mt-1">Add tags to organize where this blog appears</p>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             {tags.map((tag, index) => {
//               const predefinedTag = PREDEFINED_TAGS.find(t => t.name === tag.tag);
              
//               return (
//                 <div
//                   key={`${tag.tag}-${index}`}
//                   className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
//                 >
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     {predefinedTag && (
//                       <span className="text-xl flex-shrink-0">{predefinedTag.icon}</span>
//                     )}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-medium text-gray-900">{tag.tag}</span>
//                         {!predefinedTag && (
//                           <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Custom</span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-1 text-xs text-gray-600">
//                         <MapPin size={12} />
//                         <span>{getLocationLabel(tag.location)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveTag(tag.tag)}
//                     disabled={loading}
//                     className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
//                     title="Remove tag"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Info Box */}
//       <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <p className="text-sm text-blue-900">
//           <strong>💡 How it works:</strong>
//         </p>
//         <ul className="text-xs text-blue-800 mt-2 space-y-1 ml-4 list-disc">
//           <li>Predefined tags automatically go to their assigned sections</li>
//           <li>New custom tags will appear in the "Below Hero" section</li>
//           <li>Mark as "Featured" to show in the hero section (max 4 unique tags)</li>
//           <li>You can add multiple tags to make the blog appear in different places</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { X, Tag as TagIcon, AlertCircle, Star, MapPin } from 'lucide-react';

// Predefined tags with their auto-assigned locations
const PREDEFINED_TAGS = [
  { name: 'Funding', location: 'sidebar-second-mini', icon: '💰' },
  { name: 'Acquisitions & Mergers', location: 'below-hero', icon: '🤝' },
  { name: 'Partnerships', location: 'below-hero', icon: '🔗' },
  { name: 'Client Announcements', location: 'second-collage', icon: '📢' },
  { name: 'Feature Launch', location: 'one-line-section', icon: '🚀' },
  { name: 'Product Updates', location: 'below-hero', icon: '🔄' },
  { name: 'Geographic Expansion', location: 'below-hero', icon: '🌍' },
  { name: 'Leadership Changes', location: 'below-hero', icon: '👔' },
  { name: 'Awards & Recognition', location: 'sidebar-middle-big', icon: '🏆' },
  { name: 'For Legal Tech Vendors', location: 'before-latest', icon: '⚖️' },
  { name: 'Analysis', location: 'sidebar-first-mini', icon: '📊' },
  { name: 'Law Firms', location: 'below-hero', icon: '🏛️' },
  { name: 'In-house Counsels', location: 'below-hero', icon: '👨‍💼' },
  { name: 'Enterprises', location: 'below-hero', icon: '🏢' },
];

interface BlogTag {
  tag: string;
  location: string;
}

interface TagManagerProps {
  blogId: string;
  initialTags?: BlogTag[];
  initialFeatured?: boolean;
  onTagsUpdate?: (tags: BlogTag[], featured: boolean) => void;
}

export default function TagManager({ 
  blogId, 
  initialTags = [], 
  initialFeatured = false,
  onTagsUpdate 
}: TagManagerProps) {
  const [tags, setTags] = useState<BlogTag[]>(initialTags);
  const [featured, setFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load tags when component mounts or blogId changes
  useEffect(() => {
    if (blogId) {
      loadTags();
    }
  }, [blogId]);

  const loadTags = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/tags`);
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags || []);
        setFeatured(data.featured || false);
        if (onTagsUpdate) onTagsUpdate(data.tags || [], data.featured || false);
      }
    } catch (err) {
      console.error('Failed to load tags:', err);
    }
  };

  const handleToggleFeatured = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/blogs/${blogId}/featured`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featured: !featured
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update featured status');
      }

      const data = await response.json();
      setFeatured(data.blog.featured);
      if (onTagsUpdate) onTagsUpdate(tags, data.blog.featured);
      
      setSuccess(`Blog ${!featured ? 'added to' : 'removed from'} featured section!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update featured status');
    } finally {
      setLoading(false);
    }
  };

  const getLocationForTag = (tagName: string): string => {
    const predefined = PREDEFINED_TAGS.find(t => t.name === tagName);
    return predefined ? predefined.location : 'below-hero';
  };

  const isTagSelected = (tagName: string): boolean => {
    return tags.some(t => t.tag === tagName);
  };

  const handleToggleTag = async (tagName: string) => {
    const isSelected = isTagSelected(tagName);

    if (isSelected) {
      // Remove tag
      await handleRemoveTag(tagName);
    } else {
      // Add tag
      await handleAddTag(tagName);
    }
  };

  const handleAddTag = async (tagName: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const location = getLocationForTag(tagName);
      
      const response = await fetch(`/api/blogs/${blogId}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tag: tagName,
          location: location
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add tag');
      }

      const data = await response.json();
      setTags(data.blog.tags);
      if (onTagsUpdate) onTagsUpdate(data.blog.tags, featured);
      
      setSuccess(`"${tagName}" added!`);
      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to add tag');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = async (tagName: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/api/blogs/${blogId}/tags?tag=${encodeURIComponent(tagName)}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove tag');
      }

      const data = await response.json();
      setTags(data.blog.tags);
      if (onTagsUpdate) onTagsUpdate(data.blog.tags, featured);
      
      setSuccess(`"${tagName}" removed!`);
      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to remove tag');
    } finally {
      setLoading(false);
    }
  };

  const getLocationLabel = (location: string): string => {
    const labels: { [key: string]: string } = {
      'hero': '🎯 Hero Section',
      'below-hero': '📰 Below Hero',
      'second-collage': '🖼️ Client Announcements',
      'one-line-section': '➡️ Feature Launch',
      'before-latest': '⬆️ For Legal Tech Vendors',
      'latest': '🕒 Latest Articles',
      'sidebar-first-mini': '📌 Analysis',
      'sidebar-middle-big': '📌 Awards & Recognition',
      'sidebar-second-mini': '📌 Funding',
    };
    return labels[location] || location;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <TagIcon className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Tag Management</h3>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {/* Featured Toggle */}
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className={`${featured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} size={24} />
            <div>
              <h4 className="font-semibold text-gray-900">Featured Article</h4>
              <p className="text-xs text-gray-600">
                {featured ? 'This blog will appear in the hero section' : 'Mark this blog to appear in the hero section (max 4 unique tags)'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleFeatured}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              featured 
                ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {featured ? 'Featured ★' : 'Mark Featured'}
          </button>
        </div>
      </div>

      {/* All Tags - Click to Select */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700">
            Select Tags ({tags.length} selected)
          </h4>
          <p className="text-xs text-gray-500">Click any tag to select/deselect</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PREDEFINED_TAGS.map(tag => {
            const isSelected = isTagSelected(tag.name);
            
            return (
              <button
                key={tag.name}
                onClick={() => handleToggleTag(tag.name)}
                disabled={loading}
                className={`flex items-center gap-3 px-4 py-3 border-2 rounded-lg transition-all text-left ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-blue-400 hover:bg-blue-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="text-2xl">{tag.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {tag.name}
                  </p>
                  <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                    {getLocationLabel(tag.location)}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tags Summary */}
      {tags.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-600 mb-2">Selected tags will appear in:</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => {
              const predefinedTag = PREDEFINED_TAGS.find(t => t.name === tag.tag);
              return (
                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                  {predefinedTag && <span>{predefinedTag.icon}</span>}
                  <span className="font-medium">{tag.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>💡 How it works:</strong>
        </p>
        <ul className="text-xs text-blue-800 mt-2 space-y-1 ml-4 list-disc">
          <li>Click any tag to add it (turns blue)</li>
          <li>Click again to remove it (turns white)</li>
          <li>Each tag automatically goes to its assigned section</li>
          <li>Mark as "Featured" to show in the hero section (max 4 unique tags)</li>
        </ul>
      </div>
    </div>
  );
}
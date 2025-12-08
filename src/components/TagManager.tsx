'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Tag as TagIcon, MapPin, AlertCircle } from 'lucide-react';

const LOCATION_OPTIONS = [
  { value: 'hero', label: '🎯 Hero Section', description: 'Top featured area (4 cards)' },
  { value: 'below-hero', label: '📰 Below Hero', description: 'First main section' },
  { value: 'second-collage', label: '🖼️ Second Collage', description: 'Second main section' },
  { value: 'one-line-section', label: '➡️ One Line Section', description: 'Single row section' },
  { value: 'before-latest', label: '⬆️ Before Latest', description: 'Section before latest' },
  { value: 'latest', label: '🕒 Latest Articles', description: 'Recent posts section' },
  { value: 'sidebar-first-mini', label: '📌 Sidebar - First Mini', description: 'Top sidebar cards' },
  { value: 'sidebar-middle-big', label: '📌 Sidebar - Middle Big', description: 'Large sidebar card' },
  { value: 'sidebar-second-mini', label: '📌 Sidebar - Second Mini', description: 'Bottom sidebar cards' },
];

interface BlogTag {
  tag: string;
  location: string;
}

interface TagManagerProps {
  blogId: string;
  initialTags?: BlogTag[];
  onTagsUpdate?: (tags: BlogTag[]) => void;
}

export default function TagManager({ blogId, initialTags = [], onTagsUpdate }: TagManagerProps) {
  const [tags, setTags] = useState<BlogTag[]>(initialTags);
  const [newTag, setNewTag] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
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
        if (onTagsUpdate) onTagsUpdate(data.tags || []);
      }
    } catch (err) {
      console.error('Failed to load tags:', err);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim() || !selectedLocation) {
      setError('Please enter a tag name and select a location');
      return;
    }

    // Check if tag already exists
    const tagExists = tags.some(
      t => t.tag === newTag.trim() && t.location === selectedLocation
    );
    
    if (tagExists) {
      setError('This tag with the same location already exists');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/blogs/${blogId}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tag: newTag.trim(),
          location: selectedLocation
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add tag');
      }

      const data = await response.json();
      setTags(data.blog.tags);
      if (onTagsUpdate) onTagsUpdate(data.blog.tags);
      
      setNewTag('');
      setSelectedLocation('');
      setSuccess('Tag added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to add tag');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = async (tag: string, location: string) => {
    if (!confirm(`Remove tag "${tag}" from ${location}?`)) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/api/blogs/${blogId}/tags?tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove tag');
      }

      const data = await response.json();
      setTags(data.blog.tags);
      if (onTagsUpdate) onTagsUpdate(data.blog.tags);
      
      setSuccess('Tag removed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to remove tag');
    } finally {
      setLoading(false);
    }
  };

  const getLocationLabel = (location: string) => {
    return LOCATION_OPTIONS.find(opt => opt.value === location)?.label || location;
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

      {/* Add Tag Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tag Name
          </label>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="e.g., Architecture, Travel, Featured"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="">Select a location...</option>
            {LOCATION_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddTag}
          disabled={loading || !newTag.trim() || !selectedLocation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={18} />
          {loading ? 'Adding...' : 'Add Tag'}
        </button>
      </div>

      {/* Current Tags List */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Current Tags ({tags.length})
        </h4>
        
        {tags.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <TagIcon size={48} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">No tags added yet</p>
            <p className="text-xs mt-1">Add tags to organize where this blog appears</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tags.map((tag, index) => (
              <div
                key={`${tag.tag}-${tag.location}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <TagIcon size={16} className="text-blue-600" />
                    <span className="font-medium text-gray-900">{tag.tag}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                    <MapPin size={14} />
                    {getLocationLabel(tag.location)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTag(tag.tag, tag.location)}
                  disabled={loading}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove tag"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>💡 Tip:</strong> Tags control where this blog appears on your site. 
          You can add multiple tags to display the blog in different sections.
        </p>
      </div>
    </div>
  );
}
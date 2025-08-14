"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Upload, Star } from 'lucide-react';

const PremiumInfoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  productId, 
  vendorId,
  isEditMode = false 
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tag');
  
  // Form states
  const [tag, setTag] = useState('');
  const [caseStudies, setCaseStudies] = useState([{
    name: '',
    companyName: '',
    designation: '',
    photo: '',
    comment: ''
  }]);
  const [valueMetrics, setValueMetrics] = useState([{
    heading: '',
    rating: 5
  }]);
  const [vendorComments, setVendorComments] = useState({
    sidebar: { description: '', points: [''] },
    overview: { description: '', points: [''] },
    featuresandfunctionalities: { description: '', points: [''] },
    impactonlifecycle: { description: '', points: [''] },
    pricing: { description: '', points: [''] },
    reviews: { description: '', points: [''] }
  });

  // Load existing data when in edit mode
  useEffect(() => {
    if (isOpen && isEditMode) {
      loadExistingData();
    } else if (isOpen && !isEditMode) {
      // Reset form for add mode
      resetForm();
    }
  }, [isOpen, isEditMode]);

  const resetForm = () => {
    setTag('');
    setCaseStudies([{ name: '', companyName: '', designation: '', photo: '', comment: '' }]);
    setValueMetrics([{ heading: '', rating: 5 }]);
    setVendorComments({
      sidebar: { description: '', points: [''] },
      overview: { description: '', points: [''] },
      featuresandfunctionalities: { description: '', points: [''] },
      impactonlifecycle: { description: '', points: [''] },
      pricing: { description: '', points: [''] },
      reviews: { description: '', points: [''] }
    });
  };

  const loadExistingData = async () => {
    try {
      const response = await fetch(`/api/vendor/legal-software/${productId}`);
      if (response.ok) {
        const data = await response.json();
        
        setTag(data.tag || '');
        setCaseStudies(data.caseStudies || [{ name: '', companyName: '', designation: '', photo: '', comment: '' }]);
        setValueMetrics(data.valueMetrics || [{ heading: '', rating: 5 }]);
        setVendorComments(data.vendorComments || {
          sidebar: { description: '', points: [''] },
          overview: { description: '', points: [''] },
          featuresandfunctionalities: { description: '', points: [''] },
          impactonlifecycle: { description: '', points: [''] },
          pricing: { description: '', points: [''] },
          reviews: { description: '', points: [''] }
        });
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  };

  // Case Studies handlers
  const addCaseStudy = () => {
    setCaseStudies([...caseStudies, {
      name: '',
      companyName: '',
      designation: '',
      photo: '',
      comment: ''
    }]);
  };

  const removeCaseStudy = (index) => {
    setCaseStudies(caseStudies.filter((_, i) => i !== index));
  };

  const updateCaseStudy = (index, field, value) => {
    const updated = [...caseStudies];
    updated[index][field] = value;
    setCaseStudies(updated);
  };

  // Value Metrics handlers
  const addValueMetric = () => {
    setValueMetrics([...valueMetrics, { heading: '', rating: 5 }]);
  };

  const removeValueMetric = (index) => {
    setValueMetrics(valueMetrics.filter((_, i) => i !== index));
  };

  const updateValueMetric = (index, field, value) => {
    const updated = [...valueMetrics];
    updated[index][field] = value;
    setValueMetrics(updated);
  };

  // Vendor Comments handlers
  const updateVendorComment = (section, field, value) => {
    setVendorComments(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addPointToSection = (section) => {
    setVendorComments(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        points: [...prev[section].points, '']
      }
    }));
  };

  const removePointFromSection = (section, index) => {
    setVendorComments(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        points: prev[section].points.filter((_, i) => i !== index)
      }
    }));
  };

  const updateSectionPoint = (section, index, value) => {
    setVendorComments(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        points: prev[section].points.map((point, i) => i === index ? value : point)
      }
    }));
  };

  const handleImageUpload = async (file, caseStudyIndex) => {
    if (!file) return;

    // Validate file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size too large. Maximum size is 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Show loading state
      updateCaseStudy(caseStudyIndex, 'uploading', true);
      
      const response = await fetch('/api/vendor/upload-to-s3', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        updateCaseStudy(caseStudyIndex, 'photo', data.url);
        updateCaseStudy(caseStudyIndex, 'uploading', false);
      } else {
        alert(data.msg || 'Upload failed');
        updateCaseStudy(caseStudyIndex, 'uploading', false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Network error during upload');
      updateCaseStudy(caseStudyIndex, 'uploading', false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/vendor/update-premium-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          vendorId,
          tag: tag.trim() || null,
          caseStudies: caseStudies.filter(cs => cs.name.trim() || cs.comment.trim()),
          valueMetrics: valueMetrics.filter(vm => vm.heading.trim()),
          vendorComments
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onSave(updatedProduct);
      } else {
        throw new Error('Failed to save premium information');
      }
    } catch (error) {
      console.error('Error saving premium info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'tag', label: 'Tag' },
    { id: 'caseStudies', label: 'Case Studies' },
    { id: 'valueMetrics', label: 'Value Metrics' },
    { id: 'vendorComments', label: 'Vendor Comments' }
  ];

  const commentSections = [
    { id: 'sidebar', label: 'Sidebar' },
    { id: 'overview', label: 'Overview' },
    { id: 'featuresandfunctionalities', label: 'Features & Functionalities' },
    { id: 'impactonlifecycle', label: 'Impact on Lifecycle' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {isEditMode ? 'Edit Premium Information' : 'Add Premium Information'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'tag' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Premium Tag</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g., Featured, Popular, Recommended"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'caseStudies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Case Studies</h3>
                <button
                  onClick={addCaseStudy}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Case Study
                </button>
              </div>

              {caseStudies.map((caseStudy, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Case Study {index + 1}</h4>
                    {caseStudies.length > 1 && (
                      <button
                        onClick={() => removeCaseStudy(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={caseStudy.name}
                        onChange={(e) => updateCaseStudy(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={caseStudy.companyName}
                        onChange={(e) => updateCaseStudy(index, 'companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <input
                        type="text"
                        value={caseStudy.designation}
                        onChange={(e) => updateCaseStudy(index, 'designation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleImageUpload(file, index);
                          }}
                          className="hidden"
                          id={`photo-${index}`}
                          disabled={caseStudy.uploading}
                        />
                        <label
                          htmlFor={`photo-${index}`}
                          className={`flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                            caseStudy.uploading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <Upload className={`w-4 h-4 ${caseStudy.uploading ? 'animate-spin' : ''}`} />
                          {caseStudy.uploading ? 'Uploading...' : 'Upload Photo'}
                        </label>
                        {caseStudy.photo && (
                          <div className="relative">
                            <img src={caseStudy.photo} alt="Preview" className="w-10 h-10 rounded object-cover border" />
                            <button
                              type="button"
                              onClick={() => updateCaseStudy(index, 'photo', '')}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      value={caseStudy.comment}
                      onChange={(e) => updateCaseStudy(index, 'comment', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'valueMetrics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Value Metrics</h3>
                <button
                  onClick={addValueMetric}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Metric
                </button>
              </div>

              {valueMetrics.map((metric, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Metric {index + 1}</h4>
                    {valueMetrics.length > 1 && (
                      <button
                        onClick={() => removeValueMetric(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                      <input
                        type="text"
                        value={metric.heading}
                        onChange={(e) => updateValueMetric(index, 'heading', e.target.value)}
                        placeholder="e.g., User Satisfaction, Performance Rating"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating (out of 5)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={metric.rating}
                          onChange={(e) => updateValueMetric(index, 'rating', parseFloat(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= metric.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vendorComments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Vendor Comments</h3>
              
              {commentSections.map((section) => (
                <div key={section.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <h4 className="font-medium text-gray-900">{section.label}</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={vendorComments[section.id]?.description || ''}
                      onChange={(e) => updateVendorComment(section.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Points (Optional)</label>
                      <button
                        onClick={() => addPointToSection(section.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        + Add Point
                      </button>
                    </div>
                    
                    {vendorComments[section.id]?.points?.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => updateSectionPoint(section.id, pointIndex, e.target.value)}
                          placeholder={`Point ${pointIndex + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {vendorComments[section.id].points.length > 1 && (
                          <button
                            onClick={() => removePointFromSection(section.id, pointIndex)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumInfoModal;
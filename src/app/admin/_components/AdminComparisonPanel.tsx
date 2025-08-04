'use client';

import { useState, useEffect } from 'react';

interface QnaItem {
  question: string;
  answer: string;
}

interface Comparison {
  id: string;
  slug: string;
  softwareSlugs: string[];
  description: string | null;
  qna: QnaItem[] | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminComparisonsPanel() {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingComparison, setEditingComparison] = useState<Comparison | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [description, setDescription] = useState('');
  const [qnaItems, setQnaItems] = useState<QnaItem[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/comparisons');
      const data = await response.json();

      if (data.success) {
        setComparisons(data.comparisons);
      } else {
        setError('Failed to fetch comparisons');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (comparison: Comparison) => {
    setEditingComparison(comparison);
    setDescription(comparison.description || '');
    setQnaItems(comparison.qna || []);
    setMetaTitle(comparison.metaTitle || '');
    setMetaDescription(comparison.metaDescription || '');
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setEditingComparison(null);
    setDescription('');
    setQnaItems([]);
    setMetaTitle('');
    setMetaDescription('');
    setError(null);
    setSuccess(null);
  };

  const addQnaItem = () => {
    setQnaItems([...qnaItems, { question: '', answer: '' }]);
  };

  const updateQnaItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = qnaItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setQnaItems(updated);
  };

  const removeQnaItem = (index: number) => {
    setQnaItems(qnaItems.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!editingComparison) return;

    // Validate QNA items
    for (const item of qnaItems) {
      if (item.question.trim() && !item.answer.trim()) {
        setError('Please provide an answer for all questions');
        return;
      }
      if (!item.question.trim() && item.answer.trim()) {
        setError('Please provide a question for all answers');
        return;
      }
    }

    // Filter out empty QNA items
    const filteredQna = qnaItems.filter(item => 
      item.question.trim() && item.answer.trim()
    );

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/comparisons/${editingComparison.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description.trim() || null,
          qna: filteredQna.length > 0 ? filteredQna : null,
          metaTitle: metaTitle.trim() || null,
          metaDescription: metaDescription.trim() || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Comparison updated successfully!');
        await fetchComparisons(); // Refresh the list
        setTimeout(() => {
          handleCancel();
        }, 1500);
      } else {
        setError(data.error || 'Failed to update comparison');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm(`Are you sure you want to delete the comparison "${slug}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/comparisons/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Comparison deleted successfully!');
        await fetchComparisons();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to delete comparison');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#7cc6ee' }}></div>
          <p className="font-medium" style={{ color: '#334155' }}>Loading comparisons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
            Manage Comparisons
          </h1>
          <p className="mt-2" style={{ color: '#334155' }}>
            Edit descriptions, Q&A sections, and SEO metadata for product comparisons
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 rounded-lg border-l-4 border-green-500 bg-green-50">
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg border-l-4 border-red-500 bg-red-50">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Edit Modal */}
        {editingComparison && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#1e2556' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Edit Comparison: {editingComparison.slug}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-white hover:text-gray-300 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2 text-sm text-white opacity-80">
                  Software: {editingComparison.softwareSlugs.join(' vs ')}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                      style={{ focusRingColor: '#7cc6ee' }}
                      placeholder="Enter a detailed description of this comparison..."
                    />
                  </div>

                  {/* Q&A Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-bold" style={{ color: '#1e2556' }}>
                        Questions & Answers
                      </label>
                      <button
                        onClick={addQnaItem}
                        className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        + Add Q&A
                      </button>
                    </div>

                    <div className="space-y-4">
                      {qnaItems.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium" style={{ color: '#334155' }}>
                              Q&A #{index + 1}
                            </h3>
                            <button
                              onClick={() => removeQnaItem(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium mb-1" style={{ color: '#334155' }}>
                                Question
                              </label>
                              <input
                                type="text"
                                value={item.question}
                                onChange={(e) => updateQnaItem(index, 'question', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent text-sm"
                                style={{ focusRingColor: '#7cc6ee' }}
                                placeholder="Enter the question..."
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium mb-1" style={{ color: '#334155' }}>
                                Answer
                              </label>
                              <textarea
                                value={item.answer}
                                onChange={(e) => updateQnaItem(index, 'answer', e.target.value)}
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent text-sm resize-none"
                                style={{ focusRingColor: '#7cc6ee' }}
                                placeholder="Enter the answer..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {qnaItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No Q&A items yet. Click "Add Q&A" to get started.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SEO Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRingColor: '#7cc6ee' }}
                        placeholder="SEO meta title..."
                      />
                      <p className="text-xs mt-1" style={{ color: '#334155' }}>
                        {metaTitle.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                        Meta Description
                      </label>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                        style={{ focusRingColor: '#7cc6ee' }}
                        placeholder="SEO meta description..."
                      />
                      <p className="text-xs mt-1" style={{ color: '#334155' }}>
                        {metaDescription.length}/160 characters
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  style={{ color: '#334155' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#1e2556' }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comparisons Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f5f7fa' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#1e2556' }}>
                    Comparison
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#1e2556' }}>
                    Software
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#1e2556' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#1e2556' }}>
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider" style={{ color: '#1e2556' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisons.map((comparison) => (
                  <tr key={comparison.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                          {comparison.slug}
                        </div>
                        <div className="text-xs" style={{ color: '#334155' }}>
                          ID: {comparison.id}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm" style={{ color: '#2d2d2d' }}>
                        {comparison.softwareSlugs.join(' vs ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          comparison.description ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {comparison.description ? 'Has Description' : 'No Description'}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          comparison.qna && Array.isArray(comparison.qna) && comparison.qna.length > 0 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {comparison.qna && Array.isArray(comparison.qna) && comparison.qna.length > 0 
                            ? `${comparison.qna.length} Q&A` 
                            : 'No Q&A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#334155' }}>
                      {new Date(comparison.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(comparison)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comparison.id, comparison.slug)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {comparisons.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No comparisons found</p>
                        <p className="text-sm">Comparisons will appear here once users create them.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        {comparisons.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#334155' }}>
              Showing {comparisons.length} comparison{comparisons.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
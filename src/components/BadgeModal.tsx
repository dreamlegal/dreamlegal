
// import React, { useState, useEffect } from 'react';
// import { X, Plus, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

// const BadgeModal = ({ isOpen, onClose, productId, productName, productCategory }) => {
//   const [badges, setBadges] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const formattedCategory = productCategory?.replace(/_/g, ' ').toUpperCase() || '';

//   const [formData, setFormData] = useState({
//     category: formattedCategory,
//     text: '',
//     borderColor: '#f96e05', // Default to Launchpad stage
//   });

//   // Only these three colors with labels
//   const colorOptions = [
//     { name: 'Launchpad stage', color: '#f96e05' },
//     { name: 'Growth stage', color: '#7cc6ee' },
//     { name: 'Enterprise stage', color: '#27d3bc' },
//   ];

//   useEffect(() => {
//     if (isOpen && productId) {
//       fetchBadges();
//       setFormData({
//         category: formattedCategory,
//         text: '',
//         borderColor: '#f96e05',
//       });
//     }
//   }, [isOpen, productId, formattedCategory]);

//   const fetchBadges = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/admin/badges/get', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productId }),
//       });

//       if (!response.ok) throw new Error('Failed to fetch badges');

//       const data = await response.json();
//       setBadges(data.badges || []);
//     } catch (err) {
//       setError('Failed to load badges');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateBadge = async () => {
//     if (!formData.category.trim() || !formData.text.trim()) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('/api/admin/badges/manage', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: 'create',
//           productId,
//           ...formData,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to create badge');

//       await fetchBadges();
//       setFormData({
//         category: formattedCategory,
//         text: '',
//         borderColor: '#f96e05',
//       });
//       setShowForm(false);
//       alert('Badge created successfully!');
//     } catch (err) {
//       alert('Failed to create badge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteBadge = async (badgeId) => {
//     if (!confirm('Are you sure you want to delete this badge?')) return;

//     setLoading(true);
//     try {
//       const response = await fetch('/api/admin/badges/manage', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: 'delete',
//           badgeId,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to delete badge');

//       await fetchBadges();
//       alert('Badge deleted successfully!');
//     } catch (err) {
//       alert('Failed to delete badge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleBadge = async (badgeId) => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/admin/badges/manage', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: 'toggle',
//           badgeId,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to toggle badge');

//       await fetchBadges();
//     } catch (err) {
//       alert('Failed to toggle badge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Manage Badges</h2>
//             <p className="text-sm text-gray-600 mt-1">{productName}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {error && (
//             <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-center gap-2">
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Add Badge Button */}
//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="w-full mb-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
//             >
//               <Plus className="w-5 h-5" />
//               <span className="font-medium">Add New Badge</span>
//             </button>
//           )}

//           {/* Create Form */}
//           {showForm && (
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Badge</h3>

//               <div className="space-y-4">
//                 {/* Category Input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category Text
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     placeholder="e.g., LEGAL AI, ENTERPRISE"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 {/* Badge Text */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Badge Text (use \n for new line)
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.text}
//                     onChange={(e) => setFormData({ ...formData, text: e.target.value })}
//                     placeholder="e.g., High\nPerformer"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 {/* Color Selection with Headings */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Border Color
//                   </label>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
//                     {colorOptions.map((option) => (
//                       <div
//                         key={option.color}
//                         onClick={() => setFormData({ ...formData, borderColor: option.color })}
//                         className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
//                           formData.borderColor === option.color
//                             ? 'border-gray-900 scale-105 shadow-lg'
//                             : 'border-gray-300 hover:border-gray-400'
//                         }`}
//                       >
//                         <div
//                           className="h-10 w-full rounded-md mb-2"
//                           style={{ backgroundColor: option.color }}
//                         ></div>
//                         <span className="block text-sm font-medium text-gray-800">
//                           {option.name}
//                         </span>
//                         <span className="block text-xs text-gray-500">{option.color}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={() => {
//                       setShowForm(false);
//                       setFormData({
//                         category: formattedCategory,
//                         text: '',
//                         borderColor: '#f96e05',
//                       });
//                     }}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateBadge}
//                     disabled={loading}
//                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <Plus className="w-4 h-4" />
//                         Create Badge
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Existing Badges */}
//           {loading && badges.length === 0 ? (
//             <div className="text-center py-12">
//               <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
//               <p className="text-gray-600">Loading badges...</p>
//             </div>
//           ) : badges.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
//               <p className="text-gray-600 font-medium">No badges yet</p>
//               <p className="text-sm text-gray-500 mt-1">Click "Add New Badge" to create one</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {badges.map((badge) => (
//                 <div
//                   key={badge.id}
//                   className={`bg-white border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow ${
//                     !badge.isActive ? 'opacity-50' : ''
//                   }`}
//                 >
//                   <div
//                     className="w-12 h-12 rounded-lg border-2 flex-shrink-0"
//                     style={{
//                       borderColor: badge.borderColor,
//                       backgroundColor: `${badge.borderColor}15`,
//                     }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="font-semibold text-gray-900">{badge.category}</span>
//                       {!badge.isActive && (
//                         <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
//                           Hidden
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600 whitespace-pre-wrap">
//                       {badge.text.replace(/\\n/g, '\n')}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">{badge.borderColor}</p>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleToggleBadge(badge.id)}
//                       disabled={loading}
//                       className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                       {badge.isActive ? (
//                         <Eye className="w-5 h-5" />
//                       ) : (
//                         <EyeOff className="w-5 h-5" />
//                       )}
//                     </button>
//                     <button
//                       onClick={() => handleDeleteBadge(badge.id)}
//                       disabled={loading}
//                       className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BadgeModal;
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

const BadgeModal = ({ isOpen, onClose, productId, productName }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    text: '',
    borderColor: '#f96e05', // Default to Launchpad stage
  });

  // Only these three colors with labels
  const colorOptions = [
    { name: 'Launchpad stage', color: '#f96e05' },
    { name: 'Growth stage', color: '#7cc6ee' },
    { name: 'Enterprise stage', color: '#27d3bc' },
  ];

  useEffect(() => {
    if (isOpen && productId) {
      fetchBadges();
      setFormData({
        text: '',
        borderColor: '#f96e05',
      });
    }
  }, [isOpen, productId]);

  const fetchBadges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/badges/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error('Failed to fetch badges');

      const data = await response.json();
      setBadges(data.badges || []);
    } catch (err) {
      setError('Failed to load badges');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBadge = async () => {
    if (!formData.text.trim()) {
      alert('Please fill in the badge text');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/badges/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          productId,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error('Failed to create badge');

      await fetchBadges();
      setFormData({
        text: '',
        borderColor: '#f96e05',
      });
      setShowForm(false);
      alert('Badge created successfully!');
    } catch (err) {
      alert('Failed to create badge');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBadge = async (badgeId) => {
    if (!confirm('Are you sure you want to delete this badge?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/badges/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          badgeId,
        }),
      });

      if (!response.ok) throw new Error('Failed to delete badge');

      await fetchBadges();
      alert('Badge deleted successfully!');
    } catch (err) {
      alert('Failed to delete badge');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBadge = async (badgeId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/badges/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle',
          badgeId,
        }),
      });

      if (!response.ok) throw new Error('Failed to toggle badge');

      await fetchBadges();
    } catch (err) {
      alert('Failed to toggle badge');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Badges</h2>
            <p className="text-sm text-gray-600 mt-1">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {/* Add Badge Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full mb-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add New Badge</span>
            </button>
          )}

          {/* Create Form */}
          {showForm && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Badge</h3>

              <div className="space-y-4">
                {/* Badge Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge Text (use \n for new line)
                  </label>
                  <input
                    type="text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="e.g., High\nPerformer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Color Selection with Headings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Color
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                    {colorOptions.map((option) => (
                      <div
                        key={option.color}
                        onClick={() => setFormData({ ...formData, borderColor: option.color })}
                        className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                          formData.borderColor === option.color
                            ? 'border-gray-900 scale-105 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div
                          className="h-10 w-full rounded-md mb-2"
                          style={{ backgroundColor: option.color }}
                        ></div>
                        <span className="block text-sm font-medium text-gray-800">
                          {option.name}
                        </span>
                        <span className="block text-xs text-gray-500">{option.color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({
                        text: '',
                        borderColor: '#f96e05',
                      });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateBadge}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Create Badge
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Badges */}
          {loading && badges.length === 0 ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading badges...</p>
            </div>
          ) : badges.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 font-medium">No badges yet</p>
              <p className="text-sm text-gray-500 mt-1">Click "Add New Badge" to create one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-white border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow ${
                    !badge.isActive ? 'opacity-50' : ''
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2 flex-shrink-0"
                    style={{
                      borderColor: badge.borderColor,
                      backgroundColor: `${badge.borderColor}15`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!badge.isActive && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 font-medium whitespace-pre-wrap">
                      {badge.text.replace(/\\n/g, '\n')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{badge.borderColor}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleBadge(badge.id)}
                      disabled={loading}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {badge.isActive ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteBadge(badge.id)}
                      disabled={loading}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
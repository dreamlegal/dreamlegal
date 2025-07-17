


// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import { Plus, Upload, Link, Save, Edit3, Trash2, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';

// // const MarketIntelligenceDashboard = () => {
// //   const [marketData, setMarketData] = useState(null);
// //   const [dashboardData, setDashboardData] = useState({});
// //   const [insights, setInsights] = useState({});
// //   const [miData, setMiData] = useState({});
// //   const [showJsonPreview, setShowJsonPreview] = useState(true);
// //   const [availableFields, setAvailableFields] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [analyzeLoading, setAnalyzeLoading] = useState(false);
// //   const [uploadLoading, setUploadLoading] = useState(false);
  
// //   // Edit states
// //   const [editingPanel, setEditingPanel] = useState(null);
// //   const [editingSubpanel, setEditingSubpanel] = useState(null);
// //   const [editingCategory, setEditingCategory] = useState(null);
// //   const [editingCollection, setEditingCollection] = useState(null);
// //   const [editPanelName, setEditPanelName] = useState('');
// //   const [editSubpanelName, setEditSubpanelName] = useState('');
// //   const [editCategoryName, setEditCategoryName] = useState('');
// //   const [editCollectionName, setEditCollectionName] = useState('');

// //   // Modals
// //   const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
// //   const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
// //   const [showAddInsightPanelModal, setShowAddInsightPanelModal] = useState(false);
// //   const [showAddSubpanelModal, setShowAddSubpanelModal] = useState(false);
// //   const [showEditSubpanelModal, setShowEditSubpanelModal] = useState(false);
// //   const [selectedInsightPanel, setSelectedInsightPanel] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [editingSubpanelData, setEditingSubpanelData] = useState(null);

// //   // Form states
// //   const [newCategoryName, setNewCategoryName] = useState('');
// //   const [newCollectionName, setNewCollectionName] = useState('');
// //   const [newInsightPanelName, setNewInsightPanelName] = useState('');
// //   const [newSubpanelData, setNewSubpanelData] = useState({
// //     name: '',
// //     database: {},
// //     graph: { prompt: '', type: '', heading: '', fields: [], response: '' },
// //     content: { prompt: '', type: 'para', heading: '', fields: [], response: '' },
// //     insights: { prompt: '', type: 'para', heading: '', fields: [], response: '' }
// //   });

// //   // Expanded states for categories
// //   const [expandedCategories, setExpandedCategories] = useState({});

// //   useEffect(() => {
// //     fetchAvailableFields();
// //     loadExistingData();
// //   }, []);

// //   const fetchAvailableFields = async () => {
// //     try {
// //       const response = await fetch('/api/legal-software/fields');
// //       if (response.ok) {
// //         const fields = await response.json();
// //         setAvailableFields(fields);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching fields:', error);
// //     }
// //   };

// //   const loadExistingData = async () => {
// //     try {
// //       const response = await fetch('/api/market-intelligence');
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.length > 0) {
// //           const latest = data[0];
// //           setMarketData(latest);
// //           setDashboardData(latest.dashboardData || {});
// //           setInsights(latest.insights || {});
          
// //           // Convert old format to new category format if needed
// //           const miDataConverted = latest.miData || {};
          
// //           // If old format (no categories), wrap in a default category
// //           if (Object.keys(miDataConverted).length > 0 && !hasCategories(miDataConverted)) {
// //             const defaultCategory = 'Default Category';
// //             miDataConverted[defaultCategory] = { ...miDataConverted };
// //             Object.keys(miDataConverted).forEach(key => {
// //               if (key !== defaultCategory) {
// //                 delete miDataConverted[key];
// //               }
// //             });
// //           }
          
// //           // Ensure file names are handled
// //           Object.keys(miDataConverted).forEach(categoryName => {
// //             Object.keys(miDataConverted[categoryName]).forEach(collectionName => {
// //               if (!miDataConverted[categoryName][collectionName].fileNames) {
// //                 miDataConverted[categoryName][collectionName].fileNames = {};
// //               }
// //             });
// //           });
          
// //           setMiData(miDataConverted);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error loading existing data:', error);
// //     }
// //   };

// //   const hasCategories = (data) => {
// //     // Check if data has category structure
// //     return Object.values(data).some(value => 
// //       typeof value === 'object' && 
// //       Object.values(value).some(subValue => 
// //         typeof subValue === 'object' && 
// //         (subValue.pdflinks || subValue.articlelinks)
// //       )
// //     );
// //   };

// //   const handleSaveToDatabase = async () => {
// //     setLoading(true);
// //     try {
// //       // Clean miData before saving (remove fileNames)
// //       const cleanMiData = {};
// //       Object.keys(miData).forEach(categoryName => {
// //         cleanMiData[categoryName] = {};
// //         Object.keys(miData[categoryName]).forEach(collectionName => {
// //           cleanMiData[categoryName][collectionName] = {
// //             pdflinks: miData[categoryName][collectionName].pdflinks || [],
// //             articlelinks: miData[categoryName][collectionName].articlelinks || []
// //           };
// //         });
// //       });

// //       const payload = {
// //         dashboardData,
// //         insights,
// //         miData: cleanMiData
// //       };

// //       const method = marketData ? 'PUT' : 'POST';
// //       const body = marketData ? { ...payload, id: marketData.id } : payload;

// //       const response = await fetch('/api/market-intelligence', {
// //         method,
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(body)
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         setMarketData(result);
// //         alert('Data saved successfully!');
// //       } else {
// //         alert('Error saving data');
// //       }
// //     } catch (error) {
// //       console.error('Error saving to database:', error);
// //       alert('Error saving data');
// //     }
// //     setLoading(false);
// //   };

// //   const handleAnalyze = async () => {
// //     setAnalyzeLoading(true);
// //     try {
// //       // Clean miData before sending (remove fileNames)
// //       const cleanMiData = {};
// //       Object.keys(miData).forEach(categoryName => {
// //         cleanMiData[categoryName] = {};
// //         Object.keys(miData[categoryName]).forEach(collectionName => {
// //           cleanMiData[categoryName][collectionName] = {
// //             pdflinks: miData[categoryName][collectionName].pdflinks || [],
// //             articlelinks: miData[categoryName][collectionName].articlelinks || []
// //           };
// //         });
// //       });

// //       const payload = {
// //         dashboardData,
// //         insights,
// //         miData: cleanMiData
// //       };

// //       const response = await fetch('/api/mi-analyse', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         alert('Analysis completed successfully!');
// //         console.log('Analysis result:', result);
// //       } else {
// //         alert('Error during analysis');
// //       }
// //     } catch (error) {
// //       console.error('Error during analysis:', error);
// //       alert('Error during analysis');
// //     }
// //     setAnalyzeLoading(false);
// //   };

// //   const handleFileUpload = async (file, type, categoryName, collectionName) => {
// //     setUploadLoading(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append('document', file);
// //       formData.append('type', type);

// //       const response = await fetch('/api/upload-document', {
// //         method: 'POST',
// //         body: formData
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
        
// //         const updatedMiData = { ...miData };
// //         if (!updatedMiData[categoryName]) {
// //           updatedMiData[categoryName] = {};
// //         }
// //         if (!updatedMiData[categoryName][collectionName]) {
// //           updatedMiData[categoryName][collectionName] = { 
// //             pdflinks: [], 
// //             articlelinks: [],
// //             fileNames: {}
// //           };
// //         }
        
// //         const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
// //         if (!updatedMiData[categoryName][collectionName][linkType]) {
// //           updatedMiData[categoryName][collectionName][linkType] = [];
// //         }
// //         if (!updatedMiData[categoryName][collectionName].fileNames) {
// //           updatedMiData[categoryName][collectionName].fileNames = {};
// //         }
        
// //         updatedMiData[categoryName][collectionName][linkType].push(result.url);
// //         updatedMiData[categoryName][collectionName].fileNames[result.url] = result.originalName;

// //         setMiData(updatedMiData);
// //         alert('File uploaded successfully!');
// //       } else {
// //         alert('Error uploading file');
// //       }
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       alert('Error uploading file');
// //     }
// //     setUploadLoading(false);
// //   };

// //   const handleAddLink = (categoryName, collectionName, url, name) => {
// //     const updatedMiData = { ...miData };
// //     if (!updatedMiData[categoryName]) {
// //       updatedMiData[categoryName] = {};
// //     }
// //     if (!updatedMiData[categoryName][collectionName]) {
// //       updatedMiData[categoryName][collectionName] = { 
// //         pdflinks: [], 
// //         articlelinks: [],
// //         fileNames: {}
// //       };
// //     }
    
// //     if (!updatedMiData[categoryName][collectionName].articlelinks) {
// //       updatedMiData[categoryName][collectionName].articlelinks = [];
// //     }
// //     if (!updatedMiData[categoryName][collectionName].fileNames) {
// //       updatedMiData[categoryName][collectionName].fileNames = {};
// //     }
    
// //     updatedMiData[categoryName][collectionName].articlelinks.push(url);
// //     updatedMiData[categoryName][collectionName].fileNames[url] = name || url;

// //     setMiData(updatedMiData);
// //   };

// //   const handleDeleteFile = (categoryName, collectionName, url, type) => {
// //     const updatedMiData = { ...miData };
// //     const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
    
// //     updatedMiData[categoryName][collectionName][linkType] = 
// //       updatedMiData[categoryName][collectionName][linkType].filter(link => link !== url);
    
// //     delete updatedMiData[categoryName][collectionName].fileNames[url];
    
// //     setMiData(updatedMiData);
// //   };

// //   const handleAddCategory = () => {
// //     if (newCategoryName.trim()) {
// //       const updatedDashboardData = { ...dashboardData };
// //       if (!updatedDashboardData[newCategoryName]) {
// //         updatedDashboardData[newCategoryName] = {};
// //       }
// //       setDashboardData(updatedDashboardData);
      
// //       const updatedMiData = { ...miData };
// //       if (!updatedMiData[newCategoryName]) {
// //         updatedMiData[newCategoryName] = {};
// //       }
// //       setMiData(updatedMiData);
      
// //       setNewCategoryName('');
// //       setShowAddCategoryModal(false);
// //     }
// //   };

// //   const handleAddCollection = () => {
// //     if (newCollectionName.trim() && selectedCategory) {
// //       const updatedDashboardData = { ...dashboardData };
// //       if (!updatedDashboardData[selectedCategory]) {
// //         updatedDashboardData[selectedCategory] = {};
// //       }
// //       updatedDashboardData[selectedCategory][newCollectionName] = {};
// //       setDashboardData(updatedDashboardData);
      
// //       const updatedMiData = { ...miData };
// //       if (!updatedMiData[selectedCategory]) {
// //         updatedMiData[selectedCategory] = {};
// //       }
// //       updatedMiData[selectedCategory][newCollectionName] = { 
// //         pdflinks: [], 
// //         articlelinks: [],
// //         fileNames: {}
// //       };
// //       setMiData(updatedMiData);
      
// //       setNewCollectionName('');
// //       setShowAddCollectionModal(false);
// //     }
// //   };

// //   const handleDeleteCategory = (categoryName) => {
// //     const updatedDashboardData = { ...dashboardData };
// //     const updatedMiData = { ...miData };
    
// //     delete updatedDashboardData[categoryName];
// //     delete updatedMiData[categoryName];
    
// //     setDashboardData(updatedDashboardData);
// //     setMiData(updatedMiData);
// //   };

// //   const handleDeleteCollection = (categoryName, collectionName) => {
// //     const updatedDashboardData = { ...dashboardData };
// //     const updatedMiData = { ...miData };
    
// //     delete updatedDashboardData[categoryName][collectionName];
// //     delete updatedMiData[categoryName][collectionName];
    
// //     setDashboardData(updatedDashboardData);
// //     setMiData(updatedMiData);
// //   };

// //   const handleAddInsightPanel = () => {
// //     if (newInsightPanelName.trim()) {
// //       const updatedInsights = { ...insights };
// //       updatedInsights[newInsightPanelName] = {};
// //       setInsights(updatedInsights);
// //       setNewInsightPanelName('');
// //       setShowAddInsightPanelModal(false);
// //     }
// //   };

// //   const handleAddSubpanel = () => {
// //     if (newSubpanelData.name.trim() && selectedInsightPanel) {
// //       const updatedInsights = { ...insights };
// //       updatedInsights[selectedInsightPanel][newSubpanelData.name] = {
// //         database: newSubpanelData.database,
// //         graph: newSubpanelData.graph,
// //         content: newSubpanelData.content,
// //         insights: newSubpanelData.insights
// //       };
// //       setInsights(updatedInsights);
      
// //       // Reset form
// //       setNewSubpanelData({
// //         name: '',
// //         database: {},
// //         graph: { prompt: '', type: '', heading: '', fields: [], response: '' },
// //         content: { prompt: '', type: 'para', heading: '', fields: [], response: '' },
// //         insights: { prompt: '', type: 'para', heading: '', fields: [], response: '' }
// //       });
// //       setShowAddSubpanelModal(false);
// //     }
// //   };

// //   const handleEditPanel = (panelName, newName) => {
// //     if (newName && newName !== panelName) {
// //       const updatedInsights = { ...insights };
// //       updatedInsights[newName] = updatedInsights[panelName];
// //       delete updatedInsights[panelName];
// //       setInsights(updatedInsights);
// //     }
// //     setEditingPanel(null);
// //     setEditPanelName('');
// //   };

// //   const handleDeletePanel = (panelName) => {
// //     const updatedInsights = { ...insights };
// //     delete updatedInsights[panelName];
// //     setInsights(updatedInsights);
// //   };

// //   const handleEditSubpanel = (panelName, subpanelName, newName) => {
// //     if (newName && newName !== subpanelName) {
// //       const updatedInsights = { ...insights };
// //       updatedInsights[panelName][newName] = updatedInsights[panelName][subpanelName];
// //       delete updatedInsights[panelName][subpanelName];
// //       setInsights(updatedInsights);
// //     }
// //     setEditingSubpanel(null);
// //     setEditSubpanelName('');
// //   };

// //   const handleDeleteSubpanel = (panelName, subpanelName) => {
// //     const updatedInsights = { ...insights };
// //     delete updatedInsights[panelName][subpanelName];
// //     setInsights(updatedInsights);
// //   };

// //   const toggleCategory = (categoryName) => {
// //     setExpandedCategories(prev => ({
// //       ...prev,
// //       [categoryName]: !prev[categoryName]
// //     }));
// //   };

// //   const jsonPreview = {
// //     dashboardData,
// //     insights,
// //     miData: Object.keys(miData).reduce((acc, categoryName) => {
// //       acc[categoryName] = {};
// //       Object.keys(miData[categoryName]).forEach(collectionName => {
// //         acc[categoryName][collectionName] = {
// //           pdflinks: miData[categoryName][collectionName].pdflinks || [],
// //           articlelinks: miData[categoryName][collectionName].articlelinks || []
// //         };
// //       });
// //       return acc;
// //     }, {})
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-8">
// //           <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
// //             Market Intelligence Dashboard
// //           </h1>
// //           <div className="flex gap-3">
// //             <button
// //               onClick={handleAnalyze}
// //               disabled={analyzeLoading}
// //               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
// //               style={{ backgroundColor: '#7cc6ee' }}
// //             >
// //               <Save size={20} />
// //               {analyzeLoading ? 'Analyzing...' : 'Analyze'}
// //             </button>
// //             <button
// //               onClick={handleSaveToDatabase}
// //               disabled={loading}
// //               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
// //               style={{ backgroundColor: '#1e2556' }}
// //             >
// //               <Save size={20} />
// //               {loading ? 'Saving...' : 'Save to Database'}
// //             </button>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Main Content */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Data Categories Section */}
// //             <div className="bg-white rounded-lg shadow-lg">
// //               <div className="p-6 border-b border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
// //                     Data Categories
// //                   </h2>
// //                   <button
// //                     onClick={() => setShowAddCategoryModal(true)}
// //                     className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
// //                     style={{ backgroundColor: '#7cc6ee' }}
// //                   >
// //                     <Plus size={16} />
// //                     Add Category
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="p-6 space-y-4">
// //                 {Object.keys(miData).map((categoryName) => (
// //                   <CategoryCard
// //                     key={categoryName}
// //                     categoryName={categoryName}
// //                     categoryData={miData[categoryName]}
// //                     expanded={expandedCategories[categoryName]}
// //                     onToggle={() => toggleCategory(categoryName)}
// //                     onFileUpload={(file, type, collectionName) => handleFileUpload(file, type, categoryName, collectionName)}
// //                     onAddLink={(collectionName, url, name) => handleAddLink(categoryName, collectionName, url, name)}
// //                     onDeleteFile={(collectionName, url, type) => handleDeleteFile(categoryName, collectionName, url, type)}
// //                     onDeleteCollection={(collectionName) => handleDeleteCollection(categoryName, collectionName)}
// //                     onDeleteCategory={() => handleDeleteCategory(categoryName)}
// //                     onAddCollection={() => {
// //                       setSelectedCategory(categoryName);
// //                       setShowAddCollectionModal(true);
// //                     }}
// //                     uploadLoading={uploadLoading}
// //                     editingCategory={editingCategory}
// //                     setEditingCategory={setEditingCategory}
// //                     editCategoryName={editCategoryName}
// //                     setEditCategoryName={setEditCategoryName}
// //                     onEditCategory={(newName) => {
// //                       if (newName && newName !== categoryName) {
// //                         const updatedDashboardData = { ...dashboardData };
// //                         const updatedMiData = { ...miData };
                        
// //                         updatedDashboardData[newName] = updatedDashboardData[categoryName];
// //                         updatedMiData[newName] = updatedMiData[categoryName];
                        
// //                         delete updatedDashboardData[categoryName];
// //                         delete updatedMiData[categoryName];
                        
// //                         setDashboardData(updatedDashboardData);
// //                         setMiData(updatedMiData);
// //                       }
// //                       setEditingCategory(null);
// //                       setEditCategoryName('');
// //                     }}
// //                   />
// //                 ))}
                
// //                 {Object.keys(miData).length === 0 && (
// //                   <div className="text-center py-8" style={{ color: '#334155' }}>
// //                     No categories yet. Add your first category to get started.
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Insights Section */}
// //             <div className="bg-white rounded-lg shadow-lg">
// //               <div className="p-6 border-b border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
// //                     Insights Management
// //                   </h2>
// //                   <button
// //                     onClick={() => setShowAddInsightPanelModal(true)}
// //                     className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
// //                     style={{ backgroundColor: '#7cc6ee' }}
// //                   >
// //                     <Plus size={16} />
// //                     Add Insight Panel
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="p-6 space-y-4">
// //                 {Object.keys(insights).map((panelName) => (
// //                   <InsightPanelCard
// //                     key={panelName}
// //                     panelName={panelName}
// //                     panelData={insights[panelName]}
// //                     miData={miData}
// //                     onAddSubpanel={() => {
// //                       setSelectedInsightPanel(panelName);
// //                       setShowAddSubpanelModal(true);
// //                     }}
// //                     editingPanel={editingPanel}
// //                     setEditingPanel={setEditingPanel}
// //                     editPanelName={editPanelName}
// //                     setEditPanelName={setEditPanelName}
// //                     onEditPanel={handleEditPanel}
// //                     onDeletePanel={handleDeletePanel}
// //                     onDeleteSubpanel={handleDeleteSubpanel}
// //                     setShowEditSubpanelModal={setShowEditSubpanelModal}
// //                     setEditingSubpanelData={setEditingSubpanelData}
// //                   />
// //                 ))}
                
// //                 {Object.keys(insights).length === 0 && (
// //                   <div className="text-center py-8" style={{ color: '#334155' }}>
// //                     No insight panels yet. Add your first panel to get started.
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* JSON Preview Sidebar */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-lg shadow-lg sticky top-6">
// //               <div className="p-4 border-b border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <h3 className="font-semibold" style={{ color: '#1e2556' }}>
// //                     JSON Preview
// //                   </h3>
// //                   <button
// //                     onClick={() => setShowJsonPreview(!showJsonPreview)}
// //                     className="p-2 rounded-lg transition-colors"
// //                     style={{ backgroundColor: '#f5f7fa' }}
// //                   >
// //                     {showJsonPreview ? <EyeOff size={16} /> : <Eye size={16} />}
// //                   </button>
// //                 </div>
// //               </div>
              
// //               {showJsonPreview && (
// //                 <div className="p-4">
// //                   <pre className="text-xs overflow-auto max-h-96 bg-gray-50 p-3 rounded-lg">
// //                     {JSON.stringify(jsonPreview, null, 2)}
// //                   </pre>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modals */}
// //       <AddCategoryModal
// //         show={showAddCategoryModal}
// //         onClose={() => setShowAddCategoryModal(false)}
// //         value={newCategoryName}
// //         onChange={setNewCategoryName}
// //         onAdd={handleAddCategory}
// //       />

// //       <AddCollectionModal
// //         show={showAddCollectionModal}
// //         onClose={() => setShowAddCollectionModal(false)}
// //         value={newCollectionName}
// //         onChange={setNewCollectionName}
// //         onAdd={handleAddCollection}
// //         categoryName={selectedCategory}
// //       />

// //       <AddInsightPanelModal
// //         show={showAddInsightPanelModal}
// //         onClose={() => setShowAddInsightPanelModal(false)}
// //         value={newInsightPanelName}
// //         onChange={setNewInsightPanelName}
// //         onAdd={handleAddInsightPanel}
// //       />

// //       <AddSubpanelModal
// //         show={showAddSubpanelModal}
// //         onClose={() => setShowAddSubpanelModal(false)}
// //         subpanelData={newSubpanelData}
// //         setSubpanelData={setNewSubpanelData}
// //         miData={miData}
// //         availableFields={availableFields}
// //         onAdd={handleAddSubpanel}
// //       />

// //       <EditSubpanelModal
// //         show={showEditSubpanelModal}
// //         onClose={() => setShowEditSubpanelModal(false)}
// //         editingData={editingSubpanelData}
// //         miData={miData}
// //         availableFields={availableFields}
// //         insights={insights}
// //         setInsights={setInsights}
// //       />
// //     </div>
// //   );
// // };

// // // Category Card Component
// // const CategoryCard = ({ 
// //   categoryName, 
// //   categoryData, 
// //   expanded, 
// //   onToggle, 
// //   onFileUpload, 
// //   onAddLink, 
// //   onDeleteFile, 
// //   onDeleteCollection, 
// //   onDeleteCategory, 
// //   onAddCollection,
// //   uploadLoading,
// //   editingCategory,
// //   setEditingCategory,
// //   editCategoryName,
// //   setEditCategoryName,
// //   onEditCategory
// // }) => {
// //   const handleEditClick = () => {
// //     setEditingCategory(categoryName);
// //     setEditCategoryName(categoryName);
// //   };

// //   const handleEditSubmit = () => {
// //     onEditCategory(editCategoryName);
// //   };

// //   return (
// //     <div className="border border-gray-200 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
// //       <div className="p-4 border-b border-gray-100">
// //         <div className="flex justify-between items-center">
// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={onToggle}
// //               className="text-gray-600 hover:text-gray-800"
// //             >
// //               {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
// //             </button>
            
// //             {editingCategory === categoryName ? (
// //               <div className="flex items-center gap-2">
// //                 <input
// //                   type="text"
// //                   value={editCategoryName}
// //                   onChange={(e) => setEditCategoryName(e.target.value)}
// //                   className="p-1 border rounded text-sm"
// //                   style={{ color: '#1e2556' }}
// //                 />
// //                 <button
// //                   onClick={handleEditSubmit}
// //                   className="px-2 py-1 text-white rounded text-sm"
// //                   style={{ backgroundColor: '#7cc6ee' }}
// //                 >
// //                   Save
// //                 </button>
// //                 <button
// //                   onClick={() => setEditingCategory(null)}
// //                   className="px-2 py-1 border rounded text-sm"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             ) : (
// //               <>
// //                 <h3 className="font-semibold" style={{ color: '#1e2556' }}>
// //                   {categoryName}
// //                 </h3>
// //                 <button
// //                   onClick={handleEditClick}
// //                   className="text-gray-600 hover:text-gray-800 ml-2"
// //                   title="Edit Category"
// //                 >
// //                   <Edit3 size={14} />
// //                 </button>
// //               </>
// //             )}
// //           </div>
          
// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={onAddCollection}
// //               className="text-sm px-3 py-1 text-white rounded"
// //               style={{ backgroundColor: '#7cc6ee' }}
// //             >
// //               <Plus size={14} />
// //             </button>
// //             <button
// //               onClick={onDeleteCategory}
// //               className="text-red-500 hover:text-red-700"
// //               title="Delete Category"
// //             >
// //               <Trash2 size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {expanded && (
// //         <div className="p-4 space-y-3">
// //           {Object.keys(categoryData).map((collectionName) => (
// //             <DatabaseCollectionCard
// //               key={collectionName}
// //               collectionName={collectionName}
// //               miData={categoryData[collectionName] || { pdflinks: [], articlelinks: [], fileNames: {} }}
// //               onFileUpload={(file, type) => onFileUpload(file, type, collectionName)}
// //               onAddLink={(url, name) => onAddLink(collectionName, url, name)}
// //               onDeleteFile={(url, type) => onDeleteFile(collectionName, url, type)}
// //               onDeleteCollection={() => onDeleteCollection(collectionName)}
// //               uploadLoading={uploadLoading}
// //             />
// //           ))}
          
// //           {Object.keys(categoryData).length === 0 && (
// //             <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
// //               No collections in this category. Add your first collection.
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // Database Collection Card Component
// // const DatabaseCollectionCard = ({ collectionName, miData, onFileUpload, onAddLink, onDeleteFile, onDeleteCollection, uploadLoading }) => {
// //   const [newLinkUrl, setNewLinkUrl] = useState('');
// //   const [newLinkName, setNewLinkName] = useState('');
// //   const [showAddLink, setShowAddLink] = useState(false);

// //   const handleLinkSubmit = () => {
// //     if (newLinkUrl.trim()) {
// //       onAddLink(newLinkUrl, newLinkName.trim() || newLinkUrl);
// //       setNewLinkUrl('');
// //       setNewLinkName('');
// //       setShowAddLink(false);
// //     }
// //   };

// //   const getFileName = (url) => {
// //     return miData.fileNames?.[url] || url.split('/').pop() || 'Unknown File';
// //   };

// //   return (
// //     <div className="border border-gray-200 rounded-lg p-3 bg-white">
// //       <div className="flex justify-between items-center mb-3">
// //         <h4 className="font-medium" style={{ color: '#334155' }}>
// //           {collectionName}
// //         </h4>
// //         <button
// //           onClick={onDeleteCollection}
// //           className="text-red-500 hover:text-red-700 p-1"
// //           title="Delete Collection"
// //         >
// //           <Trash2 size={14} />
// //         </button>
// //       </div>
      
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //         {/* File Upload */}
// //         <div>
// //           <h5 className="font-medium mb-2 text-sm" style={{ color: '#334155' }}>
// //             Upload Documents
// //           </h5>
// //           <input
// //             type="file"
// //             accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
// //             onChange={(e) => {
// //               const file = e.target.files[0];
// //               if (file) {
// //                 const type = file.type === 'application/pdf' ? 'pdf' : 'document';
// //                 onFileUpload(file, type);
// //               }
// //             }}
// //             className="w-full text-xs"
// //             disabled={uploadLoading}
// //           />
          
// //           {/* Display uploaded files */}
// //           <div className="mt-2 space-y-1">
// //             {(miData.pdflinks || []).length > 0 && (
// //               <div>
// //                 <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>PDF Files:</div>
// //                 {(miData.pdflinks || []).map((url, index) => (
// //                   <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border">
// //                     <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
// //                       {getFileName(url)}
// //                     </a>
// //                     <button
// //                       onClick={() => onDeleteFile(url, 'pdf')}
// //                       className="text-red-500 hover:text-red-700 ml-2"
// //                       title="Delete File"
// //                     >
// //                       <Trash2 size={10} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
            
// //             {(miData.articlelinks || []).length > 0 && (
// //               <div>
// //                 <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>Article Links:</div>
// //                 {(miData.articlelinks || []).map((url, index) => (
// //                   <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border">
// //                     <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
// //                       {getFileName(url)}
// //                     </a>
// //                     <button
// //                       onClick={() => onDeleteFile(url, 'article')}
// //                       className="text-red-500 hover:text-red-700 ml-2"
// //                       title="Delete Link"
// //                     >
// //                       <Trash2 size={10} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Link Management */}
// //         <div>
// //           <div className="flex justify-between items-center mb-2">
// //             <h5 className="font-medium text-sm" style={{ color: '#334155' }}>
// //               Add Links
// //             </h5>
// //             <button
// //               onClick={() => setShowAddLink(!showAddLink)}
// //               className="text-sm px-2 py-1 rounded text-white"
// //               style={{ backgroundColor: '#7cc6ee' }}
// //             >
// //               <Plus size={12} />
// //             </button>
// //           </div>
          
// //           {showAddLink && (
// //             <div className="space-y-2">
// //               <input
// //                 type="url"
// //                 placeholder="Enter URL"
// //                 value={newLinkUrl}
// //                 onChange={(e) => setNewLinkUrl(e.target.value)}
// //                 className="w-full p-2 border rounded text-xs"
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Display Name (optional)"
// //                 value={newLinkName}
// //                 onChange={(e) => setNewLinkName(e.target.value)}
// //                 className="w-full p-2 border rounded text-xs"
// //               />
// //               <button
// //                 onClick={handleLinkSubmit}
// //                 className="w-full py-2 text-white rounded text-xs"
// //                 style={{ backgroundColor: '#1e2556' }}
// //               >
// //                 Add Link
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Insight Panel Card Component
// // const InsightPanelCard = ({ 
// //   panelName, 
// //   panelData, 
// //   miData, 
// //   onAddSubpanel,
// //   editingPanel,
// //   setEditingPanel,
// //   editPanelName,
// //   setEditPanelName,
// //   onEditPanel,
// //   onDeletePanel,
// //   onDeleteSubpanel,
// //   setShowEditSubpanelModal,
// //   setEditingSubpanelData
// // }) => {
// //   // Filter out system fields to get actual subpanels
// //   const subpanels = Object.entries(panelData).filter(([key, value]) => 
// //     typeof value === 'object' && value.database !== undefined
// //   );

// //   const handleEditClick = () => {
// //     setEditingPanel(panelName);
// //     setEditPanelName(panelName);
// //   };

// //   const handleEditSubmit = () => {
// //     onEditPanel(panelName, editPanelName);
// //   };

// //   const handleEditSubpanelClick = (subpanelName, subpanelData) => {
// //     setEditingSubpanelData({
// //       panelName,
// //       subpanelName,
// //       data: subpanelData
// //     });
// //     setShowEditSubpanelModal(true);
// //   };

// //   return (
// //     <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
// //       <div className="flex justify-between items-center mb-4">
// //         {editingPanel === panelName ? (
// //           <div className="flex items-center gap-2 flex-1">
// //             <input
// //               type="text"
// //               value={editPanelName}
// //               onChange={(e) => setEditPanelName(e.target.value)}
// //               className="flex-1 p-1 border rounded text-sm"
// //               style={{ color: '#1e2556' }}
// //             />
// //             <button
// //               onClick={handleEditSubmit}
// //               className="px-2 py-1 text-white rounded text-sm"
// //               style={{ backgroundColor: '#7cc6ee' }}
// //             >
// //               Save
// //             </button>
// //             <button
// //               onClick={() => setEditingPanel(null)}
// //               className="px-2 py-1 border rounded text-sm"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         ) : (
// //           <>
// //             <h3 className="font-semibold" style={{ color: '#1e2556' }}>
// //               {panelName}
// //             </h3>
// //             <div className="flex items-center gap-2">
// //               <button
// //                 onClick={handleEditClick}
// //                 className="text-gray-600 hover:text-gray-800"
// //                 title="Edit Panel"
// //               >
// //                 <Edit3 size={14} />
// //               </button>
// //               <button
// //                 onClick={() => onDeletePanel(panelName)}
// //                 className="text-red-500 hover:text-red-700"
// //                 title="Delete Panel"
// //               >
// //                 <Trash2 size={14} />
// //               </button>
// //               <button
// //                 onClick={onAddSubpanel}
// //                 className="flex items-center gap-1 px-3 py-1 text-white rounded text-sm"
// //                 style={{ backgroundColor: '#7cc6ee' }}
// //               >
// //                 <Plus size={14} />
// //                 Add Subpanel
// //               </button>
// //             </div>
// //           </>
// //         )}
// //       </div>
      
// //       <div className="space-y-3">
// //         {subpanels.map(([subpanelName, subpanelData]) => (
// //           <div key={subpanelName} className="bg-white p-3 rounded border">
// //             <div className="flex justify-between items-start mb-2">
// //               <h4 className="font-medium" style={{ color: '#334155' }}>
// //                 {subpanelName}
// //               </h4>
// //               <div className="flex items-center gap-1">
// //                 <button
// //                   onClick={() => handleEditSubpanelClick(subpanelName, subpanelData)}
// //                   className="text-gray-600 hover:text-gray-800"
// //                   title="Edit Subpanel"
// //                 >
// //                   <Edit3 size={12} />
// //                 </button>
// //                 <button
// //                   onClick={() => onDeleteSubpanel(panelName, subpanelName)}
// //                   className="text-red-500 hover:text-red-700"
// //                   title="Delete Subpanel"
// //                 >
// //                   <Trash2 size={12} />
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="text-xs space-y-1" style={{ color: '#2d2d2d' }}>
// //               <div>Database: {Object.keys(subpanelData.database || {}).length} categories selected</div>
// //               <div>Graph Type: {subpanelData.graph?.type}</div>
// //               <div>Content Type: {subpanelData.content?.type}</div>
// //               <div>Insights Type: {subpanelData.insights?.type}</div>
// //               <div>Graph Fields: {subpanelData.graph?.fields?.length || 0} selected</div>
// //               <div>Content Fields: {subpanelData.content?.fields?.length || 0} selected</div>
// //               <div>Insights Fields: {subpanelData.insights?.fields?.length || 0} selected</div>
// //             </div>
// //           </div>
// //         ))}
        
// //         {subpanels.length === 0 && (
// //           <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
// //             No subpanels yet. Add your first subpanel.
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // Field Selector Component for tabular selection
// // const FieldSelector = ({ selectedFields, onFieldChange, availableFields, label }) => {
// //   const toggleField = (fieldValue) => {
// //     const newFields = selectedFields.includes(fieldValue)
// //       ? selectedFields.filter(f => f !== fieldValue)
// //       : [...selectedFields, fieldValue];
// //     onFieldChange(newFields);
// //   };

// //   return (
// //     <div>
// //       <label className="block text-sm mb-2" style={{ color: '#334155' }}>{label}</label>
// //       <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
// //         <div className="grid grid-cols-2 gap-2">
// //           {availableFields.map(field => (
// //             <div
// //               key={field.value}
// //               onClick={() => toggleField(field.value)}
// //               className={`p-2 rounded cursor-pointer border text-xs transition-colors ${
// //                 selectedFields.includes(field.value)
// //                   ? 'text-white border-blue-500'
// //                   : 'bg-white border-gray-200 hover:bg-gray-50'
// //               }`}
// //               style={selectedFields.includes(field.value) ? { backgroundColor: '#7cc6ee' } : {}}
// //             >
// //               {field.label}
// //             </div>
// //           ))}
// //         </div>
// //         <div className="text-xs text-gray-500 mt-2">
// //           {selectedFields.length} field(s) selected
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Database Selector Component for category/collection selection
// // const DatabaseSelector = ({ selectedDatabase, onDatabaseChange, miData }) => {
// //   const [expandedCategories, setExpandedCategories] = useState({});

// //   const toggleCategory = (categoryName) => {
// //     setExpandedCategories(prev => ({
// //       ...prev,
// //       [categoryName]: !prev[categoryName]
// //     }));
// //   };

// //   const toggleCategorySelection = (categoryName) => {
// //     const newDatabase = { ...selectedDatabase };
// //     const collections = Object.keys(miData[categoryName] || {});
    
// //     if (newDatabase[categoryName] && newDatabase[categoryName].length === collections.length) {
// //       // All selected, deselect all
// //       delete newDatabase[categoryName];
// //     } else {
// //       // Select all
// //       newDatabase[categoryName] = collections;
// //     }
    
// //     onDatabaseChange(newDatabase);
// //   };

// //   const toggleCollectionSelection = (categoryName, collectionName) => {
// //     const newDatabase = { ...selectedDatabase };
    
// //     if (!newDatabase[categoryName]) {
// //       newDatabase[categoryName] = [];
// //     }
    
// //     if (newDatabase[categoryName].includes(collectionName)) {
// //       newDatabase[categoryName] = newDatabase[categoryName].filter(c => c !== collectionName);
// //       if (newDatabase[categoryName].length === 0) {
// //         delete newDatabase[categoryName];
// //       }
// //     } else {
// //       newDatabase[categoryName].push(collectionName);
// //     }
    
// //     onDatabaseChange(newDatabase);
// //   };

// //   return (
// //     <div>
// //       <label className="block text-sm mb-2" style={{ color: '#334155' }}>Database Selection</label>
// //       <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">
// //         {Object.keys(miData).map(categoryName => {
// //           const collections = Object.keys(miData[categoryName] || {});
// //           const selectedCollections = selectedDatabase[categoryName] || [];
// //           const allSelected = selectedCollections.length === collections.length && collections.length > 0;
// //           const someSelected = selectedCollections.length > 0;
          
// //           return (
// //             <div key={categoryName} className="mb-2">
// //               <div className="flex items-center gap-2 mb-1">
// //                 <button
// //                   onClick={() => toggleCategory(categoryName)}
// //                   className="text-gray-600 hover:text-gray-800"
// //                 >
// //                   {expandedCategories[categoryName] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
// //                 </button>
// //                 <div
// //                   onClick={() => toggleCategorySelection(categoryName)}
// //                   className={`p-2 rounded cursor-pointer border text-xs transition-colors flex-1 ${
// //                     allSelected
// //                       ? 'text-white border-blue-500'
// //                       : someSelected
// //                       ? 'border-blue-300 bg-blue-50'
// //                       : 'bg-white border-gray-200 hover:bg-gray-50'
// //                   }`}
// //                   style={allSelected ? { backgroundColor: '#7cc6ee' } : {}}
// //                 >
// //                   {categoryName} ({selectedCollections.length}/{collections.length})
// //                 </div>
// //               </div>
              
// //               {expandedCategories[categoryName] && (
// //                 <div className="ml-6 space-y-1">
// //                   {collections.map(collectionName => (
// //                     <div
// //                       key={collectionName}
// //                       onClick={() => toggleCollectionSelection(categoryName, collectionName)}
// //                       className={`p-2 rounded cursor-pointer border text-xs transition-colors ${
// //                         selectedCollections.includes(collectionName)
// //                           ? 'text-white border-blue-500'
// //                           : 'bg-white border-gray-200 hover:bg-gray-50'
// //                       }`}
// //                       style={selectedCollections.includes(collectionName) ? { backgroundColor: '#7cc6ee' } : {}}
// //                     >
// //                       {collectionName}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}
// //         <div className="text-xs text-gray-500 mt-2">
// //           {Object.values(selectedDatabase).flat().length} collection(s) selected
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Modal Components
// // const AddCategoryModal = ({ show, onClose, value, onChange, onAdd }) => {
// //   if (!show) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 w-96">
// //         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
// //           Add Category
// //         </h3>
// //         <input
// //           type="text"
// //           placeholder="Category Name"
// //           value={value}
// //           onChange={(e) => onChange(e.target.value)}
// //           className="w-full p-3 border rounded-lg mb-4"
// //         />
// //         <div className="flex gap-3">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 py-2 border border-gray-300 rounded-lg"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onAdd}
// //             className="flex-1 py-2 text-white rounded-lg"
// //             style={{ backgroundColor: '#1e2556' }}
// //           >
// //             Add Category
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const AddCollectionModal = ({ show, onClose, value, onChange, onAdd, categoryName }) => {
// //   if (!show) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 w-96">
// //         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
// //           Add Collection to {categoryName}
// //         </h3>
// //         <input
// //           type="text"
// //           placeholder="Collection Name"
// //           value={value}
// //           onChange={(e) => onChange(e.target.value)}
// //           className="w-full p-3 border rounded-lg mb-4"
// //         />
// //         <div className="flex gap-3">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 py-2 border border-gray-300 rounded-lg"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onAdd}
// //             className="flex-1 py-2 text-white rounded-lg"
// //             style={{ backgroundColor: '#1e2556' }}
// //           >
// //             Add Collection
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const AddInsightPanelModal = ({ show, onClose, value, onChange, onAdd }) => {
// //   if (!show) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 w-96">
// //         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
// //           Add Insight Panel
// //         </h3>
// //         <input
// //           type="text"
// //           placeholder="Panel Name (e.g., Competitive Intel)"
// //           value={value}
// //           onChange={(e) => onChange(e.target.value)}
// //           className="w-full p-3 border rounded-lg mb-4"
// //         />
// //         <div className="flex gap-3">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 py-2 border border-gray-300 rounded-lg"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onAdd}
// //             className="flex-1 py-2 text-white rounded-lg"
// //             style={{ backgroundColor: '#1e2556' }}
// //           >
// //             Add Panel
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const AddSubpanelModal = ({ show, onClose, subpanelData, setSubpanelData, miData, availableFields, onAdd }) => {
// //   if (!show) return null;

// //   const graphTypes = [
// //     { value: 'bar', label: 'Vertical Bar Chart' },
// //     { value: 'horizontal-bar', label: 'Horizontal Bar Chart' },
// //     { value: 'line', label: 'Line Chart' },
// //     { value: 'pie', label: 'Pie Chart' },
// //     { value: 'scatter', label: 'Scatter Plot' },
// //     { value: 'area', label: 'Area Chart' }
// //   ];

// //   const contentTypes = [
// //     { value: 'point', label: 'Points' },
// //     { value: 'para', label: 'Paragraph' }
// //   ];

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
// //       <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 my-8">
// //         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
// //           Add Subpanel
// //         </h3>
        
// //         <div className="space-y-6 max-h-96 overflow-y-auto">
// //           {/* Basic Info */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
// //                 Subpanel Name
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g., Key Feature Types"
// //                 value={subpanelData.name}
// //                 onChange={(e) => setSubpanelData({ ...subpanelData, name: e.target.value })}
// //                 className="w-full p-2 border rounded-lg"
// //               />
// //             </div>
// //           </div>

// //           {/* Database Selection */}
// //           <div>
// //             <DatabaseSelector
// //               selectedDatabase={subpanelData.database}
// //               onDatabaseChange={(database) => setSubpanelData({ ...subpanelData, database })}
// //               miData={miData}
// //             />
// //           </div>

// //           {/* Graph Section */}
// //           <div className="border-t pt-4">
// //             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
// //                 <input
// //                   type="text"
// //                   value={subpanelData.graph.heading}
// //                   onChange={(e) => setSubpanelData({
// //                     ...subpanelData,
// //                     graph: { ...subpanelData.graph, heading: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Type</label>
// //                 <select
// //                   value={subpanelData.graph.type}
// //                   onChange={(e) => setSubpanelData({
// //                     ...subpanelData,
// //                     graph: { ...subpanelData.graph, type: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 >
// //                   <option value="">Select Type</option>
// //                   {graphTypes.map(type => (
// //                     <option key={type.value} value={type.value}>{type.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
// //               <textarea
// //                 value={subpanelData.graph.prompt}
// //                 onChange={(e) => setSubpanelData({
// //                   ...subpanelData,
// //                   graph: { ...subpanelData.graph, prompt: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //               />
// //             </div>

// //             <FieldSelector
// //               selectedFields={subpanelData.graph.fields}
// //               onFieldChange={(fields) => setSubpanelData({
// //                 ...subpanelData,
// //                 graph: { ...subpanelData.graph, fields }
// //               })}
// //               availableFields={availableFields}
// //               label="Graph Database Fields"
// //             />
// //           </div>

// //           {/* Content Section */}
// //           <div className="border-t pt-4">
// //             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
// //                 <input
// //                   type="text"
// //                   value={subpanelData.content.heading}
// //                   onChange={(e) => setSubpanelData({
// //                     ...subpanelData,
// //                     content: { ...subpanelData.content, heading: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
// //                 <select
// //                   value={subpanelData.content.type}
// //                   onChange={(e) => setSubpanelData({
// //                     ...subpanelData,
// //                     content: { ...subpanelData.content, type: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 >
// //                   {contentTypes.map(type => (
// //                     <option key={type.value} value={type.value}>{type.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
// //               <textarea
// //                 value={subpanelData.content.prompt}
// //                 onChange={(e) => setSubpanelData({
// //                   ...subpanelData,
// //                   content: { ...subpanelData.content, prompt: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //               />
// //             </div>

// //             <FieldSelector
// //               selectedFields={subpanelData.content.fields}
// //               onFieldChange={(fields) => setSubpanelData({
// //                 ...subpanelData,
// //                 content: { ...subpanelData.content, fields }
// //               })}
// //               availableFields={availableFields}
// //               label="Content Database Fields"
// //             />
// //           </div>

// //           {/* Insights Section */}
// //           <div className="border-t pt-4">
// //             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
// //                 <input
// //                   type="text"
// //                   value={subpanelData.insights.heading}
// //                   onChange={(e) => setSubpanelData({
// //                     ...subpanelData,
// //                     insights: { ...subpanelData.insights, heading: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
// //                 <select
// //                   value={subpanelData.insights.type}
// //                   onChange={(e) => setSubpanelData({
// //                     ...subpanelData,
// //                     insights: { ...subpanelData.insights, type: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 >
// //                   {contentTypes.map(type => (
// //                     <option key={type.value} value={type.value}>{type.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
// //               <textarea
// //                 value={subpanelData.insights.prompt}
// //                 onChange={(e) => setSubpanelData({
// //                   ...subpanelData,
// //                   insights: { ...subpanelData.insights, prompt: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //               />
// //             </div>

// //             <FieldSelector
// //               selectedFields={subpanelData.insights.fields}
// //               onFieldChange={(fields) => setSubpanelData({
// //                 ...subpanelData,
// //                 insights: { ...subpanelData.insights, fields }
// //               })}
// //               availableFields={availableFields}
// //               label="Insights Database Fields"
// //             />
// //           </div>
// //         </div>

// //         <div className="flex gap-3 mt-6 pt-4 border-t">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 py-2 border border-gray-300 rounded-lg"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onAdd}
// //             className="flex-1 py-2 text-white rounded-lg"
// //             style={{ backgroundColor: '#1e2556' }}
// //           >
// //             Add Subpanel
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Edit Subpanel Modal Component
// // const EditSubpanelModal = ({ show, onClose, editingData, miData, availableFields, insights, setInsights }) => {
// //   const [localData, setLocalData] = useState({
// //     name: '',
// //     database: {},
// //     graph: { prompt: '', type: '', heading: '', fields: [], response: '' },
// //     content: { prompt: '', type: 'para', heading: '', fields: [], response: '' },
// //     insights: { prompt: '', type: 'para', heading: '', fields: [], response: '' }
// //   });

// //   useEffect(() => {
// //     if (editingData) {
// //       setLocalData({
// //         name: editingData.subpanelName,
// //         database: editingData.data.database || {},
// //         graph: editingData.data.graph || { prompt: '', type: '', heading: '', fields: [], response: '' },
// //         content: editingData.data.content || { prompt: '', type: 'para', heading: '', fields: [], response: '' },
// //         insights: editingData.data.insights || { prompt: '', type: 'para', heading: '', fields: [], response: '' }
// //       });
// //     }
// //   }, [editingData]);

// //   const handleSave = () => {
// //     if (!editingData) return;

// //     const updatedInsights = { ...insights };
// //     const { panelName, subpanelName } = editingData;

// //     // If name changed, delete old and create new
// //     if (localData.name !== subpanelName) {
// //       delete updatedInsights[panelName][subpanelName];
// //     }

// //     updatedInsights[panelName][localData.name] = {
// //       database: localData.database,
// //       graph: localData.graph,
// //       content: localData.content,
// //       insights: localData.insights
// //     };

// //     setInsights(updatedInsights);
// //     onClose();
// //   };

// //   if (!show || !editingData) return null;

// //   const graphTypes = [
// //     { value: 'bar', label: 'Vertical Bar Chart' },
// //     { value: 'horizontal-bar', label: 'Horizontal Bar Chart' },
// //     { value: 'line', label: 'Line Chart' },
// //     { value: 'pie', label: 'Pie Chart' },
// //     { value: 'scatter', label: 'Scatter Plot' },
// //     { value: 'area', label: 'Area Chart' }
// //   ];

// //   const contentTypes = [
// //     { value: 'point', label: 'Points' },
// //     { value: 'para', label: 'Paragraph' }
// //   ];

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
// //       <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 my-8">
// //         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
// //           Edit Subpanel
// //         </h3>
        
// //         <div className="space-y-6 max-h-96 overflow-y-auto">
// //           {/* Basic Info */}
// //           <div>
// //             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
// //               Subpanel Name
// //             </label>
// //             <input
// //               type="text"
// //               value={localData.name}
// //               onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
// //               className="w-full p-2 border rounded-lg"
// //             />
// //           </div>

// //           {/* Database Selection */}
// //           <div>
// //             <DatabaseSelector
// //               selectedDatabase={localData.database}
// //               onDatabaseChange={(database) => setLocalData({ ...localData, database })}
// //               miData={miData}
// //             />
// //           </div>

// //           {/* Graph Section */}
// //           <div className="border-t pt-4">
// //             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
// //                 <input
// //                   type="text"
// //                   value={localData.graph.heading}
// //                   onChange={(e) => setLocalData({
// //                     ...localData,
// //                     graph: { ...localData.graph, heading: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Type</label>
// //                 <select
// //                   value={localData.graph.type}
// //                   onChange={(e) => setLocalData({
// //                     ...localData,
// //                     graph: { ...localData.graph, type: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 >
// //                   <option value="">Select Type</option>
// //                   {graphTypes.map(type => (
// //                     <option key={type.value} value={type.value}>{type.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
// //               <textarea
// //                 value={localData.graph.prompt}
// //                 onChange={(e) => setLocalData({
// //                   ...localData,
// //                   graph: { ...localData.graph, prompt: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //               />
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Response</label>
// //               <textarea
// //                 value={localData.graph.response}
// //                 onChange={(e) => setLocalData({
// //                   ...localData,
// //                   graph: { ...localData.graph, response: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //                 placeholder="AI generated response will appear here..."
// //               />
// //             </div>

// //             <FieldSelector
// //               selectedFields={localData.graph.fields}
// //               onFieldChange={(fields) => setLocalData({
// //                 ...localData,
// //                 graph: { ...localData.graph, fields }
// //               })}
// //               availableFields={availableFields}
// //               label="Graph Database Fields"
// //             />
// //           </div>

// //           {/* Content Section */}
// //           <div className="border-t pt-4">
// //             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
// //                 <input
// //                   type="text"
// //                   value={localData.content.heading}
// //                   onChange={(e) => setLocalData({
// //                     ...localData,
// //                     content: { ...localData.content, heading: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
// //                 <select
// //                   value={localData.content.type}
// //                   onChange={(e) => setLocalData({
// //                     ...localData,
// //                     content: { ...localData.content, type: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 >
// //                   {contentTypes.map(type => (
// //                     <option key={type.value} value={type.value}>{type.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
// //               <textarea
// //                 value={localData.content.prompt}
// //                 onChange={(e) => setLocalData({
// //                   ...localData,
// //                   content: { ...localData.content, prompt: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //               />
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Response</label>
// //               <textarea
// //                 value={localData.content.response}
// //                 onChange={(e) => setLocalData({
// //                   ...localData,
// //                   content: { ...localData.content, response: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //                 placeholder="AI generated response will appear here..."
// //               />
// //             </div>

// //             <FieldSelector
// //               selectedFields={localData.content.fields}
// //               onFieldChange={(fields) => setLocalData({
// //                 ...localData,
// //                 content: { ...localData.content, fields }
// //               })}
// //               availableFields={availableFields}
// //               label="Content Database Fields"
// //             />
// //           </div>

// //           {/* Insights Section */}
// //           <div className="border-t pt-4">
// //             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
// //                 <input
// //                   type="text"
// //                   value={localData.insights.heading}
// //                   onChange={(e) => setLocalData({
// //                     ...localData,
// //                     insights: { ...localData.insights, heading: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
// //                 <select
// //                   value={localData.insights.type}
// //                   onChange={(e) => setLocalData({
// //                     ...localData,
// //                     insights: { ...localData.insights, type: e.target.value }
// //                   })}
// //                   className="w-full p-2 border rounded text-sm"
// //                 >
// //                   {contentTypes.map(type => (
// //                     <option key={type.value} value={type.value}>{type.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
// //               <textarea
// //                 value={localData.insights.prompt}
// //                 onChange={(e) => setLocalData({
// //                   ...localData,
// //                   insights: { ...localData.insights, prompt: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //               />
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Response</label>
// //               <textarea
// //                 value={localData.insights.response}
// //                 onChange={(e) => setLocalData({
// //                   ...localData,
// //                   insights: { ...localData.insights, response: e.target.value }
// //                 })}
// //                 className="w-full p-2 border rounded text-sm"
// //                 rows="2"
// //                 placeholder="AI generated response will appear here..."
// //               />
// //             </div>

// //             <FieldSelector
// //               selectedFields={localData.insights.fields}
// //               onFieldChange={(fields) => setLocalData({
// //                 ...localData,
// //                 insights: { ...localData.insights, fields }
// //               })}
// //               availableFields={availableFields}
// //               label="Insights Database Fields"
// //             />
// //           </div>
// //         </div>

// //         <div className="flex gap-3 mt-6 pt-4 border-t">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 py-2 border border-gray-300 rounded-lg"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSave}
// //             className="flex-1 py-2 text-white rounded-lg"
// //             style={{ backgroundColor: '#1e2556' }}
// //           >
// //             Save Changes
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MarketIntelligenceDashboard;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Plus, Upload, Link, Save, Edit3, Trash2, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';

// const MarketIntelligenceDashboard = () => {
//   const [marketData, setMarketData] = useState(null);
//   const [dashboardData, setDashboardData] = useState({});
//   const [insights, setInsights] = useState({});
//   const [miData, setMiData] = useState({});
//   const [showJsonPreview, setShowJsonPreview] = useState(true);
//   const [availableFields, setAvailableFields] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [analyzeLoading, setAnalyzeLoading] = useState(false);
//   const [uploadLoading, setUploadLoading] = useState(false);
  
//   // Edit states
//   const [editingPanel, setEditingPanel] = useState(null);
//   const [editingSubpanel, setEditingSubpanel] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [editingCollection, setEditingCollection] = useState(null);
//   const [editPanelName, setEditPanelName] = useState('');
//   const [editSubpanelName, setEditSubpanelName] = useState('');
//   const [editCategoryName, setEditCategoryName] = useState('');
//   const [editCollectionName, setEditCollectionName] = useState('');

//   // Modals
//   const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
//   const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
//   const [showAddInsightPanelModal, setShowAddInsightPanelModal] = useState(false);
//   const [showAddSubpanelModal, setShowAddSubpanelModal] = useState(false);
//   const [showEditSubpanelModal, setShowEditSubpanelModal] = useState(false);
//   const [selectedInsightPanel, setSelectedInsightPanel] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [editingSubpanelData, setEditingSubpanelData] = useState(null);

//   // Form states
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [newCollectionName, setNewCollectionName] = useState('');
//   const [newInsightPanelName, setNewInsightPanelName] = useState('');
//   const [newSubpanelData, setNewSubpanelData] = useState({
//     name: '',
//     database: {},
//     prompt: '',
//     fields: [],
//     graph: { type: '', response: '' },
//     content: { response: '' },
//     insights: { response: '' }
//   });

//   // Expanded states for categories
//   const [expandedCategories, setExpandedCategories] = useState({});

//   useEffect(() => {
//     fetchAvailableFields();
//     loadExistingData();
//   }, []);

//   const fetchAvailableFields = async () => {
//     try {
//       const response = await fetch('/api/legal-software/fields');
//       if (response.ok) {
//         const fields = await response.json();
//         setAvailableFields(fields);
//       }
//     } catch (error) {
//       console.error('Error fetching fields:', error);
//     }
//   };

//   const loadExistingData = async () => {
//     try {
//       const response = await fetch('/api/market-intelligence');
//       if (response.ok) {
//         const data = await response.json();
//         if (data.length > 0) {
//           const latest = data[0];
//           setMarketData(latest);
//           setDashboardData(latest.dashboardData || {});
//           setInsights(latest.insights || {});
          
//           // Convert old format to new category format if needed
//           const miDataConverted = latest.miData || {};
          
//           // If old format (no categories), wrap in a default category
//           if (Object.keys(miDataConverted).length > 0 && !hasCategories(miDataConverted)) {
//             const defaultCategory = 'Default Category';
//             miDataConverted[defaultCategory] = { ...miDataConverted };
//             Object.keys(miDataConverted).forEach(key => {
//               if (key !== defaultCategory) {
//                 delete miDataConverted[key];
//               }
//             });
//           }
          
//           // Ensure file names are handled
//           Object.keys(miDataConverted).forEach(categoryName => {
//             Object.keys(miDataConverted[categoryName]).forEach(collectionName => {
//               if (!miDataConverted[categoryName][collectionName].fileNames) {
//                 miDataConverted[categoryName][collectionName].fileNames = {};
//               }
//             });
//           });
          
//           setMiData(miDataConverted);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading existing data:', error);
//     }
//   };

//   const hasCategories = (data) => {
//     // Check if data has category structure
//     return Object.values(data).some(value => 
//       typeof value === 'object' && 
//       Object.values(value).some(subValue => 
//         typeof subValue === 'object' && 
//         (subValue.pdflinks || subValue.articlelinks)
//       )
//     );
//   };

//   const handleSaveToDatabase = async () => {
//     setLoading(true);
//     try {
//       // Clean miData before saving (remove fileNames)
//       const cleanMiData = {};
//       Object.keys(miData).forEach(categoryName => {
//         cleanMiData[categoryName] = {};
//         Object.keys(miData[categoryName]).forEach(collectionName => {
//           cleanMiData[categoryName][collectionName] = {
//             pdflinks: miData[categoryName][collectionName].pdflinks || [],
//             articlelinks: miData[categoryName][collectionName].articlelinks || []
//           };
//         });
//       });

//       const payload = {
//         dashboardData,
//         insights,
//         miData: cleanMiData
//       };

//       const method = marketData ? 'PUT' : 'POST';
//       const body = marketData ? { ...payload, id: marketData.id } : payload;

//       const response = await fetch('/api/market-intelligence', {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setMarketData(result);
//         alert('Data saved successfully!');
//       } else {
//         alert('Error saving data');
//       }
//     } catch (error) {
//       console.error('Error saving to database:', error);
//       alert('Error saving data');
//     }
//     setLoading(false);
//   };

//   const handleAnalyze = async () => {
//     setAnalyzeLoading(true);
//     try {
//       // Clean miData before sending (remove fileNames)
//       const cleanMiData = {};
//       Object.keys(miData).forEach(categoryName => {
//         cleanMiData[categoryName] = {};
//         Object.keys(miData[categoryName]).forEach(collectionName => {
//           cleanMiData[categoryName][collectionName] = {
//             pdflinks: miData[categoryName][collectionName].pdflinks || [],
//             articlelinks: miData[categoryName][collectionName].articlelinks || []
//           };
//         });
//       });

//       const payload = {
//         dashboardData,
//         insights,
//         miData: cleanMiData
//       };

//       const response = await fetch('/api/mi-analyse', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert('Analysis completed successfully!');
//         console.log('Analysis result:', result);
//       } else {
//         alert('Error during analysis');
//       }
//     } catch (error) {
//       console.error('Error during analysis:', error);
//       alert('Error during analysis');
//     }
//     setAnalyzeLoading(false);
//   };

//   const handleFileUpload = async (file, type, categoryName, collectionName) => {
//     setUploadLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('document', file);
//       formData.append('type', type);

//       const response = await fetch('/api/upload-document', {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         const result = await response.json();
        
//         const updatedMiData = { ...miData };
//         if (!updatedMiData[categoryName]) {
//           updatedMiData[categoryName] = {};
//         }
//         if (!updatedMiData[categoryName][collectionName]) {
//           updatedMiData[categoryName][collectionName] = { 
//             pdflinks: [], 
//             articlelinks: [],
//             fileNames: {}
//           };
//         }
        
//         const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
//         if (!updatedMiData[categoryName][collectionName][linkType]) {
//           updatedMiData[categoryName][collectionName][linkType] = [];
//         }
//         if (!updatedMiData[categoryName][collectionName].fileNames) {
//           updatedMiData[categoryName][collectionName].fileNames = {};
//         }
        
//         updatedMiData[categoryName][collectionName][linkType].push(result.url);
//         updatedMiData[categoryName][collectionName].fileNames[result.url] = result.originalName;

//         setMiData(updatedMiData);
//         alert('File uploaded successfully!');
//       } else {
//         alert('Error uploading file');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Error uploading file');
//     }
//     setUploadLoading(false);
//   };

//   const handleAddLink = (categoryName, collectionName, url, name) => {
//     const updatedMiData = { ...miData };
//     if (!updatedMiData[categoryName]) {
//       updatedMiData[categoryName] = {};
//     }
//     if (!updatedMiData[categoryName][collectionName]) {
//       updatedMiData[categoryName][collectionName] = { 
//         pdflinks: [], 
//         articlelinks: [],
//         fileNames: {}
//       };
//     }
    
//     if (!updatedMiData[categoryName][collectionName].articlelinks) {
//       updatedMiData[categoryName][collectionName].articlelinks = [];
//     }
//     if (!updatedMiData[categoryName][collectionName].fileNames) {
//       updatedMiData[categoryName][collectionName].fileNames = {};
//     }
    
//     updatedMiData[categoryName][collectionName].articlelinks.push(url);
//     updatedMiData[categoryName][collectionName].fileNames[url] = name || url;

//     setMiData(updatedMiData);
//   };

//   const handleDeleteFile = (categoryName, collectionName, url, type) => {
//     const updatedMiData = { ...miData };
//     const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
    
//     updatedMiData[categoryName][collectionName][linkType] = 
//       updatedMiData[categoryName][collectionName][linkType].filter(link => link !== url);
    
//     delete updatedMiData[categoryName][collectionName].fileNames[url];
    
//     setMiData(updatedMiData);
//   };

//   const handleAddCategory = () => {
//     if (newCategoryName.trim()) {
//       const updatedDashboardData = { ...dashboardData };
//       if (!updatedDashboardData[newCategoryName]) {
//         updatedDashboardData[newCategoryName] = {};
//       }
//       setDashboardData(updatedDashboardData);
      
//       const updatedMiData = { ...miData };
//       if (!updatedMiData[newCategoryName]) {
//         updatedMiData[newCategoryName] = {};
//       }
//       setMiData(updatedMiData);
      
//       setNewCategoryName('');
//       setShowAddCategoryModal(false);
//     }
//   };

//   const handleAddCollection = () => {
//     if (newCollectionName.trim() && selectedCategory) {
//       const updatedDashboardData = { ...dashboardData };
//       if (!updatedDashboardData[selectedCategory]) {
//         updatedDashboardData[selectedCategory] = {};
//       }
//       updatedDashboardData[selectedCategory][newCollectionName] = {};
//       setDashboardData(updatedDashboardData);
      
//       const updatedMiData = { ...miData };
//       if (!updatedMiData[selectedCategory]) {
//         updatedMiData[selectedCategory] = {};
//       }
//       updatedMiData[selectedCategory][newCollectionName] = { 
//         pdflinks: [], 
//         articlelinks: [],
//         fileNames: {}
//       };
//       setMiData(updatedMiData);
      
//       setNewCollectionName('');
//       setShowAddCollectionModal(false);
//     }
//   };

//   const handleDeleteCategory = (categoryName) => {
//     const updatedDashboardData = { ...dashboardData };
//     const updatedMiData = { ...miData };
    
//     delete updatedDashboardData[categoryName];
//     delete updatedMiData[categoryName];
    
//     setDashboardData(updatedDashboardData);
//     setMiData(updatedMiData);
//   };

//   const handleDeleteCollection = (categoryName, collectionName) => {
//     const updatedDashboardData = { ...dashboardData };
//     const updatedMiData = { ...miData };
    
//     delete updatedDashboardData[categoryName][collectionName];
//     delete updatedMiData[categoryName][collectionName];
    
//     setDashboardData(updatedDashboardData);
//     setMiData(updatedMiData);
//   };

//   const handleAddInsightPanel = () => {
//     if (newInsightPanelName.trim()) {
//       const updatedInsights = { ...insights };
//       updatedInsights[newInsightPanelName] = {};
//       setInsights(updatedInsights);
//       setNewInsightPanelName('');
//       setShowAddInsightPanelModal(false);
//     }
//   };

//   const handleAddSubpanel = () => {
//     if (newSubpanelData.name.trim() && selectedInsightPanel) {
//       const updatedInsights = { ...insights };
//       updatedInsights[selectedInsightPanel][newSubpanelData.name] = {
//         database: newSubpanelData.database,
//         prompt: newSubpanelData.prompt,
//         fields: newSubpanelData.fields,
//         graph: newSubpanelData.graph,
//         content: newSubpanelData.content,
//         insights: newSubpanelData.insights
//       };
//       setInsights(updatedInsights);
      
//       // Reset form
//       setNewSubpanelData({
//         name: '',
//         database: {},
//         prompt: '',
//         fields: [],
//         graph: { type: '', response: '' },
//         content: { response: '' },
//         insights: { response: '' }
//       });
//       setShowAddSubpanelModal(false);
//     }
//   };

//   const handleEditPanel = (panelName, newName) => {
//     if (newName && newName !== panelName) {
//       const updatedInsights = { ...insights };
//       updatedInsights[newName] = updatedInsights[panelName];
//       delete updatedInsights[panelName];
//       setInsights(updatedInsights);
//     }
//     setEditingPanel(null);
//     setEditPanelName('');
//   };

//   const handleDeletePanel = (panelName) => {
//     const updatedInsights = { ...insights };
//     delete updatedInsights[panelName];
//     setInsights(updatedInsights);
//   };

//   const handleEditSubpanel = (panelName, subpanelName, newName) => {
//     if (newName && newName !== subpanelName) {
//       const updatedInsights = { ...insights };
//       updatedInsights[panelName][newName] = updatedInsights[panelName][subpanelName];
//       delete updatedInsights[panelName][subpanelName];
//       setInsights(updatedInsights);
//     }
//     setEditingSubpanel(null);
//     setEditSubpanelName('');
//   };

//   const handleDeleteSubpanel = (panelName, subpanelName) => {
//     const updatedInsights = { ...insights };
//     delete updatedInsights[panelName][subpanelName];
//     setInsights(updatedInsights);
//   };

//   const toggleCategory = (categoryName) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryName]: !prev[categoryName]
//     }));
//   };

//   const jsonPreview = {
//     dashboardData,
//     insights,
//     miData: Object.keys(miData).reduce((acc, categoryName) => {
//       acc[categoryName] = {};
//       Object.keys(miData[categoryName]).forEach(collectionName => {
//         acc[categoryName][collectionName] = {
//           pdflinks: miData[categoryName][collectionName].pdflinks || [],
//           articlelinks: miData[categoryName][collectionName].articlelinks || []
//         };
//       });
//       return acc;
//     }, {})
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
//             Market Intelligence Dashboard
//           </h1>
//           <div className="flex gap-3">
//             <button
//               onClick={handleAnalyze}
//               disabled={analyzeLoading}
//               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
//               style={{ backgroundColor: '#7cc6ee' }}
//             >
//               <Save size={20} />
//               {analyzeLoading ? 'Analyzing...' : 'Analyze'}
//             </button>
//             <button
//               onClick={handleSaveToDatabase}
//               disabled={loading}
//               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
//               style={{ backgroundColor: '#1e2556' }}
//             >
//               <Save size={20} />
//               {loading ? 'Saving...' : 'Save to Database'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Data Categories Section */}
//             <div className="bg-white rounded-lg shadow-lg">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
//                     Data Categories
//                   </h2>
//                   <button
//                     onClick={() => setShowAddCategoryModal(true)}
//                     className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//                     style={{ backgroundColor: '#7cc6ee' }}
//                   >
//                     <Plus size={16} />
//                     Add Category
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 {Object.keys(miData).map((categoryName) => (
//                   <CategoryCard
//                     key={categoryName}
//                     categoryName={categoryName}
//                     categoryData={miData[categoryName]}
//                     expanded={expandedCategories[categoryName]}
//                     onToggle={() => toggleCategory(categoryName)}
//                     onFileUpload={(file, type, collectionName) => handleFileUpload(file, type, categoryName, collectionName)}
//                     onAddLink={(collectionName, url, name) => handleAddLink(categoryName, collectionName, url, name)}
//                     onDeleteFile={(collectionName, url, type) => handleDeleteFile(categoryName, collectionName, url, type)}
//                     onDeleteCollection={(collectionName) => handleDeleteCollection(categoryName, collectionName)}
//                     onDeleteCategory={() => handleDeleteCategory(categoryName)}
//                     onAddCollection={() => {
//                       setSelectedCategory(categoryName);
//                       setShowAddCollectionModal(true);
//                     }}
//                     uploadLoading={uploadLoading}
//                     editingCategory={editingCategory}
//                     setEditingCategory={setEditingCategory}
//                     editCategoryName={editCategoryName}
//                     setEditCategoryName={setEditCategoryName}
//                     onEditCategory={(newName) => {
//                       if (newName && newName !== categoryName) {
//                         const updatedDashboardData = { ...dashboardData };
//                         const updatedMiData = { ...miData };
                        
//                         updatedDashboardData[newName] = updatedDashboardData[categoryName];
//                         updatedMiData[newName] = updatedMiData[categoryName];
                        
//                         delete updatedDashboardData[categoryName];
//                         delete updatedMiData[categoryName];
                        
//                         setDashboardData(updatedDashboardData);
//                         setMiData(updatedMiData);
//                       }
//                       setEditingCategory(null);
//                       setEditCategoryName('');
//                     }}
//                   />
//                 ))}
                
//                 {Object.keys(miData).length === 0 && (
//                   <div className="text-center py-8" style={{ color: '#334155' }}>
//                     No categories yet. Add your first category to get started.
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Insights Section */}
//             <div className="bg-white rounded-lg shadow-lg">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
//                     Insights Management
//                   </h2>
//                   <button
//                     onClick={() => setShowAddInsightPanelModal(true)}
//                     className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//                     style={{ backgroundColor: '#7cc6ee' }}
//                   >
//                     <Plus size={16} />
//                     Add Insight Panel
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 {Object.keys(insights).map((panelName) => (
//                   <InsightPanelCard
//                     key={panelName}
//                     panelName={panelName}
//                     panelData={insights[panelName]}
//                     miData={miData}
//                     onAddSubpanel={() => {
//                       setSelectedInsightPanel(panelName);
//                       setShowAddSubpanelModal(true);
//                     }}
//                     editingPanel={editingPanel}
//                     setEditingPanel={setEditingPanel}
//                     editPanelName={editPanelName}
//                     setEditPanelName={setEditPanelName}
//                     onEditPanel={handleEditPanel}
//                     onDeletePanel={handleDeletePanel}
//                     onDeleteSubpanel={handleDeleteSubpanel}
//                     setShowEditSubpanelModal={setShowEditSubpanelModal}
//                     setEditingSubpanelData={setEditingSubpanelData}
//                   />
//                 ))}
                
//                 {Object.keys(insights).length === 0 && (
//                   <div className="text-center py-8" style={{ color: '#334155' }}>
//                     No insight panels yet. Add your first panel to get started.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* JSON Preview Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-lg sticky top-6">
//               <div className="p-4 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold" style={{ color: '#1e2556' }}>
//                     JSON Preview
//                   </h3>
//                   <button
//                     onClick={() => setShowJsonPreview(!showJsonPreview)}
//                     className="p-2 rounded-lg transition-colors"
//                     style={{ backgroundColor: '#f5f7fa' }}
//                   >
//                     {showJsonPreview ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//               </div>
              
//               {showJsonPreview && (
//                 <div className="p-4">
//                   <pre className="text-xs overflow-auto max-h-96 bg-gray-50 p-3 rounded-lg">
//                     {JSON.stringify(jsonPreview, null, 2)}
//                   </pre>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <AddCategoryModal
//         show={showAddCategoryModal}
//         onClose={() => setShowAddCategoryModal(false)}
//         value={newCategoryName}
//         onChange={setNewCategoryName}
//         onAdd={handleAddCategory}
//       />

//       <AddCollectionModal
//         show={showAddCollectionModal}
//         onClose={() => setShowAddCollectionModal(false)}
//         value={newCollectionName}
//         onChange={setNewCollectionName}
//         onAdd={handleAddCollection}
//         categoryName={selectedCategory}
//       />

//       <AddInsightPanelModal
//         show={showAddInsightPanelModal}
//         onClose={() => setShowAddInsightPanelModal(false)}
//         value={newInsightPanelName}
//         onChange={setNewInsightPanelName}
//         onAdd={handleAddInsightPanel}
//       />

//       <AddSubpanelModal
//         show={showAddSubpanelModal}
//         onClose={() => setShowAddSubpanelModal(false)}
//         subpanelData={newSubpanelData}
//         setSubpanelData={setNewSubpanelData}
//         miData={miData}
//         availableFields={availableFields}
//         onAdd={handleAddSubpanel}
//       />

//       <EditSubpanelModal
//         show={showEditSubpanelModal}
//         onClose={() => setShowEditSubpanelModal(false)}
//         editingData={editingSubpanelData}
//         miData={miData}
//         availableFields={availableFields}
//         insights={insights}
//         setInsights={setInsights}
//       />
//     </div>
//   );
// };

// // Category Card Component
// const CategoryCard = ({ 
//   categoryName, 
//   categoryData, 
//   expanded, 
//   onToggle, 
//   onFileUpload, 
//   onAddLink, 
//   onDeleteFile, 
//   onDeleteCollection, 
//   onDeleteCategory, 
//   onAddCollection,
//   uploadLoading,
//   editingCategory,
//   setEditingCategory,
//   editCategoryName,
//   setEditCategoryName,
//   onEditCategory
// }) => {
//   const handleEditClick = () => {
//     setEditingCategory(categoryName);
//     setEditCategoryName(categoryName);
//   };

//   const handleEditSubmit = () => {
//     onEditCategory(editCategoryName);
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="p-4 border-b border-gray-100">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={onToggle}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//             </button>
            
//             {editingCategory === categoryName ? (
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={editCategoryName}
//                   onChange={(e) => setEditCategoryName(e.target.value)}
//                   className="p-1 border rounded text-sm"
//                   style={{ color: '#1e2556' }}
//                 />
//                 <button
//                   onClick={handleEditSubmit}
//                   className="px-2 py-1 text-white rounded text-sm"
//                   style={{ backgroundColor: '#7cc6ee' }}
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingCategory(null)}
//                   className="px-2 py-1 border rounded text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <h3 className="font-semibold" style={{ color: '#1e2556' }}>
//                   {categoryName}
//                 </h3>
//                 <button
//                   onClick={handleEditClick}
//                   className="text-gray-600 hover:text-gray-800 ml-2"
//                   title="Edit Category"
//                 >
//                   <Edit3 size={14} />
//                 </button>
//               </>
//             )}
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button
//               onClick={onAddCollection}
//               className="text-sm px-3 py-1 text-white rounded"
//               style={{ backgroundColor: '#7cc6ee' }}
//             >
//               <Plus size={14} />
//             </button>
//             <button
//               onClick={onDeleteCategory}
//               className="text-red-500 hover:text-red-700"
//               title="Delete Category"
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {expanded && (
//         <div className="p-4 space-y-3">
//           {Object.keys(categoryData).map((collectionName) => (
//             <DatabaseCollectionCard
//               key={collectionName}
//               collectionName={collectionName}
//               miData={categoryData[collectionName] || { pdflinks: [], articlelinks: [], fileNames: {} }}
//               onFileUpload={(file, type) => onFileUpload(file, type, collectionName)}
//               onAddLink={(url, name) => onAddLink(collectionName, url, name)}
//               onDeleteFile={(url, type) => onDeleteFile(collectionName, url, type)}
//               onDeleteCollection={() => onDeleteCollection(collectionName)}
//               uploadLoading={uploadLoading}
//             />
//           ))}
          
//           {Object.keys(categoryData).length === 0 && (
//             <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
//               No collections in this category. Add your first collection.
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Database Collection Card Component
// const DatabaseCollectionCard = ({ collectionName, miData, onFileUpload, onAddLink, onDeleteFile, onDeleteCollection, uploadLoading }) => {
//   const [newLinkUrl, setNewLinkUrl] = useState('');
//   const [newLinkName, setNewLinkName] = useState('');
//   const [showAddLink, setShowAddLink] = useState(false);

//   const handleLinkSubmit = () => {
//     if (newLinkUrl.trim()) {
//       onAddLink(newLinkUrl, newLinkName.trim() || newLinkUrl);
//       setNewLinkUrl('');
//       setNewLinkName('');
//       setShowAddLink(false);
//     }
//   };

//   const getFileName = (url) => {
//     return miData.fileNames?.[url] || url.split('/').pop() || 'Unknown File';
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg p-3 bg-white">
//       <div className="flex justify-between items-center mb-3">
//         <h4 className="font-medium" style={{ color: '#334155' }}>
//           {collectionName}
//         </h4>
//         <button
//           onClick={onDeleteCollection}
//           className="text-red-500 hover:text-red-700 p-1"
//           title="Delete Collection"
//         >
//           <Trash2 size={14} />
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         {/* File Upload */}
//         <div>
//           <h5 className="font-medium mb-2 text-sm" style={{ color: '#334155' }}>
//             Upload Documents
//           </h5>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               if (file) {
//                 const type = file.type === 'application/pdf' ? 'pdf' : 'document';
//                 onFileUpload(file, type);
//               }
//             }}
//             className="w-full text-xs"
//             disabled={uploadLoading}
//           />
          
//           {/* Display uploaded files */}
//           <div className="mt-2 space-y-1">
//             {(miData.pdflinks || []).length > 0 && (
//               <div>
//                 <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>PDF Files:</div>
//                 {(miData.pdflinks || []).map((url, index) => (
//                   <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border">
//                     <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
//                       {getFileName(url)}
//                     </a>
//                     <button
//                       onClick={() => onDeleteFile(url, 'pdf')}
//                       className="text-red-500 hover:text-red-700 ml-2"
//                       title="Delete File"
//                     >
//                       <Trash2 size={10} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {(miData.articlelinks || []).length > 0 && (
//               <div>
//                 <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>Article Links:</div>
//                 {(miData.articlelinks || []).map((url, index) => (
//                   <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border">
//                     <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
//                       {getFileName(url)}
//                     </a>
//                     <button
//                       onClick={() => onDeleteFile(url, 'article')}
//                       className="text-red-500 hover:text-red-700 ml-2"
//                       title="Delete Link"
//                     >
//                       <Trash2 size={10} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Link Management */}
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h5 className="font-medium text-sm" style={{ color: '#334155' }}>
//               Add Links
//             </h5>
//             <button
//               onClick={() => setShowAddLink(!showAddLink)}
//               className="text-sm px-2 py-1 rounded text-white"
//               style={{ backgroundColor: '#7cc6ee' }}
//             >
//               <Plus size={12} />
//             </button>
//           </div>
          
//           {showAddLink && (
//             <div className="space-y-2">
//               <input
//                 type="url"
//                 placeholder="Enter URL"
//                 value={newLinkUrl}
//                 onChange={(e) => setNewLinkUrl(e.target.value)}
//                 className="w-full p-2 border rounded text-xs"
//               />
//               <input
//                 type="text"
//                 placeholder="Display Name (optional)"
//                 value={newLinkName}
//                 onChange={(e) => setNewLinkName(e.target.value)}
//                 className="w-full p-2 border rounded text-xs"
//               />
//               <button
//                 onClick={handleLinkSubmit}
//                 className="w-full py-2 text-white rounded text-xs"
//                 style={{ backgroundColor: '#1e2556' }}
//               >
//                 Add Link
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Insight Panel Card Component
// const InsightPanelCard = ({ 
//   panelName, 
//   panelData, 
//   miData, 
//   onAddSubpanel,
//   editingPanel,
//   setEditingPanel,
//   editPanelName,
//   setEditPanelName,
//   onEditPanel,
//   onDeletePanel,
//   onDeleteSubpanel,
//   setShowEditSubpanelModal,
//   setEditingSubpanelData
// }) => {
//   // Filter out system fields to get actual subpanels
//   const subpanels = Object.entries(panelData).filter(([key, value]) => 
//     typeof value === 'object' && value.database !== undefined
//   );

//   const handleEditClick = () => {
//     setEditingPanel(panelName);
//     setEditPanelName(panelName);
//   };

//   const handleEditSubmit = () => {
//     onEditPanel(panelName, editPanelName);
//   };

//   const handleEditSubpanelClick = (subpanelName, subpanelData) => {
//     setEditingSubpanelData({
//       panelName,
//       subpanelName,
//       data: subpanelData
//     });
//     setShowEditSubpanelModal(true);
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="flex justify-between items-center mb-4">
//         {editingPanel === panelName ? (
//           <div className="flex items-center gap-2 flex-1">
//             <input
//               type="text"
//               value={editPanelName}
//               onChange={(e) => setEditPanelName(e.target.value)}
//               className="flex-1 p-1 border rounded text-sm"
//               style={{ color: '#1e2556' }}
//             />
//             <button
//               onClick={handleEditSubmit}
//               className="px-2 py-1 text-white rounded text-sm"
//               style={{ backgroundColor: '#7cc6ee' }}
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditingPanel(null)}
//               className="px-2 py-1 border rounded text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <>
//             <h3 className="font-semibold" style={{ color: '#1e2556' }}>
//               {panelName}
//             </h3>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleEditClick}
//                 className="text-gray-600 hover:text-gray-800"
//                 title="Edit Panel"
//               >
//                 <Edit3 size={14} />
//               </button>
//               <button
//                 onClick={() => onDeletePanel(panelName)}
//                 className="text-red-500 hover:text-red-700"
//                 title="Delete Panel"
//               >
//                 <Trash2 size={14} />
//               </button>
//               <button
//                 onClick={onAddSubpanel}
//                 className="flex items-center gap-1 px-3 py-1 text-white rounded text-sm"
//                 style={{ backgroundColor: '#7cc6ee' }}
//               >
//                 <Plus size={14} />
//                 Add Subpanel
//               </button>
//             </div>
//           </>
//         )}
//       </div>
      
//       <div className="space-y-3">
//         {subpanels.map(([subpanelName, subpanelData]) => (
//           <div key={subpanelName} className="bg-white p-3 rounded border">
//             <div className="flex justify-between items-start mb-2">
//               <h4 className="font-medium" style={{ color: '#334155' }}>
//                 {subpanelName}
//               </h4>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => handleEditSubpanelClick(subpanelName, subpanelData)}
//                   className="text-gray-600 hover:text-gray-800"
//                   title="Edit Subpanel"
//                 >
//                   <Edit3 size={12} />
//                 </button>
//                 <button
//                   onClick={() => onDeleteSubpanel(panelName, subpanelName)}
//                   className="text-red-500 hover:text-red-700"
//                   title="Delete Subpanel"
//                 >
//                   <Trash2 size={12} />
//                 </button>
//               </div>
//             </div>
//             <div className="text-xs space-y-1" style={{ color: '#2d2d2d' }}>
//               <div>Database: {Object.keys(subpanelData.database || {}).length} categories selected</div>
//               <div>Prompt: {subpanelData.prompt ? 'Set' : 'Not set'}</div>
//               <div>Fields: {subpanelData.fields?.length || 0} selected</div>
//               <div>Graph Type: {subpanelData.graph?.type || 'Not set'}</div>
//               <div>Content Response (Points): {subpanelData.content?.response ? 'Generated' : 'Not generated'}</div>
//               <div>Insights Response (Points): {subpanelData.insights?.response ? 'Generated' : 'Not generated'}</div>
//             </div>
//           </div>
//         ))}
        
//         {subpanels.length === 0 && (
//           <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
//             No subpanels yet. Add your first subpanel.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Field Selector Component for tabular selection
// const FieldSelector = ({ selectedFields, onFieldChange, availableFields, label }) => {
//   const toggleField = (fieldValue) => {
//     const newFields = selectedFields.includes(fieldValue)
//       ? selectedFields.filter(f => f !== fieldValue)
//       : [...selectedFields, fieldValue];
//     onFieldChange(newFields);
//   };

//   return (
//     <div>
//       <label className="block text-sm mb-2" style={{ color: '#334155' }}>{label}</label>
//       <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
//         <div className="grid grid-cols-2 gap-2">
//           {availableFields.map(field => (
//             <div
//               key={field.value}
//               onClick={() => toggleField(field.value)}
//               className={`p-2 rounded cursor-pointer border text-xs transition-colors ${
//                 selectedFields.includes(field.value)
//                   ? 'text-white border-blue-500'
//                   : 'bg-white border-gray-200 hover:bg-gray-50'
//               }`}
//               style={selectedFields.includes(field.value) ? { backgroundColor: '#7cc6ee' } : {}}
//             >
//               {field.label}
//             </div>
//           ))}
//         </div>
//         <div className="text-xs text-gray-500 mt-2">
//           {selectedFields.length} field(s) selected
//         </div>
//       </div>
//     </div>
//   );
// };

// // Database Selector Component for category/collection selection
// const DatabaseSelector = ({ selectedDatabase, onDatabaseChange, miData }) => {
//   const [expandedCategories, setExpandedCategories] = useState({});

//   const toggleCategory = (categoryName) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryName]: !prev[categoryName]
//     }));
//   };

//   const toggleCategorySelection = (categoryName) => {
//     const newDatabase = { ...selectedDatabase };
//     const collections = Object.keys(miData[categoryName] || {});
    
//     if (newDatabase[categoryName] && newDatabase[categoryName].length === collections.length) {
//       // All selected, deselect all
//       delete newDatabase[categoryName];
//     } else {
//       // Select all
//       newDatabase[categoryName] = collections;
//     }
    
//     onDatabaseChange(newDatabase);
//   };

//   const toggleCollectionSelection = (categoryName, collectionName) => {
//     const newDatabase = { ...selectedDatabase };
    
//     if (!newDatabase[categoryName]) {
//       newDatabase[categoryName] = [];
//     }
    
//     if (newDatabase[categoryName].includes(collectionName)) {
//       newDatabase[categoryName] = newDatabase[categoryName].filter(c => c !== collectionName);
//       if (newDatabase[categoryName].length === 0) {
//         delete newDatabase[categoryName];
//       }
//     } else {
//       newDatabase[categoryName].push(collectionName);
//     }
    
//     onDatabaseChange(newDatabase);
//   };

//   return (
//     <div>
//       <label className="block text-sm mb-2" style={{ color: '#334155' }}>Database Selection</label>
//       <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">
//         {Object.keys(miData).map(categoryName => {
//           const collections = Object.keys(miData[categoryName] || {});
//           const selectedCollections = selectedDatabase[categoryName] || [];
//           const allSelected = selectedCollections.length === collections.length && collections.length > 0;
//           const someSelected = selectedCollections.length > 0;
          
//           return (
//             <div key={categoryName} className="mb-2">
//               <div className="flex items-center gap-2 mb-1">
//                 <button
//                   onClick={() => toggleCategory(categoryName)}
//                   className="text-gray-600 hover:text-gray-800"
//                 >
//                   {expandedCategories[categoryName] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
//                 </button>
//                 <div
//                   onClick={() => toggleCategorySelection(categoryName)}
//                   className={`p-2 rounded cursor-pointer border text-xs transition-colors flex-1 ${
//                     allSelected
//                       ? 'text-white border-blue-500'
//                       : someSelected
//                       ? 'border-blue-300 bg-blue-50'
//                       : 'bg-white border-gray-200 hover:bg-gray-50'
//                   }`}
//                   style={allSelected ? { backgroundColor: '#7cc6ee' } : {}}
//                 >
//                   {categoryName} ({selectedCollections.length}/{collections.length})
//                 </div>
//               </div>
              
//               {expandedCategories[categoryName] && (
//                 <div className="ml-6 space-y-1">
//                   {collections.map(collectionName => (
//                     <div
//                       key={collectionName}
//                       onClick={() => toggleCollectionSelection(categoryName, collectionName)}
//                       className={`p-2 rounded cursor-pointer border text-xs transition-colors ${
//                         selectedCollections.includes(collectionName)
//                           ? 'text-white border-blue-500'
//                           : 'bg-white border-gray-200 hover:bg-gray-50'
//                       }`}
//                       style={selectedCollections.includes(collectionName) ? { backgroundColor: '#7cc6ee' } : {}}
//                     >
//                       {collectionName}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//         <div className="text-xs text-gray-500 mt-2">
//           {Object.values(selectedDatabase).flat().length} collection(s) selected
//         </div>
//       </div>
//     </div>
//   );
// };

// // Modal Components
// const AddCategoryModal = ({ show, onClose, value, onChange, onAdd }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Category
//         </h3>
//         <input
//           type="text"
//           placeholder="Category Name"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full p-3 border rounded-lg mb-4"
//         />
//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 py-2 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onAdd}
//             className="flex-1 py-2 text-white rounded-lg"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Add Category
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddCollectionModal = ({ show, onClose, value, onChange, onAdd, categoryName }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Collection to {categoryName}
//         </h3>
//         <input
//           type="text"
//           placeholder="Collection Name"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full p-3 border rounded-lg mb-4"
//         />
//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 py-2 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onAdd}
//             className="flex-1 py-2 text-white rounded-lg"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Add Collection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddInsightPanelModal = ({ show, onClose, value, onChange, onAdd }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Insight Panel
//         </h3>
//         <input
//           type="text"
//           placeholder="Panel Name (e.g., Competitive Intel)"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full p-3 border rounded-lg mb-4"
//         />
//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 py-2 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onAdd}
//             className="flex-1 py-2 text-white rounded-lg"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Add Panel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddSubpanelModal = ({ show, onClose, subpanelData, setSubpanelData, miData, availableFields, onAdd }) => {
//   if (!show) return null;

//   const graphTypes = [
//     { value: 'bar', label: 'Bar Chart' },
//     { value: 'line', label: 'Line Chart' },
//     { value: 'pie', label: 'Pie Chart' },
//     { value: 'scatter', label: 'Scatter Plot' },
//     { value: 'area', label: 'Area Chart' }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Subpanel
//         </h3>
        
//         <div className="space-y-6 max-h-96 overflow-y-auto">
//           {/* Basic Info */}
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Subpanel Name
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Key Feature Types"
//               value={subpanelData.name}
//               onChange={(e) => setSubpanelData({ ...subpanelData, name: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>

//           {/* Database Selection */}
//           <div>
//             <DatabaseSelector
//               selectedDatabase={subpanelData.database}
//               onDatabaseChange={(database) => setSubpanelData({ ...subpanelData, database })}
//               miData={miData}
//             />
//           </div>

//           {/* Main Prompt */}
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Main Prompt
//             </label>
//             <textarea
//               value={subpanelData.prompt}
//               onChange={(e) => setSubpanelData({ ...subpanelData, prompt: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//               rows="3"
//               placeholder="Enter the main prompt for this subpanel..."
//             />
//           </div>

//           {/* Product DB Fields */}
//           <div>
//             <FieldSelector
//               selectedFields={subpanelData.fields}
//               onFieldChange={(fields) => setSubpanelData({ ...subpanelData, fields })}
//               availableFields={availableFields}
//               label="Product Database Fields"
//             />
//           </div>

//           {/* Graph Type Selection */}
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Graph Type
//             </label>
//             <select
//               value={subpanelData.graph.type}
//               onChange={(e) => setSubpanelData({
//                 ...subpanelData,
//                 graph: { ...subpanelData.graph, type: e.target.value }
//               })}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Graph Type</option>
//               {graphTypes.map(type => (
//                 <option key={type.value} value={type.value}>{type.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="flex gap-3 mt-6 pt-4 border-t">
//           <button
//             onClick={onClose}
//             className="flex-1 py-2 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onAdd}
//             className="flex-1 py-2 text-white rounded-lg"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Add Subpanel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Edit Subpanel Modal Component
// const EditSubpanelModal = ({ show, onClose, editingData, miData, availableFields, insights, setInsights }) => {
//   const [localData, setLocalData] = useState({
//     name: '',
//     database: {},
//     prompt: '',
//     fields: [],
//     graph: { type: '', response: '' },
//     content: { response: '' },
//     insights: { response: '' }
//   });

//   useEffect(() => {
//     if (editingData) {
//       setLocalData({
//         name: editingData.subpanelName,
//         database: editingData.data.database || {},
//         prompt: editingData.data.prompt || '',
//         fields: editingData.data.fields || [],
//         graph: editingData.data.graph || { type: '', response: '' },
//         content: editingData.data.content || { response: '' },
//         insights: editingData.data.insights || { response: '' }
//       });
//     }
//   }, [editingData]);

//   const handleSave = () => {
//     if (!editingData) return;

//     const updatedInsights = { ...insights };
//     const { panelName, subpanelName } = editingData;

//     // If name changed, delete old and create new
//     if (localData.name !== subpanelName) {
//       delete updatedInsights[panelName][subpanelName];
//     }

//     updatedInsights[panelName][localData.name] = {
//       database: localData.database,
//       prompt: localData.prompt,
//       fields: localData.fields,
//       graph: localData.graph,
//       content: localData.content,
//       insights: localData.insights
//     };

//     setInsights(updatedInsights);
//     onClose();
//   };

//   if (!show || !editingData) return null;

//   const graphTypes = [
//     { value: 'bar', label: 'Bar Chart' },
//     { value: 'line', label: 'Line Chart' },
//     { value: 'pie', label: 'Pie Chart' },
//     { value: 'scatter', label: 'Scatter Plot' },
//     { value: 'area', label: 'Area Chart' }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Edit Subpanel
//         </h3>
        
//         <div className="space-y-6 max-h-96 overflow-y-auto">
//           {/* Basic Info */}
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Subpanel Name
//             </label>
//             <input
//               type="text"
//               value={localData.name}
//               onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>

//           {/* Database Selection */}
//           <div>
//             <DatabaseSelector
//               selectedDatabase={localData.database}
//               onDatabaseChange={(database) => setLocalData({ ...localData, database })}
//               miData={miData}
//             />
//           </div>

//           {/* Main Prompt */}
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Main Prompt
//             </label>
//             <textarea
//               value={localData.prompt}
//               onChange={(e) => setLocalData({ ...localData, prompt: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//               rows="3"
//               placeholder="Enter the main prompt for this subpanel..."
//             />
//           </div>

//           {/* Product DB Fields */}
//           <div>
//             <FieldSelector
//               selectedFields={localData.fields}
//               onFieldChange={(fields) => setLocalData({ ...localData, fields })}
//               availableFields={availableFields}
//               label="Product Database Fields"
//             />
//           </div>

//           {/* Graph Type Selection */}
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Graph Type
//             </label>
//             <select
//               value={localData.graph.type}
//               onChange={(e) => setLocalData({
//                 ...localData,
//                 graph: { ...localData.graph, type: e.target.value }
//               })}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Graph Type</option>
//               {graphTypes.map(type => (
//                 <option key={type.value} value={type.value}>{type.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Response Fields */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>AI Generated Responses</h4>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Response</label>
//                 <textarea
//                   value={localData.graph.response}
//                   onChange={(e) => setLocalData({
//                     ...localData,
//                     graph: { ...localData.graph, response: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                   rows="3"
//                   placeholder="AI generated graph response will appear here..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Content Response (Points)</label>
//                 <textarea
//                   value={localData.content.response}
//                   onChange={(e) => setLocalData({
//                     ...localData,
//                     content: { ...localData.content, response: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                   rows="3"
//                   placeholder="AI generated content response in points format will appear here..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Insights Response (Points)</label>
//                 <textarea
//                   value={localData.insights.response}
//                   onChange={(e) => setLocalData({
//                     ...localData,
//                     insights: { ...localData.insights, response: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                   rows="3"
//                   placeholder="AI generated insights response in points format will appear here..."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-3 mt-6 pt-4 border-t">
//           <button
//             onClick={onClose}
//             className="flex-1 py-2 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="flex-1 py-2 text-white rounded-lg"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketIntelligenceDashboard;
'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Link, Save, Edit3, Trash2, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';

const MarketIntelligenceDashboard = () => {
  const [marketData, setMarketData] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [insights, setInsights] = useState({});
  const [miData, setMiData] = useState({});
  const [showJsonPreview, setShowJsonPreview] = useState(true);
  const [availableFields, setAvailableFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  
  // Edit states
  const [editingPanel, setEditingPanel] = useState(null);
  const [editingSubpanel, setEditingSubpanel] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCollection, setEditingCollection] = useState(null);
  const [editPanelName, setEditPanelName] = useState('');
  const [editSubpanelName, setEditSubpanelName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCollectionName, setEditCollectionName] = useState('');

  // Modals
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [showAddInsightPanelModal, setShowAddInsightPanelModal] = useState(false);
  const [showAddSubpanelModal, setShowAddSubpanelModal] = useState(false);
  const [showEditSubpanelModal, setShowEditSubpanelModal] = useState(false);
  const [selectedInsightPanel, setSelectedInsightPanel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingSubpanelData, setEditingSubpanelData] = useState(null);

  // Form states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newInsightPanelName, setNewInsightPanelName] = useState('');
  const [newSubpanelData, setNewSubpanelData] = useState({
    name: '',
    database: {},
    prompt: '',
    fields: [],
    graph: { type: '', response: '', heading: '' },
    content: { response: [], heading: '' },
    insights: { response: [], heading: '' }
  });

  // Expanded states for categories
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    fetchAvailableFields();
    loadExistingData();
  }, []);

  const fetchAvailableFields = async () => {
    try {
      const response = await fetch('/api/legal-software/fields');
      if (response.ok) {
        const fields = await response.json();
        setAvailableFields(fields);
      }
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const loadExistingData = async () => {
    try {
      const response = await fetch('/api/market-intelligence');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const latest = data[0];
          setMarketData(latest);
          setDashboardData(latest.dashboardData || {});
          setInsights(latest.insights || {});
          
          // Convert old format to new category format if needed
          const miDataConverted = latest.miData || {};
          
          // If old format (no categories), wrap in a default category
          if (Object.keys(miDataConverted).length > 0 && !hasCategories(miDataConverted)) {
            const defaultCategory = 'Default Category';
            miDataConverted[defaultCategory] = { ...miDataConverted };
            Object.keys(miDataConverted).forEach(key => {
              if (key !== defaultCategory) {
                delete miDataConverted[key];
              }
            });
          }
          
          // Ensure file names are handled
          Object.keys(miDataConverted).forEach(categoryName => {
            Object.keys(miDataConverted[categoryName]).forEach(collectionName => {
              if (!miDataConverted[categoryName][collectionName].fileNames) {
                miDataConverted[categoryName][collectionName].fileNames = {};
              }
            });
          });
          
          setMiData(miDataConverted);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  };

  const hasCategories = (data) => {
    // Check if data has category structure
    return Object.values(data).some(value => 
      typeof value === 'object' && 
      Object.values(value).some(subValue => 
        typeof subValue === 'object' && 
        (subValue.pdflinks || subValue.articlelinks)
      )
    );
  };

  const handleSaveToDatabase = async () => {
    setLoading(true);
    try {
      // Clean miData before saving (remove fileNames)
      const cleanMiData = {};
      Object.keys(miData).forEach(categoryName => {
        cleanMiData[categoryName] = {};
        Object.keys(miData[categoryName]).forEach(collectionName => {
          cleanMiData[categoryName][collectionName] = {
            pdflinks: miData[categoryName][collectionName].pdflinks || [],
            articlelinks: miData[categoryName][collectionName].articlelinks || []
          };
        });
      });

      const payload = {
        dashboardData,
        insights,
        miData: cleanMiData
      };

      const method = marketData ? 'PUT' : 'POST';
      const body = marketData ? { ...payload, id: marketData.id } : payload;

      const response = await fetch('/api/market-intelligence', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const result = await response.json();
        setMarketData(result);
        alert('Data saved successfully!');
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error saving to database:', error);
      alert('Error saving data');
    }
    setLoading(false);
  };

  const handleAnalyze = async () => {
    setAnalyzeLoading(true);
    try {
      // Clean miData before sending (remove fileNames)
      const cleanMiData = {};
      Object.keys(miData).forEach(categoryName => {
        cleanMiData[categoryName] = {};
        Object.keys(miData[categoryName]).forEach(collectionName => {
          cleanMiData[categoryName][collectionName] = {
            pdflinks: miData[categoryName][collectionName].pdflinks || [],
            articlelinks: miData[categoryName][collectionName].articlelinks || []
          };
        });
      });

      const payload = {
        dashboardData,
        insights,
        miData: cleanMiData
      };

      const response = await fetch('/api/mi-analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Analysis completed successfully!');
        console.log('Analysis result:', result);
      } else {
        alert('Error during analysis');
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      alert('Error during analysis');
    }
    setAnalyzeLoading(false);
  };

  const handleFileUpload = async (file, type, categoryName, collectionName) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('type', type);

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        
        const updatedMiData = { ...miData };
        if (!updatedMiData[categoryName]) {
          updatedMiData[categoryName] = {};
        }
        if (!updatedMiData[categoryName][collectionName]) {
          updatedMiData[categoryName][collectionName] = { 
            pdflinks: [], 
            articlelinks: [],
            fileNames: {}
          };
        }
        
        const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
        if (!updatedMiData[categoryName][collectionName][linkType]) {
          updatedMiData[categoryName][collectionName][linkType] = [];
        }
        if (!updatedMiData[categoryName][collectionName].fileNames) {
          updatedMiData[categoryName][collectionName].fileNames = {};
        }
        
        updatedMiData[categoryName][collectionName][linkType].push(result.url);
        updatedMiData[categoryName][collectionName].fileNames[result.url] = result.originalName;

        setMiData(updatedMiData);
        alert('File uploaded successfully!');
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
    setUploadLoading(false);
  };

  const handleAddLink = (categoryName, collectionName, url, name) => {
    const updatedMiData = { ...miData };
    if (!updatedMiData[categoryName]) {
      updatedMiData[categoryName] = {};
    }
    if (!updatedMiData[categoryName][collectionName]) {
      updatedMiData[categoryName][collectionName] = { 
        pdflinks: [], 
        articlelinks: [],
        fileNames: {}
      };
    }
    
    if (!updatedMiData[categoryName][collectionName].articlelinks) {
      updatedMiData[categoryName][collectionName].articlelinks = [];
    }
    if (!updatedMiData[categoryName][collectionName].fileNames) {
      updatedMiData[categoryName][collectionName].fileNames = {};
    }
    
    updatedMiData[categoryName][collectionName].articlelinks.push(url);
    updatedMiData[categoryName][collectionName].fileNames[url] = name || url;

    setMiData(updatedMiData);
  };

  const handleDeleteFile = (categoryName, collectionName, url, type) => {
    const updatedMiData = { ...miData };
    const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
    
    updatedMiData[categoryName][collectionName][linkType] = 
      updatedMiData[categoryName][collectionName][linkType].filter(link => link !== url);
    
    delete updatedMiData[categoryName][collectionName].fileNames[url];
    
    setMiData(updatedMiData);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const updatedDashboardData = { ...dashboardData };
      if (!updatedDashboardData[newCategoryName]) {
        updatedDashboardData[newCategoryName] = {};
      }
      setDashboardData(updatedDashboardData);
      
      const updatedMiData = { ...miData };
      if (!updatedMiData[newCategoryName]) {
        updatedMiData[newCategoryName] = {};
      }
      setMiData(updatedMiData);
      
      setNewCategoryName('');
      setShowAddCategoryModal(false);
    }
  };

  const handleAddCollection = () => {
    if (newCollectionName.trim() && selectedCategory) {
      const updatedDashboardData = { ...dashboardData };
      if (!updatedDashboardData[selectedCategory]) {
        updatedDashboardData[selectedCategory] = {};
      }
      updatedDashboardData[selectedCategory][newCollectionName] = {};
      setDashboardData(updatedDashboardData);
      
      const updatedMiData = { ...miData };
      if (!updatedMiData[selectedCategory]) {
        updatedMiData[selectedCategory] = {};
      }
      updatedMiData[selectedCategory][newCollectionName] = { 
        pdflinks: [], 
        articlelinks: [],
        fileNames: {}
      };
      setMiData(updatedMiData);
      
      setNewCollectionName('');
      setShowAddCollectionModal(false);
    }
  };

  const handleDeleteCategory = (categoryName) => {
    const updatedDashboardData = { ...dashboardData };
    const updatedMiData = { ...miData };
    
    delete updatedDashboardData[categoryName];
    delete updatedMiData[categoryName];
    
    setDashboardData(updatedDashboardData);
    setMiData(updatedMiData);
  };

  const handleDeleteCollection = (categoryName, collectionName) => {
    const updatedDashboardData = { ...dashboardData };
    const updatedMiData = { ...miData };
    
    delete updatedDashboardData[categoryName][collectionName];
    delete updatedMiData[categoryName][collectionName];
    
    setDashboardData(updatedDashboardData);
    setMiData(updatedMiData);
  };

  const handleAddInsightPanel = () => {
    if (newInsightPanelName.trim()) {
      const updatedInsights = { ...insights };
      updatedInsights[newInsightPanelName] = {};
      setInsights(updatedInsights);
      setNewInsightPanelName('');
      setShowAddInsightPanelModal(false);
    }
  };

  const handleAddSubpanel = () => {
    if (newSubpanelData.name.trim() && selectedInsightPanel) {
      const updatedInsights = { ...insights };
      updatedInsights[selectedInsightPanel][newSubpanelData.name] = {
        database: newSubpanelData.database,
        prompt: newSubpanelData.prompt,
        fields: newSubpanelData.fields,
        graph: newSubpanelData.graph,
        content: newSubpanelData.content,
        insights: newSubpanelData.insights
      };
      setInsights(updatedInsights);
      
      // Reset form
      setNewSubpanelData({
        name: '',
        database: {},
        prompt: '',
        fields: [],
        graph: { type: '', response: '', heading: '' },
        content: { response: [], heading: '' },
        insights: { response: [], heading: '' }
      });
      setShowAddSubpanelModal(false);
    }
  };

  const handleEditPanel = (panelName, newName) => {
    if (newName && newName !== panelName) {
      const updatedInsights = { ...insights };
      updatedInsights[newName] = updatedInsights[panelName];
      delete updatedInsights[panelName];
      setInsights(updatedInsights);
    }
    setEditingPanel(null);
    setEditPanelName('');
  };

  const handleDeletePanel = (panelName) => {
    const updatedInsights = { ...insights };
    delete updatedInsights[panelName];
    setInsights(updatedInsights);
  };

  const handleEditSubpanel = (panelName, subpanelName, newName) => {
    if (newName && newName !== subpanelName) {
      const updatedInsights = { ...insights };
      updatedInsights[panelName][newName] = updatedInsights[panelName][subpanelName];
      delete updatedInsights[panelName][subpanelName];
      setInsights(updatedInsights);
    }
    setEditingSubpanel(null);
    setEditSubpanelName('');
  };

  const handleDeleteSubpanel = (panelName, subpanelName) => {
    const updatedInsights = { ...insights };
    delete updatedInsights[panelName][subpanelName];
    setInsights(updatedInsights);
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const jsonPreview = {
    dashboardData,
    insights,
    miData: Object.keys(miData).reduce((acc, categoryName) => {
      acc[categoryName] = {};
      Object.keys(miData[categoryName]).forEach(collectionName => {
        acc[categoryName][collectionName] = {
          pdflinks: miData[categoryName][collectionName].pdflinks || [],
          articlelinks: miData[categoryName][collectionName].articlelinks || []
        };
      });
      return acc;
    }, {})
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
            Market Intelligence Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={analyzeLoading}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#7cc6ee' }}
            >
              <Save size={20} />
              {analyzeLoading ? 'Analyzing...' : 'Analyze'}
            </button>
            <button
              onClick={handleSaveToDatabase}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#1e2556' }}
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save to Database'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Data Categories Section */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
                    Data Categories
                  </h2>
                  <button
                    onClick={() => setShowAddCategoryModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#7cc6ee' }}
                  >
                    <Plus size={16} />
                    Add Category
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {Object.keys(miData).map((categoryName) => (
                  <CategoryCard
                    key={categoryName}
                    categoryName={categoryName}
                    categoryData={miData[categoryName]}
                    expanded={expandedCategories[categoryName]}
                    onToggle={() => toggleCategory(categoryName)}
                    onFileUpload={(file, type, collectionName) => handleFileUpload(file, type, categoryName, collectionName)}
                    onAddLink={(collectionName, url, name) => handleAddLink(categoryName, collectionName, url, name)}
                    onDeleteFile={(collectionName, url, type) => handleDeleteFile(categoryName, collectionName, url, type)}
                    onDeleteCollection={(collectionName) => handleDeleteCollection(categoryName, collectionName)}
                    onDeleteCategory={() => handleDeleteCategory(categoryName)}
                    onAddCollection={() => {
                      setSelectedCategory(categoryName);
                      setShowAddCollectionModal(true);
                    }}
                    uploadLoading={uploadLoading}
                    editingCategory={editingCategory}
                    setEditingCategory={setEditingCategory}
                    editCategoryName={editCategoryName}
                    setEditCategoryName={setEditCategoryName}
                    onEditCategory={(newName) => {
                      if (newName && newName !== categoryName) {
                        const updatedDashboardData = { ...dashboardData };
                        const updatedMiData = { ...miData };
                        
                        updatedDashboardData[newName] = updatedDashboardData[categoryName];
                        updatedMiData[newName] = updatedMiData[categoryName];
                        
                        delete updatedDashboardData[categoryName];
                        delete updatedMiData[categoryName];
                        
                        setDashboardData(updatedDashboardData);
                        setMiData(updatedMiData);
                      }
                      setEditingCategory(null);
                      setEditCategoryName('');
                    }}
                  />
                ))}
                
                {Object.keys(miData).length === 0 && (
                  <div className="text-center py-8" style={{ color: '#334155' }}>
                    No categories yet. Add your first category to get started.
                  </div>
                )}
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
                    Insights Management
                  </h2>
                  <button
                    onClick={() => setShowAddInsightPanelModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#7cc6ee' }}
                  >
                    <Plus size={16} />
                    Add Insight Panel
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {Object.keys(insights).map((panelName) => (
                  <InsightPanelCard
                    key={panelName}
                    panelName={panelName}
                    panelData={insights[panelName]}
                    miData={miData}
                    onAddSubpanel={() => {
                      setSelectedInsightPanel(panelName);
                      setShowAddSubpanelModal(true);
                    }}
                    editingPanel={editingPanel}
                    setEditingPanel={setEditingPanel}
                    editPanelName={editPanelName}
                    setEditPanelName={setEditPanelName}
                    onEditPanel={handleEditPanel}
                    onDeletePanel={handleDeletePanel}
                    onDeleteSubpanel={handleDeleteSubpanel}
                    setShowEditSubpanelModal={setShowEditSubpanelModal}
                    setEditingSubpanelData={setEditingSubpanelData}
                  />
                ))}
                
                {Object.keys(insights).length === 0 && (
                  <div className="text-center py-8" style={{ color: '#334155' }}>
                    No insight panels yet. Add your first panel to get started.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* JSON Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold" style={{ color: '#1e2556' }}>
                    JSON Preview
                  </h3>
                  <button
                    onClick={() => setShowJsonPreview(!showJsonPreview)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#f5f7fa' }}
                  >
                    {showJsonPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {showJsonPreview && (
                <div className="p-4">
                  <pre className="text-xs overflow-auto max-h-96 bg-gray-50 p-3 rounded-lg">
                    {JSON.stringify(jsonPreview, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddCategoryModal
        show={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        value={newCategoryName}
        onChange={setNewCategoryName}
        onAdd={handleAddCategory}
      />

      <AddCollectionModal
        show={showAddCollectionModal}
        onClose={() => setShowAddCollectionModal(false)}
        value={newCollectionName}
        onChange={setNewCollectionName}
        onAdd={handleAddCollection}
        categoryName={selectedCategory}
      />

      <AddInsightPanelModal
        show={showAddInsightPanelModal}
        onClose={() => setShowAddInsightPanelModal(false)}
        value={newInsightPanelName}
        onChange={setNewInsightPanelName}
        onAdd={handleAddInsightPanel}
      />

      <AddSubpanelModal
        show={showAddSubpanelModal}
        onClose={() => setShowAddSubpanelModal(false)}
        subpanelData={newSubpanelData}
        setSubpanelData={setNewSubpanelData}
        miData={miData}
        availableFields={availableFields}
        onAdd={handleAddSubpanel}
      />

      <EditSubpanelModal
        show={showEditSubpanelModal}
        onClose={() => setShowEditSubpanelModal(false)}
        editingData={editingSubpanelData}
        miData={miData}
        availableFields={availableFields}
        insights={insights}
        setInsights={setInsights}
      />
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ 
  categoryName, 
  categoryData, 
  expanded, 
  onToggle, 
  onFileUpload, 
  onAddLink, 
  onDeleteFile, 
  onDeleteCollection, 
  onDeleteCategory, 
  onAddCollection,
  uploadLoading,
  editingCategory,
  setEditingCategory,
  editCategoryName,
  setEditCategoryName,
  onEditCategory
}) => {
  const handleEditClick = () => {
    setEditingCategory(categoryName);
    setEditCategoryName(categoryName);
  };

  const handleEditSubmit = () => {
    onEditCategory(editCategoryName);
  };

  return (
    <div className="border border-gray-200 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggle}
              className="text-gray-600 hover:text-gray-800"
            >
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {editingCategory === categoryName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="p-1 border rounded text-sm"
                  style={{ color: '#1e2556' }}
                />
                <button
                  onClick={handleEditSubmit}
                  className="px-2 py-1 text-white rounded text-sm"
                  style={{ backgroundColor: '#7cc6ee' }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-2 py-1 border rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold" style={{ color: '#1e2556' }}>
                  {categoryName}
                </h3>
                <button
                  onClick={handleEditClick}
                  className="text-gray-600 hover:text-gray-800 ml-2"
                  title="Edit Category"
                >
                  <Edit3 size={14} />
                </button>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onAddCollection}
              className="text-sm px-3 py-1 text-white rounded"
              style={{ backgroundColor: '#7cc6ee' }}
            >
              <Plus size={14} />
            </button>
            <button
              onClick={onDeleteCategory}
              className="text-red-500 hover:text-red-700"
              title="Delete Category"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-4 space-y-3">
          {Object.keys(categoryData).map((collectionName) => (
            <DatabaseCollectionCard
              key={collectionName}
              collectionName={collectionName}
              miData={categoryData[collectionName] || { pdflinks: [], articlelinks: [], fileNames: {} }}
              onFileUpload={(file, type) => onFileUpload(file, type, collectionName)}
              onAddLink={(url, name) => onAddLink(collectionName, url, name)}
              onDeleteFile={(url, type) => onDeleteFile(collectionName, url, type)}
              onDeleteCollection={() => onDeleteCollection(collectionName)}
              uploadLoading={uploadLoading}
            />
          ))}
          
          {Object.keys(categoryData).length === 0 && (
            <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
              No collections in this category. Add your first collection.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Database Collection Card Component
const DatabaseCollectionCard = ({ collectionName, miData, onFileUpload, onAddLink, onDeleteFile, onDeleteCollection, uploadLoading }) => {
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkName, setNewLinkName] = useState('');
  const [showAddLink, setShowAddLink] = useState(false);

  const handleLinkSubmit = () => {
    if (newLinkUrl.trim()) {
      onAddLink(newLinkUrl, newLinkName.trim() || newLinkUrl);
      setNewLinkUrl('');
      setNewLinkName('');
      setShowAddLink(false);
    }
  };

  const getFileName = (url) => {
    return miData.fileNames?.[url] || url.split('/').pop() || 'Unknown File';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium" style={{ color: '#334155' }}>
          {collectionName}
        </h4>
        <button
          onClick={onDeleteCollection}
          className="text-red-500 hover:text-red-700 p-1"
          title="Delete Collection"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* File Upload */}
        <div>
          <h5 className="font-medium mb-2 text-sm" style={{ color: '#334155' }}>
            Upload Documents
          </h5>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const type = file.type === 'application/pdf' ? 'pdf' : 'document';
                onFileUpload(file, type);
              }
            }}
            className="w-full text-xs"
            disabled={uploadLoading}
          />
          
          {/* Display uploaded files */}
          <div className="mt-2 space-y-1">
            {(miData.pdflinks || []).length > 0 && (
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>PDF Files:</div>
                {(miData.pdflinks || []).map((url, index) => (
                  <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border">
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
                      {getFileName(url)}
                    </a>
                    <button
                      onClick={() => onDeleteFile(url, 'pdf')}
                      className="text-red-500 hover:text-red-700 ml-2"
                      title="Delete File"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {(miData.articlelinks || []).length > 0 && (
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>Article Links:</div>
                {(miData.articlelinks || []).map((url, index) => (
                  <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border">
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
                      {getFileName(url)}
                    </a>
                    <button
                      onClick={() => onDeleteFile(url, 'article')}
                      className="text-red-500 hover:text-red-700 ml-2"
                      title="Delete Link"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Link Management */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-medium text-sm" style={{ color: '#334155' }}>
              Add Links
            </h5>
            <button
              onClick={() => setShowAddLink(!showAddLink)}
              className="text-sm px-2 py-1 rounded text-white"
              style={{ backgroundColor: '#7cc6ee' }}
            >
              <Plus size={12} />
            </button>
          </div>
          
          {showAddLink && (
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Enter URL"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="w-full p-2 border rounded text-xs"
              />
              <input
                type="text"
                placeholder="Display Name (optional)"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                className="w-full p-2 border rounded text-xs"
              />
              <button
                onClick={handleLinkSubmit}
                className="w-full py-2 text-white rounded text-xs"
                style={{ backgroundColor: '#1e2556' }}
              >
                Add Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Insight Panel Card Component
const InsightPanelCard = ({ 
  panelName, 
  panelData, 
  miData, 
  onAddSubpanel,
  editingPanel,
  setEditingPanel,
  editPanelName,
  setEditPanelName,
  onEditPanel,
  onDeletePanel,
  onDeleteSubpanel,
  setShowEditSubpanelModal,
  setEditingSubpanelData
}) => {
  // Filter out system fields to get actual subpanels
  const subpanels = Object.entries(panelData).filter(([key, value]) => 
    typeof value === 'object' && value.database !== undefined
  );

  const handleEditClick = () => {
    setEditingPanel(panelName);
    setEditPanelName(panelName);
  };

  const handleEditSubmit = () => {
    onEditPanel(panelName, editPanelName);
  };

  const handleEditSubpanelClick = (subpanelName, subpanelData) => {
    setEditingSubpanelData({
      panelName,
      subpanelName,
      data: subpanelData
    });
    setShowEditSubpanelModal(true);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="flex justify-between items-center mb-4">
        {editingPanel === panelName ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={editPanelName}
              onChange={(e) => setEditPanelName(e.target.value)}
              className="flex-1 p-1 border rounded text-sm"
              style={{ color: '#1e2556' }}
            />
            <button
              onClick={handleEditSubmit}
              className="px-2 py-1 text-white rounded text-sm"
              style={{ backgroundColor: '#7cc6ee' }}
            >
              Save
            </button>
            <button
              onClick={() => setEditingPanel(null)}
              className="px-2 py-1 border rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-semibold" style={{ color: '#1e2556' }}>
              {panelName}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEditClick}
                className="text-gray-600 hover:text-gray-800"
                title="Edit Panel"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => onDeletePanel(panelName)}
                className="text-red-500 hover:text-red-700"
                title="Delete Panel"
              >
                <Trash2 size={14} />
              </button>
              <button
                onClick={onAddSubpanel}
                className="flex items-center gap-1 px-3 py-1 text-white rounded text-sm"
                style={{ backgroundColor: '#7cc6ee' }}
              >
                <Plus size={14} />
                Add Subpanel
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="space-y-3">
        {subpanels.map(([subpanelName, subpanelData]) => (
          <div key={subpanelName} className="bg-white p-3 rounded border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium" style={{ color: '#334155' }}>
                {subpanelName}
              </h4>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditSubpanelClick(subpanelName, subpanelData)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Edit Subpanel"
                >
                  <Edit3 size={12} />
                </button>
                <button
                  onClick={() => onDeleteSubpanel(panelName, subpanelName)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Subpanel"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="text-xs space-y-1" style={{ color: '#2d2d2d' }}>
              <div>Database: {Object.keys(subpanelData.database || {}).length} categories selected</div>
              <div>Prompt: {subpanelData.prompt ? 'Set' : 'Not set'}</div>
              <div>Fields: {subpanelData.fields?.length || 0} selected</div>
              <div>Graph Type: {subpanelData.graph?.type || 'Not set'}</div>
              <div>Graph Heading: {subpanelData.graph?.heading || 'Not set'}</div>
              <div>Content Points: {Array.isArray(subpanelData.content?.response) ? subpanelData.content.response.length : 0} points</div>
              <div>Content Heading: {subpanelData.content?.heading || 'Not set'}</div>
              <div>Insights Points: {Array.isArray(subpanelData.insights?.response) ? subpanelData.insights.response.length : 0} points</div>
              <div>Insights Heading: {subpanelData.insights?.heading || 'Not set'}</div>
            </div>
          </div>
        ))}
        
        {subpanels.length === 0 && (
          <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
            No subpanels yet. Add your first subpanel.
          </div>
        )}
      </div>
    </div>
  );
};

// Field Selector Component for tabular selection
const FieldSelector = ({ selectedFields, onFieldChange, availableFields, label }) => {
  const toggleField = (fieldValue) => {
    const newFields = selectedFields.includes(fieldValue)
      ? selectedFields.filter(f => f !== fieldValue)
      : [...selectedFields, fieldValue];
    onFieldChange(newFields);
  };

  return (
    <div>
      <label className="block text-sm mb-2" style={{ color: '#334155' }}>{label}</label>
      <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {availableFields.map(field => (
            <div
              key={field.value}
              onClick={() => toggleField(field.value)}
              className={`p-2 rounded cursor-pointer border text-xs transition-colors ${
                selectedFields.includes(field.value)
                  ? 'text-white border-blue-500'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              style={selectedFields.includes(field.value) ? { backgroundColor: '#7cc6ee' } : {}}
            >
              {field.label}
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {selectedFields.length} field(s) selected
        </div>
      </div>
    </div>
  );
};

// Database Selector Component for category/collection selection
const DatabaseSelector = ({ selectedDatabase, onDatabaseChange, miData }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const toggleCategorySelection = (categoryName) => {
    const newDatabase = { ...selectedDatabase };
    const collections = Object.keys(miData[categoryName] || {});
    
    if (newDatabase[categoryName] && newDatabase[categoryName].length === collections.length) {
      // All selected, deselect all
      delete newDatabase[categoryName];
    } else {
      // Select all
      newDatabase[categoryName] = collections;
    }
    
    onDatabaseChange(newDatabase);
  };

  const toggleCollectionSelection = (categoryName, collectionName) => {
    const newDatabase = { ...selectedDatabase };
    
    if (!newDatabase[categoryName]) {
      newDatabase[categoryName] = [];
    }
    
    if (newDatabase[categoryName].includes(collectionName)) {
      newDatabase[categoryName] = newDatabase[categoryName].filter(c => c !== collectionName);
      if (newDatabase[categoryName].length === 0) {
        delete newDatabase[categoryName];
      }
    } else {
      newDatabase[categoryName].push(collectionName);
    }
    
    onDatabaseChange(newDatabase);
  };

  return (
    <div>
      <label className="block text-sm mb-2" style={{ color: '#334155' }}>Database Selection</label>
      <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">
        {Object.keys(miData).map(categoryName => {
          const collections = Object.keys(miData[categoryName] || {});
          const selectedCollections = selectedDatabase[categoryName] || [];
          const allSelected = selectedCollections.length === collections.length && collections.length > 0;
          const someSelected = selectedCollections.length > 0;
          
          return (
            <div key={categoryName} className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {expandedCategories[categoryName] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                <div
                  onClick={() => toggleCategorySelection(categoryName)}
                  className={`p-2 rounded cursor-pointer border text-xs transition-colors flex-1 ${
                    allSelected
                      ? 'text-white border-blue-500'
                      : someSelected
                      ? 'border-blue-300 bg-blue-50'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  style={allSelected ? { backgroundColor: '#7cc6ee' } : {}}
                >
                  {categoryName} ({selectedCollections.length}/{collections.length})
                </div>
              </div>
              
              {expandedCategories[categoryName] && (
                <div className="ml-6 space-y-1">
                  {collections.map(collectionName => (
                    <div
                      key={collectionName}
                      onClick={() => toggleCollectionSelection(categoryName, collectionName)}
                      className={`p-2 rounded cursor-pointer border text-xs transition-colors ${
                        selectedCollections.includes(collectionName)
                          ? 'text-white border-blue-500'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      style={selectedCollections.includes(collectionName) ? { backgroundColor: '#7cc6ee' } : {}}
                    >
                      {collectionName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div className="text-xs text-gray-500 mt-2">
          {Object.values(selectedDatabase).flat().length} collection(s) selected
        </div>
      </div>
    </div>
  );
};

// Modal Components
const AddCategoryModal = ({ show, onClose, value, onChange, onAdd }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Add Category
        </h3>
        <input
          type="text"
          placeholder="Category Name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="flex-1 py-2 text-white rounded-lg"
            style={{ backgroundColor: '#1e2556' }}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCollectionModal = ({ show, onClose, value, onChange, onAdd, categoryName }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Add Collection to {categoryName}
        </h3>
        <input
          type="text"
          placeholder="Collection Name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="flex-1 py-2 text-white rounded-lg"
            style={{ backgroundColor: '#1e2556' }}
          >
            Add Collection
          </button>
        </div>
      </div>
    </div>
  );
};

const AddInsightPanelModal = ({ show, onClose, value, onChange, onAdd }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Add Insight Panel
        </h3>
        <input
          type="text"
          placeholder="Panel Name (e.g., Competitive Intel)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="flex-1 py-2 text-white rounded-lg"
            style={{ backgroundColor: '#1e2556' }}
          >
            Add Panel
          </button>
        </div>
      </div>
    </div>
  );
};

const AddSubpanelModal = ({ show, onClose, subpanelData, setSubpanelData, miData, availableFields, onAdd }) => {
  if (!show) return null;

  const graphTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'scatter', label: 'Scatter Plot' },
    { value: 'area', label: 'Area Chart' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Add Subpanel
        </h3>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
              Subpanel Name
            </label>
            <input
              type="text"
              placeholder="e.g., Key Feature Types"
              value={subpanelData.name}
              onChange={(e) => setSubpanelData({ ...subpanelData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Database Selection */}
          <div>
            <DatabaseSelector
              selectedDatabase={subpanelData.database}
              onDatabaseChange={(database) => setSubpanelData({ ...subpanelData, database })}
              miData={miData}
            />
          </div>

          {/* Main Prompt */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
              Main Prompt
            </label>
            <textarea
              value={subpanelData.prompt}
              onChange={(e) => setSubpanelData({ ...subpanelData, prompt: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Enter the main prompt for this subpanel..."
            />
          </div>

          {/* Product DB Fields */}
          <div>
            <FieldSelector
              selectedFields={subpanelData.fields}
              onFieldChange={(fields) => setSubpanelData({ ...subpanelData, fields })}
              availableFields={availableFields}
              label="Product Database Fields"
            />
          </div>

          {/* Graph Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
              Graph Type
            </label>
            <select
              value={subpanelData.graph.type}
              onChange={(e) => setSubpanelData({
                ...subpanelData,
                graph: { ...subpanelData.graph, type: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Graph Type</option>
              {graphTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="flex-1 py-2 text-white rounded-lg"
            style={{ backgroundColor: '#1e2556' }}
          >
            Add Subpanel
          </button>
        </div>
      </div>
    </div>
  );
};

// Edit Subpanel Modal Component
const EditSubpanelModal = ({ show, onClose, editingData, miData, availableFields, insights, setInsights }) => {
  const [localData, setLocalData] = useState({
    name: '',
    database: {},
    prompt: '',
    fields: [],
    graph: { type: '', response: '', heading: '' },
    content: { response: [], heading: '' },
    insights: { response: [], heading: '' }
  });

  const [editingContentPoint, setEditingContentPoint] = useState(-1);
  const [editingInsightPoint, setEditingInsightPoint] = useState(-1);
  const [newContentPoint, setNewContentPoint] = useState('');
  const [newInsightPoint, setNewInsightPoint] = useState('');

  useEffect(() => {
    if (editingData) {
      const data = editingData.data;
      setLocalData({
        name: editingData.subpanelName,
        database: data.database || {},
        prompt: data.prompt || '',
        fields: data.fields || [],
        graph: {
          type: data.graph?.type || '',
          response: data.graph?.response || '',
          heading: data.graph?.heading || ''
        },
        content: {
          response: Array.isArray(data.content?.response) ? data.content.response : (data.content?.response ? [data.content.response] : []),
          heading: data.content?.heading || ''
        },
        insights: {
          response: Array.isArray(data.insights?.response) ? data.insights.response : (data.insights?.response ? [data.insights.response] : []),
          heading: data.insights?.heading || ''
        }
      });
    }
  }, [editingData]);

  const handleSave = () => {
    if (!editingData) return;

    const updatedInsights = { ...insights };
    const { panelName, subpanelName } = editingData;

    // If name changed, delete old and create new
    if (localData.name !== subpanelName) {
      delete updatedInsights[panelName][subpanelName];
    }

    updatedInsights[panelName][localData.name] = {
      database: localData.database,
      prompt: localData.prompt,
      fields: localData.fields,
      graph: localData.graph,
      content: localData.content,
      insights: localData.insights
    };

    setInsights(updatedInsights);
    onClose();
  };

  const graphFormats = {
    'bar': {
      format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
      instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
      example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
    },
    'line': {
      format: 'Jan: 10, Feb: 12, Mar: 8, Apr: 15, May: 20',
      instruction: 'Provide time-series data as "Period: Value" pairs separated by commas.',
      example: 'Q1 2023: 45, Q2 2023: 52, Q3 2023: 48, Q4 2023: 60'
    },
    'pie': {
      format: 'Category1: 35%, Category2: 25%, Category3: 20%, Category4: 20%',
      instruction: 'Provide data as "Category: Percentage%" pairs. Percentages should add up to 100%.',
      example: 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%'
    },
    'scatter': {
      format: 'Tool1: (8.5, 1000), Tool2: (7.2, 800), Tool3: (9.1, 1200)',
      instruction: 'Provide data as "Name: (X-value, Y-value)" pairs for two-dimensional plotting.',
      example: 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)'
    },
    'area': {
      format: 'Period1: 100, Period2: 150, Period3: 120, Period4: 180',
      instruction: 'Provide cumulative or stacked data as "Period: Value" pairs.',
      example: 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
    }
  };

  const addContentPoint = () => {
    if (newContentPoint.trim()) {
      setLocalData({
        ...localData,
        content: {
          ...localData.content,
          response: [...localData.content.response, newContentPoint.trim()]
        }
      });
      setNewContentPoint('');
    }
  };

  const editContentPoint = (index, value) => {
    const newResponse = [...localData.content.response];
    newResponse[index] = value;
    setLocalData({
      ...localData,
      content: {
        ...localData.content,
        response: newResponse
      }
    });
  };

  const deleteContentPoint = (index) => {
    const newResponse = localData.content.response.filter((_, i) => i !== index);
    setLocalData({
      ...localData,
      content: {
        ...localData.content,
        response: newResponse
      }
    });
  };

  const addInsightPoint = () => {
    if (newInsightPoint.trim()) {
      setLocalData({
        ...localData,
        insights: {
          ...localData.insights,
          response: [...localData.insights.response, newInsightPoint.trim()]
        }
      });
      setNewInsightPoint('');
    }
  };

  const editInsightPoint = (index, value) => {
    const newResponse = [...localData.insights.response];
    newResponse[index] = value;
    setLocalData({
      ...localData,
      insights: {
        ...localData.insights,
        response: newResponse
      }
    });
  };

  const deleteInsightPoint = (index) => {
    const newResponse = localData.insights.response.filter((_, i) => i !== index);
    setLocalData({
      ...localData,
      insights: {
        ...localData.insights,
        response: newResponse
      }
    });
  };

  if (!show || !editingData) return null;

  const graphTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'scatter', label: 'Scatter Plot' },
    { value: 'area', label: 'Area Chart' }
  ];

  const currentGraphFormat = graphFormats[localData.graph.type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 my-8">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Edit Subpanel
        </h3>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
              Subpanel Name
            </label>
            <input
              type="text"
              value={localData.name}
              onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Database Selection */}
          <div>
            <DatabaseSelector
              selectedDatabase={localData.database}
              onDatabaseChange={(database) => setLocalData({ ...localData, database })}
              miData={miData}
            />
          </div>

          {/* Main Prompt */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
              Main Prompt
            </label>
            <textarea
              value={localData.prompt}
              onChange={(e) => setLocalData({ ...localData, prompt: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Enter the main prompt for this subpanel..."
            />
          </div>

          {/* Product DB Fields */}
          <div>
            <FieldSelector
              selectedFields={localData.fields}
              onFieldChange={(fields) => setLocalData({ ...localData, fields })}
              availableFields={availableFields}
              label="Product Database Fields"
            />
          </div>

          {/* Graph Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Type</label>
                <select
                  value={localData.graph.type}
                  onChange={(e) => setLocalData({
                    ...localData,
                    graph: { ...localData.graph, type: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="">Select Type</option>
                  {graphTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Heading</label>
                <input
                  type="text"
                  value={localData.graph.heading}
                  onChange={(e) => setLocalData({
                    ...localData,
                    graph: { ...localData.graph, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Enter graph heading..."
                />
              </div>
            </div>

            {currentGraphFormat && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-medium text-blue-800 mb-1">Format Instructions for {localData.graph.type} chart:</p>
                <p className="text-xs text-blue-600 mb-2">{currentGraphFormat.instruction}</p>
                <p className="text-xs text-blue-500">
                  <strong>Example:</strong> {currentGraphFormat.example}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Response</label>
              <textarea
                value={localData.graph.response}
                onChange={(e) => setLocalData({
                  ...localData,
                  graph: { ...localData.graph, response: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="3"
                placeholder={currentGraphFormat ? `Format: ${currentGraphFormat.format}` : "Enter graph data..."}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Content Heading</label>
              <input
                type="text"
                value={localData.content.heading}
                onChange={(e) => setLocalData({
                  ...localData,
                  content: { ...localData.content, heading: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter content heading..."
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#334155' }}>Content Points</label>
              
              {/* Existing Points */}
              <div className="space-y-2 mb-3">
                {localData.content.response.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded border">
                    <span className="text-xs text-gray-500 mt-1 w-6">{index + 1}.</span>
                    {editingContentPoint === index ? (
                      <textarea
                        value={point}
                        onChange={(e) => editContentPoint(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-sm"
                        rows="2"
                        onBlur={() => setEditingContentPoint(-1)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            setEditingContentPoint(-1);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="flex-1 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => setEditingContentPoint(index)}
                      >
                        {point}
                      </div>
                    )}
                    <button
                      onClick={() => deleteContentPoint(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete Point"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Point */}
              <div className="flex gap-2">
                <textarea
                  value={newContentPoint}
                  onChange={(e) => setNewContentPoint(e.target.value)}
                  className="flex-1 p-2 border rounded text-sm"
                  rows="2"
                  placeholder="Add new content point..."
                />
                <button
                  onClick={addContentPoint}
                  className="px-3 py-2 text-white rounded text-sm"
                  style={{ backgroundColor: '#7cc6ee' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Insights Heading</label>
              <input
                type="text"
                value={localData.insights.heading}
                onChange={(e) => setLocalData({
                  ...localData,
                  insights: { ...localData.insights, heading: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter insights heading..."
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#334155' }}>Insights Points</label>
              
              {/* Existing Points */}
              <div className="space-y-2 mb-3">
                {localData.insights.response.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded border">
                    <span className="text-xs text-gray-500 mt-1 w-6">{index + 1}.</span>
                    {editingInsightPoint === index ? (
                      <textarea
                        value={point}
                        onChange={(e) => editInsightPoint(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-sm"
                        rows="2"
                        onBlur={() => setEditingInsightPoint(-1)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            setEditingInsightPoint(-1);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="flex-1 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => setEditingInsightPoint(index)}
                      >
                        {point}
                      </div>
                    )}
                    <button
                      onClick={() => deleteInsightPoint(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete Point"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Point */}
              <div className="flex gap-2">
                <textarea
                  value={newInsightPoint}
                  onChange={(e) => setNewInsightPoint(e.target.value)}
                  className="flex-1 p-2 border rounded text-sm"
                  rows="2"
                  placeholder="Add new insight point..."
                />
                <button
                  onClick={addInsightPoint}
                  className="px-3 py-2 text-white rounded text-sm"
                  style={{ backgroundColor: '#7cc6ee' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 text-white rounded-lg"
            style={{ backgroundColor: '#1e2556' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligenceDashboard;
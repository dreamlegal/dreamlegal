// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Plus, Upload, Link, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

// const MarketIntelligenceDashboard = () => {
//   const [marketData, setMarketData] = useState(null);
//   const [dashboardData, setDashboardData] = useState({});
//   const [insights, setInsights] = useState({});
//   const [miData, setMiData] = useState({});
//   const [showJsonPreview, setShowJsonPreview] = useState(true);
//   const [availableFields, setAvailableFields] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadLoading, setUploadLoading] = useState(false);

//   // Modals
//   const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
//   const [showAddInsightPanelModal, setShowAddInsightPanelModal] = useState(false);
//   const [showAddSubpanelModal, setShowAddSubpanelModal] = useState(false);
//   const [selectedInsightPanel, setSelectedInsightPanel] = useState('');
//   const [selectedDatabaseCollection, setSelectedDatabaseCollection] = useState('');

//   // Form states
//   const [newCollectionName, setNewCollectionName] = useState('');
//   const [newInsightPanelName, setNewInsightPanelName] = useState('');
//   const [newSubpanelData, setNewSubpanelData] = useState({
//     name: '',
//     databaseCollection: '',
//     graph: { prompt: '', type: '', heading: '', fields: [] },
//     content: { prompt: '', type: 'para', heading: '' },
//     insights: { prompt: '', type: 'para', heading: '' }
//   });

//   useEffect(() => {
//     fetchAvailableFields();
//     // Load existing data if available
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
//           setMiData(latest.miData || {});
//         }
//       }
//     } catch (error) {
//       console.error('Error loading existing data:', error);
//     }
//   };

//   const handleSaveToDatabase = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         dashboardData,
//         insights,
//         miData
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

//   const handleFileUpload = async (file, type, collectionName) => {
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
        
//         // Update miData
//         const updatedMiData = { ...miData };
//         if (!updatedMiData[collectionName]) {
//           updatedMiData[collectionName] = { pdflinks: {}, articlelinks: {} };
//         }
        
//         const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
//         const linkId = Date.now().toString();
//         updatedMiData[collectionName][linkType][linkId] = {
//           url: result.url,
//           originalName: result.originalName,
//           fileName: result.fileName,
//           uploadDate: new Date().toISOString()
//         };

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

//   const handleAddLink = (collectionName, linkType, url, title) => {
//     const updatedMiData = { ...miData };
//     if (!updatedMiData[collectionName]) {
//       updatedMiData[collectionName] = { pdflinks: {}, articlelinks: {} };
//     }
    
//     const linkId = Date.now().toString();
//     updatedMiData[collectionName][linkType][linkId] = {
//       url,
//       title: title || url,
//       addedDate: new Date().toISOString()
//     };

//     setMiData(updatedMiData);
//   };

//   const handleAddCollection = () => {
//     if (newCollectionName.trim()) {
//       const updatedDashboardData = { ...dashboardData };
//       updatedDashboardData[newCollectionName] = {
//         createdAt: new Date().toISOString(),
//         files: [],
//         links: []
//       };
//       setDashboardData(updatedDashboardData);
      
//       const updatedMiData = { ...miData };
//       updatedMiData[newCollectionName] = { pdflinks: {}, articlelinks: {} };
//       setMiData(updatedMiData);
      
//       setNewCollectionName('');
//       setShowAddCollectionModal(false);
//     }
//   };

//   const handleAddInsightPanel = () => {
//     if (newInsightPanelName.trim()) {
//       const updatedInsights = { ...insights };
//       updatedInsights[newInsightPanelName] = {
//         data_header_name: newInsightPanelName,
//         createdAt: new Date().toISOString(),
//         subpanels: {}
//       };
//       setInsights(updatedInsights);
//       setNewInsightPanelName('');
//       setShowAddInsightPanelModal(false);
//     }
//   };

//   const handleAddSubpanel = () => {
//     if (newSubpanelData.name.trim() && selectedInsightPanel) {
//       const updatedInsights = { ...insights };
//       updatedInsights[selectedInsightPanel][newSubpanelData.name] = {
//         databaseCollection: newSubpanelData.databaseCollection,
//         graph: newSubpanelData.graph,
//         content: newSubpanelData.content,
//         insights: newSubpanelData.insights,
//         createdAt: new Date().toISOString()
//       };
//       setInsights(updatedInsights);
      
//       // Reset form
//       setNewSubpanelData({
//         name: '',
//         databaseCollection: '',
//         graph: { prompt: '', type: '', heading: '', fields: [] },
//         content: { prompt: '', type: 'para', heading: '' },
//         insights: { prompt: '', type: 'para', heading: '' }
//       });
//       setShowAddSubpanelModal(false);
//     }
//   };

//   const jsonPreview = {
//     dashboardData,
//     insights,
//     miData
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
//             Market Intelligence Dashboard
//           </h1>
//           <button
//             onClick={handleSaveToDatabase}
//             disabled={loading}
//             className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             <Save size={20} />
//             {loading ? 'Saving...' : 'Save to Database'}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Data Upload Section */}
//             <div className="bg-white rounded-lg shadow-lg">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
//                     Data Collections
//                   </h2>
//                   <button
//                     onClick={() => setShowAddCollectionModal(true)}
//                     className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//                     style={{ backgroundColor: '#7cc6ee' }}
//                   >
//                     <Plus size={16} />
//                     Add Collection
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 {Object.keys(dashboardData).map((collectionName) => (
//                   <DatabaseCollectionCard
//                     key={collectionName}
//                     collectionName={collectionName}
//                     miData={miData[collectionName] || { pdflinks: {}, articlelinks: {} }}
//                     onFileUpload={(file, type) => handleFileUpload(file, type, collectionName)}
//                     onAddLink={(linkType, url, title) => handleAddLink(collectionName, linkType, url, title)}
//                     uploadLoading={uploadLoading}
//                   />
//                 ))}
                
//                 {Object.keys(dashboardData).length === 0 && (
//                   <div className="text-center py-8" style={{ color: '#334155' }}>
//                     No collections yet. Add your first collection to get started.
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
//                     databaseCollections={Object.keys(dashboardData)}
//                     onAddSubpanel={() => {
//                       setSelectedInsightPanel(panelName);
//                       setShowAddSubpanelModal(true);
//                     }}
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
//       <AddCollectionModal
//         show={showAddCollectionModal}
//         onClose={() => setShowAddCollectionModal(false)}
//         value={newCollectionName}
//         onChange={setNewCollectionName}
//         onAdd={handleAddCollection}
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
//         databaseCollections={Object.keys(dashboardData)}
//         availableFields={availableFields}
//         onAdd={handleAddSubpanel}
//       />
//     </div>
//   );
// };

// // Database Collection Card Component
// const DatabaseCollectionCard = ({ collectionName, miData, onFileUpload, onAddLink, uploadLoading }) => {
//   const [newLink, setNewLink] = useState({ url: '', title: '', type: 'articlelinks' });
//   const [showAddLink, setShowAddLink] = useState(false);

//   const handleLinkSubmit = () => {
//     if (newLink.url.trim()) {
//       onAddLink(newLink.type, newLink.url, newLink.title);
//       setNewLink({ url: '', title: '', type: 'articlelinks' });
//       setShowAddLink(false);
//     }
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
//       <h3 className="font-semibold mb-4" style={{ color: '#1e2556' }}>
//         {collectionName}
//       </h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* File Upload */}
//         <div>
//           <h4 className="font-medium mb-2" style={{ color: '#334155' }}>
//             Upload Documents
//           </h4>
//           <div className="space-y-2">
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const type = file.type === 'application/pdf' ? 'pdf' : 'document';
//                   onFileUpload(file, type);
//                 }
//               }}
//               className="w-full text-sm"
//               disabled={uploadLoading}
//             />
//           </div>
          
//           {/* Display uploaded files */}
//           <div className="mt-3 space-y-1">
//             {Object.entries(miData.pdflinks || {}).map(([id, link]) => (
//               <div key={id} className="text-xs p-2 bg-white rounded border">
//                 <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
//                   {link.originalName || link.title}
//                 </a>
//               </div>
//             ))}
//             {Object.entries(miData.articlelinks || {}).map(([id, link]) => (
//               <div key={id} className="text-xs p-2 bg-white rounded border">
//                 <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
//                   {link.originalName || link.title}
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Link Management */}
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="font-medium" style={{ color: '#334155' }}>
//               Links
//             </h4>
//             <button
//               onClick={() => setShowAddLink(!showAddLink)}
//               className="text-sm px-3 py-1 rounded text-white"
//               style={{ backgroundColor: '#7cc6ee' }}
//             >
//               <Plus size={14} />
//             </button>
//           </div>
          
//           {showAddLink && (
//             <div className="space-y-2 mb-3">
//               <input
//                 type="url"
//                 placeholder="URL"
//                 value={newLink.url}
//                 onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
//                 className="w-full p-2 border rounded text-sm"
//               />
//               <input
//                 type="text"
//                 placeholder="Title (optional)"
//                 value={newLink.title}
//                 onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
//                 className="w-full p-2 border rounded text-sm"
//               />
//               <select
//                 value={newLink.type}
//                 onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}
//                 className="w-full p-2 border rounded text-sm"
//               >
//                 <option value="articlelinks">Article Links</option>
//                 <option value="pdflinks">PDF Links</option>
//               </select>
//               <button
//                 onClick={handleLinkSubmit}
//                 className="w-full py-2 text-white rounded text-sm"
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
// const InsightPanelCard = ({ panelName, panelData, databaseCollections, onAddSubpanel }) => {
//   return (
//     <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold" style={{ color: '#1e2556' }}>
//           {panelName}
//         </h3>
//         <button
//           onClick={onAddSubpanel}
//           className="flex items-center gap-2 px-3 py-1 text-white rounded text-sm"
//           style={{ backgroundColor: '#7cc6ee' }}
//         >
//           <Plus size={14} />
//           Add Subpanel
//         </button>
//       </div>
      
//       <div className="space-y-3">
//         {Object.entries(panelData.subpanels || {}).map(([subpanelName, subpanelData]) => (
//           <div key={subpanelName} className="bg-white p-3 rounded border">
//             <h4 className="font-medium mb-2" style={{ color: '#334155' }}>
//               {subpanelName}
//             </h4>
//             <div className="text-xs space-y-1" style={{ color: '#2d2d2d' }}>
//               <div>Database: {subpanelData.databaseCollection}</div>
//               <div>Graph Type: {subpanelData.graph.type}</div>
//               <div>Content Type: {subpanelData.content.type}</div>
//               <div>Insights Type: {subpanelData.insights.type}</div>
//             </div>
//           </div>
//         ))}
        
//         {Object.keys(panelData.subpanels || {}).length === 0 && (
//           <div className="text-center py-4 text-sm" style={{ color: '#334155' }}>
//             No subpanels yet. Add your first subpanel.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Modal Components
// const AddCollectionModal = ({ show, onClose, value, onChange, onAdd }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Database Collection
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

// const AddSubpanelModal = ({ show, onClose, subpanelData, setSubpanelData, databaseCollections, availableFields, onAdd }) => {
//   if (!show) return null;

//   const graphTypes = [
//     { value: 'bar', label: 'Bar Chart' },
//     { value: 'line', label: 'Line Chart' },
//     { value: 'pie', label: 'Pie Chart' },
//     { value: 'scatter', label: 'Scatter Plot' },
//     { value: 'area', label: 'Area Chart' }
//   ];

//   const contentTypes = [
//     { value: 'para', label: 'Paragraph' },
//     { value: 'point', label: 'Points' }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 my-8">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Subpanel
//         </h3>
        
//         <div className="space-y-4 max-h-96 overflow-y-auto">
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

//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//               Database Collection
//             </label>
//             <select
//               value={subpanelData.databaseCollection}
//               onChange={(e) => setSubpanelData({ ...subpanelData, databaseCollection: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Collection</option>
//               {databaseCollections.map(collection => (
//                 <option key={collection} value={collection}>{collection}</option>
//               ))}
//             </select>
//           </div>

//           {/* Graph Section */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-2" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
//                 <input
//                   type="text"
//                   value={subpanelData.graph.heading}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     graph: { ...subpanelData.graph, heading: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Type</label>
//                 <select
//                   value={subpanelData.graph.type}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     graph: { ...subpanelData.graph, type: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 >
//                   <option value="">Select Type</option>
//                   {graphTypes.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-3">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
//               <textarea
//                 value={subpanelData.graph.prompt}
//                 onChange={(e) => setSubpanelData({
//                   ...subpanelData,
//                   graph: { ...subpanelData.graph, prompt: e.target.value }
//                 })}
//                 className="w-full p-2 border rounded text-sm"
//                 rows="2"
//               />
//             </div>

//             <div className="mt-3">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Product DB Fields</label>
//               <select
//                 multiple
//                 value={subpanelData.graph.fields}
//                 onChange={(e) => {
//                   const selected = Array.from(e.target.selectedOptions, option => option.value);
//                   setSubpanelData({
//                     ...subpanelData,
//                     graph: { ...subpanelData.graph, fields: selected }
//                   });
//                 }}
//                 className="w-full p-2 border rounded text-sm h-20"
//               >
//                 {availableFields.map(field => (
//                   <option key={field.value} value={field.value}>{field.label}</option>
//                 ))}
//               </select>
//               <div className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-2" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
//                 <input
//                   type="text"
//                   value={subpanelData.content.heading}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     content: { ...subpanelData.content, heading: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
//                 <select
//                   value={subpanelData.content.type}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     content: { ...subpanelData.content, type: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 >
//                   {contentTypes.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-3">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
//               <textarea
//                 value={subpanelData.content.prompt}
//                 onChange={(e) => setSubpanelData({
//                   ...subpanelData,
//                   content: { ...subpanelData.content, prompt: e.target.value }
//                 })}
//                 className="w-full p-2 border rounded text-sm"
//                 rows="2"
//               />
//             </div>
//           </div>

//           {/* Insights Section */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-2" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
//                 <input
//                   type="text"
//                   value={subpanelData.insights.heading}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     insights: { ...subpanelData.insights, heading: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
//                 <select
//                   value={subpanelData.insights.type}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     insights: { ...subpanelData.insights, type: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 >
//                   {contentTypes.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-3">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
//               <textarea
//                 value={subpanelData.insights.prompt}
//                 onChange={(e) => setSubpanelData({
//                   ...subpanelData,
//                   insights: { ...subpanelData.insights, prompt: e.target.value }
//                 })}
//                 className="w-full p-2 border rounded text-sm"
//                 rows="2"
//               />
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

// export default MarketIntelligenceDashboard;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Plus, Upload, Link, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

// const MarketIntelligenceDashboard = () => {
//   const [marketData, setMarketData] = useState(null);
//   const [dashboardData, setDashboardData] = useState({});
//   const [insights, setInsights] = useState({});
//   const [miData, setMiData] = useState({});
//   const [showJsonPreview, setShowJsonPreview] = useState(true);
//   const [availableFields, setAvailableFields] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadLoading, setUploadLoading] = useState(false);

//   // Modals
//   const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
//   const [showAddInsightPanelModal, setShowAddInsightPanelModal] = useState(false);
//   const [showAddSubpanelModal, setShowAddSubpanelModal] = useState(false);
//   const [selectedInsightPanel, setSelectedInsightPanel] = useState('');
//   const [selectedDatabaseCollection, setSelectedDatabaseCollection] = useState('');

//   // Form states
//   const [newCollectionName, setNewCollectionName] = useState('');
//   const [newInsightPanelName, setNewInsightPanelName] = useState('');
//   const [newSubpanelData, setNewSubpanelData] = useState({
//     name: '',
//     databaseCollection: '',
//     graph: { prompt: '', type: '', heading: '', fields: [] },
//     content: { prompt: '', type: 'para', heading: '', fields: [] },
//     insights: { prompt: '', type: 'para', heading: '', fields: [] }
//   });

//   useEffect(() => {
//     fetchAvailableFields();
//     // Load existing data if available
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
          
//           // Convert old object format to new array format if needed
//           const miDataConverted = latest.miData || {};
//           Object.keys(miDataConverted).forEach(collectionName => {
//             if (miDataConverted[collectionName].pdflinks && typeof miDataConverted[collectionName].pdflinks === 'object' && !Array.isArray(miDataConverted[collectionName].pdflinks)) {
//               // Convert object to array
//               miDataConverted[collectionName].pdflinks = Object.values(miDataConverted[collectionName].pdflinks).map(item => item.url || item);
//             }
//             if (miDataConverted[collectionName].articlelinks && typeof miDataConverted[collectionName].articlelinks === 'object' && !Array.isArray(miDataConverted[collectionName].articlelinks)) {
//               // Convert object to array
//               miDataConverted[collectionName].articlelinks = Object.values(miDataConverted[collectionName].articlelinks).map(item => item.url || item);
//             }
//           });
          
//           setMiData(miDataConverted);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading existing data:', error);
//     }
//   };

//   const handleSaveToDatabase = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         dashboardData,
//         insights,
//         miData
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

//   const handleFileUpload = async (file, type, collectionName) => {
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
        
//         // Update miData
//         const updatedMiData = { ...miData };
//         if (!updatedMiData[collectionName]) {
//           updatedMiData[collectionName] = { pdflinks: [], articlelinks: [] };
//         }
        
//         const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
//         if (!updatedMiData[collectionName][linkType]) {
//           updatedMiData[collectionName][linkType] = [];
//         }
//         updatedMiData[collectionName][linkType].push(result.url);

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

//   const handleAddLink = (collectionName, url) => {
//     const updatedMiData = { ...miData };
//     if (!updatedMiData[collectionName]) {
//       updatedMiData[collectionName] = { pdflinks: [], articlelinks: [] };
//     }
    
//     // Add to articlelinks array for manual links
//     if (!updatedMiData[collectionName].articlelinks) {
//       updatedMiData[collectionName].articlelinks = [];
//     }
//     updatedMiData[collectionName].articlelinks.push(url);

//     setMiData(updatedMiData);
//   };

//   const handleAddCollection = () => {
//     if (newCollectionName.trim()) {
//       const updatedDashboardData = { ...dashboardData };
//       updatedDashboardData[newCollectionName] = {};
//       setDashboardData(updatedDashboardData);
      
//       const updatedMiData = { ...miData };
//       updatedMiData[newCollectionName] = { pdflinks: [], articlelinks: [] };
//       setMiData(updatedMiData);
      
//       setNewCollectionName('');
//       setShowAddCollectionModal(false);
//     }
//   };

//   const handleAddInsightPanel = () => {
//     if (newInsightPanelName.trim()) {
//       const updatedInsights = { ...insights };
//       updatedInsights[newInsightPanelName] = {
//         data_header_name: newInsightPanelName
//       };
//       setInsights(updatedInsights);
//       setNewInsightPanelName('');
//       setShowAddInsightPanelModal(false);
//     }
//   };

//   const handleAddSubpanel = () => {
//     if (newSubpanelData.name.trim() && selectedInsightPanel) {
//       const updatedInsights = { ...insights };
//       updatedInsights[selectedInsightPanel][newSubpanelData.name] = {
//         databaseCollection: newSubpanelData.databaseCollection,
//         graph: newSubpanelData.graph,
//         content: newSubpanelData.content,
//         insights: newSubpanelData.insights
//       };
//       setInsights(updatedInsights);
      
//       // Reset form
//       setNewSubpanelData({
//         name: '',
//         databaseCollection: '',
//         graph: { prompt: '', type: '', heading: '', fields: [] },
//         content: { prompt: '', type: 'para', heading: '', fields: [] },
//         insights: { prompt: '', type: 'para', heading: '', fields: [] }
//       });
//       setShowAddSubpanelModal(false);
//     }
//   };

//   const jsonPreview = {
//     dashboardData,
//     insights,
//     miData
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
//             Market Intelligence Dashboard
//           </h1>
//           <button
//             onClick={handleSaveToDatabase}
//             disabled={loading}
//             className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             <Save size={20} />
//             {loading ? 'Saving...' : 'Save to Database'}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Data Upload Section */}
//             <div className="bg-white rounded-lg shadow-lg">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
//                     Data Collections
//                   </h2>
//                   <button
//                     onClick={() => setShowAddCollectionModal(true)}
//                     className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//                     style={{ backgroundColor: '#7cc6ee' }}
//                   >
//                     <Plus size={16} />
//                     Add Collection
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 {Object.keys(dashboardData).map((collectionName) => (
//                   <DatabaseCollectionCard
//                     key={collectionName}
//                     collectionName={collectionName}
//                     miData={miData[collectionName] || { pdflinks: [], articlelinks: [] }}
//                     onFileUpload={(file, type) => handleFileUpload(file, type, collectionName)}
//                     onAddLink={(url) => handleAddLink(collectionName, url)}
//                     uploadLoading={uploadLoading}
//                   />
//                 ))}
                
//                 {Object.keys(dashboardData).length === 0 && (
//                   <div className="text-center py-8" style={{ color: '#334155' }}>
//                     No collections yet. Add your first collection to get started.
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
//                     databaseCollections={Object.keys(dashboardData)}
//                     onAddSubpanel={() => {
//                       setSelectedInsightPanel(panelName);
//                       setShowAddSubpanelModal(true);
//                     }}
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
//       <AddCollectionModal
//         show={showAddCollectionModal}
//         onClose={() => setShowAddCollectionModal(false)}
//         value={newCollectionName}
//         onChange={setNewCollectionName}
//         onAdd={handleAddCollection}
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
//         databaseCollections={Object.keys(dashboardData)}
//         availableFields={availableFields}
//         onAdd={handleAddSubpanel}
//       />
//     </div>
//   );
// };

// // Database Collection Card Component
// const DatabaseCollectionCard = ({ collectionName, miData, onFileUpload, onAddLink, uploadLoading }) => {
//   const [newLinkUrl, setNewLinkUrl] = useState('');
//   const [showAddLink, setShowAddLink] = useState(false);

//   const handleLinkSubmit = () => {
//     if (newLinkUrl.trim()) {
//       onAddLink(newLinkUrl);
//       setNewLinkUrl('');
//       setShowAddLink(false);
//     }
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
//       <h3 className="font-semibold mb-4" style={{ color: '#1e2556' }}>
//         {collectionName}
//       </h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* File Upload */}
//         <div>
//           <h4 className="font-medium mb-2" style={{ color: '#334155' }}>
//             Upload Documents
//           </h4>
//           <div className="space-y-2">
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const type = file.type === 'application/pdf' ? 'pdf' : 'document';
//                   onFileUpload(file, type);
//                 }
//               }}
//               className="w-full text-sm"
//               disabled={uploadLoading}
//             />
//           </div>
          
//           {/* Display uploaded files */}
//           <div className="mt-3 space-y-1">
//             <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>PDF Files:</div>
//             {(miData.pdflinks || []).map((url, index) => (
//               <div key={index} className="text-xs p-2 bg-white rounded border">
//                 <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
//                   PDF File {index + 1}
//                 </a>
//               </div>
//             ))}
//             <div className="text-xs font-medium mb-1 mt-2" style={{ color: '#334155' }}>Document Files:</div>
//             {(miData.articlelinks || []).map((url, index) => (
//               <div key={index} className="text-xs p-2 bg-white rounded border">
//                 <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
//                   Document {index + 1}
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Link Management */}
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="font-medium" style={{ color: '#334155' }}>
//               Add Links
//             </h4>
//             <button
//               onClick={() => setShowAddLink(!showAddLink)}
//               className="text-sm px-3 py-1 rounded text-white"
//               style={{ backgroundColor: '#7cc6ee' }}
//             >
//               <Plus size={14} />
//             </button>
//           </div>
          
//           {showAddLink && (
//             <div className="space-y-2 mb-3">
//               <input
//                 type="url"
//                 placeholder="Enter URL"
//                 value={newLinkUrl}
//                 onChange={(e) => setNewLinkUrl(e.target.value)}
//                 className="w-full p-2 border rounded text-sm"
//               />
//               <button
//                 onClick={handleLinkSubmit}
//                 className="w-full py-2 text-white rounded text-sm"
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
// const InsightPanelCard = ({ panelName, panelData, databaseCollections, onAddSubpanel }) => {
//   // Filter out data_header_name to get actual subpanels
//   const subpanels = Object.entries(panelData).filter(([key, value]) => 
//     key !== 'data_header_name' && typeof value === 'object' && value.databaseCollection
//   );

//   return (
//     <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold" style={{ color: '#1e2556' }}>
//           {panelName}
//         </h3>
//         <button
//           onClick={onAddSubpanel}
//           className="flex items-center gap-2 px-3 py-1 text-white rounded text-sm"
//           style={{ backgroundColor: '#7cc6ee' }}
//         >
//           <Plus size={14} />
//           Add Subpanel
//         </button>
//       </div>
      
//       <div className="space-y-3">
//         {subpanels.map(([subpanelName, subpanelData]) => (
//           <div key={subpanelName} className="bg-white p-3 rounded border">
//             <h4 className="font-medium mb-2" style={{ color: '#334155' }}>
//               {subpanelName}
//             </h4>
//             <div className="text-xs space-y-1" style={{ color: '#2d2d2d' }}>
//               <div>Database: {subpanelData.databaseCollection}</div>
//               <div>Graph Type: {subpanelData.graph.type}</div>
//               <div>Content Type: {subpanelData.content.type}</div>
//               <div>Insights Type: {subpanelData.insights.type}</div>
//               <div>Graph Fields: {subpanelData.graph.fields?.length || 0} selected</div>
//               <div>Content Fields: {subpanelData.content.fields?.length || 0} selected</div>
//               <div>Insights Fields: {subpanelData.insights.fields?.length || 0} selected</div>
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

// // Modal Components
// const AddCollectionModal = ({ show, onClose, value, onChange, onAdd }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Database Collection
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

// const AddSubpanelModal = ({ show, onClose, subpanelData, setSubpanelData, databaseCollections, availableFields, onAdd }) => {
//   if (!show) return null;

//   const graphTypes = [
//     { value: 'bar', label: 'Bar Chart' },
//     { value: 'line', label: 'Line Chart' },
//     { value: 'pie', label: 'Pie Chart' },
//     { value: 'scatter', label: 'Scatter Plot' },
//     { value: 'area', label: 'Area Chart' }
//   ];

//   const contentTypes = [
//     { value: 'para', label: 'Paragraph' },
//     { value: 'point', label: 'Points' }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
//         <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
//           Add Subpanel
//         </h3>
        
//         <div className="space-y-6 max-h-96 overflow-y-auto">
//           {/* Basic Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//                 Subpanel Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g., Key Feature Types"
//                 value={subpanelData.name}
//                 onChange={(e) => setSubpanelData({ ...subpanelData, name: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
//                 Database Collection
//               </label>
//               <select
//                 value={subpanelData.databaseCollection}
//                 onChange={(e) => setSubpanelData({ ...subpanelData, databaseCollection: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               >
//                 <option value="">Select Collection</option>
//                 {databaseCollections.map(collection => (
//                   <option key={collection} value={collection}>{collection}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Graph Section */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
//                 <input
//                   type="text"
//                   value={subpanelData.graph.heading}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     graph: { ...subpanelData.graph, heading: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Type</label>
//                 <select
//                   value={subpanelData.graph.type}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     graph: { ...subpanelData.graph, type: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 >
//                   <option value="">Select Type</option>
//                   {graphTypes.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
//               <textarea
//                 value={subpanelData.graph.prompt}
//                 onChange={(e) => setSubpanelData({
//                   ...subpanelData,
//                   graph: { ...subpanelData.graph, prompt: e.target.value }
//                 })}
//                 className="w-full p-2 border rounded text-sm"
//                 rows="2"
//               />
//             </div>

//             <FieldSelector
//               selectedFields={subpanelData.graph.fields}
//               onFieldChange={(fields) => setSubpanelData({
//                 ...subpanelData,
//                 graph: { ...subpanelData.graph, fields }
//               })}
//               availableFields={availableFields}
//               label="Graph Database Fields"
//             />
//           </div>

//           {/* Content Section */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
//                 <input
//                   type="text"
//                   value={subpanelData.content.heading}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     content: { ...subpanelData.content, heading: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
//                 <select
//                   value={subpanelData.content.type}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     content: { ...subpanelData.content, type: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 >
//                   {contentTypes.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
//               <textarea
//                 value={subpanelData.content.prompt}
//                 onChange={(e) => setSubpanelData({
//                   ...subpanelData,
//                   content: { ...subpanelData.content, prompt: e.target.value }
//                 })}
//                 className="w-full p-2 border rounded text-sm"
//                 rows="2"
//               />
//             </div>

//             <FieldSelector
//               selectedFields={subpanelData.content.fields}
//               onFieldChange={(fields) => setSubpanelData({
//                 ...subpanelData,
//                 content: { ...subpanelData.content, fields }
//               })}
//               availableFields={availableFields}
//               label="Content Database Fields"
//             />
//           </div>

//           {/* Insights Section */}
//           <div className="border-t pt-4">
//             <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
//                 <input
//                   type="text"
//                   value={subpanelData.insights.heading}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     insights: { ...subpanelData.insights, heading: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
//                 <select
//                   value={subpanelData.insights.type}
//                   onChange={(e) => setSubpanelData({
//                     ...subpanelData,
//                     insights: { ...subpanelData.insights, type: e.target.value }
//                   })}
//                   className="w-full p-2 border rounded text-sm"
//                 >
//                   {contentTypes.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
//               <textarea
//                 value={subpanelData.insights.prompt}
//                 onChange={(e) => setSubpanelData({
//                   ...subpanelData,
//                   insights: { ...subpanelData.insights, prompt: e.target.value }
//                 })}
//                 className="w-full p-2 border rounded text-sm"
//                 rows="2"
//               />
//             </div>

//             <FieldSelector
//               selectedFields={subpanelData.insights.fields}
//               onFieldChange={(fields) => setSubpanelData({
//                 ...subpanelData,
//                 insights: { ...subpanelData.insights, fields }
//               })}
//               availableFields={availableFields}
//               label="Insights Database Fields"
//             />
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

// export default MarketIntelligenceDashboard;
'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Link, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

const MarketIntelligenceDashboard = () => {
  const [marketData, setMarketData] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [insights, setInsights] = useState({});
  const [miData, setMiData] = useState({});
  
  // Edit states
  const [editingPanel, setEditingPanel] = useState(null);
  const [editingSubpanel, setEditingSubpanel] = useState(null);
  const [editPanelName, setEditPanelName] = useState('');
  const [editSubpanelName, setEditSubpanelName] = useState('');
  const [showJsonPreview, setShowJsonPreview] = useState(true);
  const [availableFields, setAvailableFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Modals
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [showAddInsightPanelModal, setShowAddInsightPanelModal] = useState(false);
  const [showAddSubpanelModal, setShowAddSubpanelModal] = useState(false);
  const [showEditSubpanelModal, setShowEditSubpanelModal] = useState(false);
  const [selectedInsightPanel, setSelectedInsightPanel] = useState('');
  const [selectedDatabaseCollection, setSelectedDatabaseCollection] = useState('');
  const [editingSubpanelData, setEditingSubpanelData] = useState(null);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  // Form states
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newInsightPanelName, setNewInsightPanelName] = useState('');
  const [newSubpanelData, setNewSubpanelData] = useState({
    name: '',
    databaseCollection: '',
    graph: { prompt: '', type: '', heading: '', fields: [] },
    content: { prompt: '', type: 'para', heading: '', fields: [] },
    insights: { prompt: '', type: 'para', heading: '', fields: [] }
  });

  useEffect(() => {
    fetchAvailableFields();
    // Load existing data if available
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
          
          // Convert old object format to new array format if needed
          const miDataConverted = latest.miData || {};
          Object.keys(miDataConverted).forEach(collectionName => {
            // Add fileNames object for display
            if (!miDataConverted[collectionName].fileNames) {
              miDataConverted[collectionName].fileNames = {};
            }
            
            if (miDataConverted[collectionName].pdflinks && typeof miDataConverted[collectionName].pdflinks === 'object' && !Array.isArray(miDataConverted[collectionName].pdflinks)) {
              // Convert object to array and extract names
              const pdfArray = [];
              Object.values(miDataConverted[collectionName].pdflinks).forEach(item => {
                const url = item.url || item;
                const name = item.originalName || item.title || url;
                pdfArray.push(url);
                miDataConverted[collectionName].fileNames[url] = name;
              });
              miDataConverted[collectionName].pdflinks = pdfArray;
            }
            
            if (miDataConverted[collectionName].articlelinks && typeof miDataConverted[collectionName].articlelinks === 'object' && !Array.isArray(miDataConverted[collectionName].articlelinks)) {
              // Convert object to array and extract names
              const articleArray = [];
              Object.values(miDataConverted[collectionName].articlelinks).forEach(item => {
                const url = item.url || item;
                const name = item.title || item.originalName || url;
                articleArray.push(url);
                miDataConverted[collectionName].fileNames[url] = name;
              });
              miDataConverted[collectionName].articlelinks = articleArray;
            }
            
            // Ensure arrays exist
            if (!miDataConverted[collectionName].pdflinks) {
              miDataConverted[collectionName].pdflinks = [];
            }
            if (!miDataConverted[collectionName].articlelinks) {
              miDataConverted[collectionName].articlelinks = [];
            }
          });
          
          setMiData(miDataConverted);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  };

  const handleSaveToDatabase = async () => {
    setLoading(true);
    try {
      // Clean miData before saving (remove fileNames)
      const cleanMiData = {};
      Object.keys(miData).forEach(collectionName => {
        cleanMiData[collectionName] = {
          pdflinks: miData[collectionName].pdflinks || [],
          articlelinks: miData[collectionName].articlelinks || []
        };
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

  const handleFileUpload = async (file, type, collectionName) => {
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
        
        // Update miData with file info for display
        const updatedMiData = { ...miData };
        if (!updatedMiData[collectionName]) {
          updatedMiData[collectionName] = { 
            pdflinks: [], 
            articlelinks: [],
            fileNames: {} // Store names separately for display
          };
        }
        
        const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
        if (!updatedMiData[collectionName][linkType]) {
          updatedMiData[collectionName][linkType] = [];
        }
        if (!updatedMiData[collectionName].fileNames) {
          updatedMiData[collectionName].fileNames = {};
        }
        
        updatedMiData[collectionName][linkType].push(result.url);
        updatedMiData[collectionName].fileNames[result.url] = result.originalName;

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

  const handleAddLink = (collectionName, url, name) => {
    const updatedMiData = { ...miData };
    if (!updatedMiData[collectionName]) {
      updatedMiData[collectionName] = { 
        pdflinks: [], 
        articlelinks: [],
        fileNames: {}
      };
    }
    
    // Add to articlelinks array for manual links
    if (!updatedMiData[collectionName].articlelinks) {
      updatedMiData[collectionName].articlelinks = [];
    }
    if (!updatedMiData[collectionName].fileNames) {
      updatedMiData[collectionName].fileNames = {};
    }
    
    updatedMiData[collectionName].articlelinks.push(url);
    updatedMiData[collectionName].fileNames[url] = name || url;

    setMiData(updatedMiData);
  };

  const handleDeleteFile = (collectionName, url, type) => {
    const updatedMiData = { ...miData };
    const linkType = type === 'pdf' ? 'pdflinks' : 'articlelinks';
    
    // Remove from array
    updatedMiData[collectionName][linkType] = updatedMiData[collectionName][linkType].filter(link => link !== url);
    
    // Remove from fileNames
    delete updatedMiData[collectionName].fileNames[url];
    
    setMiData(updatedMiData);
  };

  const handleDeleteCollection = (collectionName) => {
    const updatedDashboardData = { ...dashboardData };
    const updatedMiData = { ...miData };
    
    delete updatedDashboardData[collectionName];
    delete updatedMiData[collectionName];
    
    setDashboardData(updatedDashboardData);
    setMiData(updatedMiData);
  };

  const handleEditPanel = (panelName, newName) => {
    if (newName && newName !== panelName) {
      const updatedInsights = { ...insights };
      updatedInsights[newName] = updatedInsights[panelName];
      updatedInsights[newName].data_header_name = newName;
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

  const handleAddCollection = () => {
    if (newCollectionName.trim()) {
      const updatedDashboardData = { ...dashboardData };
      updatedDashboardData[newCollectionName] = {};
      setDashboardData(updatedDashboardData);
      
      const updatedMiData = { ...miData };
      updatedMiData[newCollectionName] = { 
        pdflinks: [], 
        articlelinks: [],
        fileNames: {}
      };
      setMiData(updatedMiData);
      
      setNewCollectionName('');
      setShowAddCollectionModal(false);
    }
  };

  const handleAddInsightPanel = () => {
    if (newInsightPanelName.trim()) {
      const updatedInsights = { ...insights };
      updatedInsights[newInsightPanelName] = {
        data_header_name: newInsightPanelName
      };
      setInsights(updatedInsights);
      setNewInsightPanelName('');
      setShowAddInsightPanelModal(false);
    }
  };

  const handleAddSubpanel = () => {
    if (newSubpanelData.name.trim() && selectedInsightPanel) {
      const updatedInsights = { ...insights };
      updatedInsights[selectedInsightPanel][newSubpanelData.name] = {
        databaseCollection: newSubpanelData.databaseCollection,
        graph: newSubpanelData.graph,
        content: newSubpanelData.content,
        insights: newSubpanelData.insights
      };
      setInsights(updatedInsights);
      
      // Reset form
      setNewSubpanelData({
        name: '',
        databaseCollection: '',
        graph: { prompt: '', type: '', heading: '', fields: [] },
        content: { prompt: '', type: 'para', heading: '', fields: [] },
        insights: { prompt: '', type: 'para', heading: '', fields: [] }
      });
      setShowAddSubpanelModal(false);
    }
  };

  const jsonPreview = {
    dashboardData,
    insights,
    miData: Object.keys(miData).reduce((acc, collectionName) => {
      acc[collectionName] = {
        pdflinks: miData[collectionName].pdflinks || [],
        articlelinks: miData[collectionName].articlelinks || []
      };
      return acc;
    }, {})
  };
  const handleAnalyze = async () => {
    setAnalyzeLoading(true);
    try {
      // Clean miData before sending (remove fileNames)
      const cleanMiData = {};
      Object.keys(miData).forEach(collectionName => {
        cleanMiData[collectionName] = {
          pdflinks: miData[collectionName].pdflinks || [],
          articlelinks: miData[collectionName].articlelinks || []
        };
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1e2556' }}>
            Market Intelligence Dashboard
          </h1>
          <button
            onClick={handleSaveToDatabase}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#1e2556' }}
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save to Database'}
          </button>
        </div> */}
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
            {/* Data Upload Section */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold" style={{ color: '#1e2556' }}>
                    Data Collections
                  </h2>
                  <button
                    onClick={() => setShowAddCollectionModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#7cc6ee' }}
                  >
                    <Plus size={16} />
                    Add Collection
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {Object.keys(dashboardData).map((collectionName) => (
                  <DatabaseCollectionCard
                    key={collectionName}
                    collectionName={collectionName}
                    miData={miData[collectionName] || { pdflinks: [], articlelinks: [], fileNames: {} }}
                    onFileUpload={(file, type) => handleFileUpload(file, type, collectionName)}
                    onAddLink={(url, name) => handleAddLink(collectionName, url, name)}
                    onDeleteFile={(url, type) => handleDeleteFile(collectionName, url, type)}
                    onDeleteCollection={() => handleDeleteCollection(collectionName)}
                    uploadLoading={uploadLoading}
                  />
                ))}
                
                {Object.keys(dashboardData).length === 0 && (
                  <div className="text-center py-8" style={{ color: '#334155' }}>
                    No collections yet. Add your first collection to get started.
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
                    databaseCollections={Object.keys(dashboardData)}
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
                    editingSubpanel={editingSubpanel}
                    setEditingSubpanel={setEditingSubpanel}
                    editSubpanelName={editSubpanelName}
                    setEditSubpanelName={setEditSubpanelName}
                    onEditSubpanel={handleEditSubpanel}
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
      <AddCollectionModal
        show={showAddCollectionModal}
        onClose={() => setShowAddCollectionModal(false)}
        value={newCollectionName}
        onChange={setNewCollectionName}
        onAdd={handleAddCollection}
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
        databaseCollections={Object.keys(dashboardData)}
        availableFields={availableFields}
        onAdd={handleAddSubpanel}
      />

      <EditSubpanelModal
        show={showEditSubpanelModal}
        onClose={() => setShowEditSubpanelModal(false)}
        editingData={editingSubpanelData}
        databaseCollections={Object.keys(dashboardData)}
        availableFields={availableFields}
        insights={insights}
        setInsights={setInsights}
      />
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
    <div className="border border-gray-200 rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold" style={{ color: '#1e2556' }}>
          {collectionName}
        </h3>
        <button
          onClick={onDeleteCollection}
          className="text-red-500 hover:text-red-700 p-1"
          title="Delete Collection"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* File Upload */}
        <div>
          <h4 className="font-medium mb-2" style={{ color: '#334155' }}>
            Upload Documents
          </h4>
          <div className="space-y-2">
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
              className="w-full text-sm"
              disabled={uploadLoading}
            />
          </div>
          
          {/* Display uploaded files */}
          <div className="mt-3 space-y-1">
            <div className="text-xs font-medium mb-1" style={{ color: '#334155' }}>PDF Files:</div>
            {(miData.pdflinks || []).map((url, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
                  {getFileName(url)}
                </a>
                <button
                  onClick={() => onDeleteFile(url, 'pdf')}
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Delete File"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            
            <div className="text-xs font-medium mb-1 mt-2" style={{ color: '#334155' }}>Article Links:</div>
            {(miData.articlelinks || []).map((url, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#7cc6ee' }}>
                  {getFileName(url)}
                </a>
                <button
                  onClick={() => onDeleteFile(url, 'article')}
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Delete Link"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Link Management */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium" style={{ color: '#334155' }}>
              Add Links
            </h4>
            <button
              onClick={() => setShowAddLink(!showAddLink)}
              className="text-sm px-3 py-1 rounded text-white"
              style={{ backgroundColor: '#7cc6ee' }}
            >
              <Plus size={14} />
            </button>
          </div>
          
          {showAddLink && (
            <div className="space-y-2 mb-3">
              <input
                type="url"
                placeholder="Enter URL"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Display Name (optional)"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
              <button
                onClick={handleLinkSubmit}
                className="w-full py-2 text-white rounded text-sm"
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
const InsightPanelCard = ({ panelName, panelData, databaseCollections, onAddSubpanel, editingPanel, setEditingPanel, editPanelName, setEditPanelName, onEditPanel, onDeletePanel, editingSubpanel, setEditingSubpanel, editSubpanelName, setEditSubpanelName, onEditSubpanel, onDeleteSubpanel, setShowEditSubpanelModal, setEditingSubpanelData }) => {
  // Filter out data_header_name to get actual subpanels
  const subpanels = Object.entries(panelData).filter(([key, value]) => 
    key !== 'data_header_name' && typeof value === 'object' && value.databaseCollection
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
              <div>Database: {subpanelData.databaseCollection}</div>
              <div>Graph Type: {subpanelData.graph.type}</div>
              <div>Content Type: {subpanelData.content.type}</div>
              <div>Insights Type: {subpanelData.insights.type}</div>
              <div>Graph Fields: {subpanelData.graph.fields?.length || 0} selected</div>
              <div>Content Fields: {subpanelData.content.fields?.length || 0} selected</div>
              <div>Insights Fields: {subpanelData.insights.fields?.length || 0} selected</div>
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

// Modal Components
const AddCollectionModal = ({ show, onClose, value, onChange, onAdd }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Add Database Collection
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

const AddSubpanelModal = ({ show, onClose, subpanelData, setSubpanelData, databaseCollections, availableFields, onAdd }) => {
  if (!show) return null;

  const graphTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'scatter', label: 'Scatter Plot' },
    { value: 'area', label: 'Area Chart' }
  ];

  const contentTypes = [
    { value: 'para', label: 'Paragraph' },
    { value: 'point', label: 'Points' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Add Subpanel
        </h3>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
                Database Collection
              </label>
              <select
                value={subpanelData.databaseCollection}
                onChange={(e) => setSubpanelData({ ...subpanelData, databaseCollection: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Collection</option>
                {databaseCollections.map(collection => (
                  <option key={collection} value={collection}>{collection}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Graph Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
                <input
                  type="text"
                  value={subpanelData.graph.heading}
                  onChange={(e) => setSubpanelData({
                    ...subpanelData,
                    graph: { ...subpanelData.graph, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Graph Type</label>
                <select
                  value={subpanelData.graph.type}
                  onChange={(e) => setSubpanelData({
                    ...subpanelData,
                    graph: { ...subpanelData.graph, type: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="">Select Type</option>
                  {graphTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
              <textarea
                value={subpanelData.graph.prompt}
                onChange={(e) => setSubpanelData({
                  ...subpanelData,
                  graph: { ...subpanelData.graph, prompt: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="2"
              />
            </div>

            <FieldSelector
              selectedFields={subpanelData.graph.fields}
              onFieldChange={(fields) => setSubpanelData({
                ...subpanelData,
                graph: { ...subpanelData.graph, fields }
              })}
              availableFields={availableFields}
              label="Graph Database Fields"
            />
          </div>

          {/* Content Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
                <input
                  type="text"
                  value={subpanelData.content.heading}
                  onChange={(e) => setSubpanelData({
                    ...subpanelData,
                    content: { ...subpanelData.content, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
                <select
                  value={subpanelData.content.type}
                  onChange={(e) => setSubpanelData({
                    ...subpanelData,
                    content: { ...subpanelData.content, type: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
              <textarea
                value={subpanelData.content.prompt}
                onChange={(e) => setSubpanelData({
                  ...subpanelData,
                  content: { ...subpanelData.content, prompt: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="2"
              />
            </div>

            <FieldSelector
              selectedFields={subpanelData.content.fields}
              onFieldChange={(fields) => setSubpanelData({
                ...subpanelData,
                content: { ...subpanelData.content, fields }
              })}
              availableFields={availableFields}
              label="Content Database Fields"
            />
          </div>

          {/* Insights Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
                <input
                  type="text"
                  value={subpanelData.insights.heading}
                  onChange={(e) => setSubpanelData({
                    ...subpanelData,
                    insights: { ...subpanelData.insights, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
                <select
                  value={subpanelData.insights.type}
                  onChange={(e) => setSubpanelData({
                    ...subpanelData,
                    insights: { ...subpanelData.insights, type: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
              <textarea
                value={subpanelData.insights.prompt}
                onChange={(e) => setSubpanelData({
                  ...subpanelData,
                  insights: { ...subpanelData.insights, prompt: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="2"
              />
            </div>

            <FieldSelector
              selectedFields={subpanelData.insights.fields}
              onFieldChange={(fields) => setSubpanelData({
                ...subpanelData,
                insights: { ...subpanelData.insights, fields }
              })}
              availableFields={availableFields}
              label="Insights Database Fields"
            />
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
const EditSubpanelModal = ({ show, onClose, editingData, databaseCollections, availableFields, insights, setInsights }) => {
  const [localData, setLocalData] = useState({
    name: '',
    databaseCollection: '',
    graph: { prompt: '', type: '', heading: '', fields: [] },
    content: { prompt: '', type: 'para', heading: '', fields: [] },
    insights: { prompt: '', type: 'para', heading: '', fields: [] }
  });

  useEffect(() => {
    if (editingData) {
      setLocalData({
        name: editingData.subpanelName,
        databaseCollection: editingData.data.databaseCollection,
        graph: editingData.data.graph,
        content: editingData.data.content,
        insights: editingData.data.insights
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
      databaseCollection: localData.databaseCollection,
      graph: localData.graph,
      content: localData.content,
      insights: localData.insights
    };

    setInsights(updatedInsights);
    onClose();
  };

  if (!show || !editingData) return null;

  const graphTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'scatter', label: 'Scatter Plot' },
    { value: 'area', label: 'Area Chart' }
  ];

  const contentTypes = [
    { value: 'para', label: 'Paragraph' },
    { value: 'point', label: 'Points' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e2556' }}>
          Edit Subpanel
        </h3>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
                Database Collection
              </label>
              <select
                value={localData.databaseCollection}
                onChange={(e) => setLocalData({ ...localData, databaseCollection: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Collection</option>
                {databaseCollections.map(collection => (
                  <option key={collection} value={collection}>{collection}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Graph Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Graph Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
                <input
                  type="text"
                  value={localData.graph.heading}
                  onChange={(e) => setLocalData({
                    ...localData,
                    graph: { ...localData.graph, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
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
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
              <textarea
                value={localData.graph.prompt}
                onChange={(e) => setLocalData({
                  ...localData,
                  graph: { ...localData.graph, prompt: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="2"
              />
            </div>

            <FieldSelector
              selectedFields={localData.graph.fields}
              onFieldChange={(fields) => setLocalData({
                ...localData,
                graph: { ...localData.graph, fields }
              })}
              availableFields={availableFields}
              label="Graph Database Fields"
            />
          </div>

          {/* Content Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Content Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
                <input
                  type="text"
                  value={localData.content.heading}
                  onChange={(e) => setLocalData({
                    ...localData,
                    content: { ...localData.content, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
                <select
                  value={localData.content.type}
                  onChange={(e) => setLocalData({
                    ...localData,
                    content: { ...localData.content, type: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
              <textarea
                value={localData.content.prompt}
                onChange={(e) => setLocalData({
                  ...localData,
                  content: { ...localData.content, prompt: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="2"
              />
            </div>

            <FieldSelector
              selectedFields={localData.content.fields}
              onFieldChange={(fields) => setLocalData({
                ...localData,
                content: { ...localData.content, fields }
              })}
              availableFields={availableFields}
              label="Content Database Fields"
            />
          </div>

          {/* Insights Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3" style={{ color: '#1e2556' }}>Insights Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Heading</label>
                <input
                  type="text"
                  value={localData.insights.heading}
                  onChange={(e) => setLocalData({
                    ...localData,
                    insights: { ...localData.insights, heading: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#334155' }}>Type</label>
                <select
                  value={localData.insights.type}
                  onChange={(e) => setLocalData({
                    ...localData,
                    insights: { ...localData.insights, type: e.target.value }
                  })}
                  className="w-full p-2 border rounded text-sm"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1" style={{ color: '#334155' }}>Prompt</label>
              <textarea
                value={localData.insights.prompt}
                onChange={(e) => setLocalData({
                  ...localData,
                  insights: { ...localData.insights, prompt: e.target.value }
                })}
                className="w-full p-2 border rounded text-sm"
                rows="2"
              />
            </div>

            <FieldSelector
              selectedFields={localData.insights.fields}
              onFieldChange={(fields) => setLocalData({
                ...localData,
                insights: { ...localData.insights, fields }
              })}
              availableFields={availableFields}
              label="Insights Database Fields"
            />
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




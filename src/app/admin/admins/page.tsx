'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '../_components/AdminContext';
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiX } from 'react-icons/fi';

export default function AdminManagementPage() {
  const { adminData, isLoading } = useAdmin();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'editor',
    permissions: {
      tabs: {},
      components: {}
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Define available tabs and components
  const availableTabs = [
    { id: 'Products', label: 'Products' },
    { id: 'Vendors', label: 'Vendors' },
    { id: 'Blog', label: 'Blog' },
    { id: 'Analytics', label: 'Analytics' }
  ];

  const availableComponents = {
    Products: [
      { id: 'NewProduct', label: 'New Product' },
      { id: 'AllProduct', label: 'All Products' },
      { id: 'AdminProductCreation', label: 'Admin Product Creation' },
      { id: 'AdminProductClaimsPage', label: 'Product Claims' }
    ],
    Vendors: [
      { id: 'VendorsPage', label: 'Vendors Management' },
      { id: 'UsersPage', label: 'Users Management' }
    ],
    Blog: [
      { id: 'adminblog', label: 'Blog Management' },
      
    ],
    Analytics: [
      { id: 'addAnalytics', label: 'Analytics Dashboard' },
      { id: 'sendNotification', label: 'Send Notifications' },
      { id: 'adminLeads', label: 'Manage Leads' }
    ]
  };

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/adminn/list');
      const data = await response.json();
      
      if (data.success) {
        setAdmins(data.admins);
      } else {
        setError(data.message || 'Failed to fetch admins');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('An error occurred while fetching admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle tab permission changes
  const handleTabChange = (tabId, checked) => {
    const updatedTabs = { 
      ...formData.permissions.tabs, 
      [tabId]: checked 
    };
    
    // If tab is unchecked, uncheck all its components too
    let updatedComponents = { ...formData.permissions.components };
    if (!checked) {
      const tabComponents = availableComponents[tabId] || [];
      tabComponents.forEach(component => {
        updatedComponents[component.id] = false;
      });
    }

    setFormData(prev => ({
      ...prev,
      permissions: {
        tabs: updatedTabs,
        components: updatedComponents
      }
    }));
  };

  // Handle component permission changes
  const handleComponentChange = (componentId, checked, tabId) => {
    // If a component is checked, make sure its parent tab is checked too
    let updatedTabs = { ...formData.permissions.tabs };
    if (checked) {
      updatedTabs[tabId] = true;
    }

    setFormData(prev => ({
      ...prev,
      permissions: {
        tabs: updatedTabs,
        components: {
          ...prev.permissions.components,
          [componentId]: checked
        }
      }
    }));
  };

  // Quick templates for common roles
  const applyTemplate = (template) => {
    switch (template) {
      case 'seo':
        setFormData(prev => ({
          ...prev,
          role: 'seo_admin',
          permissions: {
            tabs: { Blog: true },
            components: { adminblog: true, CreateBlog: true }
          }
        }));
        break;
      case 'product':
        setFormData(prev => ({
          ...prev,
          role: 'product_admin',
          permissions: {
            tabs: { Products: true },
            components: { 
              NewProduct: true, 
              AllProduct: true, 
              AdminProductCreation: true, 
              AdminProductClaimsPage: true 
            }
          }
        }));
        break;
      case 'vendor':
        setFormData(prev => ({
          ...prev,
          role: 'vendor_admin',
          permissions: {
            tabs: { Vendors: true },
            components: { 
              VendorsPage: true, 
              UsersPage: true
            }
          }
        }));
        break;
      case 'super':
        setFormData(prev => ({
          ...prev,
          role: 'super_admin',
          permissions: {
            tabs: {
              Products: true,
              Vendors: true,
              Blog: true,
              Analytics: true
            },
            components: {
              NewProduct: true,
              AllProduct: true,
              AdminProductCreation: true,
              AdminProductClaimsPage: true,
              VendorsPage: true,
              UsersPage: true,
              adminblog: true,
              CreateBlog: true,
              addAnalytics: true,
              sendNotification: true,
              adminLeads: true
            }
          }
        }));
        break;
      default:
        break;
    }
  };

  // Handle admin creation/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = selectedAdmin ? `/api/adminn/${selectedAdmin.id}` : '/api/adminn/create';
      const method = selectedAdmin ? 'PUT' : 'POST';

      // For update, omit password if empty
      const submitData = { ...formData };
      if (selectedAdmin && !submitData.password) {
        delete submitData.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(selectedAdmin ? 'Admin updated successfully' : 'Admin created successfully');
        fetchAdmins();
        closeModal();
      } else {
        setError(data.message || 'Failed to save admin');
      }
    } catch (error) {
      console.error('Error saving admin:', error);
      setError('An error occurred while saving');
    }
  };

  // Reset form and close modal
  const closeModal = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'editor',
      permissions: {
        tabs: {},
        components: {}
      }
    });
    setSelectedAdmin(null);
    setShowModal(false);
    setShowPassword(false);
  };

  // Open create modal
  const openCreateModal = () => {
    setSelectedAdmin(null);
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'editor',
      permissions: {
        tabs: {},
        components: {}
      }
    });
    setShowModal(true);
  };

  // Open edit modal
  const handleEdit = (admin) => {
    // Clone permissions to ensure we don't mutate the original object
    const permissions = {
      tabs: { ...(admin.permissions?.tabs || {}) },
      components: { ...(admin.permissions?.components || {}) }
    };

    setFormData({
      email: admin.email,
      password: '', // Don't show password, leave blank for no change
      name: admin.name || '',
      role: admin.role,
      permissions
    });
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  // Delete admin
  const handleDelete = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      const response = await fetch(`/api/adminn/${adminId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Admin deleted successfully');
        fetchAdmins();
        if (selectedAdmin && selectedAdmin.id === adminId) {
          closeModal();
        }
      } else {
        setError(data.message || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      setError('An error occurred while deleting');
    }
  };

  if (isLoading || loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Check if current admin has permission to manage admins
  if (adminData?.role !== 'super_admin') {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">You don't have permission to manage admins.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Management</h1>
      
      {/* Success and Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Create Admin Button */}
      <div className="mb-6">
        <button
          onClick={openCreateModal}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Admin
        </button>
      </div>
      
      {/* Admin List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No admins found.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id} className={admin.id === adminData.id ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.name || 'No Name'}</div>
                    <div className="text-sm text-gray-500">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      {admin.id !== adminData.id && ( // Don't allow deleting yourself
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Create/Edit Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedAdmin ? 'Edit Admin' : 'Create New Admin'}
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close</span>
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    {/* Modal content */}
                    <form onSubmit={handleSubmit} className="mt-2">
                      {/* Quick Templates */}
                      <div className="mb-6">
                        <h2 className="text-sm font-medium text-gray-700 mb-2">Quick Templates</h2>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => applyTemplate('seo')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                          >
                            SEO Admin
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate('product')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200"
                          >
                            Product Admin
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate('vendor')}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200"
                          >
                            Vendor Admin
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate('super')}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200"
                          >
                            Super Admin
                          </button>
                        </div>
                      </div>
                      
                      {/* Admin Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password {selectedAdmin && '(Leave blank to keep current)'}
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required={!selectedAdmin}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                            <option value="seo_admin">SEO Admin</option>
                            <option value="product_admin">Product Admin</option>
                            <option value="vendor_admin">Vendor Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Permissions Section */}
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-700 mb-3">Permissions</h3>
                        <p className="text-sm text-gray-500 mb-4">Super admins have access to everything automatically.</p>

                        <div className="max-h-60 overflow-y-auto space-y-4">
                          {availableTabs.map((tab) => (
                            <div key={tab.id} className="border rounded-md p-4">
                              <div className="flex items-center mb-2">
                                <input
                                  type="checkbox"
                                  id={`tab-${tab.id}`}
                                  checked={formData.permissions.tabs[tab.id] || false}
                                  onChange={(e) => handleTabChange(tab.id, e.target.checked)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`tab-${tab.id}`} className="ml-2 block text-sm font-medium text-gray-700">
                                  {tab.label} Tab
                                </label>
                              </div>
                              
                              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {(availableComponents[tab.id] || []).map((component) => (
                                  <div key={component.id} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id={`modal-component-${component.id}`}
                                      checked={formData.permissions.components[component.id] || false}
                                      onChange={(e) => handleComponentChange(component.id, e.target.checked, tab.id)}
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                      disabled={!formData.permissions.tabs[tab.id]}
                                    />
                                    <label htmlFor={`modal-component-${component.id}`} className="ml-2 block text-sm text-gray-700">
                                      {component.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Modal footer */}
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {selectedAdmin ? 'Update Admin' : 'Create Admin'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
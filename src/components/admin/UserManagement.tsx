"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Search, PlusCircle, Edit, Mail, Phone, 
  Globe, Calendar, Activity, Users, Briefcase,
  XCircle, MapPin, Database, Lock, Check, Eye,
  FileText, Building, BookOpen, Save, Star, 
  BarChart2, List, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showIndustryFilter, setShowIndustryFilter] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(20);
  
  // Industry options (can be fetched from API if needed)
  const industryOptions = [
    'All Industries',
    'Legal',
    'Finance',
    'Healthcare',
    'Technology',
    'Education',
    'Manufacturing',
    'Retail',
    'Government',
    'Consulting'
  ];
  
  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, selectedIndustry]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', usersPerPage.toString());
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (selectedIndustry && selectedIndustry !== 'all') {
        params.append('industry', selectedIndustry);
      }
      
      const response = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
        setTotalUsers(data.pagination.totalUsers);
      } else {
        throw new Error(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1); // Reset to page 1 when search changes
      } else {
        fetchUsers();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowEditUserModal(true);
  };

  // Add User Modal
  const AddUserModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      organizationName: '',
      organizationType: '',
      teamSize: '',
      contact: '',
      location: '',
      address: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSubmitting(true);

      try {
        // Validate required fields
        if (!formData.email || !formData.password || !formData.organizationName || !formData.organizationType || !formData.teamSize) {
          throw new Error('Email, password, organization name, organization type, and team size are required');
        }

        // Create user account
        const response = await fetch('/api/admin/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create user');
        }

        setSuccess(true);
        fetchUsers(); // Refresh user list
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        setError(error.message);
      } finally {
        setSubmitting(false);
      }
    };

    // Organization type options
    const orgTypeOptions = [
      'Law Firm',
      'Enterprise',
      'Individual',
      'Startup',
      'Government',
      'Judiciary'
    ];

    // Team size options
    const teamSizeOptions = [
      '1',
      '2-20',
      '21-50',
      '51-200',
      '201-500',
      '500+'
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-[#f5f7fa] to-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1e2556] text-white rounded-full flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e2556]">Add New User</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-134px)]">
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <p className="text-green-700">User account created successfully!</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Account Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-[#334155] mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Organization Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="organizationName" className="block text-sm font-medium text-[#334155] mb-1">
                        Organization Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          id="organizationName"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="organizationType" className="block text-sm font-medium text-[#334155] mb-1">
                        Organization Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          id="organizationType"
                          name="organizationType"
                          value={formData.organizationType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        >
                          <option value="">Select Organization Type</option>
                          {orgTypeOptions.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium text-[#334155] mb-1">
                        Team Size <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        >
                          <option value="">Select Team Size</option>
                          {teamSizeOptions.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Additional Information (Optional)</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-[#334155] mb-1">
                          Contact Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-[#334155] mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-[#334155] mb-1">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-[#2d2d2d] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  // Edit User Modal
  const EditUserModal = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
      email: user.email || '',
      password: '',
      organizationName: user.userAccount?.[0]?.CompanyAddress || '',
      organizationType: user.userAccount?.[0]?.OrgType || '',
      teamSize: user.userAccount?.[0]?.TeamSize || '',
      contact: user.userAccount?.[0]?.Contact || '',
      location: user.userAccount?.[0]?.Location || '',
      address: user.userAccount?.[0]?.Address || '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSubmitting(true);

      try {
        // Validate required fields
        if (!formData.email || !formData.organizationName || !formData.organizationType || !formData.teamSize) {
          throw new Error('Email, organization name, organization type, and team size are required');
        }

        if (changePassword && !formData.password) {
          throw new Error('Please enter a new password');
        }

        // Update user account
        const response = await fetch(`/api/admin/users/update/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            updatePassword: changePassword
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to update user');
        }

        setSuccess(true);
        fetchUsers(); // Refresh user list
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        setError(error.message);
      } finally {
        setSubmitting(false);
      }
    };

    // Organization type options
    const orgTypeOptions = [
      'Law Firm',
      'Enterprise',
      'Individual',
      'Startup',
      'Government',
      'Judiciary'
    ];

    // Team size options
    const teamSizeOptions = [
      '1',
      '2-20',
      '21-50',
      '51-200',
      '201-500',
      '500+'
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-[#f5f7fa] to-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1e2556] text-white rounded-full flex items-center justify-center">
                <Edit className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e2556]">Edit User</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-134px)]">
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <p className="text-green-700">User information updated successfully!</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Account Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="changePassword"
                        checked={changePassword}
                        onChange={() => setChangePassword(!changePassword)}
                        className="mr-2 h-4 w-4 text-[#1e2556] focus:ring-[#1e2556] rounded"
                      />
                      <label htmlFor="changePassword" className="text-sm text-[#334155]">
                        Change Password
                      </label>
                    </div>
                    
                    {changePassword && (
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#334155] mb-1">
                          New Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                            required={changePassword}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Organization Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="organizationName" className="block text-sm font-medium text-[#334155] mb-1">
                        Organization Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          id="organizationName"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="organizationType" className="block text-sm font-medium text-[#334155] mb-1">
                        Organization Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          id="organizationType"
                          name="organizationType"
                          value={formData.organizationType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        >
                          <option value="">Select Organization Type</option>
                          {orgTypeOptions.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium text-[#334155] mb-1">
                        Team Size <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          required
                        >
                          <option value="">Select Team Size</option>
                          {teamSizeOptions.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Additional Information</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-[#334155] mb-1">
                          Contact Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-[#334155] mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-[#334155] mb-1">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-[#2d2d2d] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    'Update User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  // User Details Modal
  const UserDetailsModal = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userStats, setUserStats] = useState({
      totalSavedProducts: 0,
      totalReviews: 0,
      totalPosts: 0,
      lastActivity: null
    });
    const [savedProducts, setSavedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchUserData(user.id);
    }, [user.id]);

    const fetchUserData = async (userId) => {
      try {
        setLoading(true);
        
        // Get user stats
        const statsResponse = await fetch(`/api/admin/user-stats?userId=${userId}`);
        const statsData = await statsResponse.json();
        
        if (statsResponse.ok) {
          setUserStats(statsData.stats);
        }
        
        // Get saved products
        const productsResponse = await fetch(`/api/admin/user-saved-products?userId=${userId}`);
        const productsData = await productsResponse.json();
        
        if (productsResponse.ok) {
          setSavedProducts(productsData.products);
        }
        
        // Get reviews
        const reviewsResponse = await fetch(`/api/admin/user-reviews?userId=${userId}`);
        const reviewsData = await reviewsResponse.json();
        
        if (reviewsResponse.ok) {
          setReviews(reviewsData.reviews);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case 'profile':
          return (
            <div className="space-y-6">
              {/* User Account Details */}
              <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                <h4 className="text-lg font-medium mb-4 text-[#1e2556]">User Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Email:</span>
                    <span className="text-[#2d2d2d] break-all">{user.email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Name:</span>
                    <span className="text-[#2d2d2d]">{user.name || 'Not specified'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Created:</span>
                    <span className="text-[#2d2d2d]">{new Date(user.createdAt).toLocaleDateString()} 
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(user.createdAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                  {user.emailVerified && (
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Verified:</span>
                      <span className="text-[#2d2d2d]">{new Date(user.emailVerified).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Organization Details */}
              {user.userAccount && user.userAccount.length > 0 && (
                <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Organization Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Organization:</span>
                      <span className="text-[#2d2d2d] font-medium">{user.userAccount[0].CompanyAddress || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Type:</span>
                      <span className="text-[#2d2d2d]">{user.userAccount[0].OrgType || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Team Size:</span>
                      <span className="text-[#2d2d2d]">{user.userAccount[0].TeamSize || 'Not specified'}</span>
                    </div>
                    {user.userAccount[0].Contact && (
                      <div className="flex items-start">
                        <span className="w-32 text-[#334155] text-sm">Contact:</span>
                        <span className="text-[#2d2d2d]">{user.userAccount[0].Contact}</span>
                      </div>
                    )}
                    {user.userAccount[0].Location && (
                      <div className="flex items-start">
                        <span className="w-32 text-[#334155] text-sm">Location:</span>
                        <span className="text-[#2d2d2d]">{user.userAccount[0].Location}</span>
                      </div>
                    )}
                    {user.userAccount[0].Address && (
                      <div className="flex items-start">
                        <span className="w-32 text-[#334155] text-sm">Address:</span>
                        <span className="text-[#2d2d2d]">{user.userAccount[0].Address}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* User Preferences */}
                  {(user.userAccount[0].Industry?.length > 0 || 
                    user.userAccount[0].PracticeArea?.length > 0 || 
                    user.userAccount[0].WorkType?.length > 0 || 
                    user.userAccount[0].Goals?.length > 0 || 
                    user.userAccount[0].ExistingTools?.length > 0 ||
                    user.userAccount[0].PrimaryLanguage?.length > 0) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-md font-medium mb-3 text-[#1e2556]">Preferences & Interests</h5>
                        
                        {user.userAccount[0].Industry?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[#334155] font-medium text-sm mb-1">Industries</div>
                            <div className="flex flex-wrap gap-2">
                              {user.userAccount[0].Industry.map((item) => (
                                <span key={item} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {user.userAccount[0].PracticeArea?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[#334155] font-medium text-sm mb-1">Practice Areas</div>
                            <div className="flex flex-wrap gap-2">
                              {user.userAccount[0].PracticeArea.map((item) => (
                                <span key={item} className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {user.userAccount[0].WorkType?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[#334155] font-medium text-sm mb-1">Work Types</div>
                            <div className="flex flex-wrap gap-2">
                              {user.userAccount[0].WorkType.map((item) => (
                                <span key={item} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {user.userAccount[0].Goals?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[#334155] font-medium text-sm mb-1">Goals</div>
                            <div className="flex flex-wrap gap-2">
                              {user.userAccount[0].Goals.map((item) => (
                                <span key={item} className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {user.userAccount[0].PrimaryLanguage?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[#334155] font-medium text-sm mb-1">Languages</div>
                            <div className="flex flex-wrap gap-2">
                              {user.userAccount[0].PrimaryLanguage.map((item) => (
                                <span key={item} className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {user.userAccount[0].ExistingTools?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[#334155] font-medium text-sm mb-1">Existing Tools</div>
                            <div className="flex flex-wrap gap-2">
                              {user.userAccount[0].ExistingTools.map((item) => (
                                <span key={item} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              )}
              
              {/* User Activity Summary */}
              <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200">
                <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Activity Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-[#334155] mb-1">
                      <Save className="w-4 h-4" />
                      <span className="text-sm">Saved Products</span>
                    </div>
                    <div className="text-2xl font-semibold text-[#1e2556]">{userStats.totalSavedProducts}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-[#334155] mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">Reviews</span>
                    </div>
                    <div className="text-2xl font-semibold text-[#1e2556]">{userStats.totalReviews}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-[#334155] mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">Posts</span>
                    </div>
                    <div className="text-2xl font-semibold text-[#1e2556]">{userStats.totalPosts}</div>
                  </div>
                </div>
                
                {userStats.lastActivity && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-[#334155] mb-2">Recent Activity</h5>
                    <div className="text-[#2d2d2d]">
                      Last activity: {new Date(userStats.lastActivity).toLocaleDateString()} 
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(userStats.lastActivity).toLocaleTimeString()})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 'savedProducts':
          return (
            <div>
              <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Saved Products</h4>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2556]"></div>
                </div>
              ) : savedProducts.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f5f7fa]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Vendor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Saved Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {savedProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.logoUrl ? (
                                <img 
                                  src={product.logoUrl} 
                                  alt={product.name} 
                                  className="h-10 w-10 object-cover rounded-md mr-4"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md mr-4">
                                  <ShoppingBag className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-[#2d2d2d]">{product.name}</div>
                                <div className="text-xs text-[#334155]">Saved on {new Date(product.savedAt).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {product.category?.slice(0, 2).map((cat, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                                  {cat}
                                </span>
                              ))}
                              {product.category?.length > 2 && (
                                <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-full">
                                  +{product.category.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2d2d2d]">{product.vendorName || 'Unknown vendor'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2d2d2d]">{new Date(product.savedAt).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a 
                              href={`/product/${product.slug}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#7cc6ee] hover:text-[#5b9dbe] text-sm font-medium"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-[#f5f7fa] rounded-xl p-8 text-center">
                  <Save className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No saved products found</p>
                </div>
              )}
            </div>
          );
        case 'reviews':
          return (
            <div>
              <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Product Reviews</h4>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2556]"></div>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 flex justify-between">
                        <div className="flex items-center">
                          {review.product?.logoUrl ? (
                            <img 
                              src={review.product.logoUrl} 
                              alt={review.product.name} 
                              className="h-10 w-10 object-cover rounded-md mr-3"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md mr-3">
                              <ShoppingBag className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h5 className="font-medium text-[#1e2556]">{review.product?.name || 'Product'}</h5>
                            <div className="text-xs text-[#334155]">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: review.recommend || 0 }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400" fill="#facc15" />
                            ))}
                            {Array.from({ length: 5 - (review.recommend || 0) }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-[#2d2d2d]">{review.recommend}/5</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-[#334155] mb-1">Ease of Learning</div>
                            <div className="flex items-center">
                              <div className="flex">
                                {Array.from({ length: review.easeOfLearning || 0 }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-yellow-400" fill="#facc15" />
                                ))}
                                {Array.from({ length: 5 - (review.easeOfLearning || 0) }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-[#2d2d2d]">{review.easeOfLearning}/5</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-[#334155] mb-1">Integration</div>
                            <div className="flex items-center">
                              <div className="flex">
                                {Array.from({ length: review.integration || 0 }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-yellow-400" fill="#facc15" />
                                ))}
                                {Array.from({ length: 5 - (review.integration || 0) }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-[#2d2d2d]">{review.integration}/5</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-[#334155] mb-1">ROI</div>
                            <div className="flex items-center">
                              <div className="flex">
                                {Array.from({ length: review.roi || 0 }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-yellow-400" fill="#facc15" />
                                ))}
                                {Array.from({ length: 5 - (review.roi || 0) }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-[#2d2d2d]">{review.roi}/5</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h6 className="text-sm font-medium text-[#334155] mb-2">User Experience</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs font-medium text-green-600 mb-1">Best Thing</div>
                              <p className="text-sm text-[#2d2d2d]">{review.bestThing}</p>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-red-600 mb-1">Worst Thing</div>
                              <p className="text-sm text-[#2d2d2d]">{review.worstThing}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm">
                          <div className="text-xs font-medium text-[#334155] mb-1">Overall Experience</div>
                          <p className="text-sm text-[#2d2d2d]">{review.overallExperienc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#f5f7fa] rounded-xl p-8 text-center">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No reviews found</p>
                </div>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-[#f5f7fa] to-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1e2556] text-white rounded-full flex items-center justify-center overflow-hidden">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name || user.email} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1e2556]">
                  {user.name || user.email}
                </h3>
                <p className="text-sm text-[#334155]">User ID: {user.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-[#1e2556] text-[#1e2556]'
                    : 'border-transparent text-[#334155] hover:text-[#1e2556] hover:border-gray-300'
                }`}
              >
                Profile & Preferences
              </button>
              <button
                onClick={() => setActiveTab('savedProducts')}
                className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'savedProducts'
                    ? 'border-[#1e2556] text-[#1e2556]'
                    : 'border-transparent text-[#334155] hover:text-[#1e2556] hover:border-gray-300'
                }`}
              >
                Saved Products ({userStats.totalSavedProducts})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-[#1e2556] text-[#1e2556]'
                    : 'border-transparent text-[#334155] hover:text-[#1e2556] hover:border-gray-300'
                }`}
              >
                Reviews ({userStats.totalReviews})
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-190px)]">
            {renderTabContent()}
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-[#f5f7fa] flex justify-end space-x-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-[#2d2d2d] bg-white hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                onClose();
                handleEditUser(user);
              }}
              className="px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit User
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e2556] mb-2">User Management</h1>
        <p className="text-[#334155]">Manage all user accounts, view user activity, and monitor engagement</p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-start sm:items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users by name, email, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
          />
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3 w-full sm:w-auto justify-between sm:justify-start">          
          <div className="relative">
            <button 
              onClick={() => setShowIndustryFilter(!showIndustryFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-gray-600" />
              <span>Filter by Industry</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showIndustryFilter ? 'transform rotate-180' : ''}`} />
            </button>
            
            {/* Filter dropdown */}
            <AnimatePresence>
              {showIndustryFilter && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                >
                  <div className="p-2">
                    <div className="p-2 text-xs font-medium text-gray-500 uppercase">Industry</div>
                    {industryOptions.map((industry) => (
                      <button 
                        key={industry}
                        onClick={() => {
                          setSelectedIndustry(industry === 'All Industries' ? 'all' : industry);
                          setShowIndustryFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                          (selectedIndustry === industry.toLowerCase() || 
                           (selectedIndustry === 'all' && industry === 'All Industries'))
                            ? 'bg-[#1e2556] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setShowAddUserModal(true)}
            className="px-4 py-2 bg-[#1e2556] text-white rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e2556]"></div>
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#f5f7fa]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Organization Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Team Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#334155] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#1e2556] text-white rounded-full flex items-center justify-center overflow-hidden">
                            {user.image ? (
                              <img 
                                src={user.image} 
                                alt={user.name || user.email} 
                                className="h-10 w-10 object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#2d2d2d]">
                              {user.name || user.email}
                            </div>
                            <div className="text-xs text-[#334155]">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        {user.userAccount?.[0]?.CompanyAddress || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        {user.userAccount?.[0]?.OrgType || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        {user.userAccount?.[0]?.TeamSize || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="text-[#1e2556] hover:text-opacity-80 p-1"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleViewDetails(user)}
                            className="text-[#7cc6ee] hover:text-[#5b9dbe] p-1"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-[#f5f7fa] px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-[#334155]">
                Showing page {currentPage} of {totalPages} ({totalUsers} total users)
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#2d2d2d] hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {/* First page */}
                  {currentPage > 3 && (
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-1 rounded-md bg-white text-[#2d2d2d] border border-gray-300 hover:bg-gray-50"
                    >
                      1
                    </button>
                  )}
                  
                  {/* Ellipsis for many pages */}
                  {currentPage > 4 && (
                    <span className="px-2 py-1">...</span>
                  )}
                  
                  {/* Page numbers around current page */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    
                    if (totalPages <= 5) {
                      // Show all pages if total is 5 or less
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Show first 5 pages
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Show last 5 pages
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Show current page and 2 before/after
                      pageNum = currentPage - 2 + i;
                    }
                    
                    // Only render if pageNum is valid
                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === pageNum
                              ? 'bg-[#1e2556] text-white'
                              : 'bg-white text-[#2d2d2d] hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  {/* Ellipsis for many pages */}
                  {currentPage < totalPages - 3 && (
                    <span className="px-2 py-1">...</span>
                  )}
                  
                  {/* Last page */}
                  {totalPages > 3 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 rounded-md bg-white text-[#2d2d2d] border border-gray-300 hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#2d2d2d] hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-[#f5f7fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#1e2556]" />
            </div>
            <h3 className="text-lg font-medium text-[#1e2556] mb-1">No Users Found</h3>
            <p className="text-[#334155] max-w-md mx-auto">
              {searchTerm || selectedIndustry !== 'all' ? 
                'Try adjusting your search or filters to find what you\'re looking for.' :
                'There are no users in the system yet.'}
            </p>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="mt-6 inline-flex items-center px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New User
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedUser && (
          <UserDetailsModal 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)} 
          />
        )}
        
        {showAddUserModal && (
          <AddUserModal 
            onClose={() => setShowAddUserModal(false)} 
          />
        )}
        
        {showEditUserModal && userToEdit && (
          <EditUserModal 
            user={userToEdit} 
            onClose={() => {
              setShowEditUserModal(false);
              setUserToEdit(null);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersPage;
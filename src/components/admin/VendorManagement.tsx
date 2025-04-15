"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Search, Building, Eye, Edit, Mail, Phone, 
  Globe, Calendar, ShoppingBag, Activity, Users,
  XCircle, PlusCircle, Briefcase, MapPin, Database, 
  Layout, Lock, Key, Check, ChevronDown, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showEditVendorModal, setShowEditVendorModal] = useState(false);
  const [vendorToEdit, setVendorToEdit] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVendors, setTotalVendors] = useState(0);
  const [vendorsPerPage] = useState(20);
  
  useEffect(() => {
    fetchVendors();
  }, [currentPage, searchTerm]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', vendorsPerPage.toString());
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const response = await fetch(`/api/admin/vendors?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setVendors(data.vendors);
        setTotalPages(data.pagination.totalPages);
        setTotalVendors(data.pagination.totalVendors);
      } else {
        throw new Error(data.error || 'Failed to fetch vendors');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
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
        fetchVendors();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleEditVendor = (vendor) => {
    setVendorToEdit(vendor);
    setShowEditVendorModal(true);
  };

  // Add Vendor Modal
  const AddVendorModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      companyName: '',
      website: '',
      contact: '',
      headQuaters: '',
      yearFounded: '',
      nameOfFounders: '',
      teamSize: ''
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
        if (!formData.email || !formData.password) {
          throw new Error('Email and password are required');
        }

        // Create vendor account
        const response = await fetch('/api/admin/vendors/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create vendor');
        }

        setSuccess(true);
        fetchVendors(); // Refresh vendor list
        
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
              <h3 className="text-xl font-semibold text-[#1e2556]">Add New Vendor</h3>
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
                <p className="text-green-700">Vendor account created successfully!</p>
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
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Company Information (Optional)</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-[#334155] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-[#334155] mb-1">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
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
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="headQuaters" className="block text-sm font-medium text-[#334155] mb-1">
                          Headquarters
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="headQuaters"
                            name="headQuaters"
                            value={formData.headQuaters}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="yearFounded" className="block text-sm font-medium text-[#334155] mb-1">
                          Year Founded
                        </label>
                        <input
                          type="text"
                          id="yearFounded"
                          name="yearFounded"
                          value={formData.yearFounded}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nameOfFounders" className="block text-sm font-medium text-[#334155] mb-1">
                          Founder Name
                        </label>
                        <input
                          type="text"
                          id="nameOfFounders"
                          name="nameOfFounders"
                          value={formData.nameOfFounders}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="teamSize" className="block text-sm font-medium text-[#334155] mb-1">
                          Team Size
                        </label>
                        <input
                          type="text"
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                        />
                      </div>
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
                    'Create Vendor'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  // Edit Vendor Modal
  const EditVendorModal = ({ vendor, onClose }) => {
    const [formData, setFormData] = useState({
      email: vendor.email || '',
      password: '',
      companyName: vendor.companyInfo?.[0]?.companyName || '',
      website: vendor.companyInfo?.[0]?.website || '',
      contact: vendor.companyInfo?.[0]?.contact || '',
      headQuaters: vendor.companyInfo?.[0]?.headQuaters || '',
      yearFounded: vendor.companyInfo?.[0]?.yearFounded || '',
      nameOfFounders: vendor.companyInfo?.[0]?.NameOfFounders || '',
      teamSize: vendor.companyInfo?.[0]?.TeamSize || '',
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
        if (!formData.email) {
          throw new Error('Email is required');
        }

        if (changePassword && !formData.password) {
          throw new Error('Please enter a new password');
        }

        // Update vendor account
        const response = await fetch(`/api/admin/vendors/update/${vendor.id}`, {
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
          throw new Error(data.error || 'Failed to update vendor');
        }

        setSuccess(true);
        fetchVendors(); // Refresh vendor list
        
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
              <h3 className="text-xl font-semibold text-[#1e2556]">Edit Vendor</h3>
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
                <p className="text-green-700">Vendor information updated successfully!</p>
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
                  <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Company Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-[#334155] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-[#334155] mb-1">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
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
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="headQuaters" className="block text-sm font-medium text-[#334155] mb-1">
                          Headquarters
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="headQuaters"
                            name="headQuaters"
                            value={formData.headQuaters}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="yearFounded" className="block text-sm font-medium text-[#334155] mb-1">
                          Year Founded
                        </label>
                        <input
                          type="text"
                          id="yearFounded"
                          name="yearFounded"
                          value={formData.yearFounded}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nameOfFounders" className="block text-sm font-medium text-[#334155] mb-1">
                          Founder Name
                        </label>
                        <input
                          type="text"
                          id="nameOfFounders"
                          name="nameOfFounders"
                          value={formData.nameOfFounders}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="teamSize" className="block text-sm font-medium text-[#334155] mb-1">
                          Team Size
                        </label>
                        <input
                          type="text"
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
                        />
                      </div>
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
                    'Update Vendor'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  // Vendor Details Modal
  const VendorDetailsModal = ({ vendor, onClose }) => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [companyLoading, setCompanyLoading] = useState(true);
    const [stats, setStats] = useState({
      totalProducts: 0,
      totalViews: 0,
      totalLeads: 0,
      completionRate: 0
    });

    useEffect(() => {
      fetchVendorProducts(vendor.id);
      fetchCompanyInfo(vendor.id);
      fetchVendorStats(vendor.id);
    }, [vendor.id]);

    const fetchVendorProducts = async (vendorId) => {
      try {
        setProductsLoading(true);
        const response = await fetch(`/api/admin/vendor-products?vendorId=${vendorId}`);
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data.products);
        } else {
          throw new Error(data.error || 'Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching vendor products:', error);
      } finally {
        setProductsLoading(false);
      }
    };

    const fetchCompanyInfo = async (vendorId) => {
      try {
        setCompanyLoading(true);
        const response = await fetch(`/api/admin/vendor-company?vendorId=${vendorId}`);
        const data = await response.json();
        
        if (response.ok && data.company) {
          setCompanyDetails(data.company);
        } else {
          // If no company info, set to null
          setCompanyDetails(null);
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      } finally {
        setCompanyLoading(false);
      }
    };

    const fetchVendorStats = async (vendorId) => {
      try {
        const response = await fetch(`/api/admin/vendor-stats?vendorId=${vendorId}`);
        const data = await response.json();
        
        if (response.ok) {
          setStats(data.stats);
        } else {
          throw new Error(data.error || 'Failed to fetch stats');
        }
      } catch (error) {
        console.error('Error fetching vendor stats:', error);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-[#f5f7fa] to-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1e2556] text-white rounded-full flex items-center justify-center overflow-hidden">
                {vendor.image ? (
                  <img 
                    src={vendor.image} 
                    alt={vendor.companyInfo?.[0]?.companyName || vendor.email} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1e2556]">
                  {vendor.companyInfo?.[0]?.companyName || vendor.email}
                </h3>
                <p className="text-sm text-[#334155]">Vendor ID: {vendor.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto p-6 max-h-[calc(90vh-134px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vendor Information */}
              <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Vendor Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Email:</span>
                    <span className="text-[#2d2d2d] break-all">{vendor.email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Account Type:</span>
                    <span className="text-[#2d2d2d]">{vendor.type}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Created:</span>
                    <span className="text-[#2d2d2d]">{new Date(vendor.createdAt).toLocaleDateString()} 
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(vendor.createdAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-[#334155] text-sm">Last Updated:</span>
                    <span className="text-[#2d2d2d]">{new Date(vendor.updatedAt).toLocaleDateString()}
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(vendor.updatedAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                </div>

                {/* Company Information */}
                <h4 className="text-lg font-medium my-4 text-[#1e2556]">Company Information</h4>
                {companyLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1e2556]"></div>
                  </div>
                ) : companyDetails ? (
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Company:</span>
                      <span className="text-[#2d2d2d] font-medium">{companyDetails.companyName || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Website:</span>
                      {companyDetails.website ? (
                        <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" className="text-[#7cc6ee] hover:underline flex items-center">
                          {companyDetails.website}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-400">Not specified</span>
                      )}
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Founded:</span>
                      <span className="text-[#2d2d2d]">{companyDetails.yearFounded || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Headquarters:</span>
                      <span className="text-[#2d2d2d]">{companyDetails.headQuaters || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Founders:</span>
                      <span className="text-[#2d2d2d]">{companyDetails.NameOfFounders || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Contact:</span>
                      <span className="text-[#2d2d2d]">{companyDetails.contact || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Team Size:</span>
                      <span className="text-[#2d2d2d]">{companyDetails.TeamSize || 'Not specified'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-[#334155] text-sm">Awards:</span>
                      <span className="text-[#2d2d2d]">{companyDetails.Awards || 'None specified'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-gray-500">No company information available</p>
                  </div>
                )}
              </div>
              
              {/* Stats Summary */}
              <div className="bg-[#f5f7fa] p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Performance Summary</h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-[#334155] mb-1">
                        <ShoppingBag className="w-4 h-4" />
                        <span className="text-sm">Total Products</span>
                      </div>
                      <div className="text-2xl font-semibold text-[#1e2556]">{stats.totalProducts}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-[#334155] mb-1">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm">Total Views</span>
                      </div>
                      <div className="text-2xl font-semibold text-[#1e2556]">{stats.totalViews || 0}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#334155]">Product Completion</span>
                        <span className="font-semibold text-[#1e2556]">{stats.completionRate || 0}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#7cc6ee] rounded-full"
                          style={{ width: `${stats.completionRate || 0}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#334155]">Leads Generated</span>
                        <span className="font-semibold text-[#1e2556]">{stats.totalLeads || 0}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1e2556] rounded-full"
                          style={{ 
                            width: stats.totalProducts ? `${Math.min(100, (stats.totalLeads / stats.totalProducts) * 100)}%` : '0%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-[#334155] mb-2">Activity Timeline</h5>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-3 w-3 rounded-full bg-[#1e2556]"></div>
                        </div>
                        <div className="ml-2">
                          <p className="text-sm text-[#2d2d2d]">Account Created</p>
                          <p className="text-xs text-[#334155]">{new Date(vendor.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {stats.lastProductDate && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-3 w-3 rounded-full bg-[#7cc6ee]"></div>
                          </div>
                          <div className="ml-2">
                            <p className="text-sm text-[#2d2d2d]">Last Product Added</p>
                            <p className="text-xs text-[#334155]">{new Date(stats.lastProductDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                      {stats.lastViewDate && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="ml-2">
                            <p className="text-sm text-[#2d2d2d]">Last Product View</p>
                            <p className="text-xs text-[#334155]">{new Date(stats.lastViewDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Section */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#1e2556]">Product List</h4>
              {productsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2556]"></div>
                </div>
              ) : products.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f5f7fa]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                                {product.logoUrl ? (
                                  <img 
                                    src={product.logoUrl} 
                                    alt={product.name} 
                                    className="h-10 w-10 object-cover"
                                  />
                                ) : (
                                  <Layout className="w-5 h-5 text-gray-500" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#2d2d2d]">{product.name}</div>
                                <div className="text-xs text-[#334155]">{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2d2d2d]">
                              {product.category && product.category.length > 0 
                                ? product.category.slice(0, 2).join(', ') + (product.category.length > 2 ? '...' : '')
                                : 'Not categorized'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              product.active === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : product.active === 'draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.active === 'published' ? 'Published' : product.active === 'draft' ? 'Draft' : product.active}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                            {product.views || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <a 
                              href={`/product/${product.slug}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#7cc6ee] hover:underline flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
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
                  <p className="text-gray-500">No products found for this vendor</p>
                </div>
              )}
            </div>
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
                handleEditVendor(vendor);
              }}
              className="px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Vendor
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e2556] mb-2">Vendor Management</h1>
        <p className="text-[#334155]">Manage all vendor accounts, products, and monitor performance</p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-start sm:items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e2556] focus:border-transparent"
          />
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3 w-full sm:w-auto justify-between sm:justify-start">          
          <button 
            onClick={() => setShowAddVendorModal(true)}
            className="px-4 py-2 bg-[#1e2556] text-white rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Vendor</span>
          </button>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e2556]"></div>
          </div>
        ) : vendors.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#f5f7fa]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#334155] uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#334155] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#1e2556] text-white rounded-full flex items-center justify-center overflow-hidden">
                            {vendor.image ? (
                              <img 
                                src={vendor.image} 
                                alt={vendor.companyInfo?.[0]?.companyName || vendor.email} 
                                className="h-10 w-10 object-cover"
                              />
                            ) : (
                              <Building className="w-5 h-5" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#2d2d2d]">
                              {vendor.companyInfo?.[0]?.companyName || vendor.email}
                            </div>
                            <div className="text-xs text-[#334155]">{vendor.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#2d2d2d]">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{vendor.email}</span>
                          </div>
                        </div>
                        {vendor.companyInfo?.[0]?.contact && (
                          <div className="text-sm text-[#2d2d2d] mt-1">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-1" />
                              <span>{vendor.companyInfo[0].contact}</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        {vendor.companyInfo?.[0] ? (
                          <div>
                            <div className="font-medium">{vendor.companyInfo[0].companyName}</div>
                            {vendor.companyInfo[0].headQuaters && (
                              <div className="text-xs text-[#334155]">{vendor.companyInfo[0].headQuaters}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">No company info</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{new Date(vendor.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d2d2d]">
                        <div className="flex items-center">
                          <Database className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{vendor._count?.Product || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEditVendor(vendor)}
                            className="text-[#1e2556] hover:text-opacity-80 p-1"
                            title="Edit Vendor"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleViewDetails(vendor)}
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
                Showing page {currentPage} of {totalPages} ({totalVendors} total vendors)
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
              <Building className="w-8 h-8 text-[#1e2556]" />
            </div>
            <h3 className="text-lg font-medium text-[#1e2556] mb-1">No Vendors Found</h3>
            <p className="text-[#334155] max-w-md mx-auto">
              {searchTerm ? 
                'Try adjusting your search to find what you\'re looking for.' :
                'There are no vendors in the system yet.'}
            </p>
            <button 
              onClick={() => setShowAddVendorModal(true)}
              className="mt-6 inline-flex items-center px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Vendor
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedVendor && (
          <VendorDetailsModal 
            vendor={selectedVendor} 
            onClose={() => setSelectedVendor(null)} 
          />
        )}
        
        {showAddVendorModal && (
          <AddVendorModal 
            onClose={() => setShowAddVendorModal(false)} 
          />
        )}
        
        {showEditVendorModal && vendorToEdit && (
          <EditVendorModal 
            vendor={vendorToEdit} 
            onClose={() => {
              setShowEditVendorModal(false);
              setVendorToEdit(null);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorsPage;
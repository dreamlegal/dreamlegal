

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronDown, ChevronUp, Upload, Save, Image, X, Loader2 } from 'lucide-react';

const EditProductAdmin = () => {
  const params = useParams();
  const productId = params.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [jsonInput, setJsonInput] = useState('');
  const [formData, setFormData] = useState(null);
  const [originalSlug, setOriginalSlug] = useState(''); // Store original slug
  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: true,
    section3: true,
    section4: true,
    section5: true,
    section6: true,
    section7: true,
    section8: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [imageInputMethod, setImageInputMethod] = useState('upload');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');

  // Fetch product data on component mount
  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/legal-software?id=${productId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      
      const data = await response.json();
      
      // Transform the data to match form structure
      const transformedData = {
        logoUrl: data.logoUrl || '',
        productName: data.productName || '',
        slug: data.slug || '',
        // category: data.category || '',
        categories: data.categories || [],
        description: data.description || '',
        companyName: data.companyName || '',
        headquarters: data.headquarters || '',
        founded: data.founded || '',
        founders: data.founders || '',
        phone: data.phone || '',
        website: data.website || '',
        email: data.email || '',
        socialMedia: data.socialMedia || '',
        briefDescription: data.briefDescription || '',
        targetUsers: data.targetUsers || '',
        primaryPurpose: data.primaryPurpose || '',
        technologyStack: data.technologyStack || '',
        deploymentOptions: data.deploymentOptions || '',
        coreFunctionalities: data.coreFunctionalities || [],
        keyFeatures: data.keyFeatures || [],
        lifecycleStages: data.lifecycleStages || [],
        pricingTier: data.pricingTier || 'MID_RANGE',
        startingPrice: data.startingPrice || '',
        pricingModel: data.pricingModel || '',
        freeTrial: data.freeTrial || '',
        customPricing: data.customPricing || '',
        bestKnownFor: data.bestKnownFor || [],
        criticalOpinions: data.criticalOpinions || [],
        topUseCases: data.topUseCases || [],
        userSatisfaction: data.userSatisfaction || '',
        sources: data.sources || {},
        images: data.images || [],
        videos: data.videos || [],
        faqs: data.faqs || []
      };
      
      setFormData(transformedData);
      setOriginalSlug(data.slug); // Store the original slug
      setImagePreview(data.logoUrl || '');
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrors({ fetch: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if slug exists (excluding current product)
  const checkSlugExists = async (slug) => {
    try {
      const response = await fetch(`/api/legal-software/check-slug?slug=${encodeURIComponent(slug)}&excludeId=${productId}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking slug:', error);
      return false;
    }
  };

  // Function to generate unique slug from product name
  const generateUniqueSlug = async (name) => {
    setIsCheckingSlug(true);
    let slug = name.toLowerCase().replace(/ /g, "-");
    
    // Check if the slug already exists (excluding current product)
    let exists = await checkSlugExists(slug);
    
    // If the slug exists and it's not the original slug, append a number
    let counter = 1;
    while (exists && slug !== originalSlug) {
      slug = `${name.toLowerCase().replace(/ /g, "-")}-${counter}`;
      exists = await checkSlugExists(slug);
      counter++;
    }
    
    setIsCheckingSlug(false);
    return slug;
  };

const parseJSON = async () => {
  try {
    const parsed = JSON.parse(jsonInput);
    setErrors({});
    
    const productName = parsed.section1_product_overview?.sidebar_information?.product_name || formData.productName;
    let slug = formData.slug; // Keep existing slug by default
    
    // Only generate new slug if product name changed
    if (productName !== formData.productName) {
      slug = await generateUniqueSlug(productName);
    }
    
    // Handle social media data and convert array to string if needed
    const socialMediaData = parsed.section1_product_overview?.contact_information?.social_media;
    const socialMediaString = socialMediaData ? (
      Array.isArray(socialMediaData) 
        ? socialMediaData.join(', ')  // Convert array to comma-separated string
        : socialMediaData             // Use as-is if already string
    ) : undefined;
    
    // Merge JSON data with existing form data
    const mergedData = {
      // Keep existing data as defaults
      ...formData,
      
      // Section 1: Product Overview - Update if present in JSON
      ...(parsed.section1_product_overview?.sidebar_information?.product_name && {
        productName: parsed.section1_product_overview.sidebar_information.product_name,
        slug: slug
      }),
      // ...(parsed.section1_product_overview?.sidebar_information?.category && {
      //   category: parsed.section1_product_overview.sidebar_information.category.toUpperCase().replace(/ /g, '_')
      // }),
//       ...(parsed.section1_product_overview?.sidebar_information?.category && {
//   categories: [
//     parsed.section1_product_overview.sidebar_information.category
//       .toUpperCase()
//       .replace(/ /g, '_')
//   ]
// }),
...(parsed.section1_product_overview?.sidebar_information?.category && {
  categories: Array.isArray(parsed.section1_product_overview.sidebar_information.category)
    ? parsed.section1_product_overview.sidebar_information.category.map(c =>
        c.toUpperCase().replace(/ /g, '_')
      )
    : [
        parsed.section1_product_overview.sidebar_information.category
          .toUpperCase()
          .replace(/ /g, '_')
      ]
}),

      ...(parsed.section1_product_overview?.sidebar_information?.description && {
        description: parsed.section1_product_overview.sidebar_information.description
      }),
      
      ...(parsed.section1_product_overview?.company_information?.company_name && {
        companyName: parsed.section1_product_overview.company_information.company_name
      }),
      ...(parsed.section1_product_overview?.company_information?.headquarters && {
        headquarters: parsed.section1_product_overview.company_information.headquarters
      }),
      ...(parsed.section1_product_overview?.company_information?.founded && {
        founded: parsed.section1_product_overview.company_information.founded
      }),
      ...(parsed.section1_product_overview?.company_information?.founders && {
        founders: parsed.section1_product_overview.company_information.founders
      }),
      
      ...(parsed.section1_product_overview?.contact_information?.phone && {
        phone: parsed.section1_product_overview.contact_information.phone
      }),
      ...(parsed.section1_product_overview?.contact_information?.website && {
        website: parsed.section1_product_overview.contact_information.website
      }),
      ...(parsed.section1_product_overview?.contact_information?.email && {
        email: parsed.section1_product_overview.contact_information.email
      }),
      // ✅ FIXED: Now handles both array and string for social media
      ...(socialMediaString !== undefined && {
        socialMedia: socialMediaString
      }),
      
      // Section 2: Detailed Overview
      ...(parsed.section2_detailed_overview?.brief_description && {
        briefDescription: parsed.section2_detailed_overview.brief_description
      }),
      ...(parsed.section2_detailed_overview?.target_users && {
        targetUsers: parsed.section2_detailed_overview.target_users
      }),
      ...(parsed.section2_detailed_overview?.primary_purpose && {
        primaryPurpose: parsed.section2_detailed_overview.primary_purpose
      }),
      ...(parsed.section2_detailed_overview?.technology_stack && {
        technologyStack: parsed.section2_detailed_overview.technology_stack
      }),
      ...(parsed.section2_detailed_overview?.deployment_options && {
        deploymentOptions: parsed.section2_detailed_overview.deployment_options
      }),
      
      // Section 3: Functionality and Features
      ...(parsed.section3_functionality_and_features?.core_functionalities && {
        coreFunctionalities: parsed.section3_functionality_and_features.core_functionalities
      }),
      ...(parsed.section3_functionality_and_features?.key_features && {
        keyFeatures: parsed.section3_functionality_and_features.key_features
      }),
      ...(parsed.section3_functionality_and_features?.lifecycle_stages_supported && {
        lifecycleStages: parsed.section3_functionality_and_features.lifecycle_stages_supported
      }),
      
      // Section 4: Pricing
      ...(parsed.section4_pricing?.pricing_tier && {
        pricingTier: parsed.section4_pricing.pricing_tier
      }),
      ...(parsed.section4_pricing?.pricing_details?.starting_price && {
        startingPrice: parsed.section4_pricing.pricing_details.starting_price
      }),
      ...(parsed.section4_pricing?.pricing_details?.pricing_model && {
        pricingModel: parsed.section4_pricing.pricing_details.pricing_model
      }),
      ...(parsed.section4_pricing?.pricing_details?.free_trial && {
        freeTrial: parsed.section4_pricing.pricing_details.free_trial
      }),
      ...(parsed.section4_pricing?.pricing_details?.custom_pricing && {
        customPricing: parsed.section4_pricing.pricing_details.custom_pricing
      }),
      
      // Section 5: Market Perception
      ...(parsed.section5_market_perception?.best_known_for && {
        bestKnownFor: parsed.section5_market_perception.best_known_for
      }),
      ...(parsed.section5_market_perception?.critical_opinions && {
        criticalOpinions: parsed.section5_market_perception.critical_opinions
      }),
      ...(parsed.section5_market_perception?.top_use_cases && {
        topUseCases: parsed.section5_market_perception.top_use_cases
      }),
      ...(parsed.section5_market_perception?.user_satisfaction && {
        userSatisfaction: parsed.section5_market_perception.user_satisfaction
      }),
      
      // Section 6: Sources
      ...(parsed.section6_sources && {
        sources: parsed.section6_sources
      })
    };
    
    setFormData(mergedData);
    setSuccessMessage('JSON data merged successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (error) {
    setErrors({ json: 'Invalid JSON format. Please check your input.' });
  }
};
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ image: 'Image size must be less than 5MB' });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors({ image: 'Please select a valid image file' });
        return;
      }
      
      setImageFile(file);
      setErrors({ ...errors, image: null });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }
      
      return data.url;
    } catch (error) {
      setErrors({ image: error.message });
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const uploadMedia = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    try {
      const response = await fetch('/api/upload-media', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to upload ${type}`);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploadingMedia(true);
    setErrors({ ...errors, image: null });

    try {
      const uploadPromises = files.map(file => uploadMedia(file, 'image'));
      const results = await Promise.all(uploadPromises);
      
      const urls = results.map(result => result.url);
      handleInputChange('images', [...(formData.images || []), ...urls]);
    } catch (error) {
      setErrors({ ...errors, image: error.message });
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const removeMedia = (index, type) => {
    if (type === 'image') {
      const newImages = formData.images.filter((_, i) => i !== index);
      handleInputChange('images', newImages);
    } else {
      const newVideos = formData.videos.filter((_, i) => i !== index);
      handleInputChange('videos', newVideos);
    }
  };

  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []), { heading: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (formData) {
      handleInputChange('logoUrl', '');
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = async (field, value) => {
    // If product name changes, regenerate slug
    if (field === 'productName' && value !== formData.productName) {
      const newSlug = await generateUniqueSlug(value);
      setFormData(prev => ({
        ...prev,
        productName: value,
        slug: newSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSlugChange = async (value) => {
    // When user manually edits slug, check if it's unique
    const formattedSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({
      ...prev,
      slug: formattedSlug
    }));
    
    // Check if this slug already exists (excluding current product)
    if (formattedSlug && formattedSlug !== originalSlug) {
      const exists = await checkSlugExists(formattedSlug);
      if (exists) {
        setErrors({ ...errors, slug: 'This slug already exists. Please choose a different one.' });
      } else {
        setErrors({ ...errors, slug: null });
      }
    } else {
      setErrors({ ...errors, slug: null });
    }
  };

  const handleArrayItemChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleKeyFeatureChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleAddKeyFeature = () => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, { heading: '', description: '' }]
    }));
  };

  const handleRemoveKeyFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const handleLifecycleStageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      lifecycleStages: prev.lifecycleStages.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const handleSourceCategoryChange = (oldCategory, newCategory) => {
    setFormData(prev => {
      const newSources = { ...prev.sources };
      if (oldCategory !== newCategory && newSources[oldCategory]) {
        newSources[newCategory] = newSources[oldCategory];
        delete newSources[oldCategory];
      }
      return { ...prev, sources: newSources };
    });
  };

  const handleSourceUrlChange = (category, index, value) => {
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [category]: prev.sources[category].map((url, i) => i === index ? value : url)
      }
    }));
  };

  const handleAddSourceUrl = (category) => {
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [category]: [...(prev.sources[category] || []), '']
      }
    }));
  };

  const handleRemoveSourceUrl = (category, index) => {
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [category]: prev.sources[category].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddSourceCategory = () => {
    const newCategory = 'new_category';
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [newCategory]: []
      }
    }));
  };

  const handleRemoveSourceCategory = (category) => {
    setFormData(prev => {
      const newSources = { ...prev.sources };
      delete newSources[category];
      return { ...prev, sources: newSources };
    });
  };

  const handleSubmit = async () => {
    // Check for slug error before submitting
    if (errors.slug) {
      setErrors({ ...errors, submit: 'Please fix the slug error before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Upload image first if a new one is selected
      let logoUrl = formData.logoUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          throw new Error('Failed to upload image');
        }
        logoUrl = uploadedUrl;
      }

      // Transform pricingTier if it's in symbol format
      const pricingTierMap = {
        '$': 'BUDGET',
        '$$': 'MID_RANGE',
        '$$$': 'PREMIUM',
        '$$$+': 'ENTERPRISE'
      };

      const transformedData = {
        id: productId,
        ...formData,
        logoUrl: logoUrl,
        pricingTier: pricingTierMap[formData.pricingTier] || formData.pricingTier,
        socialMedia: formData.socialMedia || null,
        phone: formData.phone || null,
        website: formData.website || null,
        email: formData.email || null,
        founders: formData.founders || null,
        startingPrice: formData.startingPrice || null,
        pricingModel: formData.pricingModel || null,
        freeTrial: formData.freeTrial || null,
        customPricing: formData.customPricing || null,
        sources: JSON.stringify(formData.sources),
        images: formData.images || [],
        videos: formData.videos || [],
        faqs: formData.faqs || []
      };

      const response = await fetch('/api/legal-software', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      setSuccessMessage('Product updated successfully!');
      // Don't reset form on edit, just show success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const categoryOptions = [
    'CONTRACT_LIFECYCLE_MANAGEMENT',
    'LEGAL_AI',
    'DOCUMENT_MANAGEMENT_SYSTEM',
    'LITIGATION_MANAGEMENT_AND_ANALYTICS',
    'IP_MANAGEMENT',
    'LEGAL_RESEARCH',
    'E_DISCOVERY',
    'CASE_MANAGEMENT',
    'GOVERNANCE_RISK_COMPLIANCE',
    'LEGAL_DUE_DILIGENCE',
    'TIMEKEEPING_SOFTWARE',
    'LEGAL_INTAKE_SOFTWARE',
    'TRANSACTION_MANAGEMENT_SOFTWARE'
  ];
  const pricingTierOptions = [
    { value: 'BUDGET', label: '$' },
    { value: 'MID_RANGE', label: '$$' },
    { value: 'PREMIUM', label: '$$$' },
    { value: 'ENTERPRISE', label: '$$$+' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: '#1e2556' }} />
          <p className="text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (errors.fetch) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">Error loading product</p>
            <p className="text-red-500 mt-2">{errors.fetch}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: '#1e2556' }}>
          Edit Legal Software Product
        </h1>

        {/* JSON Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
            Update Product via JSON (Optional)
          </h2>
          <p className="text-gray-600 mb-4">
            Upload a JSON file to update multiple fields at once. Only fields present in the JSON will be updated.
          </p>
          <div className="space-y-4">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your product JSON here to update fields..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ color: '#2d2d2d' }}
            />
            {errors.json && (
              <p className="text-red-500 text-sm">{errors.json}</p>
            )}
            <button
              onClick={parseJSON}
              disabled={isCheckingSlug}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#1e2556' }}
            >
              <Upload size={20} />
              {isCheckingSlug ? 'Checking slug...' : 'Update Fields from JSON'}
            </button>
          </div>
        </div>

        {/* Form Sections */}
        {formData && (
          <div className="space-y-6">
            {/* Section 1: Product Overview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section1')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 1: Product Overview
                </h2>
                {expandedSections.section1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section1 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Sidebar Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
                      Sidebar Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Logo Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Product Logo
                        </label>
                        <div className="space-y-4">
                          {!imagePreview && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                              <input
                                type="file"
                                id="logo-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="logo-upload"
                                className="flex flex-col items-center cursor-pointer"
                              >
                                <Image size={48} className="text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to upload logo</span>
                                <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                              </label>
                            </div>
                          )}
                          
                          {imagePreview && (
                            <div className="relative inline-block">
                              <img
                                src={imagePreview}
                                alt="Logo preview"
                                className="h-32 w-auto rounded-lg border border-gray-300"
                              />
                              <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                          
                          {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={formData.productName}
                          onChange={(e) => handleInputChange('productName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          URL Slug
                          {isCheckingSlug && <span className="ml-2 text-xs text-gray-500">(Checking...)</span>}
                        </label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => handleSlugChange(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                          placeholder="product-url-slug"
                        />
                        {errors.slug && (
                          <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          This will be used in the URL. Only lowercase letters, numbers, and hyphens allowed.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Category
                        </label>
                        {/* <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        >
                          <option value="">Select a category</option>
                          {categoryOptions.map(cat => (
                            <option key={cat} value={cat}>
                              {cat.replace(/_/g, ' ')}
                            </option>
                          ))}
                        </select> */}
                   <div className="space-y-2">
  <div className="flex flex-wrap gap-2">
    {formData.categories.map((cat, idx) => (
      <span
        key={idx}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
      >
        {cat.replace(/_/g, " ")}
        <button
          onClick={() =>
            handleInputChange(
              'categories',
              formData.categories.filter((c) => c !== cat)
            )
          }
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </span>
    ))}
  </div>

  <select
    onChange={(e) => {
      const val = e.target.value;
      if (val && !formData.categories.includes(val)) {
        handleInputChange('categories', [...formData.categories, val]);
      }
    }}
    className="w-full p-3 border border-gray-300 rounded-lg"
    value=""
  >
    <option value="">Select another category</option>
    {categoryOptions.map((cat) => (
      <option key={cat} value={cat}>
        {cat.replace(/_/g, " ")}
      </option>
    ))}
  </select>
</div>




                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Description (140 words max)
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Headquarters
                        </label>
                        <input
                          type="text"
                          value={formData.headquarters}
                          onChange={(e) => handleInputChange('headquarters', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Founded
                        </label>
                        <input
                          type="text"
                          value={formData.founded}
                          onChange={(e) => handleInputChange('founded', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Founders
                        </label>
                        <input
                          type="text"
                          value={formData.founders}
                          onChange={(e) => handleInputChange('founders', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Phone
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Website
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Social Media
                        </label>
                        <input
                          type="text"
                          value={formData.socialMedia}
                          onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Detailed Overview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section2')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 2: Detailed Overview
                </h2>
                {expandedSections.section2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section2 && (
                <div className="p-6 pt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Brief Description (200 words max)
                    </label>
                    <textarea
                      value={formData.briefDescription}
                      onChange={(e) => handleInputChange('briefDescription', e.target.value)}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Target Users
                    </label>
                    <textarea
                      value={formData.targetUsers}
                      onChange={(e) => handleInputChange('targetUsers', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Primary Purpose
                    </label>
                    <textarea
                      value={formData.primaryPurpose}
                      onChange={(e) => handleInputChange('primaryPurpose', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Technology Stack
                    </label>
                    <textarea
                      value={formData.technologyStack}
                      onChange={(e) => handleInputChange('technologyStack', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Deployment Options
                    </label>
                    <textarea
                      value={formData.deploymentOptions}
                      onChange={(e) => handleInputChange('deploymentOptions', e.target.value)}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Functionality and Features */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section3')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 3: Functionality and Features
                </h2>
                {expandedSections.section3 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section3 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Core Functionalities */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Core Functionalities
                    </label>
                    <div className="space-y-2">
                      {formData.coreFunctionalities.map((func, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={func}
                            onChange={(e) => handleArrayItemChange('coreFunctionalities', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('coreFunctionalities', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('coreFunctionalities')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Functionality
                      </button>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Key Features
                    </label>
                    <div className="space-y-4">
                      {formData.keyFeatures.map((feature, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={feature.heading}
                              onChange={(e) => handleKeyFeatureChange(index, 'heading', e.target.value)}
                              placeholder="Feature Heading"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <textarea
                              value={feature.description}
                              onChange={(e) => handleKeyFeatureChange(index, 'description', e.target.value)}
                              placeholder="Feature Description"
                              rows={3}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <button
                              onClick={() => handleRemoveKeyFeature(index)}
                              className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                              style={{ backgroundColor: '#ef4444' }}
                            >
                              Remove Feature
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={handleAddKeyFeature}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Key Feature
                      </button>
                    </div>
                  </div>

                  {/* Lifecycle Stages */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Lifecycle Stages Supported
                    </label>
                    <div className="space-y-4">
                      {formData.lifecycleStages.map((stage, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="number"
                              value={stage.stage_number}
                              onChange={(e) => handleLifecycleStageChange(index, 'stage_number', parseInt(e.target.value))}
                              placeholder="Stage Number"
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <input
                              type="text"
                              value={stage.stage_name}
                              onChange={(e) => handleLifecycleStageChange(index, 'stage_name', e.target.value)}
                              placeholder="Stage Name"
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <select
                              value={stage.impact_level}
                              onChange={(e) => handleLifecycleStageChange(index, 'impact_level', e.target.value)}
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            >
                              <option value="">Select Impact Level</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                            <textarea
                              value={stage.feature_impact_description}
                              onChange={(e) => handleLifecycleStageChange(index, 'feature_impact_description', e.target.value)}
                              placeholder="Feature Impact Description"
                              rows={2}
                              className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Pricing */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section4')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 4: Pricing
                </h2>
                {expandedSections.section4 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section4 && (
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Pricing Tier
                      </label>
                      <select
                        value={formData.pricingTier}
                        onChange={(e) => handleInputChange('pricingTier', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      >
                        <option value="">Select Pricing Tier</option>
                        {pricingTierOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Starting Price
                      </label>
                      <input
                        type="text"
                        value={formData.startingPrice}
                        onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Pricing Model
                      </label>
                      <input
                        type="text"
                        value={formData.pricingModel}
                        onChange={(e) => handleInputChange('pricingModel', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Free Trial
                      </label>
                      <input
                        type="text"
                        value={formData.freeTrial}
                        onChange={(e) => handleInputChange('freeTrial', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Custom Pricing
                      </label>
                      <input
                        type="text"
                        value={formData.customPricing}
                        onChange={(e) => handleInputChange('customPricing', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 5: Market Perception */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section5')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 5: Market Perception
                </h2>
                {expandedSections.section5 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section5 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Best Known For */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Best Known For
                    </label>
                    <div className="space-y-2">
                      {formData.bestKnownFor.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayItemChange('bestKnownFor', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('bestKnownFor', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('bestKnownFor')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Item
                      </button>
                    </div>
                  </div>

                  {/* Critical Opinions */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Critical Opinions
                    </label>
                    <div className="space-y-2">
                      {formData.criticalOpinions.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayItemChange('criticalOpinions', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('criticalOpinions', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('criticalOpinions')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Opinion
                      </button>
                    </div>
                  </div>

                  {/* Top Use Cases */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Top Use Cases
                    </label>
                    <div className="space-y-2">
                      {formData.topUseCases.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayItemChange('topUseCases', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('topUseCases', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('topUseCases')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Use Case
                      </button>
                    </div>
                  </div>

                  {/* User Satisfaction */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      User Satisfaction
                    </label>
                    <textarea
                      value={formData.userSatisfaction}
                      onChange={(e) => handleInputChange('userSatisfaction', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 6: Sources */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section6')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 6: Sources
                </h2>
                {expandedSections.section6 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section6 && (
                <div className="p-6 pt-0">
                  <div className="space-y-4">
                    {Object.entries(formData.sources).map(([category, urls]) => (
                      <div key={category} className="p-4 border border-gray-200 rounded-lg">
                        <div className="mb-3">
                          <input
                            type="text"
                            value={category}
                            onChange={(e) => handleSourceCategoryChange(category, e.target.value)}
                            className="text-lg font-medium p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#334155' }}
                          />
                          <button
                            onClick={() => handleRemoveSourceCategory(category)}
                            className="ml-3 px-3 py-1 text-sm text-white rounded hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove Category
                          </button>
                        </div>
                        <div className="space-y-2">
                          {Array.isArray(urls) && urls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => handleSourceUrlChange(category, index, e.target.value)}
                                placeholder="Enter URL"
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                style={{ color: '#2d2d2d' }}
                              />
                              <button
                                onClick={() => handleRemoveSourceUrl(category, index)}
                                className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                                style={{ backgroundColor: '#ef4444' }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => handleAddSourceUrl(category)}
                            className="px-4 py-2 text-sm text-white rounded hover:opacity-90"
                            style={{ backgroundColor: '#7cc6ee' }}
                          >
                            Add URL
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSourceCategory}
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                      style={{ backgroundColor: '#7cc6ee' }}
                    >
                      Add Source Category
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Section 7: Images and Videos */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section7')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 7: Images and Videos
                </h2>
                {expandedSections.section7 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section7 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Images Upload or URL */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Product Images
                    </label>
                    <div className="space-y-4">
                      {/* Tab selection for upload vs URL */}
                      <div className="flex gap-2 border-b border-gray-200">
                        <button
                          onClick={() => setImageInputMethod('upload')}
                          className={`px-4 py-2 font-medium transition-colors ${
                            imageInputMethod === 'upload' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Upload Images
                        </button>
                        <button
                          onClick={() => setImageInputMethod('url')}
                          className={`px-4 py-2 font-medium transition-colors ${
                            imageInputMethod === 'url' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Add Image URL
                        </button>
                      </div>

                      {/* Upload option */}
                      {imageInputMethod === 'upload' && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <input
                            type="file"
                            id="images-upload"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleMediaUpload(e)}
                            className="hidden"
                            disabled={isUploadingMedia}
                          />
                          <label
                            htmlFor="images-upload"
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <Image size={48} className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">
                              {isUploadingMedia ? 'Uploading...' : 'Click to upload images'}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 5MB each</span>
                          </label>
                        </div>
                      )}

                      {/* URL input option */}
                      {imageInputMethod === 'url' && (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={imageUrlInput}
                              onChange={(e) => setImageUrlInput(e.target.value)}
                              placeholder="Enter image URL"
                              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <button
                              onClick={() => {
                                if (imageUrlInput.trim()) {
                                  handleInputChange('images', [...(formData.images || []), imageUrlInput.trim()]);
                                  setImageUrlInput('');
                                }
                              }}
                              className="px-6 py-3 text-white rounded-lg hover:opacity-90"
                              style={{ backgroundColor: '#7cc6ee' }}
                            >
                              Add URL
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image}</p>
                      )}
                      
                      {/* Display images */}
                      {formData.images && formData.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.images.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                                }}
                              />
                              <button
                                onClick={() => removeMedia(index, 'image')}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Videos URL Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Product Videos
                    </label>
                    <div className="space-y-4">
                      {/* URL input for videos */}
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={videoUrlInput}
                          onChange={(e) => setVideoUrlInput(e.target.value)}
                          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                        <button
                          onClick={() => {
                            if (videoUrlInput.trim()) {
                              handleInputChange('videos', [...(formData.videos || []), videoUrlInput.trim()]);
                              setVideoUrlInput('');
                            }
                          }}
                          className="px-6 py-3 text-white rounded-lg hover:opacity-90"
                          style={{ backgroundColor: '#7cc6ee' }}
                        >
                          Add Video
                        </button>
                      </div>
                      
                      {errors.video && (
                        <p className="text-red-500 text-sm">{errors.video}</p>
                      )}
                      
                      {/* Display video URLs */}
                      {formData.videos && formData.videos.length > 0 && (
                        <div className="space-y-2">
                          {formData.videos.map((url, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3 flex-1">
                                <svg 
                                  className="w-8 h-8 text-gray-600 flex-shrink-0" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                                  />
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                  />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium" style={{ color: '#334155' }}>
                                    Video {index + 1}
                                  </p>
                                  <a 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline truncate block"
                                  >
                                    {url}
                                  </a>
                                </div>
                              </div>
                              <button
                                onClick={() => removeMedia(index, 'video')}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 8: FAQs */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section8')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 8: FAQs
                </h2>
                {expandedSections.section8 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section8 && (
                <div className="p-6 pt-0">
                  <div className="space-y-4">
                    {formData.faqs && formData.faqs.length > 0 ? (
                      formData.faqs.map((faq, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
                                Question
                              </label>
                              <input
                                type="text"
                                value={faq.heading}
                                onChange={(e) => handleFaqChange(index, 'heading', e.target.value)}
                                placeholder="Enter question"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                style={{ color: '#2d2d2d' }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1" style={{ color: '#334155' }}>
                                Answer
                              </label>
                              <textarea
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                placeholder="Enter answer"
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                style={{ color: '#2d2d2d' }}
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveFaq(index)}
                              className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                              style={{ backgroundColor: '#ef4444' }}
                            >
                              Remove FAQ
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No FAQs added yet. Click the button below to add your first FAQ.
                      </p>
                    )}
                    
                    <button
                      onClick={handleAddFaq}
                      className="w-full px-4 py-3 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#7cc6ee' }}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 4v16m8-8H4" 
                        />
                      </svg>
                      Add FAQ
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-center gap-4">
              {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
              )}
              {errors.submit && (
                <p className="text-red-600 font-medium">{errors.submit}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isUploadingImage || isCheckingSlug || isUploadingMedia}
                className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: '#1e2556' }}
              >
                <Save size={20} />
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductAdmin;
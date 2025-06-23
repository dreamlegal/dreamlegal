"use client"
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaCircleCheck } from 'react-icons/fa6';
import { X } from 'lucide-react';

// Category display names
const categoryDisplayNames = {
  'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
  'LEGAL_AI': 'Legal AI',
  'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
  'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management & Analytics',
  'IP_MANAGEMENT': 'Intellectual Property Management',
  'LEGAL_RESEARCH': 'Legal Research',
  'E_DISCOVERY': 'E-Discovery'
};

// Pricing tier display names
const pricingTierDisplayNames = {
  'BUDGET': 'Budget ($)',
  'MID_RANGE': 'Mid-Range ($$)',
  'PREMIUM': 'Premium ($$$)',
  'ENTERPRISE': 'Enterprise ($$$+)'
};

// Helper component to render sections in comparison
const ComparisonSection = ({ title, content1, content2 }) => (
  <div className="flex border-b border-gray-200">
    <div className="w-1/2 border-r border-gray-200 px-4 py-3">
      <h3 className="text-sm font-medium text-[#334155] mb-2">{title}</h3>
      {content1}
    </div>
    <div className="w-1/2 px-4 py-3">
      <h3 className="text-sm font-medium text-[#334155] mb-2">{title}</h3>
      {content2}
    </div>
  </div>
);

// Helper component to render deployment options
const DeploymentSection = ({ options = [] }) => {
  // Handle string or array format
  const optionsArray = Array.isArray(options) ? options : 
                      typeof options === 'string' ? options.split(',').map(s => s.trim()) : [];
  
  return (
    <ul className="space-y-2">
      {optionsArray.map((option, index) => (
        <li key={index} className="flex items-center gap-2 text-sm text-[#2d2d2d]">
          <FaCircleCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span>{option}</span>
        </li>
      ))}
    </ul>
  );
};

// Helper component to render arrays as tags
const TagsSection = ({ items = [] }) => {
  const itemsArray = Array.isArray(items) ? items : [];
  
  return (
    <div className="flex flex-wrap gap-2">
      {itemsArray.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="px-2 py-1 text-xs font-medium bg-blue-50 text-[#7cc6ee] rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

// Helper component to render key features
const KeyFeaturesSection = ({ features = [] }) => {
  if (!Array.isArray(features)) return <p className="text-sm text-[#2d2d2d]">N/A</p>;
  
  return (
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="text-sm text-[#2d2d2d]">
          {typeof feature === 'object' && feature.heading ? (
            <div>
              <h5 className="font-medium text-[#1e2556]">{feature.heading}</h5>
              <p className="text-xs text-[#334155] mt-1">{feature.description}</p>
            </div>
          ) : (
            <p>{feature}</p>
          )}
        </div>
      ))}
    </div>
  );
};

// Main comparison component
const ProductComparison = ({ products, isOpen, onClose }) => {
  if (!Array.isArray(products) || products.length !== 2) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#1e2556]">Product Comparison</DialogTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Headers */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              <div className="w-1/2 border-r border-gray-200 p-4 text-center font-medium text-[#1e2556]">
                {products[0].productName}
              </div>
              <div className="w-1/2 p-4 text-center font-medium text-[#1e2556]">
                {products[1].productName}
              </div>
            </div>

            {/* Logos */}
            <div className="flex border-b border-gray-200">
              <div className="w-1/2 border-r border-gray-200 p-6 flex justify-center">
                <img
                  src={products[0].logoUrl || '/api/placeholder/80/80'}
                  alt={products[0].productName}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="w-1/2 p-6 flex justify-center">
                <img
                  src={products[1].logoUrl || '/api/placeholder/80/80'}
                  alt={products[1].productName}
                  className="h-20 w-20 object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <ComparisonSection
              title="Description"
              content1={<p className="text-sm text-[#2d2d2d]">{products[0].description || products[0].briefDescription || 'N/A'}</p>}
              content2={<p className="text-sm text-[#2d2d2d]">{products[1].description || products[1].briefDescription || 'N/A'}</p>}
            />

            {/* Category */}
            <ComparisonSection
              title="Category"
              content1={
                <span className="px-2 py-1 text-xs bg-blue-50 text-[#7cc6ee] rounded-full">
                  {categoryDisplayNames[products[0].category] || products[0].category}
                </span>
              }
              content2={
                <span className="px-2 py-1 text-xs bg-blue-50 text-[#7cc6ee] rounded-full">
                  {categoryDisplayNames[products[1].category] || products[1].category}
                </span>
              }
            />

            {/* Pricing Tier */}
            <ComparisonSection
              title="Pricing Tier"
              content1={
                <span className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                  {pricingTierDisplayNames[products[0].pricingTier] || products[0].pricingTier || 'N/A'}
                </span>
              }
              content2={
                <span className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                  {pricingTierDisplayNames[products[1].pricingTier] || products[1].pricingTier || 'N/A'}
                </span>
              }
            />

            {/* Company Information */}
            <ComparisonSection
              title="Company Information"
              content1={
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#1e2556]">{products[0].companyName || 'N/A'}</p>
                  <p className="text-xs text-[#334155]">HQ: {products[0].headquarters || 'N/A'}</p>
                  <p className="text-xs text-[#334155]">Founded: {products[0].founded || 'N/A'}</p>
                  {products[0].founders && (
                    <p className="text-xs text-[#334155]">Founders: {products[0].founders}</p>
                  )}
                </div>
              }
              content2={
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#1e2556]">{products[1].companyName || 'N/A'}</p>
                  <p className="text-xs text-[#334155]">HQ: {products[1].headquarters || 'N/A'}</p>
                  <p className="text-xs text-[#334155]">Founded: {products[1].founded || 'N/A'}</p>
                  {products[1].founders && (
                    <p className="text-xs text-[#334155]">Founders: {products[1].founders}</p>
                  )}
                </div>
              }
            />

            {/* Target Users */}
            <ComparisonSection
              title="Target Users"
              content1={<p className="text-sm text-[#2d2d2d]">{products[0].targetUsers || 'N/A'}</p>}
              content2={<p className="text-sm text-[#2d2d2d]">{products[1].targetUsers || 'N/A'}</p>}
            />

            {/* Core Functionalities */}
            <ComparisonSection
              title="Core Functionalities"
              content1={<TagsSection items={products[0].coreFunctionalities || []} />}
              content2={<TagsSection items={products[1].coreFunctionalities || []} />}
            />

            {/* Key Features */}
            <ComparisonSection
              title="Key Features"
              content1={<KeyFeaturesSection features={products[0].keyFeatures || []} />}
              content2={<KeyFeaturesSection features={products[1].keyFeatures || []} />}
            />

            {/* Deployment Options */}
            <ComparisonSection
              title="Deployment Options"
              content1={<DeploymentSection options={products[0].deploymentOptions} />}
              content2={<DeploymentSection options={products[1].deploymentOptions} />}
            />

            {/* Technology Stack */}
            <ComparisonSection
              title="Technology Stack"
              content1={<p className="text-sm text-[#2d2d2d]">{products[0].technologyStack || 'N/A'}</p>}
              content2={<p className="text-sm text-[#2d2d2d]">{products[1].technologyStack || 'N/A'}</p>}
            />

            {/* Pricing Information */}
            <ComparisonSection
              title="Pricing Details"
              content1={
                <div className="space-y-1">
                  {products[0].startingPrice && (
                    <p className="text-sm text-[#2d2d2d]">Starting: {products[0].startingPrice}</p>
                  )}
                  {products[0].pricingModel && (
                    <p className="text-sm text-[#2d2d2d]">Model: {products[0].pricingModel}</p>
                  )}
                  {products[0].freeTrial && (
                    <p className="text-sm text-green-600">Free Trial: {products[0].freeTrial}</p>
                  )}
                  {products[0].customPricing && (
                    <p className="text-sm text-[#2d2d2d]">Custom: {products[0].customPricing}</p>
                  )}
                </div>
              }
              content2={
                <div className="space-y-1">
                  {products[1].startingPrice && (
                    <p className="text-sm text-[#2d2d2d]">Starting: {products[1].startingPrice}</p>
                  )}
                  {products[1].pricingModel && (
                    <p className="text-sm text-[#2d2d2d]">Model: {products[1].pricingModel}</p>
                  )}
                  {products[1].freeTrial && (
                    <p className="text-sm text-green-600">Free Trial: {products[1].freeTrial}</p>
                  )}
                  {products[1].customPricing && (
                    <p className="text-sm text-[#2d2d2d]">Custom: {products[1].customPricing}</p>
                  )}
                </div>
              }
            />

            {/* Best Known For */}
            <ComparisonSection
              title="Best Known For"
              content1={<TagsSection items={products[0].bestKnownFor || []} />}
              content2={<TagsSection items={products[1].bestKnownFor || []} />}
            />

            {/* Top Use Cases */}
            <ComparisonSection
              title="Top Use Cases"
              content1={<TagsSection items={products[0].topUseCases || []} />}
              content2={<TagsSection items={products[1].topUseCases || []} />}
            />

            {/* User Satisfaction */}
            <ComparisonSection
              title="User Satisfaction"
              content1={<p className="text-sm text-[#2d2d2d]">{products[0].userSatisfaction || 'N/A'}</p>}
              content2={<p className="text-sm text-[#2d2d2d]">{products[1].userSatisfaction || 'N/A'}</p>}
            />

            {/* Contact Information */}
            <ComparisonSection
              title="Contact Information"
              content1={
                <div className="space-y-1">
                  {products[0].website && (
                    <p className="text-sm text-[#7cc6ee]">
                      <a href={products[0].website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </p>
                  )}
                  {products[0].email && (
                    <p className="text-sm text-[#2d2d2d]">Email: {products[0].email}</p>
                  )}
                  {products[0].phone && (
                    <p className="text-sm text-[#2d2d2d]">Phone: {products[0].phone}</p>
                  )}
                </div>
              }
              content2={
                <div className="space-y-1">
                  {products[1].website && (
                    <p className="text-sm text-[#7cc6ee]">
                      <a href={products[1].website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </p>
                  )}
                  {products[1].email && (
                    <p className="text-sm text-[#2d2d2d]">Email: {products[1].email}</p>
                  )}
                  {products[1].phone && (
                    <p className="text-sm text-[#2d2d2d]">Phone: {products[1].phone}</p>
                  )}
                </div>
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparison;
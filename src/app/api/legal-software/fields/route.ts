
// app/api/legal-software/fields/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Define available fields from LegalSoftware schema
    const availableFields = [
      { value: 'slug', label: 'Slug' },
      { value: 'logoUrl', label: 'Logo URL' },
      { value: 'productName', label: 'Product Name' },
      { value: 'category', label: 'Category' },
      { value: 'description', label: 'Description' },
      { value: 'companyName', label: 'Company Name' },
      { value: 'headquarters', label: 'Headquarters' },
      { value: 'founded', label: 'Founded' },
      { value: 'founders', label: 'Founders' },
      { value: 'phone', label: 'Phone' },
      { value: 'website', label: 'Website' },
      { value: 'email', label: 'Email' },
      { value: 'socialMedia', label: 'Social Media' },
      { value: 'briefDescription', label: 'Brief Description' },
      { value: 'targetUsers', label: 'Target Users' },
      { value: 'primaryPurpose', label: 'Primary Purpose' },
      { value: 'technologyStack', label: 'Technology Stack' },
      { value: 'deploymentOptions', label: 'Deployment Options' },
      { value: 'coreFunctionalities', label: 'Core Functionalities' },
      { value: 'keyFeatures', label: 'Key Features' },
      { value: 'lifecycleStages', label: 'Lifecycle Stages' },
      { value: 'pricingTier', label: 'Pricing Tier' },
      { value: 'startingPrice', label: 'Starting Price' },
      { value: 'pricingModel', label: 'Pricing Model' },
      { value: 'freeTrial', label: 'Free Trial' },
      { value: 'customPricing', label: 'Custom Pricing' },
      { value: 'bestKnownFor', label: 'Best Known For' },
      { value: 'criticalOpinions', label: 'Critical Opinions' },
      { value: 'topUseCases', label: 'Top Use Cases' },
      { value: 'userSatisfaction', label: 'User Satisfaction' },
      { value: 'sources', label: 'Sources' },
      { value: 'images', label: 'Images' },
      { value: 'videos', label: 'Videos' },
      { value: 'faqs', label: 'FAQs' },
      { value: 'isPremium', label: 'Is Premium' },
      { value: 'tag', label: 'Tag' },
      { value: 'caseStudies', label: 'Case Studies' },
      { value: 'valueMetrics', label: 'Value Metrics' },
      { value: 'vendorComments', label: 'Vendor Comments' }
    ];

    return NextResponse.json(availableFields);
  } catch (error) {
    console.error('Error fetching legal software fields:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fields' },
      { status: 500 }
    );
  }
}
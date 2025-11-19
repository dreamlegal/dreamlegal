
// app/api/rfp/[id]/match-vendors/route.js - FIXED VERSION
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Helper function to extract JSON from AI response (handles markdown formatting)
function extractJsonFromAiResponse(aiResponse) {
  try {
    let content = aiResponse.trim();
    
    // Remove markdown code block formatting if present
    if (content.startsWith('```json')) {
      content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (content.startsWith('```')) {
      content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Remove any extra whitespace and newlines
    content = content.trim();
    
    // Additional cleanup for common AI response patterns
    content = content.replace(/^Here's the result:\s*/i, '');
    content = content.replace(/^The answer is:\s*/i, '');
    content = content.replace(/^Based on.*?:\s*/i, '');
    
    const parsed = JSON.parse(content);
    
    // Ensure it's an array
    if (Array.isArray(parsed)) {
      return parsed;
    } else {
      console.warn('AI response is not an array:', parsed);
      return [];
    }
  } catch (error) {
    console.error('Failed to parse AI response:', error.message);
    console.error('Raw content:', aiResponse);
    return [];
  }
}

// Helper function for simple location matching (fallback)
function simpleLocationMatch(products, targetLocation) {
  const target = targetLocation.toLowerCase().trim();
  
  // Common location variations
  const locationMap = {
    'usa': ['usa', 'united states', 'united states of america', 'us', 'america'],
    'uk': ['uk', 'united kingdom', 'britain', 'great britain', 'england'],
    'canada': ['canada', 'ca'],
    'germany': ['germany', 'deutschland', 'de'],
    'france': ['france', 'fr'],
    'australia': ['australia', 'au'],
    'india': ['india', 'in'],
    'singapore': ['singapore', 'sg'],
    'netherlands': ['netherlands', 'holland', 'nl'],
    'israel': ['israel', 'il'],
    'sweden': ['sweden', 'se'],
    'norway': ['norway', 'no'],
    'denmark': ['denmark', 'dk'],
    'finland': ['finland', 'fi']
  };
  
  // Find which group the target belongs to
  let targetGroup = [target];
  for (const [key, variations] of Object.entries(locationMap)) {
    if (variations.includes(target)) {
      targetGroup = variations;
      break;
    }
  }
  
  // Filter products
  const matchedProducts = products.filter(product => {
    const productLocation = product.headquarters.toLowerCase().trim();
    return targetGroup.some(variation => 
      productLocation.includes(variation) || variation.includes(productLocation)
    );
  });
  
  return matchedProducts.map(p => p.id);
}

// Helper function for scoring products when AI fails
function calculateProductScore(product, rfpData) {
  let score = 0;
  
  // Pricing tier relevance (higher score for mid-range)
  const pricingScores = {
    'BUDGET': 15,
    'MID_RANGE': 20, 
    'PREMIUM': 12,
    'ENTERPRISE': 8
  };
  score += pricingScores[product.pricingTier] || 5;
  
  // Features count (more features = higher score)
  if (product.keyFeatures && Array.isArray(product.keyFeatures)) {
    score += Math.min(product.keyFeatures.length, 15);
  }
  
  // Core functionalities count
  if (product.coreFunctionalities && Array.isArray(product.coreFunctionalities)) {
    score += Math.min(product.coreFunctionalities.length, 10);
  }
  
  // Best known for count
  if (product.bestKnownFor && Array.isArray(product.bestKnownFor)) {
    score += Math.min(product.bestKnownFor.length, 5);
  }
  
  // User satisfaction bonus
  if (product.userSatisfaction) {
    score += 10;
  }
  
  // Team type relevance
  if (product.targetUsers && Array.isArray(product.targetUsers)) {
    const teamTypeMatch = product.targetUsers.some(user => 
      user.toLowerCase().includes(rfpData.teamType?.toLowerCase() || '')
    );
    if (teamTypeMatch) score += 5;
  }
  
  return score;
}

export async function POST(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid RFP ID' 
      }, { status: 400 });
    }

    // Get the RFP data
    const rfpData = await prisma.rfpStructured.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rfpData) {
      return NextResponse.json({ 
        success: false,
        message: 'RFP not found' 
      }, { status: 404 });
    }

    // Category mapping
    const categoryMapping = {
      'CONTRACT LIFECYCLE MANAGEMENT': 'CONTRACT_LIFECYCLE_MANAGEMENT',
      'LEGAL AI': 'LEGAL_AI',
      'DOCUMENT MANAGEMENT SYSTEM': 'DOCUMENT_MANAGEMENT_SYSTEM',
      'LITIGATION MANAGEMENT & ANALYTICS': 'LITIGATION_MANAGEMENT_AND_ANALYTICS',
      'IP MANAGEMENT': 'IP_MANAGEMENT',
      'LEGAL RESEARCH': 'LEGAL_RESEARCH',
      'E DISCOVERY': 'E_DISCOVERY',
      'CASE MANAGEMENT': 'CASE_MANAGEMENT',
      'GOVERNANCE RISK COMPLIANCE': 'GOVERNANCE_RISK_COMPLIANCE',
      'LEGAL DUE DILIGENCE': 'LEGAL_DUE_DILIGENCE',
      'TIMEKEEPING SOFTWARE': 'TIMEKEEPING_SOFTWARE',
      'LEGAL INTAKE SOFTWARE': 'LEGAL_INTAKE_SOFTWARE',
      'TRANSACTION MANAGEMENT SOFTWARE': 'TRANSACTION_MANAGEMENT_SOFTWARE'
    };

    const mappedCategory = categoryMapping[rfpData.category];
    
    if (!mappedCategory) {
      return NextResponse.json({
        success: false,
        message: `Category "${rfpData.category}" not supported`,
        availableCategories: Object.keys(categoryMapping)
      }, { status: 400 });
    }

    // STEP 1: Get all products by category (only ID and headquarters)
    const categoryProducts = await prisma.legalSoftware.findMany({
      where: {
        category: mappedCategory
      },
      select: {
        id: true,
        headquarters: true
      }
    });

    if (categoryProducts.length === 0) {
      return NextResponse.json({
        success: false,
        message: `No products found for category: ${rfpData.category}`
      }, { status: 404 });
    }

    console.log(`Found ${categoryProducts.length} products in category: ${mappedCategory}`);

    // STEP 2: Location filtering (with AI fallback to simple matching)
    let locationFilteredIds = [];
    let aiLocationSuccess = false;
    
    // Try AI location matching first
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log('Attempting AI location matching...');
        console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
        
        const requestPayload = {
          model: 'gpt-4o-mini',
          messages: [{
            role: 'system',
            content: `You are a location matching expert. Given a target location and a list of product headquarters, identify which products are located in the same country/region as the target.

CRITICAL: Your response must be ONLY a valid JSON array of product IDs that match the target location. No explanation, no markdown formatting, just the array:
["product-id-1", "product-id-2", "product-id-3"]

Consider variations like:
- "USA" = "United States" = "United States of America" = "US"
- "UK" = "United Kingdom" = "Britain" = "Great Britain"
- "Germany" = "Deutschland"

Return ALL product IDs that match the target location. If no matches, return empty array [].
RESPOND WITH ONLY THE JSON ARRAY, NOTHING ELSE.`
          }, {
            role: 'user',
            content: `TARGET LOCATION: ${rfpData.locationPreference}

PRODUCTS TO FILTER:
${JSON.stringify(categoryProducts, null, 2)}

Return the IDs of products whose headquarters match the target location.`
          }],
          temperature: 0.1,
          max_tokens: 1000
        };

        const locationMatchResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload)
        });

        if (locationMatchResponse.ok) {
          const locationMatchData = await locationMatchResponse.json();
          const aiResponseContent = locationMatchData.choices[0].message.content;
          
          console.log('Raw AI location response:', aiResponseContent);
          
          locationFilteredIds = extractJsonFromAiResponse(aiResponseContent);
          aiLocationSuccess = true;
          console.log(`AI location matching successful: ${locationFilteredIds.length} products match ${rfpData.locationPreference}`);
        } else {
          const errorText = await locationMatchResponse.text();
          console.error('AI location matching HTTP error:', locationMatchResponse.status, errorText);
          throw new Error(`AI location matching failed: ${locationMatchResponse.status}`);
        }
        
      } catch (aiError) {
        console.warn('AI location matching failed, falling back to simple matching:', aiError.message);
        aiLocationSuccess = false;
      }
    }

    // Fallback to simple location matching if AI failed or no API key
    if (!aiLocationSuccess) {
      console.log('Using simple location matching fallback...');
      locationFilteredIds = simpleLocationMatch(categoryProducts, rfpData.locationPreference);
      console.log(`Simple location matching: ${locationFilteredIds.length} products match ${rfpData.locationPreference}`);
    }

    // If no location matches found, use all category products
    if (locationFilteredIds.length === 0) {
      console.log('No location matches found, using all category products');
      locationFilteredIds = categoryProducts.map(p => p.id);
    }

    // STEP 3: Get full product data for location-filtered products
    const filteredProducts = await prisma.legalSoftware.findMany({
      where: {
        id: { in: locationFilteredIds }
      },
      select: {
        id: true,
        productName: true,
        companyName: true,
        description: true,
        briefDescription: true,
        targetUsers: true,
        primaryPurpose: true,
        coreFunctionalities: true,
        keyFeatures: true,
        pricingTier: true,
        startingPrice: true,
        bestKnownFor: true,
        topUseCases: true,
        userSatisfaction: true,
        headquarters: true
      }
    });

    console.log(`Retrieved full data for ${filteredProducts.length} location-matched products`);

    // Add delay to avoid rate limits if using AI again
    if (process.env.OPENAI_API_KEY && aiLocationSuccess) {
      console.log('Waiting 2 seconds before vendor selection...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // STEP 4: Vendor selection (AI with fallback to scoring)
    let selectedVendorIds = [];
    let aiVendorSuccess = false;

    if (process.env.OPENAI_API_KEY) {
      try {
        console.log('Attempting AI vendor selection...');
        
        const vendorSelectionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{
              role: 'system',
              content: `You are an expert legal technology consultant. Analyze the RFP requirements and select the top 5 best-suited vendors from the provided products.

CRITICAL: Your response must be ONLY a valid JSON array with up to 5 product IDs in order of best fit. No explanation, no markdown formatting, just the array:
["product-id-1", "product-id-2", "product-id-3", "product-id-4", "product-id-5"]

Ranking criteria:
1. Alignment with stated priorities and requirements
2. Suitability for team size and organization type  
3. Pricing tier matching budget expectations
4. Implementation timeline compatibility
5. Feature relevance to core problems
6. User satisfaction and reputation

If fewer than 5 products available, return all available product IDs.
RESPOND WITH ONLY THE JSON ARRAY, NOTHING ELSE.`
            }, {
              role: 'user',
              content: `RFP REQUIREMENTS:
Team Type: ${rfpData.teamType}
Team Size: ${rfpData.teamSize || 'Not specified'}
Category: ${rfpData.category}
Requirement Urgency: ${rfpData.requirementUrgency}
Location Preference: ${rfpData.locationPreference}

PROBLEM STATEMENT:
${rfpData.problemStatement}

OBJECTIVES:
${rfpData.objectives ? rfpData.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n') : 'No objectives specified'}

KEY FEATURES:
${rfpData.keyFeatures ? rfpData.keyFeatures.map(req => `• ${req.name}: ${req.description}`).join('\n') : 'No key features specified'}

KEY FUNCTIONALITIES:
${rfpData.keyFunctionalities ? rfpData.keyFunctionalities.map(req => `• ${req.name}: ${req.description}`).join('\n') : 'No key functionalities specified'}

FILTERED PRODUCTS (${filteredProducts.length} candidates):
${JSON.stringify(filteredProducts, null, 2)}

Select the top 5 products that best match these requirements. Return only a JSON array of their IDs.`
            }],
            temperature: 0.3,
            max_tokens: 1000
          })
        });

        if (vendorSelectionResponse.ok) {
          const vendorSelectionData = await vendorSelectionResponse.json();
          
          if (vendorSelectionData.choices && vendorSelectionData.choices[0] && vendorSelectionData.choices[0].message) {
            const aiResponseContent = vendorSelectionData.choices[0].message.content;
            
            console.log('Raw AI vendor response:', aiResponseContent);
            
            selectedVendorIds = extractJsonFromAiResponse(aiResponseContent);
            
            // Validate that all IDs exist in filteredProducts
            const validIds = filteredProducts.map(p => p.id);
            selectedVendorIds = selectedVendorIds.filter(id => validIds.includes(id));
            
            if (selectedVendorIds.length > 0) {
              aiVendorSuccess = true;
              console.log(`AI vendor selection successful: ${selectedVendorIds.length} vendors selected`);
            } else {
              console.warn('AI vendor selection returned no valid IDs');
            }
          } else {
            console.error('Invalid AI vendor selection response structure');
          }
        } else {
          const errorText = await vendorSelectionResponse.text();
          console.error('AI vendor selection HTTP error:', vendorSelectionResponse.status, errorText);
          throw new Error(`AI vendor selection failed: ${vendorSelectionResponse.status}`);
        }
        
      } catch (aiError) {
        console.warn('AI vendor selection failed, falling back to scoring:', aiError.message);
        aiVendorSuccess = false;
      }
    }

    // Fallback to scoring if AI failed or no API key
    if (!aiVendorSuccess) {
      console.log('Using scoring-based vendor selection fallback...');
      selectedVendorIds = filteredProducts
        .map(product => ({
          ...product,
          score: calculateProductScore(product, rfpData)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.min(5, filteredProducts.length))
        .map(p => p.id);
      
      console.log(`Scoring-based selection: ${selectedVendorIds.length} vendors selected`);
    }

    // Ensure we don't exceed available products
    const maxVendors = Math.min(5, filteredProducts.length);
    selectedVendorIds = selectedVendorIds.slice(0, maxVendors);

    // Pad with remaining products if needed (maintain the selection count)
    if (selectedVendorIds.length < maxVendors) {
      const remainingProducts = filteredProducts
        .filter(p => !selectedVendorIds.includes(p.id))
        .slice(0, maxVendors - selectedVendorIds.length)
        .map(p => p.id);
      selectedVendorIds = [...selectedVendorIds, ...remainingProducts];
    }

    // STEP 5: Update RFP with selected vendors
    const updatedRfp = await prisma.rfpStructured.update({
      where: { id: parseInt(id) },
      data: { 
        vendors: selectedVendorIds
      }
    });

    // Get full vendor details for response
    const selectedVendors = await prisma.legalSoftware.findMany({
      where: {
        id: { in: selectedVendorIds }
      },
      select: {
        id: true,
        productName: true,
        companyName: true,
        description: true,
        logoUrl: true,
        pricingTier: true,
        startingPrice: true,
        bestKnownFor: true,
        topUseCases: true,
        headquarters: true
      }
    });

    // Order vendors according to selection ranking
    const orderedVendors = selectedVendorIds
      .map(id => selectedVendors.find(v => v.id === id))
      .filter(Boolean);


      try {
        // Track vendor recommend activity for all selected vendors
        const trackingPromises = selectedVendorIds.map(async (vendorProductId) => {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/track-activity`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                productId: vendorProductId,
                actionType: 'vendorRecommend',
                increment: 1
              }),
            });
          } catch (err) {
            console.error(`Failed to track vendor recommend for ${vendorProductId}:`, err);
          }
        });
      
        await Promise.allSettled(trackingPromises);
        console.log(`Tracked vendor recommendations for ${selectedVendorIds.length} products`);
      } catch (trackError) {
        console.error('Failed to track vendor recommendations:', trackError);
        // Don't fail the main request if tracking fails
      }
    return NextResponse.json({
      success: true,
      message: `Successfully matched ${orderedVendors.length} vendors using ${aiLocationSuccess && aiVendorSuccess ? 'AI' : 'hybrid AI/fallback'} filtering`,
      data: {
        rfpId: updatedRfp.id,
        selectedVendors: orderedVendors,
        vendorIds: selectedVendorIds,
        analytics: {
          totalCategoryProducts: categoryProducts.length,
          locationMatchedProducts: filteredProducts.length,
          finalSelectedVendors: orderedVendors.length,
          aiLocationSuccess,
          aiVendorSuccess,
          filteringSteps: [
            `Step 1: ${categoryProducts.length} products in ${rfpData.category}`,
            `Step 2: ${filteredProducts.length} products match location ${rfpData.locationPreference} (${aiLocationSuccess ? 'AI' : 'fallback'})`,
            `Step 3: ${orderedVendors.length} top vendors selected (${aiVendorSuccess ? 'AI' : 'scoring'})`
          ]
        }
      }
    });

  } catch (error) {
    console.error('Error matching vendors:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to match vendors. Please try again.',
      error: 'VENDOR_MATCHING_ERROR',
      details: error.message
    }, { status: 500 });
  }
}
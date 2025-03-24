
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Weightage constants based on criteria
const WEIGHTAGE = {
  CATEGORY: 1,
  TEAM_TYPE: 1,
  TEAM_SIZE: 1,
  PROCESS_STAGES: 3,
  KEY_FUNCTIONALITIES: 3, 
  SPECIFIC_FEATURES: 2,
  LANGUAGE: 1,
  DEPLOYMENT_MODEL: 1,
  REGION: 1,
  PRICING_MODEL: 1
};

// Total possible score is the sum of all weightages
const calculateTotalPossibleScore = (formData) => {
  let total = 0;
  
  // Category, Team Type, Team Size (1 point each)
  total += WEIGHTAGE.CATEGORY + WEIGHTAGE.TEAM_TYPE + WEIGHTAGE.TEAM_SIZE;
  
  // Process Stages (3 points per stage selected)
  total += formData.processStages.length * WEIGHTAGE.PROCESS_STAGES;
  
  // Key Functionalities (3 points per functionality selected)
  total += formData.keyFunctionalities.length * WEIGHTAGE.KEY_FUNCTIONALITIES;
  
  // Specific Features (2 points per feature selected)
  total += formData.specificFeatures.length * WEIGHTAGE.SPECIFIC_FEATURES;
  
  // Language, Deployment Model, Region, Pricing Model (1 point each)
  total += WEIGHTAGE.LANGUAGE + WEIGHTAGE.DEPLOYMENT_MODEL + WEIGHTAGE.REGION + WEIGHTAGE.PRICING_MODEL;
  
  return total;
};

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Calculate total possible score
    const totalPossibleScore = calculateTotalPossibleScore(formData);
    console.log(`Total possible score: ${totalPossibleScore}`);
    
    // Build the query to fetch relevant products
    // We're focusing on the category as the primary filter
    const products = await prisma.product.findMany({
      where: {
        active: "publish",
        category: {
          hasSome: [formData.category]
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        logoUrl: true,
        usp: true,
        category: true,
        deployement: true,
        mobileAvailable: true,
        focusCountries: true,
        languages: true,
        userCategory: true,
        industry: true,
        practiceAreas: true,
        teamSize: true,
        pricingModel: true,
        region: true,
        processLifecycle: true,
        features: true
      }
    });
    
    // Evaluate each product for a match score
    const evaluatedProducts = products.map(product => {
      let score = 0;
      let matchDetails = {}; // For debugging
      
      // Category matching (1 point)
      if (product.category.includes(formData.category)) {
        score += WEIGHTAGE.CATEGORY;
        matchDetails.category = true;
      }
      
      // Team Type matching (1 point)
      let teamTypeMatch = false;
      if (product.userCategory && Array.isArray(product.userCategory)) {
        for (const uc of product.userCategory) {
          if (typeof uc === 'string') {
            const parts = uc.split('|');
            if (parts[0] === formData.teamType) {
              teamTypeMatch = true;
              break;
            }
          }
        }
      }
      if (teamTypeMatch) {
        score += WEIGHTAGE.TEAM_TYPE;
        matchDetails.teamType = true;
      }
      
      // Team Size matching (1 point)
      let teamSizeMatch = false;
      if (product.teamSize && Array.isArray(product.teamSize)) {
        for (const ts of product.teamSize) {
          if (typeof ts === 'string') {
            const parts = ts.split('|');
            if (parts[0] === formData.teamSize) {
              teamSizeMatch = true;
              break;
            }
          }
        }
      }
      if (teamSizeMatch) {
        score += WEIGHTAGE.TEAM_SIZE;
        matchDetails.teamSize = true;
      }
      
      // Process Stages matching (3 points per stage)
      let processStagesMatches = [];
      
      if (product.processLifecycle) {
        try {
          let processLifecycle = product.processLifecycle;
          if (typeof processLifecycle === 'string') {
            processLifecycle = JSON.parse(processLifecycle);
          }
          
          // Handle different structure types
          for (const stage of formData.processStages) {
            let stageFound = false;
            
            // Check for direct match in flattened values
            const allValues = JSON.stringify(processLifecycle).toLowerCase();
            if (allValues.includes(stage.toLowerCase())) {
              stageFound = true;
            } else {
              // Look for stage in array format
              if (Array.isArray(processLifecycle)) {
                if (processLifecycle.includes(stage)) {
                  stageFound = true;
                }
              } 
              // Look for stage in object keys
              else if (typeof processLifecycle === 'object') {
                // Check direct keys
                if (processLifecycle[stage] !== undefined) {
                  stageFound = true;
                } else {
                  // Check nested arrays
                  for (const [key, value] of Object.entries(processLifecycle)) {
                    if (Array.isArray(value) && value.includes(stage)) {
                      stageFound = true;
                      break;
                    }
                  }
                }
              }
            }
            
            if (stageFound) {
              processStagesMatches.push(stage);
            }
          }
        } catch (e) {
          console.error(`Failed to parse process lifecycle for ${product.name}:`, e);
        }
      }
      
      // Add score for each matched process stage
      if (processStagesMatches.length > 0) {
        score += processStagesMatches.length * WEIGHTAGE.PROCESS_STAGES;
        matchDetails.processStages = processStagesMatches;
      }
      
      // Key Functionalities and Features matching
      let functionalityMatches = [];
      let featureMatches = [];
      
      if (product.features) {
        try {
          let features = product.features;
          if (typeof features === 'string') {
            features = JSON.parse(features);
          }
          
          // Check each key functionality
          for (const func of formData.keyFunctionalities) {
            let funcFound = false;
            
            // Check direct key matches
            if (features[func] !== undefined) {
              funcFound = true;
            } else {
              // Check nested under category
              for (const [category, categoryFeatures] of Object.entries(features)) {
                if (typeof categoryFeatures === 'object' && categoryFeatures[func] !== undefined) {
                  funcFound = true;
                  break;
                }
              }
              
              // Check for partial matches if no exact match found
              if (!funcFound) {
                const allKeys = [];
                // Get all keys from all levels
                const getAllKeys = (obj) => {
                  if (!obj || typeof obj !== 'object') return;
                  Object.keys(obj).forEach(key => {
                    allKeys.push(key);
                    getAllKeys(obj[key]);
                  });
                };
                getAllKeys(features);
                
                // Check if any key contains the functionality name
                if (allKeys.some(key => key.toLowerCase().includes(func.toLowerCase()))) {
                  funcFound = true;
                }
              }
            }
            
            if (funcFound) {
              functionalityMatches.push(func);
            }
          }
          
          // Check each specific feature
          for (const feature of formData.specificFeatures) {
            let featureFound = false;
            
            // Use JSON.stringify to search in all values
            const allValues = JSON.stringify(features).toLowerCase();
            if (allValues.includes(feature.toLowerCase())) {
              featureFound = true;
            }
            
            if (featureFound) {
              featureMatches.push(feature);
            }
          }
        } catch (e) {
          console.error(`Failed to parse features for ${product.name}:`, e);
        }
      }
      
      // Add score for functionalities and features
      if (functionalityMatches.length > 0) {
        score += functionalityMatches.length * WEIGHTAGE.KEY_FUNCTIONALITIES;
        matchDetails.keyFunctionalities = functionalityMatches;
      }
      
      if (featureMatches.length > 0) {
        score += featureMatches.length * WEIGHTAGE.SPECIFIC_FEATURES;
        matchDetails.specificFeatures = featureMatches;
      }
      
      // Language matching (1 point)
      if (product.languages && Array.isArray(product.languages)) {
        const languageMatch = product.languages.some(lang => {
          if (typeof lang !== 'string') return false;
          return lang.toLowerCase() === formData.language.toLowerCase();
        });
        
        if (languageMatch) {
          score += WEIGHTAGE.LANGUAGE;
          matchDetails.language = true;
        }
      }
      
      // Deployment Model matching (1 point)
      if (formData.deploymentModel === 'mobile') {
        if (product.mobileAvailable === 'Yes') {
          score += WEIGHTAGE.DEPLOYMENT_MODEL;
          matchDetails.deploymentModel = true;
        }
      } else if (product.deployement && Array.isArray(product.deployement)) {
        const deploymentMatch = product.deployement.some(deploy => {
          if (typeof deploy !== 'string') return false;
          return deploy.toLowerCase() === formData.deploymentModel.toLowerCase();
        });
        
        if (deploymentMatch) {
          score += WEIGHTAGE.DEPLOYMENT_MODEL;
          matchDetails.deploymentModel = true;
        }
      }
      
      // Region matching (1 point)
      let regionMatch = false;
      
      // Match region field directly
      if (product.region === formData.region) {
        regionMatch = true;
      } 
      // Match region against focus countries
      else if (product.focusCountries && Array.isArray(product.focusCountries)) {
        const regionParts = formData.region.split(/[()]/).map(part => part.trim());
        
        // APAC countries list - Asia-Pacific Region
        const apacCountries = [
          // East Asia
          'china', 'japan', 'mongolia', 'north korea', 'south korea', 'taiwan', 'hong kong', 'macau',
          // South Asia
          'india', 'afghanistan', 'bangladesh', 'bhutan', 'maldives', 'nepal', 'pakistan', 'sri lanka',
          // Southeast Asia
          'brunei', 'cambodia', 'indonesia', 'laos', 'malaysia', 'myanmar', 'philippines', 'singapore', 
          'thailand', 'timor-leste', 'vietnam',
          // Oceania
          'australia', 'fiji', 'kiribati', 'marshall islands', 'micronesia', 'nauru', 'new zealand', 
          'palau', 'papua new guinea', 'samoa', 'solomon islands', 'tonga', 'tuvalu', 'vanuatu'
        ];
        
        // EMEA countries list - Europe, Middle East and Africa
        const emeaCountries = [
          // Europe
          'albania', 'andorra', 'armenia', 'austria', 'azerbaijan', 'belarus', 'belgium', 'bosnia', 
          'bulgaria', 'croatia', 'cyprus', 'czech', 'denmark', 'estonia', 'finland', 'france', 'georgia', 
          'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'kazakhstan', 'kosovo', 'latvia', 
          'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'moldova', 'monaco', 'montenegro', 
          'netherlands', 'north macedonia', 'norway', 'poland', 'portugal', 'romania', 'russia', 
          'san marino', 'serbia', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland', 'turkey', 
          'ukraine', 'united kingdom', 'uk', 'vatican', 'britain', 'england', 'scotland', 'wales',
          // Middle East
          'bahrain', 'iran', 'iraq', 'israel', 'jordan', 'kuwait', 'lebanon', 'oman', 'palestine', 
          'qatar', 'saudi', 'syria', 'uae', 'united arab emirates', 'dubai', 'abu dhabi', 'yemen',
          // Africa
          'algeria', 'angola', 'benin', 'botswana', 'burkina faso', 'burundi', 'cabo verde', 'cameroon', 
          'central african republic', 'chad', 'comoros', 'congo', 'djibouti', 'egypt', 'equatorial guinea', 
          'eritrea', 'eswatini', 'ethiopia', 'gabon', 'gambia', 'ghana', 'guinea', 'guinea-bissau', 
          'ivory coast', 'kenya', 'lesotho', 'liberia', 'libya', 'madagascar', 'malawi', 'mali', 
          'mauritania', 'mauritius', 'morocco', 'mozambique', 'namibia', 'niger', 'nigeria', 'rwanda', 
          'sao tome', 'senegal', 'seychelles', 'sierra leone', 'somalia', 'south africa', 'south sudan', 
          'sudan', 'tanzania', 'togo', 'tunisia', 'uganda', 'zambia', 'zimbabwe'
        ];
        
        // NA countries list - North America
        const naCountries = [
          'united states', 'usa', 'us', 'canada', 'mexico', 'greenland', 'bermuda', 'saint pierre', 
          'miquelon', 'america', 'american'
        ];
        
        // LATAM countries list - Latin America and Caribbean
        const latamCountries = [
          // Central America
          'belize', 'costa rica', 'el salvador', 'guatemala', 'honduras', 'nicaragua', 'panama',
          // South America
          'argentina', 'bolivia', 'brazil', 'chile', 'colombia', 'ecuador', 'guyana', 'paraguay', 
          'peru', 'suriname', 'uruguay', 'venezuela',
          // Caribbean
          'antigua', 'bahamas', 'barbados', 'cuba', 'dominica', 'dominican republic', 'grenada', 
          'haiti', 'jamaica', 'saint kitts', 'saint lucia', 'saint vincent', 'trinidad and tobago',
          'puerto rico', 'aruba', 'curacao', 'cayman', 'virgin islands'
        ];
        
        let relevantCountries = [];
        
        // Determine which country list to check against
        if (formData.region.toLowerCase().includes('apac') || formData.region.toLowerCase().includes('asia')) {
          relevantCountries = apacCountries;
        } else if (formData.region.toLowerCase().includes('emea') || formData.region.toLowerCase().includes('europe')) {
          relevantCountries = emeaCountries;
        } else if (formData.region.toLowerCase().includes('na') || formData.region.toLowerCase().includes('north america')) {
          relevantCountries = naCountries;
        } else if (formData.region.toLowerCase().includes('latam') || formData.region.toLowerCase().includes('latin america')) {
          relevantCountries = latamCountries;
        }
        
        // Check if any focus country is in the relevant region
        for (const country of product.focusCountries) {
          const countryLower = country.toLowerCase();
          if (relevantCountries.some(rc => countryLower.includes(rc) || rc.includes(countryLower))) {
            regionMatch = true;
            break;
          }
        }
      }
      
      if (regionMatch) {
        score += WEIGHTAGE.REGION;
        matchDetails.region = true;
      }
      
      // Pricing Model matching (1 point)
      if (product.pricingModel && Array.isArray(product.pricingModel)) {
        const pricingMatch = product.pricingModel.some(pricing => {
          if (typeof pricing !== 'string') return false;
          return pricing.toLowerCase() === formData.pricingModel.toLowerCase();
        });
        
        if (pricingMatch) {
          score += WEIGHTAGE.PRICING_MODEL;
          matchDetails.pricingModel = true;
        }
      }
      
      // Calculate percentage match
      const matchPercentage = Math.round((score / totalPossibleScore) * 100);
      
      return {
        ...product,
        matchScore: matchPercentage,
        rawScore: score,
        totalPossible: totalPossibleScore,
        matchDetails: matchDetails // For debugging
      };
    });
    
    // Sort by match score (highest first)
    const sortedProducts = evaluatedProducts.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return top 20 products without any threshold filtering
    const topProducts = sortedProducts.slice(0, 20);
    
    // Add debugging info in development
    console.log(`Found ${sortedProducts.length} total products, returning ${topProducts.length} top matches`);
    if (topProducts.length > 0) {
      console.log(`Top match: ${topProducts[0].name} with score ${topProducts[0].matchScore}%`);
      console.log(`Match details:`, topProducts[0].matchDetails);
    }
    
    // Remove matchDetails from response before sending to client
    const finalProducts = topProducts.map(product => {
      const { matchDetails, ...rest } = product;
      return rest;
    });
    
    return NextResponse.json({
      success: true,
      results: finalProducts,
      totalMatches: sortedProducts.length
    });
    
  } catch (error) {
    console.error('Error evaluating legal tech products:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to evaluate products',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
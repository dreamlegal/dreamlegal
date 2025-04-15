
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// export async function POST(req: Request) {
//     const { userId } = await req.json();
    
//     const rfpData = await prisma.rfpForm.findMany({
//         where: { userID: userId },
//         orderBy: {
//             createdAt: 'desc', // Ordering by creation date in descending order
//         },
//     });

//     if (!rfpData || rfpData.length === 0) {
//         return NextResponse.json({ success: false, message: 'You Have Not Made Any RFP' });
//     }

//     const response = rfpData.map((rfp) => {
//         const { userOrgType, userTeamSize, customisation, urgency, budget, features, vendors } = rfp;

//         const basicDetails = {
//             orgType: userOrgType,
//             teamSize: userTeamSize || 'N/A',
//             customisation: customisation || 'N/A',
//             askedUrgency: urgency?.askedUrgency,
//             budgetMin: budget?.askedMin,
//             budgetMax: budget?.askedMax,
//         };

//         const selectedFeatures = {};
//         for (const category in features) {
//             for (const subCategory in features[category]) {
//                 for (const feature in features[category][subCategory]) {
//                     if (features[category][subCategory][feature].selected) {
//                         selectedFeatures[feature] = features[category][subCategory][feature].responses;
//                     }
//                 }
//             }
//         }

//         // Get unique vendor IDs from all selected features
//         const uniqueVendorIds = new Set();
//         Object.values(selectedFeatures).forEach(featureResponses => {
//             featureResponses.forEach(response => uniqueVendorIds.add(response.vendorId));
//         });

//         const vendorResponses = Array.from(uniqueVendorIds).map(vendorId => {
//             let vendorName = 'Unknown Vendor';
            
//             // Check in byCategory if it's selected
//             if (vendors?.byCategory?.selected) {
//                 vendorName = vendors.byCategory.vendors.find(v => v.vendorId === vendorId)?.vendorName ?? 'Unknown Vendor';
//             }
//             // If not found in byCategory or it wasn't selected, check in byProduct
//             if (vendorName === 'Unknown Vendor' && vendors?.byProduct?.selected) {
//                 vendorName = vendors.byProduct.products.find(p => p.vendorId === vendorId)?.vendorName ?? 'Unknown Vendor';
//             }

//             const featureResponses = [];

//             for (const feature in selectedFeatures) {
//                 const response = selectedFeatures[feature].find((r) => r.vendorId === vendorId);
//                 if (response) {
//                     featureResponses.push({
//                         feature: feature,
//                         response: response.response,
//                     });
//                 }
//             }

//             const score = calculateVendorScore(featureResponses);

//             return {
//                 vendorName,
//                 vendorId,
//                 urgencyResponse: urgency?.urgencyResponse?.find((ur) => ur.vendorId === vendorId)?.response || 'N/A',
//                 budgetResponse: budget?.budgetResponse?.find((br) => br.vendorId === vendorId)?.response || 'N/A',
//                 featureResponses,
//                 score: `${score.toFixed(2)}%`,
//             };
//         });

//         return {
//             basicDetails,
//             selectedFeatures,
//             vendorResponses,
//         };
//     });

//     return NextResponse.json({ success: true, data: response });
// }

// function calculateVendorScore(featureResponses) {
//     let totalPoints = 0;
//     let totalFeatures = featureResponses.length;

//     featureResponses.forEach((response) => {
//         if (response.response === 'yes') {
//             totalPoints += 1;
//         } else if (response.response === 'configurable') {
//             totalPoints += 0.5;
//         }
//     });

//     return totalFeatures > 0 ? (totalPoints / totalFeatures) * 100 : 0;
// }


export async function POST(req: Request) {
    try {
        // Check if prisma client is properly initialized
        if (!prisma) {
            throw new Error('Prisma client is not initialized');
        }

        const { userId } = await req.json();
        
        if (!userId) {
            return NextResponse.json({ 
                success: false, 
                message: 'User ID is required' 
            }, { status: 400 });
        }

        console.log(`Fetching RFPs for user ID: ${userId}`);
        
        const rfpData = await prisma.RfpForms.findMany({
            where: { userID: userId },
            orderBy: {
                createdAt: 'desc', // Ordering by creation date in descending order
            },
        });

        if (!rfpData || rfpData.length === 0) {
            return NextResponse.json({ success: false, message: 'You Have Not Made Any RFP' });
        }

        console.log(`Found ${rfpData.length} RFPs for user`);

        const response = rfpData.map((rfp) => {
            // Ensure the response has standardized structure
            const standardizedRfp = standardizeRfpStructure(rfp);
            
            const { 
                userOrgType, 
                userTeamSize, 
                keyProblems,
                keyGoals,
                customisation, 
                urgency, 
                budget, 
                processLifecycle,
                features, 
                selectedCategory 
            } = standardizedRfp;

            // Basic details using the new structure
            const basicDetails = {
                title: selectedCategory || 'RFP',
                category: selectedCategory || 'N/A',
                orgType: userOrgType?.value || userOrgType || 'N/A',
                teamSize: userTeamSize?.value || userTeamSize || 'N/A',
                customisation: customisation?.value || customisation || 'N/A',
                keyProblems: keyProblems?.value || keyProblems || 'N/A',
                keyGoals: keyGoals?.value || keyGoals || 'N/A',
                urgency: urgency?.value || (urgency?.askedUrgency) || 'N/A',
                budgetMin: budget?.value?.min || budget?.askedMin || 'N/A',
                budgetMax: budget?.value?.max || budget?.askedMax || 'N/A',
                budgetCurrency: budget?.value?.currency || budget?.budgetUnit || 'USD'
            };

            // Process lifecycle stages
            const lifecycleStages = [];
            if (processLifecycle) {
                if (Array.isArray(processLifecycle)) {
                    // Old format - array of stages
                    lifecycleStages.push(...processLifecycle);
                } else {
                    // New format - object with selected flag
                    for (const stage in processLifecycle) {
                        if (processLifecycle[stage].selected) {
                            lifecycleStages.push(stage);
                        }
                    }
                }
            }

            // Extract selected features and their responses
            const selectedFeatures = {};
            const allVendorResponses = new Map(); // Map to collect all vendor responses

            // Helper function to add vendor response data
            const addVendorResponse = (vendorId, field, value) => {
                if (!allVendorResponses.has(vendorId)) {
                    allVendorResponses.set(vendorId, {
                        vendorId,
                        vendorName: `Vendor ${vendorId.substring(0, 6)}`, // Default name
                        featureResponses: [],
                        processLifecycleResponses: [],
                        urgencyResponse: null,
                        budgetResponse: null,
                        problemsResponse: null,
                        goalsResponse: null,
                        customizationResponse: null
                    });
                }
                
                const vendorData = allVendorResponses.get(vendorId);
                vendorData[field] = value;
            };

            // Get urgency responses
            if (urgency?.responses && Array.isArray(urgency.responses)) {
                urgency.responses.forEach(response => {
                    addVendorResponse(response.vendorId, 'urgencyResponse', {
                        meetable: response.meetable,
                        timeline: response.proposedTimeline
                    });
                });
            } else if (urgency?.urgencyResponse && Array.isArray(urgency.urgencyResponse)) {
                // Legacy format
                urgency.urgencyResponse.forEach(response => {
                    addVendorResponse(response.vendorId, 'urgencyResponse', response.response || 'N/A');
                });
            }

            // Get budget responses
            if (budget?.responses && Array.isArray(budget.responses)) {
                budget.responses.forEach(response => {
                    addVendorResponse(response.vendorId, 'budgetResponse', {
                        meetable: response.meetable,
                        amount: response.quotedAmount,
                        details: response.pricingDetails
                    });
                });
            } else if (budget?.budgetResponse && Array.isArray(budget.budgetResponse)) {
                // Legacy format
                budget.budgetResponse.forEach(response => {
                    addVendorResponse(response.vendorId, 'budgetResponse', response.response || 'N/A');
                });
            }

            // Get key problems responses
            if (keyProblems?.responses && Array.isArray(keyProblems.responses)) {
                keyProblems.responses.forEach(response => {
                    addVendorResponse(response.vendorId, 'problemsResponse', response.response);
                });
            }

            // Get key goals responses
            if (keyGoals?.responses && Array.isArray(keyGoals.responses)) {
                keyGoals.responses.forEach(response => {
                    addVendorResponse(response.vendorId, 'goalsResponse', response.response);
                });
            }

            // Get customization responses
            if (customisation?.responses && Array.isArray(customisation.responses)) {
                customisation.responses.forEach(response => {
                    addVendorResponse(response.vendorId, 'customizationResponse', response.response);
                });
            }

            // Get process lifecycle responses
            if (processLifecycle && typeof processLifecycle === 'object' && !Array.isArray(processLifecycle)) {
                for (const stage in processLifecycle) {
                    if (processLifecycle[stage].responses && Array.isArray(processLifecycle[stage].responses)) {
                        processLifecycle[stage].responses.forEach(response => {
                            const vendorId = response.vendorId;
                            if (!allVendorResponses.has(vendorId)) {
                                allVendorResponses.set(vendorId, {
                                    vendorId,
                                    vendorName: `Vendor ${vendorId.substring(0, 6)}`,
                                    featureResponses: [],
                                    processLifecycleResponses: [],
                                    urgencyResponse: null,
                                    budgetResponse: null,
                                    problemsResponse: null,
                                    goalsResponse: null,
                                    customizationResponse: null
                                });
                            }
                            
                            const vendorData = allVendorResponses.get(vendorId);
                            vendorData.processLifecycleResponses.push({
                                stage,
                                available: response.available,
                                details: response.details
                            });
                        });
                    }
                }
            }

            // Process features and their responses
            if (features && typeof features === 'object') {
                for (const category in features) {
                    for (const functionality in features[category]) {
                        if (functionality === 'selected') continue;
                        
                        const functionalityObj = features[category][functionality];
                        const isSelected = functionalityObj.selected;
                        
                        for (const feature in functionalityObj) {
                            if (feature === 'selected') continue;
                            
                            const featureObj = functionalityObj[feature];
                            const isFeatureSelected = featureObj.selected;
                            
                            if (isSelected && isFeatureSelected) {
                                const featureKey = `${functionality} - ${feature}`;
                                selectedFeatures[featureKey] = featureObj;
                                
                                if (featureObj.responses && Array.isArray(featureObj.responses)) {
                                    featureObj.responses.forEach(response => {
                                        const vendorId = response.vendorId;
                                        if (!allVendorResponses.has(vendorId)) {
                                            allVendorResponses.set(vendorId, {
                                                vendorId,
                                                vendorName: `Vendor ${vendorId.substring(0, 6)}`,
                                                featureResponses: [],
                                                processLifecycleResponses: [],
                                                urgencyResponse: null,
                                                budgetResponse: null,
                                                problemsResponse: null,
                                                goalsResponse: null,
                                                customizationResponse: null
                                            });
                                        }
                                        
                                        const vendorData = allVendorResponses.get(vendorId);
                                        vendorData.featureResponses.push({
                                            category,
                                            functionality,
                                            feature,
                                            featureKey,
                                            available: response.available,
                                            details: response.details
                                        });
                                    });
                                }
                            }
                        }
                    }
                }
            }

            // Convert vendor data to array and calculate scores
            const vendorResponses = Array.from(allVendorResponses.values()).map(vendor => {
                // Calculate vendor score based on features
                let score = calculateVendorScore(vendor.featureResponses);
                
                return {
                    ...vendor,
                    score
                };
            });

            return {
                id: rfp.id,
                basicDetails,
                lifecycleStages,
                selectedFeatures,
                vendorResponses,
                createdAt: rfp.createdAt,
                updatedAt: rfp.updatedAt
            };
        });

        return NextResponse.json({ success: true, data: response });
    } catch (error) {
        console.error('Error fetching RFP data:', error);
        
        let errorMessage = 'Failed to fetch RFP data';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        return NextResponse.json({ 
            success: false, 
            message: errorMessage 
        }, { status: 500 });
    }
}

// Helper function to standardize RFP structure in case of older data formats
function standardizeRfpStructure(rfp) {
    const standardRfp = { ...rfp };
    
    // Helper function to standardize fields with value/responses pattern
    const standardizeField = (field) => {
        if (!standardRfp[field]) {
            standardRfp[field] = { value: '', responses: [] };
            return;
        }
        
        if (typeof standardRfp[field] === 'string') {
            standardRfp[field] = { value: standardRfp[field], responses: [] };
            return;
        }
        
        if (!standardRfp[field].value && !standardRfp[field].responses) {
            standardRfp[field] = { value: JSON.stringify(standardRfp[field]), responses: [] };
            return;
        }
        
        if (!standardRfp[field].responses) {
            standardRfp[field].responses = [];
        }
    };
    
    // Standardize basic fields
    ['userOrgType', 'userTeamSize', 'keyProblems', 'keyGoals', 'customisation'].forEach(standardizeField);
    
    // Standardize urgency
    if (!standardRfp.urgency) {
        standardRfp.urgency = { value: '', responses: [] };
    } else if (standardRfp.urgency.askedUrgency) {
        // Convert old format to new format
        standardRfp.urgency = {
            value: standardRfp.urgency.askedUrgency,
            responses: standardRfp.urgency.urgencyResponse || []
        };
    } else if (!standardRfp.urgency.responses) {
        standardRfp.urgency.responses = [];
    }
    
    // Standardize budget
    if (!standardRfp.budget) {
        standardRfp.budget = { value: { min: '', max: '', currency: '' }, responses: [] };
    } else if (standardRfp.budget.askedMin) {
        // Convert old format to new format
        standardRfp.budget = {
            value: {
                min: standardRfp.budget.askedMin,
                max: standardRfp.budget.askedMax,
                currency: standardRfp.budget.budgetUnit
            },
            responses: standardRfp.budget.budgetResponse || []
        };
    } else if (!standardRfp.budget.responses) {
        standardRfp.budget.responses = [];
    }
    
    return standardRfp;
}

function calculateVendorScore(featureResponses) {
    let totalPoints = 0;
    let totalFeatures = featureResponses.length;

    featureResponses.forEach((response) => {
        if (response.available === true) {
            totalPoints += 1;
        } else if (response.details?.includes('partial') || response.details?.includes('configurable')) {
            totalPoints += 0.5;
        }
    });

    return totalFeatures > 0 ? (totalPoints / totalFeatures) * 100 : 0;
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { userId } = await req.json();
    
    const rfpData = await prisma.rfpForm.findMany({
        where: { userID: userId },
        orderBy: {
            createdAt: 'desc', // Ordering by creation date in descending order
        },
    });

    if (!rfpData || rfpData.length === 0) {
        return NextResponse.json({ success: false, message: 'You Have Not Made Any RFP' });
    }

    const response = rfpData.map((rfp) => {
        const { userOrgType, userTeamSize, customisation, urgency, budget, features, vendors } = rfp;

        const basicDetails = {
            orgType: userOrgType,
            teamSize: userTeamSize || 'N/A',
            customisation: customisation || 'N/A',
            askedUrgency: urgency?.askedUrgency,
            budgetMin: budget?.askedMin,
            budgetMax: budget?.askedMax,
        };

        const selectedFeatures = {};
        for (const category in features) {
            for (const subCategory in features[category]) {
                for (const feature in features[category][subCategory]) {
                    if (features[category][subCategory][feature].selected) {
                        selectedFeatures[feature] = features[category][subCategory][feature].responses;
                    }
                }
            }
        }

        // Get unique vendor IDs from all selected features
        const uniqueVendorIds = new Set();
        Object.values(selectedFeatures).forEach(featureResponses => {
            featureResponses.forEach(response => uniqueVendorIds.add(response.vendorId));
        });

        const vendorResponses = Array.from(uniqueVendorIds).map(vendorId => {
            let vendorName = 'Unknown Vendor';
            
            // Check in byCategory if it's selected
            if (vendors?.byCategory?.selected) {
                vendorName = vendors.byCategory.vendors.find(v => v.vendorId === vendorId)?.vendorName ?? 'Unknown Vendor';
            }
            // If not found in byCategory or it wasn't selected, check in byProduct
            if (vendorName === 'Unknown Vendor' && vendors?.byProduct?.selected) {
                vendorName = vendors.byProduct.products.find(p => p.vendorId === vendorId)?.vendorName ?? 'Unknown Vendor';
            }

            const featureResponses = [];

            for (const feature in selectedFeatures) {
                const response = selectedFeatures[feature].find((r) => r.vendorId === vendorId);
                if (response) {
                    featureResponses.push({
                        feature: feature,
                        response: response.response,
                    });
                }
            }

            const score = calculateVendorScore(featureResponses);

            return {
                vendorName,
                vendorId,
                urgencyResponse: urgency?.urgencyResponse?.find((ur) => ur.vendorId === vendorId)?.response || 'N/A',
                budgetResponse: budget?.budgetResponse?.find((br) => br.vendorId === vendorId)?.response || 'N/A',
                featureResponses,
                score: `${score.toFixed(2)}%`,
            };
        });

        return {
            basicDetails,
            selectedFeatures,
            vendorResponses,
        };
    });

    return NextResponse.json({ success: true, data: response });
}

function calculateVendorScore(featureResponses) {
    let totalPoints = 0;
    let totalFeatures = featureResponses.length;

    featureResponses.forEach((response) => {
        if (response.response === 'yes') {
            totalPoints += 1;
        } else if (response.response === 'configurable') {
            totalPoints += 0.5;
        }
    });

    return totalFeatures > 0 ? (totalPoints / totalFeatures) * 100 : 0;
}

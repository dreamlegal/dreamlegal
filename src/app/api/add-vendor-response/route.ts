
// import prisma from '@/lib/prisma'; 

// import { NextResponse } from "next/server"; // For Next.js 13+
// // import { prisma } from "../../lib/prisma"; // Adjust based on your project

// export async function POST(req: Request) {
//   try {
//     const { leadId, vendorId, urgencyResponse, budgetResponse } = await req.json();

//     // Fetch the lead to modify the urgency and budget fields
//     const lead = await prisma.rfpForm.findUnique({
//       where: { id: leadId },
//     });

//     if (!lead) {
//       return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
//     }

//     // Ensure urgencyResponse and budgetResponse are arrays inside the urgency and budget objects
//     const urgency = lead.urgency ?? { askedUrgency: "", urgencyResponse: [] };
//     const budget = lead.budget ?? { askedMax: "", askedMin: "", budgetUnit: "", budgetResponse: [] };

//     // Modify the urgencyResponse array for the vendor
//     const updatedUrgencyResponse = urgency.urgencyResponse.map((item: any) =>
//       item.vendorId === vendorId
//         ? { ...item, response: urgencyResponse }
//         : item
//     );

//     // Add a new response if vendorId not found in the urgencyResponse
//     if (!updatedUrgencyResponse.some((item: any) => item.vendorId === vendorId)) {
//       updatedUrgencyResponse.push({ vendorId, response: urgencyResponse });
//     }

//     // Modify the budgetResponse array for the vendor
//     const updatedBudgetResponse = budget.budgetResponse.map((item: any) =>
//       item.vendorId === vendorId
//         ? { ...item, response: budgetResponse }
//         : item
//     );

//     // Add a new response if vendorId not found in the budgetResponse
//     if (!updatedBudgetResponse.some((item: any) => item.vendorId === vendorId)) {
//       updatedBudgetResponse.push({ vendorId, response: budgetResponse });
//     }

//     // Update the lead with new urgencyResponse and budgetResponse
//     const updatedLead = await prisma.rfpForm.update({
//       where: { id: leadId },
//       data: {
//         urgency: {
//           ...urgency,
//           urgencyResponse: updatedUrgencyResponse,
//         },
//         budget: {
//           ...budget,
//           budgetResponse: updatedBudgetResponse,
//         },
//       },
//     });

//     return NextResponse.json({ success: true, data: updatedLead });
//   } catch (error) {
//     console.error("Error updating vendor response:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to update response" },
//       { status: 500 }
//     );
//   }
// }
// import prisma from '@/lib/prisma';
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { leadId, vendorId, urgencyResponse, budgetResponse, features } = await req.json();

//     // Fetch the lead to modify
//     const lead = await prisma.rfpForm.findUnique({
//       where: { id: leadId },
//     });

//     if (!lead) {
//       return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
//     }

//     // Handle urgency and budget responses (as before)
//     const urgency = lead.urgency ?? { askedUrgency: "", urgencyResponse: [] };
//     const budget = lead.budget ?? { askedMax: "", askedMin: "", budgetUnit: "", budgetResponse: [] };

//     const updatedUrgencyResponse = updateResponseArray(urgency.urgencyResponse, vendorId, urgencyResponse);
//     const updatedBudgetResponse = updateResponseArray(budget.budgetResponse, vendorId, budgetResponse);

//     // Handle features responses
//     const updatedFeatures = updateFeaturesResponses(lead.features, vendorId, features);

//     // Update the lead with new responses
//     const updatedLead = await prisma.rfpForm.update({
//       where: { id: leadId },
//       data: {
//         urgency: {
//           ...urgency,
//           urgencyResponse: updatedUrgencyResponse,
//         },
//         budget: {
//           ...budget,
//           budgetResponse: updatedBudgetResponse,
//         },
//         features: updatedFeatures,
//       },
//     });

//     return NextResponse.json({ success: true, data: updatedLead });
//   } catch (error) {
//     console.error("Error updating vendor response:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to update response" },
//       { status: 500 }
//     );
//   }
// }

// function updateResponseArray(responseArray: any[], vendorId: string, newResponse: string) {
//   const updatedArray = responseArray.map((item: any) =>
//     item.vendorId === vendorId
//       ? { ...item, response: newResponse }
//       : item
//   );

//   if (!updatedArray.some((item: any) => item.vendorId === vendorId)) {
//     updatedArray.push({ vendorId, response: newResponse });
//   }

//   return updatedArray;
// }

// function updateFeaturesResponses(features: any, vendorId: string, newResponses: any) {
//   const updatedFeatures = { ...features };

//   for (const category in newResponses) {
//     for (const subCategory in newResponses[category]) {
//       for (const feature in newResponses[category][subCategory]) {
//         const response = newResponses[category][subCategory][feature];
        
//         if (!updatedFeatures[category][subCategory][feature].responses) {
//           updatedFeatures[category][subCategory][feature].responses = [];
//         }

//         const responseIndex = updatedFeatures[category][subCategory][feature].responses.findIndex(
//           (r: any) => r.vendorId === vendorId
//         );

//         if (responseIndex !== -1) {
//           updatedFeatures[category][subCategory][feature].responses[responseIndex].response = response;
//         } else {
//           updatedFeatures[category][subCategory][feature].responses.push({ vendorId, response });
//         }
//       }
//     }
//   }

//   return updatedFeatures;
// }
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { leadId, vendorId, urgencyResponse, budgetResponse, features } = await req.json();

    // Fetch the lead to modify
    const lead = await prisma.rfpForm.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    // Handle urgency and budget responses
    const urgency = lead.urgency ?? { askedUrgency: "", urgencyResponse: [] };
    const budget = lead.budget ?? { askedMax: "", askedMin: "", budgetUnit: "", budgetResponse: [] };

    const updatedUrgencyResponse = updateResponseArray(urgency.urgencyResponse, vendorId, urgencyResponse);
    const updatedBudgetResponse = updateResponseArray(budget.budgetResponse, vendorId, budgetResponse);

    // Handle features responses
    const updatedFeatures = updateFeaturesResponses(lead.features, vendorId, features);

    // Update the lead with new responses
    const updatedLead = await prisma.rfpForm.update({
      where: { id: leadId },
      data: {
        urgency: {
          ...urgency,
          urgencyResponse: updatedUrgencyResponse,
        },
        budget: {
          ...budget,
          budgetResponse: updatedBudgetResponse,
        },
        features: updatedFeatures,
      },
    });

    return NextResponse.json({ success: true, data: updatedLead });
  } catch (error) {
    console.error("Error updating vendor response:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update response" },
      { status: 500 }
    );
  }
}

function updateResponseArray(responseArray: any[], vendorId: string, newResponse: string) {
  const existingIndex = responseArray.findIndex((item: any) => item.vendorId === vendorId);
  
  if (existingIndex !== -1) {
    // Update existing response
    return responseArray.map((item: any, index: number) =>
      index === existingIndex ? { ...item, response: newResponse } : item
    );
  } else {
    // Add new response
    return [...responseArray, { vendorId, response: newResponse }];
  }
}

function updateFeaturesResponses(features: any, vendorId: string, newResponses: any) {
  const updatedFeatures = JSON.parse(JSON.stringify(features)); // Deep clone

  for (const category in newResponses) {
    for (const subCategory in newResponses[category]) {
      for (const feature in newResponses[category][subCategory]) {
        const response = newResponses[category][subCategory][feature];
        
        if (!updatedFeatures[category][subCategory][feature].responses) {
          updatedFeatures[category][subCategory][feature].responses = [];
        }

        const responseIndex = updatedFeatures[category][subCategory][feature].responses.findIndex(
          (r: any) => r.vendorId === vendorId
        );

        if (responseIndex !== -1) {
          // Update existing response
          updatedFeatures[category][subCategory][feature].responses[responseIndex].response = response;
        } else {
          // Add new response
          updatedFeatures[category][subCategory][feature].responses.push({ vendorId, response });
        }
      }
    }
  }

  return updatedFeatures;
}
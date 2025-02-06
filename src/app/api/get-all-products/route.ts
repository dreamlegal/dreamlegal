import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { number } = await request.json();
  if (!number) {
    return new Response(JSON.stringify({ success: false, msg: "Please provide a number" }), {
      status: 400,
    });
  }

  if (number > 1) {
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          logoUrl: true,
          featured: true,
          category: true,
          active: true,
          deployement: true,
          mobileAvailable: true,
          focusCountries: true,
          avgTimeAdoption: true,
          languages: true,
          securityCertificate: true,
          integration: true,
          usp: true,
          upcomingUpdates: true,
          userCategory: true,
          userCategoryPercentage: true,
          industry: true,
          industryPercentage: true,
          practiceAreas: true,
          practiceAreasPercentage: true,
          teamSize: true,
          teamsizePercentage: true,
          processLifecycle: true,
          features: true,
          freeTrial: true,
          timePeriod: true,
          freeVersion: true,
          pricingModel: true,
          contractPeriod: true,
          nameofPlan: true,
          validity: true,
          price: true,
          pricingParams: true,
          Demo: true,
          DemoNote: true,
          support: true,
          supportNote: true,
          training: true,
          trainingNote: true,
          storage: true,
          storageNote: true,
          fileSize: true,
          fileSizeNote: true,
          maintenance: true,
          maintenanceNote: true,
          reqForChange: true,
          reqForChangeNote: true,
          trainingReq: true,
          trainingReqNote: true,
          dataMigration: true,
          dataMigrationNote: true,
          Images: true,
          videoUrl: true,
          attachments: true,
          youtubeUrl: true,
          linkedinUrl: true,
          twitterUrl: true,
          instagramUrl: true,
          createdAt: true,
          updatedAt: true,
          user: true,
          company: true,
          Review: true,
        },
      });
  
      if (products === null) {
        return new Response(
          JSON.stringify({
            msg: "No products found.",
            success: true,
          }),
          {
            status: 200,
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              "Pragma": "no-cache",
              "Expires": "0",
              "Surrogate-Control": "no-store",
            },
          }
        );
      }
  
      return new Response(
        JSON.stringify({
          msg: "All Products fetched successfully",
          success: true,
          products,
        }),
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Surrogate-Control": "no-store",
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          msg: "An error occurred while fetching the products.",
          success: false,
        }),
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Surrogate-Control": "no-store",
          },
        }
      );
    }
  } else {  
    return new Response(
      JSON.stringify({
        msg: "Please provide a number greater than 1.",
        success: false,
      }),
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  }
 
}

// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const { number } = await request.json();
    
//     // Validate input
//     if (!number) {
//       console.log("Missing number parameter");
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           msg: "Please provide a number",
//           debug: "Missing number parameter" 
//         }), 
//         { status: 400 }
//       );
//     }

//     if (number <= 1) {
//       console.log("Number parameter too small:", number);
//       return new Response(
//         JSON.stringify({
//           msg: "Please provide a number greater than 1.",
//           success: false,
//           debug: `Invalid number value: ${number}`
//         }),
//         { status: 400 }
//       );
//     }

//     // Add connection test
//     try {
//       await prisma.$connect();
//     } catch (connError) {
//       console.error("Prisma connection error:", connError);
//       return new Response(
//         JSON.stringify({
//           msg: "Database connection failed",
//           success: false,
//           error: connError.message,
//           debug: "Prisma connection failed"
//         }),
//         { status: 500 }
//       );
//     }

//     // Fetch products with timeout and error handling
//     const products = await Promise.race([
//       prisma.product.findMany({
//         select: {
//           id: true,
//           name: true,
//           description: true,
//           slug: true,
//           logoUrl: true,
//           featured: true,
//           category: true,
//           active: true,
//           deployement: true,
//           mobileAvailable: true,
//           focusCountries: true,
//           avgTimeAdoption: true,
//           languages: true,
//           securityCertificate: true,
//           integration: true,
//           usp: true,
//           upcomingUpdates: true,
//           userCategory: true,
//           userCategoryPercentage: true,
//           industry: true,
//           industryPercentage: true,
//           practiceAreas: true,
//           practiceAreasPercentage: true,
//           teamSize: true,
//           teamsizePercentage: true,
//           processLifecycle: true,
//           features: true,
//           freeTrial: true,
//           timePeriod: true,
//           freeVersion: true,
//           pricingModel: true,
//           contractPeriod: true,
//           nameofPlan: true,
//           validity: true,
//           price: true,
//           pricingParams: true,
//           Demo: true,
//           DemoNote: true,
//           support: true,
//           supportNote: true,
//           training: true,
//           trainingNote: true,
//           storage: true,
//           storageNote: true,
//           fileSize: true,
//           fileSizeNote: true,
//           maintenance: true,
//           maintenanceNote: true,
//           reqForChange: true,
//           reqForChangeNote: true,
//           trainingReq: true,
//           trainingReqNote: true,
//           dataMigration: true,
//           dataMigrationNote: true,
//           Images: true,
//           videoUrl: true,
//           attachments: true,
//           youtubeUrl: true,
//           linkedinUrl: true,
//           twitterUrl: true,
//           instagramUrl: true,
//           createdAt: true,
//           updatedAt: true,
//           user: true,
//           company: true,
//           Review: true,
//         },
//         where: {
//           active: "publish"  // Add this filter to the database query
//         }
//       }),
//       new Promise((_, reject) => 
//         setTimeout(() => reject(new Error('Database query timeout')), 15000)
//       )
//     ]);

//     if (!products || products.length === 0) {
//       console.log("No products found");
//       return new Response(
//         JSON.stringify({
//           msg: "No products found.",
//           success: true,
//           debug: "Query successful but returned no products"
//         }),
//         { status: 200 }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         msg: "All Products fetched successfully",
//         success: true,
//         products,
//         debug: `Retrieved ${products.length} products`
//       }),
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("API Error:", {
//       message: error.message,
//       stack: error.stack,
//       name: error.name
//     });

//     // Check for specific error types
//     if (error.code === 'P2002') {
//       return new Response(
//         JSON.stringify({
//           msg: "Database constraint violation",
//           success: false,
//           error: error.message,
//           debug: "Prisma unique constraint violation"
//         }),
//         { status: 409 }
//       );
//     }

//     // Generic error response
//     return new Response(
//       JSON.stringify({
//         msg: "An error occurred while fetching the products.",
//         success: false,
//         error: error.message,
//         debug: "Unhandled error in API route"
//       }),
//       { status: 500 }
//     );
//   } finally {
//     // Always disconnect prisma client
//     await prisma.$disconnect();
//   }
// }
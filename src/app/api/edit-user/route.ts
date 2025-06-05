
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const requestData = await request.json();
//   console.log("Incoming request data:", requestData);

//   try {
//     const {
//       Contact,
//       Location,
//       Address,
//       TeamSize,
//       Designation,
//       CompanyType,
//       CompanyAddress,
//       CompanyEmail,
//       primaryLanguages,
//       industries,
//       practiceAreas,
//       workTypes,
//       goals,
//       existingTools,
//       userId,
//       editing,
//       name,
//       email,
//     } = requestData;

//     // Validate userId
//     if (!userId) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "User ID is required" }),
//         { status: 400 }
//       );
//     }

//     // Check if the user exists
//     const existingProfile = await prisma.user.findFirst({
//       where: { id: userId },
//     });

//     if (!existingProfile) {
//       return new Response(
//         JSON.stringify({ success: false, msg: "Profile not found" }),
//         { status: 404 }
//       );
//     }
    
//     // Prepare update data with array handling
//     const updateData = {
//       Contact: Contact || null,
//       Location: Location || null,
//       Address: Address || null,
//       Designation: Designation || null,
//       CompanyType: CompanyType || null,
//       CompanyAddress: CompanyAddress || null,
//       CompanyEmail: CompanyEmail || null,
//       // Handle array fields properly

//       PrimaryLanguage: primaryLanguages || [],
//       Industry: industries || [],
//       PracticeArea: practiceAreas || [],
//       WorkType: workTypes || [],
//       Goals: goals || [],
//       ExistingTools: existingTools || [],
//       TeamSize:TeamSize|| ""
//     };

//     if (editing) {
//       let userAccount = await prisma.userAccount.findFirst({
//         where: { userId: userId },
//       });

//       if (!userAccount) {
//         // Create new user account if not exists
//         userAccount = await prisma.userAccount.create({
//           data: {
//             userId,
//             ...updateData,
//           },
//         });

//         return new Response(
//           JSON.stringify({
//             success: true,
//             msg: "Profile created successfully",
//             profile: userAccount,
//           }),
//           { status: 201 }
//         );
//       }

//       // Update existing user account
//       userAccount = await prisma.userAccount.update({
//         where: { id: userAccount.id },
//         data: updateData,
//       });

//       // Update TeamSize in CompanyInfo if provided
//       // if (TeamSize) {
//       //   const companyInfo = await prisma.companyInfo.findFirst({
//       //     where: { userId },
//       //   });

//       //   if (companyInfo) {
//       //     await prisma.companyInfo.update({
//       //       where: { id: companyInfo.id },
//       //       data: { TeamSize },
//       //     });
//       //   } else {
//       //     await prisma.companyInfo.create({
//       //       data: {
//       //         userId,
//       //         TeamSize,
//       //       },
//       //     });
//       //   }
//       // }

//       // Update user name and email if provided
//       if (name || email) {
//         await prisma.user.update({
//           where: { id: userId },
//           data: {
//             ...(name && { name }),
//             ...(email && { email }),
//           },
//         });
//       }

//       return new Response(
//         JSON.stringify({
//           success: true,
//           msg: "Profile updated successfully",
//           profile: userAccount,
//         }),
//         { status: 200 }
//       );
//     } else {
//       // Create new user account
//       const newProfile = await prisma.userAccount.create({
//         data: {
//           userId,
//           ...updateData,
//         },
//       });

//       return new Response(
//         JSON.stringify({
//           success: true,
//           msg: "Profile created successfully",
//           profile: newProfile,
//         }),
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         msg: "Error processing request",
//         error: error instanceof Error ? error.message : String(error)
//       }),
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    console.log("=== PROFILE UPDATE API ===");
    console.log("Request received:", JSON.stringify(requestData, null, 2));

    const {
      Contact,
      Location,
      Address,
      TeamSize,
      Designation,
      CompanyType,
      CompanyAddress,
      CompanyEmail,
      primaryLanguages,
      industries,
      practiceAreas,
      workTypes,
      goals,
      existingTools,
      userId,
      editing,
      name,
      email,
    } = requestData;

    // Validate required fields
    if (!userId) {
      console.log("❌ Missing userId");
      return new Response(
        JSON.stringify({ success: false, msg: "User ID is required" }),
        { status: 400 }
      );
    }

    console.log(`✅ Processing request for userId: ${userId}`);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      console.log("❌ User not found");
      return new Response(
        JSON.stringify({ success: false, msg: "User not found" }),
        { status: 404 }
      );
    }

    console.log(`✅ User found: ${existingUser.email}`);

    // Prepare the update data - simple and direct
    const updateData = {
      Contact: Contact || "",
      Location: Location || "",
      Address: Address || "",
      TeamSize: TeamSize || "",
      Designation: Designation || "",
      CompanyType: CompanyType || "",
      CompanyAddress: CompanyAddress || "",
      CompanyEmail: CompanyEmail || "",
      PrimaryLanguage: Array.isArray(primaryLanguages) ? primaryLanguages : [],
      Industry: Array.isArray(industries) ? industries : [],
      PracticeArea: Array.isArray(practiceAreas) ? practiceAreas : [],
      WorkType: Array.isArray(workTypes) ? workTypes : [],
      Goals: Array.isArray(goals) ? goals : [],
      ExistingTools: Array.isArray(existingTools) ? existingTools : [],
    };

    console.log("📝 Update data prepared:");
    console.log(`- TeamSize: "${updateData.TeamSize}"`);
    console.log(`- CompanyType: "${updateData.CompanyType}"`);
    console.log(`- Designation: "${updateData.Designation}"`);
    console.log(`- Location: "${updateData.Location}"`);

    // Find or create user account
    let userAccount = await prisma.userAccount.findFirst({
      where: { userId: userId },
    });

    if (!userAccount) {
      console.log("🆕 Creating new user account");
      userAccount = await prisma.userAccount.create({
        data: {
          userId,
          ...updateData,
        },
      });
      console.log("✅ User account created successfully");
    } else {
      console.log(`🔄 Updating existing user account (ID: ${userAccount.id})`);
      console.log("Previous values:");
      console.log(`- TeamSize: "${userAccount.TeamSize}"`);
      console.log(`- CompanyType: "${userAccount.CompanyType}"`);

      userAccount = await prisma.userAccount.update({
        where: { id: userAccount.id },
        data: updateData,
      });

      console.log("✅ User account updated successfully");
      console.log("New values:");
      console.log(`- TeamSize: "${userAccount.TeamSize}"`);
      console.log(`- CompanyType: "${userAccount.CompanyType}"`);
    }

    // Update main user record if name or email provided
    if (name || email) {
      const userUpdateData = {};
      if (name) userUpdateData.name = name;
      if (email) userUpdateData.email = email;

      await prisma.user.update({
        where: { id: userId },
        data: userUpdateData,
      });
      console.log("✅ Main user record updated");
    }

    // Return the updated profile
    const response = {
      success: true,
      msg: "Profile updated successfully",
      profile: userAccount,
    };

    console.log("📤 Sending response:");
    console.log(JSON.stringify(response, null, 2));

    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error) {
    console.error("❌ API Error:", error);
    console.error("Stack trace:", error.stack);

    return new Response(
      JSON.stringify({
        success: false,
        msg: "Internal server error",
        error: error.message
      }),
      { status: 500 }
    );
  }
}
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const {
//       Contact,
//       Location,
//       Address,
//       Designation,
//       CompanyType,
//       CompanyAddress,
//       CompanyEmail,
//       logoPreview,
//       userId,
//       editing,
//       name,
//       email,
//       TeamSize,
//     } = await request.json();

//     const existingProfile = await prisma.user.findFirst({
//       where: {
//         id: userId,
//       },
//     });

//     if (!existingProfile) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           msg: "Profile not found",
//         }),
//         { status: 404 }
//       );
//     }

//     if (editing) {
//       // Check if the user account exists
//       let getUser = await prisma.userAccount.findFirst({
//         where: {
//           userId: userId,
//         },
//       });

//       if (!getUser) {
//         // Create a new user account if not found
//         getUser = await prisma.userAccount.create({
//           data: {
//             userId: userId,
//             Contact,
//             Location,
//             Address,
//             Designation,
//             CompanyType,
//             CompanyAddress,
//             CompanyEmail,
//           },
//         });
//         return new Response(
//           JSON.stringify({
//             success: true,
//             msg: "Profile created successfully",
//             profile: getUser,
//           }),
//           { status: 201 }
//         );
//       } else {
//         // Update existing profile in the userAccount table
//         getUser = await prisma.userAccount.update({
//           where: {
//             id: getUser.id,
//           },
//           data: {
//             Contact,
//             Location,
//             Address,
//             Designation,
//             CompanyType,
//             CompanyAddress,
//             CompanyEmail,
//           },
//         });

//         // Update TeamSize in the CompanyInfo table
//         const companyInfo = await prisma.companyInfo.findFirst({
//           where: {
//             userId: userId,
//           },
//         });
//         if (companyInfo) {
//           await prisma.companyInfo.update({
//             where: {
//               id: companyInfo.id,
//             },
//             data: {
//               TeamSize,
//             },
//           });
//         }
//       }

//       // Update name and email in the user table if provided
//       if (name && email) {
//         await prisma.user.update({
//           where: {
//             id: userId,
//           },
//           data: {
//             name,
//             email,
//           },
//         });
//       }

//       return new Response(
//         JSON.stringify({
//           success: true,
//           msg: getUser
//             ? "Profile updated successfully"
//             : "Profile created successfully",
//           profile: getUser,
//         }),
//         { status: 200 }
//       );
//     } else {
//       // Create a new user account if not editing
//       const newProfile = await prisma.userAccount.create({
//         data: {
//           userId: userId,
//           Contact,
//           Location,
//           Address,
//           Designation,
//           CompanyType,
//           CompanyAddress,
//           CompanyEmail,
//         },
//       });

//       if (logoPreview) {
//         await prisma.user.update({
//           where: {
//             id: userId,
//           },
//           data: {
//             image: logoPreview,
//           },
//         });
//       }

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
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         msg: "Error processing request",
//       }),
//       { status: 500 }
//     );
//   }
// }


// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
  
//   try {
//     const {
//       Contact,
//       Location,
//       Address,
//       Designation,
//       CompanyType,
//       CompanyAddress,
//       CompanyEmail,
//       TeamSize,
//       PrimaryLanguage,
//       Industry,
//       PracticeArea,
//       WorkType,
//       Goals,
//       ExistingTools,
//       userId,
//       editing,
//       name,
//       email,
//     } = await request.json();

//     const existingProfile = await prisma.user.findFirst({
//       where: { id: userId },
//     });

//     if (!existingProfile) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           msg: "Profile not found",
//         }),
//         { status: 404 }
//       );
//     }

//     if (editing) {
//       let getUser = await prisma.userAccount.findFirst({
//         where: { userId: userId },
//       });

//       if (!getUser) {
//         // Create a new user account if not found
//         getUser = await prisma.userAccount.create({
//           data: {
//             userId: userId,
//             Contact,
//             Location,
//             Address,
//             Designation,
//             CompanyType,
//             CompanyAddress,
//             CompanyEmail,
//             PrimaryLanguage,
//             Industry,
//             PracticeArea,
//             WorkType,
//             Goals,
//             ExistingTools,
//           },
//         });

//         return new Response(
//           JSON.stringify({
//             success: true,
//             msg: "Profile created successfully",
//             profile: getUser,
//           }),
//           { status: 201 }
//         );
//       } else {
//         // Update existing profile in the userAccount table
//         getUser = await prisma.userAccount.update({
//           where: { id: getUser.id },
//           data: {
//             Contact,
//             Location,
//             Address,
//             Designation,
//             CompanyType,
//             CompanyAddress,
//             CompanyEmail,
//             PrimaryLanguage,
//             Industry,
//             PracticeArea,
//             WorkType,
//             Goals,
//             ExistingTools,
//           },
//         });

//         // Update TeamSize in the CompanyInfo table
//         const companyInfo = await prisma.companyInfo.findFirst({
//           where: { userId: userId },
//         });
//         if (companyInfo) {
//           await prisma.companyInfo.update({
//             where: { id: companyInfo.id },
//             data: { TeamSize },
//           });
//         }
//       }

//       // Update name and email in the user table if provided
//       if (name && email) {
//         await prisma.user.update({
//           where: { id: userId },
//           data: { name, email },
//         });
//       }

//       return new Response(
//         JSON.stringify({
//           success: true,
//           msg: "Profile updated successfully",
//           profile: getUser,
//         }),
//         { status: 200 }
//       );
//     } else {
//       // Create a new user account if not editing
//       const newProfile = await prisma.userAccount.create({
//         data: {
//           userId: userId,
//           Contact,
//           Location,
//           Address,
//           Designation,
//           CompanyType,
//           CompanyAddress,
//           CompanyEmail,
//           PrimaryLanguage,
//           Industry,
//           PracticeArea,
//           WorkType,
//           Goals,
//           ExistingTools,
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
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         msg: "Error processing request",
//       }),
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const requestData = await request.json();
  console.log("Incoming request data:", requestData);

  try {
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

    // Validate userId
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, msg: "User ID is required" }),
        { status: 400 }
      );
    }

    // Check if the user exists
    const existingProfile = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!existingProfile) {
      return new Response(
        JSON.stringify({ success: false, msg: "Profile not found" }),
        { status: 404 }
      );
    }

    // Prepare update data with array handling
    const updateData = {
      Contact: Contact || null,
      Location: Location || null,
      Address: Address || null,
      Designation: Designation || null,
      CompanyType: CompanyType || null,
      CompanyAddress: CompanyAddress || null,
      CompanyEmail: CompanyEmail || null,
      // Handle array fields properly

      PrimaryLanguage: primaryLanguages || [],
      Industry: industries || [],
      PracticeArea: practiceAreas || [],
      WorkType: workTypes || [],
      Goals: goals || [],
      ExistingTools: existingTools || [],
      TeamSize:TeamSize|| ""
    };

    if (editing) {
      let userAccount = await prisma.userAccount.findFirst({
        where: { userId: userId },
      });

      if (!userAccount) {
        // Create new user account if not exists
        userAccount = await prisma.userAccount.create({
          data: {
            userId,
            ...updateData,
          },
        });

        return new Response(
          JSON.stringify({
            success: true,
            msg: "Profile created successfully",
            profile: userAccount,
          }),
          { status: 201 }
        );
      }

      // Update existing user account
      userAccount = await prisma.userAccount.update({
        where: { id: userAccount.id },
        data: updateData,
      });

      // Update TeamSize in CompanyInfo if provided
      // if (TeamSize) {
      //   const companyInfo = await prisma.companyInfo.findFirst({
      //     where: { userId },
      //   });

      //   if (companyInfo) {
      //     await prisma.companyInfo.update({
      //       where: { id: companyInfo.id },
      //       data: { TeamSize },
      //     });
      //   } else {
      //     await prisma.companyInfo.create({
      //       data: {
      //         userId,
      //         TeamSize,
      //       },
      //     });
      //   }
      // }

      // Update user name and email if provided
      if (name || email) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            ...(name && { name }),
            ...(email && { email }),
          },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          msg: "Profile updated successfully",
          profile: userAccount,
        }),
        { status: 200 }
      );
    } else {
      // Create new user account
      const newProfile = await prisma.userAccount.create({
        data: {
          userId,
          ...updateData,
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          msg: "Profile created successfully",
          profile: newProfile,
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        msg: "Error processing request",
        error: error instanceof Error ? error.message : String(error)
      }),
      { status: 500 }
    );
  }
}
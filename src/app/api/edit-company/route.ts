// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const {
//       vendorId,
//       companyName,
//       website,
//       yearFounded,
//       headQuaters,
//       NameOfFounders,
//       contact,
//       founderVision,
//       regionServed,
//       TeamSize,
//       Awards,
//       PointOfContactName,
//       PointOfContactPhone,
//       PointOfContactDesignation,
//       overview,
//       name,
//       email,
//     } = await request.json();

//     const findCompanyId = await prisma.companyInfo.findFirst({
//       where: {
//         userId: vendorId,
//       },
//     });

//     if (!findCompanyId) {
//       return Response.json({ success: false, msg: "User not found" });
//     }

//     // Update the company info
//     const updatedProfile = await prisma.companyInfo.update({
//       where: { id: findCompanyId.id },
//       data: {
//         companyName,
//         website,
//         yearFounded,
//         headQuaters,
//         NameOfFounders,
//         contact,
//         founderVision,
//         regionServed,
//         TeamSize,
//         Awards,
//         PointOfContactName,
//         PointOfContactPhone,
//         PointOfContactDesignation,
//         overview,
//       },
//     });

//     if ( name ) {
//       await prisma.user.update({
//         where: { id: vendorId },
//         data: {
//           name,
//           email
//         }
//       })
//     }
//     if(email){
//       await prisma.user.update({
//         where: { id: vendorId },
//         data: {
//           email
//         }
//       })
//     }

//     return Response.json({ success: true, profile: updatedProfile });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return Response.json({
//       success: false,
//       msg: "Error updating profile.",
//     });
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      vendorId,
      companyName,
      website,
      yearFounded,
      headQuaters,
      NameOfFounders,
      contact,
      founderVision,
      regionServed,
      TeamSize,
      Awards,
      PointOfContactName,
      PointOfContactPhone,
      PointOfContactDesignation,
      overview,
      name,
      email,
    } = await request.json();

    const findCompanyId = await prisma.companyInfo.findFirst({
      where: {
        userId: vendorId,
      },
    });

    let updatedProfile;

    if (!findCompanyId) {
      // Create new companyInfo if one doesn't exist for this user
      updatedProfile = await prisma.companyInfo.create({
        data: {
          userId: vendorId,
          companyName,
          website,
          yearFounded,
          headQuaters,
          NameOfFounders,
          contact,
          founderVision,
          regionServed,
          TeamSize,
          Awards,
          PointOfContactName,
          PointOfContactPhone,
          PointOfContactDesignation,
          overview,
        },
      });
    } else {
      // Update existing companyInfo
      updatedProfile = await prisma.companyInfo.update({
        where: { id: findCompanyId.id },
        data: {
          companyName,
          website,
          yearFounded,
          headQuaters,
          NameOfFounders,
          contact,
          founderVision,
          regionServed,
          TeamSize,
          Awards,
          PointOfContactName,
          PointOfContactPhone,
          PointOfContactDesignation,
          overview,
        },
      });
    }

    // Update user information if provided
    if (name || email) {
      const updateData: { name?: string; email?: string } = {};
      
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      
      await prisma.user.update({
        where: { id: vendorId },
        data: updateData
      });
    }

    return Response.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json({
      success: false,
      msg: "Error updating profile.",
    });
  }
}
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      Contact,
      Location,
      Address,
      Designation,
      CompanyType,
      CompanyAddress,
      CompanyEmail,
      logoPreview,
      userId,
      editing,
      name,
      email,
      TeamSize,
    } = await request.json();

    const existingProfile = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingProfile) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Profile not found",
        }),
        { status: 404 }
      );
    }

    if (editing) {
      // Check if the user account exists
      let getUser = await prisma.userAccount.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!getUser) {
        // Create a new user account if not found
        getUser = await prisma.userAccount.create({
          data: {
            userId: userId,
            Contact,
            Location,
            Address,
            Designation,
            CompanyType,
            CompanyAddress,
            CompanyEmail,
          },
        });
        return new Response(
          JSON.stringify({
            success: true,
            msg: "Profile created successfully",
            profile: getUser,
          }),
          { status: 201 }
        );
      } else {
        // Update existing profile in the userAccount table
        getUser = await prisma.userAccount.update({
          where: {
            id: getUser.id,
          },
          data: {
            Contact,
            Location,
            Address,
            Designation,
            CompanyType,
            CompanyAddress,
            CompanyEmail,
          },
        });

        // Update TeamSize in the CompanyInfo table
        const companyInfo = await prisma.companyInfo.findFirst({
          where: {
            userId: userId,
          },
        });
        if (companyInfo) {
          await prisma.companyInfo.update({
            where: {
              id: companyInfo.id,
            },
            data: {
              TeamSize,
            },
          });
        }
      }

      // Update name and email in the user table if provided
      if (name && email) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
            email,
          },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          msg: getUser
            ? "Profile updated successfully"
            : "Profile created successfully",
          profile: getUser,
        }),
        { status: 200 }
      );
    } else {
      // Create a new user account if not editing
      const newProfile = await prisma.userAccount.create({
        data: {
          userId: userId,
          Contact,
          Location,
          Address,
          Designation,
          CompanyType,
          CompanyAddress,
          CompanyEmail,
        },
      });

      if (logoPreview) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            image: logoPreview,
          },
        });
      }

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
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error processing request",
      }),
      { status: 500 }
    );
  }
}

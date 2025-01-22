


// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

// interface SignupData {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   organizationName: string;
//   organizationType: string;
//   teamSize: number;
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const {
//       email,
//       password,
//       confirmPassword,
//       organizationName,
//       organizationType,
//       teamSize,
//     }: SignupData = body;

//     // Step 1: Validate the password and confirmPassword
//     if (password !== confirmPassword) {
//       return new Response(
//         JSON.stringify({ message: 'Passwords do not match' }),
//         { status: 400 }
//       );
//     }

//     // Step 2: Check if the email is already registered
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return new Response(
//         JSON.stringify({
//           message: 'Email already in use. Please log in or use a different email.',
//           userExists: true, // Add a flag to indicate the user already exists
//         }),
//         { status: 200 } // Use 200 to indicate a successful response with a meaningful message
//       );
//     }

//     // Step 3: Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Step 4: Create the user record
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         type: 'user', // Default type as 'user'
//       },
//     });

//     // Step 5: Create the userAccount record with organization details
//     const newUserAccount = await prisma.userAccount.create({
//       data: {
//         userId: newUser.id,
//         CompanyAddress: organizationName, // Store organizationName in CompanyAddress
//         OrgType: organizationType,
//         TeamSize: teamSize.toString(), // Store team size as string
//       },
//     });

//     // Step 6: Return the success response with user details and user ID
//     return new Response(
//       JSON.stringify({
//         message: 'User and organization created successfully',
//         user: {
//           id: newUser.id,  // Include the user ID in the response
//           email: newUser.email, // You can include other user details as needed
//         },
//         userAccount: newUserAccount,
//       }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating user: ', error);
//     return new Response(
//       JSON.stringify({ message: 'Server error' }),
//       { status: 500 }
//     );
//   }
// }

// API Route (app/api/user-signup/route.ts)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  organizationType: string;
  teamSize: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      confirmPassword,
      organizationName,
      organizationType,
      teamSize,
    }: SignupData = body;

    // Step 1: Validate the password and confirmPassword
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Step 2: Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Email already in use. Please log in or use a different email.',
        userExists: true,
      });
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create the user record
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        type: 'user',
      },
    });

    // Step 5: Create the userAccount record
    const newUserAccount = await prisma.userAccount.create({
      data: {
        userId: newUser.id,
        CompanyAddress: organizationName,
        OrgType: organizationType,
        TeamSize: teamSize.toString(),
      },
    });

    // Step 6: Set authentication cookie
    const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const cookieStore = cookies();
    
    cookieStore.set('auth', JSON.stringify({
      id: newUser.id,
      email: newUser.email,
      type: newUser.type,
      exp: expirationTime
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined
    });

    // Step 7: Return success response
    return NextResponse.json({
      success: true,
      message: 'User and organization created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        type: newUser.type
      },
      userAccount: newUserAccount,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user: ', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

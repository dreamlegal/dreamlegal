// // // import { NextApiRequest, NextApiResponse } from 'next';
// // // import { PrismaClient } from '@prisma/client';
// // // import bcrypt from 'bcryptjs';

// // // const prisma = new PrismaClient();

// // // interface SignupData {
// // //   email: string;
// // //   password: string;
// // //   confirmPassword: string;
// // //   organizationName: string;
// // //   organizationType: string;
// // //   teamSize: number;
// // // }

// // // export default async function handler(
// // //   req: NextApiRequest,
// // //   res: NextApiResponse
// // // ) {
// // //   if (req.method === 'POST') {
// // //     const {
// // //       email,
// // //       password,
// // //       confirmPassword,
// // //       organizationName,
// // //       organizationType,
// // //       teamSize,
// // //     }: SignupData = req.body;

// // //     // Step 1: Validate the password and confirmPassword
// // //     if (password !== confirmPassword) {
// // //       return res.status(400).json({ message: 'Passwords do not match' });
// // //     }

// // //     try {
// // //       // Step 2: Check if the email is already registered
// // //       const existingUser = await prisma.user.findUnique({
// // //         where: { email },
// // //       });

// // //       if (existingUser) {
// // //         return res.status(400).json({ message: 'Email already in use' });
// // //       }

// // //       // Step 3: Hash the password
// // //       const hashedPassword = await bcrypt.hash(password, 10);

// // //       // Step 4: Create the user record
// // //       const newUser = await prisma.user.create({
// // //         data: {
// // //           email,
// // //           password: hashedPassword,
// // //           type: 'user', // Default type as 'user'
// // //         },
// // //       });

// // //       // Step 5: Create the userAccount record with organization details
// // //       const newUserAccount = await prisma.userAccount.create({
// // //         data: {
// // //           userId: newUser.id,
// // //           CompanyAddress: organizationName,  // Store organizationName in CompanyAddress
// // //           OrgType: organizationType,
// // //           TeamSize: teamSize.toString(),  // Store team size as string
// // //         },
// // //       });

// // //       // Step 6: Return the success response with user details
// // //       res.status(201).json({
// // //         message: 'User and organization created successfully',
// // //         user: newUser,
// // //         userAccount: newUserAccount,
// // //       });
// // //     } catch (error) {
// // //       console.error('Error creating user: ', error);
// // //       res.status(500).json({ message: 'Server error' });
// // //     }
// // //   } else {
// // //     res.status(405).json({ message: 'Method not allowed' });
// // //   }
// // // }
// // import { PrismaClient } from '@prisma/client';
// // import bcrypt from 'bcryptjs';

// // const prisma = new PrismaClient();

// // interface SignupData {
// //   email: string;
// //   password: string;
// //   confirmPassword: string;
// //   organizationName: string;
// //   organizationType: string;
// //   teamSize: number;
// // }

// // export async function POST(request: Request) {
// //   try {
// //     const body = await request.json();
// //     const {
// //       email,
// //       password,
// //       confirmPassword,
// //       organizationName,
// //       organizationType,
// //       teamSize,
// //     }: SignupData = body;

// //     // Step 1: Validate the password and confirmPassword
// //     // if (password !== confirmPassword) {
// //     //   return new Response(
// //     //     JSON.stringify({ message: 'Passwords do not match' }),
// //     //     { status: 400 }
// //     //   );
// //     // }

// //     // Step 2: Check if the email is already registered
// //     const existingUser = await prisma.user.findUnique({
// //       where: { email },
// //     });

// //     if (existingUser) {
// //       return new Response(
// //         JSON.stringify({ message: 'Email already in use' }),
// //         { status: 400 }
// //       );
// //     }

// //     // Step 3: Hash the password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Step 4: Create the user record
// //     const newUser = await prisma.user.create({
// //       data: {
// //         email,
// //         password: hashedPassword,
// //         type: 'user', // Default type as 'user'
// //       },
// //     });

// //     // Step 5: Create the userAccount record with organization details
// //     const newUserAccount = await prisma.userAccount.create({
// //       data: {
// //         userId: newUser.id,
// //         CompanyAddress: organizationName, // Store organizationName in CompanyAddress
// //         OrgType: organizationType,
// //         TeamSize: teamSize.toString(), // Store team size as string
// //       },
// //     });

// //     // Step 6: Return the success response with user details
// //     return new Response(
// //       JSON.stringify({
// //         message: 'User and organization created successfully',
// //         user: newUser,
// //         userAccount: newUserAccount,
// //       }),
// //       { status: 201 }
// //     );
// //   } catch (error) {
// //     console.error('Error creating user: ', error);
// //     return new Response(
// //       JSON.stringify({ message: 'Server error' }),
// //       { status: 500 }
// //     );
// //   }
// // }
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

//     // Step 6: Return the success response with user details
//     return new Response(
//       JSON.stringify({
//         message: 'User and organization created successfully',
//         user: newUser,
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
      return new Response(
        JSON.stringify({ message: 'Passwords do not match' }),
        { status: 400 }
      );
    }

    // Step 2: Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: 'Email already in use. Please log in or use a different email.',
          userExists: true, // Add a flag to indicate the user already exists
        }),
        { status: 200 } // Use 200 to indicate a successful response with a meaningful message
      );
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create the user record
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        type: 'user', // Default type as 'user'
      },
    });

    // Step 5: Create the userAccount record with organization details
    const newUserAccount = await prisma.userAccount.create({
      data: {
        userId: newUser.id,
        CompanyAddress: organizationName, // Store organizationName in CompanyAddress
        OrgType: organizationType,
        TeamSize: teamSize.toString(), // Store team size as string
      },
    });

    // Step 6: Return the success response with user details and user ID
    return new Response(
      JSON.stringify({
        message: 'User and organization created successfully',
        user: {
          id: newUser.id,  // Include the user ID in the response
          email: newUser.email, // You can include other user details as needed
        },
        userAccount: newUserAccount,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user: ', error);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500 }
    );
  }
}

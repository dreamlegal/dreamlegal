// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     // Parse request with error handling
//     let email, password;
//     try {
//       const body = await request.json();
//       email = body.email?.toLowerCase().trim();
//       password = body.password;
      
//       if (!email || !password) {
//         return NextResponse.json(
//           { success: false, error: 'Email and password are required' },
//           { status: 400 }
//         );
//       }
//     } catch (e) {
//       console.error('Request parsing error:', e);
//       return NextResponse.json(
//         { success: false, error: 'Invalid request format' },
//         { status: 400 }
//       );
//     }

//     console.log('Login attempt for email:', email);

//     // Find user with error handling
//     let user;
//     try {
//       user = await prisma.user.findUnique({
//         where: { email },
//         select: {
//           id: true,
//           email: true,
//           password: true,
//           type: true
//         }
//       });
//     } catch (e) {
//       console.error('Database error finding user:', e);
//       return NextResponse.json(
//         { success: false, error: 'Database error' },
//         { status: 500 }
//       );
//     }

//     if (!user) {
//       console.log('No user found for email:', email);
//       return NextResponse.json(
//         { success: false, error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Make sure password is a string before comparison
//     if (typeof user.password !== 'string') {
//       console.error('Stored password is not a string:', typeof user.password);
//       return NextResponse.json(
//         { success: false, error: 'Authentication error' },
//         { status: 500 }
//       );
//     }

//     // Verify password with error handling
//     let isPasswordValid;
//     try {
//       // Ensure both arguments are strings
//       isPasswordValid = await bcrypt.compare(String(password), String(user.password));
//     } catch (e) {
//       console.error('Password comparison error:', e);
//       return NextResponse.json(
//         { success: false, error: 'Authentication error' },
//         { status: 500 }
//       );
//     }

//     if (!isPasswordValid) {
//       console.log('Invalid password for email:', email);
//       return NextResponse.json(
//         { success: false, error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Set cookie with error handling
//     try {
//       const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
//       const cookieStore = cookies();
//       cookieStore.delete('auth');
      
//       cookieStore.set('auth', JSON.stringify({
//         id: user.id,
//         email: user.email,
//         type: user.type,
//         exp: expirationTime
//       }), {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 30 * 24 * 60 * 60,
//         path: '/',
//         domain: process.env.COOKIE_DOMAIN || undefined
//       });

//       console.log('Login successful for email:', email, 'with type:', user.type);
      
//       return NextResponse.json({
//         success: true,
//         user: {
//           id: user.id,
//           email: user.email,
//           type: user.type
//         }
//       });
//     } catch (e) {
//       console.error('Cookie setting error:', e);
//       return NextResponse.json(
//         { success: false, error: 'Session creation failed' },
//         { status: 500 }
//       );
//     }

//   } catch (error) {
//     console.error('Unexpected login error:', error);
//     return NextResponse.json(
//       { success: false, error: 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    // Parse request with error handling
    let email, password;
    try {
      const body = await request.json();
      email = body.email?.toLowerCase().trim();
      password = body.password;
      
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: 'Email and password are required' },
          { status: 400 }
        );
      }
    } catch (e) {
      console.error('Request parsing error:', e);
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    console.log('Login attempt for email:', email);

    // Find user with error handling
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          type: true
        }
      });
    } catch (e) {
      console.error('Database error finding user:', e);
      return NextResponse.json(
        { success: false, error: 'Database error' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('No user found for email:', email);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Extract the hash from the password object or use as is if string
    let storedPasswordHash;
    if (typeof user.password === 'object' && user.password !== null) {
      console.log('Password object structure:', Object.keys(user.password));
      // Try to extract hash from common object structures
      if (user.password.hash) {
        storedPasswordHash = user.password.hash;
      } else if (user.password.value) {
        storedPasswordHash = user.password.value;
      } else {
        // If we can't find a known property, stringify the object as a fallback
        // This might not work but at least gives some debugging info
        console.error('Unknown password object structure:', JSON.stringify(user.password));
        return NextResponse.json(
          { success: false, error: 'Authentication error' },
          { status: 500 }
        );
      }
    } else if (typeof user.password === 'string') {
      storedPasswordHash = user.password;
    } else {
      console.error('Unsupported password format:', typeof user.password);
      return NextResponse.json(
        { success: false, error: 'Authentication error' },
        { status: 500 }
      );
    }

    // Verify password with error handling
    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(String(password), String(storedPasswordHash));
    } catch (e) {
      console.error('Password comparison error:', e);
      return NextResponse.json(
        { success: false, error: 'Authentication error' },
        { status: 500 }
      );
    }

    if (!isPasswordValid) {
      console.log('Invalid password for email:', email);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set cookie with error handling
    try {
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      const cookieStore = cookies();
      cookieStore.delete('auth');
      
      cookieStore.set('auth', JSON.stringify({
        id: user.id,
        email: user.email,
        type: user.type,
        exp: expirationTime
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        domain: process.env.COOKIE_DOMAIN || undefined
      });

      console.log('Login successful for email:', email, 'with type:', user.type);
      
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          type: user.type
        }
      });
    } catch (e) {
      console.error('Cookie setting error:', e);
      return NextResponse.json(
        { success: false, error: 'Session creation failed' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Unexpected login error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
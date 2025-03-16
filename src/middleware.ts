// // export { auth as middleware } from "@/auth";
// // middleware.js
// import { NextResponse } from 'next/server';

// // Define protected paths and their allowed types
// const protectedPaths = {
//   '/tech_vendor/dashboard': ['vendor'],
//   '/legal_proffesionals/dashboard': ['user']
// };

// export async function middleware(request) {
//   try {
//     // Get the path from the request
//     const path = request.nextUrl.pathname;

//     // Check if this path needs protection
//     const needsProtection = Object.keys(protectedPaths).some(protectedPath => 
//       path.startsWith(protectedPath)
//     );

//     if (!needsProtection) {
//       return NextResponse.next();
//     }

//     // Get the auth cookie
//     const authCookie = request.cookies.get('auth');
    
//     if (!authCookie) {
//       // Redirect to login if no auth cookie
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // Parse the auth cookie
//     const authData = JSON.parse(authCookie.value);

//     // Check if cookie is expired
//     if (authData.exp && authData.exp < Date.now()) {
//       // Redirect to login if cookie is expired
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // Check user type and path permissions
//     const userType = authData.type;
//     let isAllowed = false;

//     // Check each protected path
//     for (const [protectedPath, allowedTypes] of Object.entries(protectedPaths)) {
//       if (path.startsWith(protectedPath)) {
//         isAllowed = allowedTypes.includes(userType);
//         break;
//       }
//     }

//     if (!isAllowed) {
//       // If vendor tries to access user dashboard
//       if (userType === 'vendor') {
//         return NextResponse.redirect(new URL('/tech_vendor/dashboard', request.url));
//       }
//       // If user tries to access vendor dashboard
//       if (userType === 'user') {
//         return NextResponse.redirect(new URL('/legal_proffesionals/dashboard', request.url));
//       }
//       // For any other unauthorized access
//       return NextResponse.redirect(new URL('/unauthorized', request.url));
//     }

//     // Allow the request to proceed
//     return NextResponse.next();

//   } catch (error) {
//     console.error('Middleware error:', error);
//     // On any error, redirect to login
//     return NextResponse.redirect(new URL('/', request.url));
//   }
// }

// // Configure which paths the middleware should run on
// export const config = {
//   matcher: [
//     '/tech_vendor/dashboard/:path*',
//     '/legal_proffesionals/dashboard/:path*'
//   ]
// };

// middleware.js
import { NextResponse } from 'next/server';

// Define protected paths and their allowed types
const protectedPaths = {
  '/tech_vendor/dashboard': ['vendor'],
  '/legal_professionals/dashboard': ['user']
};

export async function middleware(request) {
  try {
    const { nextUrl } = request;
    const isLoggedIn = !!request.auth;

    // if(isLoggedIn){
    //   return NextResponse.redirect(new URL('/onboard', request.url));
    // }
    // Get the path from the request
    const path = request.nextUrl.pathname;

    // Check if the user is visiting `/tech_vendor/dashboard`
    if (path === '/tech_vendor/dashboard') {
      // Redirect to `/tech_vendor/dashboard/all_products`
      return NextResponse.redirect(new URL('/tech_vendor/dashboard/all_products', request.url));
    }
    if (path === '/legal_professionals/dashboard') {
      // Redirect to `/tech_vendor/dashboard/all_products`
      return NextResponse.redirect(new URL('/legal_professionals/dashboard/tech_directory', request.url));
    }

    // Check if this path needs protection
    const needsProtection = Object.keys(protectedPaths).some(protectedPath =>
      path.startsWith(protectedPath)
    );

    if (!needsProtection) {
      return NextResponse.next();
    }

    // Get the auth cookie
    const authCookie = request.cookies.get('auth');
    
    if (!authCookie) {
      // Redirect to login if no auth cookie
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Parse the auth cookie
    const authData = JSON.parse(authCookie.value);

    // Check if cookie is expired
    if (authData.exp && authData.exp < Date.now()) {
      // Redirect to login if cookie is expired
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check user type and path permissions
    const userType = authData.type;
    let isAllowed = false;

    // Check each protected path
    for (const [protectedPath, allowedTypes] of Object.entries(protectedPaths)) {
      if (path.startsWith(protectedPath)) {
        isAllowed = allowedTypes.includes(userType);
        break;
      }
    }

    if (!isAllowed) {
      // If vendor tries to access user dashboard
      if (userType === 'vendor') {
        return NextResponse.redirect(new URL('/tech_vendor/dashboard', request.url));
      }
      // If user tries to access vendor dashboard
      if (userType === 'user') {
        return NextResponse.redirect(new URL('/legal_professionals/dashboard', request.url));
      }
      // For any other unauthorized access
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();

  } catch (error) {
    console.error('Middleware error:', error);
    // On any error, redirect to login
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/tech_vendor/dashboard/:path*',
    '/legal_professionals/dashboard/:path*'
  ]
};

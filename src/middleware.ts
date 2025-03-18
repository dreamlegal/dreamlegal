
// // import { NextResponse } from 'next/server';

// // // Define protected paths and their allowed types
// // const protectedPaths = {
// //   '/tech_vendor/dashboard': ['vendor'],
// //   '/legal_professionals/dashboard': ['user']
// // };

// // export async function middleware(request) {
// //   try {
// //     const { nextUrl } = request;
// //     const isLoggedIn = !!request.auth;

// //     // if(isLoggedIn){
// //     //   return NextResponse.redirect(new URL('/onboard', request.url));
// //     // }
// //     // Get the path from the request
// //     const path = request.nextUrl.pathname;

// //     // Check if the user is visiting `/tech_vendor/dashboard`
// //     if (path === '/tech_vendor/dashboard') {
// //       // Redirect to `/tech_vendor/dashboard/all_products`
// //       return NextResponse.redirect(new URL('/tech_vendor/dashboard/all_products', request.url));
// //     }
// //     if (path === '/legal_professionals/dashboard') {
// //       // Redirect to `/tech_vendor/dashboard/all_products`
// //       return NextResponse.redirect(new URL('/legal_professionals/dashboard/tech_directory', request.url));
// //     }

// //     // Check if this path needs protection
// //     const needsProtection = Object.keys(protectedPaths).some(protectedPath =>
// //       path.startsWith(protectedPath)
// //     );

// //     if (!needsProtection) {
// //       return NextResponse.next();
// //     }

// //     // Get the auth cookie
// //     const authCookie = request.cookies.get('auth');
    
// //     if (!authCookie) {
// //       // Redirect to login if no auth cookie
// //       return NextResponse.redirect(new URL('/', request.url));
// //     }

// //     // Parse the auth cookie
// //     const authData = JSON.parse(authCookie.value);

// //     // Check if cookie is expired
// //     if (authData.exp && authData.exp < Date.now()) {
// //       // Redirect to login if cookie is expired
// //       return NextResponse.redirect(new URL('/', request.url));
// //     }

// //     // Check user type and path permissions
// //     const userType = authData.type;
// //     let isAllowed = false;

// //     // Check each protected path
// //     for (const [protectedPath, allowedTypes] of Object.entries(protectedPaths)) {
// //       if (path.startsWith(protectedPath)) {
// //         isAllowed = allowedTypes.includes(userType);
// //         break;
// //       }
// //     }

// //     if (!isAllowed) {
// //       // If vendor tries to access user dashboard
// //       if (userType === 'vendor') {
// //         return NextResponse.redirect(new URL('/tech_vendor/dashboard', request.url));
// //       }
// //       // If user tries to access vendor dashboard
// //       if (userType === 'user') {
// //         return NextResponse.redirect(new URL('/legal_professionals/dashboard', request.url));
// //       }
// //       // For any other unauthorized access
// //       return NextResponse.redirect(new URL('/unauthorized', request.url));
// //     }

// //     // Allow the request to proceed
// //     return NextResponse.next();

// //   } catch (error) {
// //     console.error('Middleware error:', error);
// //     // On any error, redirect to login
// //     return NextResponse.redirect(new URL('/', request.url));
// //   }
// // }

// // // Configure which paths the middleware should run on
// // export const config = {
// //   matcher: [
// //     '/tech_vendor/dashboard/:path*',
// //     '/legal_professionals/dashboard/:path*'
// //   ]
// // };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define protected paths and their allowed types
// const protectedPaths = {
//   '/tech_vendor/dashboard': ['vendor'],
//   '/legal_professionals/dashboard': ['user'],
//   '/onboard': ['user']
// };

// export async function middleware(request: NextRequest) {
//   try {
//     const { nextUrl } = request;
//     const path = nextUrl.pathname;

//     // Special redirects for dashboard root paths
//     if (path === '/tech_vendor/dashboard') {
//       return NextResponse.redirect(new URL('/tech_vendor/dashboard/all_products', request.url));
//     }
//     if (path === '/legal_professionals/dashboard') {
//       return NextResponse.redirect(new URL('/legal_professionals/dashboard/tech_directory', request.url));
//     }

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
//       if (path.startsWith('/tech_vendor')) {
//         return NextResponse.redirect(new URL('/auth/vendor/login', request.url));
//       } else {
//         return NextResponse.redirect(new URL('/auth/user/login', request.url));
//       }
//     }

//     // Parse the auth cookie
//     try {
//       const authData = JSON.parse(authCookie.value);
      
//       // Check if cookie is expired
//       if (authData.exp && authData.exp < Date.now()) {
//         // Redirect to login if cookie is expired
//         if (authData.type === 'vendor') {
//           return NextResponse.redirect(new URL('/auth/vendor/login', request.url));
//         } else {
//           return NextResponse.redirect(new URL('/auth/user/login', request.url));
//         }
//       }
      
//       const userId = authData.id;
//       const userType = authData.type;

//       // For onboarding path, check if user has already completed onboarding
//       if (path === '/onboard' && userType === 'user') {
//         // We'll let the onboard component handle this check
//         return NextResponse.next();
//       }

//       // Check user type and path permissions
//       let isAllowed = false;

//       // Check each protected path
//       for (const [protectedPath, allowedTypes] of Object.entries(protectedPaths)) {
//         if (path.startsWith(protectedPath)) {
//           isAllowed = allowedTypes.includes(userType);
//           break;
//         }
//       }

//       if (!isAllowed) {
//         // If vendor tries to access user dashboard
//         if (userType === 'vendor') {
//           return NextResponse.redirect(new URL('/tech_vendor/dashboard', request.url));
//         }
//         // If user tries to access vendor dashboard
//         if (userType === 'user') {
//           return NextResponse.redirect(new URL('/legal_professionals/dashboard', request.url));
//         }
//         // For any other unauthorized access
//         return NextResponse.redirect(new URL('/unauthorized', request.url));
//       }

//     } catch (error) {
//       console.error('Error parsing auth cookie:', error);
//       // On cookie parsing error, redirect to login
//       return NextResponse.redirect(new URL('/auth/user/login', request.url));
//     }

//     // Allow the request to proceed
//     return NextResponse.next();

//   } catch (error) {
//     console.error('Middleware error:', error);
//     // On any error, redirect to homepage
//     return NextResponse.redirect(new URL('/', request.url));
//   }
// }

// // Configure which paths the middleware should run on
// export const config = {
//   matcher: [
//     '/tech_vendor/dashboard/:path*',
//     '/legal_professionals/dashboard/:path*',
//     '/onboard'
//   ]
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected paths and their allowed types
const protectedPaths = {
  '/tech_vendor/dashboard': ['vendor'],
  '/legal_professionals/dashboard': ['user'],
  '/onboard': ['user']
};

// Auth verification paths - these should be accessible without auth
const authPaths = [
  '/auth/user/login',
  '/auth/vendor/login',
  '/auth/error',
  '/auth/verify-request',
  '/api/auth',
  '/auth/success', 
  '/api/auth/callback',
  '/api/auth/verify-request',
  '/api/auth/signin',
  '/api/auth/signin/email'
];

export async function middleware(request: NextRequest) {
  try {
    const { nextUrl } = request;
    const path = nextUrl.pathname;

    // Allow all auth-related paths without checking auth
    if (authPaths.some(authPath => path.startsWith(authPath))) {
      return NextResponse.next();
    }
    
    // Special redirects for dashboard root paths
    if (path === '/tech_vendor/dashboard') {
      return NextResponse.redirect(new URL('/tech_vendor/dashboard/all_products', request.url));
    }
    if (path === '/legal_professionals/dashboard') {
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
      if (path.startsWith('/tech_vendor')) {
        return NextResponse.redirect(new URL('/auth/vendor/login', request.url));
      } else {
        return NextResponse.redirect(new URL('/auth/user/login', request.url));
      }
    }

    // Parse the auth cookie
    try {
      const authData = JSON.parse(authCookie.value);
      
      // Check if cookie is expired
      if (authData.exp && authData.exp < Date.now()) {
        // Redirect to login if cookie is expired
        if (authData.type === 'vendor') {
          return NextResponse.redirect(new URL('/auth/vendor/login', request.url));
        } else {
          return NextResponse.redirect(new URL('/auth/user/login', request.url));
        }
      }
      
      const userId = authData.id;
      const userType = authData.type;

      // For onboarding path, check if user has already completed onboarding
      if (path === '/onboard' && userType === 'user') {
        // We'll let the onboard component handle this check
        return NextResponse.next();
      }

      // Check user type and path permissions
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

    } catch (error) {
      console.error('Error parsing auth cookie:', error);
      // On cookie parsing error, redirect to login
      return NextResponse.redirect(new URL('/auth/user/login', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();

  } catch (error) {
    console.error('Middleware error:', error);
    // On any error, redirect to homepage
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Configure which paths the middleware should run on - include auth paths
export const config = {
  matcher: [
    '/tech_vendor/dashboard/:path*',
    '/legal_professionals/dashboard/:path*',
    '/onboard'
    // Note: We're removing '/api/auth/:path*' from the matcher
    // to prevent middleware from running on auth routes
  ]
};
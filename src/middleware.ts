
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define protected paths and their allowed types
// const protectedPaths = {
//   '/community': ['user', 'vendor'],
//   '/tech_vendor/dashboard': ['vendor'],
//   '/legal_professionals/dashboard': ['user'],
//   '/onboard': ['user'],
//   '/admin': ['admin'] // Add admin routes protection
// };

// // Auth verification paths - these should be accessible without auth
// const authPaths = [
//   '/auth/user/login',
//   '/auth/vendor/login',
//   '/admin/login', // Add admin login path
//   '/auth/error',
//   '/auth/verify-request',
//   '/api/auth',
//   '/auth/success', 
//   '/api/auth/callback',
//   '/api/auth/verify-request',
//   '/api/auth/signin',
//   '/api/auth/signin/email'
// ];

// export async function middleware(request: NextRequest) {
//   try {
//     const { nextUrl } = request;
//     const path = nextUrl.pathname;

//     // Allow all auth-related paths without checking auth
//     if (authPaths.some(authPath => path.startsWith(authPath))) {
//       return NextResponse.next();
//     }
    
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

//     // ADMIN ROUTES HANDLING
//     if (path.startsWith('/admin')) {
//       // Get the admin auth cookie
//       const adminAuthCookie = request.cookies.get('adminAuth');
      
//       if (!adminAuthCookie) {
//         // Redirect to admin login if no admin auth cookie
//         return NextResponse.redirect(new URL('/admin/login', request.url));
//       }

//       // Parse the admin auth cookie
//       try {
//         const adminAuthData = JSON.parse(adminAuthCookie.value);
        
//         // Check if cookie is expired
//         if (adminAuthData.exp && adminAuthData.exp < Date.now()) {
//           return NextResponse.redirect(new URL('/admin/login', request.url));
//         }
        
//         // For super_admin, always grant access
//         if (adminAuthData.role === 'super_admin') {
//           return NextResponse.next();
//         }
        
//         // Extract section from URL (e.g., /admin/products -> products)
//         const section = path.split('/')[2];
        
//         // Skip permission check for base admin path
//         if (!section) {
//           return NextResponse.next();
//         }
        
//         // Map URL paths to the permission keys used in the sidebar
//         const componentPermissionMap = {
//           'leads': 'adminLeads',
//           'notifications': 'sendNotification',
//           'users': 'UsersPage',
//           'analytics': 'addAnalytics',
//           'blog': 'adminblog',
//           'products': 'AllProduct',
//           'vendors': 'VendorsPage',
//           // Add other mappings as needed
//         };
        
//         // Handle subsection paths with specific permissions
//         if (section === 'products') {
//           const subsection = path.split('/')[3];
//           if (subsection === 'claims' && !adminAuthData.permissions?.components?.['AdminProductClaimsPage']) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//           }
//           if (subsection === 'new' && !adminAuthData.permissions?.components?.['NewProduct']) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//           }
//           if (subsection === 'create' && !adminAuthData.permissions?.components?.['AdminProductCreation']) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//           }
//         } else if (section === 'blog') {
//           const subsection = path.split('/')[3];
//           if (subsection === 'new' && !adminAuthData.permissions?.components?.['CreateBlog']) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//           }
//         }
        
//         // Get the required permission based on the path
//         const requiredPermission = componentPermissionMap[section];
        
//         // If we have a mapping for this path, check component permission
//         if (requiredPermission && adminAuthData.permissions) {
//           if (!adminAuthData.permissions.components?.[requiredPermission]) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//           }
//         } 
//         // If no specific mapping, fall back to tab permission check
//         else if (adminAuthData.permissions) {
//           // Check tab permission (capitalize first letter)
//           const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);
//           if (!adminAuthData.permissions.tabs?.[formattedSection]) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//           }
//         }
        
//         // Admin is authenticated and has proper permissions, proceed
//         return NextResponse.next();
//       } catch (error) {
//         console.error('Error parsing admin auth cookie:', error);
//         return NextResponse.redirect(new URL('/admin/login', request.url));
//       }
//     }

//     // REGULAR USER/VENDOR ROUTES HANDLING
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
//     '/onboard',
//     '/community',
//     '/admin/:path*'  // Add admin paths to the matcher
//   ]
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected paths and their allowed types
const protectedPaths = {
  '/community': ['user', 'vendor'],
  '/tech_vendor/dashboard': ['vendor'],
  '/legal_professionals/dashboard': ['user'],
  '/onboard': ['user'],
  '/admin': ['admin'] // Add admin routes protection
};

// Auth verification paths - these should be accessible without auth
const authPaths = [
  '/auth/user/login',
  '/auth/vendor/login',
  '/admin/login', // Add admin login path
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

    // ADMIN ROUTES HANDLING
    if (path.startsWith('/admin')) {
      // Get the admin auth cookie
      const adminAuthCookie = request.cookies.get('adminAuth');
      
      if (!adminAuthCookie) {
        // Redirect to admin login if no admin auth cookie
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Parse the admin auth cookie
      try {
        const adminAuthData = JSON.parse(adminAuthCookie.value);
        
        // Check if cookie is expired
        if (adminAuthData.exp && adminAuthData.exp < Date.now()) {
          return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        
        // If user is super_admin, allow access everywhere
        if (adminAuthData.role === 'super_admin') {
          return NextResponse.next();
        }

        // SPECIAL HANDLING FOR ROOT ADMIN PATH
        // If a non-super_admin tries to access the main dashboard (/admin),
        // redirect them to a section they have permission for
        if (path === '/admin' || path === '/admin/') {
          const permissions = adminAuthData.permissions?.components || {};
          
          // Check permissions and redirect accordingly
          if (permissions['AllProduct']) {
            return NextResponse.redirect(new URL('/admin/products', request.url));
          } else if (permissions['VendorsPage']) {
            return NextResponse.redirect(new URL('/admin/vendors', request.url));
          } else if (permissions['UsersPage']) {
            return NextResponse.redirect(new URL('/admin/users', request.url));
          } else if (permissions['adminblog']) {
            return NextResponse.redirect(new URL('/admin/blog', request.url));
          } else if (permissions['addAnalytics']) {
            return NextResponse.redirect(new URL('/admin/analytics', request.url));
          } else if (permissions['sendNotification']) {
            return NextResponse.redirect(new URL('/admin/notifications', request.url));
          } else if (permissions['adminLeads']) {
            return NextResponse.redirect(new URL('/admin/leads', request.url));
          } else {
            // If they don't have permission for any specific area, redirect to login
            return NextResponse.redirect(new URL('/admin/login?access=denied', request.url));
          }
        }
        
        // Extract section from URL (e.g., /admin/products -> products)
        const section = path.split('/')[2];
        
        // If no section (base admin path), already handled above
        if (!section) {
          return NextResponse.next();
        }
        
        // Map URL paths to the permission keys used in the sidebar
        const componentPermissionMap = {
          'leads': 'adminLeads',
          'notifications': 'sendNotification',
          'users': 'UsersPage',
          'analytics': 'addAnalytics',
          'blog': 'adminblog',
          'products': 'AllProduct',
          'vendors': 'VendorsPage',
          // Add other mappings as needed
        };
        
        // Handle subsection paths with specific permissions
        if (section === 'products') {
          const subsection = path.split('/')[3];
          if (subsection === 'claims' && !adminAuthData.permissions?.components?.['AdminProductClaimsPage']) {
            // Redirect to an area they have permission for
            return redirectToPermittedArea(adminAuthData, request);
          }
          if (subsection === 'new' && !adminAuthData.permissions?.components?.['NewProduct']) {
            return redirectToPermittedArea(adminAuthData, request);
          }
          if (subsection === 'create' && !adminAuthData.permissions?.components?.['AdminProductCreation']) {
            return redirectToPermittedArea(adminAuthData, request);
          }
        } else if (section === 'blog') {
          const subsection = path.split('/')[3];
          if (subsection === 'new' && !adminAuthData.permissions?.components?.['CreateBlog']) {
            return redirectToPermittedArea(adminAuthData, request);
          }
        }
        
        // Get the required permission based on the path
        const requiredPermission = componentPermissionMap[section];
        
        // If we have a mapping for this path, check component permission
        if (requiredPermission && adminAuthData.permissions) {
          if (!adminAuthData.permissions.components?.[requiredPermission]) {
            return redirectToPermittedArea(adminAuthData, request);
          }
        } 
        // If no specific mapping, fall back to tab permission check
        else if (adminAuthData.permissions) {
          // Check tab permission (capitalize first letter)
          const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);
          if (!adminAuthData.permissions.tabs?.[formattedSection]) {
            return redirectToPermittedArea(adminAuthData, request);
          }
        }
        
        // Admin is authenticated and has proper permissions, proceed
        return NextResponse.next();
        
      } catch (error) {
        console.error('Error parsing admin auth cookie:', error);
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // REGULAR USER/VENDOR ROUTES HANDLING
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

// Helper function to redirect admin to a section they have permission for
function redirectToPermittedArea(adminAuthData, request) {
  const permissions = adminAuthData.permissions?.components || {};
  
  if (permissions['AllProduct']) {
    return NextResponse.redirect(new URL('/admin/products', request.url));
  } else if (permissions['VendorsPage']) {
    return NextResponse.redirect(new URL('/admin/vendors', request.url));
  } else if (permissions['UsersPage']) {
    return NextResponse.redirect(new URL('/admin/users', request.url));
  } else if (permissions['adminblog']) {
    return NextResponse.redirect(new URL('/admin/blog', request.url));
  } else if (permissions['addAnalytics']) {
    return NextResponse.redirect(new URL('/admin/analytics', request.url));
  } else if (permissions['sendNotification']) {
    return NextResponse.redirect(new URL('/admin/notifications', request.url));
  } else if (permissions['adminLeads']) {
    return NextResponse.redirect(new URL('/admin/leads', request.url));
  } else {
    // If they don't have permission for any specific area, redirect to login
    return NextResponse.redirect(new URL('/admin/login?access=denied', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/tech_vendor/dashboard/:path*',
    '/legal_professionals/dashboard/:path*',
    '/onboard',
    '/community',
    '/admin/:path*'  // Add admin paths to the matcher
  ]
};
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     typescript:{
//         ignoreBuildErrors:true
//     },
//     eslint:{
//         ignoreBuildErrors:true
//     },
//     experimental: {
//         // This is for App Router API routes
//         bodySizeLimit: '10mb'
//       },
//       // This is for Server Actions (form submissions, etc.)
//       serverActions: {
//         bodySizeLimit: '10mb'
//       },
//     images: {
//         remotePatterns: [
//             {
//               protocol: 'https',
//               hostname: '**'
//             }
//           ]  }
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    eslint:{
        ignoreBuildErrors:true
    },
    experimental: {
        // This is for App Router API routes
        bodySizeLimit: '10mb'
    },
    // This is for Server Actions (form submissions, etc.)
    serverActions: {
        bodySizeLimit: '10mb'
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**'
            }
        ]
    },
    // Exclude auth-dependent pages from static export
    exportPathMap: async function (defaultPathMap) {
        // Remove pages that require authentication
        delete defaultPathMap['/check'];
        return defaultPathMap;
    },
};

export default nextConfig;
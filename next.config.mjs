// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     typescript:{
//         ignoreBuildErrors:true
//     },
//     eslint:{
//         ignoreBuildErrors:true
//     }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreBuildErrors: true,
    },
    async headers() {
      return [
        {
          source: '/api/(.*)', // Apply headers to all API routes under /api
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, proxy-revalidate', // Prevent caching
            },
            {
              key: 'Pragma',
              value: 'no-cache',
            },
            {
              key: 'Expires',
              value: '0',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
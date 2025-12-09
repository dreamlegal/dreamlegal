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
          ]  }
};

export default nextConfig;

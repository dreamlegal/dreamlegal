/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    eslint:{
        ignoreBuildErrors:true
    },
    images: {
        domains: ['dreamlegal-backend.s3-ap-south-1.amazonaws.com']
      }
};

export default nextConfig;

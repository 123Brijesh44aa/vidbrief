/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            }
        ]
    },
    env: {
        apiKey: process.env.MY_API_KEY,
    }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;

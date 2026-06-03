import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
<<<<<<< HEAD
  allowedDevOrigins: [
    "**.space-z.ai",
    "space-z.ai",
    "localhost",
  ],
=======
  turbopack: {
    root: __dirname,
  },
>>>>>>> d6202a3 (this workded on my pc)
};

export default nextConfig;

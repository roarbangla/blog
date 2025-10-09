import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://archive.roar.media/**'),
      new URL("https://unsplash.com/**"),
      new URL("https://source.unsplash.com/**"),
      new URL("https://images.unsplash.com/**")
    ],
  },

};

export default nextConfig;

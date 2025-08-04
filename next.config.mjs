import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  // Configure external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgflip.com',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media3.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media4.giphy.com',
      }
    ],
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Optimize for production
  poweredByHeader: false,
  compress: true,
};

export default withMDX(nextConfig);

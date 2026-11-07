/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The Project Euler notebook was replaced by the blog.
      { source: "/notebook", destination: "/blog", permanent: true },
      { source: "/notebook/:path*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;

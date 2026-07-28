/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  }
};

export default nextConfig;

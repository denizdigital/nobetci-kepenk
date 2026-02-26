import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bu ayar tarayıcılara giden "X-Powered-By: Next.js" etiketini siler.
  // Sitenin Node.js ile yapıldığını dışarıdan gizler.
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
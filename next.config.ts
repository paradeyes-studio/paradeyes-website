import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      { source: "/appel", destination: "/contact#appel", permanent: true },
      { source: "/rdv", destination: "/contact#appel", permanent: true },
      { source: "/book", destination: "/contact#appel", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "https://groundbreak-landing-page.webflow.io/",
      },
      {
        source: "/pmf",
        destination: "https://groundbreak-landing-page.webflow.io/",
      },
      {
        source: "/VPattentive",
        destination:
          "/story/yzj8qLd5MlzRnx5X1Cjwxjd0XURkUnj3",
      },
    ];
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;

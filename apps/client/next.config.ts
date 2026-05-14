import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["components", "api", "utils"],
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dolog-s3-873593443627-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "storage.com",
			},
		],
	},
};

export default nextConfig;

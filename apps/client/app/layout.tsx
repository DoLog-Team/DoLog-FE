import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { AmplitudeProvider } from "@/providers/amplitude-provider";

export const metadata: Metadata = {
	title: "두록",
	description: "우리의 졸업 전시, 더 오래 기록하는 방법",
	metadataBase: new URL("https://dolog.kr"),
	alternates: {
		canonical: "https://dolog.kr",
	},
	openGraph: {
		type: "website",
		url: "https://dolog.kr",
		title: "두록",
		description: "우리의 졸업 전시, 더 오래 기록하는 방법",
		images: [{ url: "/images/og-default.png" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "두록",
		description: "우리의 졸업 전시, 더 오래 기록하는 방법",
		images: ["/images/og-default.png"],
	},
	verification: {
		google: "y8A4PmZMH-PpvOKHTtdyybamDdFzYf6VS-LTFWfA0RA",
		other: { "naver-site-verification": "d88474d58d7d9e08cdc8098c00e6e4cb9edc1c59" },
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className="flex justify-center">
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
				<AmplitudeProvider>
					<main
						className="
						w-full max-w-135
						min-h-dvh
						shadow-xl
						relative
						flex flex-col
						"
					>
						{children}
					</main>
				</AmplitudeProvider>
			</body>
		</html>
	);
}

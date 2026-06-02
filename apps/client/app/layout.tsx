import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { AmplitudeProvider } from "@/providers/amplitude-provider";

export const metadata: Metadata = {
	title: "두록(Dolog) | 대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼",
	description:
		"두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다. 졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.",
	metadataBase: new URL("https://dolog.kr"),
	alternates: {
		canonical: "https://dolog.kr",
	},
	openGraph: {
		type: "website",
		url: "https://dolog.kr",
		siteName: "두록(Dolog)",
		locale: "ko_KR",
		title: "두록(Dolog) | 대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼",
		description:
			"두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다. 졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.",
		images: [{ url: "/images/og-default.png" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "두록(Dolog) | 대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼",
		description:
			"두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다. 졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.",
		images: ["/images/og-default.png"],
	},
	robots: {
		index: true,
		follow: true,
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

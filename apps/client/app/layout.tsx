import "./globals.css";
import type { Metadata } from "next";
import { AmplitudeProvider } from "@/providers/amplitude-provider";

export const metadata: Metadata = {
	title: "두록",
	description: "우리의 졸업 전시, 더 오래 기록하는 방법",
	metadataBase: new URL("https://dolog.kr"),
	openGraph: {
		type: "website",
		url: "https://dolog.kr",
		title: "두록",
		description: "우리의 졸업 전시, 더 오래 기록하는 방법",
		images: [{ url: "/images/og-default.png" }],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className="flex justify-center">
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

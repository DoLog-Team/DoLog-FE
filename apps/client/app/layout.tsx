import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "두록",
	description: "졸업전시 아카이빙 플랫폼 두록",
	openGraph: {
		title: "두록",
		description: "졸업전시 아카이빙 플랫폼 두록",
		images: [{ url: "/images/og-default.png" }],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className="flex justify-center">
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
			</body>
		</html>
	);
}

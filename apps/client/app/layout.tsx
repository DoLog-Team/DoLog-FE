import "./globals.css";

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

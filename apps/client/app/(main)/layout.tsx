import { ThemeProvider } from "@/providers/theme-providers";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" forcedTheme="light" enableColorScheme={true}>
			{children}
		</ThemeProvider>
	);
}

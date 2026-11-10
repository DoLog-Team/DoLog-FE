import { ClientShell } from "@/providers/client-shell";
import { ThemeProvider } from "@/providers/theme-providers";

export const revalidate = 60;

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClientShell>
			<ThemeProvider attribute="class" forcedTheme="light" enableColorScheme={true}>
				{children}
			</ThemeProvider>
		</ClientShell>
	);
}

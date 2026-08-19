import { GoogleAnalytics } from "@next/third-parties/google";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import MainFooter from "@/components/common/Footer/MainFooter";
import { ThemeProvider } from "@/providers/theme-providers";
import { ExhibitionAdminHeader } from "./admin/_components/ExhibitionAdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{process.env.NEXT_PUBLIC_ADMIN_GA_MEASUREMENT_ID && (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ADMIN_GA_MEASUREMENT_ID} />
			)}
			<ThemeProvider attribute="class" forcedTheme="light" enableColorScheme={true}>
				<div className="w-full flex min-h-dvh flex-col">
					<ExhibitionAdminHeader />
					<main className="flex-1">
						<DesktopContainer className="py-8">{children}</DesktopContainer>
					</main>
					<MainFooter className="dark bg-fg-lighter" />
				</div>
			</ThemeProvider>
		</>
	);
}

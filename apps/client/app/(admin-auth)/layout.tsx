import { AdminAuthHeader } from "@/components/common/AdminAuthHeader/AdminAuthHeader";
import { ThemeProvider } from "@/providers/theme-providers";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" forcedTheme="light" enableColorScheme={true}>
			<div className="flex min-h-dvh w-full flex-col bg-normal">
				<AdminAuthHeader />

				<div className="grid flex-1 grid-rows-[2fr_auto_3fr]">
					<div className="row-start-2 mx-auto flex w-full max-w-150 flex-col items-center gap-10 px-4 py-6 min-[721px]:px-8 min-[721px]:py-7">
						{children}
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

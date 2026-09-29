import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/providers/theme-providers";

// 전시 관리처럼 폼 전용 헤더를 쓰는 슈퍼 어드민 화면 — 공통 슈퍼 어드민 헤더·푸터 없음
export default function AdminFormLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{process.env.NEXT_PUBLIC_ADMIN_GA_MEASUREMENT_ID && (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ADMIN_GA_MEASUREMENT_ID} />
			)}
			<ThemeProvider attribute="class" forcedTheme="light" enableColorScheme={true}>
				<div className="flex min-h-dvh w-full flex-col bg-normal">{children}</div>
			</ThemeProvider>
		</>
	);
}

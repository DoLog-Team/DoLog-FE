import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/providers/theme-providers";

// 공통 슈퍼 어드민 헤더 대신 자체 헤더를 쓰는 화면 (전시 관리 · 사용 중인 플랜) — 헤더·푸터는 각 페이지가 결정
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

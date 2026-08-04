import { GoogleAnalytics } from "@next/third-parties/google";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{process.env.NEXT_PUBLIC_ADMIN_GA_MEASUREMENT_ID && (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ADMIN_GA_MEASUREMENT_ID} />
			)}
			{/* 사이드바 + 헤더 shell 구조 */}
			{children}
		</>
	);
}

import MainFooter from "@/components/common/Footer/MainFooter";
import { ArtistAdminHeader } from "./_components/ArtistAdminHeader";

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full flex min-h-dvh flex-col">
			<ArtistAdminHeader />
			<main className="flex-1">
				{/* Figma 작가 어드민 여백(데스크탑 32px)에 맞춰 공통 DesktopContainer(40px) 대신 직접 지정 */}
				<div className="mx-auto w-full max-w-285 px-4 min-[721px]:px-8">{children}</div>
			</main>
			<MainFooter />
		</div>
	);
}

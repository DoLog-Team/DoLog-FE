import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import MainFooter from "@/components/common/Footer/MainFooter";
import { ArtistAdminHeader } from "./_components/ArtistAdminHeader";

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full flex min-h-dvh flex-col">
			<ArtistAdminHeader />
			<main className="flex-1">
				<DesktopContainer className="py-8">{children}</DesktopContainer>
			</main>
			<MainFooter />
		</div>
	);
}

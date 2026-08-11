import Link from "next/link";
import { AdminHeaderActions } from "@/components/common/AdminHeaderActions/AdminHeaderActions";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";

const NAV_ITEMS = [
	{ label: "작가 관리", href: "/admin/artists" },
	{ label: "작품 관리", href: "/admin/artworks" },
	{ label: "전시 관리", href: "/admin/exhibitions" },
] as const;

export function ExhibitionAdminHeader() {
	return (
		<header className="border-b border-stroke-lightest">
			<DesktopContainer className="flex items-center justify-between py-3">
				<div className="flex items-center gap-6">
					<span className="text-body1-bold text-strong">두록 어드민</span>
					<nav className="flex items-center gap-4">
						{NAV_ITEMS.map((item) => (
							<Link key={item.href} href={item.href} className="text-body2 text-lighter">
								{item.label}
							</Link>
						))}
					</nav>
				</div>
				<AdminHeaderActions />
			</DesktopContainer>
		</header>
	);
}
